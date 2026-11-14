import { migrateKimiPolicies, preflightKimiPolicies } from "./kimiPolicies";
import {
  canonicalKimiModel,
  canonicalKimiProvider,
} from "@omniroute/open-sse/config/kimiProvider.ts";
import type { SqliteAdapter } from "../adapters/types";
import { migrateKimiTokenBudgets, mergeQuotaLedger } from "./kimiBudgets";
import {
  jsonTransform,
  mergeCollection,
  mergeConfig,
  modelIdentity,
  migrateKimiSettings,
  record,
  target,
  type Row,
} from "./kimiSettings";

class PreserveLegacyKimiJsonError extends Error {}

function update(db: SqliteAdapter, table: string, row: Row, keys: string[], original = row): void {
  const fields = Object.keys(row);
  db.prepare(
    "UPDATE " +
      table +
      " SET " +
      fields.map((k) => '"' + k + '" = ?').join(",") +
      " WHERE " +
      keys.map((k) => '"' + k + '" IS ?').join(" AND ")
  ).run(...fields.map((k) => row[k]), ...keys.map((k) => original[k]));
}

function mergeProviderCollision(
  db: SqliteAdapter,
  table: string,
  keys: string[],
  where: string,
  old: Row,
  current: Row,
  merge: (old: Row, current: Row) => Row
): void {
  let merged: Row;
  try {
    merged = merge(old, current);
  } catch (error) {
    if (error instanceof PreserveLegacyKimiJsonError) return;
    throw error;
  }
  update(db, table, merged, keys, current);
  db.prepare("DELETE FROM " + table + " WHERE " + where).run(...keys.map((k) => old[k]));
}

function mergeProviderRows(
  db: SqliteAdapter,
  table: string,
  field: string,
  keys: string[],
  merge: (old: Row, current: Row) => Row = (old, current) => ({ ...old, ...current }),
  qualified = false
): void {
  const rows = db
    .prepare<Row>(
      "SELECT * FROM " +
        table +
        " WHERE " +
        field +
        (qualified ? " LIKE 'moonshot/%'" : " = 'moonshot'") +
        (qualified && keys.includes("provider") ? " AND provider = 'kimi'" : "") +
        (table === "provider_quota_state"
          ? " AND connection_id IN (SELECT id FROM provider_connections WHERE provider IN ('kimi','moonshot'))"
          : "")
    )
    .all();
  for (const old of rows) {
    const next = { ...old, [field]: qualified ? canonicalKimiModel(String(old[field])) : "kimi" };
    if (next[field] === old[field]) continue;
    const where = keys.map((k) => '"' + k + '" IS ?').join(" AND ");
    const current = db
      .prepare<Row>("SELECT * FROM " + table + " WHERE " + where)
      .get(...keys.map((k) => next[k]));
    if (current) {
      mergeProviderCollision(db, table, keys, where, old, current, merge);
    } else update(db, table, next, keys, old);
  }
}

function latest(a: unknown, b: unknown): unknown {
  return String(a || "") > String(b || "") ? a : b;
}

function issuance(old: Row, current: Row): Row {
  const result = { ...current };
  for (const key of ["max_active_keys", "daily_issue_limit", "hourly_issue_limit"]) {
    result[key] =
      old[key] === null
        ? current[key]
        : current[key] === null
          ? old[key]
          : Math.min(Number(old[key]), Number(current[key]));
  }
  for (const [bucket, count] of [
    ["last_reset_day", "daily_issued"],
    ["last_reset_hour", "hourly_issued"],
  ]) {
    if (old[bucket] === current[bucket])
      result[count] = Number(old[count]) + Number(current[count]);
    else if (String(old[bucket] || "") > String(current[bucket] || "")) {
      result[bucket] = old[bucket];
      result[count] = old[count];
    }
  }
  return result;
}

