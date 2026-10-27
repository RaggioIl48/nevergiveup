const c = (lvl, skill, q, options, a, why) => ({ kind: "choice", lvl, skill, q, options, a, why });
const r = (lvl, text, q, options, a, why) => ({ kind: "read", lvl, skill: "reading", text, q, options, a, why });
const l = (lvl, say, q, options, a, why) => ({ kind: "listen", lvl, skill: "listening", say, q, options, a, why });
const t = (lvl, skill, q, a, why) => ({ kind: "type", lvl, skill, q, a, why });
const f = (lvl, q, a, why) => ({ kind: "fix", lvl, skill: "grammar", q, a, why });

const items = [
  c(1, "grammar", "She ___ to the gym every Tuesday.", ["go", "goes", "going", "is go"], 1, "Tercera persona del presente simple: goes."),
  c(1, "vocab", "I need to ___ my passport before the trip.", ["renew", "rent", "rest", "remind"], 0, "Renew a passport = renovar el pasaporte."),
  r(1, "Tom's flight was cancelled because of snow, so he took the train. It was slower, but cheaper.", "Why did Tom take the train?", ["His flight was cancelled.", "The train was faster.", "He prefers snow.", "It was free."], 0, "El vuelo se canceló por la nieve."),
  l(1, "The meeting has moved from Monday to Wednesday at ten.", "When is the meeting now?", ["Monday at ten", "Wednesday at ten", "Wednesday at two", "Monday at two"], 1, "Se cambió a miércoles a las diez."),
  c(1, "grammar", "There ___ any milk left.", ["isn't", "aren't", "don't", "not"], 0, "Milk es incontable: there isn't any milk."),
  c(1, "vocab", "The opposite of cheap is ___.", ["expensive", "empty", "early", "heavy"], 0, "Cheap / expensive."),

  c(2, "grammar", "If it rains tomorrow, we ___ at home.", ["will stay", "would stay", "stayed", "staying"], 0, "Primer condicional: if + presente, will + verbo."),
  c(2, "vocab", "I'm really looking forward ___ you next week.", ["to see", "to seeing", "for seeing", "at seeing"], 1, "Look forward to + gerundio."),
  t(2, "grammar", "She has lived here ___ 2019.", ["since"], "Since + punto en el tiempo; for + duración."),
  r(2, "Maria used to cycle to work, but since the new bus line opened she prefers the bus. 'It's quicker and I can read,' she says.", "Why does Maria prefer the bus now?", ["It is quicker and she can read.", "She dislikes cycling.", "It is cheaper than cycling.", "Her office moved."], 0, "Ella dice: it's quicker and I can read."),
  l(2, "I'd like to book a table for four at half past seven, please. Do you have anything by the window?", "What does the speaker want?", ["A table for four by the window", "A table for seven near the door", "A room for four", "A taxi at half past seven"], 0, "Pide mesa para cuatro, cerca de la ventana."),
  f(2, "He don't like spicy food.", 1, "Con he/she/it: doesn't."),

  c(3, "grammar", "I wish I ___ more time to study yesterday.", ["had", "had had", "would have had", "have had"], 1, "Deseo sobre el pasado: wish + past perfect."),
  c(3, "grammar", "By Friday, the team ___ the report.", ["will have finished", "will finish", "is finishing", "has finish"], 0, "Futuro perfecto: acción completada antes de un momento futuro."),
  c(3, "vocab", "The manager promised to look ___ the complaints immediately.", ["into", "for", "after", "on"], 0, "Look into = investigar."),
  r(3, "Although working from home saves commuting time, a recent survey suggests that many employees miss informal conversations with colleagues, which often lead to new ideas.", "What does the survey suggest?", ["Remote work saves money.", "Some employees miss spontaneous chats that can spark ideas.", "Commuting is enjoyable.", "Colleagues dislike new ideas."], 1, "La encuesta indica que se echan de menos las charlas informales."),
  l(3, "Unfortunately, the speaker who was supposed to open the conference has fallen ill, so the organisers have asked Dr Patel to take her place.", "Why is Dr Patel speaking?", ["She is the organiser.", "The original speaker is ill.", "The conference moved.", "She volunteered."], 1, "Take her place: sustituye a quien enfermó."),
  f(3, "If I would have more money, I would travel more.", 2, "En el segundo condicional, la cláusula if usa pasado: If I had more money."),

  c(4, "grammar", "Hardly ___ the building when the alarm went off.", ["had we entered", "we had entered", "did we enter", "we entered"], 0, "Inversión tras hardly + past perfect."),
  c(4, "grammar", "She suggested ___ a different approach.", ["trying", "to try", "us to try", "that we to try"], 0, "Suggest + gerundio."),
  c(4, "vocab", "The new policy has had a ___ impact on small businesses.", ["detrimental", "detracted", "detaining", "detached"], 0, "Detrimental impact = impacto perjudicial."),
  r(4, "While the new regulations were intended to curb emissions, critics argue that they merely shift production overseas, where standards are laxer, leaving global pollution largely unchanged.", "What is the critics' main objection?", ["Emissions are moved abroad rather than reduced.", "The regulations are too strict.", "Factories closed overseas.", "Pollution has doubled."], 0, "Dicen que la producción se traslada, no que la contaminación baje."),
  l(4, "I'd have taken the earlier train had I known the strike was going to be called off.", "What does the speaker imply?", ["He took the earlier train.", "He did not know the strike would end, so he did not take the earlier train.", "He was late because of the strike.", "He dislikes trains."], 1, "Tercer condicional invertido: no lo sabía, por eso no lo tomó."),
  t(4, "grammar", "He denied ___ (steal) the money.", ["stealing", "having stolen"], "Deny + gerundio."),

  c(5, "grammar", "Not until the results came out ___ how serious the situation was.", ["did we realise", "we realised", "had we realised", "we did realise"], 0, "Inversión con Not until."),
  c(5, "grammar", "I'd rather you ___ anything about it until tomorrow.", ["didn't say", "don't say", "wouldn't say", "haven't said"], 0, "I'd rather + sujeto + pasado."),
  c(5, "vocab", "His remarks were taken out of ___, which caused the misunderstanding.", ["context", "content", "contact", "concept"], 0, "Out of context = fuera de contexto."),
  r(5, "The author contends that innovation thrives not in isolation but at the margins where disciplines overlap, a claim she substantiates with case studies from three decades of materials science.", "According to the author, where does innovation thrive?", ["Where different fields overlap", "In isolated laboratories", "In materials science only", "Where funding is highest"], 0, "At the margins where disciplines overlap."),
  l(5, "Were it not for the sponsors' last-minute support, the festival would have been cancelled.", "What happened?", ["The sponsors helped, so the festival went ahead.", "The festival was cancelled.", "The sponsors withdrew.", "The festival was postponed."], 0, "Were it not for = if it had not been for."),
  t(5, "grammar", "By the time we arrive, the film ___ (already / start).", ["will already have started", "will have already started"], "Futuro perfecto: will have started."),
];

export const diagnostic = items.map((item, index) => ({ ...item, id: `d${String(index + 1).padStart(2, "0")}` }));

export const DIAGNOSTIC_LENGTH = 20;
