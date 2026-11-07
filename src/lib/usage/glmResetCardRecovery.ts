import { getProviderLimitsCache } from "@/lib/db/providerLimits";
import { getProviderConnectionById } from "@/lib/db/providers";
import { clearConnectionErrorIfUnchanged } from "@/lib/db/providers/rateLimit";
import type { GlmResetWindow } from "@omniroute/open-sse/services/usage/glmResetCards.ts";

type JsonRecord = Record<string, unknown>;

export interface GlmResetRecoveryState {
  testStatus: string;
  lastErrorAt: string;
  rateLimitedUntil: string;
  provider: string;
  lastError: unknown;
  lastErrorType: unknown;
  lastErrorSource: unknown;
  errorCode: unknown;
}

function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** Capture once, before the first wire attempt: an ambiguous retry must not adopt
 * a newer error as the one this card is allowed to clear. No credentials retained. */
export function captureGlmResetRecovery(
  connection: JsonRecord,
  resetType: GlmResetWindow
): GlmResetRecoveryState | null {
  const { provider, testStatus, lastErrorAt, rateLimitedUntil, lastErrorSource } = connection;
  // The generic chat 429 writer leaves provenance unset. Accept that legacy
  // shape only with the exhausted-window/reset-time evidence below; an explicit
  // non-upstream source must still never be cleared by a coding-plan card.
  if (
    !["glm", "glm-cn", "glmt", "zai"].includes(String(provider)) ||
    connection.isActive !== true ||
    testStatus !== "unavailable" ||
    (lastErrorSource != null && lastErrorSource !== "" && lastErrorSource !== "upstream") ||
    !["rate_limited", "quota_exhausted"].includes(String(connection.lastErrorType)) ||
    Number(connection.errorCode) !== 429 ||
    typeof lastErrorAt !== "string" ||
    typeof rateLimitedUntil !== "string"
  )
    return null;

  const now = Date.now();
  const errorAt = Date.parse(lastErrorAt);
  const until = Date.parse(rateLimitedUntil);
  if (!Number.isFinite(errorAt) || errorAt > now || !(until > now)) return null;

  const cached = getProviderLimitsCache(String(connection.id));
  const quota = record(cached?.quotas?.[resetType === "WEEK" ? "weekly" : "session"]);
  const fetchedAt = Date.parse(cached?.fetchedAt ?? "");
  const resetAt = Date.parse(String(quota.resetAt ?? ""));
  // A reset card does not cure arbitrary RPM/concurrency 429s. Bind the old
  // cooldown to the exhausted window this card actually resets (second precision).
  if (
    cached?.message ||
    !(fetchedAt >= errorAt && fetchedAt <= now) ||
    typeof quota.remainingPercentage !== "number" ||
    !Number.isFinite(quota.remainingPercentage) ||
    quota.remainingPercentage > 0 ||
    !Number.isFinite(resetAt) ||
    Math.abs(resetAt - until) > 1000
  )
    return null;

  return {
    provider: String(provider),
    testStatus,
    lastErrorAt,
    rateLimitedUntil,
    lastError: connection.lastError,
    lastErrorType: connection.lastErrorType,
    lastErrorSource: connection.lastErrorSource,
    errorCode: connection.errorCode,
  };
}

/** Only explicit, committed reset-card success may relax the future cooldown.
 * Ordinary quota polls deliberately keep their existing recovery policy. */
export async function recoverGlmResetCooldown(
  connectionId: string,
  expected: GlmResetRecoveryState | null | undefined,
  usage: JsonRecord
): Promise<boolean> {
  if (!expected || usage._stale || usage.message) return false;
  const quotas = record(usage.quotas);
  const hasCapacity = (quota: unknown) => {
    const remaining = record(quota).remainingPercentage;
    return typeof remaining === "number" && Number.isFinite(remaining) && remaining > 0;
  };
  if (!hasCapacity(quotas.session) || !hasCapacity(quotas.weekly)) return false;
  if (
    Object.values(quotas).some((quota) => {
      const remaining = record(quota).remainingPercentage;
      return typeof remaining === "number" && remaining <= 0;
    })
  )
    return false;

  const current = await getProviderConnectionById(connectionId);
  if (!current || current.isActive !== true) return false;
  for (const key of Object.keys(expected) as (keyof GlmResetRecoveryState)[]) {
    if (current[key] !== expected[key]) return false;
  }
  // Atomic compare-and-clear also fences errors arriving after the read above.
  // This helper invalidates the connection cache and proxy config generation.
  return clearConnectionErrorIfUnchanged(connectionId, expected);
}
