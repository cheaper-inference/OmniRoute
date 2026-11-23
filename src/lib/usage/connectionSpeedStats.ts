/**
 * Per-connection decode speed for the dashboard quota cards.
 *
 * Reads the newest successful usage_history rows of ONE connection (latency_ms,
 * ttft_ms and token counts are already persisted per row) and reduces them with
 * summarizeConnectionSpeed(), which shares the request logger's TPS math. The
 * stats are computed at read time and never written into the provider-limits
 * cache; every entry point is fail-open so a usage_history problem can never
 * break the quota response it decorates.
 */

import { getDbInstance } from "../db/core";
import {
  summarizeConnectionSpeed,
  type ConnectionSpeedRow,
  type ConnectionSpeedStats,
} from "./usageHistory/helpers";

export type { ConnectionSpeedStats } from "./usageHistory/helpers";

export const DEFAULT_CONNECTION_SPEED_ROWS = 20;

type SpeedStatsGetter = (connectionId: string) => ConnectionSpeedStats | null;

export function getConnectionSpeedStats(
  connectionId: string,
  { limit = DEFAULT_CONNECTION_SPEED_ROWS }: { limit?: number } = {}
): ConnectionSpeedStats | null {
  if (!connectionId) return null;
  const rows = getDbInstance()
    .prepare(
      `SELECT model, latency_ms, ttft_ms, tokens_output, tokens_reasoning
       FROM usage_history
       WHERE connection_id = ? AND success = 1
       ORDER BY timestamp DESC
       LIMIT ?`
    )
    .all(connectionId, Math.max(1, Math.floor(limit))) as ConnectionSpeedRow[];
  return summarizeConnectionSpeed(rows);
}

function readSpeedSafely(
  connectionId: string,
  getStats: SpeedStatsGetter
): ConnectionSpeedStats | null {
  try {
    return getStats(connectionId);
  } catch (error) {
    console.warn(
      "[usage] connection speed stats unavailable:",
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

/** Return `usage` with a `speed` field for the connection when stats exist (fail-open). */
export function withConnectionSpeedStats<T extends object>(
  connectionId: string,
  usage: T,
  getStats: SpeedStatsGetter = getConnectionSpeedStats
): T | (T & { speed: ConnectionSpeedStats }) {
  const speed = readSpeedSafely(connectionId, getStats);
  return speed ? { ...usage, speed } : usage;
}

/** Decorate every cached provider-limits entry with its connection's speed (fail-open). */
export function attachConnectionSpeedStats<T extends object>(
  caches: Record<string, T>,
  getStats: SpeedStatsGetter = getConnectionSpeedStats
): Record<string, T | (T & { speed: ConnectionSpeedStats })> {
  const out: Record<string, T | (T & { speed: ConnectionSpeedStats })> = {};
  for (const [connectionId, entry] of Object.entries(caches)) {
    out[connectionId] = withConnectionSpeedStats(connectionId, entry, getStats);
  }
  return out;
}
