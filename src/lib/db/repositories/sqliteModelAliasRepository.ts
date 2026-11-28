/**
 * SQLite implementation for global model aliases: the `modelAliases` key_value
 * namespace plus the `managedModelAliasNames` provenance record (#11836).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  ModelAliasMap,
  ModelAliasRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import { getDbInstance } from "../core";
import { getKeyValue } from "../models/shared";

const MANAGED_ALIAS_NAMES_KEY = "names";

function listSync(): ModelAliasMap {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'modelAliases'")
    .all();
  const result: ModelAliasMap = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

function setSync(alias: string, target: unknown): void {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('modelAliases', ?, ?)"
  ).run(alias, JSON.stringify(target));
}

function removeSync(alias: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'modelAliases' AND key = ?").run(alias);
}

function readManagedNamesSync(): string[] {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'managedModelAliasNames' AND key = ?")
    .get(MANAGED_ALIAS_NAMES_KEY);
  const parsed = getKeyValue(row).value;
  if (!parsed) return [];
  try {
    const v = JSON.parse(parsed);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeManagedNamesSync(names: Set<string>): void {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('managedModelAliasNames', ?, ?)"
  ).run(MANAGED_ALIAS_NAMES_KEY, JSON.stringify(Array.from(names)));
}

export const sqliteModelAliasRepository: ModelAliasRepository = {
  async list() {
    return listSync();
  },
  async set(alias, target) {
    setSync(alias, target);
  },
  async remove(alias) {
    removeSync(alias);
  },
  async listManagedNames() {
    return new Set(readManagedNamesSync());
  },
  async markManaged(alias) {
    const names = new Set(readManagedNamesSync());
    if (names.has(alias)) return;
    names.add(alias);
    writeManagedNamesSync(names);
  },
  async unmarkManaged(alias) {
    const names = new Set(readManagedNamesSync());
    if (!names.has(alias)) return;
    names.delete(alias);
    writeManagedNamesSync(names);
  },
};

/**
 * SQLite-only synchronous access retained for the alias facade, so every write and its
 * backup/cache-invalidation side effects keep running in the same turn as on the
 * original module.
 */
export const sqliteModelAliasLegacySync = {
  list: listSync,
  set: setSync,
  remove: removeSync,
  readManagedNames: readManagedNamesSync,
  writeManagedNames: writeManagedNamesSync,
};
