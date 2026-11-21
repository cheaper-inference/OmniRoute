/**
 * Upper bounds for the polling knobs a caller may send to async media jobs
 * (`poll_interval_ms`, `timeout_ms`, `poll_timeout_ms`).
 *
 * Those values feed `sleep()` and the polling deadline. Without a ceiling one request could hold
 * a handler for days while the server kept polling the upstream with the operator's credential
 * (CodeQL #1389, js/resource-exhaustion). Same pattern as `resolveCursorImageTimeoutMs` in
 * handlers/imageGeneration/providers/cursorAgentImage.ts: only the untrusted request value is
 * clamped; the fallback (a built-in or operator-configured default) is trusted and kept as is.
 */

/** Longest single wait between two polls; matches MAX_POLL_RETRY_DELAY_MS in pollRetry.ts. */
export const MAX_CALLER_POLL_INTERVAL_MS = 30_000;

/** Longest total polling window a caller may ask for (10 minutes). */
export const MAX_CALLER_POLL_TIMEOUT_MS = 600_000;

/** A whole number of milliseconds ≥ 1 from the request, or null when absent or unusable. */
function positiveWholeMs(value: unknown): number | null {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const ms = Math.floor(n);
  return ms >= 1 ? ms : null;
}

/**
 * The caller's value clamped to `ceiling`, or `fallback` when the caller sent none. A fallback
 * above the ceiling stays reachable, so a ceiling never shortens a default.
 */
export function clampCallerMs(value: unknown, fallback: number, ceiling: number): number {
  const requested = positiveWholeMs(value);
  if (requested === null) return fallback;
  return Math.min(requested, Math.max(ceiling, fallback));
}

export function clampPollIntervalMs(value: unknown, fallback: number): number {
  return clampCallerMs(value, fallback, MAX_CALLER_POLL_INTERVAL_MS);
}

export function clampPollTimeoutMs(value: unknown, fallback: number): number {
  return clampCallerMs(value, fallback, MAX_CALLER_POLL_TIMEOUT_MS);
}
