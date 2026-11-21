import {
  isBooleanKey,
  isNumericModelCapabilityOverrideKey,
  parseModelOverrideTarget,
  type BooleanModelCapabilityOverrideKey,
  type ModelCapabilityOverride,
  type ModelCapabilityOverrideInputValue,
  type ModelCapabilityOverrideKey,
  type ModelCapabilityOverrideRepository,
  type NumericModelCapabilityOverrideKey,
} from "@/domain/persistence/modelOverrideRepositories";
import type { ReasoningEffortOverrideValue } from "@/shared/reasoning/reasoningEffortsOverride";
import { invalidateDbCache } from "./readCache";
import { modelOverrideRepositories } from "./repositories/modelOverrideRepositories";

/**
 * Manual model capability overrides per provider/model target.
 *
 * Persistence lives behind ModelCapabilityOverrideRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because capability resolution reads them
 * on the request hot path; this facade owns the model-catalog cache invalidation.
 */

export type {
  BooleanModelCapabilityOverrideKey,
  ModelCapabilityOverride,
  ModelCapabilityOverrideKey,
  NumericModelCapabilityOverrideKey,
} from "@/domain/persistence/modelOverrideRepositories";
export { isBooleanKey, parseModelOverrideTarget };

const legacy = modelOverrideRepositories.legacySync.capabilities;

/** Async persistence contract; it never invalidates caches on its own. */
export function getModelCapabilityOverrideRepository(): ModelCapabilityOverrideRepository {
  return modelOverrideRepositories.capabilities;
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

  const override = legacy.find(target.provider, target.modelId, key);
  return override && typeof override.value === "boolean" ? override.value : null;
}

export function getModelCapabilityOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  key: NumericModelCapabilityOverrideKey,
  bulkMaxTokenOverrides?: NestedMaxTokenOverrideMap | null
): number | null {
  const target = parseModelOverrideTarget(`${provider || ""}/${modelId || ""}`);
  if (!target || !isNumericModelCapabilityOverrideKey(key)) return null;

  if (bulkMaxTokenOverrides) {
    // The caller pairs the bulk map with the key it was built for
    // (max_output_tokens or max_input_tokens in the #9199 snapshot).
    return bulkMaxTokenOverrides.get(target.provider)?.get(target.modelId) ?? null;
  }

  const override = legacy.find(target.provider, target.modelId, key);
  return override && typeof override.value === "number" ? override.value : null;
}

export function getReasoningEffortsOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  bulk?: ReadonlyMap<string, ReadonlyMap<string, readonly ReasoningEffortOverrideValue[]>> | null
): readonly ReasoningEffortOverrideValue[] | null {
  const target = parseModelOverrideTarget(`${provider || ""}/${modelId || ""}`);
  if (!target) return null;
  if (bulk) return bulk.get(target.provider)?.get(target.modelId) ?? null;

  const override = legacy.find(target.provider, target.modelId, "reasoning_efforts");
  return override?.key === "reasoning_efforts" ? override.value : null;
}

export function setModelCapabilityOverride(
  target: string,
  key: ModelCapabilityOverrideKey,
  value: ModelCapabilityOverrideInputValue
): boolean {
  if (!legacy.set(target, key, value)) return false;
  invalidateDbCache("model-capabilities");
  return true;
}

export function removeModelCapabilityOverride(
  target: string,
  key: ModelCapabilityOverrideKey
): boolean {
  const removed = legacy.remove(target, key);
  if (removed) invalidateDbCache("model-capabilities");
  return removed;
}

export function listModelCapabilityOverrides(): ModelCapabilityOverride[] {
  return legacy.list();
}
