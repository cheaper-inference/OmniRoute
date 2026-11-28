// ── Connection-scoped synced model catalogs (`syncedAvailableModels`) ───────

/**
 * One stored connection catalog. `key` is `<providerId>:<connectionId>` and `value`
 * is the serialized model list exactly as stored; parsing and normalization stay
 * with the caller (`normalizeSyncedAvailableModels`), so a malformed blob is the
 * caller's decision to skip, not the repository's.
 */
export interface SyncedModelCatalogRow {
  key: string;
  value: string;
}

/**
 * Persistence only. The DB facades own canonical comparison, the pre-write backup,
 * model-catalog cache invalidation, the post-sync context-window reconcile and the
 * quota-combo notification.
 */
export interface SyncedAvailableModelRepository {
  /** The serialized catalog of one connection, or null when none is stored. */
  readConnectionCatalog(key: string): Promise<string | null>;
  /** Upserts one connection catalog. */
  writeConnectionCatalog(key: string, value: string): Promise<void>;
  /** Deletes one connection catalog; missing keys are a no-op. */
  removeConnectionCatalog(key: string): Promise<void>;
  /**
   * Deletes every connection catalog whose key starts with exactly `<providerId>:`
   * (no wildcard matching) and returns how many were removed.
   */
  removeProviderCatalogs(providerId: string): Promise<number>;
  /**
   * Every connection catalog of one provider, selected with the historical
   * `key LIKE '<providerId>:%'` match.
   */
  listProviderCatalogs(providerId: string): Promise<SyncedModelCatalogRow[]>;
  /** Every stored connection catalog, across all providers. */
  listAllCatalogs(): Promise<SyncedModelCatalogRow[]>;
}
