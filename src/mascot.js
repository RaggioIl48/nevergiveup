// Wulf the wolf (yellow sweater, red scarf) vs Pingo the penguin, the thief of the Great Dictionary.
// Sticker style: every shape has the same ink outline; class names are the hooks for the CSS animations.
const INK = "#1b2340";
const FUR = "#93a3b3";
const FUR_DARK = "#6f8091";
const FUR_LIGHT = "#eef2f6";
const PINK = "#f4a6a0";
const YELLOW = "#ffc93c";
const YELLOW_DARK = "#e9a400";
const RED = "#e63946";
const PENG = "#253552";
const ORANGE = "#ff9b21";
const ORANGE_DARK = "#e07400";
const OUTLINE = `stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;

// A limb drawn as a thick ink stroke with a thinner colored stroke on top, so it gets the same outline.
const limb = (d, color, width = 11) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${width + 4.4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;

const WOLF = `
<g class="wolf-move">
  <ellipse class="shadow" cx="2" cy="58.5" rx="25" ry="3.5" fill="${INK}" opacity="0.13"/>
  <g class="wolf-bob" ${OUTLINE}>
    <g class="tail">
      <path d="M-16 36 C-34 38 -48 24 -44 6 C-42 -2 -36 -6 -31 -4 C-36 8 -30 20 -14 24 Z" fill="${FUR}"/>
      <path d="M-44 6 C-42 -2 -36 -6 -31 -4 C-34 2 -35 8 -33 13 C-38 13 -42 10 -44 6 Z" fill="${FUR_LIGHT}"/>
    </g>
    <g class="scarf-end">
      <path d="M-10 4 C-18 9 -28 8 -36 3 L-34 12 C-26 16 -17 15 -9 11 Z" fill="${RED}"/>
      <path d="M-36 3 L-40 1 M-35 7.5 L-40 7 M-34 12 L-38 14" fill="none"/>
    </g>
    <g class="leg leg-a"><rect x="-15" y="40" width="11" height="14" rx="5" fill="${FUR_DARK}"/><path d="M-18 52 H-5 A3.5 3.5 0 0 1 -5 59 H-18 A3.5 3.5 0 0 1 -18 52 Z" fill="${RED}"/></g>
    <g class="leg leg-b"><rect x="3" y="40" width="11" height="14" rx="5" fill="${FUR_DARK}"/><path d="M3 52 H16 A3.5 3.5 0 0 1 16 59 H3 A3.5 3.5 0 0 1 3 52 Z" fill="${RED}"/></g>
    <g class="back-arm">${limb("M-17 14 C-25 20 -27 30 -24 37", YELLOW)}<circle cx="-24" cy="39" r="5.8" fill="${FUR}"/></g>
    <path d="M-19 6 C-25 18 -26 36 -21 46 C-14 53 14 53 21 46 C26 36 25 18 19 6 C10 1 -10 1 -19 6 Z" fill="${YELLOW}"/>
    <path d="M-23.6 24 C-12 28.5 12 28.5 23.6 24 L24.4 31 C12 35.5 -12 35.5 -24.4 31 Z" fill="${RED}" stroke="none"/>
    <path d="M-21 46 C-14 53 14 53 21 46 L22.4 41 C14 47.5 -14 47.5 -22.4 41 Z" fill="${YELLOW_DARK}"/>
    <path d="M-19 6 C-25 18 -26 36 -21 46 C-14 53 14 53 21 46 C26 36 25 18 19 6" fill="none"/>
    <path d="M-17 2 C-8 8 8 8 17 2 C20 -2 19 -6 17 -7 C8 -2 -8 -2 -17 -7 C-19 -6 -20 -2 -17 2 Z" fill="${RED}"/>
    <g class="arm">${limb("M14 12 C22 14 30 14 39 12", YELLOW)}<path d="M33 6.5 L33 17.5" stroke="${RED}" stroke-width="4"/><circle cx="44" cy="12" r="6.5" fill="${FUR}"/></g>
    <g class="wolf-head">
      <path d="M-6 -46 L-2 -55 L2 -47 L7 -54 L10 -45 Z" fill="${FUR}"/>
      <path d="M-22 -30 L-25 -58 L-6 -43 Z" fill="${FUR}"/><path d="M-19 -36 L-21 -51 L-10 -43 Z" fill="${PINK}" stroke="none"/>
      <path d="M11 -43 L27 -58 L28 -31 Z" fill="${FUR}"/><path d="M14.5 -42.5 L24.5 -52 L25 -36 Z" fill="${PINK}" stroke="none"/>
      <path d="M-26 -22 C-28 -38 -16 -48 2 -48 C20 -48 30 -38 28 -24 C30 -16 26 -8 18 -4 C10 1 -8 1 -18 -4 L-24 -2 L-23 -8 L-30 -10 L-26 -15 Z" fill="${FUR}"/>
      <path d="M2 -18 C6 -26 22 -26 32 -20 C38 -17 38 -10 32 -7 C24 -2 8 -2 2 -8 C0 -11 0 -15 2 -18 Z" fill="${FUR_LIGHT}"/>
      <path d="M31 -22.5 C35.5 -23.5 39.5 -21 38.4 -17.6 C37.4 -14.8 33 -14.8 31 -17 C29.4 -18.8 29.4 -21.6 31 -22.5 Z" fill="${INK}"/>
      <ellipse cx="34" cy="-20.6" rx="1.6" ry="1" fill="#fff" stroke="none"/>
      <path class="smile" d="M18 -9.5 Q24 -4.5 30.5 -10" fill="none"/>
      <ellipse cx="-14" cy="-17" rx="4.2" ry="2.5" fill="${PINK}" opacity="0.75" stroke="none"/>
      <g class="eyes">
        <ellipse cx="-6" cy="-30" rx="6" ry="7" fill="#fff"/><ellipse cx="10" cy="-31" rx="6" ry="7" fill="#fff"/>
        <circle cx="-3.6" cy="-29.4" r="3.6" fill="${INK}" stroke="none"/><circle cx="12.4" cy="-30.4" r="3.6" fill="${INK}" stroke="none"/>
        <circle cx="-2.4" cy="-31" r="1.3" fill="#fff" stroke="none"/><circle cx="13.6" cy="-32" r="1.3" fill="#fff" stroke="none"/>
      </g>
      <path class="brows" d="M-12 -40.5 Q-6 -43 -1 -39.5 M5 -40.5 Q11 -44 16.5 -40.5" fill="none" stroke-width="2.6"/>
      <path class="sweat" d="M-28 -46 C-25 -41 -24.5 -38 -28 -36.5 C-31.5 -38 -31 -41 -28 -46 Z" fill="#9edbff" stroke-width="1.5"/>
    </g>
  </g>
