import { hasAnyReasoningSignal } from "../../utils/reasoningFields.ts";
import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";

// Some upstreams (observed: Antigravity/Claude deprecation notices) return HTTP 200
// with an assistant message telling the caller the model is no longer available.
// Fail over with a non-retryable 410 model_unavailable failure so combos try siblings.
export const MODEL_UNAVAILABLE_CONTENT_PATTERN =
  /\b(?:(?:this\s+)?model|(?:claude|gpt|gemini|opus|sonnet|haiku|deepseek|qwen|llama|mistral|grok|glm|minimax|kimi|o[134])(?:-[a-z0-9._:/-]+)?)(?:\s+[a-z0-9._:/-]+){0,4}\s+is\s+no\s+longer\s+available\.\s*Please\s+switch\s+to\b/i;
export const MODEL_UNAVAILABLE_PEEK_CHAR_CAP = 512;

// #20941: Antigravity answers an outdated client version with HTTP 200 and an assistant
// message ("This version of Antigravity is no longer supported. Please download and
// install the latest version..."). Anchored at the start of the completion and limited to
// the first-party client names, so an ordinary answer such as "This version of Python is no
// longer supported, so upgrade to 3.12." stays valid.
export const CLIENT_VERSION_UNSUPPORTED_CONTENT_PATTERN =
  /^\s*this\s+version\s+of\s+(?:antigravity|agy)\s+is\s+no\s+longer\s+supported\b/i;
const CLIENT_VERSION_NOTICE_PHRASES = [
  "this version of antigravity is no longer supported",
  "this version of agy is no longer supported",
] as const;

const MODEL_FAMILY_PREFIXES = [
  "claude",
  "gpt",
  "gemini",
  "opus",
  "sonnet",
  "haiku",
  "deepseek",
  "qwen",
  "llama",
  "mistral",
  "grok",
  "glm",
  "minimax",
  "kimi",
  "o1",
  "o3",
  "o4",
] as const;

const MODEL_FAMILY_TOKEN_RE =
  /^(?:claude|gpt|gemini|opus|sonnet|haiku|deepseek|qwen|llama|mistral|grok|glm|minimax|kimi|o[134])(?:-[a-z0-9._:/-]+)?$/;
const MODIFIER_TOKEN_RE = /^[a-z0-9._:/-]+$/;
const DEPRECATION_TAIL_PHRASE = "is no longer available. please switch to";
const DEPRECATION_TAIL_COMPACT = "is no longer available.please switch to";

export interface StreamingUpstreamFailure {
  status: number;
  type?: string;
  code?: string;
  message?: string;
  requestScoped: boolean;
  retryable: boolean;
  /**
   * #16438: the failure is a pre-output empty turn (the disconnect guard's synthetic
   * "Provider returned empty content" frame or an explicit `empty_content` code). Read
   * only when EMPTY_STREAM_SIBLING_RECOVERY_ENABLED is on; `code` keeps the wire value.
   */
  emptyContent?: boolean;
  /** In-process transport read failure, never inferred from an upstream SSE payload. */
  transportReadFailure?: boolean;
}

export interface StreamingAssistantSignal {
  text: string;
  nonTextSignal: boolean;
  hasTerminalFinish?: boolean;
}

export interface DeprecationPeekState {
  textBuffer: string;
  checkDone: boolean;
  sawContentSignal: boolean;
}

export type DeprecationPeekOutcome = "content" | "error" | null;

