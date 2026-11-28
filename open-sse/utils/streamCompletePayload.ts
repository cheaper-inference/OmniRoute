import { FORMATS } from "../translator/formats.ts";
import { unwrapGeminiChunk } from "./streamHelpers.ts";

export type StreamCompletePayload = {
  buyerCostMicro?: number | null;
  status: number;
  /** The upstream supplied a terminal marker before the transform synthesized any output. */
  upstreamTerminalObserved?: boolean;
  usage: unknown;
  /** Minimal response body for call log (streaming: usage + note; non-streaming not used) */
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
  error?: string | null;
  errorCode?: string | null;
  /**
   * Time-to-first-forwarded-SSE-chunk in ms, or null when nothing was forwarded.
   * NOT token-level TTFT — see open-sse/utils/streamTiming.ts for what is measured.
   */
  ttft?: number | null;
  firstOutputMs?: number | null; // StreamTiming.firstOutputMs(); the caller adds pre-stream time
  /** Mean inter-chunk gap in ms (chunk-latency proxy for ITL), or null. */
  itlMs?: number | null;
  /** True when the stream was interrupted (timeout/abort/error) before a clean finish. */
  interrupted?: boolean;
  cacheEvidence?: "hit" | "miss" | "unreported" | "invalid";
  /**
   * Encrypted-reasoning observation (Responses opaque `reasoning` items):
   * flag when seen, wall-clock added→done delta when paired. Efforts are
   * read at the sink from the request bodies — never threaded here.
   */
  reasoningMeta?: {
    encryptedSeen: boolean;
    durationMs: number | null;
  } | null;
};

const TERMINAL_STREAM_EVENT_TYPES = new Set([
  "message_stop",
  "response.completed",
  "response.incomplete",
  "response.failed",
  "response.done",
  "response.cancelled",
  "response.canceled",
]);
const UNSUCCESSFUL_RESPONSE_STATES = new Set(["failed", "cancelled", "canceled"]);

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/** Detect a parsed terminal to distinguish a malformed tail from a malformed unfinished stream. */
export function isTerminalStreamPayload(
  payload: unknown,
  requireFinishReasonString = false
): boolean {
  const record = asRecord(payload);
  if (record.done === true) return true;
  if (typeof record.type === "string" && TERMINAL_STREAM_EVENT_TYPES.has(record.type)) return true;
  const finished = (list: unknown, key: string) =>
    Array.isArray(list) &&
    list.some((entry) => {
      const reason = asRecord(entry)[key];
      return requireFinishReasonString
        ? typeof reason === "string" && !!reason.trim()
        : reason != null;
    });
  return finished(record.choices, "finish_reason") || finished(record.candidates, "finishReason");
}

function isUnsuccessfulResponsesTerminal(payload: Record<string, unknown>): boolean {
  if (typeof payload.type !== "string" || !TERMINAL_STREAM_EVENT_TYPES.has(payload.type)) {
    return false;
  }
  const status = asRecord(payload.response).status;
  return (
    UNSUCCESSFUL_RESPONSE_STATES.has(payload.type.slice("response.".length)) ||
    (typeof status === "string" && UNSUCCESSFUL_RESPONSE_STATES.has(status))
  );
}

/** Raw upstream evidence survives synthetic output and preserves the verdict of an explicit failure. */
export function createUpstreamTerminalObserver() {
  let observed = false;
  let failed = false;
  return {
    observe(payload: unknown, format?: string | null) {
      const record = asRecord(payload);
      const parsed =
        format === FORMATS.GEMINI || format === FORMATS.ANTIGRAVITY
          ? unwrapGeminiChunk(record)
          : record;
      if (!isTerminalStreamPayload(parsed, true)) return;
      if (isUnsuccessfulResponsesTerminal(parsed)) failed = true;
      else observed = true;
    },
    noteDone() {
      observed = true;
    },
    wasObserved() {
      return observed && !failed;
    },
  };
}

/** Add the latest observed provider charge only when completion logging is enabled. */
export function withBuyerCostMicro(
  callback: ((payload: StreamCompletePayload) => void) | null,
  readCost: () => number | null
) {
  if (!callback) return null;
  return (payload: StreamCompletePayload) => callback({ ...payload, buyerCostMicro: readCost() });
}
