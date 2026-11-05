/**
 * @file earlyStreamKeepalive.ts
 * @description Early SSE keepalive wrapper so short idle-read clients stay connected
 * while the handler waits on upstream first-byte (reasoning models, combo failover).
 *
 * @changes
 * - [2026-07-28] [Cursor Grok 4.5] - Scrub omniroute from client-facing keepalive id/model/comment frames
 * - [2026-07-28] [Cursor Grok 4.5] - Neutralize Responses startup thinking text (no OmniRoute brand leak)
 *
 * Strict HTTP clients (notably Codex CLI's `reqwest`, which has a ~5s idle-read
 * timeout) drop the connection if no bytes arrive shortly after the request.
 * The proxy holds the streaming response until `ensureStreamReadiness` observes
 * the upstream's first useful byte — which can exceed 5s for reasoning models
 * that "think" before emitting any token (#2544). `curl` has no such idle
 * timeout, so it was never affected, which is why the bug looked client-specific.
 *
 * This wrapper keeps the connection warm without disturbing the handler's
 * internal logic (combo failover, stream readiness, account cooldown all still
 * run inside the handler before it resolves):
 *
 *   - Fast path: if the handler resolves within `thresholdMs`, its `Response`
 *     is returned verbatim — identical status, headers, and body. There is zero
 *     behavior change for normal latency, so metadata headers and non-200 error
 *     statuses are fully preserved for the common case.
 *
 *   - Slow path: if the handler is still pending after `thresholdMs`, a 200
 *     `text/event-stream` response is opened immediately and SSE comment
 *     heartbeats are emitted every `intervalMs` until the handler resolves; its
 *     body is then forwarded. If the handler ultimately fails, a structured
 *     `event: error` frame is emitted in-band (the response is already committed
 *     to 200, so the HTTP status can no longer change).
 */

import { recordEarlyKeepaliveBytes } from "./earlyKeepaliveByteBuffer.ts";
import { classifyProviderSafetyError } from "./providerSafety.ts";
import {
  SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
  buildSyntheticResponsesFailedEvent,
  buildSyntheticResponsesFailureId,
} from "./responsesSequence.ts";
import { withUpstreamErrorDetail } from "./upstreamErrorDetail.ts";
import { mergeAbortSignals } from "../executors/base/mergeAbortSignals.ts";

const ENCODER = new TextEncoder();
const KEEPALIVE_FRAME = ENCODER.encode(": keepalive\n\n");
// OpenAI-compatible keepalive: a JSON chunk without an application choice.
// Some OpenAI-compatible clients parse every non-empty SSE line as JSON and
// reject legal SSE comments before their first provider chunk arrives.
// An empty delta before the assistant role creates an untyped LangChain message
// and drops later tool calls (#18410). No choices also avoids claiming its ID.
export const OPENAI_KEEPALIVE_FRAME = ENCODER.encode(
  'data: {"id":"chatcmpl-keepalive","object":"chat.completion.chunk","created":0,"model":"keepalive","choices":[]}\n\n'
);
// The first slow-path frame must be a valid OpenAI chunk without creating
// visible reasoning that clients persist into the conversation.
export const OPENAI_STARTUP_FRAME = OPENAI_KEEPALIVE_FRAME;
// Anthropic Messages-format keepalive: a REAL `ping` SSE event, not a comment.
// Anthropic clients (Claude Code, the Anthropic SDK) reset their stream/first-token
// watchdog on real SSE events but ignore SSE comments (`: ...`), so on a slow first
// token the comment frame lets the client abort and retry the stream. Anthropic's own
// API emits `event: ping` for exactly this reason; the /v1/messages route mirrors it.
export const ANTHROPIC_PING_FRAME = ENCODER.encode('event: ping\ndata: {"type":"ping"}\n\n');
// Anthropic Messages API default — Anthropic's own spec really does use a named
// `event: error` SSE frame, so this is correct there. It is WRONG for the OpenAI-
// format routes below: Chat Completions and Responses streaming never use the SSE
// `event:` field at all, only bare `data: {...}` lines — a naive line-based parser
// (the kind most OpenAI-compatible clients use, not a full EventSource) can silently
// drop an unrecognized `event:` line and/or desync on the `data:` line that follows,
// so this error would never surface to the client at all (log ids
// 1784465227489-a2cbc0 / 1784457764961-73 territory: a client that gives up with no
// visible reason). See OPENAI_CHAT_ERROR_FRAME / OPENAI_RESPONSES_ERROR_FRAME below
// for the per-format-correct alternatives.
const ERROR_FRAME = ENCODER.encode(
  `event: error\ndata: ${JSON.stringify({
    error: { message: "Upstream stream failed before completion.", type: "stream_error" },
  })}\n\n`
);
// Chat Completions convention: a plain `data:` line, no `event:` field. This
// matches what the openai-node SDK's stream iterator actually checks for — it
// inspects each parsed chunk for a top-level `error` key regardless of any SSE
// event name (there isn't one to check, since real OpenAI chat completions
// streams never send `event:` lines).
export const OPENAI_CHAT_ERROR_FRAME = ENCODER.encode(
  `data: ${JSON.stringify({
    error: { message: "Upstream stream failed before completion.", type: "stream_error" },
  })}\n\n`
);
// Responses API convention: also a plain `data:` line, but the discriminator is
// the `type` field INSIDE the JSON payload (matching every other Responses API
// event — response.output_text.delta, response.completed, etc.), not an SSE
// `event:` field.
export const OPENAI_RESPONSES_ERROR_FRAME = ENCODER.encode(
  `data: ${JSON.stringify({
    type: "error",
    code: null,
    message: "Upstream stream failed before completion.",
    param: null,
    error: {
      type: "stream_error",
      code: "stream_error",
      message: "Upstream stream failed before completion.",
      param: null,
    },
    // #14330: was hardcoded to 0, colliding with the real per-stream emitter's
    // first event (also numbered 1 from its own `state.seq` base of 0) — this
    // frame is synthesized outside that counter, so it uses the shared seed.
    sequence_number: SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
  })}\n\n`
);

