import { api } from "../api.js";
import { h, toast } from "../dom.js";
import { icon } from "../icons.js";
import { playScript, stopSpeaking } from "../audio.js";
import { audioCredits } from "../../content/real-listening.js";
import { bank, EXAMS, DIFFICULTY, composeExam, checkAnswer, scoreExam } from "../../content/exams.js";
import { labFrame } from "./labs.js";

const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
};
const answerText = (q, given) => (q.type === "fill" ? (given || "(no answer)") : given === undefined ? "(no answer)" : q.options[given]);
const correctText = (q) => (q.type === "fill" ? q.answer : q.options[q.a]);

// Plays a task's audio. `once` mimics an exam: a single listening.
function audioPlayer(task, { once, onStart }) {
  let stop = () => {};
  let started = false;
  const status = h("span", { class: "muted", "aria-live": "polite" }, "Press play when you are ready.");
  const btn = h("button", { class: "key key-info", type: "button", onClick: () => {
    if (once && started) return;
    stop();
    started = true;
    onStart?.();
    btn.disabled = once;
    status.textContent = "Playing…";
    const done = () => { status.textContent = once ? "Finished. Answer the questions." : "Finished. Play again any time."; btn.disabled = false; if (once) btn.disabled = true; };
    if (task.real) {
      const audio = new Audio(task.audio);
      audio.onended = done;
      audio.onerror = () => { status.textContent = "The recording could not be loaded."; btn.disabled = false; };
      audio.play().catch(() => { status.textContent = "Tap play again to allow audio."; started = false; btn.disabled = false; });
      stop = () => audio.pause();
    } else {
      stop = playScript(task.script, { onEnd: done });
    }
  } }, icon("Play", 22), once ? "Play (once)" : "Play");
  return { el: h("div", { class: "audio-row" }, btn, status), stop: () => stop() };
}

function questionBlock(q, index, { instant, onChange }) {
  const legend = h("legend", {}, `${index + 1}. ${q.q}`);
  if (q.type === "fill") {
    const input = h("input", { class: "answer-input", type: "text", autocapitalize: "none", autocorrect: "off", autocomplete: "off", spellcheck: "false", "aria-label": `Answer ${index + 1}` });
    const fb = h("p", { class: "muted", "aria-live": "polite" });
    const body = [input];
    if (instant) {
      const check = h("button", { class: "key key-quiet", type: "button", onClick: () => {
        const ok = checkAnswer(q, input.value);
        input.disabled = true; check.disabled = true;
        input.classList.add(ok ? "ok" : "bad");
        fb.textContent = ok ? "Correct" : `Answer: ${q.answer}`;
        onChange(input.value, ok);
      } }, "Check");
      body.push(check, fb);
    } else input.addEventListener("input", () => onChange(input.value));
    return h("fieldset", { class: "q" }, legend, ...body);
  }
  const buttons = q.options.map((text, oi) => h("button", { class: "choice", type: "button", "aria-pressed": "false", onClick: () => {
    if (instant) {
      if (buttons.some((b) => b.disabled)) return;
      buttons.forEach((b, i) => { b.disabled = true; if (i === q.a) b.classList.add("correct"); else if (i === oi) b.classList.add("wrong"); });
    } else buttons.forEach((b, i) => { b.setAttribute("aria-pressed", String(i === oi)); b.classList.toggle("picked", i === oi); });
    onChange(oi, oi === q.a);
  } }, text));
  return h("fieldset", { class: "q" }, legend, h("div", { class: "choices" }, buttons));
}

export async function listeningView(root, ctx) {
  const seenKey = "upword-free-seen";
  const cleanups = [];
  window.addEventListener("hashchange", () => { cleanups.forEach((f) => f()); stopSpeaking(); }, { once: true });
  const next = () => {
    const seen = store.get(seenKey, []);
    const fresh = bank.filter((t) => !seen.includes(t.id));
    const pool = fresh.length ? fresh : bank;
    const task = pool[Math.floor(Math.random() * pool.length)];
    store.set(seenKey, (fresh.length ? [...seen, task.id] : [task.id]).slice(-400));
    return task;
  };
  const render = (task) => {
    cleanups.splice(0).forEach((f) => f());
    const done = new Array(task.questions.length).fill(undefined);
    const status = h("p", { class: "muted", "aria-live": "polite" }, "Listen as many times as you need, then answer.");
    const player = audioPlayer(task, { once: false });
    cleanups.push(player.stop);
    const finish = async () => {
      const right = done.filter(Boolean).length;
      status.textContent = `Result: ${right}/${task.questions.length}. Read the transcript and compare it with what you heard.`;
      try { await api("/lab", { kind: "listening", ref: task.id }); } catch { /* no XP */ }
      document.querySelector(".lab-body").append(h("div", { class: "transcript" }, h("h2", {}, "Transcript"),
        task.script ? task.script.map((s) => h("p", {}, h("b", {}, task.format === "conversation" ? `${s.who}: ` : ""), s.text)) : h("p", {}, task.text),
        h("button", { class: "key key-primary wide", type: "button", onClick: () => render(next()) }, "Another recording")));
    };
    let answered = 0;
    const blocks = task.questions.map((q, i) => questionBlock(q, i, { instant: true, onChange: (_, ok) => { done[i] = ok; answered += 1; if (answered === task.questions.length) finish(); } }));
    labFrame(root, ctx, task.title,
      h("span", { class: "tag" }, `${task.level} · ${task.real ? "real voice" : task.format}`),
      player.el, status, blocks,
      h("a", { class: "key key-quiet wide", href: "#/exams" }, "Take a timed exam"),
      task.real ? h("p", { class: "muted" }, audioCredits) : null);
  };
  render(next());
}

