/**
 * SQLite implementation for provider/model parameter filters, stored in the key_value
 * table under namespace "provider_param_filters" (migration 118).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle.
 */

import type {
  ModelParamFilter,
  ParamFilterRepository,
  ProviderParamFilter,
  StoredParamFilter,
} from "@/domain/persistence/paramFilterRepository";
import { getDbInstance } from "../core";

const NAMESPACE = "provider_param_filters";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseStoredValue(raw: unknown): unknown {
  if (typeof raw !== "string") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((k): k is string => typeof k === "string") : [];
}

function toModelParamFilter(raw: Record<string, unknown>): ModelParamFilter | null {
  const block = toStringArray(raw.block);
  const allow = toStringArray(raw.allow);
  if (block.length === 0 && allow.length === 0) return null;
  const filter: ModelParamFilter = {};
  if (block.length > 0) filter.block = block;
  if (allow.length > 0) filter.allow = allow;
  return filter;
}

function toModelParamFilters(raw: unknown): Record<string, ModelParamFilter> {
  const models: Record<string, ModelParamFilter> = {};
  if (!isRecord(raw)) return models;
  for (const [modelId, val] of Object.entries(raw)) {
    if (!isRecord(val)) continue;
    const filter = toModelParamFilter(val);
    if (filter) models[modelId] = filter;
  }
  return models;
}

function toProviderParamFilter(raw: unknown): ProviderParamFilter | null {
  if (!isRecord(raw)) return null;
  const block = toStringArray(raw.block);
  const allow = toStringArray(raw.allow);
  const models = toModelParamFilters(raw.models);
  const autoLearn = typeof raw.autoLearn === "boolean" ? raw.autoLearn : false;
  return { block, allow, models: Object.keys(models).length > 0 ? models : undefined, autoLearn };
}

function readNamespace(): Record<string, unknown> {
  const rows = getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key: string; value: string }>;

  const values: Record<string, unknown> = {};
  for (const row of rows) {
    values[row.key] = parseStoredValue(row.value);
  }
  return values;
}

function listParamFilters(): StoredParamFilter[] {
  const stored: StoredParamFilter[] = [];
  for (const [provider, value] of Object.entries(readNamespace())) {
    const filter = toProviderParamFilter(value);
    if (filter) stored.push({ provider, filter });
  }
  return stored;
}

function listParamFilterProviderKeys(): string[] {
  return Object.keys(readNamespace());
}

function upsertParamFilter(provider: string, config: ProviderParamFilter): void {
  const normalized: ProviderParamFilter = {
    block: config.block ?? [],
    allow: config.allow ?? [],
    autoLearn: config.autoLearn ?? false,
    models: config.models && Object.keys(config.models).length > 0 ? config.models : undefined,
  };

  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NAMESPACE, provider, JSON.stringify(normalized));
}

function deleteParamFilters(providers: readonly string[]): void {
  const db = getDbInstance();
  const stmt = db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?");
  db.transaction(() => {
    for (const provider of providers) stmt.run(NAMESPACE, provider);
  })();
}

export const sqliteParamFilterRepository: ParamFilterRepository = {
  list: async () => listParamFilters(),
  listProviderKeys: async () => listParamFilterProviderKeys(),
  upsert: async (provider, filter) => upsertParamFilter(provider, filter),
  deleteByProviders: async (providers) => deleteParamFilters(providers),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: request
 * translation and the executor auto-learn path read filters without awaiting.
 */
export const sqliteParamFilterLegacySync = {
  list: listParamFilters,
  listProviderKeys: listParamFilterProviderKeys,
  upsert: upsertParamFilter,
  deleteByProviders: deleteParamFilters,
};
