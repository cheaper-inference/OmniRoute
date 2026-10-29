import { isVisionModelId } from "@/shared/constants/visionModels";
import type { CompressionResult, CompressionMode } from "./types.ts";
import { createCompressionStats } from "./stats.ts";
import { isResponsesToolOutputMessage } from "./bodyAdapter.ts";

interface Message {
  role: string;
  content: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
}

interface ChatBody {
  messages?: Message[];
  [key: string]: unknown;
}

interface LiteCompressionOptions {
  model?: string;
  supportsVision?: boolean | null;
  preserveSystemPrompt?: boolean;
  compressToolResults?: boolean;
  maxToolLength?: number;
}

const DEFAULT_MAX_TOOL_LENGTH = 2000;
const MIN_MAX_TOOL_LENGTH = 256;
const MAX_MAX_TOOL_LENGTH = 1_000_000;

function envInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === "") return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return fallback;
  const n = Math.floor(parsed);
  if (n < MIN_MAX_TOOL_LENGTH || n > MAX_MAX_TOOL_LENGTH) return fallback;
  return n;
}

/** True when a value can be used as a Lite tool-result cap (not merely `typeof number`). */
export function isUsableLiteMaxToolLength(value: unknown): value is number {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  const n = Math.floor(value);
  return n >= MIN_MAX_TOOL_LENGTH && n <= MAX_MAX_TOOL_LENGTH;
}

export function resolveLiteMaxToolLength(maxToolLength?: number): number {
  if (isUsableLiteMaxToolLength(maxToolLength)) return Math.floor(maxToolLength);
  return envInt("OMNIROUTE_LITE_MAX_TOOL_LENGTH", DEFAULT_MAX_TOOL_LENGTH);
}

function normalizeMessageWhitespace(content: string): string {
  if (!content) return "";
  return content.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+$/gm, "");
}

// Vision detection is centralized in `@/shared/constants/visionModels` (#4072) so
// the lite image-strip gate, the /v1/models listing, and the routing fallback can
// never disagree. The shared list keeps the #3328 MiniMax M3 carve-out and the
// pixtral/llava/qwen-vl/glm-4v/kimi-vl/mistral-medium-3 families this gate used to
// miss (stripping their images and blinding real vision models).
function modelSupportsVision(model: string): boolean {
  return isVisionModelId(model);
}

export function collapseWhitespace(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  let applied = false;
  const messages = body.messages.map((msg) => {
    if (options.preserveSystemPrompt === true && msg.role === "system") return msg;
    if (typeof msg.content !== "string") return msg;
    const normalized = normalizeMessageWhitespace(msg.content);
    if (normalized !== msg.content) applied = true;
    return { ...msg, content: normalized };
  });
  return { body: { ...body, messages }, applied };
}

export function dedupSystemPrompt(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  if (options.preserveSystemPrompt === true) return { body, applied: false };
  const seen = new Set<string>();
  let applied = false;
  const messages = body.messages.filter((msg) => {
    if (msg.role !== "system" || typeof msg.content !== "string") return true;
    const key = msg.content.trim().slice(0, 200);
    if (seen.has(key)) {
      applied = true;
      return false;
    }
    seen.add(key);
    return true;
  });
  return { body: { ...body, messages }, applied };
}

// Adjust a hard cut index to the nearest whitespace within a small lookback/lookahead
// window, so a truncated tool result never garbles the word it lands in the middle of
// (#8169). Prefers backing off to the end of the previous word (keeps the result at or
// under the limit); if no whitespace precedes the cut within the window (e.g. the tail
// end of a very long unbroken run), looks forward to complete the current word instead.
// Falls back to the original hard cut index when neither direction finds a boundary.
const TOOL_TRUNCATION_LOOKBACK = 80;

function isWordChar(char: string | undefined): boolean {
  return char !== undefined && /\S/.test(char);
}

function findWhitespaceBackward(content: string, cutIndex: number): number {
  const windowStart = Math.max(0, cutIndex - TOOL_TRUNCATION_LOOKBACK);
  for (let i = cutIndex; i > windowStart; i--) {
    if (!isWordChar(content[i - 1])) return i - 1;
  }
  return -1;
}

function findWhitespaceForward(content: string, cutIndex: number): number {
  const windowEnd = Math.min(content.length, cutIndex + TOOL_TRUNCATION_LOOKBACK);
  for (let i = cutIndex; i < windowEnd; i++) {
    if (!isWordChar(content[i])) return i;
  }
  return -1;
}

