import { api } from "../api.js";
import { h, mount, toast } from "../dom.js";
import { icon } from "../icons.js";
import { speak, stopSpeaking, listen, canListen } from "../audio.js";
import { speakingPrompts, writingPrompts } from "../../content/labs.js";
import { evaluateSpeaking } from "../../content/speaking-eval.js";
import { evaluateWriting } from "../writing-eval.js";
import { buildGaps, isCorrect, DENSITY } from "../../content/songs.js";
import { loadYouTube } from "../youtube.js";

const pick = (list, avoid) => {
  const pool = list.filter((x) => x.id !== avoid);
  return pool[Math.floor(Math.random() * pool.length)];
};
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function labFrame(root, ctx, title, ...children) {
  mount(root, h("div", { class: "lab" },
    h("header", { class: "lab-top" }, h("a", { class: "icon-btn", href: "#/practice", "aria-label": "Back" }, icon("ChevronLeft", 24)), h("h1", {}, title)),
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
    let confidences = [];
    const avgConfidence = () => (confidences.length ? confidences.reduce((a, b) => a + b, 0) / confidences.length : null);
    const clockEl = h("p", { class: "timer", "aria-live": "off" }, clock(prompt.prep));
    const transcript = h("textarea", { class: "answer-input", rows: "5", placeholder: canListen ? "Your transcript will appear here as you speak" : "Your browser cannot transcribe speech. Speak aloud and jot down ideas here.", "aria-label": "Transcript" });
    const main = h("button", { class: "key key-primary wide", type: "button" }, "Start prep");
    const info = h("p", { class: "muted", "aria-live": "polite" }, `Prep: ${prompt.prep}s · Response: ${prompt.time}s`);
    const rubricBox = h("div", { class: "rubric", hidden: true });
    const again = h("button", { class: "link", type: "button", hidden: true, onClick: () => { again.hidden = true; finish(); } }, "Review again");

    const showFeedback = (r, source, reason) => {
      const label = { fluency: "Fluency and coherence", vocabulary: "Vocabulary", grammar: "Grammar", task: "Answering the task" };
      if (source !== "ai") {
        rubricBox.replaceChildren(
          h("h2", {}, "Not graded"),
          h("p", { class: "tip-box" }, `The AI coach could not review this answer${reason ? `: ${reason}` : ""}. Only pace and length were measured, so there is no level. Try Review again in a moment.`),
          r.notes?.length ? h("ul", { class: "notes" }, r.notes.map((n) => h("li", {}, n))) : "");
        rubricBox.hidden = false;
        return;
      }
      rubricBox.replaceChildren(
        h("h2", {}, `Estimated level: ${r.level}`),
        h("p", { class: "score-big" }, `${r.overall} / 4`),
        r.why?.length ? h("div", { class: "level-why" }, h("h3", {}, "To reach the next level"), h("ul", { class: "notes" }, r.why.map((s) => h("li", {}, s)))) : "",
        ...Object.entries(r.scores).map(([k, v]) => h("div", { class: "meter" }, h("span", {}, `${label[k]}: ${v}/4`), h("progress", { max: "4", value: String(v) }))),
        r.strengths?.length ? h("div", {}, h("h3", {}, "What worked"), h("ul", { class: "notes" }, r.strengths.map((s) => h("li", {}, s)))) : "",
        r.fixes?.length ? h("div", {}, h("h3", {}, "What to fix"), h("ul", { class: "fixes" }, r.fixes.map((f) => h("li", {},
          h("span", { class: "fix-said" }, `“${f.said}”`), h("span", { class: "fix-better" }, f.better), h("small", {}, f.why))))) : "",
        r.tip ? h("p", { class: "tip-box" }, h("b", {}, "Next time: "), r.tip) : "",
        h("p", { class: "muted" }, "Reviewed by an AI coach from your transcript. It cannot hear your pronunciation."));
      rubricBox.hidden = false;
    };

    const finish = async () => {
      cleanup();
      phase = "analysing";
      clockEl.textContent = "Done";
      main.disabled = true;
      const spoken = Math.max(1, prompt.time - Math.max(0, seconds));
      const text = transcript.value.trim();
      if (text.split(/\s+/).filter(Boolean).length < 8) {
        info.textContent = canListen ? "Not enough speech was captured. Check the microphone, or type what you said in the box and press Review." : "Type what you said in the box, then press Review.";
        main.disabled = false; main.textContent = "Review"; phase = "review";
        return;
      }
      info.textContent = "Reviewing your answer…";
      try {
        const res = await api("/speaking/feedback", { prompt: prompt.q, transcript: text, seconds: spoken });
        if (res.available) showFeedback(res.feedback, "ai");
        else showFeedback(evaluateSpeaking(text, { seconds: spoken, expected: Math.round(prompt.time * 1.8), promptText: prompt.q, confidence: avgConfidence() }), "local", res.reason);
      } catch (e) {
        showFeedback(evaluateSpeaking(text, { seconds: spoken, expected: Math.round(prompt.time * 1.8), promptText: prompt.q, confidence: avgConfidence() }), "local", e.message);
        toast(e.message);
      }
      info.textContent = "Edit the transcript if the recognizer misheard you, then press Review again.";
      main.disabled = false;
      main.textContent = "Next prompt (+XP)";
      again.hidden = false;
      phase = "done";
    };
    const startSpeaking = () => {
      phase = "speaking";
      seconds = prompt.time;
      confidences = [];
      clockEl.textContent = clock(seconds);
      main.textContent = "Finish";
      info.textContent = "Speak now, in English.";
      if (canListen) rec = listen({ continuous: true, onText: (t) => { transcript.value = t; }, onConfidence: (c) => { confidences = c; }, onError: () => { info.textContent = "Allow microphone access so the platform can score you."; } });
      timer = setInterval(() => { seconds -= 1; clockEl.textContent = clock(Math.max(0, seconds)); if (seconds <= 0) finish(); }, 1000);
    };

    main.addEventListener("click", async () => {
      if (phase === "idle") {
        phase = "prep";
        seconds = prompt.prep;
        main.textContent = "Skip to speaking";
        info.textContent = "Plan your ideas: your position, two reasons, and an example.";
        timer = setInterval(() => { seconds -= 1; clockEl.textContent = clock(Math.max(0, seconds)); if (seconds <= 0) { clearInterval(timer); startSpeaking(); } }, 1000);
      } else if (phase === "prep") { clearInterval(timer); startSpeaking(); }
      else if (phase === "speaking") finish();
      else if (phase === "review") finish();
      else if (phase === "done") {
        main.disabled = true;
        try { const res = await api("/lab", { kind: "speaking", ref: prompt.id }); toast(`+${res.xp} XP`); } catch (e) { toast(e.message); }
        prompt = pick(speakingPrompts, prompt.id);
        render();
      }
    });

    labFrame(root, ctx, "Speaking",
      h("span", { class: "tag" }, prompt.type),
      h("p", { class: "prompt" }, prompt.q),
      h("p", { class: "tip" }, prompt.tip),
      clockEl, main, info, transcript, again, rubricBox,
      h("button", { class: "link", type: "button", onClick: () => { prompt = pick(speakingPrompts, prompt.id); render(); } }, "Another prompt"));
  };
  render();
}

export async function songsView(root, ctx) {
  const { songs } = await api("/songs");
  labFrame(root, ctx, "Songs",
    h("p", { class: "tip" }, "Listen to a real song and fill in the missing words. Pick the video, paste the lyrics, and the blanks are made for you."),
    h("a", { class: "key key-primary wide", href: "#/song-add" }, "Add a song"),
    songs.length
      ? h("ul", { class: "rows" }, songs.map((s) => h("li", {}, h("a", { class: "row", href: `#/song/${s.id}` },
        h("span", { class: "row-icon" }, icon("Headphones", 28)),
        h("span", { class: "row-text" }, h("b", {}, s.title), h("small", {}, `${s.level} · added by ${s.addedBy}`)),
        icon("ChevronRight", 22)))))
      : h("p", { class: "muted" }, "No songs yet. Add the first one!"));
}

export async function songAddView(root, ctx) {
  const url = h("input", { class: "answer-input", type: "url", inputmode: "url", autocapitalize: "none", autocorrect: "off", placeholder: "https://www.youtube.com/watch?v=…", "aria-label": "YouTube link" });
  const title = h("input", { class: "answer-input", type: "text", maxlength: "80", placeholder: "Leave empty to use the video title", "aria-label": "Title (optional)" });
  const lyrics = h("textarea", { class: "answer-input", rows: "10", placeholder: "Paste the lyrics here, one line per row.\nTip: put {braces} around a word to force it to be a blank.", "aria-label": "Lyrics" });
  let level = "B1";
  const chips = ["A2", "B1", "B2"].map((l) => h("button", { class: "tag chip-btn", type: "button", "aria-pressed": String(l === level), onClick: () => {
    level = l; chips.forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === l)));
  } }, l));
  const error = h("p", { class: "form-error", hidden: true, role: "alert" });
  const save = h("button", { class: "key key-primary wide", type: "button", onClick: async () => {
    error.hidden = true;
    save.disabled = true;
    try {
      const res = await api("/songs", { url: url.value, title: title.value, level, lyrics: lyrics.value });
      ctx.go(`#/song/${res.id}`);
    } catch (e) {
      error.textContent = e.message;
      error.hidden = false;
      save.disabled = false;
    }
  } }, "Save song");
  labFrame(root, ctx, "Add a song",
    h("label", { class: "field-label" }, "YouTube link"), url,
    h("label", { class: "field-label" }, "Title (optional)"), title,
    h("fieldset", { class: "q" }, h("legend", {}, "How hard is the singing?"), h("div", { class: "tags" }, chips)),
    h("label", { class: "field-label" }, "Lyrics"), lyrics,
    h("p", { class: "muted" }, "Lyrics stay on this server and are only visible to signed-in members. Only add what your group may use."),
    error, save);
}

