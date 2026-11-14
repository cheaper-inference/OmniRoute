import {
  canonicalKimiModel,
  canonicalKimiProvider,
} from "@omniroute/open-sse/config/kimiProvider.ts";
import type { SqliteAdapter } from "../adapters/types";

import {
  record,
  mergeConfig,
  modelIdentity,
  mergeCollection,
  type Row,
} from "../models/kimiModelMerge";
export {
  record,
  mergeConfig,
  modelIdentity,
  mergeCollection,
  type Row,
} from "../models/kimiModelMerge";

function targetModelFields(result: Row, value: Row, ownsModel: boolean): void {
  for (const key of ["model", "modelId", "modelStr", "targetModel", "modelPattern"]) {
    if (key === "modelPattern" && value.kind === "provider-wildcard") continue;
    if (ownsModel && typeof result[key] === "string") result[key] = canonicalKimiModel(result[key]);
  }
}

export function target(value: unknown): unknown {
  if (typeof value === "string") return canonicalKimiModel(value);
  if (Array.isArray(value)) return value.map(target);
  if (!record(value)) return value;
  const result = { ...value };
  const owner = typeof value.providerId === "string" ? value.providerId : value.provider;
  const ownsModel = typeof owner !== "string" || canonicalKimiProvider(owner) === "kimi";
  for (const key of ["provider", "providerId"]) {
    if (typeof result[key] === "string") result[key] = canonicalKimiProvider(result[key]);
  }
  targetModelFields(result, value, ownsModel);
  for (const key of ["models", "targets", "steps", "fallbackModels", "config"]) {
    if (key in result) result[key] = target(result[key]);
  }
  return result;
}

export function jsonTransform(raw: unknown, transform: (value: unknown) => unknown): unknown {
  if (typeof raw !== "string") return raw;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return raw;
  }
  const next = transform(value);
  return JSON.stringify(next) === JSON.stringify(value) ? raw : JSON.stringify(next);
}

export function budgetPolicy(legacy: Row, canonical: Row): Row {
  const oldEnabled = Boolean(legacy.enabled);
  const newEnabled = Boolean(canonical.enabled);
  const schedule = (row: Row) => row.reset_time || "00:00";
  if (oldEnabled && newEnabled && schedule(legacy) !== schedule(canonical)) {
    throw new Error("Kimi token limits have incompatible active reset schedules");
  }
  const winner = oldEnabled && !newEnabled ? legacy : canonical;
  return {
    ...canonical,
    enabled: oldEnabled || newEnabled ? 1 : 0,
    reset_time: winner.reset_time,
    token_limit:
      oldEnabled && newEnabled
        ? Math.min(Number(legacy.token_limit), Number(canonical.token_limit))
        : winner.token_limit,
  };
}

function mergeTemplateLimit(v: Row, next: Row, current: Row): Row {
  const isOld =
    typeof v.scopeValue === "string" &&
    (v.scopeValue === "moonshot" || v.scopeValue.startsWith("moonshot/"));
  const from = (r: Row): Row => ({
    enabled: r.enabled,
    token_limit: r.tokenLimit,
    reset_time: r.resetTime,
  });
  const selected = budgetPolicy(from(isOld ? next : current), from(isOld ? current : next));
  return {
    ...current,
    ...next,
    enabled: Boolean(selected.enabled),
    tokenLimit: selected.token_limit,
    resetTime: selected.reset_time,
  };
}

function mergeTemplateLimits(limits: unknown[]): Row[] {
  const merged = new Map<string, Row>();
  // Canonical definitions establish precedence irrespective of array order.
  for (const [index, v] of limits.entries()) {
    if (!record(v)) continue;
    const next = { ...v };
    if (next.scopeType === "provider" && typeof next.scopeValue === "string")
      next.scopeValue = canonicalKimiProvider(next.scopeValue);
    const slot =
      next.scopeType === "model"
        ? "model:" + index
        : JSON.stringify([next.scopeType, next.scopeValue, next.resetInterval]);
    const current = merged.get(slot);
    if (!current) merged.set(slot, next);
    else {
      merged.set(slot, mergeTemplateLimit(v, next, current));
    }
  }
  return [...merged.values()];
}

