import { api } from "../api.js";
import { h } from "../dom.js";
import { icon } from "../icons.js";
import { units, lessonOrder } from "../../content/index.js";
import { writingPrompts } from "../../content/labs.js";

const MASTERY = 80;

function unlocked(me, id) {
  const index = lessonOrder.indexOf(id);
  if (index <= 0 || index <= me.user.startIndex) return true;
  return (me.progress[lessonOrder[index - 1]] ?? 0) >= MASTERY;
}

function stats(me) {
  const pct = Math.min(100, Math.round((me.todayXp / me.dailyGoal) * 100));
  return h("header", { class: "stats" },
    h("div", { class: "chip streak" }, icon("Flame", 22), h("b", {}, me.streak), h("span", { class: "sr" }, " días de racha")),
    h("div", { class: "chip xp" }, icon("Zap", 22), h("b", {}, me.xp), h("span", { class: "sr" }, " XP")),
    h("div", { class: "goal" },
      h("div", { class: "goal-label" }, icon("Target", 18), `Meta de hoy: ${Math.min(me.todayXp, me.dailyGoal)}/${me.dailyGoal} XP`),
      h("div", { class: "progress-track", role: "progressbar", "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": "Meta diaria" }, h("div", { class: "progress-fill", style: `width:${pct}%` }))));
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
    h("div", { class: "focus-head" }, h("small", {}, "Sesión sugerida · 12 min"), h("span", { class: "focus-level" }, me.user.level || "B1")),
    h("h2", {}, me.dueCount > 0 ? "Recupera errores y consolida" : "Continúa tu ruta hacia B2"),
    h("p", {}, me.dueCount > 0
    ? `Tienes ${me.dueCount} ${me.dueCount === 1 ? "pregunta pendiente" : "preguntas pendientes"} en repaso espaciado.`
    : nextLesson ? `Siguiente objetivo: ${nextLesson.title}.` : "Sigue con tu siguiente lección desbloqueada."),
    h("a", { class: "key key-primary wide", href: me.dueCount > 0 ? "#/review" : `#/lesson/${nextId}` }, me.dueCount > 0 ? "Empezar repaso" : "Empezar práctica")));
  if (!me.user.level) {
    root.append(h("section", { class: "banner" },
    h("h2", {}, "Empieza con el diagnóstico"),
      h("p", {}, "20 preguntas adaptativas (unos 8 minutos) para saber tu nivel y dónde comenzar."),
      h("a", { class: "key key-primary", href: "#/diagnostic" }, "Hacer diagnóstico")));
  } else {
    root.append(h("p", { class: "level-line" }, "Tu nivel estimado: ", h("b", {}, me.user.level), " · Meta: B2"));
  }
  root.append(h("div", { class: "section-head" }, h("h2", {}, "Ruta B2"), h("span", {}, `${Object.keys(me.progress).length} lecciones con registro`)));
  for (const unit of units) {
    root.append(h("section", { class: "unit" },
      h("h2", {}, `${unit.id.slice(1)} · ${unit.title}`),
      h("p", { class: "muted" }, unit.focus),
      h("ol", { class: "path" }, unit.lessons.map((lesson, i) => {
        const open = unlocked(me, lesson.id);
        const best = me.progress[lesson.id];
        const mastered = best >= MASTERY;
        const state = mastered ? "done" : open ? "open" : "locked";
        const node = h(open ? "a" : "span", {
          class: `node ${state}`, href: open ? `#/lesson/${lesson.id}` : undefined,
          "aria-label": `${lesson.title}. ${mastered ? `Dominada ${best}%` : open ? "Disponible" : "Bloqueada"}`,
          "aria-disabled": open ? undefined : "true",
        }, icon(mastered ? "Check" : open ? "Play" : "Lock", 32));
        return h("li", { class: `path-item offset-${i % 3}` }, node, h("span", { class: "node-title" }, lesson.title), best != null ? h("span", { class: "node-best" }, `${best}%`) : null);
      }))));
  }
}

