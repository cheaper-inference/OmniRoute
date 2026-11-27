/**
 * db/models/visibility.ts — three-state model visibility (`visible` | `combos_only` | `hidden`).
 *
 * Reads and writes the same stores the binary hidden flag has always used (`customModels`
 * rows and the `modelCompatOverrides` key_value JSON list), so no migration is needed: a
 * pre-three-state row still resolves through the legacy `isHidden` / `hiddenModalities`
 * flags (see `src/shared/utils/modelVisibility.ts`).
 *
 * The bulk reader is one SQLite query per modality — the public catalog, the auto/* candidate
 * pool and the dispatch gate all need the whole map, never an N+1 per model.
 */

import { getDbInstance } from "../core";
import type { ModelCompatOverride } from "./compat";
import { mergeModelCompatOverride, readCompatList } from "./compat";
import {
  MODEL_VISIBILITY_MODES,
  resolveExplicitVisibility,
  type ModelVisibilityFlags,
  type ModelVisibilityMode,
} from "@/shared/utils/modelVisibility";

/** Per-provider model ids grouped by the visibility they state explicitly. */
export type ModelVisibilityMap = {
  hidden: Map<string, Set<string>>;
  combosOnly: Map<string, Set<string>>;
  /** Explicit `visible` overrides — the positive exception over a combos-only provider. */
  explicitVisible: Map<string, Set<string>>;
};

const EMPTY_VISIBILITY_MAP = (): ModelVisibilityMap => ({
  hidden: new Map<string, Set<string>>(),
  combosOnly: new Map<string, Set<string>>(),
  explicitVisible: new Map<string, Set<string>>(),
});

function bucketFor(map: ModelVisibilityMap, mode: ModelVisibilityMode): Map<string, Set<string>> {
  if (mode === "hidden") return map.hidden;
  if (mode === "combos_only") return map.combosOnly;
  return map.explicitVisible;
}

function addTo(map: Map<string, Set<string>>, provider: string, modelId: string): void {
  const entries = map.get(provider) || new Set<string>();
  entries.add(modelId);
  map.set(provider, entries);
}

/**
 * Read the explicit visibility stated by a custom-model row (the manually declared row wins
 * over a compat override, exactly as `getModelIsHidden` has always resolved it), falling back
 * to the compat-override list.
 *
 * `options.compatOverrides` lets a caller that already loaded the provider's override list
 * pass it in: without it every row would re-read the same JSON list (N+1 on a big provider).
 */
export function readStoredVisibility(
  providerId: string,
  modelId: string,
  modality: string = "chat",
  options: {
    customModels?: ReadonlyArray<Record<string, unknown>>;
    compatOverrides?: ReadonlyArray<ModelCompatOverride>;
  } = {}
): ModelVisibilityMode | null {
  const rows = options.customModels;
  if (rows) {
    const row = rows.find((entry) => entry?.id === modelId);
    if (row) {
      const explicit = resolveExplicitVisibility(row as ModelVisibilityFlags, modality);
      if (explicit) return explicit;
    }
  }
  const overrides = options.compatOverrides ?? readCompatList(providerId);
  const override = overrides.find((entry) => entry.id === modelId);
  return resolveExplicitVisibility(override as ModelVisibilityFlags | undefined, modality);
}

/**
 * Bulk-load every explicit visibility choice, one SQLite query for the whole catalog.
 * Rows with no visibility information at all are skipped, so the maps stay small (the
 * common case is an empty map: every model inherits its provider/default state).
 */
export function getModelVisibilityMap(modality: string = "chat"): ModelVisibilityMap {
  const result = EMPTY_VISIBILITY_MAP();
  const rows = getDbInstance()
    .prepare(
      "SELECT namespace, key, value FROM key_value WHERE namespace IN ('modelCompatOverrides', 'customModels')"
    )
    .all() as Array<{ namespace: string; key: string; value: string | null }>;

  // modelCompatOverrides first: a customModels row for the same model is the operator-declared
  // winner (same precedence as readStoredVisibility / getModelIsHidden), so it overwrites.
  for (const namespace of ["modelCompatOverrides", "customModels"]) {
    for (const row of rows) {
      if (row.namespace !== namespace || !row.value) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(row.value);
      } catch {
        continue; // Skip malformed rows rather than failing the whole catalog build.
      }
      if (!Array.isArray(parsed)) continue;
      for (const entry of parsed) {
        if (!entry || typeof entry !== "object") continue;
        const modelId = (entry as { id?: unknown }).id;
        if (typeof modelId !== "string" || modelId.length === 0) continue;
        const mode = resolveExplicitVisibility(entry as ModelVisibilityFlags, modality);
        if (!mode) continue;
        // Clear any bucket this model was previously counted in before re-bucketing.
        for (const bucket of [result.hidden, result.combosOnly, result.explicitVisible]) {
          bucket.get(row.key)?.delete(modelId);
        }
        addTo(bucketFor(result, mode), row.key, modelId);
      }
    }
  }

  for (const bucket of [result.hidden, result.combosOnly, result.explicitVisible]) {
    for (const [provider, models] of bucket) {
      if (models.size === 0) bucket.delete(provider);
    }
  }
  return result;
}

/**
 * Persist one model's visibility on the compat-override list. `mode === null` clears the
 * override (back to the provider default). Mirrors `hidden` into the legacy flags and clears
 * them otherwise — see `mergeModelCompatOverride`. Callers that must also respect an
 * operator-declared custom-model row go through `setModelVisibility` in `db/models.ts`.
 */
export function setCompatModelVisibility(
  providerId: string,
  modelId: string,
  mode: ModelVisibilityMode | null,
  modality?: string
): void {
  if (mode !== null && !MODEL_VISIBILITY_MODES.includes(mode)) return;
  mergeModelCompatOverride(providerId, modelId, { visibilityMode: mode, modality });
}

/** The three-state visibility a compat-override list entry states (UI hydration helper). */
export function getCompatListVisibility(
  overrides: readonly ModelCompatOverride[],
  modelId: string,
  modality: string = "chat"
): ModelVisibilityMode | null {
  const override = overrides.find((entry) => entry.id === modelId);
  return resolveExplicitVisibility(override as ModelVisibilityFlags | undefined, modality);
}