export function createDeprecationPeekState(): DeprecationPeekState {
  return {
    textBuffer: "",
    checkDone: false,
    sawContentSignal: false,
  };
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Read `parsed.<key>` as a nested object bag, or null when absent/not an object. */
export function asObject(
  parsed: Record<string, unknown>,
  key: string
): Record<string, unknown> | null {
  const value = parsed[key];
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

/**
 * A content_block_start is real signal only for tool_use / redacted_thinking —
 * a tool call is meaningful even before its input_json_delta arrives. text and
 * thinking blocks routinely open empty; keep peeking for a delta instead.
 */
export function contentBlockStartIsRealSignal(parsed: Record<string, unknown>): boolean {
  const blockType = asObject(parsed, "content_block")?.type;
  return blockType === "tool_use" || blockType === "redacted_thinking";
}

export function buildModelUnavailableFailure(
  text: string,
  code: "model_deprecated" | "client_version_unsupported" = "model_deprecated"
): StreamingUpstreamFailure {
  const message = sanitizeErrorMessage(text).slice(0, 300);
  return {
    status: 410,
    type: "model_unavailable",
    code,
    ...(message ? { message } : {}),
    requestScoped: false,
    retryable: false,
  };
}

/**
 * #20941: the client-version notice is a property of the connection/client build, not of
 * one model, but the quality-failure branch of executeTargetAttempt.ts only knows a
 * per-(provider, connection, model) lockout. We accept that: the notice fails over to the
 * next target immediately, and the lockout is recorded for the single model that returned
 * it (other models of the same connection are probed on their own turn). requestScoped
 * stays false so the failure still counts against the connection.
 */
function buildClientVersionUnsupportedFailure(text: string): StreamingUpstreamFailure {
  return buildModelUnavailableFailure(text, "client_version_unsupported");
}

function extractTextFromParts(parts: unknown): string {
  if (!Array.isArray(parts)) return "";
  return parts
    .map((part) => (isRecord(part) && typeof part.text === "string" ? part.text : ""))
    .filter(Boolean)
    .join(" ");
}

/**
 * Issue #19278: extract the assistant text of `choices[0]` for the content-level
 * exhaustion scan — string `content` verbatim, or the joined `text` parts of a
 * multimodal content array. Returns "" for any other shape; the caller treats
 * "" as "nothing to scan".
 */
export function extractFirstChoiceText(json: Record<string, unknown>): string {
  const choices = json.choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";
  const firstChoice = choices[0];
  if (!isRecord(firstChoice)) return "";
  const message = isRecord(firstChoice.message) ? firstChoice.message : null;
  const content = message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (isRecord(part) && typeof part.text === "string" ? part.text : ""))
      .join(" ");
  }
  return "";
}

function extractOpenAiDeltaText(json: Record<string, unknown>): string {
  const choices = json.choices;
  if (!Array.isArray(choices) || choices.length === 0 || !isRecord(choices[0])) return "";
  const delta = isRecord(choices[0].delta) ? choices[0].delta : null;
  if (!delta) return "";
  if (typeof delta.content === "string") return delta.content;
  return extractTextFromParts(delta.content);
}

function extractClaudeContentText(json: Record<string, unknown>): string {
  if (typeof json.content === "string") return json.content;
  return extractTextFromParts(json.content);
}

function extractResponsesOutputText(output: unknown): string {
  if (!Array.isArray(output)) return "";
  return output
    .map((item) => (isRecord(item) ? extractTextFromParts(item.content) : ""))
    .filter(Boolean)
    .join(" ");
}

function getGeminiCandidates(json: Record<string, unknown>): unknown[] | null {
  if (Array.isArray(json.candidates)) return json.candidates;
  if (isRecord(json.response) && Array.isArray(json.response.candidates)) {
    return json.response.candidates;
  }
  return null;
}

function extractGeminiCandidatesText(json: Record<string, unknown>): string {
  const candidates = getGeminiCandidates(json);
  if (!candidates || candidates.length === 0 || !isRecord(candidates[0])) return "";
  const content = isRecord(candidates[0].content) ? candidates[0].content : null;
  return extractTextFromParts(content?.parts);
}

function extractNonStreamingAssistantText(json: Record<string, unknown>): string {
  return (
    extractFirstChoiceText(json) ||
    extractOpenAiDeltaText(json) ||
    extractClaudeContentText(json) ||
    extractResponsesOutputText(json.output) ||
    extractGeminiCandidatesText(json)
  );
}

