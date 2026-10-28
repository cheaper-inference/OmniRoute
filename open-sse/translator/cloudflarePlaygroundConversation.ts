/**
 * Cloudflare Playground conversation shaping.
 *
 * The playground rejects any single message over 6000 characters and any
 * conversation carrying more than 10 user-role messages, so a long agent loop
 * has to be trimmed every turn. Rather than dropping the older turns (which
 * loses the original task), everything that no longer fits verbatim is
 * compacted into a single user message; the newest turns are always kept
 * verbatim and the newest user turn is never dropped.
 *
 * Split out of cloudflarePlaygroundTools.ts to keep that file under the
 * file-size ratchet; the public surface is re-exported from there.
 */
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

/**
 * The Cloudflare Playground rejects any single message longer than 6000
 * characters ("Prompt too long (max 6000 characters)"). Keep a safety margin.
 */
export const CF_MAX_MESSAGE_CHARS = 5800;

/** Roles the playground counts toward the 10-message conversation cap. */
export function countsTowardCfConversationCap(role: string | undefined): boolean {
  return role === "user" || role === "tool";
}

/**
 * Index the oldest message a `maxUserMessages`-turn window can start on: the
 * newest user turns are kept, and the window always begins on a user turn so a
 * trimmed history never opens with an assistant tool-call whose results were
 * dropped. Returns 0 when everything already fits, and `messages.length` when
 * the budget is non-positive.
 */
function cfTailStartIndex(messages: ChatCompletionMessageParam[], maxUserMessages: number): number {
  if (maxUserMessages <= 0) return (messages ?? []).length;
  const list = messages ?? [];
  let seen = 0;
  for (let i = list.length - 1; i >= 0; i--) {
    if (!countsTowardCfConversationCap(list[i]?.role)) continue;
    seen++;
    if (seen === maxUserMessages) return i;
  }
  return 0;
}

/**
 * Keep only the most recent `maxUserMessages` user-role turns (tool results
 * included), dropping the oldest history first. Returns the input untouched
 * when it already fits.
 */
export function trimCfConversation(
  messages: ChatCompletionMessageParam[],
  maxUserMessages: number
): ChatCompletionMessageParam[] {
  const list = messages ?? [];
  return list.slice(cfTailStartIndex(list, maxUserMessages));
}

// ── Message rendering (shared by the executor and the compaction block) ──────

/** The subset of an OpenAI message the playground bridge renders as text. */
export interface CfMessageLike {
  role?: string;
  content?: unknown;
  tool_calls?: Array<{ function?: { name?: string; arguments?: string } }>;
  tool_call_id?: string;
}

/** Placeholder used when a tool result carries no text at all. */
const CF_EMPTY_TOOL_RESULT = "Tool executed successfully";

/**
 * Flatten an OpenAI message content field (string, or an array of text parts)
 * into the plain text the playground receives.
 */
export function flattenCfMessageContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : ((part as { text?: string })?.text ?? "")))
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

/** Render an assistant message's `tool_calls` as `<tool name="...">` markup. */
export function cfToolCallMarkup(toolCalls: CfMessageLike["tool_calls"]): string {
  if (!Array.isArray(toolCalls) || toolCalls.length === 0) return "";
  return toolCalls
    .map((call) => `<tool name="${call?.function?.name}">${call?.function?.arguments}</tool>`)
    .join("\n");
}

/**
 * Render one OpenAI message as the text the playground receives: flattened
 * content, plus replayed tool calls / tool results so the model sees the
 * conversation history. Returns "" when the message carries nothing to render.
 */
export function cfMessageText(message: CfMessageLike): string {
  let text = flattenCfMessageContent(message?.content);
  if (message?.role === "assistant") {
    const markup = cfToolCallMarkup(message.tool_calls);
    if (markup) text = text ? `${text}\n${markup}` : markup;
  }
  if (message?.role === "tool") {
    const resultText = text || CF_EMPTY_TOOL_RESULT;
    text = message.tool_call_id
      ? `<tool_result call_id="${message.tool_call_id}">${resultText}</tool_result>`
      : `<tool_result>${resultText}</tool_result>`;
  }
  return text;
}

/**
 * The playground rejects any single message longer than 6000 characters, so
 * every outbound message is capped a little below that.
 */
export function truncateCfMessage(text: string): string {
  if (text.length <= CF_MAX_MESSAGE_CHARS) return text;
  const marker = "\n…[truncated to fit the playground's 6000-char limit]";
  return text.slice(0, CF_MAX_MESSAGE_CHARS - marker.length) + marker;
}

