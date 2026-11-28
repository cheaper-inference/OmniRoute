/**
 * `providerSpecificData` is an arbitrary JSON column, so a stored health map is untrusted: a
 * reader keeps only entries shaped like keys. The writer and the transaction must agree on this
 * shape, or one side persists what the other silently drops.
 */
export function keyHealthEntries<T extends object>(value: unknown): Record<string, T> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out: Record<string, T> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!/^(primary|extra_\d+)$/.test(key)) continue;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    out[key] = entry as T;
  }
  return out;
}
