import { extractXmlInvokeBlocks } from "../helpers/xmlToolCalls.ts";
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import {
  isAbortFinishReason,
  normalizeOpenAICompatibleFinishReason,
} from "../../utils/finishReason.ts";
import { restoreDeclaredToolName } from "../../services/declaredToolCasing.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";
import { splitMarkdownBoundary } from "../helpers/markdownBoundary.ts";
import {
  buildClaudeWebSearchBlockEvents,
  toClaudeWebSearchResults,
} from "../helpers/claudeServerWebSearch.ts";

function normalizeToolName(name: string, toolNameMap: unknown, clientTools: unknown): string {
  return restoreDeclaredToolName(name, toolNameMap, clientTools);
}

// Helper: flush any buffered Markdown boundary text before closing the open text block
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
  if (state.openTextBlockIdx === null) {
    const idx = state.contentBlockIndex++;
    state.openTextBlockIdx = idx;
    results.push({
      type: "content_block_start",
      index: idx,
      content_block: { type: "text", text: "" },
    });
  }
  results.push({
    type: "content_block_delta",
    index: state.openTextBlockIdx,
    delta: { type: "text_delta", text: buffered },
  });
}

/**
 * Extract the web hits out of Gemini Google Search grounding metadata. Gemini
 * exposes them as `groundingChunks[].web` (snake_case `grounding_chunks` on some
 * upstreams); normalization into Anthropic `web_search_result` entries is shared
 * with the other response translators (helpers/claudeServerWebSearch.ts).
 */
function collectGroundingWebItems(grounding) {
  const chunks = grounding.groundingChunks || grounding.grounding_chunks;
  if (!Array.isArray(chunks)) return [];
  return chunks.map((chunk) => ({ url: chunk?.web?.uri, title: chunk?.web?.title }));
}

/**
 * Emit the Anthropic server-tool blocks for Gemini Google Search grounding.
 *
 * Claude Code's built-in WebSearch reads its results from a paired
 * `server_tool_use` (name "web_search") + `web_search_tool_result` block, so a
 * Gemini/Antigravity response carrying `groundingMetadata` must surface that pair
 * or the CLI reports zero results. Emitted at most once per message
 * (`state.groundingProcessed`).
 *
 * Gemini attaches groundingMetadata to the final chunk, after the answer text has
 * already streamed, so any open text/thinking block is flushed and closed first
 * and the search pair takes the next indices.
 */
function emitGroundingWebSearch(candidate, state, results) {
  if (state.groundingProcessed) return;
  const grounding = candidate.groundingMetadata || candidate.grounding_metadata;
  if (!grounding || typeof grounding !== "object") return;
  const webResults = toClaudeWebSearchResults(collectGroundingWebItems(grounding));
  if (webResults.length === 0) return;

  // Close the open text/thinking block first so the search pair gets fresh indices.
  flushMarkdownBuffer(state, results);
  if (state.openTextBlockIdx !== null) {
    results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
    state.openTextBlockIdx = null;
  }

  const queries = grounding.webSearchQueries || grounding.web_search_queries;
  const query = Array.isArray(queries) && typeof queries[0] === "string" ? queries[0] : "";

  const { events, nextIndex } = buildClaudeWebSearchBlockEvents({
    query,
    results: webResults,
    startIndex: state.contentBlockIndex,
  });
  results.push(...events);
  state.contentBlockIndex = nextIndex;

  state.groundingProcessed = true;
}

/**
 * Direct Gemini → Claude response translator.
 * Converts Gemini streaming chunks directly to Claude Messages API
 * streaming events, skipping the OpenAI hub intermediate step.
 *
 * Fix (issue #253): Keep the text content_block open across streaming chunks
 * instead of opening+closing it on every chunk. This prevents Claude Code
 * from rendering each delta on a separate line.
 */
