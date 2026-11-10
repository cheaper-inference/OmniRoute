import type { QuotaCacheEntry, QuotaInfo } from "@/domain/quotaCacheState";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";

/** Only the caller's private read view is reconciled. Live routing state is never changed. */
export function reconcileDisplayWindows(
  cached: QuotaCacheEntry | null,
  usage: Partial<ProviderLimitsCacheEntry>,
  normalized: Record<string, QuotaInfo>,
  fetchedAt: number
): Record<string, QuotaInfo> | null {
  if (!cached) return normalized;
  let changed = false;
  const quotas = { ...cached.quotas };
  for (const [name, window] of Object.entries(normalized)) {
    const raw = usage.quotas?.[name] as { observedAt?: string } | undefined;
    const observed = Date.parse(raw?.observedAt || "") || fetchedAt;
    const prior = cached.quotas[name]?.observedAt ?? cached.fetchedAt;
    if (observed > Date.now() || observed <= prior) continue;
    quotas[name] = { ...window, observedAt: observed };
    changed = true;
  }
  for (const name of Object.keys(quotas)) {
    if (
      Object.hasOwn(normalized, name) ||
      fetchedAt <= (quotas[name].observedAt ?? cached.fetchedAt)
    )
      continue;
    delete quotas[name];
    changed = true;
  }
  return changed ? quotas : null;
}
