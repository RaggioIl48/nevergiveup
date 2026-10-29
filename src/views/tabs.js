import { api } from "../api.js";
import { h } from "../dom.js";
import { icon } from "../icons.js";
import { scene, storyLine } from "../mascot.js";
import { units, lessonOrder } from "../../content/index.js";
import { writingPrompts } from "../../content/labs.js";
import { phrasalOfDay } from "../../content/phrasal-verbs.js";

const MASTERY = 80;

function unlocked(me, id) {
  const index = lessonOrder.indexOf(id);
  if (index <= 0 || index <= me.user.startIndex) return true;
  return (me.progress[lessonOrder[index - 1]] ?? 0) >= MASTERY;
}

function stats(me) {
  const pct = Math.min(100, Math.round((me.todayXp / me.dailyGoal) * 100));
  return h("header", { class: "stats" },
    h("div", { class: "chip streak" }, icon("Flame", 22), h("b", {}, me.streak), h("span", { class: "sr" }, " day streak")),
    h("div", { class: "chip xp" }, icon("Zap", 22), h("b", {}, me.xp), h("span", { class: "sr" }, " XP")),
    h("div", { class: "goal" },
      h("div", { class: "goal-label" }, icon("Target", 18), `Today's goal: ${Math.min(me.todayXp, me.dailyGoal)}/${me.dailyGoal} XP`),
      h("div", { class: "progress-track", role: "progressbar", "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": "Daily goal" }, h("div", { class: "progress-fill", style: `width:${pct}%` }))));
}

function nextLessonId(me) {
  for (const id of lessonOrder) {
    if (unlocked(me, id) && (me.progress[id] ?? 0) < MASTERY) return id;
  }
  return lessonOrder[0];
}

export async function homeView(root, ctx) {
  const me = await ctx.refresh();
  const nextId = nextLessonId(me);
  const nextLesson = lessonOrder.includes(nextId)
    ? units.flatMap((u) => u.lessons).find((l) => l.id === nextId)
    : null;
  root.append(stats(me));
  root.append(h("section", { class: "focus-card" },
    h("div", { class: "focus-head" }, h("small", {}, "Suggested session · 12 min"), h("span", { class: "focus-level" }, me.user.level || "A2")),
    h("h2", {}, me.dueCount > 0 ? "Review mistakes and reinforce" : "Continue your path to B2"),
    h("p", {}, me.dueCount > 0
    ? `You have ${me.dueCount} ${me.dueCount === 1 ? "question" : "questions"} due for review.`
    : nextLesson ? `Up next: ${nextLesson.title}.` : "Keep going with your next unlocked lesson."),
    h("a", { class: "key key-primary wide", href: me.dueCount > 0 ? "#/review" : `#/lesson/${nextId}` }, me.dueCount > 0 ? "Start review" : "Start practice")));
  const pv = phrasalOfDay();
  root.append(h("a", { class: "pv-tile", href: "#/phrasal" }, h("span", { class: "row-icon" }, icon("BookOpen", 26)), h("span", { class: "row-text" }, h("small", {}, "Phrasal verb of the day"), h("b", {}, pv.pv), h("span", {}, pv.meaning)), icon("ChevronRight", 22)));
  const hasLevel = Boolean(me.user.level);
  const chapter = Math.max(0, units.findIndex((u) => u.lessons.some((l) => l.id === nextId)));
  root.append(h("div", { class: "duo" },
    h("a", { class: "tile", href: "#/diagnostic" },
      h("small", {}, hasLevel ? `Level ${me.user.level} \u00b7 Goal B2` : "Level check"),
      h("b", {}, hasLevel ? "Retake check" : "Find my level")),
    h("a", { class: "tile", href: "#/review" },
      h("small", {}, "Review"),
      h("b", {}, me.dueCount > 0 ? `${me.dueCount} due` : "Nothing due"))));
  root.append(h("section", { class: "story-card" }, scene("idle"), h("div", {}, h("small", {}, `Chapter ${chapter + 1} · Wulf vs Pingo`), h("p", {}, storyLine(chapter)))));
  root.append(h("div", { class: "section-head" }, h("h2", {}, "Your path to B2"), h("span", {}, `${Object.keys(me.progress).length} lessons tracked`)));
  const unitOf = (id) => units.find((u) => u.lessons.some((l) => l.id === id))?.id;
  const currentUnit = unitOf(nextId) || units[0].id;
  for (const unit of units) {
    const done = unit.lessons.filter((l) => me.progress[l.id] >= MASTERY).length;
    root.append(h("details", { class: "unit", open: unit.id === currentUnit },
      h("summary", { class: "unit-head" },
        h("span", { class: "unit-title" }, h("b", {}, `${unit.id.slice(1)} · ${unit.title}`), h("small", {}, unit.focus)),
        h("span", { class: "unit-count" }, `${done}/${unit.lessons.length}`),
        icon("ChevronRight", 20)),
      h("ol", { class: "path" }, unit.lessons.map((lesson, i) => {
        const open = unlocked(me, lesson.id);
        const best = me.progress[lesson.id];
        const mastered = best >= MASTERY;
        const state = mastered ? "done" : open ? "open" : "locked";
        const node = h(open ? "a" : "span", {
          class: `node ${state}`, href: open ? `#/lesson/${lesson.id}` : undefined,
          "aria-label": `${lesson.title}. ${mastered ? `Mastered: ${best}%` : open ? "Available" : "Locked"}`,
          "aria-disabled": open ? undefined : "true",
        }, icon(mastered ? "Check" : open ? "Play" : "Lock", 32));
        return h("li", { class: `path-item offset-${i % 3}` }, node, h("span", { class: "node-title" }, lesson.title), best != null ? h("span", { class: "node-best" }, `${best}%`) : null);
      }))));
  }
}

