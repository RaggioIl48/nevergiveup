import { openDb } from "./db.js";
import { createApp } from "./app.js";
import { createBackup } from "./backup.js";

const production = process.env.NODE_ENV === "production";
const inviteCode = process.env.INVITE_CODE || (production ? "" : "upword");
if (!inviteCode) {
  console.error("Missing INVITE_CODE variable (the code your friends use to sign up).");
  process.exit(1);
}

const db = openDb();
const backup = createBackup(db);
if (production && !backup.enabled) console.warn("BACKUP_GITHUB_TOKEN / BACKUP_GIST_ID not set: accounts will be lost on every deploy.");
await backup.start();

const app = createApp(db, { inviteCode, production, backup });
const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => console.log(`Upword escuchando en http://localhost:${port}`));

// Render sends SIGTERM on deploy and when a free instance goes to sleep: flush the last changes before dying.
const shutdown = async () => {
  await backup.save();
  server.close(() => process.exit(0));
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
