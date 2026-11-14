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
 * - One step up does alert again: a window latched at warning alerts once more
 *   when it reaches critical, then stays quiet.
 * - Latch state is a plain serialisable object: the caller persists it in
 *   `key_value` (client dedupe survives a reload) or keeps it in a ref.
 * - Nothing here fires when the feature is disabled (default) — the caller
 *   passes `{ enabled }` and this returns no alerts.
 */

import type { QuotaAlertLatch } from "@/shared/types/quotaAlerts";

export type { QuotaAlertLatch };

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
  /** The provider's own label for this window, when it reports one. */
  displayName?: string;
  remainingPercentage?: number;
  creditId?: string;
  expiresAt?: string;
}

export interface QuotaAlertOptions {
  enabled?: boolean;
  /** Only these providers are evaluated. Empty/absent = all. */
  providers?: readonly string[];
}

interface QuotaLike {
  name?: unknown;
  displayName?: unknown;
  used?: unknown;
  total?: unknown;
  creditCount?: unknown;
  remaining?: unknown;
  remainingPercentage?: unknown;
  staleAfterReset?: unknown;
  isResetCredits?: unknown;
  isCredits?: unknown;
  unlimited?: unknown;
}

export interface ConnectionSnapshot {
  provider?: string;
  quotas?: QuotaLike[];
}

function severityFor(remaining: number): QuotaAlertSeverity {
  return remaining <= CRITICAL_REMAINING_PERCENT ? "critical" : "warning";
}

/**
 * A quota row is a *window* only when a real percentage can be read from it AND
 * it is not a credit balance, an unlimited bucket, or a window already past its
 * reset (which `quotaParsing` zeroes out — alerting on that would page the
 * operator about a window that just rolled over).
 *
 * Not every provider sends `remainingPercentage`: Codex windows arrive as
 * `{ used, total: 100 }`, so the percentage is derived the same way the quota
 * cards derive it (`getQuotaRemainingPercentage`).
 */
function alertableRemainingPercent(quota: QuotaLike): number | null {
  if (!quota || typeof quota !== "object") return null;
  if (quota.isResetCredits === true || quota.isCredits === true) return null;
  if (quota.unlimited === true) return null;
  if (quota.staleAfterReset === true) return null;

  // Only a real number (or a non-blank numeric string) is a reported percentage.
  // `Number(null)`, `Number("")` and `Number("  ")` are all 0, which would read as a
  // fully exhausted window and latch a false critical alert (#18631 review).
  const reported = quota.remainingPercentage;
  if (typeof reported === "number") {
    return Number.isFinite(reported) ? reported : null;
  }
  if (typeof reported === "string" && reported.trim() !== "") {
    const parsed = Number(reported);
    return Number.isFinite(parsed) ? parsed : null;
  }

  const total = Number(quota.total);
  const used = Number(quota.used ?? 0);
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(used)) return null;
  return Math.max(0, Math.min(100, Math.round(((total - used) / total) * 100)));
}

function displayNameField(quota: QuotaLike): { displayName?: string } {
  return typeof quota.displayName === "string" && quota.displayName
    ? { displayName: quota.displayName }
    : {};
}

/**
 * One window against the latch: returns its NEW alert, or null when it is not a window,
 * is above the warning line (clearing its latch entry), or already alerted at this level.
 */
function evaluateQuotaWindow(
  connectionId: string,
  quota: QuotaLike,
  latch: QuotaAlertLatch
): QuotaWindowAlert | null {
  const remaining = alertableRemainingPercent(quota);
  if (remaining === null) return null;

  const windowName = String(quota.name ?? "");
  if (!windowName) return null;

  const key = `${connectionId}:${windowName}`;
  const latched = Object.prototype.hasOwnProperty.call(latch, key);

  if (remaining > WARNING_REMAINING_PERCENT) {
    // Recovery clears the latch so a later drop can alert again.
    if (latched) delete latch[key];
    return null;
  }

  const severity = severityFor(remaining);
  // Already alerted at this level: stay quiet until it recovers or gets worse.
  if (latched && (severity !== "critical" || severityFor(latch[key]) === "critical")) return null;

  latch[key] = remaining;
  return {
    key,
    kind: "below_threshold",
    severity,
    connectionId,
    windowName,
    ...displayNameField(quota),
    remainingPercentage: remaining,
  };
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
      const alert = evaluateQuotaWindow(connectionId, quota, latch);
      if (alert) alerts.push(alert);
    }
  }

  return alerts;
}

