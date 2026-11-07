/**
 * bankedResetAudit.ts — the audit trail behind "auto-apply banked resets".
 *
 * Every real redemption (success or failure) and every dry-run decision becomes one
 * `bankedReset.redeem` audit row; skip decisions are never written. The rows double as
 * the redemption history: the per-account / per-day caps and the minimum spacing are
 * counted from them, so the limits survive restarts. A successful redemption also fires
 * the `provider.reset_redeemed` webhook.
 *
 * Rows carry the connection id, provider, credit type, mode, trigger and reason only —
 * never tokens, emails or upstream credit ids.
 */

import { getAuditLog, logAuditEvent } from "@/lib/compliance/index";
import { notifyWebhookEvent } from "@/lib/webhookDispatcher";
import type { BankedResetHistory, BankedResetTrigger } from "@/lib/usage/bankedResetPolicy";
import type {
  BankedResetCreditType,
  BankedResetMode,
} from "@/shared/constants/bankedResetAutoApply";
import type { WebhookEvent } from "@/lib/webhooks/eventDescriptions";

export const BANKED_RESET_AUDIT_ACTION = "bankedReset.redeem";
export const BANKED_RESET_AUDIT_RESOURCE_TYPE = "provider_connection";
export const BANKED_RESET_WEBHOOK_EVENT: WebhookEvent = "provider.reset_redeemed";
export const BANKED_RESET_HISTORY_WINDOW_MS = 24 * 60 * 60_000;
/** Upper bound of rows read to count the caps (getAuditLog caps a page at 500). */
const BANKED_RESET_HISTORY_READ_LIMIT = 500;

export type BankedResetAuditStatus = "success" | "failed" | "dry-run";

/** The fields of a `bankedReset.redeem` audit row the caps are counted from. */
export interface BankedResetAuditRow {
  action?: string | null;
  target?: string | null;
  status?: string | null;
  timestamp: string;
}

export interface BankedResetOutcome {
  connectionId: string;
  provider: string;
  creditType: BankedResetCreditType;
  mode: BankedResetMode;
  trigger: BankedResetTrigger;
  /** Decision reason for success / dry-run; a fixed error code for failures. */
  reason: string;
  status: BankedResetAuditStatus;
}

export interface BankedResetAuditEntry {
  action: string;
  actor: string;
  target: string;
  resourceType: string;
  status: BankedResetAuditStatus;
  details: {
    provider: string;
    creditType: BankedResetCreditType;
    mode: BankedResetMode;
    trigger: BankedResetTrigger;
    reason: string;
  };
}

/** Where outcomes go: the audit log, and the webhook on success. Injectable for tests. */
export interface BankedResetSinks {
  logAuditEvent: (entry: BankedResetAuditEntry) => void;
  notifyWebhookEvent: (event: WebhookEvent, data: Record<string, unknown>) => void;
}

export function createDefaultBankedResetSinks(): BankedResetSinks {
  return { logAuditEvent, notifyWebhookEvent };
}

const SAFE_REASON = /^[a-z0-9][a-z0-9_.-]{0,63}$/i;

/** Keep `reason` a short identifier, so no upstream text ever reaches an audit row. */
export function toBankedResetReason(value: unknown, fallback = "error"): string {
  return typeof value === "string" && SAFE_REASON.test(value) ? value : fallback;
}

export function buildBankedResetAuditEntry(outcome: BankedResetOutcome): BankedResetAuditEntry {
  return {
    action: BANKED_RESET_AUDIT_ACTION,
    actor: "system",
    target: outcome.connectionId,
    resourceType: BANKED_RESET_AUDIT_RESOURCE_TYPE,
    status: outcome.status,
    details: {
      provider: outcome.provider,
      creditType: outcome.creditType,
      mode: outcome.mode,
      trigger: outcome.trigger,
      reason: toBankedResetReason(outcome.reason),
    },
  };
}

/** Write one audit row; on success also fire the webhook. Never throws. */
export function recordBankedResetOutcome(outcome: BankedResetOutcome, sinks: BankedResetSinks) {
  try {
    sinks.logAuditEvent(buildBankedResetAuditEntry(outcome));
  } catch {
    // Audit logging must never break a redemption that already happened.
  }
  if (outcome.status !== "success") return;
  try {
    sinks.notifyWebhookEvent(BANKED_RESET_WEBHOOK_EVENT, {
      connectionId: outcome.connectionId,
      provider: outcome.provider,
      creditType: outcome.creditType,
      mode: outcome.mode,
      trigger: outcome.trigger,
    });
  } catch {
    // Webhook delivery is best-effort.
  }
}

/**
 * Pending redemptions. The audit row of a claim or redemption is written only once it
 * settles, so two deciders running at the same time (two Claude walls, or the request-path
 * gate and the background job) could both pass the caps. Each decider reserves a slot in
 * the same synchronous step as its decision; summarizeBankedResetHistory() counts live
 * reservations exactly like success rows. OmniRoute runs as one Node process, so an
 * in-memory map is shared by both paths. A reservation whose outcome is never recorded
 * (a shared in-flight claim, a crash) expires on its own, so it can only make the caps
 * stricter for a while, never looser.
 */
export const BANKED_RESET_RESERVATION_TTL_MS = 10 * 60_000;

export type BankedResetReservationToken = number;

const reservations = new Map<BankedResetReservationToken, { connectionId: string; at: number }>();
let lastReservationToken = 0;

function isReservationLive(at: number, now: number): boolean {
  return now - at < BANKED_RESET_RESERVATION_TTL_MS;
}

