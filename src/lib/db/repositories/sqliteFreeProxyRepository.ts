/**
 * SQLite implementation of the free-proxy store: free_proxies, free_proxy_sync_errors
 * and the `free_proxies/last_sync_at` key_value row.
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle.
 */

import { randomUUID } from "crypto";
import type {
  FreeProxyAggregates,
  FreeProxyFilters,
  FreeProxyListOptions,
  FreeProxyRecord,
  FreeProxyRegistryPayload,
  FreeProxyRepository,
  FreeProxySyncErrors,
  FreeProxyWrite,
} from "@/domain/persistence/proxyPoolSourceRepositories";
import type { FreeProxySourceId } from "@/lib/freeProxyProviders/types";
import { getDbInstance } from "../core";

type DbRow = Record<string, unknown>;

function mapRow(row: unknown): FreeProxyRecord {
  const r = row as DbRow;
  return {
    id: String(r.id ?? ""),
    source: String(r.source ?? "1proxy") as FreeProxySourceId,
    host: String(r.host ?? ""),
    port: Number(r.port) || 0,
    type: String(r.type ?? "http"),
    countryCode: r.country_code != null ? String(r.country_code) : null,
    qualityScore: r.quality_score != null ? Number(r.quality_score) : null,
    latencyMs: r.latency_ms != null ? Number(r.latency_ms) : null,
    anonymity: r.anonymity != null ? String(r.anonymity) : null,
    lastValidated: r.last_validated != null ? String(r.last_validated) : null,
    inPool: r.in_pool === 1 || r.in_pool === true,
    poolProxyId: r.pool_proxy_id != null ? String(r.pool_proxy_id) : null,
    createdAt: String(r.created_at ?? ""),
    updatedAt: String(r.updated_at ?? ""),
  };
}

function upsert(entry: FreeProxyWrite, now: string): { id: string; action: "created" | "updated" } {
  const db = getDbInstance();

  const existing = db
    .prepare("SELECT id FROM free_proxies WHERE source = ? AND host = ? AND port = ?")
    .get(entry.source, entry.host, entry.port) as { id?: string } | undefined;

  if (existing?.id) {
    db.prepare(
      `UPDATE free_proxies
       SET type = ?, country_code = ?, quality_score = ?, latency_ms = ?,
           anonymity = ?, last_validated = ?, updated_at = ?
       WHERE id = ?`
    ).run(
      entry.type,
      entry.countryCode,
      entry.qualityScore,
      entry.latencyMs,
      entry.anonymity,
      entry.lastValidated,
      now,
      existing.id
    );
    return { id: existing.id, action: "updated" };
  }

  const id = randomUUID();
  db.prepare(
    `INSERT INTO free_proxies
     (id, source, host, port, type, country_code, quality_score, latency_ms,
      anonymity, last_validated, in_pool, pool_proxy_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NULL, ?, ?)`
  ).run(
    id,
    entry.source,
    entry.host,
    entry.port,
    entry.type,
    entry.countryCode,
    entry.qualityScore,
    entry.latencyMs,
    entry.anonymity,
    entry.lastValidated,
    now,
    now
  );
  return { id, action: "created" };
}

function poolStateFilter(options?: FreeProxyFilters): string {
  let sql = "";
  if (options?.onlyInPool) {
    sql += " AND in_pool = 1";
  }
  if (options?.onlyNotInPool) {
    sql += " AND in_pool = 0";
  }
  return sql;
}

function buildFreeProxyFilter(options?: FreeProxyFilters): { sql: string; params: unknown[] } {
  let sql = " WHERE 1=1";
  const params: unknown[] = [];
  if (options?.sources?.length) {
    sql += ` AND source IN (${options.sources.map(() => "?").join(",")})`;
    params.push(...options.sources);
  }
  if (options?.protocol) {
    sql += " AND type = ?";
    params.push(options.protocol);
  }
  if (options?.country) {
    sql += " AND country_code = ?";
    params.push(options.country.toUpperCase());
  }
  if (options?.minQuality != null) {
    sql += " AND quality_score >= ?";
    params.push(options.minQuality);
  }
  sql += poolStateFilter(options);
  if (options?.search) {
    sql += " AND host LIKE ?";
    params.push(`%${options.search}%`);
  }

  return { sql, params };
}

