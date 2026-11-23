import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { CLAUDE_OAUTH_TOOL_PREFIX } from "../request/openai-to-claude.ts";
import { hasToolCallShim, applyToolCallShimToBuffer } from "../helpers/toolCallShim.ts";
import { appendToolCallArgumentDelta } from "../../utils/toolCallArguments.ts";
import { openAIFinishReasonToClaudeStopReason } from "../../utils/finishReason.ts";
import {
  isInternalReasoningPlaceholder,
  stripInternalReasoningPlaceholder,
} from "../../utils/reasoningPlaceholder.ts";
import { REVERSE_MAP, restoreClaudeToolName } from "../../services/claudeCodeToolRemapper.ts";
import { sanitizeToolId } from "../helpers/schemaCoercion.ts";
import { splitMarkdownBoundary } from "../helpers/markdownBoundary.ts";
import { hasDsmlToolCalls, parseDsmlToolCalls } from "../../utils/dsmlToolCalls.ts";
import {
  createDirectivePreambleStripper,
  createSystemPreambleStripper,
} from "../../utils/directivePreambleStripper.ts";
import {
  containsOrMayEndWithThinkOpenTag,
  flushThinkBuffer,
  initThinkState,
  processStreamingThinkDelta,
} from "../../utils/thinkTagParser.ts";

function normalizeToolName(name: string): string {
  return REVERSE_MAP[name] ?? name;
}

interface XmlToolCall {
  id: string;
  name: string;
  args: Record<string, string>;
}

/**
 * Extract complete XML <invoke> blocks from text content.
 * Some models (e.g. nvidia/abacusai/dracarys) emit tool calls as
 * XML blocks instead of JSON tool_calls. This function detects
 * <invoke name="ToolName"><parameter name="arg">value</parameter></invoke>
 * blocks, converts them to tool calls, and returns the cleaned text.
 * Incomplete XML is buffered in state for the next chunk.
 */
function extractXmlInvokeBlocks(
  text: string,
  state
): { cleaned: string; toolCalls: XmlToolCall[] } {
  const toolCalls: XmlToolCall[] = [];
  const combined = (state._xmlInvokeBuffer || "") + text;
  state._xmlInvokeBuffer = "";
  let remaining = combined;
  let cleaned = "";

  while (remaining.length > 0) {
    // Find all possible tool call patterns and pick the earliest
    const invokeMatch = remaining.match(/<invoke\s+name="([^"]*)"\s*>/);
    const toolCallTagMatch = remaining.match(/<tool_call>/);
    const toolCallTextMatch = remaining.match(/TOOL_CALL\s+([A-Za-z0-9_]+):\s*/);

    const matches = [
      invokeMatch
        ? { type: "invoke" as const, index: invokeMatch.index!, data: invokeMatch }
        : null,
      toolCallTagMatch
        ? { type: "tool_call_tag" as const, index: toolCallTagMatch.index!, data: toolCallTagMatch }
        : null,
      toolCallTextMatch
        ? {
            type: "tool_call_text" as const,
            index: toolCallTextMatch.index!,
            data: toolCallTextMatch,
          }
        : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      cleaned += remaining;
      break;
    }

    const first = matches[0]!;
    cleaned += remaining.slice(0, first.index);
    const rest = remaining.slice(first.index);

    if (first.type === "invoke") {
      const startMatch = first.data;
      const endMatch = rest.match(/<\/invoke>/);
      if (!endMatch) {
        state._xmlInvokeBuffer = rest;
        break;
      }
      const innerXml = rest.slice(startMatch[0].length, endMatch.index!);
      const fullLength = endMatch.index! + endMatch[0].length;
      const args: Record<string, string> = {};
      const paramRegex = /<parameter\s+name="([^"]*)"[^>]*>([\s\S]*?)<\/parameter>/g;
      let pm;
      while ((pm = paramRegex.exec(innerXml)) !== null) {
        args[pm[1]] = pm[2].trim();
      }
      toolCalls.push({
        id: `toolu_xml_${Date.now()}_${toolCalls.length}`,
        name: startMatch[1],
        args,
      });
      remaining = rest.slice(fullLength);
    } else if (first.type === "tool_call_tag") {
      const endMatch = rest.match(/<\/tool_call>/);
      if (!endMatch) {
        state._xmlInvokeBuffer = rest;
        break;
      }
      const innerJson = rest.slice("<tool_call>".length, endMatch.index!).trim();
      const fullLength = endMatch.index! + "</tool_call>".length;
      try {
        const parsed = JSON.parse(innerJson) as Record<string, unknown>;
        const name = (parsed.name || parsed.tool_name || "") as string;
        const rawArgs = parsed.arguments || parsed.args || parsed.parameters || {};
        const args: Record<string, string> =
          typeof rawArgs === "string" ? JSON.parse(rawArgs) : (rawArgs as Record<string, string>);
        if (name) {
          toolCalls.push({ id: `toolu_txt_${Date.now()}_${toolCalls.length}`, name, args });
        }
      } catch {
        cleaned += rest.slice(0, fullLength);
      }
      remaining = rest.slice(fullLength);
    } else {
      const startMatch = first.data;
      const toolName = startMatch[1];
      const afterPrefix = rest.slice(startMatch[0].length);
      let depth = 0;
      let inString = false;
      let escape = false;
      let jsonEndIndex = -1;
      for (let i = 0; i < afterPrefix.length; i++) {
        const c = afterPrefix[i];
        if (escape) {
          escape = false;
          continue;
        }
        if (c === "\\" && inString) {
          escape = true;
          continue;
        }
        if (c === '"') {
          inString = !inString;
          continue;
        }
        if (!inString) {
          if (c === "{") depth++;
          else if (c === "}") {
            depth--;
            if (depth === 0) {
              jsonEndIndex = i + 1;
              break;
            }
          }
        }
      }
      if (jsonEndIndex === -1) {
        state._xmlInvokeBuffer = rest;
        break;
      }
      const jsonStr = afterPrefix.slice(0, jsonEndIndex);
      const fullLength = startMatch[0].length + jsonEndIndex;
      try {
        const args = JSON.parse(jsonStr) as Record<string, string>;
        toolCalls.push({ id: `toolu_txt_${Date.now()}_${toolCalls.length}`, name: toolName, args });
      } catch {
        cleaned += rest.slice(0, fullLength);
      }
      remaining = rest.slice(fullLength);
    }
  }

  return { cleaned, toolCalls };
}

