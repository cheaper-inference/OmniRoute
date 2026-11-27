/**
 * percentAttribution.ts — per-key attribution for percent-plan dimensions.
 *
 * Percent plans only report how full the whole account is. Each (pool,
 * connection, plan window) keeps an attribution book (percentLedger.ts)
 * aligned with the provider's window: the growth of that figure since the
 * window started is split between the keys by the tokens each one routed since
 * then, capped by what those tokens can explain, and the rest is external
 * (usage nobody routed through this pool). Every attribution applies the
 * current plan-window reading to the book, then reports:
 *
 *   - internal: the parts the book attributes to API keys;
 *   - external: the book's external part. It first uses the capacity no
 *     allocation claims, and only the excess is shared by weight.
 *
 * Only Claude (OAuth) and Codex have a plan-window reading. Any other provider
 * has no book: nothing is attributed.
 *
 * The floor (tokens that explain at most one percentage point of the account
 * figure) is QUOTA_PERCENT_MIN_TOKENS_PER_POINT, read on every attribution.
 */

import type { QuotaUnit, QuotaWindow } from "./dimensions";
import {
  DEFAULT_MIN_TOKENS_PER_PCT,
  attributeBook,
  observeLedger,
  previewLedger,
} from "./percentLedger";
import type { BookAttribution } from "./percentLedger";
import { getPlanWindowReading, getSaturation } from "./saturationSignals";
import type { PlanWindowReading, QuotaStore, RecordConsumptionInput } from "./types";

