/**
 * Full Jitter backoff for blind retries.
 *
 * Based on AWS Architecture Blog: "Exponential Backoff and Jitter"
 * https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
 *
 * Only use it for retries that have no known deadline. A wait derived from a
 * cooldown/lock expiry must NOT be jittered downwards, or the retry would fire
 * before the cooldown it was computed to cover has cleared.
 */

export interface JitterOptions {
  baseDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
  /** Injectable RNG in [0, 1), for deterministic tests. Defaults to Math.random. */
  random?: () => number;
}

/**
 * Full Jitter: Sleep = rand(0, min(maxDelay, base * factor^attempt))
 *
 * Distributes retries uniformly across [0, capped_exponential_backoff] to avoid a
 * thundering herd when many clients retry simultaneously.
 */
export function calculateFullJitter(attempt: number, options: JitterOptions = {}): number {
  const base = options.baseDelayMs ?? 500;
  const max = options.maxDelayMs ?? 15_000;
  const factor = options.factor ?? 2;
  const random = options.random ?? Math.random;

  const exponentialDelay = Math.min(max, base * Math.pow(factor, attempt));
  return Math.floor(random() * exponentialDelay);
}
