import { appendToolCallArgumentDelta } from "../utils/toolCallArguments.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { pickResponsesSnapshot } from "./sseParser/responsesSnapshot.ts";
import {
  TRUNCATED_STREAM_CLAUDE_STOP_REASON,
  TRUNCATED_STREAM_FINISH_REASON,
  TRUNCATED_STREAM_RESPONSES_INCOMPLETE_REASON,
  hasSseDoneMarker,
  markTruncatedStreamBody,
  isCompleteToolCallArguments,
  withholdCutToolCalls,
} from "./sseParser/truncation.ts";

/**
 * Extract a provider error message from a buffered SSE stream that carries an
 * error-only chunk (`data: {"error":...}`) and no content chunks.
 *
 * Some executors always return `text/event-stream` even on failure (e.g. the
 * Devin/Windsurf CLI executors emit `data: {"error":{"message":"Devin CLI not
 * found..."}}`). Those chunks have no `choices`/Claude/Responses content, so the
 * content parsers (parseSSEToOpenAIResponse etc.) correctly return `null`. Without
 * this helper the caller would replace the real upstream error with a generic
 * "Invalid SSE response" 502, swallowing the actionable message (#3324).
 *
 * Provider-agnostic: matches any `data:` chunk that has an `error` field but no
 * `choices` array. The returned message is always run through sanitizeErrorMessage
 * so stack traces / absolute source paths never leak (Hard Rule #12). Returns
 * `null` when no error-only chunk is present (so valid-content streams are left
 * to the normal parsers).
 */
export function extractSSEErrorMessage(rawSSE: unknown): string | null {
  const lines = String(rawSSE || "").split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    let parsed: unknown;
    try {
      parsed = JSON.parse(payload);
    } catch {
      continue; // Ignore malformed lines and keep scanning.
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
    const record = parsed as Record<string, unknown>;

    // A chunk with content (choices) is not an error-only chunk — defer to the
    // normal content parsers so the valid-SSE path is never short-circuited.
    if (Array.isArray(record.choices)) continue;

    const err = record.error;
    if (err == null) continue;

    let message = "";
    if (typeof err === "string") {
      message = err;
    } else if (typeof err === "object" && !Array.isArray(err)) {
      const errRecord = err as Record<string, unknown>;
      if (typeof errRecord.message === "string") {
        message = errRecord.message;
      } else {
        message = JSON.stringify(err);
      }
    } else {
      message = String(err);
    }

    const sanitized = sanitizeErrorMessage(message);
    if (sanitized) return sanitized;
  }

  return null;
}

/**
 * Convert OpenAI-style SSE chunks into a single non-streaming JSON response.
 * Used as a fallback when upstream returns text/event-stream for stream=false.
 */
function readSSEEvents(rawSSE) {
  const lines = String(rawSSE || "").split("\n");
  const events = [];
  let currentEvent = "";
  let currentData = [];

  const flush = () => {
    if (currentData.length === 0) {
      currentEvent = "";
      return;
    }

    const payload = currentData.join("\n").trim();
    currentData = [];
    if (!payload || payload === "[DONE]") {
      currentEvent = "";
      return;
    }

    try {
      const data = JSON.parse(payload);
      if (
        currentEvent &&
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        typeof data.type !== "string"
      ) {
        data.type = currentEvent;
      }
      events.push({
        event: currentEvent || undefined,
        data,
      });
    } catch {
      // Ignore malformed SSE events and continue best-effort parsing.
    }

    currentEvent = "";
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");
    if (line.trim() === "") {
      flush();
      continue;
    }

    if (line.startsWith("event:")) {
      // Some relays omit the blank separator between Claude events. Flush the
      // previous event before accepting the next event name.
      if (currentData.length > 0) flush();
      currentEvent = line.slice(6).trim();
      continue;
    }

    if (line.startsWith("data:")) {
      const dataLine = line.slice(5).trimStart();
      if (dataLine.trim() === "[DONE]") {
        flush();
        currentEvent = "";
        continue;
      }
      currentData.push(dataLine);
    }
  }

  flush();
  return events;
}

function toRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function toString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

