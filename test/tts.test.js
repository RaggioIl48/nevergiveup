import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { textKey } from "../content/tts-key.js";
import { bank } from "../content/exams.js";

test("textKey is stable and ignores surrounding spaces", () => {
  assert.equal(textKey("Hello there."), textKey("  Hello there.  "));
  assert.notEqual(textKey("Hello there."), textKey("Hello there!"));
  assert.match(textKey("x"), /^[0-9a-f]{8}$/);
});

test("voice manifest only points at files that exist and at current text", { skip: !existsSync("public/audio/tts/manifest.json") }, () => {
  const manifest = JSON.parse(readFileSync("public/audio/tts/manifest.json", "utf8"));
  for (const [key, file] of Object.entries(manifest.say)) {
    assert.ok(existsSync(`public/audio/tts/${file}`), file);
    assert.ok(file.includes(key), `${file} matches its key`);
  }
  const byId = new Map(bank.map((t) => [t.id, t]));
  for (const [id, files] of Object.entries(manifest.tasks)) {
    const task = byId.get(id);
    if (!task) continue;
    files.forEach((file, i) => {
      if (!file) return;
      assert.ok(existsSync(`public/audio/tts/${file}`), file);
      if (i < task.script.length) assert.ok(file.endsWith(`${textKey(task.script[i].text)}.mp3`), `${id} line ${i} is up to date`);
    });
  }
});
