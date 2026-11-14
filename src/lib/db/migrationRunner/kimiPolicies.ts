import {
  canonicalKimiModel,
  canonicalKimiProvider,
} from "@omniroute/open-sse/config/kimiProvider.ts";
import type { SqliteAdapter } from "../adapters/types";
import { jsonTransform, mergeConfig, record, type Row } from "./kimiSettings";

function providerMap(
  value: unknown,
  accepts: (v: unknown) => boolean = (v) => record(v) || v === null
): unknown {
  if (
    !record(value) ||
    !("moonshot" in value) ||
    !accepts(value.moonshot) ||
    ("kimi" in value && !accepts(value.kimi))
  )
    return value;
  const result: Row = {
    ...value,
    kimi: "kimi" in value ? mergeConfig(value.moonshot, value.kimi) : value.moonshot,
  };
  delete result.moonshot;
  return result;
}
function qualifiedMap(value: unknown): unknown {
  if (!record(value)) return value;
  const result = { ...value };
  for (const [key, old] of Object.entries(value)) {
    const next = canonicalKimiModel(key);
    if (
      next !== key &&
      typeof old === "number" &&
      Number.isFinite(old) &&
      (!(next in value) || (typeof value[next] === "number" && Number.isFinite(value[next])))
    ) {
      if (!(next in value)) result[next] = old;
      delete result[key];
    }
  }
  return result;
}
function providerOrder(value: unknown, canonicalPosition = false): unknown {
  if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) return value;
  const hasCanonical = canonicalPosition && value.includes("kimi");
  let seen = false;
  return value.flatMap((v) => {
    if (v !== "moonshot" && v !== "kimi") return [v];
    if (v === "moonshot" && hasCanonical) return [];
    if (seen) return [];
    seen = true;
    return ["kimi"];
  });
}
function connectionIds(db: SqliteAdapter): Set<string> {
  return new Set(
    db
      .prepare<{ id: string }>("SELECT id FROM provider_connections")
      .all()
      .map((v) => v.id.toLowerCase())
  );
}
function selectorKind(id: string, ids: Set<string>): string {
  return ids.has(id.toLowerCase()) ? "connection" : "provider";
}
function normalizedSelector(id: string, ids: Set<string>): string {
  // A canonical spelling may itself be a connection ID; keep the provider alias distinguishable.
  return selectorKind(id, ids) === "connection" || ids.has("kimi") ? id : canonicalKimiProvider(id);
}
function providerRows(
  value: unknown,
  field: string,
  modelField?: string,
  ids = new Set<string>()
): unknown {
  if (
    !Array.isArray(value) ||
    !value.every(
      (v) =>
        record(v) &&
        typeof v[field] === "string" &&
        (!modelField || v[modelField] === undefined || typeof v[modelField] === "string")
    )
  )
    return value;
  const rows = value as Row[];
  const identity = (row: Row) =>
    JSON.stringify([
      selectorKind(String(row[field]), ids),
      normalizedSelector(String(row[field]), ids),
      modelField ? (row[modelField] ?? null) : null,
    ]);
  const canonical = new Set(
    rows
      .filter((v) => v[field] === "kimi" && selectorKind("kimi", ids) === "provider")
      .map(identity)
  );
  return rows.flatMap((row) => {
    const id = String(row[field]),
      next = normalizedSelector(id, ids);
    if (next === id) return [row];
    if (canonical.has(identity(row))) return [];
    return [{ ...row, [field]: next }];
  });
}
function validChaos(value: unknown): value is Row & { providerOverrides: Row[] } {
  if (
    !record(value) ||
    !Array.isArray(value.providerOverrides) ||
    value.providerOverrides.length > 200
  )
    return false;
  if (value.enabled !== undefined && typeof value.enabled !== "boolean") return false;
  if (
    value.defaultMode !== undefined &&
    !["parallel", "collaborative"].includes(String(value.defaultMode))
  )
    return false;
  if (
    value.systemPrompt !== undefined &&
    (typeof value.systemPrompt !== "string" || value.systemPrompt.length > 10000)
  )
    return false;
  for (const [key, min, max] of [
    ["timeoutMs", 5000, 600000],
    ["maxTokens", 256, 128000],
  ] as const) {
    const v = value[key];
    if (v !== undefined && !(typeof v === "number" && Number.isInteger(v) && v >= min && v <= max))
      return false;
  }
  return value.providerOverrides.every(
    (v) =>
      record(v) &&
      typeof v.providerId === "string" &&
      v.providerId.length > 0 &&
      (v.enabled === undefined || typeof v.enabled === "boolean") &&
      (v.modelId === undefined || typeof v.modelId === "string")
  );
}
function validTier(value: unknown): value is Row {
  if (
    !record(value) ||
    !record(value.defaults) ||
    (value.version !== undefined && typeof value.version !== "string")
  )
    return false;
  if (
    ["freeThreshold", "cheapThreshold"].some(
      (key) =>
        value.defaults &&
        record(value.defaults) &&
        value.defaults[key] !== undefined &&
        !(
          typeof value.defaults[key] === "number" &&
          Number.isFinite(value.defaults[key]) &&
          Number(value.defaults[key]) >= 0
        )
    )
  )
    return false;
  for (const [field, model] of [
    ["providerOverrides", false],
    ["modelOverrides", true],
  ] as const) {
    const rows = value[field];
    if (
      rows !== undefined &&
      (!Array.isArray(rows) ||
        !rows.every(
          (v) =>
            record(v) &&
            typeof v.provider === "string" &&
            v.provider.length > 0 &&
            ["free", "cheap", "premium"].includes(String(v.tier)) &&
            (!model || (typeof v.modelPattern === "string" && v.modelPattern.length > 0))
        ))
    )
      return false;
  }
  return (
    value.freeProviders === undefined ||
    (Array.isArray(value.freeProviders) && value.freeProviders.every((v) => typeof v === "string"))
  );
}

