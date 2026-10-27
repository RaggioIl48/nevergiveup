import { units, lessonOrder } from "./units.js";
import { diagnostic } from "./diagnostic.js";

const hash = (s) => [...s].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);

// Authored with varied answer positions unevenly; rotate options deterministically so the key isn't guessable.
const rotateOptions = (ex) => {
  if (!Array.isArray(ex.options) || typeof ex.a !== "number" || ex.kind === "match") return;
  const n = ex.options.length;
  const k = hash(ex.id) % n;
  ex.options = ex.options.map((_, j) => ex.options[(j - k + n) % n]);
  ex.a = (ex.a + k) % n;
};
for (const unit of units) for (const lesson of unit.lessons) lesson.exercises.forEach(rotateOptions);
diagnostic.forEach(rotateOptions);

export const itemIndex = new Map();
for (const unit of units) for (const lesson of unit.lessons) for (const ex of lesson.exercises) itemIndex.set(ex.id, ex);
for (const ex of diagnostic) itemIndex.set(ex.id, ex);

export const lessonIndex = new Map();
for (const unit of units) for (const lesson of unit.lessons) lessonIndex.set(lesson.id, { ...lesson, unitId: unit.id });

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const firstLessonIndex = (level) => {
  const unit = units.find((u) => u.level === level);
  return unit ? lessonOrder.indexOf(unit.lessons[0].id) : 0;
};

const firstB1 = firstLessonIndex("B1");
const firstB2 = firstLessonIndex("B2");

export const START_INDEX = {
  A2: firstLessonIndex("A2"),
  B1: firstB1,
  "B1+": firstB1 + 3,
  B2: firstB2,
  "B2+": firstB2 + 3,
};

export { units, lessonOrder, diagnostic };