function backOffToWordBoundary(content: string, cutIndex: number): number {
  const onWordBoundary = !isWordChar(content[cutIndex - 1]) || !isWordChar(content[cutIndex]);
  if (onWordBoundary) return cutIndex;

  const backward = findWhitespaceBackward(content, cutIndex);
  if (backward !== -1) return backward;

  const forward = findWhitespaceForward(content, cutIndex);
  if (forward !== -1) return forward;

  return cutIndex;
}

const TRUNCATION_MARKER = "\n...[truncated]";
// Room for the middle marker, whatever its line count.
const ELISION_RESERVE = 32;
const TAIL_SHARE = 0.3;
// Content with this many lines or fewer keeps the head-only cut.
const MIN_LINES_FOR_TAIL = 10;

/** True when `text` has more than `lineCount` lines, without splitting the whole payload. */
function hasMoreLinesThan(text: string, lineCount: number): boolean {
  let index = -1;
  for (let found = 0; found < lineCount; found++) {
    index = text.indexOf("\n", index + 1);
    if (index === -1) return false;
  }
  return true;
}

/**
 * Start of the tail kept after the elision marker: the first line that begins inside the last
 * `tailBudget` chars, so the tail never exceeds its budget. -1 when no complete line fits.
 */
function findTailStart(text: string, tailBudget: number): number {
  const newline = text.indexOf("\n", text.length - tailBudget);
  if (newline === -1 || newline + 1 >= text.length) return -1;
  return newline + 1;
}

/**
 * Truncate a tool result string to the Lite cap. Multi-line content keeps its tail as well as its
 * head: a head-only cut deletes the lines an agent is about to edit (anchors, grep hits at the
 * bottom), so the model rebuilds them from memory and the edit it makes is rejected as stale.
 * The head is cut on a word boundary, the tail starts on a line boundary inside its budget, and
 * content whose last line alone exceeds that budget falls back to the head-only cut.
 * Single-line content still gets the #8169 word-boundary cut.
 */
function truncateToolText(text: string, maxLength: number): string {
  const budgetLength = maxLength - TRUNCATION_MARKER.length - ELISION_RESERVE;
  if (budgetLength > 0 && hasMoreLinesThan(text, MIN_LINES_FOR_TAIL)) {
    const headCut = backOffToWordBoundary(text, Math.ceil(budgetLength * (1 - TAIL_SHARE)));
    const tailStart = findTailStart(text, budgetLength - headCut);
    if (tailStart > headCut) {
      const elided = text.slice(headCut, tailStart).split("\n").length;
      const tail = text.slice(tailStart);
      return `${text.slice(0, headCut)}\n... [${elided} lines elided] ...\n${tail}${TRUNCATION_MARKER}`;
    }
  }
  const cutIndex = backOffToWordBoundary(text, maxLength);
  return text.slice(0, cutIndex) + TRUNCATION_MARKER;
}

/**
 * Anthropic tool results live in `tool_result` content blocks inside a
 * `role:"user"` message (`content` is a string or an array of text blocks).
 */
function truncateToolResultBlocks(
  msg: Message,
  maxLength: number
): { message: Message; applied: boolean } {
  if (msg.role !== "user" || !Array.isArray(msg.content)) return { message: msg, applied: false };
  let applied = false;
  const content = msg.content.map((block) => {
    if (block.type !== "tool_result") return block;
    const inner = block.content;
    if (typeof inner === "string") {
      if (inner.length <= maxLength) return block;
      applied = true;
      return { ...block, content: truncateToolText(inner, maxLength) };
    }
    if (!Array.isArray(inner)) return block;
    let innerApplied = false;
    const newInner = inner.map((part) => {
      const text = part.text;
      if (part.type !== "text" || typeof text !== "string" || text.length <= maxLength) return part;
      innerApplied = true;
      return { ...part, text: truncateToolText(text, maxLength) };
    });
    if (!innerApplied) return block;
    applied = true;
    return { ...block, content: newInner };
  });
  return applied
    ? { message: { ...msg, content }, applied: true }
    : { message: msg, applied: false };
}

