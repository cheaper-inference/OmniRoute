/**
 * SQLite implementation of the compression settings store: key_value rows under the
 * "compression" namespace.
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle.
 */

import type {
  CompressionSettingRow,
  CompressionSettingWrite,
  CompressionSettingsRepository,
} from "@/domain/persistence/compressionRepositories";
import { getDbInstance } from "../core";

const NAMESPACE = "compression";

function listSettingRows(): CompressionSettingRow[] {
  return getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as CompressionSettingRow[];
}

function getSettingValue(key: string): unknown {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value: unknown } | undefined;
  return row?.value;
}

function writeSettings(entries: readonly CompressionSettingWrite[]): void {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  db.transaction(() => {
    for (const { key, value } of entries) {
      insert.run(NAMESPACE, key, typeof value === "function" ? value(getSettingValue(key)) : value);
    }
  })();
}

export const sqliteCompressionSettingsRepository: CompressionSettingsRepository = {
  list: async () => listSettingRows(),
  get: async (key) => getSettingValue(key),
  write: async (entries) => writeSettings(entries),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * settings read and the proactive-compression threshold run on the request hot path
 * without awaiting.
 */
export const sqliteCompressionSettingsLegacySync = {
  list: listSettingRows,
  get: getSettingValue,
  write: writeSettings,
};
