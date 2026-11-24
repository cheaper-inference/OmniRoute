/**
 * Release the PERSISTED record of a quota-family lock (#20343).
 *
 * The in-memory lockout store is only half of a family lock: both family-scoped
 * providers also keep the deadline on the connection row, and the next credential
 * read rebuilds the lock from it.
 *
 *   - Antigravity/agy: `providerSpecificData.antigravityFamilyRateLimitedUntil[family]`,
 *     rehydrated by `rehydrateAntigravityFamilyLocksForConnections()` on every
 *     credential lookup (`src/sse/services/auth.ts`).
 *   - Codex: `providerSpecificData.codexScopeRateLimitedUntil[codex|spark]`, read by
 *     `isCodexChildUnavailable()` when the account pool is inspected.
 *
 * Clearing only the in-memory entry would therefore park the family again on the very
 * next request, and the early recovery a passing probe just proved would never reach
 * routing. Both writes are best-effort: a failure here must not turn a proven
 * recovery into an error, and it must never touch the connection's other models or
 * either provider's account-level state.
 */
import { clearAntigravityFamilyCooldown } from "@omniroute/open-sse/services/antigravityFamilyCooldown.ts";
import type { AntigravityQuotaFamily } from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import type { DailyRevalidationCandidate } from "@omniroute/open-sse/services/quotaDailyRevalidation.ts";

import { parseQuotaFamilyBucket } from "@/lib/credentialHealth/quotaProbeModelResolution";

export type QuotaProbeRecoveryLogger = { warn?: (msg: string) => void };

/**
 * Drop the saved family deadline this candidate recorded. A no-op for an `exact`
 * lock (its family record, if any, is shared by siblings and belongs to them) and
 * for any provider without a persisted family record.
 *
 * Returns whether a saved record was actually released.
 */
export async function releasePersistedFamilyLock(
  candidate: DailyRevalidationCandidate,
  logger: QuotaProbeRecoveryLogger = {}
): Promise<boolean> {
  if (candidate.scope !== "quota_family") return false;
  const bucket = parseQuotaFamilyBucket(candidate.provider, candidate.model);
  if (!bucket) return false;

  try {
    const { resolveProviderId } = await import("@/shared/constants/providers");
    const canonical = resolveProviderId(candidate.provider);
    if (canonical === "codex") {
      const { clearCodexAccountCooldown } = await import("@/lib/db/providers/codexAccountRecovery");
      const scope = bucket.family === "spark" ? "spark" : "codex";
      await clearCodexAccountCooldown(candidate.connectionId, scope);
      return true;
    }
    if (canonical === "antigravity" || canonical === "agy") {
      // The bucket already names the family; getAntigravityQuotaFamily() cannot be used
      // here because it classifies `family:claude` as "other".
      const family = bucket.family as AntigravityQuotaFamily;
      return await clearAntigravityFamilyCooldown(candidate.connectionId, family);
    }
  } catch (error) {
    // Best-effort: the in-memory lock is already gone, and a retry next sweep would
    // only spend another request against a model that just answered.
    logger.warn?.(
      `[quota-daily] ${candidate.provider}/${candidate.model} recovered but its saved family deadline could not be released: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
  return false;
}