const MAX_RETRY_AFTER_SECONDS = 3600;

/**
 * Ceiling for the decoded-but-incomplete SSE frame the fast-path wrapper holds
 * back. An upstream that keeps sending without ever emitting a blank line would
 * otherwise grow this without bound; past the ceiling the wrapper releases whole
 * lines so the terminal error frame still can never merge into a partial line.
 */
const MAX_BUFFERED_FRAME_BYTES = 1 << 20;

/**
 * SSE error-frame envelope used by the terminal-frame builders below. Mirrors the
 * three conventions the wrappers know how to synthesize.
 */
type SseErrorFrameFormat = "anthropic" | "responses" | "chat";

/** Mutable framing state: decoded-but-incomplete bytes + bytes already sent. */
interface SseFrameState {
  buffer: string;
  bytesForwarded: number;
}

/** Everything the terminal-frame path needs that is fixed per wrapped stream. */
interface SseTerminalContext {
  format: SseErrorFrameFormat;
  buildFrame: (format: SseErrorFrameFormat) => Uint8Array;
  configuredErrorFrame: Uint8Array;
  recordGeneratedFrame?: (frame: Uint8Array) => void;
  /** Release the upstream reader (no orphaned socket after a mid-stream failure). */
  cancelUpstream: () => void;
}

/** Index just past the first `\n\n` / `\r\n\r\n` at or after `from`, or -1 when none. */
function nextFrameEnd(buffer: string, from: number): number {
  const lf = buffer.indexOf("\n\n", from);
  const crlf = buffer.indexOf("\r\n\r\n", from);
  // `\r\n\r\n` holds no `\n\n`, so the two candidates never overlap in a way that
  // matters; take whichever terminates first.
  const lfEnd = lf === -1 ? Number.POSITIVE_INFINITY : lf + 2;
  const crlfEnd = crlf === -1 ? Number.POSITIVE_INFINITY : crlf + 4;
  const end = Math.min(lfEnd, crlfEnd);
  return Number.isFinite(end) ? end : -1;
}

/** Split complete SSE frames (blank-line terminated) off the front of the buffer. */
function takeCompleteFrames(state: SseFrameState): string[] {
  const frames: string[] = [];
  let from = 0; // absolute offset already scanned — never rescans the buffer
  for (;;) {
    const end = nextFrameEnd(state.buffer, from);
    if (end === -1) break;
    frames.push(state.buffer.slice(from, end));
    from = end;
  }
  if (from > 0) state.buffer = state.buffer.slice(from);
  return frames;
}

/** Release whole lines to a client when an unterminated frame exceeds the ceiling. */
function releaseOverlongLines(
  state: SseFrameState,
  controller: ReadableStreamDefaultController<Uint8Array>
): boolean {
  if (state.buffer.length < MAX_BUFFERED_FRAME_BYTES) return false;
  const lastNewline = state.buffer.lastIndexOf("\n");
  // A single over-long line keeps accumulating: that is the upstream's framing bug.
  if (lastNewline < 0) return false;
  controller.enqueue(ENCODER.encode(state.buffer.slice(0, lastNewline + 1)));
  state.buffer = state.buffer.slice(lastNewline + 1);
  return true;
}

/** Forward the decoder's trailing bytes and close a healthy stream. */
function finishHealthy(
  state: SseFrameState,
  decoder: TextDecoder,
  controller: ReadableStreamDefaultController<Uint8Array>
): void {
  // Flush any multibyte sequence the decoder still holds, then forward the
  // trailing bytes even without a terminal blank line (some upstreams end
  // exactly at frame end without the final blank line observable as its own read).
  state.buffer += decoder.decode();
  if (state.buffer.length > 0) controller.enqueue(ENCODER.encode(state.buffer));
  state.buffer = "";
  controller.close();
}

/** Emit exactly one terminal frame and close, never throwing at the consumer. */
function emitTerminalFrame(
  state: SseFrameState,
  controller: ReadableStreamDefaultController<Uint8Array>,
  context: SseTerminalContext
): void {
  // Discard any buffered INCOMPLETE frame so the terminal frame's `data:` line
  // cannot merge into a partial upstream event.
  state.buffer = "";
  // Nothing reached the client → the caller's configured frame verbatim (same
  // contract as the slow path); otherwise the format-derived partial-content one.
  const frame =
    state.bytesForwarded === 0 ? context.configuredErrorFrame : context.buildFrame(context.format);
  try {
    controller.enqueue(frame);
    context.recordGeneratedFrame?.(frame);
  } catch {
    /* consumer gone */
  }
  try {
    controller.close();
  } catch {
    /* already closed */
  }
  context.cancelUpstream();
}

