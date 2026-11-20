/**
 * percentAttribution.ts — per-key attribution for percent-plan dimensions.
 *
 * Percent plans (Claude, Codex, Bailian) only report how full the whole
 * account is. To give each pool member a share of that number, the tokens
 * every key routes are recorded in a per-key shadow bucket
 * (`<poolId>:percent-proxy`, unit `tokens`, same window), and the account
 * consumption is split in two:
 *
 *   - internal: the part the routed tokens can explain, shared by token volume;
 *   - external: the rest (usage made outside this proxy). It first uses the
 *     capacity no allocation claims, and only the excess is shared by weight.
 */

import type { DimensionKey, QuotaWindow } from "./dimensions";
import { getSaturation } from "./saturationSignals";
import type { QuotaStore, RecordConsumptionInput } from "./types";

/** Floor: tokens needed to explain one unit (one percent point) of the dimension. */
export const DEFAULT_MIN_TOKENS_PER_PCT = 1000;

const PROXY_SUFFIX = ":percent-proxy";

/** Shadow bucket that holds the tokens each key routed for a percent dimension. */
export function percentProxyDimKey(dim: DimensionKey): DimensionKey {
  return { poolId: `${dim.poolId}${PROXY_SUFFIX}`, unit: "tokens", window: dim.window };
}

export interface SplitAccountPercentInput {
  /** Shadow-bucket tokens per member, in allocation order. */
  perKeyTokens: number[];
  /** Account consumption, in the dimension's units. */
  accountConsumed: number;
  /** Effective limit of the dimension. */
  limit: number;
  /** Same order as perKeyTokens; absent, empty or all-zero → 100/n each. */
  weights?: number[];
  /** Pool token total read from the store; defaults to (and is floored at) Σ perKeyTokens. */
  poolTokens?: number;
  /** Defaults to DEFAULT_MIN_TOKENS_PER_PCT. */
  minTokensPerPct?: number;
}

/** perKey = internal part + external charge; perKeyInternal = only each member's internal part. */
export interface SplitAccountPercentResult {
  perKey: number[];
  perKeyInternal: number[];
  internal: number;
  external: number;
  externalCharged: number;
}

/** Non-finite or non-positive values count as 0. */
function positiveOrZero(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function resolveWeights(n: number, weights: number[] | undefined): number[] {
  const sanitized = Array.from({ length: n }, (_, i) => positiveOrZero(weights?.[i]));
  const total = sanitized.reduce((a, b) => a + b, 0);
  return total > 0 ? sanitized : sanitized.map(() => 100 / n);
}

export function splitAccountPercent(input: SplitAccountPercentInput): SplitAccountPercentResult {
  const tokens = input.perKeyTokens.map(positiveOrZero);
  const n = tokens.length;
  const sumTokens = tokens.reduce((a, b) => a + b, 0);
  const poolTokens = Math.max(positiveOrZero(input.poolTokens), sumTokens);
  const weights = resolveWeights(n, input.weights);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const accountConsumed = positiveOrZero(input.accountConsumed);
  const limit = positiveOrZero(input.limit);
  const minTokensPerPct = positiveOrZero(input.minTokensPerPct) || DEFAULT_MIN_TOKENS_PER_PCT;

  const internal = Math.min(accountConsumed, poolTokens / minTokensPerPct);
  const external = accountConsumed - internal;
  const unallocated = (Math.max(0, 100 - totalWeight) / 100) * limit;
  const externalCharged = Math.max(0, external - unallocated);

  const perKeyInternal = tokens.map((t) => (poolTokens > 0 ? (internal * t) / poolTokens : 0));
  const perKey = perKeyInternal.map(
    (part, i) => part + (totalWeight > 0 ? (externalCharged * weights[i]) / totalWeight : 0)
  );
  return { perKey, perKeyInternal, internal, external, externalCharged };
}

// ---------------------------------------------------------------------------
// Store-facing wrapper
// ---------------------------------------------------------------------------

export type PercentAttributionStore = Pick<QuotaStore, "peek" | "poolConsumedTotal">;

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
  minTokensPerPct?: number;
}

