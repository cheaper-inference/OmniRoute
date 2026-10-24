/**
 * QUAL-05 — canonical record coercion helpers.
 *
 * The codebase carries ~300 private copies of these three helpers with three
 * divergent semantics that MUST stay distinguishable after consolidation:
 *
 *  - null-fallback (`asRecordOrNull`): returns null for non-records. Callers
 *    branch on the null to detect "field absent/malformed" — blind swapping
 *    with the {}-variant crashes on property access or silently fabricates
 *    empty objects.
 *  - {}-fallback (`asRecord`): returns {} for non-records. Callers index
 *    straight into the result. Preserves array-exclusion (the dominant
 *    variant, 91 of 94 copies) AND array-inclusion (4 copies) via the
 *    `allowArrays` flag — defaulting to the strict, array-excluding form.
 *  - boolean guard (`isRecord`): type predicate. Array-excluding by default;
 *    the 4 array-including copies (tinycmsDomMocks, minimaxMusic,
 *    deepinfraHandler, blockedHistory) keep local semantics deliberately —
 *    they treat JSON arrays as record-ish containers. Do NOT migrate them.
 *
 * Type aliases (`JsonRecord`) resolve to `Record<string, unknown>`; both
 * spellings appear across the codebase and are structurally identical.
 */

export type JsonRecord = Record<string, unknown>;

/** Record guard. Arrays excluded by default (76 of 81 local copies). */
export function isRecord(
  value: unknown,
  options?: { allowArrays?: boolean }
): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  return options?.allowArrays === true ? true : !Array.isArray(value);
}

/** Coerce to a record or null. For callers that must detect malformed data. */
export function asRecordOrNull(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Coerce to a record or {}. Arrays excluded unless `allowArrays` is set —
 * mirrors the 91-copy dominant local variant; the 4 array-inclusive callers
 * stay on their local helper.
 */
export function asRecord(
  value: unknown,
  options?: { allowArrays?: boolean }
): Record<string, unknown> {
  if (typeof value !== "object" || value === null) return {};
  if (options?.allowArrays !== true && Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}
