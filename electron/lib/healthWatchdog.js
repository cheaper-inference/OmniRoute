/**
 * Pure decision helper for the Electron health watchdog — no Electron imports so it
 * can be unit tested (same pattern as lib/serverReadiness.js).
 */

const DEFAULT_FAILURE_THRESHOLD = 2;
const DEFAULT_RESTART_COOLDOWN_MS = 60000;

/**
 * Restart the embedded server only after N consecutive failed probes and never more
 * often than the cooldown — one slow/loaded response must never trigger a restart,
 * and a server that cannot boot must not be respawned forever.
 *
 * @param {{ consecutiveFailures?: number, lastRestartAt?: number }} state
 * @param {{ failureThreshold?: number, restartCooldownMs?: number, now?: number }} [options]
 */
function shouldRestartHealthCheck(state = {}, options = {}) {
  const {
    failureThreshold = DEFAULT_FAILURE_THRESHOLD,
    restartCooldownMs = DEFAULT_RESTART_COOLDOWN_MS,
    now = Date.now(),
  } = options;
  const { consecutiveFailures = 0, lastRestartAt = 0 } = state;

  if (consecutiveFailures < failureThreshold) return false;
  return now - lastRestartAt >= restartCooldownMs;
}

module.exports = {
  DEFAULT_FAILURE_THRESHOLD,
  DEFAULT_RESTART_COOLDOWN_MS,
  shouldRestartHealthCheck,
};