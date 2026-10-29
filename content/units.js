import { EXTRA } from "./units-extra.js";
import { EXTRA_B2 } from "./units-extra-b2.js";

const ch = (q, options, a, why) => ({ kind: "choice", q, options, a, why });
const ty = (q, a, why) => ({ kind: "type", q, a: [].concat(a), why });
const fx = (q, wrong, why) => {
  const a = q.split(/\s+/).indexOf(wrong);
  if (a < 0) throw new Error(`fix token not found: ${wrong} in ${q}`);
  return { kind: "fix", q, a, why };
};
const or = (q, a, why) => ({ kind: "order", q, a: [].concat(a), why });
const di = (say, why = "Dictation: listen and type exactly what you hear.") => ({ kind: "dictation", say, a: [say], why });
const ls = (say, q, options, a, why) => ({ kind: "listen", say, q, options, a, why });
const rd = (text, q, options, a, why) => ({ kind: "read", text, q, options, a, why });
const tr = (q, a, why) => ({ kind: "transform", q, a: [].concat(a), why });

const unitsRaw = [
  {
    level: "A2",
    title: "Daily life & routines",
    focus: "Present simple, present continuous, quantity and everyday vocabulary",
    lessons: [
      ["Routines and the present simple", [
        ch("My brother ___ football every Saturday.", ["play", "plays", "playing", "is play"], 1, "Third person singular (he/she/it) adds -s in the present simple."),
        ty("She ___ (not / like) coffee in the evening.", ["doesn't like", "does not like"], "Negative with he/she/it: doesn't + base verb."),
        fx("He don't work on Sundays.", "don't", "With he/she/it use doesn't, not don't."),
        or("always / I / breakfast / at / have / seven", ["I always have breakfast at seven", "At seven I always have breakfast"], "Frequency adverbs go before the main verb."),
        tr("Make it negative: 'Anna works on Saturdays.'", ["Anna doesn't work on Saturdays", "Anna does not work on Saturdays"], "does not + base verb (no -s on the main verb)."),
        ls("My day starts at six. I take a shower, drink coffee and leave home at seven thirty.", "What time does the speaker leave home?", ["At 6:00", "At 7:00", "At 7:30", "At 8:30"], 2, "'Leave home at seven thirty' = 7:30."),
        ty("___ your parents speak English? (Do / Does)", ["Do"], "Plural subject 'your parents' takes Do."),
        di("I usually get up at half past six."),
      ]],
      ["Now or every day?", [
        ch("Be quiet! The baby ___.", ["sleeps", "is sleeping", "sleep", "slept"], 1, "An action happening right now uses the present continuous."),
        ty("Look! It ___ (rain) outside.", ["is raining", "it is raining"], "Present continuous: am/is/are + verb-ing."),
        fx("Tom is wearing a blue shirt today, but he usually wear a suit.", "wear", "'Usually' signals a habit: present simple, he wears."),
        or("are / what / doing / you / now", "What are you doing now", "Question: wh-word + are + subject + verb-ing."),
        tr("Rewrite as a question: 'He is cooking dinner.' Start: Is ...", ["Is he cooking dinner"], "Invert the subject and 'is' to make the question."),
        rd("Mia usually walks to school, but today it is raining, so she is taking the bus.", "Why is Mia on the bus today?", ["It is raining.", "She is late.", "Her school moved.", "She hates walking."], 0, "'Today it is raining, so...' gives the reason."),
        ty("I ___ (know) the answer right now.", ["know"], "Stative verbs like know are not used in the continuous."),
        di("Right now, they are playing in the park."),
      ]],
      ["Home, food and quantity", [
        ch("There isn't ___ bread left.", ["some", "any", "a", "many"], 1, "Use any in negatives and questions."),
        ty("How ___ eggs do we need? (much / many)", ["many"], "Eggs are countable, so how many."),
        fx("We need some informations about the flat.", "informations", "Information is uncountable: no plural."),
        or("a / is / there / table / the / in / kitchen", ["There is a table in the kitchen", "In the kitchen there is a table"], "There is + singular noun + place."),
        tr("Make it plural: 'There is a tomato in the fridge.' Start: There ...", ["There are tomatoes in the fridge", "There are some tomatoes in the fridge"], "Plural: there are + plural noun."),
        ls("I live in a small flat with my sister. There is a living room, a kitchen and two bedrooms, but there is no balcony.", "What does the flat NOT have?", ["A kitchen", "A balcony", "A living room", "Two bedrooms"], 1, "'There is no balcony.'"),
        ty("I eat ___ apple every day. (a / an)", ["an"], "Use an before a vowel sound."),
        di("There are three bedrooms and a small garden."),
      ]],
    ],
  },
  {
    level: "A2",
    title: "Past, plans & future",
    focus: "Past simple, past continuous, going to, will and comparatives",
    lessons: [
      ["Past simple stories", [
        ch("We ___ to Madrid last weekend.", ["go", "goed", "went", "gone"], 2, "Go is irregular: went."),
        ty("I ___ (buy) this jacket yesterday.", ["bought"], "Irregular past of buy: bought."),
        fx("Did you saw the match last night?", "saw", "After did, use the base form: see."),
        or("what / you / did / yesterday / do", "What did you do yesterday", "Question: what + did + subject + base verb."),
        tr("Make it negative: 'They visited the museum.'", ["They didn't visit the museum", "They did not visit the museum"], "didn't + base verb."),
        ls("Last Friday I finished work early, so I went home, cooked pasta and watched a film.", "What did the speaker do after cooking?", ["Went home", "Finished work", "Watched a film", "Called a friend"], 2, "Order: finished, went home, cooked, watched a film."),
        ty("___ she call you last night? (Did / Does)", ["Did"], "Past time marker 'last night' needs Did."),
        di("She didn't answer the phone because she was asleep."),
      ]],
      ["Was, were and past continuous", [
        ch("While I ___ a shower, the phone rang.", ["had", "was having", "am having", "have had"], 1, "A longer action in progress interrupted by a short one: past continuous."),
        ty("We ___ (be) at the cinema at nine last night.", ["were"], "Plural subject in the past: were."),
        fx("I was born on 1995 in Lima.", "on", "Years take in: in 1995."),
        or("were / what / doing / you / when / I / called", "What were you doing when I called", "Past continuous question + when + past simple."),
        tr("Combine: 'I was walking. I saw an accident.' Start: While ...", ["While I was walking I saw an accident"], "While + past continuous, past simple."),
        rd("Last Sunday we were at the beach at ten. It was sunny, but the water was cold, so we only walked along the sand. We went home at five.", "What did they do at the beach?", ["They swam all day.", "They walked on the sand.", "They played football.", "They had lunch there."], 1, "'We only walked along the sand.'"),
        ty("My birthday is ___ March. (in / on / at)", ["in"], "Months take in."),
        di("It was raining when we left the house."),
      ]],
      ["Plans, predictions and comparisons", [
        ch("Look at those clouds. It ___ rain.", ["will", "is going to", "is", "does"], 1, "Going to is used for predictions based on evidence you can see."),
        ty("I can't come tonight. I ___ (meet) my aunt. (present continuous for a fixed plan)", ["am meeting"], "Present continuous = arrangement."),
        fx("My flat is more big than yours.", "more", "Short adjectives take -er: bigger."),
        or("is / than / train / the / faster / bus / the", "The train is faster than the bus", "Comparative + than."),
        tr("Rewrite with going to: 'I will call her tomorrow.'", ["I am going to call her tomorrow", "I'm going to call her tomorrow"], "going to expresses a plan."),
        ls("I'm busy this week. On Tuesday I'm visiting my dentist, and on Thursday I'm going to start a new course.", "What is the speaker doing on Tuesday?", ["Starting a course", "Visiting the dentist", "Working late", "Travelling"], 1, "'On Tuesday I'm visiting my dentist.'"),
        ty("This is the ___ (good) pizza in town.", ["best"], "Superlative of good: the best."),
        di("I think it will be sunny tomorrow."),
      ]],
    ],
  },
  {
    level: "A2",
    title: "Practical English",
    focus: "Shopping, travel, directions, health and polite requests",
    lessons: [
      ["Shopping and money", [
        ch("___ is this jacket? It's forty euros.", ["How many", "How much", "How long", "How old"], 1, "Ask about price with How much."),
        ty("Could I ___ (try) this on, please?", ["try"], "Could I + base verb."),
        fx("Can I to pay by card?", "to", "Modal verbs are followed by the base form without to."),
        or("do / you / have / this / in / a / smaller / size", "Do you have this in a smaller size", "A polite shopping question."),
        tr("Make it more polite: 'Give me the receipt.' Start: Could ...", ["Could you give me the receipt", "Could you please give me the receipt", "Could I have the receipt"], "Could you / Could I are polite request forms."),
        ls("Excuse me, I bought these shoes yesterday but they are too small. Can I change them for a bigger size?", "What does the customer want?", ["A refund", "A bigger size", "A cheaper pair", "A receipt"], 1, "'Change them for a bigger size.'"),
        ty("This bag is too small. I need a ___ one. (big)", ["bigger"], "Comparative of big: bigger."),
        di("Do you accept credit cards or only cash?"),
      ]],
      ["Travel and directions", [
        ch("The station is ___ the supermarket and the park.", ["between", "among", "above", "across"], 0, "Between is used for two places."),
        ty("The train to Leeds ___ (leave) at 6:15 tomorrow.", ["leaves"], "Timetables use the present simple."),
        fx("How long does it take to get at the airport?", "at", "Get to a place."),
        or("how / can / I / get / to / the / station", "How can I get to the station", "Asking for directions."),
        tr("Make it indirect: 'Where is the bus station?' Start: Could you tell me ...", ["Could you tell me where the bus station is"], "Indirect questions use statement word order."),
        ls("The airport bus leaves from stop number four every twenty minutes. The journey takes about forty minutes, and a single ticket costs eight pounds.", "How often does the bus leave?", ["Every 4 minutes", "Every 20 minutes", "Every 40 minutes", "Every 8 minutes"], 1, "'Every twenty minutes.'"),
        ty("I'd like a ___ ticket to Paris; I'm coming back on Sunday. (single / return)", ["return"], "A return ticket covers both directions."),
        di("Is there a train to the city centre after midnight?"),
      ]],
      ["Health and advice", [
        ch("You ___ see a doctor if the pain continues.", ["should", "must to", "ought", "would to"], 0, "Should + base verb gives advice."),
        ty("You ___ (not / have to) come tomorrow; it's optional.", ["don't have to", "do not have to"], "Don't have to = not necessary."),
        fx("She should to take some rest.", "to", "No to after should."),
        or("why / don't / you / take / a / day / off", "Why don't you take a day off", "Why don't you... suggests an idea."),
        tr("Give advice: 'It's a good idea for you to drink more water.' Start: You ...", ["You should drink more water", "You ought to drink more water"], "Should / ought to give advice."),
        rd("Dr Lee's advice: take one tablet after breakfast and one after dinner. Do not drive after taking the tablets. Come back in a week if you still feel ill.", "When should you take the tablets?", ["Before sleeping", "After breakfast and dinner", "Only at lunch", "Whenever you drive"], 1, "'One after breakfast and one after dinner.'"),
        ty("You must not smoke here. It is ___. (forbidden / optional)", ["forbidden"], "Must not = prohibition."),
        di("I feel terrible, so I'm going to stay in bed all day."),
      ]],
    ],
  },
  {
    level: "B1",
    title: "Tenses & experience",
    focus: "Present perfect, used to, narrative tenses and the past perfect",
    lessons: [
      ["Present perfect or past simple?", [
        ch("I ___ him last week at the gym.", ["have seen", "saw", "have been seeing", "had seen"], 1, "A finished time (last week) requires the past simple."),
        ty("We have known each other ___ ten years. (for / since)", ["for"], "For + period of time."),
        fx("Have you finished your homework yesterday?", "Have", "Yesterday is a finished time: Did you finish...?"),
        or("never / have / sushi / I / eaten", "I have never eaten sushi", "Never goes between have and the participle."),
        tr("Rewrite: 'It's two years since I last saw her.' Start: I haven't ...", ["I haven't seen her for two years", "I have not seen her for two years"], "Haven't + participle + for + period."),
        rd("Since moving to Valencia, Carlos has changed jobs twice. He worked in a bank for a year, then joined a start-up, where he has been managing a small team since March.", "How long has Carlos managed a team?", ["Since March.", "For a year.", "Since he moved to Valencia.", "For two years."], 0, "'Since March' marks the start of the situation that continues."),
        ty("The train hasn't left ___. (already / yet)", ["yet"], "Yet is used in negatives for something expected."),
        di("I've just finished my report, but I haven't sent it yet."),
      ]],
      ["Used to, would and getting used to", [
        ch("I'm not used ___ up so early.", ["to get", "to getting", "getting", "get"], 1, "Be used to + -ing: accustomed to."),
        ty("I didn't ___ to like olives, but now I love them. (use)", ["use"], "Negative: didn't use to + base verb."),
        fx("He is used to work night shifts, so he doesn't mind.", "work", "Be used to + verb-ing: working."),
        or("to / used / lot / play / I / chess / a", "I used to play chess a lot", "Used to + base verb for past habits."),
        tr("Rewrite with would: 'Every summer we went to the lake.' Start: Every summer we ...", ["Every summer we would go to the lake"], "Would + base verb describes repeated past actions."),
        ls("When I moved to London, driving on the left felt strange, but after a few months I got used to it.", "How does the speaker feel about it now?", ["It still feels strange.", "It feels normal.", "It scares them.", "They avoid driving."], 1, "'Got used to it' = it now feels normal."),
        ty("I ___ have a dog when I was a child. (used to / would)", ["used to"], "Would is not normally used for past states like having a pet."),
        di("It took me a while to get used to living alone."),
      ]],
      ["Narrative tenses", [
        ch("When we arrived, the film ___.", ["already started", "had already started", "was already starting", "has already started"], 1, "The earlier past action takes the past perfect."),
        ty("She was tired because she ___ (work) all day. (past perfect continuous)", ["had been working"], "Past perfect continuous: had been + verb-ing."),
        fx("After I had finish my homework, I went out.", "finish", "Past perfect needs the participle: finished."),
        or("had / the / by / left / time / arrived / I / everyone", "By the time I arrived everyone had left", "By the time + past simple, past perfect."),
        tr("Combine with after: 'I finished the report. Then I went home.' Start: After ...", ["After I had finished the report I went home", "After I finished the report I went home", "After finishing the report I went home"], "After can take past perfect, past simple or -ing."),
        rd("I was walking home when I realised I had left my wallet at the café. I ran back, but it was closed. Luckily, the owner had found it and had put it under the door.", "Where was the wallet at the end?", ["In the café", "Under the door", "At home", "In the owner's pocket"], 1, "'Had put it under the door.'"),
        ty("By the time the police arrived, the thief ___ (disappear).", ["had disappeared"], "Earlier past action: past perfect."),
        di("I had never seen snow before I moved to Canada."),
      ]],
    ],
  },
  {
    level: "B1",
    title: "Conditionals, modals & passives",
    focus: "Conditionals, modals of obligation and deduction, passives and have something done",
    lessons: [
      ["Conditionals and time clauses", [
        ch("If it ___ tomorrow, we'll cancel the picnic.", ["rains", "will rain", "rained", "would rain"], 0, "First conditional: if + present, will + base verb."),
        ty("If I ___ (be) you, I would accept the offer.", ["were", "was"], "Second conditional for imaginary situations."),
        fx("If I will see him, I'll tell him.", "will", "No will in the if clause."),
        or("wouldn't / I / that / were / I / if / you / do", ["If I were you I wouldn't do that", "I wouldn't do that if I were you"], "Second conditional advice."),
        tr("Rewrite with unless: 'If you don't study, you won't pass.' Start: Unless ...", ["Unless you study you won't pass", "Unless you study you will not pass"], "Unless = if not; the verb is positive."),
        ls("If I won the lottery, I wouldn't stop working. I'd buy a small bakery and bake bread every morning.", "What would the speaker do if they won?", ["Stop working", "Open a bakery", "Travel the world", "Buy a house"], 1, "'I'd buy a small bakery.'"),
        ty("I'll call you as soon as I ___ (arrive).", ["arrive"], "After as soon as, use the present for the future."),
        di("If I had more time, I would learn to paint."),
      ]],
      ["Modals of obligation and deduction", [
        ch("The lights are off. They ___ be at home.", ["can't", "mustn't", "needn't", "don't"], 0, "Can't be = logical deduction that it is impossible."),
        ty("You ___ (not / need) to bring a pen; we'll provide them.", ["needn't", "don't need", "do not need", "need not"], "Not necessary: needn't or don't need to."),
        fx("You must to wear a helmet on this site.", "to", "Must is followed by the base form, no to."),
        or("have / she / must / left / already", "She must have left already", "Must have + participle = past deduction."),
        tr("Rewrite: 'It's possible that he forgot.' Start: He ...", ["He might have forgotten", "He may have forgotten", "He could have forgotten"], "May/might/could have + participle."),
        rd("Notice: Visitors must sign in at reception. Photography isn't allowed in the gallery. You needn't book tickets in advance, but it is advisable at weekends.", "Which statement is true?", ["You must book tickets.", "You may take photographs.", "Booking is not required but advisable.", "Signing in is optional."], 2, "Needn't book = not required."),
        ty("You ___ have worried; the exam was easy. (needn't / mustn't)", ["needn't", "need not"], "Needn't have + participle: it was unnecessary."),
        di("You don't have to come, but you ought to call her."),
      ]],
      ["Passives and have something done", [
        ch("My car ___ at the garage at the moment.", ["is repairing", "is being repaired", "is repaired", "repairs"], 1, "Present continuous passive: is being + participle."),
        ty("The bridge ___ (build) in 1890.", ["was built"], "Past simple passive: was/were + participle."),
        fx("I had my wallet steal on the bus.", "steal", "Have something done: stolen."),
        or("been / has / the / report / sent / already", "The report has already been sent", "Present perfect passive: has been + participle."),
        tr("Rewrite in the passive: 'Someone stole my bike.' Start: My bike ...", ["My bike was stolen"], "Past simple passive."),
        ls("Our house is being painted this week, so we're staying with my parents. The kitchen was finished yesterday.", "What is happening to the house?", ["It is being sold.", "It is being painted.", "It is being built.", "It is being cleaned."], 1, "'Is being painted.'"),
        ty("I had my phone ___ (repair) last week.", ["repaired"], "Have + object + past participle."),
        di("The documents will be delivered by courier tomorrow."),
      ]],
    ],
  },
  {
    level: "B1",
    title: "Reporting, relatives & linking",
    focus: "Reported speech, relative clauses, gerunds and infinitives, linkers and phrasal verbs",
    lessons: [
      ["Reported speech", [
        ch("She said she ___ tired.", ["was", "were", "will be", "would be"], 0, "Reported speech backshifts am/is to was."),
        ty("'I'll call you tomorrow.' He said he ___ call me the next day.", ["would"], "Will backshifts to would."),
        fx("He asked me where did I live.", "did", "Reported questions use statement word order."),
        or("me / asked / she / I / if / was / free", "She asked me if I was free", "Reported yes/no question: if + statement order."),
        tr("Report: 'Don't touch it,' she told me. Start: She told me ...", ["She told me not to touch it"], "Reported commands use (not) to + verb."),
        rd("Email from Sam: 'I can't attend the meeting because I'm travelling. I will send my report tomorrow.'", "How would you report this?", ["Sam said he couldn't attend because he was travelling.", "Sam says he can't attend because he travelled.", "Sam said he can't attend because he will travel.", "Sam told he couldn't attend."], 0, "Can't becomes couldn't; I'm travelling becomes he was travelling."),
        ty("'Where have you been?' She asked me where I ___ .", ["had been"], "Present perfect backshifts to past perfect."),
        di("He told me that he had already spoken to the manager."),
      ]],
      ["Relative clauses, gerunds and infinitives", [
        ch("The woman ___ lives next door is a nurse.", ["who", "which", "whose", "whom"], 0, "Who refers to people as the subject."),
        ty("I'm looking forward to ___ (see) you.", ["seeing"], "To is a preposition here: verb-ing follows."),
        fx("She suggested to go out tonight.", "to", "Suggest + -ing: suggested going."),
        or("book / which / I / the / is / borrowed / yours", ["The book which I borrowed is yours", "Yours is the book which I borrowed"], "A relative clause with which."),
        tr("Join with whose: 'I met a man. His son plays for Barcelona.' Start: I met a man ...", ["I met a man whose son plays for Barcelona"], "Whose shows possession."),
        ls("I remember meeting her at a party, but I don't remember saying anything important. I must remember to call her tomorrow.", "What must the speaker do?", ["Remember the party", "Call her", "Say something important", "Go to a party"], 1, "Remember to = not forget to do."),
        ty("He enjoys ___ (cook) for his friends.", ["cooking"], "Enjoy + -ing."),
        di("She stopped smoking because she wanted to save money."),
      ]],
      ["Linkers, phrasal verbs and prepositions", [
        ch("___ it was raining, we went for a walk.", ["Despite", "Although", "Because", "However"], 1, "Although + clause expresses contrast."),
        ty("She is very good ___ solving problems. (preposition)", ["at"], "Good at + -ing."),
        fx("Despite of the rain, we had a great time.", "of", "Despite is never followed by of."),
        or("although / was / tired / he / kept / working / he", ["Although he was tired he kept working", "He kept working although he was tired"], "Although introduces a contrasting clause."),
        tr("Rewrite with despite: 'Although he was ill, he went to work.' Start: Despite ...", ["Despite being ill he went to work", "Despite his illness he went to work", "Despite the fact that he was ill he went to work"], "Despite + noun / -ing / the fact that."),
        rd("The company had to put off the launch because of a delay in production. Management decided to carry on with the other plans and called off the party.", "What does 'put off' mean here?", ["Cancel", "Postpone", "Start", "Advertise"], 1, "Put off = postpone to a later time."),
        ty("I can't ___ up with this noise any longer. (phrasal verb)", ["put"], "Put up with = tolerate."),
        di("Although it was expensive, we decided to buy it."),
      ]],
    ],
  },
  {
    level: "B2",
    title: "Advanced grammar",
    focus: "Mixed conditionals, wish, inversion, emphasis, causatives and reporting passives",
    lessons: [
      ["Mixed conditionals and wishes", [
        ch("If I ___ harder at school, I might have a better job now.", ["had studied", "studied", "would study", "have studied"], 0, "Mixed conditional: past condition, present result."),
        ty("I wish I ___ (not / say) that to her last night.", ["hadn't said", "had not said"], "Wish + past perfect expresses regret about the past."),
        fx("If I would have known, I would have helped.", "would", "No would in the if clause: If I had known."),
        or("it / hadn't / rained / we / would / have / gone / hiking / if", ["If it hadn't rained we would have gone hiking", "We would have gone hiking if it hadn't rained"], "Third conditional."),
        tr("Rewrite: 'I regret not saving more money.' Start: I wish ...", ["I wish I had saved more money"], "Wish + past perfect for past regrets."),
        ls("I'd be fluent by now if I'd kept up my lessons, but I stopped two years ago.", "What does the speaker imply?", ["They are fluent.", "They stopped and are not fluent.", "They still take lessons.", "They plan to start."], 1, "Mixed conditional: the unreal present result is not fluent."),
        ty("If only she ___ (listen) to my advice back then!", ["had listened"], "If only + past perfect: regret about the past."),
        di("If I hadn't missed the bus, I wouldn't be late now."),
      ]],
      ["Inversion and emphasis", [
        ch("Rarely ___ such a talented young player.", ["I have seen", "have I seen", "I saw", "did I seen"], 1, "Negative adverbials at the start trigger inversion."),
        ty("Not only ___ the film long, but it was also dull.", ["was"], "Not only + inversion: was the film."),
        fx("Never I have felt so embarrassed.", "I", "After never: have I felt."),
        or("had / than / no / sooner / he / left / rang / the / phone", "No sooner had he left than the phone rang", "No sooner + had + subject + participle, than."),
        tr("Rewrite with inversion: 'If I had known, I would have called.' Start: Had ...", ["Had I known I would have called"], "Inverted third conditional drops if."),
        rd("What annoyed the committee was not the cost but the delay. It was the delay that made them reconsider the whole proposal.", "What annoyed the committee most?", ["The cost", "The delay", "The proposal", "The committee"], 1, "Cleft sentences highlight the delay."),
        ty("Hardly ___ I sat down when the phone rang.", ["had"], "Hardly + had + subject + participle."),
        di("Only after the meeting did I realise my mistake."),
      ]],
      ["Causatives and reporting passives", [
        ch("He is said ___ over a million euros last year.", ["to earn", "to have earned", "earning", "he earned"], 1, "Past reference with a reporting passive: to have + participle."),
        ty("It is believed that the painting ___ (steal) in 1998.", ["was stolen"], "Past passive."),
        fx("She had her car to repair last week.", "to", "Have something done: had her car repaired."),
        or("is / to / the / thought / be / safe / drug", "The drug is thought to be safe", "Subject + is thought + infinitive."),
        tr("Rewrite: 'People say that the CEO resigned.' Start: The CEO ...", ["The CEO is said to have resigned"], "Reporting passive with a past infinitive."),
        ls("The new stadium is expected to open next spring, although it is reported to be running two months behind schedule.", "What is reported about the stadium?", ["It will open early.", "It is behind schedule.", "It was cancelled.", "It is over budget."], 1, "'Running two months behind schedule.'"),
        ty("We need to get the contract ___ (sign) by Friday.", ["signed"], "Get + object + participle."),
        di("The suspect is believed to have left the country."),
      ]],
    ],
  },
  {
    level: "B2",
    title: "Precise vocabulary",
    focus: "Collocations, word formation, phrasal verbs, idioms, false friends and prepositions",
    lessons: [
      ["Collocations and word formation", [
        ch("We need to ___ a decision before Friday.", ["do", "make", "get", "put"], 1, "Collocation: make a decision."),
        ty("She made a ___ impression on the interviewers. (strong / heavy)", ["strong"], "Collocation: make a strong impression."),
        fx("He did a big mistake in the report.", "did", "Collocation: make a mistake."),
        or("carried / the / out / research / team / extensive", "The team carried out extensive research", "Collocation: carry out research."),
        tr("Rewrite using 'heavy': 'It rained a lot all day.' Start: There ...", ["There was heavy rain all day"], "Collocation: heavy rain."),
        rd("The firm's meteoric rise surprised analysts, who had written it off as a short-lived start-up.", "What does 'meteoric' mean?", ["Slow", "Very fast", "Dangerous", "Unexpected loss"], 1, "A meteor moves very fast: meteoric = very rapid."),
        ty("His ___ (reliable) is beyond doubt.", ["reliability"], "Noun form of reliable: reliability."),
        di("The government has launched a campaign to raise awareness."),
      ]],
      ["Phrasal verbs and idioms", [
        ch("The negotiations ___ because neither side would compromise.", ["broke down", "broke up", "broke out", "broke in"], 0, "Break down = fail."),
        ty("We ran ___ of milk, so I went to the shop. (preposition)", ["out"], "Run out of = have none left."),
        fx("She came across with an old photo while tidying.", "with", "Come across + object: found by chance."),
        or("up / to / look / I / my / grandmother / really", "I really look up to my grandmother", "Look up to = admire."),
        tr("Use 'put up with': 'He tolerates the noise.' Start: He ...", ["He puts up with the noise"], "Put up with = tolerate."),
        ls("I was going to call off the trip, but my friends talked me into going.", "What did the speaker do?", ["Cancelled the trip", "Went on the trip", "Postponed the trip", "Refused to go"], 1, "Talked me into going = persuaded me to go."),
        ty("'It's raining cats and dogs' means it is raining ___. (heavily / lightly)", ["heavily"], "The idiom describes heavy rain."),
        di("We need to come up with a plan before the deadline."),
      ]],
      ["False friends and prepositions", [
        ch("I need to borrow a book, so I'm going to the ___.", ["library", "bookshop", "libreria", "stationery"], 0, "Library (biblioteca) lends books; a bookshop (librería) sells them."),
        ty("He is very keen ___ jazz. (preposition)", ["on"], "Keen on."),
        fx("She is interested on learning Japanese.", "on", "Interested in."),
        or("is / of / afraid / she / flying", "She is afraid of flying", "Afraid of."),
        tr("Avoid the false friend: 'I assist the class every Monday.' (I am present) Start: I ...", ["I attend the class every Monday", "I go to the class every Monday"], "Assist means help; attend = asistir."),
        ls("She is very sensitive, so be careful what you say to her.", "What does 'sensitive' mean here?", ["Reasonable", "Easily upset", "Rude", "Intelligent"], 1, "Sensitive = easily hurt; English 'sensible' means practical and reasonable."),
        ty("Don't shout; he is very ___ and cries easily. (sensible / sensitive)", ["sensitive"], "Sensible means reasonable, not easily hurt."),
        di("Actually, I was shocked by how good the film was."),
      ]],
    ],
  },
  {
    level: "B2",
    title: "Academic English",
    focus: "Academic vocabulary, hedging, linkers and paraphrasing for reading and writing exams",
    lessons: [
      ["Academic vocabulary and reading", [
        rd("Urbanisation has accelerated worldwide. Proponents argue that cities foster innovation by concentrating talent, whereas detractors point to overcrowding and inequality.", "Who are 'detractors'?", ["Supporters of cities", "Critics of urbanisation", "City planners", "Inventors"], 1, "Detractors = critics; they contrast with proponents."),
        ch("Which word is closest in meaning to 'mitigate'?", ["worsen", "reduce", "ignore", "predict"], 1, "Mitigate = make less severe."),
        ty("The results are ___ (consist) with earlier findings.", ["consistent"], "Adjective form: consistent with."),
        fx("The study shows that exercise have a significant effect on memory.", "have", "Singular subject exercise: has."),
        or("findings / the / a / correlation / reveal / strong", "The findings reveal a strong correlation", "Academic collocation: reveal a correlation."),
        tr("Use a formal alternative: 'A lot of evidence supports this view.' Start: Considerable ...", ["Considerable evidence supports this view"], "Considerable replaces a lot of in formal writing."),
        ty("Scientists ___ (hypothesis) that the climate will warm further. (verb)", ["hypothesise", "hypothesize"], "Verb form of hypothesis."),
        di("The results are consistent with previous research."),
      ]],
      ["Hedging and cautious language", [
        ch("Which sentence is the most cautious?", ["This proves that students are lazy.", "This may suggest that some students struggle.", "This always means students fail.", "Everybody knows students struggle."], 1, "May suggest and some reduce certainty."),
        ty("It ___ (appear) that prices will rise next year.", ["appears"], "It appears that: impersonal hedge."),
        fx("The results suggest that the drug are safe.", "are", "Subject drug is singular: is safe."),
        or("tend / to / students / rely / on / online / sources", "Students tend to rely on online sources", "Tend to softens a generalisation."),
        tr("Rewrite with 'may': 'Social media damages concentration.' Start: Social media may ...", ["Social media may damage concentration"], "May + base verb = possibility."),
        ls("This approach is likely to benefit most learners, although it is unlikely to work for everyone.", "Which statement matches?", ["It works for all.", "It works for nobody.", "It probably helps most people.", "It helps few people."], 2, "Likely to benefit most = probably helps most."),
        ty("The sample was small, so the findings should be treated with ___. (caution)", ["caution"], "Treat with caution."),
        di("It could be argued that the results are somewhat limited."),
      ]],
      ["Linkers, arguments and paraphrasing", [
        ch("The plan is cheap; ___, it is risky.", ["moreover", "nevertheless", "therefore", "similarly"], 1, "Nevertheless introduces a contrast."),
        ty("___ the heavy costs, the project went ahead. (Despite / In spite of)", ["Despite", "In spite of"], "Concession before a noun phrase."),
        fx("Consequently of the delay, the match was postponed.", "Consequently", "Use As a consequence of + noun."),
        or("whereas / cities / grow / villages / shrink", ["Cities grow whereas villages shrink", "Whereas cities grow villages shrink"], "Whereas contrasts two facts."),
        tr("Paraphrase: 'Many people think that remote work is more productive.' Start: Remote work ...", ["Remote work is widely believed to be more productive", "Remote work is widely thought to be more productive"], "Reporting passive paraphrases many people think."),
        rd("Some argue that homework improves discipline. Others claim it adds stress without improving results. Evidence is mixed: a large study found modest gains in older students but none in young children.", "What is the main point?", ["Homework always works.", "Homework never works.", "Evidence on homework is mixed.", "Children need more homework."], 2, "Evidence is mixed."),
        ty("On the one hand, cars are convenient; on the ___ hand, they pollute. (other)", ["other"], "On the one hand... on the other hand."),
        di("In conclusion, the benefits clearly outweigh the drawbacks."),
      ]],
    ],
  },
  {
    level: "B2",
    title: "Integrate & perform",
    focus: "Exam-style synthesis: read, listen, speak, write and mixed mock tasks",
    lessons: [
      ["Read and synthesise", [
        rd("Remote work has grown rapidly. Supporters say it saves commuting time and improves autonomy. However, managers worry about collaboration, and some employees report isolation. Research suggests that hybrid models, combining home and office days, may balance these concerns.", "What does the passage conclude?", ["Remote work should end.", "Hybrid work may balance the issues.", "Managers prefer full remote work.", "Isolation is not a problem."], 1, "The passage ends with hybrid models as a balance."),
        ty("The word 'autonomy' in the passage means ___. (independence / pressure)", ["independence"], "Autonomy = freedom to decide."),
        tr("Paraphrase: 'Supporters say it saves commuting time.' Start: Proponents ...", ["Proponents claim that it saves commuting time", "Proponents argue that it saves commuting time", "Proponents claim it saves commuting time", "Proponents argue it saves commuting time"], "Paraphrase with synonyms and a reporting verb."),
        fx("Research suggest that hybrid models may help.", "suggest", "Research is uncountable and singular: suggests."),
        or("report / praised / the / hybrid / model / the", "The report praised the hybrid model", "Subject + verb + object."),
        tr("Summarise in one sentence with 'while': 'Employees value flexibility. Managers worry about collaboration.' Start: While ...", ["While employees value flexibility managers worry about collaboration"], "While contrasts two ideas."),
        ty("Remote work has grown; ___, collaboration remains a challenge. (however)", ["however"], "However introduces contrast."),
        di("Research suggests that hybrid models may balance these concerns."),
      ]],
      ["Listen and respond", [
        ls("Professor: In today's lecture, we'll examine why some species migrate. The main factor is food availability, but temperature also matters.", "What is the main factor in migration?", ["Temperature", "Food availability", "Predators", "Distance"], 1, "'The main factor is food availability.'"),
        ls("Student: I'd like to switch to the evening seminar because I work in the mornings. Advisor: That's possible, but you'll need your supervisor's signature.", "What does the student need?", ["A new job", "A supervisor's signature", "A morning class", "More credits"], 1, "'You'll need your supervisor's signature.'"),
        di("Please remember to submit your essay before the deadline."),
        ty("Lecture note: Food ___ is the main factor in migration. (availability)", ["availability"], "Note-taking from the lecture."),
        tr("Report the advisor: 'You'll need your supervisor's signature.' Start: The advisor said ...", ["The advisor said I would need my supervisor's signature", "The advisor said that I would need my supervisor's signature", "The advisor said the student would need their supervisor's signature"], "Backshift will to would in reported speech."),
        fx("The professor explain why species migrate.", "explain", "Third person singular: explains."),
        or("matters / also / temperature / but / food / main / the / is / factor", "Food is the main factor but temperature also matters", "Reconstruct the lecturer's point."),
        ty("Not only ___ food matter, but temperature also plays a part. (does)", ["does"], "Not only + auxiliary + subject."),
      ]],
      ["Mock performance", [
        ch("Choose the most formal option to begin an email request.", ["Hey, can you send the form?", "I am writing to enquire about the form.", "Send me the form.", "Give me the form now."], 1, "Formal register: I am writing to enquire."),
        ty("I look forward ___ hearing from you. (to)", ["to"], "Look forward to + -ing."),
        tr("Rewrite more formally: 'Can you tell me the price?' Start: I would be grateful if ...", ["I would be grateful if you could tell me the price"], "Formal request."),
        fx("The number of applicants have increased significantly.", "have", "The number of takes a singular verb: has."),
        or("on / depends / it / the / budget / entirely", "It depends entirely on the budget", "Depend on."),
        rd("Opinion: Although cheap flights give people opportunities to travel, they also contribute significantly to carbon emissions. Therefore, governments should consider taxing short-haul flights.", "What is the writer's position?", ["Flights should be free.", "Short-haul flights should be taxed.", "Travel is harmful.", "Governments should ignore emissions."], 1, "The conclusion is that governments should tax short-haul flights."),
        ty("Despite ___ (tire), she kept studying for the exam.", ["being tired"], "Despite + -ing."),
        di("To what extent do you agree or disagree with this statement?"),
      ]],
    ],
  },
];

export const units = unitsRaw.map((unit, ui) => ({
  id: `u${ui + 1}`,
  level: unit.level,
  title: unit.title,
  focus: unit.focus,
  lessons: unit.lessons.map(([title, exercises], li) => {
    const id = `c${ui + 1}-l${li + 1}`;
    const base = exercises.map((ex, ei) => ({ ...ex, id: `${id}-${ei + 1}` }));
    const extra = [...(EXTRA[id] || []), ...(EXTRA_B2[id] || [])].map((ex, ei) => ({ ...ex, id: `${id}-${base.length + ei + 1}` }));
    // exercises: the authored core set; pool: everything a lesson attempt may draw from.
    return { id, title, exercises: base, pool: [...base, ...extra] };
  }),
}));

export const LESSON_SIZE = 8;

export const lessonOrder = units.flatMap((u) => u.lessons.map((l) => l.id));
