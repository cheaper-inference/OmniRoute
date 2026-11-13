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
