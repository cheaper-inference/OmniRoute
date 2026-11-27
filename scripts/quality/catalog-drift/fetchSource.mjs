import { setTimeout as delay } from "node:timers/promises";

export const CATALOG_DRIFT_USER_AGENT = "catalog-drift-check/1.0";
export const FETCH_DEFAULTS = Object.freeze({
  timeoutMs: 20_000,
  maxBytes: 5 * 1024 * 1024,
  minIntervalMs: 3_000,
  retryDelayMs: 15_000,
  deadlineMs: 12 * 60_000,
});

/** @typedef {{ ok: true, status: number, contentType: string, text: string }
 *  | { ok: false, failure: "network"|"timeout"|"http"|"gone"|"too-large", status: number|null, detail: string }} SourceResult */

export function createHostThrottle({
  minIntervalMs = FETCH_DEFAULTS.minIntervalMs,
  now = Date.now,
  sleep = delay,
} = {}) {
  const latest = new Map();
  return {
    async wait(host) {
      const previous = latest.get(host);
      const current = (async () => {
        if (previous) {
          const waitMs = (await previous) + minIntervalMs - now();
          if (waitMs > 0) await sleep(waitMs);
        }
        return now();
      })();
      latest.set(host, current);
      await current;
    },
  };
}

/** @returns {Promise<SourceResult>} */
export async function fetchSource(
  url,
  {
    fetchImpl = globalThis.fetch,
    timeoutMs = FETCH_DEFAULTS.timeoutMs,
    maxBytes = FETCH_DEFAULTS.maxBytes,
  } = {}
) {
  const signal = AbortSignal.timeout(timeoutMs);
  try {
    const response = await fetchImpl(url, {
      method: "GET",
      headers: { "user-agent": CATALOG_DRIFT_USER_AGENT },
      credentials: "omit",
      redirect: "follow",
      signal,
    });
    const { status } = response;
    if (!response.ok) {
      void response.body?.cancel().catch(() => {});
      const failure = status === 404 || status === 410 ? "gone" : "http";
      return { ok: false, failure, status, detail: "HTTP " + status };
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    if (reader) {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > maxBytes) {
            void reader.cancel().catch(() => {});
            return {
              ok: false,
              failure: "too-large",
              status,
              detail: "Response exceeds " + maxBytes + " bytes",
            };
          }
          text += decoder.decode(value, { stream: true });
        }
        text += decoder.decode();
      } finally {
        reader.releaseLock();
      }
    }
    return { ok: true, status, contentType: response.headers.get("content-type") ?? "", text };
  } catch (error) {
    if (signal.aborted || error?.name === "AbortError" || error?.name === "TimeoutError") {
      return { ok: false, failure: "timeout", status: null, detail: "Request timed out" };
    }
    if (error?.cause?.code === "ENOTFOUND") {
      return { ok: false, failure: "gone", status: null, detail: "Host not found" };
    }
    return { ok: false, failure: "network", status: null, detail: "Network request failed" };
  }
}
