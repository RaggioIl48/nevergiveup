const synth = window.speechSynthesis;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const canSpeak = Boolean(synth);
export const canListen = Boolean(Recognition);

export function speak(text, { rate = 0.95, onEnd } = {}) {
  if (!synth) return onEnd?.();
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

// Reads a script [{ who, text }] with two voices. Returns a stop function.
export function playScript(script, { rate = 0.92, onEnd } = {}) {
  if (!synth) { onEnd?.(); return () => {}; }
  synth.cancel();
  const voices = pickVoices();
  let stopped = false;
  const next = (i) => {
    if (stopped) return;
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
  next(0);
  return () => { stopped = true; synth.cancel(); };
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
