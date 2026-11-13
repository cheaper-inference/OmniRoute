import { countTextTokens, type TokenizerContext } from "@/shared/utils/tiktokenCounter";

/**
 * Pure helpers for the native Gemini `/v1beta/models/{model}:{action}` route.
 */

export type GeminiAction = "generateContent" | "streamGenerateContent" | "countTokens";

const GEMINI_ACTIONS: ReadonlySet<string> = new Set([
  "generateContent",
  "streamGenerateContent",
  "countTokens",
]);

export interface ParsedGeminiModelPath {
  model: string;
  action: GeminiAction;
}

/**
 * Parse the catch-all segments after `/v1beta/models/` into a model id and action.
 *
 * Model ids may contain any number of `/` (`openai/gpt-5.1`, `auto/best-coding`, `a/b/c`)
 * and even `:` (`qwen:7b`), so the segments are joined back and the action is taken from
 * the LAST `:`. When that suffix is not a known Gemini action the whole string is treated
 * as the model with `generateContent` (the route's historical default).
 *
 * Returns null when no model id is left (for example `/v1beta/models/:generateContent`).
 */
export function parseGeminiModelPath(
  path: readonly string[] | undefined
): ParsedGeminiModelPath | null {
  if (!Array.isArray(path) || path.length === 0) return null;
  const joined = path
    .map((segment) => safeDecode(String(segment)))
    .filter((segment) => segment.length > 0)
    .join("/");

  let model = joined;
  let action: GeminiAction = "generateContent";
  const colon = joined.lastIndexOf(":");
  if (colon >= 0) {
    const suffix = joined.slice(colon + 1);
    if (GEMINI_ACTIONS.has(suffix)) {
      action = suffix as GeminiAction;
      model = joined.slice(0, colon);
    }
  }

  model = model.trim();
  if (!model) return null;
  return { model, action };
}

function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

// Gemini bills an image at a flat 258 tokens; use it for any non-text media part.
const MEDIA_PART_TOKENS = 258;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function safeStringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value) ?? "";
  } catch {
    return "";
  }
}

function estimatePartTokens(part: unknown, ctx: TokenizerContext): number {
  if (!isRecord(part)) return 0;
  let tokens = 0;
  if (typeof part.text === "string") tokens += countTextTokens(part.text, ctx);
  if (isRecord(part.functionCall)) {
    const call = part.functionCall;
    if (typeof call.name === "string") tokens += countTextTokens(call.name, ctx);
    if (call.args !== undefined) tokens += countTextTokens(safeStringify(call.args), ctx);
  }
  if (isRecord(part.functionResponse)) {
    const response = part.functionResponse;
    if (typeof response.name === "string") tokens += countTextTokens(response.name, ctx);
    if (response.response !== undefined) {
      tokens += countTextTokens(safeStringify(response.response), ctx);
    }
  }
  if (isRecord(part.executableCode) && typeof part.executableCode.code === "string") {
    tokens += countTextTokens(part.executableCode.code, ctx);
  }
  if (isRecord(part.codeExecutionResult) && typeof part.codeExecutionResult.output === "string") {
    tokens += countTextTokens(part.codeExecutionResult.output, ctx);
  }
  if (isRecord(part.inlineData) || isRecord(part.fileData)) tokens += MEDIA_PART_TOKENS;
  return tokens;
}

function estimateContentTokens(content: unknown, ctx: TokenizerContext): number {
  if (!isRecord(content) || !Array.isArray(content.parts)) return 0;
  let tokens = 0;
  for (const part of content.parts) tokens += estimatePartTokens(part, ctx);
  return tokens;
}

/**
 * Local estimate for `:countTokens`. Accepts both request shapes the API allows:
 * `{contents, systemInstruction?, tools?}` and `{generateContentRequest: {...}}`.
 * Counts text, function calls/responses, code parts, the system instruction and tool
 * declarations; media parts count a flat 258 tokens each.
 */
export function estimateGeminiCountTokens(body: unknown, model?: string): number {
  if (!isRecord(body)) return 0;
  const request = isRecord(body.generateContentRequest) ? body.generateContentRequest : body;
  const ctx: TokenizerContext = { model: model || null };

  let tokens = 0;
  if (Array.isArray(request.contents)) {
    for (const content of request.contents) tokens += estimateContentTokens(content, ctx);
  }
  tokens += estimateContentTokens(request.systemInstruction, ctx);
  if (Array.isArray(request.tools)) {
    for (const tool of request.tools) {
      if (isRecord(tool) && Array.isArray(tool.functionDeclarations)) {
        tokens += countTextTokens(safeStringify(tool.functionDeclarations), ctx);
      }
    }
  }
  return tokens;
}