function tierRows(value: unknown, modelField?: string): unknown {
  if (!Array.isArray(value)) return value;
  const rows = (value as Row[]).map((row) => {
    const provider = String(row.provider).toLowerCase();
    return provider === "kimi" || provider === "moonshot" ? { ...row, provider } : row;
  });
  return providerRows(rows, "provider", modelField);
}

function normalizeChaosSelectors(rows: Row[], ids: Set<string>): Row[] {
  return rows.map((row) => {
    const selector = String(row.providerId).toLowerCase();
    return (selector === "kimi" || selector === "moonshot") && !ids.has(selector)
      ? { ...row, providerId: selector }
      : row;
  });
}

function chaos(value: unknown, ids: Set<string>): unknown {
  if (!validChaos(value)) return value;
  const rows = providerRows(
    normalizeChaosSelectors(value.providerOverrides, ids),
    "providerId",
    undefined,
    ids
  );
  return { ...value, providerOverrides: rows };
}

/** Refuse Chaos selector collisions that cannot preserve account selection. */
export function preflightKimiPolicies(db: SqliteAdapter): void {
  const row = db
    .prepare<{ value: string }>(
      "SELECT value FROM key_value WHERE namespace='settings' AND key='chaosModeConfig'"
    )
    .get();
  if (!row) return;
  let value: unknown;
  try {
    value = JSON.parse(row.value);
  } catch {
    return;
  }
  if (!validChaos(value)) return;
  const ids = connectionIds(db);
  const original = normalizeChaosSelectors(value.providerOverrides, ids);
  for (const selector of ["kimi", "moonshot"])
    if (
      ids.has(selector) &&
      original.some((v) => String(v.providerId).toLowerCase() === selector) &&
      db
        .prepare("SELECT id FROM provider_connections WHERE lower(provider)=? AND lower(id)<>?")
        .get(selector, selector)
    )
      throw new Error(
        "Kimi Chaos connection/provider ambiguity for selector '" +
          selector +
          "': rename the colliding connection ID or resolve its stored override before retrying migration"
      );
  const next = chaos(value, ids) as Row;
  const after = next.providerOverrides as Row[];
  const active = db
    .prepare<Row>("SELECT id,provider,is_active FROM provider_connections")
    .all()
    .filter((v) => v.is_active !== 0);
  const matchesSelector = (selector: Row, connection: Row) => {
    const id = String(selector.providerId).toLowerCase();
    if (ids.has(id) && canonicalKimiProvider(id) === "kimi")
      return String(connection.id).toLowerCase() === id;
    return (
      String(connection.id).toLowerCase() === id ||
      canonicalKimiProvider(id) === canonicalKimiProvider(String(connection.provider).toLowerCase())
    );
  };
  const identity = (v: Row) => JSON.stringify([v.providerId]);
  const disabled = new Set(
    original
      .filter((v) => v.providerId === "kimi" && v.enabled === false && !ids.has("kimi"))
      .map(identity)
  );
  const lost = original.some(
    (v) =>
      v.providerId === "moonshot" &&
      !ids.has("moonshot") &&
      normalizedSelector("moonshot", ids) === "kimi" &&
      v.enabled !== false &&
      disabled.has(identity({ ...v, providerId: "kimi" })) &&
      active.some((c) => matchesSelector(v, c))
  );
  if (!lost) return;
  const matches = after.some(
    (v) => v.enabled !== false && active.some((c) => matchesSelector(v, c))
  );
  if (!matches) throw new Error("Kimi chaos selector conflict would broaden the active selection");
}