function template(value: unknown): unknown {
  if (!record(value) || value.schemaVersion !== 1 || !record(value.key) || !record(value.related))
    return value;
  const key = { ...value.key };
  for (const field of ["allowedModels", "blockedModels"]) {
    if (Array.isArray(key[field]))
      key[field] = key[field].map((v) => (typeof v === "string" ? canonicalKimiModel(v) : v));
  }
  if (typeof key.forcedModel === "string") key.forcedModel = canonicalKimiModel(key.forcedModel);
  const related = { ...value.related };
  if (Array.isArray(related.reasoningRules))
    related.reasoningRules = related.reasoningRules.map(target);
  if (Array.isArray(related.tokenLimits)) {
    const limits = related.tokenLimits;
    if (!limits.every((v) => record(v) && typeof v.scopeValue === "string")) return value;
    related.tokenLimits = mergeTemplateLimits(limits);
  }
  return { ...value, key, related };
}

function supportedProviderValue(namespace: string, value: unknown): boolean {
  if (namespace === "customModels" || namespace === "modelCompatOverrides") {
    return Array.isArray(value) && value.every((v) => record(v) && typeof v.id === "string");
  }
  if (namespace === "syncedAvailableModels") {
    return (
      Array.isArray(value) &&
      value.every(
        (v) =>
          typeof v === "string" ||
          (record(v) && ["id", "name", "model"].some((key) => typeof v[key] === "string"))
      )
    );
  }
  if (namespace === "discoveryState")
    return (
      record(value) &&
      ["healthy", "degraded"].includes(String(value.status)) &&
      typeof value.at === "string"
    );
  if (namespace === "providerAliases")
    return record(value) && Object.values(value).every((v) => typeof v === "string");
  return record(value) && Object.values(value).every(record);
}

type SettingRow = { namespace: string; key: string; value: string };
type RenamedAliases = Map<string, { key: string; collided: boolean }>;

const providerMaps = new Set([
  "customModels",
  "modelCompatOverrides",
  "pricing",
  "pricing_synced",
  "models_dev_pricing",
  "providerAliases",
]);
const connectionMaps = new Set(["syncedAvailableModels", "discoveryState"]);
const qualifiedKeys = new Set(["modelAliases", "functionalGatewayMirrors", "ccDiscoveryAliases"]);

function settingKey(row: SettingRow): string {
  let key = row.key;
  if (providerMaps.has(row.namespace) && key === "moonshot") key = "kimi";
  else if (connectionMaps.has(row.namespace) && key.startsWith("moonshot:"))
    key = "kimi:" + key.slice(9);
  else if (qualifiedKeys.has(row.namespace)) {
    key = canonicalKimiModel(key);
    if (row.namespace !== "modelAliases") {
      if (key === "provider:moonshot") key = "provider:kimi";
      if (key.startsWith("model:moonshot/")) key = "model:kimi/" + key.slice(15);
    }
  }
  return key;
}

function aliasMapping(mapping: unknown): unknown {
  if (typeof mapping === "string") return canonicalKimiModel(mapping);
  if (record(mapping) && typeof mapping.model === "string")
    return { ...mapping, model: canonicalKimiModel(mapping.model) };
  return mapping;
}

function aliasValue(value: unknown, namespace: string): unknown {
  if (typeof value === "string") return canonicalKimiModel(value);
  if (namespace !== "mitmAlias" || !record(value)) return value;
  if (typeof value.model === "string") return aliasMapping(value);
  return Object.fromEntries(
    Object.entries(value).map(([alias, mapping]) => [alias, aliasMapping(mapping)])
  );
}

function settingValue(row: SettingRow): unknown {
  if (row.namespace === "modelAliases" || row.namespace === "mitmAlias")
    return jsonTransform(row.value, (v) => aliasValue(v, row.namespace));
  if (row.namespace === "proxyConfig" && row.key === "providers") {
    return jsonTransform(row.value, (v) => {
      if (!record(v) || !("moonshot" in v)) return v;
      const providers = { ...v };
      providers.kimi =
        "kimi" in providers ? mergeConfig(providers.moonshot, providers.kimi) : providers.moonshot;
      delete providers.moonshot;
      return providers;
    });
  }
  return row.value;
}

