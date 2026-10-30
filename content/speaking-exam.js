// Exam-format speaking prompts (IELTS Parts 1-3, TOEFL independent, integrated and interview).
// From B1 the Speaking lab defaults to these, so practice matches what the real tests ask.
const I1 = (id, q) => ({ id, level: "B1", exam: "IELTS", type: "IELTS Part 1", prep: 5, time: 30, q, tip: "Answer directly, then add a reason and a short example." });
const I2 = (id, level, topic, bullets, last) => ({
  id, level, exam: "IELTS", type: "IELTS Part 2", prep: 60, time: 120,
  q: `Describe ${topic}.\nYou should say:\n${bullets.map((b) => `• ${b}`).join("\n")}\nand explain ${last}.`,
  tip: "Use the minute to note one word per bullet. Speak for the full two minutes: past tenses for the story, then your feelings.",
});
const I3 = (id, q) => ({ id, level: "B2", exam: "IELTS", type: "IELTS Part 3", prep: 15, time: 60, q, tip: "Give an opinion, a reason, an example, then consider the other side." });
const TI = (id, level, q) => ({ id, level, exam: "TOEFL", type: "TOEFL Independent", prep: 15, time: 45, q, tip: "Clear position in the first sentence, two reasons with details, a one-line conclusion." });
const TG = (id, q) => ({ id, level: "B2", exam: "TOEFL", type: "TOEFL Integrated", prep: 30, time: 60, q, tip: "Summarise the reading in one sentence, then explain how the speaker supports or challenges it. Report, don't give your opinion." });
const TV = (id, level, q) => ({ id, level, exam: "TOEFL", type: "TOEFL Interview", prep: 5, time: 45, q, tip: "Answer like a conversation: direct answer, reason, personal example." });

export const SPEAKING_EXAM = [
  I1("e1", "Do you work or study? What do you like most about it?"),
  I1("e2", "Let's talk about your hometown. What is it known for?"),
  I1("e3", "How do you usually spend your weekends?"),
  I1("e4", "Do you prefer reading books or watching films? Why?"),
  I1("e5", "How often do you use public transport?"),
  I1("e6", "Is there a type of music you enjoy? When do you listen to it?"),
  I1("e7", "Do you like cooking? What do you usually make?"),
  I1("e8", "What kind of weather do you like best?"),
  I1("e9", "Do you think it's important to have a daily routine?"),
  I1("e10", "How do you usually keep in touch with friends?"),
  I1("e11", "Did you enjoy your time at school? Why or why not?"),
  I1("e12", "Do you prefer shopping online or in shops?"),

  I2("e13", "B1", "a memorable journey you have taken", ["where you went", "who you went with", "what you did there"], "why it was memorable"),
  I2("e14", "B1", "a person who has helped you", ["who the person is", "how you know them", "how they helped you"], "how you felt about their help"),
  I2("e15", "B1", "a skill you would like to learn", ["what the skill is", "why you want to learn it", "how you would learn it"], "how it would change your life"),
  I2("e16", "B1", "a place in your city where you like to relax", ["where it is", "how often you go there", "what you do there"], "why it helps you relax"),
  I2("e17", "B2", "a time when you had to make a difficult decision", ["what the decision was", "when it happened", "what options you had"], "how you feel about the decision now"),
  I2("e18", "B2", "a piece of technology you could not live without", ["what it is", "when you started using it", "what you use it for"], "why it is so important to you"),
  I2("e19", "B2", "a book or film that changed the way you think", ["what it was", "when you read or saw it", "what it was about"], "how it changed your thinking"),
  I2("e20", "B1", "a celebration you enjoyed", ["what was celebrated", "where it took place", "who was there"], "why you enjoyed it"),
  I2("e21", "B2", "a goal you achieved", ["what the goal was", "how long it took", "what difficulties you faced"], "how you felt when you achieved it"),
  I2("e22", "B2", "an occasion when you received good news", ["what the news was", "how you received it", "who you told first"], "why it was important to you"),
  I2("e23", "B1", "a gift you gave to someone", ["what the gift was", "who you gave it to", "why you chose it"], "how the person reacted"),
  I2("e24", "B2", "a time when you changed your mind about something", ["what you thought before", "what made you change", "what you think now"], "what you learned from the experience"),

  I3("e25", "Why do you think some people prefer to travel alone?"),
  I3("e26", "How has technology changed the way families communicate?"),
  I3("e27", "Should governments invest more in public transport or in roads? Why?"),
  I3("e28", "Do you think people will still read printed books in twenty years?"),
  I3("e29", "What are the advantages and disadvantages of working from home?"),
  I3("e30", "Why do some people find it hard to make important decisions?"),
  I3("e31", "Is it better for children to learn through play or through formal lessons?"),
  I3("e32", "How can cities be made more pleasant places to live?"),
  I3("e33", "Do celebrities have too much influence on young people?"),
  I3("e34", "What skills will be most important for workers in the future?"),

  TI("e35", "B1", "Some people prefer to study early in the morning; others prefer to study late at night. Which do you prefer and why?"),
  TI("e36", "B1", "Do you agree or disagree: it is better to have a few close friends than many acquaintances?"),
  TI("e37", "B2", "Some universities require all students to take a public speaking course. Do you think this is a good idea?"),
  TI("e38", "B1", "Would you rather take a job with a high salary that you do not enjoy, or a job you love that pays less?"),
  TI("e39", "B2", "Do you agree or disagree: students should be allowed to use their phones in class?"),
  TI("e40", "B2", "Some people think it is better to plan a holiday in detail, while others prefer to decide each day. Which do you prefer?"),
  TI("e41", "B1", "Is it better to live in a dormitory or in an apartment off campus? Explain your choice."),
  TI("e42", "B2", "Do you agree or disagree: success is more about hard work than talent?"),

  TG("e43", "Reading: The university will require all first-year students to live on campus to help them adjust. Listening: A student disagrees, saying campus housing is more expensive and that many students already live with family nearby. Explain the student's opinion and reasons."),
  TG("e44", "Reading: 'Social facilitation' is the tendency to perform simple tasks better when other people are watching. Listening: The professor describes cyclists who rode faster in races than when training alone. Explain how the example illustrates the concept."),
  TG("e45", "Reading: The library plans to remove half of its printed journals to create more study space. Listening: A student supports the plan because most journals are online and students need quiet places to work. Explain the student's view."),
  TG("e46", "Lecture: A professor explains two ways plants defend themselves against animals: physical defences such as thorns, and chemical defences such as bitter-tasting leaves. Using the examples from the lecture, describe both."),
  TG("e47", "Conversation: A student cannot finish a group project because one member has left the course. The adviser suggests either asking for an extension or reducing the scope. Describe the problem and the two solutions, then say which you prefer and why."),
  TG("e48", "Reading: 'Anchoring' is the tendency to rely too much on the first piece of information we receive. Listening: The professor describes shoppers who paid more after seeing a high 'original price'. Explain how the example illustrates anchoring."),

  TV("e49", "B1", "Interviewer: Tell me about a class or course that you found especially useful."),
  TV("e50", "B1", "Interviewer: What do you usually do when you have a problem you can't solve on your own?"),
  TV("e51", "B2", "Interviewer: Some people say online learning will replace classrooms. What's your view?"),
  TV("e52", "B1", "Interviewer: Describe a typical day in your life right now."),
  TV("e53", "B2", "Interviewer: If your city could improve one public service, what should it be and why?"),
  TV("e54", "B2", "Interviewer: How do you think learning English will help you in the future?"),
];