// Read the reasoning an upstream sends in a dedicated field: reasoning_content
// (GLM, DeepSeek, ...), the `reasoning` alias, or reasoning_details[]
// (StepFun/OpenRouter).
function readNativeReasoning(delta): unknown {
  let reasoning = delta?.reasoning_content || delta?.reasoning;
  if (!reasoning && Array.isArray(delta?.reasoning_details)) {
    const parts: string[] = [];
    for (const detail of delta.reasoning_details) {
      if (detail && typeof detail === "object") {
        const text = detail.text || detail.content;
        if (typeof text === "string" && text) parts.push(text);
      }
    }
    if (parts.length > 0) reasoning = parts.join("");
  }
  return reasoning;
}

// Split reasoning that an OpenAI-compatible upstream inlines in `content` as
// <think>...</think> (DeepSeek-R1 mirrors, QwQ, K3, MiniMax-M3 on OpenAI-format
// tiers) so it reaches a Claude client as a thinking block instead of raw markup
// inside a text block. Gated per route by shouldParseTextualReasoningTags (via
// initThinkState): parsing every provider's content would corrupt legitimate
// replies that mention a literal <think>. The parser is streaming-safe — a tag
// split across chunks is held back until it can be decided — so whatever it
// still holds is flushed when the finish chunk arrives. Returns null when the
// route is not allowlisted or no tag has been seen, leaving content untouched.
function splitInlineThinkContent(
  content: unknown,
  state,
  model: unknown,
  finishing: boolean
): { content: string; reasoning: string } | null {
  if (!state.thinkState) {
    if (typeof content !== "string" || !content) return null;
    state.thinkState = initThinkState(
      true,
      state.provider,
      typeof model === "string" ? model : undefined
    );
  }
  const ctx = state.thinkState;
  if (!ctx.enabled) return null;

  let nextContent = "";
  let reasoning = "";
  if (typeof content === "string" && content) {
    if (ctx.active || containsOrMayEndWithThinkOpenTag(content)) {
      ctx.active = true;
      const { reasoningDelta, contentDelta } = processStreamingThinkDelta(content, ctx);
      reasoning += reasoningDelta || "";
      nextContent += contentDelta || "";
    } else {
      nextContent = content;
    }
  }
  if (finishing && ctx.active) {
    const { reasoningDelta, contentDelta } = flushThinkBuffer(ctx);
    reasoning += reasoningDelta || "";
    nextContent += contentDelta || "";
  }
  if (!ctx.active) return null;
  return { content: nextContent, reasoning };
}

// Helper: stop thinking block if started
function stopThinkingBlock(state, results) {
  if (!state.thinkingBlockStarted) return;
  results.push({
    type: "content_block_stop",
    index: state.thinkingBlockIndex,
  });
  state.thinkingBlockStarted = false;
}

// Helper: flush any buffered Markdown boundary text before closing a text block
function flushMarkdownBuffer(state, results) {
  const buffered = state._markdownBuffer;
  state._markdownCodeSpanRun = 0;
  state._markdownTrailingBackslash = false;
  state._markdownFenceRun = 0;
  state._markdownFenceOpening = false;
  state._markdownFenceClosingRun = 0;
  state._markdownLineIndent = 0;
  if (!buffered) return;
  state._markdownBuffer = "";
  if (!state.textBlockStarted) {
    state.textBlockIndex = state.nextBlockIndex++;
    state.textBlockStarted = true;
    state.textBlockClosed = false;
    results.push({
      type: "content_block_start",
      index: state.textBlockIndex,
      content_block: { type: "text", text: "" },
    });
  }
  if (!state.textBlockClosed) {
    results.push({
      type: "content_block_delta",
      index: state.textBlockIndex,
      delta: { type: "text_delta", text: buffered },
    });
  }
}

