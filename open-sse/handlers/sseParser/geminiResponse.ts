// Gemini/Antigravity buffered-SSE -> chat.completion conversion (#7408).
// Extracted verbatim from sseParser.ts (file-size cap): pure parsing, no host
// state, following the handlers submodule pattern (chatCore/, responseSanitizer/).
import { normalizeOpenAICompatibleFinishReasonString } from "../../utils/finishReason.ts";
import { stripObfuscationZeroWidth } from "../../utils/zeroWidth.ts";
import {
  TRUNCATED_STREAM_FINISH_REASON,
  hasSseDoneMarker,
  markTruncatedStreamBody,
} from "./truncation.ts";

type AccumulatedToolCall = {
  id: string;
  index: number;
  type: "function";
  function: { name: string; arguments: string };
};

/** Mutable accumulator threaded through one SSE payload's worth of parsing. */
type GeminiSSEAccumulator = {
  textContent: string;
  finishReason: string;
  sawFinishReason: boolean;
  usage: Record<string, unknown> | null;
  sawContent: boolean;
  toolCalls: AccumulatedToolCall[];
};

function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") return stripObfuscationZeroWidth(value);
  if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map(stripZeroWidth);
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = stripZeroWidth(v);
    }
    return out;
  }
  return value;
}

/**
 * Detect the `[Tool call: name]\nArguments: {...}` textual convention some
 * Gemini/Antigravity models emit instead of a native functionCall part.
 */
function tryParseTextualToolCall(text: string): { name: string; args: unknown } | null {
  const normalized = stripObfuscationZeroWidth(text);
  const match = normalized.match(
    /^[\s\S]*?\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*([\s\S]+?)\s*$/
  );
  if (!match) return null;
  const name = match[1]?.trim();
  const rawArgs = match[2]?.trim();
  if (!name || !rawArgs) return null;
  try {
    return { name, args: stripZeroWidth(JSON.parse(rawArgs)) };
  } catch {
    return null;
  }
}

/** Extract the markdown shortcut some Gemini variants send (top-level or nested). */
function extractGeminiMarkdownShortcut(parsed: Record<string, unknown>): string | null {
  if (typeof parsed.markdown === "string") return parsed.markdown;
  const response = parsed.response as Record<string, unknown> | undefined;
  return typeof response?.markdown === "string" ? response.markdown : null;
}

/** Append one candidate content part (text or textual tool call) onto the accumulator. */
function applyCandidatePart(part: Record<string, unknown>, acc: GeminiSSEAccumulator): void {
  // Native function calls (Gemini 3.x / Antigravity)
  const fc = part.functionCall as Record<string, unknown> | undefined;
  if (fc && typeof fc.name === "string") {
    acc.toolCalls.push({
      id:
        typeof fc.id === "string" && fc.id.length > 0
          ? fc.id
          : `${fc.name}-${Date.now()}-${acc.toolCalls.length}`,
      index: acc.toolCalls.length,
      type: "function",
      function: {
        name: fc.name,
        arguments: JSON.stringify(stripZeroWidth(fc.args ?? {})),
      },
    });
    return;
  }

  if (typeof part.text !== "string" || part.thought === true) return;

  const textualToolCall = tryParseTextualToolCall(part.text);
  if (textualToolCall) {
    acc.toolCalls.push({
      id: `${textualToolCall.name}-${Date.now()}-${acc.toolCalls.length}`,
      index: acc.toolCalls.length,
      type: "function",
      function: {
        name: textualToolCall.name,
        arguments: JSON.stringify(textualToolCall.args || {}),
      },
    });
  } else {
    acc.textContent += part.text;
  }
  acc.sawContent = true;
}

/** Walk the first candidate's content parts, if present, mutating the accumulator. */
function applyCandidateContentParts(
  candidate: Record<string, unknown> | undefined,
  acc: GeminiSSEAccumulator
): void {
  const content = candidate?.content as Record<string, unknown> | undefined;
  const parts = content?.parts;
  if (!Array.isArray(parts)) return;
  for (const part of parts) {
    applyCandidatePart(part as Record<string, unknown>, acc);
  }
}

