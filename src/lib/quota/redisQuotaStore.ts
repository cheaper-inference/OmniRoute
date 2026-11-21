/**
 * redisQuotaStore.ts — Optional Redis-backed QuotaStore implementation.
 *
 * Counter keys follow the pattern:
 *   omniroute:quota:<apiKeyId>:<dimensionKey>:<bucketIndex>
 *
 * Sliding window is maintained identically to the SQLite driver:
 *   effective = prev × (1 − elapsed/window) + curr
 *
 * Pool/allocation metadata (listAllocationsForApiKey, getPool) still lives in
 * SQLite (F2) — only the rolling counters are stored in Redis.
 *
 * The percent attribution book of a pool connection is one hash,
 *   omniroute:quota-ledger:<poolId>:<connectionId>
 * with `t:<apiKeyId>` (cumulative tokens), `u:<apiKeyId>` (time of the last
 * token write) and `s:<window>:<rev>` (the book of a window at a revision, JSON).
 *
 * ioredis is a SOFT dependency. If not installed, constructing a RedisQuotaStore
 * throws a clear error message.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import { getPool, listAllocationsForApiKey } from "@/lib/db/quotaPools";
import { WINDOW_MS, dimensionKeyToString } from "./dimensions";
import type { DimensionKey } from "./dimensions";
import type {
  LedgerCounter,
  LedgerKey,
  LedgerSnapshot,
  LedgerState,
  PoolUsageSnapshot,
  QuotaStore,
} from "./types";
import { buildPoolUsageSnapshot } from "./poolUsageSnapshot";
import { isStorableLedgerState, storedLedgerKeys } from "./percentLedger";

// ---------------------------------------------------------------------------
// Redis connection singleton
// ---------------------------------------------------------------------------

// Lazy singleton — created on first use
let _redisClient: unknown = null; // typed as unknown; cast via RedisLike below

interface RedisLike {
  mget(...keys: string[]): Promise<Array<string | null>>;
  eval(script: string, numkeys: number, ...args: unknown[]): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  quit(): Promise<string>;
  hgetall(key: string): Promise<Record<string, string>>;
  hdel(key: string, ...fields: string[]): Promise<number>;
}

/**
 * Return the singleton Redis client. Throws if ioredis is not installed.
 * The url parameter is only used when creating the connection for the first time.
 */
export async function getRedisClient(url: string): Promise<RedisLike> {
  if (_redisClient) {
    return _redisClient as RedisLike;
  }

  // Lazy dynamic require — ioredis is an optional dependency
  let Redis: new (url: string) => RedisLike;
  try {
    const mod = await import("ioredis");
    Redis = (mod.default ?? mod) as new (url: string) => RedisLike;
  } catch {
    throw new Error("Redis driver requires ioredis package. Run npm install ioredis.");
  }

  _redisClient = new Redis(url);
  return _redisClient as RedisLike;
}

/** Test-only: reset the Redis singleton. */
export function resetRedisClient(): void {
  _redisClient = null;
}

// ---------------------------------------------------------------------------
// Key helpers
// ---------------------------------------------------------------------------

const KEY_PREFIX = `${process.env.REDIS_KEY_PREFIX?.trim() || "omniroute:"}quota`;

function bucketKey(apiKeyId: string, dimensionKey: string, bucketIndex: number): string {
  return `${KEY_PREFIX}:${apiKeyId}:${dimensionKey}:${bucketIndex}`;
}

// Charge + TTL in one atomic call: a crash between INCRBYFLOAT and EXPIRE can no
// longer leave a counter without expiry. Returns [current, previous] bucket values.
const CONSUME_SCRIPT = `
local curr = redis.call("INCRBYFLOAT", KEYS[1], ARGV[1])
redis.call("EXPIRE", KEYS[1], ARGV[2])
redis.call("EXPIRE", KEYS[2], ARGV[2])
return { curr, redis.call("GET", KEYS[2]) or "0" }
`;

function ttlSeconds(windowMs: number): number {
  // Keep both current + previous bucket alive → 2 × window
  return Math.ceil((2 * windowMs) / 1000);
}

// ---------------------------------------------------------------------------
// Percent attribution book helpers
// ---------------------------------------------------------------------------

