/**
 * Argon eligibility bookkeeping for Antigravity connections.
 *
 * An account whose quota summary reports no Argon pool must stop routing the models that
 * draw that pool — and only those. The first build of this logic also excluded `gemini-4*`,
 * which took the whole Gemini-4 fleet offline on No-Argon accounts that could still run it:
 * the upstream answered a `gemini-4-neon-high` request on such an account, while every
 * combo pointed at those accounts answered 503 with zero attempts.
 *
 * Scope: this guards the Argon weekly bucket, not every model the repo's quota classifier files
 * under "argon" — `getAntigravityQuotaFamily` returns "argon" for any `gemini-4*`, which is what
 * scopes quota windows and family cooldowns. The two are not the same question: a `hasArgon:
 * false` account answered a forced `gemini-4-neon-high` with HTTP 200 on this deployment, so the
 * family stays routable and only the bucket model set is withheld here.
 */

/**
 * Written onto an account whose quota summary reports no Argon pool.
 *
 * Only models that actually draw the Argon weekly bucket belong here.
 */
const AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS = ["*argon*"] as const;

/**
 * Written alongside `*argon*` by earlier builds. Kept in the strip set so an install that
 * already carries it recovers on the next eligibility sync instead of keeping the blanket
 * entry until an operator edits the connection by hand.
 */
const LEGACY_AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS: readonly string[] = ["gemini-4*"];

/** What an eligibility pass did, for the caller to log. */
export type ArgonEligibilityNotice =
  | "legacy-blanket-exclusion-removed"
  | "unreadable-exclusion-list-replaced"
  | "unreadable-exclusion-list-preserved";

/**
 * Patterns are compared case- and whitespace-insensitively: an older build or a hand edit may
 * have written `Gemini-4* `, and it must still be recognised as the managed entry.
 */
function normalizePattern(value: unknown): string | null {
  return typeof value === "string" ? value.trim().toLowerCase() : null;
}

function matchesPattern(value: unknown, pattern: string): boolean {
  return normalizePattern(value) === pattern.toLowerCase();
}

function matchesAny(value: unknown, patterns: readonly string[]): boolean {
  return patterns.some((pattern) => matchesPattern(value, pattern));
}

/**
 * Strip the patterns this module manages, keep everything else — including entries stored in
 * a shape other than a string.
 *
 * Neither managed pattern carries a provenance marker, so an operator who writes the exact
 * same string on an Argon-capable account loses it on the next eligibility sync: the stored
 * field cannot tell the two apart. Synchronising the guard is the job; recording authorship
 * would need a shape change to `providerSpecificData`.
 */
function withoutAutoManagedArgonPatterns(excluded: unknown[]): unknown[] {
  return excluded.filter(
    (entry) =>
      !matchesAny(entry, AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS) &&
      !matchesAny(entry, LEGACY_AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS)
  );
}

/**
 * Locate the stored exclusion list. Older records kept it under `excluded_models`; three readers
 * in this repo still honour that spelling, so a value found there must not be dropped on write.
 */
function storedExclusions(psd: Record<string, unknown>): { value: unknown; legacy: boolean } {
  if (psd.excludedModels !== undefined) return { value: psd.excludedModels, legacy: false };
  if (psd.excluded_models !== undefined) return { value: psd.excluded_models, legacy: true };
  return { value: undefined, legacy: false };
}

/** Write the list back under the canonical key and retire the legacy spelling. */
function writeExclusions(
  nextPsd: Record<string, unknown>,
  value: unknown[],
  legacy: boolean
): void {
  nextPsd.excludedModels = value;
  if (legacy) delete nextPsd.excluded_models;
}

/**
 * Read the stored exclusion list, keeping whatever the shape still means.
 *
 * A string is split on commas the way `normalizeExcludedModelPatterns` reads it, so a stored
 * `"a, b"` stays two patterns. Anything that cannot be read as a list at all (an object, a
 * number) yields `null`, which the ineligible path replaces with the guard: data that no
 * reader can interpret must not be the reason the Argon bucket stays open.
 */
function readExclusionList(value: unknown): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }
  if (value === undefined || value === null) return [];
  return null;
}

