# VOICES

> Pre-generates natural English voices for the app with Kokoro TTS (82M, Apache-2.0), so listening exams, lesson audio and phrasal-verb examples no longer use the robotic browser voice.

## When to use

After adding or changing any text the app reads aloud (listening-exam scripts in `content/bank/`, lesson items with `say`, phrasal-verb examples). Re-running only voices what is new or changed; untouched clips are kept.

## Setup

1. `npm install` (in this folder; about 300 MB, never shipped to Render).
2. `npm run generate` — downloads the Kokoro model once (~90 MB from Hugging Face), then writes MP3s and `manifest.json` to `public/audio/tts/`. Runs faster than real time on a laptop CPU.
3. Commit `public/audio/tts/` and deploy.

## Scripts

| Script | What it does | Example |
|--------|--------------|---------|
| `generate.mjs` | Voices every script line (two speakers per task, US and UK accents) and every `say`/example sentence; resumable. | `npm run generate` |
| `pilot.mjs` | Two sample clips to judge voice quality. | `node pilot.mjs` |

## Operational notes

- The client (`src/audio.js`) plays a recording when the manifest has one and falls back to the browser voice otherwise, so missing clips never break a lesson.
- Clips are keyed by a hash of their text (`content/tts-key.js`): edit a sentence and its old clip is simply ignored until regenerated.
- VoiceStudio (debpalash/VoiceStudio) was considered: it is a full desktop app (AGPL) that bundles Kokoro among its engines; using Kokoro directly is lighter and scriptable.
- No credentials needed.