/** Normalize and apply the candidate's finishReason, if present. */
function applyFinishReason(
  candidate: Record<string, unknown> | undefined,
  acc: GeminiSSEAccumulator
): void {
  if (!candidate?.finishReason) return;
  acc.sawFinishReason = true;
  acc.finishReason = normalizeOpenAICompatibleFinishReasonString(
    String(candidate.finishReason).toLowerCase()
  );
}

/** A finite, non-negative number from `value`, else `fallback`. */
function nonNegativeOr<T>(value: unknown, fallback: T): number | T {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : fallback;
}

/**
 * Resolve the cached-token count of a usage snapshot. A reported count larger than the prompt
 * is invalid; a snapshot that omits the field keeps the last valid count (snapshots are cumulative).
 */
function resolveCachedTokens(
  um: Record<string, unknown>,
  promptTokens: number | undefined,
  previousCachedTokens: number | undefined
): number | undefined {
  if (!Object.prototype.hasOwnProperty.call(um, "cachedContentTokenCount")) {
    return previousCachedTokens;
  }
  const reported = nonNegativeOr(um.cachedContentTokenCount, undefined);
  return reported !== undefined && typeof promptTokens === "number" && reported <= promptTokens
    ? reported
    : undefined;
}

/**
 * Fold the resolved cached-token count into the accumulated usage. A positive count is exposed as
 * `prompt_tokens_details.cached_tokens` (a breakdown of the inclusive prompt count, not extra
 * input). A reported zero or an invalid count keeps the plain usage shape: this object is returned
 * to clients as-is, so no internal evidence marker is added to it. A snapshot that omits the field
 * keeps the last valid count.
 */
function applyCacheEvidence(
  usage: Record<string, unknown>,
  um: Record<string, unknown>,
  cachedTokens: number | undefined
): void {
  if (typeof cachedTokens === "number" && cachedTokens > 0) {
    usage.prompt_tokens_details = { cached_tokens: cachedTokens };
  } else if (Object.prototype.hasOwnProperty.call(um, "cachedContentTokenCount")) {
    delete usage.prompt_tokens_details;
  }
}

/** Resolve total tokens while preserving Gemini's first-zero and later-zero semantics. */
function resolveTotalTokens(
  reportedTotalTokens: number | undefined,
  previousUsage: Record<string, unknown>,
  previousTotalTokens: number | undefined,
  promptTokens: number | undefined,
  completionTokens: number | undefined
): number | undefined {
  const derivedTotal =
    typeof promptTokens === "number" && typeof completionTokens === "number"
      ? promptTokens + completionTokens
      : undefined;
  return reportedTotalTokens === 0 &&
    !Object.prototype.hasOwnProperty.call(previousUsage, "total_tokens")
    ? derivedTotal
    : (reportedTotalTokens ?? previousTotalTokens ?? derivedTotal);
}

/** Extract usageMetadata into the OpenAI-shaped usage object, if present. */
function applyUsageMetadata(parsed: Record<string, unknown>, acc: GeminiSSEAccumulator): void {
  const response = (parsed.response ?? parsed) as Record<string, unknown>;
  const um = response?.usageMetadata as Record<string, unknown> | undefined;
  if (!um) return;

  const previousUsage = acc.usage ?? {};
  const previousPromptTokens = nonNegativeOr(previousUsage.prompt_tokens, undefined);
  const previousCompletionTokens = nonNegativeOr(previousUsage.completion_tokens, undefined);
  const previousTotalTokens = nonNegativeOr(previousUsage.total_tokens, undefined);
  const promptTokens = nonNegativeOr(um.promptTokenCount, previousPromptTokens);
  const completionTokens = nonNegativeOr(um.candidatesTokenCount, previousCompletionTokens);
  // Gemini may omit totalTokenCount; keep the last valid total, else derive it.
  const reportedTotalTokens = nonNegativeOr(um.totalTokenCount, undefined);
  const totalTokens = resolveTotalTokens(
    reportedTotalTokens,
    previousUsage,
    previousTotalTokens,
    promptTokens,
    completionTokens
  );
  const previousCachedTokens = (
    previousUsage.prompt_tokens_details as { cached_tokens?: number } | undefined
  )?.cached_tokens;
  const cachedTokens = resolveCachedTokens(
    um,
    typeof promptTokens === "number" ? promptTokens : undefined,
    previousCachedTokens
  );

  const nextUsage = {
    ...previousUsage,
    ...(typeof promptTokens === "number" ? { prompt_tokens: promptTokens } : {}),
    ...(typeof completionTokens === "number" ? { completion_tokens: completionTokens } : {}),
    ...(typeof totalTokens === "number" ? { total_tokens: totalTokens } : {}),
  } as Record<string, unknown>;
  applyCacheEvidence(nextUsage, um, cachedTokens);
  acc.usage = nextUsage;
}