function migrateKimiProxyScopes(db: SqliteAdapter): void {
  const current = db
    .prepare<{ count: number; position: number | null }>(
      "SELECT COUNT(*) AS count, MAX(position) AS position FROM proxy_assignments WHERE scope='provider' AND scope_id='kimi'"
    )
    .get()!;
  let position = current.position ?? -1;
  const legacy = db
    .prepare<Row>(
      "SELECT * FROM proxy_assignments WHERE scope='provider' AND scope_id='moonshot' ORDER BY position, datetime(created_at), id"
    )
    .all();
  for (const row of legacy) {
    const duplicate = db
      .prepare(
        "SELECT 1 FROM proxy_assignments WHERE scope='provider' AND scope_id='kimi' AND proxy_id=?"
      )
      .get(row.proxy_id);
    if (duplicate) db.prepare("DELETE FROM proxy_assignments WHERE id=?").run(row.id);
    else
      db.prepare("UPDATE proxy_assignments SET scope_id='kimi',position=? WHERE id=?").run(
        current.count > 0 ? ++position : row.position,
        row.id
      );
  }
  db.prepare(
    "DELETE FROM proxy_scope_rotation WHERE scope='provider' AND scope_id='moonshot' AND EXISTS (SELECT 1 FROM proxy_scope_rotation WHERE scope='provider' AND scope_id='kimi')"
  ).run();
  db.prepare(
    "UPDATE proxy_scope_rotation SET scope_id='kimi' WHERE scope='provider' AND scope_id='moonshot'"
  ).run();
  for (const row of db.prepare<Row>("SELECT id,rule_providers FROM proxy_subscriptions").all()) {
    const value = jsonTransform(row.rule_providers, (v) =>
      Array.isArray(v) && v.every((id) => typeof id === "string")
        ? [...new Set(v.map(canonicalKimiProvider))]
        : v
    );
    if (value !== row.rule_providers)
      db.prepare("UPDATE proxy_subscriptions SET rule_providers=? WHERE id=?").run(value, row.id);
  }
}

function migrateKimiProviderRows(db: SqliteAdapter): void {
  mergeProviderRows(db, "provider_key_limits", "provider", ["provider"], issuance);
  mergeProviderRows(db, "tier_assignments", "provider", ["provider", "model"]);
  mergeProviderRows(db, "model_capabilities", "provider", ["provider", "model_id"]);
  mergeProviderRows(db, "model_capability_overrides", "provider", [
    "provider",
    "model_id",
    "override_key",
  ]);
  mergeProviderRows(
    db,
    "model_context_overrides",
    "provider",
    ["provider", "model_id"],
    (old, current) =>
      old.source === "manual" && current.source !== "manual"
        ? { ...old, provider: "kimi" }
        : current
  );
}

function migrateKimiRoutingState(db: SqliteAdapter, now: number): void {
  mergeProviderRows(
    db,
    "session_account_affinity",
    "provider",
    ["session_key", "provider"],
    (old, current) =>
      String(old.last_seen_at) > String(current.last_seen_at)
        ? { ...old, provider: "kimi" }
        : current
  );
  mergeProviderRows(
    db,
    "combo_adaptation_state",
    "provider_id",
    ["combo_id", "provider_id"],
    (old, current) => ({
      ...(String(old.updated_at || "") > String(current.updated_at || "") ? old : current),
      id: current.id,
      provider_id: "kimi",
      last_failure_at: latest(old.last_failure_at, current.last_failure_at),
      excluded_until: latest(old.excluded_until, current.excluded_until),
    })
  );
  mergeProviderRows(
    db,
    "provider_quota_state",
    "model",
    ["connection_id", "model"],
    (old, current) => mergeQuotaLedger(old, current, now),
    true
  );
  mergeProviderRows(
    db,
    "upstream_proxy_config",
    "provider_id",
    ["provider_id"],
    (old, current) => ({
      ...current,
      cliproxyapi_model_mapping: mergeJson(
        old.cliproxyapi_model_mapping,
        current.cliproxyapi_model_mapping
      ),
    })
  );
  mergeProviderRows(
    db,
    "discovery_results",
    "provider_id",
    ["provider_id", "method", "endpoint"],
    (old, current) => ({
      ...current,
      models: mergeJson(old.models, current.models),
    })
  );
}

function canonicalReferenceValue(field: string, value: string): unknown {
  if (field === "provider") return value === "moonshot" ? "kimi" : value;
  if (["allowed_models", "blocked_models"].includes(field))
    return jsonTransform(value, (v) => (Array.isArray(v) ? v.map(target) : v));
  if (field === "data") return jsonTransform(value, target);
  return canonicalKimiModel(value);
}

function canonicalReferenceRow(row: Row, fields: readonly string[]): Row {
  const next = { ...row };
  for (const field of fields) {
    if (typeof row[field] !== "string") continue;
    if (
      field !== "provider" &&
      typeof row.provider === "string" &&
      row.provider !== "kimi" &&
      row.provider !== "moonshot"
    )
      continue;
    next[field] = canonicalReferenceValue(field, row[field]);
  }
  return next;
}

function migrateKimiModelReferences(db: SqliteAdapter): void {
  for (const [table, fields] of [
    ["api_keys", ["allowed_models", "blocked_models", "forced_model"]],
    ["group_model_permissions", ["provider"]],
    ["reasoning_routing_rules", ["model_pattern", "target_model"]],
    ["session_model_history", ["provider", "model_str"]],
    ["relay_tokens", ["allowed_models"]],
    ["combos", ["data"]],
  ] as const) {
    const info = db.prepare<{ name: string; pk: number }>("PRAGMA table_info(" + table + ")").all();
    const keys = info.filter((column) => column.pk).map((column) => column.name);
    for (const row of db.prepare<Row>("SELECT * FROM " + table).all()) {
      const next = canonicalReferenceRow(row, fields);
      if (fields.some((field) => next[field] !== row[field])) update(db, table, next, keys, row);
    }
  }
}

