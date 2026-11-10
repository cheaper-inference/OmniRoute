import { transformStreamWithCancel } from "./cancelableTransformStream.ts";
/**
 * @file sseHeartbeat.ts
 * @description Mid-stream SSE heartbeat transform (comment / Anthropic ping / OpenAI chunk).
 *
 * @changes
 * - [2026-07-28] [Cursor Grok 4.5] - Brand-neutral default OpenAI keepalive id/model
 */
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  buildResponsesInProgressPayload,
  createResponsesInProgressTracker,
} from "./responsesKeepaliveFrame.ts";

const HEARTBEAT_ENCODER = new TextEncoder();
// #14330 / #15202 / #17825: the keepalive must be a complete, spec-valid Responses event
// (sequence_number, string response.id, created_at, model, ...) — see responsesKeepaliveFrame.ts.
const OPENAI_RESPONSES_IN_PROGRESS_PAYLOAD = buildResponsesInProgressPayload();

export const DEFAULT_SSE_HEARTBEAT_INTERVAL_MS = 15_000;

/** Transport liveness without inventing a response identity or lifecycle event. */
export const RESPONSES_KEEPALIVE_FRAME = HEARTBEAT_ENCODER.encode("\n\n");

/**
 * Responses keepalive shape (RESPONSES_TRANSPORT_KEEPALIVE_ENABLED, default off). Off, timers send
 * the spec-valid response.in_progress event, as they always did. On, they send only a blank line,
 * which a synthetic snapshot cannot replace in the official SDK, but which also dispatches no SSE
 * event, so a client watchdog that resets only on events would not be reset.
 */
export function isResponsesTransportKeepaliveEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("RESPONSES_TRANSPORT_KEEPALIVE_ENABLED");
  } catch {
    // no-effect: an unreadable flag store keeps the response.in_progress keepalive
    return false;
  }
}

/** Shared Responses API heartbeat frame for early and mid-stream keepalives. */
export const OPENAI_RESPONSES_IN_PROGRESS_FRAME = HEARTBEAT_ENCODER.encode(
  OPENAI_RESPONSES_IN_PROGRESS_PAYLOAD
);

export const HEARTBEAT_SHAPES = {
  COMMENT: "comment",
  ANTHROPIC_PING: "anthropic-ping",
  OPENAI_CHUNK: "openai-chunk",
  OPENAI_RESPONSES_IN_PROGRESS: "openai-responses-in-progress",
} as const;

export type HeartbeatShape = (typeof HEARTBEAT_SHAPES)[keyof typeof HEARTBEAT_SHAPES];

export const DEFAULT_SSE_HEARTBEAT_SHAPE: HeartbeatShape = HEARTBEAT_SHAPES.COMMENT;

export function shapeForClientFormat(
  clientResponseFormat: string | undefined | null
): HeartbeatShape {
  switch (clientResponseFormat) {
    case "claude":
      return HEARTBEAT_SHAPES.ANTHROPIC_PING;
    case "openai":
      return HEARTBEAT_SHAPES.OPENAI_CHUNK;
    case "openai-responses":
      return HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS;
    default:
      return HEARTBEAT_SHAPES.COMMENT;
  }
}

function buildHeartbeatPayload(
  shape: HeartbeatShape,
  opts: { chunkId?: string; chunkModel?: string; responsesPayload?: () => string } = {}
): string {
  switch (shape) {
    case HEARTBEAT_SHAPES.ANTHROPIC_PING:
      return 'event: ping\ndata: {"type":"ping"}\n\n';
    case HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS:
      return opts.responsesPayload?.() ?? OPENAI_RESPONSES_IN_PROGRESS_PAYLOAD;
    case HEARTBEAT_SHAPES.OPENAI_CHUNK: {
      const payload = {
        id: opts.chunkId ?? "chatcmpl-keepalive",
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: opts.chunkModel ?? "keepalive",
        // Transport liveness must not initialize a client message before its role (#18410).
        choices: [],
      };
      return `data: ${JSON.stringify(payload)}\n\n`;
    }
    case HEARTBEAT_SHAPES.COMMENT:
    default:
      return `: keepalive ${new Date().toISOString()}\n\n`;
  }
}

type SseHeartbeatTransformOptions = {
  intervalMs?: number;
  signal?: AbortSignal;
  shape?: HeartbeatShape;
  chunkId?: string;
  chunkModel?: string;
};

