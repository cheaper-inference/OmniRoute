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
