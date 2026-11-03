/**
 * Bound for tests that wait on a call-log save or on its detail.
 *
 * The detail artifact is written by a worker thread that starts cold on its first write; a
 * source checkout spawns it through tsx, and loading its import graph took 6.7–8.4 s on the
 * shared devbox (14 s+ under load) against ~0.2 s on hosted CI. A call-log wait is a hang
 * guard, not a latency budget (green runs return as soon as the save settles), so keep the
 * bound well above that cold start. No imports on purpose: tests set DATA_DIR before they
 * import the call-log modules.
 */
export const CALL_LOG_SETTLE_TIMEOUT_MS = 60_000;
