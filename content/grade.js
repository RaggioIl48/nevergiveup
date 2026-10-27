const CONTRACTIONS = [
  [/\bcan't\b/g, "can not"],
  [/\bwon't\b/g, "will not"],
  [/\bshan't\b/g, "shall not"],
  [/n't\b/g, " not"],
  [/'m\b/g, " am"],
  [/'re\b/g, " are"],
  [/'ve\b/g, " have"],
  [/'ll\b/g, " will"],
];

export function normalize(text) {
  let value = String(text ?? "")
    .toLowerCase()
    .replace(/[\u2018\u2019\u00b4`]/g, "'")
    .replace(/[\u201c\u201d]/g, '"');
  for (const [pattern, replacement] of CONTRACTIONS) value = value.replace(pattern, replacement);
  return value
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function similarity(expected, spoken) {
  const target = normalize(expected).split(" ").filter(Boolean);
  const heard = normalize(spoken).split(" ").filter(Boolean);
  if (!target.length) return 0;
  const pool = new Map();
  for (const word of heard) pool.set(word, (pool.get(word) || 0) + 1);
  let hits = 0;
  for (const word of target) {
    const left = pool.get(word) || 0;
    if (left > 0) {
      hits += 1;
      pool.set(word, left - 1);
    }
  }
  return hits / target.length;
}

export function acceptedAnswers(item) {
  if (item.kind === "dictation") return item.a || [item.say];
  if (Array.isArray(item.a)) return item.a;
  return [];
}

export function grade(item, response) {
  switch (item.kind) {
    case "choice":
    case "listen":
    case "read":
    case "fix":
      return Number.isInteger(response) && response === item.a;
    case "type":
    case "transform":
    case "dictation":
    case "order": {
      const given = normalize(response);
      if (!given) return false;
      return acceptedAnswers(item).some((answer) => normalize(answer) === given);
    }
    case "match":
      return Number(response) === 0;
    case "shadow":
      return Number(response) >= 0.7;
    default:
      return false;
  }
}

export function levelFromDifficulty(score) {
  if (score < 1) return "A1";
  if (score < 1.8) return "A2";
  if (score < 2.6) return "B1";
  if (score < 3.4) return "B1+";
  if (score < 4.2) return "B2";
  return "B2+";
}
