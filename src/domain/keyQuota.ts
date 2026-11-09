/**
 * Domain Key Quota Enforcement (RIC-741 / M3 D5) — counter + threshold.
 *
 * A KISS circuit-breaker-style gate over the per-key tpm/rpm/monthly-amount
 * quota counters. Two entry points mirror the existing quota conventions:
 *
 *   - `checkKeyQuota(apiKeyId, deps)` — PRE-request gate. Returns an
 *     `{ allowed, reason }` verdict. Fail-open (B16): any infra error (DB not
 *     ready, migration missing) returns allowed so a quota hiccup never blocks
 *     legitimate traffic.
 *
 *   - `recordKeyQuotaUsage(apiKeyId, billableTokens, deps)` — POST-response
 *     increment of tpm (by tokens) + rpm (by 1 request). Fail-open (B29).
 *
 * The monthly amount dimension is read from the cost ledger (the ledger IS the
 * counter), so money is never double-tracked in two stores.
 *
 * @module domain/keyQuota
 */

import {
  getKeyQuotaLimits,
  getKeyQuotaStatus,
  incrementKeyQuotaCounter,
  loadUnpricedQuotaMonthStart,
  saveUnpricedQuotaMonthStart,
  type KeyQuotaStatus,
} from "@/lib/db/keyQuota";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KeyQuotaVerdict {
  allowed: boolean;
  reason: string | null;
  dimension: "tpm" | "rpm" | "monthly" | null;
  status?: KeyQuotaStatus;
}

export interface CheckKeyQuotaDeps {
  now?: () => number;
  monthTotalUsd?: number;
}

export interface RecordKeyQuotaDeps {
  now?: () => number;
}

// ---------------------------------------------------------------------------
// Pre-request gate
// ---------------------------------------------------------------------------

function verdict(
  allowed: boolean,
  dimension: KeyQuotaVerdict["dimension"],
  status: KeyQuotaStatus,
  reason?: string
): KeyQuotaVerdict {
  if (allowed) return { allowed: true, reason: null, dimension: null, status };
  const message =
    reason ||
    (dimension === "tpm"
      ? `Token-per-minute quota exceeded for this API key`
      : dimension === "rpm"
        ? `Request-per-minute quota exceeded for this API key`
        : `Monthly USD quota exceeded for this API key`);
  return { allowed: false, reason: message, dimension, status };
}

/**
 * PRE-request quota gate. Always fail-open (B16).
 */
export function checkKeyQuota(
  apiKeyId: string | null | undefined,
  deps: CheckKeyQuotaDeps = {}
): KeyQuotaVerdict {
  if (!apiKeyId) return { allowed: true, reason: null, dimension: null };
  try {
    // One clock sample for the counters, the window reset and the unpriced-month check.
    const nowMs = (deps.now ?? Date.now)();
    const status = getKeyQuotaStatus(apiKeyId, {
      ...deps,
      now: () => nowMs,
      enforcementOnly: true,
    });
    if (!status.enabled) return { allowed: true, reason: null, dimension: null, status };
    if (status.tpmExceeded) return verdict(false, "tpm", status);
    if (status.rpmExceeded) return verdict(false, "rpm", status);
    if (status.monthlyExceeded) return verdict(false, "monthly", status);
    if (isMonthClosedByUnpricedUsage(apiKeyId, status, nowMs)) {
      return verdict(
        false,
        "monthly",
        status,
        "Monthly USD quota cannot be enforced: a model without a price was used this month"
      );
    }
    return verdict(true, null, status);
  } catch {
    // B16 — fail-open: quota infra error must not block traffic.
    return { allowed: true, reason: null, dimension: null };
  }
}

/** Start (UTC ms) of the calendar month the monthly cap sums, as the ledger aggregate does. */
function monthStartMs(nowMs: number): number {
  const now = new Date(nowMs);
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
}

/**
 * A metered call the gateway could not price never reaches the ledger the
 * monthly cap sums, so it would pass the cap as $0. Like the dollar budget and
 * the usage limit (#12341), the cap fails closed for the rest of that month
 * unless USAGE_LIMIT_IGNORE_UNPRICED is on.
 */
function isMonthClosedByUnpricedUsage(
  apiKeyId: string,
  status: KeyQuotaStatus,
  nowMs: number
): boolean {
  if (status.limits.monthlyAmountUsd === null) return false;
  if (loadUnpricedQuotaMonthStart(apiKeyId) !== monthStartMs(nowMs)) return false;
  return !isFeatureFlagEnabled("USAGE_LIMIT_IGNORE_UNPRICED");
}

/**
 * Record that a completed call used a metered model whose cost could not be
 * priced. A key with a monthly cap then fails closed until the month ends or the
 * operator saves the quota again; a key without one is unaffected. Never throws.
 */
export function recordUnpricedKeyQuotaUsage(
  apiKeyId: string | null | undefined,
  details: { provider?: string | null; model?: string | null } = {},
  deps: RecordKeyQuotaDeps = {}
): void {
  if (!apiKeyId) return;
  try {
    if (getKeyQuotaLimits(apiKeyId).monthlyAmountUsd === null) return;
    const monthStart = monthStartMs((deps.now ?? Date.now)());
    if (loadUnpricedQuotaMonthStart(apiKeyId) === monthStart) return;
    saveUnpricedQuotaMonthStart(apiKeyId, monthStart);
    console.warn(
      `[KeyQuotaWarning] ${apiKeyId} used ${details.provider || "?"}/${details.model || "?"}, which has no price — its monthly USD quota fails closed until the month ends unless USAGE_LIMIT_IGNORE_UNPRICED is on (#12341)`
    );
  } catch {
    // B29 — quota bookkeeping never propagates.
  }
}

/**
 * POST-response consumption recorder. Fire-and-forget (B29): increments tpm by
 * billable tokens and rpm by 1. Never throws to the caller.
 */
export function recordKeyQuotaUsage(
  apiKeyId: string | null | undefined,
  billableTokens: number,
  deps: RecordKeyQuotaDeps = {}
): void {
  if (!apiKeyId) return;
  const nowMs = (deps.now ?? Date.now)();
  try {
    if (billableTokens > 0) incrementKeyQuotaCounter(apiKeyId, "tpm", billableTokens, nowMs);
    incrementKeyQuotaCounter(apiKeyId, "rpm", 1, nowMs);
  } catch {
    // B29 — drift acceptable; never propagate.
  }
}

export { loadUnpricedQuotaMonthStart };
export type { KeyQuotaStatus };