/**
 * Wrap a fast-path verbatim SSE body so a mid-flight upstream failure appends
 * ONE format-correct terminal error frame before the stream closes. Converts an
 * abrupt transport close (client sees "connection dropped mid-response") into a
 * deliberate, parseable failure event the client's retry logic can react to.
 *
 * Framing safety (CodeRabbit review 18948): bytes are buffered until they
 * complete an SSE frame (a blank line: `\n\n` or `\r\n\r\n`). Completed frames
 * are forwarded unchanged; on failure any buffered INCOMPLETE frame is
 * discarded before the terminal error frame, so the error's `data:` line can
 * never merge into a partial upstream event and corrupt the client's parser.
 *
 * Zero-content failure (CodeRabbit 125): if the first read fails, the caller's
 * configured `errorFrame` is emitted verbatim (same contract as the slow
 * path's zero-content branch) rather than the generic partial-content frame.
 *
 * `recordGeneratedFrame` (CodeRabbit 608): invoked only for frames this wrapper
 * generates (the terminal error frame), so `correlationId` call logs include
 * bytes actually sent to the client. Forwarded upstream bytes stay unrecorded —
 * the handler's own reqLogger already captured them.
 */
function wrapSseBodyWithMidStreamFailure(
  body: ReadableStream<Uint8Array>,
  format: SseErrorFrameFormat,
  buildFrame: (format: SseErrorFrameFormat) => Uint8Array,
  configuredErrorFrame: Uint8Array,
  recordGeneratedFrame?: (frame: Uint8Array) => void
): ReadableStream<Uint8Array> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const state: SseFrameState = { buffer: "", bytesForwarded: 0 };
  const context: SseTerminalContext = {
    format,
    buildFrame,
    configuredErrorFrame,
    recordGeneratedFrame,
    cancelUpstream: () => {
      reader.cancel().catch(() => {});
    },
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        // Keep reading until there is something to enqueue: a pull() that
        // resolves without enqueuing leaves the pending read blocked forever,
        // and SSE frames are not chunk-aligned, so holding one back must not
        // return empty-handed.
        for (;;) {
          const { done, value } = await reader.read();
          if (done) {
            finishHealthy(state, decoder, controller);
            return;
          }
          if (!value || value.byteLength === 0) continue;
          state.bytesForwarded += value.byteLength;
          state.buffer += decoder.decode(value, { stream: true });
          const frames = takeCompleteFrames(state);
          if (frames.length > 0) {
            for (const frame of frames) controller.enqueue(ENCODER.encode(frame));
            return;
          }
          if (releaseOverlongLines(state, controller)) return;
        }
      } catch {
        emitTerminalFrame(state, controller, context);
      }
    },
    cancel(reason) {
      // Propagate the promise so the caller's cancel() settles only after the
      // upstream reader is released (no orphaned upstream socket).
      return reader.cancel(reason).catch(() => {});
    },
  });
}



/**
 * Wrap a fast-path response whose body is an SSE stream, so a mid-flight failure
 * appends one format-correct terminal frame. Returns null when the response is not
 * an SSE stream, letting the caller pass the original through untouched.
 *
 * Healthy streams stay byte-identical (complete frames are re-emitted unchanged, only
 * the chunk boundaries move); the wrapper adds no latency beyond holding back an
 * incomplete trailing frame until its blank line arrives.
 */