export async function examsView(root, ctx) {
  let diff = store.get("upword-exam-diff", "B2");
  const chips = Object.keys(DIFFICULTY).map((d) => h("button", { class: "tag chip-btn", type: "button", "aria-pressed": String(d === diff), onClick: () => {
    diff = d; store.set("upword-exam-diff", d);
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === d)));
    rows.forEach(([a, e]) => { a.href = `#/exam/${e.id}.${diff}`; });
  } }, d));
  const rows = Object.values(EXAMS).map((e) => [h("a", { class: "row", href: `#/exam/${e.id}.${diff}` },
    h("span", { class: "row-icon" }, icon("Headphones", 28)),
    h("span", { class: "row-text" }, h("b", {}, e.name), h("small", {}, `${e.minutes} min · ${e.blurb}`)),
    icon("ChevronRight", 22)), e]);
  labFrame(root, ctx, "Listening exams",
    h("p", { class: "tip" }, `Timed simulations built from a bank of ${bank.length} recordings. Each exam draws new recordings and questions, avoiding the ones you already did. Every recording plays once, as in the real test.`),
    h("fieldset", { class: "q" }, h("legend", {}, "Difficulty"), h("div", { class: "tags" }, chips)),
    h("ul", { class: "rows" }, rows.map(([a]) => h("li", {}, a))),
    h("p", { class: "muted" }, "Scores are rough estimates for practice, not official TOEFL, IELTS or Cambridge results. Conversations and lectures use your device's synthetic voices; the quality depends on your phone."));
}

export async function examView(root, ctx, arg) {
  const [examId, diffRaw] = String(arg || "").split(".");
  if (!EXAMS[examId]) throw new Error("Exam not found");
  const diff = DIFFICULTY[diffRaw] ? diffRaw : "B2";
  const seenKey = `upword-seen-${examId}`;
  const seen = store.get(seenKey, []);
  const { exam, tasks } = composeExam(examId, diff, seen);
  store.set(seenKey, [...seen, ...tasks.map((t) => t.task.id)].slice(-400));

  const answers = tasks.map(({ task }) => new Array(task.questions.length).fill(undefined));
  let index = 0;
  let left = exam.minutes * 60;
  let ended = false;
  let player = null;
  const timerEl = h("p", { class: "timer", role: "timer", "aria-live": "off" }, clock(left));
  const cleanup = () => { clearInterval(tick); player?.stop(); stopSpeaking(); };
  const tick = setInterval(() => { left -= 1; timerEl.textContent = clock(Math.max(0, left)); if (left <= 0) finish(); }, 1000);
  window.addEventListener("hashchange", cleanup, { once: true });

  const section = () => {
    player?.stop();
    const { section: label, task } = tasks[index];
    player = audioPlayer(task, { once: true });
    const blocks = task.questions.map((q, i) => questionBlock(q, i, { instant: false, onChange: (v) => { answers[index][i] = v; } }));
    const last = index === tasks.length - 1;
    labFrame(root, ctx, exam.name,
      h("div", { class: "exam-bar" }, h("span", { class: "tag" }, `${label} · ${index + 1}/${tasks.length}`), timerEl),
      h("p", { class: "tip" }, "The recording plays once. Answer while you listen or right after."),
      player.el, blocks,
      h("button", { class: "key key-primary wide", type: "button", onClick: () => { if (last) finish(); else { index += 1; section(); window.scrollTo(0, 0); } } }, last ? "Finish exam" : "Next section"));
  };

  async function finish() {
    if (ended) return;
    ended = true;
    cleanup();
    let right = 0;
    let total = 0;
    const review = tasks.map(({ section: label, task }, ti) => {
      const items = task.questions.map((q, qi) => {
        const given = answers[ti][qi];
        const ok = given !== undefined && checkAnswer(q, given);
        total += 1; if (ok) right += 1;
        return h("li", { class: ok ? "r-ok" : "r-bad" },
          h("b", {}, `${ok ? "✓" : "✗"} ${q.q}`),
          h("small", {}, ok ? `Your answer: ${answerText(q, given)}` : `Your answer: ${answerText(q, given)} · Correct: ${correctText(q)}`));
      });
      return h("details", { class: "review" }, h("summary", {}, `${label}: ${task.title}`), h("ul", {}, items),
        h("p", { class: "transcript-text" }, h("b", {}, "Transcript: "), task.text));
    });
    const s = scoreExam(right, total);
    try { await api("/lab", { kind: "exam", ref: `${examId}:${s.pct}` }); } catch { /* no XP */ }
    labFrame(root, ctx, "Exam results",
      h("p", { class: "score-big" }, `${right} / ${total}`),
      h("p", { class: "muted" }, `${s.pct}% · ${s.level}`),
      h("div", { class: "est" },
        h("div", {}, h("b", {}, `${s.toefl}/30`), h("small", {}, "TOEFL-style")),
        h("div", {}, h("b", {}, String(s.ielts)), h("small", {}, "IELTS-style band"))),
      h("p", { class: "muted" }, "Rough estimates for practice only. Review every mistake: listen again in free practice."),
      review,
      h("button", { class: "key key-primary wide", type: "button", onClick: () => location.reload() }, "New exam with new questions"),
      h("a", { class: "key key-quiet wide", href: "#/exams" }, "All exams"));
    toast("Exam saved");
  }
  section();
}
