/**
 * Operator-defined provider order for the Quota Tracker (usage dashboard).
 *
 * Stored server-side as `settings.quotaProviderOrder` (an array of provider
 * ids) so the order follows the operator across browsers and devices. It is
 * used only to place provider groups on screen and never touches
 * `provider_connections.priority`, which picks the account that serves traffic.
 *
 * An empty order means "no server-side order": the dashboard keeps its
 * localStorage order (or the built-in `PROVIDER_ORDER`).
 */

export const QUOTA_PROVIDER_ORDER_MAX_ENTRIES = 200;
export const QUOTA_PROVIDER_ID_MAX_LENGTH = 64;

/**
 * Normalize a stored/received order into a clean list of provider ids:
 * strings only, trimmed, non-empty, at most 64 chars, de-duplicated (first
 * wins) and capped at 200 entries. Anything that is not an array yields [].
 * The bounds match the `quotaProviderOrder` key of `updateSettingsSchema`.
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
