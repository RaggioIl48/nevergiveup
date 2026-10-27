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
          title: res.mastered ? "Lección dominada" : "Aún no la dominas",
          tone: res.mastered ? "good" : "retry",
          lines: [`Acierto a la primera: ${res.score}%`, `+${res.gained} XP`, res.mastered ? "Siguiente lección desbloqueada." : "Necesitas 80% para avanzar. Repásala y vuelve a intentarlo."],
          primary: res.mastered && next
            ? h("a", { class: "key key-primary wide", href: `#/lesson/${next}` }, "Siguiente lección")
            : h("a", { class: "key key-primary wide", href: `#/lesson/${id}` }, "Repetir lección"),
          secondary: h("a", { class: "key key-quiet wide", href: "#/home" }, "Volver a la ruta"),
        });
      } catch (e) {
        resultScreen(root, { title: "No se pudo guardar", tone: "retry", lines: [e.message], primary: h("a", { class: "key key-primary wide", href: "#/home" }, "Volver") });
      }
    },
  });
}

export async function diagnosticView(root, ctx) {
  mount(root, h("main", { class: "intro" },
    h("h1", {}, "Diagnóstico de nivel"),
    h("p", {}, `${DIAGNOSTIC_LENGTH} preguntas que se adaptan a ti: si aciertas, suben de dificultad. No verás las respuestas hasta el final.`),
    h("p", { class: "muted" }, "Mezcla gramática, vocabulario, lectura y escucha. No adivines: si no sabes, elige tu mejor opción."),
    h("div", { class: "stack" },
      h("button", { class: "key key-primary wide", type: "button", id: "go" }, "Empezar"),
      h("a", { class: "key key-quiet wide", href: "#/home" }, "Ahora no"))));
  document.getElementById("go").addEventListener("click", () => {
    const source = diagnosticSource(diagnostic, DIAGNOSTIC_LENGTH);
    runPlayer({
      root, source, quiet: true, onExit: () => ctx.go("#/home"),
      onFinish: async () => {
        try {
          const res = await api("/diagnostic", { results: source.results() });
          await ctx.refresh();
          resultScreen(root, {
            title: `Tu nivel estimado: ${res.level}`,
            lines: ["Es una estimación orientativa, no una nota oficial.", res.startIndex > 0 ? "Hemos desbloqueado las lecciones más avanzadas para ti." : "Empiezas por la base para consolidar B1."],
            primary: h("a", { class: "key key-primary wide", href: "#/home" }, "Ir a mi ruta"),
          });
        } catch (e) {
          resultScreen(root, { title: "No se pudo guardar", tone: "retry", lines: [e.message], primary: h("a", { class: "key key-primary wide", href: "#/home" }, "Volver") });
        }
      },
    });
  });
}

export async function reviewView(root, ctx) {
  const { ids } = await api("/review");
  const exercises = ids.map((id) => itemIndex.get(id)).filter(Boolean);
  if (!exercises.length) {
    return resultScreen(root, { title: "Nada que repasar ahora", lines: ["Tus errores volverán aquí cuando toque repasarlos."], primary: h("a", { class: "key key-primary wide", href: "#/practice" }, "Volver") });
  }
  const source = lessonSource(exercises);
  runPlayer({
    root, source, onExit: () => ctx.go("#/practice"),
    onFinish: async () => {
      const res = await api("/review", { results: source.results() }).catch(() => ({ xp: 0 }));
      resultScreen(root, {
        title: "Repaso completado", lines: [`+${res.xp} XP`],
        primary: h("a", { class: "key key-primary wide", href: "#/practice" }, "Continuar"),
      });
    },
  });
}
