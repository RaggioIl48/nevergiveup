# Upword — Resumen Técnico y Funcional del Proyecto

> **Versión:** 2.0.0  
> **Tipo:** Aplicación Web Progresiva (PWA) / Single Page Application (SPA)  
> **Enfoque:** Mobile-first, orientada a adultos hispanohablantes (Nivel B1 → B2 / Preparación TOEFL, IELTS, Cambridge B2 First).

---

## 1. Visión General y Propósito

**Upword** es una plataforma de aprendizaje y entrenamiento de inglés diseñada para un grupo cerrado de amigos y compañeros de estudio. El objetivo central es acelerar el progreso desde un nivel intermedio (B1) hacia un nivel avanzado/operativo (B2), haciendo especial énfasis en las habilidades de producción activa (**habla**, **escucha** y **escritura a mano**).

### Principios Fundamentales de Producto:
1. **Producción sobre reconocimiento:** Se prioriza que el alumno escriba, hable y elabore respuestas activas en lugar de solo seleccionar opciones múltiples o tocar burbujas.
2. **Escritura manual consciente:** Los ejercicios de redacción (*writing*) están diseñados para ser redactados primero en papel a mano y luego transcritos a la plataforma para recibir retroalimentación.
3. **Inmersión total en inglés:** Todos los ejercicios, audios y contenidos pedagógicos están 100% en inglés; los textos de navegación y ayuda de la interfaz están en español claro y conciso.
4. **Comunidad cerrada y motivadora:** Acceso exclusivo mediante código de invitación (`INVITE_CODE`), estadísticas compartidas, rachas y ranking semanal.

---

## 2. Arquitectura y Stack Tecnológico

El proyecto destaca por una arquitectura minimalista, de alto rendimiento y con cero dependencias innecesarias de frameworks cliente.

### Frontend
* **Vanilla JavaScript (ES Modules):** Sin frameworks pesados (sin React, Vue ni Angular). Manipulación del DOM directa y ligera mediante funciones utilitarias reactivas (`src/dom.js`: `h()`, `mount()`, `toast()`).
* **Vite 7:** Entorno de desarrollo ultrarrápido y empaquetador para producción.
* **PWA & Capacidades Nativas:**
  * Manifiesto web (`public/manifest.webmanifest`) y Service Worker (`public/sw.js`) para instalación como app nativa en móviles.
  * Uso de **Web Speech API** nativa del navegador:
    * *SpeechRecognition* para transcripción de voz en tiempo real.
    * *SpeechSynthesis* para lectura de textos sin costo de API externa.
* **Sistema de Diseño (Notebook/Paper Aesthetic):**
  * Estilos CSS limpios y modulares (`tokens.css`, `base.css`, `components.css`).
  * Paleta cálida basada en papel (`#F7F2E8`), tinta oscura (`#1B2340`) y acento de acción (`#E04E2B`).
  * Controles táctiles "Keys" con relieve 3D de 4px que se hunden físicamente al presionar (*touch targets* $\ge$ 48px).
  * Tipografías auto-hospedadas: *Bricolage Grotesque* (títulos/display) y *Figtree* (cuerpo de texto).
  * Iconografía unificada mediante **Lucide**.

### Backend
* **Node.js (Express):** Servidor HTTP liviano que sirve tanto los endpoints de la API REST como la aplicación estática en producción.
* **Base de Datos SQLite Nativa:** Utiliza el módulo incorporado `node:sqlite` de Node.js (sin ORM) almacenando datos en `data/upword.db`.
* **Seguridad y Sesiones:**
  * Hasheo criptográfico de contraseñas con `scrypt` (`server/auth.js`).
  * Sesiones basadas en cookies seguras (`HttpOnly`, `SameSite=Lax`, `Secure` en HTTPS).
  * Rate limiting por IP para protección de endpoints de autenticación y consumo de IA.
  * Registro restringido por código de invitación.