/** Parse one `data:` line's JSON payload and fold it into the accumulator (best-effort). */
function applyGeminiSSEDataLine(payload: string, acc: GeminiSSEAccumulator): void {
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;

    const markdown = extractGeminiMarkdownShortcut(parsed);
    if (markdown) {
      acc.textContent += markdown;
      acc.sawContent = true;
    }

    const response = (parsed.response ?? parsed) as Record<string, unknown>;
    const candidates = response?.candidates;
    const candidate = Array.isArray(candidates)
      ? (candidates[0] as Record<string, unknown> | undefined)
      : undefined;

    applyCandidateContentParts(candidate, acc);
    applyFinishReason(candidate, acc);
    applyUsageMetadata(parsed, acc);
  } catch {
    // Ignore malformed lines
  }
}

/** Assemble the final non-streaming chat.completion payload from the accumulator. */
function buildChatCompletionFromAccumulator(
  acc: GeminiSSEAccumulator,
  fallbackModel: string
): Record<string, unknown> {
  const message: Record<string, unknown> = {
    role: "assistant",
    content: acc.textContent || null,
  };

  let finishReason = acc.finishReason;
  if (acc.toolCalls.length > 0) {
    message.tool_calls = acc.toolCalls;
    finishReason = "tool_calls";
  }

  const result: Record<string, unknown> = {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: fallbackModel || "unknown",
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason,
      },
    ],
  };

  if (acc.usage) {
    result.usage = acc.usage;
  }

  return result;
}

/**
 * Convert Gemini/Antigravity SSE chunks into a single non-streaming OpenAI
 * chat.completion JSON response.  Gemini SSE carries payloads like:
 *
 *   data: {"markdown":"...chunk..."}
 *   data: {"response":{"candidates":[{"content":{"parts":[{"text":"..."}]},"finishReason":"STOP"}],"usageMetadata":{...}}}
 *   data: {"remainingCredits":[...]}
 *
 * Reuses the same parsing logic as processAntigravitySSEPayload() in sseCollect.ts
 * so that format conversion is functionally equivalent to the previous
 * collectStreamToResponse() approach.  Intentional differences:
 *   - remainingCredits is NOT embedded into the result (handled separately
 *     by the credits-extraction TransformStream in antigravity.ts).
 *   - The synthetic `id` uses `chatcmpl-${Date.now()}` (no UUID suffix)
 *     because this path runs once per response, not per chunk.
 */
export function parseSSEToGeminiResponse(
  rawSSE: string,
  fallbackModel: string
): Record<string, unknown> | null {
  const lines = String(rawSSE || "").split("\n");
  const acc: GeminiSSEAccumulator = {
    textContent: "",
    finishReason: "stop",
    sawFinishReason: false,
    usage: null,
    sawContent: false,
    toolCalls: [],
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    applyGeminiSSEDataLine(payload, acc);
  }

  if (!acc.sawContent && acc.toolCalls.length === 0) return null;

  // #18432 — content but no candidate finishReason (nor [DONE]): the stream was cut.
  const streamCut = !acc.sawFinishReason && acc.sawContent && !hasSseDoneMarker(rawSSE);
  if (streamCut) {
    acc.finishReason = TRUNCATED_STREAM_FINISH_REASON;
  }

  return markTruncatedStreamBody(buildChatCompletionFromAccumulator(acc, fallbackModel), streamCut);
}
