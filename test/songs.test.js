import test from "node:test";
import assert from "node:assert/strict";
import { parseVideoId, buildGaps, isCorrect, validateSong, DENSITY } from "../content/songs.js";
import { createApp } from "../server/app.js";
import { openDb } from "../server/db.js";

test("parseVideoId accepts common YouTube formats and rejects others", () => {
  const id = "dQw4w9WgXcQ";
  for (const u of [`https://www.youtube.com/watch?v=${id}&t=5`, `https://youtu.be/${id}?si=x`, `https://m.youtube.com/shorts/${id}`, `youtube.com/embed/${id}`, id]) {
    assert.equal(parseVideoId(u), id, u);
  }
  for (const u of ["", "https://example.com/watch?v=" + id, "https://www.youtube.com/watch?v=short", "nonsense"]) {
    assert.equal(parseVideoId(u), null, u);
  }
});

test("buildGaps: manual braces, labels, determinism, density", () => {
  const manual = buildGaps("[Verse]\nI {walk} alone, {again}\n\nplain line", 0.3);
  assert.equal(manual[0].label, "Verse");
  assert.deepEqual(manual[1].tokens.filter((t) => t.gap).map((t) => t.word), ["walk", "again"]);
  assert.equal(manual[2].blank, true);
  assert.equal(manual[3].tokens.some((t) => t.gap), false);

  const text = "Walking down the lonely street tonight\nWondering where the morning light will go";
  const a = JSON.stringify(buildGaps(text, DENSITY.medium));
  assert.equal(a, JSON.stringify(buildGaps(text, DENSITY.medium)));
  const count = (d) => buildGaps(text, d).flatMap((l) => l.tokens).filter((t) => t.gap).length;
  assert.ok(count(DENSITY.easy) >= 2);
  assert.ok(count(DENSITY.hard) > count(DENSITY.easy));
});

test("isCorrect ignores case and punctuation but not empty input", () => {
  assert.ok(isCorrect("Light", " light! "));
  assert.ok(!isCorrect("light", ""));
  assert.ok(!isCorrect("light", "night"));
});

test("validateSong enforces link, level and length", () => {
  const lyrics = "one two three\nfour five six\nseven eight nine\nten eleven twelve";
  assert.ok(validateSong({ url: "dQw4w9WgXcQ", level: "B1", lyrics }).videoId);
  assert.ok(validateSong({ url: "bad", level: "B1", lyrics }).error);
  assert.ok(validateSong({ url: "dQw4w9WgXcQ", level: "C2", lyrics }).error);
  assert.ok(validateSong({ url: "dQw4w9WgXcQ", level: "B1", lyrics: "short" }).error);
});

test("songs API: create, list, owner-only delete", async () => {
  const app = createApp(openDb(":memory:"), { inviteCode: "secret", distDir: "none", fetchTitle: async () => "Stub title" });
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const login = async (name) => {
    const r = await fetch(`${base}/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, password: "secret1", invite: "secret" }) });
    return (r.headers.get("set-cookie") || "").split(";")[0];
  };
  const call = async (cookie, path, body) => {
    const r = await fetch(base + path, { method: body ? "POST" : "GET", headers: { cookie, "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    return { status: r.status, data: await r.json() };
  };
  try {
    const ana = await login("Ana");
    const bob = await login("Bob");
    const lyrics = "one two three\nfour five six\nseven eight nine\nten eleven twelve";
    assert.equal((await call(ana, "/songs", { url: "nope", level: "B1", lyrics })).status, 400);
    const made = await call(ana, "/songs", { url: "https://youtu.be/dQw4w9WgXcQ", level: "B1", lyrics });
    assert.equal(made.status, 200);
    const list = await call(bob, "/songs");
    assert.equal(list.data.songs[0].title, "Stub title");
    assert.equal(list.data.songs[0].mine, false);
    assert.equal((await call(bob, `/songs/${made.data.id}/delete`, {})).status, 404);
    assert.equal((await call(ana, `/songs/${made.data.id}`)).data.song.mine, true);
    assert.equal((await call(ana, `/songs/${made.data.id}/delete`, {})).status, 200);
  } finally {
    server.close();
  }
});

test("songs keep a genre, the owner can swap the video, and YouTube gets our origin", async () => {
  const app = createApp(openDb(":memory:"), { inviteCode: "secret", distDir: "none", fetchTitle: async () => "Stub" });
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const login = async (name) => {
    const r = await fetch(`${base}/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, password: "secret1", invite: "secret" }) });
    return (r.headers.get("set-cookie") || "").split(";")[0];
  };
  const call = async (cookie, path, body) => {
    const r = await fetch(base + path, { method: body ? "POST" : "GET", headers: { cookie, "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    return { status: r.status, data: await r.json(), referrer: r.headers.get("referrer-policy") };
  };
  try {
    const ana = await login("Ana");
    const bob = await login("Bob");
    const lyrics = "one two three\nfour five six\nseven eight nine\nten eleven twelve";
    const made = await call(ana, "/songs", { url: "https://youtu.be/dQw4w9WgXcQ", level: "A2", genre: "Rock", lyrics });
    const other = await call(ana, "/songs", { url: "https://youtu.be/dQw4w9WgXcQ", level: "B2", genre: "Opera?", lyrics });
    const list = await call(bob, "/songs");
    assert.equal(list.referrer, "strict-origin-when-cross-origin");
    assert.equal(list.data.songs.find((s) => s.id === made.data.id).genre, "Rock");
    assert.equal(list.data.songs.find((s) => s.id === other.data.id).genre, "Other");
    assert.equal((await call(bob, `/songs/${made.data.id}/update`, { url: "https://youtu.be/jNQXAC9IVRw" })).status, 404);
    assert.equal((await call(ana, `/songs/${made.data.id}/update`, { url: "nope" })).status, 400);
    const swapped = await call(ana, `/songs/${made.data.id}/update`, { url: "https://youtu.be/jNQXAC9IVRw", genre: "Pop" });
    assert.equal(swapped.data.videoId, "jNQXAC9IVRw");
    const song = (await call(bob, `/songs/${made.data.id}`)).data.song;
    assert.deepEqual([song.videoId, song.genre, song.level, song.lyrics], ["jNQXAC9IVRw", "Pop", "A2", lyrics]);
  } finally {
    server.close();
  }
});
