// Real human voices: LibriSpeech (LibriVox volunteer readers), CC BY 4.0.
// Transcripts are the corpus's own, lightly capitalised and punctuated.
const q = (question, options, a) => ({ q: question, options, a });

// Authored with the right answer first; rotate deterministically so the key varies.
const spread = (questions, seed) => questions.map((item, i) => {
  const n = item.options.length;
  const k = (seed + i * 2 + 1) % n;
  const options = item.options.map((_, j) => item.options[(j - k + n) % n]);
  return { ...item, options, a: (item.a + k) % n };
});

const clip = (id, level, title, text, questions) => ({
  id: `r-${id}`, level, title, audio: `/audio/${id}.flac`, text, real: true,
  questions: spread(questions, id.length),
});

export const realListening = [
  clip("6313-66125-0010", "A2", "Who looks after this end?",
    "You'd have both of us at the bottom if I left it to you to take care of this end.", [
      q("What would happen if the speaker left the task to the listener?", ["Both would end up at the bottom", "Both would be rescued", "Nothing would change", "Both would win"], 0),
      q("Who does the speaker trust with this end?", ["The listener", "Nobody but themselves", "A stranger", "A group"], 1),
    ]),
  clip("652-129742-0001", "A2", "Birds' nest salad",
    "Birds' nest salad. Have ready as many crisp leaves of lettuce as may be required to make a dainty little nest for each person.", [
      q("What do you need first?", ["Crisp lettuce leaves", "Eggs", "Bread", "Tomatoes"], 0),
      q("How many nests do you make?", ["One per person", "One in total", "Two per person", "Ten"], 0),
    ]),
  clip("6241-61943-0000", "B1", "Leaving by ship",
    "On the second of the month, at two in the morning, our precious cargo of luggage was taken on board the good ship Valkyrie.", [
      q("What was taken on board?", ["The luggage", "The passengers", "Food only", "Animals"], 0),
      q("At what time did this happen?", ["Two in the morning", "Two in the afternoon", "Noon", "Midnight"], 0),
      q("What was the ship called?", ["Valkyrie", "Victory", "Voyager", "Valiant"], 0),
    ]),
  clip("2277-149874-0001", "B1", "The little bells",
    "To Carrie, the sound of the little bells upon the horse cars, as they tinkled in and out of hearing, was as pleasing as it was novel.", [
      q("What did Carrie think of the sound of the bells?", ["It was pleasing and new", "It was annoying", "It was familiar and boring", "It was frightening"], 0),
      q("Where were the bells?", ["On horse cars", "In a church", "On a ship", "In a shop"], 0),
    ]),
  clip("2035-147960-0000", "B1", "A protecting manner",
    "She was four years older than I, to be sure, and had seen more of the world, but I was a boy and she was a girl, and I resented her protecting manner.", [
      q("Why did the speaker resent her?", ["She acted as if she had to protect him", "She was rude", "She ignored him", "She was younger"], 0),
      q("How much older was she?", ["Four years", "Two years", "Ten years", "She was younger"], 0),
      q("What had she seen more of?", ["The world", "Books", "Films", "Sports"], 0),
    ]),
  clip("7850-111771-0000", "B1", "A place at West Point",
    "Through the influence of the Honourable Thomas L. Hamer, he was admitted at West Point in eighteen thirty-nine.", [
      q("How did he get admitted?", ["Through someone's influence", "By an exam", "By paying", "By luck"], 0),
      q("When was he admitted?", ["1839", "1893", "1938", "1739"], 0),
    ]),
  clip("7976-105575-0000", "B1", "A battle nobody knew about",
    "Grant was only a few miles away, but although commander in chief, he knew nothing of the hardest fought battle of the Civil War until it was over.", [
      q("How far away was Grant?", ["A few miles", "Hundreds of miles", "He was there", "Abroad"], 0),
      q("What did Grant know about the battle?", ["Nothing until it ended", "Everything", "Only the plan", "Only the result in advance"], 0),
    ]),
  clip("1988-147956-0000", "B1", "Packing the wagon",
    "Fuchs brought up a sack of potatoes and a piece of cured pork from the cellar, and Grandmother packed some loaves of Saturday's bread, a jar of butter, and several pumpkin pies in the straw of the wagon box.", [
      q("Where did Fuchs get the potatoes and pork?", ["The cellar", "The market", "The barn", "The river"], 0),
      q("Which item is NOT mentioned?", ["Cheese", "Butter", "Pumpkin pies", "Bread"], 0),
      q("Where did Grandmother pack the food?", ["In straw in the wagon box", "In a suitcase", "In the kitchen", "In a basket on her arm"], 0),
    ]),
  clip("3170-137482-0005", "B2", "Practical jokes",
    "We would very often spend the whole night rambling about the city, inventing and carrying into execution the most impertinent practical jokes.", [
      q("What did they do at night?", ["Wander the city and play jokes", "Study", "Work", "Sleep outside"], 0),
      q("What does \"impertinent\" suggest about the jokes?", ["They were cheeky", "They were polite", "They were boring", "They were dangerous"], 0),
    ]),
  clip("2412-153947-0002", "B2", "Avoiding the proofs",
    "On my return, I purposely avoided looking into it until I had sent back my last revises to the printer.", [
      q("When did the speaker avoid looking into it?", ["Until the revises were sent back", "Never", "Before leaving", "While travelling"], 0),
      q("Was the avoidance accidental?", ["No, it was on purpose", "Yes, by accident", "Yes, they forgot", "Not mentioned"], 0),
    ]),
  clip("3000-15664-0002", "B2", "Being kind",
    "Perhaps the profession of doing good may be full, but everybody should be kind at least to himself.", [
      q("What is the speaker's main point?", ["Everyone should at least be kind to themselves", "Doing good is easy", "Nobody can do good", "Kindness is a profession"], 0),
      q("What does \"may be full\" suggest?", ["There may be too many people already doing good", "A job is available", "The speaker is tired", "It is empty"], 0),
    ]),
  clip("251-118436-0002", "B2", "Closely guarded",
    "Since his birth he has been guarded so closely that the cleverest poisoners of the East could not reach him.", [
      q("How was he protected?", ["Very closely, since birth", "He wasn't", "Only recently", "By his family only"], 0),
      q("What danger is mentioned?", ["Poisoners", "Soldiers", "Illness", "Storms"], 0),
    ]),
  clip("3081-166546-0000", "B2", "At the breakfast table",
    "When we took our seats at the breakfast table, it was with the feeling of being no longer looked upon as connected in any way with this case.", [
      q("How did they feel at breakfast?", ["No longer connected with the case", "Under suspicion", "Hungry", "Angry"], 0),
      q("Where does the scene take place?", ["At the breakfast table", "In a court", "On a train", "In a garden"], 0),
    ]),
  clip("6295-244435-0004", "B2", "A spring day in the South",
    "The smoke itself, which had formed a vast cloud over harbour, forts and city, was now drifting out to sea, leaving all things etched sharply in the dazzling sunlight of a southern spring day.", [
      q("Where was the smoke going?", ["Out to sea", "Inland", "Up into space", "It was gone"], 0),
      q("What was the weather like afterwards?", ["Bright and sunny", "Rainy", "Foggy", "Snowy"], 0),
      q("What does \"etched sharply\" mean here?", ["Clearly outlined", "Hidden", "Painted", "Burnt"], 0),
    ]),
];

export const audioCredits = "Voices: LibriSpeech corpus (LibriVox volunteer readers), licensed CC BY 4.0 — openslr.org/12.";
