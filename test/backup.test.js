import test from "node:test";
import assert from "node:assert/strict";
import { openDb } from "../server/db.js";
import { createBackup } from "../server/backup.js";

test("accounts survive a wiped database through the gist backup", async () => {
  let stored = null;
  const fake = async (url, opts = {}) => {
    if (opts.method === "PATCH") {
      stored = JSON.parse(opts.body).files["upword-backup.json"].content;
      return { ok: true };
    }
    return { ok: true, json: async () => ({ files: { "upword-backup.json": { content: stored } } }) };
  };
  const a = openDb(":memory:");
  a.prepare("INSERT INTO users (name, pass_hash, level, created_at) VALUES ('ana','h','B1',1)").run();
  a.prepare("INSERT INTO progress (user_id, lesson_id, best) VALUES (1,'u1l1',90)").run();
  const backupA = createBackup(a, { token: "t", gistId: "g", delayMs: 5, fetchImpl: fake });
  await backupA.start();
  backupA.markDirty();
  await backupA.save();
  assert.ok(stored);

  const b = openDb(":memory:");
  const backupB = createBackup(b, { token: "t", gistId: "g", fetchImpl: fake });
  assert.equal(await backupB.restoreIfEmpty(), true);
  assert.equal(b.prepare("SELECT level FROM users WHERE name='ana'").get().level, "B1");
  assert.equal(b.prepare("SELECT best FROM progress").get().best, 90);
  assert.equal(await backupB.restoreIfEmpty(), false);
});

test("backup is inert without credentials", async () => {
  const db = openDb(":memory:");
  const backup = createBackup(db, { token: "", gistId: "" });
  backup.markDirty();
  assert.equal(backup.enabled, false);
  assert.equal(await backup.restoreIfEmpty(), false);
});

test("a failed restore blocks saving so the real backup is never overwritten", async () => {
  let up = false;
  let patched = 0;
  const content = JSON.stringify({ users: [{ id: 1, name: "ana", pass_hash: "h", level: "B2", created_at: 1 }] });
  const fake = async (url, opts = {}) => {
    if (opts.method === "PATCH") { patched++; return { ok: true }; }
    if (!up) return { ok: false, status: 502 };
    return { ok: true, json: async () => ({ files: { "upword-backup.json": { content } } }) };
  };
  const db = openDb(":memory:");
  const backup = createBackup(db, { token: "t", gistId: "g", delayMs: 5, fetchImpl: fake });
  await backup.start({ retryMs: 10 });
  assert.equal(backup.isReady(), false);
  assert.match(backup.status().lastError, /502/);
  backup.markDirty();
  await backup.save();
  assert.equal(patched, 0);
  up = true;
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(backup.isReady(), true);
  assert.equal(db.prepare("SELECT level FROM users").get().level, "B2");
});