export async function songView(root, ctx, id) {
  const { song } = await api(`/songs/${encodeURIComponent(id)}`);
  let density = "medium";
  let player = null;
  let checked = false;
  let rewarded = false;
  const cleanup = () => { try { player?.destroy(); } catch { /* player already gone */ } player = null; };
  window.addEventListener("hashchange", cleanup, { once: true });

  const stage = h("div", { class: "yt-frame" }, h("div", { id: "yt-target" }));
  const fallback = h("p", { class: "muted", hidden: true }, "This video cannot be played here. ", h("a", { class: "link", href: `https://www.youtube.com/watch?v=${song.videoId}`, target: "_blank", rel: "noopener" }, "Open it on YouTube"));
  const speeds = [1, 0.75, 0.5];
  let speedIndex = 0;
  const speedBtn = h("button", { class: "key key-quiet", type: "button", "aria-label": "Playback speed", onClick: () => {
    speedIndex = (speedIndex + 1) % speeds.length;
    player?.setPlaybackRate?.(speeds[speedIndex]);
    speedBtn.textContent = `${speeds[speedIndex]}×`;
  } }, "1×");
  const back = h("button", { class: "key key-quiet", type: "button", "aria-label": "Back 5 seconds", onClick: () => player?.seekTo?.(Math.max(0, (player.getCurrentTime?.() || 0) - 5), true) }, icon("RotateCcw", 20), "5s");
  const toggle = h("button", { class: "key key-info", type: "button", onClick: () => {
    if (!player?.getPlayerState) return;
    if (player.getPlayerState() === 1) player.pauseVideo(); else player.playVideo();
  } }, icon("Play", 22), "Play / pause");

  const lyricsBox = h("div", { class: "lyrics" });
  const score = h("p", { class: "muted", "aria-live": "polite" });
  let inputs = [];

  const renderLyrics = () => {
    checked = false;
    inputs = [];
    score.textContent = "";
    lyricsBox.replaceChildren(...buildGaps(song.lyrics, DENSITY[density]).map((line) => {
      if (line.blank) return h("div", { class: "lyric-gap-line" });
      if (line.label) return h("p", { class: "lyric-label" }, line.label);
      return h("p", { class: "lyric-line" }, line.tokens.map((t) => {
        if (!t.gap) return h("span", {}, `${t.pre}${t.word}${t.post} `);
        const input = h("input", { class: "gap", type: "text", autocapitalize: "none", autocorrect: "off", autocomplete: "off", spellcheck: "false", size: String(Math.max(3, t.word.length)), "aria-label": "Missing word" });
        inputs.push({ input, answer: t.word });
        return [t.pre, input, `${t.post} `];
      }));
    }));
  };

  const check = h("button", { class: "key key-primary wide", type: "button", onClick: async () => {
    if (!inputs.length) return;
    checked = true;
    let right = 0;
    for (const { input, answer } of inputs) {
      const ok = isCorrect(answer, input.value);
      if (ok) right += 1;
      input.classList.toggle("ok", ok);
      input.classList.toggle("bad", !ok);
      input.title = ok ? "" : answer;
    }
    score.textContent = `${right}/${inputs.length} correct. Red blanks: tap "Show answers" or listen again.`;
    if (!rewarded && right / inputs.length >= 0.5) {
      rewarded = true;
      try { const res = await api("/lab", { kind: "song", ref: String(song.id) }); toast(`+${res.xp} XP`); } catch { /* no XP */ }
    }
  } }, "Check");
  const reveal = h("button", { class: "key key-quiet", type: "button", onClick: () => {
    if (!checked) return toast("Check your answers first.");
    for (const { input, answer } of inputs) if (input.classList.contains("bad")) { input.value = answer; input.classList.replace("bad", "ok"); }
  } }, "Show answers");
  const retry = h("button", { class: "key key-quiet", type: "button", onClick: renderLyrics }, "Clear");

  const levels = Object.keys(DENSITY).map((key) => h("label", {}, h("input", { type: "radio", name: "density", value: key, checked: key === density, onChange: () => { density = key; renderLyrics(); } }), h("span", {}, key[0].toUpperCase() + key.slice(1))));
  const remove = song.mine ? h("button", { class: "link", type: "button", onClick: async () => {
    if (!confirm("Delete this song for everyone?")) return;
    try { await api(`/songs/${song.id}/delete`, {}); cleanup(); ctx.go("#/songs"); } catch (e) { toast(e.message); }
  } }, "Delete this song") : null;

  renderLyrics();
  labFrame(root, ctx, song.title, stage, fallback,
    h("div", { class: "audio-row" }, toggle, back, speedBtn),
    h("p", { class: "muted" }, `${song.level} · added by ${song.addedBy}. Song lyrics can be hard to hear, and they are not always correct English.`),
    h("fieldset", { class: "rubric" }, h("legend", {}, "Blanks"), h("div", { class: "rate" }, levels)),
    lyricsBox, score,
    h("div", { class: "audio-row" }, check, reveal, retry), remove);

  try {
    const YT = await loadYouTube();
    player = new YT.Player("yt-target", {
      videoId: song.videoId, host: "https://www.youtube-nocookie.com",
      playerVars: { playsinline: 1, rel: 0, modestbranding: 1, origin: location.origin },
      events: { onError: () => { fallback.hidden = false; } },
    });
  } catch {
    fallback.hidden = false;
  }
}

