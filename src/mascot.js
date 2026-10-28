// Wulf the wolf (yellow sweater, red scarf) vs Pingo the penguin, the thief of the Great Dictionary.
const FUR = "#9aa7b4";
const YELLOW = "#ffc800";
const RED = "#e63946";
const INK = "#1b242b";
const PENG = "#1d2731";
const ORANGE = "#ff9b21";

const WOLF = `
<g class="wolf-move"><g class="wolf-bob">
  <g class="tail"><path d="M-20 34 C-46 30 -50 4 -36 -6 C-36 10 -28 20 -16 24 Z" fill="${FUR}"/><path d="M-36 -6 C-44 4 -44 16 -36 24 C-38 14 -38 6 -36 -6Z" fill="#e9eff4"/></g>
  <rect x="-18" y="44" width="15" height="13" rx="6" fill="${RED}"/><rect x="4" y="44" width="15" height="13" rx="6" fill="${RED}"/>
  <rect x="-22" y="0" width="44" height="52" rx="17" fill="${YELLOW}"/>
  <rect x="-22" y="26" width="44" height="7" fill="${RED}"/>
  <rect x="-33" y="10" width="13" height="28" rx="6.5" fill="${YELLOW}"/><circle cx="-26.5" cy="39" r="6" fill="${FUR}"/>
  <rect x="-21" y="-5" width="42" height="13" rx="6.5" fill="${RED}"/><path d="M8 4 l7 24 l10 -3 l-5 -22z" fill="${RED}"/>
  <g class="arm"><rect x="14" y="8" width="34" height="13" rx="6.5" fill="${YELLOW}"/><rect x="38" y="8" width="7" height="13" fill="${RED}"/><circle cx="50" cy="14.5" r="7.5" fill="${FUR}"/></g>
  <g class="wolf-head">
    <path d="M-25 -24 L-22 -54 L-4 -34 Z" fill="${FUR}"/><path d="M25 -24 L22 -54 L4 -34 Z" fill="${FUR}"/>
    <path d="M-20 -32 L-19.5 -46 L-10 -35Z" fill="#f4a6a0"/><path d="M20 -32 L19.5 -46 L10 -35Z" fill="#f4a6a0"/>
    <ellipse cx="0" cy="-18" rx="28" ry="23" fill="${FUR}"/>
    <ellipse cx="9" cy="-7" rx="16" ry="11" fill="#e9eff4"/>
    <circle cx="21" cy="-11" r="3.8" fill="${INK}"/>
    <path class="smile" d="M11 -3 Q17 2 24 -3" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    <g class="eyes"><circle cx="-6" cy="-23" r="5.5" fill="#fff"/><circle cx="11" cy="-23" r="5.5" fill="#fff"/><circle cx="-4.5" cy="-23" r="3" fill="${INK}"/><circle cx="12.5" cy="-23" r="3" fill="${INK}"/></g>
    <path d="M-12 -31 L-1 -28" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M17 -31 L6 -28" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
  </g>
</g></g>`;

const PENGUIN = `
<g class="peng-move"><g class="peng-squash">
  <ellipse cx="-10" cy="45" rx="10" ry="4.5" fill="${ORANGE}"/><ellipse cx="11" cy="45" rx="10" ry="4.5" fill="${ORANGE}"/>
  <ellipse cx="0" cy="10" rx="25" ry="36" fill="${PENG}" stroke="#3b4b59" stroke-width="2"/>
  <ellipse cx="-3" cy="17" rx="15" ry="25" fill="#fff"/>
  <ellipse class="flip flip-a" cx="-27" cy="14" rx="6" ry="16" fill="${PENG}" stroke="#3b4b59" stroke-width="1.5"/>
  <ellipse class="flip flip-b" cx="27" cy="14" rx="6" ry="16" fill="${PENG}" stroke="#3b4b59" stroke-width="1.5"/>
  <ellipse cx="-10" cy="-12" rx="7.5" ry="8.5" fill="#fff"/><ellipse cx="5" cy="-12" rx="7.5" ry="8.5" fill="#fff"/>
  <g class="peng-eyes"><circle cx="-12" cy="-11" r="3" fill="${INK}"/><circle cx="3" cy="-11" r="3" fill="${INK}"/></g>
  <g class="peng-dizzy"><path d="M-15 -15 l8 8 m0 -8 l-8 8" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M0 -15 l8 8 m0 -8 l-8 8" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/></g>
  <path d="M-17 -25 L-4 -19" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M12 -25 L0 -19" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M-27 -5 L-9 -9 L-9 3 Z" fill="${ORANGE}"/>
  <g class="stars"><path d="M-14 -40 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5z" fill="${YELLOW}"/><path d="M12 -44 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z" fill="${YELLOW}"/><path d="M-2 -52 l1.6 3.2 3.2 1.6 -3.2 1.6 -1.6 3.2 -1.6 -3.2 -3.2 -1.6 3.2 -1.6z" fill="#fff"/></g>
</g></g>`;

