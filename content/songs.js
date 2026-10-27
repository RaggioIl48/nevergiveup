// Shared by the server (validation) and the client (gap-fill). Pure functions only.
import { normalize } from "./grade.js";

export const SONG_LEVELS = ["A2", "B1", "B2"];
export const DENSITY = { easy: 0.15, medium: 0.3, hard: 0.5 };
export const LYRICS_MAX = 6000;

export function parseVideoId(input) {
  const text = String(input ?? "").trim();
  if (/^[\w-]{11}$/.test(text)) return text;
  let url;
  try { url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`); } catch { return null; }
  const host = url.hostname.replace(/^(www|m|music)\./, "");
  let id = null;
  if (host === "youtu.be") id = url.pathname.split("/")[1];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") id = url.searchParams.get("v");
    else id = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/)?.[1];
  }
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}

const STOP = new Set("the and you your are was were for but not with that this have has had from they them his her she him its our out all can will just oh yeah hey la na uh ooh".split(" "));
const WORD = /^([^\p{L}\p{N}]*)([\p{L}\p{N}][\p{L}\p{N}'’-]*)(.*)$/u;
const LABEL = /^\s*[[(].*[\])]\s*$/;

const hash = (text) => { let n = 7; for (const c of text) n = (n * 31 + c.charCodeAt(0)) >>> 0; return n; };

function tokenize(line) {
  return line.trim().split(/\s+/).filter(Boolean).map((raw) => {
    const m = raw.match(WORD);
    return m ? { pre: m[1], word: m[2], post: m[3] } : { pre: raw, word: "", post: "" };
  });
}

// Lines as arrays of {pre, word, post, gap}. {braced} words are always gaps; otherwise gaps are picked
// deterministically per line from content words, so everyone gets the same blanks at a given level.
export function buildGaps(lyrics, density = DENSITY.medium) {
  const text = String(lyrics ?? "").replace(/\r/g, "");
  const manual = /\{[^}\n]+\}/.test(text);
  return text.split("\n").map((raw, li) => {
    if (!raw.trim()) return { blank: true, tokens: [] };
    if (LABEL.test(raw)) return { label: raw.trim().replace(/^[[(]|[\])]$/g, ""), tokens: [] };
    if (manual) {
      const tokens = [];
      for (const part of raw.split(/(\{[^}]+\})/)) {
        const m = part.match(/^\{([^}]+)\}$/);
        if (m) tokens.push({ pre: "", word: m[1].trim(), post: "", gap: true });
        else for (const t of tokenize(part)) tokens.push({ ...t, gap: false });
      }
      return { tokens };
    }
    const tokens = tokenize(raw).map((t) => ({ ...t, gap: false }));
    const candidates = tokens.map((t, i) => ({ t, i })).filter(({ t }) => t.word.length >= 3 && !STOP.has(t.word.toLowerCase()));
    if (density > 0 && candidates.length) {
      const count = Math.max(1, Math.round(candidates.length * density));
      candidates.sort((a, b) => hash(`${li}:${a.i}:${a.t.word}`) - hash(`${li}:${b.i}:${b.t.word}`));
      for (const { t } of candidates.slice(0, count)) t.gap = true;
    }
    return { tokens };
  });
}

export const isCorrect = (answer, given) => normalize(given) !== "" && normalize(given) === normalize(answer);

export function validateSong({ url, title, level, lyrics }) {
  const videoId = parseVideoId(url);
  if (!videoId) return { error: "That does not look like a YouTube link" };
  if (!SONG_LEVELS.includes(level)) return { error: "Choose a level" };
  const text = String(lyrics ?? "").replace(/\r/g, "").trim();
  const lines = text.split("\n").filter((l) => l.trim() && !LABEL.test(l));
  if (lines.length < 4) return { error: "Paste at least 4 lines of lyrics" };
  if (text.length > LYRICS_MAX) return { error: "Lyrics are too long" };
  const clean = String(title ?? "").trim().slice(0, 80);
  return { videoId, level, lyrics: text, title: clean };
}