export async function writingView(root, ctx) {
  let prompt = pick(writingPrompts);
  const render = () => {
    let ink = "#1B2340";
    let drawing = false;
    const canvas = h("canvas", { class: "pad", width: "900", height: "620", "aria-label": "Handwriting area" });
    const g = canvas.getContext("2d");
    g.lineCap = "round"; g.lineJoin = "round"; g.lineWidth = 4;
    const at = (e) => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * canvas.width / r.width, (e.clientY - r.top) * canvas.height / r.height]; };
    canvas.addEventListener("pointerdown", (e) => { drawing = true; canvas.setPointerCapture(e.pointerId); g.strokeStyle = ink; g.beginPath(); g.moveTo(...at(e)); });
    canvas.addEventListener("pointermove", (e) => { if (drawing) { g.lineTo(...at(e)); g.stroke(); } });
    for (const t of ["pointerup", "pointercancel"]) canvas.addEventListener(t, () => { drawing = false; });
    const text = h("textarea", { class: "answer-input", rows: "8", placeholder: "Transcribe your handwritten text here", "aria-label": "Text transcription" });
    const count = h("p", { class: "muted", "aria-live": "polite" }, `0 words · minimum ${prompt.min}`);
    text.addEventListener("input", () => { const n = text.value.trim() ? text.value.trim().split(/\s+/).length : 0; count.textContent = `${n} words · minimum ${prompt.min}`; });
    const feedback = h("div", { class: "feedback-card", hidden: true });
    const photo = h("img", { class: "photo", alt: "Photo of your text", hidden: true });
    const file = h("input", { type: "file", accept: "image/*", capture: "environment", class: "sr", id: "photo", onChange: () => { const f = file.files?.[0]; if (f) { photo.src = URL.createObjectURL(f); photo.hidden = false; } } });
    const check = h("button", { class: "key key-primary wide", type: "button", onClick: async () => {
      const value = text.value.trim();
      if (!value) return toast("Transcribe your text to review it.");
      check.disabled = true;
      feedback.hidden = false;
      feedback.replaceChildren(h("p", { class: "muted", "aria-live": "polite" }, "Reviewing your text…"));
      let score;
      let ai = null;
      let reason = "";
      try {
        const r = await api("/writing/feedback", { prompt: prompt.q, text: value, min: prompt.min });
        if (r.available) ai = r.feedback; else reason = r.reason || "";
      } catch (e) { reason = e.message; toast(e.message); }
      if (ai) {
        score = Math.round((ai.overall / 4) * 100);
        const label = { task: "Task and ideas", organisation: "Organisation", vocabulary: "Vocabulary", grammar: "Grammar" };
        feedback.replaceChildren(
          h("h2", {}, `Estimated level: ${ai.level}`),
          h("p", { class: "score-big" }, `${ai.overall} / 4`),
          ...Object.entries(ai.scores).map(([k, v]) => h("div", { class: "meter" }, h("span", {}, `${label[k]}: ${v}/4`), h("progress", { max: "4", value: String(v) }))),
          ai.strengths.length ? h("div", {}, h("h3", {}, "What worked"), h("ul", { class: "notes" }, ai.strengths.map((s) => h("li", {}, s)))) : "",
          ai.fixes.length ? h("div", {}, h("h3", {}, "What to fix"), h("ul", { class: "fixes" }, ai.fixes.map((f) => h("li", {},
            h("span", { class: "fix-said" }, `“${f.said}”`), h("span", { class: "fix-better" }, f.better), h("small", {}, f.why))))) : "",
          ai.tip ? h("p", { class: "tip-box" }, h("b", {}, "Next time: "), ai.tip) : "",
          h("p", { class: "muted" }, "Reviewed by an AI coach. It is a study guide, not an official score."));
      } else {
        const res = evaluateWriting(value);
        score = 0;
        feedback.replaceChildren(h("h2", {}, "Not graded"), h("p", { class: "tip-box" }, `The AI coach could not review this text${reason ? `: ${reason}` : ""}. Only simple checks ran, so there is no score. Press the button again in a moment.`), h("ul", { class: "notes" }, res.notes.map((n) => h("li", {}, n))));
      }
      try { await api("/writing", { promptId: prompt.id, text: value, score }); toast("+15 XP"); } catch (e) { toast(e.message); }
      check.disabled = false;
    } }, "Review and save");
    const inks = [["#1B2340", "Ink"], ["#2D6CC4", "Blue"], ["#C23B3B", "Red"]].map(([c, label]) =>
      h("button", { class: "swatch", type: "button", style: `--ink:${c}`, "aria-label": label, "aria-pressed": String(c === ink), onClick: (e) => { ink = c; inks.forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); } }));
    labFrame(root, ctx, "Handwriting",
      h("span", { class: "tag" }, prompt.type), h("p", { class: "prompt" }, prompt.q),
      h("p", { class: "tip" }, "Write on paper (or here with your finger), then transcribe it for feedback."),
      h("div", { class: "pad-tools" }, inks, h("button", { class: "key key-quiet", type: "button", onClick: () => g.clearRect(0, 0, canvas.width, canvas.height) }, icon("Eraser", 20), "Clear"),
        h("label", { class: "key key-quiet", for: "photo" }, icon("Camera", 20), "Photo")), file, canvas, photo,
      text, count, check, feedback,
      h("button", { class: "link", type: "button", onClick: () => { prompt = pick(writingPrompts, prompt.id); render(); } }, "Another topic"));
  };
  render();
}
