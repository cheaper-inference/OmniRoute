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

import type { DimensionKey } from "./dimensions";

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
