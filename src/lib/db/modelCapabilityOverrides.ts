import {
  parseReasoningEffortsOverride,
  REASONING_EFFORT_OVERRIDE_VALUES,
  type ReasoningEffortOverrideValue,
} from "@/shared/reasoning/reasoningEffortsOverride";
import { getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";

export type NumericModelCapabilityOverrideKey =
  "max_input_tokens" | "max_output_tokens" | "max_token";

export type BooleanModelCapabilityOverrideKey =
  "structured_output" | "tool_calling" | "vision" | "attachment" | "temperature";

export type ModelCapabilityOverrideKey =
  NumericModelCapabilityOverrideKey | "reasoning_efforts" | BooleanModelCapabilityOverrideKey;

interface ModelCapabilityOverrideBase {
  provider: string;
  modelId: string;
  target: string;
  refreshedAt: string;
}

export type ModelCapabilityOverride =
  | (ModelCapabilityOverrideBase & {
      key: NumericModelCapabilityOverrideKey;
      value: number;
    })
  | (ModelCapabilityOverrideBase & {
      key: "reasoning_efforts";
      value: ReasoningEffortOverrideValue[];
    })
  | (ModelCapabilityOverrideBase & {
      key: BooleanModelCapabilityOverrideKey;
      value: boolean;
    });

interface OverrideRow {
  provider: string;
  model_id: string;
  override_key: string;
  override_value: string;
  refreshed_at: string;
}

function isNumericKey(value: unknown): value is NumericModelCapabilityOverrideKey {
  return value === "max_input_tokens" || value === "max_output_tokens" || value === "max_token";
}

export function isBooleanKey(value: unknown): value is BooleanModelCapabilityOverrideKey {
  return (
    value === "structured_output" ||
    value === "tool_calling" ||
    value === "vision" ||
    value === "attachment" ||
    value === "temperature"
  );
}

function isSupportedKey(value: unknown): value is ModelCapabilityOverrideKey {
  return isNumericKey(value) || value === "reasoning_efforts" || isBooleanKey(value);
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isReasoningEfforts(value: unknown): value is ReasoningEffortOverrideValue[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  const allowed = new Set<string>(REASONING_EFFORT_OVERRIDE_VALUES);
  return (
    value.every((entry) => typeof entry === "string" && allowed.has(entry)) &&
    new Set(value).size === value.length
  );
}

export function parseModelOverrideTarget(
  target: unknown
): { provider: string; modelId: string } | null {
  const raw = typeof target === "string" ? target.trim() : "";
  const slashIndex = raw.indexOf("/");
  if (slashIndex <= 0 || slashIndex === raw.length - 1) return null;

  const provider = raw.slice(0, slashIndex).trim();
  const modelId = raw.slice(slashIndex + 1).trim();
  if (!provider || !modelId) return null;
  return { provider, modelId };
}

function toOverride(row: OverrideRow): ModelCapabilityOverride | null {
  if (!isSupportedKey(row.override_key)) return null;

  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(row.override_value);
  } catch {
    return null;
  }

  const base: ModelCapabilityOverrideBase = {
    provider: row.provider,
    modelId: row.model_id,
    target: `${row.provider}/${row.model_id}`,
    refreshedAt: row.refreshed_at,
  };
  if (row.override_key === "reasoning_efforts") {
    return isReasoningEfforts(parsedValue)
      ? { ...base, key: row.override_key, value: parsedValue }
      : null;
  }
  if (isBooleanKey(row.override_key)) {
    return typeof parsedValue === "boolean"
      ? { ...base, key: row.override_key, value: parsedValue }
      : null;
  }
  return isPositiveInteger(parsedValue)
    ? { ...base, key: row.override_key, value: parsedValue }
    : null;
}

/** Nested provider → model → numeric override map used by build-local snapshots. */
export type NestedMaxTokenOverrideMap = ReadonlyMap<string, ReadonlyMap<string, number>>;

/** Nested provider → model → boolean override map used by build-local snapshots. */
export type NestedBooleanOverrideMap = ReadonlyMap<
  string,
  ReadonlyMap<string, ReadonlyMap<BooleanModelCapabilityOverrideKey, boolean>>
>;

export function getBooleanModelCapabilityOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  key: BooleanModelCapabilityOverrideKey,
  bulkBooleanOverrides?: NestedBooleanOverrideMap | null
): boolean | null {
  const target = parseModelOverrideTarget(`${provider || ""}/${modelId || ""}`);
  if (!target || !isBooleanKey(key)) return null;

  if (bulkBooleanOverrides) {
    return bulkBooleanOverrides.get(target.provider)?.get(target.modelId)?.get(key) ?? null;
  }

  try {
    const row = getDbInstance()
      .prepare(
        "SELECT provider, model_id, override_key, override_value, refreshed_at " +
          "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = ?"
      )
      .get(target.provider, target.modelId, key) as OverrideRow | undefined;
    const override = row ? toOverride(row) : null;
    return override && typeof override.value === "boolean" ? override.value : null;
  } catch {
    return null;
  }
}

