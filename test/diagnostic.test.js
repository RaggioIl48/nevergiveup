import test from "node:test";
import assert from "node:assert/strict";
import { diagnostic } from "../content/index.js";
import { diagnosticSource } from "../content/diagnostic-source.js";

function seeded(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };
}

function run(rand) {
  const source = diagnosticSource(diagnostic, 20, rand);
  let ex = source.next();
  while (ex) {
    source.record(ex, ex.id.charCodeAt(2) % 3 !== 0);
    ex = source.next();
  }
  return source.results().map((r) => r.id);
}

test("diagnostic draws different questions each time and never repeats one", () => {
  const a = run(seeded(1));
  const b = run(seeded(2));
  assert.equal(a.length, 20);
  assert.equal(new Set(a).size, 20);
  assert.notDeepEqual(a, b);
  const seen = new Set();
  for (let i = 0; i < 12; i += 1) run(seeded(i + 10)).forEach((id) => seen.add(id));
  assert.ok(seen.size >= 60, `only ${seen.size} distinct questions across 12 runs`);
});
