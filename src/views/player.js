import { h } from "../dom.js";
import { icon } from "../icons.js";
import { renderExercise, correctText } from "../exercises.js";
import { grade } from "../../content/grade.js";
import { stopSpeaking } from "../audio.js";

// source: { next(lastOk, lastEx) -> exercise|null, progress() -> 0..1, record(ex, ok, first) }
export function runPlayer({ root, source, quiet = false, onExit, onFinish }) {
  let current = null;
  let view = null;
  let checked = false;
  let finished = false;
  const bar = h("div", { class: "progress-fill" });
  const track = h("div", { class: "progress-track", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100" }, bar);
  const stage = h("div", { class: "stage" });
  const action = h("div", { class: "action-bar" });
  const close = h("button", { class: "icon-btn", type: "button", "aria-label": "Exit lesson", onClick: () => { stopSpeaking(); onExit(); } }, icon("X", 24));
  root.replaceChildren(h("div", { class: "player" }, h("header", { class: "player-top" }, close, track), stage, action));

  const setProgress = () => {
    const pct = Math.round(source.progress() * 100);
    bar.style.width = `${pct}%`;
    track.setAttribute("aria-valuenow", String(pct));
  };

  const show = (ex) => {
    current = ex;
    checked = false;
    const checkBtn = h("button", { class: "key key-primary wide", type: "button", disabled: true, onClick: check }, quiet ? "Continue" : "Check");
    action.className = "action-bar";
    action.replaceChildren(checkBtn);
    view = renderExercise(ex, (ready) => { checkBtn.disabled = !ready; });
    stage.replaceChildren(view.root);
    view.api.focus?.();
    setProgress();
    stage.scrollTop = 0;
  };

  const advance = (ok) => {
    if (finished) return;
    stopSpeaking();
    const next = source.next(ok, current);
    if (next) show(next);
    else {
      finished = true;
      action.querySelectorAll("button").forEach((b) => { b.disabled = true; });
      setProgress();
      onFinish();
    }
  };

  const check = () => {
    if (checked) return;
    checked = true;
    const ok = grade(current, view.api.value);
    source.record(current, ok);
    if (quiet) return advance(ok);
    const answer = ok ? null : correctText(current);
    action.className = `action-bar feedback ${ok ? "good" : "bad"}`;
    action.replaceChildren(...[
      h("div", { class: "feedback-head" }, icon(ok ? "Check" : "X", 28), h("strong", {}, ok ? "Correct" : "Almost")),
      answer ? h("p", { class: "feedback-answer" }, "Answer: ", h("b", {}, answer)) : null,
      current.why ? h("p", { class: "feedback-why" }, current.why) : null,
      h("button", { class: "key wide " + (ok ? "key-good" : "key-bad"), type: "button", autofocus: true, onClick: () => advance(ok) }, "Continue"),
    ].filter(Boolean));
    action.querySelector("button").focus();
  };

  root.onkeydown = (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.target.tagName === "BUTTON") return;
    event.preventDefault();
    const btn = action.querySelector("button");
    if (btn && !btn.disabled) btn.click();
  };

  const first = source.next(null, null);
  if (first) show(first);
  else onFinish();
}

// Fixed lesson: each exercise is asked; wrong ones return once at the end.
export function lessonSource(exercises) {
  const queue = [...exercises];
  const firstTry = new Map();
  const requeued = new Set();
  let done = 0;
  return {
    results: () => exercises.map((e) => ({ id: e.id, ok: firstTry.get(e.id) === true })),
    record(ex, ok) {
      if (!firstTry.has(ex.id)) firstTry.set(ex.id, ok);
      if (ok) done += 1;
      else if (!requeued.has(ex.id)) { requeued.add(ex.id); queue.push(ex); }
    },
    next() { return queue.shift() || null; },
    progress: () => Math.min(1, done / exercises.length),
  };
}

// Adaptive staircase: harder after a hit, easier after a miss.
export function diagnosticSource(pool, total) {
  const used = new Set();
  const results = [];
  let level = 2;
  let lastSkill = null;
  const pick = () => {
    for (const delta of [0, 1, -1, 2, -2, 3, -3, 4, -4]) {
      const candidates = pool.filter((x) => x.lvl === level + delta && !used.has(x.id));
      if (candidates.length) return candidates.find((c) => c.skill !== lastSkill) || candidates[0];
    }
    return null;
  };
  const take = () => {
    if (results.length >= total) return null;
    const ex = pick();
    if (ex) { used.add(ex.id); lastSkill = ex.skill; }
    return ex;
  };
  return {
    results: () => results,
    record(ex, ok) {
      results.push({ id: ex.id, ok });
      level = Math.max(1, Math.min(5, level + (ok ? 1 : -1)));
    },
    next: take,
    progress: () => results.length / total,
  };
}
