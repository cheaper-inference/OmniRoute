// Embedded-error peek for the /alpha/generate CLI fallback.
//
// Command Code's NDJSON endpoint can answer HTTP 200 and then send
// {"type":"error","error":{"type":"server_error","statusCode":503,...}} as its
// first meaningful frame. The converters in commandCode.ts would commit a 200
// (the stream path emits the role chunk on the first event, even `start`) and
// only then throw, so the combo/account fallback never sees a failure.
//
// peekCommandCodeCliStream() reads the leading frames until the first
// content-producing event. An error before that becomes a synthetic non-2xx
// Response carrying the embedded status. Otherwise the bytes read so far are
// replayed in front of the same reader, so the converters see the full body.

import { buildErrorBody, sanitizeErrorMessage } from "../../utils/error.ts";

type JsonRecord = Record<string, unknown>;

const CONTENT_EVENT_TYPES = new Set([
  "text-delta",
  "reasoning-delta",
  "tool-input-start",
  "tool-input-delta",
  "tool-call",
  "finish-step",
  "finish",
]);

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsePeekLine(line: string): JsonRecord | null | "done" {
  let trimmed = line.trim();
  if (!trimmed || trimmed.startsWith(":") || trimmed.startsWith("event:")) return null;
  if (trimmed.startsWith("data:")) trimmed = trimmed.slice(5).trim();
  if (trimmed === "[DONE]") return "done";
  if (!trimmed) return null;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    return isRecord(parsed) ? parsed : null;
  } catch {
    // Malformed lines are skipped here and logged by the converter's own parser.
    return null;
  }
}

export type CommandCodeEmbeddedError = { statusCode: number; message: string; type: string };

/** Extract `{statusCode, message, type}` from an NDJSON `error` event. */
export function parseCommandCodeEmbeddedError(event: JsonRecord): CommandCodeEmbeddedError {
  const error = isRecord(event.error) ? event.error : {};
  const rawStatus = Number(error.statusCode ?? error.status ?? event.statusCode);
  const statusCode =
    Number.isInteger(rawStatus) && rawStatus >= 400 && rawStatus <= 599 ? rawStatus : 503;
  const rawMessage =
    typeof error.message === "string"
      ? error.message
      : typeof event.error === "string"
        ? event.error
        : "";
  const message = sanitizeErrorMessage(rawMessage) || `Command Code upstream error (${statusCode})`;
  const type = typeof error.type === "string" && error.type ? error.type : "server_error";
  return { statusCode, message, type };
}

export function commandCodeEmbeddedErrorResponse(error: CommandCodeEmbeddedError): Response {
  const body = buildErrorBody(error.statusCode, error.message, undefined, { type: error.type });
  return new Response(JSON.stringify(body), {
    status: error.statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

function replayResponse(
  upstream: Response,
  consumed: Uint8Array[],
  reader: ReadableStreamDefaultReader<Uint8Array>,
  pendingError: unknown,
  finished: boolean
): Response {
  let index = 0;
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (index < consumed.length) {
        controller.enqueue(consumed[index++]);
        return;
      }
      if (pendingError !== undefined) {
        controller.error(pendingError);
        return;
      }
      if (finished) {
        controller.close();
        return;
      }
      try {
        const { done, value } = await reader.read();
        if (done) controller.close();
        else controller.enqueue(value);
      } catch (error) {
        controller.error(error);
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
  return new Response(body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
  });
}

type PeekVerdict = CommandCodeEmbeddedError | "content" | null;

/** First decisive frame among `lines`: an embedded error, "content", or null to keep peeking. */
function scanPeekLines(lines: string[]): PeekVerdict {
  for (const line of lines) {
    const event = parsePeekLine(line);
    if (event === "done") return "content";
    if (!event) continue;
    if (event.type === "error") return parseCommandCodeEmbeddedError(event);
    if (typeof event.type === "string" && CONTENT_EVENT_TYPES.has(event.type)) return "content";
  }
  return null;
}

async function readPeekChunk(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  signal?: AbortSignal | null
): Promise<ReadableStreamReadResult<Uint8Array> | { error: unknown }> {
  if (signal?.aborted) {
    await reader.cancel().catch(() => undefined);
    throw new DOMException("The operation was aborted", "AbortError");
  }
  try {
    return await reader.read();
  } catch (error) {
    return { error };
  }
}

/**
 * Peek the leading NDJSON frames of a 200 /alpha/generate response. Returns a
 * synthetic error Response when an `error` event comes before any content, or
 * a replayed Response (same bytes, same reader) for the converters otherwise.
 */
export async function peekCommandCodeCliStream(
  upstream: Response,
  signal?: AbortSignal | null
): Promise<Response> {
  if (!upstream.body) return upstream;
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const consumed: Uint8Array[] = [];
  let buffer = "";

  for (;;) {
    const chunk = await readPeekChunk(reader, signal);
    // Keep today's semantics: the converter surfaces the read failure.
    if ("error" in chunk) return replayResponse(upstream, consumed, reader, chunk.error, true);
    if (chunk.done) {
      const verdict = scanPeekLines([buffer + decoder.decode()]);
      if (verdict && verdict !== "content") return commandCodeEmbeddedErrorResponse(verdict);
      return replayResponse(upstream, consumed, reader, undefined, true);
    }
    consumed.push(chunk.value);
    buffer += decoder.decode(chunk.value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    const verdict = scanPeekLines(lines);
    if (verdict === "content") return replayResponse(upstream, consumed, reader, undefined, false);
    if (verdict) {
      await reader.cancel().catch(() => undefined);
      return commandCodeEmbeddedErrorResponse(verdict);
    }
  }
}
