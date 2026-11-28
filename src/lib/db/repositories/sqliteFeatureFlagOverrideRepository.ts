/**
 * SQLite implementation for feature flag overrides stored in key_value under
 * the "feature_flags" namespace.
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type { FeatureFlagOverrideRepository } from "@/domain/persistence/productPolicyRepositories";
import { getDbInstance } from "../core";

const NAMESPACE = "feature_flags";

function listSync(): Record<string, string> {
  const rows = getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key: string; value: string }>;

  const result: Record<string, string> = {};
  for (const row of rows) {
    result[row.key] = row.value;
  }
  return result;
}

function findSync(key: string): string | undefined {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value: string } | undefined;
  return row?.value;
}

function setSync(key: string, value: string): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NAMESPACE, key, value);
}

function removeSync(key: string): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(NAMESPACE, key);
}

function hasAnySync(keys: readonly string[]): boolean {
  if (keys.length === 0) return false;
  // Placeholders are derived from the key count — a hardcoded `IN (?, ?, ?)` breaks
  // (parameter-count mismatch) the moment the caller's key list grows.
  const placeholders = keys.map(() => "?").join(", ");
  return Boolean(
    getDbInstance()
      .prepare(`SELECT 1 FROM key_value WHERE namespace = ? AND key IN (${placeholders}) LIMIT 1`)
      .get(NAMESPACE, ...keys)
  );
}

function clearSync(): void {
  getDbInstance().prepare("DELETE FROM key_value WHERE namespace = ?").run(NAMESPACE);
}

export const sqliteFeatureFlagOverrideRepository: FeatureFlagOverrideRepository = {
  async list() {
    return listSync();
  },
  async find(key) {
    return findSync(key);
  },
  async set(key, value) {
    setSync(key, value);
  },
  async remove(key) {
    removeSync(key);
  },
  async hasAny(keys) {
    return hasAnySync(keys);
  },
  async clear() {
    clearSync();
  },
};

/**
 * SQLite-only synchronous access retained for the existing public API: flag
 * reads sit on per-request hot paths (sanitizers, guardrails, auth gates) that
 * cannot await.
 */
export const sqliteFeatureFlagOverrideLegacySync = {
  list: listSync,
  find: findSync,
  set: setSync,
  remove: removeSync,
  hasAny: hasAnySync,
  clear: clearSync,
};
