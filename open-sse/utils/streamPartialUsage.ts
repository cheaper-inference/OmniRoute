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
import {
  estimateInputTokens,
  estimateOutputTokens,
  hasValidUsage,
  normalizeUsage,
} from "./usageTracking.ts";

export type PartialStreamUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
  reasoning_tokens?: number;
  /** Set when any side of the count is a local estimate rather than provider-reported. */
  estimated?: true;
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

function positive(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
}

function appendUsageDetails(usage: PartialStreamUsage, normalized: Record<string, unknown>): void {
  const cacheRead =
    positive(normalized.cache_read_input_tokens) || positive(normalized.cached_tokens);
  if (cacheRead) usage.cache_read_input_tokens = cacheRead;
  const cacheCreation = positive(normalized.cache_creation_input_tokens);
  if (cacheCreation) usage.cache_creation_input_tokens = cacheCreation;
  const reasoning = positive(normalized.reasoning_tokens);
  if (reasoning) usage.reasoning_tokens = reasoning;
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
  const streamedChars = positive(contentLength);
  const record =
    reported && typeof reported === "object" && hasValidUsage(reported as Record<string, number>)
      ? (reported as Record<string, unknown>)
      : null;
  if (!record && streamedChars === 0) return null;

  const normalized = record ? (normalizeUsage(record) ?? {}) : {};
  let prompt =
    positive(normalized.prompt_tokens) ||
    positive(normalized.input_tokens) ||
    positive(record?.promptTokenCount);
  let completion =
    positive(normalized.completion_tokens) ||
    positive(normalized.output_tokens) ||
    positive(record?.candidatesTokenCount);

  let estimated = record?.estimated === true;
  if (streamedChars > 0) {
    if (completion === 0) {
      completion = estimateOutputTokens(streamedChars);
      estimated = true;
    }
    if (prompt === 0) {
      prompt = estimateInputTokens(body);
      estimated = true;
    }
  }
  if (prompt === 0 && completion === 0) return null;

  const usage: PartialStreamUsage = {
    prompt_tokens: prompt,
    completion_tokens: completion,
    total_tokens: prompt + completion,
  };
  appendUsageDetails(usage, normalized);
  if (estimated) usage.estimated = true;
  return usage;
}
