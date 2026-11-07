/**
 * catalogSyncedCoverage.ts — synced-model coverage for the /v1/models static loop.
 *
 * The synced discovery list (from a provider's `modelsUrl`) REPLACES the static
 * registry models in the catalog (see #7694 reasoning). But it must only replace
 * models the synced list actually covers. Before this helper, any provider with
 * ANY synced model dropped ALL its static models — so static models the upstream
 * discovery does not list (e.g. command-code's `deepseek/deepseek-v4-flash`) were
 * silently removed from the catalog even though the gateway routes them (200 OK).
 *
 * Pure module (no DB import) so it is unit-testable and keeps catalog.ts lean.
 */

export interface SyncedModelRow {
  id?: unknown;
}

/**
 * Decide whether a static registry model should be suppressed because a provider's
 * synced model list covers it.
 *
 * `syncedModelIds` are the display-model ids already normalized by the synced loop
 * (`displayModelId`), i.e. without the provider alias prefix. Match the static
 * model id exactly.
 */
export function shouldSuppressStaticModelBySyncedCoverage(opts: {
  providerHasSynced: boolean;
  staticModelId: string;
  syncedModelIds: string[];
}): boolean {
  if (!opts.providerHasSynced) return false;
  if (opts.syncedModelIds.length === 0) return false;
  return opts.syncedModelIds.includes(opts.staticModelId);
}

/**
 * Exclusive live-catalog listing (Cursor): when the provider opts in and has a
 * non-empty synced catalog, suppress EVERY static registry row — including
 * effort-suffixed variants the coverage helper would otherwise preserve.
 *
 * Non-exclusive providers fall through to exact-id coverage suppression.
 */
export function shouldSuppressStaticModelForExclusiveListing(opts: {
  exclusiveListing: boolean;
  providerHasSynced: boolean;
  staticModelId: string;
  syncedModelIds: string[];
}): boolean {
  if (opts.exclusiveListing) {
    return opts.providerHasSynced && opts.syncedModelIds.length > 0;
  }
  return shouldSuppressStaticModelBySyncedCoverage({
    providerHasSynced: opts.providerHasSynced,
    staticModelId: opts.staticModelId,
    syncedModelIds: opts.syncedModelIds,
  });
}

/**
 * Build a Map of canonical provider id -> set of synced display-model ids, so the
 * static loop can decide which static models a provider's synced discovery list
 * actually covers (and which static models it must preserve). Keyed by canonical
 * provider id because the static loop addresses providers that way.
 */
export function buildSyncedModelIdsByCanonicalProvider(
  syncedModelsByProvider: Record<string, SyncedModelRow[]>,
  resolveCanonicalProviderId: (aliasOrId: string, fallbackProviderId?: string) => string,
  providerIdToPrefix: Record<string, string>,
  providerIdToAlias: Record<string, string>
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const [providerId, syncedModels] of Object.entries(syncedModelsByProvider)) {
    if (!Array.isArray(syncedModels)) continue;
    const alias = providerIdToPrefix[providerId] || providerIdToAlias[providerId] || providerId;
    const canonicalId = resolveCanonicalProviderId(alias, providerId);
    const set = map.get(canonicalId) || new Set<string>();
    for (const sm of syncedModels) {
      if (typeof sm?.id === "string" && sm.id.length > 0) set.add(sm.id);
    }
    map.set(canonicalId, set);
  }
  return map;
}