function list(options?: FreeProxyListOptions): FreeProxyRecord[] {
  const db = getDbInstance();
  const filter = buildFreeProxyFilter(options);
  const params = filter.params;
  let sql = "SELECT * FROM free_proxies" + filter.sql;

  const sortClause =
    options?.sortBy === "latency"
      ? "ORDER BY latency_ms IS NULL, latency_ms ASC"
      : options?.sortBy === "recent"
        ? "ORDER BY last_validated DESC"
        : "ORDER BY quality_score DESC, last_validated DESC";
  sql += ` ${sortClause}`;

  if (options?.limit) {
    sql += " LIMIT ?";
    params.push(options.limit);
    if (options?.offset) {
      sql += " OFFSET ?";
      params.push(options.offset);
    }
  }

  const rows = db.prepare(sql).all(...params);
  return rows.map(mapRow);
}

function count(filters?: FreeProxyFilters): number {
  const db = getDbInstance();
  const filter = buildFreeProxyFilter(filters);
  const params = filter.params;
  const sql = "SELECT COUNT(*) AS count FROM free_proxies" + filter.sql;

  const row = db.prepare(sql).get(...params) as DbRow | undefined;
  const value = row?.count;
  return typeof value === "number" ? value : Number(value ?? 0);
}

function findById(id: string): FreeProxyRecord | null {
  const row = getDbInstance().prepare("SELECT * FROM free_proxies WHERE id = ?").get(id);
  return row ? mapRow(row) : null;
}

function markInPool(id: string, poolProxyId: string, now: string): void {
  getDbInstance()
    .prepare("UPDATE free_proxies SET in_pool = 1, pool_proxy_id = ?, updated_at = ? WHERE id = ?")
    .run(poolProxyId, now, id);
}

function promoteToRegistry(
  freeProxyId: string,
  registryPayload: FreeProxyRegistryPayload
): string | null {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const newRegistryId = randomUUID();

  return db.transaction(() => {
    const exists = db
      .prepare("SELECT id, in_pool FROM free_proxies WHERE id = ? LIMIT 1")
      .get(freeProxyId) as { id?: string; in_pool?: number } | undefined;
    if (!exists?.id) return null;

    db.prepare(
      `INSERT INTO proxy_registry
        (id, name, type, host, port, username, password, region, notes, status, source, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, '', '', NULL, NULL, 'active', ?, ?, ?)`
    ).run(
      newRegistryId,
      registryPayload.name,
      registryPayload.type,
      registryPayload.host,
      Number(registryPayload.port),
      registryPayload.source,
      now,
      now
    );

    db.prepare(
      "UPDATE free_proxies SET in_pool = 1, pool_proxy_id = ?, updated_at = ? WHERE id = ?"
    ).run(newRegistryId, now, freeProxyId);

    return newRegistryId;
  })();
}

function deleteById(id: string): boolean {
  const result = getDbInstance().prepare("DELETE FROM free_proxies WHERE id = ?").run(id);
  return result.changes > 0;
}

function deleteUnpooledBySource(source: FreeProxySourceId): number {
  const result = getDbInstance()
    .prepare("DELETE FROM free_proxies WHERE source = ? AND in_pool = 0")
    .run(source);
  return result.changes;
}

function listUnpooledEndpoints(
  source: FreeProxySourceId
): Array<{ id: string; host: string; port: number }> {
  return getDbInstance()
    .prepare("SELECT id, host, port FROM free_proxies WHERE source = ? AND in_pool = 0")
    .all(source) as Array<{ id: string; host: string; port: number }>;
}

function deleteByIds(ids: readonly string[]): number {
  const placeholders = ids.map(() => "?").join(",");
  const result = getDbInstance()
    .prepare(`DELETE FROM free_proxies WHERE id IN (${placeholders})`)
    .run(...ids);
  return result.changes;
}

