// Quick check: loads Kokoro, voices one sentence with two voices, writes MP3s next to this file.
import { writeFileSync } from "node:fs";
import { KokoroTTS } from "kokoro-js";
import { toMp3 } from "./mp3.mjs";

const t0 = Date.now();
const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "cpu" });
console.log(`model loaded in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
const text = "Good morning, everyone. Today I want to talk about why leaves change colour in autumn.";
for (const voice of ["af_heart", "bm_george"]) {
  const t = Date.now();
  const audio = await tts.generate(text, { voice });
  const mp3 = toMp3(audio.audio, audio.sampling_rate);
  writeFileSync(`pilot-${voice}.mp3`, mp3);
  console.log(`${voice}: ${(audio.audio.length / audio.sampling_rate).toFixed(1)}s of audio in ${((Date.now() - t) / 1000).toFixed(1)}s, ${mp3.length} bytes`);
}
