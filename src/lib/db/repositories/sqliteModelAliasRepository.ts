/**
 * SQLite implementation for global model aliases: the `modelAliases` key_value
 * namespace plus the `managedModelAliasNames` provenance record (#11836).
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  ModelAliasMap,
  ModelAliasRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import { getDbInstance } from "../core";
import { getKeyValue } from "../models/shared";

const MANAGED_ALIAS_NAMES_KEY = "names";

async function list(): Promise<ModelAliasMap> {
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

async function set(alias: string, target: unknown): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('modelAliases', ?, ?)"
  ).run(alias, JSON.stringify(target));
}

async function remove(alias: string): Promise<void> {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'modelAliases' AND key = ?").run(alias);
}

async function readManagedNames(): Promise<string[]> {
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

async function writeManagedNames(names: Set<string>): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('managedModelAliasNames', ?, ?)"
  ).run(MANAGED_ALIAS_NAMES_KEY, JSON.stringify(Array.from(names)));
}

async function listManagedNames(): Promise<Set<string>> {
  return new Set(await readManagedNames());
}

async function markManaged(alias: string): Promise<void> {
  const names = await listManagedNames();
  if (names.has(alias)) return;
  names.add(alias);
  await writeManagedNames(names);
}

async function unmarkManaged(alias: string): Promise<void> {
  const names = await listManagedNames();
  if (!names.has(alias)) return;
  names.delete(alias);
  await writeManagedNames(names);
}

export const sqliteModelAliasRepository: ModelAliasRepository = {
  list,
  set,
  remove,
  listManagedNames,
  markManaged,
  unmarkManaged,
};
