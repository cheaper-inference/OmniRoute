/**
 * SQLite implementation for MITM alias mappings, stored in the key_value table under
 * namespace "mitmAlias". The standalone MITM process reads the same rows directly
 * (`src/mitm/_internal/standaloneRouting.cjs`), so the stored shape must not change.
 */

import type {
  MitmAliasMappingRecord,
  MitmAliasRepository,
} from "@/domain/persistence/mitmAliasRepository";
import { getDbInstance } from "../core";
import { getKeyValue } from "../models/shared";

async function findByTool(toolName: string): Promise<MitmAliasMappingRecord> {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
    .get(toolName);
  const value = getKeyValue(row).value;
  return value ? JSON.parse(value) : {};
}

async function listAll(): Promise<Record<string, MitmAliasMappingRecord>> {
  const rows = getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'mitmAlias'")
    .all();
  const result: Record<string, MitmAliasMappingRecord> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

/** Writes before its first await, so callers that do not await still see the row. */
async function replace(toolName: string, mappings: unknown): Promise<void> {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('mitmAlias', ?, ?)")
    .run(toolName, JSON.stringify(mappings || {}));
}

export const sqliteMitmAliasRepository: MitmAliasRepository = {
  findByTool,
  listAll,
  replace,
};
