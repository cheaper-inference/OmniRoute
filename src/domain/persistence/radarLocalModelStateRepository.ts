/**
 * Operator-owned Radar catalog state: per-model display/enabled overrides and
 * deletion tombstones, keyed by provider + model ID. The state never leaves
 * this install; the Radar catalog merge reads it on every catalog request.
 *
 * Validation and the merge projection are backend-neutral and live here so any
 * persistence implementation applies the same identity and patch rules.
 */

export interface RadarLocalModelState {
  provider: string;
  modelId: string;
  displayName: string | null;
  enabled: boolean | null;
  tombstoned: boolean;
  updatedAt: string;
}

export interface RadarLocalModelOverridePatch {
  displayName?: string | null;
  enabled?: boolean | null;
}

export interface RadarLocalMergeState {
  localOverrides: Map<string, { displayName?: string; enabled?: boolean }>;
  tombstones: Set<string>;
}

export interface RadarModelIdentity {
  provider: string;
  modelId: string;
}

/**
 * Persistence contract. Writes return false for invalid input and never write in
 * that case. A row whose fields are all cleared and is not tombstoned is deleted.
 */
export interface RadarLocalModelStateRepository {
  /** Every persisted override/tombstone, ordered by provider then model ID. */
  list(): Promise<RadarLocalModelState[]>;
  /** `null` clears a field; an omitted field is preserved; the tombstone is kept. */
  setOverride(
    provider: unknown,
    modelId: unknown,
    patch: RadarLocalModelOverridePatch
  ): Promise<boolean>;
  /** Clears both editable fields while preserving an independent tombstone. */
  clearOverride(provider: unknown, modelId: unknown): Promise<boolean>;
  /** Hides or restores one model without modifying its editable fields. */
  setTombstone(provider: unknown, modelId: unknown, tombstoned: boolean): Promise<boolean>;
  /** The read-time merge structures derived from `list()`. */
  getMergeState(): Promise<RadarLocalMergeState>;
}

const RADAR_PROVIDER_PATTERN = /^[a-z0-9][a-z0-9._-]{0,99}$/i;
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/;

export function normalizeRadarIdentity(
  provider: unknown,
  modelId: unknown
): RadarModelIdentity | null {
  const normalizedProvider = typeof provider === "string" ? provider.trim() : "";
  const normalizedModelId = typeof modelId === "string" ? modelId.trim() : "";
  if (!RADAR_PROVIDER_PATTERN.test(normalizedProvider)) return null;
  if (
    normalizedModelId.length < 1 ||
    normalizedModelId.length > 200 ||
    CONTROL_CHARACTER_PATTERN.test(normalizedModelId)
  ) {
    return null;
  }
  return { provider: normalizedProvider, modelId: normalizedModelId };
}

export function normalizeRadarDisplayName(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  if (
    normalized.length < 1 ||
    normalized.length > 160 ||
    CONTROL_CHARACTER_PATTERN.test(normalized)
  ) {
    return undefined;
  }
  return normalized;
}

/**
 * Validates an override patch. Returns the normalized patch (only the keys that
 * were present), or null when the patch must be rejected.
 */
export function normalizeRadarOverridePatch(
  patch: RadarLocalModelOverridePatch
): RadarLocalModelOverridePatch | null {
  if (!patch || typeof patch !== "object") return null;
  const keys = Object.keys(patch);
  if (
    keys.length === 0 ||
    keys.some((key) => key !== "displayName" && key !== "enabled") ||
    (Object.hasOwn(patch, "enabled") &&
      patch.enabled !== null &&
      typeof patch.enabled !== "boolean")
  ) {
    return null;
  }

  const normalized: RadarLocalModelOverridePatch = {};
  if (Object.hasOwn(patch, "displayName")) {
    const displayName = normalizeRadarDisplayName(patch.displayName);
    if (displayName === undefined) return null;
    normalized.displayName = displayName;
  }
  if (Object.hasOwn(patch, "enabled")) normalized.enabled = patch.enabled ?? null;
  return normalized;
}

/** Convert persisted state into the exact read-time merge structures. */
export function toRadarLocalMergeState(states: RadarLocalModelState[]): RadarLocalMergeState {
  const localOverrides = new Map<string, { displayName?: string; enabled?: boolean }>();
  const tombstones = new Set<string>();

  for (const state of states) {
    const key = `${state.provider}:${state.modelId}`;
    const override: { displayName?: string; enabled?: boolean } = {};
    if (state.displayName !== null) override.displayName = state.displayName;
    if (state.enabled !== null) override.enabled = state.enabled;
    if (Object.keys(override).length > 0) localOverrides.set(key, override);
    if (state.tombstoned) tombstones.add(key);
  }

  return { localOverrides, tombstones };
}