// Helper: stop text block if started
function stopTextBlock(state, results) {
  flushMarkdownBuffer(state, results);
  if (!state.textBlockStarted || state.textBlockClosed) return;
  state.textBlockClosed = true;
  results.push({
    type: "content_block_stop",
    index: state.textBlockIndex,
  });
  state.textBlockStarted = false;
}

// ── Tool-call keying ──────────────────────────────────────────────────────
// OpenAI streams key tool-call fragments by `index`, make `id` optional and let
// a provider reuse an index for a second call. `state.toolCalls` is keyed by the
// upstream index unless a NEW call reuses an occupied one: that call gets a
// fresh negative key (never collides with a real index) and the upstream index
// is remapped to it, so later id-less fragments follow the new call.
function isDistinctToolCall(existing, tc, incomingName: string): boolean {
  // A synthetic id (id-less registration) adopts the first real id instead.
  if (tc.id) return Boolean(existing.upstreamId) && tc.id !== existing.upstreamId;
  return Boolean(
    incomingName && existing.name && incomingName !== existing.name && existing.argBuffer
  );
}

function resolveToolCallKey(state, tc, incomingName: string): number {
  const upstreamIdx = typeof tc.index === "number" ? tc.index : 0;
  if (!(state._toolIdxRemap instanceof Map)) state._toolIdxRemap = new Map();
  const key = state._toolIdxRemap.get(upstreamIdx) ?? upstreamIdx;
  const existing = state.toolCalls.get(key);
  if (!existing || !isDistinctToolCall(existing, tc, incomingName)) return key;
  const fresh = typeof state._toolKeySeq === "number" ? state._toolKeySeq : -1;
  state._toolKeySeq = fresh - 1;
  state._toolIdxRemap.set(upstreamIdx, fresh);
  return fresh;
}

function createToolCallEntry(tc, incomingName: string) {
  return {
    // An id-less call still needs an addressable tool_use id (sanitizeToolId
    // mints a random one); a real id arriving before the block opens wins.
    id: sanitizeToolId(tc.id || undefined),
    upstreamId: tc.id || "",
    syntheticId: !tc.id,
    name: incomingName,
    blockIndex: undefined,
    // Shimmed tools buffer their raw args and emit a single corrected
    // input_json_delta at content_block_stop time (see finish handler).
    shimmed: incomingName ? hasToolCallShim(incomingName) : false,
    argBuffer: "",
    startEmitted: false,
    // Arguments arrived before any id/name: hold them until the call is known.
    awaitingIdentity: !tc.id && !incomingName,
  };
}

function adoptToolCallIdentity(toolInfo, tc, incomingName: string): void {
  if (tc.id && !toolInfo.startEmitted && (toolInfo.syntheticId || !toolInfo.id)) {
    toolInfo.id = sanitizeToolId(tc.id);
    toolInfo.upstreamId = tc.id;
    toolInfo.syntheticId = false;
  }
  if (incomingName && !toolInfo.startEmitted && !toolInfo.name) {
    toolInfo.name = incomingName;
    toolInfo.shimmed = hasToolCallShim(incomingName);
  }
  if (tc.id || incomingName) toolInfo.awaitingIdentity = false;
}

function ensureToolBlockIndex(state, toolInfo, results): void {
  if (typeof toolInfo.blockIndex === "number") return;
  stopThinkingBlock(state, results);
  stopTextBlock(state, results);
  toolInfo.blockIndex = state.nextBlockIndex++;
}

// Emit content_block_start, then replay arguments held before the block opened
// (shimmed tools emit their corrected arguments at stop time instead).
function emitToolUseStart(state, toolInfo, results): void {
  ensureToolBlockIndex(state, toolInfo, results);
  toolInfo.startEmitted = true;
  results.push({
    type: "content_block_start",
    index: toolInfo.blockIndex,
    content_block: { type: "tool_use", id: toolInfo.id, name: toolInfo.name || "", input: {} },
  });
  if (toolInfo.argBuffer && !toolInfo.shimmed) {
    results.push({
      type: "content_block_delta",
      index: toolInfo.blockIndex,
      delta: { type: "input_json_delta", partial_json: toolInfo.argBuffer },
    });
  }
}

const EARLY_EOF_MESSAGE = "Upstream stream ended without a terminal marker";

// EOF without any finish_reason is a truncated turn, not a success: close the
// open blocks and end with an Anthropic `error` event instead of fabricating an
// `end_turn`. state.upstreamError makes stream.ts record the failure (same
// contract as the openai→responses flush, #15309).
function flushTruncatedClaudeStream(state) {
  if (!state.messageStartSent || state.claudeFinishEmitted || state.upstreamError) return null;
  state.claudeFinishEmitted = true;
  const results = [];
  stopThinkingBlock(state, results);
  stopTextBlock(state, results);
  for (const [, toolInfo] of state.toolCalls) {
    if (!toolInfo.startEmitted || typeof toolInfo.blockIndex !== "number") continue;
    results.push({ type: "content_block_stop", index: toolInfo.blockIndex });
  }
  state.upstreamError = {
    status: 502,
    type: "server_error",
    code: "stream_early_eof",
    message: EARLY_EOF_MESSAGE,
  };
  results.push({ type: "error", error: { type: "api_error", message: EARLY_EOF_MESSAGE } });
  return results;
}

