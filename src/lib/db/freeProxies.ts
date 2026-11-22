import type {
  FreeProxyFilters,
  FreeProxyListOptions,
  FreeProxyRecord,
  FreeProxyRepository,
  FreeProxyStats,
  FreeProxySyncErrors,
} from "@/domain/persistence/proxyPoolSourceRepositories";
import type { FreeProxyItem, FreeProxySourceId } from "@/lib/freeProxyProviders/types";
import { backupDbFile } from "./backup";
import { proxyPoolSourceRepositories } from "./repositories/proxyPoolSourceRepositories";

export type {
  FreeProxyRecord,
  FreeProxyStats,
  FreeProxySyncErrors,
} from "@/domain/persistence/proxyPoolSourceRepositories";

/**
 * Persistence lives behind FreeProxyRepository. The exports below keep their async
 * shape and await nothing new: each write and its backup still run in the same turn
 * through the SQLite-only synchronous binding. This facade owns input defaults, the
 * stale-row decision, the displayed sync time and backups.
 */
const legacy = proxyPoolSourceRepositories.legacySync.freeProxies;

/** Async persistence contract; it never takes backups on its own. */
export function getFreeProxyRepository(): FreeProxyRepository {
  return proxyPoolSourceRepositories.freeProxies;
}

export async function upsertFreeProxy(
  item: FreeProxyItem
): Promise<{ id: string; action: "created" | "updated" }> {
  const now = new Date().toISOString();
  return legacy.upsert(
    {
      source: item.source,
      host: item.host,
      port: item.port,
      type: item.type,
      countryCode: item.countryCode ?? null,
      qualityScore: item.qualityScore ?? null,
      latencyMs: item.latencyMs ?? null,
      anonymity: item.anonymity ?? null,
      lastValidated: item.lastValidated ?? now,
    },
    now
  );
}

export async function listFreeProxies(options?: FreeProxyListOptions): Promise<FreeProxyRecord[]> {
  return legacy.list(options);
}

export async function countFreeProxies(options?: FreeProxyFilters): Promise<number> {
  return legacy.count(options);
}

export async function listFreeProxiesBySource(
  source: FreeProxySourceId,
  filters: {
    protocol?: string;
    country?: string;
    minQuality?: number;
    limit?: number;
  }
): Promise<FreeProxyItem[]> {
  const records = await listFreeProxies({
    sources: [source],
    protocol: filters.protocol,
    country: filters.country,
    minQuality: filters.minQuality,
    limit: filters.limit,
  });
  return records.map((r) => ({
    source: r.source,
    host: r.host,
    port: r.port,
    type: r.type as FreeProxyItem["type"],
    countryCode: r.countryCode,
    qualityScore: r.qualityScore,
    latencyMs: r.latencyMs,
    anonymity: r.anonymity,
    lastValidated: r.lastValidated,
  }));
}

export async function getFreeProxyById(id: string): Promise<FreeProxyRecord | null> {
  return legacy.findById(id);
}

export async function markFreeProxyInPool(id: string, poolProxyId: string): Promise<void> {
  legacy.markInPool(id, poolProxyId, new Date().toISOString());
  backupDbFile("pre-write");
}

/**
 * Atomically inserts the free proxy into `proxy_registry` and flips its
 * `in_pool` flag in a single SQLite transaction. Replaces the previous
 * non-atomic `createProxy() + markFreeProxyInPool()` pair which could leave
 * `free_proxies.in_pool=0` while the registry row already existed if the
 * second call failed.
 *
 * Returns the new `poolProxyId` on success, or `null` if the free proxy id
 * does not exist (caller should return 404).
 */
export async function promoteFreeProxyToPool(
  freeProxyId: string,
  registryPayload: {
    name: string;
    type: string;
    host: string;
    port: number;
    source: string;
  }
): Promise<string | null> {
  const result = legacy.promoteToRegistry(freeProxyId, registryPayload);
  if (result) backupDbFile("pre-write");
  return result;
}

export async function deleteFreeProxy(id: string): Promise<boolean> {
  const deleted = legacy.deleteById(id);
  backupDbFile("pre-write");
  return deleted;
}

export async function clearFreeProxiesBySource(source: FreeProxySourceId): Promise<number> {
  const removed = legacy.deleteUnpooledBySource(source);
  backupDbFile("pre-write");
  return removed;
}

/**
 * Tombstone rows for `source` whose `host:port` is no longer present in the
 * provider's latest list — e.g. Webshare recycles/retires proxy IDs between
 * syncs. Rows already promoted to the pool (`in_pool = 1`) are left alone so
 * runtime resolution of an in-use proxy is never disturbed; only stale,
 * not-yet-pooled candidates are pruned. Returns the number of rows removed.
 */
export async function pruneStaleFreeProxies(
  source: FreeProxySourceId,
  activeKeys: ReadonlySet<string>
): Promise<number> {
  const rows = legacy.listUnpooledEndpoints(source);

  const staleIds = rows.filter((r) => !activeKeys.has(`${r.host}:${r.port}`)).map((r) => r.id);

  if (staleIds.length === 0) return 0;

  const removed = legacy.deleteByIds(staleIds);
  backupDbFile("pre-write");
  return removed;
}

// #4878: the displayed "last sync" used to be derived from MAX(last_validated),
// which only advances when a provider returns at least one new/updated proxy. A
// sync that returns zero rows (or whose providers all fail) left the timestamp
// frozen, so "Sync All" appeared to do nothing. We persist an explicit sync
// timestamp in the generic key_value store and prefer it in the stats.

/**
 * Persist the moment a free-proxy sync completed. Returns the stored ISO string
 * so the route can echo it back. `at` is overridable for deterministic tests.
 */
export async function recordFreeProxySync(at?: string): Promise<string> {
  const ts = at ?? new Date().toISOString();
  legacy.recordSyncAt(ts);
  backupDbFile("pre-write");
  return ts;
}

export async function getFreeProxyStats(): Promise<FreeProxyStats> {
  const totals = legacy.aggregates();

  // Prefer the explicitly recorded sync timestamp (#4878); fall back to the
  // newest last_validated only when no sync has ever been recorded.
  const recordedSyncAt = legacy.getRecordedSyncAt();

  return {
    total: totals.total,
    inPool: totals.inPool,
    avgQuality: totals.avgQuality != null ? Math.round(totals.avgQuality) : null,
    bySource: totals.bySource,
    lastSyncAt: recordedSyncAt ?? totals.newestLastValidated,
  };
}
/**
 * Persist the most recent per-source sync errors. A successful sync for a
 * source should call clearFreeProxySyncErrors instead so the stale error
 * stops showing.
 */
export async function recordFreeProxySyncErrors(
  source: FreeProxySourceId,
  errors: string[]
): Promise<void> {
  legacy.writeSyncErrors(source, errors, new Date().toISOString());
  backupDbFile("pre-write");
}

/** Clear a source's stored sync error (called on a successful sync). */
export async function clearFreeProxySyncErrors(source: FreeProxySourceId): Promise<void> {
  legacy.clearSyncErrors(source);
  backupDbFile("pre-write");
}

/**
 * Read all stored per-source sync errors as a plain map. Sources with no
 * recorded error are omitted, so an empty object means a clean (or un-synced)
 * state.
 */
export async function getFreeProxySyncErrors(): Promise<FreeProxySyncErrors> {
  return legacy.listSyncErrors();
}
