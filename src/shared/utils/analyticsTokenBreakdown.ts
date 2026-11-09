export interface AnalyticsTokenSummary {
  totalRequests?: number | null;
  /** Normalized inclusive input, including cache reads and cache writes. */
  promptTokens?: number | null;
  completionTokens?: number | null;
  /** Provider-reported cache reads, never cache writes or response-cache hits. */
  cachedInputTokens?: number | null;
  cachedInputTokensComplete?: boolean;
}

function tokenCount(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

/** Presentation only: never change the provider usage or billing counters. */
export function getAnalyticsTokenBreakdown(summary: AnalyticsTokenSummary) {
  const totalInputTokens = tokenCount(summary.promptTokens);
  const outputTokens = tokenCount(summary.completionTokens);
  const cachedInputTokens = tokenCount(summary.cachedInputTokens);
  const cacheComplete = cachedInputTokens !== null && summary.cachedInputTokensComplete === true;
  // An incomplete cache subtotal cannot be subtracted to claim an exact fresh-input total.
  // Reject inconsistent values rather than clamping a negative result to a fabricated zero.
  const inputTokens =
    cacheComplete && totalInputTokens !== null && cachedInputTokens <= totalInputTokens
      ? totalInputTokens - cachedInputTokens
      : null;
  return {
    totalTokens:
      totalInputTokens !== null && outputTokens !== null
        ? tokenCount(totalInputTokens + outputTokens)
        : null,
    totalInputTokens,
    inputTokens,
    cachedInputTokens,
    outputTokens,
    cacheComplete,
  };
}
