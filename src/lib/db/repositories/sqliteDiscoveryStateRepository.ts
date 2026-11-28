/**
 * SQLite implementation for the last discovery outcome of every connection:
 * `key_value` namespace `discoveryState`, key `<providerId>:<connectionId>` (the
 * same key convention as `syncedAvailableModels`).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  DiscoveryStateEntry,
  DiscoveryStateRecord,
  DiscoveryStateRepository,
} from "@/domain/persistence/modelDiscoveryRepositories";
import { getDbInstance } from "../core";

const DISCOVERY_STATE_NAMESPACE = "discoveryState";

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

function saveSync(providerId: string, connectionId: string, record: DiscoveryStateRecord): void {
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    DISCOVERY_STATE_NAMESPACE,
    discoveryStateKey(providerId, connectionId),
    JSON.stringify(record)
  );
}

function findForConnectionsSync(entries: DiscoveryStateEntry[]): Map<string, DiscoveryStateRecord> {
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

function removeForConnectionsSync(entries: DiscoveryStateEntry[]): number {
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

function removeForProviderSync(providerId: string): number {
  const db = getDbInstance();
  const keyPrefix = `${providerId}:`;
  const result = db
    .prepare("DELETE FROM key_value WHERE namespace = ? AND substr(key, 1, ?) = ?")
    .run(DISCOVERY_STATE_NAMESPACE, keyPrefix.length, keyPrefix);
  return Number(result.changes || 0);
}

export const sqliteDiscoveryStateRepository: DiscoveryStateRepository = {
  async save(providerId, connectionId, record) {
    saveSync(providerId, connectionId, record);
  },
  async findForConnections(entries) {
    return findForConnectionsSync(entries);
  },
  async removeForConnections(entries) {
    return removeForConnectionsSync(entries);
  },
  async removeForProvider(providerId) {
    return removeForProviderSync(providerId);
  },
};

/**
 * SQLite-only synchronous access retained for the providers list route, the
 * discovery outcome recorder and the connection-deletion cleanup.
 */
export const sqliteDiscoveryStateLegacySync = {
  save: saveSync,
  findForConnections: findForConnectionsSync,
  removeForConnections: removeForConnectionsSync,
  removeForProvider: removeForProviderSync,
};
