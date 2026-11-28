/**
 * @file earlyJsonKeepalive.ts
 * @description Early keepalive for slow NON-streaming JSON responses.
 *
 * A non-streaming request writes nothing until the whole answer is ready. Reverse
 * proxies with an idle-read timeout cut it first: Cloudflare returns 524 after
 * ~100-120 s without a byte from the origin. Claude Code retries a failed stream as a
 * non-streaming request, so slow Opus turns died there.
 *
 * - Fast path: the handler settles within `thresholdMs`; its Response is returned
 *   verbatim (status, headers, body).
 * - Slow path: a 200 `application/json` response opens and one space is written every
 *   `intervalMs` (JSON allows leading whitespace) until the handler settles; then its
 *   body is forwarded. The status is already committed, so a late error arrives as its
 *   JSON error body under the 200.
 *
 * The streaming counterpart is earlyStreamKeepalive.ts.
 */

const ENCODER = new TextEncoder();
const KEEPALIVE_BYTE = ENCODER.encode(" ");
const MIN_INTERVAL_MS = 250;
const DEFAULT_INTERVAL_MS = 10_000;
// Works for Anthropic clients (`type: "error"`) and OpenAI clients (`error` key).
const FALLBACK_ERROR_BODY = ENCODER.encode(
  JSON.stringify({
    type: "error",
    error: { type: "api_error", message: "Upstream request failed." },
  })
);

/** Below Cloudflare's ~100-120 s origin read timeout, with margin. */
export const DEFAULT_JSON_KEEPALIVE_THRESHOLD_MS = 60_000;

/** `OMNIROUTE_NONSTREAM_KEEPALIVE_MS`: milliseconds before the keepalive starts; 0 disables. */
export function resolveJsonKeepaliveThresholdMs(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = env.OMNIROUTE_NONSTREAM_KEEPALIVE_MS?.trim();
  if (!raw || !/^\d{1,9}$/.test(raw)) return DEFAULT_JSON_KEEPALIVE_THRESHOLD_MS;
  return Number(raw);
}

export type EarlyJsonKeepaliveOptions = {
  /** Wait this long for the handler before committing to a 200. 0 or less disables. */
  thresholdMs: number;
  /** Gap between keepalive bytes; keep it well under the proxy's idle-read timeout. */
  intervalMs?: number;
  /** Headers for the slow-path response (the handler's own headers are not known yet). */
  extraHeaders?: Record<string, string>;
};

type Settled = { ok: true; response: Response } | { ok: false; error: unknown };

/** Shared between the committed stream's start() and cancel(). */
type KeepaliveStreamState = {
  interval?: ReturnType<typeof setInterval>;
  reader?: ReadableStreamDefaultReader<Uint8Array>;
  cancelled: boolean;
};

/** The settled handler result, or null when the threshold passes first. */
async function raceThreshold(settled: Promise<Settled>, thresholdMs: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const raced = await Promise.race([
    settled,
    new Promise<null>((resolve) => {
      timer = setTimeout(() => resolve(null), thresholdMs);
    }),
  ]);
  clearTimeout(timer);
  return raced;
}

function startKeepaliveBytes(
  controller: ReadableStreamDefaultController<Uint8Array>,
  state: KeepaliveStreamState,
  intervalMs: number
) {
  controller.enqueue(KEEPALIVE_BYTE);
  state.interval = setInterval(() => {
    try {
      controller.enqueue(KEEPALIVE_BYTE);
    } catch {
      clearInterval(state.interval);
    }
  }, intervalMs);
}

function closeWithFallbackError(controller: ReadableStreamDefaultController<Uint8Array>) {
  controller.enqueue(FALLBACK_ERROR_BODY);
  controller.close();
}

/** Copy the handler body after the keepalive bytes. */
async function forwardHandlerBody(
  body: ReadableStream<Uint8Array>,
  controller: ReadableStreamDefaultController<Uint8Array>,
  state: KeepaliveStreamState
) {
  let forwarded = false;
  try {
    state.reader = body.getReader();
    for (;;) {
      const { done, value } = await state.reader.read();
      if (done) break;
      if (!value?.length) continue;
      controller.enqueue(value);
      forwarded = true;
    }
    if (forwarded) controller.close();
    else closeWithFallbackError(controller);
  } catch {
    if (state.cancelled) return;
    // Appending to a half-written body would produce invalid JSON; fail the
    // response instead so the client sees a broken transfer, not a wrong answer.
    if (forwarded) controller.error(new Error("upstream body failed"));
    else closeWithFallbackError(controller);
  }
}

export async function withEarlyJsonKeepalive(
  handlerPromise: Promise<Response>,
  options: EarlyJsonKeepaliveOptions
): Promise<Response> {
  if (!(options.thresholdMs > 0)) return handlerPromise;
  const intervalMs = Math.max(MIN_INTERVAL_MS, options.intervalMs ?? DEFAULT_INTERVAL_MS);

  // Settle into a tagged result so the losing race branch never leaves an unhandled rejection.
  const settled: Promise<Settled> = handlerPromise.then(
    (response) => ({ ok: true, response }),
    (error: unknown) => ({ ok: false, error })
  );
  const raced = await raceThreshold(settled, options.thresholdMs);
  if (raced) {
    if (raced.ok) return raced.response;
    throw raced.error;
  }

  const state: KeepaliveStreamState = { cancelled: false };
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      startKeepaliveBytes(controller, state, intervalMs);
      const result = await settled;
      clearInterval(state.interval);
      if (state.cancelled) {
        if (result.ok) result.response.body?.cancel().catch(() => {});
        return;
      }
      if (result.ok && result.response.body) {
        await forwardHandlerBody(result.response.body, controller, state);
      } else {
        closeWithFallbackError(controller);
      }
    },
    cancel() {
      state.cancelled = true;
      clearInterval(state.interval);
      state.reader?.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // no-transform: compression (Next.js, Apache mod_deflate) must not buffer the keepalive bytes.
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      ...options.extraHeaders,
    },
  });
}
