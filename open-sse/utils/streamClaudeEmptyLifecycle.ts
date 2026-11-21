/**
 * Claude SSE empty-response lifecycle: tracks which message events a Claude stream has shown, so
 * stream.ts can synthesize the missing content/finalizer events (or leave a clean empty
 * end_turn alone). Moved out of stream.ts, which has a frozen size cap.
 */
type JsonRecord = Record<string, unknown>;

type ClaudeEmptyResponseLifecycle = {
  hasMessageStart: boolean;
  hasContentBlock: boolean;
  hasMessageDelta: boolean;
  hasMessageStop: boolean;
  hasError: boolean;
  stopReason: string | null;
  syntheticContentInjected: boolean;
  warningLogged: boolean;
  /** Native Claude upstream (passthrough): a clean empty end_turn is a real answer. A translated
   * upstream (for example an empty OpenAI stop) keeps the mid-stream empty_response error. */
  trustCleanEmptyStop?: boolean;
};

export const SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT = "";
// Same set as CLEAN_EMPTY_STOP_REASONS in streamClaudeEmptyBody.ts (not exported there).
const CLEAN_EMPTY_CLAUDE_STOP_REASONS = new Set(["end_turn", "stop_sequence", "refusal"]);

export function createClaudeEmptyResponseLifecycle(): ClaudeEmptyResponseLifecycle {
  return {
    hasMessageStart: false,
    hasContentBlock: false,
    hasMessageDelta: false,
    hasMessageStop: false,
    hasError: false,
    stopReason: null,
    syntheticContentInjected: false,
    warningLogged: false,
  };
}

function getClaudeEventType(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const type = (payload as JsonRecord).type;
  return typeof type === "string" ? type : null;
}

export function isClaudeEventPayload(payload: unknown): boolean {
  return getClaudeEventType(payload) !== null;
}

export function updateClaudeEmptyResponseLifecycle(
  lifecycle: ClaudeEmptyResponseLifecycle,
  payload: unknown
) {
  const type = getClaudeEventType(payload);
  if (!type) return;

  switch (type) {
    case "message_start":
      lifecycle.hasMessageStart = true;
      break;
    case "content_block_start":
    case "content_block_delta":
    case "content_block_stop":
      lifecycle.hasContentBlock = true;
      break;
    case "message_delta":
      lifecycle.hasMessageDelta = true;
      {
        const delta = (payload as JsonRecord).delta;
        const reason =
          delta && typeof delta === "object" ? (delta as JsonRecord).stop_reason : null;
        if (typeof reason === "string" && reason) lifecycle.stopReason = reason;
      }
      break;
    case "message_stop":
      lifecycle.hasMessageStop = true;
      break;
    case "error":
      lifecycle.hasError = true;
      break;
    default:
      break;
  }
}

function hasClaudeAssistantLifecycle(lifecycle: ClaudeEmptyResponseLifecycle): boolean {
  return lifecycle.hasMessageStart || lifecycle.hasMessageDelta || lifecycle.hasMessageStop;
}

export function shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
  lifecycle: ClaudeEmptyResponseLifecycle,
  payload: unknown
): boolean {
  const type = getClaudeEventType(payload);
  if (!type || lifecycle.hasError || lifecycle.hasContentBlock) return false;
  if (!hasClaudeAssistantLifecycle(lifecycle)) return false;
  const delta = (payload as JsonRecord).delta;
  // A bare `event: message_delta` line: its data line carries the stop_reason and decides.
  if (type === "message_delta" && !delta) return false;
  // A refusal has no content by design; forward it so the client sees why. A clean
  // end_turn / stop_sequence is a real empty answer: flush still aborts when
  // message_stop never arrives (shouldAbortEmptyClaudeStream).
  const stopReason =
    (delta && typeof delta === "object" ? (delta as JsonRecord).stop_reason : null) ??
    lifecycle.stopReason;
  if (stopReason === "refusal") return false;
  if (lifecycle.trustCleanEmptyStop && CLEAN_EMPTY_CLAUDE_STOP_REASONS.has(stopReason as string))
    return false;
  return type === "message_delta" || type === "message_stop";
}

export function shouldInjectClaudeMissingFinalizersOnFlush(
  lifecycle: ClaudeEmptyResponseLifecycle
): boolean {
  if (lifecycle.hasError || !lifecycle.syntheticContentInjected) return false;
  return !lifecycle.hasMessageDelta || !lifecycle.hasMessageStop;
}

export function buildSyntheticClaudeEmptyResponseEvents(
  lifecycle: ClaudeEmptyResponseLifecycle,
  model: string | null,
  options: {
    includeContentBlock?: boolean;
    includeMessageDelta?: boolean;
    includeMessageStop?: boolean;
  } = {}
): JsonRecord[] {
  const {
    includeContentBlock = true,
    includeMessageDelta = false,
    includeMessageStop = false,
  } = options;
  const events: JsonRecord[] = [];
  const resolvedModel = typeof model === "string" && model ? model : "unknown";

  if (includeContentBlock) {
    if (!lifecycle.hasMessageStart) {
      events.push({
        type: "message_start",
        message: {
          id: `msg_synthetic_${Date.now()}`,
          type: "message",
          role: "assistant",
          model: resolvedModel,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      });
    }

    events.push(
      {
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: {
          type: "text_delta",
          text: SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT,
        },
      },
      {
        type: "content_block_stop",
        index: 0,
      }
    );
  }

  if (includeMessageDelta) {
    events.push({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 0 },
    });
  }

  if (includeMessageStop) {
    events.push({ type: "message_stop" });
  }

  return events;
}
