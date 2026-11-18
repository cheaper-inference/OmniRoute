/**
 * db/discoveryState.ts — Per-connection record of the last model discovery outcome.
 *
 * A discovery response only lives for the request that produced it: after a
 * failed discovery the next read looked exactly like a successful one, with no
 * trace of the failure left anywhere. This module stores the last outcome
 * (status, cause, date) of every connection in the `key_value` store, under the
 * namespace `discoveryState` and the key `<providerId>:<connectionId>` — the
 * same key convention as `syncedAvailableModels`.
 *
 * The record is display state only: it never touches the connection columns
 * that drive routing (`lastError`, `lastErrorType`, `testStatus`).
 */

import { getDbInstance } from "./core";

const DISCOVERY_STATE_NAMESPACE = "discoveryState";

export type DiscoveryStateStatus = "healthy" | "degraded";

export interface DiscoveryStateRecord {
  /** Outcome of the last discovery attempt: "healthy" or "degraded". */
  status: DiscoveryStateStatus;
  /** Sanitized cause of the failure, or null when the discovery succeeded. */
  cause: string | null;
  /** ISO timestamp of the attempt the record describes. */
  at: string;
}

/** One connection whose stored outcome is read or deleted. */
export interface DiscoveryStateEntry {
  provider: string;
  id: string;
}

function discoveryStateKey(providerId: string, connectionId: string): string {
  return `${providerId}:${connectionId}`;
}

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Parse a stored entry. A row that cannot be read (corrupted JSON, an
 * unexpected shape, an unreadable date) is treated as absent: an unknown
 * outcome must never be mistaken for a healthy one.
 */
function parseDiscoveryState(raw: unknown): DiscoveryStateRecord | null {
  const record = toRecord(raw);
  if (!record) return null;
  const status = record.status;
  if (status !== "healthy" && status !== "degraded") return null;
  const cause = typeof record.cause === "string" && record.cause.length > 0 ? record.cause : null;
  const at = typeof record.at === "string" ? record.at : "";
  if (!at || !Number.isFinite(Date.parse(at))) return null;
  return { status, cause, at };
}

/**
 * Store the outcome of the last discovery attempt for one connection. The
 * entry is replaced, never appended: the store keeps one row per connection.
 */
export function saveDiscoveryState(
  providerId: string,
  connectionId: string,
  outcome: { status: DiscoveryStateStatus; cause: string | null }
): void {
  const db = getDbInstance();
  const record: DiscoveryStateRecord = {
    status: outcome.status,
    cause: outcome.cause,
    at: new Date().toISOString(),
  };
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    DISCOVERY_STATE_NAMESPACE,
    discoveryStateKey(providerId, connectionId),
    JSON.stringify(record)
  );
}

/**
 * Read the stored outcomes of a list of connections with a single query.
 * Returns a map keyed by `<providerId>:<connectionId>`; a connection without a
 * readable entry is simply absent from the map.
 */
export function getDiscoveryStatesForConnections(
  entries: DiscoveryStateEntry[]
): Map<string, DiscoveryStateRecord> {
  const states = new Map<string, DiscoveryStateRecord>();
  if (entries.length === 0) return states;

  const db = getDbInstance();
  const placeholders = entries.map(() => "?").join(",");
  const rows = db
    .prepare(`SELECT key, value FROM key_value WHERE namespace = ? AND key IN (${placeholders})`)
    .all(
      DISCOVERY_STATE_NAMESPACE,
      ...entries.map((entry) => discoveryStateKey(entry.provider, entry.id))
    );

  for (const row of rows) {
    const record = toRecord(row);
    if (!record) continue;
    const key = typeof record.key === "string" ? record.key : null;
    if (!key) continue;
    let parsedValue: unknown = null;
    try {
      parsedValue = JSON.parse(typeof record.value === "string" ? record.value : "");
    } catch {
      parsedValue = null;
    }
    const state = parseDiscoveryState(parsedValue);
    if (state) states.set(key, state);
  }
  return states;
}

/** Drop the stored outcomes of the given connections. */
export function deleteDiscoveryStatesForConnections(entries: DiscoveryStateEntry[]): number {
  if (entries.length === 0) return 0;

  const db = getDbInstance();
  let changes = 0;
  for (const entry of entries) {
    const result = db
      .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
      .run(DISCOVERY_STATE_NAMESPACE, discoveryStateKey(entry.provider, entry.id));
    changes += Number(result.changes || 0);
  }
  return changes;
}

/** Drop every stored outcome of a provider. */
export function deleteDiscoveryStatesForProvider(providerId: string): number {
  const db = getDbInstance();
  const keyPrefix = `${providerId}:`;
  const result = db
    .prepare("DELETE FROM key_value WHERE namespace = ? AND substr(key, 1, ?) = ?")
    .run(DISCOVERY_STATE_NAMESPACE, keyPrefix.length, keyPrefix);
  return Number(result.changes || 0);
}