// First numeric value among `candidates`, else 0. Used to read usage fields
// that upstreams report under either Chat Completions or Responses naming.
function firstNumber(...candidates: unknown[]): number {
  for (const value of candidates) {
    if (typeof value === "number") return value;
  }
  return 0;
}

// Normalize an upstream usage block to prompt/output/cache counters, accepting
// both OpenAI chat-completions naming (prompt_tokens / completion_tokens /
// prompt_tokens_details) and Responses naming (input_tokens / output_tokens /
// input_tokens_details): several OpenAI-compatible upstreams report the latter,
// and the rest of the pipeline (stream.ts usage aggregation, usageTracking.ts,
// openai-responses.ts) already reads both.
function readUsageCounters(usage) {
  const promptDetails = usage.prompt_tokens_details;
  const inputDetails = usage.input_tokens_details;
  return {
    promptTokens: firstNumber(usage.prompt_tokens, usage.input_tokens),
    outputTokens: firstNumber(usage.completion_tokens, usage.output_tokens),
    cacheReadTokens: firstNumber(promptDetails?.cached_tokens ?? inputDetails?.cached_tokens),
    cacheCreateTokens: firstNumber(
      promptDetails?.cache_creation_tokens ?? inputDetails?.cache_creation_tokens
    ),
    writeInPrompt: (promptDetails ?? inputDetails)?.cache_creation_in_prompt !== false,
    reasoningTokens: firstNumber(
      usage.completion_tokens_details?.reasoning_tokens ??
        usage.output_tokens_details?.reasoning_tokens ??
        usage.reasoning_tokens
    ),
  };
}

// Harvest the upstream usage block from any chunk, including trailing
// usage-only chunks that carry `choices: []` (#11817).
function trackUsageFromChunk(chunk, state) {
  if (!chunk.usage || typeof chunk.usage !== "object") return;
  const {
    promptTokens,
    outputTokens,
    cacheReadTokens,
    cacheCreateTokens,
    writeInPrompt,
    reasoningTokens,
  } = readUsageCounters(chunk.usage);

  // #2215 reports cache creation outside prompt_tokens.
  const inputTokens = Math.max(
    0,
    promptTokens - cacheReadTokens - (writeInPrompt ? cacheCreateTokens : 0)
  );

  state.usage = {
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  };

  // Add cache_read_input_tokens if present
  if (cacheReadTokens > 0) {
    state.usage.cache_read_input_tokens = cacheReadTokens;
  }

  // Add cache_creation_input_tokens if present
  if (cacheCreateTokens > 0) {
    state.usage.cache_creation_input_tokens = cacheCreateTokens;
  }

  // Reasoning is already included in output_tokens — never add it on top. Keep the
  // count on the shared state so streaming usage accounting (tokens_reasoning) does
  // not lose it on this pivot; message_delta strips it from the client payload.
  if (reasoningTokens > 0) {
    state.usage.reasoning_tokens = reasoningTokens;
  }
}

// Client-facing Claude usage: the accounting-only reasoning_tokens is not part of
// the Anthropic usage shape.
function toClaudeClientUsage(usage) {
  if (!usage) return { input_tokens: 0, output_tokens: 0 };
  if (usage.reasoning_tokens === undefined) return usage;
  const clientUsage = { ...usage };
  delete clientUsage.reasoning_tokens;
  return clientUsage;
}

