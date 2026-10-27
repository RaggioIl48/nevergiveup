import { openDb } from "./db.js";
import { createApp } from "./app.js";

const production = process.env.NODE_ENV === "production";
const inviteCode = process.env.INVITE_CODE || (production ? "" : "upword");
if (!inviteCode) {
  console.error("Missing INVITE_CODE variable (the code your friends use to sign up).");
  process.exit(1);
}

const app = createApp(openDb(), { inviteCode, production });
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Upword escuchando en http://localhost:${port}`));
