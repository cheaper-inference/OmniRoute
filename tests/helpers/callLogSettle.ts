/**
 * Bound for tests that wait on a call-log save or on its detail.
 *
 * The detail artifact is written by a worker thread that starts cold on its first write.
 * A call-log wait is a hang guard, not a latency budget: green runs return as soon as the
 * save settles, so keep the bound generous under load. No imports on purpose: tests set
 * DATA_DIR before they import the call-log modules.
 */
export const CALL_LOG_SETTLE_TIMEOUT_MS = 60_000;
