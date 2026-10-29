// A second batch for the B2 lessons (units 7-10): 8 more items per lesson, so each B2 lesson draws from 24.
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

export const EXTRA_B2 = {
  "c7-l1": [
    ch("If she ___ harder at school, she would have a better job now.", ["studied", "had studied", "studies", "would study"], 1, "Mixed conditional: past condition (had studied), present result (would have)."),
    ty("I wish I ___ (not / eat) so much; I feel awful.", ["hadn't eaten", "had not eaten"], "Wish + past perfect for a regret about the past."),
    fx("If I would know the answer, I would tell you.", "would", "No 'would' in the if-clause: If I knew the answer."),
    or("rather / I'd / stayed / you / home / had", "I'd rather you had stayed home", "Would rather + subject + past perfect for a past preference."),
    tr("Rewrite with 'wish': 'It's a pity you can't come.' Start: I wish ...", ["I wish you could come"], "Wish + could for present situations."),
    ch("Supposing you ___ the lottery, what would you do?", ["win", "won", "will win", "had win"], 1, "Supposing + past simple: an imagined present situation."),
    ls("If I had known the road was closed, I would have left an hour earlier, and we wouldn't be so late now.", "Why is the speaker late?", ["He did not know the road was closed", "He left too early", "His car broke down", "He got lost"], 0, "'If I had known the road was closed ...'"),
    di("If only I had kept the receipt, I could return it."),
  ],
  "c7-l2": [
    ch("___ had she left the building when the alarm went off.", ["Scarcely", "Seldom", "Hardly ever", "Never"], 0, "Scarcely + had + subject + past participle, then when/before."),
    ty("Little ___ (they / know) that the deal was about to collapse.", ["did they know"], "Little + auxiliary + subject."),
    fx("Only after the meeting I realised the mistake.", "I", "After 'only after': inversion, did I realise."),
    or("who / it / was / Peter / broke / the / window", "It was Peter who broke the window", "Cleft sentence for emphasis: It was ... who ..."),
    tr("Add emphasis: 'The noise annoyed me.' Start: What ...", ["What annoyed me was the noise"], "Wh-cleft: What + verb + was + noun."),
    ch("So tired ___ that he fell asleep at the wheel.", ["he was", "was he", "he had", "did he"], 1, "So + adjective + auxiliary + subject."),
    rd("Not until the second interview did Clara learn that the job involved frequent travel. Had she known earlier, she would have asked for a higher salary.", "When did Clara learn about the travel?", ["Before applying", "During the second interview", "After accepting", "On her first day"], 1, "'Not until the second interview did Clara learn.'"),
    di("Not only did the company lose money, but it also lost its reputation."),
  ],
  "c7-l3": [
    ch("The manager had the report ___ before the meeting.", ["rewrite", "rewritten", "rewriting", "to rewrite"], 1, "Have + object + past participle."),
    ty("The prisoner is believed ___ (escape) through a window.", ["to have escaped"], "Reporting passive, earlier time: to have + past participle."),
    fx("He is said that he is a millionaire.", "that", "Personal passive: He is said to be a millionaire."),
    or("get / I / must / my / eyes / tested", "I must get my eyes tested", "Get + object + past participle."),
    tr("Passive reporting: 'People think the painting is a forgery.' Start: The painting is ...", ["The painting is thought to be a forgery"], "Be thought to be."),
    ch("She had her purse ___ on the train.", ["steal", "stolen", "stealing", "to steal"], 1, "Have something done can mean something unpleasant happened to you."),
    ls("The old factory is expected to be demolished next spring, and a park is reported to be planned for the site.", "What is planned for the site?", ["A park", "A school", "A shopping centre", "Houses"], 0, "'A park is reported to be planned.'"),
    di("The company is known to have invested heavily in research."),
  ],
  "c8-l1": [
    ch("The company has ___ a loss for the third year running.", ["done", "made", "taken", "had made"], 1, "Collocation: make a loss."),
    ty("Her ___ (generous) towards the charity was widely praised.", ["generosity"], "Noun from generous: generosity."),
    fx("They carried a survey among local residents.", "carried", "Collocation: carry out / conduct a survey."),
    or("raised / the / concerns / serious / report / about / safety", "The report raised serious concerns about safety", "Collocation: raise concerns."),
    tr("Word formation: 'Her argument was hard to believe.' Start: Her argument was ...", ["Her argument was unbelievable", "Her argument was not believable"], "Un- + believ + -able."),
    ch("A ___ rise in prices caught everyone by surprise.", ["sharp", "high", "strong", "heavy"], 0, "Collocation: a sharp rise."),
    rd("Employers are increasingly aware of the need to foster a healthy work-life balance; failing to do so can lead to high staff turnover.", "What can happen if employers ignore work-life balance?", ["Staff may leave in large numbers", "Wages will fall", "Hours will shorten", "Offices will close"], 0, "'High staff turnover' means many employees leave."),
    di("The new regulations have had a profound impact on small businesses."),
  ],
  "c8-l2": [
    ch("The negotiations ___ because neither side would compromise.", ["broke down", "broke out", "broke in", "broke up"], 0, "Break down = fail."),
    ty("It's raining cats and dogs; let's call the picnic ___. (off)", ["off"], "Call off = cancel."),
    fx("I can't put up this noise any longer.", "up", "Put up with = tolerate."),
    or("the / turned / to / be / out / test / easy", "The test turned out to be easy", "Turn out to be = prove to be."),
    tr("Replace the idiom: 'It's a piece of cake.' Start: It is very ...", ["It is very easy"], "A piece of cake = very easy."),
    ch("Don't worry; I'll ___ you up at the station at six.", ["pick", "take", "put", "set"], 0, "Pick up = collect someone."),
    ls("I was going to quit my job, but I talked it over with my wife and decided to stick with it for another year.", "What did the speaker decide?", ["To keep his job", "To retire", "To change career", "To move abroad"], 0, "Stick with it = continue."),
    di("We should look into the matter before we make a decision."),
  ],
  "c8-l3": [
    ch("The film was very ___; I nearly fell asleep.", ["boring", "bored", "boredom", "bore"], 0, "-ing adjectives describe the thing; -ed describe the feeling."),
    ty("She is very keen ___ gardening. (on)", ["on"], "Keen on."),
    fx("He is angry at his brother since the argument.", "at", "Angry with a person."),
    or("fond / am / of / I / not / spicy / food", "I am not fond of spicy food", "Fond of."),
    tr("Avoid the false friend: 'I'm constipated' is not 'Estoy constipado'. Say you have a cold. Start: I have ...", ["I have a cold", "I've got a cold"], "Constipated means estreñido, not resfriado."),
    ch("He ___ me of my uncle; they look alike.", ["reminds", "remembers", "recalls to", "remarks"], 0, "Remind someone of = make them think of."),
    ls("I was surprised that the lecture was so long. Actually, it lasted nearly three hours, and I was exhausted by the end.", "What does 'actually' mean here?", ["In fact", "At the moment", "Currently", "Nowadays"], 0, "Actually = in fact; for 'now', use currently."),
    di("She is good at maths but afraid of speaking in public."),
  ],
  "c9-l1": [
    ch("The report ___ several limitations of the study.", ["highlights", "lights", "hits", "shines"], 0, "Highlight = draw attention to."),
    ty("The two variables are strongly ___ (correlate).", ["correlated"], "Be correlated with."),
    fx("The experiment demonstrates a significative difference.", "significative", "Significant."),
    or("findings / consistent / with / are / these / earlier / research", "These findings are consistent with earlier research", "Academic collocation: consistent with."),
    tr("Formal: 'The study looked at 200 students.' Start: The study ...", ["The study examined 200 students", "The study investigated 200 students", "The study involved 200 students"], "Examine/investigate are more formal than look at."),
    ch("The author ___ that urbanisation has increased inequality.", ["argues", "says out", "tells", "talks"], 0, "Argue that = claim with reasons."),
    rd("Although the sample was small, the results were statistically significant, which suggests that the effect is real. Nevertheless, the authors call for a larger replication.", "What do the authors recommend?", ["A larger replication", "Stopping the study", "Using a smaller sample", "Ignoring the results"], 0, "'Call for a larger replication.'"),
    di("The results should be interpreted with caution."),
  ],
  "c9-l2": [
    ch("The evidence is ___ conclusive, so more research is needed.", ["not entirely", "totally", "absolutely", "completely"], 0, "Hedging with 'not entirely'."),
    ty("It could be ___ that the trend is temporary. (argue)", ["argued"], "It could be argued that ... is a common hedge."),
    fx("Experts always agree that this diet works.", "always", "Overgeneralised: Many experts agree, or Experts generally agree."),
    or("seems / the / to / policy / be / working / generally", "The policy generally seems to be working", "Hedging with seems."),
    tr("Soften: 'This proves that exams are unfair.' Start: This suggests ...", ["This suggests that exams may be unfair", "This suggests that exams are unfair", "This suggests that exams might be unfair"], "Suggest replaces prove for cautious claims."),
    ch("Results ___ vary depending on the age group.", ["may", "will always", "must always", "are sure to"], 0, "May = possibility."),
    ls("It would appear that the new method is slightly more effective, although the difference is relatively small.", "How effective is the new method?", ["Slightly more effective", "Much more effective", "Less effective", "Equally effective"], 0, "'Slightly more effective.'"),
    di("It is worth noting that these figures may not be representative."),
  ],
  "c9-l3": [
    ch("The scheme is popular; ___, it has serious flaws.", ["nevertheless", "therefore", "for instance", "similarly"], 0, "Nevertheless introduces contrast."),
    ty("___ the other hand, public transport is cheaper. (On)", ["On"], "On the one hand ... on the other hand."),
    fx("Despite of the delay, the event was a success.", "of", "Despite + noun, without of (in spite of)."),
    or("hand / the / on / one / it / is / cheaper", "On the one hand it is cheaper", "Contrast with on the one hand."),
    tr("Paraphrase: 'Prices have risen sharply.' Start: There has been ...", ["There has been a sharp rise in prices", "There has been a sharp increase in prices"], "Verb to noun paraphrase."),
    ch("___ the evidence, the committee rejected the proposal.", ["In view of", "Because", "As for", "Thanks"], 0, "In view of + noun."),
    rd("Critics of nuclear power cite waste disposal. Proponents, on the other hand, emphasise low carbon emissions. Whichever side one takes, the choice involves trade-offs.", "What does the writer conclude?", ["The choice involves trade-offs", "Nuclear power is unsafe", "Waste is not a problem", "Critics are wrong"], 0, "'The choice involves trade-offs.'"),
    di("In contrast to last year, sales have fallen considerably."),
  ],
  "c10-l1": [
    rd("Reading: Remote learning widened access to education, yet it also exposed a digital divide: students without reliable internet fell behind. Policymakers now argue that connectivity should be treated as a basic utility.", "What do policymakers argue?", ["Connectivity should be a basic utility", "Remote learning should end", "Schools should close", "Students need private tutors"], 0, "'Connectivity should be treated as a basic utility.'"),
    ty("Students without reliable internet fell ___ . (behind)", ["behind"], "Fall behind = not keep up."),
    tr("Paraphrase: 'Remote learning opened up education to more people.' Start: Remote learning widened ...", ["Remote learning widened access to education"], "Widen access."),
    fx("The digital divide have affected many students.", "have", "The divide (singular) has affected."),
    or("utility / basic / a / be / as / treated / should / connectivity", "Connectivity should be treated as a basic utility", "Passive with should."),
    ch("Which word best replaces 'exposed' in the reading?", ["revealed", "hid", "removed", "protected"], 0, "Expose = reveal something hidden."),
    ty("Despite its benefits, the scheme has ___ (criticise) heavily.", ["been criticised", "been criticized"], "Present perfect passive."),
    di("Access to reliable internet has become essential for education."),
  ],
  "c10-l2": [
    ls("Professor: The Industrial Revolution is often described as sudden, but historians now emphasise that it was gradual, with changes unfolding over more than a century.", "What do historians now emphasise?", ["It was gradual", "It was sudden", "It was short", "It was peaceful"], 0, "'It was gradual.'"),
    ls("Student: I'm struggling to balance my part-time job with my studies. Advisor: Many students are in the same position. Have you considered reducing your hours during exam periods?", "What does the advisor suggest?", ["Reduce hours during exams", "Quit studying", "Change the course", "Work more"], 0, "'Reducing your hours during exam periods.'"),
    di("Many students struggle to balance work and study."),
    ty("Advisor: Have you considered ___ your hours? (reduce)", ["reducing"], "Consider + -ing."),
    tr("Report: 'I'm struggling,' said the student. Start: The student said ...", ["The student said she was struggling", "The student said he was struggling", "The student said that she was struggling", "The student said that he was struggling"], "Backshift: am struggling → was struggling."),
    fx("Historians emphasises that the change was gradual.", "emphasises", "Plural subject: emphasise."),
    or("century / over / a / unfolded / change / more / than", "Change unfolded over more than a century", "Time expression with over."),
    ch("Which word is closest to 'gradual'?", ["slow and steady", "sudden", "violent", "brief"], 0, "Gradual = happening slowly, step by step."),
  ],
  "c10-l3": [
    ch("Which sentence is the best formal request?", ["I would appreciate it if you could extend the deadline.", "Give me more time.", "Can you make the deadline later?", "Deadline longer please."], 0, "Formal register uses I would appreciate it if you could."),
    ty("I am writing in ___ to your advertisement. (response)", ["response"], "In response to."),
    tr("Make it formal: 'Tell me when you can meet.' Start: Could you let me know ...", ["Could you let me know when you are available to meet", "Could you let me know when you can meet"], "Indirect and polite."),
    fx("I look forward to hear from you soon.", "hear", "Look forward to + -ing: hearing."),
    or("opinion / in / my / the / benefits / outweigh / the / drawbacks", "In my opinion the benefits outweigh the drawbacks", "Opinion statement for an essay."),
    rd("Task: Many people believe that children should learn a foreign language from the age of five. Others argue that this time should be spent on core subjects. Discuss both views and give your own opinion.", "Which essay type is this?", ["Discussion with opinion", "Narrative", "Report", "Letter"], 0, "Discuss both views and give your own opinion."),
    ty("To ___ up, the advantages outweigh the disadvantages. (sum)", ["sum"], "To sum up introduces the conclusion."),
    di("I would be grateful if you could confirm receipt of this email."),
  ],
};
