/** Persists and retrieves the model list synced from embedded services (9router, etc.). */

import type {
  ServiceModel,
  ServiceModelRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import { modelCatalogRepositories } from "./repositories/modelCatalogRepositories";

export type { ServiceModel } from "@/domain/persistence/modelCatalogRepositories";

// Persistence lives behind ServiceModelRepository. The exports below stay synchronous
// (SQLite-only legacy access) for the supervisor, model sync and routes; this facade
// owns the availability merge.
const legacy = modelCatalogRepositories.legacySync.serviceModels;

/** Async persistence contract; it stores lists as given and never merges availability. */
export function getServiceModelRepository(): ServiceModelRepository {
  return modelCatalogRepositories.serviceModels;
}

export function getServiceModels(tool: string): ServiceModel[] {
  return legacy.list(tool);
}

/**
 * Persist a new model list for a tool, with soft-delete pruning.
 *
 * Models present in the new payload are UPSERTed with `available: true`.
 * Models that were previously stored but are missing from the new payload
 * are marked `available: false` (not deleted — preserves history).
 */
export function saveServiceModels(tool: string, models: ServiceModel[]): void {
  // Load existing stored models to compute the diff.
  const existing = getServiceModels(tool);
  const incomingIds = new Set(models.map((m) => m.id));

  // Mark incoming models as available, and pruned ones as unavailable.
  const incomingWithFlag: ServiceModel[] = models.map((m) => ({ ...m, available: true }));
  const pruned: ServiceModel[] = existing
    .filter((m) => !incomingIds.has(m.id))
    .map((m) => ({ ...m, available: false }));

  // An empty merged list deletes the tool's row.
  legacy.replace(tool, [...incomingWithFlag, ...pruned]);
}

/**
 * Mark all stored models for a tool as unavailable.
 * Called when the supervisor transitions to stopped or error state so the
 * model catalog reflects that none of the models are currently reachable.
 */
export function markAllUnavailable(tool: string): void {
  const existing = getServiceModels(tool);
  if (existing.length === 0) return;
  const updated: ServiceModel[] = existing.map((m) => ({ ...m, available: false }));
  legacy.replace(tool, updated);
}