* **Resiliencia y Persistencia (GitHub Gist Backup):**
  * Diseñado para plataformas en la nube efímeras (como el nivel gratuito de Render).
  * `server/backup.js` sincroniza automáticamente snapshots de la base de datos a un GitHub Gist privado (~15 s tras cambios y en eventos `SIGTERM`/`SIGINT`).
  * Restaura el estado automáticamente en el arranque antes de admitir peticiones de escritura.

### Inteligencia Artificial (AI Coach)
* **Pipeline Multi-proveedor con Cascada de Fallback (`server/coach.js`):**
  * Conexión con **Groq**, **Google Gemini** y **DeepSeek**.
  * Si un proveedor falla o agota cuota (por ejemplo, errores 503 por alta demanda en Gemini), conmuta de forma automática e inmediata al siguiente proveedor configurado.
  * Límites diarios por usuario para evitar abusos (30 revisiones de speaking, 20 de writing, 300 definiciones de diccionario).
  * En ausencia de claves de API, el sistema degrada con elegancia a un motor de evaluación heurístico local.

---

## 3. Módulos y Funcionalidades Clave

### 1. Diagnóstico Inicial Adaptativo (`/diagnostic`)
* Evaluación calibrada de 20 preguntas con dificultad dinámica.
* Determina el nivel de partida del estudiante (de A1 a B2+) y lo posiciona directamente en el punto óptimo de la ruta formativa.

### 2. Ruta de Aprendizaje Modular (`/home`)
* **10 Unidades / 30 Lecciones:** Cubre desde consolidación A2 hasta nivel B2 avanzado.
* **Banco de Ejercicios Dinámico:** Cada lección selecciona al azar 8 ejercicios de un banco de 24 ítems (más de 720 ítems en total), garantizando que repetir una lección nunca sea idéntico.
* **Criterio de Maestría:** Se exige un 80% de aciertos para desbloquear la lección siguiente.

### 3. Repaso Espaciado de Errores (`/review`)
* Basado en el algoritmo de cajas Leitner con intervalos crecientes: **1, 3, 7, 14, 30 y 60 días**.
* Cualquier error cometido en lecciones o diagnósticos entra automáticamente al ciclo de repaso para asegurar retención a largo plazo.

### 4. Laboratorios de Práctica Especializada (`/practice`)
* **Speaking Lab:**
  * 120 consignas orales en formatos de entrevista, tareas integradas e independientes estilo TOEFL/IELTS.
  * Reconocimiento de voz en vivo, análisis de fluidez, vocabulario, gramática y cumplimiento de la tarea.
* **Listening Lab & Exams:**
  * Simulacros cronometrados de exámenes oficiales (TOEFL, IELTS, Cambridge B2 First y Real Voices).
  * Banco de 176 audios: 74 grabaciones humanas reales en formato FLAC (*LibriSpeech*, CC BY 4.0) y 102 audios sintéticos de diálogos y conferencias.
* **Writing Lab:**
  * 18 consignas temáticas orientadas a ensayos y respuestas cortas.
  * Conteo de palabras, validación de extensión y retroalimentación analítica sobre estructura, enlaces y corrección.
* **Songs Lab (Listen & Fill):**
  * Permite añadir enlaces de YouTube y letras de canciones.
  * Genera ejercicios interactivos de rellenar huecos (*Easy*, *Medium*, *Hard* o marcas `{hueco}`).
  * Almacenamiento privado en SQLite (las letras no se versionan en Git).
* **Phrasal Verbs:**
  * Entrenamiento diario de phrasal verbs clave y verificación de su uso dentro de las respuestas de speaking.
* **Diccionario Contextual:**
  * Al pulsar o pasar el cursor sobre cualquier palabra en inglés se despliega su definición y ejemplo, consultando la IA o la Free Dictionary API.

