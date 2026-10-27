import { openDb } from "./db.js";
import { createApp } from "./app.js";

const production = process.env.NODE_ENV === "production";
const inviteCode = process.env.INVITE_CODE || (production ? "" : "upword");
if (!inviteCode) {
  console.error("Falta la variable INVITE_CODE (código para que tus amigos se registren).");
  process.exit(1);
}

const app = createApp(openDb(), { inviteCode, production });
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Upword escuchando en http://localhost:${port}`));