</g>`;

const PENGUIN = `
<g class="peng-move">
  <ellipse class="shadow" cx="0" cy="47.5" rx="23" ry="3.5" fill="${INK}" opacity="0.13"/>
  <g class="peng-squash" ${OUTLINE}>
    <path class="foot foot-a" d="M-17 41 C-22 45 -18 48.5 -9 48.5 C-4 48.5 -3.5 44 -8 41 Z" fill="${ORANGE}"/>
    <path class="foot foot-b" d="M4 41 C2 45 4.5 48.5 13 48.5 C19 48.5 19 44.5 13 41 Z" fill="${ORANGE}"/>
    <g class="book">
      <rect x="18" y="4" width="18" height="23" rx="2.5" fill="#8a4f2a" transform="rotate(14 33 15) translate(6 0)"/>
      <path d="M21.5 6.5 L21 24.5" stroke="#f5e6c8" stroke-width="2" transform="rotate(14 33 15) translate(6 0)"/>
      <text x="29" y="20" font-size="9" font-weight="800" fill="${YELLOW}" stroke="none" text-anchor="middle" transform="rotate(14 33 15) translate(6 0)">Aa</text>
    </g>
    <path d="M0 -31 C18 -31 26 -10 26 12 C26 34 16 44 0 44 C-16 44 -26 34 -26 12 C-26 -10 -18 -31 0 -31 Z" fill="${PENG}"/>
    <path d="M-4 -4 C10 -4 18 8 18 21 C18 34 10 41 -3 41 C-15 41 -21 33 -21 21 C-21 8 -16 -4 -4 -4 Z" fill="#fff" stroke="none"/>
    <path class="flip flip-a" d="M-23 -2 C-34 6 -37 18 -33 25 C-28 22 -24 14 -21 7 Z" fill="${PENG}"/>
    <path class="flip flip-b" d="M23 -2 C31 6 34 15 32 22 C26 19 23 12 21 6 Z" fill="${PENG}"/>
    <ellipse cx="-12.5" cy="-15.5" rx="6.2" ry="7.2" fill="#fff"/><ellipse cx="3" cy="-15.5" rx="6.2" ry="7.2" fill="#fff"/>
    <g class="peng-eyes">
      <circle cx="-14.6" cy="-14.6" r="3.6" fill="${INK}" stroke="none"/><circle cx="0.9" cy="-14.6" r="3.6" fill="${INK}" stroke="none"/>
      <circle cx="-13.4" cy="-16.2" r="1.3" fill="#fff" stroke="none"/><circle cx="2.1" cy="-16.2" r="1.3" fill="#fff" stroke="none"/>
    </g>
    <g class="peng-dizzy" fill="none" stroke-width="1.6">
      <path d="M-12.5 -15.5 m-1.2 0 a1.2 1.2 0 1 1 1.2 1.2 a2.4 2.4 0 1 1 2.4 -2.4 a3.6 3.6 0 1 1 -3.6 3.6"/>
      <path d="M3 -15.5 m-1.2 0 a1.2 1.2 0 1 1 1.2 1.2 a2.4 2.4 0 1 1 2.4 -2.4 a3.6 3.6 0 1 1 -3.6 3.6"/>
    </g>
    <path d="M-19 -26 Q-14 -24 -8.5 -24.5 M-2 -26.5 Q3 -30.5 8.5 -27" fill="none" stroke="#fff" stroke-width="2.4"/>
    <ellipse cx="7" cy="-8" rx="3.4" ry="2" fill="${PINK}" opacity="0.8" stroke="none"/>
    <path class="beak-low" d="M-9 -7 C-14 -6 -20 -6 -23 -6 C-19.5 -2.5 -13.5 -1.5 -9.5 -4 Z" fill="${ORANGE_DARK}"/>
    <path d="M-9.5 -12.5 C-15 -12.5 -23 -10.5 -26 -7 C-20 -5.5 -14 -5.5 -8.5 -7 Z" fill="${ORANGE}"/>
    <g class="stars" stroke-width="1.5">
      <path d="M-14 -40 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5z" fill="${YELLOW}"/>
      <path d="M12 -44 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z" fill="${YELLOW}"/>
      <path d="M-2 -52 l1.6 3.2 3.2 1.6 -3.2 1.6 -1.6 3.2 -1.6 -3.2 -3.2 -1.6 3.2 -1.6z" fill="#fff"/>
    </g>
  </g>
  <text class="haha" x="10" y="-38" text-anchor="middle">HA HA</text>