### 5. Gamificación y Aspecto Social
* Sistema de experiencia (**XP**), metas diarias (30 XP), contador de días seguidos (**racha / streak**) y tabla de clasificación semanal (**Leaderboard**) entre los miembros del grupo.

---

## 4. Estructura del Repositorio

```text
├── content/              # Contenido pedagógico, bancos de preguntas y audios
│   ├── bank/             # Conversaciones, lectures y lecturas para listening
│   ├── diagnostic.js     # Banco de preguntas del diagnóstico inicial
│   ├── exams.js          # Lógica y configuraciones de simulacros de examen
│   ├── phrasal-verbs.js  # Base de phrasal verbs y lógica de detección
│   ├── songs.js          # Validadores y generador de huecos para canciones
│   └── units.js          # Definición de unidades, lecciones y ejercicios
├── server/               # Lógica del backend Node.js / Express
│   ├── app.js            # Rutas de la API REST y middleware de seguridad
│   ├── auth.js           # Manejo de usuarios, sesiones scrypt y rate limiters
│   ├── backup.js         # Sincronización continua de SQLite con GitHub Gist
│   ├── coach.js          # Integración multi-proveedor de IA (Groq/Gemini/DeepSeek)
│   ├── db.js             # Esquema DDL y apertura de base de datos SQLite
│   └── index.js          # Inicialización del servidor HTTP y listeners
├── src/                  # Código cliente Vanilla JS
│   ├── styles/           # tokens.css, base.css, components.css
│   ├── views/            # Vistas SPA (auth, tabs, labs, exams, phrasal, flujos)
│   ├── api.js            # Wrapper para consumo de endpoints REST
│   ├── audio.js          # Control de SpeechSynthesis y SpeechRecognition
│   ├── dom.js            # Funciones reactivas minimalistas (h, mount, toast)
│   ├── exercises.js      # Motores de renderizado de tipos de ejercicio
│   ├── lookup.js         # Diccionario emergente
│   └── main.js           # Enrutador por hash y punto de entrada de la SPA
├── public/               # Audios reales (.flac), manifest PWA, Service Worker
├── data/                 # Base de datos SQLite local (upword.db)
├── test/                 # Batería de pruebas unitarias y de integración
├── 01-TOOLS/             # Scripts auxiliares (generación de audios TTS y pruebas)
├── Dockerfile            # Imagen de contenedor para despliegue
├── render.yaml           # Manifiesto Blueprint para despliegue en Render
├── PRODUCT.md            # Especificaciones de producto y experiencia
├── DESIGN.md             # Directrices de diseño visual e interfaz
└── README.md             # Instrucciones de arranque e instalación
```

---

## 5. Configuración y Despliegue

### Variables de Entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `INVITE_CODE` | Sí (en prod) | Código secreto que los usuarios deben ingresar para registrarse. |
| `PORT` | No | Puerto de escucha del servidor (por defecto: `3000`). |
| `DB_FILE` | No | Ruta del archivo SQLite (por defecto: `data/upword.db`). |
| `NODE_ENV` | No | Si es `production`, activa cookies estrictas y valida variables críticas. |
| `BACKUP_GITHUB_TOKEN` | Opcional | Token de GitHub con permisos de Gist para persistencia en la nube. |
| `BACKUP_GIST_ID` | Opcional | ID del Gist secreto que almacena `upword-backup.json`. |
| `GROQ_API_KEY` | Opcional | Clave para el motor de IA en Groq. |
| `GEMINI_API_KEY` | Opcional | Clave de Google AI Studio para el evaluador. |
| `DEEPSEEK_API_KEY` | Opcional | Clave de DeepSeek para fallback del evaluador. |

### Comandos de Ejecución

```bash
# Desarrollo local (Frontend en :5173, API en :3000)
npm run dev

# Construcción de producción
npm run build

# Iniciar servidor en producción (sirve estáticos + API en :3000)
npm start

# Ejecución de pruebas
npm test
```