export function compressToolResults(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  const MAX_TOOL_LENGTH = resolveLiteMaxToolLength(options.maxToolLength);
  // Results of the latest tool calls (after the last assistant message) are
  // what the model asked for this turn. Cutting them makes it re-read the same
  // file forever, since every re-read is cut again.
  const lastAssistant = body.messages.findLastIndex((msg) => msg.role === "assistant");
  // An OpenAI Responses API tool turn carries no assistant message — the call and its
  // output arrive as top-level items — so the trailing Responses outputs are this turn's.
  let trailingToolStart = body.messages.length;
  while (
    trailingToolStart > 0 &&
    isResponsesToolOutputMessage(body.messages[trailingToolStart - 1])
  ) {
    trailingToolStart -= 1;
  }
  const currentTurnStart = Math.min(
    lastAssistant === -1 ? body.messages.length : lastAssistant + 1,
    trailingToolStart
  );
  let applied = false;
  const messages = body.messages.map((msg, index) => {
    if (index >= currentTurnStart) return msg;
    if (msg.role === "tool" && typeof msg.content === "string") {
      if (msg.content.length <= MAX_TOOL_LENGTH) return msg;
      applied = true;
      return { ...msg, content: truncateToolText(msg.content, MAX_TOOL_LENGTH) };
    }
    const toolResult = truncateToolResultBlocks(msg, MAX_TOOL_LENGTH);
    if (toolResult.applied) applied = true;
    return toolResult.message;
  });
  return { body: { ...body, messages }, applied };
}

export function removeRedundantContent(
  body: ChatBody,
  options: LiteCompressionOptions = {}
): {
  body: ChatBody;
  applied: boolean;
} {
  if (!body.messages) return { body, applied: false };
  let applied = false;
  const messages: Message[] = [];
  for (let i = 0; i < body.messages.length; i++) {
    const msg = body.messages[i];
    if (options.preserveSystemPrompt === true && msg.role === "system") {
      messages.push(msg);
      continue;
    }
    const contentStr = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
    if (
      i > 0 &&
      msg.role !== "tool" &&
      body.messages[i - 1].role === msg.role &&
      typeof body.messages[i - 1].content === "string" &&
      body.messages[i - 1].content === contentStr
    ) {
      applied = true;
      continue;
    }
    messages.push(msg);
  }
  return { body: { ...body, messages }, applied };
}

export function replaceImageUrls(
  body: ChatBody,
  options?: LiteCompressionOptions | string
): { body: ChatBody; applied: boolean } {
  if (!body.messages) return { body, applied: false };
  const supportsVision =
    typeof options === "object" && options !== null
      ? options.supportsVision
      : typeof options === "string"
        ? modelSupportsVision(options)
        : undefined;
  if (supportsVision !== false) return { body, applied: false };

  let applied = false;
  const messages = body.messages.map((msg) => {
    if (!Array.isArray(msg.content)) return msg;
    const newContent = msg.content.map((part) => {
      if (
        typeof part === "object" &&
        part !== null &&
        part.type === "image_url" &&
        typeof (part as Record<string, unknown>).image_url === "object" &&
        ((part as Record<string, unknown>).image_url as Record<string, unknown>)?.url
      ) {
        const url = String(
          ((part as Record<string, unknown>).image_url as Record<string, unknown>).url
        );
        if (url.startsWith("data:image/")) {
          applied = true;
          const format = url.slice(url.indexOf("/") + 1, url.indexOf(";")) || "unknown";
          return { type: "text", text: `[image: ${format}]` };
        }
      }
      return part;
    });
    return { ...msg, content: newContent };
  });
  return { body: { ...body, messages }, applied };
}

export function applyLiteCompression(
  body: Record<string, unknown>,
  options?: LiteCompressionOptions
): CompressionResult {
  const originalBody = body;
  let current = body as ChatBody;
  const techniquesApplied: string[] = [];

  const r1 = collapseWhitespace(current, options);
  current = r1.body;
  if (r1.applied) techniquesApplied.push("whitespace");

  const r2 = dedupSystemPrompt(current, options);
  current = r2.body;
  if (r2.applied) techniquesApplied.push("system-dedup");

  if (options?.compressToolResults !== false) {
    const r3 = compressToolResults(current, options);
    current = r3.body;
    if (r3.applied) techniquesApplied.push("tool-compress");
  }

  const r4 = removeRedundantContent(current, options);
  current = r4.body;
  if (r4.applied) techniquesApplied.push("redundant-remove");

  const r5 = replaceImageUrls(current, options);
  current = r5.body;
  if (r5.applied) techniquesApplied.push("image-placeholder");

  const compressed = techniquesApplied.length > 0;
  const stats = compressed
    ? createCompressionStats(
        originalBody,
        current as Record<string, unknown>,
        "lite" as CompressionMode,
        techniquesApplied
      )
    : null;

  return {
    body: current as Record<string, unknown>,
    compressed,
    stats,
  };
}
