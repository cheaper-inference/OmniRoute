/**
 * Model visibility — the single three-state rule shared by the DB layer (public catalog,
 * combo candidate pools, dispatch gate) and the dashboard UI.
 *
 * A `modelCompatOverrides` row may hide a model either everywhere (the legacy top-level
 * `isHidden`) or for one endpoint/modality only (`hiddenModalities[endpoint]`), which is
 * what lets an operator hide a Chat model without also suppressing an identically-ID'd
 * model in another registry (e.g. Image). Keeping one implementation here is deliberate:
 * the rule used to be duplicated, and the dashboard kept reading the legacy flag after the
 * write path was scoped, so hides silently stopped showing up in the UI.
 *
 * Three states are supported, and the two legacy flags above keep meaning exactly what
 * they meant before:
 *  - `visible`      — listed in `/v1/models`, callable directly and inside combos.
 *  - `combos_only`  — hidden from the public catalog and rejected on a direct call, but a
 *                     stored combo may still dispatch it.
 *  - `hidden`       — excluded everywhere (catalog, direct calls, combo execution).
 *
 * `combos_only` is persisted in the new `visibilityMode` / `visibilityModalities` fields.
 * A provider marked "combos only" is inherited by every model of that provider that has
 * no explicit override, and an explicit `visible` always wins over that inheritance.
 *
 * Pure — no imports, safe in both server and client bundles.
 */

export type ModelVisibilityMode = "visible" | "combos_only" | "hidden";

export type ModelHiddenFlags = {
  isHidden?: boolean;
  hiddenModalities?: Record<string, boolean> | null;
};

export type ModelVisibilityFlags = ModelHiddenFlags & {
  /** Three-state override applied to every modality. */
  visibilityMode?: unknown;
  /** Per-modality three-state override; a key here wins over `visibilityMode`. */
  visibilityModalities?: Record<string, unknown> | null;
};

export const MODEL_VISIBILITY_MODES: readonly ModelVisibilityMode[] = [
  "visible",
  "combos_only",
  "hidden",
];

/** Narrow an unknown persisted/API value to a visibility mode (null when it is not one). */
export function normalizeVisibilityMode(value: unknown): ModelVisibilityMode | null {
  return value === "visible" || value === "combos_only" || value === "hidden" ? value : null;
}

/**
 * Resolve the visibility a model row states *explicitly* for a modality, or `null` when
 * the row says nothing (so the caller can fall back to the provider default).
 *
 * Precedence: `visibilityModalities[modality]` → `visibilityMode` → legacy
 * `hiddenModalities[modality]` → legacy `isHidden`. The legacy branches are what keep
 * pre-three-state rows working: `isHidden: false` is an explicit visible choice, exactly
 * as it behaved before provider-level inheritance existed.
 */
export function resolveExplicitVisibility(
  flags: ModelVisibilityFlags | null | undefined,
  modality: string = "chat"
): ModelVisibilityMode | null {
  const scoped = normalizeVisibilityMode(flags?.visibilityModalities?.[modality]);
  if (scoped) return scoped;
  const globalMode = normalizeVisibilityMode(flags?.visibilityMode);
  if (globalMode) return globalMode;
  const scopedHidden = flags?.hiddenModalities?.[modality];
  if (scopedHidden !== undefined) return scopedHidden ? "hidden" : "visible";
  if (flags?.isHidden !== undefined) return flags.isHidden ? "hidden" : "visible";
  return null;
}

export type EffectiveModelVisibility = {
  mode: ModelVisibilityMode;
  /** `model`: explicit row override · `provider`: inherited combos-only default · `default`. */
  source: "model" | "provider" | "default";
};

/**
 * Resolve the effective visibility: an explicit model override wins, otherwise a provider
 * marked "combos only" is inherited, otherwise the model is visible.
 */
export function resolveEffectiveVisibility(
  flags: ModelVisibilityFlags | null | undefined,
  modality: string = "chat",
  options: { providerCombosOnly?: boolean } = {}
): EffectiveModelVisibility {
  const explicit = resolveExplicitVisibility(flags, modality);
  if (explicit) return { mode: explicit, source: "model" };
  if (options.providerCombosOnly === true) return { mode: "combos_only", source: "provider" };
  return { mode: "visible", source: "default" };
}

/**
 * Resolve whether a compat-override row hides its model for a given modality.
 * An explicit `hiddenModalities[modality]` entry always wins; otherwise the legacy
 * all-modalities `isHidden` flag applies.
 *
 * `combos_only` is deliberately NOT hidden here: combo execution must keep reaching it.
 * Catalog and direct-call filtering use {@link isBlockedFromDirectUse} instead.
 */
export function isHiddenForModality(
  flags: ModelVisibilityFlags | null | undefined,
  modality: string = "chat"
): boolean {
  return resolveExplicitVisibility(flags, modality) === "hidden";
}

/** True when the effective mode hides the model from the public catalog and direct calls. */
export function isBlockedFromDirectUse(mode: ModelVisibilityMode | null | undefined): boolean {
  return mode === "hidden" || mode === "combos_only";
}

/**
 * Dashboard filter values. `all` lists everything, the rest narrow to one effective state so
 * an operator can find the models they marked `combos_only` without hunting through the list.
 */
export type ModelVisibilityFilter = "all" | "visible" | "combos_only" | "hidden";

export const MODEL_VISIBILITY_FILTERS: readonly ModelVisibilityFilter[] = [
  "all",
  "visible",
  "combos_only",
  "hidden",
];

/** True when `mode` passes `filter` (`all` always passes). */
export function matchesVisibilityFilter(
  filter: ModelVisibilityFilter,
  mode: ModelVisibilityMode
): boolean {
  return filter === "all" || filter === mode;
}
