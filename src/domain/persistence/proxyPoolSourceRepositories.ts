import type { FreeProxySourceId } from "@/lib/freeProxyProviders/types";

// ── Free proxies (free_proxies, free_proxy_sync_errors, last-sync timestamp) ─

export interface FreeProxyRecord {
  id: string;
  source: FreeProxySourceId;
  host: string;
  port: number;
  type: string;
  countryCode: string | null;
  qualityScore: number | null;
  latencyMs: number | null;
  anonymity: string | null;
  lastValidated: string | null;
  inPool: boolean;
  poolProxyId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FreeProxyStats {
  total: number;
  inPool: number;
  avgQuality: number | null;
  bySource: Array<{ source: string; count: number }>;
  lastSyncAt: string | null;
}

/** Source id → list of error messages from that source's last sync. */
export type FreeProxySyncErrors = Record<string, string[]>;

export interface FreeProxyFilters {
  sources?: FreeProxySourceId[];
  protocol?: string;
  country?: string;
  minQuality?: number;
  onlyInPool?: boolean;
  onlyNotInPool?: boolean;
  search?: string;
}

export interface FreeProxyListOptions extends FreeProxyFilters {
  sortBy?: "quality" | "latency" | "recent";
  limit?: number;
  offset?: number;
}

/** One provider row as stored; the facade fills defaults before writing. */
export interface FreeProxyWrite {
  source: FreeProxySourceId;
  host: string;
  port: number;
  type: string;
  countryCode: string | null;
  qualityScore: number | null;
  latencyMs: number | null;
  anonymity: string | null;
  lastValidated: string;
}

export interface FreeProxyRegistryPayload {
  name: string;
  type: string;
  host: string;
  port: number;
  source: string;
}

/** Stored aggregates; the facade rounds and picks the displayed sync time. */
export interface FreeProxyAggregates {
  total: number;
  inPool: number;
  avgQuality: number | null;
  newestLastValidated: string | null;
  bySource: Array<{ source: string; count: number }>;
}

/**
 * Persistence only. Rows are unique per (source, host, port). The facade owns input
 * defaults, the stale-row decision, the displayed sync time and backups.
 */
export interface FreeProxyRepository {
  /** Updates the row with the same (source, host, port) or inserts a new unpooled one. */
  upsert(
    entry: FreeProxyWrite,
    now: string
  ): Promise<{ id: string; action: "created" | "updated" }>;
  /** Filtered rows in the requested order; `offset` only applies together with `limit`. */
  list(options?: FreeProxyListOptions): Promise<FreeProxyRecord[]>;
  count(filters?: FreeProxyFilters): Promise<number>;
  findById(id: string): Promise<FreeProxyRecord | null>;
  markInPool(id: string, poolProxyId: string, now: string): Promise<void>;
  /**
   * Inserts an active registry row and marks the free proxy as pooled in one
   * transaction. Returns the new registry id, or null when the free proxy is unknown.
   */
  promoteToRegistry(freeProxyId: string, payload: FreeProxyRegistryPayload): Promise<string | null>;
  /** True when a row was removed. */
  deleteById(id: string): Promise<boolean>;
  /** Removes the source's rows that are not pooled; returns how many went. */
  deleteUnpooledBySource(source: FreeProxySourceId): Promise<number>;
  /** The source's rows that are not pooled, as candidates for stale pruning. */
  listUnpooledEndpoints(
    source: FreeProxySourceId
  ): Promise<Array<{ id: string; host: string; port: number }>>;
  /** Removes the given ids; returns how many went. */
  deleteByIds(ids: readonly string[]): Promise<number>;
  aggregates(): Promise<FreeProxyAggregates>;
  /** The recorded end of the last sync cycle, or null when none was recorded. */
  getRecordedSyncAt(): Promise<string | null>;
  recordSyncAt(at: string): Promise<void>;
  /** Replaces the source's stored errors. */
  writeSyncErrors(source: FreeProxySourceId, errors: readonly string[], at: string): Promise<void>;
  clearSyncErrors(source: FreeProxySourceId): Promise<void>;
  /** Every stored error list; unparseable or non-array values come back as one message. */
  listSyncErrors(): Promise<FreeProxySyncErrors>;
}

// ── 1proxy marketplace rows (proxy_registry, source = 'oneproxy') ──────────

export interface OneproxyProxyRecord {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  region: string | null;
  notes: string | null;
  status: string;
  source: string;
  qualityScore: number | null;
  latencyMs: number | null;
  anonymity: string | null;
  googleAccess: boolean;
  lastValidated: string | null;
  countryCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OneproxyListOptions {
  protocol?: string;
  countryCode?: string;
  minQuality?: number;
  limit?: number;
}

/** Read-only view of active 1proxy rows, best quality and freshest first. */
export interface OneproxyRegistryRepository {
  listActive(options?: OneproxyListOptions): Promise<OneproxyProxyRecord[]>;
}

// ── Scope rotation pools (proxy_assignments) ────────────────────────────────

/**
 * Persistence only. The caller passes an already normalized scope and scope id and a
 * de-duplicated id list, and owns the registry generation bump and backups.
 */
export interface ProxyPoolMembershipRepository {
  /**
   * Appends the ids that are not yet members of the pool, after its highest position
   * and in the given order. Returns how many were added.
   */
  appendMissing(
    scope: string,
    scopeId: string | null,
    proxyIds: readonly string[]
  ): Promise<number>;
}
