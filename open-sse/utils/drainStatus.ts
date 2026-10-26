/**
 * Drain-aware failure status for executors whose transport we tear down ourselves.
 *
 * Local backends (the Codex app-server and the Devin CLI child processes, the ChatGPT
 * Web runtime that `gracefulShutdown.cleanup()` stops) fail in-flight turns when OUR
 * graceful shutdown disposes them. That failure is evidence about our shutdown, not
 * about the provider's health, but a 5xx makes the runtime record provider ill health
 * that OUTLIVES the restart (a connection marked unavailable, a model lockout, a
 * breaker failure, a provider cooldown). While the instance is draining, such a 5xx is
 * answered 499 (client_disconnected) instead: 499 is in neither the model-lockout
 * error-code list nor the provider-breaker failure statuses (408/500/502/503/504).
 *
 * The engine must not import from `src/` (boundary ratchet), so the drain flag is read
 * straight from the process-wide state `src/lib/gracefulShutdown.ts` owns
 * (`globalThis.__omnirouteShutdown.shuttingDown`, the value its `isDraining()` returns).
 * It is read live on every call, never latched: a turn that fails before the shutdown
 * starts keeps its own status.
 */

type ShutdownStateView = { shuttingDown?: unknown };

/** True while the instance is draining for a graceful shutdown. */
export function isInstanceDraining(): boolean {
  const state = (globalThis as { __omnirouteShutdown?: ShutdownStateView }).__omnirouteShutdown;
  return state?.shuttingDown === true;
}

/**
 * The status a failed local-backend turn is answered with: a 5xx becomes 499 while the
 * instance is draining; a 4xx of the request and any failure outside a drain keep
 * their own status.
 */
export function drainAwareFailureStatus(status: number): number {
  return status >= 500 && isInstanceDraining() ? 499 : status;
}