// Convert OpenAI stream chunk to Claude format
export function openaiToClaudeResponse(chunk, state) {
  if (!chunk && !state.pendingClaudeFinishChoice) return flushTruncatedClaudeStream(state);

  const results: Record<string, unknown>[] = [];
  const chunkUsage = chunk?.usage;
  const hasChunkUsage = chunkUsage && typeof chunkUsage === "object";

  // Usage must be harvested BEFORE the choices guard: many OpenAI-compatible
  // upstreams (Fireworks, vLLM, Together, …) deliver the authoritative usage
  // block — including prompt_tokens_details.cached_tokens — on a trailing
  // usage-only chunk shaped `{"choices":[],"usage":{...}}`. Returning early on
  // that chunk discarded the real numbers and left downstream accounting on
  // OmniRoute's own tokenizer estimate (#11817).
  //
  // Harvesting alone is not enough: if the finish_reason chunk arrives BEFORE
  // this trailing usage chunk (the normal order for these upstreams), the
  // finish block below fires immediately and emits message_delta with
  // whatever state.usage held at that moment — zero/stale, since the real
  // trailing chunk hasn't been seen yet. The finish deferral below
  // (pendingClaudeFinishChoice) holds the terminal emission open until either
  // real usage has arrived or a genuine flush forces it, so the message_delta
  // actually sent to the client carries the correct numbers (#11817 follow-up).
  if (chunk) trackUsageFromChunk(chunk, state);

  const chunkChoice = chunk?.choices?.[0];
  const flushingPendingFinish = !chunkChoice && Boolean(state.pendingClaudeFinishChoice);
  const choice = chunkChoice || state.pendingClaudeFinishChoice;
  if (!choice) return null;
  if (flushingPendingFinish) state.pendingClaudeFinishChoice = null;
  const delta = choice.delta;
  // First chunk - ALWAYS send message_start first
  if (!state.messageStartSent) {
    state.messageStartSent = true;
    state.messageId = chunk.id?.replace("chatcmpl-", "") || `msg_${Date.now()}`;
    if (!state.messageId || state.messageId === "chat" || state.messageId.length < 8) {
      state.messageId =
        chunk.extend_fields?.requestId || chunk.extend_fields?.traceId || `msg_${Date.now()}`;
    }
    state.model = chunk.model || "unknown";
    state.nextBlockIndex = 0;
    state._pendingXmlToolCalls = [];
    state._dsmlHoldback = undefined;
    state._xmlInvokeBuffer = "";
    state._markdownBuffer = "";
    state._markdownCodeSpanRun = 0;
    state._markdownTrailingBackslash = false;
    state._markdownFenceRun = 0;
    state._markdownFenceOpening = false;
    state._markdownFenceClosingRun = 0;
    state._markdownLineIndent = 0;
    results.push({
      type: "message_start",
      message: {
        id: state.messageId,
        type: "message",
        role: "assistant",
        model: state.model,
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 0, output_tokens: 0 },
      },
    });
  }

  // Inline <think>...</think> in content (allowlisted textual-reasoning routes
  // only). Runs first so the extracted reasoning flows through the thinking
  // branch below — same requestedThinking gate and _reasoningAccum — and the
  // directive/system-preamble strippers only ever see the visible answer.
  const inlineThink = splitInlineThinkContent(
    delta?.content,
    state,
    chunk?.model || state.model,
    Boolean(choice.finish_reason) && !state.claudeFinishEmitted
  );
  const content = inlineThink ? inlineThink.content : delta?.content;

  // Handle reasoning_content (thinking) - GLM, DeepSeek, etc.
  // Also supports 'reasoning' field alias and reasoning_details[] (StepFun/OpenRouter)
  let reasoningContent = readNativeReasoning(delta);
  if (inlineThink?.reasoning) {
    reasoningContent =
      (typeof reasoningContent === "string" ? reasoningContent : "") + inlineThink.reasoning;
  }
  const hasReasoning =
    typeof reasoningContent === "string" &&
    reasoningContent !== "" &&
    !isInternalReasoningPlaceholder(reasoningContent);
  if (hasReasoning) {
    // Gate the thinking block EMISSION on requestedThinking, with the same
    // tri-state the non-streaming path documents (responseTranslator.ts):
    // `false` = client opted out, suppress; `true` = client opted in, relay;
    // `undefined` = legacy caller that never passed it, keep the original
    // "always a thinking block" relay. Only an explicit opt-out suppresses —
    // `=== true` here silently dropped reasoning for every legacy caller while
    // the JSON path kept relaying it (#12905 follow-up). The _reasoningAccum
    // accumulation below stays OUTSIDE the gate and always runs, so fix B still
    // synthesizes a text block for reasoning-only opt-out responses (no 502).
    if (state.requestedThinking !== false) {
      stopTextBlock(state, results);

      if (!state.thinkingBlockStarted) {
        state.thinkingBlockIndex = state.nextBlockIndex++;
        state.thinkingBlockStarted = true;
        results.push({
          type: "content_block_start",
          index: state.thinkingBlockIndex,
          content_block: { type: "thinking", thinking: "" },
        });
      }

      results.push({
        type: "content_block_delta",
        index: state.thinkingBlockIndex,
        delta: { type: "thinking_delta", thinking: reasoningContent },
      });
    }

    // FIX B: accumulate the reasoning text so the finish handler can synthesize
    // a text content block when the response ends reasoning-only (no ordinary
    // content block). Claude Code's autocompact parser extracts the summary from
    // a TEXT content block — a thinking block alone is judged "empty response"
    // and the compact is rejected, looping the session. When real content DOES
    // arrive, it starts its own text block and this buffer is simply ignored.
    state._reasoningAccum = (state._reasoningAccum || "") + reasoningContent;
  }

  // Refusal text is literal output, never input for XML/DSML tool-call shims.
  if (typeof delta?.refusal === "string" && delta.refusal) {
    if (!state.textBlockStarted) {
      state.textBlockIndex = state.nextBlockIndex++;
      state.textBlockStarted = true;
      state.textBlockClosed = false;
      results.push({
        type: "content_block_start",
        index: state.textBlockIndex,
        content_block: { type: "text", text: "" },
      });
    }
    results.push({
      type: "content_block_delta",
      index: state.textBlockIndex,
      delta: { type: "text_delta", text: delta.refusal },
    });
  }

  // Handle regular content — strip the internal reasoning placeholder if
  // the model echoed it through ordinary content (#8081). Only the content
  // block emission is skipped when nothing meaningful remains; the chunk
  // may still carry tool_calls / finish_reason below, which must still run.
  if (content) {
    const strippedContent = stripInternalReasoningPlaceholder(content);
    if (strippedContent) {
      // #reasoning-bilingual response side: DeepSeek-V4 and similar models echo the
      // OMNIROUTE_SYSTEM_INSTRUCTION_APPEND directive (appended to the system tail by
      // claude-to-openai.ts) verbatim at the START of their reply — the "system message
      // leak" the operator reports. When the directive is configured, run the stream's
      // first text chunk(s) through a preamble stripper so a leading reproduction is
      // dropped before it reaches the client.
      const directive = process.env.OMNIROUTE_SYSTEM_INSTRUCTION_APPEND?.trim();
      if (directive) {
        state._directiveStripper ??= createDirectivePreambleStripper(directive);
      }
      // #reasoning-bilingual response side (Phase B): DeepSeek-V4 and similar models
      // may also echo whole chunks of the system prompt at the START of their reply —
      // <analysis>/<system-reminder>/<summary> blocks or prose reproductions of the
      // superpowers skill section. Chained after the exact-directive stripper.
      //
      // OPT-IN (OMNIROUTE_STRIP_SYSTEM_PREAMBLE=1), mirroring the directive
      // stripper right above, which only runs when the operator configured
      // OMNIROUTE_SYSTEM_INSTRUCTION_APPEND. Unlike the exact-directive match,
      // this one recognises constructs by English-prose heuristics, so leaving it
      // default-on would mutate the payload of EVERY openai→claude stream and can
      // delete a legitimate section (a reply that genuinely opens with
      // "# Skill usage: ..." loses it). Operators who hit the system-echo leak
      // turn it on explicitly.
      if (process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE === "1") {
        state._systemPreambleStripper ??= createSystemPreambleStripper();
      }
      let scrubbedContent = state._directiveStripper
        ? state._directiveStripper(strippedContent)
        : strippedContent;
      if (state._systemPreambleStripper) {
        scrubbedContent = state._systemPreambleStripper(scrubbedContent);
      }
      if (scrubbedContent) {
        stopThinkingBlock(state, results);
      }

      // Rehydrate any Markdown boundary suffix buffered from the previous chunk
      // before searching for XML tool calls, so the prefix is not lost.
      const bufferedPrefix = state._markdownBuffer || "";
      state._markdownBuffer = "";

      // DSML tool calls (DeepSeek-V4-Flash's full-width-pipe format) can appear
      // in content instead of the standard JSON tool_calls. Run the DSML
      // parser/scrubber BEFORE extractXmlInvokeBlocks: complete <｜DSML｜:Tool>
      // blocks become tool calls, stray closing markers are stripped, and the
      // scrubbed remainder is handed to the XML-invoke path below. A partial
      // opener at the chunk tail is held back in state for the next chunk so
      // the marker cannot leak as visible text mid-stream.
      let dsmlContent = scrubbedContent;
      const dsmlPending = state._dsmlHoldback;
      if (dsmlPending) {
        dsmlContent = dsmlPending + dsmlContent;
        state._dsmlHoldback = undefined;
      }
      let dsmlToolCalls: { id: string; name: string; args: Record<string, string> }[] = [];
      if (hasDsmlToolCalls(dsmlContent)) {
        const dsmlResult = parseDsmlToolCalls(dsmlContent);
        dsmlContent = dsmlResult.content;
        if (dsmlResult.holdback) {
          state._dsmlHoldback = dsmlResult.holdback;
        }
        dsmlToolCalls = dsmlResult.toolCalls.map((tc) => ({
          id: tc.id,
          name: tc.function.name,
          args: JSON.parse(tc.function.arguments) as Record<string, string>,
        }));
      }

      // Check for XML <invoke> blocks that some models emit instead of JSON tool_calls
      const { cleaned, toolCalls: xmlToolCalls } = extractXmlInvokeBlocks(
        bufferedPrefix + dsmlContent,
        state
      );

      // Accumulate extracted tool calls for emission at finish. DSML and XML
      // invoke tool calls share the same pending queue and finish emission.
      if (xmlToolCalls.length > 0 || dsmlToolCalls.length > 0) {
        // Close any ongoing text block before tool calls
        stopTextBlock(state, results);
        state._pendingXmlToolCalls.push(...xmlToolCalls, ...dsmlToolCalls);
      }

      // Defer any trailing incomplete Markdown boundary token to the next chunk.
      const {
        emit: textToEmit,
        hold: textToHold,
        backtickRun,
        trailingBackslash,
        fenceRun,
        fenceOpening,
        fenceClosingRun,
        lineIndent,
      } = splitMarkdownBoundary(
        cleaned,
        state._markdownCodeSpanRun || 0,
        state._markdownTrailingBackslash === true,
        state._markdownFenceRun || 0,
        state._markdownFenceOpening === true,
        state._markdownFenceClosingRun || 0,
        state._markdownLineIndent || 0
      );
      state._markdownBuffer = textToHold;
      state._markdownCodeSpanRun = backtickRun || 0;
      state._markdownTrailingBackslash = trailingBackslash === true;
      state._markdownFenceRun = fenceRun || 0;
      state._markdownFenceOpening = fenceOpening === true;
      state._markdownFenceClosingRun = fenceClosingRun || 0;
      state._markdownLineIndent = lineIndent || 0;

      // Emit remaining non-XML text content
      if (textToEmit) {
        if (!state.textBlockStarted) {
          state.textBlockIndex = state.nextBlockIndex++;
          state.textBlockStarted = true;
          state.textBlockClosed = false;
          results.push({
            type: "content_block_start",
            index: state.textBlockIndex,
            content_block: { type: "text", text: "" },
          });
        }
        results.push({
          type: "content_block_delta",
          index: state.textBlockIndex,
          delta: { type: "text_delta", text: textToEmit },
        });
      }
    }
  }

  // Tool calls
  if (delta?.tool_calls) {
    for (const tc of delta.tool_calls) {
      // Strip the Claude OAuth prefix from an incoming tool name (if any).
      const incomingName = (() => {
        let n = tc.function?.name || "";
        if (n.startsWith(CLAUDE_OAUTH_TOOL_PREFIX)) n = n.slice(CLAUDE_OAUTH_TOOL_PREFIX.length);
        return restoreClaudeToolName(n, state.toolNameMap);
      })();
      const idx = resolveToolCallKey(state, tc, incomingName);

      // Register on the first fragment carrying an id, a name or arguments (the
      // id is optional in the OpenAI schema). Some upstreams (GLM 5.2) stream the
      // id and function.name in SEPARATE SSE chunks. The Claude protocol cannot
      // patch a content_block_start after it is emitted, so content_block_start
      // is DEFERRED until the name arrives (#2077 / decolua/9router#2077).
      if (!state.toolCalls.has(idx) && (tc.id || incomingName || tc.function?.arguments)) {
        state.toolCalls.set(idx, createToolCallEntry(tc, incomingName));
      }

      const toolInfo = state.toolCalls.get(idx);
      if (toolInfo) {
        // Capture a late-arriving id or name (streamed after the initial chunk).
        adoptToolCallIdentity(toolInfo, tc, incomingName);
        if (!toolInfo.awaitingIdentity) ensureToolBlockIndex(state, toolInfo, results);

        // Emit content_block_start once we have a name. If arguments arrive before
        // any name was ever seen, start the block anyway with the (empty) name so
        // the input_json_delta stays well-formed.
        if (
          !toolInfo.startEmitted &&
          !toolInfo.awaitingIdentity &&
          (toolInfo.name || tc.function?.arguments != null || toolInfo.argBuffer)
        ) {
          emitToolUseStart(state, toolInfo, results);
        }
      }

      if (tc.function?.arguments) {
        if (toolInfo) {
          // Always buffer the raw stream so shimmed tools can re-emit a
          // corrected JSON at stop time.
          const existingArgs = toolInfo.argBuffer || "";
          const nextArgs = appendToolCallArgumentDelta(existingArgs, tc.function.arguments);
          let deltaStr = nextArgs.slice(existingArgs.length);
          toolInfo.argBuffer = nextArgs;

          if (!toolInfo.startEmitted || toolInfo.shimmed || !deltaStr) {
            // Held until the block opens, or (shimmed) one corrective delta at finish.
            continue;
          }

          // NOTE: The regex-based "Fix #1852" strip that previously ran here was
          // removed in #4951. That strip matched patterns like `"key":""` and
          // `"key":[]` to remove spurious placeholder fields that some models emit
          // as noise. However, since #3762 the snapshot-dedup logic in
          // appendToolCallArgumentDelta already collapses repeated/growing snapshots
          // into a single delta, so noise-only chunks are naturally suppressed.
          // More critically, the regex unconditionally deleted any field whose value
          // happened to be "" or [], silently corrupting intentional empty-string or
          // empty-array arguments (e.g. {"file_path":"","content":"text"} →
          // {"content":"text"}). Emit deltaStr as-is; the Claude client parses the
          // assembled partial_json fragments and tolerates unknown extra fields.

          results.push({
            type: "content_block_delta",
            index: toolInfo.blockIndex,
            delta: { type: "input_json_delta", partial_json: deltaStr },
          });
        }
      }
    }
  }

  // Finish — guard against duplicate finish_reason chunks (common with OpenAI-compatible models).
  // Use a dedicated `claudeFinishEmitted` flag rather than `state.finishReason`: in the
  // Responses→Claude hub path the shared `state` object is also written by the
  // openai-responses→openai translator, which sets `state.finishReason` on
  // `response.completed` BEFORE this openai→claude step runs. Reusing `finishReason` as the
  // guard therefore misfired and silently dropped the terminal message_delta/message_stop
  // for Responses→Claude streams (#5828 regression).
  if (choice.finish_reason && !state.claudeFinishEmitted) {
    if (!hasChunkUsage && !flushingPendingFinish) {
      state.pendingClaudeFinishChoice = choice;
      return results.length > 0 ? results : null;
    }

    state.claudeFinishEmitted = true;
    stopThinkingBlock(state, results);

    // Both preamble strippers buffer while a construct is still undecided (a
    // directive prefix that never completed, an <analysis>/<summary> block that
    // never closed). Nothing flushed that buffer, so a stream ending mid-construct
    // dropped the held text silently — for a single-chunk response whose block
    // never closes, that is the ENTIRE answer replaced by an empty message.
    // Release whatever is still held before the terminal blocks are emitted.
    // The same goes for an unclosed <invoke>/<tool_call> tag and the DSML holdback:
    // no further chunk can complete them, so they were prose and must reach the client.
    const flushedPreamble =
      (state._directiveStripper?.flush?.() ?? "") +
      (state._systemPreambleStripper?.flush?.() ?? "") +
      (state._xmlInvokeBuffer ?? "") +
      (state._dsmlHoldback ?? "");
    state._xmlInvokeBuffer = "";
    state._dsmlHoldback = undefined;
    if (flushedPreamble) {
      if (!state.textBlockStarted || state.textBlockClosed) {
        state.textBlockIndex = state.nextBlockIndex++;
        state.textBlockStarted = true;
        state.textBlockClosed = false;
        results.push({
          type: "content_block_start",
          index: state.textBlockIndex,
          content_block: { type: "text", text: "" },
        });
      }
      results.push({
        type: "content_block_delta",
        index: state.textBlockIndex,
        delta: { type: "text_delta", text: flushedPreamble },
      });
    }

    // FIX B: when the response ended reasoning-only (no ordinary text block was
    // started) and the client did NOT explicitly request thinking, synthesize a
    // text content block from the accumulated reasoning. Claude Code's
    // autocompact parser extracts the summary from a TEXT content block — a
    // thinking block alone is judged "empty response" and the compact is
    // rejected, looping the session. Only when the client explicitly opted OUT
    // (requestedThinking === false): for `true` and for legacy `undefined` the
    // reasoning already went out as a thinking block above, and synthesizing a
    // text block too would double-expose it.
    if (!state.textBlockStarted && state._reasoningAccum && state.requestedThinking === false) {
      state.textBlockIndex = state.nextBlockIndex++;
      state.textBlockStarted = true;
      state.textBlockClosed = false;
      results.push({
        type: "content_block_start",
        index: state.textBlockIndex,
        content_block: { type: "text", text: "" },
      });
      results.push({
        type: "content_block_delta",
        index: state.textBlockIndex,
        delta: { type: "text_delta", text: state._reasoningAccum },
      });
    }

    stopTextBlock(state, results);

    for (const [, toolInfo] of state.toolCalls) {
      // A tool call whose name/args never arrived (only an id chunk was seen)
      // still has a reserved block index but no content_block_start. Emit it now
      // so the terminal content_block_stop is not orphaned (#2077 edge case).
      if (!toolInfo.startEmitted) emitToolUseStart(state, toolInfo, results);

      // For shimmed tools, emit one corrective input_json_delta with the
      // fully patched JSON before closing the block. A refusal must not release
      // the buffered arguments: the block is closed empty instead.
      if (toolInfo.shimmed && choice.finish_reason !== "content_filter") {
        const patched = applyToolCallShimToBuffer(toolInfo.name, toolInfo.argBuffer || "");
        results.push({
          type: "content_block_delta",
          index: toolInfo.blockIndex,
          delta: { type: "input_json_delta", partial_json: patched },
        });
      }

      results.push({
        type: "content_block_stop",
        index: toolInfo.blockIndex,
      });
    }

    // Emit any XML-extracted tool calls (from models like Dracarys that
    // emit <invoke> blocks in content instead of JSON tool_calls in delta)
    const xmlToolCalls = state._pendingXmlToolCalls || [];
    for (const tc of xmlToolCalls) {
      const blockIndex = state.nextBlockIndex++;
      results.push({
        type: "content_block_start",
        index: blockIndex,
        content_block: {
          type: "tool_use",
          id: tc.id,
          name: restoreClaudeToolName(
            tc.name,
            state.toolNameMap instanceof Map ? state.toolNameMap : null
          ),
          input: tc.args,
        },
      });
      results.push({
        type: "content_block_stop",
        index: blockIndex,
      });
    }

    // Override finish_reason to tool_use if XML tool calls were found
    const overrideFinishReason = xmlToolCalls.length > 0 ? "tool_calls" : choice.finish_reason;

    // Mark finish for later usage injection in stream.js
    state.finishReason = overrideFinishReason;

    // Use tracked usage (will be estimated in stream.js if not valid)
    const finalUsage = toClaudeClientUsage(state.usage);
    results.push({
      type: "message_delta",
      delta: { stop_reason: openAIFinishReasonToClaudeStopReason(overrideFinishReason) },
      usage: finalUsage,
    });
    results.push({ type: "message_stop" });
  }

  return results.length > 0 ? results : null;
}

// Register
register(FORMATS.OPENAI, FORMATS.CLAUDE, undefined, openaiToClaudeResponse);
