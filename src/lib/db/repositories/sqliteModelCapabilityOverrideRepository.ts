/**
 * SQLite implementation for model_capability_overrides (migration 119).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Reads never throw: a missing table or an undecodable row reads as "no override".
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import {
  isBooleanKey,
  isPositiveInteger,
  isReasoningEfforts,
  isSupportedModelCapabilityOverrideKey,
  parseModelOverrideTarget,
  type ModelCapabilityOverride,
  type ModelCapabilityOverrideInputValue,
  type ModelCapabilityOverrideKey,
  type ModelCapabilityOverrideRepository,
} from "@/domain/persistence/modelOverrideRepositories";
import {
  parseReasoningEffortsOverride,
  type ReasoningEffortOverrideValue,
} from "@/shared/reasoning/reasoningEffortsOverride";
import { getDbInstance } from "../core";

interface OverrideRow {
  provider: string;
  model_id: string;
  override_key: string;
  override_value: string;
  refreshed_at: string;
}

const SELECT_COLUMNS = "SELECT provider, model_id, override_key, override_value, refreshed_at ";

function toOverride(row: OverrideRow): ModelCapabilityOverride | null {
  if (!isSupportedModelCapabilityOverrideKey(row.override_key)) return null;

  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(row.override_value);
  } catch {
    return null;
  }

  const base = {
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

type NormalizedOverrideValue = number | boolean | ReasoningEffortOverrideValue[];

/** Accepts a boolean or its "true"/"false" string form (query-string style input). */
function normalizeBooleanValue(value: ModelCapabilityOverrideInputValue): boolean | null {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

/** The value as stored for `key`, or null when it is not valid for that key. */
function normalizeOverrideValue(
  key: ModelCapabilityOverrideKey,
  value: ModelCapabilityOverrideInputValue
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

/** Callers pass an already-parsed (trimmed, non-empty) provider and model id. */
function findSync(
  provider: string,
  modelId: string,
  key: ModelCapabilityOverrideKey
): ModelCapabilityOverride | null {
  if (!provider || !modelId || !isSupportedModelCapabilityOverrideKey(key)) return null;
  try {
    const db = getDbInstance();
    // The reasoning-efforts lookup keeps its original literal-key statement.
    const row = (
      key === "reasoning_efforts"
        ? db
            .prepare(
              SELECT_COLUMNS +
                "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = 'reasoning_efforts'"
            )
            .get(provider, modelId)
        : db
            .prepare(
              SELECT_COLUMNS +
                "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = ?"
            )
            .get(provider, modelId, key)
    ) as OverrideRow | undefined;
    return row ? toOverride(row) : null;
  } catch {
    return null;
  }
}

function listSync(): ModelCapabilityOverride[] {
  try {
    const rows = getDbInstance()
      .prepare(SELECT_COLUMNS + "FROM model_capability_overrides ORDER BY refreshed_at DESC")
      .all() as OverrideRow[];
    return rows.map(toOverride).filter((entry): entry is ModelCapabilityOverride => entry !== null);
  } catch {
    return [];
  }
}

function setSync(
  target: string,
  key: ModelCapabilityOverrideKey,
  value: ModelCapabilityOverrideInputValue
): boolean {
  const parsedTarget = parseModelOverrideTarget(target);
  if (!parsedTarget || !isSupportedModelCapabilityOverrideKey(key)) return false;

  const normalizedValue = normalizeOverrideValue(key, value);
  if (normalizedValue === null) return false;

  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_capability_overrides " +
        "(provider, model_id, override_key, override_value, refreshed_at) " +
        "VALUES (?, ?, ?, ?, datetime('now'))"
    )
    .run(parsedTarget.provider, parsedTarget.modelId, key, JSON.stringify(normalizedValue));
  return true;
}

function removeSync(target: string, key: ModelCapabilityOverrideKey): boolean {
  const parsedTarget = parseModelOverrideTarget(target);
  if (!parsedTarget || !isSupportedModelCapabilityOverrideKey(key)) return false;

  const info = getDbInstance()
    .prepare(
      "DELETE FROM model_capability_overrides " +
        "WHERE provider = ? AND model_id = ? AND override_key = ?"
    )
    .run(parsedTarget.provider, parsedTarget.modelId, key);
  return info.changes > 0;
}

export const sqliteModelCapabilityOverrideRepository: ModelCapabilityOverrideRepository = {
  async list() {
    return listSync();
  },
  async find(provider, modelId, key) {
    return findSync(provider, modelId, key);
  },
  async set(target, key, value) {
    return setSync(target, key, value);
  },
  async remove(target, key) {
    return removeSync(target, key);
  },
};

/** SQLite-only synchronous access retained for existing hot-path and route callers. */
export const sqliteModelCapabilityOverrideLegacySync = {
  list: listSync,
  find: findSync,
  set: setSync,
  remove: removeSync,
};
