/**
 * SQLite implementation for per-provider interception rules (#3384), stored in the
 * key_value table under namespace "interception_rules" (migration 120).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle.
 */

import type {
  FetchInterceptionBackend,
  InterceptionRuleRepository,
  ModelInterceptionRule,
  ProviderInterceptionRules,
  StoredInterceptionRules,
} from "@/domain/persistence/interceptionRuleRepository";
import { getDbInstance } from "../core";

const NAMESPACE = "interception_rules";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toNormalizedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toOptionalBool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function toFetchBackend(value: unknown): FetchInterceptionBackend | undefined {
  return value === "firecrawl" || value === "jina" || value === "tavily" ? value : undefined;
}

function parseStoredValue(raw: unknown): unknown {
  if (typeof raw !== "string") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function toModelInterceptionRule(raw: unknown): ModelInterceptionRule | null {
  if (!isRecord(raw)) return null;
  const rule: ModelInterceptionRule = {
    interceptSearch: toOptionalBool(raw.interceptSearch),
    interceptFetch: toOptionalBool(raw.interceptFetch),
    fetchBackend: toFetchBackend(raw.fetchBackend),
    fetchProxyUrl: toNormalizedString(raw.fetchProxyUrl) ?? undefined,
  };
  const hasAnyField = Object.values(rule).some((v) => v !== undefined);
  return hasAnyField ? rule : null;
}

function toModelInterceptionRules(raw: unknown): Record<string, ModelInterceptionRule> {
  const models: Record<string, ModelInterceptionRule> = {};
  if (!isRecord(raw)) return models;
  for (const [modelId, val] of Object.entries(raw)) {
    const rule = toModelInterceptionRule(val);
    if (rule) models[modelId] = rule;
  }
  return models;
}

function toProviderInterceptionRules(raw: unknown): ProviderInterceptionRules | null {
  if (!isRecord(raw)) return null;
  const models = toModelInterceptionRules(raw.models);
  return {
    interceptSearch: toOptionalBool(raw.interceptSearch),
    interceptFetch: toOptionalBool(raw.interceptFetch),
    fetchBackend: toFetchBackend(raw.fetchBackend),
    fetchProxyUrl: toNormalizedString(raw.fetchProxyUrl) ?? undefined,
    models: Object.keys(models).length > 0 ? models : undefined,
  };
}

function listInterceptionRules(): StoredInterceptionRules[] {
  const rows = getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key: string; value: string }>;

  // Same key collapsing as building a record from the rows: a later row replaces an
  // earlier one with the same key, keeping the earlier key's position.
  const values: Record<string, unknown> = {};
  for (const row of rows) {
    values[row.key] = parseStoredValue(row.value);
  }

  const stored: StoredInterceptionRules[] = [];
  for (const [provider, value] of Object.entries(values)) {
    const rules = toProviderInterceptionRules(value);
    if (rules) stored.push({ provider, rules });
  }
  return stored;
}

function upsertInterceptionRules(provider: string, rules: ProviderInterceptionRules): void {
  const normalized: ProviderInterceptionRules = {
    interceptSearch: rules.interceptSearch,
    interceptFetch: rules.interceptFetch,
    fetchBackend: rules.fetchBackend,
    fetchProxyUrl: rules.fetchProxyUrl,
    models: rules.models && Object.keys(rules.models).length > 0 ? rules.models : undefined,
  };

  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NAMESPACE, provider, JSON.stringify(normalized));
}

function deleteInterceptionRules(provider: string): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(NAMESPACE, provider);
}

export const sqliteInterceptionRuleRepository: InterceptionRuleRepository = {
  list: async () => listInterceptionRules(),
  upsert: async (provider, rules) => upsertInterceptionRules(provider, rules),
  deleteByProvider: async (provider) => deleteInterceptionRules(provider),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * request path resolves interception overrides without awaiting.
 */
export const sqliteInterceptionRuleLegacySync = {
  list: listInterceptionRules,
  upsert: upsertInterceptionRules,
  deleteByProvider: deleteInterceptionRules,
};
