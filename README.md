# Upword

Plataforma de inglés (B1 → B2, orientada a TOEFL/similares) para un grupo de amigos. Mobile-first, instalable como PWA. Habla y escucha son lo principal; la escritura se hace a mano.

## Qué incluye

- Diagnóstico adaptativo (20 preguntas) que estima tu nivel y coloca tu punto de partida.
- Ruta de 7 unidades / 21 lecciones / 126 ejercicios (dominio = 80 % a la primera).
- Laboratorios con 17 prácticas de speaking, 7 textos de listening y 12 propuestas de writing a mano.
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
