/**
 * Sliding-window counter storage for quota enforcement.
 *
 * Both stores keep one row per (api key, dimension key, bucket index), where
 * bucket index = floor(now_ms / window_ms). Callers own the window arithmetic
 * (which buckets to read, how to weight them); the store only adds to and reads
 * single buckets.
 *
 * `add` must be atomic for one bucket: concurrent adds to the same bucket never
 * lose an increment. Nothing else is promised across operations; a read after
 * an add may observe later adds from other callers.
 */

/** Per-API-key tpm/rpm minute counters (`api_key_quota_counters`). */
export interface KeyQuotaCounterRepository {
  /** Consumed value of one bucket; 0 when the bucket has no row. */
  read(apiKeyId: string, dimensionKey: string, bucketIndex: number): Promise<number>;
  /** Atomically add `delta` to one bucket, creating it when missing. */
  add(
    apiKeyId: string,
    dimensionKey: string,
    bucketIndex: number,
    delta: number,
    nowMs: number
  ): Promise<void>;
  /**
   * Delete at most `limit` buckets of this key and dimension whose index is
   * below `beforeBucketIndex`. Later calls drain whatever is left.
   */
  pruneBefore(
    apiKeyId: string,
    dimensionKey: string,
    beforeBucketIndex: number,
    limit: number
  ): Promise<void>;
  /** Delete every bucket of this key, all dimensions. */
  deleteForKey(apiKeyId: string): Promise<void>;
}

/** One stored bucket of the quota-share pools (`quota_consumption`). */
export interface QuotaConsumptionRow {
  apiKeyId: string;
  /** "<poolId>:<unit>:<window>" */
  dimensionKey: string;
  bucketIndex: number;
  consumed: number;
  /** epoch ms */
  updatedAt: number;
}

/** Quota-share pool counters (`quota_consumption`). */
export interface QuotaConsumptionRepository {
  /** Consumed value of one bucket; 0 when the bucket has no row. */
  read(apiKeyId: string, dimensionKey: string, bucketIndex: number): Promise<number>;
  /** Atomically add `delta` (may be negative) to one bucket, creating it when missing. */
  add(
    apiKeyId: string,
    dimensionKey: string,
    bucketIndex: number,
    delta: number,
    nowMs: number
  ): Promise<void>;
  /** Sum of one bucket across all API keys; 0 when no key has a row. */
  sumAcrossKeys(dimensionKey: string, bucketIndex: number): Promise<number>;
  /**
   * Most recently updated buckets of one pool (dimension keys starting with
   * "<poolId>:"), newest first, at most `limit` rows. `poolId` is matched
   * literally. The caller bounds `limit`.
   */
  listRecentForPool(poolId: string, limit: number): Promise<QuotaConsumptionRow[]>;
}