/** The book outlives the longest plan window: 2 × monthly, renewed on every write. */
const LEDGER_TTL_SECONDS = ttlSeconds(WINDOW_MS.monthly);

// Token write + hash TTL in one atomic call. KEYS[1] is the book's hash. ARGV holds the time
// field, the time, the token field, the tokens and the TTL in seconds.
const LEDGER_RECORD_TOKENS_SCRIPT = `
redis.call("HSET", KEYS[1], ARGV[1], ARGV[2])
redis.call("HINCRBYFLOAT", KEYS[1], ARGV[3], ARGV[4])
redis.call("EXPIRE", KEYS[1], ARGV[5])
return 1
`;

// Revision write + hash TTL in one atomic call. KEYS[1] is the book's hash. ARGV holds the
// revision field, the book as JSON and the TTL in seconds. Returns 1 when the field was stored.
const LEDGER_COMMIT_SCRIPT = `
local set = redis.call("HSETNX", KEYS[1], ARGV[1], ARGV[2])
if set == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[3])
end
return set
`;

function ledgerHashKey(poolId: string, connectionId: string): string {
  return `${KEY_PREFIX}-ledger:${poolId}:${connectionId}`;
}

function stateField(window: string, rev: number): string {
  return `s:${window}:${rev}`;
}

/** Revision → field name of every stored book of `window` in the hash. */
function stateRevisions(hash: Record<string, string>, window: string): Map<number, string> {
  const prefix = `s:${window}:`;
  const revisions = new Map<number, string>();
  for (const field of Object.keys(hash)) {
    if (!field.startsWith(prefix)) continue;
    const rev = Number(field.slice(prefix.length));
    if (Number.isSafeInteger(rev) && rev >= 1) revisions.set(rev, field);
  }
  return revisions;
}

/** The newest revision of `window` stored in the hash; a missing book counts as 0. */
function newestRevision(hash: Record<string, string>, window: string): number {
  return Math.max(0, ...stateRevisions(hash, window).keys());
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** A stored book as a fresh state, or null when the JSON is not a usable book. */
function parseStoredState(json: string, rev: number): LedgerState | null {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return null;
  }
  if (typeof raw !== "object" || raw === null) return null;
  const { last, baseline, resetAt, readAt, updatedAt, keys } = raw as Record<string, unknown>;
  if (!isFiniteNumber(last) || !isFiniteNumber(baseline)) return null;
  if (!isFiniteNumber(readAt) || !isFiniteNumber(updatedAt)) return null;
  const reset = isFiniteNumber(resetAt) ? resetAt : null;
  if (resetAt !== null && reset === null) return null;
  return { rev, last, baseline, resetAt: reset, readAt, updatedAt, keys: storedLedgerKeys(keys) };
}

/**
 * The newest usable book of `window`, and the fields to remove: every older revision, and any
 * newer field that does not hold a usable book (never written by ledgerCommit).
 */
function latestState(
  hash: Record<string, string>,
  window: string
): { state: LedgerState | null; obsolete: string[] } {
  const revisions = [...stateRevisions(hash, window)].sort(([a], [b]) => b - a);
  let state: LedgerState | null = null;
  const obsolete: string[] = [];
  for (const [rev, field] of revisions) {
    const parsed = state ? null : parseStoredState(hash[field], rev);
    if (parsed) state = parsed;
    else obsolete.push(field);
  }
  return { state, obsolete };
}

/** Every key counter of the hash; a counter without a write time reads its time as NaN. */
function readCounters(hash: Record<string, string>): Record<string, LedgerCounter> {
  const counters: Record<string, LedgerCounter> = {};
  for (const [field, value] of Object.entries(hash)) {
    if (!field.startsWith("t:")) continue;
    const apiKeyId = field.slice(2);
    counters[apiKeyId] = { tokens: Number(value), updatedAt: Number(hash[`u:${apiKeyId}`]) };
  }
  return counters;
}

// ---------------------------------------------------------------------------
// Sliding window helpers
// ---------------------------------------------------------------------------

function slidingWindowEffective(
  curr: number,
  prev: number,
  nowMs: number,
  windowMs: number
): number {
  const currentBucketIndex = Math.floor(nowMs / windowMs);
  const currentBucketStartMs = currentBucketIndex * windowMs;
  const elapsed = nowMs - currentBucketStartMs;
  const weight = 1 - elapsed / windowMs;
  return prev * weight + curr;
}

