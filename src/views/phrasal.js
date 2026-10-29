import { api } from "../api.js";
import { h, toast } from "../dom.js";
import { icon } from "../icons.js";
import { speak } from "../audio.js";
import { labFrame } from "./labs.js";
import { phrasalVerbs, phrasalOfDay, verbForms } from "../../content/phrasal-verbs.js";

const DAY = 24 * 3600 * 1000;
const shuffle = (list) => list.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);
const others = (entry, n) => shuffle(phrasalVerbs.filter((p) => p.pv !== entry.pv)).slice(0, n);

// The example with the phrasal verb (in whatever tense it appears) replaced by a blank.
function blanked(entry) {
  const [, ...rest] = entry.pv.split(" ");
  const re = new RegExp(`\\b(${verbForms(entry).join("|")})\\b((?:\\s+[a-z']+){0,3}?)\\s+${rest.join("\\s+")}\\b`, "i");
  return entry.ex.replace(re, (m, verb, middle) => (middle ? `___${middle} ___` : "_____"));
}

function questions(entry) {
  const choice = (q, right, wrong) => {
    const options = shuffle([right, ...wrong]);
    return { q, options, a: options.indexOf(right) };
  };
  return [
    choice(`What does “${entry.pv}” mean?`, entry.meaning, others(entry, 3).map((p) => p.meaning)),
    choice(`Complete the sentence: “${blanked(entry)}”`, entry.pv, others(entry, 3).map((p) => p.pv)),
    choice(`Which phrasal verb means “${entry.es}”?`, entry.pv, others(entry, 3).map((p) => p.pv)),
  ];
}

export async function phrasalView(root, ctx) {
  const entry = phrasalOfDay();
  const quiz = questions(entry);
  let answered = 0;
  let correct = 0;
  const done = h("div", { class: "stack", hidden: true },
    h("p", { class: "tip-box" }, ""),
    h("a", { class: "key key-primary wide", href: "#/speaking" }, icon("MessageCircle", 20), "Use it in Speaking"));

  const quizEl = h("ol", { class: "pv-quiz" }, quiz.map((item) => {
    const buttons = item.options.map((text, i) => h("button", {
      class: "choice", type: "button",
      onClick: async () => {
        if (li.dataset.done) return;
        li.dataset.done = "1";
        buttons.forEach((b, j) => { b.disabled = true; if (j === item.a) b.classList.add("correct"); });
        if (i === item.a) correct += 1; else buttons[i].classList.add("wrong");
        answered += 1;
        if (answered === quiz.length) {
          done.hidden = false;
          done.firstChild.textContent = `${correct} of ${quiz.length} correct. Now say it out loud: use “${entry.pv}” in today's speaking answer and the coach will check it.`;
          try { const res = await api("/lab", { kind: "phrasal", ref: entry.pv }); toast(`+${res.xp} XP`); } catch (e) { toast(e.message); }
        }
      },
    }, text));
    const li = h("li", {}, h("p", { class: "pv-q" }, item.q), h("div", { class: "choices" }, buttons));
    return li;
  }));

  const past = Array.from({ length: 6 }, (_, i) => phrasalOfDay(new Date(Date.now() - (i + 1) * DAY)));

  labFrame(root, ctx, "Phrasal verb of the day",
    h("section", { class: "pv-card" },
      h("div", { class: "pv-head" }, h("span", { class: "tag" }, entry.level), h("small", {}, new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }))),
      h("h2", { class: "pv-word" }, entry.pv),
      h("p", { class: "pv-meaning" }, entry.meaning),
      h("p", { class: "pv-es" }, h("small", {}, "En español: "), entry.es),
      h("div", { class: "pv-example" },
        h("p", {}, `“${entry.ex}”`),
        h("button", { class: "icon-btn", type: "button", "aria-label": "Listen to the example", onClick: () => speak(entry.ex) }, icon("Volume2", 22))),
      h("p", { class: "muted pv-forms" }, `Forms: ${verbForms(entry).join(" · ")} + ${entry.pv.split(" ").slice(1).join(" ")}`)),
    h("h3", {}, "Quick check"),
    quizEl,
    done,
    h("h3", {}, "Previous days"),
    h("ul", { class: "pv-past" }, past.map((p) => h("li", {}, h("b", {}, p.pv), h("span", {}, `${p.meaning} · ${p.es}`)))));
}