</g>`;

const svg = (mode, label, body) =>
  `<svg class="scene scene-${mode}" viewBox="0 0 200 120" role="img" aria-label="${label}" focusable="false">${body}</svg>`;

const parse = (markup) => {
  const tpl = document.createElement("template");
  tpl.innerHTML = markup.trim();
  return tpl.content.firstElementChild;
};

const GROUND = `<g class="ground">
  <path class="ground-hill" d="M0 116 Q100 109 200 116 L200 121 L0 121 Z" fill="#ebe3d1"/>
  <path class="ground-dash" d="M6 116 H194" stroke="#d3c8b0" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 18"/>
</g>`;
const SPEED = `<g class="speed" stroke="#cfc4ab" stroke-width="3" stroke-linecap="round"><path d="M2 66 h14 M-4 80 h18 M4 94 h12"/><path d="M110 74 h12 M104 88 h16"/></g>`;
const IMPACT = `<path class="impact" d="M146 30 l4 -9 2 9 8 -5 -4 8 9 2 -9 3 5 8 -8 -4 -2 9 -3 -9 -8 4 4 -8 -9 -3 9 -2 -4 -8z" fill="${YELLOW}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;

// mode: "bonk" (Wulf wins), "taunt" (Pingo wins the round), "chase" (loading), "idle"
export function scene(mode = "idle", { small = false } = {}) {
  const labels = {
    bonk: "Wulf the wolf bonks Pingo the penguin on the head",
    taunt: "Pingo the penguin laughs at Wulf the wolf",
    chase: "Wulf the wolf chases Pingo the penguin",
    idle: "Wulf the wolf and Pingo the penguin",
  };
  const text = mode === "bonk" ? `<text class="bonk" x="172" y="16" text-anchor="middle">BONK!</text>` : "";
  const body = `${GROUND}${SPEED}<g transform="translate(150 66)">${PENGUIN}</g><g transform="translate(52 54)">${WOLF}</g>${IMPACT}${text}`;
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
