import { h } from "./dom.js";
import { icon } from "./icons.js";
import { speak, canListen, listen, stopSpeaking } from "./audio.js";
import { similarity, normalize } from "../content/grade.js";
import { shuffle } from "../content/index.js";

const PROMPTS = {
  choice: "Choose the correct answer",
  read: "Read and answer",
  listen: "Listen and answer",
  type: "Type the missing word or phrase",
  fix: "Tap the incorrect word",
  order: "Put the words in order",
  dictation: "Write what you hear",
  transform: "Rewrite the sentence",
  match: "Match the pairs",
  shadow: "Listen and repeat aloud",
};

export const kindPrompt = (kind) => PROMPTS[kind];

export function correctText(ex) {
  switch (ex.kind) {
    case "choice": case "read": case "listen": return ex.options[ex.a];
    case "fix": return ex.q.split(/\s+/)[ex.a];
    case "match": return null;
    case "shadow": return ex.say;
    default: return ex.a[0];
  }
}

function playButtons(text) {
  return h("div", { class: "audio-row" },
    h("button", { class: "key key-info", type: "button", "aria-label": "Listen", onClick: () => speak(text) }, icon("Volume2", 28)),
    h("button", { class: "key key-quiet", type: "button", "aria-label": "Listen slowly", onClick: () => speak(text, { rate: 0.6 }) }, icon("Turtle", 24)),
  );
}

function options(ex, api) {
  const order = shuffle(ex.options.map((text, index) => ({ text, index })));
  const buttons = order.map(({ text, index }, position) =>
    h("button", {
      class: "choice", type: "button", "aria-pressed": "false",
      onClick: () => {
        buttons.forEach((b) => { b.classList.remove("selected"); b.setAttribute("aria-pressed", "false"); });
        buttons[position].classList.add("selected");
        buttons[position].setAttribute("aria-pressed", "true");
        api.set(index);
      },
    }, text));
  return h("div", { class: "choices" }, buttons);
}

function textInput(api, placeholder, multiline) {
  const input = h(multiline ? "textarea" : "input", {
    class: "answer-input", type: "text", rows: multiline ? 2 : undefined, placeholder,
    autocomplete: "off", autocapitalize: "off", autocorrect: "off", spellcheck: "false", "aria-label": "Your answer",
  });
  input.addEventListener("input", () => api.set(input.value.trim() ? input.value : null));
  api.focus = () => input.focus();
  return input;
}