/** Non-finite or non-positive values count as 0. */
function positiveOrZero(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

/** Sanitized weights; when none is positive, every member counts as 100 / n. */
function resolveWeights(weights: number[]): number[] {
  const sanitized = weights.map(positiveOrZero);
  const total = sanitized.reduce((a, b) => a + b, 0);
  return total > 0 ? sanitized : sanitized.map(() => 100 / weights.length);
}

/**
 * External-usage rule: unallocated capacity first, the excess by normalized weight; all-zero
 * weights split equally. `external` and `limit` are in the dimension's units; `perKey` follows
 * the order of `weights`.
 */
export function splitExternalUsage(input: { external: number; limit: number; weights: number[] }): {
  externalCharged: number;
  perKey: number[];
} {
  const weights = resolveWeights(input.weights);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const unallocated = (Math.max(0, 100 - totalWeight) / 100) * positiveOrZero(input.limit);
  const externalCharged = Math.max(0, positiveOrZero(input.external) - unallocated);
  const perKey = weights.map((w) => (totalWeight > 0 ? (externalCharged * w) / totalWeight : 0));
  return { externalCharged, perKey };
}

// ---------------------------------------------------------------------------
// Store-facing wrapper
// ---------------------------------------------------------------------------

export type PercentAttributionStore = Pick<QuotaStore, "ledgerRead" | "ledgerCommit">;

export interface AttributePercentDimensionInput {
  store: PercentAttributionStore;
  pool: { id: string; allocations: Array<{ apiKeyId: string; weight: number }> };
  /** Account whose consumption is read. */
  connectionId: string;
  provider: string;
  /** limit = EFFECTIVE limit (per-account limit × number of accounts). */
  dimension: { window: QuotaWindow; limit: number };
  /** Defaults to every allocation of the pool. */
  apiKeyIds?: string[];
  /** Floor override; defaults to QUOTA_PERCENT_MIN_TOKENS_PER_POINT (else 1000). */
  minTokensPerPct?: number;
}

/** A book's parts scaled to a dimension limit, per key and in total. */
export interface BookShares {
  limit: number;
  /** Parts the book attributes to API keys (including keys that left the pool) × limit. */
  internal: number;
  /**
   * The book's external part × limit. The book stays at its last applied reading when there is
   * no usable one, so internal + external can differ from accountConsumed.
   */
  external: number;
  /** The part of `external` left once the unallocated capacity is used. */
  externalCharged: number;
  /** Only the requested keys that belong to the pool: internal part + external charge. */
  consumedByKey: Record<string, number>;
  /** Same keys; only the part the book attributes to the key (the base of the absolute cap). */
  internalByKey: Record<string, number>;
  /** Same keys; the key's charge for usage made outside the pool (consumed = internal + this). */
  externalByKey: Record<string, number>;
}

export type PercentAttribution = BookShares & {
  /** Account usage of the window, 0..1, as getSaturation reports it. */
  globalUsedPercent: number;
  /** globalUsedPercent × limit. */
  accountConsumed: number;
};

async function readAccountSaturation(
  connectionId: string,
  provider: string,
  window: QuotaWindow
): Promise<number> {
  try {
    const value = await getSaturation(connectionId, provider, { unit: "percent", window });
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

async function readPlanWindow(
  connectionId: string,
  provider: string,
  window: QuotaWindow
): Promise<PlanWindowReading | null> {
  try {
    return await getPlanWindowReading(connectionId, provider, { unit: "percent", window });
  } catch {
    return null;
  }
}

/**
 * The floor from QUOTA_PERCENT_MIN_TOKENS_PER_POINT, read on each call so a changed environment
 * applies without a restart. Anything but a finite number >= 1 is DEFAULT_MIN_TOKENS_PER_PCT.
 */
function resolveMinTokensPerPoint(): number {
  const value = Number(process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT); // unset → NaN, "" → 0
  return Number.isFinite(value) && value >= 1 ? value : DEFAULT_MIN_TOKENS_PER_PCT;
}

/**
 * Apply the reading to the book and split it from the same store read; null when there is no
 * usable book. Fail-open, silently.
 */
async function observeBook(
  input: AttributePercentDimensionInput,
  reading: PlanWindowReading | null
): Promise<BookAttribution | null> {
  try {
    const snapshot = await observeLedger(
      input.store,
      { poolId: input.pool.id, connectionId: input.connectionId, window: input.dimension.window },
      reading,
      Date.now()
    );
    return snapshot
      ? attributeBook(snapshot, input.minTokensPerPct ?? resolveMinTokensPerPoint())
      : null;
  } catch {
    return null;
  }
}

/**
 * Scale a book's parts to the dimension limit and split its external part by the pool's weights.
 * Pure. No book attributes nothing. `apiKeyIds` defaults to every allocation of the pool.
 */
function scaleBook(
  book: BookAttribution | null,
  pool: AttributePercentDimensionInput["pool"],
  dimensionLimit: number,
  apiKeyIds?: string[]
): BookShares {
  const limit = positiveOrZero(dimensionLimit);
  const internal = (book?.internal ?? 0) * limit;
  const external = (book?.external ?? 0) * limit;
  const split = splitExternalUsage({
    external,
    limit,
    weights: pool.allocations.map((a) => a.weight),
  });

  const wanted = new Set(apiKeyIds ?? pool.allocations.map((a) => a.apiKeyId));
  const consumedByKey: Record<string, number> = {};
  const internalByKey: Record<string, number> = {};
  const externalByKey: Record<string, number> = {};
  pool.allocations.forEach((a, i) => {
    if (!wanted.has(a.apiKeyId)) return;
    const own = (book?.internalByKey[a.apiKeyId] ?? 0) * limit;
    internalByKey[a.apiKeyId] = own;
    externalByKey[a.apiKeyId] = split.perKey[i];
    consumedByKey[a.apiKeyId] = own + split.perKey[i];
  });

  return {
    limit,
    internal,
    external,
    externalCharged: split.externalCharged,
    consumedByKey,
    internalByKey,
    externalByKey,
  };
}

/**
 * Attribute a percent dimension of one account across the pool's keys. Never
 * throws: a failed saturation signal reads as 0, a missing plan-window reading
 * leaves the book as it is, and a failed store read attributes nothing.
 */
export async function attributePercentDimension(
  input: AttributePercentDimensionInput
): Promise<PercentAttribution> {
  const { pool, dimension, connectionId, provider } = input;
  // Same cache entry: one provider read serves both.
  const [globalUsedPercent, reading] = await Promise.all([
    readAccountSaturation(connectionId, provider, dimension.window),
    readPlanWindow(connectionId, provider, dimension.window),
  ]);
  const book = await observeBook(input, reading);
  const shares = scaleBook(book, pool, dimension.limit, input.apiKeyIds);
  return {
    globalUsedPercent,
    accountConsumed: globalUsedPercent * shares.limit,
    ...shares,
  };
}

// ---------------------------------------------------------------------------
// Read-only preview
// ---------------------------------------------------------------------------

export interface PreviewPercentDimensionInput {
  store: Pick<QuotaStore, "ledgerRead">;
  pool: { id: string; allocations: Array<{ apiKeyId: string; weight: number }> };
  /** Account whose book is read. */
  connectionId: string;
  /** The limit the shares are scaled to. */
  dimension: { window: QuotaWindow; limit: number };
  /** A plan-window reading the caller already holds (never fetched here), or null. */
  reading: PlanWindowReading | null;
  nowMs: number;
  /** Defaults to every allocation of the pool. */
  apiKeyIds?: string[];
  /** Floor override; defaults to QUOTA_PERCENT_MIN_TOKENS_PER_POINT (else 1000). */
  minTokensPerPct?: number;
}

export type PercentDimensionPreview =
  { kind: "book"; confirmed: boolean; shares: BookShares } | { kind: "none" | "ended" | "failed" };

/**
 * The attribution the gate would compute from the same book and reading, without writing the
 * book's state and without reading the provider: one book read, the reading applied in memory,
 * the same split as attributePercentDimension. No book, an ended window and a failed read are
 * told apart instead of reading as zero. Never throws.
 */
export async function previewPercentDimension(
  input: PreviewPercentDimensionInput
): Promise<PercentDimensionPreview> {
  try {
    const key = {
      poolId: input.pool.id,
      connectionId: input.connectionId,
      window: input.dimension.window,
    };
    const found = await previewLedger(input.store, key, input.reading, input.nowMs);
    if (found.kind !== "book") return { kind: found.kind };
    const book = attributeBook(found.snapshot, input.minTokensPerPct ?? resolveMinTokensPerPoint());
    return {
      kind: "book",
      confirmed: found.confirmed,
      shares: scaleBook(book, input.pool, input.dimension.limit, input.apiKeyIds),
    };
  } catch {
    return { kind: "failed" };
  }
}

/**
 * Record the tokens a request routed on one pool connection, once per request,
 * for the attribution books of its percent dimensions. Costs without usable
 * tokens, and plans without a usable percent dimension, write nothing; store
 * errors are swallowed (attribution never blocks the request path).
 */
export async function recordPercentTokens(
  store: Pick<QuotaStore, "ledgerRecordTokens">,
  target: { poolId: string; connectionId: string; apiKeyId: string },
  dimensions: Array<{ unit: QuotaUnit; limit: number }>,
  cost: RecordConsumptionInput["cost"]
): Promise<void> {
  const tokens = positiveOrZero(cost?.tokens);
  if (tokens === 0) return;
  if (!dimensions.some((d) => d.unit === "percent" && d.limit > Number.EPSILON)) return;
  try {
    await store.ledgerRecordTokens(
      target.poolId,
      target.connectionId,
      target.apiKeyId,
      tokens,
      Date.now()
    );
  } catch {
    // Fail-open, silently: a missed write only under-attributes this request,
    // and logging it per request would flood the log during an outage.
  }
}
