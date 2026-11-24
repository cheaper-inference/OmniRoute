/**
 * SQLite implementations of the quota counter stores:
 *   - api_key_quota_counters (migration 182): per-key tpm/rpm minute buckets
 *   - quota_consumption (migration 078): quota-share pool buckets
 *
 * SQL text, statement order and row-to-number conversion are unchanged from the
 * pre-repository modules (db/keyQuota.ts, db/quotaConsumption.ts). Each add is a
 * single INSERT ... ON CONFLICT DO UPDATE, atomic at the SQLite level. The
 * database is resolved at call time so reset/restore never leaves a captured
 * handle.
 *
 * Async repositories and the SQLite-only legacy helpers share these private
 * operations.
 */

import type {
  KeyQuotaCounterRepository,
  QuotaConsumptionRepository,
  QuotaConsumptionRow,
} from "@/domain/persistence/quotaCounterRepository";
import { toNumber } from "@/shared/utils/numeric";
import { getDbInstance } from "../core";

// ---------------------------------------------------------------------------
// api_key_quota_counters
// ---------------------------------------------------------------------------

function readKeyQuotaBucket(apiKeyId: string, dimensionKey: string, bucketIndex: number): number {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT consumed FROM api_key_quota_counters
       WHERE api_key_id = ? AND dimension_key = ? AND bucket_index = ?`
    )
    .get(apiKeyId, dimensionKey, bucketIndex) as { consumed?: number } | undefined;
  return toNumber(row?.consumed);
}

function addKeyQuotaBucket(
  apiKeyId: string,
  dimensionKey: string,
  bucketIndex: number,
  delta: number,
  nowMs: number
): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO api_key_quota_counters (api_key_id, dimension_key, bucket_index, consumed, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(api_key_id, dimension_key, bucket_index) DO UPDATE SET
       consumed = consumed + excluded.consumed,
       updated_at = excluded.updated_at`
  ).run(apiKeyId, dimensionKey, bucketIndex, delta, nowMs);
}

function pruneKeyQuotaBucketsBefore(
  apiKeyId: string,
  dimensionKey: string,
  beforeBucketIndex: number,
  limit: number
): void {
  const db = getDbInstance();
  db.prepare(
    `DELETE FROM api_key_quota_counters WHERE rowid IN (
       SELECT rowid FROM api_key_quota_counters
       WHERE api_key_id = ? AND dimension_key = ? AND bucket_index < ?
       LIMIT ?
     )`
  ).run(apiKeyId, dimensionKey, beforeBucketIndex, limit);
}

function deleteKeyQuotaBuckets(apiKeyId: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM api_key_quota_counters WHERE api_key_id = ?").run(apiKeyId);
}