/**
 * Ineligible: flag the account and append the auto-managed Argon exclusions (keeps operator
 * ones).
 *
 * `nextPsd` must already be a copy of `psd`: only the keys this function changes are written.
 */
export function markArgonIneligible(
  psd: Record<string, unknown>,
  nextPsd: Record<string, unknown>,
  notices: ArgonEligibilityNotice[] = []
): boolean {
  let changed = false;
  if (psd.hasArgon !== false) {
    nextPsd.hasArgon = false;
    changed = true;
  }

  const stored = storedExclusions(psd);
  const readable = readExclusionList(stored.value);
  const existing: unknown[] = readable ?? [];
  // Only the legacy blanket entry comes out, and an auto-managed pattern already present in
  // any spelling counts as present: consumers trim each stored pattern before a
  // case-insensitive glob match, so a variant is not inert and does not need rewriting.
  const kept = existing.filter(
    (entry) => !matchesAny(entry, LEGACY_AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS)
  );
  const missing = AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS.filter(
    (pattern) => !kept.some((entry) => matchesPattern(entry, pattern))
  );
  if (readable === null) notices.push("unreadable-exclusion-list-replaced");
  if (kept.length !== existing.length) {
    notices.push("legacy-blanket-exclusion-removed");
  }
  if (readable === null || kept.length !== existing.length || missing.length > 0) {
    writeExclusions(nextPsd, [...kept, ...missing], stored.legacy);
    changed = true;
  }
  return changed;
}

/**
 * Eligible: flag the account and strip only the auto-managed Argon exclusions.
 *
 * `nextPsd` must already be a copy of `psd`: only the keys this function changes are written.
 */
export function markArgonEligible(
  psd: Record<string, unknown>,
  nextPsd: Record<string, unknown>,
  notices: ArgonEligibilityNotice[] = []
): boolean {
  let changed = false;
  if (psd.hasArgon !== true) {
    nextPsd.hasArgon = true;
    changed = true;
  }

  // Same reader as the ineligible path, so a guard stored in a shape other than a list is
  // still lifted when the account regains the Argon pool. A value nothing can interpret has
  // nothing to lift; it stays untouched, and the notice makes that visible instead of leaving
  // a corrupted field in place with no trace.
  const stored = storedExclusions(psd);
  const readable = readExclusionList(stored.value);
  if (readable === null) {
    notices.push("unreadable-exclusion-list-preserved");
    return changed;
  }
  const filtered = withoutAutoManagedArgonPatterns(readable);
  if (filtered.length !== readable.length) {
    writeExclusions(nextPsd, filtered, stored.legacy);
    changed = true;
    if (readable.some((entry) => matchesAny(entry, LEGACY_AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS))) {
      notices.push("legacy-blanket-exclusion-removed");
    }
  }
  return changed;
}

/**
 * Decide the eligibility update for one quota reading.
 *
 * A non-boolean reading changes nothing: only a real `hasArgon` value rewrites the list.
 */
export function applyAntigravityArgonEligibilityToPsd(
  psd: Record<string, unknown>,
  hasArgon: unknown
): { nextPsd: Record<string, unknown>; changed: boolean; notices: ArgonEligibilityNotice[] } {
  const nextPsd: Record<string, unknown> = { ...psd };
  const notices: ArgonEligibilityNotice[] = [];
  if (typeof hasArgon !== "boolean") return { nextPsd, changed: false, notices };
  const changed = hasArgon
    ? markArgonEligible(psd, nextPsd, notices)
    : markArgonIneligible(psd, nextPsd, notices);
  return { nextPsd, changed, notices };
}

/**
 * Log what an eligibility pass did, one line per notice, tagged with the connection.
 *
 * No de-duplication: a preserved unreadable value is reported on every pass, which is the
 * honest reading (the field is still corrupt). Suppressing repeats would need per-connection
 * state that outlives the condition, and a recycled connection id would inherit it.
 */
export function logArgonEligibilityNotices(
  connectionId: string,
  notices: readonly ArgonEligibilityNotice[]
): void {
  for (const notice of notices) {
    console.warn(
      `[ProviderLimits] Antigravity Argon eligibility for connection ${connectionId}: ${notice}`
    );
  }
}
