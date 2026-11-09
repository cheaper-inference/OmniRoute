/**
 * chatCore non-SSE JSON → SSE conversion (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's streaming entry (#3089): some "reasoning" openai-compatible
 * upstreams ignore `stream:true` and return a complete application/json chat-completion body
 * instead of an SSE stream. The readiness check only recognizes SSE `data:` frames, so that body
 * produced a spurious STREAM_EARLY_EOF / HTTP 502. Detect a JSON (non-SSE) upstream body and
 * synthesize an equivalent OpenAI SSE stream so the streaming pipeline gets a valid stream.
 *
 * Returns the (possibly rebuilt) provider response — unchanged when the body is not a non-SSE JSON
 * body, an SSE stream when convertible, or a rebuilt-with-consumed-body response otherwise (so the
 * existing readiness/error path still runs unchanged). Behaviour is byte-identical to the previous
 * inline block.
 */
import { inheritEmptyTurnPolicy } from "../../utils/emptyTurnPolicy.ts";
import { HTTP_STATUS } from "../../config/constants.ts";
import { buildErrorBody } from "../../utils/error.ts";
import { withBodyTimeout as defaultWithBodyTimeout } from "../../utils/stream.ts";
import { synthesizeOpenAiSseFromJson as defaultSynthesize } from "../../utils/jsonToSse.ts";
import { prependBufferedChunks, type StreamReadinessResult } from "../../utils/streamReadiness.ts";
import {
  NonStreamingResponseTooLargeError,
  readResponseTextWithinCap,
} from "../../utils/responseBodyCap.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export interface JsonBodyToSseDeps {
  withBodyTimeout: typeof defaultWithBodyTimeout;
  synthesizeOpenAiSseFromJson: typeof defaultSynthesize;
}

const DEFAULT_DEPS: JsonBodyToSseDeps = {
  withBodyTimeout: defaultWithBodyTimeout,
  synthesizeOpenAiSseFromJson: defaultSynthesize,
};

function classifyBodyPrefix(text: string): "sse" | "non-sse" | "unknown" {
  const trimmed = text.replace(/^\uFEFF/, "").trimStart();
  if (!trimmed) return "unknown";
  if (trimmed.startsWith(":")) return "sse";
  if (/^(?:data|event|id|retry)\s*:/i.test(trimmed)) return "sse";

  const lower = trimmed.toLowerCase();
  for (const field of ["data", "event", "id", "retry"]) {
    if (field.startsWith(lower)) return "unknown";
    if (lower.startsWith(field)) {
      const rest = lower.slice(field.length);
      if (/^\s*$/.test(rest)) return "unknown";
      if (/^\s*:/.test(rest)) return "sse";
    }
  }

  return "non-sse";
}

async function sniffJsonBodyForSse(
  providerResponse: Response,
  ctx: { log?: LoggerLike; provider: string | null | undefined; model: string | null | undefined },
  deps: JsonBodyToSseDeps
): Promise<{ sseResponse?: Response; jsonBody: Response }> {
  const reader = providerResponse.body!.getReader();
  const bufferedChunks: Uint8Array[] = [];
  const decoder = new TextDecoder();
  let sniffed = "";
  let sniffedBytes = 0;
  const maxSniffBytes = 4096;
  // The two success paths below hand this still-open reader to
  // prependBufferedChunks(), so the reader must NOT be cancelled on the happy
  // path. Any other unwind (notably a withBodyTimeout rejection on a stalled
  // upstream) would otherwise abandon the body with no cancellation, pinning
  // the connection for the lifetime of the socket.
  let handedOff = false;
  try {
    while (sniffedBytes < maxSniffBytes) {
      const chunk = await deps.withBodyTimeout<ReadableStreamReadResult<Uint8Array>>(reader.read());
      if (chunk.done || !chunk.value) break;
      bufferedChunks.push(chunk.value);
      sniffedBytes += chunk.value.byteLength;
      sniffed += decoder.decode(chunk.value, { stream: true });

      if (classifyBodyPrefix(sniffed) === "sse") {
        const rebuiltHeaders = new Headers(providerResponse.headers);
        rebuiltHeaders.delete("content-length");
        rebuiltHeaders.set("content-type", "text/event-stream");
        ctx.log?.debug?.(
          "STREAM",
          `Upstream returned SSE bytes with application/json content-type — preserving streaming body (${ctx.provider}/${ctx.model})`
        );
        handedOff = true;
        return {
          sseResponse: new Response(prependBufferedChunks(bufferedChunks, reader), {
            status: providerResponse.status,
            statusText: providerResponse.statusText,
            headers: rebuiltHeaders,
          }),
          jsonBody: new Response(null),
        };
      }
    }

    handedOff = true;
    return { jsonBody: new Response(prependBufferedChunks(bufferedChunks, reader)) };
  } finally {
    // Cancellation is best-effort: the body may already be errored or closed.
    if (!handedOff) void reader.cancel().catch(() => {});
  }
}

