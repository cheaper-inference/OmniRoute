/**
 * Probe-origin tracking via AsyncLocalStorage.
 *
 * Convention: ANY probe flow (model test-all, future batch tests,
 * credential-health if it ever routes through the chat path) MUST execute
 * inside runAsProbe() so deactivation guards can refuse probe-origin
 * failures (invariant #9817: only a real request-path failure deactivates
 * a connection). Pinned by tests/unit/probe-testall-isolation.test.ts.
 *
 * NOTE: when a probe dispatches through a scheduler with a queue
 * (Bottleneck via withRateLimit), runAsProbe must wrap the scheduled fn
 * itself — a queued job otherwise executes outside this context
 * (pinned by the queued-scheduler test below).
 *
 * EXCEPTIONS (deliberate, documented in the PR): tokenHealthCheck refresh
 * failures keep deactivating (re-auth semantics — a dead refresh token is
 * a real death, not a probe artifact), and circuit-breaker HALF_OPEN
 * probes are real generations by design. Those flows stay outside
 * runAsProbe.
 */
import { AsyncLocalStorage } from "node:async_hooks";

type ProbeContext = { probe: true; isolateFailures?: boolean };

const probeContext = new AsyncLocalStorage<ProbeContext>();

/**
 * Run `fn` as a probe. `isolateFailures: true` pins the isolation ON for this
 * probe regardless of the `probeCanDisable` / PROBE_CAN_DISABLE opt-in — for
 * background probes the operator never pressed a button for (the daily quota
 * revalidation), whose failure must never reach the connection's state.
 */
export function runAsProbe<T>(
  fn: () => Promise<T>,
  options: { isolateFailures?: boolean } = {}
): Promise<T> {
  const store: ProbeContext =
    options.isolateFailures === true ? { probe: true, isolateFailures: true } : { probe: true };
  return probeContext.run(store, fn);
}

export function isProbeContext(): boolean {
  return probeContext.getStore() !== undefined;
}

/**
 * Central probe-isolation decision used by every deactivation site.
 *
 * True when the current execution is probe-origin AND the opt-in setting
 * `probeCanDisable` is OFF (default): the probe failure is recorded but
 * must never remove the connection from the pool (cooldowns, terminal
 * status, per-model lockouts, auto-disable, circuit breaker). Operators
 * who use test-all as a maintenance tool set `probeCanDisable: true` to
 * restore the historical behavior where a probe counts as a real
 * generation.
 */
export async function shouldIsolateProbeFailures(): Promise<boolean> {
  const store = probeContext.getStore();
  if (store === undefined) return false;
  if (store.isolateFailures === true) return true;
  // Feature-flag kill-switch (env/DB override; fail-safe false like the
  // AUTH_LOG_INCLUDE_ACCOUNT_ID usage): PROBE_CAN_DISABLE restores the
  // historical behavior where a probe counts as a real generation.
  try {
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    if (isFeatureFlagEnabled("PROBE_CAN_DISABLE")) return false;
  } catch {
    // Fail-safe: on lookup failure the isolation stays ON.
  }
  try {
    const { getCachedSettings } = await import("@/lib/db/readCache");
    const settings = await getCachedSettings();
    return !settings.probeCanDisable;
  } catch {
    // Fail-safe: on settings-lookup failure the isolation stays ON.
    return true;
  }
}
