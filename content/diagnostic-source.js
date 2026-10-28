// Adaptive staircase: harder after a hit, easier after a miss. Questions are drawn at random from the bank.
export function diagnosticSource(pool, total, rand = Math.random) {
  const used = new Set();
  const results = [];
  let level = 2;
  let lastSkill = null;
  const pick = () => {
    for (const delta of [0, 1, -1, 2, -2, 3, -3, 4, -4]) {
      const candidates = pool.filter((x) => x.lvl === level + delta && !used.has(x.id));
      if (candidates.length) {
        const varied = candidates.filter((c) => c.skill !== lastSkill);
        const from = varied.length ? varied : candidates;
        return from[Math.floor(rand() * from.length)];
      }
    }
    return null;
  };
  const take = () => {
    if (results.length >= total) return null;
    const ex = pick();
    if (ex) { used.add(ex.id); lastSkill = ex.skill; }
    return ex;
  };
  return {
    results: () => results,
    record(ex, ok) {
      results.push({ id: ex.id, ok });
      level = Math.max(1, Math.min(5, level + (ok ? 1 : -1)));
    },
    next: take,
    progress: () => results.length / total,
  };
}
