import { CANONICAL_EFFORT_VALUES } from "./effortStandardization";

/** Longest first so `-xhigh` is not read as `-high`. */
const EFFORT_SUFFIXES_LONGEST_FIRST: readonly string[] = [...CANONICAL_EFFORT_VALUES].sort(
  (a, b) => b.length - a.length
);

/** The id without its trailing canonical `-<effort>` token, or null when it has none. */
export function canonicalEffortSuffixStem(id: string): string | null {
  for (const value of EFFORT_SUFFIXES_LONGEST_FIRST) {
    const suffix = `-${value}`;
    if (id.endsWith(suffix) && id.length > suffix.length) return id.slice(0, -suffix.length);
  }
  return null;
}

/**
 * Whether `id` is an effort-suffixed variant (`cc/claude-opus-5-5-low`) of another id in
 * `listedIds`. Its effort is fixed by the id, so a reasoning-level ladder on it would be
 * misleading: an explicit client effort wins over the suffix.
 */
export function isEffortSuffixedVariantOfListedId(
  id: string,
  listedIds: ReadonlySet<unknown>
): boolean {
  const stem = canonicalEffortSuffixStem(id);
  return stem !== null && listedIds.has(stem);
}
