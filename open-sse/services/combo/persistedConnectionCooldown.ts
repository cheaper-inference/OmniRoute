import { cooldownUntilMs } from "../accountFallback.ts";
import {
  getPersistedConnectionCooldownSkipReason,
  normalizeConnectionStatus,
  QUOTA_BLOCKING_CONNECTION_STATUSES,
  resolvePersistedConnectionCooldownSkipReason,
} from "./comboPredicates.ts";
import { isTransientComboCooldownReason } from "./comboCooldownRetry.ts";
import { recordSkippedConnectionCooldown } from "./skippedConnectionCooldown.ts";
import type { AttemptLoopState } from "./attemptLoopTypes.ts";

type Connection = Record<string, unknown> | null | undefined;
type CooldownState = Pick<AttemptLoopState, "skippedConnectionCooldownUntil">;

function recordRecoverablePersistedCooldown(state: CooldownState, connection: Connection): void {
  if (connection?.isActive !== true) return;
  const status = normalizeConnectionStatus(connection.testStatus);
  if (QUOTA_BLOCKING_CONNECTION_STATUSES.has(status) && status !== "rate_limited") return;
  const value = connection.rateLimitedUntil;
  if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) return;
  const until = cooldownUntilMs(value);
  if (until > 8.64e15) return;
  const now = Date.now();
  recordSkippedConnectionCooldown(
    state,
    { available: false, reason: "connection_cooldown", retryAfterMs: until - now },
    now
  );
}

/** Retain a recoverable deadline from the same row used by the persisted skip gate. */
export async function resolveAndRecordPersistedCooldown(
  state: CooldownState,
  target: { modelStr: string; connectionId?: string | null },
  fetchConnection: (id: string) => Promise<Connection>,
  allowRateLimitedConnection = false
): Promise<string | null> {
  let connection: Connection;
  const reason = await resolvePersistedConnectionCooldownSkipReason(
    target,
    async (id) => {
      connection = await fetchConnection(id);
      return connection;
    },
    allowRateLimitedConnection
  );
  if (reason) recordRecoverablePersistedCooldown(state, connection);
  return reason;
}

export type PersistedRetryCooldown = {
  skipReason: string | null;
  cooldown?: { reason: string; untilMs: number };
};

const RETRY_COOLDOWN_STATUSES = ["active", "unavailable", "rate_limited"];
const NON_RECOVERABLE_ERROR_CODES = [400, 401, 402, 403, 404, 410];

/** The persisted `lastErrorType` when the row carries a transient, recoverable cooldown label. */
function recoverableTransientReason(connection: NonNullable<Connection>): string | null {
  const status = normalizeConnectionStatus(connection.testStatus);
  const reason = connection.lastErrorType;
  if (!RETRY_COOLDOWN_STATUSES.includes(status)) return null;
  if (typeof reason !== "string" || !isTransientComboCooldownReason(reason)) return null;
  if (NON_RECOVERABLE_ERROR_CODES.includes(Number(connection.errorCode))) return null;
  return reason;
}

/** Epoch-ms deadline from a persisted `rateLimitedUntil` value, or NaN when it is not a date-like. */
function persistedDeadlineMs(value: unknown): number {
  if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) {
    return NaN;
  }
  return cooldownUntilMs(value);
}

function isUsableDeadline(untilMs: number): boolean {
  return Number.isFinite(untilMs) && untilMs > 0 && untilMs <= 8.64e15;
}

function resolveRetryCooldownForConnection(
  target: { modelStr: string; connectionId?: string | null },
  connection: NonNullable<Connection>,
  allowRateLimitedConnection: boolean
): PersistedRetryCooldown {
  const skipReason = getPersistedConnectionCooldownSkipReason(target, connection);
  const reason = recoverableTransientReason(connection);
  if (reason === null) return { skipReason };
  const untilMs = persistedDeadlineMs(connection.rateLimitedUntil);
  if (!isUsableDeadline(untilMs)) {
    // Preserve an inherited transient-provider allowance, without inventing a wait.
    return {
      skipReason: getPersistedConnectionCooldownSkipReason(
        target,
        connection,
        allowRateLimitedConnection
      ),
    };
  }
  if (untilMs <= Date.now()) return { skipReason: null };
  return { skipReason, cooldown: { reason, untilMs } };
}

/** A retry may recover an explicit transient deadline without clearing the persisted label. */
export async function resolvePersistedRetryCooldown(
  target: { modelStr: string; connectionId?: string | null },
  fetchConnection: (id: string) => Promise<Connection>,
  requireFreshConnection = false,
  allowRateLimitedConnection = false
): Promise<PersistedRetryCooldown> {
  if (!target.connectionId) return { skipReason: null };
  const unavailable = `Skipping ${target.modelStr} — connection ${target.connectionId} unavailable for retry`;
  const missingConnection = { skipReason: requireFreshConnection ? unavailable : null };
  let connection: Connection;
  try {
    connection = await fetchConnection(target.connectionId);
  } catch {
    return missingConnection;
  }
  // Preserve normal read fallthrough until a known cooldown has actually been waited.
  if (!connection) return missingConnection;
  if (connection.isActive !== true) return { skipReason: unavailable };
  return resolveRetryCooldownForConnection(target, connection, allowRateLimitedConnection);
}
