/**
 * Operator-defined provider order for the Quota Tracker (usage dashboard).
 *
 * Stored as `settings.quotaProviderOrder` (an array of provider ids) and used
 * only to place provider groups on screen. It never touches
 * `provider_connections.priority`, which picks the account that serves traffic.
 *
 * An empty order leaves the built-in `PROVIDER_ORDER` ranking untouched, so the
 * default layout stays exactly what it was before this setting existed.
 */

export const QUOTA_PROVIDER_ORDER_MAX_ENTRIES = 200;
export const QUOTA_PROVIDER_ID_MAX_LENGTH = 64;

/**
 * Normalize a stored/received order into a clean list of provider ids:
 * strings only, trimmed, non-empty, at most 64 chars, de-duplicated (first
 * wins) and capped at 200 entries. Anything that is not an array yields [].
 */
export function sanitizeQuotaProviderOrder(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const entry of raw) {
    if (typeof entry !== "string") continue;
    const id = entry.trim();
    if (!id || id.length > QUOTA_PROVIDER_ID_MAX_LENGTH || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= QUOTA_PROVIDER_ORDER_MAX_ENTRIES) break;
  }
  return out;
}

/**
 * Build the provider rank map consumed by `compareQuotaConnections` /
 * `compareProviderGroups`.
 *
 * - Empty/invalid custom order → `baseOrder` itself (same reference).
 * - Otherwise the listed providers rank first, in the saved order. Their ranks
 *   sit below every built-in rank (built-in ranks start at 1), so providers
 *   missing from the saved order — e.g. one connected after the operator last
 *   dragged — keep their built-in relative order after the listed ones, and
 *   providers with no built-in rank still fall to the comparator's fallback.
 */
export function buildProviderRankMap(
  customOrder: unknown,
  baseOrder: Record<string, number>
): Record<string, number> {
  const order = sanitizeQuotaProviderOrder(customOrder);
  if (order.length === 0) return baseOrder;
  const start = Math.min(1, ...Object.values(baseOrder)) - order.length - 1;
  const ranks: Record<string, number> = { ...baseOrder };
  order.forEach((provider, index) => {
    ranks[provider] = start + index;
  });
  return ranks;
}

/** Distinct provider ids in first-seen order (the visible group sequence). */
export function providerSequence(connections: ReadonlyArray<{ provider?: unknown }>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const conn of connections) {
    const provider = conn?.provider;
    if (typeof provider !== "string" || !provider || seen.has(provider)) continue;
    seen.add(provider);
    out.push(provider);
  }
  return out;
}

/**
 * Move a whole provider block to the slot of another provider (arrayMove
 * semantics on the provider sequence). Returns the input array unchanged (same
 * reference) when the move is a no-op — same provider, or either id unknown —
 * so callers can skip persisting.
 */
export function moveProviderBlock(
  sequence: string[],
  fromProvider: string,
  toProvider: string
): string[] {
  if (fromProvider === toProvider) return sequence;
  const from = sequence.indexOf(fromProvider);
  const to = sequence.indexOf(toProvider);
  if (from === -1 || to === -1) return sequence;
  const next = [...sequence];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}