export const sqliteKeyQuotaCounterRepository: KeyQuotaCounterRepository = {
  read: async (apiKeyId, dimensionKey, bucketIndex) =>
    readKeyQuotaBucket(apiKeyId, dimensionKey, bucketIndex),
  add: async (apiKeyId, dimensionKey, bucketIndex, delta, nowMs) =>
    addKeyQuotaBucket(apiKeyId, dimensionKey, bucketIndex, delta, nowMs),
  pruneBefore: async (apiKeyId, dimensionKey, beforeBucketIndex, limit) =>
    pruneKeyQuotaBucketsBefore(apiKeyId, dimensionKey, beforeBucketIndex, limit),
  deleteForKey: async (apiKeyId) => deleteKeyQuotaBuckets(apiKeyId),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract:
 * the pre-request quota gate and the post-response counters run synchronously
 * on the request path.
 */
export const sqliteKeyQuotaCounterLegacySync = {
  read: readKeyQuotaBucket,
  add: addKeyQuotaBucket,
  pruneBefore: pruneKeyQuotaBucketsBefore,
  deleteForKey: deleteKeyQuotaBuckets,
};

// ---------------------------------------------------------------------------
// quota_consumption
// ---------------------------------------------------------------------------

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

interface BucketRow {
  consumed: number;
}

interface SumRow {
  total: number;
}

interface ConsumptionDbRow {
  api_key_id: string;
  dimension_key: string;
  bucket_index: number;
  consumed: number;
  updated_at: number;
}

function readConsumptionBucket(
  apiKeyId: string,
  dimensionKey: string,
  bucketIndex: number
): number {
  const row = getDb()
    .prepare<BucketRow>(
      `SELECT consumed FROM quota_consumption
       WHERE api_key_id = ? AND dimension_key = ? AND bucket_index = ?`
    )
    .get(apiKeyId, dimensionKey, bucketIndex);
  return row?.consumed ?? 0;
}

function addConsumptionBucket(
  apiKeyId: string,
  dimensionKey: string,
  bucketIndex: number,
  delta: number,
  nowMs: number
): void {
  getDb()
    .prepare(
      `INSERT INTO quota_consumption (api_key_id, dimension_key, bucket_index, consumed, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(api_key_id, dimension_key, bucket_index)
       DO UPDATE SET
         consumed = consumed + excluded.consumed,
         updated_at = excluded.updated_at`
    )
    .run(apiKeyId, dimensionKey, bucketIndex, delta, nowMs);
}

function sumConsumptionBucket(dimensionKey: string, bucketIndex: number): number {
  const row = getDb()
    .prepare<SumRow>(
      `SELECT COALESCE(SUM(consumed), 0) AS total
       FROM quota_consumption
       WHERE dimension_key = ? AND bucket_index = ?`
    )
    .get(dimensionKey, bucketIndex);
  return row?.total ?? 0;
}

function listRecentConsumptionForPool(poolId: string, limit: number): QuotaConsumptionRow[] {
  // dimension_key format: "<poolId>:<unit>:<window>"
  // The LIKE pattern uses "%" — escape literal "%" or "_" in poolId defensively.
  const prefix = poolId.replace(/[%_\\]/g, "\\$&") + ":%";
  const rows = getDb()
    .prepare<ConsumptionDbRow>(
      `SELECT api_key_id, dimension_key, bucket_index, consumed, updated_at
       FROM quota_consumption
       WHERE dimension_key LIKE ? ESCAPE '\\'
       ORDER BY updated_at DESC
       LIMIT ?`
    )
    .all(prefix, limit);
  return rows.map((r) => ({
    apiKeyId: r.api_key_id,
    dimensionKey: r.dimension_key,
    bucketIndex: r.bucket_index,
    consumed: r.consumed,
    updatedAt: r.updated_at,
  }));
}

/** Not part of the Promise contract: no production caller (cleanup.ts batches its own delete). */
function deleteConsumptionUpdatedBefore(maxUpdatedAtMs: number): number {
  const result = getDb()
    .prepare("DELETE FROM quota_consumption WHERE updated_at < ?")
    .run(maxUpdatedAtMs);
  return result.changes;
}

export const sqliteQuotaConsumptionRepository: QuotaConsumptionRepository = {
  read: async (apiKeyId, dimensionKey, bucketIndex) =>
    readConsumptionBucket(apiKeyId, dimensionKey, bucketIndex),
  add: async (apiKeyId, dimensionKey, bucketIndex, delta, nowMs) =>
    addConsumptionBucket(apiKeyId, dimensionKey, bucketIndex, delta, nowMs),
  sumAcrossKeys: async (dimensionKey, bucketIndex) =>
    sumConsumptionBucket(dimensionKey, bucketIndex),
  listRecentForPool: async (poolId, limit) => listRecentConsumptionForPool(poolId, limit),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract:
 * the quota-share store and the pool log route call these without awaiting.
 */
export const sqliteQuotaConsumptionLegacySync = {
  read: readConsumptionBucket,
  add: addConsumptionBucket,
  sumAcrossKeys: sumConsumptionBucket,
  listRecentForPool: listRecentConsumptionForPool,
  deleteUpdatedBefore: deleteConsumptionUpdatedBefore,
};
