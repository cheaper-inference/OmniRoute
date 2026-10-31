/**
 * Decorrelated / Full Jitter Backoff utilities.
 * Replaces fixed-delay retries to eliminate thundering herd.
 *
 * Based on AWS Architecture Blog: "Exponential Backoff and Jitter"
 * https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
 */

export interface JitterOptions {
  baseDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
}

/**
 * Full Jitter: Sleep = rand(0, min(maxDelay, base * factor^attempt))
 *
 * Distributes 100% of retries uniformly across the interval [0, capped_exponential_backoff].
 * Best for eliminating thundering herd when many clients retry simultaneously.
 */
export function calculateFullJitter(attempt: number, options: JitterOptions = {}): number {
  const base = options.baseDelayMs ?? 500;
  const max = options.maxDelayMs ?? 15_000;
  const factor = options.factor ?? 2;

  const exponentialDelay = Math.min(max, base * Math.pow(factor, attempt));
  return Math.floor(Math.random() * exponentialDelay);
}

/**
 * Decorrelated Jitter: Sleep = min(maxDelay, rand(baseDelay, previous_sleep * 3))
 *
 * Adapts the upper bound based on the previous sleep duration.
 * Better for distributed systems where retry timing should "decorrelate" from peers.
 */
export function calculateDecorrelatedJitter(
  previousSleepMs: number,
  options: JitterOptions = {}
): number {
  const base = options.baseDelayMs ?? 500;
  const max = options.maxDelayMs ?? 20_000;

  const ceiling = Math.max(base, previousSleepMs * 3);
  const calculated = base + Math.random() * (ceiling - base);
  return Math.floor(Math.min(max, calculated));
}

/**
 * Equal Jitter: Sleep = base/2 + rand(0, base/2) * factor^attempt
 *
 * Keeps the lower half of the interval fixed, randomizes the upper half.
 * Less aggressive spreading than full jitter.
 */
export function calculateEqualJitter(attempt: number, options: JitterOptions = {}): number {
  const base = options.baseDelayMs ?? 500;
  const max = options.maxDelayMs ?? 15_000;
  const factor = options.factor ?? 2;

  const exponentialDelay = Math.min(max, base * Math.pow(factor, attempt));
  return Math.floor(exponentialDelay / 2 + Math.random() * (exponentialDelay / 2));
}

/**
 * No Jitter (for testing or explicit opt-out): pure exponential backoff.
 */
export function calculateNoJitter(attempt: number, options: JitterOptions = {}): number {
  const base = options.baseDelayMs ?? 500;
  const max = options.maxDelayMs ?? 15_000;
  const factor = options.factor ?? 2;

  return Math.floor(Math.min(max, base * Math.pow(factor, attempt)));
}

/**
 * Factory to create a retry delay calculator with stateful decorrelated jitter.
 * Use when you need to track previous sleep across multiple retry attempts.
 */
export function createJitterCalculator(
  initialDelayMs: number,
  options: Omit<JitterOptions, "baseDelayMs"> = {}
) {
  let previousSleep = initialDelayMs;

  return {
    nextFullJitter: (attempt: number) =>
      calculateFullJitter(attempt, { ...options, baseDelayMs: initialDelayMs }),
    nextDecorrelatedJitter: () => {
      previousSleep = calculateDecorrelatedJitter(previousSleep, {
        ...options,
        baseDelayMs: initialDelayMs,
      });
      return previousSleep;
    },
    nextEqualJitter: (attempt: number) =>
      calculateEqualJitter(attempt, { ...options, baseDelayMs: initialDelayMs }),
    reset: () => {
      previousSleep = initialDelayMs;
    },
    getPreviousSleep: () => previousSleep,
  };
}
