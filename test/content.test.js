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

test("content: lessons have 6 exercises and the lab banks are well formed", () => {
  for (const u of units) for (const l of u.lessons) assert.equal(l.exercises.length, 6, l.id);
  for (const p of listeningPassages) for (const q of p.questions) assert.ok(q.a < q.options.length);
  assert.ok(speakingPrompts.length >= 10 && writingPrompts.length >= 6);
});
