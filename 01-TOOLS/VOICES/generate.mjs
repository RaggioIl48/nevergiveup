// Pre-generates natural voices (Kokoro TTS, Apache-2.0) for everything the app reads aloud:
// listening-exam scripts (two voices per task, US and UK accents), lesson listening/dictation lines,
// and phrasal-verb examples. Writes MP3s and a manifest to public/audio/tts. Resumable: existing files
// are kept, so re-running only voices new or changed text.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { KokoroTTS } from "kokoro-js";
import { toMp3 } from "./mp3.mjs";
import { bank } from "../../content/exams.js";
import { units, diagnostic } from "../../content/index.js";
import { phrasalVerbs } from "../../content/phrasal-verbs.js";
import { textKey } from "../../content/tts-key.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "public/audio/tts");
mkdirSync(OUT, { recursive: true });

// Speaker pairs (A, B): a mix of American and British, female and male, so exams sound like real tests.
const PAIRS = [["af_heart", "am_michael"], ["bm_george", "bf_emma"], ["af_bella", "bm_lewis"], ["bf_isabella", "am_fenrir"]];
const SINGLE = ["af_heart", "bm_george", "af_bella", "am_michael", "bf_emma"];
const pick = (list, key) => list[parseInt(textKey(key).slice(0, 6), 16) % list.length];

const manifestPath = join(OUT, "manifest.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { tasks: {}, say: {} };
const save = () => writeFileSync(manifestPath, JSON.stringify(manifest));

const jobs = [];
for (const task of bank.filter((t) => !t.real)) {
  const [a, b] = pick(PAIRS, task.id);
  task.script.forEach((line, i) => jobs.push({ file: `t-${task.id}-${i}-${textKey(line.text)}.mp3`, text: line.text, voice: line.who === "B" ? b : a, task: task.id, index: i, count: task.script.length }));
}
const sayTexts = new Set([
  ...units.flatMap((u) => u.lessons.flatMap((l) => l.pool)).filter((e) => e.say).map((e) => e.say),
  ...diagnostic.filter((e) => e.say).map((e) => e.say),
  ...phrasalVerbs.map((p) => p.ex),
]);
for (const text of sayTexts) jobs.push({ file: `s-${textKey(text)}.mp3`, text, voice: pick(SINGLE, text), say: textKey(text) });

const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "cpu" });
const started = Date.now();
let made = 0;
for (const [n, job] of jobs.entries()) {
  const path = join(OUT, job.file);
  if (!existsSync(path)) {
    const audio = await tts.generate(job.text, { voice: job.voice });
    writeFileSync(path, toMp3(audio.audio, audio.sampling_rate));
    made += 1;
  }
  if (job.task) {
    manifest.tasks[job.task] ||= new Array(job.count).fill(null);
    manifest.tasks[job.task][job.index] = job.file;
  } else {
    manifest.say[job.say] = job.file;
  }
  if (made && made % 25 === 0) {
    save();
    const rate = (Date.now() - started) / made;
    console.log(`${n + 1}/${jobs.length} done, ~${Math.round(((jobs.length - n - 1) * rate) / 60000)} min left`);
  }
}
save();
console.log(`Finished: ${jobs.length} clips (${made} new). Manifest: public/audio/tts/manifest.json`);
