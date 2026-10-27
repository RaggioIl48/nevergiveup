import { task, mc, fill } from "./helpers.js";

const lec = (id, level, title, turns, questions) =>
  task(id, "lecture", level, title, turns.map(([who, text]) => ({ who, text })), questions);

export const lectures = [
  lec("lec-01", "B1", "Why Leaves Change Colour", [
    ["A", "Good morning, everyone. Today I want to talk about something you have all seen: leaves changing colour in autumn. Many people think the leaf is painting itself with new colours, but the truth is a little different."],
    ["A", "During spring and summer, leaves are green because they contain chlorophyll. Chlorophyll is the chemical that captures sunlight and helps the plant make food. It is so abundant that it hides every other colour."],
    ["A", "There are two main things that happen in autumn. First, the days become shorter and the temperature drops. Second, the tree stops making new chlorophyll, so the green slowly disappears."],
    ["A", "Now, here is the interesting part. Yellow and orange pigments were inside the leaf all along. We simply could not see them until the green faded away."],
    ["B", "So what about the red leaves? Are they also hidden inside?"],
    ["A", "Good question. Red is different. Red pigments are made fresh in autumn, when sugar is trapped in the leaf. That is why a sunny autumn with cool nights often gives the brightest reds."],
    ["A", "To sum up, a leaf does not gain yellow; it loses green. Red is the only colour that the tree actually produces in the fall."],
  ], [
    mc("What is the main idea of the lecture?", ["Autumn colours appear mostly because green pigment disappears", "Trees paint their leaves to attract animals", "Cold weather destroys all pigments in a leaf", "Red leaves are healthier than yellow leaves"]),
    mc("According to the lecturer, which colour is produced fresh in autumn?", ["Red", "Yellow", "Orange", "Brown"]),
    mc("Why does the student ask a question?", ["To find out about the red leaves, which the lecturer had not explained", "To disagree with the lecturer's main point", "To ask about the cause of shorter days", "To correct a mistake about chlorophyll"]),
    fill("Chlorophyll is the chemical that captures ___.", "sunlight"),
    fill("Red pigments are made when ___ is trapped in the leaf.", "sugar"),
  ]),

  lec("lec-02", "B1", "Looking Up at the Night Sky", [
    ["A", "Welcome back. Today we will look at a simple question: why do stars twinkle, while planets usually shine with a steady light? The answer has to do with distance and with our own atmosphere."],
    ["A", "First, let us remember that stars are enormous, burning balls of gas. They are very, very far away, so even in a large telescope they look like single points of light. Planets, on the other hand, are much closer to us."],
    ["A", "Because of this, a planet appears as a tiny disc, not a point. Now, the air above us is always moving. Warm and cold layers bend the light as it passes through."],
    ["A", "For a star, which is a single point, this bending makes the light jump around, and we see twinkling. For a planet, the many parts of the disc balance each other out, so the light looks steadier."],
    ["A", "Let me give you a practical tip. If you see a bright object that does not twinkle, it is probably a planet, such as Venus or Jupiter. It is not a perfect rule, but it works quite often."],
    ["B", "Does twinkling happen in space too?"],
    ["A", "No. Astronauts outside the atmosphere see steady stars, because there is no moving air to bend the light. So the twinkling is really about our atmosphere, not about the stars themselves."],
  ], [
    mc("What is the lecture mainly about?", ["Why stars twinkle but planets usually do not", "How telescopes make stars look larger", "How astronauts measure distance to planets", "Why Venus is brighter than Jupiter"]),
    mc("Why do planets look steadier than stars?", ["They appear as small discs, so the bending effects average out", "They produce a stronger light of their own", "They are further from the atmosphere", "They move more slowly across the sky"]),
    mc("Why does the lecturer mention astronauts?", ["To show that the atmosphere causes twinkling", "To explain how stars are made", "To suggest that space is very cold", "To compare different telescopes"]),
    fill("A bright object that does not twinkle is probably a ___.", "planet"),
    fill("Warm and cold layers of air ___ the light as it passes through.", "bend"),
  ]),

  lec("lec-03", "B1", "The Habit Loop", [
    ["A", "Today's topic is habits. A habit is a behaviour that we repeat so often that we do it almost without thinking. Brushing your teeth is a good example."],
    ["A", "Psychologists often describe habits as a loop with three parts. First there is a cue, which is a signal that starts the behaviour. Then comes the routine, which is the action itself. Finally there is a reward, which is the good feeling that makes the brain want to repeat the loop."],
    ["A", "Let me give an example. Imagine you feel tired in the afternoon. That feeling is the cue. You walk to the kitchen and drink a coffee, which is the routine, and you feel more awake, which is the reward."],
    ["A", "Now, many people believe that changing a habit means removing it completely. In fact, it is usually easier to keep the cue and the reward, and change only the routine."],
    ["A", "So in our example, you might still go to the kitchen when you feel tired, but drink a glass of water or eat some fruit instead."],
    ["B", "Does it take a long time to change a habit?"],
    ["A", "It depends on the person and on the habit. There is a popular idea that it takes exactly twenty-one days, but that number is not a rule. Small, repeated steps matter more than a magic number."],
  ], [
    mc("What is the main point of the lecture?", ["Habits can be understood and changed by working with a simple loop", "Habits are impossible to change after childhood", "Rewards are less important than cues", "Brushing teeth is the hardest habit to learn"]),
    mc("According to the lecturer, what is usually the easiest way to change a habit?", ["Keep the cue and reward but change the routine", "Remove the cue and the reward", "Change the reward only", "Wait for twenty-one days"]),
    mc("What does the lecturer say about the number twenty-one?", ["It is a popular idea, but not a fixed rule", "It is the exact time needed to build a habit", "It is the average age when habits form", "It is the number of cues in a loop"]),
    fill("A cue is a ___ that starts the behaviour.", "signal"),
    fill("In the example, drinking a coffee is the ___.", "routine"),
  ]),

  lec("lec-04", "B1", "Markets in the Ancient World", [
    ["A", "In today's session, we will travel back about two thousand years to look at trade in the Roman Empire. Many students imagine ancient life as simple and local. Actually, trade was surprisingly wide."],
    ["A", "The Romans built a huge network of roads, and they also used the Mediterranean Sea as a kind of highway. Ships carried grain, olive oil and wine between distant regions. Because the sea was calm in summer, most long voyages took place in those months."],
    ["A", "There are two main reasons why this trade worked so well. First, the empire used one main currency, so merchants did not have to exchange money at every border. Second, Roman law protected contracts, which made business partners trust each other."],
    ["A", "To give you an example, olive oil from southern Spain was sold in cities far away, and archaeologists have found the broken clay jars it travelled in in many places."],
    ["B", "Was trade only for the rich?"],
    ["A", "Not entirely. Rich families controlled the biggest businesses, but ordinary people bought and sold goods in local markets every day."],
    ["A", "However, we should not exaggerate. Travel was slow, and cargo could be lost to storms. So this was a large economy, but not a modern one."],
  ], [
    mc("What is the lecture mainly about?", ["Why trade in the Roman Empire was widespread", "How Roman roads were built", "Why ships were dangerous in summer", "How the Romans invented money"]),
    mc("Which factor does the lecturer give as a reason for successful trade?", ["A common currency across the empire", "Cheap labour from every province", "Low taxes on grain", "The absence of storms"]),
    mc("Why does the lecturer mention olive oil from southern Spain?", ["As an example of goods travelling long distances", "To explain how clay jars were made", "To show that only the rich traded", "To compare Roman and modern prices"]),
    fill("Most long voyages took place in ___.", "summer", ["those months"]),
    fill("Roman law protected ___, which helped business partners trust each other.", "contracts"),
  ]),

  lec("lec-05", "B1", "Why Do We Speak Different Languages?", [
    ["A", "Let's start with a big question: why are there so many languages in the world? There are around seven thousand of them today, and the reason lies in how languages change over time."],
    ["A", "Imagine a single community that speaks one language. Over many generations, the people move to different valleys, islands or cities. They stop meeting often, and their speech slowly changes in each place."],
    ["A", "These changes are small at first. A new word appears, a sound changes, a grammar rule becomes simpler. After several centuries, the two groups may no longer understand each other."],
    ["A", "A familiar example is Latin. As the Roman Empire broke up, Latin developed differently in different regions. Eventually it became Spanish, French, Italian and Portuguese, which we call the Romance languages."],
    ["B", "So Spanish is not a mistake of Latin?"],
    ["A", "Not at all. That is a common misunderstanding. A language that changes is not getting worse; it is simply adapting to the needs of its speakers."],
    ["A", "Today, however, communication technology has the opposite effect in some cases. Large languages are spreading, and many small languages are in danger of disappearing."],
  ], [
    mc("What is the main idea of the lecture?", ["Languages multiply because separated groups change their speech over time", "Latin was the first language in the world", "Technology prevents languages from changing", "Grammar is always getting simpler"]),
    mc("What does the lecturer say about the student's idea that Spanish is a mistake of Latin?", ["It is a misunderstanding, because change is not the same as decline", "It is correct for most Romance languages", "It is true only for Portuguese", "It was proven by archaeologists"]),
    mc("What is the effect of modern communication technology, according to the lecturer?", ["It may help large languages spread while small ones disappear", "It makes all languages more similar in grammar", "It has no effect on languages", "It makes Latin popular again"]),
    fill("There are around ___ languages today.", "seven thousand"),
    fill("Spanish, French, Italian and Portuguese are called the ___ languages.", "romance"),
  ]),

  lec("lec-06", "B1", "Plastic in the Oceans", [
    ["A", "Today we turn to a problem that affects the whole planet: plastic pollution in the oceans. Every year, millions of tonnes of plastic end up in the sea, and most of it comes from the land."],
    ["A", "Plastic is so popular because it is cheap, light and strong. Unfortunately, those same qualities are the problem. Plastic does not rot like food or paper. Instead, it breaks into smaller and smaller pieces."],
    ["A", "These tiny pieces are called microplastics, and they are smaller than five millimetres. Fish and other sea animals can swallow them, because they look like food."],
    ["A", "Now, a lot of people imagine a giant floating island of rubbish. In reality, much of the plastic is spread through the water as small fragments, so it is hard to see and hard to clean."],
    ["B", "So what can we do?"],
    ["A", "There are two kinds of solutions. First, we can prevent plastic from entering the sea, for example by improving waste collection and recycling. Second, we can reduce how much single-use plastic we produce in the first place."],
    ["A", "Cleaning the ocean is important, but stopping the flow is more effective, much like turning off a tap before mopping the floor."],
  ], [
    mc("What is the lecturer's main message?", ["Preventing plastic from reaching the sea is more effective than cleaning it up", "Plastic is no longer produced in many countries", "Microplastics are easy to remove from water", "Recycling is the only possible solution"]),
    mc("Why can plastic remain in the environment for a long time?", ["It does not rot, but breaks into smaller pieces", "It is heavier than water", "It is protected by sea animals", "It is made from natural materials"]),
    mc("What is the purpose of the tap and floor comparison at the end?", ["To show that stopping the source matters more than cleaning", "To explain how microplastics are measured", "To suggest that plastic is a liquid", "To show that water is expensive"]),
    fill("Microplastics are smaller than five ___.", "millimetres"),
    fill("Most of the plastic in the sea comes from the ___.", "land"),
  ]),

  lec("lec-07", "B1", "How Impressionists Changed Painting", [
    ["A", "In this short talk, I would like to introduce Impressionism, a style of painting that began in France in the nineteen-seventies. Before this movement, many famous paintings showed history, religion or portraits in a very polished style."],
    ["A", "The Impressionists wanted something different. They wanted to capture a moment, with its light and atmosphere, rather than every small detail. Their brushstrokes are quick and often visible."],
    ["A", "One reason this became possible was a new invention: paint in metal tubes. Before that, artists mostly worked inside their studios. With tubes, they could carry their paints outdoors and paint the landscape directly."],
    ["A", "The name itself is interesting. It came from a critic who made fun of a painting by Claude Monet called Impression, Sunrise. The artists accepted the name, and it became famous."],
    ["B", "Did people like these paintings at first?"],
    ["A", "Not really. Many viewers thought the paintings looked unfinished. Over time, however, tastes changed, and today Impressionist works are among the most loved in the world."],
    ["A", "So the main lesson is that a style that seems strange to one generation can become a classic for the next."],
  ], [
    mc("What was the Impressionists' main goal?", ["To capture a moment with its light and atmosphere", "To paint historical scenes with great detail", "To copy portraits from earlier artists", "To make paintings that looked unfinished on purpose"]),
    mc("Why were paint tubes important?", ["They allowed artists to paint outdoors", "They made paint cheaper for everyone", "They changed the colours of paint", "They helped critics to judge paintings"]),
    mc("How did people first react to Impressionist paintings?", ["Many thought they looked unfinished", "They immediately loved them", "They ignored them completely", "They compared them to religious art"]),
    fill("The name of the style came from a ___ who made fun of a painting.", "critic"),
    fill("The Impressionists' brushstrokes are quick and often ___.", "visible"),
  ]),

  lec("lec-08", "B1", "Keeping a Healthy Gut", [
    ["A", "Good afternoon. Today's subject is nutrition, and in particular the bacteria that live in our digestive system. You may be surprised to learn that we all carry trillions of them."],
    ["A", "These bacteria are known together as the gut microbiome. Many of them are helpful. They break down food that our own bodies cannot digest, and they help protect us from harmful germs."],
    ["A", "So how can we keep this community healthy? There are two simple suggestions. First, eat a variety of plant foods, such as vegetables, beans and whole grains, because the bacteria feed on fibre. Second, include fermented foods, like yoghurt, in your diet."],
    ["A", "Now, you may have heard that all bacteria are bad. That is a myth. Only a small number cause illness, and many are essential for good health."],
    ["B", "Should I take special supplements?"],
    ["A", "Most healthy people do not need them. A varied diet is usually the better option, and it is also cheaper. If you have a medical condition, of course, you should talk to a doctor."],
    ["A", "In short, looking after your gut is mostly about eating a wide range of natural foods."],
  ], [
    mc("What is the lecture mainly about?", ["How to support the helpful bacteria in the digestive system", "How to avoid all bacteria", "Why supplements are better than food", "How the stomach breaks down fibre"]),
    mc("Why does the lecturer recommend plant foods?", ["The gut bacteria feed on fibre", "They contain no sugar", "They kill harmful germs directly", "They are easier to digest than yoghurt"]),
    mc("What does the lecturer think about supplements for healthy people?", ["Most do not need them", "Everyone must take them daily", "They are more effective than yoghurt", "They are dangerous for the microbiome"]),
    fill("Many gut bacteria break down food that our bodies cannot ___.", "digest"),
    fill("The belief that all bacteria are bad is a ___.", "myth"),
  ]),

  lec("lec-09", "B2", "Why Do Cities Get Hotter?", [
    ["A", "Today I would like to discuss an effect that urban planners take very seriously: the urban heat island. This term describes the fact that a city is often several degrees warmer than the countryside around it, especially at night."],
    ["A", "There are three main causes. First, materials such as asphalt and concrete absorb heat during the day and release it slowly after sunset. Second, cities have fewer trees and less open soil, so there is less evaporation, which normally cools the air. Third, buildings, cars and air conditioners produce waste heat."],
    ["A", "Now, contrary to what you might expect, the problem is not only about comfort. Higher temperatures increase electricity demand and can make heat waves more dangerous, particularly for elderly residents."],
    ["A", "Planners have a range of responses. Planting trees and creating parks provides shade and cooling. Light-coloured roofs reflect more sunlight, and green roofs covered in vegetation can also lower temperatures."],
    ["B", "Isn't it expensive to change an entire city?"],
    ["A", "It can be, but many measures are done gradually. When a road or a roof needs repairing anyway, the city can choose a cooler material at little extra cost."],
    ["A", "So the central idea is this: the shape and surface of a city affect its climate, and planners can adjust both."],
  ], [
    mc("What is the lecture mainly about?", ["Why cities are warmer than their surroundings and how to reduce it", "How to design air conditioners for large buildings", "Why countryside temperatures are rising", "How electricity demand is calculated"]),
    mc("Which of the following is NOT given as a cause of the urban heat island?", ["Heavy rainfall in cities", "Dark materials that store heat", "Fewer trees and less evaporation", "Waste heat from machines"]),
    mc("How does the lecturer answer the student's concern about cost?", ["By saying measures can be introduced during routine repairs", "By saying the cost is not important", "By claiming that trees are free", "By suggesting that cities should be rebuilt"]),
    fill("Cities are warmer than the countryside, especially at ___.", "night"),
    fill("Higher temperatures increase electricity ___.", "demand"),
  ]),

  lec("lec-10", "B2", "The Tragedy of Shared Resources", [
    ["A", "In economics, there is a famous idea known as the tragedy of the commons. I would like to explain it today, because it helps us understand many environmental problems."],
    ["A", "Imagine a village with a shared pasture. Every farmer is allowed to let their cattle graze there. For each individual farmer, adding one more cow is clearly profitable, because the benefit goes to that farmer alone."],
    ["A", "However, the cost of overgrazing is shared by everyone. When every farmer thinks in the same way, the pasture is eventually destroyed. In other words, rational choices by individuals can lead to a result that is bad for the whole group."],
    ["A", "The same logic applies to fish in the ocean. No single fishing company has a reason to limit its catch if the others will simply take the fish instead."],
    ["B", "So does that mean the only solution is government control?"],
    ["A", "Not necessarily. That is one answer, through quotas or regulations. Another is private ownership, which gives owners a reason to protect the resource. And, interestingly, some communities have managed shared resources successfully through their own agreements."],
    ["A", "The key lesson, then, is that the problem is not human nature, but the lack of rules that connect individual benefit with collective cost."],
  ], [
    mc("What is the main point of the lecture?", ["Individual rational choices can damage a shared resource", "Farmers are naturally dishonest", "Governments should own all pastures", "Cattle are harmful to the environment"]),
    mc("Why does the lecturer mention fishing?", ["To show the same logic in another context", "To criticise a single company", "To argue that fish are a private resource", "To explain how quotas were invented"]),
    mc("What does the lecturer say about government control?", ["It is one possible solution, but not the only one", "It is always the best solution", "It has never worked in practice", "It is the same thing as private ownership"]),
    fill("In the example, farmers let their cattle ___ on the shared pasture.", "graze"),
    fill("The cost of overgrazing is shared by ___.", "everyone"),
  ]),

  lec("lec-11", "B2", "Reading the Layers of the Earth", [
    ["A", "Let us begin with a simple question: how do geologists know the age of a rock layer? To answer it, we need to look at two different approaches, relative dating and absolute dating."],
    ["A", "Relative dating is based on a straightforward principle. In an undisturbed sequence, the layers at the bottom were deposited first, so they are older than the layers above. It tells you the order of events, but not the exact number of years."],
    ["A", "For that, scientists use absolute dating. This method depends on radioactive elements, which decay into other elements at a steady and known rate. By measuring how much of the original element remains, researchers can calculate the age of the rock."],
    ["A", "Fossils add another useful tool. Certain species lived for a short geological time and were widespread. If you find one of them in a layer, you can match that layer with others in distant places."],
    ["B", "But can layers ever be in the wrong order?"],
    ["A", "Yes, and this is an important exception. Powerful folding or faulting can tilt or even overturn layers. Geologists therefore must check for such signs before applying the basic principle."],
    ["A", "So, to sum up, the two methods complement each other: one gives order, the other gives numbers."],
  ], [
    mc("What is the organisation of the lecture?", ["It describes two dating methods and then adds fossils and an exception", "It compares two rock types and their uses", "It lists the steps of a laboratory experiment", "It tells a historical story about early geologists"]),
    mc("What does relative dating tell us?", ["The order of events but not exact years", "The exact age in years", "The amount of radioactive material", "The species of fossils present"]),
    mc("What can be inferred from the lecturer's answer to the student?", ["The basic principle cannot be applied without checking for disturbance", "Geologists never use the basic principle", "Layers are usually overturned", "Faulting makes absolute dating impossible"]),
    fill("Radioactive elements decay at a steady and known ___.", "rate"),
    fill("Folding or faulting can tilt or even ___ layers.", "overturn"),
  ]),

  lec("lec-12", "B2", "What Pottery Can Tell Us", [
    ["A", "When people imagine archaeology, they often think of gold and spectacular tombs. In reality, one of the most valuable materials for archaeologists is something much more ordinary: broken pottery."],
    ["A", "There are two reasons for this. First, pottery is durable. Wood, cloth and food usually decay, but fired clay can survive for thousands of years in the ground. Second, pottery was used everywhere, so it appears at almost every site."],
    ["A", "Pottery gives information in several ways. The style of decoration often changes over time, so archaeologists can use it to estimate when a site was occupied. The clay itself can sometimes be traced to a particular region, which shows trading connections."],
    ["A", "Residues inside a vessel can reveal what it contained. Chemical analysis may detect traces of oil, wine or milk, which tells us about diet."],
    ["B", "Does that mean the dating is completely accurate?"],
    ["A", "No. Pottery dating is usually an approximation. Styles could continue in use for a long time, and old vessels could be reused. That is why archaeologists compare pottery with other evidence, such as radiocarbon dating."],
    ["A", "In short, humble fragments can be more informative than treasure."],
  ], [
    mc("What is the lecturer's main argument?", ["Ordinary pottery is a very informative source for archaeologists", "Gold objects are less valuable than expected", "Pottery is easy to date precisely", "Tombs contain little useful evidence"]),
    mc("Which is a reason why pottery survives well?", ["Fired clay is durable", "It is buried deep underground", "It is protected by cloth", "It is chemically similar to wood"]),
    mc("Why does the lecturer say archaeologists compare pottery with radiocarbon dating?", ["Because pottery dating is only approximate", "Because radiocarbon is cheaper", "Because pottery has no decoration", "Because clay cannot be traced"]),
    fill("Chemical analysis may detect traces of oil, wine or ___.", "milk"),
    fill("The style of decoration often changes over ___.", "time"),
  ]),

  lec("lec-13", "B2", "Do We Really Use Only Ten Percent of the Brain?", [
    ["A", "I would like to begin with a claim that you have probably heard: that humans use only ten percent of their brains. Today I will explain why this idea is a myth."],
    ["A", "First, consider evolution. The brain consumes about one fifth of the body's energy, even though it is a small part of our weight. It would be strange for nature to maintain such an expensive organ if ninety percent of it were useless."],
    ["A", "Second, brain imaging shows activity throughout the brain. Different tasks use different regions, but over the course of a day, nearly all areas are active. Even during sleep, many regions are working."],
    ["A", "Third, damage tells a story. If ninety percent of the brain were unnecessary, injuries to most areas would cause no problems. In practice, damage to almost any region leads to some kind of loss."],
    ["B", "So where does the idea come from?"],
    ["A", "Nobody is entirely certain. It may come from a misunderstanding of early research, or from popular books promising hidden potential. It remains attractive because it suggests that we could all become geniuses."],
    ["A", "The reality is less magical but more interesting: we use the whole brain, and the real challenge is to understand how its parts cooperate."],
  ], [
    mc("What is the purpose of the lecture?", ["To show that a popular claim is false", "To explain how to improve memory", "To describe a new imaging technique", "To prove that sleep is unnecessary"]),
    mc("Which type of evidence does the lecturer NOT use?", ["A survey of public opinion", "Energy consumption", "Brain imaging", "Injuries"]),
    mc("According to the lecturer, why does the myth remain attractive?", ["It suggests we could all become geniuses", "It has been proved by evolution", "It is supported by medical records", "It explains why we sleep"]),
    fill("The brain consumes about one ___ of the body's energy.", "fifth"),
    fill("Over the course of a day, nearly all ___ are active.", "areas"),
  ]),

  lec("lec-14", "B2", "The Printing Press and Its Consequences", [
    ["A", "Today we will examine one of the most influential inventions in European history: the printing press, developed by Johannes Gutenberg around the middle of the fifteenth century."],
    ["A", "Before printing, every book was copied by hand, usually by monks. This process was slow and expensive, and each copy might contain small errors. As a result, books were rare and owned mainly by the church and wealthy people."],
    ["A", "Gutenberg's system used movable metal letters that could be arranged, printed, and then reused. This made it possible to produce many identical copies quickly. Within a few decades, printing workshops had appeared in many European cities."],
    ["A", "The consequences were wide-ranging. Prices fell, literacy slowly rose, and ideas could travel faster. For example, religious debates in the sixteenth century spread rapidly because pamphlets could be printed in large numbers."],
    ["B", "Did everyone welcome the change?"],
    ["A", "No. Some authorities worried that they would lose control over what people read, and some scribes feared for their jobs. Governments soon introduced licensing and censorship."],
    ["A", "So we can see that the press did not simply give people information. It also created a long struggle over who decides what may be published."],
  ], [
    mc("What is the lecture mainly about?", ["The effects of the printing press on European society", "The life of Johannes Gutenberg", "The history of monks and monasteries", "How paper was made in the fifteenth century"]),
    mc("What was the key feature of Gutenberg's system?", ["Movable metal letters that could be reused", "Cheaper paper made from wood", "Copies written by trained scribes", "A single block carved for each page"]),
    mc("Why does the lecturer mention censorship?", ["To show that not everyone welcomed the change", "To explain why prices fell", "To prove that literacy declined", "To describe how monks worked"]),
    fill("Before printing, each copy of a book might contain small ___.", "errors"),
    fill("Printing workshops soon appeared in many European ___.", "cities"),
  ]),

  lec("lec-15", "B2", "The Language of Colour", [
    ["A", "Today's lecture is about a surprising question in linguistics: do the words we have for colours affect how we see them? This is a version of what is called linguistic relativity."],
    ["A", "Let me begin with some background. Languages divide the colour spectrum in different ways. English, for instance, has separate words for blue and green, but some languages use a single word that covers both. Russian, on the other hand, has two basic words for light blue and dark blue."],
    ["A", "Researchers have tested whether this makes a difference. Some experiments suggest that speakers react slightly faster when they have to tell apart two colours that have different names in their language."],
    ["A", "However, the effect is small, and it does not mean that people cannot see the difference. Everyone, whatever their language, has the same basic visual system."],
    ["B", "So is the original idea wrong?"],
    ["A", "The strong version, which says language determines thought, is generally rejected. The weak version, which says language can influence attention and speed, has some support."],
    ["A", "To conclude, language is not a prison for perception, but it may act as a kind of lens that makes certain distinctions easier to notice."],
  ], [
    mc("What is the lecturer's conclusion?", ["Language may slightly influence perception but does not limit it", "Language completely determines thought", "Colour words have no connection to perception", "Russian speakers see more colours than English speakers"]),
    mc("Why does the lecturer mention Russian?", ["As an example of a language that divides blue differently", "To show that Russian has no word for green", "To argue that Russian speakers are faster at everything", "To explain why English is simpler"]),
    mc("What does the lecturer say about the strong version of linguistic relativity?", ["It is generally rejected", "It is proved by experiments", "It applies only to colours", "It is supported by visual science"]),
    fill("Some languages use a single word that covers blue and ___.", "green"),
    fill("The weak version says that language can influence attention and ___.", "speed"),
  ]),

  lec("lec-16", "B2", "Growing Up in Different Societies", [
    ["A", "In sociology, we often distinguish between two terms that people confuse: nature and nurture. Nature refers to biological inheritance, while nurture means the social environment in which a person grows up."],
    ["A", "Today I will focus on one part of nurture, which is called socialisation. Socialisation is the process by which individuals learn the norms, values and behaviour expected in their society. It begins in the family, and continues at school, among friends and through the media."],
    ["A", "Consider something as simple as personal space. In some cultures, people stand quite close while talking, and moving away would seem unfriendly. In others, a greater distance is polite. Nobody is born knowing these rules; they are learned."],
    ["A", "Now, it would be a mistake to think that socialisation is a one-way street. Individuals are not simply copies of their society. People question rules, make choices and sometimes change the norms."],
    ["B", "Can socialisation continue after childhood?"],
    ["A", "Definitely. Sociologists describe it as lifelong. Starting a new job, moving to another country or becoming a parent all require us to learn new expectations."],
    ["A", "So we should see socialisation as an ongoing conversation between the individual and society."],
  ], [
    mc("What is the lecture mainly about?", ["How people learn the expectations of their society", "How genes determine behaviour", "Why personal space is different in schools", "How the media replaced families"]),
    mc("What is the purpose of the personal space example?", ["To show that norms are learned, not inborn", "To prove that distance is biological", "To criticise some cultures", "To describe how schools teach manners"]),
    mc("What does the lecturer say about socialisation in adulthood?", ["It continues throughout life", "It ends at school", "It is limited to the family", "It only affects migrants"]),
    fill("Nature refers to biological ___.", "inheritance"),
    fill("Socialisation begins in the ___.", "family"),
  ]),

  lec("lec-17", "B2+", "Why Do Some Species Become Extinct?", [
    ["A", "Today I want to examine extinction, and I would like to challenge a common assumption. Many people picture extinction as something rare and dramatic, like the end of the dinosaurs. In fact, the vast majority of species that have ever lived are no longer alive."],
    ["A", "Scientists distinguish between background extinction, which is the normal, slow rate of loss, and mass extinction, which is a sudden loss of many species across the planet. Earth has experienced five major mass extinctions, and the best known probably involved a large asteroid impact about sixty-six million years ago."],
    ["A", "What concerns conservationists today is that the present rate of loss appears to be much higher than the background rate. The main drivers are habitat destruction, overexploitation, invasive species and climate change."],
    ["A", "Habitat destruction deserves special emphasis. When a forest is cut down, it is not only the trees that disappear. Thousands of dependent organisms lose their homes, and their relationships to each other are also broken."],
    ["B", "But isn't extinction a natural process?"],
    ["A", "It is, and that is precisely the point of the distinction I made. The natural process is slow enough for new species to evolve and fill gaps. The current speed is far faster than evolution can compensate."],
    ["A", "Therefore, to say that extinction is natural does not mean that today's losses are acceptable."],
  ], [
    mc("What is the central argument of the lecture?", ["Although extinction is natural, today's rate is unusually high", "Extinction is always caused by asteroids", "Conservation efforts have solved the problem", "Species should be left to disappear naturally"]),
    mc("How does the lecturer respond to the student's objection?", ["By agreeing that it is natural, but pointing out the difference in speed", "By denying that extinction is natural", "By claiming that evolution is too fast", "By changing the subject to climate change"]),
    mc("Why does the lecturer describe what happens when a forest is cut down?", ["To illustrate that habitat destruction affects many species", "To prove that trees are unimportant", "To criticise the timber industry", "To explain how forests grow back"]),
    fill("Normal, slow loss of species is called ___ extinction.", "background"),
    fill("Earth has experienced five major mass ___.", "extinctions"),
  ]),

  lec("lec-18", "B2+", "The Idea of Comparative Advantage", [
    ["A", "Now, I would like to discuss one of the most counterintuitive ideas in economics: comparative advantage. It was developed in the early nineteenth century, and it remains central to the argument for international trade."],
    ["A", "Let us start with a related concept, absolute advantage. A country has an absolute advantage if it can produce something using fewer resources than another country. Common sense suggests that a country with an advantage in everything would gain nothing from trade."],
    ["A", "Here, however, is where the surprise appears. What matters is not who is best in absolute terms, but who gives up the least to produce a good. This sacrifice is called opportunity cost."],
    ["A", "Consider a lawyer who is also a faster typist than her secretary. It might seem logical for her to do her own typing. But every hour she types is an hour she cannot spend on legal work, which is much more valuable. So both she and the secretary benefit if he does the typing."],
    ["B", "Does everyone really gain from trade in this model?"],
    ["A", "In total, yes, the output increases. But that does not mean that every individual gains. Some workers in industries that face new competition may lose their jobs, which is why many economists support retraining programmes."],
    ["A", "So the theory is powerful, but it describes total benefits, not their distribution."],
  ], [
    mc("What is the main point the lecturer makes about comparative advantage?", ["Countries can gain from trade even if one is better at everything", "Only the most efficient country benefits from trade", "Trade always harms workers", "Absolute advantage is more important than opportunity cost"]),
    mc("Why does the lecturer use the lawyer and the secretary?", ["To illustrate opportunity cost", "To show that lawyers are poorly paid", "To compare two different countries' laws", "To argue that typing is a skilled job"]),
    mc("What limitation of the theory does the lecturer mention?", ["It describes overall gains, not who benefits within a country", "It ignores the idea of opportunity cost", "It was developed too recently", "It only applies to legal services"]),
    fill("What a producer gives up to make a good is called ___ cost.", "opportunity"),
    fill("Some economists support ___ programmes for workers who lose their jobs.", "retraining"),
  ]),

  lec("lec-19", "B2+", "Why Do People Follow the Crowd?", [
    ["A", "In social psychology, one of the most striking phenomena is conformity, the tendency to adjust our behaviour or opinions to match those of a group. Most of us believe we are independent thinkers, so the evidence can be surprising."],
    ["A", "There are two broad explanations for conformity. The first is informational influence. When a situation is unclear, we assume that other people know more than we do, so we copy them. If you are in a foreign city and see a long queue outside a restaurant, you may reasonably decide the food must be good."],
    ["A", "The second is normative influence. Here we conform not because we believe the group is right, but because we want to be accepted and avoid disapproval. We may laugh at a joke we do not find funny, simply to fit in."],
    ["A", "It is tempting to see conformity as a weakness. However, that would be a simplification. Following social norms helps societies work smoothly. Imagine the chaos if everyone drove on whichever side of the road they liked."],
    ["B", "Can a minority change the majority, then?"],
    ["A", "Yes, under certain conditions. A small group that is consistent and confident can slowly make others reconsider. Many social reforms began in precisely this way."],
    ["A", "So conformity is neither simply good nor bad; it is a basic feature of social life that we should understand."],
  ], [
    mc("What is the lecturer's overall view of conformity?", ["It is a basic feature of social life with both costs and benefits", "It is a sign of weak character", "It only occurs in unfamiliar places", "It is rare among adults"]),
    mc("What is the difference between informational and normative influence?", ["The first is about believing others know best, the second about being accepted", "The first affects groups, the second individuals", "The first is deliberate, the second accidental", "The first applies to minorities, the second to majorities"]),
    mc("Why does the lecturer mention driving on one side of the road?", ["To show that conformity can be useful", "To prove that people cannot drive safely", "To criticise traffic laws", "To explain informational influence"]),
    fill("In a foreign city, a long queue outside a restaurant suggests the ___ must be good.", "food"),
    fill("A small group that is consistent and ___ can make others reconsider.", "confident"),
  ]),

  lec("lec-20", "B2+", "How Machines Learn from Examples", [
    ["A", "Let me start by clarifying a term that is used too loosely: machine learning. In traditional programming, a person writes explicit rules, and the computer follows them. In machine learning, by contrast, the computer is given many examples and finds the patterns itself."],
    ["A", "To make this concrete, think of a program that has to recognise photographs of cats. Writing rules by hand would be extremely difficult, because cats come in different shapes, colours and positions. Instead, developers show the system thousands of labelled pictures, and it gradually adjusts its internal settings to get better at the task."],
    ["A", "This approach has a significant consequence: the quality of the result depends heavily on the quality of the data. If the examples are incomplete or unbalanced, the system will reproduce those weaknesses."],
    ["A", "A well-known concern is bias. Suppose a system learns to help select job applicants, using the decisions of the past. If earlier decisions were unfair, the system may simply learn to continue that unfairness, although nobody told it to."],
    ["B", "So does the machine actually understand what a cat is?"],
    ["A", "That is a matter of debate. What we can say is that it detects statistical regularities, which is not necessarily the same as human understanding."],
    ["A", "The practical lesson is that these systems are powerful tools, but they need careful testing and human supervision."],
  ], [
    mc("What is the main difference between machine learning and traditional programming?", ["In machine learning the computer finds patterns from examples", "Machine learning uses no data", "Traditional programming is faster", "Machine learning requires hand-written rules"]),
    mc("Why does the lecturer discuss job applicants?", ["To illustrate how bias in data can be reproduced", "To show that machines are better at recruitment", "To explain how pictures are labelled", "To prove that human decisions are always fair"]),
    mc("What can be inferred about the lecturer's attitude to the student's question?", ["The lecturer is cautious and considers the matter open", "The lecturer is sure machines understand", "The lecturer finds the question irrelevant", "The lecturer thinks the answer is simply no"]),
    fill("Developers show the system thousands of ___ pictures.", "labelled"),
    fill("The system detects statistical ___.", "regularities"),
  ]),

  lec("lec-21", "B2+", "Rethinking Sleep Through History", [
    ["A", "Many of us believe that sleeping eight hours without interruption is the natural way to rest. Today I would like to complicate that assumption by looking at how people slept in the past."],
    ["A", "Historians who have studied European diaries, court records and medical books found frequent references to a pattern called segmented sleep. People slept for a first period, woke for an hour or so in the middle of the night, and then slept again."],
    ["A", "During the wakeful interval, people might pray, talk, or do small household tasks. This pattern appears to have faded gradually as artificial lighting spread, and as evenings became a time for work and entertainment."],
    ["A", "We should be careful, however, not to draw conclusions that are too strong. The evidence comes mainly from written sources in particular societies, so it cannot tell us what is biologically natural for all humans."],
    ["B", "So is waking up at night nothing to worry about?"],
    ["A", "It can be normal, but if it causes distress or makes you exhausted during the day, it deserves medical attention. The historical argument is not a replacement for medical advice."],
    ["A", "What the research does show is that the idea of one unbroken block of sleep is partly shaped by culture and technology, not only by biology."],
  ], [
    mc("What is the lecturer's main purpose?", ["To question the assumption that unbroken sleep is the only natural pattern", "To recommend a new sleep schedule", "To prove that people once slept less", "To criticise artificial lighting"]),
    mc("What does the lecturer say about the limits of the evidence?", ["It comes mainly from written sources in particular societies", "It was collected in modern laboratories", "It covers every human society", "It has been disproved by doctors"]),
    mc("What is the lecturer's advice about night waking?", ["It may be normal, but persistent problems need medical attention", "It should always be ignored", "It proves that segmented sleep is healthier", "It can be cured by candles"]),
    fill("People slept for a first period, woke for an hour, and then slept ___.", "again"),
    fill("The pattern faded as artificial ___ spread.", "lighting"),
  ]),

  lec("lec-22", "B2+", "Why Planning Cities Around Cars Backfires", [
    ["A", "In the mid-twentieth century, many cities were redesigned around the private car. Wide roads, large car parks and highways were seen as symbols of modernity. Today I will examine why many planners now consider this approach problematic."],
    ["A", "The first difficulty is a phenomenon known as induced demand. When a new lane is added to reduce congestion, driving becomes easier and more attractive, so more people drive. After some time, the traffic is as heavy as before."],
    ["A", "Second, car-oriented design uses a great deal of space. Parking areas and road junctions occupy land that could otherwise provide housing, shops or parks. As a result, destinations become further apart, and without a car it becomes hard to reach them."],
    ["A", "Now, it would be unfair to claim that cars are the enemy. They provide flexibility, especially in areas with low population density. The criticism is directed at a design that makes them the only option."],
    ["B", "What do planners propose instead?"],
    ["A", "Many favour mixed-use neighbourhoods, in which homes, shops and workplaces are close together. Combined with reliable public transport and safe cycling routes, this gives residents a real choice."],
    ["A", "In other words, the goal is not to ban the car, but to end the dependence on it."],
  ], [
    mc("What is the main idea of the lecture?", ["Designing cities around cars creates problems that planners now try to avoid", "Cars should be banned from all cities", "Highways were never popular", "Public transport is always cheaper than driving"]),
    mc("What is induced demand?", ["More lanes make driving more attractive, so traffic increases", "A reduction in the number of drivers", "A rise in the price of fuel", "A shortage of parking spaces"]),
    mc("What is the lecturer's attitude toward cars?", ["Balanced: cars are useful but should not be the only option", "Completely opposed", "Enthusiastically supportive", "Uninterested"]),
    fill("Homes, shops and workplaces are close together in ___ neighbourhoods.", "mixed-use", ["mixed use"]),
    fill("Parking areas occupy land that could provide housing, shops or ___.", "parks"),
  ]),

  lec("lec-23", "B2+", "Seeing Light in Medieval Churches", [
    ["A", "Let me turn to a topic that connects art, religion and technology: stained glass in Gothic cathedrals. Between the twelfth and the sixteenth centuries, builders in Europe developed a style that placed enormous coloured windows at the centre of church design."],
    ["A", "To understand why this was possible, we have to consider architecture. Earlier Romanesque churches had thick walls that supported the roof, which left little space for windows. Gothic builders used pointed arches and external supports called flying buttresses to carry the weight, so walls could contain large openings."],
    ["A", "The windows themselves had a double function. They were beautiful, and they also taught. At a time when most people could not read, images of biblical stories could be understood by any visitor who looked up."],
    ["A", "Some people claim that the glass in old windows has flowed downward over the centuries, and that this explains why it is thicker at the bottom. This idea is popular, but it is probably wrong. Glass is a rigid material at normal temperatures, and uneven thickness is more likely the result of the hand-made production process."],
    ["B", "Why is it thicker at the bottom, then?"],
    ["A", "Often the glazier simply installed the heavier edge downwards, because it was more stable."],
    ["A", "Thus the windows reflect both a structural innovation and a communicative purpose, and they should not be seen as decoration alone."],
  ], [
    mc("What made large windows possible in Gothic churches?", ["Pointed arches and flying buttresses carrying the weight", "Thicker walls than in earlier churches", "A new type of coloured glass", "The use of wooden roofs"]),
    mc("What does the lecturer say about the idea that glass flows downward?", ["It is popular but probably wrong", "It is accepted by all scientists", "It explains the windows' colours", "It only applies to modern glass"]),
    mc("What is the double function of the windows?", ["They were beautiful and also taught biblical stories", "They gave light and kept buildings warm", "They supported the roof and decorated it", "They showed wealth and hid the walls"]),
    fill("Earlier Romanesque churches had thick ___ that supported the roof.", "walls"),
    fill("The glazier installed the heavier edge ___.", "downwards"),
  ]),

  lec("lec-24", "B2+", "The Lessons of Easter Island", [
    ["A", "Few places in the world have attracted as much speculation as Easter Island, a small, remote island in the Pacific Ocean known for its huge stone statues. Today I will look at one of the popular stories about it and at the problems with that story."],
    ["A", "The popular version is a dramatic tale of ecological suicide. According to it, the islanders cut down all their trees to move statues, destroyed their own environment and then fell into conflict and collapse. It is often used as a warning for the modern world."],
    ["A", "However, more recent research complicates this account. There is good evidence that the forest did disappear, but the causes may have included rats, which arrived with the first settlers and ate seeds, as well as human clearance of land."],
    ["A", "There is also a debate about the population. Some scholars argue that the island's society was resilient until European contact brought disease and slave raiding, which devastated it. Others still support a larger role for internal problems."],
    ["B", "So is the lesson about the environment wrong?"],
    ["A", "Not wrong, but less simple. The island still shows how fragile a small ecosystem can be. What we should avoid is a single-cause explanation presented as a certainty."],
    ["A", "The wider point concerns method: when a story is too neat, a careful historian asks what evidence might have been overlooked."],
  ], [
    mc("What is the lecturer's main purpose?", ["To show that a popular story is more complicated than it seems", "To prove that the islanders caused their own collapse", "To describe how statues were carved", "To argue that Easter Island has no lessons"]),
    mc("What role do rats play in the lecture?", ["They may have contributed to the loss of the forest", "They carried disease to Europe", "They were used to move the statues", "They were kept as food"]),
    mc("What does the lecturer suggest about the student's question?", ["The environmental lesson remains but should not be oversimplified", "The environmental lesson is entirely false", "There is no evidence of forests", "The lesson applies only to the Pacific"]),
    fill("The popular version is a tale of ecological ___.", "suicide"),
    fill("Rats, which arrived with the first settlers, ate ___.", "seeds"),
  ]),
];
