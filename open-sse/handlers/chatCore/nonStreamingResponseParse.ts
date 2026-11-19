/**
 * chatCore non-streaming response parsing/classification (Quality Gate v2 / Fase 9 — chatCore
 * god-file decomposition, #3501 — response-handling slice of executeProviderRequest).
 *
 * Extracted from handleChatCore's `if (!stream)` block: reads the upstream non-streaming body,
 * detects whether it is an event stream (SSE / NDJSON) buffered for a non-streaming client, and
 * parses it into a JSON response body. Returns a discriminated union describing the outcome
 * (`ok` | `invalid_sse` | `invalid_json`) and leaves every persistence side-effect
 * (appendRequestLog / persistAttemptLogs / persistFailureUsage / trackPendingRequest /
 * createErrorResult) to the handler, so behaviour is observably identical to the previous inline
 * block. Pure with respect to handler state (only buffering debug/warn logs as a side effect).
 */

import { normalizePayloadForLog } from "@/lib/logPayloads";
import { extractSSEErrorFrame } from "../sseParser.ts";
import { readNonStreamingResponseBody } from "./nonStreamingResponseBody.ts";
import { parseJsonDocumentBehindEventStream } from "./nonStreamingJsonDocument.ts";
import { isTruncatedStreamBody } from "../sseParser/truncation.ts";
import { markTruncatedStreamResponse } from "../../utils/truncatedStreamPolicy.ts";
import {
  normalizeNonStreamingEventPayload,
  parseNonStreamingSSEPayload,
  shouldTreatBufferedEventResponseAsExpected,
} from "./nonStreamingSse.ts";

type LoggerLike =
  | {
      debug?: (...args: unknown[]) => void;
      warn?: (...args: unknown[]) => void;
    }
  | null
  | undefined;

export type JsonRecord = Record<string, unknown>;

export function isJsonRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export type NonStreamingParseResult =
  | {
      kind: "ok";
      responseBody: JsonRecord;
      responsePayloadFormat: string;
      looksLikeSSE: boolean;
      normalizedProviderPayload: unknown;
    }
  | {
      kind: "invalid_sse";
      message: string;
      /** HTTP status (400-599) the upstream error frame carried; absent means 502. */
      status?: number;
      looksLikeSSE: true;
      normalizedProviderPayload: unknown;
    }
  | {
      kind: "invalid_json";
      message: string;
      detailedError: string;
      looksLikeSSE: false;
      normalizedProviderPayload: unknown;
    };

type ParseOptions = {
  providerResponse: Response;
  upstreamStream: boolean;
  providerHeaders: Record<string, unknown> | Headers | null | undefined;
  finalBody: unknown;
  targetFormat: string;
  model: string;
  log?: LoggerLike;
};

/** Debug/warn log for an event stream buffered into a non-streaming client response. */
function logBufferedEventStream(
  opts: Pick<ParseOptions, "upstreamStream" | "providerHeaders" | "finalBody" | "log">,
  streamKind: string
): void {
  const { upstreamStream, providerHeaders, finalBody, log } = opts;
  if (shouldTreatBufferedEventResponseAsExpected(upstreamStream, providerHeaders, finalBody)) {
    log?.debug?.(
      "STREAM",
      `Buffering upstream ${streamKind} response for non-streaming client request`
    );
  } else {
    log?.warn?.(
      "STREAM",
      `Unexpected ${streamKind} response for non-streaming request — buffering`
    );
  }
}

/**
 * Upstream returned an event stream for a non-streaming client; convert best-effort to JSON.
 * Falls back to a complete JSON document behind the event-stream content type, then to the
 * `invalid_sse` outcome.
 */
