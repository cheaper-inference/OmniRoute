/**
 * percentProxy.ts — per-key attribution for `percent` quota dimensions (#19904).
 *
 * A `percent` dimension (Claude/Codex/Bailian subscriptions) has no local counter:
 * the upstream reports one account-wide utilisation figure, so nothing says which API
 * key consumed it. Without attribution every key looks like it consumed 0 and the
 * fair-share checks can never fire.
 *
 * Proxy: OmniRoute-routed token volume is recorded per key in a shadow bucket (its own
 * pool-id namespace, same window as the dimension, so it expires like any other counter).
 * At enforcement time a key's share of the pool's proxy total is applied to the
 * authoritative upstream figure:
 *
 *   consumedByThisKey = (keyTokens / poolTokens) * consumedTotal
 *
 * The upstream percentage stays the global signal. When there is no proxy data yet
 * (pool total 0) the caller keeps the previous behaviour (consumed = 0, fail-open).
 */

import type { DimensionKey } from "./dimensions";
import type { QuotaStore, RecordConsumptionInput } from "./types";

export function percentProxyBucketPoolId(poolId: string): string {
  return `${poolId}:percent-proxy`;
}

export function percentProxyDimKey(dim: DimensionKey): DimensionKey {
  return { poolId: percentProxyBucketPoolId(dim.poolId), unit: "tokens", window: dim.window };
}

/** Tokens attributed to a request for the proxy bucket (0 when unknown). */
export function percentProxyCost(cost: RecordConsumptionInput["cost"]): number {
  const tokens = cost.tokens ?? 0;
  return Number.isFinite(tokens) && tokens > 0 ? tokens : 0;
}

/**
 * This key's share of the pool-wide `percent` consumption, in the dimension's own
 * units. Returns 0 when no proxy data exists. Fail-open: store errors yield 0.
 */
export async function attributedPercentConsumed(
  store: QuotaStore,
  apiKeyId: string,
  dimKey: DimensionKey,
  consumedTotal: number
): Promise<number> {
  const proxyKey = percentProxyDimKey(dimKey);
  const [mine, total] = await Promise.all([
    store.peek(apiKeyId, proxyKey).catch(() => 0),
    store.poolConsumedTotal(proxyKey.poolId, proxyKey).catch(() => 0),
  ]);
  if (!(total > 0) || !(mine > 0)) return 0;
  return Math.min(1, mine / total) * consumedTotal;
}

/** Records this request's tokens in the shadow bucket. Fail-open (B29): store errors are swallowed. */
export async function recordPercentProxy(
  store: QuotaStore,
  apiKeyId: string,
  dimKey: DimensionKey,
  cost: RecordConsumptionInput["cost"]
): Promise<void> {
  const proxyCost = percentProxyCost(cost);
  if (proxyCost <= 0) return;
  await store.consume(apiKeyId, percentProxyDimKey(dimKey), proxyCost).catch(() => {
    // Fail-open per B29
  });
}
