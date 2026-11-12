/**
 * Partial token usage of a stream that ended early.
 *
 * When the client hangs up (499 `client_disconnected`) or the upstream fails mid-answer, the SSE
 * transform's `flush()` never runs, so the usage it would have resolved there is lost and the
 * failure record used to carry zero tokens — even though the provider already generated (and
 * billed) part of the answer. `createSSEStream` registers a lazy reader here; the failure
 * finalizer reads it once, at finalization time. Nothing is computed per chunk: the reader only
 * closes over the transform's live `usage` / `totalContentLength` variables.
 *
 * Same WeakMap-side-table pattern as `registerStreamTiming` (streamTiming.ts): the stream object
 * is not monkey-patched and the entry dies with it.
 */
import { normalizeUsage, hasValidUsage, type UsageLike } from "./usageTracking.ts";
import { cacheCreationFields } from "./cacheWriteUsage.ts";
import { carryUsageEvidence, type UsageEvidence } from "@/lib/usage/usageEvidence";
import { finalizeStreamingUsage } from "./finalizeStreamingUsage.ts";

export type PartialStreamUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
  reasoning_tokens?: number;
  /** Set when any side of the count is a local estimate rather than provider-reported. */
  estimated?: true;
  usage_evidence?: UsageEvidence;
};

type PartialUsageReader = () => PartialStreamUsage | null;

const partialUsageByStream = new WeakMap<object, PartialUsageReader>();

/** Associate a stream with the reader of its partial usage. */
export function registerStreamPartialUsage<T extends object>(
  stream: T,
  reader: PartialUsageReader
): T {
  partialUsageByStream.set(stream, reader);
  return stream;
}

/** Partial usage of the stream so far, or null when it has none (or is unknown). */
export function readStreamPartialUsage(
  stream: object | null | undefined
): PartialStreamUsage | null {
  if (!stream) return null;
  const reader = partialUsageByStream.get(stream);
  if (!reader) return null;
  try {
    return reader();
  } catch {
    return null; // accounting is best-effort — never break failure finalization
  }
}

/**
 * Wire `createSSEStream` to the side table: `read` returns the transform's live
 * `[reportedUsage, streamedContentLength]` pair (translate mode accumulates provider usage on
 * `state.usage`, passthrough on `usage`). Nothing is computed until the failure finalizer
 * reads it, so a stream that ends before `flush()` (client disconnect / mid-stream failure)
 * still reports the tokens it already generated.
 */
export function trackStreamPartialUsage<T extends object>(
  stream: T,
  body: unknown,
  read: () => readonly [reported: unknown, contentLength: number]
): T {
  return registerStreamPartialUsage(stream, () => {
    const [reported, contentLength] = read();
    return resolvePartialStreamUsage({ reported, contentLength, body });
  });
}

/**
 * Resolve the usage to record for a stream that ended before its terminal event.
 *
 * - Provider-reported usage wins (normalized to `prompt_tokens` / `completion_tokens`).
 * - A side the provider has not reported yet (typically the output count, which Claude sends in
 *   the final `message_delta`) is estimated from what was actually streamed, and the result is
 *   flagged `estimated`.
 * - Nothing reported and nothing streamed → null: no tokens are fabricated.
 */
export function resolvePartialStreamUsage({
  reported,
  contentLength,
  body,
}: {
  reported: unknown;
  contentLength: number;
  body: unknown;
}): PartialStreamUsage | null {
  const record = reported && typeof reported === "object" ? (reported as UsageLike) : null;
  if (!hasValidUsage(record) && !(contentLength > 0)) return null;
  const normalized = normalizeUsage(record);
  const result = finalizeStreamingUsage(normalized, body, contentLength);
  if (!(Number(result.prompt_tokens) > 0 || Number(result.completion_tokens) > 0)) return null;
  const partial: PartialStreamUsage = {
    ...cacheCreationFields(result),
    prompt_tokens: result.prompt_tokens,
    completion_tokens: result.completion_tokens,
    total_tokens: result.total_tokens,
  };
  for (const key of ["cache_read_input_tokens", "cache_creation_input_tokens"] as const) {
    const value =
      result[key] ?? (key === "cache_read_input_tokens" ? result.cached_tokens : undefined);
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) partial[key] = value;
  }
  if (result.reasoning_tokens > 0) partial.reasoning_tokens = result.reasoning_tokens;
  return carryUsageEvidence(result, partial);
}
