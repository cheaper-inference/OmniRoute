// bin/cli/launch/core/gateway/process.mjs: health probe and process helpers shared by the gateway
// strategies and the reaper. Owned by stream C2. Plain .mjs (no .ts imports): the reaper runs it
// under a bare `node` without tsx.

import { classifyPidIdentity, isPidRunning, sleep } from "../../../utils/pid.mjs";

export const DEFAULT_PORT = 20128;
export const HEALTH_PATH = "/api/monitoring/health";
const HEALTH_TIMEOUT_MS = 1500;

export function localRootUrl(port) {
  return `http://127.0.0.1:${port}`;
}

/** Same probe as launch.mjs (`GET /api/monitoring/health`, 2xx = healthy). */
export async function probeHealth(rootUrl, { timeoutMs = HEALTH_TIMEOUT_MS } = {}) {
  try {
    const res = await fetch(`${rootUrl}${HEALTH_PATH}`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    // Drain so the keep-alive socket is reusable and nothing dangles.
    await res.arrayBuffer().catch(() => {});
    return res.ok;
  } catch {
    return false;
  }
}

/** Per-attempt timeouts for the patient probe: about 6 s in total before a port is "foreign". */
export const HEALTH_RETRY_TIMEOUTS_MS = Object.freeze([1500, 2000, 2500]);
const HEALTH_RETRY_BACKOFF_MS = 250;

/**
 * Health probe with retries, for a port that is listening but did not answer the first probe: a
 * busy or cold gateway can take several seconds on /health (live smoke item 7). True on the
 * first 2xx; false only when every attempt failed or answered non-2xx.
 * @param {string} rootUrl
 * @param {{ timeoutsMs?: number[], backoffMs?: number, probe?: typeof probeHealth }} [options]
 */
export async function probeHealthPatient(rootUrl, options = {}) {
  const timeouts = options.timeoutsMs ?? HEALTH_RETRY_TIMEOUTS_MS;
  const backoffMs = options.backoffMs ?? HEALTH_RETRY_BACKOFF_MS;
  const probe = options.probe ?? probeHealth;
  for (let i = 0; i < timeouts.length; i++) {
    if (i > 0 && backoffMs > 0) await sleep(backoffMs * i);
    if (await probe(rootUrl, { timeoutMs: timeouts[i] })) return true;
  }
  return false;
}

// Same bounded patterns as src/shared/utils/logRedaction.ts (redactSecrets), mirrored because this
// module runs under bare node without tsx, plus launch session tokens (olx_...).
const LOG_SECRET_PATTERNS = [
  [/(authorization\s*[:=]\s*bearer\s+)[\w.\-]{6,}/gi, "$1[REDACTED]"],
  [/\bbearer\s+[\w.\-]{12,}/gi, "Bearer [REDACTED]"],
  [/((?:x-api-key|api[_-]?key)\s*[:=]\s*)[\w.\-]{6,}/gi, "$1[REDACTED]"],
  [/(api\.telegram\.org\/bot)\d{6,}:[\w\-]{20,}/gi, "$1[REDACTED]"],
  [/\bsk-[A-Za-z0-9_\-]{16,}/g, "sk-[REDACTED]"],
  [/\bolx_[A-Za-z0-9_\-]{8,}/g, "olx_[REDACTED]"],
];

/** Scrub credentials from one log line before it reaches the terminal. */
export function redactLogText(text) {
  let out = String(text ?? "");
  for (const [pattern, replacement] of LOG_SECRET_PATTERNS) out = out.replace(pattern, replacement);
  return out;
}

/**
 * True when `pid` is running AND is not proven foreign (section 0.1: lease and owned-gateway
 * checks call classifyPidIdentity after isPidRunning, closing the pid-reuse hole). "unknown"
 * (command line unreadable) counts as ours: refusing it would orphan a real gateway.
 */
export function isOurProcessAlive(pid, { classify = classifyPidIdentity } = {}) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  if (!isPidRunning(pid)) return false;
  const identity = classify(pid);
  return identity === "ours" || identity === "unknown";
}

export async function waitForPidExit(pid, timeoutMs, pollMs = 50) {
  const start = Date.now();
  while (isPidRunning(pid)) {
    if (Date.now() - start >= timeoutMs) return false;
    await sleep(pollMs);
  }
  return true;
}

function signal(pid, sig) {
  try {
    process.kill(pid, sig);
    return true;
  } catch {
    return false;
  }
}

/**
 * SIGTERM, wait, then SIGKILL (the process group too on POSIX when `group`). Mirrors
 * stopProcessGracefully (src/shared/platform/windowsProcess.ts), reimplemented because the
 * reaper runs without tsx.
 */
export async function stopPidGracefully(pid, { timeoutMs = 5000, group = false } = {}) {
  if (!isPidRunning(pid)) return true;
  if (process.platform !== "win32") signal(pid, "SIGTERM");
  if (await waitForPidExit(pid, timeoutMs)) return true;
  if (group && process.platform !== "win32") signal(-pid, "SIGKILL");
  signal(pid, "SIGKILL");
  return waitForPidExit(pid, 2000);
}