export function reserveBankedResetSlot(input: {
  connectionId: string;
  now: number;
}): BankedResetReservationToken {
  for (const [token, reservation] of reservations) {
    if (!isReservationLive(reservation.at, input.now)) reservations.delete(token);
  }
  lastReservationToken += 1;
  reservations.set(lastReservationToken, { connectionId: input.connectionId, at: input.now });
  return lastReservationToken;
}

/** Drop a reservation once its outcome is recorded. Unknown or released tokens are a no-op. */
export function releaseBankedResetSlot(
  token: BankedResetReservationToken | null | undefined
): void {
  if (token != null) reservations.delete(token);
}

/** Test-only: forget every reservation. */
export function _resetBankedResetReservations(): void {
  reservations.clear();
}

function rowMs(row: BankedResetAuditRow): number | null {
  const ms = Date.parse(row.timestamp);
  return Number.isFinite(ms) ? ms : null;
}

/** A row that counts as a redemption: success always, dry-run only while in dry-run mode. */
function countsAsRedemption(row: BankedResetAuditRow, mode: BankedResetMode): boolean {
  if (row.action && row.action !== BANKED_RESET_AUDIT_ACTION) return false;
  return row.status === "success" || (mode === "dry-run" && row.status === "dry-run");
}

/**
 * Caps input for decideBankedReset, from the audit rows plus the live reservations (each
 * counts like a success row timestamped when it was taken). Targets are compared exactly
 * in code (the audit-log filter is a LIKE match).
 */
export function summarizeBankedResetHistory(
  rows: BankedResetAuditRow[],
  options: { connectionId: string; mode: BankedResetMode; now: number }
): BankedResetHistory {
  const since = options.now - BANKED_RESET_HISTORY_WINDOW_MS;
  const counted: { target: string | null | undefined; ms: number }[] = [];
  for (const row of rows) {
    if (!countsAsRedemption(row, options.mode)) continue;
    const ms = rowMs(row);
    if (ms === null || ms < since || ms > options.now) continue;
    counted.push({ target: row.target, ms });
  }
  // Pending redemptions: live until released or expired (a reservation taken on a clock
  // ahead of this one still counts — stricter, never looser).
  for (const reservation of reservations.values()) {
    if (!isReservationLive(reservation.at, options.now)) continue;
    counted.push({ target: reservation.connectionId, ms: reservation.at });
  }

  let accountRedemptions24h = 0;
  let lastMs: number | null = null;
  for (const { target, ms } of counted) {
    if (target === options.connectionId) accountRedemptions24h += 1;
    if (lastMs === null || ms > lastMs) lastMs = ms;
  }
  return {
    accountRedemptions24h,
    poolRedemptions24h: counted.length,
    lastRedemptionAt: lastMs === null ? null : new Date(lastMs).toISOString(),
  };
}

/** Successful redemptions of one account on the current UTC day (idempotency counter). */
export function countBankedResetsToday(
  rows: BankedResetAuditRow[],
  connectionId: string,
  now: number
): number {
  const day = new Date(now).toISOString().slice(0, 10);
  return rows.filter((row) => {
    if (row.action && row.action !== BANKED_RESET_AUDIT_ACTION) return false;
    if (row.target !== connectionId || row.status !== "success") return false;
    const ms = rowMs(row);
    return ms !== null && new Date(ms).toISOString().slice(0, 10) === day;
  }).length;
}

/** `bankedReset.redeem` rows written since `sinceIso`, newest first. */
export function readBankedResetAuditRows(sinceIso: string): BankedResetAuditRow[] {
  return getAuditLog({
    action: BANKED_RESET_AUDIT_ACTION,
    from: sinceIso,
    limit: BANKED_RESET_HISTORY_READ_LIMIT,
  })
    .filter((entry) => entry.action === BANKED_RESET_AUDIT_ACTION)
    .map((entry) => ({
      action: entry.action ?? null,
      target: entry.target ?? null,
      status: entry.status,
      timestamp: entry.timestamp,
    }));
}

export interface BankedResetHistoryEntry {
  id: number | null;
  timestamp: string;
  connectionId: string | null;
  status: string | null;
  provider: string | null;
  creditType: string | null;
  mode: string | null;
  trigger: string | null;
  reason: string | null;
}

export interface BankedResetHistoryResult {
  entries: BankedResetHistoryEntry[];
  counts24h: { success: number; failed: number; dryRun: number };
}

function detailString(details: unknown, key: string): string | null {
  if (!details || typeof details !== "object") return null;
  const value = (details as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

/** Recent `bankedReset.redeem` rows for the dashboard, plus the last 24 h counts. */
export function readBankedResetHistory(options: {
  limit: number;
  now?: number;
}): BankedResetHistoryResult {
  const now = options.now ?? Date.now();
  const entries = getAuditLog({ action: BANKED_RESET_AUDIT_ACTION, limit: options.limit })
    .filter((entry) => entry.action === BANKED_RESET_AUDIT_ACTION)
    .map((entry) => ({
      id: typeof entry.id === "number" ? entry.id : null,
      timestamp: entry.timestamp,
      connectionId: entry.target ?? null,
      status: entry.status,
      provider: detailString(entry.details, "provider"),
      creditType: detailString(entry.details, "creditType"),
      mode: detailString(entry.details, "mode"),
      trigger: detailString(entry.details, "trigger"),
      reason: detailString(entry.details, "reason"),
    }));

  const counts24h = { success: 0, failed: 0, dryRun: 0 };
  const since = now - BANKED_RESET_HISTORY_WINDOW_MS;
  for (const row of readBankedResetAuditRows(new Date(since).toISOString())) {
    const ms = rowMs(row);
    if (ms === null || ms < since) continue;
    if (row.status === "success") counts24h.success += 1;
    else if (row.status === "failed") counts24h.failed += 1;
    else if (row.status === "dry-run") counts24h.dryRun += 1;
  }
  return { entries, counts24h };
}