function mergeSettingCollections(namespace: string, old: unknown, current: unknown): unknown {
  return Array.isArray(old) &&
    Array.isArray(current) &&
    ["customModels", "modelCompatOverrides", "syncedAvailableModels"].includes(namespace)
    ? mergeCollection(
        old,
        current,
        namespace === "syncedAvailableModels"
          ? modelIdentity
          : (v) => (record(v) && typeof v.id === "string" ? v.id : undefined),
        namespace === "customModels"
      )
    : mergeConfig(old, current);
}

function renameSettingRow(
  db: SqliteAdapter,
  row: SettingRow,
  key: string,
  value: unknown,
  renamedAliases: RenamedAliases
): void {
  const destination = db
    .prepare<{ value: string }>("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(row.namespace, key);
  // Unknown/malformed JSON must remain byte-for-byte at its original key.
  if (
    ["functionalGatewayMirrors", "ccDiscoveryAliases"].includes(row.namespace) &&
    ["on", "off"].includes(row.value)
  ) {
    db.prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES(?,?,?)").run(
      row.namespace,
      key,
      destination?.value ?? value
    );
    db.prepare("DELETE FROM key_value WHERE namespace=? AND key=?").run(row.namespace, row.key);
    return;
  }
  let old: unknown;
  let current: unknown;
  try {
    old = JSON.parse(String(value));
    current = destination ? JSON.parse(destination.value) : undefined;
  } catch {
    return;
  }
  const supported =
    providerMaps.has(row.namespace) || connectionMaps.has(row.namespace)
      ? supportedProviderValue(row.namespace, old) &&
        (!destination || supportedProviderValue(row.namespace, current))
      : true;
  if (!supported) return;
  if (destination) value = JSON.stringify(mergeSettingCollections(row.namespace, old, current));
  db.prepare("INSERT OR REPLACE INTO key_value (namespace,key,value) VALUES (?,?,?)").run(
    row.namespace,
    key,
    value
  );
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(row.namespace, row.key);
  if (row.namespace === "modelAliases")
    renamedAliases.set(row.key, { key, collided: Boolean(destination) });
}

function migrateManagedAliases(
  db: SqliteAdapter,
  rows: SettingRow[],
  renamedAliases: RenamedAliases
): void {
  for (const row of rows.filter((r) => r.namespace === "managedModelAliasNames")) {
    const value = jsonTransform(row.value, (v) => {
      if (!Array.isArray(v) || !v.every((n) => typeof n === "string")) return v;
      const managed = new Set(v);
      return [
        ...new Set(
          v.flatMap((name) => {
            const renamed = renamedAliases.get(name);
            if (!renamed) return [name];
            // A legacy managed alias must never adopt a colliding, user-created canonical alias.
            return renamed.collided && !managed.has(renamed.key) ? [] : [renamed.key];
          })
        ),
      ];
    });
    if (value !== row.value)
      db.prepare("UPDATE key_value SET value=? WHERE namespace=? AND key=?").run(
        value,
        row.namespace,
        row.key
      );
  }
}

export function migrateKimiSettings(db: SqliteAdapter): void {
  const rows = db.prepare<SettingRow>("SELECT * FROM key_value").all();
  const renamedAliases: RenamedAliases = new Map();
  for (const row of rows) {
    const key = settingKey(row);
    const value = settingValue(row);
    if (key !== row.key) renameSettingRow(db, row, key, value, renamedAliases);
    else if (value !== row.value)
      db.prepare("UPDATE key_value SET value = ? WHERE namespace = ? AND key = ?").run(
        value,
        row.namespace,
        key
      );
  }
  migrateManagedAliases(db, rows, renamedAliases);
  for (const row of db
    .prepare<Row>("SELECT api_key_id, shared_quota_providers FROM api_key_self_service_settings")
    .all()) {
    const value = jsonTransform(row.shared_quota_providers, (v) =>
      Array.isArray(v) && v.every((item) => typeof item === "string")
        ? [...new Set(v.map(canonicalKimiProvider))]
        : v
    );
    if (value !== row.shared_quota_providers)
      db.prepare(
        "UPDATE api_key_self_service_settings SET shared_quota_providers=? WHERE api_key_id=?"
      ).run(value, row.api_key_id);
  }
  for (const row of db.prepare<Row>("SELECT id, policy FROM key_templates").all()) {
    const policy = jsonTransform(row.policy, template);
    if (policy !== row.policy)
      db.prepare("UPDATE key_templates SET policy = ? WHERE id = ?").run(policy, row.id);
  }
}
