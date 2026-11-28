import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import { ZCODE_PROVIDERS } from "@/shared/constants/zcodeProviders";
import { mergeProviderLimitsCacheEntry } from "./providerLimitsCache";

/**
 * Merge a fresh usage readback into the cached entry. ZCode readbacks that carry
 * quota groups, or an availability message without quotas, replace the cache
 * outright so stale account/plan results are never retained.
 */
export function mergeZcodeUsageCache(
  provider: string,
  next: ProviderLimitsCacheEntry,
  previous: ProviderLimitsCacheEntry | null | undefined
): ProviderLimitsCacheEntry {
  // Never retain stale account/plan results after an unavailable readback.
  if (
    ZCODE_PROVIDERS.has(provider) &&
    (Array.isArray(next.quotaGroups) || (next.message && !next.quotas))
  )
    return next;
  return mergeProviderLimitsCacheEntry(provider, next, previous);
}