export function checkNonStreamingModelUnavailable(json: Record<string, unknown>): {
  valid: false;
  reason: string;
  upstreamFailure: StreamingUpstreamFailure;
} | null {
  const assistantText = extractNonStreamingAssistantText(json);
  if (!assistantText) return null;
  if (CLIENT_VERSION_UNSUPPORTED_CONTENT_PATTERN.test(assistantText)) {
    return {
      valid: false,
      reason: "upstream client version unsupported in 200 body",
      upstreamFailure: buildClientVersionUnsupportedFailure(assistantText),
    };
  }
  if (!MODEL_UNAVAILABLE_CONTENT_PATTERN.test(assistantText)) return null;
  return {
    valid: false,
    reason: "upstream model unavailable in 200 body",
    upstreamFailure: buildModelUnavailableFailure(assistantText),
  };
}

function hasOpenAiDeltaNonTextSignal(delta: Record<string, unknown>): boolean {
  if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) return true;
  if (delta.function_call) return true;
  if (hasAnyReasoningSignal(delta)) return true;
  return typeof delta.refusal === "string" && delta.refusal.length > 0;
}

function extractOpenAiStreamSignal(
  parsed: Record<string, unknown>
): StreamingAssistantSignal | null {
  const choices = parsed.choices;
  if (!Array.isArray(choices) || choices.length === 0 || !isRecord(choices[0])) return null;
  const delta = isRecord(choices[0].delta) ? choices[0].delta : null;
  if (!delta) return null;
  const text = typeof delta.content === "string" ? delta.content : "";
  return { text, nonTextSignal: hasOpenAiDeltaNonTextSignal(delta) };
}

function extractClaudeStreamSignal(
  parsed: Record<string, unknown>,
  eventType: string
): StreamingAssistantSignal | null {
  if (eventType === "content_block_start") {
    return { text: "", nonTextSignal: contentBlockStartIsRealSignal(parsed) };
  }
  if (eventType !== "content_block_delta") return null;
  const delta = asObject(parsed, "delta");
  const deltaType = typeof delta?.type === "string" ? delta.type : "";
  if (deltaType === "input_json_delta") return { text: "", nonTextSignal: true };
  if (deltaType === "thinking_delta") {
    const hasThinking = typeof delta?.thinking === "string" && delta.thinking.length > 0;
    return { text: "", nonTextSignal: hasThinking };
  }
  if (deltaType === "text_delta" && typeof delta?.text === "string") {
    return { text: delta.text, nonTextSignal: false };
  }
  return null;
}

function extractResponsesItemSignal(item: unknown): StreamingAssistantSignal {
  if (!isRecord(item)) return { text: "", nonTextSignal: false };
  if (item.type !== "message") return { text: "", nonTextSignal: true };
  return { text: extractTextFromParts(item.content), nonTextSignal: false };
}

function extractResponsesContentPartSignal(part: unknown): StreamingAssistantSignal {
  if (!isRecord(part)) return { text: "", nonTextSignal: false };
  if (typeof part.text === "string" && part.text.length > 0) {
    return { text: part.text, nonTextSignal: false };
  }
  if (part.type === "refusal" && typeof part.refusal === "string" && part.refusal.length > 0) {
    return { text: "", nonTextSignal: true };
  }
  const isTextOrRefusal =
    part.type === "output_text" ||
    part.type === "text" ||
    part.type === "refusal" ||
    part.type === undefined;
  return { text: "", nonTextSignal: !isTextOrRefusal };
}

function extractResponsesCompletedSignal(
  parsed: Record<string, unknown>
): StreamingAssistantSignal {
  const resp = isRecord(parsed.response) ? parsed.response : null;
  const output = Array.isArray(resp?.output) ? resp.output : [];
  const hasNonMessage = output.some((item) => isRecord(item) && item.type !== "message");
  return {
    text: extractResponsesOutputText(output),
    nonTextSignal: hasNonMessage,
    hasTerminalFinish: true,
  };
}

