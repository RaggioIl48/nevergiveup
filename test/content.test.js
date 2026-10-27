import test from "node:test";
import assert from "node:assert/strict";
import { grade, normalize, similarity, levelFromDifficulty } from "../content/grade.js";
import { units, diagnostic, itemIndex, START_INDEX } from "../content/index.js";
import { speakingPrompts, writingPrompts } from "../content/labs.js";
import { realListening } from "../content/real-listening.js";
import { existsSync } from "node:fs";

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
  assert.equal(levelFromDifficulty(0.5), "A1");
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

test("content: A2→B2 route and lab banks keep their structure", () => {
  assert.equal(units.length, 10);
  assert.deepEqual(units.map((u) => u.level), ["A2", "A2", "A2", "B1", "B1", "B1", "B2", "B2", "B2", "B2"]);
  assert.equal(units.reduce((total, unit) => total + unit.lessons.length, 0), 30);
  assert.equal(units.reduce((total, unit) => total + unit.lessons.reduce((n, lesson) => n + lesson.exercises.length, 0), 0), 240);
  for (const u of units) for (const l of u.lessons) assert.equal(l.exercises.length, 8, l.id);
  assert.equal(new Set(speakingPrompts.map((prompt) => prompt.id)).size, speakingPrompts.length);
  assert.equal(new Set(writingPrompts.map((prompt) => prompt.id)).size, writingPrompts.length);
  assert.ok(speakingPrompts.length >= 24);
  assert.ok(writingPrompts.length >= 16);
  assert.equal(diagnostic.length, 36);
  assert.equal(new Set(realListening.map((p) => p.id)).size, realListening.length);
  assert.equal(realListening.length, 14);
  for (const p of realListening) {
    assert.ok(p.audio && existsSync(`public${p.audio}`), `${p.id} audio file`);
    for (const q of p.questions) assert.ok(q.a >= 0 && q.a < q.options.length, p.id);
  }
  const positions = new Set(units.flatMap((u) => u.lessons.flatMap((l) => l.exercises)).filter((e) => e.kind === "choice").map((e) => e.a));
  assert.ok(positions.size > 1);
  assert.equal(START_INDEX.A2, 0);
  assert.equal(START_INDEX.B1, 9);
  assert.equal(START_INDEX.B2, 18);
  for (const prompt of speakingPrompts) assert.ok(prompt.q && prompt.tip && prompt.prep > 0 && prompt.time > 0, prompt.id);
  for (const prompt of writingPrompts) assert.ok(prompt.q && prompt.min >= 100, prompt.id);
});