function wrapFastPathSseResponse(
  response: Response,
  context: Omit<SseTerminalContext, "cancelUpstream">
): Response | null {
  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  if (!response.body || !contentType.includes("text/event-stream")) return null;
  const wrapped = new Response(
    wrapSseBodyWithMidStreamFailure(
      response.body,
      context.format,
      context.buildFrame,
      context.configuredErrorFrame,
      context.recordGeneratedFrame
    ),
    {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  );
  // The Response constructor cannot take these, so re-attach them the same way
  // tlsClient's adapter does: downstream consumers read `.url` for
  // redirect/telemetry attribution.
  if (response.url) {
    Object.defineProperty(wrapped, "url", { value: response.url, configurable: true });
  }
  if (response.redirected !== undefined) {
    Object.defineProperty(wrapped, "redirected", {
      value: response.redirected,
      configurable: true,
    });
  }
  return wrapped;
}

function readRetryAfterSeconds(headers: Headers): number | null {
  for (const name of ["retry-after", "x-omniroute-retry-after-seconds"]) {
    const raw = headers.get(name)?.trim();
    if (!raw) continue;
    let seconds: number | null = null;
    if (/^\d{1,10}$/.test(raw)) {
      seconds = Number(raw);
    } else {
      const at = Date.parse(raw);
      if (Number.isFinite(at)) seconds = Math.ceil((at - Date.now()) / 1000);
    }
    if (seconds !== null) return Math.min(Math.max(seconds, 0), MAX_RETRY_AFTER_SECONDS);
  }
  return null;
}

/**
 * Reshapes an already-sanitized upstream error body into the Responses API
 * convention (`{"type":"error",...}`) for the dynamic real-upstream-body branch
 * of the slow path (#13431). The body reaching here is Chat-Completions-shaped
 * (`{"error":{message,type,code}}`, the combo/handler failure convention) most of
 * the time, but may also be a bare `{message}` or unparseable text — every shape
 * must still produce a non-empty `message` so the client never sees an opaque
 * frame (never crash the stream on a malformed body).
 */
function buildResponsesErrorDataLine(
  text: string,
  meta: { status: number; retryAfterSeconds: number | null }
): string {
  const trimmed = text.trim();
  let parsed: Record<string, unknown> | null = null;
  if (trimmed) {
    try {
      const candidate = JSON.parse(trimmed);
      if (candidate && typeof candidate === "object") parsed = candidate as Record<string, unknown>;
    } catch {
      parsed = null;
    }
  }
  const errorObj =
    parsed && typeof parsed.error === "object" && parsed.error !== null
      ? (parsed.error as Record<string, unknown>)
      : null;
  const message = withUpstreamErrorDetail(
    (typeof errorObj?.message === "string" && errorObj.message) ||
      (typeof parsed?.message === "string" && parsed.message) ||
      trimmed ||
      "Upstream stream failed before completion.",
    parsed?.upstream_details
  );
  const code = (typeof errorObj?.code === "string" && errorObj.code) || null;
  const param = (typeof errorObj?.param === "string" && errorObj.param) || null;
  // The HTTP status and retry hint are already lost once the stream committed to 200;
  // carry them in-band so clients can still tell permanent from transient failures.
  // `error_type` (not `type`): top-level `type` is the Responses event discriminator.
  const errorType = typeof errorObj?.type === "string" && errorObj.type ? errorObj.type : null;
  const statusFields = {
    status_code: meta.status,
    ...(errorType ? { error_type: errorType } : {}),
    ...(meta.retryAfterSeconds !== null ? { retry_after_seconds: meta.retryAfterSeconds } : {}),
  };
  const extras =
    parsed && typeof parsed.diagnostics === "object" && parsed.diagnostics !== null
      ? { diagnostics: parsed.diagnostics }
      : {};
  // PROVIDER_SAFETY_STOPS_TERMINAL (#17049): a provider safety stop is terminal, and Codex
  // reads its fatal policy code only from `response.failed`; a bare `error` frame is a
  // disconnect to it, so it reconnects and replays the stopped conversation.
  const safety = classifyProviderSafetyError({
    status: meta.status,
    code: errorObj?.code,
    type: errorObj?.type,
    message: errorObj?.message,
  });
  if (safety) {
    return JSON.stringify(
      buildSyntheticResponsesFailedEvent({
        id: buildSyntheticResponsesFailureId(),
        object: "response",
        status: "failed",
        error: {
          type: "invalid_request_error",
          code: safety.code,
          message,
          param,
          status_code: safety.status,
        },
      })
    );
  }
  return JSON.stringify({
    type: "error",
    code,
    message,
    param,
    error: {
      type: errorType || "stream_error",
      code: code || errorType || "stream_error",
      message,
      param,
    },
    // #14330: was hardcoded to 0 — see OPENAI_RESPONSES_ERROR_FRAME above.
    sequence_number: SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
    ...statusFields,
    ...extras,
  });
}

export type EarlyStreamKeepaliveOptions = {
  /** Wait this long for the handler before committing to a keepalive stream. */
  thresholdMs?: number;
  /** Keepalive cadence once committed (must stay under the client idle timeout). */
  intervalMs?: number;
  /** Client request signal — propagated so a client disconnect cancels the upstream read. */
  signal?: AbortSignal | null;
  /**
   * Frame emitted on each keepalive tick. Defaults to an SSE comment
   * (`: keepalive`). Anthropic-format routes (/v1/messages) must pass
   * `ANTHROPIC_PING_FRAME` instead, because Anthropic clients ignore SSE comments
   * for their stream watchdog and only a real `event: ping` keeps them from aborting.
   */
  keepaliveFrame?: Uint8Array;
  /**
   * Frame emitted ONCE, immediately, as the very first byte of the slow path —
   * before the recurring `keepaliveFrame` ticks start. Defaults to
   * `keepaliveFrame` when omitted (today's behavior, unchanged).
   */
  startupFrame?: Uint8Array;
  /**
   * Optional parser-visible frame emitted at a slower cadence than the transport
   * heartbeat. A due application frame replaces that interval's keepalive frame,
   * so both cadences share one timer and never burst after an event-loop stall.
   */
  applicationKeepalive?: { frame: Uint8Array; intervalMs: number };
  /** Extra headers to include in the keepalive response (e.g. X-Correlation-Id). */
  extraHeaders?: Record<string, string>;
  /**
   * Frame emitted if the handler ultimately fails (or the upstream stream dies
   * mid-flight with zero bytes forwarded) after the slow path has already
   * committed to HTTP 200. Defaults to the Anthropic-style `event: error` frame
   * (correct for /v1/messages). OpenAI-format routes (/v1/chat/completions,
   * /v1/responses) MUST pass OPENAI_CHAT_ERROR_FRAME / OPENAI_RESPONSES_ERROR_FRAME
   * instead — see the doc comment on the default ERROR_FRAME above for why.
   */
  errorFrame?: Uint8Array;
  /**
   * Request correlation id, threaded from the route's own handleChat(...,
   * correlationId) call. When set, every byte this wrapper writes to the
   * client directly (startup frame, periodic keepalive ticks, and any
   * in-band error frame) — everything except the verbatim-forwarded real
   * response body, which the handler's own reqLogger already captures — is
   * recorded via earlyKeepaliveByteBuffer and merged into this same
   * request's call-log streamChunks.client by
   * chatCore/attemptLogging.ts, so the persisted artifact reflects what
   * actually went out on the wire instead of only what the inner handler
   * produced. Omit to leave today's behavior unchanged (no recording).
   */
  correlationId?: string;
  /**
   * Abort controller owned by the route via `withDeadlineSignal` (see below).
   * The wrapper aborts it when the slow-path deadline expires, so the handler —
   * which observes the combined signal through the wrapped request — tears down
   * exactly as on a client disconnect (concurrency slots released). Omit to run
   * without a deadline abort (tests may pass a bare controller; routes always
   * pass the one returned by the helper).
   */
  deadlineController?: AbortController | null;
  /**
   * Absolute last-resort bound for the slow path, in ms. Internal default
   * (SLOW_PATH_DEADLINE_MS); non-positive disables. Never an exposed setting.
   */
  slowPathDeadlineMs?: number;
  /**
   * Minimal logger for the single expiration line. Silent when omitted
   * (no console output from this module, ever).
   */
  log?: { warn: (tag: string, message: string) => void } | null;
};

/**
 * Last-resort slow-path deadline: 1 980 000 ms (33 min), derived from the
 * largest legitimate sequential waits inside the handler, plus margin:
 * rate-limit queue 300 s + park-and-resume 120 s + cooldown budgets 300 s +
 * first-byte readiness ceiling 600 s = 1 320 s, + 660 s margin (~50%).
 * Anything pending past this point is a stuck handler, not legitimate work.
 * Internal constant, never an exposed setting — routes share this default.
 */
export const SLOW_PATH_DEADLINE_MS = 1_980_000;

const deadlineControllers = new WeakMap<object, AbortController>();
// Lookup fallback across downstream rebuilds: `clone()` and admission
// `rebuildRequest` create NEW signal objects (verified: not identical, but
// following), so a signal-keyed map misses inside postHandler. The rebuilds DO
// preserve headers (`new Headers(request.headers)`), so the helper stamps an
// internal token header and registers the controller under that token too.
const DEADLINE_TOKEN_HEADER = "x-deadline-token";
const deadlineControllersByToken = new Map<string, WeakRef<AbortController>>();
const deadlineTokenByController = new WeakMap<AbortController, string>();
let deadlineTokenSeq = 0;
// The token map is keyed by strings, so its entries would otherwise outlive the
// request forever (one per streamed request → unbounded growth). Three layers keep
// it bounded: an explicit release when the keepalive wrapper finishes (settle,
// abort, cancel or expiry), a FinalizationRegistry backstop for requests that never
// reach the wrapper (non-streaming paths), and a hard size cap as a last resort.
const MAX_DEADLINE_TOKENS = 10_000;
const deadlineTokenFinalizer =
  typeof FinalizationRegistry === "function"
    ? new FinalizationRegistry<string>((token) => {
        const ref = deadlineControllersByToken.get(token);
        if (!ref || !ref.deref()) deadlineControllersByToken.delete(token);
      })
    : null;

/**
 * Drops the rebuild-fallback token entry for a deadline controller. Idempotent;
 * safe to call with null. The controller itself stays usable (abort still works).
 */
export function releaseDeadlineController(controller: AbortController | null | undefined): void {
  if (!controller) return;
  const token = deadlineTokenByController.get(controller);
  if (!token) return;
  deadlineTokenByController.delete(controller);
  const ref = deadlineControllersByToken.get(token);
  if (ref && ref.deref() === controller) deadlineControllersByToken.delete(token);
  try {
    deadlineTokenFinalizer?.unregister(controller);
  } catch {
    /* never throw from cleanup */
  }
}

/** Test-only: live size of the token fallback map. */
export function __getDeadlineTokenRegistrySizeForTests(): number {
  return deadlineControllersByToken.size;
}

/**
 * Route-side half of the slow-path deadline contract. Creates the internal
 * deadline controller and returns it alongside a request whose signal follows
 * both the client signal and the deadline (a self-cleaning merge — not
 * `AbortSignal.any`, whose composites Node pins in memory while they carry an
 * abort listener; see `streamDeadlineSignal.ts`), so the handler
 * observes a deadline abort exactly like a client disconnect.
 *
 * The wrapped request MUST be the one the route hands downstream (admission,
 * body parse, `handleChat`): the handler snapshots `request.signal` after
 * admission, so wrapping after that point would not propagate. Rebuild from
 * URL + public request fields instead of passing `request` as the Request
 * constructor input: packaged Next can hand us a Request branded by a different
 * Undici/realm instance, and `new Request(request, ...)` then trips that class's
 * private `#state` brand check. The body stream itself is safe to transfer.
 *
 * Controller recovery downstream (`getDeadlineController`) is two-layered:
 * the combined signal object (fast path — same object when nothing rebuilds),
 * plus an internal header token (rebuild path — `clone()` and admission
 * `rebuildRequest` mint new signal objects but copy headers). The token header
 * is scrubbed from the client-log envelope and executor client headers (same
 * treatment as the existing `x-omniroute-lease-*` control headers), so it never
 * reaches any upstream.
 */
export function withDeadlineSignal(request: Request): {
  wrappedReq: Request;
  deadlineController: AbortController;
} {
  const deadlineController = new AbortController();
  const combined = request.signal
    ? mergeAbortSignals(request.signal, deadlineController.signal)
    : deadlineController.signal;
  const headers = new Headers(request.headers);
  // Internal routing token only (never logged, never forwarded upstream — the
  // handler builds upstream headers from an allowlist). Survives clone() and
  // admission rebuilds, which both copy headers but mint new signal objects.
  const token = `dl-${Date.now().toString(36)}-${(deadlineTokenSeq += 1)}`;
  headers.set(DEADLINE_TOKEN_HEADER, token);
  const requestInit: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers,
    signal: combined,
  };
  if (request.method !== "GET" && request.method !== "HEAD" && request.body !== null) {
    requestInit.body = request.body;
    requestInit.duplex = "half";
  }
  const wrappedReq = new Request(request.url, requestInit);
  deadlineControllers.set(combined, deadlineController);
  deadlineControllersByToken.set(token, new WeakRef(deadlineController));
  deadlineTokenByController.set(deadlineController, token);
  deadlineTokenFinalizer?.register(deadlineController, token, deadlineController);
  while (deadlineControllersByToken.size > MAX_DEADLINE_TOKENS) {
    const oldest = deadlineControllersByToken.keys().next().value;
    if (oldest === undefined) break;
    deadlineControllersByToken.delete(oldest);
  }
  return { wrappedReq, deadlineController };
}

