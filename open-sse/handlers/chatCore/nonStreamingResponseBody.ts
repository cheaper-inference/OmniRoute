/**
 * chatCore non-streaming response-body reader (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from chatCore: reads an upstream response body to a string. When the upstream is an SSE /
 * NDJSON stream consumed in non-streaming mode, it drains the reader chunk-by-chunk under the body
 * timeout and cancels early once a terminal SSE signal is observed; otherwise it reads the body as
 * text under the same timeout. Both paths count decoded bytes against the non-streaming cap.
 */

import { withBodyTimeout } from "../../utils/stream.ts";
import {
  NonStreamingResponseTooLargeError,
  cancelNonStreamingReader,
  getMaxNonStreamingResponseBytes,
  readResponseTextWithinCap,
} from "../../utils/responseBodyCap.ts";
import { FETCH_BODY_TIMEOUT_MS } from "../../config/constants.ts";
import { createBodyTimeoutError, readStreamChunkWithTimeout } from "./upstreamTimeouts.ts";
import {
  appendNonStreamingSseTerminalSignal,
  type NonStreamingSseTerminalState,
} from "./nonStreamingSse.ts";

export {
  NonStreamingResponseTooLargeError,
  getMaxNonStreamingResponseBytes,
  readResponseTextWithinCap,
} from "../../utils/responseBodyCap.ts";

export async function readNonStreamingResponseBody(
  response: Response,
  contentType: string,
  upstreamStream: boolean,
  maxBytes: number = getMaxNonStreamingResponseBytes()
): Promise<string> {
  if (
    !upstreamStream ||
    !response.body ||
    (!contentType.includes("text/event-stream") && !contentType.includes("application/x-ndjson"))
  ) {
    return withBodyTimeout<string>(readResponseTextWithinCap(response, maxBytes));
  }

  return drainNonStreamingSseBody(response.body, maxBytes);
}

/**
 * Drain an SSE/NDJSON stream consumed in non-streaming mode into a single string, bounded
 * by `maxBytes` (cancels the upstream and throws {@link NonStreamingResponseTooLargeError}
 * past the cap) and by the body timeout, cancelling early on a terminal SSE signal.
 */
type NonStreamingChunk = { kind: "done" } | { kind: "skip" } | { kind: "chunk"; value: Uint8Array };

/** Read the next chunk under the body-timeout deadline, normalizing end/empty cases. */
async function readNextNonStreamingChunk(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  deadline: number
): Promise<NonStreamingChunk> {
  const timeoutMs = deadline > 0 ? deadline - Date.now() : 0;
  if (deadline > 0 && timeoutMs <= 0) {
    throw createBodyTimeoutError(FETCH_BODY_TIMEOUT_MS);
  }
  const { done, value } = await readStreamChunkWithTimeout(reader, timeoutMs);
  if (done) return { kind: "done" };
  if (!value) return { kind: "skip" };
  return { kind: "chunk", value };
}

async function drainNonStreamingSseBody(
  body: ReadableStream<Uint8Array>,
  maxBytes: number
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const terminalState: NonStreamingSseTerminalState = {
    currentEvent: "",
    pendingLine: "",
  };
  let rawBody = "";
  let bytesSeen = 0;
  const deadline = FETCH_BODY_TIMEOUT_MS > 0 ? Date.now() + FETCH_BODY_TIMEOUT_MS : 0;
  let cancelRequested = false;
  const requestCancel = (reason: unknown) => {
    if (cancelRequested) return;
    cancelRequested = true;
    cancelNonStreamingReader(reader, reason);
  };

  try {
    while (true) {
      const next = await readNextNonStreamingChunk(reader, deadline);
      if (next.kind === "done") break;
      if (next.kind === "skip") continue;

      // Bound the buffer: cancel the upstream and fail fast past the cap rather than
      // growing `rawBody` until the V8 heap is exhausted.
      bytesSeen += next.value.byteLength;
      if (bytesSeen > maxBytes) {
        requestCancel("non-streaming response exceeded byte cap");
        throw new NonStreamingResponseTooLargeError(bytesSeen, maxBytes);
      }

      const decodedChunk = decoder.decode(next.value, { stream: true });
      rawBody += decodedChunk;
      if (appendNonStreamingSseTerminalSignal(terminalState, decodedChunk)) {
        requestCancel("non-streaming bridge consumed terminal SSE event");
        break;
      }
    }
  } catch (error) {
    requestCancel(error);
    throw error;
  } finally {
    rawBody += decoder.decode();
    reader.releaseLock();
  }

  return rawBody;
}
