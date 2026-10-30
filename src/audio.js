import { textKey } from "../content/tts-key.js";

const synth = window.speechSynthesis;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const canSpeak = Boolean(synth);
export const canListen = Boolean(Recognition);

// Natural recordings pre-generated with Kokoro (01-TOOLS/VOICES). The browser voice is only the fallback
// for text that has no recording yet. One <audio> element is reused so iOS keeps it unlocked after a tap.
const TTS = "/audio/tts/";
let manifest = null;
fetch(`${TTS}manifest.json`).then((r) => (r.ok ? r.json() : null)).then((m) => { manifest = m; }).catch(() => {});
const player = typeof Audio === "function" ? new Audio() : null;
if (player) player.setAttribute("playsinline", "");
let playing = null;

function stopRecording() {
  if (!player) return;
  player.onended = null;
  player.onerror = null;
  player.pause();
  clearTimeout(playing);
}

// Plays one file; calls fail() if it cannot (missing file, autoplay refused), so the caller can fall back.
function playFile(file, rate, onEnd, fail) {
  stopRecording();
  player.src = TTS + file;
  player.playbackRate = Math.max(0.5, Math.min(1.5, rate / 0.95));
  player.onended = () => onEnd?.();
  player.onerror = () => fail();
  player.play().catch(fail);
}

export function speak(text, { rate = 0.95, onEnd } = {}) {
  const file = manifest?.say?.[textKey(text)];
  synth?.cancel();
  if (file && player) return playFile(file, rate, onEnd, () => speakSynth(text, { rate, onEnd }));
  speakSynth(text, { rate, onEnd });
}

function speakSynth(text, { rate, onEnd }) {
  if (!synth) return onEnd?.();
  stopRecording();
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  const voice = synth.getVoices().find((v) => v.lang.startsWith("en") && /US|GB/.test(v.lang));
  if (voice) utterance.voice = voice;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  synth.speak(utterance);
}

export function stopSpeaking() {
  stopRecording();
  synth?.cancel();
}

const FEMALE = /female|woman|zira|samantha|susan|hazel|karen|moira|victoria|fiona|serena|google uk english female/i;
const MALE = /\bmale\b|david|mark|daniel|alex|fred|george|oliver|google uk english male|ryan/i;

function pickVoices() {
  const en = (synth?.getVoices() || []).filter((v) => v.lang.startsWith("en"));
  const a = en.find((v) => FEMALE.test(v.name) && /US|GB/.test(v.lang)) || en[0];
  const b = en.find((v) => MALE.test(v.name) && v !== a && /US|GB/.test(v.lang)) || en.find((v) => v !== a);
  return { A: a, B: b };
}

// Reads a script [{ who, text }] with two voices: the task's recordings when they exist (id), otherwise the
// browser voices. If a recording fails mid-way, the rest continues with the browser voice. Returns a stop function.
export function playScript(script, { rate = 0.92, onEnd, id } = {}) {
  const files = manifest?.tasks?.[id];
  let stopped = false;
  if (player && files?.length === script.length && files.every(Boolean)) {
    const next = (i) => {
      if (stopped) return;
      if (i >= script.length) return onEnd?.();
      playFile(files[i], 0.95, () => { playing = setTimeout(() => next(i + 1), 350); }, () => { if (!stopped) synthFrom(i); });
    };
    next(0);
    return () => { stopped = true; stopRecording(); synth?.cancel(); };
  }
  synthFrom(0);
  return () => { stopped = true; stopRecording(); synth?.cancel(); };

  function synthFrom(start) { synthScript(script, start, rate, onEnd, () => stopped); }
}

function synthScript(script, start, rate, onEnd, isStopped) {
  if (!synth) return onEnd?.();
  synth.cancel();
  const voices = pickVoices();
  const next = (i) => {
    if (isStopped()) return;
    if (i >= script.length) return onEnd?.();
    const u = new SpeechSynthesisUtterance(script[i].text);
    u.lang = "en-US";
    u.rate = rate;
    const voice = voices[script[i].who] || voices.A;
    if (voice) u.voice = voice;
    // With one installed voice, separate the speakers by pitch instead.
    if (voices.A === voices.B) u.pitch = script[i].who === "B" ? 0.75 : 1.1;
    u.onend = () => setTimeout(() => next(i + 1), 350);
    u.onerror = () => next(i + 1);
    synth.speak(u);
  };
  next(start);
}

export function listen({ onText, onConfidence, onEnd, onError, continuous = false }) {
  if (!Recognition) return null;
  const rec = new Recognition();
  rec.lang = "en-US";
  rec.continuous = continuous;
  rec.interimResults = true;
  rec.onresult = (event) => {
    const results = Array.from(event.results);
    onText(results.map((r) => r[0].transcript).join(" "));
    onConfidence?.(results.filter((r) => r.isFinal).map((r) => r[0].confidence).filter((c) => c > 0));
  };
  rec.onerror = (event) => { if (event.error !== "no-speech" && event.error !== "aborted") onError?.(event.error); };
  rec.onend = () => onEnd?.();
  try {
    rec.start();
  } catch {
    onError?.("start-failed");
    return null;
  }
  return rec;
}