// ── Conversation compaction ──────────────────────────────────────────────────

/**
 * Header of the compacted-history block. The block is a single user message
 * carrying the turns that no longer fit in the verbatim window, so a long
 * session keeps its thread (including the original task) instead of silently
 * losing everything the playground's 10-message cap pushed out.
 */
export const CF_COMPACT_HEADER =
  "# Earlier conversation (compacted to fit the playground's history limit)";

/**
 * Per-message character budget inside the compacted block. User turns are the
 * cheapest way to keep the thread (what was asked), so they get the most room;
 * tool output is capped hardest — it is normally the bulkiest and the least
 * useful once the turn it belonged to is historical.
 */
const CF_COMPACT_ITEM_CHARS: Record<string, number> = {
  user: 700,
  assistant: 300,
  tool: 400,
};

/** Room reserved for the `... N earlier turns (M chars) elided ...` marker. */
const CF_COMPACT_MARKER_RESERVE = 80;

interface CfCompactItem {
  header: string;
  text: string;
}

/** Cap one compacted turn, flagging how much was dropped. */
function capCfCompactText(text: string, cap: number): string {
  if (text.length <= cap) return text;
  return `${text.slice(0, cap).trimEnd()} …[+${text.length - cap} chars]`;
}

/** Render one conversation message as a compacted-block item, or null. */
function toCfCompactItem(message: CfMessageLike): CfCompactItem | null {
  if (message?.role !== "user" && message?.role !== "assistant" && message?.role !== "tool") {
    return null;
  }
  const text = cfMessageText(message);
  if (!text) return null;
  // Tool results already carry their `<tool_result ...>` wrapper, so they are
  // self-describing inside the block.
  const header =
    message.role === "user"
      ? "### USER"
      : message.role === "assistant"
        ? "### ASSISTANT"
        : "### TOOL RESULT";
  return { header, text: capCfCompactText(text, CF_COMPACT_ITEM_CHARS[message.role] ?? 300) };
}

function renderCfCompactItem(item: CfCompactItem): string {
  return `${item.header}\n${item.text}`;
}

/**
 * Assemble the compacted block. When it cannot hold every dropped turn it keeps
 * the first one (the original task statement) and the newest ones, and elides
 * the middle — never the tail, which is the part closest to the live context.
 */
function assembleCfCompactBlock(items: CfCompactItem[], maxChars: number): string {
  const prefix = `${CF_COMPACT_HEADER}\n\n`;
  const body = items.map(renderCfCompactItem);
  const full = prefix + body.join("\n\n");
  if (full.length <= maxChars) return full;

  const head = body[0];
  const tail: string[] = [];
  let room = maxChars - prefix.length - head.length - CF_COMPACT_MARKER_RESERVE;
  for (let i = body.length - 1; i >= 1; i--) {
    if (body[i].length + 2 > room) break;
    room -= body[i].length + 2;
    tail.unshift(body[i]);
  }

  const elided = items.slice(1, items.length - tail.length);
  const elidedChars = elided.reduce((sum, item) => sum + item.text.length, 0);
  const marker = `... ${elided.length} earlier turns (${elidedChars.toLocaleString("en-US")} chars) elided ...`;
  const assembled = [head, marker, ...tail].join("\n\n");
  // A single oversized first turn is already capped, so `assembled` fits; the
  // guard keeps a future cap change from producing a rejected request.
  return assembled.length + prefix.length <= maxChars
    ? prefix + assembled
    : `${prefix}${head}`.slice(0, maxChars);
}

/**
 * Split a conversation into the turns the playground can take verbatim and a
 * single compacted block for everything older.
 *
 * `maxUserMessages` is the verbatim budget; the block (when there is overflow)
 * is itself a user message, so callers must leave a slot for it.
 */
export function compactCfConversation(
  messages: ChatCompletionMessageParam[],
  maxUserMessages: number
): { block: string | null; tail: ChatCompletionMessageParam[] } {
  const list = messages ?? [];
  const tailStart = cfTailStartIndex(list, maxUserMessages);
  const tail = list.slice(tailStart);
  if (tailStart === 0) return { block: null, tail };

  const items = list
    .slice(0, tailStart)
    .map((message) => toCfCompactItem(message as CfMessageLike))
    .filter((item): item is CfCompactItem => item !== null);
  if (items.length === 0) return { block: null, tail };

  return { block: assembleCfCompactBlock(items, CF_MAX_MESSAGE_CHARS), tail };
}
