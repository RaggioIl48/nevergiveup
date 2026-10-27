const c = (lvl, skill, q, options, a, why) => ({ kind: "choice", lvl, skill, q, options, a, why });
const r = (lvl, text, q, options, a, why) => ({ kind: "read", lvl, skill: "reading", text, q, options, a, why });
const l = (lvl, say, q, options, a, why) => ({ kind: "listen", lvl, skill: "listening", say, q, options, a, why });
const t = (lvl, skill, q, a, why) => ({ kind: "type", lvl, skill, q, a: [].concat(a), why });
const f = (lvl, q, wrong, why) => {
  const a = q.split(/\s+/).indexOf(wrong);
  if (a < 0) throw new Error(`fix token not found: ${wrong} in ${q}`);
  return { kind: "fix", lvl, skill: "grammar", q, a, why };
};

const items = [
  c(1, "grammar", "She ___ to the gym every Tuesday.", ["go", "goes", "going", "is go"], 1, "Third person singular of the present simple: goes."),
  c(1, "vocab", "The opposite of cheap is ___.", ["expensive", "empty", "early", "heavy"], 0, "Cheap and expensive are opposites."),
  r(1, "Tom's flight was cancelled because of snow, so he took the train. It was slower, but cheaper.", "Why did Tom take the train?", ["His flight was cancelled.", "The train was faster.", "He prefers snow.", "It was free."], 0, "The text says the flight was cancelled."),
  l(1, "The meeting has moved from Monday to Wednesday at ten.", "When is the meeting now?", ["Monday at ten", "Wednesday at ten", "Wednesday at two", "Monday at two"], 1, "It moved to Wednesday at ten."),
  c(1, "grammar", "There ___ any milk left.", ["isn't", "aren't", "don't", "not"], 0, "Milk is uncountable: there isn't any milk."),
  c(1, "grammar", "___ you like pizza?", ["Do", "Does", "Are", "Is"], 0, "Questions with you use Do in the present simple."),
  t(1, "grammar", "They ___ (be) at home yesterday.", ["were"], "Past of be with they: were."),
  c(1, "vocab", "You use a ___ to cut bread.", ["knife", "fork", "spoon", "plate"], 0, "A knife is used for cutting."),

  c(2, "grammar", "I ___ TV when you called me.", ["watched", "was watching", "am watching", "have watched"], 1, "A past action in progress interrupted by another: past continuous."),
  c(2, "grammar", "If it rains tomorrow, we ___ at home.", ["will stay", "would stay", "stayed", "stay"], 0, "First conditional: if + present, will + base verb."),
  c(2, "vocab", "Could you do me a ___? I need help with my bags.", ["favour", "service", "present", "help"], 0, "The fixed expression is do someone a favour."),
  r(2, "Hi Ana, I can't come to the party on Friday because I have to work late. Can we meet on Saturday instead? Let me know. Luis", "What does Luis want to do?", ["Cancel the party", "Meet on Saturday", "Work on Saturday", "Go on Friday"], 1, "He suggests meeting on Saturday."),
  l(2, "Excuse me, does this bus go to the airport, or do I need to change at the station?", "What does the speaker want to know?", ["The price of a ticket", "If the bus goes to the airport", "The time of the bus", "Where the station is"], 1, "He asks whether the bus goes to the airport."),
  t(2, "grammar", "She has lived here ___ 2019. (for / since)", ["since"], "Since + starting point."),
  f(2, "She didn't went to the party.", "went", "After didn't use the base form: go."),
  c(2, "grammar", "This is the ___ film I have ever seen.", ["more interesting", "most interesting", "interestingest", "very interesting"], 1, "Superlative of a long adjective: the most interesting."),

  c(3, "grammar", "If I ___ more money, I would travel more.", ["have", "had", "would have", "will have"], 1, "Second conditional: if + past simple."),
  c(3, "grammar", "I'm not used ___ up so early.", ["to get", "to getting", "get", "getting"], 1, "Be used to + -ing."),
  r(3, "Although working from home saves commuting time, a recent survey suggests that many employees miss informal conversations with colleagues, which often lead to new ideas.", "What does the survey suggest?", ["Remote workers earn more.", "Employees miss informal chats that spark ideas.", "Commuting is enjoyable.", "Offices are too noisy."], 1, "Employees miss informal conversations that lead to ideas."),
  l(3, "Unfortunately, the speaker who was supposed to open the conference has fallen ill, so the organisers have asked Dr Patel to take her place.", "Why is Dr Patel speaking?", ["She is the organiser.", "The original speaker is ill.", "She won an award.", "The conference moved."], 1, "The original speaker has fallen ill."),
  f(3, "If I would have more money, I would travel more.", "would", "No would in the if clause: If I had more money."),
  t(3, "grammar", "She suggested ___ (take) a taxi.", ["taking"], "Suggest + -ing."),
  c(3, "vocab", "He decided to ___ the job offer because the salary was too low.", ["turn down", "turn up", "turn on", "turn into"], 0, "Turn down = refuse."),
  t(3, "grammar", "The report ___ (write) by the time I arrived. (past perfect passive)", ["had been written"], "Past perfect passive: had been + participle."),

  c(4, "grammar", "Hardly ___ the building when the alarm went off.", ["had we entered", "we had entered", "did we enter", "we entered"], 0, "Inversion after hardly + past perfect."),
  c(4, "grammar", "She suggested ___ a different approach.", ["trying", "to try", "us to try", "that we to try"], 0, "Suggest + -ing."),
  c(4, "vocab", "The new policy has had a ___ impact on small businesses.", ["detrimental", "detracted", "detaining", "detached"], 0, "Detrimental = harmful."),
  r(4, "While the new regulations were intended to curb emissions, critics argue that they merely shift production overseas, where standards are laxer, leaving global pollution largely unchanged.", "What do critics argue?", ["The rules cut global pollution.", "The rules move pollution elsewhere.", "Standards overseas are stricter.", "Emissions have disappeared."], 1, "They shift production overseas, so global pollution is unchanged."),
  l(4, "I'd have taken the earlier train had I known the strike was going to be called off.", "What does the speaker imply?", ["He took the earlier train.", "He did not know the strike would end, so he did not take it.", "The strike continued.", "He missed the later train."], 1, "Third conditional with inversion: he did not take the earlier train."),
  t(4, "grammar", "He denied ___ (steal) the money.", ["stealing", "having stolen"], "Deny + -ing."),

  c(5, "grammar", "Not until the results came out ___ how serious the situation was.", ["did we realise", "we realised", "had we realised", "we did realise"], 0, "Inversion after Not until."),
  c(5, "grammar", "I'd rather you ___ anything about it until tomorrow.", ["didn't say", "don't say", "wouldn't say", "haven't said"], 0, "I'd rather + subject + past simple."),
  c(5, "vocab", "His remarks were taken out of ___, which caused the misunderstanding.", ["context", "content", "contact", "concept"], 0, "Out of context = without the surrounding meaning."),
  r(5, "The author contends that innovation thrives not in isolation but at the margins where disciplines overlap, a claim she substantiates with case studies from three decades of materials science.", "What is the author's main claim?", ["Innovation needs isolation.", "Innovation happens where fields overlap.", "Materials science is outdated.", "Case studies are unreliable."], 1, "Innovation thrives where disciplines overlap."),
  l(5, "Were it not for the sponsors' last-minute support, the festival would have been cancelled.", "What happened?", ["The sponsors helped, so the festival went ahead.", "The festival was cancelled.", "The sponsors withdrew.", "The festival moved."], 0, "Were it not for = without; the sponsors saved it."),
  t(5, "grammar", "By the time we arrive, the film ___ (already / start).", ["will already have started", "will have already started"], "Future perfect: will have + participle."),
];

export const diagnostic = items.map((item, index) => ({ ...item, id: `d${String(index + 1).padStart(2, "0")}` }));

export const DIAGNOSTIC_LENGTH = 20;
