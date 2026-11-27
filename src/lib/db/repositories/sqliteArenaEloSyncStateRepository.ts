/**
 * SQLite implementation for the Arena ELO sync state (`arena_elo` key_value namespace:
 * failure backoff stamp, last error, active source and dataset date).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  ArenaEloSyncStateKey,
  ArenaEloSyncStateRepository,
} from "@/domain/persistence/externalSyncStateRepositories";
import { getDbInstance } from "../core";

const NAMESPACE = "arena_elo";

const KV_READ_SQL = `SELECT value FROM key_value WHERE namespace = ? AND key = ? LIMIT 1`;
const KV_WRITE_SQL = `INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)`;

function getSync(key: ArenaEloSyncStateKey): string | null {
  const row = getDbInstance().prepare(KV_READ_SQL).get(NAMESPACE, key) as
    { value: string } | undefined;
  return row ? row.value : null;
}

function setSync(key: ArenaEloSyncStateKey, value: string): void {
  const db = getDbInstance();
  db.prepare(KV_WRITE_SQL).run(NAMESPACE, key, value);
}

function removeSync(key: ArenaEloSyncStateKey): void {
  const db = getDbInstance();
  db.prepare(`DELETE FROM key_value WHERE namespace = ? AND key = ?`).run(NAMESPACE, key);
}

export const sqliteArenaEloSyncStateRepository: ArenaEloSyncStateRepository = {
  async get(key) {
    return getSync(key);
  },
  async set(key, value) {
    setSync(key, value);
  },
  async remove(key) {
    removeSync(key);
  },
};

/** SQLite-only synchronous access retained for the Arena ELO sync service. */
export const sqliteArenaEloSyncStateLegacySync = {
  get: getSync,
  set: setSync,
  remove: removeSync,
};
