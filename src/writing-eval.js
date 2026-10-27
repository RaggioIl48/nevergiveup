export function evaluateWriting(text) {
  const words = text.match(/\b[\w'-]+\b/g) || [];
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const lower = text.toLowerCase();
  const connectors = ["because", "however", "although", "therefore", "for example", "in addition", "on the other hand", "as a result", "moreover", "despite"];
  const found = connectors.filter((c) => lower.includes(c));
  return { ...scoreWriting(text, words, sentences, found), words: words.length };
}

function scoreWriting(text, words, sentences, found) {
  const notes = [];
  let score = 35;
  return finish();

  function finish() {
    return { score: Math.min(100, run()), notes };
  }

  function run() {
    return score + lengthScore() + connectorScore() + grammarScore() + punctuationScore();
  }

  function lengthScore() {
    if (words.length >= 100) { notes.push("You reached the suggested 100-word goal."); return 20; }
    notes.push(`You have ${words.length} words; add ideas and examples to reach 100.`);
    return Math.round((words.length / 100) * 10);
  }

  function connectorScore() {
    if (found.length) { notes.push(`Good use of linking words: ${found.slice(0, 3).join(", ")}.`); return Math.min(20, found.length * 7); }
    notes.push("Link your ideas with “because,” “however,” or “for example.”");
    return 0;
  }

  function grammarScore() {
    const checks = [
      [/\bpeople is\b/i, "Use “are” with “people.”"],
      [/\bdepend of\b/i, "Say “depend on.”"],
      [/\binformations\b/i, "“Information” is uncountable; do not add -s."],
      [/\badvices\b/i, "“Advice” is uncountable: say “some advice.”"],
      [/\bdespite of\b/i, "Use “despite” without “of,” or say “in spite of.”"],
      [/\b(he|she|it) (go|have|do|don't)\b/i, "With he/she/it, add -s to the verb (goes, has, does, doesn't)."],
      [/\bi am agree\b/i, "Say “I agree.”"],
      [/\bmore better\b/i, "Avoid double comparatives: use “better.”"],
    ];
    const hits = checks.filter(([pattern]) => pattern.test(text)).map(([, note]) => note);
    if (hits.length) { notes.push(...hits.slice(0, 3)); return Math.max(0, 15 - hits.length * 5); }
    notes.push("No common errors found. Read it aloud to check that it sounds natural.");
    return 15;
  }

  function punctuationScore() {
    const ok = sentences.length >= 3 && sentences.every((s) => /^[A-Z]/.test(s)) && /[.!?]["')\]]?\s*$/.test(text);
    notes.push(ok ? "Clear capitalization and punctuation." : "Check capitalization at the start and punctuation at the end of each sentence.");
    return ok ? 10 : 0;
  }
}
