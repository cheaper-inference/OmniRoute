/**
 * Transient built-in-auto routing flags.
 *
 * A virtual `auto` / `auto/*` combo carries two facts that only make sense for the
 * live materialization:
 *
 *   - `autoConfig.isBuiltinAuto` — "this came from the built-in catalog", which is
 *     what lets opt-in overlays (newest-generation preference) apply. A persisted
 *     copy must NOT inherit it, or a duplicated combo would silently keep routing
 *     under built-in semantics forever.
 *   - `models[].ladderRung` — the subscription-ladder rung computed from LIVE quota
 *     state at build time. A snapshot would freeze an already-stale rung.
 *
 * Both are stripped on every write path that turns a virtual combo into a persisted
 * one. Pure and dependency-free so it is unit-testable without a DB.
 */

export interface TransientFlagCarrier {
  models?: unknown;
  autoConfig?: unknown;
  config?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Drop `ladderRung` from one model step, preserving everything else (and identity). */
function stripStep(step: unknown): unknown {
  if (!isRecord(step) || !("ladderRung" in step)) return step;
  const { ladderRung: _ladderRung, ...rest } = step;
  return rest;
}

/** Drop `isBuiltinAuto` from an auto-config record, preserving everything else. */
function stripAutoConfig(value: unknown): unknown {
  if (!isRecord(value) || !("isBuiltinAuto" in value)) return value;
  const { isBuiltinAuto: _isBuiltinAuto, ...rest } = value;
  return rest;
}

/**
 * Remove transient built-in-auto routing flags from a combo-shaped value.
 *
 * Returns the input untouched (same reference) when there is nothing to strip, so
 * callers can keep the cheap identity check other sanitizers in this repo use. A
 * primitive or otherwise non-object input is returned as-is.
 */
export function stripTransientAutoFlags<T>(combo: T): T {
  if (!isRecord(combo)) return combo;

  let changed = false;
  const next: Record<string, unknown> = { ...combo };

  if (Array.isArray(combo.models)) {
    const models = combo.models;
    const strippedModels = models.map(stripStep);
    if (strippedModels.some((step, index) => step !== models[index])) {
      next.models = strippedModels;
      changed = true;
    }
  }

  const strippedAutoConfig = stripAutoConfig(combo.autoConfig);
  if (strippedAutoConfig !== combo.autoConfig) {
    next.autoConfig = strippedAutoConfig;
    changed = true;
  }

  if (isRecord(combo.config)) {
    const strippedNested = stripAutoConfig(combo.config.auto);
    if (strippedNested !== combo.config.auto) {
      next.config = { ...combo.config, auto: strippedNested };
      changed = true;
    }
  }

  return (changed ? next : combo) as T;
}