function migrateKimiFallbackChains(db: SqliteAdapter): void {
  const preservedFallbackModels = new Set<unknown>();
  mergeProviderRows(
    db,
    "domain_fallback_chains",
    "model",
    ["model"],
    (old, current) => {
      try {
        return {
          ...current,
          chain: mergeJson(
            jsonTransform(old.chain, normalizeFallbackChain),
            jsonTransform(current.chain, normalizeFallbackChain),
            true
          ),
        };
      } catch (error) {
        if (error instanceof PreserveLegacyKimiJsonError) {
          preservedFallbackModels.add(old.model);
          preservedFallbackModels.add(current.model);
        }
        throw error;
      }
    },
    true
  );
  for (const row of db.prepare<Row>("SELECT * FROM domain_fallback_chains").all()) {
    if (preservedFallbackModels.has(row.model)) continue;
    const chain = jsonTransform(row.chain, normalizeFallbackChain);
    if (chain !== row.chain)
      db.prepare("UPDATE domain_fallback_chains SET chain = ? WHERE model = ?").run(
        chain,
        row.model
      );
  }
}

/** Called only inside the runner's transaction, before its ledger marker is inserted. */
export function migrateCanonicalKimi(db: SqliteAdapter, now = Date.now()): void {
  preflightKimiPolicies(db);
  migrateKimiTokenBudgets(db, now);
  db.prepare("UPDATE provider_connections SET provider = 'kimi' WHERE provider = 'moonshot'").run();
  for (const table of ["registered_keys", "provider_plans"]) {
    db.prepare("UPDATE " + table + " SET provider = 'kimi' WHERE provider = 'moonshot'").run();
  }
  migrateKimiProviderRows(db);
  migrateKimiRoutingState(db, now);
  migrateKimiModelReferences(db);
  migrateKimiFallbackChains(db);
  migrateKimiProxyScopes(db);
  migrateKimiSettings(db);
  migrateKimiPolicies(db);
}

function isFallbackEntries(value: unknown): value is Row[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        record(v) &&
        typeof v.provider === "string" &&
        (v.priority === undefined ||
          v.priority === null ||
          (typeof v.priority === "number" && Number.isFinite(v.priority))) &&
        (v.enabled === undefined || typeof v.enabled === "boolean")
    )
  );
}

function fallbackPriorityOrder(a: Row, b: Row): number {
  return Number(a.priority ?? 0) - Number(b.priority ?? 0);
}

function normalizeFallbackChain(value: unknown): unknown {
  if (!isFallbackEntries(value) || !value.some((v) => v.provider === "moonshot")) return value;
  const canonical = value.filter((v) => v.provider === "kimi");
  const merged = mergeCollection(
    value.filter((v) => v.provider === "moonshot").map((v) => ({ ...v, provider: "kimi" })),
    canonical,
    (v) => (record(v) && typeof v.provider === "string" ? v.provider : undefined)
  ) as Row[];
  let index = 0;
  return value
    .flatMap((v) =>
      v.provider === "moonshot"
        ? canonical.length
          ? []
          : [{ ...v, provider: "kimi" }]
        : v.provider === "kimi"
          ? [merged[index++]]
          : [v]
    )
    .sort(fallbackPriorityOrder);
}

function mergeJson(old: unknown, current: unknown, fallback = false): unknown {
  if (typeof old !== "string" || typeof current !== "string") return current;
  let legacy: unknown, canonical: unknown;
  try {
    legacy = JSON.parse(old);
    canonical = JSON.parse(current);
  } catch {
    throw new PreserveLegacyKimiJsonError(
      "Preserve malformed legacy Kimi configuration at its original key"
    );
  }
  if (fallback && (!isFallbackEntries(legacy) || !isFallbackEntries(canonical))) {
    throw new PreserveLegacyKimiJsonError(
      "Preserve unsupported legacy Kimi fallback configuration at its original key"
    );
  }
  const merged =
    Array.isArray(legacy) && Array.isArray(canonical)
      ? mergeCollection(
          legacy,
          canonical,
          fallback
            ? (v) =>
                typeof v === "string"
                  ? v
                  : v && typeof v === "object" && "provider" in v && typeof v.provider === "string"
                    ? v.provider
                    : undefined
            : (v) => (typeof v === "string" ? v : modelIdentity(v))
        )
      : mergeConfig(legacy, canonical);
  if (fallback && isFallbackEntries(merged)) merged.sort(fallbackPriorityOrder);
  return JSON.stringify(merged);
}
