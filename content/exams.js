import { realListening } from "./real-listening.js";
import { realA } from "./bank/real-a.js";
import { realB } from "./bank/real-b.js";
import { conversations } from "./bank/conversations.js";
import { lectures } from "./bank/lectures.js";
import { shorts } from "./bank/short.js";
import { normalize } from "./grade.js";

const legacy = realListening.map((p) => ({
  id: p.id, format: "extract", level: p.level, title: p.title, audio: p.audio, real: true, text: p.text,
  questions: p.questions.map((x) => ({ type: "mc", q: x.q, options: x.options, a: x.a })),
}));

export const bank = [...legacy, ...realA, ...realB, ...conversations, ...lectures, ...shorts];
export const bankById = new Map(bank.map((t) => [t.id, t]));

// Difficulty -> levels allowed in the pool.
export const DIFFICULTY = {
  B1: ["A2", "B1"],
  B2: ["B1", "B2"],
  "B2+": ["B2", "B2+"],
};

const S = (label, format, count, extra = {}) => ({ label, format, count, ...extra });

export const EXAMS = {
  toefl: {
    id: "toefl", name: "TOEFL iBT style", minutes: 22,
    blurb: "2 campus conversations and 2 academic lectures. Each recording plays once.",
    sections: [S("Conversation 1", "conversation", 1), S("Lecture 1", "lecture", 1), S("Conversation 2", "conversation", 1), S("Lecture 2", "lecture", 1)],
  },
  ielts: {
    id: "ielts", name: "IELTS style", minutes: 25,
    blurb: "Four sections: social dialogue, monologue, discussion and lecture. Notes and gap-fill questions.",
    sections: [S("Section 1", "conversation", 1, { prefer: "fill" }), S("Section 2", "monologue", 1), S("Section 3", "conversation", 1), S("Section 4", "lecture", 1)],
  },
  cambridge: {
    id: "cambridge", name: "Cambridge B2 First style", minutes: 20,
    blurb: "Part 1: short extracts. Part 2: a talk with sentence completion. Part 3: a longer conversation.",
    sections: [S("Part 1 · Extract 1", "extract", 1, { onlyShort: true }), S("Part 1 · Extract 2", "extract", 1, { onlyShort: true }), S("Part 1 · Extract 3", "extract", 1, { onlyShort: true }), S("Part 2 · Talk", "monologue", 1), S("Part 3 · Conversation", "conversation", 1)],
  },
  real: {
    id: "real", name: "Real voices", minutes: 12,
    blurb: "Six recordings of real readers. Detail, inference and sentence completion.",
    sections: [S("Recording 1", "extract", 1, { realOnly: true }), S("Recording 2", "extract", 1, { realOnly: true }), S("Recording 3", "extract", 1, { realOnly: true }), S("Recording 4", "extract", 1, { realOnly: true }), S("Recording 5", "extract", 1, { realOnly: true }), S("Recording 6", "extract", 1, { realOnly: true })],
  },
};

// Picks one task per section, preferring tasks the learner has not seen yet.
export function composeExam(examId, difficulty, seen = [], rnd = Math.random) {
  const exam = EXAMS[examId];
  const levels = DIFFICULTY[difficulty] || DIFFICULTY.B2;
  const used = new Set();
  const shuffle = (list) => list.map((x) => [rnd(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);
  const tasks = exam.sections.map((section) => {
    const base = bank.filter((t) => t.format === section.format && !used.has(t.id)
      && (!section.realOnly || t.real) && (!section.onlyShort || (t.text.split(/\s+/).length <= 90)));
    const inLevel = base.filter((t) => levels.includes(t.level));
    const pool = inLevel.length ? inLevel : base;
    const fresh = pool.filter((t) => !seen.includes(t.id));
    let candidates = fresh.length ? fresh : pool;
    if (section.prefer) {
      const preferred = candidates.filter((t) => t.questions.some((q) => q.type === section.prefer));
      if (preferred.length) candidates = preferred;
    }
    const chosen = shuffle(candidates)[0];
    used.add(chosen.id);
    return { section: section.label, task: chosen };
  });
  return { exam, tasks };
}

export function checkAnswer(question, given) {
  if (question.type === "fill") {
    const g = normalize(given);
    return g !== "" && [question.answer, ...(question.alts || [])].some((a) => normalize(a) === g);
  }
  return given === question.a;
}

const IELTS = [[0.95, 9], [0.88, 8.5], [0.82, 8], [0.75, 7.5], [0.67, 7], [0.58, 6.5], [0.5, 6], [0.42, 5.5], [0.33, 5], [0.25, 4.5], [0.18, 4]];

// Rough estimates only: official scales are not published as a formula.
export function scoreExam(right, total) {
  const pct = total ? right / total : 0;
  const ielts = (IELTS.find(([min]) => pct >= min) || [0, 3.5])[1];
  const level = pct >= 0.85 ? "Strong" : pct >= 0.65 ? "Solid" : pct >= 0.45 ? "Developing" : "Needs work";
  return { pct: Math.round(pct * 100), toefl: Math.round(pct * 30), ielts, level };
}
