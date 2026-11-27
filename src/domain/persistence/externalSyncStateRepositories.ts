// ── LiteLLM synced pricing (`pricing_synced` + `pricing_sync_status`) ───────

/** Provider → model → pricing entry, exactly as stored (no historical-alias remap). */
export type SyncedPricingMap = Record<string, Record<string, unknown>>;

/** The last successful non-dry-run sync, shared by every module instance. */
export interface PricingSyncStatusRecord {
  lastSyncTime: string;
  lastSyncModelCount: number;
}

/**
 * Persistence only. The sync service owns fetching, transforming, the truncation guard,
 * the read memo, the pre-write backup and `invalidateDbCache("pricing")`.
 */
export interface SyncedPricingRepository {
  /**
   * Every stored provider row, JSON-decoded. A row that cannot be decoded is skipped
   * with a warning instead of failing the read.
   */
  list(): Promise<SyncedPricingMap>;
  /** Full replace in one transaction: every stored row is deleted, then `data` inserted. */
  replaceAll(data: SyncedPricingMap): Promise<void>;
  /** Deletes every stored row. */
  clear(): Promise<void>;
  /**
   * The persisted last-sync record; null when absent, unreadable or without a string
   * `lastSyncTime`. A missing or non-numeric model count reads as 0.
   */
  readStatus(): Promise<PricingSyncStatusRecord | null>;
  /** Upserts the last-sync record. */
  writeStatus(lastSyncTime: string, lastSyncModelCount: number): Promise<void>;
}

// ── Arena ELO sync state (`arena_elo` key_value namespace) ──────────────────

/** Keys the Arena ELO sync keeps next to the `model_intelligence` rows it writes. */
export type ArenaEloSyncStateKey = "lastFailedAt" | "lastError" | "activeSource" | "datasetDate";

/**
 * Persistence only, and errors propagate: the sync service decides which failures it
 * swallows, logs or treats as "no value". Values are stored as given.
 */
export interface ArenaEloSyncStateRepository {
  /** The stored value (possibly an empty string), or null when the key is absent. */
  get(key: ArenaEloSyncStateKey): Promise<string | null>;
  /** Upserts one key. */
  set(key: ArenaEloSyncStateKey, value: string): Promise<void>;
  /** Deletes one key; a missing key is a no-op. */
  remove(key: ArenaEloSyncStateKey): Promise<void>;
}
