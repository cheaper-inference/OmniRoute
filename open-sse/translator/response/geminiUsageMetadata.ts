/**
 * OpenAI usage → Gemini `usageMetadata` mapping, shared by the `/v1beta`
 * streaming converter (openai-to-gemini-sse.ts) and the non-streaming
 * Gemini-family converter (handlers/responseTranslator.ts). Mirrors the
 * mapping in openai-to-antigravity.ts.
 */

export interface GeminiUsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  thoughtsTokenCount?: number;
  cachedContentTokenCount?: number;
}

export interface OpenAIUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  prompt_tokens_details?: { cached_tokens?: number };
  completion_tokens_details?: { reasoning_tokens?: number };
}

/** Per-stream flag: `usageMetadata` already reached the client. */
export interface GeminiUsageState {
  usageSent?: boolean;
}

interface UsageOnlyChunk {
  choices?: unknown[];
  usage?: OpenAIUsage | null;
  model?: string;
}

interface GeminiUsageOnlyChunk {
  candidates: Array<{ content: { role: "model"; parts: [{ text: "" }] }; index: 0 }>;
  usageMetadata: GeminiUsageMetadata;
  modelVersion: string;
}

/** Reasoning / cached token counts, present only when non-zero. */
export function geminiExtraUsageCounts(
  usage: object | null | undefined
): Pick<GeminiUsageMetadata, "thoughtsTokenCount" | "cachedContentTokenCount"> {
  const u = (usage ?? {}) as OpenAIUsage;
  const out: Pick<GeminiUsageMetadata, "thoughtsTokenCount" | "cachedContentTokenCount"> = {};
  const reasoning = u.completion_tokens_details?.reasoning_tokens;
  if (reasoning) out.thoughtsTokenCount = reasoning;
  const cached = u.prompt_tokens_details?.cached_tokens;
  if (cached) out.cachedContentTokenCount = cached;
  return out;
}

export function buildGeminiUsageMetadata(usage: OpenAIUsage): GeminiUsageMetadata {
  return {
    promptTokenCount: usage.prompt_tokens || 0,
    candidatesTokenCount: usage.completion_tokens || 0,
    totalTokenCount: usage.total_tokens || 0,
    ...geminiExtraUsageCounts(usage),
  };
}

/**
 * OpenAI upstreams called with `stream_options.include_usage` send usage in a
 * separate final chunk with `choices: []`, after the finish chunk. Emit it as
 * its own Gemini chunk (empty text part, no finishReason) unless usage was
 * already attached to the finish chunk. Returns null for any other chunk.
 */
function usageOnlyChunkToGemini(
  parsed: UsageOnlyChunk,
  fallbackModel: string,
  state: GeminiUsageState
): GeminiUsageOnlyChunk | null {
  if (parsed.choices?.length || !parsed.usage || state.usageSent) return null;
  state.usageSent = true;
  return {
    candidates: [{ content: { role: "model", parts: [{ text: "" }] }, index: 0 }],
    usageMetadata: buildGeminiUsageMetadata(parsed.usage),
    modelVersion: parsed.model || fallbackModel,
  };
}

/**
 * Run the per-chunk converter, forwarding a trailing usage-only chunk and
 * remembering when usage already went out on the finish chunk (no double count).
 */
export function convertChunkWithUsage<T extends { usageMetadata?: unknown }>(
  parsed: UsageOnlyChunk,
  fallbackModel: string,
  state: GeminiUsageState,
  convert: (parsed: UsageOnlyChunk, fallbackModel: string, state: GeminiUsageState) => T | null
): T | GeminiUsageOnlyChunk | null {
  const usageChunk = usageOnlyChunkToGemini(parsed, fallbackModel, state);
  if (usageChunk) return usageChunk;
  const out = convert(parsed, fallbackModel, state);
  if (out?.usageMetadata) state.usageSent = true;
  return out;
}
