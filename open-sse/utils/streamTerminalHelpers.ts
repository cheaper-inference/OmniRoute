/**
 * Pure end-of-turn helpers for `createSSEStream` (stream.ts): which upstream payloads end a
 * turn. No stream state lives here.
 */

type JsonRecord = Record<string, unknown>;

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
