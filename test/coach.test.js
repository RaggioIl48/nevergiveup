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

test("provider chain falls back when Gemini is overloaded and reports every failure", async () => {
  const { generate } = await import("../server/coach.js");
  const saved = { fetch: globalThis.fetch, env: { ...process.env } };
  const calls = [];
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  try {
    Object.assign(process.env, { AI_PROVIDERS: "gemini,deepseek", GEMINI_API_KEY: "g", DEEPSEEK_API_KEY: "d" });
    globalThis.fetch = async (url, init) => {
      calls.push(String(url));
      if (String(url).includes("googleapis")) return reply(503, { error: { message: "This model is currently experiencing high demand." } });
      assert.equal(init.headers.authorization, "Bearer d");
      assert.equal(JSON.parse(init.body).response_format.type, "json_object");
      return reply(200, { choices: [{ message: { content: '```json\n{"level":"B2"}\n```' } }] });
    };
    assert.deepEqual(await generate("sys", "text", { type: "OBJECT", properties: { level: { type: "STRING" } } }, 100), { level: "B2" });
    assert.equal(calls.filter((u) => u.includes("googleapis")).length, 4);
    assert.ok(calls.at(-1).includes("deepseek"));

    globalThis.fetch = async (url) => String(url).includes("deepseek") ? reply(402, { error: { message: "Insufficient Balance" } }) : reply(503, {});
    await assert.rejects(generate("sys", "text", { type: "OBJECT", properties: {} }, 100), /Gemini \(.*503.*DeepSeek 402: Insufficient Balance/);
  } finally {
    globalThis.fetch = saved.fetch;
    for (const k of ["AI_PROVIDERS", "GEMINI_API_KEY", "DEEPSEEK_API_KEY"]) if (k in saved.env) process.env[k] = saved.env[k]; else delete process.env[k];
  }
});

test("Groq model that no longer exists: tries known models, then the ones the key can list", async () => {
  const { generate } = await import("../server/coach.js");
  const saved = { fetch: globalThis.fetch, env: { ...process.env } };
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  const used = [];
  try {
    Object.assign(process.env, { AI_PROVIDERS: "groq", GROQ_API_KEY: "k" });
    delete process.env.GROQ_MODEL;
    globalThis.fetch = async (url, init) => {
      if (String(url).endsWith("/models")) return reply(200, { data: [{ id: "whisper-large-v3" }, { id: "new-llm-2026", active: true }] });
      const { model } = JSON.parse(init.body);
      used.push(model);
      if (model !== "new-llm-2026") return reply(404, { error: { message: `The model \`${model}\` does not exist or you do not have access to it.` } });
      return reply(200, { choices: [{ message: { content: '{"level":"B1"}' } }] });
    };
    assert.deepEqual(await generate("sys", "text", { type: "OBJECT", properties: {} }, 100), { level: "B1" });
    assert.ok(used.includes("llama-3.3-70b-versatile") && !used.includes("whisper-large-v3"));
    used.length = 0;
    await generate("sys", "text", { type: "OBJECT", properties: {} }, 100);
    assert.equal(used[0], "new-llm-2026");
  } finally {
    globalThis.fetch = saved.fetch;
    for (const k of ["AI_PROVIDERS", "GROQ_API_KEY", "GROQ_MODEL"]) if (k in saved.env) process.env[k] = saved.env[k]; else delete process.env[k];
  }
});

test("calibrateSpeaking keeps inflated AI levels honest", async () => {
  const { calibrateSpeaking } = await import("../server/coach.js");
  const inflated = { level: "B1+", overall: 2.8, scores: { fluency: 3, vocabulary: 3, grammar: 2.5, task: 2.5 } };
  const a1 = calibrateSpeaking(inflated, { transcript: "I like my city it is big and nice I like food", seconds: 45 });
  assert.equal(a1.level, "A1");
  assert.ok(Object.values(a1.scores).every((s) => s <= 1) && a1.overall <= 1);
  assert.ok(a1.why.length > 0);
  const simple = "I like my city. It is big. There are many parks and shops. I go to the park with my family on Sunday. We eat ice cream and we play football. The food is good and the people are nice. I like it very much.";
  assert.equal(calibrateSpeaking(inflated, { transcript: simple, seconds: 40 }).level, "A2");
  const rich = "I believe remote work is useful because people save time commuting, which means they can spend more energy on their tasks. However, when teams never meet, communication becomes harder, although video calls help a little. For example, my company tried a hybrid model last year, and while productivity stayed stable, newcomers struggled since they rarely received informal advice. If I were a manager, I would combine both approaches so that employees keep flexibility without losing contact with colleagues. That balance seems realistic for most offices.";
  const b2 = calibrateSpeaking({ level: "B2", overall: 3.3, scores: { fluency: 3.5, vocabulary: 3.5, grammar: 3, task: 3 } }, { transcript: rich, seconds: 50 });
  assert.equal(b2.level, "B2");
  assert.equal(calibrateSpeaking({ ...inflated, overall: 1.5, level: "B2" }, { transcript: rich, seconds: 50 }).level, "A2");
});