export async function practiceView(root, ctx) {
  const me = await ctx.refresh();
  const rows = [
    ["#/phrasal", "BookOpen", "Phrasal verb of the day", `Today: ${phrasalOfDay().pv}`],
    ["#/speaking", "MessageCircle", "Speaking", "TOEFL/IELTS-style prompts with prep time"],
    ["#/listening", "Headphones", "Listening", "Free practice with real and synthetic voices"],
    ["#/exams", "Headphones", "Listening exams", "Timed TOEFL, IELTS and Cambridge style tests"],
    ["#/songs", "Music", "Songs", "Fill in the missing words of real songs"],
    ["#/writing", "PenLine", "Handwriting", "Write on paper or screen and get feedback"],
    ["#/review", "RotateCcw", "Review", me.dueCount ? `${me.dueCount} questions to review today` : "Your mistakes return here when it is time to review"],
  ];
  root.append(h("h1", { class: "title" }, "Practice"),
    h("ul", { class: "rows" }, rows.map(([href, name, title, text]) =>
      h("li", {}, h("a", { class: "row", href }, h("span", { class: "row-icon" }, icon(name, 28)), h("span", { class: "row-text" }, h("b", {}, title), h("small", {}, text)), icon("ChevronRight", 22))))));
}

export async function rankView(root, ctx) {
  const { rows } = await api("/leaderboard");
  root.append(h("h1", { class: "title" }, "Weekly leaderboard"),
    h("p", { class: "muted" }, "XP earned in the last 7 days."),
    h("ol", { class: "board" }, rows.map((r, i) =>
      h("li", { class: r.you ? "you" : "" }, h("span", { class: "pos" }, i + 1), h("span", { class: "who" }, r.name, r.level ? h("small", {}, ` · ${r.level}`) : null), h("b", {}, `${r.xp} XP`)))));
}

const SKILL_NAMES = { grammar: "Grammar", vocab: "Vocabulary", reading: "Reading", listening: "Listening" };

export async function meView(root, ctx) {
  const me = await ctx.refresh();
  const { entries } = await api("/writing");
  const health = await api("/health").catch(() => null);
  const max = Math.max(30, ...me.week.map((d) => d.xp));
  const saving = health?.backup?.problem
    ? h("p", { class: "storage-warn", role: "status" }, h("b", {}, "Accounts are not being saved. "), health.backup.problem)
    : health?.backup?.lastSavedAt ? h("p", { class: "muted storage-ok" }, `Progress saved · ${new Date(health.backup.lastSavedAt).toLocaleString()}`) : "";
  root.append(
    saving,
    h("h1", { class: "title" }, me.user.name),
    h("p", { class: "muted" }, me.user.level ? `Estimated level: ${me.user.level}` : "Not assessed yet"),
    stats(me),
    h("section", { class: "block" }, h("h2", {}, "This week"),
      h("ul", { class: "week" }, me.week.map((d) =>
        h("li", {}, h("div", { class: "bar", role: "img", "aria-label": `${d.xp} XP on ${d.day}` }, h("div", { class: "bar-fill", style: `height:${Math.round((d.xp / max) * 100)}%` })), h("small", {}, ["S", "M", "T", "W", "T", "F", "S"][new Date(`${d.day}T12:00:00`).        getDay()]))))),
    me.user.skills ? h("section", { class: "block" }, h("h2", {}, "Skill breakdown"),
      h("ul", { class: "skills" }, Object.entries(me.user.skills).map(([k, v]) =>
        h("li", {}, h("span", {}, SKILL_NAMES[k] || k), h("div", { class: "progress-track" }, h("div", { class: "progress-fill", style: `width:${v}%` })), h("b", {}, `${v}%`))))) : "",
    h("section", { class: "block" }, h("h2", {}, "Recent writing"),
      entries.length ? h("ul", { class: "history" }, entries.slice(0, 5).map((e) => h("li", {}, `${writingPrompts.find((p) => p.id === e.promptId)?.type ?? "Text"} · ${e.words} words · ${e.score ? `score ${e.score}` : "not graded"}`))) : h("p", { class: "muted" }, "No saved writing yet.")),
    h("div", { class: "stack" },
      h("button", { class: "key key-quiet wide", type: "button", onClick: async () => { await api("/logout", {}); ctx.me = null; ctx.go("#/home"); } }, icon("LogOut", 20), "Log out")));
}