export interface PercentAttribution {
  globalUsedPercent: number;
  limit: number;
  accountConsumed: number;
  internal: number;
  external: number;
  externalCharged: number;
  /** Only the requested keys that belong to the pool. */
  consumedByKey: Record<string, number>;
  /** Same keys; only the internal part (the base of the absolute cap). */
  internalByKey: Record<string, number>;
}

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

/**
 * Read the shadow tokens of the requested keys and the pool token total in a
 * single batch. Any rejected read zeroes the whole batch, so the split falls
 * back to external-only (weight) attribution for this call.
 */
async function readShadowTokens(
  store: PercentAttributionStore,
  poolId: string,
  proxyKey: DimensionKey,
  requestedKeys: string[]
): Promise<{ tokensByKey: Map<string, number>; poolTokens: number }> {
  try {
    const [perKey, poolTokens] = await Promise.all([
      Promise.all(requestedKeys.map((k) => store.peek(k, proxyKey))),
      store.poolConsumedTotal(poolId, proxyKey),
    ]);
    return { tokensByKey: new Map(requestedKeys.map((k, i) => [k, perKey[i]])), poolTokens };
  } catch {
    // Fail-open, silently: this runs on every request, and a store outage
    // would otherwise log once per call. No tokens → external-only split.
    return { tokensByKey: new Map(), poolTokens: 0 };
  }
}

/**
 * Attribute a percent dimension of one account across the pool's keys. Never
 * throws: a failed saturation signal reads as 0 and a failed store read as no
 * tokens.
 */
export async function attributePercentDimension(
  input: AttributePercentDimensionInput
): Promise<PercentAttribution> {
  const { store, pool, dimension } = input;
  const proxyKey = percentProxyDimKey({
    poolId: pool.id,
    unit: "percent",
    window: dimension.window,
  });
  const wanted = new Set(input.apiKeyIds ?? pool.allocations.map((a) => a.apiKeyId));
  const requested = pool.allocations.filter((a) => wanted.has(a.apiKeyId)).map((a) => a.apiKeyId);

  const [globalUsedPercent, shadow] = await Promise.all([
    readAccountSaturation(input.connectionId, input.provider, dimension.window),
    readShadowTokens(store, pool.id, proxyKey, requested),
  ]);
  const limit = positiveOrZero(dimension.limit);
  const accountConsumed = globalUsedPercent * limit;

  const split = splitAccountPercent({
    perKeyTokens: pool.allocations.map((a) => shadow.tokensByKey.get(a.apiKeyId) ?? 0),
    weights: pool.allocations.map((a) => a.weight),
    accountConsumed,
    limit,
    poolTokens: shadow.poolTokens,
    minTokensPerPct: input.minTokensPerPct,
  });

  const consumedByKey: Record<string, number> = {};
  const internalByKey: Record<string, number> = {};
  pool.allocations.forEach((a, i) => {
    if (!wanted.has(a.apiKeyId)) return;
    consumedByKey[a.apiKeyId] = split.perKey[i];
    internalByKey[a.apiKeyId] = split.perKeyInternal[i];
  });

  return {
    globalUsedPercent,
    limit,
    accountConsumed,
    internal: split.internal,
    external: split.external,
    externalCharged: split.externalCharged,
    consumedByKey,
    internalByKey,
  };
}

/**
 * Record the tokens a request routed into the key's shadow bucket for a
 * percent dimension. Costs without usable tokens write nothing; store errors
 * are swallowed (attribution never blocks the request path).
 */
export async function recordPercentProxy(
  store: Pick<QuotaStore, "consume">,
  apiKeyId: string,
  dimKey: DimensionKey,
  cost: RecordConsumptionInput["cost"]
): Promise<void> {
  const tokens = positiveOrZero(cost?.tokens);
  if (tokens === 0) return;
  try {
    await store.consume(apiKeyId, percentProxyDimKey(dimKey), tokens);
  } catch {
    // Fail-open, silently: a missed shadow write only under-attributes this
    // request, and logging it per request would flood the log during an outage.
  }
}
