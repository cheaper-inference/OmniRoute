/**
 * accountFallback/concurrencyLimit429.ts — a 429 that reports a CONCURRENCY
 * limit ("too many concurrent requests") is contention, not a rate-limit lock.
 *
 * The account is healthy, only busy with other in-flight requests. Failing over
 * to a sibling connection right away is cheaper than sleeping on it, and
 * climbing the exponential backoff ladder (`base * 2 ** level`) would let a
 * burst of parallel requests push the whole pool into long cooldowns.
 *
 * So the verdict is: fail over now, short fixed cooldown (or the upstream's own
 * retry hint), backoff level untouched, no provider-breaker failure.
 */
import { looksLikeConcurrencyLimit } from "../quotaResetParsing.ts";

/** Short fixed cooldown applied when the upstream gives no retry hint. */
export const CONCURRENCY_LIMIT_COOLDOWN_MS = 1_000;

export const CONCURRENCY_LIMITED_REASON = "concurrency_limited";

type RetryHint = { retryAfterMs: number; provenance: "header" | "google_rpc_retry_info" | "body" };

export function buildConcurrencyLimitFallback(
  status: number,
  errorText: string,
  getRetryHint: () => RetryHint | null
) {
  if (status !== 429 || !looksLikeConcurrencyLimit(errorText)) return null;
  const hint = getRetryHint();
  const usedHint = !!hint && hint.retryAfterMs > 0;
  const cooldownMs = usedHint ? hint.retryAfterMs : CONCURRENCY_LIMIT_COOLDOWN_MS;
  return {
    shouldFallback: true,
    cooldownMs,
    baseCooldownMs: cooldownMs,
    usedUpstreamRetryHint: usedHint,
    ...(usedHint ? { retryHintSource: hint.provenance } : {}),
    reason: CONCURRENCY_LIMITED_REASON,
    // newBackoffLevel deliberately omitted: callers keep the current level.
    skipProviderBreaker: true,
  };
}
