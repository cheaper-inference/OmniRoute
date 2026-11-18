/**
 * Complete JSON response document served as `text/event-stream`.
 *
 * A forced-streaming upstream answering a non-streaming client can return one whole JSON
 * document (an OpenAI `chat.completion`, a Responses `response`, a Claude `message`, or a
 * structured error envelope) under an event-stream content type, sometimes with a
 * `data: [DONE]` sentinel glued after the closing brace. None of its lines is a `data:` frame,
 * so the buffered-SSE parsers find nothing and the request used to fail as `invalid_sse`.
 * This reads such a body as the non-stream response it is. Anything that is not exactly one
 * recognised JSON document (truncated JSON, trailing garbage, unknown objects, bare stream
 * chunks) returns null so the caller keeps its invalid-SSE failure.
 */

import { FORMATS } from "../../translator/formats.ts";

type JsonRecord = Record<string, unknown>;

const TRAILING_DONE_SENTINEL = /data:[ \t]*\[DONE\]\s*$/;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function detectResponseDocumentFormat(doc: JsonRecord): string | null {
  if (Array.isArray(doc.choices) && doc.choices.some((c) => isRecord(c) && isRecord(c.message))) {
    return FORMATS.OPENAI;
  }
  if (doc.object === "response" && Array.isArray(doc.output)) return FORMATS.OPENAI_RESPONSES;
  if (doc.type === "message" && Array.isArray(doc.content)) return FORMATS.CLAUDE;
  return null;
}

function hasStructuredError(doc: JsonRecord): boolean {
  const err = doc.error;
  return (
    (typeof err === "string" && err.length > 0) || (isRecord(err) && Object.keys(err).length > 0)
  );
}

// Mirrors parseNonStreamingSSEPayload: the preferred (target) format keeps its own label when
// its parser family matches the document; otherwise the document's own format is used.
function parserFamily(format: string): string {
  if (format === FORMATS.OPENAI_RESPONSES || format === FORMATS.CLAUDE) return format;
  if (format === FORMATS.GEMINI || format === FORMATS.ANTIGRAVITY) return FORMATS.GEMINI;
  return FORMATS.OPENAI;
}

export function parseJsonDocumentBehindEventStream(
  rawBody: string,
  targetFormat: string
): { body: JsonRecord; format: string } | null {
  const text = String(rawBody || "")
    .trim()
    .replace(TRAILING_DONE_SENTINEL, "")
    .trim();
  if (!text.startsWith("{") || !text.endsWith("}")) return null;

  let doc: unknown;
  try {
    doc = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isRecord(doc)) return null;

  const detected = detectResponseDocumentFormat(doc);
  if (detected) {
    return {
      body: doc,
      format: parserFamily(targetFormat) === detected ? targetFormat : detected,
    };
  }
  // An error envelope is handled exactly like the same body served as application/json.
  if (hasStructuredError(doc)) return { body: doc, format: targetFormat };
  return null;
}
