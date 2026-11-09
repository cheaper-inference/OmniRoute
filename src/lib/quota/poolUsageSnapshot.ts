import { WINDOW_MS, type DimensionKey } from "./dimensions";
import type { PoolUsageSnapshot, QuotaStore } from "./types";
import { computeBurnRateFromWindow } from "./burnRate";

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
