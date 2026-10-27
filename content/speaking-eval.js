// Automatic speaking estimate from the transcript the browser produced. It measures what a transcript
// can show (length, fluency, vocabulary, connectors, relevance); it does not hear pronunciation itself,
// except through the recognizer's own confidence.
const STOP = new Set("the a an and or but of to in on at for with is are was were be been it this that i you he she we they my your me do does did have has had not so if as by from about what which who how why when there their them his her its our can will would should could just very really".split(" "));
const FILLERS = /\b(um+|uh+|er+|erm|hmm+|like|you know|i mean)\b/gi;
const CONNECTORS = ["because", "however", "although", "therefore", "for example", "for instance", "in addition", "on the other hand", "as a result", "moreover", "despite", "while", "whereas", "first", "then", "after that", "finally", "in my opinion", "i think", "so that", "which means", "instead", "unless", "even though"];

const words = (t) => (t.toLowerCase().match(/[a-z']+/g) || []);
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

export function evaluateSpeaking(transcript, { seconds, expected, promptText, confidence } = {}) {
  const w = words(transcript);
  const out = { words: w.length, notes: [] };
  if (w.length < 8) {
    return { ...out, scores: null, overall: 0, level: "—", notes: ["Not enough speech was captured to score. Check the microphone and speak for the full time."] };
  }
  const unique = new Set(w).size;
  const wpm = seconds ? Math.round((w.length / seconds) * 60) : 0;
  const fillers = (transcript.match(FILLERS) || []).length;
  const lower = transcript.toLowerCase();
  const used = CONNECTORS.filter((c) => lower.includes(c));
  const topic = words(promptText || "").filter((x) => x.length > 3 && !STOP.has(x));
  const hit = topic.length ? topic.filter((x) => w.includes(x) || w.some((y) => y.startsWith(x.slice(0, 5)))).length / topic.length : 0.5;
  const content = w.filter((x) => !STOP.has(x) && x.length > 4);
  const richness = new Set(content).size;
  const sentences = transcript.split(/[.!?]+/).filter((s) => s.trim()).length || 1;

  // Each criterion is 0-4, like the TOEFL speaking rubric.
  const length = clamp(w.length / (expected || 80), 0, 1);
  const delivery = clamp(1 + length * 2 + (wpm >= 90 && wpm <= 190 ? 1 : 0) - Math.min(1, fillers / 6) + (confidence != null && confidence >= 0.85 ? 0.5 : 0), 0, 4);
  const language = clamp(0.5 + (unique / w.length) * 3 + Math.min(1, richness / 18) + Math.min(1, w.length / sentences / 14) * 0.5, 0, 4);
  const development = clamp(0.5 + length * 1.5 + Math.min(1.5, used.length * 0.4) + hit * 0.8, 0, 4);

  const scores = { delivery: round(delivery), language: round(language), development: round(development) };
  const overall = round((scores.delivery + scores.language + scores.development) / 3);

  if (wpm && wpm < 90) out.notes.push(`Your pace was about ${wpm} words per minute; aim for 110-160 with fewer long pauses.`);
  else if (wpm > 190) out.notes.push(`Your pace was about ${wpm} words per minute; slow down so every word is clear.`);
  else if (wpm) out.notes.push(`Good pace: about ${wpm} words per minute.`);
  if (fillers > 3) out.notes.push(`You used ${fillers} filler words (um, like, you know). Pause silently instead.`);
  if (used.length < 2) out.notes.push("Add linking words: because, however, for example, as a result.");
  else out.notes.push(`Good linking words: ${used.slice(0, 4).join(", ")}.`);
  if (hit < 0.35) out.notes.push("Your answer may drift from the question; reuse its key words.");
  if (w.length < (expected || 80) * 0.6) out.notes.push(`You said ${w.length} words; try for about ${expected || 80}.`);
  if (confidence != null && confidence < 0.7) out.notes.push("The recognizer often misheard you, which can point to unclear pronunciation or background noise.");

  const level = overall >= 3.4 ? "B2" : overall >= 2.6 ? "B1+" : overall >= 1.8 ? "B1" : overall >= 1 ? "A2" : "A1";
  return { ...out, wpm, scores, overall, level };
}

const round = (n) => Math.round(n * 10) / 10;
