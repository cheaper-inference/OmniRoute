/**
 * Gateway-measured generation throughput (#12616).
 *
 * tok/s MUST exclude TTFT. `output_tokens / total_latency` includes queueing and
 * first-token wait and is not generation speed. When TTFT is unknown (typical
 * non-streaming JSON), omit the field rather than guessing.
 *
 * A rate is also omitted when it cannot be a real measurement:
 *   - generation windows shorter than MIN_GENERATION_WINDOW_MS are dominated by
 *     overhead/jitter (a response that arrives in one burst leaves a ~1 ms window
 *     after TTFT and turns into hundreds of thousands of tok/s);
 *   - rates above MAX_PLAUSIBLE_TOKENS_PER_SECOND are buffered responses dumped in
 *     a few frames, not decode speed. The ceiling sits above the fastest public
 *     inference rates (order of 2,000-3,000 tok/s) so genuinely fast providers keep
 *     their samples, and below those dumps (2,000 tokens in 300 ms ~ 6,700 tok/s).
 */

/** Generation windows shorter than this produce no tok/s sample. */
export const MIN_GENERATION_WINDOW_MS = 250;

/** Rates above this are treated as measurement artifacts and produce no tok/s sample. */
export const MAX_PLAUSIBLE_TOKENS_PER_SECOND = 5000;

export function generationDurationMs(
  totalMs: number,
  ttftMs: number | null | undefined
): number | null {
  if (!Number.isFinite(totalMs) || totalMs <= 0) return null;
  if (ttftMs == null || !Number.isFinite(ttftMs) || ttftMs < 0) return null;
  const generationMs = totalMs - ttftMs;
  return generationMs > 0 ? generationMs : null;
}

export function tokensPerSecond(
  outputTokens: number,
  generationMs: number | null | undefined
): number | null {
  if (generationMs == null || !Number.isFinite(generationMs) || generationMs <= 0) return null;
  if (generationMs < MIN_GENERATION_WINDOW_MS) return null;
  if (!Number.isFinite(outputTokens) || outputTokens <= 0) return null;
  const rate = outputTokens / (generationMs / 1000);
  return rate > MAX_PLAUSIBLE_TOKENS_PER_SECOND ? null : rate;
}

function outputTokenCount(usage: Record<string, unknown>): number {
  const raw =
    usage.completion_tokens ??
    usage.output_tokens ??
    usage.candidatesTokenCount ??
    usage.outputTokens ??
    usage.completionTokens;
  const n = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : 0;
}

/** Attach `tokens_per_second` when generation duration (excluding TTFT) is known. */
export function attachTokensPerSecond<T>(usage: T, generationMs: number | null | undefined): T {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return usage;
  const tps = tokensPerSecond(outputTokenCount(usage as Record<string, unknown>), generationMs);
  if (tps == null) return usage;
  return { ...(usage as Record<string, unknown>), tokens_per_second: Number(tps.toFixed(3)) } as T;
}
