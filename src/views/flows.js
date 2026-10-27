import { api } from "../api.js";
import { h, mount } from "../dom.js";
import { icon } from "../icons.js";
import { runPlayer, lessonSource, diagnosticSource } from "./player.js";
import { lessonIndex, itemIndex, diagnostic, lessonOrder } from "../../content/index.js";
import { DIAGNOSTIC_LENGTH } from "../../content/diagnostic.js";

function resultScreen(root, { title, lines, primary, secondary, tone = "good" }) {
  mount(root, h("main", { class: `result ${tone}` },
    h("div", { class: "result-badge" }, icon(tone === "good" ? "Check" : "RotateCcw", 56)),
    h("h1", {}, title),
    h("ul", { class: "result-lines" }, lines.map((l) => h("li", {}, l))),
    h("div", { class: "stack" }, primary, secondary)));
}

export async function lessonView(root, ctx, id) {
  const lesson = lessonIndex.get(id);
  if (!lesson) return ctx.go("#/home");
  const source = lessonSource(lesson.exercises);
  const exit = () => ctx.go("#/home");
  runPlayer({
    root, source, onExit: exit,
    onFinish: async () => {
      try {
        const res = await api("/lesson", { lessonId: id, results: source.results() });
        ctx.me = res;
        const next = lessonOrder[lessonOrder.indexOf(id) + 1];
        resultScreen(root, {
          title: res.mastered ? "Lesson mastered" : "Not mastered yet",
          tone: res.mastered ? "good" : "retry",
          lines: [`First-try score: ${res.score}%`, `+${res.gained} XP`, res.mastered ? "Next lesson unlocked." : "Score 80% to move on. Review and try again."],
          primary: res.mastered && next
            ? h("a", { class: "key key-primary wide", href: `#/lesson/${next}` }, "Next lesson")
            : h("a", { class: "key key-primary wide", href: `#/lesson/${id}` }, "Retry lesson"),
          secondary: h("a", { class: "key key-quiet wide", href: "#/home" }, "Back to path"),
        });
      } catch (e) {
        resultScreen(root, { title: "Could not save", tone: "retry", lines: [e.message], primary: h("a", { class: "key key-primary wide", href: "#/home" }, "Back") });
      }
    },
  });
}

export async function diagnosticView(root, ctx) {
  mount(root, h("main", { class: "intro" },
    h("h1", {}, "Level check"),
    h("p", {}, `${DIAGNOSTIC_LENGTH} adaptive questions: get one right and they get harder. Answers are revealed at the end.`),
    h("p", { class: "muted" }, "Covers grammar, vocabulary, reading, and listening. Do not guess—choose your best answer."),
    h("div", { class: "stack" },
      h("button", { class: "key key-primary wide", type: "button", id: "go" }, "Start"),
      h("a", { class: "key key-quiet wide", href: "#/home" }, "Not now"))));
  document.getElementById("go").addEventListener("click", () => {
    const source = diagnosticSource(diagnostic, DIAGNOSTIC_LENGTH);
    runPlayer({
      root, source, quiet: true, onExit: () => ctx.go("#/home"),
      onFinish: async () => {
        try {
          const res = await api("/diagnostic", { results: source.results() });
          await ctx.refresh();
          resultScreen(root, {
            title: `Your estimated level: ${res.level}`,
            lines: ["This is an estimate, not an official score.", res.startIndex > 0 ? "More advanced lessons are now unlocked." : "You will start with the basics to strengthen your B1."],
            primary: h("a", { class: "key key-primary wide", href: "#/home" }, "View my path"),
          });
        } catch (e) {
          resultScreen(root, { title: "Could not save", tone: "retry", lines: [e.message], primary: h("a", { class: "key key-primary wide", href: "#/home" }, "Back") });
        }
      },
    });
  });
}

export async function reviewView(root, ctx) {
  const { ids } = await api("/review");
  const exercises = ids.map((id) => itemIndex.get(id)).filter(Boolean);
  if (!exercises.length) {
    return resultScreen(root, { title: "Nothing to review right now", lines: ["Your mistakes will return here when it is time to review them."], primary: h("a", { class: "key key-primary wide", href: "#/practice" }, "Back") });
  }
  const source = lessonSource(exercises);
  runPlayer({
    root, source, onExit: () => ctx.go("#/practice"),
    onFinish: async () => {
      const res = await api("/review", { results: source.results() }).catch(() => ({ xp: 0 }));
      resultScreen(root, {
        title: "Review complete", lines: [`+${res.xp} XP`],
        primary: h("a", { class: "key key-primary wide", href: "#/practice" }, "Continue"),
      });
    },
  });
}