function aggregates(): FreeProxyAggregates {
  const db = getDbInstance();
  const totals = db
    .prepare(
      `SELECT COUNT(*) as total,
              SUM(CASE WHEN in_pool = 1 THEN 1 ELSE 0 END) as in_pool_count,
              AVG(quality_score) as avg_quality,
              MAX(last_validated) as last_sync_at
       FROM free_proxies`
    )
    .get() as DbRow;

  const bySource = db
    .prepare(
      "SELECT source, COUNT(*) as count FROM free_proxies GROUP BY source ORDER BY count DESC"
    )
    .all() as DbRow[];

  return {
    total: Number(totals.total) || 0,
    inPool: Number(totals.in_pool_count) || 0,
    avgQuality: totals.avg_quality != null ? Number(totals.avg_quality) : null,
    newestLastValidated: totals.last_sync_at != null ? String(totals.last_sync_at) : null,
    bySource: bySource.map((r) => ({ source: String(r.source), count: Number(r.count) })),
  };
}

// #4878: the displayed "last sync" is persisted in the generic key_value store.
const FREE_PROXY_SYNC_NAMESPACE = "free_proxies";
const FREE_PROXY_SYNC_KEY = "last_sync_at";

function recordSyncAt(at: string): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(FREE_PROXY_SYNC_NAMESPACE, FREE_PROXY_SYNC_KEY, at);
}

function getRecordedSyncAt(): string | null {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(FREE_PROXY_SYNC_NAMESPACE, FREE_PROXY_SYNC_KEY) as { value?: string } | undefined;
  return row?.value != null ? String(row.value) : null;
}

function writeSyncErrors(source: FreeProxySourceId, errors: readonly string[], at: string): void {
  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO free_proxy_sync_errors (source, errors, updated_at) VALUES (?, ?, ?)"
    )
    .run(source, JSON.stringify(errors), at);
}

function clearSyncErrors(source: FreeProxySourceId): void {
  getDbInstance().prepare("DELETE FROM free_proxy_sync_errors WHERE source = ?").run(source);
}

function listSyncErrors(): FreeProxySyncErrors {
  const rows = getDbInstance()
    .prepare("SELECT source, errors FROM free_proxy_sync_errors")
    .all() as Array<{
    source: string;
    errors: string;
  }>;
  const out: FreeProxySyncErrors = {};
  for (const row of rows) {
    if (!row.source) continue;
    try {
      const parsed = JSON.parse(row.errors) as unknown;
      out[row.source] = Array.isArray(parsed) ? parsed.map(String) : [String(row.errors)];
    } catch {
      out[row.source] = [String(row.errors)];
    }
  }
  return out;
}

export const sqliteFreeProxyRepository: FreeProxyRepository = {
  upsert: async (entry, now) => upsert(entry, now),
  list: async (options) => list(options),
  count: async (filters) => count(filters),
  findById: async (id) => findById(id),
  markInPool: async (id, poolProxyId, now) => markInPool(id, poolProxyId, now),
  promoteToRegistry: async (freeProxyId, payload) => promoteToRegistry(freeProxyId, payload),
  deleteById: async (id) => deleteById(id),
  deleteUnpooledBySource: async (source) => deleteUnpooledBySource(source),
  listUnpooledEndpoints: async (source) => listUnpooledEndpoints(source),
  deleteByIds: async (ids) => deleteByIds(ids),
  aggregates: async () => aggregates(),
  getRecordedSyncAt: async () => getRecordedSyncAt(),
  recordSyncAt: async (at) => recordSyncAt(at),
  writeSyncErrors: async (source, errors, at) => writeSyncErrors(source, errors, at),
  clearSyncErrors: async (source) => clearSyncErrors(source),
  listSyncErrors: async () => listSyncErrors(),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * facade keeps each write and its backup in the same synchronous turn, as before.
 */
export const sqliteFreeProxyLegacySync = {
  upsert,
  list,
  count,
  findById,
  markInPool,
  promoteToRegistry,
  deleteById,
  deleteUnpooledBySource,
  listUnpooledEndpoints,
  deleteByIds,
  aggregates,
  getRecordedSyncAt,
  recordSyncAt,
  writeSyncErrors,
  clearSyncErrors,
  listSyncErrors,
};
