# Upword

Plataforma de inglés (B1 → B2, orientada a TOEFL/similares) para un grupo de amigos. Mobile-first, instalable como PWA. Habla y escucha son lo principal; la escritura se hace a mano.

## Qué incluye

- Diagnóstico adaptativo (20 preguntas) que estima tu nivel y coloca tu punto de partida.
- A2→B2 route: 10 units / 30 lessons / 240 exercises, mostly production tasks (mastery = 80 % first try). The whole app is in English.
- Labs: 26 speaking prompts, 14 listening clips with real human voices (LibriSpeech / LibriVox readers, CC BY 4.0, openslr.org/12), 18 handwriting prompts.
- Repaso espaciado de errores, laboratorios de speaking, listening y writing a mano.
- Cuentas por código de invitación, racha, meta diaria, XP y ranking semanal.

## Ejecutar en local

```
npm install
npm run dev          # frontend en :5173, API en :3000
```

Código de invitación en desarrollo: `upword`.

Producción local:

```
npm run build
npm start            # sirve API + app en :3000
npm test
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `INVITE_CODE` | Obligatoria en producción. Código que tus amigos usan para registrarse. |
| `PORT` | Puerto (3000 por defecto). |
| `DB_FILE` | Ruta de la base SQLite (`data/upword.db` por defecto). |
| `NODE_ENV=production` | Cookies seguras y código obligatorio. |

## Despliegue

```
docker build -t upword .
docker run -d -p 3000:3000 -e INVITE_CODE=tu-codigo -v upword-data:/data upword
```

Monta un volumen persistente en `/data`. Publícalo detrás de HTTPS (necesario para micrófono, PWA y cookies seguras).

### Render (recomendado para pruebas rápidas)

Este proyecto ya incluye [render.yaml](./render.yaml) con servicio Docker + disco persistente.

1. Sube el proyecto a un repositorio Git.
2. En Render, usa **New + → Blueprint** y selecciona ese repositorio.
3. Define `INVITE_CODE` como secreto.
4. Despliega y abre la URL pública HTTPS.

Deploy directo con este repositorio:

`https://render.com/deploy?repo=https://github.com/RaggioIl48/nevergiveup`

## Límites conocidos

- La escritura a mano no se reconoce automáticamente: escribes en papel, transcribes y recibes feedback basado en reglas. No es una nota oficial.
- La puntuación se calcula en el cliente para dar respuesta instantánea; no es a prueba de trampas (pensado para un grupo de confianza).
- Todo el contenido es original; no usa material de TOEFL.
- Reconocimiento de voz y TTS dependen del navegador (mejor en Chrome/Android y Safari iOS).

## Herramientas del proyecto

rsc-harness (`.github/`, `02-DOCS/`), REA (`.vscode/mcp.json`) e Impeccable (`PRODUCT.md`, `DESIGN.md`, skills en `.github/`).

## Songs (listen and fill)

Practice > Songs: a member pastes a YouTube link and the lyrics; blanks are generated automatically (Easy/Medium/Hard) or forced with {braces}. Songs and lyrics are stored only in the private database, never in the repo. The video plays through the YouTube embed (no time sync). Only add lyrics your group may use.


## Listening exams and speaking score

Practice > Listening exams: timed TOEFL, IELTS, Cambridge B2 First and Real voices simulations. They draw from a bank of 158 recordings (74 real LibriSpeech voices, CC BY 4.0; 84 conversations, lectures and talks read by the device's synthetic voices), avoid recordings already seen, and play once. Scores are rough estimates, not official results. Speaking is scored automatically from the browser transcript (pace, variety, links, topic); browsers without speech recognition fall back to self-assessment.


## AI speaking coach

Set one or more AI keys on the server to get written feedback on speaking transcripts and on Writing texts: level, scores, what worked, specific fixes and a tip.

| Variable | Provider | Notes |
|---|---|---|
| `DEEPSEEK_API_KEY` | DeepSeek (platform.deepseek.com) | Paid but very cheap; needs credit. Optional `DEEPSEEK_MODEL` (default `deepseek-chat`). |
| `GROQ_API_KEY` | Groq (console.groq.com) | Free tier. Optional `GROQ_MODEL`; otherwise it tries gpt-oss-120b, llama-3.3-70b and smaller ones, then any model the key can list. |
| `GEMINI_API_KEY` | Google AI Studio | Free tier, often 503 under high demand; it then tries other Flash and Flash-Lite models, which have separate capacity. Optional `GEMINI_MODEL`. |

Providers are tried in the order of `AI_PROVIDERS` (default `groq,gemini,deepseek`, so the free ones go first), skipping those without a key; if one fails (for example Gemini 503), the next one answers. The learner only sees an error when every configured provider failed. Limits per user per day: 30 speaking reviews, 20 writing reviews. Without a key the app falls back to a local estimate. Only text is sent, never audio or images. On Google's free tier, prompts may be used to improve their products, so tell members before enabling it.


## Keeping accounts on Render Free

Render Free wipes the disk on every deploy. Set BACKUP_GITHUB_TOKEN (a GitHub token with the gist scope) and BACKUP_GIST_ID (a secret gist containing a file named upword-backup.json). The server saves a snapshot ~15 s after any change and on shutdown, and restores it on boot when the database is empty. If GitHub cannot be reached at boot, the server keeps retrying and refuses writes until the backup is loaded, so it never overwrites the gist with an empty database. Open `/api/health` to check: `backup.enabled` and `backup.ready` must be true, and `lastSavedAt` shows the last snapshot.
