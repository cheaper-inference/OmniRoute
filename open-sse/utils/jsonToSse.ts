/**
 * #3089 — Convert a complete OpenAI-style chat-completion JSON body into an
 * equivalent OpenAI SSE (`chat.completion.chunk`) stream.
 *
 * Some "reasoning" openai-compatible upstreams ignore a `stream: true` request
 * and reply with a single `application/json` chat-completion body instead of an
 * SSE stream. OmniRoute's streaming readiness check only recognizes SSE `data:`
 * frames, so such a body produced a spurious `STREAM_EARLY_EOF` / HTTP 502 even
 * though it carried valid `content` / `reasoning_content`. Synthesizing an SSE
 * stream from that JSON lets the normal streaming pipeline (and the client) get
 * a valid stream that preserves both `content` and `reasoning_content`.
 *
 * Returns "" when the text is not a parseable chat-completion object with at
 * least one choice — callers then fall back to the original (error) handling.
 */
import { normalizeOpenAICompatibleFinishReasonString } from "./finishReason.ts";
import { getUnsupportedReasoningValue } from "./reasoningFields.ts";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): string {
  return typeof value === "string" && value.length > 0 ? value : "";
}

function addReadableReasoning(message: JsonRecord, delta: JsonRecord): boolean {
  const reasoningContent = nonEmptyString(message.reasoning_content);
  if (reasoningContent) {
    delta.reasoning_content = reasoningContent;
    return true;
  }

  const reasoning = nonEmptyString(message.reasoning);
  if (reasoning) {
    delta.reasoning = reasoning;
    return true;
  }

  return false;
}

function addUnsupportedReasoning(message: JsonRecord, delta: JsonRecord) {
  const reasoningContent = getUnsupportedReasoningValue(message);
  if (reasoningContent) {
    delta.reasoning_content = reasoningContent;
  }
}

function buildReasoningDelta(message: JsonRecord): JsonRecord | null {
  const delta: JsonRecord = {};
  if (Array.isArray(message.reasoning_details)) {
    delta.reasoning_details = message.reasoning_details;
  }

  // Always emit the readable field (reasoning_content, else the reasoning
  // alias) WITHOUT short-circuiting the unsupported-alias mirror below.
  addReadableReasoning(message, delta);

  // Mirror unsupported reasoning aliases (reasoning_text / thinking / thought /
  // reasoning_details[].text) into reasoning_content unless reasoning_content
  // itself is present — same gate as copyOpenAICompatibleReasoningFields
  // (#12665). A populated `reasoning` string must NOT skip this: OpenRouter
  // thinking models send BOTH `reasoning` and `reasoning_details[].text`.
  if (!nonEmptyString(message.reasoning_content)) {
    addUnsupportedReasoning(message, delta);
  }

  return Object.keys(delta).length > 0 ? delta : null;
}

function isToolCallIndex(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 0;
}

/**
 * Stream deltas need a distinct `index` per tool call: non-stream tool_calls have
 * none, and readers default a missing one to 0, so calls sharing a slot merge or
 * evict each other. Keep the first use of each valid index; every missing, invalid
 * or repeated one takes the lowest free slot. Non-object entries pass through.
 */
function withToolCallIndexes(toolCalls: unknown[]): unknown[] {
  const used = new Set<number>();
  const kept = new Set<unknown>();
  for (const tc of toolCalls) {
    if (isRecord(tc) && isToolCallIndex(tc.index) && !used.has(tc.index)) {
      used.add(tc.index);
      kept.add(tc);
    }
  }

  let nextFree = 0;
  return toolCalls.map((tc) => {
    if (!isRecord(tc) || kept.has(tc)) return tc;
    while (used.has(nextFree)) nextFree += 1;
    used.add(nextFree);
    return { ...tc, index: nextFree };
  });
}

function sseEvent(payload: JsonRecord): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export function synthesizeOpenAiSseFromJson(jsonText: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return "";
  }
  if (!isRecord(parsed)) return "";

  const choices = parsed.choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";

  const id = typeof parsed.id === "string" && parsed.id ? parsed.id : "chatcmpl-omniroute-sse";
  const created = typeof parsed.created === "number" ? parsed.created : 0;
  const model = typeof parsed.model === "string" ? parsed.model : "";
  const base = { id, object: "chat.completion.chunk", created, model };

  let out = "";
  let emittedAny = false;

  choices.forEach((choice, fallbackIndex) => {
    if (!isRecord(choice)) return;
    const index = typeof choice.index === "number" ? choice.index : fallbackIndex;
    const message = isRecord(choice.message) ? choice.message : {};

    // Emit role, reasoning_content, content and tool_calls as SEPARATE sequential
    // deltas — the same shape a real reasoning model streams (reasoning first,
    // then content). Combining them in one delta caused the openai→openai
    // translator to re-split and DUPLICATE reasoning_content across chunks
    // (#3089 follow-up); separate deltas pass through cleanly with no duplication.
    const role = typeof message.role === "string" ? message.role : "assistant";
    const emitDelta = (delta: JsonRecord) => {
      out += sseEvent({ ...base, choices: [{ index, delta, finish_reason: null }] });
    };

    emitDelta({ role });
    const reasoningDelta = buildReasoningDelta(message);
    if (reasoningDelta) {
      emitDelta(reasoningDelta);
    }
    if (typeof message.content === "string" && message.content.length > 0) {
      emitDelta({ content: message.content });
    }
    if (Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
      emitDelta({ tool_calls: withToolCallIndexes(message.tool_calls) });
    }

    const finishReason = normalizeOpenAICompatibleFinishReasonString(choice.finish_reason);
    const finalChoice: JsonRecord = { index, delta: {}, finish_reason: finishReason };
    const finalChunk: JsonRecord = { ...base, choices: [finalChoice] };
    if (isRecord(parsed.usage)) finalChunk.usage = parsed.usage;
    out += sseEvent(finalChunk);
    emittedAny = true;
  });

  if (!emittedAny) return "";
  out += "data: [DONE]\n\n";
  return out;
}
