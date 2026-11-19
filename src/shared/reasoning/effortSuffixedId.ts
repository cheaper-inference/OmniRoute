import { CANONICAL_EFFORT_VALUES } from "./effortStandardization";

const longestFirst = (values: readonly string[]): readonly string[] =>
  [...values].sort((a, b) => b.length - a.length);

/** Longest first so `-xhigh` is not read as `-high`. */
const EFFORT_SUFFIXES_LONGEST_FIRST = longestFirst(CANONICAL_EFFORT_VALUES);

/**
 * Suffixes that mark a catalog alias row. `minimal` is not a canonical request effort, but
 * providers that offer it (Muse) list `<base>-minimal` aliases next to the base id.
 */
const ALIAS_EFFORT_SUFFIXES_LONGEST_FIRST = longestFirst([...CANONICAL_EFFORT_VALUES, "minimal"]);

function stripEffortSuffix(id: string, suffixes: readonly string[]): string | null {
  for (const value of suffixes) {
    const suffix = `-${value}`;
    if (id.endsWith(suffix) && id.length > suffix.length) return id.slice(0, -suffix.length);
  }
  return null;
}

/** The id without its trailing canonical `-<effort>` token, or null when it has none. */
export function canonicalEffortSuffixStem(id: string): string | null {
  return stripEffortSuffix(id, EFFORT_SUFFIXES_LONGEST_FIRST);
}

const CODEX_ID_PREFIX = /^(?:codex|cx)\//;
const CODEX_ULTRA_SUFFIX = "-ultra";

/**
 * `-ultra` is not a canonical effort, but the Codex executor reads `<base>-ultra` as the ultra
 * tier of its base model, and that suffix wins over a client effort. Only Codex ids count
 * (the same rule `shouldExposeSyncedEffortVariants` applies), so a non-Codex id such as
 * `nemotron-3-ultra` keeps its ladder. This module stays inside `src/shared` on purpose: the
 * CLI imports it from a tsconfig-less install (#7682), so it cannot reach the executor's set.
 */
function codexUltraAliasStem(id: string): string | null {
  if (!CODEX_ID_PREFIX.test(id) || !id.endsWith(CODEX_ULTRA_SUFFIX)) return null;
  const stem = id.slice(0, -CODEX_ULTRA_SUFFIX.length);
  return stem.length > 0 ? stem : null;
}

/**
 * Whether `id` is an effort-suffixed variant (`cc/claude-opus-5-5-low`,
 * `mc/muse-ember-1.0-minimal`, `cx/gpt-6-sol-ultra`) of another id in `listedIds`. Its effort
 * is fixed by the id, so a reasoning-level ladder on it would be misleading: an explicit client
 * effort wins over the suffix.
 */
export function isEffortSuffixedVariantOfListedId(
  id: string,
  listedIds: ReadonlySet<unknown>
): boolean {
  const stem =
    stripEffortSuffix(id, ALIAS_EFFORT_SUFFIXES_LONGEST_FIRST) ?? codexUltraAliasStem(id);
  return stem !== null && listedIds.has(stem);
}
