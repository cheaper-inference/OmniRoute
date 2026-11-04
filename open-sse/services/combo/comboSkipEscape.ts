/**
 * comboSkipEscape.ts — selection-loop escape for zero-dispatch stalls.
 *
 * Production (2026-11-04 BJ 14:02-15:54): 20 user-visible 504s
 * ("Combo global timeout (240000ms) after 1/13 targets (0 attempted) — stopping")
 * when ALL pool candidates were simultaneously walled/cooling/saturated. The
 * combo loop iterated through targets without dispatching any, burning the
 * entire 240s global budget in selection. users hit this repeatedly —
 * each attempt was 4 minutes of complete silence.
 *
 * Root cause: the loop has no early exit for "every candidate was pre-filter
 * skipped" — it keeps retrying the set until the global timer fires.
 *
 * Fix (two parts):
 * 1. Track consecutive zero-dispatch set-tries. After `MAX_ZERO_DISPATCH_TRIES`
 *    consecutive set-tries with zero dispatched targets, stop the loop and
 *    return a fast, actionable 503 instead of waiting for the global timeout.
 * 2. Emit a warn log on every zero-dispatch global timeout so operators see
 *    the pattern immediately (the current "(0 attempted)" message is info-level
 *    and easy to miss in the noise).
 *
 *  (). Evidence: .
 */

const MAX_ZERO_DISPATCH_TRIES = 3;

export interface ZeroDispatchState {
  consecutiveZeroDispatchTries: number;
}

export function createZeroDispatchState(): ZeroDispatchState {
  return { consecutiveZeroDispatchTries: 0 };
}

/**
 * Call after each set-try completes. Returns true if we should bail early
 * (all candidates were skipped for N consecutive tries — the pool is
 * effectively unavailable and waiting longer won't help).
 */
export function shouldEscapeZeroDispatch(
  state: ZeroDispatchState,
  recordedAttempts: number
): boolean {
  if (recordedAttempts === 0) {
    state.consecutiveZeroDispatchTries++;
  } else {
    state.consecutiveZeroDispatchTries = 0;
  }
  return state.consecutiveZeroDispatchTries >= MAX_ZERO_DISPATCH_TRIES;
}

/**
 * Build the fast-fail response for a zero-dispatch escape.
 * Includes the earliest reset time if known (from the pool's cooldown state).
 */
export function buildZeroDispatchResponse(
  comboName: string,
  skippedReasons: string[],
  earliestResetAt: number | null
): { status: number; body: string; code: string } {
  const resetHint = earliestResetAt
    ? ` Pool earliest recovery ~${new Date(earliestResetAt).toISOString().slice(11, 19)}Z.`
    : "";
  const reasons = skippedReasons.length > 0
    ? ` All ${skippedReasons.length} candidates skipped: ${skippedReasons.slice(0, 3).join(", ")}${skippedReasons.length > 3 ? "…" : ""}.`
    : " All candidates skipped by pre-dispatch filters.";
  return {
    status: 503,
    code: "POOL_ALL_SKIPPED",
    body: `Resource pool temporarily exhausted for "${comboName}".${reasons}${resetHint} Retry shortly — this is faster than the 240s global timeout you would have waited.`,
  };
}
