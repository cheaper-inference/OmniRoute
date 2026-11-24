/**
 * Connection back-pressure for SSE / streaming endpoints.
 *
 * Caps in-flight requests to prevent memory exhaustion.  A request holds one
 * slot from admission until its response has been delivered: a streaming
 * response until the client has read it to the end or has gone away, any
 * other response until the handler returns it.
 *
 * The count is this module's own.  Sticky-routing sessions are not requests:
 * a session outlives its request by `OMNIROUTE_SESSION_TTL_MIN`, so a few
 * finished requests would fill the cap (#21157).
 *
 * Set `OMNI_MAX_CONCURRENT_CONNECTIONS` to a positive integer to enable.
 * Default is 0 (disabled) so existing deployments are unaffected until
 * an operator explicitly opts in.
 */

type CapacityOk = { shouldReject: false };
type CapacityExceeded = { shouldReject: true; response: Response };
export type CapacityResult = CapacityOk | CapacityExceeded;

export type ConnectionSlot = CapacityOk & {
  /** Free the slot now.  Safe to call more than once. */
  release(): void;
  /**
   * Free the slot when `response` has been delivered, and return the response
   * to send in its place.  `signal` frees the slot of a stream nobody reads.
   */
  releaseAfter(response: Response, signal?: AbortSignal | null): Response;
};

/** A slot of a disabled cap: nothing is counted and the response is not wrapped. */
const UNCOUNTED_SLOT: ConnectionSlot = {
  shouldReject: false,
  release: () => {},
  releaseAfter: (response) => response,
};

let inFlight = 0;

/**
 * Pure capacity evaluator — given an active count and a cap, returns the
 * appropriate result.  Cap ≤ 0 means disabled (never reject).
 *
 * Exported for unit testing without mocking any module boundaries.
 */
export function evalCapacity(active: number, cap: number): CapacityResult {
  if (cap <= 0 || active < cap) {
    return { shouldReject: false };
  }
  const retryAfter = Math.max(1, Math.ceil((active / cap) * 30));
  return {
    shouldReject: true,
    response: new Response(
      JSON.stringify({
        error: {
          message: `Server busy — ${active} active connections (limit ${cap}). Retry after ${retryAfter}s.`,
          type: "rate_limit",
          retry_after: retryAfter,
        },
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(cap),
          "X-RateLimit-Remaining": "0",
        },
      }
    ),
  };
}

/** Read cap from env on every call so tests can mutate process.env freely. */
function readCap(): number {
  const raw = parseInt(process.env.OMNI_MAX_CONCURRENT_CONNECTIONS ?? "0", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
}

function isSseResponse(response: Response): boolean {
  return (response.headers.get("content-type") ?? "").toLowerCase().includes("text/event-stream");
}

/**
 * Take one slot of the configured connection cap.
 *
 * Returns `{ shouldReject: true, response }` when the cap is reached, or a
 * slot the caller must release when the request is over.  The check and the
 * count are one synchronous step, so two requests cannot take the last slot.
 */
export function acquireConnectionSlot(): CapacityExceeded | ConnectionSlot {
  const cap = readCap();
  if (cap === 0) return UNCOUNTED_SLOT;

  const capacity = evalCapacity(inFlight, cap);
  if (capacity.shouldReject) return capacity;

  inFlight++;
  let released = false;
  let abortSignal: AbortSignal | null = null;
  const release = (): void => {
    if (released) return;
    released = true;
    inFlight--;
    abortSignal?.removeEventListener("abort", release);
  };

  return {
    shouldReject: false,
    release,
    releaseAfter(response, signal = null) {
      if (!response.body || !isSseResponse(response)) {
        release();
        return response;
      }
      if (signal?.aborted) {
        release();
      } else if (signal && !released) {
        abortSignal = signal;
        signal.addEventListener("abort", release, { once: true });
      }
      // flush: the stream ended.  cancel: the client went away or the stream failed.
      const delivered = new TransformStream<Uint8Array, Uint8Array>({
        flush: release,
        cancel: release,
      });
      return new Response(response.body.pipeThrough(delivered), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    },
  };
}
