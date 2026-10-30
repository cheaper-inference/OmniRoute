/**
 * Hit-stable debounce window for provider connection tests.
 *
 * A management-dashboard tab left open fires the batch connection-test loop
 * every ~300s around the clock: thousands of call_logs rows of noise per day,
 * and each real probe re-anchors upstream rate-limit/quota windows (some
 * validators without a free models endpoint even issue a real billed request).
 * A per-connection result cache keyed by completion time absorbs that loop,
 * while the operator's single-connection "Test" button and the
 * credential-health revalidator keep invoking the real test directly.
 *
 * Two deliberate semantics:
 *   - The window does NOT slide on a hit, and expiry is STRICTLY greater-than
 *     (elapsed == window still hits). The observed tab cadence is exactly
 *     300s; a fixed TTL of the same length would let every cadence probe land
 *     exactly on the boundary and expire — full resonance, zero debounce.
 *     The 360s default (> cadence) plus strict ">" closes both failure modes.
 *   - Failed results age out at half the window so genuine breakage is
 *     re-probed sooner than success is.
 *
 * `forceRefresh: true` bypasses the cache on lookup and therefore always
 * performs a real test.
 */

export interface ConnectionTestDebounceOptions {
  /** Milliseconds a successful result stays reusable. 0 disables the debounce. */
  windowMs: number;
  /** Injectable clock for tests. */
  now?: () => number;
}

export interface ConnectionTestDebounceHit {
  result: unknown;
  debounced: true;
}

export interface ConnectionTestDebounce {
  /**
   * Returns the cached result when one is still fresh, or undefined when a
   * real test should run. `forceRefresh` always returns undefined.
   */
  lookup(
    connectionId: string,
    opts?: { forceRefresh?: boolean }
  ): ConnectionTestDebounceHit | undefined;
  /** Store a completed real-test result. `failed` halves the retention. */
  record(connectionId: string, result: unknown, failed: boolean): void;
}

interface CacheEntry {
  completedAt: number;
  failed: boolean;
  result: unknown;
}

export function createConnectionTestDebounce(
  options: ConnectionTestDebounceOptions
): ConnectionTestDebounce {
  const { windowMs } = options;
  const now = options.now ?? (() => Date.now());
  const cache = new Map<string, CacheEntry>();

  return {
    lookup(connectionId, opts) {
      if (windowMs <= 0 || opts?.forceRefresh) return undefined;
      const entry = cache.get(connectionId);
      if (!entry) return undefined;
      const effectiveMs = entry.failed ? windowMs / 2 : windowMs;
      if (now() - entry.completedAt > effectiveMs) {
        cache.delete(connectionId);
        return undefined;
      }
      return { result: entry.result, debounced: true };
    },
    record(connectionId, result, failed) {
      cache.set(connectionId, { completedAt: now(), failed, result });
    },
  };
}

const CONNECTION_TEST_DEBOUNCE_DEFAULT_MS = 360_000;

/** Resolve the debounce window from OMNIROUTE_TEST_DEBOUNCE_MS (0 = off). */
export function resolveConnectionTestDebounceMs(env: NodeJS.ProcessEnv): number {
  const raw = env.OMNIROUTE_TEST_DEBOUNCE_MS;
  if (raw === undefined || raw === "") return CONNECTION_TEST_DEBOUNCE_DEFAULT_MS;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return CONNECTION_TEST_DEBOUNCE_DEFAULT_MS;
  return parsed;
}

/** Process-wide shared instance used by the connection-test HTTP surfaces. */
let sharedInstance: ConnectionTestDebounce | null = null;

export function getSharedConnectionTestDebounce(): ConnectionTestDebounce {
  if (!sharedInstance) {
    sharedInstance = createConnectionTestDebounce({
      windowMs: resolveConnectionTestDebounceMs(process.env),
    });
  }
  return sharedInstance;
}
