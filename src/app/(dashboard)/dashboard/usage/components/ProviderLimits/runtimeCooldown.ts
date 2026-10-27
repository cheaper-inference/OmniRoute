import { resolveProviderAvailability } from "@/lib/providerAvailability";
import type { AvailabilityEvidence, HealthConnection, HealthCooldown } from "./healthOverview";

/** Client-only equivalent of services/accountFallback.ts:cooldownUntilMs (#3954).
 * Do not import the server fallback module (DB/auth side effects) into the dashboard.
 */
export function parseRuntimeTimestamp(value: string | number | Date | null | undefined): number {
  if (value === null || value === undefined || value === "") return NaN;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  const raw = value.trim();
  return /^\d+(\.\d+)?$/.test(raw) ? Number(raw) : new Date(raw).getTime();
}

export const SUMMARY_FRESHNESS_MS = 90_000;
export function hasTerminalStatus(runtime: { testStatus?: string | null }): boolean {
  // Without a confirmation time the shared classifier preserves every terminal
  // status as STALE_TERMINAL; do not maintain a separate terminal-status list.
  return resolveProviderAvailability({ testStatus: runtime.testStatus }).state === "STALE_TERMINAL";
}
function selectRuntimeRow(
  connection: HealthConnection,
  evidence: AvailabilityEvidence,
  summaryTime: number,
  connectionTime: number,
  now: number
) {
  const summary =
    Number.isFinite(summaryTime) && evidence.cooldown?.id === connection.id
      ? evidence.cooldown
      : undefined;
  const fresh = !evidence.summaryFailed && now - summaryTime <= SUMMARY_FRESHNESS_MS;
  const terminal = !!summary && hasTerminalStatus(summary);
  const newerConnection =
    connectionTime > summaryTime && (!terminal || connection.testStatus !== undefined);
  return {
    summary,
    fresh,
    row: summary && (fresh || terminal) && !newerConnection ? summary : undefined,
  };
}
function resolveCooldownDeadline(
  runtime: HealthConnection | HealthCooldown,
  row: HealthCooldown | undefined,
  fresh: boolean,
  summaryTime: number
) {
  const explicit = parseRuntimeTimestamp(row && !fresh ? undefined : runtime.rateLimitedUntil);
  const derived = !Number.isFinite(explicit) && !!row && fresh && row.cooldownRemainingMs > 0;
  const until = Number.isFinite(explicit)
    ? explicit
    : derived
      ? summaryTime + row.cooldownRemainingMs
      : 0;
  return { derived, until };
}
function resolveActiveState(
  connection: HealthConnection,
  summary: HealthCooldown | undefined,
  runtime: HealthConnection | HealthCooldown,
  evidence: AvailabilityEvidence,
  connectionTime: number,
  summaryTime: number
) {
  return evidence.activeConfirmation &&
    parseRuntimeTimestamp(evidence.activeConfirmation.confirmedAt) >
      Math.max(
        Number.isFinite(connectionTime) ? connectionTime : 0,
        summary?.isActive !== undefined ? summaryTime : 0
      )
    ? evidence.activeConfirmation.isActive
    : (runtime.isActive ?? connection.isActive);
}
/** Connection fields use the newer observation, including explicit null clears.
 * In-memory model locks have no DB counterpart and use only a fresh summary.
 * Summary schema: src/lib/resilience/cooldownManager.ts:toCooldownConnection.
 */
export function runtimeCooldownEvidence(
  connection: HealthConnection,
  evidence: AvailabilityEvidence,
  now = Date.now()
) {
  const summaryTime = parseRuntimeTimestamp(evidence.observedAt);
  const connectionTime = parseRuntimeTimestamp(
    connection.runtimeObservedAt || connection.updatedAt
  );
  const { summary, fresh, row } = selectRuntimeRow(
    connection,
    evidence,
    summaryTime,
    connectionTime,
    now
  );
  const runtime = row || connection;
  const { derived, until } = resolveCooldownDeadline(runtime, row, fresh, summaryTime);
  const lockouts: HealthCooldown["lockouts"] = fresh ? summary?.lockouts || [] : [];
  return {
    row,
    runtime,
    summaryTime,
    derived,
    until,
    lockouts,
    isActive: resolveActiveState(
      connection,
      summary,
      runtime,
      evidence,
      connectionTime,
      summaryTime
    ),
  };
}
/** The same absolute runtime deadline is used by capture and projection. */
export interface CooldownObservation {
  until: number;
  derived: boolean;
  observedAt: number;
  startedAt: number;
}
export function sameCooldown(
  old: CooldownObservation | undefined,
  next: { until: number; derived: boolean }
) {
  return (
    !!old &&
    (old.until === next.until ||
      (old.derived && next.derived && Math.abs(old.until - next.until) <= 5000))
  );
}