/**
 * Whether OmniRoute may emit SSE `:` comment lines (e.g. the `: keepalive` heartbeat).
 * Some strict OpenAI-compatible clients parse every SSE line as JSON and crash on `:` comments.
 * Set OMNIROUTE_SSE_COMMENTS=on to enable comment-shaped heartbeats and telemetry trailers.
 * #10524: defaults to disabled — strict SSE clients (WorkBuddy, etc.) break on `: x-omniroute-*`
 * comment lines. Operators who want the telemetry can opt in with OMNIROUTE_SSE_COMMENTS=on.
 */
export function sseCommentsEnabled(): boolean {
  // SSR/edge safety: `process` is not defined in Workers/Deno/edge runtimes.
  if (typeof process === "undefined") return false;
  const v = process.env.OMNIROUTE_SSE_COMMENTS;
  if (v === undefined || v === "") return false;
  const normalized = v.trim().toLowerCase();
  return normalized === "on" || normalized === "true" || normalized === "1" || normalized === "yes";
}

/**
 * Tracks SSE framing over raw bytes so a timer never splices a heartbeat mid-event.
 * Scans ASCII separators, not payload characters. A chunk can end inside JSON, a CRLF
 * pair or a UTF-8 code point; no timer may splice bytes there.
 */
function createSseFramingTracker() {
  let atEventBoundary = true;
  let lineHasBytes = false;
  let pendingCR = false;
  return {
    note(chunk: Uint8Array): void {
      for (const byte of chunk) {
        if (pendingCR) {
          pendingCR = false;
          if (byte === 10) continue;
        }
        if (byte === 10 || byte === 13) {
          atEventBoundary = !lineHasBytes;
          lineHasBytes = false;
          pendingCR = byte === 13;
        } else {
          lineHasBytes = true;
          atEventBoundary = false;
        }
      }
    },
    atBoundary: (): boolean => atEventBoundary,
  };
}

export function createSseHeartbeatTransform({
  intervalMs = DEFAULT_SSE_HEARTBEAT_INTERVAL_MS,
  signal,
  shape = DEFAULT_SSE_HEARTBEAT_SHAPE,
  chunkId,
  chunkModel,
}: SseHeartbeatTransformOptions = {}): TransformStream<Uint8Array, Uint8Array> {
  if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
    return new TransformStream<Uint8Array, Uint8Array>();
  }

  // Opt-out for strict OpenAI-compatible clients that JSON.parse every SSE line and
  // crash on `:` comment heartbeats. OMNIROUTE_SSE_COMMENTS=off disables comment-shaped
  // heartbeats (they become a no-op); valid `data:` heartbeats are unaffected.
  if (!sseCommentsEnabled() && shape === HEARTBEAT_SHAPES.COMMENT) {
    return new TransformStream<Uint8Array, Uint8Array>();
  }

  let intervalId: ReturnType<typeof setInterval> | undefined;
  const isResponsesShape = shape === HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS;
  const transportOnly = isResponsesShape && isResponsesTransportKeepaliveEnabled();
  const responsesTracker =
    isResponsesShape && !transportOnly ? createResponsesInProgressTracker() : null;
  const framing = createSseFramingTracker();

  const stop = () => {
    if (!intervalId) return;
    globalThis.clearInterval(intervalId);
    intervalId = undefined;
  };

  return transformStreamWithCancel<Uint8Array, Uint8Array>({
    start(controller) {
      intervalId = globalThis.setInterval(() => {
        if (signal?.aborted) {
          stop();
          return;
        }

        if (!framing.atBoundary()) return;
        try {
          controller.enqueue(
            transportOnly
              ? RESPONSES_KEEPALIVE_FRAME
              : HEARTBEAT_ENCODER.encode(
                  buildHeartbeatPayload(shape, {
                    chunkId,
                    chunkModel,
                    responsesPayload: responsesTracker
                      ? () => responsesTracker.payload()
                      : undefined,
                  })
                )
          );
        } catch {
          stop();
        }
      }, intervalMs);

      if (intervalId && typeof intervalId === "object" && "unref" in intervalId) {
        intervalId.unref?.();
      }

      signal?.addEventListener("abort", stop, { once: true });
    },

    transform(chunk, controller) {
      framing.note(chunk);
      responsesTracker?.observe(chunk);
      controller.enqueue(chunk);
    },

    flush() {
      stop();
    },

    cancel() {
      stop();
    },
  });
}
