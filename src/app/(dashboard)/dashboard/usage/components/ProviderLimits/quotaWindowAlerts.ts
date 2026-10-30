/**
 * quotaWindowAlerts.ts — client-side alerts for quota windows and expiring
 * reset credits.
 *
 * Design notes (see the PR body):
 * - Pure functions, no React, no store access. The caller owns persistence and
 *   the toast channel, so every branch here is unit-testable.
 * - Edge-triggered, not level-triggered. A window that sits below the threshold
 *   for hours must produce ONE alert, not one per poll — that is what the
 *   `seen` latch is for. The latch clears when the window recovers, so a later
 *   drop alerts again.
 * - Latch state is a plain serialisable object: the caller persists it in
 *   `key_value` (client dedupe survives a reload) or keeps it in a ref.
 * - Nothing here fires when the feature is disabled (default) — the caller
 *   passes `{ enabled }` and this returns no alerts.
 */

const CRITICAL_REMAINING_PERCENT = 15;
const WARNING_REMAINING_PERCENT = 35;
/** How close to expiry a reset credit must be before we nag about it. */
export const RESET_CREDIT_REMINDER_HORIZON_HOURS = 24;

export type QuotaAlertSeverity = "critical" | "warning";
export type QuotaAlertKind = "below_threshold" | "reset_credit_expiring";

export interface QuotaWindowAlert {
  key: string;
  kind: QuotaAlertKind;
  severity: QuotaAlertSeverity;
  connectionId: string;
  windowName: string;
  remainingPercentage?: number;
  creditId?: string;
  expiresAt?: string;
}

/**
 * Latch map: alert key → the remaining percentage that produced the alert.
 * Serialisable on purpose (persisted straight into `key_value`).
 */
export type QuotaAlertLatch = Record<string, number>;

export interface QuotaAlertOptions {
  enabled?: boolean;
  /** Only these providers are evaluated. Empty/absent = all. */
  providers?: readonly string[];
}

interface QuotaLike {
  name?: unknown;
  remainingPercentage?: unknown;
  staleAfterReset?: unknown;
  isResetCredits?: unknown;
  isCredits?: unknown;
  unlimited?: unknown;
}

interface ConnectionSnapshot {
  provider?: string;
  quotas?: QuotaLike[];
}

function severityFor(remaining: number): QuotaAlertSeverity {
  return remaining <= CRITICAL_REMAINING_PERCENT ? "critical" : "warning";
}

/**
 * A quota row is a *window* only when it reports a real percentage AND is not
 * a credit balance, an unlimited bucket, or a window already past its reset
 * (which `quotaParsing` zeroes out — alerting on that would page the operator
 * about a window that just rolled over).
 */
function isAlertableWindow(quota: QuotaLike): number | null {
  if (!quota || typeof quota !== "object") return null;
  if (quota.isResetCredits === true || quota.isCredits === true) return null;
  if (quota.unlimited === true) return null;
  if (quota.staleAfterReset === true) return null;

  const remaining = Number(quota.remainingPercentage);
  if (!Number.isFinite(remaining)) return null;
  return remaining;
}

function thresholdFor(remaining: number): number {
  return remaining <= CRITICAL_REMAINING_PERCENT
    ? CRITICAL_REMAINING_PERCENT
    : WARNING_REMAINING_PERCENT;
}

/**
 * Compare the current quota snapshot against the latch and return only the
 * NEW alerts. Mutates `latch` in place (it is the caller's persistence buffer).
 */
export function collectQuotaWindowAlerts(
  snapshot: Record<string, ConnectionSnapshot>,
  latch: QuotaAlertLatch,
  options: QuotaAlertOptions = {}
): QuotaWindowAlert[] {
  if (options.enabled === false) return [];

  const alerts: QuotaWindowAlert[] = [];
  const allowedProviders = options.providers?.length ? new Set(options.providers) : null;

  for (const [connectionId, connection] of Object.entries(snapshot ?? {})) {
    if (!connection) continue;
    if (allowedProviders && !allowedProviders.has(String(connection.provider ?? ""))) continue;

    for (const quota of connection.quotas ?? []) {
      const remaining = isAlertableWindow(quota);
      if (remaining === null) continue;

      const windowName = String(quota.name ?? "");
      if (!windowName) continue;

      const key = `${connectionId}:${windowName}`;
      const threshold = thresholdFor(remaining);
      const belowThreshold = remaining <= threshold;
      const latched = Object.prototype.hasOwnProperty.call(latch, key);

      if (!belowThreshold) {
        // Recovery clears the latch so a later drop can alert again.
        if (latched) delete latch[key];
        continue;
      }

      // Already alerted for this window: stay quiet until it recovers.
      if (latched) continue;

      latch[key] = remaining;
      alerts.push({
        key,
        kind: "below_threshold",
        severity: severityFor(remaining),
        connectionId,
        windowName,
        remainingPercentage: remaining,
      });
    }
  }

  return alerts;
}

export interface ResetCreditLike {
  creditId?: unknown;
  expiresAt?: unknown;
}

/**
 * Remind the operator about reset credits that expire soon, once per credit.
 * The latch stores the credit's expiry timestamp so a re-issued credit with the
 * same id (different expiry) is treated as new.
 */
export function collectResetCreditExpiryAlerts(
  creditsByConnection: Record<string, ResetCreditLike[]>,
  latch: QuotaAlertLatch,
  options: QuotaAlertOptions & { now?: () => number } = {}
): QuotaWindowAlert[] {
  if (options.enabled === false) return [];

  const now = options.now ?? Date.now;
  const nowMs = now();
  const horizonMs = RESET_CREDIT_REMINDER_HORIZON_HOURS * 3_600_000;
  const alerts: QuotaWindowAlert[] = [];

  for (const [connectionId, credits] of Object.entries(creditsByConnection ?? {})) {
    for (const credit of credits ?? []) {
      const creditId = String(credit?.creditId ?? "").trim();
      const expiresAt = typeof credit?.expiresAt === "string" ? credit.expiresAt : null;
      if (!creditId || !expiresAt) continue;

      const expiresAtMs = Date.parse(expiresAt);
      if (!Number.isFinite(expiresAtMs)) continue;

      const remainingMs = expiresAtMs - nowMs;
      // Already expired: nothing to save.
      if (remainingMs <= 0) continue;
      if (remainingMs > horizonMs) continue;

      const key = `${connectionId}:credit:${creditId}`;
      if (Object.prototype.hasOwnProperty.call(latch, key)) continue;

      latch[key] = expiresAtMs;
      alerts.push({
        key,
        kind: "reset_credit_expiring",
        severity: "warning",
        connectionId,
        windowName: "banked_reset_credits",
        creditId,
        expiresAt,
      });
    }
  }

  return alerts;
}

/** Drop latch entries for connections/credits that are no longer present. */
export function pruneQuotaAlertLatch(latch: QuotaAlertLatch, liveKeys: Set<string>): void {
  for (const key of Object.keys(latch)) {
    if (!liveKeys.has(key)) delete latch[key];
  }
}

export const QUOTA_ALERT_THRESHOLDS = {
  critical: CRITICAL_REMAINING_PERCENT,
  warning: WARNING_REMAINING_PERCENT,
} as const;
