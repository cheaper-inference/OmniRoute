// scripts/check/check-substrate-invariants.ts
// TypeScript substrate loaded via `node --import tsx/esm`. Discovers at runtime
// the codepoints that trim() considers whitespace — no hardcoded list.
// The .mjs detector keeps its own copy so it stays runnable under bare node --test.

export function isWhitespace(cp: number): boolean {
  return String.fromCharCode(cp).trim() === "";
}

export function whitespaceTrimSet(): Set<number> {
  const whitespaces = new Set<number>();
  for (let cp = 0; cp <= 0xffff; cp++) if (isWhitespace(cp)) whitespaces.add(cp);
  return whitespaces;
}
