import { api } from "../api.js";
import { h, mount, toast } from "../dom.js";
import { icon } from "../icons.js";
import { speak, stopSpeaking, listen, canListen } from "../audio.js";
import { speakingPrompts, rubric, listeningPassages, writingPrompts } from "../../content/labs.js";
import { evaluateWriting } from "../writing-eval.js";

const pick = (list, avoid) => {
  const pool = list.filter((x) => x.id !== avoid);
  return pool[Math.floor(Math.random() * pool.length)];
};
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function labFrame(root, ctx, title, ...children) {
  mount(root, h("div", { class: "lab" },
    h("header", { class: "lab-top" }, h("a", { class: "icon-btn", href: "#/practice", "aria-label": "Volver" }, icon("ChevronLeft", 24)), h("h1", {}, title)),
    h("main", { class: "lab-body" }, children)));
}

export async function speakingView(root, ctx) {
  let prompt = pick(speakingPrompts);
  let timer = null;
  let rec = null;
  const cleanup = () => { clearInterval(timer); rec?.stop(); rec = null; };
  window.addEventListener("hashchange", cleanup, { once: true });

  const render = () => {
    cleanup();
    let phase = "idle";
    let seconds = 0;
    const clockEl = h("p", { class: "timer", "aria-live": "off" }, clock(prompt.prep));
    const transcript = h("textarea", { class: "answer-input", rows: "5", placeholder: canListen ? "Tu transcripción aparecerá aquí mientras hablas" : "Tu navegador no transcribe. Habla en voz alta y anota ideas aquí.", "aria-label": "Transcripción" });
    const main = h("button", { class: "key key-primary wide", type: "button" }, "Empezar preparación");
    const info = h("p", { class: "muted", "aria-live": "polite" }, `Preparación: ${prompt.prep} s · Respuesta: ${prompt.time} s`);
    const rubricBox = h("div", { class: "rubric", hidden: true });

    const finish = () => {
      cleanup();
      phase = "done";
      clockEl.textContent = "Listo";
      main.textContent = "Guardar práctica (+XP)";
      info.textContent = "Escucha lo que dijiste y autoevalúate con honestidad.";
      const scores = {};
      rubricBox.hidden = false;
      rubricBox.replaceChildren(h("h2", {}, "Autoevaluación"), ...rubric.map((r) => h("fieldset", {}, h("legend", {}, `${r.label}: ${r.hint}`),
        h("div", { class: "rate" }, [1, 2, 3].map((n) => h("label", {}, h("input", { type: "radio", name: r.id, value: n, onChange: () => { scores[r.id] = n; } }), h("span", {}, ["Flojo", "Aceptable", "Bien"][n - 1]))))))); 
    };

    const startSpeaking = () => {
      phase = "speaking";
      seconds = prompt.time;
      clockEl.textContent = clock(seconds);
      main.textContent = "Terminar";
      info.textContent = "Habla ahora, en inglés.";
      if (canListen) rec = listen({ continuous: true, onText: (t) => { transcript.value = t; }, onError: () => { info.textContent = "Permite el micrófono para transcribir (opcional)."; } });
      timer = setInterval(() => { seconds -= 1; clockEl.textContent = clock(Math.max(0, seconds)); if (seconds <= 0) finish(); }, 1000);
    };

    main.addEventListener("click", async () => {
      if (phase === "idle") {
        phase = "prep";
        seconds = prompt.prep;
        main.textContent = "Saltar a hablar";
        info.textContent = "Organiza tus ideas: postura, dos razones, ejemplo.";
        timer = setInterval(() => { seconds -= 1; clockEl.textContent = clock(Math.max(0, seconds)); if (seconds <= 0) { clearInterval(timer); startSpeaking(); } }, 1000);
      } else if (phase === "prep") { clearInterval(timer); startSpeaking(); }
      else if (phase === "speaking") finish();
      else if (phase === "done") {
        main.disabled = true;
        try { const res = await api("/lab", { kind: "speaking", ref: prompt.id }); toast(`+${res.xp} XP`); } catch (e) { toast(e.message); }
        prompt = pick(speakingPrompts, prompt.id);
        render();
      }
    });

    labFrame(root, ctx, "Hablar",
      h("span", { class: "tag" }, prompt.type),
      h("p", { class: "prompt" }, prompt.q),
      h("p", { class: "tip" }, prompt.tip),
      clockEl, main, info, transcript, rubricBox,
      h("button", { class: "link", type: "button", onClick: () => { prompt = pick(speakingPrompts, prompt.id); render(); } }, "Otra pregunta"));
  };
  render();
}