export async function practiceView(root, ctx) {
  const me = await ctx.refresh();
  const rows = [
    ["#/speaking", "MessageCircle", "Hablar", "Preguntas tipo TOEFL/IELTS con tiempo de preparación"],
    ["#/listening", "Headphones", "Escuchar", "Textos con preguntas de comprensión"],
    ["#/writing", "PenLine", "Escribir a mano", "Escribe en papel o pantalla y recibe revisión"],
    ["#/review", "RotateCcw", "Repaso", me.dueCount ? `${me.dueCount} preguntas para repasar hoy` : "Aquí vuelven tus errores en el momento justo"],
  ];
  root.append(h("h1", { class: "title" }, "Practicar"),
    h("ul", { class: "rows" }, rows.map(([href, name, title, text]) =>
      h("li", {}, h("a", { class: "row", href }, h("span", { class: "row-icon" }, icon(name, 28)), h("span", { class: "row-text" }, h("b", {}, title), h("small", {}, text)), icon("ChevronRight", 22))))));
}

export async function rankView(root, ctx) {
  const { rows } = await api("/leaderboard");
  root.append(h("h1", { class: "title" }, "Ranking de la semana"),
    h("p", { class: "muted" }, "XP de los últimos 7 días."),
    h("ol", { class: "board" }, rows.map((r, i) =>
      h("li", { class: r.you ? "you" : "" }, h("span", { class: "pos" }, i + 1), h("span", { class: "who" }, r.name, r.level ? h("small", {}, ` · ${r.level}`) : null), h("b", {}, `${r.xp} XP`)))));
}

const SKILL_NAMES = { grammar: "Gramática", vocab: "Vocabulario", reading: "Lectura", listening: "Escucha" };

export async function meView(root, ctx) {
  const me = await ctx.refresh();
  const { entries } = await api("/writing");
  const max = Math.max(30, ...me.week.map((d) => d.xp));
  root.append(
    h("h1", { class: "title" }, me.user.name),
    h("p", { class: "muted" }, me.user.level ? `Nivel estimado ${me.user.level}` : "Aún sin diagnóstico"),
    stats(me),
    h("section", { class: "block" }, h("h2", {}, "Esta semana"),
      h("ul", { class: "week" }, me.week.map((d) =>
        h("li", {}, h("div", { class: "bar", role: "img", "aria-label": `${d.xp} XP el ${d.day}` }, h("div", { class: "bar-fill", style: `height:${Math.round((d.xp / max) * 100)}%` })), h("small", {}, ["D", "L", "M", "X", "J", "V", "S"][new Date(`${d.day}T12:00:00`).        getDay()]))))),
    me.user.skills ? h("section", { class: "block" }, h("h2", {}, "Diagnóstico por habilidad"),
      h("ul", { class: "skills" }, Object.entries(me.user.skills).map(([k, v]) =>
        h("li", {}, h("span", {}, SKILL_NAMES[k] || k), h("div", { class: "progress-track" }, h("div", { class: "progress-fill", style: `width:${v}%` })), h("b", {}, `${v}%`))))) : null,
    h("section", { class: "block" }, h("h2", {}, "Escritura reciente"),
      entries.length ? h("ul", { class: "history" }, entries.slice(0, 5).map((e) => h("li", {}, `${writingPrompts.find((p) => p.id === e.promptId)?.type ?? "Texto"} · ${e.words} palabras · índice ${e.score}`))) : h("p", { class: "muted" }, "Todavía no has guardado textos.")),
    h("div", { class: "stack" },
      h("a", { class: "key key-quiet wide", href: "#/diagnostic" }, "Repetir diagnóstico"),
      h("button", { class: "key key-quiet wide", type: "button", onClick: async () => { await api("/logout", {}); ctx.me = null; ctx.go("#/home"); } }, icon("LogOut", 20), "Cerrar sesión"))); 
}
