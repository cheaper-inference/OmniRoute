// ── Last discovery outcome per connection (`discoveryState`) ───────────────

export type DiscoveryStateStatus = "healthy" | "degraded";

export interface DiscoveryStateRecord {
  /** Outcome of the last discovery attempt: "healthy" or "degraded". */
  status: DiscoveryStateStatus;
  /** Sanitized cause of the failure, or null when the discovery succeeded. */
  cause: string | null;
  /** ISO timestamp of the attempt the record describes. */
  at: string;
}

/** One connection whose stored outcome is read or deleted. */
export interface DiscoveryStateEntry {
  provider: string;
  id: string;
}

/**
 * Persistence only. The DB facade stamps the attempt time; deleting a connection
 * or provider still decides when the outcome is purged.
 */
export interface DiscoveryStateRepository {
  /** Replaces the single stored outcome of one connection. */
  save(providerId: string, connectionId: string, record: DiscoveryStateRecord): Promise<void>;
  /**
   * Stored outcomes keyed by `<providerId>:<connectionId>`. A connection without a
   * readable entry (missing, corrupted JSON, unexpected shape, unreadable date) is
   * absent from the map: an unknown outcome is never reported as healthy.
   */
  findForConnections(entries: DiscoveryStateEntry[]): Promise<Map<string, DiscoveryStateRecord>>;
  /** Deletes the outcomes of the given connections; returns the number of rows removed. */
  removeForConnections(entries: DiscoveryStateEntry[]): Promise<number>;
  /** Deletes every outcome stored under `<providerId>:`; returns the number of rows removed. */
  removeForProvider(providerId: string): Promise<number>;
}

// ── Claude Code discovery-alias overrides (`ccDiscoveryAliases`) ───────────

/** `null` means "inherit" from the next level down. */
export type CcAliasSetting = "on" | "off" | null;

export interface CcAliasOverrides {
  /** providerId → setting. */
  providers: Map<string, "on" | "off">;
  /** `<providerId>/<modelId>` → setting. */
  models: Map<string, "on" | "off">;
}

/**
 * Persistence only. The global flag (env > feature-flag override > default), the
 * precedence resolver and model-catalog cache invalidation stay in the DB facade.
 */
export interface CcAliasOverrideRepository {
  /** Provider-level override; anything other than "on"/"off" reads as `null`. */
  getProvider(providerId: string): Promise<CcAliasSetting>;
  /** Stores the provider-level override; `null` deletes it. */
  setProvider(providerId: string, setting: CcAliasSetting): Promise<void>;
  /** Model-level override; anything other than "on"/"off" reads as `null`. */
  getModel(providerId: string, modelId: string): Promise<CcAliasSetting>;
  /** Stores the model-level override; `null` deletes it. */
  setModel(providerId: string, modelId: string, setting: CcAliasSetting): Promise<void>;
  /** Every provider and model override in one read. */
  listAll(): Promise<CcAliasOverrides>;
}