function extractResponsesStreamSignal(
  parsed: Record<string, unknown>,
  eventType: string
): StreamingAssistantSignal | null {
  if (eventType === "response.output_text.delta" && typeof parsed.delta === "string") {
    return { text: parsed.delta, nonTextSignal: false };
  }
  if (
    eventType === "response.function_call_arguments.delta" ||
    eventType === "response.reasoning_summary_text.delta" ||
    eventType === "response.reasoning_text.delta"
  ) {
    return { text: "", nonTextSignal: true };
  }
  if (eventType === "response.output_item.added" || eventType === "response.output_item.done") {
    return extractResponsesItemSignal(parsed.item);
  }
  if (eventType === "response.content_part.added") {
    return extractResponsesContentPartSignal(parsed.part);
  }
  if (eventType === "response.completed") {
    return extractResponsesCompletedSignal(parsed);
  }
  return null;
}

export function isEmptyResponsesAnnouncement(
  parsed: Record<string, unknown>,
  eventType: string
): boolean {
  const type = typeof parsed.type === "string" ? parsed.type : eventType;
  if (type === "response.output_item.added" || type === "response.output_item.done") {
    return (
      isRecord(parsed.item) &&
      parsed.item.type === "message" &&
      !extractTextFromParts(parsed.item.content)
    );
  }
  if (type === "response.content_part.added") {
    if (!isRecord(parsed.part)) return false;
    const partType = parsed.part.type;
    const isTextPart = partType === "output_text" || partType === "text" || partType === undefined;
    return isTextPart && !(typeof parsed.part.text === "string" && parsed.part.text.length > 0);
  }
  return false;
}

function hasGeminiTerminalFinishReason(candidate: Record<string, unknown>): boolean {
  const reason = candidate.finishReason;
  return typeof reason === "string" && reason.length > 0 && reason !== "FINISH_REASON_UNSPECIFIED";
}

function extractGeminiPartsSignal(parts: unknown[]): { text: string; nonTextSignal: boolean } {
  let text = "";
  let nonTextSignal = false;
  for (const part of parts) {
    if (!isRecord(part)) continue;
    if (part.functionCall || part.executableCode || part.thought === true) {
      nonTextSignal = true;
    } else if (typeof part.text === "string" && part.text.length > 0) {
      text += part.text;
    }
  }
  return { text, nonTextSignal };
}

function extractGeminiStreamSignal(
  parsed: Record<string, unknown>
): StreamingAssistantSignal | null {
  const candidates = getGeminiCandidates(parsed);
  if (!candidates || candidates.length === 0 || !isRecord(candidates[0])) return null;
  const candidate = candidates[0];
  const content = isRecord(candidate.content) ? candidate.content : null;
  const parts = Array.isArray(content?.parts) ? content.parts : [];
  const { text, nonTextSignal } = extractGeminiPartsSignal(parts);
  return {
    text,
    nonTextSignal,
    hasTerminalFinish: hasGeminiTerminalFinishReason(candidate),
  };
}

export function extractStreamingAssistantTextAndSignal(
  parsed: Record<string, unknown>,
  eventType: string
): StreamingAssistantSignal {
  return (
    extractOpenAiStreamSignal(parsed) ||
    extractClaudeStreamSignal(parsed, eventType) ||
    extractResponsesStreamSignal(parsed, eventType) ||
    extractGeminiStreamSignal(parsed) || { text: "", nonTextSignal: false }
  );
}

function isSingleWordSubjectPrefix(word: string): boolean {
  if ("this".startsWith(word) || "model".startsWith(word)) return true;
  return MODEL_FAMILY_PREFIXES.some(
    (prefix) =>
      prefix.startsWith(word) ||
      (word.startsWith(`${prefix}-`) && MODIFIER_TOKEN_RE.test(word.slice(prefix.length + 1)))
  );
}

