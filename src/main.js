import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import { api } from "./api.js";
import { h, mount, toast } from "./dom.js";
import { icon } from "./icons.js";
import { authView } from "./views/auth.js";
import { homeView, practiceView, rankView, meView } from "./views/tabs.js";
import { lessonView, diagnosticView, reviewView } from "./views/flows.js";
import { speakingView, writingView, songsView, songAddView, songView } from "./views/labs.js";
import { listeningView, examsView, examView } from "./views/exams.js";
import { stopSpeaking } from "./audio.js";

const root = document.getElementById("app");
const ctx = {
  me: null,
  go: (hash) => { if ((location.hash || "#/home") === hash) route(); else location.hash = hash; },
  async refresh() {
    this.me = await api("/me");
    return this.me;
  },
};

const TABS = [
  ["#/home", "Home", "Route"],
  ["#/practice", "Practice", "Dumbbell"],
  ["#/rank", "Leaderboard", "Trophy"],
  ["#/me", "Profile", "User"],
];
const TAB_VIEWS = { "#/home": homeView, "#/practice": practiceView, "#/rank": rankView, "#/me": meView };

function shell(hash, body) {
  const nav = h("nav", { class: "tabbar", "aria-label": "Main navigation" },
    TABS.map(([target, label, name]) =>
      h("a", { href: target, class: "tab", "aria-current": target === hash ? "page" : undefined }, icon(name, 26), h("span", {}, label))));
  return h("div", { class: "shell" }, h("main", { id: "main", class: "page" }, body), nav);
}

async function route() {
  stopSpeaking();
  const hash = location.hash || "#/home";
  if (!ctx.me) {
    try { await ctx.refresh(); } catch { ctx.me = null; }
  }
  if (!ctx.me) return authView(root, ctx);

  if (TAB_VIEWS[hash]) {
    const body = h("div", {});
    mount(root, shell(hash, body));
    return TAB_VIEWS[hash](body, ctx).catch?.((e) => toast(e.message));
  }
  const [, name, arg] = hash.split("/");
  const full = { lesson: () => lessonView(root, ctx, arg), diagnostic: () => diagnosticView(root, ctx), review: () => reviewView(root, ctx), speaking: () => speakingView(root, ctx), listening: () => listeningView(root, ctx), exams: () => examsView(root, ctx), exam: () => examView(root, ctx, arg), writing: () => writingView(root, ctx), songs: () => songsView(root, ctx), "song-add": () => songAddView(root, ctx), song: () => songView(root, ctx, arg) };
  if (full[name]) {
    try { await full[name](); } catch (e) { toast(e.message); ctx.go("#/home"); }
    return;
  }
  ctx.go("#/home");
}

window.addEventListener("hashchange", route);
window.addEventListener("unauthorized", () => { ctx.me = null; route(); });
route();

if ("serviceWorker" in navigator && import.meta.env.PROD) navigator.serviceWorker.register("/sw.js");