// ---------------------------------------------------------------------------
// RedisQuotaStore
// ---------------------------------------------------------------------------

export class RedisQuotaStore implements QuotaStore {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  private async client(): Promise<RedisLike> {
    return getRedisClient(this.url);
  }

  /**
   * Increment consumption by `cost` and refresh TTL in one atomic Lua call.
   * Returns the new sliding-window effective value.
   */
  async consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const client = await this.client();
    const currKey = bucketKey(apiKeyId, dimKey, currentBucket);
    const prevKey = bucketKey(apiKeyId, dimKey, currentBucket - 1);
    const ttl = ttlSeconds(windowMs);

    const [newCurrStr, prevStr] = (await client.eval(
      CONSUME_SCRIPT,
      2,
      currKey,
      prevKey,
      cost,
      ttl
    )) as [string, string];
    const newCurr = parseFloat(newCurrStr) || 0;
    const prev = parseFloat(prevStr ?? "0") || 0;

    return slidingWindowEffective(newCurr, prev, nowMs, windowMs);
  }

  /**
   * Read the sliding-window effective value without modification.
   */
  async peek(apiKeyId: string, dim: DimensionKey): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const client = await this.client();
    const currKey = bucketKey(apiKeyId, dimKey, currentBucket);
    const prevKey = bucketKey(apiKeyId, dimKey, currentBucket - 1);

    const [currStr, prevStr] = await client.mget(currKey, prevKey);
    const curr = parseFloat(currStr ?? "0") || 0;
    const prev = parseFloat(prevStr ?? "0") || 0;

    return slidingWindowEffective(curr, prev, nowMs, windowMs);
  }

  /**
   * Return the real pool-wide consumption for a dimension in the current
   * sliding window, summed across ALL apiKeyIds in the pool's allocations.
   *
   * Strategy: pool/allocation metadata lives in SQLite (F2), so we fetch the
   * allocation list for the pool, then issue a single MGET for all
   * (apiKeyId, curr-bucket) and (apiKeyId, prev-bucket) keys. The Redis keys
   * are per-key counters — there is no pool-level aggregate key — so we read
   * each key's two buckets and sum the raw values before applying the
   * sliding-window formula once on the totals.
   *
   * If the pool does not exist or has no allocations, returns 0.
   * Keys absent in Redis are treated as 0 (MGET returns null).
   */
  async poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number> {
    const pool = getPool(poolId);
    if (!pool || pool.allocations.length === 0) return 0;

    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);
    const prevBucket = currentBucket - 1;

    const client = await this.client();

    // Build [currKey0, prevKey0, currKey1, prevKey1, ...] for all allocated keys
    const redisKeys: string[] = [];
    for (const alloc of pool.allocations) {
      redisKeys.push(bucketKey(alloc.apiKeyId, dimKey, currentBucket));
      redisKeys.push(bucketKey(alloc.apiKeyId, dimKey, prevBucket));
    }

    const values = await client.mget(...redisKeys);

    let currTotal = 0;
    let prevTotal = 0;
    for (let i = 0; i < values.length; i += 2) {
      currTotal += parseFloat(values[i] ?? "0") || 0;
      prevTotal += parseFloat(values[i + 1] ?? "0") || 0;
    }

    return slidingWindowEffective(currTotal, prevTotal, nowMs, windowMs);
  }

  /**
   * Aggregate pool usage. Pool and allocation metadata come from SQLite (F2);
   * rolling counters come from Redis.
   */
  async poolUsage(poolId: string): Promise<PoolUsageSnapshot> {
    const nowMs = Date.now();
    const pool = getPool(poolId);

    if (!pool) {
      return {
        poolId,
        generatedAt: new Date(nowMs).toISOString(),
        dimensions: [],
      };
    }

    // Pool dimensions are not directly available here (they come from plan
    // resolver). Return empty for now — REST routes (F8) call poolUsageWithDimensions.
    return {
      poolId,
      generatedAt: new Date(nowMs).toISOString(),
      dimensions: [],
    };
  }

  /**
   * Build a PoolUsageSnapshot with explicit plan dimensions.
   * Mirrors SqliteQuotaStore.poolUsageWithDimensions().
   */
  async poolUsageWithDimensions(
    poolId: string,
    planDimensions: Array<{ unit: string; window: string; limit: number }>
  ): Promise<PoolUsageSnapshot> {
    const nowMs = Date.now();
    const pool = getPool(poolId);

    if (!pool) {
      return {
        poolId,
        generatedAt: new Date(nowMs).toISOString(),
        dimensions: [],
      };
    }

    return buildPoolUsageSnapshot(
      poolId,
      pool.allocations,
      planDimensions,
      (key, dim) => this.peek(key, dim),
      nowMs
    );
  }

  /**
   * Clear both current and previous bucket counters. Test-only.
   */
  async clear(apiKeyId: string, dim: DimensionKey): Promise<void> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const client = await this.client();
    const currKey = bucketKey(apiKeyId, dimKey, currentBucket);
    const prevKey = bucketKey(apiKeyId, dimKey, currentBucket - 1);

    await client.del(currKey, prevKey);
  }

  /**
   * One script: HSET of the write time, HINCRBYFLOAT of the tokens, then EXPIRE of the hash. The
   * time goes in before the tokens, so new tokens never carry an expired time.
   */
  async ledgerRecordTokens(
    poolId: string,
    connectionId: string,
    apiKeyId: string,
    tokens: number,
    nowMs: number
  ): Promise<void> {
    if (!Number.isFinite(tokens) || tokens <= 0) return;
    const client = await this.client();
    const hashKey = ledgerHashKey(poolId, connectionId);
    await client.eval(
      LEDGER_RECORD_TOKENS_SCRIPT,
      1,
      hashKey,
      `u:${apiKeyId}`,
      String(nowMs),
      `t:${apiKeyId}`,
      tokens,
      LEDGER_TTL_SECONDS
    );
  }

  /** One HGETALL; obsolete revisions of the window are removed without waiting. */
  async ledgerRead(key: LedgerKey): Promise<LedgerSnapshot> {
    const client = await this.client();
    const hashKey = ledgerHashKey(key.poolId, key.connectionId);
    const hash = (await client.hgetall(hashKey)) ?? {};
    const { state, obsolete } = latestState(hash, key.window);
    if (obsolete.length > 0) {
      // Best effort: a field left behind is removed by a later read.
      client.hdel(hashKey, ...obsolete).catch(() => undefined);
    }
    return { state, counters: readCounters(hash) };
  }

  /**
   * Compare (the newest stored revision is next.rev - 1), set (HSETNX of the field of next.rev),
   * confirm (the newest stored revision is next.rev). The newest field is never removed, so a
   * field of next.rev that another writer stored and that was removed after a newer revision
   * superseded it cannot be won a second time: the confirmation sees the newer revision. The set
   * and the hash TTL run in one script, so a stored field always has an expiry.
   */
  async ledgerCommit(key: LedgerKey, next: LedgerState): Promise<boolean> {
    if (!isStorableLedgerState(next)) return false;
    const client = await this.client();
    const hashKey = ledgerHashKey(key.poolId, key.connectionId);
    const newest = async () => newestRevision((await client.hgetall(hashKey)) ?? {}, key.window);
    if ((await newest()) !== next.rev - 1) return false;
    const set = await client.eval(
      LEDGER_COMMIT_SCRIPT,
      1,
      hashKey,
      stateField(key.window, next.rev),
      JSON.stringify(next),
      LEDGER_TTL_SECONDS
    );
    if (Number(set) !== 1 || (await newest()) !== next.rev) return false;
    if (next.rev > 1) {
      client.hdel(hashKey, stateField(key.window, next.rev - 1)).catch(() => undefined);
    }
    return true;
  }
}

// Singleton per URL
let _storeInstance: RedisQuotaStore | null = null;
let _storeUrl: string | null = null;

export function getRedisQuotaStore(url: string): RedisQuotaStore {
  if (!_storeInstance || _storeUrl !== url) {
    _storeInstance = new RedisQuotaStore(url);
    _storeUrl = url;
  }
  return _storeInstance;
}

export function resetRedisQuotaStore(): void {
  _storeInstance = null;
  _storeUrl = null;
}