function extractPostSubjectRest(
  firstWord: string,
  afterFirstSpace: string
): { valid: boolean; rest: string } {
  if (firstWord === "this") {
    if (!afterFirstSpace) return { valid: true, rest: "" };
    const secondSpaceIdx = afterFirstSpace.search(/\s/);
    if (secondSpaceIdx === -1) {
      return { valid: "model".startsWith(afterFirstSpace), rest: "" };
    }
    if (afterFirstSpace.slice(0, secondSpaceIdx) !== "model") {
      return { valid: false, rest: "" };
    }
    return { valid: true, rest: afterFirstSpace.slice(secondSpaceIdx).trimStart() };
  }
  if (firstWord === "model" || MODEL_FAMILY_TOKEN_RE.test(firstWord)) {
    return { valid: true, rest: afterFirstSpace };
  }
  return { valid: false, rest: "" };
}

function isDeprecationTailPrefix(tail: string): boolean {
  return (
    DEPRECATION_TAIL_PHRASE.startsWith(tail) ||
    DEPRECATION_TAIL_COMPACT.startsWith(tail) ||
    tail.startsWith(DEPRECATION_TAIL_PHRASE) ||
    tail.startsWith(DEPRECATION_TAIL_COMPACT)
  );
}

function matchesModifierTail(rest: string): boolean {
  if (!rest) return true;
  const tokens = rest.replace(/\s+/g, " ").split(" ");
  const maxModifiers = Math.min(4, tokens.length);
  for (let k = 0; k <= maxModifiers; k++) {
    if (k > 0 && !MODIFIER_TOKEN_RE.test(tokens[k - 1])) break;
    const tail = tokens.slice(k).join(" ");
    if (isDeprecationTailPrefix(tail)) return true;
  }
  return false;
}

export function couldBeDeprecationPrefix(rawText: string): boolean {
  const trimmed = rawText.trimStart().toLowerCase();
  if (!trimmed) return true;
  const firstSpaceIdx = trimmed.search(/\s/);
  if (firstSpaceIdx === -1) return isSingleWordSubjectPrefix(trimmed);
  const firstWord = trimmed.slice(0, firstSpaceIdx);
  const afterFirstSpace = trimmed.slice(firstSpaceIdx).trimStart();
  const subject = extractPostSubjectRest(firstWord, afterFirstSpace);
  if (!subject.valid) return false;
  return matchesModifierTail(subject.rest);
}

/** True while `rawText` can still grow into the #20941 client-version notice. */
export function couldBeClientVersionNoticePrefix(rawText: string): boolean {
  const normalized = rawText.trimStart().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return true;
  return CLIENT_VERSION_NOTICE_PHRASES.some((phrase) => phrase.startsWith(normalized));
}

export function evaluateDeprecationTextChunk(
  assistantText: string,
  state: DeprecationPeekState
): { outcome: DeprecationPeekOutcome; failure: StreamingUpstreamFailure | null } {
  state.sawContentSignal = true;
  if (state.checkDone) return { outcome: "content", failure: null };
  const remaining = MODEL_UNAVAILABLE_PEEK_CHAR_CAP - state.textBuffer.length;
  if (remaining > 0) {
    state.textBuffer += assistantText.slice(0, remaining);
  }
  if (MODEL_UNAVAILABLE_CONTENT_PATTERN.test(state.textBuffer)) {
    return { outcome: "error", failure: buildModelUnavailableFailure(state.textBuffer) };
  }
  if (CLIENT_VERSION_UNSUPPORTED_CONTENT_PATTERN.test(state.textBuffer)) {
    return { outcome: "error", failure: buildClientVersionUnsupportedFailure(state.textBuffer) };
  }
  if (
    state.textBuffer.length >= MODEL_UNAVAILABLE_PEEK_CHAR_CAP ||
    !(
      couldBeDeprecationPrefix(state.textBuffer) ||
      couldBeClientVersionNoticePrefix(state.textBuffer)
    )
  ) {
    state.checkDone = true;
    return { outcome: "content", failure: null };
  }
  return { outcome: null, failure: null };
}
