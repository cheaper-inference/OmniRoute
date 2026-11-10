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