export async function listeningView(root, ctx) {
  let passage = pick(listeningPassages);
  const render = () => {
    const answers = [];
    const status = h("p", { class: "muted", "aria-live": "polite" }, "Escucha el texto. Puedes repetirlo.");
    const questions = passage.questions.map((q, qi) => {
      const buttons = q.options.map((text, oi) => h("button", { class: "choice", type: "button", onClick: () => {
        if (answers[qi] !== undefined) return;
        answers[qi] = oi === q.a;
        buttons.forEach((b, i) => { b.disabled = true; if (i === q.a) b.classList.add("correct"); else if (i === oi) b.classList.add("wrong"); });
        if (answers.filter((a) => a !== undefined).length === passage.questions.length) finish();
      } }, text));
      return h("fieldset", { class: "q" }, h("legend", {}, q.q), h("div", { class: "choices" }, buttons));
    });
    const finish = async () => {
      const right = answers.filter(Boolean).length;
      status.textContent = `Resultado: ${right}/${passage.questions.length}. Lee el texto y compáralo con lo que oíste.`;
      try { await api("/lab", { kind: "listening", ref: passage.id }); } catch { /* sin XP */ }
      const box = h("div", { class: "transcript" }, h("h2", {}, "Transcripción"), h("p", {}, passage.text),
        h("button", { class: "key key-primary wide", type: "button", onClick: () => { passage = pick(listeningPassages, passage.id); render(); } }, "Otro texto"));
      document.querySelector(".lab-body").append(box);
    };
    labFrame(root, ctx, passage.title,
      h("div", { class: "audio-row" },
        h("button", { class: "key key-info", type: "button", onClick: () => speak(passage.text, { rate: 0.9 }) }, icon("Play", 24), "Escuchar"),
        h("button", { class: "key key-quiet", type: "button", "aria-label": "Escuchar despacio", onClick: () => speak(passage.text, { rate: 0.65 }) }, icon("Turtle", 24))),
      status, questions);
  };
  window.addEventListener("hashchange", stopSpeaking, { once: true });
  render();
}

export async function writingView(root, ctx) {
  let prompt = pick(writingPrompts);
  const render = () => {
    let ink = "#1B2340";
    let drawing = false;
    const canvas = h("canvas", { class: "pad", width: "900", height: "620", "aria-label": "Zona de escritura a mano" });
    const g = canvas.getContext("2d");
    g.lineCap = "round"; g.lineJoin = "round"; g.lineWidth = 4;
    const at = (e) => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * canvas.width / r.width, (e.clientY - r.top) * canvas.height / r.height]; };
    canvas.addEventListener("pointerdown", (e) => { drawing = true; canvas.setPointerCapture(e.pointerId); g.strokeStyle = ink; g.beginPath(); g.moveTo(...at(e)); });
    canvas.addEventListener("pointermove", (e) => { if (drawing) { g.lineTo(...at(e)); g.stroke(); } });
    for (const t of ["pointerup", "pointercancel"]) canvas.addEventListener(t, () => { drawing = false; });
    const text = h("textarea", { class: "answer-input", rows: "8", placeholder: "Transcribe aquí lo que escribiste a mano", "aria-label": "Transcripción de tu texto" });
    const count = h("p", { class: "muted", "aria-live": "polite" }, `0 palabras · mínimo ${prompt.min}`);
    text.addEventListener("input", () => { const n = text.value.trim() ? text.value.trim().split(/\s+/).length : 0; count.textContent = `${n} palabras · mínimo ${prompt.min}`; });
    const feedback = h("div", { class: "feedback-card", hidden: true });
    const photo = h("img", { class: "photo", alt: "Foto de tu texto", hidden: true });
    const file = h("input", { type: "file", accept: "image/*", capture: "environment", class: "sr", id: "photo", onChange: () => { const f = file.files?.[0]; if (f) { photo.src = URL.createObjectURL(f); photo.hidden = false; } } });
    const check = h("button", { class: "key key-primary wide", type: "button", onClick: async () => {
      const value = text.value.trim();
      if (!value) return toast("Transcribe tu texto para revisarlo.");
      const res = evaluateWriting(value);
      feedback.hidden = false;
      feedback.replaceChildren(h("h2", {}, `Índice de práctica: ${res.score}/100`), h("p", { class: "muted" }, "Orientativo: reglas sencillas sobre tu transcripción. No es una nota oficial."), h("ul", {}, res.notes.map((n) => h("li", {}, n))));
      try { await api("/writing", { promptId: prompt.id, text: value, score: res.score }); toast("+15 XP"); } catch (e) { toast(e.message); }
    } }, "Revisar y guardar");
    const inks = [["#1B2340", "Tinta"], ["#2D6CC4", "Azul"], ["#C23B3B", "Rojo"]].map(([c, label]) =>
      h("button", { class: "swatch", type: "button", style: `--ink:${c}`, "aria-label": label, "aria-pressed": String(c === ink), onClick: (e) => { ink = c; inks.forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); } }));
    labFrame(root, ctx, "Escribir a mano",
      h("span", { class: "tag" }, prompt.type), h("p", { class: "prompt" }, prompt.q),
      h("p", { class: "tip" }, "Escribe en papel (o aquí con el dedo), luego transcríbelo para revisarlo."),
      h("div", { class: "pad-tools" }, inks, h("button", { class: "key key-quiet", type: "button", onClick: () => g.clearRect(0, 0, canvas.width, canvas.height) }, icon("Eraser", 20), "Borrar"),
        h("label", { class: "key key-quiet", for: "photo" }, icon("Camera", 20), "Foto")), file, canvas, photo,
      text, count, check, feedback,
      h("button", { class: "link", type: "button", onClick: () => { prompt = pick(writingPrompts, prompt.id); render(); } }, "Otro tema"));
  };
  render();
}
