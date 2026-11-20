import { WINDOW_MS, type DimensionKey } from "./dimensions";
import type { PoolUsageAccount, PoolUsagePerKey, PoolUsageSnapshot, QuotaStore } from "./types";
import { computeBurnRateFromWindow } from "./burnRate";
import { attributePercentDimension, type PercentAttributionStore } from "./percentAttribution";

/** Shared snapshot arithmetic; counter reads remain with each storage backend. */
export async function buildPoolUsageSnapshot(
  poolId: string,
  allocations: Array<{ apiKeyId: string; weight: number }>,
  planDimensions: Array<{ unit: string; window: string; limit: number }>,
  peek: QuotaStore["peek"],
  nowMs: number
): Promise<PoolUsageSnapshot> {
  const totalWeight = allocations.reduce((sum, a) => sum + a.weight, 0);

  const dimensionSnapshots: PoolUsageSnapshot["dimensions"] = [];

  for (const planDim of planDimensions) {
    const windowMs = WINDOW_MS[planDim.window as keyof typeof WINDOW_MS];
    if (!windowMs) continue;

    let consumedTotal = 0;
    const perKey: PoolUsageSnapshot["dimensions"][number]["perKey"] = [];

    for (const alloc of allocations) {
      const dim: DimensionKey = {
        poolId,
        unit: planDim.unit as DimensionKey["unit"],
        window: planDim.window as DimensionKey["window"],
      };
      const consumed = await peek(alloc.apiKeyId, dim);
      consumedTotal += consumed;

      // Equal-split fallback, matching enforce.ts: when every allocation in the
      // pool has weight 0, each counts as an equal share, so the snapshot
      // describes the budget enforcement actually grants. The old ternary could
      // not do this -- totalWeight === 0 implies every alloc.weight is 0, so both
      // arms returned 0 -- and every key rendered as borrowing all it consumed.
      const effectiveWeight =
        totalWeight > 0 ? alloc.weight : allocations.length > 0 ? 100 / allocations.length : 0;
      const fairShare = (effectiveWeight / 100) * planDim.limit;
      const deficit = consumed - fairShare;
      const borrowing = consumed > fairShare;

      perKey.push({
        apiKeyId: alloc.apiKeyId,
        consumed,
        fairShare,
        deficit,
        borrowing,
      });
    }

    dimensionSnapshots.push({
      unit: planDim.unit as PoolUsageSnapshot["dimensions"][number]["unit"],
      window: planDim.window as PoolUsageSnapshot["dimensions"][number]["window"],
      limit: planDim.limit,
      consumedTotal,
      perKey,
    });
  }

  // Burn rate: derive from the sliding window (single-snapshot, no history needed).
  const tokenDim = dimensionSnapshots.find((d) => d.unit === "tokens");
  let burnRate: PoolUsageSnapshot["burnRate"];
  if (tokenDim && tokenDim.consumedTotal > 0) {
    const windowMs = WINDOW_MS[tokenDim.window as keyof typeof WINDOW_MS];
    const remaining = tokenDim.limit - tokenDim.consumedTotal;
    const rateResult = computeBurnRateFromWindow(tokenDim.consumedTotal, windowMs, remaining);
    burnRate = {
      tokensPerSecond: rateResult.tokensPerSecond,
      timeToExhaustionMs: rateResult.timeToExhaustionMs,
    };
  }

  return {
    poolId,
    generatedAt: new Date(nowMs).toISOString(),
    dimensions: dimensionSnapshots,
    burnRate,
  };
}

type SnapshotDimension = PoolUsageSnapshot["dimensions"][number];

interface PercentSnapshotPool {
  id: string;
  connectionId: string;
  connectionIds?: string[];
  allocations: Array<{ apiKeyId: string; weight: number }>;
}

/** One account's attribution of a percent dimension, reusing the snapshot's fair shares. */
async function attributeAccount(
  dim: SnapshotDimension,
  connectionId: string,
  pool: PercentSnapshotPool,
  provider: string,
  store: PercentAttributionStore
): Promise<PoolUsageAccount> {
  const attribution = await attributePercentDimension({
    store,
    pool,
    connectionId,
    provider,
    dimension: { window: dim.window, limit: dim.limit },
  });
  const perKey: PoolUsagePerKey[] = dim.perKey.map((entry) => {
    const consumed = attribution.consumedByKey[entry.apiKeyId] ?? 0;
    return {
      apiKeyId: entry.apiKeyId,
      consumed,
      fairShare: entry.fairShare,
      deficit: consumed - entry.fairShare,
      borrowing: consumed > entry.fairShare,
    };
  });
  return {
    connectionId,
    globalUsedPercent: attribution.globalUsedPercent,
    consumedTotal: attribution.accountConsumed,
    internal: attribution.internal,
    external: attribution.external,
    externalCharged: attribution.externalCharged,
    perKey,
  };
}

/**
 * Fill the percent dimensions of a usage snapshot with the per-key numbers the
 * quota-share gate uses. Each account keeps its own attribution book, so the
 * attributed number depends on the account serving the request: each percent
 * dimension gets one `accounts` entry per pool connection; its top-level
 * `consumedTotal` and `perKey` mirror the primary account (`accounts[0]`).
 * Other dimensions pass through untouched.
 *
 * Returns a new snapshot and never throws: the attribution itself fails open.
 * `snapshot` limits must already be the effective (summed) limits.
 */
export async function withPercentAttribution(
  snapshot: PoolUsageSnapshot,
  pool: PercentSnapshotPool,
  provider: string,
  store: PercentAttributionStore
): Promise<PoolUsageSnapshot> {
  const connectionIds =
    Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
      ? pool.connectionIds
      : [pool.connectionId];

  const dimensions = await Promise.all(
    snapshot.dimensions.map(async (dim): Promise<SnapshotDimension> => {
      if (dim.unit !== "percent") return dim;
      const accounts = await Promise.all(
        connectionIds.map((connectionId) =>
          attributeAccount(dim, connectionId, pool, provider, store)
        )
      );
      return {
        ...dim,
        consumedTotal: accounts[0].consumedTotal,
        perKey: accounts[0].perKey,
        accounts,
      };
    })
  );

  return { ...snapshot, dimensions };
}
