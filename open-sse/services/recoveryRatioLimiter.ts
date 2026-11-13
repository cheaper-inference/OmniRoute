/**
 * Opt-in (OMNIROUTE_RECOVERY_RATIO_LIMIT, default off) recovery-storm limiter.
 *
 * Per provider pool it counts initial sends and in-place recovery sends (the 429 and WAF
 * retries of BaseExecutor) over a sliding window of 10 one-second buckets. A recovery send
 * is admitted only while recoveries in the window stay under 0.2 of initials in the same
 * window, with a floor of 3. An initial send is never refused: a refused recovery is simply
 * not retried in place, and the caller still gets the upstream response and can rotate.
 * State is in memory and per process; nothing is persisted.
 */

const RATIO = 0.2;
const FLOOR = 3;
const WINDOW_MS = 10_000;
const BUCKETS = 10;

export type RecoveryRatioLimiter = {
  noteInitial(): void;
  /** True and counted when a recovery send fits; false and not counted when it does not. */
  tryRecovery(): boolean;
};

type Slot = { id: number; initial: number; recovery: number };

export function createRecoveryRatioLimiter(
  options: { now?: () => number; windowMs?: number; buckets?: number } = {}
): RecoveryRatioLimiter {
  const now = options.now ?? Date.now;
  const buckets = options.buckets ?? BUCKETS;
  const bucketMs = (options.windowMs ?? WINDOW_MS) / buckets;
  let slots: Slot[] = [];

  const current = (): Slot => {
    const id = Math.floor(now() / bucketMs);
    slots = slots.filter((slot) => slot.id > id - buckets);
    const last = slots[slots.length - 1];
    if (last?.id === id) return last;
    const slot = { id, initial: 0, recovery: 0 };
    slots.push(slot);
    return slot;
  };

  return {
    noteInitial() {
      current().initial += 1;
    },
    tryRecovery() {
      const slot = current();
      let initial = 0;
      let recovery = 0;
      for (const entry of slots) {
        initial += entry.initial;
        recovery += entry.recovery;
      }
      if (recovery >= Math.max(FLOOR, Math.floor(RATIO * initial))) return false;
      slot.recovery += 1;
      return true;
    },
  };
}

const pools = new Map<string, RecoveryRatioLimiter>();

export function isRecoveryRatioLimitEnabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes", "on"].includes(
    (env.OMNIROUTE_RECOVERY_RATIO_LIMIT ?? "").trim().toLowerCase()
  );
}

/** The limiter of one provider pool, or null while the flag is off. */
export function getRecoveryLimiter(pool: string): RecoveryRatioLimiter | null {
  if (!isRecoveryRatioLimitEnabled()) return null;
  let limiter = pools.get(pool);
  if (!limiter) pools.set(pool, (limiter = createRecoveryRatioLimiter()));
  return limiter;
}
