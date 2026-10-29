// Tap-or-hover dictionary. Desktop: rest the mouse on a word for half a second. Phone: press and hold a word
// (the native selection) . A small card shows the Spanish translation, a simple meaning and an example.
import { api } from "./api.js";
import { h } from "./dom.js";
import { icon } from "./icons.js";
import { speak } from "./audio.js";

const SKIP = "button, a, input, textarea, select, label, [contenteditable], .tabbar, .lookup-pop, .no-lookup";
const cache = new Map();
let pop = null;
let hoverTimer = null;
let shownFor = "";

function wordAt(x, y) {
  let node, offset;
  if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(x, y);
    if (!pos) return null;
    ({ offsetNode: node, offset } = pos);
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y);
    if (!range) return null;
    node = range.startContainer; offset = range.startOffset;
  }
  if (!node || node.nodeType !== Node.TEXT_NODE || node.parentElement?.closest(SKIP)) return null;
  const text = node.textContent;
  let start = offset, end = offset;
  while (start > 0 && /[A-Za-z'’-]/.test(text[start - 1])) start -= 1;
  while (end < text.length && /[A-Za-z'’-]/.test(text[end])) end += 1;
  const word = text.slice(start, end).replace(/^['’-]+|['’-]+$/g, "");
  if (word.length < 2) return null;
  // Make sure the pointer is really over the word, not in the blank space after a line.
  const range = document.createRange();
  range.setStart(node, start); range.setEnd(node, end);
  const rect = range.getBoundingClientRect();
  if (x < rect.left - 2 || x > rect.right + 2 || y < rect.top - 2 || y > rect.bottom + 2) return null;
  return { word, rect, context: sentenceAround(node.parentElement?.textContent || text, word) };
}

const sentenceAround = (text, word) => text.split(/(?<=[.!?])\s+/).find((s) => s.includes(word))?.slice(0, 240) || "";

function close() {
  pop?.remove();
  pop = null;
  shownFor = "";
}

async function show(word, rect, context) {
  const key = word.toLowerCase().replace(/’/g, "'");
  if (shownFor === key && pop) return;
  close();
  shownFor = key;
  const body = h("div", { class: "lookup-body" }, h("p", { class: "muted" }, "Looking up…"));
  pop = h("div", { class: "lookup-pop", role: "dialog", "aria-label": `Meaning of ${word}` },
    h("div", { class: "lookup-head" }, h("b", {}, word),
      h("button", { class: "icon-btn", type: "button", "aria-label": `Listen to ${word}`, onClick: () => speak(word) }, icon("Volume2", 18)),
      h("button", { class: "icon-btn", type: "button", "aria-label": "Close", onClick: close }, icon("X", 18))),
    body);
  document.body.append(pop);
  const width = Math.min(300, window.innerWidth - 24);
  pop.style.width = `${width}px`;
  pop.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
  const below = rect.bottom + 8;
  pop.style.top = `${below + 150 > window.innerHeight ? Math.max(12, rect.top - 158) : below}px`;
  try {
    if (!cache.has(key)) cache.set(key, api(`/define?w=${encodeURIComponent(key)}&c=${encodeURIComponent(context)}`));
    const d = await cache.get(key);
    if (shownFor !== key) return;
    body.replaceChildren(
      d.es ? h("p", { class: "lookup-es" }, d.es) : "",
      h("p", {}, d.meaning),
      d.example ? h("p", { class: "lookup-ex" }, `“${d.example}”`) : "");
  } catch (e) {
    cache.delete(key);
    if (shownFor === key) body.replaceChildren(h("p", { class: "muted" }, e.status === 404 ? "No definition found." : e.message));
  }
}

export function installLookup() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine) {
    document.addEventListener("mousemove", (e) => {
      clearTimeout(hoverTimer);
      if (e.target.closest?.(".lookup-pop")) return;
      hoverTimer = setTimeout(() => {
        const hit = wordAt(e.clientX, e.clientY);
        if (hit) show(hit.word, hit.rect, hit.context);
      }, 550);
    });
  }
  // Phones (and double-click on desktop): a single selected word opens the card.
  document.addEventListener("selectionchange", () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      const sel = document.getSelection();
      const text = sel?.toString().trim();
      if (!text || !/^[A-Za-z'’-]{2,30}$/.test(text) || sel.anchorNode?.parentElement?.closest(SKIP)) return;
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      show(text, rect, sentenceAround(sel.anchorNode.parentElement?.textContent || "", text));
    }, 350);
  });
  document.addEventListener("pointerdown", (e) => { if (pop && !e.target.closest(".lookup-pop")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  window.addEventListener("scroll", close, { passive: true });
  window.addEventListener("hashchange", close);
}
