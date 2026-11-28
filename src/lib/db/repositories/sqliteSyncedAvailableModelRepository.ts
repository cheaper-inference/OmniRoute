/**
 * SQLite implementation for connection-scoped synced model catalogs: the
 * `syncedAvailableModels` key_value namespace, keyed `<providerId>:<connectionId>`.
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 * Legacy reads accept an explicit database so the vision lookup keeps its injected
 * test seam.
 */
import type {
  SyncedAvailableModelRepository,
  SyncedModelCatalogRow,
} from "@/domain/persistence/syncedAvailableModelRepository";
import type { SqliteAdapter } from "../adapters/types";
import { getDbInstance } from "../core";
import { getKeyValue } from "../models/shared";

type SyncedCatalogDatabase = Pick<SqliteAdapter, "prepare">;
type StoredRow = { key: string | null; value: string | null };

function readConnectionCatalogSync(key: string): string | null {
  const db = getDbInstance();
  const existingRow = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get(key);
  return getKeyValue(existingRow).value;
}

function writeConnectionCatalogSync(key: string, value: string): void {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  ).run(key, value);
}

function removeConnectionCatalogSync(key: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?").run(
    key
  );
}

function removeProviderCatalogsSync(providerId: string): number {
  const db = getDbInstance();
  const keyPrefix = `${providerId}:`;
  const result = db
    .prepare(
      "DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND substr(key, 1, ?) = ?"
    )
    .run(keyPrefix.length, keyPrefix);
  return Number(result.changes || 0);
}

function listProviderCatalogValuesSync(
  db: SyncedCatalogDatabase,
  providerId: string
): Array<string | null> {
  return db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?")
    .all(`${providerId}:%`)
    .map((row) => getKeyValue(row).value);
}

function listAllCatalogsSync(db: SyncedCatalogDatabase): StoredRow[] {
  return db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels'")
    .all()
    .map(getKeyValue);
}

function listProviderCatalogsSync(providerId: string): StoredRow[] {
  return getDbInstance()
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?"
    )
    .all(`${providerId}:%`)
    .map(getKeyValue);
}

function toCatalogRows(rows: StoredRow[]): SyncedModelCatalogRow[] {
  const result: SyncedModelCatalogRow[] = [];
  for (const { key, value } of rows) {
    if (key !== null && value !== null) result.push({ key, value });
  }
  return result;
}

export const sqliteSyncedAvailableModelRepository: SyncedAvailableModelRepository = {
  async readConnectionCatalog(key) {
    return readConnectionCatalogSync(key);
  },
  async writeConnectionCatalog(key, value) {
    writeConnectionCatalogSync(key, value);
  },
  async removeConnectionCatalog(key) {
    removeConnectionCatalogSync(key);
  },
  async removeProviderCatalogs(providerId) {
    return removeProviderCatalogsSync(providerId);
  },
  async listProviderCatalogs(providerId) {
    return toCatalogRows(listProviderCatalogsSync(providerId));
  },
  async listAllCatalogs() {
    return toCatalogRows(listAllCatalogsSync(getDbInstance()));
  },
};

/**
 * SQLite-only synchronous access retained for the synced-catalog facades: the
 * canonical write runs inside `withCodexConnectionWrite`, and the vision lookup is a
 * synchronous capability read, so neither can await a Promise contract.
 */
export const sqliteSyncedAvailableModelLegacySync = {
  readConnectionCatalog: readConnectionCatalogSync,
  writeConnectionCatalog: writeConnectionCatalogSync,
  removeConnectionCatalog: removeConnectionCatalogSync,
  removeProviderCatalogs: removeProviderCatalogsSync,
  listProviderCatalogValues: listProviderCatalogValuesSync,
  listAllCatalogs: listAllCatalogsSync,
};
