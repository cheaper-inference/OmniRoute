/**
 * Assistant-prefill compatibility for upstreams that require a user-last conversation.
 *
 * Some Anthropic-compatible relays (and newer Claude models behind them) reject a request
 * whose last message is an `assistant` turn:
 *   400 "This model does not support assistant message prefill. The conversation must end
 *        with a user message."
 * Other relays accept prefill, so the strip is an explicit per-connection opt-in
 * (`providerSpecificData.requireUserLastMessage`), not a global rule.
 *
 * Trade-off: dropping the trailing assistant turn hands the model back the last user turn,
 * so it may regenerate an answer the client already has. It is a compatibility shim for the
 * prefill ban, not a recovery of whatever the client meant by that trailing turn.
 */

import { stripTrailingAssistantOrphanToolUse } from "./contextManager.ts";

export {
  ASSISTANT_PREFILL_UNSUPPORTED_PATTERN,
  isAssistantPrefillUnsupported400,
  isAssistantPrefillUnsupportedError,
} from "./assistantPrefillError.ts";

/** Opt-in flag on the connection's providerSpecificData. */
export function requiresUserLastMessage(providerSpecificData: unknown): boolean {
  return (
    !!providerSpecificData &&
    typeof providerSpecificData === "object" &&
    (providerSpecificData as Record<string, unknown>).requireUserLastMessage === true
  );
}

function hasStructuredToolCall(message: Record<string, unknown>): boolean {
  const toolUse =
    Array.isArray(message.content) &&
    (message.content as Array<Record<string, unknown> | null>).some(
      (block) => block?.type === "tool_use"
    );
  const toolCalls = Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
  return toolUse || toolCalls;
}

export interface UserLastNormalization {
  messages: Record<string, unknown>[];
  /** Trailing assistant turns dropped (0 when unchanged). */
  removedTurns: number;
  /** True when nothing could be stripped because no user turn would remain. */
  noUserTurn: boolean;
}

/**
 * Drop every trailing `assistant` turn so the conversation ends on a user turn.
 *
 * - Text / thinking-only assistant turns are dropped (XML that merely looks like a tool call
 *   inside `text` is still text — only structured `tool_use` / `tool_calls` count).
 * - A trailing assistant with an unanswered `tool_use` goes through the existing orphan
 *   cleanup first (its tool_use blocks are removed; nothing after it can reference them).
 * - Never returns an empty array and never invents a user turn: if no user turn would remain,
 *   the input is returned unchanged with `noUserTurn: true` and the upstream decides.
 *
 * Pure: the input array and its message objects are not mutated.
 */
export function stripTrailingAssistantTurns(
  messages: Record<string, unknown>[]
): UserLastNormalization {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { messages, removedTurns: 0, noUserTurn: false };
  }
  if (!messages.some((m) => m?.role === "user")) {
    const endsOnAssistant = messages[messages.length - 1]?.role === "assistant";
    return { messages, removedTurns: 0, noUserTurn: endsOnAssistant };
  }

  let current = messages;
  let removedTurns = 0;
  while (current.length > 0 && current[current.length - 1]?.role === "assistant") {
    const last = current[current.length - 1];
    if (hasStructuredToolCall(last)) {
      const cleaned = stripTrailingAssistantOrphanToolUse(current);
      if (cleaned === current) break;
      if (cleaned.length < current.length) removedTurns++;
      current = cleaned;
      continue;
    }
    current = current.slice(0, -1);
    removedTurns++;
  }
  return { messages: current, removedTurns, noUserTurn: false };
}

/** Trim the last text block; a tail text block that trims to empty is removed (repeat). */
function trimFinalTextBlocks(
  content: Array<Record<string, unknown> | null>
): Array<Record<string, unknown> | null> {
  const blocks = [...content];
  let tail = blocks.at(-1);
  while (tail?.type === "text") {
    const text = typeof tail.text === "string" ? tail.text.trimEnd() : "";
    if (text) {
      blocks[blocks.length - 1] = { ...tail, text };
      break;
    }
    blocks.pop();
    tail = blocks.at(-1);
  }
  return blocks;
}

/**
 * Anthropic reads an assistant-last turn as a prefill and rejects it with
 *   400 "final assistant content cannot end with trailing whitespace".
 * Compression and client edits can leave such a tail. Trim only the final text block;
 * a tail block that trims to empty is removed (repeat), and an emptied turn is dropped.
 * A non-text tail (tool_use, thinking) is left alone. Pure: inputs are not mutated.
 */
export function normalizeClaudeFinalAssistantWhitespace(
  messages: Record<string, unknown>[]
): Record<string, unknown>[] {
  const last = Array.isArray(messages) ? messages[messages.length - 1] : undefined;
  if (last?.role !== "assistant") return messages;

  let content: unknown;
  if (typeof last.content === "string") {
    content = last.content.trimEnd();
  } else if (Array.isArray(last.content)) {
    content = trimFinalTextBlocks(last.content as Array<Record<string, unknown> | null>);
  } else {
    return messages;
  }

  if (JSON.stringify(content) === JSON.stringify(last.content)) return messages;
  const rest = messages.slice(0, -1);
  const empty = typeof content === "string" ? content === "" : (content as unknown[]).length === 0;
  // shortcut: a lone emptied assistant turn is kept so the body never becomes empty; upgrade if an empty body should be rejected here.
  if (empty) return rest.length > 0 ? rest : messages;
  return [...rest, { ...last, content }];
}
