/**
 * Pure end-of-turn helpers for `createSSEStream` (stream.ts) and its flush tail
 * (translateFlushTail.ts): which upstream payloads end a turn, and the `[DONE]` marker the
 * response translators read at stream end. No stream state lives here.
 */

type JsonRecord = Record<string, unknown>;

/** The slice of translator state that records the upstream's `[DONE]` marker. */
export type DoneMarkerState = {
  /** The upstream sent `[DONE]`: its end of stream is a finish, not a cut. */
  doneMarkerSeen?: boolean;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

const TERMINAL_STREAM_EVENT_TYPES = new Set([
  "message_stop",
  "response.completed",
  "response.incomplete",
  "response.failed",
  "response.done",
  "response.cancelled",
  "response.canceled",
]);

/** True for a parsed upstream payload that ends its turn: `[DONE]`, a finish reason or a terminal event. */
export function isTerminalStreamPayload(payload: unknown): boolean {
  const record = asRecord(payload);
  if (record.done === true) return true;
  if (typeof record.type === "string" && TERMINAL_STREAM_EVENT_TYPES.has(record.type)) return true;
  const finished = (list: unknown, key: string) =>
    Array.isArray(list) && list.some((entry) => asRecord(entry)[key] != null);
  return finished(record.choices, "finish_reason") || finished(record.candidates, "finishReason");
}

/**
 * True when `parsed` is the upstream's `[DONE]` marker; it then records the marker on `state`.
 * The translators flush at stream end and read `doneMarkerSeen`: `[DONE]` means the upstream
 * finished, not a cut. A final `[DONE]` with no trailing newline counts the same.
 */
export function markUpstreamDone(
  parsed: unknown,
  state: DoneMarkerState | null | undefined
): boolean {
  if (!asRecord(parsed).done) return false;
  if (state) state.doneMarkerSeen = true;
  return true;
}
