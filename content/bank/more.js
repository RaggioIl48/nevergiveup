// More B2 listening: 6 lectures, 6 conversations, 3 talks and 3 short extracts (synthetic voices).
// Authors write the right option FIRST; `task` rotates it. Gap-fill answers appear verbatim in the audio.
import { task, mc, fill } from "./helpers.js";

const A = (text) => ({ who: "A", text });
const B = (text) => ({ who: "B", text });
const talk = (turns) => turns.map(([who, text]) => ({ who, text }));
const chat = (lines) => lines.map((text, i) => ({ who: i % 2 === 0 ? "A" : "B", text }));

export const moreListening = [
  // ---------- Lectures ----------
  task("lec-b2-01", "lecture", "B2", "The Placebo Effect", talk([
    ["A", "Today I want to discuss one of the most surprising findings in medicine: the placebo effect. A placebo is a treatment with no active ingredient, such as a sugar pill, and yet patients often report real improvements after taking one."],
    ["A", "Researchers once believed this was simply imagination. However, brain scans suggest otherwise. When people expect pain relief, the brain actually releases natural painkillers called endorphins."],
    ["A", "Interestingly, the size of the effect depends on how the treatment is presented. Large pills work better than small ones, and an injection tends to work better than a tablet. Even the price matters: an expensive placebo is often judged more effective than a cheap one."],
    ["B", "So does that mean doctors should prescribe placebos?"],
    ["A", "That raises an ethical problem. Giving a patient a pill while hiding what it contains involves deception, and most medical associations oppose it. A more promising approach is to improve the way real treatments are explained, because the expectation itself is part of the cure."],
  ]), [
    mc("What is the lecturer's main point?", ["Patients' expectations can produce real physical changes", "Sugar pills are as effective as all medicines", "Brain scans cannot measure pain", "Doctors should always prescribe placebos"]),
    mc("According to the lecture, what happens in the brain when people expect relief?", ["Natural painkillers are released", "The pain signals are blocked at the spine", "Blood flow to the brain stops", "Memory becomes weaker"]),
    mc("Why does the lecturer mention the price of a placebo?", ["To show that presentation influences the effect", "To criticise expensive medicines", "To explain why injections are rare", "To argue that cheap pills are unsafe"]),
    mc("What is the objection to prescribing placebos?", ["It involves deceiving the patient", "It is too expensive", "It makes patients dependent", "It damages the brain"]),
    fill("Large pills tend to work better than ___ ones.", "small"),
  ]),

  task("lec-b2-02", "lecture", "B2", "The Rise of Urban Farming", talk([
    ["A", "As cities grow, a surprising idea is gaining ground: growing food inside them. Urban farming takes many forms, from rooftop gardens to vertical farms, which stack crops in layers under artificial light."],
    ["A", "The advantages are clear. Food travels only a few kilometres instead of hundreds, so transport emissions fall and vegetables reach shops fresher. Vertical farms also use up to ninety percent less water, because it is recycled."],
    ["A", "Nevertheless, there are real limits. The electricity needed for lighting is expensive, and unless it comes from renewable sources, the environmental benefit can disappear. For this reason, most vertical farms currently grow leafy greens and herbs, not wheat or rice."],
    ["B", "Could urban farms ever feed a whole city?"],
    ["A", "Probably not on their own. Most experts see them as a complement to traditional agriculture, particularly for fresh produce, rather than a replacement for it."],
  ]), [
    mc("What does the lecturer say about the future of urban farming?", ["It will complement, not replace, traditional farming", "It will replace traditional farming within decades", "It will disappear because of high costs", "It will only work in very small cities"]),
    mc("Why do vertical farms use less water?", ["The water is recycled", "The plants need no water", "They use rain only", "The crops are smaller"]),
    mc("What is the main obstacle mentioned?", ["The cost of electricity for lighting", "A lack of buildings", "Strict food laws", "Poor soil quality"]),
    fill("Most vertical farms currently grow leafy greens and ___.", "herbs"),
    fill("Food travels only a few ___ instead of hundreds.", "kilometres"),
  ]),

  task("lec-b2-03", "lecture", "B2", "Why We Forget", talk([
    ["A", "Everyone forgets things, but psychologists disagree about why. One early theory, decay, claimed that memories simply fade with time, like footprints in sand. The problem is that some old memories stay perfectly clear."],
    ["A", "A more convincing explanation is interference. New information competes with what we already know. If you learn a new phone number, it can make the old one harder to recall, and the reverse is also true."],
    ["A", "A third idea concerns retrieval. Sometimes the memory is still there, but we lack the right cue to reach it. This explains the familiar experience of a name being on the tip of your tongue, and then arriving hours later, when you are no longer trying."],
    ["B", "Is there any way to improve recall, then?"],
    ["A", "Yes. Studies show that testing yourself works far better than rereading, because it strengthens the retrieval routes. Spacing your study over several days also helps a great deal."],
  ]), [
    mc("What is the lecturer's view of the decay theory?", ["It cannot explain why some old memories stay clear", "It is the only correct explanation", "It applies only to phone numbers", "It was proved by brain scans"]),
    mc("What does 'interference' refer to?", ["New and old information competing", "Noise during study", "Illness affecting memory", "Lack of sleep"]),
    mc("According to the lecture, which study method is most effective?", ["Testing yourself", "Rereading notes", "Studying all night", "Listening to music"]),
    fill("Spacing your study over several ___ also helps.", "days"),
  ]),

  task("lec-b2-04", "lecture", "B2", "The Gig Economy", talk([
    ["A", "The gig economy describes a labour market in which people take short-term, flexible jobs instead of permanent contracts: driving for an app, delivering food, or working as a freelance designer."],
    ["A", "Supporters emphasise flexibility. Workers choose when and how long to work, which suits students and parents. Companies, for their part, can adjust their workforce quickly without the costs of full-time employment."],
    ["A", "Critics, however, point to insecurity. Gig workers typically receive no paid holiday, no sick pay and no pension contributions, and their income can change dramatically from one month to the next."],
    ["B", "Is the law changing in response to this?"],
    ["A", "In some countries, yes. Courts have begun to rule that certain platform workers are employees rather than independent contractors, which would entitle them to basic protection. The debate is far from settled."],
  ]), [
    mc("What is the lecturer's attitude to the gig economy?", ["Balanced: she presents advantages and drawbacks", "Strongly in favour", "Strongly against", "Uninterested"]),
    mc("According to critics, what is the main problem?", ["Workers lack security and benefits", "The jobs are too difficult", "Companies pay too much", "There are too few jobs"]),
    mc("What have some courts decided?", ["Some platform workers should be treated as employees", "Gig work should be banned", "Apps must close at night", "Freelancers must pay higher taxes"]),
    fill("Companies can adjust their workforce quickly without the costs of ___ employment.", "full-time"),
    fill("Gig workers typically receive no paid holiday, no sick pay and no ___ contributions.", "pension"),
  ]),

  task("lec-b2-05", "lecture", "B2", "Bees and Pollination", talk([
    ["A", "Roughly one third of the food we eat depends on pollination, and bees are the most important pollinators. As a bee moves between flowers collecting nectar, pollen sticks to its body and is carried to the next plant, allowing it to produce fruit."],
    ["A", "In recent years, beekeepers in many countries have reported serious losses. Scientists now believe there is no single cause. Pesticides, a parasite called the varroa mite, and the loss of wild flowers all play a part, and they weaken the bees together."],
    ["A", "The consequences could be costly. In some regions of China, orchard workers already pollinate apple trees by hand, a slow and expensive process."],
    ["B", "What can ordinary people do to help?"],
    ["A", "Quite a lot. Planting a variety of flowers that bloom at different times of year gives bees food through the season, and avoiding garden pesticides removes one major risk."],
  ]), [
    mc("Why are bees important?", ["They carry pollen between plants", "They produce most of our fruit", "They protect plants from insects", "They improve the soil"]),
    mc("What do scientists believe about the decline of bees?", ["Several factors act together", "One pesticide is responsible", "The cause is unknown and impossible to study", "Climate change is the only cause"]),
    mc("What example shows the possible consequences?", ["Hand pollination of apple trees in parts of China", "Empty supermarkets in Europe", "Rising honey prices in the US", "The closure of fruit farms in Spain"]),
    fill("A parasite called the varroa ___ also harms bees.", "mite"),
  ]),

  task("lec-b2-06", "lecture", "B2", "How Cities Handle Heat", talk([
    ["A", "Cities are often several degrees hotter than the countryside around them, a phenomenon called the urban heat island effect. Dark roads and roofs absorb sunlight and release it slowly at night, while concrete buildings trap the heat."],
    ["A", "The consequences go beyond discomfort. During heat waves, hospital admissions rise, particularly among older people, and demand for air conditioning pushes electricity networks to their limit."],
    ["A", "Planners are experimenting with several responses. Painting roofs white reflects sunlight; planting trees provides shade and cools the air through evaporation; and some cities are reopening buried rivers to bring cooler air into the centre."],
    ["B", "Which of these works best?"],
    ["A", "Trees are probably the most effective measure per euro spent, although they take years to grow. White roofs act immediately, but they do little for the temperature at street level."],
  ]), [
    mc("Why are cities hotter than the countryside?", ["Dark surfaces and concrete store heat", "They have more people breathing", "They have less wind", "Their buildings are taller"]),
    mc("What effect do heat waves have?", ["More people need hospital treatment", "Rivers disappear", "Schools close permanently", "Electricity becomes cheaper"]),
    mc("What is the lecturer's opinion of trees?", ["They are very effective, but slow to take effect", "They are useless in cities", "They are too expensive", "They only work in summer"]),
    fill("Planting trees cools the air through ___.", "evaporation"),
  ]),

  // ---------- Conversations ----------
  task("conv-b2-01", "conversation", "B2", "Changing a Dissertation Topic", chat([
    "Dr Evans, thanks for seeing me. I'm having second thoughts about my dissertation topic.",
    "I'm sorry to hear that. You've already done a literature review on renewable energy policy, haven't you?",
    "Yes, but the more I read, the more I realise it's too broad. I can't find a clear question to answer.",
    "That's quite common at this stage. Rather than abandoning the topic, why don't you narrow it down? You could look at one country, for instance.",
    "I hadn't thought of that. I was worried I'd lose all the work I've done.",
    "You wouldn't. Most of your reading would still be relevant, and a focused question will make the analysis far easier.",
    "In that case, I'm interested in how Germany's policy compares with Spain's. Would that be too ambitious?",
    "It might be, with only four months left. Start with Germany, and add Spain only if you have time. Send me a one-page outline by Friday.",
  ]), [
    mc("What is the student's problem?", ["Her topic is too broad", "She has no time to write", "She disagrees with the professor", "She cannot find any sources"]),
    mc("What does the professor suggest?", ["Narrowing the topic to one country", "Choosing a completely new topic", "Postponing the deadline", "Working with another student"]),
    mc("What does the student have to do by Friday?", ["Send a one-page outline", "Finish the literature review", "Submit the first chapter", "Choose a second country"]),
    fill("The student's original topic was renewable energy ___.", "policy"),
    fill("There are only four ___ left.", "months"),
  ]),

  task("conv-b2-02", "conversation", "B2", "A Noisy Flat", chat([
    "Hello, is that the housing office? I'd like to report a problem with the flat above mine.",
    "Of course. What seems to be the trouble?",
    "There's loud music almost every night, often until two in the morning. I've asked them politely to turn it down, but nothing has changed.",
    "I see. How long has this been going on?",
    "About three weeks. I have an exam next month, and I'm struggling to sleep, let alone study.",
    "That sounds very stressful. First, I'd recommend writing down the dates and times, because we'll need evidence. Then I can send the tenants an official warning.",
    "Would they know it was me who complained?",
    "Not necessarily. The letter will only say that complaints have been received. If the noise continues after that, we can arrange a meeting with both parties.",
  ]), [
    mc("Why is the student calling?", ["To complain about noise from a neighbour", "To ask for a new flat", "To report a broken heater", "To pay the rent"]),
    mc("What does the housing officer advise first?", ["Keeping a record of the incidents", "Moving to another building", "Calling the police", "Talking to the neighbour again"]),
    mc("What worries the student about the letter?", ["The neighbours might find out who complained", "It might arrive too late", "It could cost money", "It may be ignored"]),
    fill("The music often continues until two in the ___.", "morning"),
    fill("The problem has lasted about three ___.", "weeks"),
  ]),

  task("conv-b2-03", "conversation", "B2", "Choosing a Work Placement", chat([
    "Have you decided which placement to apply for? The deadline's next Wednesday.",
    "I'm torn between the marketing agency and the hospital's communications team.",
    "The agency pays a small salary, doesn't it?",
    "Yes, but the hospital offers a much better reference, and the hours are more regular.",
    "Money matters, but I'd think about what you want to do after graduating. Where do you see yourself?",
    "Honestly, I like the creative side of marketing, but I'm not sure the agency's culture would suit me. I've heard people work late every night.",
    "Then maybe the hospital is the safer option. You could still build a creative portfolio on the side.",
    "You're right. I'll apply to the hospital first and send the agency a speculative email, just in case.",
  ]), [
    mc("What is the woman's dilemma?", ["Two placements, each with different advantages", "She has no offers", "She cannot afford to work", "She dislikes both options"]),
    mc("Why is she worried about the agency?", ["The working hours may be too long", "The salary is too low", "It is too far away", "The job is not creative"]),
    mc("What does she decide to do?", ["Apply to the hospital and email the agency", "Reject both placements", "Apply only to the agency", "Ask for an extension"]),
    fill("The deadline is next ___.", "Wednesday"),
  ]),

  task("conv-b2-04", "conversation", "B2", "Returning a Faulty Laptop", chat([
    "Good afternoon. I bought this laptop here two weeks ago, and the battery is already failing.",
    "I'm sorry about that. Could I see the receipt, please?",
    "Here you are. It lasts barely an hour, even though the box says ten.",
    "I can see the purchase is within our fourteen-day return period, so I can offer you a full refund, or a replacement if you prefer.",
    "I'd rather have a replacement, but I'd like to check it before I leave this time.",
    "Of course. Let me bring one from the stockroom. If you plug it in, we can run a battery test together.",
    "That's very helpful. And would the warranty start again from today?",
    "No, I'm afraid it continues from the original purchase date, so you'd have twenty-two months of cover remaining.",
  ]), [
    mc("What is wrong with the laptop?", ["The battery does not last long enough", "The screen is cracked", "It will not turn on", "It is too heavy"]),
    mc("What does the customer prefer?", ["A replacement", "A full refund", "A repair", "A discount"]),
    mc("What does the assistant say about the warranty?", ["It continues from the original purchase date", "It starts again today", "It has expired", "It does not cover batteries"]),
    fill("The return period is ___ days.", "fourteen"),
    fill("The box says the battery should last ___ hours.", "ten"),
  ]),

  task("conv-b2-05", "conversation", "B2", "Planning a Group Presentation", chat([
    "Okay, we have three weeks to prepare. Shall we divide the topics first?",
    "Good idea. I'm happy to take the introduction, since I've already read most of the background material.",
    "Great. Then Marco could do the case studies, and I'll handle the conclusion and the recommendations.",
    "I'm not sure I can manage the case studies alone. There are four, and they're quite long.",
    "Fair point. What if we split them, two each, and meet on Thursday to check that the slides look consistent?",
    "That works. One more thing: should we rehearse? Last time, we ran over the time limit by five minutes.",
    "Definitely. Let's do a full run-through the day before, with someone timing us.",
    "Perfect. I'll create a shared folder tonight, so we can all upload our slides.",
  ]), [
    mc("What problem does Marco raise?", ["There are too many case studies for one person", "He dislikes the topic", "He cannot attend meetings", "He lost his notes"]),
    mc("How do they solve it?", ["They share the case studies between two people", "They remove two case studies", "They ask for more time", "They hire a helper"]),
    mc("What happened last time?", ["They went over the time limit", "They forgot their slides", "They arrived late", "One member was absent"]),
    fill("They will meet on ___ to check the slides.", "Thursday"),
    fill("The speaker will create a shared ___.", "folder"),
  ]),

  task("conv-b2-06", "conversation", "B2", "Applying for a Scholarship", chat([
    "Excuse me, I'm interested in the international scholarship advertised on your website. Who is eligible?",
    "Applicants must have a minimum average of eighty percent, and they must be enrolled full-time in their second or third year.",
    "I'm in my second year, and my average is eighty-three. What documents do I need?",
    "A personal statement of five hundred words, two references and a copy of your transcript.",
    "Does one of the references have to be from a teacher?",
    "Yes, at least one must be academic. The other can come from an employer or a community leader.",
    "And when will I know the result?",
    "Decisions are announced in early May. If you're shortlisted, you'll be invited to an interview by video call.",
  ]), [
    mc("Which requirement does the student already meet?", ["The minimum average", "Both references", "The personal statement", "The interview"]),
    mc("What is said about the references?", ["At least one must be academic", "Both must be from teachers", "They are optional", "They must be in English"]),
    mc("What happens if the student is shortlisted?", ["She will have a video interview", "She will receive the money", "She must resubmit documents", "She will meet the director in person"]),
    fill("The personal statement must be ___ words.", "five hundred"),
    fill("Decisions are announced in early ___.", "May"),
  ]),

  // ---------- Talks (monologues) ----------
  task("mono-b2-01", "monologue", "B2", "Welcome to the Language Centre", talk([
    ["A", "Welcome to the Language Centre, and congratulations on starting your course. Before you go to your classrooms, here are a few things you should know."],
    ["A", "First, attendance. We expect you to attend at least eighty percent of your lessons. If you are ill, please email your teacher before nine o'clock on the same day."],
    ["A", "Second, the self-access room on the second floor is open until eight in the evening. It has computers, graded readers and a conversation club on Wednesdays, which I strongly recommend."],
    ["A", "Finally, there will be a progress test in week six. It is not a pass or fail exam; it simply helps your teacher decide what to focus on. Now, please collect your timetable from the desk by the door."],
  ]), [
    mc("What should students do if they are ill?", ["Email the teacher before nine", "Phone the reception", "Bring a doctor's note", "Come to the centre anyway"]),
    mc("What is the purpose of the progress test?", ["To help the teacher plan the lessons", "To decide who passes the course", "To choose the class leaders", "To award prizes"]),
    mc("What does the speaker recommend?", ["The Wednesday conversation club", "Buying extra books", "Moving to a higher class", "Working in the library"]),
    fill("Students are expected to attend at least ___ percent of lessons.", "eighty"),
    fill("The self-access room is open until eight in the ___.", "evening"),
  ]),

  task("mono-b2-02", "monologue", "B2", "A Guide to the Botanical Garden", talk([
    ["A", "Good morning, and welcome to the botanical garden. I'll be taking you on a ninety-minute walk through our five main collections."],
    ["A", "We begin in the glasshouse, where the tropical plants need a constant temperature of twenty-eight degrees. Please keep the doors closed behind you, because even a short draught can damage the orchids."],
    ["A", "After that, we move to the medicinal garden, which has more than two hundred plants once used to treat illness. You'll notice that several of them are labelled as poisonous, so please do not pick or taste anything."],
    ["A", "Our tour ends at the lake, where you can feed the ducks, but only with the special food on sale at the kiosk. Bread, I'm afraid, is harmful to them."],
  ]), [
    mc("Why should visitors keep the glasshouse doors closed?", ["A draught could harm the orchids", "Insects might get in", "The heating is broken", "Visitors may get lost"]),
    mc("What is special about the medicinal garden?", ["Its plants were once used as medicine", "It has the rarest flowers", "It is open at night", "It contains only trees"]),
    mc("What are visitors told about the ducks?", ["They should only be fed the special food", "They must not be touched", "They are dangerous", "They can eat bread"]),
    fill("The tropical plants need a constant temperature of ___ degrees.", "twenty-eight"),
    fill("The walk lasts ___ minutes.", "ninety"),
  ]),

  task("mono-b2-03", "monologue", "B2", "A Radio Report on Cycling", talk([
    ["A", "Cycling to work has increased by a third in our city over the last five years, according to a new report published today. The council credits the new network of protected bike lanes, which opened in the spring of last year."],
    ["A", "The report also found that people who cycle regularly take fewer sick days. Employers, however, are being urged to provide secure parking and showers if they want the numbers to keep rising."],
    ["A", "Not everyone is happy, though. Some shopkeepers on the main street claim that the loss of parking spaces has hurt their sales, and they have asked the council to review the scheme within twelve months."],
    ["A", "The council says it will consider the request, but insists that the long-term benefits for health and air quality outweigh the short-term complaints."],
  ]), [
    mc("What has happened to cycling in the city?", ["It has increased by a third", "It has halved", "It has not changed", "It has doubled"]),
    mc("What do some shopkeepers say?", ["Fewer parking spaces have reduced their sales", "Bike lanes are unsafe", "Cyclists ignore the rules", "Customers prefer bicycles"]),
    mc("What is the council's response?", ["It will consider a review but defends the scheme", "It will remove the bike lanes", "It will pay the shopkeepers", "It rejects every complaint"]),
    fill("Employers are urged to provide secure parking and ___.", "showers"),
  ]),

  // ---------- Short extracts (fewer than 90 words) ----------
  task("ext-b2-01", "extract", "B2", "A voicemail", [
    A("Hi, Ana, it's Tom. I'm calling about tomorrow's meeting. The client has asked us to move it from ten to eleven thirty because her train is delayed. I've already booked the small conference room, so we won't need to change rooms. Could you bring the printed report, please? I'll prepare the slides tonight. Call me if there's a problem. Thanks."),
  ], [
    mc("Why has the meeting been moved?", ["The client's train is delayed", "The room is unavailable", "Tom is ill", "The report is not ready"]),
    mc("What does Tom ask Ana to bring?", ["The printed report", "The slides", "The client's number", "A projector"]),
    fill("The meeting is now at eleven ___.", "thirty"),
  ]),

  task("ext-b2-02", "extract", "B2", "At the travel agency", [
    A("I'd like to book a week in Portugal in August, but I'm worried about the prices."),
    B("August is peak season, so flights cost nearly double. If you can travel in the first week of September, the same package is about a third cheaper, and the weather is just as good."),
    A("That's tempting. I'd have to ask my manager, though."),
    B("No problem. I'll hold the offer until tomorrow evening."),
  ], [
    mc("What does the agent recommend?", ["Travelling in early September", "Choosing a different country", "Booking in August", "Going for a longer stay"]),
    mc("Why does the woman hesitate?", ["She must ask her manager", "She dislikes Portugal", "The offer is too short", "She has no passport"]),
    fill("The offer will be held until tomorrow ___.", "evening"),
  ]),

  task("ext-b2-03", "extract", "B2", "A lecturer's announcement", [
    A("Before we finish, a quick reminder. The deadline for your research proposals has been extended from the fifteenth to the twenty-second, but this is the only extension I will give. Please submit them online, not by email, and remember that proposals over two thousand words will lose marks. If you need help with referencing, there is a workshop on Thursday afternoon."),
  ], [
    mc("What has changed?", ["The deadline has been extended", "The word limit has been removed", "Proposals must be handwritten", "The workshop was cancelled"]),
    mc("What happens to proposals that are too long?", ["They lose marks", "They are rejected", "They are returned", "They get extra feedback"]),
    fill("The workshop is on Thursday ___.", "afternoon"),
  ]),
];
