export const speakingPrompts = [
  { id: "s1", type: "Independiente", prep: 15, time: 45, q: "Some people prefer to study alone, others in groups. Which do you prefer and why?", tip: "Da tu postura, dos razones y un ejemplo personal." },
  { id: "s2", type: "Independiente", prep: 15, time: 45, q: "Describe a place where you feel relaxed. Explain why it is special to you.", tip: "Usa adjetivos y conectores: because, which means, that's why." },
  { id: "s3", type: "Independiente", prep: 15, time: 45, q: "Do you think technology makes people more or less social? Give reasons.", tip: "Reconoce el otro lado: although, on the other hand." },
  { id: "s4", type: "Independiente", prep: 15, time: 45, q: "Talk about a skill you would like to learn and how you would learn it.", tip: "Usa would y condicionales: if I had time, I would..." },
  { id: "s5", type: "Independiente", prep: 15, time: 45, q: "Describe a time when you had to solve an unexpected problem.", tip: "Narra en pasado: first, then, in the end." },
  { id: "s6", type: "Independiente", prep: 15, time: 45, q: "Is it better to live in a big city or a small town? Defend your choice.", tip: "Compara con ventajas y desventajas." },
  { id: "s7", type: "Opinión", prep: 20, time: 60, q: "Some universities require all students to take a course in public speaking. Do you agree or disagree?", tip: "Estructura: postura, razón 1, razón 2, cierre." },
  { id: "s8", type: "Opinión", prep: 20, time: 60, q: "Should governments spend more money on public transport than on roads?", tip: "Usa evidencia hipotética: for example, studies suggest..." },
  { id: "s9", type: "Opinión", prep: 20, time: 60, q: "Do you think children should have a smartphone before the age of twelve?", tip: "Matiza: it depends on, to some extent." },
  { id: "s10", type: "Resumen", prep: 20, time: 60, q: "Imagine a friend says: 'I always postpone important tasks until the last minute.' Give advice and explain it.", tip: "Usa should, why don't you, it might help to." },
  { id: "s11", type: "Resumen", prep: 20, time: 60, q: "Explain to a new colleague how to use an app you use every day.", tip: "Secuencia clara: first, next, after that, finally." },
  { id: "s12", type: "Resumen", prep: 20, time: 60, q: "Describe a news story you heard recently and say what you think about it.", tip: "Estilo indirecto: it was reported that..." },
  { id: "s13", type: "Opinión", prep: 20, time: 60, q: "Should universities make work experience or an internship part of every degree?", tip: "Explica una ventaja, un posible coste y tu postura final." },
  { id: "s14", type: "Opinión", prep: 20, time: 60, q: "Some cities are considering charging drivers to enter busy areas. Is this a fair way to reduce traffic?", tip: "Define quién se beneficia y quién podría verse perjudicado." },
  { id: "s15", type: "Resumen", prep: 20, time: 60, q: "Describe a time when new information changed your opinion about a decision.", tip: "Cuenta qué pensabas antes, qué aprendiste y qué decidiste." },
  { id: "s16", type: "Resumen", prep: 20, time: 60, q: "Explain one practical change your school or workplace could make to reduce waste.", tip: "Presenta el cambio, cómo se aplicaría y cómo medirías el resultado." },
  { id: "s17", type: "Opinión", prep: 20, time: 60, q: "Is it more important for a public library to offer quiet study space or community events?", tip: "Compara necesidades distintas y matiza tu respuesta." },
];

export const rubric = [
  { id: "fluency", label: "Fluidez", hint: "Hablé sin pausas largas" },
  { id: "grammar", label: "Gramática", hint: "Usé tiempos y estructuras variadas" },
  { id: "vocab", label: "Vocabulario", hint: "Evité repetir las mismas palabras" },
  { id: "pron", label: "Pronunciación", hint: "Se me entendería fácilmente" },
];