export function getModelCapabilityOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  key: NumericModelCapabilityOverrideKey,
  bulkMaxTokenOverrides?: NestedMaxTokenOverrideMap | null
): number | null {
  const target = parseModelOverrideTarget(`${provider || ""}/${modelId || ""}`);
  if (!target || !isNumericKey(key)) return null;

  if (bulkMaxTokenOverrides) {
    // The caller pairs the bulk map with the key it was built for
    // (max_output_tokens or max_input_tokens in the #9199 snapshot).
    return bulkMaxTokenOverrides.get(target.provider)?.get(target.modelId) ?? null;
  }

  try {
    const row = getDbInstance()
      .prepare(
        "SELECT provider, model_id, override_key, override_value, refreshed_at " +
          "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = ?"
      )
      .get(target.provider, target.modelId, key) as OverrideRow | undefined;
    const override = row ? toOverride(row) : null;
    return override && typeof override.value === "number" ? override.value : null;
  } catch {
    return null;
  }
}

export function getReasoningEffortsOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  bulk?: ReadonlyMap<string, ReadonlyMap<string, readonly ReasoningEffortOverrideValue[]>> | null
): readonly ReasoningEffortOverrideValue[] | null {
  const target = parseModelOverrideTarget(`${provider || ""}/${modelId || ""}`);
  if (!target) return null;
  if (bulk) return bulk.get(target.provider)?.get(target.modelId) ?? null;

  try {
    const row = getDbInstance()
      .prepare(
        "SELECT provider, model_id, override_key, override_value, refreshed_at " +
          "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = 'reasoning_efforts'"
      )
      .get(target.provider, target.modelId) as OverrideRow | undefined;
    const override = row ? toOverride(row) : null;
    return override?.key === "reasoning_efforts" ? override.value : null;
  } catch {
    return null;
  }
}

type OverrideInputValue = number | string | boolean | readonly string[];
type NormalizedOverrideValue = number | boolean | ReasoningEffortOverrideValue[];

/** Accepts a boolean or its "true"/"false" string form (query-string style input). */
function normalizeBooleanValue(value: OverrideInputValue): boolean | null {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

/** The value as stored for `key`, or null when it is not valid for that key. */
function normalizeOverrideValue(
  key: ModelCapabilityOverrideKey,
  value: OverrideInputValue
): NormalizedOverrideValue | null {
  if (key === "reasoning_efforts") {
    const parsed = Array.isArray(value)
      ? parseReasoningEffortsOverride(value.join(","))
      : parseReasoningEffortsOverride(typeof value === "string" ? value : "");
    return parsed.ok ? parsed.efforts : null;
  }
  if (isBooleanKey(key)) return normalizeBooleanValue(value);
  return isPositiveInteger(value) ? value : null;
}

export function setModelCapabilityOverride(
  target: string,
  key: ModelCapabilityOverrideKey,
  value: OverrideInputValue
): boolean {
  const parsedTarget = parseModelOverrideTarget(target);
  if (!parsedTarget || !isSupportedKey(key)) return false;

  const normalizedValue = normalizeOverrideValue(key, value);
  if (normalizedValue === null) return false;

  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_capability_overrides " +
        "(provider, model_id, override_key, override_value, refreshed_at) " +
        "VALUES (?, ?, ?, ?, datetime('now'))"
    )
    .run(parsedTarget.provider, parsedTarget.modelId, key, JSON.stringify(normalizedValue));
  invalidateDbCache("model-capabilities");
  return true;
}

export function removeModelCapabilityOverride(
  target: string,
  key: ModelCapabilityOverrideKey
): boolean {
  const parsedTarget = parseModelOverrideTarget(target);
  if (!parsedTarget || !isSupportedKey(key)) return false;

  const info = getDbInstance()
    .prepare(
      "DELETE FROM model_capability_overrides " +
        "WHERE provider = ? AND model_id = ? AND override_key = ?"
    )
    .run(parsedTarget.provider, parsedTarget.modelId, key);
  if (info.changes > 0) invalidateDbCache("model-capabilities");
  return info.changes > 0;
}

export function listModelCapabilityOverrides(): ModelCapabilityOverride[] {
  try {
    const rows = getDbInstance()
      .prepare(
        "SELECT provider, model_id, override_key, override_value, refreshed_at " +
          "FROM model_capability_overrides ORDER BY refreshed_at DESC"
      )
      .all() as OverrideRow[];
    return rows.map(toOverride).filter((entry): entry is ModelCapabilityOverride => entry !== null);
  } catch {
    return [];
  }
}
