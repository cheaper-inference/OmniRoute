/**
 * Pure helpers for `createSSEStream` (stream.ts): the pending-line size cap and the
 * completion-summary pieces (native tool calls, text-tail marker). No stream state lives here.
 */

type JsonRecord = Record<string, unknown>;

export type StreamToolCall = {
  id: string | null;
  index: number;
  type: string;
  function: { name: string; arguments: string };
};

/**
 * Longest upstream SSE line (bytes, newline excluded) the stream keeps in memory. A line past
 * it ends the stream with one error frame. Generous on purpose (same size as the non-streaming
 * response cap): one inline base64 image frame can reach tens of MiB.
 */
export const MAX_PENDING_SSE_LINE_BYTES = 64 * 1024 * 1024;

/**
 * Same window as `appendBoundedText` in streamHelpers.ts. Streamed answer text at or past it
 * has lost its head, so the summary is only a log tail and must not be cached as the answer.
 */
const SUMMARY_TEXT_WINDOW_CHARS = 64 * 1024;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/**
 * UTF-8 bytes of the unfinished line after `chunk`, counted through its first newline BEFORE it
 * is buffered or parsed. `null` when the pending line would pass `MAX_PENDING_SSE_LINE_BYTES`.
 */
export function advancePendingLineBytes(pendingLineBytes: number, chunk: Uint8Array) {
  const firstNl = chunk.indexOf(10);
  if (pendingLineBytes + (firstNl >= 0 ? firstNl : chunk.byteLength) > MAX_PENDING_SSE_LINE_BYTES) {
    return null;
  }
  const lastNl = chunk.lastIndexOf(10);
  return lastNl >= 0 ? chunk.byteLength - lastNl - 1 : pendingLineBytes + chunk.byteLength;
}

/** `{ _summary_text_tail: true }` when streamed text reached the window, else `{}`. */
export function summaryTextTailMarker(...texts: Array<string | undefined>): {
  _summary_text_tail?: true;
} {
  return texts.some((text) => (text?.length ?? 0) >= SUMMARY_TEXT_WINDOW_CHARS)
    ? { _summary_text_tail: true }
    : {};
}

/**
 * Records native Claude `tool_use` blocks (start + `input_json_delta`) of a passthrough event
 * into `nativeCalls`, keyed by block index. Only the completion summary reads them; the wire
 * event is not touched.
 */
export function trackClaudeNativeToolCall(
  nativeCalls: Map<string, StreamToolCall>,
  event: JsonRecord
): void {
  const block = asRecord(event.content_block);
  const delta = asRecord(event.delta);
  if (event.type === "content_block_start" && block.type === "tool_use") {
    const input = block.input;
    nativeCalls.set(`claude:${event.index}`, {
      id: typeof block.id === "string" ? block.id : null,
      index: nativeCalls.size,
      type: "function",
      function: {
        name: String(block.name ?? ""),
        arguments:
          input && typeof input === "object" && Object.keys(input).length > 0
            ? JSON.stringify(input)
            : "",
      },
    });
  } else if (
    event.type === "content_block_delta" &&
    delta.type === "input_json_delta" &&
    typeof delta.partial_json === "string"
  ) {
    const nativeCall = nativeCalls.get(`claude:${event.index}`);
    if (nativeCall) nativeCall.function.arguments += delta.partial_json;
  }
}

/**
 * Chat-shaped tool calls for the completion summary: the Chat/textual calls, then native Claude
 * `tool_use` blocks and Responses `function_call` items (each once, by call id). The result is
 * a fresh list; the wire events are not touched.
 */
export function mergeNativeToolCalls(
  chatCalls: StreamToolCall[],
  claudeCalls: StreamToolCall[],
  responsesItems: Iterable<unknown>,
  responsesPending: Iterable<unknown>
): StreamToolCall[] {
  const calls = [...chatCalls].sort((a, b) => a.index - b.index);
  const seen = new Set(calls.map((call) => call.id).filter(Boolean));
  const add = (call: StreamToolCall) => {
    if (call.id && seen.has(call.id)) return;
    if (call.id) seen.add(call.id);
    calls.push({ ...call, index: calls.length });
  };
  for (const call of claudeCalls) add(call);
  for (const raw of [...responsesItems, ...responsesPending]) {
    const item = asRecord(raw);
    if (item.type !== "function_call" || typeof item.name !== "string") continue;
    add({
      id:
        typeof item.call_id === "string"
          ? item.call_id
          : typeof item.id === "string"
            ? item.id
            : null,
      index: 0,
      type: "function",
      function: {
        name: item.name,
        arguments: typeof item.arguments === "string" ? item.arguments : "",
      },
    });
  }
  return calls;
}