const RENDERERS = {
  choice: (ex, api) => [h("p", { class: "stem" }, ex.q), options(ex, api)],
  read: (ex, api) => [h("blockquote", { class: "passage" }, ex.text), h("p", { class: "stem" }, ex.q), options(ex, api)],
  listen: (ex, api) => {
    setTimeout(() => speak(ex.say), 250);
    return [playButtons(ex.say), h("p", { class: "stem" }, ex.q), options(ex, api)];
  },
  type: (ex, api) => [h("p", { class: "stem" }, ex.q), textInput(api, "Write in English")],
  transform: (ex, api) => [h("p", { class: "stem" }, ex.q), textInput(api, "Write the full sentence", true)],
  dictation: (ex, api) => {
    setTimeout(() => speak(ex.say), 250);
    return [playButtons(ex.say), textInput(api, "Write what you hear", true)];
  },
  fix: (ex, api) => {
    const tokens = ex.q.split(/\s+/).map((word, index) =>
      h("button", {
        class: "token", type: "button", "aria-pressed": "false",
        onClick: () => {
          tokens.forEach((t) => { t.classList.remove("selected"); t.setAttribute("aria-pressed", "false"); });
          tokens[index].classList.add("selected");
          tokens[index].setAttribute("aria-pressed", "true");
          api.set(index);
        },
      }, word));
    return [h("p", { class: "stem muted" }, "There is a mistake in the sentence."), h("div", { class: "tokens" }, tokens)];
  },
  order: (ex, api) => {
    const words = ex.q.split("/").map((w) => w.trim()).filter(Boolean);
    const picked = [];
    const line = h("div", { class: "order-line", "aria-live": "polite" });
    const bank = h("div", { class: "tokens" });
    const draw = () => {
      line.replaceChildren(...picked.map((p, i) => h("button", { class: "token placed", type: "button", onClick: () => { picked.splice(i, 1); draw(); } }, p.word)));
      bank.replaceChildren(...order.map((o) => h("button", { class: "token", type: "button", disabled: picked.includes(o), onClick: () => { picked.push(o); draw(); } }, o.word)));
      api.set(picked.length === words.length ? picked.map((p) => p.word).join(" ") : null);
    };
    const order = shuffle(words.map((word, id) => ({ word, id })));
    draw();
    return [h("p", { class: "stem muted" }, "Tap the words in order."), line, bank];
  },
  match: (ex, api) => {
    const left = ex.pairs.map((p) => p[0]);
    const right = shuffle(ex.pairs.map((p) => p[1]));
    const done = new Set();
    let mistakes = 0;
    let active = null;
    const lefts = left.map((text) => h("button", { class: "choice", type: "button", onClick: () => { active = text; mark(); } }, text));
    const rights = right.map((text) => h("button", {
      class: "choice", type: "button",
      onClick: (event) => {
        if (!active) return;
        const btn = event.currentTarget;
        const target = ex.pairs.find((p) => p[0] === active);
        if (target[1] === text) {
          done.add(active);
          lefts[left.indexOf(active)].disabled = true;
          btn.disabled = true;
          btn.classList.add("matched");
          lefts[left.indexOf(active)].classList.add("matched");
          active = null;
          if (done.size === left.length) api.set(mistakes);
        } else {
          mistakes += 1;
          btn.classList.add("shake");
          setTimeout(() => btn.classList.remove("shake"), 400);
        }
        mark();
      },
    }, text));
    const mark = () => lefts.forEach((b, i) => b.classList.toggle("selected", left[i] === active));
    return [h("div", { class: "match" }, h("div", { class: "choices" }, lefts), h("div", { class: "choices" }, rights))];
  },
  shadow: (ex, api) => {
    const status = h("p", { class: "stem muted", "aria-live": "polite" }, "");
    const heard = h("p", { class: "heard" });
    let rec = null;
    const micButton = h("button", { class: "key key-signal", type: "button", "aria-label": "Record" }, icon("Mic", 28), h("span", {}, "Speak"));
    const stop = () => { rec?.stop(); rec = null; micButton.classList.remove("recording"); };
    micButton.addEventListener("click", () => {
      if (rec) return stop();
      stopSpeaking();
      rec = listen({
        onText: (text) => { heard.textContent = text; api.set(similarity(ex.say, text)); },
        onEnd: () => { rec = null; micButton.classList.remove("recording"); },
        onError: () => { status.textContent = "Could not use the microphone. Rate yourself below."; },
      });
      if (rec) micButton.classList.add("recording");
    });
    const fallback = h("div", { class: "self-rate" },
      h("p", { class: "muted" }, canListen ? "No microphone? Rate yourself:" : "Speech recognition is unavailable. Say it aloud and rate yourself:"),
      h("button", { class: "key key-quiet", type: "button", onClick: () => api.set(1) }, "I said it well"),
      h("button", { class: "key key-quiet", type: "button", onClick: () => api.set(0) }, "I need to repeat it"));
    return [h("p", { class: "stem lg" }, ex.say), playButtons(ex.say), canListen ? micButton : null, heard, status, fallback];
  },
};

// Mounts an exercise; `api.set(value)` is called when the response becomes ready (null = not ready).
export function renderExercise(ex, onChange) {
  const api = { value: null, focus: null, set(value) { api.value = value; onChange(value !== null); } };
  const nodes = RENDERERS[ex.kind](ex, api);
  const root = h("div", { class: "exercise" }, h("h2", { class: "task" }, PROMPTS[ex.kind]), nodes);
  return { root, api };
}

export { normalize };
