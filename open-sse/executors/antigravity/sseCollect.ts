// Pure SSE-payload -> collected-stream parsing for the Antigravity executor.
// Extracted verbatim from antigravity.ts (no host state, no fetch/auth).
import { randomUUID } from "node:crypto";
import { normalizeOpenAICompatibleFinishReasonString } from "../../utils/finishReason.ts";
import { stripObfuscationZeroWidth } from "../../utils/zeroWidth.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";

export type AntigravityCollectedStream = {
  textContent: string;
  finishReason: string;
  toolCalls: Array<{
    id: string;
    index: number;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  usage: Record<string, unknown> | null;
  remainingCredits: Array<{ creditType: string; creditAmount: string }> | null;
  pendingThoughtSignature?: string | null;
  signatureNamespace?: string | null;
};

// Both run once per SSE data line / per text part (processAntigravitySSEPayload),
// so the literals are hoisted to module constants.
const TEXTUAL_TOOL_CALL_RE = /^[\s\S]*?\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*([\s\S]+?)\s*$/;

export function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") {
    return stripObfuscationZeroWidth(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripZeroWidth(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        stripZeroWidth(item),
      ])
    );
  }
  return value;
}

export function parseAntigravityTextualToolCall(
  text: unknown
): { name: string; args: unknown } | null {
  if (typeof text !== "string") return null;
  const normalized = stripObfuscationZeroWidth(text);
  const match = normalized.match(TEXTUAL_TOOL_CALL_RE);
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

export function addAntigravityTextualToolCall(
  collected: AntigravityCollectedStream,
  parsed: { name: string; args: unknown }
): void {
  collected.toolCalls.push({
    id: `${parsed.name}-${Date.now()}-${collected.toolCalls.length}`,
    index: collected.toolCalls.length,
    type: "function",
    function: {
      name: parsed.name,
      arguments: JSON.stringify(parsed.args || {}),
    },
  });
  collected.finishReason = "tool_calls";
}

export function processAntigravitySSEPayload(
  payload: string,
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  if (!payload || payload === "[DONE]") return;
  try {
    const parsed = JSON.parse(payload);
    const markdown =
      typeof parsed?.markdown === "string"
        ? parsed.markdown
        : typeof parsed?.response?.markdown === "string"
          ? parsed.response.markdown
          : null;
    if (markdown) {
      collected.textContent += markdown;
    }
    const candidate = parsed?.response?.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        const partThoughtSig =
          typeof part.thoughtSignature === "string" && part.thoughtSignature.length > 0
            ? part.thoughtSignature
            : typeof part.thought_signature === "string" && part.thought_signature.length > 0
              ? part.thought_signature
              : null;
        if (partThoughtSig) {
          collected.pendingThoughtSignature = partThoughtSig;
        }

        // Native function calls: Gemini 3.x/4.x responds to functionDeclarations with a
        // native functionCall part (usually carrying a thoughtSignature), NOT the
        // legacy "[Tool call: ...]" textual format. Dropping these left the collected
        // stream empty on every tools request → synthetic 502 "Provider returned
        // empty content" (Chatwit Captain Copilot / reply suggestion outage).
        if (part.functionCall && typeof part.functionCall.name === "string") {
          const fc = part.functionCall;
          const toolCallId =
            typeof fc.id === "string" && fc.id.length > 0 ? fc.id : `${fc.name}-${randomUUID()}`;
          collected.toolCalls.push({
            id: toolCallId,
            index: collected.toolCalls.length,
            type: "function",
            function: {
              name: fc.name,
              arguments: JSON.stringify(stripZeroWidth(fc.args ?? {})),
            },
          });
          if (collected.pendingThoughtSignature) {
            storeGeminiThoughtSignature(
              buildGeminiThoughtSignatureKey(collected.signatureNamespace ?? null, toolCallId),
              collected.pendingThoughtSignature
            );
            collected.pendingThoughtSignature = null;
          }
          collected.finishReason = "tool_calls";
          continue;
        }
        if (typeof part.text === "string" && !part.thought) {
          const textualToolCall = parseAntigravityTextualToolCall(part.text);
          if (textualToolCall) {
            addAntigravityTextualToolCall(collected, textualToolCall);
          } else {
            collected.textContent += part.text;
          }
        }
      }
    }
    // Preserve a tool-call finish reason: once a native `part.functionCall`
    // (or textual tool call) has populated `toolCalls`, the candidate's own
    // finish reason (often STOP) must not clobber it (#7037 — a tool-only
    // response would otherwise report STOP and lose its tool-call signal).
    if (candidate?.finishReason && collected.toolCalls.length === 0) {
      collected.finishReason = normalizeOpenAICompatibleFinishReasonString(
        String(candidate.finishReason).toLowerCase()
      );
    }
    if (parsed?.response?.usageMetadata) {
      const um = parsed.response.usageMetadata;
      const thoughtsTokens = typeof um.thoughtsTokenCount === "number" ? um.thoughtsTokenCount : 0;
      const cachedTokens =
        typeof um.cachedContentTokenCount === "number" ? um.cachedContentTokenCount : 0;
      collected.usage = {
        prompt_tokens: um.promptTokenCount || 0,
        completion_tokens: (um.candidatesTokenCount || 0) + thoughtsTokens,
        total_tokens: um.totalTokenCount || 0,
        ...(thoughtsTokens > 0
          ? { completion_tokens_details: { reasoning_tokens: thoughtsTokens } }
          : {}),
        ...(cachedTokens > 0 ? { prompt_tokens_details: { cached_tokens: cachedTokens } } : {}),
      };
    }
    if (Array.isArray(parsed?.remainingCredits)) {
      collected.remainingCredits = parsed.remainingCredits;
    }
  } catch {
    log?.debug?.("SSE_PARSE", `Skipping malformed SSE line: ${payload.slice(0, 80)}`);
  }
}

export function processAntigravitySSEText(
  text: string,
  partialLine: { value: string },
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  partialLine.value += text;
  const lines = partialLine.value.split("\n");
  partialLine.value = lines.pop() || "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    processAntigravitySSEPayload(trimmed.slice(5).trim(), collected, log);
  }
}

export function flushAntigravitySSEText(
  partialLine: { value: string },
  collected: AntigravityCollectedStream,
  log?: { debug?: (scope: string, message: string) => void }
) {
  const trimmed = partialLine.value.trim();
  partialLine.value = "";
  if (!trimmed.startsWith("data:")) return;
  processAntigravitySSEPayload(trimmed.slice(5).trim(), collected, log);
}