export function geminiToClaudeResponse(chunk, state) {
  if (!chunk) return null;

  // Handle Antigravity wrapper
  const response = chunk.response || chunk;
  if (!response || !response.candidates?.[0]) return null;

  const results = [];
  const candidate = response.candidates[0];
  const content = candidate.content;

  // ── Initialize: emit message_start ─────────────────────────────
  if (!state.messageId) {
    state.messageId = response.responseId || `msg_${Date.now()}`;
    state.model = response.modelVersion || "gemini";
    state.contentBlockIndex = 0;
    // Track open text block so we can keep it open across chunks
    state.openTextBlockIdx = null;
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

  // ── Process parts ──────────────────────────────────────────────
  if (content?.parts) {
    for (const part of content.parts) {
      const hasThoughtSig = part.thoughtSignature || part.thought_signature;
      const isThought = part.thought === true;

      // Capture thoughtSignature so the next functionCall (or same-part call)
      // can persist it for Claude→Gemini follow-up turns (#8979 / #2504 parity).
      if (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0) {
        state.pendingThoughtSignature = hasThoughtSig;
      }

      // Thinking content → thinking block (always open+close per chunk)
      if (isThought && part.text) {
        // Close any open text block first
        flushMarkdownBuffer(state, results);
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        const idx = state.contentBlockIndex++;
        results.push({
          type: "content_block_start",
          index: idx,
          content_block: { type: "thinking", thinking: "" },
        });
        results.push({
          type: "content_block_delta",
          index: idx,
          delta: { type: "thinking_delta", thinking: part.text },
        });
        results.push({ type: "content_block_stop", index: idx });
        continue;
      }

      // Standalone thoughtSignature part (no text / no functionCall): keep
      // pending and wait for the following functionCall — do not emit to Claude.
      if (
        typeof hasThoughtSig === "string" &&
        hasThoughtSig.length > 0 &&
        (part.text === undefined || part.text === "") &&
        !part.functionCall
      ) {
        continue;
      }

      // Function call → tool_use block
      if (part.functionCall) {
        // Close any open text block first
        flushMarkdownBuffer(state, results);
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        const fc = part.functionCall;
        const rawToolName = fc.name;
        const restoredToolName = normalizeToolName(
          typeof rawToolName === "string" ? rawToolName : "",
          state.toolNameMap,
          state.clientTools
        );
        const idx = state.contentBlockIndex++;
        const toolId = fc.id || `toolu_${Date.now()}_${idx}`;

        const signatureForToolCall =
          (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0 ? hasThoughtSig : null) ||
          (typeof state.pendingThoughtSignature === "string" &&
          state.pendingThoughtSignature.length > 0
            ? state.pendingThoughtSignature
            : null);
        if (signatureForToolCall) {
          storeGeminiThoughtSignature(
            buildGeminiThoughtSignatureKey(state.signatureNamespace, toolId),
            signatureForToolCall
          );
          state.pendingThoughtSignature = null;
        }

        results.push({
          type: "content_block_start",
          index: idx,
          content_block: {
            type: "tool_use",
            id: toolId,
            name: restoredToolName,
            input: {},
          },
        });

        const argsStr = JSON.stringify(fc.args || {});
        results.push({
          type: "content_block_delta",
          index: idx,
          delta: { type: "input_json_delta", partial_json: argsStr },
        });
        results.push({ type: "content_block_stop", index: idx });

        if (!state.hasToolUse) state.hasToolUse = true;
        continue;
      }

      // Regular text content → keep text block open across streaming chunks
      const isRegularText = part.text !== undefined && part.text !== "" && !hasThoughtSig;
      const isTextAfterThinking =
        hasThoughtSig &&
        part.text !== undefined &&
        part.text !== "" &&
        !isThought &&
        !part.functionCall;

      if (isRegularText || isTextAfterThinking) {
        const { cleaned, toolCalls: textToolCalls } = extractXmlInvokeBlocks(part.text, state);

        // Process any extracted text-format tool calls (<tool_call>, TOOL_CALL, <invoke>)
        if (textToolCalls.length > 0) {
          flushMarkdownBuffer(state, results);
          if (state.openTextBlockIdx !== null) {
            results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
            state.openTextBlockIdx = null;
          }
          for (const tc of textToolCalls) {
            const idx = state.contentBlockIndex++;
            const restoredToolName = restoreDeclaredToolName(
              tc.name,
              state.toolNameMap,
              state.clientTools
            );
            const signatureForToolCall =
              (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0
                ? hasThoughtSig
                : null) ||
              (typeof state.pendingThoughtSignature === "string" &&
              state.pendingThoughtSignature.length > 0
                ? state.pendingThoughtSignature
                : null);
            if (signatureForToolCall) {
              storeGeminiThoughtSignature(
                buildGeminiThoughtSignatureKey(state.signatureNamespace, tc.id),
                signatureForToolCall
              );
              state.pendingThoughtSignature = null;
            }

            results.push({
              type: "content_block_start",
              index: idx,
              content_block: { type: "tool_use", id: tc.id, name: restoredToolName, input: {} },
            });
            results.push({
              type: "content_block_delta",
              index: idx,
              delta: { type: "input_json_delta", partial_json: JSON.stringify(tc.args || {}) },
            });
            results.push({ type: "content_block_stop", index: idx });
            if (!state.hasToolUse) state.hasToolUse = true;
          }
        }

        if (cleaned) {
          // Rehydrate buffered Markdown boundary prefix before emitting.
          const bufferedPrefix = state._markdownBuffer || "";
          state._markdownBuffer = "";
          const combinedText = bufferedPrefix + cleaned;
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
            combinedText,
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

          // Fully-held chunk (e.g. "`" + "code" -> whole text deferred to the
          // boundary buffer): emitting an empty delta here opens a text block
          // and fires a zero-length text_delta for nothing. The held content
          // flushes on the next chunk; skip the event pair entirely.
          if (textToEmit) {
            // Open a new text block only if none is open yet
            if (state.openTextBlockIdx === null) {
              const idx = state.contentBlockIndex++;
              state.openTextBlockIdx = idx;
              results.push({
                type: "content_block_start",
                index: idx,
                content_block: { type: "text", text: "" },
              });
            }
            results.push({
              type: "content_block_delta",
              index: state.openTextBlockIdx,
              delta: { type: "text_delta", text: textToEmit },
            });
          }
        }
      }
    }
  }

  // ── Google Search grounding → server_tool_use + web_search_tool_result ──
  // Gemini attaches groundingMetadata to the last chunk (after the answer text
  // has streamed) and sometimes to an earlier chunk; emit the pair once, before
  // the finish block so the search blocks precede message_delta/message_stop.
  emitGroundingWebSearch(candidate, state, results);

  // ── Usage metadata ─────────────────────────────────────────────
  const usageMeta = response.usageMetadata || chunk.usageMetadata;
  if (usageMeta && typeof usageMeta === "object") {
    const inputTokens =
      typeof usageMeta.promptTokenCount === "number" ? usageMeta.promptTokenCount : 0;
    const candidatesTokens =
      typeof usageMeta.candidatesTokenCount === "number" ? usageMeta.candidatesTokenCount : 0;
    const thoughtsTokens =
      typeof usageMeta.thoughtsTokenCount === "number" ? usageMeta.thoughtsTokenCount : 0;
    const cachedTokens =
      typeof usageMeta.cachedContentTokenCount === "number" ? usageMeta.cachedContentTokenCount : 0;

    state.usage = {
      input_tokens: Math.max(0, inputTokens - cachedTokens),
      output_tokens: candidatesTokens + thoughtsTokens,
    };
    if (cachedTokens > 0) {
      state.usage.cache_read_input_tokens = cachedTokens;
    }
  }

  // ── Finish reason → close open blocks + message_delta + message_stop ──
  if (candidate.finishReason) {
    // Close any still-open text block before finishing
    flushMarkdownBuffer(state, results);
    if (state.openTextBlockIdx !== null) {
      results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
      state.openTextBlockIdx = null;
    }

    let stopReason;
    const reason = candidate.finishReason.toLowerCase();
    if (normalizeOpenAICompatibleFinishReason(reason) === "content_filter") {
      // SAFETY/RECITATION/BLOCKLIST/PROHIBITED_CONTENT/…: a safety block is a
      // refusal, not a completed turn — and it wins over an emitted tool call.
      stopReason = "refusal";
    } else if (state.hasToolUse || reason === "tool_calls") {
      stopReason = "tool_use";
    } else if (reason === "max_tokens" || reason === "length") {
      stopReason = "max_tokens";
    } else if (isAbortFinishReason(reason)) {
      stopReason = "tool_use";
    } else {
      stopReason = "end_turn";
    }

    results.push({
      type: "message_delta",
      delta: { stop_reason: stopReason, stop_sequence: null },
      usage: state.usage || { input_tokens: 0, output_tokens: 0 },
    });
    results.push({ type: "message_stop" });
  }

  return results.length > 0 ? results : null;
}

register(FORMATS.GEMINI, FORMATS.CLAUDE, null, geminiToClaudeResponse);
register(FORMATS.ANTIGRAVITY, FORMATS.CLAUDE, null, geminiToClaudeResponse);