function globalSetting(key: string, value: unknown, ids: Set<string>): unknown {
  if (["providerStrategies", "providerErrorDefaults", "providerOverrides"].includes(key))
    return providerMap(value);
  if (key === "providerErrorRules") return providerMap(value, Array.isArray);
  if (key === "systemTransforms" && record(value))
    return { ...value, providers: providerMap(value.providers) };
  if (key === "resilienceSettings" && record(value)) {
    const result = { ...value };
    if (record(value.preferredAccountFailover))
      result.preferredAccountFailover = {
        ...value.preferredAccountFailover,
        ...(Object.hasOwn(value.preferredAccountFailover, "providerTimeoutsMs")
          ? {
              providerTimeoutsMs: providerMap(
                value.preferredAccountFailover.providerTimeoutsMs,
                (v) => typeof v === "number" && Number.isFinite(v)
              ),
            }
          : {}),
        ...(Object.hasOwn(value.preferredAccountFailover, "modelTimeoutsMs")
          ? { modelTimeoutsMs: qualifiedMap(value.preferredAccountFailover.modelTimeoutsMs) }
          : {}),
      };
    if (
      record(value.quotaPreflight) &&
      Object.hasOwn(value.quotaPreflight, "providerWindowDefaults")
    )
      result.quotaPreflight = {
        ...value.quotaPreflight,
        providerWindowDefaults: providerMap(value.quotaPreflight.providerWindowDefaults),
      };
    if (Object.hasOwn(value, "providerQuotaOverrides"))
      result.providerQuotaOverrides = providerMap(value.providerQuotaOverrides);
    return result;
  }
  if (key === "quotaVisibility")
    return ids.has("moonshot") || ids.has("kimi") ? value : providerMap(value, record);
  if (key === "quotaProviderOrder") return providerOrder(value, true);
  if (key === "chaosModeConfig") return chaos(value, ids);
  return value;
}

export function migrateKimiPolicies(db: SqliteAdapter): void {
  const ids = connectionIds(db);
  for (const row of db
    .prepare<{ key: string; value: string }>(
      "SELECT key,value FROM key_value WHERE namespace='settings'"
    )
    .all()) {
    const value = jsonTransform(row.value, (v) => globalSetting(row.key, v, ids));
    if (value !== row.value)
      db.prepare("UPDATE key_value SET value=? WHERE namespace='settings' AND key=?").run(
        value,
        row.key
      );
  }
  const row = db
    .prepare<{ value: string }>("SELECT value FROM tier_config WHERE key='tier_config'")
    .get();
  if (row) {
    const value = jsonTransform(row.value, (v) => {
      if (!validTier(v)) return v;
      const result = { ...v };
      if ("providerOverrides" in v) result.providerOverrides = tierRows(v.providerOverrides);
      if ("modelOverrides" in v) result.modelOverrides = tierRows(v.modelOverrides, "modelPattern");
      if (Array.isArray(v.freeProviders) && v.freeProviders.every((id) => typeof id === "string"))
        result.freeProviders = [...new Set(v.freeProviders.map(canonicalKimiProvider))];
      return result;
    });
    if (value !== row.value)
      db.prepare("UPDATE tier_config SET value=? WHERE key='tier_config'").run(value);
  }
}
