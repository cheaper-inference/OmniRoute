import {
  REASONING_EFFORT_OVERRIDE_VALUES,
  type ReasoningEffortOverrideValue,
} from "@/shared/reasoning/reasoningEffortsOverride";

// ── Per-API-key auto/* candidate exclusions (#7819) ─────────────────────────

export interface AutoCandidateOverride {
  id: string;
  apiKeyId: string;
  autoChannel: string;
  connectionId: string;
  excluded: boolean;
  createdAt: string;
}

export interface AutoCandidateOverrideRepository {
  /** Connection ids excluded for this key + channel; empty when either id is empty. */
  listExcludedConnectionIds(apiKeyId: string, autoChannel: string): Promise<Set<string>>;
  /** Upserts the flag for one (key, channel, connection); the row id and createdAt are kept. */
  setExcluded(
    apiKeyId: string,
    autoChannel: string,
    connectionId: string,
    excluded: boolean
  ): Promise<AutoCandidateOverride>;
  /** Excluded and included rows, oldest first; empty when either id is empty. */
  list(apiKeyId: string, autoChannel: string): Promise<AutoCandidateOverride[]>;
}

// ── Manual model capability overrides (provider/model/key) ──────────────────

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

/** Accepted write input; strings cover query-string style booleans and effort lists. */
export type ModelCapabilityOverrideInputValue = number | string | boolean | readonly string[];

export function isNumericModelCapabilityOverrideKey(
  value: unknown
): value is NumericModelCapabilityOverrideKey {
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

export function isSupportedModelCapabilityOverrideKey(
  value: unknown
): value is ModelCapabilityOverrideKey {
  return (
    isNumericModelCapabilityOverrideKey(value) ||
    value === "reasoning_efforts" ||
    isBooleanKey(value)
  );
}

export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function isReasoningEfforts(value: unknown): value is ReasoningEffortOverrideValue[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  const allowed = new Set<string>(REASONING_EFFORT_OVERRIDE_VALUES);
  return (
    value.every((entry) => typeof entry === "string" && allowed.has(entry)) &&
    new Set(value).size === value.length
  );
}

/** Splits `provider/model` on the first slash; both sides must be non-empty after trim. */
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

/** Persistence only; the DB facade owns catalog cache invalidation. */
export interface ModelCapabilityOverrideRepository {
  /** Newest refresh first; rows with unknown keys or invalid values are skipped. */
  list(): Promise<ModelCapabilityOverride[]>;
  /** Exact (provider, modelId, key) lookup; invalid targets, keys or values return null. */
  find(
    provider: string,
    modelId: string,
    key: ModelCapabilityOverrideKey
  ): Promise<ModelCapabilityOverride | null>;
  /** Normalizes and upserts; invalid targets, keys or values write nothing and return false. */
  set(
    target: string,
    key: ModelCapabilityOverrideKey,
    value: ModelCapabilityOverrideInputValue
  ): Promise<boolean>;
  /** True only when a row was deleted. */
  remove(target: string, key: ModelCapabilityOverrideKey): Promise<boolean>;
}

// ── Context-window overrides (Feature 5004) ─────────────────────────────────

export type ModelContextOverrideSource = "manual" | "auto:discovery";

export interface ModelContextOverride {
  provider: string;
  modelId: string;
  realContext: number;
  source: ModelContextOverrideSource;
  refreshedAt: string;
}

/** Persistence only; the DB facade owns catalog cache invalidation. */
export interface ModelContextOverrideRepository {
  /** Newest refresh first. */
  list(): Promise<ModelContextOverride[]>;
  /** Trimmed (provider, modelId) lookup; blank ids return null. */
  find(provider: string, modelId: string): Promise<ModelContextOverride | null>;
  /**
   * Upserts a positive integer window; anything other than "auto:discovery" is stored as
   * "manual". Blank ids or a non-positive window write nothing and return false.
   */
  set(
    provider: string,
    modelId: string,
    realContext: number,
    source?: ModelContextOverrideSource
  ): Promise<boolean>;
  /** True only when a row was deleted. */
  remove(provider: string, modelId: string): Promise<boolean>;
}