export function parseSSEToOpenAIResponse(rawSSE, fallbackModel) {
  const lines = String(rawSSE || "").split("\n");
  const chunks = [];
  let sawChoices = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const parsed = JSON.parse(payload);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
      if (Array.isArray(parsed.choices)) {
        sawChoices = true;
      }
      chunks.push(parsed);
    } catch {
      // Ignore malformed SSE lines and continue best-effort parsing.
    }
  }

  if (chunks.length === 0 || !sawChoices) return null;

  const first = chunks[0];
  const contentParts = [];
  const refusalParts = [];
  const reasoningParts = [];
  type AccumulatedToolCall = {
    id: string | null;
    index: number;
    type: string;
    function: { name: string; arguments: string };
  };

  const accumulatedToolCalls = new Map<string, AccumulatedToolCall>();
  let unknownToolCallSeq = 0;
  let finishReason = "stop";
  let sawFinishReason = false;
  let usage = null;

  const getToolCallKey = (toolCall: Record<string, unknown>) => {
    if (Number.isInteger(toolCall?.index)) return `idx:${toolCall.index}`;
    if (toolCall?.id != null) return `id:${String(toolCall.id)}`;
    unknownToolCallSeq += 1;
    return `seq:${unknownToolCallSeq}`;
  };

  for (const chunk of chunks) {
    const choice = chunk?.choices?.[0];
    const delta = choice?.delta || {};

    if (typeof delta.content === "string" && delta.content.length > 0) {
      contentParts.push(delta.content);
    }
    if (typeof delta.refusal === "string" && delta.refusal.length > 0) {
      refusalParts.push(delta.refusal);
    }
    if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
      reasoningParts.push(delta.reasoning_content);
    }
    // Normalize `reasoning` alias (NVIDIA kimi-k2.5 etc.)
    if (
      typeof delta.reasoning === "string" &&
      delta.reasoning.length > 0 &&
      !delta.reasoning_content
    ) {
      reasoningParts.push(delta.reasoning);
    }

    // T18: Accumulate tool calls correctly across streamed chunks
    if (delta.tool_calls) {
      for (const tc of delta.tool_calls) {
        const key = getToolCallKey(tc);
        const existing = accumulatedToolCalls.get(key);
        const deltaArgs = typeof tc?.function?.arguments === "string" ? tc.function.arguments : "";

        if (!existing) {
          accumulatedToolCalls.set(key, {
            id: tc?.id != null ? String(tc.id) : null,
            index: Number.isInteger(tc?.index) ? tc.index : accumulatedToolCalls.size,
            type: tc?.type || "function",
            function: {
              name: tc?.function?.name || "unknown",
              arguments: deltaArgs,
            },
          });
        } else {
          existing.id = existing.id || (tc?.id != null ? String(tc.id) : null);
          if (!Number.isInteger(existing.index) && Number.isInteger(tc?.index)) {
            existing.index = tc.index;
          }
          if (tc?.function?.name && !existing.function?.name) {
            existing.function.name = tc.function.name;
          }
          existing.function.arguments = appendToolCallArgumentDelta(
            existing.function.arguments,
            deltaArgs
          );
          accumulatedToolCalls.set(key, existing);
        }
      }
    }

    if (choice?.finish_reason) {
      finishReason = choice.finish_reason;
      sawFinishReason = true;
    }
    if (chunk?.usage && typeof chunk.usage === "object") {
      usage = chunk.usage;
    }
  }

  // #18432 — output but neither a finish_reason nor [DONE]: the upstream stream was
  // cut, so do not report the partial answer as a clean stop.
  const producedOutput =
    contentParts.length > 0 ||
    refusalParts.length > 0 ||
    reasoningParts.length > 0 ||
    accumulatedToolCalls.size > 0;
  const streamCut = !sawFinishReason && producedOutput && !hasSseDoneMarker(rawSSE);
  if (streamCut) {
    finishReason = TRUNCATED_STREAM_FINISH_REASON;
  }

  const joinedContent = contentParts.length > 0 ? contentParts.join("").trim() : "";
  const joinedReasoning = reasoningParts.length > 0 ? reasoningParts.join("").trim() : null;
  const message: Record<string, unknown> = {
    role: "assistant",
    content: joinedContent,
  };
  if (refusalParts.length > 0) {
    message.refusal = refusalParts.join("");
  }
  if (joinedReasoning) {
    message.reasoning_content = joinedReasoning;
  }

  const sortedToolCalls = [...accumulatedToolCalls.values()].filter(Boolean).sort((a, b) => {
    const ai = Number.isInteger(a?.index) ? a.index : 0;
    const bi = Number.isInteger(b?.index) ? b.index : 0;
    return ai - bi;
  });
  // #18460 follow-up — a cut stream must not present a half-written call as executable.
  const finalToolCalls = withholdCutToolCalls(streamCut, sortedToolCalls, (toolCall) =>
    isCompleteToolCallArguments(toolCall.function?.arguments)
  );
  if (finalToolCalls.length > 0) {
    finishReason = "tool_calls"; // T18 normalization
    message.tool_calls = finalToolCalls;
  }

  const result: Record<string, unknown> = {
    id: first.id != null ? String(first.id) : `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: first.created || Math.floor(Date.now() / 1000),
    model: first.model || fallbackModel || "unknown",
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason,
      },
    ],
  };

  if (usage) {
    result.usage = usage;
  }

  return markTruncatedStreamBody(result, streamCut);
}

/**
 * Whether a buffered Claude tool_use block is complete (#18460 follow-up): its streamed
 * `input_json_delta` text is a whole JSON object, or, when nothing was streamed, the
 * upstream closed the block (`content_block_stop`) or the `content_block_start` already
 * carried a non-empty `input`.
 */
function isClaudeToolUseComplete(
  block: { inputJson: string; input: unknown },
  closedByUpstream: boolean
): boolean {
  if (block.inputJson.trim().length > 0) {
    return isCompleteToolCallArguments(block.inputJson);
  }
  return closedByUpstream || Object.keys(toRecord(block.input)).length > 0;
}

/**
 * Convert Claude-style SSE events into a single non-streaming message object.
 * Used when Claude-compatible upstreams stream even for stream=false.
 */
export function parseSSEToClaudeResponse(rawSSE, fallbackModel) {
  const payloads = readSSEEvents(rawSSE)
    .map((event) => toRecord(event.data))
    .filter((payload) => Object.keys(payload).length > 0);

  if (payloads.length === 0) return null;

  const blocks = new Map();
  const usage = {};
  let messageId = "";
  let model = fallbackModel || "claude";
  let role = "assistant";
  let stopReason = "end_turn";
  let stopSequence = null;
  let sawClaudeEvent = false;
  let sawClaudeTerminal = false;
  const closedBlockIndexes = new Set<number>();

  const mergeUsage = (incoming) => {
    const usageRecord = toRecord(incoming);
    for (const [key, value] of Object.entries(usageRecord)) {
      if (typeof value === "number" && Number.isFinite(value)) {
        usage[key] = value;
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        usage[key] = { ...toRecord(usage[key]), ...toRecord(value) };
      } else if (typeof value === "string" && value.trim().length > 0) {
        usage[key] = value;
      }
    }
  };

  const tryParseJson = (raw) => {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  };

  for (const payload of payloads) {
    const eventType = toString(payload.type);
    if (eventType === "message_start") {
      sawClaudeEvent = true;
      const message = toRecord(payload.message);
      messageId = toString(message.id, messageId || `msg_${Date.now()}`);
      model = toString(message.model, model);
      role = toString(message.role, role);
      mergeUsage(message.usage);
      continue;
    }

    if (eventType === "content_block_start") {
      sawClaudeEvent = true;
      const index = toNumber(payload.index, blocks.size);
      const contentBlock = toRecord(payload.content_block);
      const blockType = toString(contentBlock.type);

      if (blockType === "thinking") {
        blocks.set(index, {
          type: "thinking",
          index,
          thinking: toString(contentBlock.thinking),
          signature: toString(contentBlock.signature) || undefined,
        });
      } else if (blockType === "tool_use") {
        blocks.set(index, {
          type: "tool_use",
          index,
          id: toString(contentBlock.id, `toolu_${Date.now()}_${index}`),
          name: toString(contentBlock.name),
          input: contentBlock.input ?? {},
          inputJson: "",
        });
      } else {
        blocks.set(index, {
          type: "text",
          index,
          text: toString(contentBlock.text),
        });
      }
      continue;
    }

    if (eventType === "content_block_delta") {
      sawClaudeEvent = true;
      const index = toNumber(payload.index, 0);
      const delta = toRecord(payload.delta);
      const deltaType = toString(delta.type);
      const existing = blocks.get(index);

      if (deltaType === "input_json_delta") {
        const toolUse =
          existing && existing.type === "tool_use"
            ? existing
            : {
                type: "tool_use",
                index,
                id: `toolu_${Date.now()}_${index}`,
                name: "",
                input: {},
                inputJson: "",
              };
        toolUse.inputJson += toString(delta.partial_json);
        blocks.set(index, toolUse);
        continue;
      }

      const isThinkingDelta = deltaType === "thinking_delta" || typeof delta.thinking === "string";
      const isSignatureDelta =
        deltaType === "signature_delta" || typeof delta.signature === "string";
      if (isThinkingDelta || isSignatureDelta) {
        const thinking =
          existing && existing.type === "thinking"
            ? existing
            : { type: "thinking", index, thinking: "", signature: undefined };
        if (isThinkingDelta) thinking.thinking += toString(delta.thinking);
        const signature = toString(delta.signature);
        if (signature) thinking.signature = `${thinking.signature || ""}${signature}`;
        blocks.set(index, thinking);
        continue;
      }

      const textBlock =
        existing && existing.type === "text"
          ? existing
          : {
              type: "text",
              index,
              text: "",
            };
      textBlock.text += toString(delta.text);
      blocks.set(index, textBlock);
      continue;
    }

    if (eventType === "content_block_stop") {
      closedBlockIndexes.add(toNumber(payload.index, -1));
    }

    if (eventType === "message_stop") {
      sawClaudeTerminal = true;
    }

    if (eventType === "message_delta") {
      sawClaudeEvent = true;
      const delta = toRecord(payload.delta);
      if (delta.stop_reason != null && delta.stop_reason !== "") sawClaudeTerminal = true;
      stopReason = toString(delta.stop_reason, stopReason);
      stopSequence =
        typeof delta.stop_sequence === "string" ? String(delta.stop_sequence) : stopSequence;
      mergeUsage(payload.usage);
      continue;
    }

    mergeUsage(payload.usage);
  }

  if (!sawClaudeEvent) return null;

  const content = [];
  const toolUseCompleteness: boolean[] = [];
  for (const block of [...blocks.values()].sort((a, b) => a.index - b.index)) {
    if (block.type === "text") {
      if (block.text) content.push({ type: "text", text: block.text });
      continue;
    }
    if (block.type === "thinking") {
      const hasSignature = typeof block.signature === "string" && block.signature.length > 0;
      if (block.thinking || hasSignature) {
        content.push({
          type: "thinking",
          thinking: block.thinking || "",
          ...(hasSignature ? { signature: block.signature } : {}),
        });
      }
      continue;
    }

    const input = block.inputJson.trim().length > 0 ? tryParseJson(block.inputJson) : block.input;
    content.push({ type: "tool_use", id: block.id, name: block.name, input });
    toolUseCompleteness.push(isClaudeToolUseComplete(block, closedBlockIndexes.has(block.index)));
  }

  // #18432 — content but no message_stop / stop_reason / [DONE]: the stream was cut.
  const streamCut = !sawClaudeTerminal && content.length > 0 && !hasSseDoneMarker(rawSSE);
  if (streamCut) {
    stopReason = TRUNCATED_STREAM_CLAUDE_STOP_REASON;
  }
  // #18460 follow-up — a tool_use cut mid input_json_delta must not reach the client.
  const keptToolUses = withholdCutToolCalls(streamCut, toolUseCompleteness, Boolean);

  return markTruncatedStreamBody(
    {
      id: messageId || `msg_${Date.now()}`,
      type: "message",
      role,
      model,
      content:
        keptToolUses.length === toolUseCompleteness.length
          ? content
          : content.filter((block) => block.type !== "tool_use"),
      stop_reason: stopReason,
      ...(stopSequence ? { stop_sequence: stopSequence } : {}),
      ...(Object.keys(usage).length > 0 ? { usage } : {}),
    },
    streamCut
  );
}

/**
 * Convert Responses API SSE events into a single non-streaming response object.
 * Expects events such as response.created / response.in_progress / response.completed.
 */
const RESPONSES_TERMINAL_EVENT_TYPES = new Set([
  "response.completed",
  "response.done",
  "response.cancelled",
  "response.canceled",
  "response.failed",
  "response.incomplete",
]);

function toOutputIndex(value) {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isInteger(parsed)) return parsed;
  }
  return null;
}

function toIdString(value) {
  return value === null || value === undefined ? "" : String(value);
}

function cloneResponseItem(item) {
  const record = toRecord(item);
  return {
    ...record,
    id: record.id != null ? String(record.id) : record.id,
    call_id: record.call_id != null ? String(record.call_id) : record.call_id,
    ...(Array.isArray(record.content)
      ? {
          content: record.content.map((contentPart) => {
            const part = toRecord(contentPart);
            return { ...part };
          }),
        }
      : {}),
    ...(Array.isArray(record.summary)
      ? {
          summary: record.summary.map((summaryPart) => {
            const part = toRecord(summaryPart);
            return { ...part };
          }),
        }
      : {}),
  };
}

function ensureResponsesMessageItem(outputItems, outputIndex, itemId) {
  const existing = outputItems.get(outputIndex);
  if (existing?.type === "message") return existing;

  const next = {
    ...(existing && typeof existing === "object" ? existing : {}),
    id: toIdString(itemId) || (existing?.id != null ? String(existing.id) : undefined),
    type: "message",
    role: "assistant",
    content: Array.isArray(existing?.content)
      ? existing.content.map((contentPart) => ({ ...toRecord(contentPart) }))
      : [{ type: "output_text", annotations: [], text: "" }],
  };

  if (next.content.length === 0) {
    next.content.push({ type: "output_text", annotations: [], text: "" });
  }

  outputItems.set(outputIndex, next);
  return next;
}

function ensureResponsesReasoningItem(outputItems, outputIndex, itemId) {
  const existing = outputItems.get(outputIndex);
  if (existing?.type === "reasoning") return existing;

  const next = {
    ...(existing && typeof existing === "object" ? existing : {}),
    id:
      itemId ||
      (existing?.id != null ? String(existing.id) : null) ||
      `rs_${Date.now()}_${outputIndex}`,
    type: "reasoning",
    summary: Array.isArray(existing?.summary)
      ? existing.summary.map((summaryPart) => ({ ...toRecord(summaryPart) }))
      : [{ type: "summary_text", text: "" }],
  };

  if (next.summary.length === 0) {
    next.summary.push({ type: "summary_text", text: "" });
  }

  outputItems.set(outputIndex, next);
  return next;
}

function ensureResponsesFunctionCallItem(outputItems, outputIndex, itemId, callId, name) {
  const existing = outputItems.get(outputIndex);
  const normalizedItemId = toIdString(itemId);
  const normalizedCallId = toIdString(callId);
  const existingId = existing?.id != null ? String(existing.id) : "";
  const existingCallId = existing?.call_id != null ? String(existing.call_id) : "";

  if (existing?.type === "function_call") {
    if (existing.call_id != null) existing.call_id = String(existing.call_id);
    if (existing.id != null) existing.id = String(existing.id);
    if (normalizedCallId && !existing.call_id) existing.call_id = normalizedCallId;
    if (name && !existing.name) existing.name = name;
    if (normalizedItemId && !existing.id) existing.id = normalizedItemId;
    return existing;
  }

  const next = {
    ...(existing && typeof existing === "object" ? existing : {}),
    id:
      normalizedItemId || existingId || `fc_${normalizedCallId || `${Date.now()}_${outputIndex}`}`,
    type: "function_call",
    call_id: normalizedCallId || existingCallId || "",
    name: name || existing?.name || "",
    arguments: typeof existing?.arguments === "string" ? existing.arguments : "",
  };

  outputItems.set(outputIndex, next);
  return next;
}

function recoverEmptyMessageSnapshot(existing, incoming) {
  const next = cloneResponseItem(incoming);
  if (!existing || typeof existing !== "object") return next;

  // An empty snapshot must not erase text already received for this message.
  // Non-text parts (especially refusals) remain authoritative, as do explicit
  // different identities. Preserve terminal metadata and only recover content.
  if (
    existing.type === "message" &&
    next.type === "message" &&
    (!existing.id || !next.id || String(existing.id) === String(next.id)) &&
    Array.isArray(next.content) &&
    next.content.every((part) => part.type === "output_text" && !part.text) &&
    Array.isArray(existing.content) &&
    existing.content.some(
      (part) =>
        (part.type === "output_text" && typeof part.text === "string" && part.text.length > 0) ||
        (part.type === "refusal" && typeof part.refusal === "string" && part.refusal.length > 0)
    )
  ) {
    next.content = existing.content.map((part) => ({ ...toRecord(part) }));
  }
  return next;
}

function mergeResponseItems(existing, incoming) {
  const next = recoverEmptyMessageSnapshot(existing, incoming);
  if (!existing || typeof existing !== "object") return next;

  return {
    ...existing,
    ...next,
    ...(Array.isArray(next.content)
      ? {
          content: next.content,
        }
      : {}),
    ...(Array.isArray(next.summary)
      ? {
          summary: next.summary,
        }
      : {}),
  };
}

function hasNonEmptyText(parts: unknown, field: string): boolean {
  return (
    Array.isArray(parts) &&
    parts.some((part) => {
      const value = toRecord(part)[field];
      return typeof value === "string" && value.length > 0;
    })
  );
}

/** True when the output carries model content (text, refusal, reasoning or a call). */
function responsesOutputHasContent(items: unknown[]): boolean {
  return items.some((item) => {
    const record = toRecord(item);
    if (record.type === "message") {
      return hasNonEmptyText(record.content, "text") || hasNonEmptyText(record.content, "refusal");
    }
    if (record.type === "reasoning") return hasNonEmptyText(record.summary, "text");
    return typeof record.type === "string" && record.type.endsWith("_call");
  });
}

/** Snapshot statuses that mean the response never settled. */
const RESPONSES_UNSETTLED_STATUSES = new Set(["in_progress", "queued"]);

/**
 * Final `status` (+ `incomplete_details`) of a buffered Responses stream. A stream that
 * produced output but closed before any terminal event, with its snapshot still
 * unsettled, was cut (#18432): report it `incomplete` so the chat translation maps it to
 * `length` instead of `stop`. A snapshot's own `incomplete_details` is preserved.
 */
function resolveResponsesTerminalStatus(
  picked: Record<string, unknown>,
  status: unknown,
  sawTerminalEvent: boolean,
  producedOutput: boolean
): { status: unknown; incomplete_details?: unknown } {
  if (!sawTerminalEvent && producedOutput && RESPONSES_UNSETTLED_STATUSES.has(String(status))) {
    return {
      status: "incomplete",
      incomplete_details: { reason: TRUNCATED_STREAM_RESPONSES_INCOMPLETE_REASON },
    };
  }
  return picked.incomplete_details != null
    ? { status, incomplete_details: picked.incomplete_details }
    : { status };
}

/**
 * Output of a cut Responses stream without its unfinished calls (#18460 follow-up). A
 * `function_call` is complete when its `arguments` is a whole JSON object, or empty with
 * the item already `completed` by the upstream. Same all-or-nothing rule as the chat and
 * Claude parsers (`withholdCutToolCalls`).
 */
function withholdCutResponsesFunctionCalls(streamCut: boolean, items: unknown[]): unknown[] {
  const calls = items.filter((item) => toRecord(item).type === "function_call");
  const kept = withholdCutToolCalls(streamCut, calls, (item) => {
    const record = toRecord(item);
    return isCompleteToolCallArguments(record.arguments, record.status === "completed");
  });
  if (kept.length === calls.length) return items;
  return items.filter((item) => toRecord(item).type !== "function_call");
}

export function parseSSEToResponsesOutput(rawSSE, fallbackModel) {
  const lines = String(rawSSE || "").split("\n");
  const events = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const parsed = JSON.parse(payload);
      const record = toRecord(parsed);
      if (Object.keys(record).length > 0) {
        events.push(record);
      }
    } catch {
      // Ignore malformed lines and continue best-effort parsing.
    }
  }

  if (events.length === 0) return null;

  let terminalResponse = null;
  let terminalEventType = "";
  let latestResponse = null;
  const outputItems = new Map();

  for (const evt of events) {
    const eventType = toString(evt?.type);
    const outputIndex = toOutputIndex(evt?.output_index);
    const item = toRecord(evt?.item);

    if (outputIndex !== null && eventType === "response.output_item.added") {
      outputItems.set(outputIndex, cloneResponseItem(item));
    }

    if (outputIndex !== null && eventType === "response.output_item.done") {
      const existing = outputItems.get(outputIndex);
      outputItems.set(outputIndex, mergeResponseItems(existing, item));
    }

    if (
      outputIndex !== null &&
      (eventType === "response.output_text.delta" || eventType === "response.refusal.delta")
    ) {
      const refusal = eventType === "response.refusal.delta";
      const field = refusal ? "refusal" : "text";
      const contentIndex = toOutputIndex(evt.content_index) ?? 0;
      // Untrusted sparse indices must not allocate enormous reconstructed arrays.
      if (contentIndex < 0 || contentIndex >= 4096) continue;
      const messageItem = ensureResponsesMessageItem(outputItems, outputIndex, evt.item_id);
      const content = Array.isArray(messageItem.content) ? messageItem.content : [];
      const firstPart = { ...toRecord(content[contentIndex]) };
      firstPart.type = refusal ? "refusal" : "output_text";
      if (!refusal)
        firstPart.annotations = Array.isArray(firstPart.annotations) ? firstPart.annotations : [];
      firstPart[field] = `${toString(firstPart[field])}${toString(evt.delta)}`;
      if (refusal) delete firstPart.text;
      content[contentIndex] = firstPart;
      messageItem.content = content;
    }

    if (
      outputIndex !== null &&
      (eventType === "response.output_text.done" || eventType === "response.refusal.done")
    ) {
      const refusal = eventType === "response.refusal.done";
      const field = refusal ? "refusal" : "text";
      const contentIndex = toOutputIndex(evt.content_index) ?? 0;
      if (contentIndex < 0 || contentIndex >= 4096) continue;
      const messageItem = ensureResponsesMessageItem(outputItems, outputIndex, evt.item_id);
      const content = Array.isArray(messageItem.content) ? messageItem.content : [];
      const firstPart = { ...toRecord(content[contentIndex]) };
      firstPart.type = refusal ? "refusal" : "output_text";
      if (!refusal)
        firstPart.annotations = Array.isArray(firstPart.annotations) ? firstPart.annotations : [];
      firstPart[field] = toString(evt[field]) || toString(firstPart[field]);
      if (refusal) delete firstPart.text;
      content[contentIndex] = firstPart;
      messageItem.content = content;
    }

    if (outputIndex !== null && eventType === "response.reasoning_summary_text.delta") {
      const reasoningItem = ensureResponsesReasoningItem(
        outputItems,
        outputIndex,
        toIdString(evt.item_id)
      );
      const summary = Array.isArray(reasoningItem.summary) ? reasoningItem.summary : [];
      // #9500 — respect summary_index: each segment is a distinct summary_text
      // part. Place deltas at summary[summary_index] (growing the array) so
      // segments are preserved for later "\n\n" joining on the non-stream path,
      // instead of overwriting summary[0] regardless of index.
      const summaryIndex = typeof evt.summary_index === "number" ? evt.summary_index : 0;
      const part =
        summary[summaryIndex] && typeof summary[summaryIndex] === "object"
          ? { ...toRecord(summary[summaryIndex]) }
          : { type: "summary_text", text: "" };
      part.type = part.type || "summary_text";
      part.text = `${toString(part.text)}${toString(evt.delta)}`;
      summary[summaryIndex] = part;
      reasoningItem.summary = summary;
    }

    if (outputIndex !== null && eventType === "response.reasoning_summary_text.done") {
      const reasoningItem = ensureResponsesReasoningItem(
        outputItems,
        outputIndex,
        toIdString(evt.item_id)
      );
      const summary = Array.isArray(reasoningItem.summary) ? reasoningItem.summary : [];
      // #9500 — respect summary_index on the terminal done event too.
      const summaryIndex = typeof evt.summary_index === "number" ? evt.summary_index : 0;
      const part =
        summary[summaryIndex] && typeof summary[summaryIndex] === "object"
          ? { ...toRecord(summary[summaryIndex]) }
          : { type: "summary_text", text: "" };
      part.type = part.type || "summary_text";
      part.text = toString(evt.text, toString(part.text));
      summary[summaryIndex] = part;
      reasoningItem.summary = summary;
    }

    if (outputIndex !== null && eventType === "response.function_call_arguments.delta") {
      const functionCallItem = ensureResponsesFunctionCallItem(
        outputItems,
        outputIndex,
        toIdString(evt.item_id),
        "",
        ""
      );
      functionCallItem.arguments = `${toString(functionCallItem.arguments)}${toString(evt.delta)}`;
    }

    if (outputIndex !== null && eventType === "response.function_call_arguments.done") {
      const functionCallItem = ensureResponsesFunctionCallItem(
        outputItems,
        outputIndex,
        toIdString(evt.item_id),
        "",
        ""
      );
      functionCallItem.arguments = toString(evt.arguments, toString(functionCallItem.arguments));
    }

    if (RESPONSES_TERMINAL_EVENT_TYPES.has(eventType) && evt.response) {
      terminalResponse = evt.response;
      terminalEventType = eventType;
    }
    if (evt?.response && typeof evt.response === "object") {
      latestResponse = evt.response;
    } else if (evt?.object === "response") {
      latestResponse = evt;
    }
  }

  const picked = pickResponsesSnapshot(terminalResponse, latestResponse, events);
  if (!picked || typeof picked !== "object") return null;
  const reconstructedOutput = [...outputItems.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, item]) => item)
    .filter((item) => item && typeof item === "object");
  const reconstructedById = new Map(
    reconstructedOutput.filter((item) => item.id != null).map((item) => [String(item.id), item])
  );
  const pickedOutput = Array.isArray(picked.output)
    ? picked.output.map((item, index) => {
        const record = toRecord(item);
        const existing =
          (record.id != null ? reconstructedById.get(String(record.id)) : undefined) ??
          outputItems.get(index);
        return recoverEmptyMessageSnapshot(existing, record);
      })
    : [];
  // #3948 — A Responses-API terminal snapshot (`response.completed`) can carry a
  // non-empty `output` that LACKS the assistant message item (e.g. only a
  // `reasoning` item) even though the streamed `output_text` deltas reconstructed
  // a full message. Preferring such a textless terminal output drops the
  // assistant text → empty content on `stream:false` (n8n combo). When the
  // terminal output has no message item but the reconstructed delta output does,
  // use the reconstructed output (a superset carrying the message). The terminal
  // snapshot still wins whenever it already contains the message item.
  const outputHasMessage = (items: unknown[]) =>
    items.some((item) => toRecord(item).type === "message");
  const chosenOutput =
    pickedOutput.length > 0 &&
    !outputHasMessage(pickedOutput) &&
    outputHasMessage(reconstructedOutput)
      ? reconstructedOutput
      : pickedOutput.length > 0
        ? pickedOutput
        : reconstructedOutput;
  const statusFallback =
    terminalEventType === "response.cancelled"
      ? "cancelled"
      : terminalEventType === "response.canceled"
        ? "canceled"
        : terminalEventType === "response.failed"
          ? "failed"
          : terminalEventType === "response.incomplete"
            ? "incomplete"
            : terminalResponse
              ? "completed"
              : "in_progress";

  const terminalStatus = resolveResponsesTerminalStatus(
    picked,
    picked.status || statusFallback,
    !!terminalResponse,
    responsesOutputHasContent(chosenOutput)
  );
  // #18460 follow-up — a function_call cut mid arguments must not reach the client.
  const streamCut = !terminalResponse && terminalStatus.status === "incomplete";
  const finalOutput = withholdCutResponsesFunctionCalls(streamCut, chosenOutput);

  return markTruncatedStreamBody(
    {
      id: picked.id != null ? String(picked.id) : `resp_${Date.now()}`,
      object: picked.object || "response",
      model: picked.model || fallbackModel || "unknown",
      output: finalOutput.map((item) => {
        const record = toRecord(item);
        return {
          ...record,
          id: record.id != null ? String(record.id) : record.id,
          call_id: record.call_id != null ? String(record.call_id) : record.call_id,
        };
      }),
      usage: picked.usage || null,
      ...terminalStatus,
      ...(picked.error != null ? { error: picked.error } : {}),
      created_at: picked.created_at || Math.floor(Date.now() / 1000),
      metadata: picked.metadata || {},
    },
    streamCut
  );
}
