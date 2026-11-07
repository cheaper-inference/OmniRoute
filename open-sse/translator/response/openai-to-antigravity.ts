import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { buildGeminiUsageMetadata } from "./geminiUsageMetadata.ts";

type AntigravityCandidate = {
  content: {
    role: string;
    parts: Array<Record<string, unknown>>;
  };
  finishReason?: string;
};

type AntigravityUsageMetadata = {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  thoughtsTokenCount?: number;
  cachedContentTokenCount?: number;
};

// Convert OpenAI SSE chunk to Antigravity SSE format
// Real Antigravity format:
//   data: {"response":{"candidates":[{"content":{"role":"model","parts":[...]}, "finishReason":"STOP"}], "usageMetadata":{...}, "modelVersion":"...", "responseId":"..."}}
// Tool calls: OpenAI sends incremental args across chunks → accumulate and emit ONCE at finish
export function openaiToAntigravityResponse(chunk, state) {
  if (!chunk) return null;

  const choice = chunk.choices?.[0];
  if (!choice) return chunk.usage ? usageOnlyChunkResponse(chunk.usage, state) : null;

  const delta = choice.delta || {};
  const finishReason = choice.finish_reason;

  // Init state
  if (!state._toolCallAccum) state._toolCallAccum = {};
  if (!state._responseId) state._responseId = chunk.id || `resp_${Date.now()}`;
  if (!state._modelVersion) state._modelVersion = chunk.model || "";

  const parts = [];

  // Thinking/reasoning → thought part
  if (delta.reasoning_content) {
    parts.push({ thought: true, text: delta.reasoning_content });
  }

  // Text content
  if (delta.content) {
    parts.push({ text: delta.content });
  }

  // Accumulate tool calls silently (no emit until finish)
  if (delta.tool_calls) {
    for (const tc of delta.tool_calls) {
      const idx = tc.index ?? 0;
      if (!state._toolCallAccum[idx]) {
        state._toolCallAccum[idx] = { id: "", name: "", arguments: "" };
      }
      const accum = state._toolCallAccum[idx];
      if (tc.id) accum.id = tc.id;
      if (tc.function?.name) accum.name += tc.function.name;
      if (tc.function?.arguments) accum.arguments += tc.function.arguments;
    }
    // Skip emit — wait for finish_reason
    if (parts.length === 0 && !finishReason) return null;
  }

  // On finish, emit accumulated tool calls as complete functionCall parts
  if (finishReason) {
    const indices = Object.keys(state._toolCallAccum);
    for (const idx of indices) {
      const accum = state._toolCallAccum[idx];
      let args = {};
      try {
        args = JSON.parse(accum.arguments);
      } catch {
        /* empty */
      }
      parts.push({
        functionCall: {
          name: accum.name,
          args,
        },
      });
    }
  }

  // Skip empty non-finish chunks
  if (parts.length === 0 && !finishReason) return null;

  // Ensure at least empty text part on finish with no content
  if (parts.length === 0 && finishReason) {
    parts.push({ text: "" });
  }

  // Build candidate
  const candidate: AntigravityCandidate = { content: { role: "model", parts } };

  // Finish reason mapping
  if (finishReason) {
    state._finishSent = true;
    const reasonMap = {
      stop: "STOP",
      length: "MAX_TOKENS",
      tool_calls: "STOP",
      content_filter: "SAFETY",
    };
    candidate.finishReason = reasonMap[finishReason] || "STOP";
  }

  // Build response
  const response: {
    candidates: AntigravityCandidate[];
    modelVersion: string;
    responseId: string;
    usageMetadata?: AntigravityUsageMetadata;
  } = {
    candidates: [candidate],
    modelVersion: state._modelVersion,
    responseId: state._responseId,
  };

  // Usage metadata
  const usage = chunk.usage || state._usage;
  if (usage) {
    response.usageMetadata = buildGeminiUsageMetadata(usage);
    state._usageSent = true;
  }

  return { response };
}

// OpenAI upstreams called with `stream_options.include_usage` send usage in a
// separate final chunk with `choices: []`, after the finish chunk. The finish
// chunk is already out by then, so forward it as its own chunk (empty text part,
// no finishReason) unless usage already went out. Usage seen before the finish
// chunk stays stashed for it (see openaiToAntigravityResponse).
function usageOnlyChunkResponse(usage, state) {
  if (!state._finishSent) {
    state._usage = usage;
    return null;
  }
  if (state._usageSent) return null;
  state._usageSent = true;
  return {
    response: {
      candidates: [{ content: { role: "model", parts: [{ text: "" }] } }],
      modelVersion: state._modelVersion,
      responseId: state._responseId,
      usageMetadata: buildGeminiUsageMetadata(usage),
    },
  };
}

// Register
register(FORMATS.OPENAI, FORMATS.ANTIGRAVITY, null, openaiToAntigravityResponse);
