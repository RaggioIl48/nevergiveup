import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server/app.js";
import { openDb } from "../server/db.js";
import { cleanFeedback, cleanWritingFeedback } from "../server/coach.js";
import { readdirSync, readFileSync } from "node:fs";

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
  return { server, call, base, cookie };
}

test("writing feedback: validation, success, fallback and clamping", async () => {
  const text = "Nowadays many people work from home because it saves time and money, but it can also be lonely for some workers.";
  const post = async (s, body) => {
    const res = await fetch(`${s.base}/writing/feedback`, { method: "POST", headers: { cookie: s.cookie, "content-type": "application/json" }, body: JSON.stringify(body) });
    return { status: res.status, data: await res.json() };
  };
  let s = await setup({ available: () => false });
  assert.equal((await post(s, { prompt: "p", text })).data.available, false);
  s.server.close();
  let fail = false;
  s = await setup({ available: () => true, reviewWriting: async () => { if (fail) throw new Error("down"); return { level: "B1", overall: 3 }; } });
  try {
    assert.equal((await post(s, { prompt: "p", text: "too short" })).status, 400);
    assert.equal((await post(s, { text })).status, 400);
    assert.equal((await post(s, { prompt: "p", text, min: 120 })).data.available, true);
    fail = true;
    assert.equal((await post(s, { prompt: "p", text })).data.available, false);
  } finally {
    s.server.close();
  }
  const w = cleanWritingFeedback({ level: "B2", scores: { task: 7, organisation: 2, vocabulary: "x", grammar: 3 }, fixes: [] });
  assert.deepEqual(w.scores, { task: 4, organisation: 2, vocabulary: 0, grammar: 3 });
});

test("source files have no mojibake or BOM", () => {
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]);
  for (const f of ["src", "server", "content"].flatMap(walk).filter((p) => /\.(js|css)$/.test(p))) {
    const s = readFileSync(f, "utf8");
    assert.ok(!s.startsWith("\uFEFF"), `${f} has BOM`);
    assert.ok(!/\u00c2[\u0080-\u00bf]|\u00c3[\u0080-\u00bf]|\u00e2\u20ac/.test(s), `${f} has mojibake`);
  }
});

const speech = "I think technology helps people because we can talk to friends every day";

test("speaking feedback: unavailable coach, validation, success and fallback on error", async () => {
  let s = await setup({ available: () => false });
  assert.equal((await s.call({ prompt: "p", transcript: speech })).data.available, false);
  assert.match((await s.call({ prompt: "p", transcript: speech })).data.reason, /GEMINI_API_KEY/);
  s.server.close();

  let fail = false;
  s = await setup({ available: () => true, review: async () => { if (fail) throw new Error("down"); return { level: "B1", overall: 2 }; } });
  try {
    assert.equal((await s.call({ prompt: "p", transcript: "too short" })).status, 400);
    assert.equal((await s.call({ transcript: speech })).status, 400);
    const ok = await s.call({ prompt: "p", transcript: speech, seconds: 30 });
    assert.equal(ok.data.available, true);
    fail = true;
    const failed = (await s.call({ prompt: "p", transcript: speech })).data;
    assert.equal(failed.available, false);
    assert.match(failed.reason, /down/);
  } finally {
    s.server.close();
  }
});
