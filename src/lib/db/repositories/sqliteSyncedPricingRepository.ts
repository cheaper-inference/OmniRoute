/**
 * SQLite implementation for LiteLLM synced pricing: the `pricing_synced` key_value
 * namespace (one row per provider) and the `pricing_sync_status` last-sync record.
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  PricingSyncStatusRecord,
  SyncedPricingMap,
  SyncedPricingRepository,
} from "@/domain/persistence/syncedPricingRepository";
import { getDbInstance } from "../core";

const SYNC_STATUS_NAMESPACE = "pricing_sync_status";
const SYNC_STATUS_KEY = "last_sync";

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function listSync(): SyncedPricingMap {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'")
    .all();
  const synced: SyncedPricingMap = {};
  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    try {
      synced[key] = JSON.parse(rawValue) as Record<string, unknown>;
    } catch {
      console.warn(`[PRICING_SYNC] Corrupted data for provider "${key}", skipping`);
    }
  }
  return synced;
}

function replaceAllSync(data: SyncedPricingMap): void {
  const db = getDbInstance();
  const del = db.prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'");
  const insert = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('pricing_synced', ?, ?)"
  );
  const tx = db.transaction(() => {
    del.run();
    for (const [provider, models] of Object.entries(data)) {
      insert.run(provider, JSON.stringify(models));
    }
  });
  tx();
}

function clearSync(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'").run();
}

function readStatusSync(): PricingSyncStatusRecord | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(SYNC_STATUS_NAMESPACE, SYNC_STATUS_KEY);
  const record = toRecord(row);
  const rawValue = typeof record.value === "string" ? record.value : null;
  if (!rawValue) return null;
  try {
    const parsed = JSON.parse(rawValue) as { lastSyncTime?: string; lastSyncModelCount?: number };
    if (typeof parsed.lastSyncTime !== "string") return null;
    return {
      lastSyncTime: parsed.lastSyncTime,
      lastSyncModelCount:
        typeof parsed.lastSyncModelCount === "number" ? parsed.lastSyncModelCount : 0,
    };
  } catch {
    return null;
  }
}

function writeStatusSync(lastSyncTime: string, lastSyncModelCount: number): void {
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?) " +
      "ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value"
  ).run(
    SYNC_STATUS_NAMESPACE,
    SYNC_STATUS_KEY,
    JSON.stringify({ lastSyncTime, lastSyncModelCount })
  );
}

export const sqliteSyncedPricingRepository: SyncedPricingRepository = {
  async list() {
    return listSync();
  },
  async replaceAll(data) {
    replaceAllSync(data);
  },
  async clear() {
    clearSync();
  },
  async readStatus() {
    return readStatusSync();
  },
  async writeStatus(lastSyncTime, lastSyncModelCount) {
    writeStatusSync(lastSyncTime, lastSyncModelCount);
  },
};

/** SQLite-only synchronous access retained for the pricing sync service and its hot-path read. */
export const sqliteSyncedPricingLegacySync = {
  list: listSync,
  replaceAll: replaceAllSync,
  clear: clearSync,
  readStatus: readStatusSync,
  writeStatus: writeStatusSync,
};
