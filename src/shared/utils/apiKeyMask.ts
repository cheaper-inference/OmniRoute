/**
 * Masking of stored upstream API keys for API responses, plus the inverse step the
 * update route needs when a client echoes a masked list back.
 *
 * Pure (no DB, no env): `src/lib/apiKeyExposure.ts` re-exports `maskStoredApiKey` so the
 * routes and the response sanitizer (imported by a client component) share ONE
 * implementation.
 */

const MASK = "****";
/** `<first 8>****<last 4>` — the shape `maskStoredApiKey` produces. */
const MASKED_SHAPE = /^[^*]{0,8}\*{4}[^*]{0,4}$/;

export function maskStoredApiKey(key: unknown): string | null {
  if (typeof key !== "string") return null;
  return key.slice(0, 8) + MASK + key.slice(-4);
}

/** True when `value` has the shape of a mask produced by `maskStoredApiKey`. */
export function looksLikeMaskedApiKey(value: unknown): boolean {
  return typeof value === "string" && MASKED_SHAPE.test(value);
}

/**
 * Resolve the `extraApiKeys` list a client sends on update against the list currently
 * stored. The GET routes hand the client masked placeholders; the edit modal sends that
 * list back as-is (plus any key the operator added, minus any it removed). A placeholder
 * is replaced by the stored token it masks (same position first, then any unused match);
 * a placeholder matching no stored token is dropped so it never reaches the database;
 * plaintext entries are kept; duplicates collapse to one entry.
 *
 * Non-array input is returned unchanged so the caller's normalizer decides what to do.
 */
export function reconcileMaskedExtraApiKeys(incoming: unknown, stored: unknown): unknown {
  if (!Array.isArray(incoming)) return incoming;
  const storedKeys = Array.isArray(stored)
    ? stored.filter((k): k is string => typeof k === "string" && k.trim().length > 0)
    : [];
  const consumed = new Set<number>();
  const resolved: string[] = [];

  incoming.forEach((entry, index) => {
    if (typeof entry !== "string") return;
    if (!looksLikeMaskedApiKey(entry)) {
      resolved.push(entry);
      return;
    }
    const candidates = [index, ...storedKeys.map((_, i) => i)];
    const matchIndex = candidates.find(
      (i) => i < storedKeys.length && !consumed.has(i) && maskStoredApiKey(storedKeys[i]) === entry
    );
    if (matchIndex === undefined) return;
    consumed.add(matchIndex);
    resolved.push(storedKeys[matchIndex]);
  });

  return [...new Set(resolved)];
}
