/**
 * db/quotaConsumption.ts — Sliding Window Counter primitives for quota tracking.
 *
 * Implements low-level bucket read/write operations for the 2-bucket sliding
 * window counter algorithm. Each row is keyed on (api_key_id, dimension_key,
 * bucket_index) where dimension_key = "<poolId>:<unit>:<window>" and
 * bucket_index = floor(now_ms / window_ms).
 *
 * Atomicity: incrementBucket uses INSERT ... ON CONFLICT DO UPDATE (UPSERT)
 * which is a single atomic SQLite statement — no separate read-modify-write.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F2).
 */

import type { QuotaConsumptionRepository } from "@/domain/persistence/quotaCounterRepository";
import { quotaCounterRepositories } from "./repositories/quotaCounterRepositories";

/**
 * Bucket storage lives behind QuotaConsumptionRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because the quota-share store and the
 * pool log route call them without awaiting.
 */
const buckets = quotaCounterRepositories.legacySync.quotaConsumption;

/** Async bucket storage contract. */
export function getQuotaConsumptionRepository(): QuotaConsumptionRepository {
  return quotaCounterRepositories.quotaConsumption;
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/**
 * A single consumption event row, as returned by listConsumptionForPool.
 * Derived from the quota_consumption table; the poolId is stripped from
 * dimension_key (format "<poolId>:<unit>:<window>") and the unit/window
 * fragments are surfaced separately.
 */
export interface ConsumptionEvent {
  apiKeyId: string;
  /** The full dimension_key string: "<poolId>:<unit>:<window>" */
  dimensionKey: string;
  /** The <unit> segment of dimension_key (e.g. "tokens", "requests", "usd") */
  unit: string;
  /** The <window> segment of dimension_key (e.g. "hourly", "daily") */
  window: string;
  bucketIndex: number;
  consumed: number;
  /** epoch ms */
  updatedAt: number;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read the consumed value for a single bucket. Returns 0 if no row exists.
 */
export function getBucket(apiKeyId: string, dimensionKey: string, bucketIndex: number): number {
  return buckets.read(apiKeyId, dimensionKey, bucketIndex);
}

/**
 * Atomically increment the consumed counter for a bucket.
 * Uses UPSERT: if the row does not exist it is created; if it exists the
 * delta is added to the existing consumed value and updated_at is refreshed.
 *
 * @param apiKeyId      The API key being tracked.
 * @param dimensionKey  "<poolId>:<unit>:<window>" string.
 * @param bucketIndex   floor(nowMs / windowMs).
 * @param delta         Amount to add (positive number).
 * @param nowMs         Current epoch milliseconds (used for updated_at).
 */
export function incrementBucket(
  apiKeyId: string,
  dimensionKey: string,
  bucketIndex: number,
  delta: number,
  nowMs: number
): void {
  buckets.add(apiKeyId, dimensionKey, bucketIndex, delta, nowMs);
}

/**
 * Read the current and previous bucket values for the sliding window formula:
 *   effective = prev × (1 − elapsed/window) + curr
 *
 * @param apiKeyId      The API key being tracked.
 * @param dimensionKey  "<poolId>:<unit>:<window>" string.
 * @param currentBucket The current bucket index (floor(nowMs / windowMs)).
 * @returns             { curr, prev } — both default to 0 when row is absent.
 */
export function getPair(
  apiKeyId: string,
  dimensionKey: string,
  currentBucket: number
): { curr: number; prev: number } {
  const prevBucket = currentBucket - 1;

  const curr = buckets.read(apiKeyId, dimensionKey, currentBucket);
  const prev = buckets.read(apiKeyId, dimensionKey, prevBucket);

  return { curr, prev };
}

// ---------------------------------------------------------------------------
// List recent consumption for a pool
// ---------------------------------------------------------------------------

/**
 * Return the most-recent consumption rows for a given pool, ordered by
 * updated_at DESC. The poolId is the first segment of dimension_key
 * (format "<poolId>:<unit>:<window>"), so we filter with a LIKE prefix.
 *
 * @param poolId  The quota pool identifier.
 * @param limit   Maximum rows to return (caller should clamp; default 50).
 * @returns       Array of ConsumptionEvent (may be empty if no data yet).
 */
export function listConsumptionForPool(poolId: string, limit: number): ConsumptionEvent[] {
  const safeLimit = Math.max(1, Math.min(limit, 500));
  const rows = buckets.listRecentForPool(poolId, safeLimit);

  return rows.map((r) => {
    const parts = r.dimensionKey.split(":");
    // parts[0] = poolId, parts[1] = unit, parts[2..] = window (rejoin in case window has colons)
    const unit = parts[1] ?? "";
    const window = parts.slice(2).join(":") ?? "";
    return {
      apiKeyId: r.apiKeyId,
      dimensionKey: r.dimensionKey,
      unit,
      window,
      bucketIndex: r.bucketIndex,
      consumed: r.consumed,
      updatedAt: r.updatedAt,
    };
  });
}

// ---------------------------------------------------------------------------
// Pool-wide aggregate
// ---------------------------------------------------------------------------

interface BucketPairRow {
  api_key_id: string;
  curr: number;
  prev: number;
}

/**
 * Sum the consumed values for a given (dimensionKey, currentBucketIndex) and
 * (dimensionKey, currentBucketIndex - 1) across ALL api_key_id values.
 *
 * Returns { currTotal, prevTotal } so the caller can apply the sliding-window
 * formula once with the pool-wide totals instead of summing per-key.
 *
 * @param dimensionKey   "<poolId>:<unit>:<window>" string — same format as consume/peek.
 * @param currentBucket  floor(nowMs / windowMs) — caller must pass the same value.
 */
export function sumPoolDimension(
  dimensionKey: string,
  currentBucket: number
): { currTotal: number; prevTotal: number } {
  const prevBucket = currentBucket - 1;

  const currTotal = buckets.sumAcrossKeys(dimensionKey, currentBucket);
  const prevTotal = buckets.sumAcrossKeys(dimensionKey, prevBucket);

  return { currTotal, prevTotal };
}

// ---------------------------------------------------------------------------
// GC
// ---------------------------------------------------------------------------

/**
 * Delete rows whose updated_at is strictly less than maxUpdatedAtMs.
 * Used by GC background job to clean up stale bucket rows.
 *
 * Boundary semantics: rows with updated_at === maxUpdatedAtMs are KEPT.
 * Only rows with updated_at < maxUpdatedAtMs (strictly older) are deleted.
 *
 * @param maxUpdatedAtMs Epoch ms threshold (exclusive lower bound for kept rows).
 * @returns              Number of rows deleted.
 */
export function gcOlderThan(maxUpdatedAtMs: number): number {
  return buckets.deleteUpdatedBefore(maxUpdatedAtMs);
}
