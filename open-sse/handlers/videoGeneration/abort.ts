import { sleep } from "../../utils/sleep.ts";

/** The result a video handler returns once the client has aborted the request. */
export function abortedVideoResult() {
  return { success: false as const, status: 499, error: "Request aborted" };
}

/** Returned by `pollJsonAfter` when the caller aborted during the wait or the status request. */
export const POLL_ABORTED = Symbol("video-poll-aborted");

/**
 * Waits `delayMs` (cut short by an abort), then runs one status poll and parses the JSON
 * body. An abort during the wait or the request yields `POLL_ABORTED`; any other failure is
 * rethrown unchanged.
 */
export async function pollJsonAfter(
  delayMs: number,
  url: string,
  headers: Record<string, string>,
  signal: AbortSignal | null
) {
  await sleep(delayMs, signal);
  if (signal?.aborted) return POLL_ABORTED;
  try {
    const statusRes = await fetch(url, { headers, ...(signal ? { signal } : {}) });
    return await statusRes.json();
  } catch (err) {
    if (signal?.aborted) return POLL_ABORTED;
    throw err;
  }
}
