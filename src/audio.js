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

export function listen({ onText, onEnd, onError, continuous = false }) {
  if (!Recognition) return null;
  const rec = new Recognition();
  rec.lang = "en-US";
  rec.continuous = continuous;
  rec.interimResults = true;
  rec.onresult = (event) => onText(Array.from(event.results).map((r) => r[0].transcript).join(" "));
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
