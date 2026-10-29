// Phrasal verb of the day: one per calendar day, the same for everyone, cycling through the bank.
// Each entry: phrasal verb, simple meaning, Spanish, an example, the level, and irregular past forms when needed.
const P = (pv, meaning, es, ex, level, past, pp) => ({ pv, meaning, es, ex, level, past, pp });

export const phrasalVerbs = [
  P("get up", "leave your bed after sleeping", "levantarse", "I get up at seven on weekdays.", "A2", "got", "got"),
  P("wake up", "stop sleeping", "despertarse", "I woke up when the alarm rang.", "A2", "woke", "woken"),
  P("turn on", "start a machine or light", "encender", "Can you turn on the light, please?", "A2"),
  P("turn off", "stop a machine or light", "apagar", "Turn off your phone in the cinema.", "A2"),
  P("put on", "start wearing clothes", "ponerse (ropa)", "Put on your coat; it's cold.", "A2", "put", "put"),
  P("take off", "remove clothes; a plane leaves the ground", "quitarse; despegar", "The plane took off on time.", "A2", "took", "taken"),
  P("look for", "try to find", "buscar", "I'm looking for my keys.", "A2"),
  P("find out", "discover information", "averiguar, enterarse", "I found out that the shop was closed.", "A2", "found", "found"),
  P("come back", "return", "volver", "When will you come back from your trip?", "A2", "came", "come"),
  P("go out", "leave home to have fun", "salir", "We go out for dinner on Fridays.", "A2", "went", "gone"),
  P("sit down", "take a seat", "sentarse", "Please sit down and relax.", "A2", "sat", "sat"),
  P("stand up", "get to your feet", "ponerse de pie", "Everyone stood up when she arrived.", "A2", "stood", "stood"),
  P("pick up", "lift something; collect someone", "recoger", "I'll pick you up at the station.", "A2"),
  P("fill in", "complete a form", "rellenar", "Please fill in this form.", "A2"),
  P("hurry up", "move or act faster", "darse prisa", "Hurry up or we'll miss the bus!", "A2"),
  P("grow up", "become an adult", "crecer, criarse", "I grew up in a small town.", "A2", "grew", "grown"),
  P("look after", "take care of", "cuidar", "My grandmother looks after my children.", "A2"),
  P("give back", "return something", "devolver", "Can you give back my book tomorrow?", "A2", "gave", "given"),
  P("throw away", "put in the rubbish", "tirar (a la basura)", "Don't throw away that box.", "A2", "threw", "thrown"),
  P("check in", "register at a hotel or airport", "registrarse, facturar", "We checked in at the hotel at noon.", "A2"),
  P("get on", "enter a bus or train; have a good relationship", "subirse; llevarse bien", "I get on well with my brother.", "A2", "got", "got"),
  P("get off", "leave a bus or train", "bajarse", "Get off at the next stop.", "A2", "got", "got"),
  P("try on", "test clothes to see if they fit", "probarse", "Can I try on these jeans?", "A2"),
  P("write down", "write something on paper", "apuntar", "Write down my number.", "A2", "wrote", "written"),
  P("calm down", "become less angry or nervous", "calmarse", "Calm down, it's only a test.", "A2"),
  P("give up", "stop doing something; stop trying", "dejar de; rendirse", "She gave up smoking last year.", "B1", "gave", "given"),
  P("look forward to", "feel happy about something in the future", "tener ganas de", "I'm looking forward to the holidays.", "B1"),
  P("run out of", "have no more of something", "quedarse sin", "We ran out of milk this morning.", "B1", "ran", "run"),
  P("carry on", "continue", "continuar, seguir", "Carry on working; I'll be back soon.", "B1"),
  P("set up", "start a business or organise something", "montar, establecer", "She set up her own company.", "B1", "set", "set"),
  P("work out", "exercise; find a solution", "hacer ejercicio; resolver", "I work out three times a week.", "B1"),
  P("figure out", "understand or solve", "entender, descifrar", "I can't figure out this problem.", "B1"),
  P("put off", "postpone", "posponer", "Don't put off your homework until Sunday.", "B1", "put", "put"),
  P("call off", "cancel", "cancelar", "They called off the match because of rain.", "B1"),
  P("bring up", "raise a child; mention a topic", "criar; sacar un tema", "She brought up the problem in the meeting.", "B1", "brought", "brought"),
  P("come up with", "think of an idea", "ocurrírsele", "He came up with a great plan.", "B1", "came", "come"),
  P("get over", "recover from", "superar, recuperarse", "It took weeks to get over the flu.", "B1", "got", "got"),
  P("look up", "search for information", "buscar (en un diccionario)", "Look up the word in the dictionary.", "B1"),
  P("take up", "start a new hobby", "empezar (un pasatiempo)", "I took up yoga last year.", "B1", "took", "taken"),
  P("turn down", "refuse; lower the volume", "rechazar; bajar", "She turned down the job offer.", "B1"),
  P("show up", "arrive or appear", "aparecer, presentarse", "He showed up an hour late.", "B1"),
  P("break down", "stop working (a machine)", "averiarse", "Our car broke down on the motorway.", "B1", "broke", "broken"),
  P("get along with", "have a good relationship with", "llevarse bien con", "I get along with my colleagues.", "B1", "got", "got"),
  P("hang out", "spend free time casually", "pasar el rato", "We hang out at the park after class.", "B1"),
  P("catch up", "reach the same level; talk after time apart", "ponerse al día", "Let's meet and catch up soon.", "B1", "caught", "caught"),
  P("deal with", "handle a problem or situation", "ocuparse de, lidiar con", "She deals with customer complaints.", "B1", "dealt", "dealt"),
  P("end up", "finally be in a place or situation", "acabar", "We got lost and ended up in a village.", "B1"),
  P("go on", "continue; happen", "continuar; pasar", "What's going on here?", "B1", "went", "gone"),
  P("keep up with", "stay at the same level or speed", "seguir el ritmo de", "It's hard to keep up with the news.", "B1", "kept", "kept"),
  P("cut down on", "reduce the amount of", "reducir", "I'm trying to cut down on sugar.", "B1", "cut", "cut"),
  P("point out", "draw attention to", "señalar", "She pointed out a mistake in my essay.", "B1"),
  P("sort out", "organise or solve", "arreglar, solucionar", "We need to sort out this mess.", "B1"),
  P("drop out", "leave school or a course before finishing", "abandonar (estudios)", "He dropped out of university.", "B1"),
  P("fall out", "stop being friends after an argument", "pelearse", "They fell out over money.", "B1", "fell", "fallen"),
  P("let down", "disappoint", "decepcionar", "I won't let you down.", "B1", "let", "let"),
  P("make up", "invent a story; become friends again", "inventar; reconciliarse", "He made up an excuse.", "B1", "made", "made"),
  P("run into", "meet by chance", "encontrarse con", "I ran into an old friend yesterday.", "B1", "ran", "run"),
  P("look into", "investigate", "investigar", "The police are looking into the case.", "B1"),
  P("take after", "look or behave like a parent", "parecerse a", "She takes after her mother.", "B1", "took", "taken"),
  P("put up with", "tolerate", "aguantar, soportar", "I can't put up with this noise.", "B1", "put", "put"),
  P("get away", "escape; go on holiday", "escaparse", "We need to get away for a weekend.", "B1", "got", "got"),
  P("go through", "experience something difficult; examine", "pasar por; revisar", "She went through a hard time.", "B1", "went", "gone"),
  P("hold on", "wait for a short time", "esperar", "Hold on, I'll get my coat.", "B1", "held", "held"),
  P("move on", "start something new; stop dwelling on the past", "pasar página", "It's time to move on.", "B1"),
  P("pass away", "die (polite)", "fallecer", "His grandfather passed away last year.", "B1"),
  P("work on", "spend time improving something", "trabajar en", "I'm working on my pronunciation.", "B1"),
  P("give in", "stop resisting; accept defeat", "ceder", "My parents finally gave in and bought a dog.", "B1", "gave", "given"),
  P("back up", "support; make a copy of data", "respaldar; hacer copia", "Always back up your files.", "B1"),
  P("bring about", "cause to happen", "provocar", "The new law brought about big changes.", "B2", "brought", "brought"),
  P("carry out", "do or complete a task", "llevar a cabo", "The scientists carried out an experiment.", "B2"),
  P("account for", "explain; form a part of", "explicar; representar", "Tourism accounts for 10% of the economy.", "B2"),
  P("come across", "find by chance; seem", "encontrarse con; parecer", "I came across an old photo.", "B2", "came", "come"),
  P("draw up", "prepare a written document", "redactar", "The lawyer drew up the contract.", "B2", "drew", "drawn"),
  P("phase out", "gradually stop using", "eliminar gradualmente", "The city will phase out diesel buses.", "B2"),
  P("rule out", "exclude a possibility", "descartar", "Doctors ruled out a serious illness.", "B2"),
  P("stand out", "be very noticeable", "destacar", "Her essay stood out from the rest.", "B2", "stood", "stood"),
  P("take over", "take control of", "hacerse cargo, absorber", "A bigger company took over the firm.", "B2", "took", "taken"),
  P("turn out", "happen in a way you did not expect", "resultar", "The test turned out to be easy.", "B2"),
  P("weigh up", "consider carefully", "sopesar", "Weigh up the pros and cons.", "B2"),
  P("back down", "withdraw from a position", "echarse atrás", "The company backed down after the protests.", "B2"),
  P("break through", "make a sudden advance", "abrirse paso", "Scientists broke through after years of work.", "B2", "broke", "broken"),
  P("brush up on", "improve a skill you had before", "repasar, refrescar", "I need to brush up on my French.", "B2"),
  P("crack down on", "act strongly against", "tomar medidas contra", "Police are cracking down on speeding.", "B2"),
  P("fall through", "fail to happen", "fracasar, venirse abajo", "Our holiday plans fell through.", "B2", "fell", "fallen"),
  P("iron out", "solve small problems", "resolver detalles", "We need to iron out a few issues.", "B2"),
  P("live up to", "be as good as expected", "estar a la altura de", "The film didn't live up to the hype.", "B2"),
  P("opt out", "choose not to take part", "excluirse, no participar", "You can opt out of the newsletter.", "B2"),
  P("play down", "make something seem less important", "restar importancia", "The minister played down the crisis.", "B2"),
  P("set out", "start a journey; explain clearly", "emprender; exponer", "The report sets out three proposals.", "B2", "set", "set"),
  P("sum up", "summarise", "resumir", "To sum up, the plan is too expensive.", "B2"),
  P("talk over", "discuss", "hablar, comentar", "Let's talk it over before we decide.", "B2"),
  P("wear out", "become unusable; make very tired", "desgastar; agotar", "These shoes are worn out.", "B2", "wore", "worn"),
  P("hold back", "prevent progress; not show feelings", "frenar; contener", "Fear held him back.", "B2", "held", "held"),
  P("look down on", "think you are better than someone", "menospreciar", "Don't look down on people with less money.", "B2"),
  P("make out", "see or hear with difficulty", "distinguir", "I couldn't make out what she said.", "B2", "made", "made"),
  P("pull off", "succeed in something difficult", "lograr", "They pulled off a surprise victory.", "B2"),
  P("step down", "leave an important job", "dimitir", "The CEO stepped down last month.", "B2"),
  P("follow up", "take further action", "hacer seguimiento", "I'll follow up with an email.", "B2"),
  P("narrow down", "reduce the number of options", "reducir, acotar", "We narrowed down the list to three candidates.", "B2"),
  P("single out", "choose one from a group", "destacar, señalar", "The teacher singled out her project for praise.", "B2"),
  P("stem from", "be caused by", "derivarse de", "The problem stems from poor planning.", "B2"),
  P("tie in with", "connect or match", "encajar con", "His story ties in with the evidence.", "B2"),
];

