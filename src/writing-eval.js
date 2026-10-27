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
    if (words.length >= 100) { notes.push("La extensión alcanza la meta orientativa de 100 palabras."); return 20; }
    notes.push(`Tienes ${words.length} palabras; añade ideas y ejemplos para llegar a 100.`);
    return Math.round((words.length / 100) * 10);
  }

  function connectorScore() {
    if (found.length) { notes.push(`Buen uso de conectores: ${found.slice(0, 3).join(", ")}.`); return Math.min(20, found.length * 7); }
    notes.push("Conecta tus razones con “because”, “however” o “for example”.");
    return 0;
  }

  function grammarScore() {
    const checks = [
      [/\bpeople is\b/i, "“people” va con “are”."],
      [/\bdepend of\b/i, "Se dice “depend on”."],
      [/\binformations\b/i, "“information” es incontable, sin -s."],
      [/\badvices\b/i, "“advice” es incontable: “some advice”."],
      [/\bdespite of\b/i, "Usa “despite” sin “of”, o “in spite of”."],
      [/\b(he|she|it) (go|have|do|don't)\b/i, "Con he/she/it, el verbo lleva -s (goes, has, does, doesn't)."],
      [/\bi am agree\b/i, "Di “I agree”."],
      [/\bmore better\b/i, "Evita el doble comparativo: “better”."],
    ];
    const hits = checks.filter(([pattern]) => pattern.test(text)).map(([, note]) => note);
    if (hits.length) { notes.push(...hits.slice(0, 3)); return Math.max(0, 15 - hits.length * 5); }
    notes.push("No detecté errores frecuentes. Lee en voz alta para comprobar que suena natural.");
    return 15;
  }

  function punctuationScore() {
    const ok = sentences.length >= 3 && sentences.every((s) => /^[A-Z]/.test(s)) && /[.!?]["')\]]?\s*$/.test(text);
    notes.push(ok ? "Mayúsculas y puntuación claras." : "Revisa las mayúsculas al inicio y la puntuación al final de las frases.");
    return ok ? 10 : 0;
  }
}
