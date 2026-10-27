/**
 * @file responsesKeepaliveFrame.ts
 * @description Spec-valid synthetic `response.in_progress` keepalive frames (#17825).
 *
 * Spec-validating Responses clients (Vercel AI SDK `@ai-sdk/openai`) require
 * `response.id`, `response.created_at` and `response.model` on `response.in_progress`
 * and abort the whole stream on a stub `{id, status}` object. The builder emits the
 * full Response shape; the tracker lets mid-stream heartbeats reuse the identity of
 * the real stream once its `response.created` has passed through.
 */
import {
  SYNTHETIC_RESPONSES_KEEPALIVE_ID,
  SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
} from "./responsesSequence.ts";

const FRAME_ENCODER = new TextEncoder();
const TRACKER_DECODER = new TextDecoder();
const MAX_PENDING_LINE_CHARS = 256 * 1024;

/** Brand-neutral model name for keepalives sent before any model is known. */
export const KEEPALIVE_FALLBACK_MODEL = "keepalive";

export type ResponsesInProgressFrameInput = {
  id?: string;
  createdAt?: number;
  model?: string;
  sequenceNumber?: number;
};

/** Per-request synthetic response id (`resp_keepalive_<uuid>`). */
export function buildKeepaliveResponseId(): string {
  const unique =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${SYNTHETIC_RESPONSES_KEEPALIVE_ID}_${unique}`;
}

/** SSE `data:` text of a complete `response.in_progress` event. */
export function buildResponsesInProgressPayload(input: ResponsesInProgressFrameInput = {}): string {
  const event = {
    type: "response.in_progress",
    sequence_number: input.sequenceNumber ?? SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
    response: {
      id: input.id || SYNTHETIC_RESPONSES_KEEPALIVE_ID,
      object: "response",
      created_at: input.createdAt ?? Math.floor(Date.now() / 1000),
      status: "in_progress",
      model: input.model || KEEPALIVE_FALLBACK_MODEL,
      output: [],
      error: null,
      incomplete_details: null,
      background: false,
      parallel_tool_calls: true,
      tool_choice: "auto",
      tools: [],
    },
  };
  return `data: ${JSON.stringify(event)}\n\n`;
}

/** Encoded variant of {@link buildResponsesInProgressPayload}. */
export function buildResponsesInProgressFrame(
  input: ResponsesInProgressFrameInput = {}
): Uint8Array {
  return FRAME_ENCODER.encode(buildResponsesInProgressPayload(input));
}

type TrackedIdentity = { id: string; createdAt: number; model: string; sequenceNumber: number };

function readIdentity(line: string): TrackedIdentity | null {
  if (!line.startsWith("data:")) return null;
  if (!line.includes('"response.created"') && !line.includes('"response.in_progress"')) {
    return null;
  }
  try {
    const event = JSON.parse(line.slice(5).trim());
    const response = event?.response;
    if (!response || typeof response.id !== "string") return null;
    if (typeof response.created_at !== "number" || typeof response.model !== "string") {
      return null;
    }
    const seq = Number.isFinite(event.sequence_number) ? event.sequence_number : 1;
    return {
      id: response.id,
      createdAt: response.created_at,
      model: response.model,
      sequenceNumber: seq,
    };
  } catch {
    return null;
  }
}

/**
 * Observes the passing SSE bytes and remembers the identity of the real response so
 * keepalive frames can reuse it. Never throws; tolerates frames split across chunks.
 */
export function createResponsesInProgressTracker() {
  let pending = "";
  let identity: TrackedIdentity | null = null;

  return {
    observe(chunk: Uint8Array): void {
      try {
        pending += TRACKER_DECODER.decode(chunk, { stream: true });
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";
        if (pending.length > MAX_PENDING_LINE_CHARS) pending = "";
        for (const line of lines) {
          const found = readIdentity(line.replace(/\r$/, ""));
          if (found) identity = found;
        }
      } catch {
        pending = "";
      }
    },
    payload(): string {
      return buildResponsesInProgressPayload(identity ?? {});
    },
  };
}
