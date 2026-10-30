import express from "express";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { timingSafeEqual } from "node:crypto";
import { hashPassword, verifyPassword, createSession, userFromToken, destroySession, parseCookies, createRateLimiter } from "./auth.js";
import { lessonIndex, lessonOrder, itemIndex, diagnostic, START_INDEX, LESSON_SIZE } from "../content/index.js";
import { levelFromDifficulty } from "../content/grade.js";
import { validateSong, parseVideoId, SONG_GENRES, SONG_LEVELS } from "../content/songs.js";
import { aiCoach, NO_KEY_REASON } from "./coach.js";
import { phrasalById, usesPhrasal } from "../content/phrasal-verbs.js";

async function youtubeTitle(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.title === "string" ? data.title : null;
  } catch {
    return null;
  }
}

const COOKIE = "upword_sid";
const MASTERY = 80;
const DAILY_GOAL = 30;
const BOX_DAYS = [1, 3, 7, 14, 30, 60];
const DAY_MS = 86400000;

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

function localDay(offsetMin, shiftDays = 0) {
  return new Date(Date.now() - offsetMin * 60000 - shiftDays * DAY_MS).toISOString().slice(0, 10);
}

// Free English dictionary (no key). Returns the first definition and example.
async function freeDictionary(word) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) return null;
  const def = (await res.json())?.[0]?.meanings?.[0]?.definitions?.[0];
  return def ? { word, meaning: String(def.definition).slice(0, 160), es: "", example: String(def.example || "").slice(0, 160) } : null;
}