function parseBufferedEventStream(
  opts: ParseOptions,
  rawBody: string,
  contentType: string,
  normalizedProviderPayload: unknown
): NonStreamingParseResult {
  const { providerResponse, targetFormat, model, log } = opts;
  const streamPayload = normalizeNonStreamingEventPayload(rawBody, contentType);
  const streamKind = contentType.includes("application/x-ndjson") ? "NDJSON" : "SSE";
  logBufferedEventStream(opts, streamKind);
  const parsedFromSSE = parseNonStreamingSSEPayload(streamPayload, targetFormat, model);

  if (!parsedFromSSE) {
    // A forced-streaming upstream may answer with one complete JSON response document under
    // an event-stream content type: use it as the non-stream response instead of a 502.
    const jsonDocument = parseJsonDocumentBehindEventStream(rawBody, targetFormat);
    if (jsonDocument) {
      log?.debug?.("STREAM", `Upstream ${streamKind} body is a complete JSON response document`);
      return {
        kind: "ok",
        responseBody: jsonDocument.body,
        responsePayloadFormat: jsonDocument.format,
        looksLikeSSE: true,
        normalizedProviderPayload,
      };
    }
    // Some executors (e.g. the Devin/Windsurf CLI) always emit text/event-stream, signalling
    // failure with an error-only chunk (`data: {"error":{"message":"Devin CLI not found..."}}`)
    // that carries no `choices`. Surface that real, sanitized message instead of the generic 502
    // so the actionable error is not swallowed (#3324).
    const surfacedSseError = extractSSEErrorFrame(streamPayload);
    const invalidSseMessage =
      surfacedSseError?.message || "Invalid SSE response for non-streaming request";
    return {
      kind: "invalid_sse",
      message: invalidSseMessage,
      status: surfacedSseError?.status,
      looksLikeSSE: true,
      normalizedProviderPayload,
    };
  }

  // #18460 follow-up — carry the parser's cut-stream verdict onto the upstream Response
  // (internal marker, never serialized) so a combo can fail over to its next target.
  if (isTruncatedStreamBody(parsedFromSSE.body)) markTruncatedStreamResponse(providerResponse);

  return {
    kind: "ok",
    responseBody: parsedFromSSE.body,
    responsePayloadFormat: parsedFromSSE.format,
    looksLikeSSE: true,
    normalizedProviderPayload,
  };
}

/** Plain (non event-stream) body: parse as a JSON object payload. */
function parseJsonObjectBody(
  rawBody: string,
  targetFormat: string,
  normalizedProviderPayload: unknown
): NonStreamingParseResult {
  try {
    const responseBody: unknown = rawBody ? JSON.parse(rawBody) : {};
    if (!isJsonRecord(responseBody)) {
      return {
        kind: "invalid_json",
        message: "Invalid JSON response from provider",
        detailedError: "Invalid JSON response from provider: expected an object payload",
        looksLikeSSE: false,
        normalizedProviderPayload,
      };
    }
    return {
      kind: "ok",
      responseBody,
      responsePayloadFormat: targetFormat,
      looksLikeSSE: false,
      normalizedProviderPayload,
    };
  } catch (err) {
    const detailedError = `Invalid JSON response from provider (error: ${err instanceof Error ? err.message : String(err)}): ${rawBody.substring(0, 1000)}`;
    const invalidJsonMessage = "Invalid JSON response from provider";
    return {
      kind: "invalid_json",
      message: invalidJsonMessage,
      detailedError,
      looksLikeSSE: false,
      normalizedProviderPayload,
    };
  }
}

export async function parseNonStreamingResponseBody(
  opts: ParseOptions
): Promise<NonStreamingParseResult> {
  const { providerResponse, upstreamStream, targetFormat } = opts;

  const contentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
  const rawBody = await readNonStreamingResponseBody(providerResponse, contentType, upstreamStream);
  const normalizedProviderPayload = normalizePayloadForLog(rawBody);
  const looksLikeSSE =
    contentType.includes("text/event-stream") ||
    contentType.includes("application/x-ndjson") ||
    /(^|\n)\s*(event|data):/m.test(rawBody);

  if (looksLikeSSE) {
    return parseBufferedEventStream(opts, rawBody, contentType, normalizedProviderPayload);
  }
  return parseJsonObjectBody(rawBody, targetFormat, normalizedProviderPayload);
}