/**
 * `selectionToken` is what the credits list route returns; `creditId` stays accepted
 * for callers that already hold the id.
 */
export interface ResetCreditLike {
  selectionToken?: unknown;
  creditId?: unknown;
  expiresAt?: unknown;
}

/** The credit's id and parsed expiry, or null when either is missing or unreadable. */
function readResetCredit(
  credit: ResetCreditLike | null | undefined
): { creditId: string; expiresAt: string; expiresAtMs: number } | null {
  const creditId = String(credit?.selectionToken ?? credit?.creditId ?? "").trim();
  const expiresAt = typeof credit?.expiresAt === "string" ? credit.expiresAt : null;
  if (!creditId || !expiresAt) return null;

  const expiresAtMs = Date.parse(expiresAt);
  if (!Number.isFinite(expiresAtMs)) return null;
  return { creditId, expiresAt, expiresAtMs };
}

/** One credit against the latch: its NEW alert, or null when it is out of the horizon or latched. */
function evaluateResetCredit(
  connectionId: string,
  credit: ResetCreditLike | null | undefined,
  latch: QuotaAlertLatch,
  nowMs: number,
  horizonMs: number
): QuotaWindowAlert | null {
  const parsed = readResetCredit(credit);
  if (!parsed) return null;
  const { creditId, expiresAt, expiresAtMs } = parsed;

  const remainingMs = expiresAtMs - nowMs;
  // Already expired: nothing to save.
  if (remainingMs <= 0) return null;
  if (remainingMs > horizonMs) return null;

  const key = `${connectionId}:credit:${creditId}`;
  if (latch[key] === expiresAtMs) return null;

  latch[key] = expiresAtMs;
  return {
    key,
    kind: "reset_credit_expiring",
    severity: "warning",
    connectionId,
    windowName: "banked_reset_credits",
    creditId,
    expiresAt,
  };
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
      const alert = evaluateResetCredit(connectionId, credit, latch, nowMs, horizonMs);
      if (alert) alerts.push(alert);
    }
  }

  return alerts;
}

/**
 * Keep the persisted latch bounded: drop entries of deleted connections and of credits
 * already past their expiry. An empty `liveConnectionIds` means "not loaded yet" and keeps
 * every connection entry, because a partial list must not re-arm alerts that already fired.
 */
export function pruneQuotaAlertLatch(
  latch: QuotaAlertLatch,
  liveConnectionIds: readonly string[],
  nowMs: number
): void {
  for (const key of Object.keys(latch)) {
    if (key.includes(":credit:") && latch[key] <= nowMs) {
      delete latch[key];
      continue;
    }
    if (liveConnectionIds.length === 0) continue;
    if (!liveConnectionIds.some((id) => key.startsWith(`${id}:`))) delete latch[key];
  }
}

/** One evaluation pass. `changed` is true whenever the latch must be persisted, recovery included. */
export function evaluateQuotaAlerts(input: {
  latch: QuotaAlertLatch;
  quotaSnapshot: Record<string, ConnectionSnapshot>;
  expiringCredits: Record<string, ResetCreditLike[]>;
  liveConnectionIds: readonly string[];
  now?: () => number;
}): { windowAlerts: QuotaWindowAlert[]; creditAlerts: QuotaWindowAlert[]; changed: boolean } {
  const { latch, quotaSnapshot, expiringCredits, liveConnectionIds } = input;
  const now = input.now ?? Date.now;
  const before = JSON.stringify(latch);
  const windowAlerts = collectQuotaWindowAlerts(quotaSnapshot, latch);
  const creditAlerts = collectResetCreditExpiryAlerts(expiringCredits, latch, { now });
  pruneQuotaAlertLatch(latch, liveConnectionIds, now());
  return { windowAlerts, creditAlerts, changed: JSON.stringify(latch) !== before };
}

/**
 * Codex accounts the snapshot reports as holding banked credits. The usage poll only
 * carries the count, so these are the only accounts worth listing for expiry dates.
 */
export function selectConnectionsWithBankedCredits(
  connections: ReadonlyArray<{ id: string; provider?: string; isActive?: boolean }>,
  quotaSnapshot: Record<string, ConnectionSnapshot>
): string[] {
  return connections
    .filter((connection) => connection.provider === "codex" && connection.isActive !== false)
    .filter((connection) =>
      (quotaSnapshot[connection.id]?.quotas ?? []).some(
        (quota) =>
          quota?.isResetCredits === true && Number(quota.creditCount ?? quota.remaining ?? 0) > 0
      )
    )
    .map((connection) => connection.id);
}