export const listeningPassages = [
  {
    id: "l1", title: "Cambio de horario",
    text: "Attention, students. Because of maintenance work in the library, opening hours will change next week. From Monday to Thursday, the library will close at six instead of ten. On Friday, it will be open as usual, but the silent study room will be closed all day. If you need a quiet place, the main hall on the second floor will stay open.",
    questions: [
      { q: "How long will the library stay open Monday to Thursday?", options: ["Until six", "Until ten", "All day", "It will close"], a: 0 },
      { q: "What will be closed on Friday?", options: ["The whole library", "The silent study room", "The main hall", "The second floor"], a: 1 },
      { q: "Where can students find a quiet place?", options: ["Silent room", "Main hall", "Cafeteria", "Garden"], a: 1 },
    ],
  },
  {
    id: "l2", title: "Mesa de trabajo",
    text: "So, my plan for the group project is this. First, each of us researches one topic for three days. Then we meet on Thursday to compare notes. Unless someone has a better idea, I suggest we use a shared document so everyone can edit it. Finally, we'll practise the presentation twice before the deadline.",
    questions: [
      { q: "How long is the research phase?", options: ["Three days", "One week", "Two days", "Until Thursday night"], a: 0 },
      { q: "What does the speaker suggest using?", options: ["A shared document", "Email only", "Paper notes", "A video"], a: 0 },
      { q: "How many times will they rehearse?", options: ["Once", "Twice", "Three times", "Never"], a: 1 },
    ],
  },
  {
    id: "l3", title: "Una nueva ciudad",
    text: "When I moved to Toronto, I thought the hardest part would be the cold. In fact, it was making friends. People were polite but busy, and nobody invited me anywhere. Things changed when I joined a climbing club. Within a month I had a group of friends, and the winter suddenly felt much shorter.",
    questions: [
      { q: "What did the speaker expect to be hardest?", options: ["The cold", "Making friends", "Work", "Language"], a: 0 },
      { q: "What was actually hardest?", options: ["The cold", "Making friends", "Finding a flat", "Transport"], a: 1 },
      { q: "What improved the situation?", options: ["A new job", "A climbing club", "Moving", "Summer"], a: 1 },
    ],
  },
  {
    id: "l4", title: "Clase de biología",
    text: "Honeybees communicate through a movement known as the waggle dance. The angle of the dance relative to the vertical shows the direction of the food in relation to the sun, while the length of the dance indicates distance. Researchers have even built robotic bees to test how colonies respond to these signals.",
    questions: [
      { q: "What does the angle of the dance show?", options: ["Distance", "Direction relative to the sun", "Danger", "Time of day"], a: 1 },
      { q: "What indicates distance?", options: ["The length of the dance", "The sound", "The colour", "The angle"], a: 0 },
      { q: "Why did researchers build robotic bees?", options: ["To collect honey", "To test colony responses", "To replace bees", "To measure sun"], a: 1 },
    ],
  },
  {
    id: "l5", title: "Debate sobre trabajo remoto",
    text: "Supporters of remote work say it improves productivity and saves time. However, critics point out that new employees often struggle to learn from colleagues, and that managers find it hard to judge performance. A hybrid model, in which staff come into the office two days a week, is increasingly seen as a compromise.",
    questions: [
      { q: "What do critics say about new employees?", options: ["They learn faster", "They struggle to learn from colleagues", "They prefer offices", "They work less"], a: 1 },
      { q: "What is a hybrid model?", options: ["Office two days a week", "Always at home", "Always in the office", "Four-day week"], a: 0 },
      { q: "How is the hybrid model viewed?", options: ["As a compromise", "As a failure", "As illegal", "As temporary"], a: 0 },
    ],
  },
  {
    id: "l6", title: "Un proyecto de energía",
    text: "The town is considering installing solar panels on the community centre. The project would reduce electricity costs over time, but the initial installation is expensive. A local grant could cover part of the cost. The committee will decide in June after residents have reviewed the full budget.",
    questions: [
      { q: "What is one expected long-term benefit?", options: ["More parking spaces", "Lower electricity costs", "A larger committee", "Free equipment for every home"], a: 1 },
      { q: "What is the main difficulty?", options: ["The centre is closed", "There is no sunlight", "The initial cost", "Residents cannot review the plan"], a: 2 },
      { q: "How might the town reduce the cost?", options: ["Apply for a local grant", "Delay the decision for a year", "Sell the community centre", "Raise electricity prices"], a: 0 },
      { q: "When will the committee decide?", options: ["Next week", "After the panels are installed", "At the end of the year", "In June"], a: 3 },
    ],
  },
  {
    id: "l7", title: "Tomar apuntes en una conferencia",
    text: "When you attend a lecture, writing down every sentence can make it difficult to follow the speaker. Instead, note the main claim and the evidence that supports it. Leave space to add questions later. If the speaker gives an example, record only the details that help explain the main idea.",
    questions: [
      { q: "Why should students avoid writing every sentence?", options: ["The lecturer will change the topic.", "Their notes will be too short.", "It can stop them following the speaker.", "Examples are never useful."], a: 2 },
      { q: "What should notes include?", options: ["Every word from the lecture", "The main claim and supporting evidence", "Only the speaker's questions", "A list of unrelated facts"], a: 1 },
      { q: "Why leave space in the notes?", options: ["To copy the full lecture", "To write the conclusion first", "To avoid listening", "To add questions later"], a: 3 },
      { q: "Which details from an example should be recorded?", options: ["Those that explain the main idea", "Every detail the speaker mentions", "Only names and dates", "Details unrelated to the claim"], a: 0 },
    ],
  },
];

export const writingPrompts = [
  { id: "w1", type: "Opinión", min: 120, q: "Do you agree or disagree: students should learn a second language from primary school?" },
  { id: "w2", type: "Opinión", min: 120, q: "Some people think cities should ban cars from their centres. What is your opinion?" },
  { id: "w3", type: "Correo formal", min: 100, q: "Write an email to your landlord reporting a problem in your flat and asking for a solution." },
  { id: "w4", type: "Correo formal", min: 100, q: "Write to a company to complain about a product that arrived damaged. Say what you expect." },
  { id: "w5", type: "Narración", min: 120, q: "Write about a time you learned something important from a mistake." },
  { id: "w6", type: "Ensayo", min: 150, q: "What are the advantages and disadvantages of working from home?" },
  { id: "w7", type: "Ensayo", min: 150, q: "Is social media good or bad for young people? Give reasons and examples." },
  { id: "w8", type: "Informal", min: 100, q: "Write a message to a friend inviting them to visit you and describing what you will do." },
  { id: "w9", type: "Ensayo", min: 150, q: "Should local governments spend more on public transport or on maintaining roads? Support your view with reasons." },
  { id: "w10", type: "Correo formal", min: 120, q: "Write to your college asking for more information about a course that may fit your schedule. Ask about its timetable, requirements and cost." },
  { id: "w11", type: "Comparación", min: 150, q: "Compare learning a language in a classroom with learning it independently online. Which approach would suit you better?" },
  { id: "w12", type: "Ensayo", min: 150, q: "Some people believe that cities should create more green spaces even if this means fewer parking spaces. Discuss both sides and give your opinion." },
];
