/**
 * Pure helpers for polling the embedded or remote OmniRoute server without
 * importing the Electron main process.
 */

const DEFAULT_TIMEOUT_MS = 180000;
const DEFAULT_REQUEST_TIMEOUT_MS = 2000;
const DEFAULT_POLL_INTERVAL_MS = 500;

function buildReadinessUrl(baseUrl) {
  return `${baseUrl.replace(/\/+$/, "")}/api/health/ping`;
}

/**
 * One-shot health probe. Resolves true on any successful HTTP response.
 * @param {string} url
 * @param {{ fetchFn?: typeof fetch, requestTimeoutMs?: number }} [options]
 * @returns {Promise<boolean>}
 */
async function probeServer(url, options = {}) {
  const { fetchFn = globalThis.fetch, requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT_MS } = options;

  const controller = new AbortController();
  let timeoutId;

  try {
    const response = await Promise.race([
      fetchFn(url, { signal: controller.signal }),
      new Promise((resolve) => {
        timeoutId = setTimeout(() => {
          controller.abort();
          resolve(null);
        }, requestTimeoutMs);
      }),
    ]);

    return response?.ok === true;
  } catch {
    return false;
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}

async function waitForServer(url, timeoutMs = DEFAULT_TIMEOUT_MS, options = {}) {
  const {
    fetchFn = globalThis.fetch,
    requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
    pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
    nowFn = Date.now,
    sleepFn = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs)),
    warnFn = console.warn,
  } = options;

  const startedAt = nowFn();
  while (nowFn() - startedAt < timeoutMs) {
    const remainingMs = timeoutMs - (nowFn() - startedAt);
    const attemptTimeoutMs = Math.max(1, Math.min(requestTimeoutMs, remainingMs));

    if (await probeServer(url, { fetchFn, requestTimeoutMs: attemptTimeoutMs })) return true;

    const pollRemainingMs = timeoutMs - (nowFn() - startedAt);
    if (pollRemainingMs <= 0) break;
    await sleepFn(Math.min(pollIntervalMs, pollRemainingMs));
  }

  warnFn("[Electron] Server readiness timeout — showing window anyway");
  return false;
}

module.exports = {
  buildReadinessUrl,
  probeServer,
  waitForServer,
};
