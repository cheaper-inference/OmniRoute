import type {
  ModelContextOverride,
  ModelContextOverrideRepository,
  ModelContextOverrideSource,
} from "@/domain/persistence/modelOverrideRepositories";
import { invalidateDbCache } from "./readCache";
import { modelOverrideRepositories } from "./repositories/modelOverrideRepositories";

/**
 * Feature 5004 — self-correcting context-window overrides.
 *
 * A persisted override of a model's real context window that wins over the static
 * catalog / models.dev sync in `getModelContextLimit()`. Two sources:
 * - `manual`: operator-set; never overwritten by the auto reconciler.
 * - `auto:discovery`: written by the reconciler when a provider's own `/models`
 *   discovery declares a window that diverges from the catalog.
 *
 * Cacheless on purpose: the read path already touches the DB (synced capabilities),
 * and a single indexed PK lookup is negligible — this avoids any cache-staleness
 * hazard with `resetDbInstance()` in tests.
 *
 * Persistence lives behind ModelContextOverrideRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because capability resolution reads them
 * on the request hot path; this facade owns the model-catalog cache invalidation.
 */

export type {
  ModelContextOverride,
  ModelContextOverrideSource,
} from "@/domain/persistence/modelOverrideRepositories";

const legacy = modelOverrideRepositories.legacySync.contexts;

/** Async persistence contract; it never invalidates caches on its own. */
export function getModelContextOverrideRepository(): ModelContextOverrideRepository {
  return modelOverrideRepositories.contexts;
}

/** Full override record for (provider, modelId), or null. Never throws. */
export function getModelContextOverrideRecord(
  provider: string | null | undefined,
  modelId: string | null | undefined
): ModelContextOverride | null {
  return legacy.find(provider, modelId);
}

/** Nested provider → model → context map used by build-local snapshots. */
export type NestedContextOverrideMap = ReadonlyMap<string, ReadonlyMap<string, number>>;

/** The overridden context window (tokens) for (provider, modelId), or null. Never throws. */
export function getModelContextOverride(
  provider: string | null | undefined,
  modelId: string | null | undefined,
  bulkContextOverrides?: NestedContextOverrideMap | null
): number | null {
  if (bulkContextOverrides) {
    const p = typeof provider === "string" ? provider.trim() : "";
    const m = typeof modelId === "string" ? modelId.trim() : "";
    if (!p || !m) return null;
    return bulkContextOverrides.get(p)?.get(m) ?? null;
  }
  const record = getModelContextOverrideRecord(provider, modelId);
  return record ? record.realContext : null;
}

/**
 * Batch writers (the context-window reconciler) pass `invalidate: false` and
 * invalidate once at the end, so one pass does not bump the catalog version
 * once per row.
 */
export interface ModelContextOverrideWriteOptions {
  invalidate?: boolean;
}

/**
 * Upsert an override. `realContext` must be a positive integer (a token count);
 * anything else is rejected (no write). Returns true when a row was written.
 */
export function setModelContextOverride(
  provider: string,
  modelId: string,
  realContext: number,
  source: ModelContextOverrideSource = "manual",
  options: ModelContextOverrideWriteOptions = {}
): boolean {
  if (!legacy.set(provider, modelId, realContext, source)) return false;
  if (options.invalidate !== false) invalidateDbCache("model-capabilities");
  return true;
}

/** Remove an override. Returns true when a row was deleted. */
export function removeModelContextOverride(
  provider: string,
  modelId: string,
  options: ModelContextOverrideWriteOptions = {}
): boolean {
  const removed = legacy.remove(provider, modelId);
  if (removed && options.invalidate !== false) invalidateDbCache("model-capabilities");
  return removed;
}

/** All overrides, newest refresh first. Never throws. */
export function listModelContextOverrides(): ModelContextOverride[] {
  return legacy.list();
}