const IRREGULAR_ING = { get: "getting", put: "putting", set: "setting", cut: "cutting", run: "running", sit: "sitting", let: "letting", drop: "dropping", step: "stepping", hang: "hanging", stem: "stemming", opt: "opting" };

// All inflected forms of the verb part: give → give, gives, gave, given, giving.
export function verbForms({ pv, past, pp }) {
  const [base] = pv.split(" ");
  const s = /(s|sh|ch|x|z|o)$/.test(base) ? `${base}es` : /[^aeiou]y$/.test(base) ? `${base.slice(0, -1)}ies` : `${base}s`;
  const ing = IRREGULAR_ING[base] || (/[^e]e$/.test(base) ? `${base.slice(0, -1)}ing` : `${base}ing`);
  const regular = /e$/.test(base) ? `${base}d` : /[^aeiou]y$/.test(base) ? `${base.slice(0, -1)}ied` : /^(drop|step|stem)$/.test(base) ? `${base}${base.at(-1)}ed` : `${base}ed`;
  return [...new Set([base, s, ing, past || regular, pp || past || regular])];
}

// Did the learner use it? Allows up to three words between verb and particle ("pick my sister up").
export function usesPhrasal(text, entry) {
  const [, ...rest] = entry.pv.split(" ");
  const forms = verbForms(entry).join("|");
  const particle = rest.join("\\s+");
  return new RegExp(`\\b(${forms})\\b(?:\\s+[a-z']+){0,3}?\\s+${particle}\\b`, "i").test(text);
}

const DAY = 24 * 3600 * 1000;
// Local calendar day number, so everyone in the group gets the same verb on the same date.
export const dayNumber = (date = new Date()) => Math.floor((date.getTime() - date.getTimezoneOffset() * 60000) / DAY);
export const phrasalOfDay = (date = new Date()) => phrasalVerbs[((dayNumber(date) % phrasalVerbs.length) + phrasalVerbs.length) % phrasalVerbs.length];
export const phrasalById = (pv) => phrasalVerbs.find((p) => p.pv === pv) || null;
