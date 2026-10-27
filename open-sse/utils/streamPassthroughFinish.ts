/**
 * Finish-chunk helpers for the passthrough branch of the SSE transform.
 *
 * - OpenRouter-style gateways report an upstream failure behind an HTTP 200 by
 *   closing the stream with a normal `finish_reason` plus an error value in
 *   `native_finish_reason` (and no content). `nativeFinishFailure` turns that
 *   marker into a 502 stream failure so the empty completion surfaces as a failed
 *   request (account/combo fallback kicks in) instead of a blank answer. It must
 *   read the raw chunk: `sanitizeStreamingChunk` drops non-standard choice fields.
 *   The transform only applies the failure when the finish chunk is the first one
 *   and nothing (content or tool calls) was streamed before it.
 * - Some gateways repeat the finish chunk (the copy usually carries only usage).
 *   A second `finish_reason` breaks strict clients ("content after finish
 *   reason"), so the transform drops it. Its usage was already captured by
 *   `extractUsage`; `flush()` forwards it as the trailing usage-only chunk when the
 *   first finish chunk did not carry usage.
 * - `readPassthroughChatId` remembers the upstream's chat-completion id so
 *   synthetic chunks emitted at flush (e.g. the estimated usage-only chunk) carry
 *   the stream's real string id instead of null on the chat path
 *   (`passthroughResponsesId` is only ever set on the Responses path).
 *
 * All logic lives here so the frozen `open-sse/utils/stream.ts` only carries the
 * minimal call-site wiring.
 */
import { HTTP_STATUS } from "../config/constants.ts";
import type { StreamFailurePayload } from "./streamErrorFormat.ts";

export const NATIVE_FINISH_ERROR_REASONS: ReadonlySet<string> = new Set([
  "network_error",
  "error",
  "server_error",
  "timeout",
]);

type ChunkLike = { id?: unknown; choices?: unknown } | null | undefined;

/**
 * The upstream failure carried by a raw chunk's `native_finish_reason`, or null
 * when the chunk carries none (or a non-error value such as "stop").
 */
export function nativeFinishFailure(rawChunk: ChunkLike): StreamFailurePayload | null {
  const choices = rawChunk?.choices;
  const first = Array.isArray(choices) ? (choices[0] as Record<string, unknown> | null) : null;
  const reason = first?.native_finish_reason;
  if (typeof reason !== "string" || !NATIVE_FINISH_ERROR_REASONS.has(reason)) return null;
  return {
    status: HTTP_STATUS.BAD_GATEWAY,
    message: `Upstream stream failed: ${reason}`,
    code: "upstream_native_finish_error",
    type: "server_error",
  };
}

/** The chunk's chat-completion id as a string, or null when it carries no usable id. */
export function readPassthroughChatId(chunk: ChunkLike): string | null {
  const id = chunk?.id;
  if (typeof id === "string" && id) return id;
  if (typeof id === "number") return String(id);
  return null;
}
