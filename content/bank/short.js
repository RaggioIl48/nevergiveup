import { task, mc, fill } from "./helpers.js";

const A = (text) => ({ who: "A", text });
const B = (text) => ({ who: "B", text });

export const shorts = [
  // ---------- Monologues ----------
  task("mono-01", "monologue", "B1", "A morning at the castle", [
    A("Good morning, everyone, and welcome to Harlow Castle. My name is Fiona, and I will be your guide today. The tour lasts about ninety minutes, and we will finish in the garden café."),
    A("We begin in the Great Hall, which was built in the twelfth century. Please do not touch the tapestries on the walls, because they are very fragile. You can take photographs, but please switch off your flash."),
    A("After that, we climb the north tower. There are one hundred and twelve steps, so go slowly. From the top, you can see the river and, on a clear day, the sea."),
    A("Finally, the gift shop is next to the café, and it sells maps, postcards and homemade jam. Now, if you are ready, please follow me."),
  ], [
    mc("How long does the tour last?", ["About ninety minutes", "About one hundred and twelve minutes", "About two hours"]),
    mc("What are visitors asked not to touch?", ["The tapestries", "The photographs", "The maps"]),
    fill("The tour finishes in the ___.", "garden café"),
    fill("The Great Hall was built in the ___ century.", "twelfth"),
    fill("The gift shop sells homemade ___.", "jam"),
  ]),

  task("mono-02", "monologue", "B1", "Joining the centre", [
    A("Hello and welcome to Riverside Sports Centre. I am Dan, the manager, and I would like to explain a few things before you start your membership."),
    A("The swimming pool is open from seven in the morning until nine at night, but on Sundays it closes at six. The gym is on the first floor. If you have never used the machines before, you can book a free introduction with one of our trainers."),
    A("Lockers are available for one pound, which you get back when you return the key. Please do not leave valuables in them, because we cannot be responsible for lost items."),
    A("Finally, there is a new children's class on Saturday mornings. It is very popular, so book early at the front desk. Thank you, and enjoy your first visit."),
  ], [
    mc("When does the pool close on Sundays?", ["At six", "At seven", "At nine"]),
    mc("What happens to the money paid for a locker?", ["It is returned with the key", "It goes to charity", "It pays for a trainer"]),
    fill("The gym is on the ___ floor.", "first"),
    fill("New members can book a free ___ with a trainer.", "introduction"),
    fill("To book the children's class, go to the front ___.", "desk"),
  ]),

  task("mono-03", "monologue", "B2", "Morning on the roads", [
    A("Good morning, this is the travel news on City Radio. We start with the ring road, where an accident near junction six has caused delays of up to forty minutes. Earlier we said the road would reopen by nine, but police now expect it to stay partly closed until lunchtime."),
    A("Drivers heading to the airport are advised to use the coast road instead, although roadworks there mean one lane only. If you can, take the train. Services are running normally, apart from the line to Eastbridge, where a landslide has stopped all trains."),
    A("In the city centre, the market square is closed for the weekend cycle race, so buses will use Mill Street. And finally the weather: heavy fog this morning, clearing by eleven, then bright and mild. That is all from me; more news at the top of the hour."),
  ], [
    mc("What is the latest information about the ring road?", ["It will stay partly closed until lunchtime", "It reopened at nine", "It is closed for forty minutes only"]),
    mc("Which train line is not working?", ["The line to Eastbridge", "The line to the airport", "The city centre line"]),
    fill("Airport drivers should use the ___ road.", "coast"),
    fill("The market square is closed for the weekend ___ race.", "cycle"),
    fill("Buses will use ___ Street.", "mill"),
  ]),

  task("mono-04", "monologue", "B2", "Inside the maritime collection", [
    A("Welcome to the Maritime Museum. Before we go in, a small correction to the leaflet: the new gallery on shipwrecks is not on the second floor, as printed, but on the ground floor beside the entrance."),
    A("Our collection began in eighteen fifty with a single compass donated by a retired captain. Today we have over three thousand objects, although only a fraction are on display. The most valuable is a navigator's map, which is kept in a special glass case at a constant temperature."),
    A("Photography is allowed everywhere except in the map room. There is a workshop for families at two o'clock, where children can build model boats from recycled materials. It is free, but places are limited to twenty."),
    A("I will leave you now. Do ask the staff in blue jackets if you need anything."),
  ], [
    mc("Where is the shipwreck gallery?", ["On the ground floor", "On the second floor", "In the map room"]),
    mc("Where are visitors not allowed to take photographs?", ["In the map room", "In the shipwreck gallery", "At the workshop"]),
    fill("The collection began with a donated ___.", "compass"),
    fill("Children build model boats from ___ materials.", "recycled"),
    fill("Workshop places are limited to ___.", "twenty"),
  ]),

  task("mono-05", "monologue", "B1", "Help wanted outdoors", [
    A("Hi everyone, thanks for coming. I am Helen from Green Hands, a charity that looks after parks in our town. We are looking for volunteers to join us this spring."),
    A("Our main job is planting trees and cleaning the riverbank. We meet every second Saturday at nine o'clock by the main gate of Central Park. You do not need any experience. We provide gloves and boots, but please bring your own water bottle."),
    A("Volunteers also have the chance to join our monthly training days, where an expert teaches us about wild birds. Last year, we planted four hundred trees, which was a record."),
    A("If you would like to sign up, there is a form on the table by the door. You can also email us. Thank you very much."),
  ], [
    mc("How often does the group meet?", ["Every second Saturday", "Every Saturday", "Once a month on Sunday"]),
    mc("What should volunteers bring themselves?", ["A water bottle", "Gloves", "Boots"]),
    fill("The group meets by the main ___ of the park.", "gate"),
    fill("An expert teaches volunteers about wild ___.", "birds"),
    fill("Last year volunteers planted four hundred ___.", "trees"),
  ]),

  task("mono-06", "monologue", "B2+", "A change at the gate", [
    A("Attention, please. This is an announcement for passengers travelling to Toronto on flight two one four. Due to a technical check, the departure has been rescheduled. The flight was due to leave at ten past four, but it will now depart at a quarter to six."),
    A("Passengers should not go to gate twelve as previously announced. The flight will now board from gate twenty. Please note that gate twenty is about ten minutes on foot from the main hall, so allow plenty of time."),
    A("Passengers affected by this delay are entitled to a meal voucher, which you can collect from the information desk beside the pharmacy. Vouchers are not valid in the duty free shops. We apologise for the inconvenience, and thank you for your patience."),
  ], [
    mc("When will the flight now leave?", ["At a quarter to six", "At ten past four", "At ten to six"]),
    mc("Where can passengers collect a voucher?", ["At the information desk", "At gate twenty", "At the pharmacy counter"]),
    fill("The flight was delayed because of a technical ___.", "check"),
    fill("The flight will now board from gate ___.", "twenty"),
    fill("Vouchers are not valid in the ___ shops.", "duty free"),
  ]),

  task("mono-07", "monologue", "B2", "Lights over the harbour", [
    A("This weekend our town hosts the Lantern Festival, which has been celebrated for over two hundred years. Originally it marked the end of the fishing season, but nowadays it is more of a family celebration."),
    A("On Friday evening, hundreds of children parade through the old quarter carrying paper lanterns they have made themselves at school. On Saturday, there is a food market on the harbour, where you can try traditional fish stew. I would recommend arriving early, as the queues get very long by noon."),
    A("The highlight is the firework display on Sunday night over the bay. You might expect it to start at nine, but this year it will begin at half past ten, because the sky is only fully dark by then."),
    A("Entry to the festival is free, though donations are welcome, and all the money goes to the lifeboat rescue service."),
  ], [
    mc("What did the festival originally celebrate?", ["The end of the fishing season", "A family reunion", "A school year"]),
    mc("When will the fireworks start this year?", ["At half past ten", "At nine", "At noon"]),
    fill("Children carry paper ___ in the parade.", "lanterns"),
    fill("At the market, visitors can try traditional fish ___.", "stew"),
    fill("Donations go to the lifeboat rescue ___.", "service"),
  ]),

  task("mono-08", "monologue", "B2+", "The week ahead", [
    A("Good evening. Here is the weather outlook for the week. Today has been unusually warm, with temperatures reaching twenty eight degrees in the south, but that will not last. A cold front is moving in from the Atlantic, bringing strong winds overnight."),
    A("On Tuesday, expect heavy rain across the west, with some flooding likely in low areas near rivers. We had previously forecast snow in the mountains, but it now looks like it will be mostly rain, as temperatures are higher than expected."),
    A("Wednesday will be the coldest day, with frost in the morning and a maximum of just six degrees. Thursday brings a welcome change, with sunshine and light winds, although it will remain chilly. By the weekend, we expect a gradual return to milder weather."),
    A("Farmers are advised to protect young plants on Wednesday morning. That is the forecast; goodnight."),
  ], [
    mc("What is now expected in the mountains on Tuesday?", ["Mostly rain", "Heavy snow", "Frost"]),
    mc("Which will be the coldest day?", ["Wednesday", "Tuesday", "Thursday"]),
    fill("A cold front is coming from the ___.", "atlantic"),
    fill("Flooding is likely in low areas near ___.", "rivers"),
    fill("Farmers should protect young ___.", "plants"),
  ]),

  task("mono-09", "monologue", "B1", "Platform news", [
    A("Good afternoon, ladies and gentlemen. This is a service announcement from Central Station. The train to Oxford, which was due to leave from platform three, has been cancelled."),
    A("Passengers for Oxford can take the next service at half past three from platform five. Tickets are valid on that train, and no extra payment is necessary. If you need help with your luggage, please ask a member of staff in a yellow jacket."),
    A("Also, please remember that the station café is closing early today, at five o'clock, because of a staff meeting. The ticket office will stay open until eight.     Thank you for your attention. We apologise for any trouble this change may cause you today."),
  ], [
    mc("What should passengers for Oxford do?", ["Take the half past three train from platform five", "Wait for the train at platform three", "Buy a new ticket"]),
    mc("Why is the café closing early?", ["There is a staff meeting", "There is no food left", "The station is closing"]),
    fill("Staff who can help wear a ___ jacket.", "yellow"),
    fill("The ticket office stays open until ___.", "eight"),
    fill("No extra ___ is necessary.", "payment"),
  ]),

  task("mono-10", "monologue", "B2", "Walking the old streets", [
    A("Good morning, and welcome to the Old Town walking tour. I am Carlos, and over the next two hours I will show you some of the oldest streets in the city. We will be walking about three kilometres, so I hope you are wearing comfortable shoes."),
    A("Our first stop is the cathedral, which many people assume is medieval. In fact, it was rebuilt after a fire in seventeen sixty, and only the bell tower is original. After that, we will cross the bridge to the market, where you can buy souvenirs. I would not buy anything just yet, though, because we come back past the same stalls at the end."),
    A("At eleven o'clock, we have a short break at a bakery famous for its almond cakes. The tour is included in your ticket, but the cakes are not, and they cost three pounds fifty each."),
    A("We finish at the old harbour, near the lighthouse. Right, let us get going."),
  ], [
    mc("What is original in the cathedral?", ["The bell tower", "The main hall", "The whole building"]),
    mc("Why does the guide advise waiting to buy souvenirs?", ["The group will pass the stalls again", "The market is closed", "The prices are high"]),
    fill("The bakery is famous for its almond ___.", "cakes"),
    fill("The tour ends near the ___.", "lighthouse"),
    fill("The group will walk about three ___.", "kilometres"),
  ]),

  task("mono-11", "monologue", "B2+", "Local news bulletin", [
    A("Now the local news. The council has announced that the old library on Bridge Street will not be demolished after all. Last month, it was widely reported that the building would be replaced by a car park, but following a petition signed by over four thousand residents, the plan has been withdrawn."),
    A("Instead, the building will be converted into a community arts centre. The work is expected to cost one million two hundred thousand pounds and to take around eighteen months. The council leader said the funding would come mostly from a national heritage grant, rather than from local taxes."),
    A("Not everyone is pleased. Local shopkeepers say they were relying on the car park to attract customers, and have asked for a meeting next week. The council says it will consider alternative sites for parking."),
    A("In other news, the annual summer fair has been postponed until September because of the weather."),
  ], [
    mc("What will happen to the old library?", ["It will become an arts centre", "It will become a car park", "It will be demolished"]),
    mc("Where will most of the money come from?", ["A heritage grant", "Local taxes", "Shopkeepers"]),
    fill("The petition was signed by over four thousand ___.", "residents"),
    fill("The work will take around eighteen ___.", "months"),
    fill("The summer fair is postponed until ___.", "september"),
  ]),

  task("mono-12", "monologue", "B2+", "First day at the academy", [
    A("Welcome to Westbrook Language Academy. I am Gina, the director of studies, and I would like to start by saying that you have made an excellent choice. Over the next ten minutes, I will explain how the course works."),
    A("Classes run from nine until one, Monday to Friday. Some of you were told that lessons finish at two, but that was an old timetable. In the afternoons, we offer optional workshops in pronunciation and exam skills, which I would strongly recommend if you are taking an international test."),
    A("On your first Friday, you will take a progress test. Please do not be nervous; it is only to help us choose the right level for you. Your teacher will give you the results in writing the following week."),
    A("Finally, the library is on the third floor, and you can borrow up to five books at a time. The internet password is on the back of your student card. Now, any questions?"),
  ], [
    mc("When do classes finish?", ["At one o'clock", "At two o'clock", "At nine o'clock"]),
    mc("What is the purpose of the progress test?", ["To place students in the right level", "To give students a grade", "To select exam candidates"]),
    fill("The optional workshops cover pronunciation and exam ___.", "skills"),
    fill("The library is on the ___ floor.", "third"),
    fill("Students can borrow up to ___ books.", "five"),
  ]),

  // ---------- Extracts, B2 style ----------
  task("ext-01", "extract", "B2", "A message from the office", [
    A("Hi Priya, it is Marcus. I know I said Thursday for the budget meeting, but the finance director has just flown to Lisbon, so we will do it on Monday morning instead. Do not worry about the figures; I have already sent them to everyone. Actually, could you bring the printed charts? Last time the screen failed halfway through. Thanks."),
  ], [
    mc("Why is Marcus calling?", ["To announce a change of day", "To ask for the figures", "To cancel the meeting", "To invite Priya to Lisbon"]),
    mc("Why does he ask for printed charts?", ["He does not trust the equipment", "He wants to save time", "The director prefers paper", "The figures have changed"]),
  ]),

  task("ext-02", "extract", "B2+", "After the cinema", [
    A("So, what did you think of the film?"),
    B("Honestly, I was bored. The acting was fine, but nothing happened for two hours."),
    A("Really? I thought the slow pace was the point. It made the ending feel earned."),
    B("Maybe. I would have preferred it shorter, though."),
  ], [
    mc("How does the man feel about the film?", ["Disappointed by its pace", "Impressed by the acting", "Confused by the ending", "Angry about the length of the trip"]),
    mc("What is the woman's opinion of the slow pace?", ["It serves a purpose", "It spoils the film", "It is too long", "It is typical for the director"]),
  ]),

  task("ext-03", "extract", "B2", "Delay on the line", [
    A("Passengers for Leeds, the delayed six forty is now expected at seven fifteen. We apologise; this is due to a signal failure near York, not the earlier flooding. Please note that the train will leave from platform nine, not platform four."),
  ], [
    mc("What caused the delay?", ["A signal failure", "Flooding", "A cancelled driver", "Bad weather in Leeds"]),
    mc("What should passengers do?", ["Go to platform nine", "Go to platform four", "Wait for another announcement", "Take a later train"]),
  ]),

  task("ext-04", "extract", "B2+", "A tough decision", [
    A("I have been offered the job in Manchester, but I am not sure."),
    B("The salary is better, is it not?"),
    A("Slightly. But I would miss my team, and the journey to work is longer."),
    B("Sounds like you have already decided."),
    A("Maybe I have."),
  ], [
    mc("How does the woman feel about the offer?", ["Reluctant", "Delighted", "Offended", "Indifferent"]),
    mc("What does the man suggest?", ["She is leaning towards refusing", "She should ask for more money", "She should move cities", "She has accepted already"]),
  ]),

  task("ext-05", "extract", "B2", "At the returns desk", [
    A("I would like to return this jacket. It is too small."),
    B("Do you have the receipt?"),
    A("No, it was a gift."),
    B("I cannot give you a refund without it, but I can offer a credit note, valid for six months."),
    A("That will do, thanks. There is a scarf I have had my eye on."),
  ], [
    mc("What does the assistant offer?", ["A credit note", "A refund", "A different size", "A discount"]),
    mc("What will the customer probably do next?", ["Buy a scarf", "Look for the receipt", "Leave the shop", "Ask for a manager"]),
  ]),

  task("ext-06", "extract", "B2+", "A reminder after class", [
    A("Right, before you leave, a quick reminder. The essay is not due on Friday after all; I have given you until the following Wednesday because of the school trip. But I will not accept anything later, whatever the reason. And please, no copying from the internet; I can tell."),
  ], [
    mc("Why is the teacher speaking?", ["To explain a new deadline", "To cancel the essay", "To describe the school trip", "To praise the class"]),
    mc("How does the teacher sound about late work?", ["Firm", "Relaxed", "Worried", "Sympathetic"]),
  ]),

  task("ext-07", "extract", "B2", "Call from the dentist", [
    A("This is Greenfield Dental calling for Mr Okafor. Your appointment on Tuesday has been cancelled because Dr Lane is ill. We have a free time on Wednesday at ten o'clock, or you can wait for the following week. Please call us back before five today."),
  ], [
    mc("Why is the clinic calling?", ["To cancel an appointment", "To confirm an appointment", "To send test results", "To ask for payment"]),
    mc("What must Mr Okafor do?", ["Call back to choose a new time", "Come on Tuesday", "Wait for another message", "Find another dentist"]),
  ]),

  task("ext-08", "extract", "B2", "A word with the neighbour", [
    A("Sorry to bother you, but the music last night was quite loud."),
    B("Oh, I am so sorry! It was my son's birthday; I thought we had finished by eleven."),
    A("It was nearer one."),
    B("Really? I will have a word with him. It will not happen again."),
  ], [
    mc("How does the man react?", ["Apologetic and surprised", "Angry and defensive", "Amused and relaxed", "Embarrassed and silent"]),
    mc("What is the woman's complaint?", ["The party lasted too late", "The music was bad", "The party was too big", "She was not invited"]),
  ]),

  task("ext-09", "extract", "B2+", "Team selection", [
    A("Guess what? The coach says I am not in the team on Saturday."),
    B("Because of your ankle?"),
    A("That is what he claims. I think it is because I missed training twice."),
    B("Well, you did miss it."),
    A("Whose side are you on?"),
  ], [
    mc("What does the woman suspect?", ["The real reason is her missed training", "The coach does not like her", "Her ankle is worse than she said", "Another player complained"]),
    mc("How does the man respond to her?", ["He is honest rather than sympathetic", "He supports her fully", "He is angry with the coach", "He makes a joke"]),
  ]),

  task("ext-10", "extract", "B2", "Museum notice", [
    A("Attention, all visitors, please. The special exhibition on ancient Egypt will close early today at four, owing to a private event. However, the café will stay open until six, and tickets will be valid for tomorrow. We apologise for any inconvenience."),
  ], [
    mc("What are visitors offered because of the early closing?", ["Tickets valid tomorrow", "Free food", "A refund", "A guided tour"]),
    mc("What will stay open later?", ["The café", "The exhibition", "The shop", "The whole museum"]),
  ]),

  task("ext-11", "extract", "B2+", "Booking a table", [
    A("Hi, it is me again. Did you book the restaurant for the weekend?"),
    B("I tried, but they are full on Friday. I got Saturday instead, at eight."),
    A("Saturday is no good for Tom; he is working."),
    B("Then let us ask him if he can swap."),
  ], [
    mc("What is the problem?", ["Tom cannot come on the new day", "The restaurant is closed", "The time is too late", "They forgot to book"]),
    mc("What will they do?", ["Ask Tom to change his shift", "Choose another restaurant", "Go on Friday", "Go without Tom"]),
  ]),

  task("ext-12", "extract", "B2+", "A new novel", [
    A("In her new novel, Clara Reyes returns to the small fishing village of her childhood. Critics praised her earlier work for its humour, but this book is darker and, I would argue, braver. It is not an easy read, but it stays with you long after the final page."),
  ], [
    mc("What is the reviewer's opinion of the book?", ["Admiring", "Bored", "Critical", "Uncertain"]),
    mc("How is it different from her earlier work?", ["It is more serious", "It is funnier", "It is shorter", "It is set elsewhere"]),
  ]),

  // ---------- Extracts, A2/B1 ----------
  task("ext-13", "extract", "A2", "A message from Tom", [
    A("Hi Anna, it is Tom. I am at the supermarket. Do you need anything? We have no milk, but I cannot remember if we need bread. Call me back. I will be here for ten more minutes."),
  ], [
    mc("Where is Tom?", ["At the supermarket", "At home", "At work"]),
    mc("What does Tom want Anna to do?", ["Call him back", "Buy bread", "Meet him at home"]),
    fill("They have no ___.", "milk"),
  ]),

  task("ext-14", "extract", "A2", "Today in the shoe shop", [
    A("Welcome to Smith's Shoes. Today only, all boots are half price. The sale ends at six o'clock. Please pay at the desk near the door."),
  ], [
    mc("When does the sale end?", ["At six o'clock", "At five o'clock", "Tomorrow"]),
    mc("Where do customers pay?", ["Near the door", "Upstairs", "In the boot department"]),
    fill("All ___ are half price.", "boots"),
  ]),

  task("ext-15", "extract", "A2", "Late bus", [
    A("Good afternoon. The number twelve bus to the city centre is late. It will arrive in fifteen minutes because of heavy traffic. We are sorry."),
  ], [
    mc("How long is the wait?", ["Fifteen minutes", "Twelve minutes", "Thirty minutes"]),
    mc("Where is the bus going?", ["The city centre", "The airport", "The station"]),
    fill("The bus is late because of heavy ___.", "traffic"),
  ]),

  task("ext-16", "extract", "A2", "Tomorrow's weather", [
    A("Here is the weather for tomorrow. In the morning it will be cloudy, and in the afternoon it will rain. The evening will be dry but cold. Take your umbrella."),
  ], [
    mc("What will the weather be like in the afternoon?", ["Rainy", "Sunny", "Snowy"]),
    mc("What will the evening be like?", ["Dry but cold", "Wet and warm", "Cloudy and hot"]),
    fill("Take your ___.", "umbrella"),
  ]),

  task("ext-17", "extract", "A2", "Message from the school", [
    A("Hello, this is Maria from the language school. Your English class on Monday is in room five, not room three. The class starts at nine o'clock. Please bring your book."),
  ], [
    mc("Which room is the class in?", ["Room five", "Room three", "Room nine"]),
    mc("What time does the class start?", ["Nine o'clock", "Five o'clock", "Three o'clock"]),
    fill("Please bring your ___.", "book"),
  ]),

  task("ext-18", "extract", "A2", "At the café", [
    A("Hi, can I have a coffee, please?"),
    B("Large or small?"),
    A("Small, with milk."),
    B("That is three pounds."),
    A("Here you are."),
  ], [
    mc("What size coffee does the customer want?", ["Small", "Large", "Medium"]),
    mc("How much is the coffee?", ["Three pounds", "Two pounds", "Five pounds"]),
    fill("The customer wants a small coffee with ___.", "milk"),
  ]),

  task("ext-19", "extract", "B1", "Car trouble", [
    A("Hello Mr Davis, this is the garage. Your car is ready, but we found a problem with the brakes, so it cost more than we said. It is now one hundred and eighty pounds. We close at half past five today, so please collect it before then."),
  ], [
    mc("Why is the price higher?", ["There was a problem with the brakes", "The garage is closing", "The work was late"]),
    mc("When must Mr Davis collect the car?", ["Before half past five", "Tomorrow morning", "After six"]),
    fill("They found a problem with the ___.", "brakes"),
  ]),

  task("ext-20", "extract", "B1", "Train to Brighton", [
    A("The next train to Brighton leaves from platform two, not platform six as shown on the board. It will leave ten minutes late. Passengers with bicycles should travel in the last carriage."),
  ], [
    mc("Which platform does the train leave from?", ["Platform two", "Platform six", "Platform ten"]),
    mc("How late will the train be?", ["Ten minutes", "Two minutes", "Six minutes"]),
    fill("Bicycles should go in the last ___.", "carriage"),
  ]),

  task("ext-21", "extract", "B1", "Weekend plans", [
    A("Are you coming to Jo's party on Saturday?"),
    B("I would love to, but I have to visit my grandmother."),
    A("What about Sunday lunch instead?"),
    B("Good idea. I will bring a cake."),
  ], [
    mc("Why can the man not go to the party?", ["He is visiting his grandmother", "He is working", "He is ill"]),
    mc("What do they decide to do?", ["Have lunch on Sunday", "Meet on Saturday", "Go to Jo's house"]),
    fill("The man will bring a ___.", "cake"),
  ]),

  task("ext-22", "extract", "B1", "Health centre message", [
    A("This is the health centre. We need to change your appointment from Tuesday to Thursday afternoon. If you cannot come, please phone us on the number on your card. Remember to bring your insurance card."),
  ], [
    mc("What is the change?", ["The day of the appointment", "The doctor", "The address"]),
    mc("What should the patient do if Thursday is not possible?", ["Phone the health centre", "Come on Tuesday", "Send an email"]),
    fill("Remember to bring your ___ card.", "insurance"),
  ]),

  task("ext-23", "extract", "B1", "Weather and picnics", [
    A("Next, the weather. It has been a warm week, but a cold wind is coming from the north tonight. Tomorrow will be windy with some showers, and on Sunday the sun returns. If you are planning a picnic, wait until Sunday."),
  ], [
    mc("What will tomorrow be like?", ["Windy with showers", "Warm and sunny", "Cold and snowy"]),
    mc("What is the advice for picnics?", ["Have them on Sunday", "Have them tomorrow", "Stay at home all week"]),
    fill("If you are planning a picnic, wait until ___.", "sunday"),
  ]),

  task("ext-24", "extract", "B1", "A flat to rent", [
    A("Hello, I am calling about the flat for rent."),
    B("Yes, it has two bedrooms and a small garden. The rent is six hundred pounds a month."),
    A("Can I see it?"),
    B("Of course. Tomorrow at four?"),
  ], [
    mc("How many bedrooms does the flat have?", ["Two", "Four", "Six"]),
    mc("When can the caller see the flat?", ["Tomorrow at four", "Today at four", "Tomorrow at six"]),
    fill("The flat has a small ___.", "garden"),
  ]),
];
