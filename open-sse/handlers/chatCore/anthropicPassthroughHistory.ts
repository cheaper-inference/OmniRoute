/**
 * Anthropic-native Claude passthrough history sanitizer (chatCore god-file decomposition).
 *
 * Extracted from chatCore.ts so the frozen file does not grow: everything a pure Claude
 * passthrough body must lose before it reaches Anthropic's first-party API, which validates
 * fields that third-party Claude-shape providers accept.
 */

import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import { redactPassthroughThinkingSignatures } from "./passthroughHelpers.ts";

type AnthropicMessage = {
  role?: unknown;
  content?: unknown;
};

const ANTHROPIC_SERVER_TOOL_USE_ID = /^srvtoolu_[a-zA-Z0-9_]+$/;

/**
 * Drop `server_tool_use` blocks whose id Anthropic could never have issued, plus
 * every block that references them via `tool_use_id` (their `*_tool_result`).
 *
 * Providers that run their own built-in tools (z.ai/glm `analyze_image`) emit
 * native ids such as `call_…`. In a mixed combo those blocks stay in the client
 * history, and Anthropic validates `server_tool_use.id` against `^srvtoolu_`, so
 * once a later turn routes to Anthropic every request answers 400 and the session
 * cannot recover (9router#3685). The paired result is removed too — an orphan
 * result would be rejected in turn. A message left with no content is removed,
 * matching {@link dropUnsignedPassthroughThinkingBlocks}. Returns the original
 * reference when nothing needs dropping; never mutates its input.
 */
export function dropForeignServerToolUseBlocks(messages: unknown): unknown {
  if (!Array.isArray(messages)) return messages;

  const foreignIds = new Set<string>();
  for (const message of messages as AnthropicMessage[]) {
    if (!message || !Array.isArray(message.content)) continue;
    for (const block of message.content) {
      if (!block || typeof block !== "object") continue;
      const { type, id } = block as { type?: unknown; id?: unknown };
      if (type !== "server_tool_use") continue;
      if (typeof id !== "string" || !ANTHROPIC_SERVER_TOOL_USE_ID.test(id)) {
        foreignIds.add(typeof id === "string" ? id : "");
      }
    }
  }
  if (foreignIds.size === 0) return messages;

  const isForeignBlock = (block: unknown): boolean => {
    if (!block || typeof block !== "object") return false;
    const { type, id, tool_use_id } = block as {
      type?: unknown;
      id?: unknown;
      tool_use_id?: unknown;
    };
    if (type === "server_tool_use") {
      return typeof id !== "string" || !ANTHROPIC_SERVER_TOOL_USE_ID.test(id);
    }
    return typeof tool_use_id === "string" && foreignIds.has(tool_use_id);
  };

  let changed = false;
  const kept: unknown[] = [];
  for (const message of messages as AnthropicMessage[]) {
    if (!message || !Array.isArray(message.content) || !message.content.some(isForeignBlock)) {
      kept.push(message);
      continue;
    }
    changed = true;
    const content = message.content.filter((block) => !isForeignBlock(block));
    if (content.length > 0) kept.push({ ...message, content });
  }
  return changed ? kept : messages;
}

/**
 * Sanitize the history of a pure Claude passthrough request bound for Anthropic (`claude`):
 * unsigned thinking blocks (#2454, #12917) and foreign `server_tool_use` ids (9router#3685).
 */
export function sanitizeAnthropicPassthroughHistory(messages: unknown): unknown {
  const redacted = redactPassthroughThinkingSignatures(messages, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  return dropForeignServerToolUseBlocks(redacted);
}
