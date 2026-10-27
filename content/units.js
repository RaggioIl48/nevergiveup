const ch = (q, options, a, why) => ({ kind: "choice", q, options, a, why });
const ty = (q, a, why) => ({ kind: "type", q, a: [].concat(a), why });
const fx = (q, a, why) => ({ kind: "fix", q, a, why });
const or = (q, a, why) => ({ kind: "order", q, a: [a], why });
const di = (say, why = "Dictado: escucha y escribe exactamente lo que oyes.") => ({ kind: "dictation", say, a: [say], why });
const ls = (say, q, options, a, why) => ({ kind: "listen", say, q, options, a, why });
const rd = (text, q, options, a, why) => ({ kind: "read", text, q, options, a, why });
const tr = (q, a, why) => ({ kind: "transform", q, a: [].concat(a), why });
const mt = (pairs, why = "Une cada expresión con su significado.") => ({ kind: "match", pairs, why });
const sh = (say) => ({ kind: "shadow", say, why: "Escucha, repite en voz alta y compara." });

const unitsRaw = [
  {
    title: "Tiempos y hábitos",
    focus: "Consolida B1: presente perfecto, pasado y used to",
    lessons: [
      ["Presente perfecto", [
        ch("I ___ in this city for six years.", ["live", "have lived", "am living", "lived"], 1, "Duración hasta ahora: present perfect."),
        ty("She has worked here ___ 2020.", "since", "Since + punto de inicio."),
        fx("She have lived here for ten years.", 1, "Con she: has lived."),
        or("has / the / already / left / train", "The train has already left", "Orden: sujeto + has + already + participio."),
        ls("Have you ever tried Vietnamese food? I had it for the first time last week.", "When did the speaker first eat it?", ["Last week", "Last year", "Never", "Yesterday"], 0, "I had it for the first time last week."),
        di("We have been waiting for over an hour."),
      ]],
      ["Pasado y used to", [
        ch("When I was a child, I ___ play outside every afternoon.", ["used to", "use to", "am used to", "would to"], 0, "Used to = hábito pasado."),
        ty("While I ___ (walk) home, it started to rain.", ["was walking"], "Acción en progreso interrumpida: pasado continuo."),
        fx("She didn't went to the party.", 2, "Después de didn't, verbo en base: go."),
        tr("Rewrite: 'I lived in Rome before.' Start: I used ...", "I used to live in Rome", "Used to + infinitivo."),
        rd("Last summer Ana worked at a hotel. She started at six each morning, which she hated at first, but she got used to it and made good friends.", "How did Ana feel in the end?", ["She adapted and enjoyed it.", "She quit.", "She still hated it.", "She changed hotels."], 0, "Got used to it + friends."),
        mt([["get used to", "acostumbrarse a"], ["give up", "rendirse"], ["turn down", "rechazar"], ["come across", "encontrarse con"]]),
      ]],
      ["Preguntas y respuestas", [
        ch("___ you mind opening the window?", ["Do", "Would", "Are", "Have"], 1, "Would you mind + gerundio: petición cortés."),
        ty("Who ___ (you / meet) at the party last night?", ["did you meet"], "Pregunta de objeto: did + sujeto + verbo."),
        or("do / what / you / do / for / living / a", "What do you do for a living", "Pregunta fija."),
        ls("Could you tell me where the nearest pharmacy is?", "What does the speaker ask for?", ["The pharmacy location", "A medicine", "The time", "A taxi"], 0, "Pide la ubicación."),
        fx("Do you know where is the station?", 4, "En pregunta indirecta: where the station is."),
        sh("Could you tell me where the nearest pharmacy is?"),
      ]],
    ],
  },
  {
    title: "Condicionales",
    focus: "Condicionales 0-3 y wish",
    lessons: [
      ["Primero y segundo", [
        ch("If I ___ you, I would take the job.", ["am", "was being", "were", "will be"], 2, "Segundo condicional: If I were you."),
        ty("If she ___ (study) harder, she will pass.", ["studies"], "Primer condicional: if + presente."),
        fx("If it will rain, we stay in.", 2, "No will después de if: If it rains."),
        or("would / if / I / lottery / won / the / travel / I", "If I won the lottery I would travel", "If + pasado, would + verbo."),
        di("If I had more time, I would learn another language."),
        mt([["unless", "a menos que"], ["provided that", "siempre que"], ["as long as", "mientras"], ["in case", "por si acaso"]]),
      ]],
      ["Tercer condicional", [
        ch("If we ___ earlier, we wouldn't have missed the train.", ["left", "had left", "would leave", "have left"], 1, "Tercero: if + past perfect."),
        ty("She would have passed if she ___ (study).", ["had studied"], "if + had + participio."),
        tr("Rewrite: 'I didn't know, so I didn't call.' If I ...", "If I had known I would have called", "Tercer condicional: if + had known, would have called."),
        fx("If I would have known, I would have helped.", 2, "if + had known."),
        ls("If the weather had been better, we would have gone hiking.", "Did they go hiking?", ["Yes", "No", "Maybe", "Twice"], 1, "Irreal en el pasado: no fueron."),
        sh("If I had known, I would have helped you."),
      ]],
      ["Wish y regrets", [
        ch("I wish I ___ speak French.", ["can", "could", "would", "will"], 1, "Wish + could."),
        ty("I wish I ___ (not eat) so much yesterday.", ["hadn't eaten", "had not eaten"], "Wish + past perfect para el pasado."),
        ch("If only he ___ listen to me!", ["would", "will", "has", "did"], 0, "If only + would: queja sobre comportamiento."),
        fx("I wish I have a bigger house.", 3, "Wish + pasado: had."),
        or("I / had / I / wish / more / time", "I wish I had more time", "Wish + pasado."),
        di("I wish I had studied more when I was younger."),
      ]],
    ],
  },
  {
    title: "Voz pasiva y estilo indirecto",
    focus: "B2: passive, reporting, causative",
    lessons: [
      ["Voz pasiva", [
        ch("The bridge ___ in 1998.", ["built", "was built", "has built", "is building"], 1, "Pasiva pasada: was + participio."),
        ty("English ___ (speak) in many countries.", ["is spoken"], "Pasiva presente."),
        tr("Rewrite: 'They are repairing the road.' The road ...", "The road is being repaired", "Pasiva continua: is being + participio."),
        fx("The documents have been send yesterday.", 4, "Participio: sent. Y con yesterday: were sent."),
        ls("The suspect is believed to have left the country last night.", "What is believed?", ["He left the country.", "He is still here.", "He was arrested.", "He lost his passport."], 0, "Is believed to have left."),
        mt([["It is said that", "se dice que"], ["is expected to", "se espera que"], ["is thought to", "se cree que"], ["has been reported", "se ha informado"]]),
      ]],
      ["Estilo indirecto", [
        ch("She said she ___ tired.", ["is", "was", "has been being", "will be"], 1, "Backshift: is -> was."),
        tr("Report: 'I'll call you tomorrow,' he said. He said he ...", "He said he would call me the next day", "will -> would; tomorrow -> the next day."),
        ty("He asked me where I ___ (live).", ["lived"], "Pregunta indirecta: orden afirmativo."),
        fx("She asked me what was my name.", 4, "Orden afirmativo: what my name was."),
        di("He told me that he had already finished the report."),
        sh("She said that she would call me later."),
      ]],
      ["Causativo y verbos de reporte", [
        ch("I had my car ___ yesterday.", ["fix", "fixed", "fixing", "to fix"], 1, "Have + objeto + participio."),
        ty("She ___ (suggest) going to the cinema.", ["suggested"], "Suggest + gerundio."),
        ch("He admitted ___ the window.", ["to break", "breaking", "break", "broke"], 1, "Admit + gerundio."),
        or("cut / I / get / my / hair / going / to / am", "I am going to get my hair cut", "Get + objeto + participio."),
        fx("They accused me to steal the bike.", 3, "Accuse someone of + gerundio."),
        ls("My boss promised to give me a raise, but she warned me not to tell anyone.", "What did the boss warn?", ["Not to tell anyone", "To work late", "To quit", "To tell everyone"], 0, "Warn someone not to."),
      ]],
    ],
  },
  {
    title: "Oraciones complejas",
    focus: "Relativas, conectores y modales de deducción",
    lessons: [
      ["Oraciones de relativo", [
        ch("The woman ___ lives next door is a doctor.", ["which", "who", "whose", "whom"], 1, "Who para personas."),
        ch("That's the man ___ car was stolen.", ["who", "whose", "which", "that"], 1, "Whose = posesivo."),
        ty("The book, ___ I read last week, was brilliant. (which / that)", ["which"], "Relativa no restrictiva con coma: which."),
        fx("The city where I was born in is huge.", 6, "Where ya incluye in: where I was born."),
        tr("Join: 'I met a girl. She speaks five languages.' I met a girl who ...", "I met a girl who speaks five languages", "Who + verbo."),
        di("The restaurant that we went to last night was fantastic."),
      ]],
      ["Conectores", [
        ch("___ the rain, we had a great time.", ["Despite", "Although", "However", "Because"], 0, "Despite + sustantivo."),
        ch("He was tired; ___, he kept working.", ["nevertheless", "because", "so", "unless"], 0, "Nevertheless = sin embargo."),
        ty("___ it was cold, we went swimming. (Although)", ["Although"], "Although + cláusula."),
        mt([["however", "sin embargo"], ["therefore", "por lo tanto"], ["moreover", "además"], ["whereas", "mientras que"]]),
        rd("Remote work has clear benefits. Moreover, it reduces commuting. However, some workers feel isolated, so companies should provide social events.", "What do companies need to offer?", ["Social events", "Higher pay", "Longer holidays", "New offices"], 0, "Companies should provide social events."),
        sh("Although it was raining, we decided to go out."),
      ]],
      ["Deducción con modales", [
        ch("She's not answering. She ___ be asleep.", ["must", "can't", "should", "might to"], 0, "Must = deducción fuerte."),
        ch("That can't ___ Tom; he's in Paris.", ["be", "being", "been", "is"], 0, "Can't be."),
        ty("He ___ (might / forget) the meeting yesterday.", ["might have forgotten"], "Might have + participio."),
        fx("She must has left already.", 2, "Must have + participio."),
        ls("The lights are off. They must have gone out.", "What does the speaker think?", ["They are probably out.", "They are home.", "They are sleeping upstairs.", "It is a power cut."], 0, "Deducción."),
        or("have / forgotten / he / must / it", "He must have forgotten it", "Must have + participio."),
      ]],
    ],
  },
  {
    title: "Vocabulario B2",
    focus: "Phrasal verbs, collocations y formación de palabras",
    lessons: [
      ["Phrasal verbs", [
        mt([["carry out", "llevar a cabo"], ["put off", "posponer"], ["run out of", "quedarse sin"], ["come up with", "idear"]]),
        ch("We had to ___ the meeting because of the storm.", ["call off", "call in", "call at", "call up"], 0, "Call off = cancelar."),
        ty("I can't ___ up with his behaviour. (put)", "put", "Put up with = tolerar."),
        fx("She looked the word out in the dictionary.", 4, "Look up."),
        di("We ran out of time before we could finish."),
        ls("I'll pick you up at eight, so be ready.", "What will the speaker do?", ["Collect the listener", "Call at eight", "Wait for him", "Drop him off"], 0, "Pick up = recoger."),
      ]],
      ["Collocations", [
        ch("She ___ a decision after a long meeting.", ["did", "made", "took out", "gave up"], 1, "Make a decision."),
        ch("Please ___ attention to the instructions.", ["pay", "do", "make", "give out"], 0, "Pay attention."),
        ty("He ___ the risk of losing everything. (take)", ["took"], "Take a risk."),
        mt([["heavy rain", "lluvia fuerte"], ["strong coffee", "café fuerte"], ["tight deadline", "plazo ajustado"], ["raise awareness", "concienciar"]]),
        rd("To raise awareness about recycling, the council launched a campaign that makes it easy to separate waste at home.", "What did the council do?", ["Launched a campaign", "Fined residents", "Built a factory", "Closed a plant"], 0, "Launched a campaign."),
        sh("The company is taking steps to reduce its carbon footprint."),
      ]],
      ["Formación de palabras", [
        ch("Her ___ to the team was invaluable. (contribute)", ["contribution", "contributor", "contributing", "contributive"], 0, "Sustantivo tras her: contribution."),
        ty("We were deeply ___ by the news. (disappoint)", ["disappointed"], "Adjetivo con -ed."),
        ch("It was an ___ situation. (comfort)", ["uncomfortable", "discomfort", "uncomfortably", "comfortless"], 0, "Adjetivo: uncomfortable."),
        fx("He spoke very careful.", 3, "Adverbio: carefully."),
        mt([["employ", "emplear"], ["employee", "empleado"], ["employer", "empleador"], ["employment", "empleo"]]),
        di("The government announced an improvement in employment."),
      ]],
    ],
  },
  {
    title: "Argumentar y debatir",
    focus: "Inversión, énfasis y registro formal",
    lessons: [
      ["Inversión y énfasis", [
        ch("Never ___ such a beautiful view.", ["I have seen", "have I seen", "I saw", "did I seen"], 1, "Inversión tras never."),
        ch("Rarely ___ so honest.", ["he is", "is he", "does he", "he does"], 1, "Rarely + inversión."),
        ty("Only after the exam ___ he relax. (could)", "could", "Only after + inversión."),
        or("did / until / he / not / leave / midnight", "Not until midnight did he leave", "Not until + inversión."),
        fx("It was John who broke it the window.", 5, "Oración hendida sin it extra: broke the window."),
        sh("Not only did she win, but she also broke the record."),
      ]],
      ["Opinar y matizar", [
        mt([["In my view", "en mi opinión"], ["To some extent", "hasta cierto punto"], ["On the other hand", "por otro lado"], ["As far as I know", "que yo sepa"]]),
        ch("___ , I'd say the plan is risky.", ["On the whole", "On a whole", "In whole", "At whole"], 0, "On the whole = en general."),
        ty("I tend to ___ with you on that. (agree)", "agree", "Agree with."),
        rd("Some argue that homework improves discipline. Others contend that it adds stress without improving results. The evidence, however, is mixed.", "What does the text say about the evidence?", ["It is mixed.", "It is clear.", "It is missing.", "It is one-sided."], 0, "The evidence is mixed."),
        ls("I partly agree, but I think we should consider the cost as well.", "What does the speaker do?", ["Agrees partly and adds a point", "Disagrees fully", "Changes topic", "Asks a question"], 0, "Partly agree."),
        di("To some extent, I agree with what you said."),
      ]],
      ["Registro formal", [
        ch("Which is more formal?", ["I'm writing to enquire about", "I wanna ask about", "Just wondering about", "Hey, about"], 0, "Registro formal."),
        ty("I look forward to ___ from you. (hear)", ["hearing"], "Look forward to + gerundio."),
        tr("Make formal: 'Can you send me info?' I would be grateful if you ...", "I would be grateful if you could send me information", "Cortesía formal."),
        fx("Dear Sir, I am wanting to complain.", 4, "Evita continuo con want: I want to / I wish to."),
        mt([["Yours faithfully", "atentamente (sin nombre)"], ["Yours sincerely", "atentamente (con nombre)"], ["Dear Sir/Madam", "estimado/a"], ["Regarding", "con respecto a"]]),
        sh("I would be grateful if you could confirm the booking."),
      ]],
    ],
  },
  {
    title: "Integrar y rendir",
    focus: "B2: escucha académica, inferencias y respuestas claras",
    lessons: [
      ["Comprender una charla académica", [
        ls("Today I'd like to explain why urban gardens can help cities manage heat. Plants provide shade, and the soil absorbs rainwater. However, these gardens require regular care, so local residents need to be involved from the beginning.", "What is the lecturer's main point?", ["Urban gardens help with heat and rain, but need community support.", "Cities should replace every park with a garden.", "Residents should avoid planting near buildings.", "Rainwater is the only problem in cities."], 0, "Resume el beneficio doble y la condición de mantenimiento; escucha la idea general y la limitación que introduce however."),
        di("The lecturer argues that local support is essential for the project to succeed."),
        sh("Although the plan is promising, it will only work if residents take part."),
        ch("In the lecture, 'However' signals ___.", ["a contrast or limitation", "a repeated example", "a conclusion", "a cause"], 0, "However introduce una idea que limita o contrasta." , "Identifica la función del conector, no una palabra aislada."),
        ls("We expected the new bus route to save time. In practice, the journey is shorter only during off-peak hours, because traffic still slows buses in the morning.", "When is the new route most likely to save time?", ["During off-peak hours", "Only on weekday mornings", "At every time of day", "Only when it rains"], 0, "El beneficio ocurre fuera de horas punta: distingue la expectativa inicial de la evidencia posterior."),
        mt([["claim", "afirmación principal"], ["evidence", "prueba o dato"], ["limitation", "límite de una propuesta"], ["implication", "consecuencia sugerida"]], "Reconoce la función de cada parte de un argumento."),
      ]],
      ["Leer entre líneas", [
        rd("The council's pilot scheme attracted fewer cyclists than expected. Yet the streets included in the scheme saw a noticeable drop in noise complaints. Although the council has not announced a permanent plan, officials say they will review the results before the summer.", "What can be inferred about the scheme?", ["It may have had a benefit beyond attracting cyclists.", "The council has already made it permanent.", "Noise complaints increased.", "Officials will stop collecting results."], 0, "El descenso de quejas es un beneficio adicional, aunque el plan no sea definitivo." , "Una inferencia debe apoyarse en detalles del texto, no en una suposición."),
        ty("The council has not made a ___ decision about the scheme. (final)", ["final"], "Permanent plan no anunciado: la decisión definitiva aún no se ha tomado."),
        fx("Although the results were promising, but the council wants more data.", 5, "No combines although and but in the same clause: Although the results were promising, the council wants more data."),
        tr("Combine: 'The course is useful. It is quite demanding.' Use although.", ["Although the course is useful, it is quite demanding", "The course is useful although it is quite demanding"], "Although introduce una concesión y conecta dos ideas contrastantes."),
        rd("Some researchers favour short, frequent breaks because they can restore attention. Others argue that interruptions make complex tasks harder to resume. The disagreement may reflect the kind of work being done rather than a single best routine.", "What is the writer's conclusion?", ["The best break pattern may depend on the task.", "All workers should take breaks every hour.", "Breaks always reduce productivity.", "Researchers agree on one routine."], 0, "La conclusión matiza: la rutina adecuada depende del tipo de trabajo." , "Presta atención a la frase final, que resuelve el contraste."),
        ch("The phrase 'may reflect' expresses ___.", ["cautious possibility", "certainty", "a past habit", "an instruction"], 0, "May expresa posibilidad y evita afirmar una conclusión absoluta." , "B2 académico suele matizar las afirmaciones."),
      ]],
      ["Responder con claridad", [
        tr("Make the claim more cautious: 'Online courses are always better.' Start: Online courses may ...", ["Online courses may be more effective for some learners", "Online courses may be better for some learners"], "Una respuesta académica evita generalizaciones absolutas y delimita su alcance."),
        ch("Which sentence best introduces evidence?", ["For example, the survey found that most commuters saved ten minutes.", "Everyone knows commuting is bad.", "I strongly feel the survey is right.", "The result is good and stuff."], 0, "La primera frase presenta una evidencia específica y formal." , "Diferencia un dato concreto de una impresión personal."),
        ty("The proposal is affordable; ___, it may not be practical for rural areas. (however)", ["however"], "However conecta una ventaja con una limitación."),
        or("the / although / expensive / is / solution / effective / remains / the / solution", "Although the solution is expensive the solution remains effective", "La cláusula con although va seguida de la idea principal; revisa el orden natural."),
        fx("The data suggests that the new methods are more reliable.", 2, "Data se trata aquí como plural: the data suggest that the methods are more reliable."),
        sh("On balance, the evidence supports the proposal, although further research is needed."),
      ]],
    ],
  },
];

export const units = unitsRaw.map((unit, ui) => ({
  id: `u${ui + 1}`,
  title: unit.title,
  focus: unit.focus,
  lessons: unit.lessons.map(([title, exercises], li) => ({
    id: `u${ui + 1}-l${li + 1}`,
    title,
    exercises: exercises.map((ex, ei) => ({ ...ex, id: `u${ui + 1}-l${li + 1}-${ei}` })),
  })),
}));

export const lessonOrder = units.flatMap((u) => u.lessons.map((l) => l.id));
