/**
 * SQLite implementations of the read-only 1proxy registry view (proxy_registry rows
 * with source = 'oneproxy') and of the batched scope-pool append (proxy_assignments).
 *
 * The database is resolved at call time so reset/restore never leaves a captured handle.
 */

import type {
  OneproxyListOptions,
  OneproxyProxyRecord,
  OneproxyRegistryRepository,
  ProxyPoolMembershipRepository,
} from "@/domain/persistence/proxyPoolSourceRepositories";
import { getDbInstance } from "../core";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function mapValidationFields(r: JsonRecord) {
  return {
    qualityScore: typeof r.quality_score === "number" ? r.quality_score : null,
    latencyMs: typeof r.latency_ms === "number" ? r.latency_ms : null,
    anonymity: typeof r.anonymity === "string" ? r.anonymity : null,
    googleAccess: r.google_access === 1 || r.google_access === true,
    lastValidated: typeof r.last_validated === "string" ? r.last_validated : null,
    countryCode: typeof r.country_code === "string" ? r.country_code : null,
  };
}

function mapOneproxyRow(row: unknown): OneproxyProxyRecord {
  const r = toRecord(row);
  return {
    id: typeof r.id === "string" ? r.id : "",
    name: typeof r.name === "string" ? r.name : "",
    type: typeof r.type === "string" ? r.type : "http",
    host: typeof r.host === "string" ? r.host : "",
    port: Number(r.port) || 0,
    region: typeof r.region === "string" ? r.region : null,
    notes: typeof r.notes === "string" ? r.notes : null,
    status: typeof r.status === "string" ? r.status : "active",
    source: typeof r.source === "string" ? r.source : "oneproxy",
    ...mapValidationFields(r),
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

function listActiveOneproxy(options?: OneproxyListOptions): OneproxyProxyRecord[] {
  const db = getDbInstance();

  let sql = "SELECT * FROM proxy_registry WHERE source = 'oneproxy' AND status = 'active'";
  const params: unknown[] = [];

  if (options?.protocol) {
    sql += " AND type = ?";
    params.push(options.protocol);
  }
  if (options?.countryCode) {
    sql += " AND country_code = ?";
    params.push(options.countryCode);
  }
  if (options?.minQuality != null) {
    sql += " AND quality_score >= ?";
    params.push(options.minQuality);
  }

  sql += " ORDER BY quality_score DESC, last_validated DESC";

  if (options?.limit) {
    sql += " LIMIT ?";
    params.push(options.limit);
  }

  const rows = db.prepare(sql).all(...params);
  return rows.map(mapOneproxyRow);
}

function appendMissingPoolMembers(
  scope: string,
  scopeId: string | null,
  proxyIds: readonly string[]
): number {
  const db = getDbInstance();
  const maxRow = db
    .prepare(
      "SELECT MAX(position) AS maxPos FROM proxy_assignments WHERE scope = ? AND scope_id IS ?"
    )
    .get(scope, scopeId) as { maxPos?: number | null } | undefined;
  const base = maxRow && typeof maxRow.maxPos === "number" ? maxRow.maxPos + 1 : 0;
  const now = new Date().toISOString();

  const exists = db.prepare(
    "SELECT 1 FROM proxy_assignments WHERE scope = ? AND scope_id IS ? AND proxy_id = ? LIMIT 1"
  );
  const insert = db.prepare(
    `INSERT INTO proxy_assignments (proxy_id, scope, scope_id, position, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  let added = 0;
  proxyIds.forEach((pid, i) => {
    if (!exists.get(scope, scopeId, pid)) {
      insert.run(pid, scope, scopeId, base + i, now, now);
      added++;
    }
  });
  return added;
}

export const sqliteOneproxyRegistryRepository: OneproxyRegistryRepository = {
  listActive: async (options) => listActiveOneproxy(options),
};

export const sqliteProxyPoolMembershipRepository: ProxyPoolMembershipRepository = {
  appendMissing: async (scope, scopeId, proxyIds) =>
    appendMissingPoolMembers(scope, scopeId, proxyIds),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * facades keep each write, its generation bump and its backup in the same turn.
 */
export const sqliteProxyRegistryViewsLegacySync = {
  listActiveOneproxy,
  appendMissingPoolMembers,
};