/**
 * Returns the deadline controller for a wrapped request, or null when the
 * request did not come from `withDeadlineSignal`. Survives downstream rebuilds
 * (`clone()`, admission `rebuildRequest`): those mint new signal objects (so the
 * signal-keyed map misses) but preserve headers, where the internal token
 * re-links to the same controller.
 */
export function getDeadlineController(request: {
  signal?: AbortSignal | null;
  headers?: Headers;
}): AbortController | null {
  const signal = request?.signal ?? null;
  if (signal) {
    const direct = deadlineControllers.get(signal);
    if (direct) return direct;
  }
  try {
    const token = request?.headers?.get(DEADLINE_TOKEN_HEADER);
    if (token) return deadlineControllersByToken.get(token)?.deref() ?? null;
  } catch {
    /* header access must never throw */
  }
  return null;
}

/**
 * Tagged with a string rather than an `ok: true | false` boolean: this workspace compiles
 * with `strictNullChecks: false`, where a boolean-literal discriminant narrows the positive
 * branch but not the negative one — so reading `.error` off the rejected arm did not
 * type-check. A string discriminant narrows both branches under the same settings.
 */
type SettledHandler =
  { status: "fulfilled"; response: Response } | { status: "rejected"; error: unknown };

export async function withEarlyStreamKeepalive(
  handlerPromise: Promise<Response>,
  options: EarlyStreamKeepaliveOptions = {}
): Promise<Response> {
  const thresholdMs = Math.max(0, options.thresholdMs ?? 2_000);
  // Cadence must stay under the client idle timeout, per the option docs below.
  // The old 2 500 ms default exceeded the ~2 s watchdog observed in practice, so
  // a client that survived the first keepalive byte aborted on the gap before the
  // next one. 1 500 ms keeps every inter-byte gap inside the same budget the
  // threshold uses (see keepaliveThreshold.ts).
  const intervalMs = Math.max(250, options.intervalMs ?? 1_500);
  const signal = options.signal ?? null;
  const keepaliveFrame = options.keepaliveFrame ?? KEEPALIVE_FRAME;
  const startupFrame = options.startupFrame ?? keepaliveFrame;
  const applicationKeepalive =
    options.applicationKeepalive && options.applicationKeepalive.intervalMs > 0
      ? {
          frame: options.applicationKeepalive.frame,
          intervalMs: Math.max(intervalMs, options.applicationKeepalive.intervalMs),
        }
      : null;
  const extraHeaders = options.extraHeaders ?? {};
  const errorFrame = options.errorFrame ?? ERROR_FRAME;
  // Single source of truth for THIS route's error-framing convention, derived from
  // errorFrame itself so the dynamic real-upstream-body case below stays consistent
  // with the static default-message case without a second option. Three shapes exist:
  //   - "anthropic": named SSE `event: error` line (Anthropic /v1/messages).
  //   - "responses": plain `data:` line, discriminated by a top-level `type` field
  //     inside the JSON payload (OpenAI Responses API convention).
  //   - "chat": plain `data:` line, discriminated by a top-level `error` key
  //     (OpenAI Chat Completions convention) — the default/fallback.
  const decodedErrorFrame = new TextDecoder().decode(errorFrame);
  const errorFrameFormat: "anthropic" | "responses" | "chat" = decodedErrorFrame.startsWith(
    "event:"
  )
    ? "anthropic"
    : (() => {
        const dataLine = decodedErrorFrame.match(/^data: (.+)\n\n$/);
        if (!dataLine) return "chat";
        try {
          const parsed = JSON.parse(dataLine[1]);
          return parsed && typeof parsed === "object" && "type" in parsed ? "responses" : "chat";
        } catch {
          return "chat";
        }
      })();
  // Terminal frame appended after partial content was already forwarded. The
  // zero-content path reuses `errorFrame` verbatim (it may carry a custom
  // message configured by the caller); after partial content the client only
  // needs a well-formed terminal marker for its format, so these frames use a
  // fixed generic message that matches what the internal pipeline's
  // resolveSilentCloseOutcome would have surfaced for the same condition.
  const buildPartialContentErrorFrame = (
    format: "anthropic" | "responses" | "chat"
  ): Uint8Array => {
    const message = "Upstream stream ended without a terminal marker.";
    if (format === "anthropic") {
      return ENCODER.encode(
        `event: error\ndata: ${JSON.stringify({
          error: { message, type: "stream_error" },
        })}\n\n`
      );
    }
    if (format === "responses") {
      return ENCODER.encode(
        `data: ${JSON.stringify({
          type: "error",
          code: null,
          message,
          param: null,
          sequence_number: SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
        })}\n\n`
      );
    }
    return ENCODER.encode(
      `data: ${JSON.stringify({
        error: { message, type: "stream_error" },
      })}\n\n`
    );
  };
  const correlationId = options.correlationId;
  const deadlineController = options.deadlineController ?? null;
  // Absolute last-resort bound, started at wrapper call time (not at slow-path
  // commit): covers fast-path stalls too, and stays exact when the deadline is
  // shorter than the threshold. Non-positive disables (explicit opt-out).
  const slowPathDeadlineMs = options.slowPathDeadlineMs ?? SLOW_PATH_DEADLINE_MS;
  const deadlineEnabled = Number.isFinite(slowPathDeadlineMs) && slowPathDeadlineMs > 0;
  const warn = options.log?.warn ?? null;
  const frameDecoder = correlationId ? new TextDecoder() : null;
  // Records every direct-to-client write EXCEPT the forwarded real response
  // body — that one is already captured by the handler's own reqLogger, so
  // recording it again here would duplicate it in the persisted artifact.
  const recordClientBytes = (chunk: Uint8Array): void => {
    if (!correlationId || !frameDecoder) return;
    recordEarlyKeepaliveBytes(correlationId, frameDecoder.decode(chunk));
  };

  // Settle into a tagged result so neither race branch leaves an unhandled
  // rejection when the threshold timer wins.
  const settled: Promise<SettledHandler> = handlerPromise.then(
    (response) => ({ status: "fulfilled" as const, response }),
    (error) => ({ status: "rejected" as const, error })
  );

  let timer: ReturnType<typeof setTimeout> | undefined;
  let deadlineTimer: ReturnType<typeof setTimeout> | undefined;
  if (deadlineEnabled) {
    deadlineTimer = setTimeout(() => {
      try {
        deadlineController?.abort();
      } catch {
        /* abort must never throw */
      }
    }, slowPathDeadlineMs);
    // NOTE: no unref on the deadline timer — it is the last-resort guarantee.
    // An unref'd timer lets a bare-node event loop drain (and a test runner go
    // idle) before firing, which would silently disable the deadline whenever
    // the process has no other pending work. The keepalive interval above stays
    // unref'd (throughput optimization); the deadline stays ref'd (correctness).
  }
  const raced = await Promise.race([
    settled.then((result) => ({ kind: "settled" as const, result })),
    new Promise<{ kind: "timeout" }>((resolve) => {
      timer = setTimeout(() => resolve({ kind: "timeout" }), thresholdMs);
    }),
  ]);
  if (timer) clearTimeout(timer);

  if (raced.kind === "settled") {
    // Fast path — return verbatim, or rethrow so the route's normal error handling runs.
    if (deadlineTimer) clearTimeout(deadlineTimer);
    releaseDeadlineController(deadlineController);
    const result = raced.result;
    if (result.status === "fulfilled") {
      const response = result.response;
      // A verbatim SSE body that fails mid-flight (ECONNRESET etc.) would
      // surface its raw error to the client as an abrupt transport close with
      // no terminal marker — the same disconnect-reporting gap the slow path
      // guards against. Wrap the body so a mid-flight failure appends one
      // format-correct terminal error frame. Healthy streams stay
      // byte-identical (frames are re-emitted unchanged, only the chunk
      // boundaries move); the wrapper adds no latency beyond holding back an
      // incomplete trailing frame until its blank line arrives.
      const wrapped = wrapFastPathSseResponse(response, {
        format: errorFrameFormat,
        buildFrame: buildPartialContentErrorFrame,
        configuredErrorFrame: errorFrame,
        recordGeneratedFrame: recordClientBytes,
      });
      if (wrapped) return wrapped;
      return response;
    }
    throw result.error;
  }

  // Slow path — open the SSE stream now and keep it warm until the handler resolves.
  // Cleanup state is hoisted so both start() and cancel() (client disconnect) can stop
  // the keepalive loop and cancel the upstream read.
  let stopKeepalive = () => {};
  let upstreamReader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let aborted = false;
  const stopDeadline = () => {
    if (deadlineTimer) {
      clearTimeout(deadlineTimer);
      deadlineTimer = undefined;
    }
    releaseDeadlineController(deadlineController);
  };

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let stopped = false;
      let streamErrored = false;
      let nextApplicationKeepaliveAt = applicationKeepalive
        ? performance.now() + applicationKeepalive.intervalMs
        : Number.POSITIVE_INFINITY;
      const interval = setInterval(() => {
        if (stopped) return;
        try {
          const now = performance.now();
          let frame = keepaliveFrame;
          if (applicationKeepalive && now >= nextApplicationKeepaliveAt) {
            frame = applicationKeepalive.frame;
            nextApplicationKeepaliveAt = now + applicationKeepalive.intervalMs;
          }
          controller.enqueue(frame);
          recordClientBytes(frame);
        } catch {
          stopped = true;
          clearInterval(interval);
        }
      }, intervalMs);
      if (typeof interval === "object" && interval !== null && "unref" in interval) {
        interval.unref?.();
      }
      // First frame immediately on commit so the client sees a byte right away.
      // An SSE comment here would be ignored by Anthropic clients' watchdog on a
      // sub-interval gap, defeating the keepalive for exactly the case it targets.
      try {
        controller.enqueue(startupFrame);
        recordClientBytes(startupFrame);
      } catch {
        /* consumer already gone */
      }

      stopKeepalive = () => {
        stopped = true;
        clearInterval(interval);
      };

      const onAbort = () => {
        if (aborted) return;
        // The route's combined signal follows the deadline controller through a merge
        // listener registered before onExpired, so a deadline abort can reach this
        // handler first. Route it to the expiry path so the error frame is still sent.
        if (deadlineEnabled && deadlineController?.signal.aborted) {
          onExpired();
          return;
        }
        aborted = true;
        stopDeadline();
        stopKeepalive();
        upstreamReader?.cancel().catch(() => {});
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };
      const onExpired = () => {
        // Absolute last resort: the handler never resolved within the deadline.
        // Abort the route-owned controller (the handler observes it exactly like
        // a client disconnect and releases its concurrency slots), emit the
        // route's error frame in-band, log one correlated line, and close.
        // Never the raw error — same generic frame as a handler failure.
        if (aborted) return;
        aborted = true;
        stopDeadline();
        stopKeepalive();
        try {
          deadlineController?.abort();
        } catch {
          /* abort must never throw */
        }
        try {
          controller.enqueue(errorFrame);
          recordClientBytes(errorFrame);
        } catch {
          /* consumer gone */
        }
        try {
          warn?.(
            "EARLY_KEEPALIVE",
            `slow-path deadline expired after ${slowPathDeadlineMs}ms` +
              (correlationId ? ` correlationId=${correlationId}` : "")
          );
        } catch {
          /* logging must never break the stream */
        }
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };
      let deadlineListenerAttached = false;
      if (deadlineEnabled && deadlineController) {
        if (deadlineController.signal.aborted) {
          onExpired();
        } else {
          deadlineController.signal.addEventListener("abort", onExpired, { once: true });
          deadlineListenerAttached = true;
        }
      }
      signal?.addEventListener("abort", onAbort, { once: true });
      // addEventListener does not replay an abort that happened before registration.
      // Checking after registration closes that gap without missing a concurrent abort.
      if (signal?.aborted) onAbort();

      try {
        const result = await settled;
        stopDeadline();
        stopKeepalive();
        if (aborted) {
          // The synthetic keepalive response can be cancelled before the handler resolves.
          // Cancel the eventual real response so its upstream work and lifecycle hooks finish.
          if (result.status === "fulfilled" && result.response.body) {
            await result.response.body.cancel().catch(() => undefined);
          }
          return;
        }

        if (result.status === "rejected") {
          // Handler rejected — emit a generic error frame (never the raw error/stack).
          controller.enqueue(errorFrame);
          recordClientBytes(errorFrame);
        } else {
          const response = result.response;
          const contentType = (response.headers.get("content-type") || "").toLowerCase();
          const isSse = contentType.includes("text/event-stream");

          if (response.body && isSse) {
            // Real SSE stream — forward it verbatim.
            upstreamReader = response.body.getReader();
            let bytesForwarded = 0;
            try {
              while (true) {
                const { done, value } = await upstreamReader.read();
                if (done) break;
                if (value) {
                  controller.enqueue(value);
                  bytesForwarded += value.byteLength;
                }
              }
            } catch {
              if (aborted) return;
              if (bytesForwarded === 0) {
                controller.enqueue(errorFrame);
                recordClientBytes(errorFrame);
              } else {
                // The last forwarded bytes may end inside an SSE frame. Fail the
                // transport instead of appending invalid SSE or reporting clean EOF.
                // Never expose the upstream exception, its stack, or its cause.
                //
                // Deliberate asymmetry with the fast path (#17292): here the bytes
                // already left this process un-buffered, so a half-written `data:`
                // line cannot be withdrawn and a terminal frame would merge into it.
                // Rejecting the read is the only outcome that cannot be mistaken
                // for a clean EOF; the fast path buffers whole frames, so it can
                // discard the incomplete one and append a parseable terminal event.
                streamErrored = true;
                controller.error(new Error("Upstream stream failed before completion."));
              }
            }
          } else {
            // Non-SSE response (e.g. a JSON error) reached us after we already
            // committed to a 200 event-stream, so the HTTP status can no longer
            // change. Frame the (already-sanitized) body as an in-band error event
            // instead of forwarding raw JSON, which would be malformed SSE.
            const text = response.body ? await response.text().catch(() => "") : "";
            const dataLine =
              errorFrameFormat === "responses"
                ? buildResponsesErrorDataLine(text, {
                    status: response.status,
                    retryAfterSeconds: readRetryAfterSeconds(response.headers),
                  })
                : text.trim() ||
                  JSON.stringify({ error: { message: "stream_error", type: "stream_error" } });
            const framed =
              errorFrameFormat === "anthropic"
                ? `event: error\ndata: ${dataLine}\n\n`
                : `data: ${dataLine}\n\n`;
            const framedBytes = ENCODER.encode(framed);
            controller.enqueue(framedBytes);
            recordClientBytes(framedBytes);
          }
        }
      } catch {
        // Defensive: never surface a raw error/stack to the client.
        if (!aborted) {
          try {
            controller.enqueue(errorFrame);
            recordClientBytes(errorFrame);
          } catch {
            /* consumer gone */
          }
        }
      } finally {
        stopDeadline();
        stopKeepalive();
        signal?.removeEventListener("abort", onAbort);
        if (deadlineListenerAttached && deadlineController) {
          deadlineController.signal.removeEventListener("abort", onExpired);
        }
        try {
          if (!streamErrored) controller.close();
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      // Consumer (Next.js → client) went away — stop keepalives and release the upstream.
      aborted = true;
      stopDeadline();
      stopKeepalive();
      upstreamReader?.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // This early-keepalive response IS the response the client receives while
      // the real turn is still prefilling — the worst possible stream for a
      // buffering reverse proxy to sit on. Same no-buffering instruction the
      // central header path already sets.
      "X-Accel-Buffering": "no",
      ...extraHeaders,
    },
  });
}
