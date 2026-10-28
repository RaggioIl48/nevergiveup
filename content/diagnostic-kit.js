export const c = (lvl, skill, q, options, a, why) => ({ kind: "choice", lvl, skill, q, options, a, why });
export const r = (lvl, text, q, options, a, why) => ({ kind: "read", lvl, skill: "reading", text, q, options, a, why });
export const l = (lvl, say, q, options, a, why) => ({ kind: "listen", lvl, skill: "listening", say, q, options, a, why });
export const t = (lvl, skill, q, a, why) => ({ kind: "type", lvl, skill, q, a: [].concat(a), why });
export const f = (lvl, q, wrong, why) => {
  const a = q.split(/\s+/).indexOf(wrong);
  if (a < 0) throw new Error(`fix token not found: ${wrong} in ${q}`);
  return { kind: "fix", lvl, skill: "grammar", q, a, why };
};
