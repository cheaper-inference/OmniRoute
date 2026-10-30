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

/** A retry may recover an explicit transient deadline without clearing the persisted label. */
export async function resolvePersistedRetryCooldown(
  target: { modelStr: string; connectionId?: string | null },
  fetchConnection: (id: string) => Promise<Connection>,
  requireFreshConnection = false,
  allowRateLimitedConnection = false
): Promise<PersistedRetryCooldown> {
  if (!target.connectionId) return { skipReason: null };
  const unavailable = `Skipping ${target.modelStr} — connection ${target.connectionId} unavailable for retry`;
  let connection: Connection;
  try {
    connection = await fetchConnection(target.connectionId);
  } catch {
    return { skipReason: requireFreshConnection ? unavailable : null };
  }
  // Preserve normal read fallthrough until a known cooldown has actually been waited.
  if (!connection) return { skipReason: requireFreshConnection ? unavailable : null };
  if (connection.isActive !== true) return { skipReason: unavailable };
  const skipReason = getPersistedConnectionCooldownSkipReason(target, connection);
  const status = normalizeConnectionStatus(connection.testStatus);
  const reason = connection.lastErrorType;
  const value = connection.rateLimitedUntil;
  if (
    !["active", "unavailable", "rate_limited"].includes(status) ||
    typeof reason !== "string" ||
    !isTransientComboCooldownReason(reason) ||
    [400, 401, 402, 403, 404, 410].includes(Number(connection.errorCode))
  )
    return { skipReason };
  const untilMs =
    typeof value === "string" || typeof value === "number" || value instanceof Date
      ? cooldownUntilMs(value)
      : NaN;
  if (!Number.isFinite(untilMs) || untilMs <= 0 || untilMs > 8.64e15) {
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
