/**
 * The admission rule of the live-catalog gate, shared by request dispatch
 * (`src/sse/services/model.ts::lookupModelMeta`) and the provider dashboard
 * (`mergeProviderModelListing` → "Not in live catalog" badge) so the two cannot drift.
 *
 * Both sides read the same catalog: `getActiveSyncedCatalog(providerId)` with its default
 * `includeCustomModels = true`, i.e. operator custom rows are part of the catalog and of
 * its authority decision. The dashboard receives that catalog's `authoritative` flag and
 * model ids from `GET /api/synced-available-models` (`liveCatalog`).
 */

import { getRegisteredProviderEffortBaseModelId } from "@omniroute/open-sse/utils/registeredEffortVariants";

/** Authority + membership of the runtime live catalog for one provider. */
export type LiveCatalogGate = {
  authoritative: boolean;
  modelIds: readonly string[];
};

/** Parse the route's `liveCatalog`; a malformed value yields `undefined` (no server gate). */
export function readLiveCatalogGate(value: unknown): LiveCatalogGate | undefined {
  if (!value || typeof value !== "object") return undefined;
  const { authoritative, modelIds } = value as { authoritative?: unknown; modelIds?: unknown };
  if (typeof authoritative !== "boolean" || !Array.isArray(modelIds)) return undefined;
  return {
    authoritative,
    modelIds: modelIds.filter((id): id is string => typeof id === "string"),
  };
}

export type LiveCatalogAdmissionInput = {
  providerId: string;
  /** The id as requested (registered effort variants are resolved from it). */
  modelId: string;
  authoritative: boolean;
  /** Membership test against the runtime catalog (custom rows included). */
  catalogContains: (modelId: string) => boolean;
  /** An operator custom model matches the (resolved) id. */
  customMatch: boolean;
  /**
   * A catalog row matches the (resolved) id. Dispatch passes its alias-aware match;
   * when omitted, plain membership of `modelId` is used.
   */
  syncedMatch?: boolean;
};

/**
 * A non-authoritative catalog admits every model (fail open). An authoritative one
 * admits an operator custom model, a catalog row, or a registered effort variant whose
 * base id the catalog lists.
 */
export function liveCatalogAdmitsModel(input: LiveCatalogAdmissionInput): boolean {
  if (!input.authoritative) return true;
  if (input.customMatch) return true;
  if (input.syncedMatch ?? input.catalogContains(input.modelId)) return true;
  const effortBase = getRegisteredProviderEffortBaseModelId(input.providerId, input.modelId);
  return effortBase !== null && input.catalogContains(effortBase);
}
