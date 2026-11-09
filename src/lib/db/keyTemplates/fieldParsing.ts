/** Strict, dependency-free decoding of persisted key policy fields. */
import { KEY_TEMPLATE_ALL_COMBOS_RULE } from "../../../shared/types/keyTemplates.ts";
import type { KeyTemplateKeyPolicy } from "../../../shared/types/keyTemplates.ts";

type Row = Record<string, unknown>;
export type Parsed<T> = { ok: true; value: T } | { ok: false };
type FieldKind =
  | "modelAccessMode"
  | "list"
  | "combos"
  | "boolFalse"
  | "boolTrue"
  | "schedule"
  | "rateLimits"
  | "nullableInt"
  | "int0"
  | "nullablePositive"
  | "nullableString"
  | "enum";

export interface FieldSpec {
  column: string;
  field: keyof KeyTemplateKeyPolicy;
  kind: FieldKind;
  values?: readonly string[];
  fallback?: string;
}

/** Every persisted policy column of api_keys, in a stable order. */
export const API_KEY_POLICY_FIELDS: readonly FieldSpec[] = [
  { column: "model_access_mode", field: "modelAccessMode", kind: "modelAccessMode" },
  { column: "allowed_models", field: "allowedModels", kind: "list" },
  { column: "blocked_models", field: "blockedModels", kind: "list" },
  { column: "allowed_combos", field: "allowedCombos", kind: "combos" },
  { column: "allowed_connections", field: "allowedConnections", kind: "list" },
  { column: "preferred_connections", field: "preferredConnections", kind: "list" },
  { column: "allowed_quotas", field: "allowedQuotas", kind: "list" },
  { column: "no_log", field: "noLog", kind: "boolFalse" },
  { column: "auto_resolve", field: "autoResolve", kind: "boolFalse" },
  { column: "is_active", field: "isActive", kind: "boolTrue" },
  { column: "is_banned", field: "isBanned", kind: "boolFalse" },
  { column: "access_schedule", field: "accessSchedule", kind: "schedule" },
  { column: "max_requests_per_day", field: "maxRequestsPerDay", kind: "nullableInt" },
  { column: "max_requests_per_minute", field: "maxRequestsPerMinute", kind: "nullableInt" },
  { column: "throttle_delay_ms", field: "throttleDelayMs", kind: "nullableInt" },
  { column: "rate_limits", field: "rateLimits", kind: "rateLimits" },
  { column: "max_sessions", field: "maxSessions", kind: "int0" },
  { column: "ip_allowlist", field: "ipAllowlist", kind: "list" },
  { column: "scopes", field: "scopes", kind: "list" },
  { column: "proxy_id", field: "proxyId", kind: "nullableString" },
  { column: "allowed_endpoints", field: "allowedEndpoints", kind: "list" },
  {
    column: "stream_default_mode",
    field: "streamDefaultMode",
    kind: "enum",
    values: ["legacy", "json"],
    fallback: "legacy",
  },
  {
    column: "codex_service_mode",
    field: "codexServiceMode",
    kind: "enum",
    values: ["inherit", "default", "priority", "flex"],
    fallback: "inherit",
  },
  {
    column: "cache_default_mode",
    field: "cacheDefaultMode",
    kind: "enum",
    values: ["legacy", "bypass"],
    fallback: "legacy",
  },
  { column: "disable_non_public_models", field: "disableNonPublicModels", kind: "boolFalse" },
  { column: "allow_usage_command", field: "allowUsageCommand", kind: "boolFalse" },
  { column: "usage_limit_enabled", field: "usageLimitEnabled", kind: "boolFalse" },
  { column: "daily_usage_limit_usd", field: "dailyUsageLimitUsd", kind: "nullablePositive" },
  { column: "weekly_usage_limit_usd", field: "weeklyUsageLimitUsd", kind: "nullablePositive" },
  { column: "five_hour_usage_limit_usd", field: "fiveHourUsageLimitUsd", kind: "nullablePositive" },
  { column: "chaos_mode_enabled", field: "chaosModeEnabled", kind: "boolFalse" },
  { column: "compression_enabled", field: "compressionEnabled", kind: "boolTrue" },
  { column: "allow_auto_combos", field: "allowAutoCombos", kind: "boolTrue" },
  { column: "allow_cc_discovery_aliases", field: "allowCcDiscoveryAliases", kind: "boolTrue" },
  {
    column: "catalog_scope",
    field: "catalogScope",
    kind: "enum",
    values: ["all", "combos", "models"],
    fallback: "all",
  },
  { column: "forced_model", field: "forcedModel", kind: "nullableString" },
];

/** JSON decoding leaves already parsed database values intact. */
function parseJson(value: unknown): Parsed<unknown> {
  if (typeof value !== "string") return { ok: true, value };
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch {
    return { ok: false };
  }
}

