// Node converts delays above this signed 32-bit limit to 1ms instead of capping them.
const MAX_TIMER_DELAY_MS = 2147483647;

export interface SemanticCachePruneConfig {
  intervalMs: number;
  batchSize: number;
  maxBatches: number;
  maxRows: number;
}

/** Empty, non-finite and negative values use defaults; row/batch counts are integers. */
export function getSemanticCachePruneConfig(
  env: NodeJS.ProcessEnv = process.env
): SemanticCachePruneConfig {
  const number = (raw: string | undefined, fallback: number) => {
    const value = raw?.trim() ? Number(raw) : Number.NaN;
    return Number.isFinite(value) && value >= 0 ? value : fallback;
  };
  const interval = number(env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS, 1800000);
  return {
    intervalMs:
      interval === 0 || interval >= 60000
        ? Math.min(MAX_TIMER_DELAY_MS, Math.floor(interval))
        : 1800000,
    batchSize: Math.max(
      100,
      Math.min(50000, Math.floor(number(env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_BATCH_SIZE, 2000)))
    ),
    maxBatches: Math.max(
      1,
      Math.min(10000, Math.floor(number(env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_MAX_BATCHES, 50)))
    ),
    maxRows: Math.min(
      Number.MAX_SAFE_INTEGER,
      Math.floor(number(env.OMNIROUTE_SEMANTIC_CACHE_MAX_ROWS, 0))
    ),
  };
}
