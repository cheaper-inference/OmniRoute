/**
 * Truncated-stream verdict shared by the buffered-SSE parsers (#18432).
 *
 * When an upstream event stream is buffered for a NON-streaming client and closes
 * before its format's terminal signal, the parsers used to fall back to a "finished"
 * default (`finish_reason: "stop"`, Claude `stop_reason: "end_turn"`, Responses status
 * `in_progress` → chat `stop`). The client then received HTTP 200 + a clean stop on a
 * partial answer. A turn that produced output but never reached its terminal signal is
 * reported as cut short instead — the same surface a budget cut already uses, so every
 * existing consumer (finish_reason checks, the Responses `incomplete` mapping in
 * `finalizeResponsesTerminalStatus`, Claude `max_tokens`) understands it. This mirrors
 * the streaming path's #7699 graceful truncation (`stop_reason: "max_tokens"`).
 *
 * Terminal signals per format (anything else is a cut stream):
 * - OpenAI chat chunks: any `choices[0].finish_reason`, or a `data: [DONE]` line.
 * - Claude messages events: `message_stop`, a `message_delta` carrying `stop_reason`,
 *   or `data: [DONE]` (appended by some relays).
 * - Gemini / Antigravity: a candidate `finishReason`, or `data: [DONE]`.
 * - OpenAI Responses: a `response.completed|done|incomplete|failed|cancelled` event
 *   (or a settled snapshot status). `[DONE]` alone is NOT terminal there: Responses
 *   streams end with `response.completed`, and in-process wrappers append `[DONE]`
 *   on close regardless of how the upstream ended (same rule as the streaming path).
 *
 * A cut stream may also stop in the middle of a tool call. Its calls are withheld unless
 * every one is complete (`withholdCutToolCalls`), so the turn reads as cut short instead
 * of a `tool_calls` turn with half-written arguments.
 */

/** OpenAI chat / Gemini (via chat.completion) finish_reason for a cut turn. */
export const TRUNCATED_STREAM_FINISH_REASON = "length";

/** Claude stop_reason for a cut turn (maps to OpenAI `length`). */
export const TRUNCATED_STREAM_CLAUDE_STOP_REASON = "max_tokens";

/** Responses `incomplete_details.reason` for a cut turn (maps to OpenAI `length`). */
export const TRUNCATED_STREAM_RESPONSES_INCOMPLETE_REASON = "max_output_tokens";

/** True when the raw SSE body carries a `data: [DONE]` line. */
export function hasSseDoneMarker(rawSSE: unknown): boolean {
  const text = String(rawSSE || "");
  if (!text.includes("[DONE]")) return false;
  return text.split("\n").some((line) => {
    const trimmed = line.trim();
    return trimmed.startsWith("data:") && trimmed.slice(5).trim() === "[DONE]";
  });
}

/**
 * Parsed bodies that carry the cut-stream verdict above (#18460 follow-up). A WeakSet,
 * so the marker never reaches a serialized response body and dies with the object. It
 * separates a cut stream from a `length` / `max_tokens` / `incomplete` the upstream sent
 * itself, which a client sees the same way; `parseNonStreamingResponseBody` moves it onto
 * the upstream Response (`truncatedStreamPolicy.ts`) so combos can fail over.
 */
const truncatedStreamBodies = new WeakSet<object>();

/**
 * Tag `body` (a parser result) as the product of a stream cut before its terminal signal.
 * `cut: false` leaves it untagged, so parsers can pass their verdict straight through.
 */
export function markTruncatedStreamBody<T>(body: T, cut = true): T {
  if (cut && body && typeof body === "object") truncatedStreamBodies.add(body);
  return body;
}

/** True when `body` was produced from a stream cut before its terminal signal. */
export function isTruncatedStreamBody(body: unknown): boolean {
  return !!body && typeof body === "object" && truncatedStreamBodies.has(body);
}

/**
 * True when a buffered tool call's accumulated `arguments` is a complete JSON object
 * (#18460 follow-up). Function-call arguments are always a JSON object, so a cut in the
 * middle of the call leaves text that either fails to parse or is empty. Empty text counts
 * as complete only when the upstream closed the call itself (`closedByUpstream`: Claude
 * `content_block_stop`, Responses `function_call_arguments.done` / `output_item.done`),
 * because a no-argument tool can legitimately stream nothing before its close event.
 */
export function isCompleteToolCallArguments(args: unknown, closedByUpstream = false): boolean {
  const text = typeof args === "string" ? args.trim() : "";
  if (text.length === 0) return closedByUpstream;
  try {
    const parsed: unknown = JSON.parse(text);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

/**
 * Tool calls a cut stream may still present (#18460 follow-up). When the stream reached
 * its terminal signal (`streamCut` false), or every call is complete, the calls pass
 * through unchanged. Otherwise ALL of them are withheld, not only the broken one: a
 * message that still carries `tool_calls` is re-labelled `finish_reason: "tool_calls"` by
 * the parser T18 rule and by both client normalizations (`normalizeOpenAIToolFinishReasons`,
 * `sanitizeOpenAIResponse`), which would hide the cut and let the client run a partial plan
 * of a turn the model never finished. With no calls left the turn reads as cut short.
 */
export function withholdCutToolCalls<T>(
  streamCut: boolean,
  toolCalls: T[],
  isComplete: (toolCall: T) => boolean
): T[] {
  if (!streamCut || toolCalls.every(isComplete)) return toolCalls;
  return [];
}
