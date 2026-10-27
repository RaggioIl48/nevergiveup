import test from "node:test";
import assert from "node:assert/strict";
import { grade, normalize, similarity, levelFromDifficulty } from "../content/grade.js";
import { units, diagnostic, itemIndex } from "../content/index.js";
import { speakingPrompts, listeningPassages, writingPrompts } from "../content/labs.js";

test("normalize expands contractions and strips punctuation", () => {
  assert.equal(normalize("I can’t go, won't I?"), "i can not go will not i");
});

test("grade: typed answers ignore case and punctuation", () => {
  assert.ok(grade({ kind: "type", a: ["since"] }, " Since. "));
  assert.ok(!grade({ kind: "type", a: ["since"] }, "for"));
  assert.ok(!grade({ kind: "type", a: ["since"] }, ""));
});

test("grade: choice, match and shadow", () => {
  assert.ok(grade({ kind: "choice", a: 1 }, 1));
  assert.ok(!grade({ kind: "choice", a: 1 }, "1"));
  assert.ok(grade({ kind: "match" }, 0));
  assert.ok(!grade({ kind: "match" }, 2));
  assert.ok(grade({ kind: "shadow" }, 0.8));
  assert.ok(!grade({ kind: "shadow" }, 0.5));
});

test("similarity counts words once", () => {
  assert.equal(similarity("a b c", "a a b"), 2 / 3);
});

test("levelFromDifficulty thresholds", () => {
  assert.equal(levelFromDifficulty(1), "A2");
  assert.equal(levelFromDifficulty(2), "B1");
  assert.equal(levelFromDifficulty(3.5), "B2");
});

test("content: ids unique and answers valid", () => {
  const seen = new Set();
  const all = [...diagnostic, ...units.flatMap((u) => u.lessons.flatMap((l) => l.exercises))];
  for (const ex of all) {
    assert.ok(!seen.has(ex.id), `duplicate ${ex.id}`);
    seen.add(ex.id);
    if (["choice", "listen", "read"].includes(ex.kind)) {
      assert.ok(ex.options.length >= 2 && ex.a >= 0 && ex.a < ex.options.length, ex.id);
    }
    if (ex.kind === "fix") assert.ok(ex.a >= 0 && ex.a < ex.q.split(/\s+/).length, ex.id);
    if (["type", "transform", "order", "dictation"].includes(ex.kind)) assert.ok(ex.a.length && ex.a.every(Boolean), ex.id);
    if (ex.kind === "order") assert.equal(normalize(ex.q.split("/").sort().join(" ")).split(" ").sort().join(" "), normalize(ex.a[0]).split(" ").sort().join(" "), ex.id);
    assert.ok(ex.why, `${ex.id} needs explanation`);
  }
  assert.equal(itemIndex.size, all.length);
});

test("content: B2 route and lab banks grow without losing their structure", () => {
  assert.equal(units.length, 7);
  assert.equal(units.reduce((total, unit) => total + unit.lessons.length, 0), 21);
  assert.equal(units.reduce((total, unit) => total + unit.lessons.reduce((n, lesson) => n + lesson.exercises.length, 0), 0), 126);
  for (const u of units) for (const l of u.lessons) assert.equal(l.exercises.length, 6, l.id);
  assert.equal(new Set(speakingPrompts.map((prompt) => prompt.id)).size, speakingPrompts.length);
  assert.equal(new Set(listeningPassages.map((passage) => passage.id)).size, listeningPassages.length);
  assert.equal(new Set(writingPrompts.map((prompt) => prompt.id)).size, writingPrompts.length);
  assert.equal(speakingPrompts.length, 17);
  assert.equal(listeningPassages.length, 7);
  assert.equal(writingPrompts.length, 12);
  for (const p of listeningPassages) {
    for (const q of p.questions) assert.ok(q.a >= 0 && q.a < q.options.length);
    if (p.id === "l6" || p.id === "l7") assert.ok(new Set(p.questions.map((q) => q.a)).size > 1, p.id);
  }
  for (const prompt of speakingPrompts) assert.ok(prompt.q && prompt.tip && prompt.prep > 0 && prompt.time > 0, prompt.id);
  for (const prompt of writingPrompts) assert.ok(prompt.q && prompt.min >= 100, prompt.id);
});
