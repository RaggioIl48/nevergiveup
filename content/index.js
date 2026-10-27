import { units, lessonOrder } from "./units.js";
import { diagnostic } from "./diagnostic.js";

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

export { units, lessonOrder, diagnostic };
