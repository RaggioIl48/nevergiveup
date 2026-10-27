// Helpers for the listening-exam bank. Authors write the right option FIRST; `finish` rotates it
// deterministically so the key varies and is not always "A".
export const mc = (q, options, a = 0) => ({ type: "mc", q, options, a });
// Gap-fill: `q` contains ___ ; `answer` is 1-3 words that appear verbatim in the audio.
export const fill = (q, answer, alts = []) => ({ type: "fill", q, answer, alts });

const rotate = (questions, seed) => questions.map((item, i) => {
  if (item.type !== "mc") return item;
  const n = item.options.length;
  const k = (seed + i * 2 + 1) % n;
  return { ...item, options: item.options.map((_, j) => item.options[(j - k + n) % n]), a: (item.a + k) % n };
});

const seedOf = (id) => [...id].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);

// Synthetic-voice task (browser speech). script: [{ who: "A" | "B", text }]
// format: "conversation" | "lecture" | "monologue" | "extract"
export const task = (id, format, level, title, script, questions) => ({
  id, format, level, title, script, real: false,
  text: script.map((s) => s.text).join(" "),
  questions: rotate(questions, seedOf(id)),
});

// Real-voice task (LibriSpeech recording)
export const real = (id, level, title, text, questions) => ({
  id: `r-${id}`, format: "extract", level, title, audio: `/audio/${id}.flac`, real: true, text,
  questions: rotate(questions, seedOf(id)),
});