export function createApp(db, { inviteCode, production = false, distDir = "dist", fetchTitle = youtubeTitle, coach = aiCoach, backup = null, lookupWord = freeDictionary } = {}) {
  const app = express();
  app.get("/api/health", (req, res) => res.json({ ok: true, backup: backup ? backup.status() : { enabled: false } }));
  if (backup) {
    app.use((req, res, next) => {
      if (req.method === "GET") return next();
      // Writing before the backup is restored would create accounts that the restore later clobbers.
      if (!backup.isReady() && req.path.startsWith("/api/")) return res.status(503).json({ error: "The server is loading saved accounts. Try again in a minute." });
      res.on("finish", () => res.statusCode < 400 && backup.markDirty());
      next();
    });
  }
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      // YouTube refuses embeds that do not say which site they are on (error 153), so send our origin, never the path.
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' https://www.youtube.com; frame-src https://www.youtube-nocookie.com https://www.youtube.com; img-src 'self' data: blob: https://i.ytimg.com; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'",
    });
    next();
  });
  app.use(express.json({ limit: "100kb" }));

  const authLimit = createRateLimiter(10, 10 * 60 * 1000);
  const tzOf = (req) => {
    const value = Number(req.get("x-tz-offset"));
    return Number.isFinite(value) && Math.abs(value) <= 840 ? value : 0;
  };

  const setCookie = (req, res, token, maxAge) => {
    const parts = [`${COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAge}`];
    if (req.secure) parts.push("Secure");
    res.append("Set-Cookie", parts.join("; "));
  };

  const requireUser = (req, res, next) => {
    const user = userFromToken(db, parseCookies(req.get("cookie"))[COOKIE]);
    if (!user) return res.status(401).json({ error: "Invalid session" });
    req.user = user;
    next();
  };

  const addXp = (userId, xp, offset) => {
    if (xp <= 0) return;
    db.prepare(
      "INSERT INTO activity (user_id, day, xp) VALUES (?, ?, ?) ON CONFLICT(user_id, day) DO UPDATE SET xp = xp + excluded.xp",
    ).run(userId, localDay(offset), xp);
  };

  const recordResults = (userId, results, reviewMode) => {
    const now = Date.now();
    for (const { id, ok } of results) {
      const row = db.prepare("SELECT box FROM mistakes WHERE user_id = ? AND item_id = ?").get(userId, id);
      if (!ok) {
        db.prepare(
          "INSERT INTO mistakes (user_id, item_id, box, due_at) VALUES (?, ?, 0, ?) ON CONFLICT(user_id, item_id) DO UPDATE SET box = 0, due_at = excluded.due_at",
        ).run(userId, id, now + DAY_MS);
      } else if (row && reviewMode) {
        const box = Math.min(row.box + 1, BOX_DAYS.length - 1);
        db.prepare("UPDATE mistakes SET box = ?, due_at = ? WHERE user_id = ? AND item_id = ?").run(box, now + BOX_DAYS[box] * DAY_MS, userId, id);
      }
    }
  };

  const cleanResults = (results, allowed) => {
    if (!Array.isArray(results) || results.length > 60) return null;
    const seen = new Set();
    const out = [];
    for (const entry of results) {
      if (!entry || typeof entry.id !== "string" || typeof entry.ok !== "boolean") return null;
      if (!allowed(entry.id) || seen.has(entry.id)) return null;
      seen.add(entry.id);
      out.push({ id: entry.id, ok: entry.ok });
    }
    return out;
  };

  const streakOf = (userId, offset) => {
    const days = new Set(db.prepare("SELECT day FROM activity WHERE user_id = ? AND xp > 0").all(userId).map((r) => r.day));
    let cursor = days.has(localDay(offset)) ? 0 : 1;
    let streak = 0;
    while (days.has(localDay(offset, cursor))) {
      streak += 1;
      cursor += 1;
    }
    return streak;
  };

  const profile = (user, offset) => {
    const progress = Object.fromEntries(db.prepare("SELECT lesson_id, best FROM progress WHERE user_id = ?").all(user.id).map((r) => [r.lesson_id, r.best]));
    const total = db.prepare("SELECT COALESCE(SUM(xp), 0) AS xp FROM activity WHERE user_id = ?").get(user.id).xp;
    const today = db.prepare("SELECT COALESCE(SUM(xp), 0) AS xp FROM activity WHERE user_id = ? AND day = ?").get(user.id, localDay(offset)).xp;
    const week = [];
    for (let i = 6; i >= 0; i -= 1) {
      const day = localDay(offset, i);
      const row = db.prepare("SELECT xp FROM activity WHERE user_id = ? AND day = ?").get(user.id, day);
      week.push({ day, xp: row ? row.xp : 0 });
    }
    const due = db.prepare("SELECT item_id FROM mistakes WHERE user_id = ? AND due_at <= ?").all(user.id, Date.now()).filter((r) => itemIndex.has(r.item_id)).length;
    return {
      user: { name: user.name, level: user.level, skills: user.skills ? JSON.parse(user.skills) : null, startIndex: user.level ? START_INDEX[user.level] ?? 0 : 0 },
      xp: total,
      todayXp: today,
      dailyGoal: DAILY_GOAL,
      streak: streakOf(user.id, offset),
      progress,
      week,
      dueCount: due,
    };
  };

  const isUnlocked = (user, progress, lessonId) => {
    const index = lessonOrder.indexOf(lessonId);
    if (index < 0) return false;
    const start = user.level ? START_INDEX[user.level] ?? 0 : 0;
    if (index === 0 || index <= start) return true;
    return (progress[lessonOrder[index - 1]] ?? 0) >= MASTERY;
  };

  app.post("/api/register", (req, res) => {
    if (!authLimit(`r:${req.ip}`)) return res.status(429).json({ error: "Too many attempts. Try again in a few minutes." });
    const { name, password, invite } = req.body || {};
    if (!inviteCode || typeof invite !== "string" || !safeEqual(invite.trim(), inviteCode)) return res.status(403).json({ error: "Invalid invite code" });
    if (typeof name !== "string" || !/^[\p{L}\p{N} ._-]{2,24}$/u.test(name.trim())) return res.status(400).json({ error: "Name must be 2 to 24 characters" });
    if (typeof password !== "string" || password.length < 6 || password.length > 100) return res.status(400).json({ error: "Password must be at least 6 characters" });
    try {
      const result = db.prepare("INSERT INTO users (name, pass_hash, created_at) VALUES (?, ?, ?)").run(name.trim(), hashPassword(password), Date.now());
      setCookie(req, res, createSession(db, Number(result.lastInsertRowid)), 30 * 86400);
      res.status(201).json({ ok: true });
    } catch (error) {
      if (String(error.message).includes("UNIQUE")) return res.status(409).json({ error: "That name is already taken" });
      throw error;
    }
  });

  app.post("/api/login", (req, res) => {
    if (!authLimit(`l:${req.ip}`)) return res.status(429).json({ error: "Too many attempts. Try again in a few minutes." });
    const { name, password } = req.body || {};
    const user = typeof name === "string" ? db.prepare("SELECT * FROM users WHERE name = ?").get(name.trim()) : null;
    if (!user || typeof password !== "string" || !verifyPassword(password, user.pass_hash)) return res.status(401).json({ error: "Incorrect name or password" });
    setCookie(req, res, createSession(db, user.id), 30 * 86400);
    res.json({ ok: true });
  });

  app.post("/api/logout", (req, res) => {
    destroySession(db, parseCookies(req.get("cookie"))[COOKIE]);
    setCookie(req, res, "", 0);
    res.json({ ok: true });
  });

  app.get("/api/me", requireUser, (req, res) => res.json(profile(req.user, tzOf(req))));

  app.post("/api/diagnostic", requireUser, (req, res) => {
    const ids = new Set(diagnostic.map((d) => d.id));
    const results = cleanResults(req.body?.results, (id) => ids.has(id));
    if (!results || results.length < 8) return res.status(400).json({ error: "Invalid results" });
    const byLevel = new Map();
    const bySkill = new Map();
    for (const { id, ok } of results) {
      const item = itemIndex.get(id);
      const level = byLevel.get(item.lvl) || { ok: 0, n: 0 };
      level.n += 1;
      if (ok) level.ok += 1;
      byLevel.set(item.lvl, level);
      const skill = bySkill.get(item.skill) || { ok: 0, n: 0 };
      skill.n += 1;
      if (ok) skill.ok += 1;
      bySkill.set(item.skill, skill);
    }
    let estimate = 0;
    for (let lvl = 1; lvl <= 5; lvl += 1) {
      const g = byLevel.get(lvl);
      if (g && g.n >= 2 && g.ok / g.n >= 0.6) estimate = lvl;
    }
    const above = byLevel.get(estimate + 1);
    if (above && above.n >= 2 && above.ok / above.n >= 0.4) estimate += 0.5;
    const level = levelFromDifficulty(estimate);
    const skills = Object.fromEntries([...bySkill].map(([k, v]) => [k, Math.round((v.ok / v.n) * 100)]));
    db.prepare("UPDATE users SET level = ?, level_score = ?, skills = ? WHERE id = ?").run(level, estimate, JSON.stringify(skills), req.user.id);
    recordResults(req.user.id, results, false);
    if (!req.user.level) addXp(req.user.id, 20, tzOf(req));
    res.json({ level, skills, startIndex: START_INDEX[level] });
  });

  app.post("/api/lesson", requireUser, (req, res) => {
    const lesson = lessonIndex.get(req.body?.lessonId);
    if (!lesson) return res.status(400).json({ error: "Unknown lesson" });
    const offset = tzOf(req);
    const current = profile(req.user, offset);
    if (!isUnlocked(req.user, current.progress, lesson.id)) return res.status(403).json({ error: "Lesson is locked" });
    const allowed = new Set(lesson.pool.map((e) => e.id));
    const results = cleanResults(req.body?.results, (id) => allowed.has(id));
    if (!results || results.length !== Math.min(LESSON_SIZE, allowed.size)) return res.status(400).json({ error: "Invalid results" });
    const correct = results.filter((r) => r.ok).length;
    const score = Math.round((correct / results.length) * 100);
    const previous = db.prepare("SELECT best FROM progress WHERE user_id = ? AND lesson_id = ?").get(req.user.id, lesson.id);
    db.prepare(
      "INSERT INTO progress (user_id, lesson_id, best) VALUES (?, ?, ?) ON CONFLICT(user_id, lesson_id) DO UPDATE SET best = MAX(best, excluded.best), plays = plays + 1",
    ).run(req.user.id, lesson.id, score);
    const base = 10 + correct * 2;
    const xp = previous ? Math.round(base * 0.3) : base;
    addXp(req.user.id, xp, offset);
    recordResults(req.user.id, results, false);
    res.json({ ...profile(req.user, offset), score, gained: xp, mastered: score >= MASTERY });
  });

  app.get("/api/review", requireUser, (req, res) => {
    const rows = db.prepare("SELECT item_id FROM mistakes WHERE user_id = ? AND due_at <= ? ORDER BY due_at").all(req.user.id, Date.now())
      .filter((r) => itemIndex.has(r.item_id)).slice(0, 10);
    res.json({ ids: rows.map((r) => r.item_id) });
  });

  app.post("/api/review", requireUser, (req, res) => {
    const results = cleanResults(req.body?.results, (id) => itemIndex.has(id));
    if (!results || !results.length) return res.status(400).json({ error: "Invalid results" });
    recordResults(req.user.id, results, true);
    const xp = results.filter((r) => r.ok).length * 2;
    addXp(req.user.id, xp, tzOf(req));
    res.json({ xp });
  });

  const coachUse = new Map();
  app.post("/api/speaking/feedback", requireUser, async (req, res) => {
    if (!coach.available()) return res.json({ available: false, reason: NO_KEY_REASON });
    const { prompt, transcript, seconds, phrasal } = req.body || {};
    const target = typeof phrasal === "string" ? phrasalById(phrasal) : null;
    if (typeof prompt !== "string" || typeof transcript !== "string") return res.status(400).json({ error: "Invalid request" });
    const text = transcript.trim().slice(0, 3000);
    if (text.split(/\s+/).length < 8) return res.status(400).json({ error: "Speak a little longer so there is something to review" });
    const day = new Date().toISOString().slice(0, 10);
    const key = `${req.user.id}:${day}`;
    const used = coachUse.get(key) || 0;
    if (used >= 30) return res.status(429).json({ error: "Daily AI feedback limit reached. Try again tomorrow." });
    coachUse.set(key, used + 1);
    if (coachUse.size > 5000) coachUse.clear();
    try {
      const feedback = await coach.review({ prompt: prompt.slice(0, 600), transcript: text, seconds: Math.max(1, Math.min(300, Math.round(Number(seconds) || 30))), phrasal: target });
      // The transcript check is the ground truth for "used it at all"; the model judges whether it was used correctly.
      if (target) {
        const used = usesPhrasal(text, target);
        feedback.phrasal = { pv: target.pv, used, correct: used && feedback.phrasal?.correct !== false, comment: used ? feedback.phrasal?.comment || "" : "" };
      }
      res.json({ available: true, feedback });
    } catch (error) {
      coachUse.set(key, used);
      console.error("speaking feedback failed:", error.message);
      res.json({ available: false, reason: `The AI service failed (${error.message})` });
    }
  });

  // Word lookup for the hover/long-press dictionary. Cached per word; AI first (meaning in context plus
  // Spanish), then the free dictionaryapi.dev as a fallback without translation.
  const definitions = new Map();
  app.get("/api/define", requireUser, async (req, res) => {
    const word = String(req.query.w || "").toLowerCase().trim();
    if (!/^[a-z][a-z'-]{0,30}$/.test(word)) return res.status(400).json({ error: "Invalid word" });
    if (definitions.has(word)) return res.json(definitions.get(word));
    const key = `d:${req.user.id}:${new Date().toISOString().slice(0, 10)}`;
    const used = coachUse.get(key) || 0;
    if (used >= 300) return res.status(429).json({ error: "Daily dictionary limit reached" });
    coachUse.set(key, used + 1);
    const context = String(req.query.c || "").slice(0, 240);
    let entry = null;
    if (coach.available() && coach.define) entry = await coach.define({ word, context }).catch(() => null);
    if (!entry) entry = await lookupWord(word).catch(() => null);
    if (!entry) return res.status(404).json({ error: "No definition found" });
    if (definitions.size > 5000) definitions.clear();
    definitions.set(word, entry);
    res.json(entry);
  });

  app.post("/api/writing/feedback", requireUser, async (req, res) => {
    if (!coach.available() || !coach.reviewWriting) return res.json({ available: false, reason: NO_KEY_REASON });
    const { prompt, text, min } = req.body || {};
    if (typeof prompt !== "string" || typeof text !== "string") return res.status(400).json({ error: "Invalid request" });
    const body = text.trim().slice(0, 3000);
    const words = body.split(/\s+/).length;
    if (words < 15) return res.status(400).json({ error: "Write a little more so there is something to review" });
    const day = new Date().toISOString().slice(0, 10);
    const key = `w:${req.user.id}:${day}`;
    const used = coachUse.get(key) || 0;
    if (used >= 20) return res.status(429).json({ error: "Daily AI feedback limit reached. Try again tomorrow." });
    coachUse.set(key, used + 1);
    try {
      const feedback = await coach.reviewWriting({ prompt: prompt.slice(0, 600), text: body, words, min: Math.max(0, Math.min(500, Math.round(Number(min) || 0))) });
      res.json({ available: true, feedback });
    } catch (error) {
      coachUse.set(key, used);
      console.error("writing feedback failed:", error.message);
      res.json({ available: false, reason: `The AI service failed (${error.message})` });
    }
  });

  app.post("/api/lab", requireUser, (req, res) => {
    const { kind } = req.body || {};
    const xp = { speaking: 12, listening: 10, song: 10, exam: 30, phrasal: 8 }[kind];
    if (!xp) return res.status(400).json({ error: "Invalid type" });
    addXp(req.user.id, xp, tzOf(req));
    res.json({ xp });
  });

  app.post("/api/writing", requireUser, (req, res) => {
    const { promptId, text, score } = req.body || {};
    if (typeof promptId !== "string" || typeof text !== "string" || !text.trim() || text.length > 6000) return res.status(400).json({ error: "Invalid text" });
    const clean = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const words = text.trim().split(/\s+/).length;
    db.prepare("INSERT INTO writing_entries (user_id, prompt_id, words, score, text, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(req.user.id, promptId.slice(0, 20), words, clean, text, Date.now());
    addXp(req.user.id, 15, tzOf(req));
    res.json({ xp: 15 });
  });

  app.get("/api/writing", requireUser, (req, res) => {
    res.json({ entries: db.prepare("SELECT id, prompt_id AS promptId, words, score, text, created_at AS createdAt FROM writing_entries WHERE user_id = ? ORDER BY id DESC LIMIT 20").all(req.user.id) });
  });

  app.get("/api/songs", requireUser, (req, res) => {
    const rows = db.prepare("SELECT s.id, s.video_id AS videoId, s.title, s.level, s.genre, s.user_id AS owner, u.name AS addedBy FROM songs s JOIN users u ON u.id = s.user_id ORDER BY s.id DESC LIMIT 300").all();
    res.json({ songs: rows.map(({ owner, ...s }) => ({ ...s, mine: owner === req.user.id })) });
  });

  app.get("/api/songs/:id", requireUser, (req, res) => {
    const row = db.prepare("SELECT s.id, s.video_id AS videoId, s.title, s.level, s.genre, s.lyrics, s.user_id AS owner, u.name AS addedBy FROM songs s JOIN users u ON u.id = s.user_id WHERE s.id = ?").get(Number(req.params.id));
    if (!row) return res.status(404).json({ error: "Song not found" });
    const { owner, ...song } = row;
    res.json({ song: { ...song, mine: owner === req.user.id } });
  });

  app.post("/api/songs", requireUser, async (req, res) => {
    const song = validateSong(req.body || {});
    if (song.error) return res.status(400).json({ error: song.error });
    try {
      const title = song.title || (await fetchTitle(song.videoId)) || "Untitled song";
      const info = db.prepare("INSERT INTO songs (user_id, video_id, title, level, genre, lyrics, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(req.user.id, song.videoId, title.slice(0, 80), song.level, song.genre, song.lyrics, Date.now());
      res.json({ id: Number(info.lastInsertRowid) });
    } catch (error) {
      if (!production) console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // The owner can swap the video (e.g. for a lyrics version that allows embedding) or recategorise the song.
  app.post("/api/songs/:id/update", requireUser, (req, res) => {
    const row = db.prepare("SELECT * FROM songs WHERE id = ? AND user_id = ?").get(Number(req.params.id), req.user.id);
    if (!row) return res.status(404).json({ error: "Song not found" });
    const { url, genre, level } = req.body || {};
    const videoId = url ? parseVideoId(url) : row.video_id;
    if (!videoId) return res.status(400).json({ error: "That does not look like a YouTube link" });
    const next = { videoId, genre: SONG_GENRES.includes(genre) ? genre : row.genre, level: SONG_LEVELS.includes(level) ? level : row.level };
    db.prepare("UPDATE songs SET video_id = ?, genre = ?, level = ? WHERE id = ?").run(next.videoId, next.genre, next.level, row.id);
    res.json({ ok: true, ...next });
  });

  app.post("/api/songs/:id/delete", requireUser, (req, res) => {
    const info = db.prepare("DELETE FROM songs WHERE id = ? AND user_id = ?").run(Number(req.params.id), req.user.id);
    if (!info.changes) return res.status(404).json({ error: "Song not found" });
    res.json({ ok: true });
  });

  app.get("/api/leaderboard", requireUser, (req, res) => {
    const since = localDay(tzOf(req), 6);
    const rows = db
      .prepare(
        "SELECT u.id, u.name, u.level, COALESCE(SUM(a.xp), 0) AS xp FROM users u LEFT JOIN activity a ON a.user_id = u.id AND a.day >= ? GROUP BY u.id ORDER BY xp DESC, u.name LIMIT 50",
      )
      .all(since);
    res.json({ rows: rows.map((r) => ({ name: r.name, level: r.level, xp: r.xp, you: r.id === req.user.id })) });
  });

  app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

  const dist = join(process.cwd(), distDir);
  if (existsSync(dist)) {
    app.use(express.static(dist, { setHeaders: (res, path) => { if (path.endsWith("sw.js")) res.set("Cache-Control", "no-cache"); } }));
    app.get("*", (req, res) => res.sendFile(join(dist, "index.html")));
  }

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    if (!production) console.error(error);
    res.status(error.status === 400 ? 400 : 500).json({ error: "Server error" });
  });

  return app;
}
