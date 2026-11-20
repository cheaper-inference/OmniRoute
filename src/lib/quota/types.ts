import type { DimensionKey, Policy, QuotaDimension, QuotaWindow } from "./dimensions";

export interface PoolUsagePerKey {
  apiKeyId: string;
  consumed: number;
  fairShare: number;
  deficit: number;
  borrowing: boolean;
}

/** Percent dimensions: the attribution on one pool connection (account). */
export interface PoolUsageAccount {
  connectionId: string;
  globalUsedPercent: number;
  consumedTotal: number;
  internal: number;
  external: number;
  externalCharged: number;
  perKey: PoolUsagePerKey[];
}

export interface PoolUsageSnapshot {
  poolId: string;
  generatedAt: string;
  dimensions: Array<{
    unit: QuotaDimension["unit"];
    window: QuotaDimension["window"];
    limit: number;
    consumedTotal: number;
    perKey: PoolUsagePerKey[];
    /** Present for percent dimensions: one entry per pool connection. */
    accounts?: PoolUsageAccount[];
  }>;
  burnRate?: {
    tokensPerSecond: number;
    timeToExhaustionMs: number | null;
  };
}

export interface ConsumeResult {
  effective: number;
  limit: number;
  fairShare: number;
  allowed: boolean;
  policyApplied: Policy;
  reason: "ok" | "fair-share" | "cap-absolute" | "global-saturated";
}

export interface QuotaStore {
  consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number>;
  peek(apiKeyId: string, dim: DimensionKey): Promise<number>;
  /**
   * Return the real pool-wide consumption for a dimension in the current
   * sliding window — i.e. the sum of each key's effective consumption across
   * ALL apiKeyIds that have contributed to (poolId, unit, window).
   *
   * Unlike the per-key saturation signal (which can be 0 for countable units
   * whose hard-cap has never been set), this reflects actual spent units so
   * the enforce path can block when the pool total hits the plan limit.
   */
  poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number>;
  poolUsage(poolId: string): Promise<PoolUsageSnapshot>;
  /**
   * Build a PoolUsageSnapshot with explicit plan dimensions. This is the
   * primary method for dashboard / REST usage — it resolves per-key
   * consumption, fair-share, deficit, borrowing, and burn-rate from the
   * plan's dimension list.
   *
   * The parameterless `poolUsage()` is kept for backward compatibility but
   * returns minimal data (no plan context). Prefer this method when plan
   * dimensions are available.
   */
  poolUsageWithDimensions(
    poolId: string,
    planDimensions: Array<{ unit: string; window: string; limit: number }>
  ): Promise<PoolUsageSnapshot>;
  clear(apiKeyId: string, dim: DimensionKey): Promise<void>;
  /**
   * Add routed tokens to the key's cumulative counter on one pool connection. Never reads.
   * An amount that is not a finite number above zero changes nothing.
   */
  ledgerRecordTokens(
    poolId: string,
    connectionId: string,
    apiKeyId: string,
    tokens: number,
    nowMs: number
  ): Promise<void>;
  /** One consistent snapshot of the book of (pool, connection, window) and the counters of that pool connection. */
  ledgerRead(key: LedgerKey): Promise<LedgerSnapshot>;
  /**
   * Compare-and-set on the revision: stores `next` only when the stored book is at revision
   * next.rev - 1 (a missing book counts as 0). False when another writer already stored next.rev,
   * when the stored book is at another revision, or when `next` is not storable (a number that is
   * not finite, a negative baseline, or a key entry whose mark is not a finite number >= 0).
   * On the Redis store `false` does not guarantee that `next` was not stored: a commit can win its
   * revision and still answer `false` when another writer stores the next revision on top of it
   * before the confirmation. Callers must re-read the book rather than assume `next` is absent.
   */
  ledgerCommit(key: LedgerKey, next: LedgerState): Promise<boolean>;
}

export interface EnforceInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  /**
   * Optional model identifier. When present, `enforceQuotaShare` checks for a
   * per-(key, model) cap row in `quota_allocation_model_caps` and blocks only
   * this model if the cap is reached (Fase 3 #7). Fully backward-compatible:
   * callers that do not pass `model` receive unchanged behaviour.
   */
  model?: string;
  estimatedCost?: { tokens?: number; usd?: number; requests?: number };
}

export type EnforceDecision =
  | { kind: "allow"; deprioritize?: boolean }
  | { kind: "block"; reason: string; httpStatus: 429; retryAfterSeconds?: number };

export interface RecordConsumptionInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  /**
   * Optional model identifier. When present, `recordConsumption` also
   * increments the per-(key, model) consumption bucket used by the model-cap
   * pre-check in `enforceQuotaShare` (Fase 3 #7). Backward-compatible.
   */
  model?: string;
  cost: { tokens?: number; usd?: number; requests?: number };
}

/** A provider plan-window figure fit to drive the attribution book. */
export interface PlanWindowReading {
  /** Account usage of the plan window, 0..1. */
  used: number;
  /** Provider reset of the window, epoch ms; null when the provider sent none. */
  resetAt: number | null;
  /**
   * When the provider produced the figure, as far as this process can tell, epoch ms:
   * the observation time of figures served from response headers, the usage endpoint
   * read time otherwise, and the moment the cached saturation entry was built when
   * neither is known. Never later than that moment.
   */
  fetchedAt: number;
}

/** One attribution book: a pool connection (account) and one plan window. */
export interface LedgerKey {
  poolId: string;
  connectionId: string;
  window: QuotaWindow;
}

export interface LedgerKeyState {
  /** This key's token counter when the book opened or last turned (its mark). */
  startTokens: number;
}

export interface LedgerState {
  /** 1 on the first write; every write stores the previous rev + 1. */
  rev: number;
  /** Last applied reading, 0..1. */
  last: number;
  /** The reading when the book opened or last turned, 0..1. */
  baseline: number;
  /** Provider reset of the last applied reading that carried one, epoch ms. */
  resetAt: number | null;
  /** fetchedAt of the last applied reading, epoch ms. */
  readAt: number;
  /** When this state was produced, epoch ms. */
  updatedAt: number;
  /** API key id → that key's state. */
  keys: Record<string, LedgerKeyState>;
}

/** Cumulative tokens routed by one API key, and the time of its last write. */
export interface LedgerCounter {
  tokens: number;
  /** Time of the last write, epoch ms. */
  updatedAt: number;
}

export interface LedgerSnapshot {
  state: LedgerState | null;
  counters: Record<string, LedgerCounter>;
}