/** NULL/empty uses the caller's explicit legacy default, not an implicit allow-list. */
export function strictList(value: unknown, emptyValue: string[]): Parsed<string[]> {
  if (value === null || value === undefined) return { ok: true, value: emptyValue };
  if (typeof value === "string" && value.trim() === "") return { ok: true, value: emptyValue };
  const parsed = parseJson(typeof value === "string" ? value.trim() : value);
  if (!parsed.ok) return { ok: false };
  if (parsed.value === null) return { ok: true, value: emptyValue };
  if (!Array.isArray(parsed.value) || !parsed.value.every((entry) => typeof entry === "string"))
    return { ok: false };
  return { ok: true, value: [...(parsed.value as string[])] };
}

/** SQLite and legacy boolean representations, deliberately not JS truthiness. */
export function truthy(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === 1n;
}

/** SQLite and legacy false representations, deliberately not JS falsiness. */
export function falsy(value: unknown): boolean {
  return value === false || value === 0 || value === "0" || value === 0n;
}

/** Keep supported fractional values, including nullable quotas. */
export function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function absent(raw: unknown): boolean {
  return raw === null || raw === undefined || (typeof raw === "string" && raw.trim() === "");
}

function parseSchedule(raw: unknown): Parsed<unknown> {
  if (absent(raw)) return { ok: true, value: null };
  const parsed = parseJson(raw);
  if (!parsed.ok || !parsed.value || typeof parsed.value !== "object") return { ok: false };
  const obj = parsed.value as Row;
  if (
    typeof obj.enabled !== "boolean" ||
    typeof obj.from !== "string" ||
    typeof obj.until !== "string" ||
    typeof obj.tz !== "string" ||
    !Array.isArray(obj.days) ||
    !obj.days.every((d) => typeof d === "number" && Number.isInteger(d) && d >= 0 && d <= 6)
  )
    return { ok: false };
  return {
    ok: true,
    value: {
      enabled: obj.enabled,
      from: obj.from,
      until: obj.until,
      days: [...obj.days],
      tz: obj.tz,
    },
  };
}

function parseRateLimits(raw: unknown): Parsed<unknown> {
  if (absent(raw)) return { ok: true, value: null };
  const parsed = parseJson(raw);
  if (!parsed.ok) return { ok: false };
  if (parsed.value === null) return { ok: true, value: null };
  if (!Array.isArray(parsed.value)) return { ok: false };
  const rules = parsed.value as unknown[];
  if (
    !rules.every(
      (rule) =>
        rule !== null &&
        typeof rule === "object" &&
        typeof (rule as Row).limit === "number" &&
        typeof (rule as Row).window === "number"
    )
  )
    return { ok: false };
  return {
    ok: true,
    value: rules.map((rule) => ({ limit: (rule as Row).limit, window: (rule as Row).window })),
  };
}

function parseNullableInt(raw: unknown): Parsed<unknown> {
  if (raw === null || raw === undefined || raw === "") return { ok: true, value: null };
  const n = toFiniteNumber(raw);
  return n === null ? { ok: false } : { ok: true, value: n };
}

function parseInt0(raw: unknown): Parsed<unknown> {
  if (raw === null || raw === undefined || raw === "") return { ok: true, value: 0 };
  const n = toFiniteNumber(raw);
  return n === null ? { ok: false } : { ok: true, value: Math.max(0, n) };
}

type Parser = (raw: unknown, spec: FieldSpec, row: Row) => Parsed<unknown>;
const fieldParsers: Record<FieldKind, Parser> = {
  modelAccessMode: (raw, _spec, row) => {
    const models = strictList(row.allowed_models, []);
    if (models.ok && models.value.length > 0) return { ok: true, value: "restricted" };
    return { ok: true, value: raw === "restricted" ? "restricted" : "all" };
  },
  list: (raw) => strictList(raw, []),
  combos: (raw) => strictList(raw, [KEY_TEMPLATE_ALL_COMBOS_RULE]),
  boolFalse: (raw) => ({ ok: true, value: truthy(raw) }),
  boolTrue: (raw) => ({ ok: true, value: !falsy(raw) }),
  schedule: (raw) => parseSchedule(raw),
  rateLimits: (raw) => parseRateLimits(raw),
  nullableInt: (raw) => parseNullableInt(raw),
  int0: (raw) => parseInt0(raw),
  nullablePositive: (raw) => {
    const n = toFiniteNumber(raw);
    return { ok: true, value: n !== null && n > 0 ? n : null };
  },
  nullableString: (raw) => {
    if (typeof raw !== "string") return { ok: true, value: null };
    const trimmed = raw.trim();
    return { ok: true, value: trimmed === "" ? null : trimmed };
  },
  enum: (raw, spec) => ({
    ok: true,
    value: typeof raw === "string" && (spec.values ?? []).includes(raw) ? raw : spec.fallback,
  }),
};

/** Decode one persisted field without losing legacy allow/deny or numeric precision. */
export function parseField(spec: FieldSpec, raw: unknown, row: Row): Parsed<unknown> {
  return fieldParsers[spec.kind](raw, spec, row);
}