export async function maybeConvertJsonBodyToSse(
  providerResponse: Response,
  ctx: { log?: LoggerLike; provider: string | null | undefined; model: string | null | undefined },
  deps: JsonBodyToSseDeps = DEFAULT_DEPS
): Promise<Response> {
  const upstreamContentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
  const isNonSseJsonBody =
    !!providerResponse.body &&
    upstreamContentType.includes("application/json") &&
    !upstreamContentType.includes("text/event-stream") &&
    !upstreamContentType.includes("application/x-ndjson");
  if (!isNonSseJsonBody) {
    return providerResponse;
  }

  const { sseResponse, jsonBody } = await sniffJsonBodyForSse(providerResponse, ctx, deps);
  if (sseResponse) return inheritEmptyTurnPolicy(providerResponse, sseResponse);

  const jsonText = await deps.withBodyTimeout<string>(readResponseTextWithinCap(jsonBody));
  const synthesizedSse = deps.synthesizeOpenAiSseFromJson(jsonText);
  const rebuiltHeaders = new Headers(providerResponse.headers);
  rebuiltHeaders.delete("content-length");
  if (synthesizedSse) {
    ctx.log?.debug?.(
      "STREAM",
      `Upstream returned application/json on a streaming request — converting to SSE (${ctx.provider}/${ctx.model})`
    );
    rebuiltHeaders.set("content-type", "text/event-stream");
    return inheritEmptyTurnPolicy(
      providerResponse,
      new Response(synthesizedSse, {
        status: providerResponse.status,
        statusText: providerResponse.statusText,
        headers: rebuiltHeaders,
      })
    );
  }
  // Not a convertible chat-completion JSON — rebuild the consumed body so the existing
  // readiness/error path still runs unchanged.
  return inheritEmptyTurnPolicy(
    providerResponse,
    new Response(jsonText, {
      status: providerResponse.status,
      statusText: providerResponse.statusText,
      headers: rebuiltHeaders,
    })
  );
}

const RESPONSE_TOO_LARGE_CODE = "upstream_response_too_large";

function overCapReadiness(
  error: NonStreamingResponseTooLargeError
): Extract<StreamReadinessResult, { ok: false }> {
  const status = HTTP_STATUS.BAD_GATEWAY;
  const type = "upstream_error";
  return {
    ok: false,
    reason: error.message,
    classificationReason: error.message,
    code: RESPONSE_TOO_LARGE_CODE,
    type,
    upstreamFailure: true,
    response: new Response(
      JSON.stringify(
        buildErrorBody(status, error.message, undefined, { code: RESPONSE_TOO_LARGE_CODE, type })
      ),
      { status, headers: { "Content-Type": "application/json" } }
    ),
  };
}

/**
 * {@link maybeConvertJsonBodyToSse} for the streaming call sites. `handleChatCore` reports
 * upstream failures by resolving, so an over-cap body must not throw past the pending-request,
 * call-log and account-fallback handling: it ends as the same 502 as the non-streaming path.
 * `overCap` feeds the readiness-failure branch; the non-ok `response` is a failed retry.
 */
export async function convertJsonBodyWithinCap(
  providerResponse: Response,
  ctx: Parameters<typeof maybeConvertJsonBodyToSse>[1]
): Promise<{
  response: Response;
  overCap: Extract<StreamReadinessResult, { ok: false }> | null;
}> {
  try {
    return { response: await maybeConvertJsonBodyToSse(providerResponse, ctx), overCap: null };
  } catch (error) {
    if (!(error instanceof NonStreamingResponseTooLargeError)) throw error;
    const overCap = overCapReadiness(error);
    return { response: overCap.response, overCap };
  }
}