const svg = (mode, label, body) =>
  `<svg class="scene scene-${mode}" viewBox="0 0 200 120" role="img" aria-label="${label}" focusable="false">${body}</svg>`;

const parse = (markup) => {
  const tpl = document.createElement("template");
  tpl.innerHTML = markup.trim();
  return tpl.content.firstElementChild;
};

const GROUND = `<g class="ground"><path d="M10 114 H190" stroke="#37464f" stroke-width="3" stroke-linecap="round" stroke-dasharray="14 10"/></g>`;

// mode: "bonk" (Wulf wins), "taunt" (Pingo wins the round), "chase" (loading), "idle"
export function scene(mode = "idle", { small = false } = {}) {
  const labels = {
    bonk: "Wulf the wolf bonks Pingo the penguin on the head",
    taunt: "Pingo the penguin laughs at Wulf the wolf",
    chase: "Wulf the wolf chases Pingo the penguin",
    idle: "Wulf the wolf and Pingo the penguin",
  };
  const text = mode === "bonk" ? `<text class="bonk" x="100" y="20" text-anchor="middle">BONK!</text>` : "";
  const body = `${GROUND}<g transform="translate(52 54)">${WOLF}</g><g transform="translate(152 66)">${PENGUIN}</g>${text}`;
  const el = parse(svg(mode, labels[mode], body));
  if (small) el.classList.add("scene-sm");
  return el;
}

export const STORY = {
  prologue: "Pingo the penguin stole the Great Dictionary. Wulf the wolf will win every word back.",
  chapters: [
    "Pingo hid the first pages in the Frozen Café. Wulf follows the paw prints.",
    "A snowstorm of verbs! Pingo slides away, but Wulf is faster on his feet.",
    "Pingo swapped the street signs for tricky prepositions. Wulf reads them all.",
    "At the Midnight Market, Pingo sells fake idioms. Wulf spots every one.",
    "Pingo built a fortress of phrasal verbs. Wulf climbs it one verb at a time.",
    "Deep in the Archive, Pingo shuffles the tenses. Wulf puts them back in order.",
    "Pingo hired a choir of connectors to confuse the wolf. Wulf is not fooled.",
    "On the Glass Bridge, every collocation must be perfect. Wulf does not blink.",
    "Pingo plays his last card: formal register. Wulf answers in perfect style.",
    "The final page is within reach. One last BONK and the Dictionary is home.",
  ],
};

export const storyLine = (unitIndex) => STORY.chapters[Math.max(0, Math.min(STORY.chapters.length - 1, unitIndex))];

export function loadingScene(message = "Waking up the server…") {
  const wrap = document.createElement("main");
  wrap.className = "splash";
  const lines = [STORY.prologue, ...STORY.chapters];
  const quote = document.createElement("p");
  quote.className = "splash-story";
  quote.textContent = STORY.prologue;
  const status = document.createElement("p");
  status.className = "splash-status";
  status.textContent = message;
  wrap.append(scene("chase"), quote, status);
  let i = 0;
  const timer = setInterval(() => {
    if (!wrap.isConnected) return clearInterval(timer);
    i = (i + 1) % lines.length;
    quote.textContent = lines[i];
  }, 4200);
  return wrap;
}
