// Shared by the voice generator and the client: a short, stable key for a sentence (FNV-1a, 32-bit hex),
// so a recording is found by its text and a changed sentence never plays stale audio.
export function textKey(text) {
  let h = 0x811c9dc5;
  for (const c of String(text).trim()) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
