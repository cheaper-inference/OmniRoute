/**
 * Daily revalidation of long-lived quota locks (#20343).
 *
 * A quota failure parks a model until the upstream's announced reset. That reset
 * can be a day or more away, and two things go wrong when nobody checks again:
 *
 *   - the upstream resets the quota EARLY (it happens) and the model stays
 *     parked for the rest of the window, though a single request would now pass;
 *   - a lock derived from a bad parse parks a model that was never exhausted,
 *     and only an operator can notice.
 *
 * A model locked for longer than a day is therefore retried at most once a day.
 * The probe is a real request: when it passes, the caller clears the lock and the
 * model returns to rotation.
 *
 * Opt-in: the pass runs only with the QUOTA_DAILY_REVALIDATION feature flag on
 * (default off), mirrored here by `enabled`. Off means this module selects
 * nothing and no upstream call is made.
 *
 * This file is the pure half: which locks are due. The caller owns the probe and
 * the store, so this stays testable without a clock, a database or a network.
 */

/** A locked model as the selector sees it. */
export type DailyRevalidationCandidate = {
  provider: string;
  connectionId: string;
  model: string | null | undefined;
  /** Epoch ms the lock expires at. */
  until: number;
  /** Epoch ms the lock was applied at; older locks are probed first. */
  lockedAt: number;
  /** Epoch ms of the last probe this lock already received, if any. */
  lastRevalidatedAt?: number;
};

/** One probe per lock per day. A lock under a day left expires on its own first. */
export const DAILY_REVALIDATION_INTERVAL_MS = 24 * 60 * 60 * 1000;

/**
 * Below this remaining time a probe cannot pay for itself: the lock is about to
 * expire anyway, and the probe spends quota.
 */
export const DAILY_REVALIDATION_MIN_REMAINING_MS = 24 * 60 * 60 * 1000;

/** At most this many locks are probed per sweep, so one pass cannot storm upstream. */
export const MAX_DAILY_REVALIDATIONS_PER_SWEEP = 5;

/**
 * Whether one lock is due a probe.
 *
 * Requires more than a day of lock left, and no probe within the interval. An
 * expired lock is never due: there is nothing to revalidate.
 */
export function isDailyRevalidationDue(
  candidate: DailyRevalidationCandidate,
  nowMs: number
): boolean {
  const remainingMs = candidate.until - nowMs;
  if (!(remainingMs > 0)) return false;
  if (remainingMs < DAILY_REVALIDATION_MIN_REMAINING_MS) return false;
  const lastProbe = candidate.lastRevalidatedAt;
  if (typeof lastProbe === "number" && nowMs - lastProbe < DAILY_REVALIDATION_INTERVAL_MS) {
    return false;
  }
  return true;
}

/**
 * The locks to probe on this sweep, oldest lock first.
 *
 * `enabled` is the operator's flag: when false, nothing is selected and no
 * upstream call is made — the default, so a deployment that never opts in keeps
 * exactly the behaviour it had.
 */
export function selectDailyRevalidations(
  candidates: readonly DailyRevalidationCandidate[],
  nowMs: number,
  limit: number = MAX_DAILY_REVALIDATIONS_PER_SWEEP,
  options: { enabled?: boolean } = {}
): DailyRevalidationCandidate[] {
  if (options.enabled === false) return [];
  if (!(limit > 0)) return [];
  return candidates
    .filter((candidate) => isDailyRevalidationDue(candidate, nowMs))
    .sort((left, right) => left.lockedAt - right.lockedAt)
    .slice(0, limit);
}
