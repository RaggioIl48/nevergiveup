import test from "node:test";
import assert from "node:assert/strict";
import { openDb } from "../server/db.js";
import { createApp } from "../server/app.js";
import { units, diagnostic } from "../content/index.js";

async function boot() {
  const app = createApp(openDb(":memory:"), { inviteCode: "secret", distDir: "none" });
  const server = await new Promise((resolve) => { const s = app.listen(0, () => resolve(s)); s.unref(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  let cookie = "";
  const call = async (path, body, method) => {
    const res = await fetch(base + path, {
      method: method || (body ? "POST" : "GET"),
      headers: { "content-type": "application/json", cookie },
      body: body ? JSON.stringify(body) : undefined,
    });
    const set = res.headers.get("set-cookie");
    if (set) cookie = set.split(";")[0];
    return { status: res.status, data: await res.json() };
  };
  return { call, close: () => { server.closeAllConnections(); server.close(); } };
}

test("registration needs the invite code and rejects duplicates", async () => {
  const { call, close } = await boot();
  assert.equal((await call("/api/register", { name: "Ana", password: "abcdef", invite: "nope" })).status, 403);
  assert.equal((await call("/api/me")).status, 401);
  assert.equal((await call("/api/register", { name: "Ana", password: "abcdef", invite: "secret" })).status, 201);
  assert.equal((await call("/api/register", { name: "ana", password: "abcdef", invite: "secret" })).status, 409);
  assert.equal((await call("/api/register", { name: "Bo", password: "123", invite: "secret" })).status, 400);
  close();
});

test("login, lesson flow, unlock, xp and leaderboard", async () => {
  const { call, close } = await boot();
  await call("/api/register", { name: "Ana", password: "abcdef", invite: "secret" });
  assert.equal((await call("/api/login", { name: "Ana", password: "bad" })).status, 401);
  const lesson = units[0].lessons[0];
  const perfect = lesson.exercises.map((e) => ({ id: e.id, ok: true }));
  const locked = units[0].lessons[1];
  assert.equal((await call("/api/lesson", { lessonId: locked.id, results: locked.exercises.map((e) => ({ id: e.id, ok: true })) })).status, 403);
  assert.equal((await call("/api/lesson", { lessonId: lesson.id, results: perfect.slice(1) })).status, 400);
  const done = await call("/api/lesson", { lessonId: lesson.id, results: perfect });
  assert.equal(done.status, 200);
  assert.equal(done.data.score, 100);
  assert.equal(done.data.gained, 22);
  assert.equal(done.data.streak, 1);
  const again = await call("/api/lesson", { lessonId: lesson.id, results: perfect });
  assert.equal(again.data.gained, 7);
  assert.equal((await call("/api/lesson", { lessonId: locked.id, results: locked.exercises.map((e) => ({ id: e.id, ok: true })) })).status, 200);
  const board = await call("/api/leaderboard");
  assert.equal(board.data.rows[0].name, "Ana");
  assert.ok(board.data.rows[0].you);
  close();
});

test("mistakes feed spaced review and diagnostic places the level", async () => {
  const { call, close } = await boot();
  await call("/api/register", { name: "Eva", password: "abcdef", invite: "secret" });
  const lesson = units[0].lessons[0];
  const results = lesson.exercises.map((e, i) => ({ id: e.id, ok: i !== 0 }));
  await call("/api/lesson", { lessonId: lesson.id, results });
  assert.equal((await call("/api/review")).data.ids.length, 0);
  const diag = await call("/api/diagnostic", { results: diagnostic.slice(0, 20).map((d) => ({ id: d.id, ok: d.lvl <= 3 })) });
  assert.equal(diag.status, 200);
  assert.ok(["B1+", "B2"].includes(diag.data.level), diag.data.level);
  const me = await call("/api/me");
  assert.equal(me.data.user.level, diag.data.level);
  close();
});
