/**
 * Release the LOCAL quota cooldown left behind by a 429 once the operator has redeemed a
 * reset credit and upstream confirmed it.
 *
 * The usage poller never overrules a future cooldown (`maybeClearRecoveredQuotaState` treats
 * it as the 429 handler's hard statement), so without this step a redeemed account stayed
 * parked until the OLD window elapsed — days, for a weekly cap — even though its upstream
 * quota was already back. A redemption is an explicit operator action confirmed by a 2xx, so
 * it may lift that state, but only with positive evidence from the refreshed usage, and never
 * for terminal accounts (banned / expired / deactivated / credits_exhausted).
 */

import { getProviderConnectionById } from "@/lib/db/providers";
import { hasUsableQuota } from "@/lib/usage/providerLimits";
import { clearAccountError } from "@/sse/services/auth";
import { RateLimitReason } from "@omniroute/open-sse/config/constants.ts";
import {
  clearModelLock,
  getAllModelLockouts,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isCodexChildUnavailable } from "@omniroute/open-sse/services/codexAccount/index.ts";
import { PROVIDER_ERROR_TYPES } from "@omniroute/open-sse/services/errorClassifier.ts";

type JsonRecord = Record<string, unknown>;

const TERMINAL_STATUSES = new Set(["banned", "expired", "deactivated", "credits_exhausted"]);

// Lockout reasons a quota reset can actually cure. `not_found`, capacity and server errors
// are unrelated to the redeemed quota and must survive the redemption.
const QUOTA_LOCK_REASONS = new Set<string>([
  RateLimitReason.QUOTA_EXHAUSTED,
  RateLimitReason.RATE_LIMIT_EXCEEDED,
  RateLimitReason.UNKNOWN,
]);

const QUOTA_ERROR_TYPES = new Set<string>([
  PROVIDER_ERROR_TYPES.RATE_LIMITED,
  PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
]);

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** A refresh that failed (or returned no windows) is not evidence the quota came back. */
function hasRefreshedQuotas(usage: unknown): usage is JsonRecord {
  if (!isRecord(usage) || usage.message) return false;
  return isRecord(usage.quotas) && Object.keys(usage.quotas).length > 0;
}

async function loadReleasableConnection(connectionId: string): Promise<JsonRecord | null> {
  const connection = (await getProviderConnectionById(connectionId)) as JsonRecord | null;
  if (!connection) return null;
  const testStatus = String(connection.testStatus ?? "")
    .trim()
    .toLowerCase();
  return TERMINAL_STATUSES.has(testStatus) ? null : connection;
}

function clearQuotaLockouts(connectionId: string, stillCooling: (model: string) => boolean) {
  let cleared = 0;
  for (const lockout of getAllModelLockouts()) {
    if (lockout.connectionId !== connectionId) continue;
    if (!QUOTA_LOCK_REASONS.has(lockout.reason)) continue;
    if (stillCooling(lockout.model)) continue;
    if (clearModelLock(lockout.provider, connectionId, lockout.model)) cleared += 1;
  }
  return cleared;
}

/**
 * Codex keeps its quota cooldown per virtual child (codex / spark) in providerSpecificData,
 * and the refreshed usage already releases a scope whose windows recovered (#12951). The
 * in-memory model lockout written by the same 429 is released here for every scope that is
 * no longer cooling, so the account re-enters rotation right away.
 */
export async function releaseCodexCooldownAfterResetCredit(
  connectionId: string,
  usage: unknown
): Promise<number> {
  if (!hasRefreshedQuotas(usage)) return 0;
  const connection = await loadReleasableConnection(connectionId);
  if (!connection) return 0;
  return clearQuotaLockouts(connectionId, (model) =>
    isCodexChildUnavailable(connection as never, model)
  );
}

/**
 * Grok Build records its quota 429 at the connection level (`rateLimitedUntil`). Lift it, and
 * any quota model lockout, when the refreshed usage shows quota is available again.
 */
export async function releaseGrokCooldownAfterResetCredit(
  connectionId: string,
  usage: unknown
): Promise<boolean> {
  if (!hasRefreshedQuotas(usage) || !hasUsableQuota(usage)) return false;
  const connection = await loadReleasableConnection(connectionId);
  if (!connection) return false;
  clearQuotaLockouts(connectionId, () => false);
  const quotaCooldown =
    QUOTA_ERROR_TYPES.has(String(connection.lastErrorType ?? "")) ||
    Number(connection.errorCode) === 429;
  if (!quotaCooldown) return false;
  await clearAccountError(connectionId, connection);
  return true;
}
