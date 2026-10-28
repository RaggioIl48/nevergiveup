import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { bank, EXAMS, DIFFICULTY, composeExam, checkAnswer, scoreExam } from "../content/exams.js";
import { evaluateSpeaking } from "../content/speaking-eval.js";

const strip = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();

test("bank is large, unique and well-formed", () => {
  assert.ok(bank.length >= 150, `bank has ${bank.length}`);
  assert.equal(new Set(bank.map((t) => t.id)).size, bank.length);
  for (const t of bank) {
    assert.ok(["A2", "B1", "B2", "B2+"].includes(t.level), `${t.id} level`);
    assert.ok(t.questions.length >= 2, `${t.id} questions`);
    if (t.real) assert.ok(fs.existsSync(`public${t.audio}`), `${t.id} audio file`);
    else assert.ok(t.script?.length && t.script.every((s) => ["A", "B"].includes(s.who) && s.text.trim()), `${t.id} script`);
    for (const q of t.questions) {
      if (q.type === "mc") {
        assert.ok([3, 4].includes(q.options.length), `${t.id} options`);
        assert.equal(new Set(q.options).size, q.options.length, `${t.id} duplicate options`);
        assert.ok(q.a >= 0 && q.a < q.options.length);
      } else {
        assert.equal(q.type, "fill");
        assert.ok(q.q.includes("___"), `${t.id} fill needs a blank`);
        assert.ok(` ${strip(t.text)} `.includes(` ${strip(q.answer)} `), `${t.id} answer "${q.answer}" not in audio text`);
      }
    }
  }
});

test("every exam can be composed at every difficulty and avoids seen tasks", () => {
  for (const id of Object.keys(EXAMS)) {
    for (const d of Object.keys(DIFFICULTY)) {
      const { tasks } = composeExam(id, d);
      assert.equal(tasks.length, EXAMS[id].sections.length);
      assert.equal(new Set(tasks.map((x) => x.task.id)).size, tasks.length);
    }
  }
  const first = composeExam("toefl", "B2").tasks.map((x) => x.task.id);
  const second = composeExam("toefl", "B2", first).tasks.map((x) => x.task.id);
  assert.equal(second.filter((id) => first.includes(id)).length, 0);
});

test("checkAnswer and scoreExam", () => {
  assert.ok(checkAnswer({ type: "mc", a: 2 }, 2));
  assert.ok(!checkAnswer({ type: "mc", a: 2 }, undefined));
  assert.ok(checkAnswer({ type: "fill", answer: "Library", alts: ["the library"] }, " the Library! "));
  assert.ok(!checkAnswer({ type: "fill", answer: "library" }, ""));
  assert.deepEqual(scoreExam(30, 30), { pct: 100, toefl: 30, ielts: 9, level: "Strong" });
  assert.equal(scoreExam(0, 20).ielts, 3.5);
});

test("local speaking estimate never rewards a long off-topic answer or reaches B2", () => {
  const q = "Describe a person who has influenced you and explain why this person is important to you.";
  const off = "yesterday I go to the market and I buy many tomatoes because the tomatoes is very cheap and then I come back to my house and I cook the food and after that I watch television and I sleep early because I am tired and the weather is hot in my city and I like the summer because I can go to the beach with my friends and we eat ice cream and we play football and it was very good day for me";
  const r = evaluateSpeaking(off, { seconds: 45, expected: 80, promptText: q });
  assert.ok(r.overall <= 1.5, `off-topic scored ${r.overall}`);
  const on = evaluateSpeaking("A person who has influenced me is my grandmother because she taught me that hard work matters. For example, she sold vegetables so I could study. However, she was always happy, and this person is important to me because she never gave up. In my opinion everybody needs somebody like her, and that is why I admire her influence so much in my life.", { seconds: 45, expected: 80, promptText: q });
  assert.ok(on.overall <= 3.2 && on.level !== "B2");
});

test("evaluateSpeaking rewards a developed answer over a short one", () => {
  const prompt = "Do you think technology makes people more or less social?";
  const good = "I think technology makes people more social, because we can talk to friends anywhere. For example, my cousin lives abroad and we video call every week. However, some people spend too much time on their phones, so they ignore the people around them. In my opinion, the result depends on how we use these tools, and therefore we should set limits. As a result, technology can bring us closer.";
  const a = evaluateSpeaking(good, { seconds: 40, expected: 80, promptText: prompt });
  const b = evaluateSpeaking("technology is good um like good um yes technology", { seconds: 40, expected: 80, promptText: prompt });
  assert.ok(a.overall > b.overall, `${a.overall} vs ${b.overall}`);
  assert.ok(a.overall >= 2.5 && a.overall <= 4);
  assert.equal(evaluateSpeaking("hello", { seconds: 30 }).scores, null);
});
