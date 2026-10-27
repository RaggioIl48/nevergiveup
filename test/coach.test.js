import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server/app.js";
import { openDb } from "../server/db.js";
import { cleanFeedback } from "../server/coach.js";

test("cleanFeedback clamps scores and trims untrusted model output", () => {
  const f = cleanFeedback({ level: "Z9", scores: { fluency: 9, vocabulary: -3, grammar: "2.4", task: null }, strengths: ["a", "b", "c", "d", "e"], fixes: [{ said: "x".repeat(999), better: "y", why: "z" }], tip: 5 });
  assert.equal(f.level, "B1");
  assert.deepEqual(f.scores, { fluency: 4, vocabulary: 0, grammar: 2.5, task: 0 });
  assert.equal(f.strengths.length, 4);
  assert.equal(f.fixes[0].said.length, 200);
  assert.equal(f.tip, "5");
});

async function setup(coach) {
  const app = createApp(openDb(":memory:"), { inviteCode: "secret", distDir: "none", coach });
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const r = await fetch(`${base}/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Ana", password: "secret1", invite: "secret" }) });
  const cookie = (r.headers.get("set-cookie") || "").split(";")[0];
  const call = async (body) => {
    const res = await fetch(`${base}/speaking/feedback`, { method: "POST", headers: { cookie, "content-type": "application/json" }, body: JSON.stringify(body) });
    return { status: res.status, data: await res.json() };
  };
  return { server, call };
}

const speech = "I think technology helps people because we can talk to friends every day";

test("speaking feedback: unavailable coach, validation, success and fallback on error", async () => {
  let s = await setup({ available: () => false });
  assert.deepEqual((await s.call({ prompt: "p", transcript: speech })).data, { available: false });
  s.server.close();

  let fail = false;
  s = await setup({ available: () => true, review: async () => { if (fail) throw new Error("down"); return { level: "B1", overall: 2 }; } });
  try {
    assert.equal((await s.call({ prompt: "p", transcript: "too short" })).status, 400);
    assert.equal((await s.call({ transcript: speech })).status, 400);
    const ok = await s.call({ prompt: "p", transcript: speech, seconds: 30 });
    assert.equal(ok.data.available, true);
    fail = true;
    assert.deepEqual((await s.call({ prompt: "p", transcript: speech })).data, { available: false });
  } finally {
    s.server.close();
  }
});
