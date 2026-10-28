const TABLES = ["users", "sessions", "progress", "activity", "mistakes", "writing_entries", "songs"];
const FILE = "upword-backup.json";
const API = "https://api.github.com/gists/";

export function dumpDb(db) {
  const out = {};
  for (const t of TABLES) out[t] = db.prepare(`SELECT * FROM ${t}`).all();
  return out;
}

export function restoreDb(db, data) {
  db.exec("BEGIN");
  try {
    for (const t of TABLES) {
      for (const row of data[t] || []) {
        const cols = Object.keys(row);
        db.prepare(`INSERT OR REPLACE INTO ${t} (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`).run(...cols.map((c) => row[c]));
      }
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

// Free durable storage: a private GitHub Gist holds a JSON snapshot, because Render's free tier wipes the disk.
export function createBackup(db, { token = process.env.BACKUP_GITHUB_TOKEN, gistId = process.env.BACKUP_GIST_ID, delayMs = 15000, fetchImpl = fetch } = {}) {
  const enabled = Boolean(token && gistId);
  const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "upword", "Content-Type": "application/json" };
  let timer = null;
  let dirty = false;
  // Until the gist has been read, saving would overwrite the real backup with an empty database.
  let ready = !enabled;
  let lastSavedAt = null;
  let lastError = null;

  async function save() {
    clearTimeout(timer);
    timer = null;
    if (!enabled || !ready || !dirty) return;
    dirty = false;
    try {
      const body = JSON.stringify({ files: { [FILE]: { content: JSON.stringify(dumpDb(db)) } } });
      const res = await fetchImpl(API + gistId, { method: "PATCH", headers, body });
      if (!res.ok) throw new Error(`Gist ${res.status}`);
      lastSavedAt = new Date().toISOString();
      lastError = null;
    } catch (error) {
      dirty = true;
      lastError = `save: ${error.message}`;
      console.error("Backup failed:", error.message);
    }
  }

  async function restoreIfEmpty() {
    if (!enabled) return false;
    if (db.prepare("SELECT COUNT(*) AS n FROM users").get().n > 0) {
      ready = true;
      return false;
    }
    try {
      const res = await fetchImpl(API + gistId, { headers });
      if (!res.ok) throw new Error(`Gist ${res.status}`);
      const file = (await res.json()).files?.[FILE];
      let restored = false;
      if (file?.content || file?.truncated) {
        const text = file.truncated ? await (await fetchImpl(file.raw_url, { headers })).text() : file.content;
        restoreDb(db, JSON.parse(text));
        console.log("Restored accounts and progress from backup.");
        restored = true;
      }
      ready = true;
      lastError = null;
      return restored;
    } catch (error) {
      lastError = `restore: ${error.message}`;
      console.error("Restore failed:", error.message);
      return false;
    }
  }

  return {
    enabled,
    save,
    restoreIfEmpty,
    isReady: () => ready,
    status: () => ({ enabled, ready, lastSavedAt, lastError }),
    markDirty() {
      if (!enabled) return;
      dirty = true;
      if (!timer) timer = setTimeout(save, delayMs);
    },
    // Retries the restore until it works, so a GitHub hiccup at boot never loses the accounts.
    async start({ retryMs = 30000 } = {}) {
      await restoreIfEmpty();
      if (ready) return;
      const retry = setInterval(async () => {
        await restoreIfEmpty();
        if (ready) {
          clearInterval(retry);
          if (dirty) save();
        }
      }, retryMs);
      retry.unref?.();
    },
  };
}
