/**
 * Returns the first candidate that is a finite number >= 0 (so an explicit `0`
 * is kept), or `undefined` when no candidate carries a counter. Lets translators
 * tell "upstream reported 0" apart from "upstream sent nothing" (#20493).
 */
export function firstReportedCounter(...candidates: unknown[]): number | undefined {
  for (const value of candidates) {
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) return value;
  }
  return undefined;
}
