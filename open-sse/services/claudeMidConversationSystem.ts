/**
 * Mid-conversation system-turn policy for plain `anthropic-compatible-*` connections.
 *
 * The claude → claude passthrough hoists every `role: "system"` turn into the top-level
 * `system` parameter for any provider that is not native `claude`. A client that appends a
 * system notification each turn (environment updates, background notices, `<total_tokens>`
 * budget updates) then grows `system` — the head of the prompt — on every request, so the
 * cached history after it never matches again and the whole conversation is re-written to
 * the cache each turn.
 *
 * Keeping those turns in place is only valid on an upstream that accepts `role: "system"`
 * inside `messages[]`, which Anthropic gates behind the `mid-conversation-system-2026-04-07`
 * beta. Many Anthropic-shaped relays (GLM, Kimi, MiniMax endpoints) do not support it and
 * answer such a body with 400, so the in-place shape is used only when BOTH hold:
 *   1. the operator turned on `ANTHROPIC_COMPATIBLE_MID_CONVERSATION_SYSTEM` (default off),
 *   2. the client itself negotiated the beta in its `anthropic-beta` header — the same signal
 *      native `claude` relies on (shouldUseMidConversationSystem in executors/claudeIdentity.ts
 *      adds the beta it then needs). OmniRoute never invents the beta; the client's token is
 *      forwarded by applyClientAnthropicBeta (config/anthropicHeaders.ts) while such a turn is
 *      still in the body.
 * Anything else — flag off, beta absent, flag read failing — keeps the legacy full hoist.
 */

import { MID_CONVERSATION_SYSTEM_BETA } from "../config/anthropicHeaders.ts";
import { isClaudeCodeCompatibleProvider } from "./claudeCodeCompatible.ts";
import { FORMATS } from "../translator/formats.ts";

export const MID_CONVERSATION_SYSTEM_FLAG = "ANTHROPIC_COMPATIBLE_MID_CONVERSATION_SYSTEM";

/** Whether a client `anthropic-beta` comma-list carries the mid-conversation-system token. */
export function clientNegotiatedMidConversationSystem(clientBeta: unknown): boolean {
  if (typeof clientBeta !== "string") return false;
  return clientBeta
    .split(",")
    .some((token) => token.trim().toLowerCase() === MID_CONVERSATION_SYSTEM_BETA);
}

/** Fail closed: a throwing flag reader means "off" (legacy hoist). */
function readFlag(isEnabled: (() => boolean) | null | undefined): boolean {
  if (typeof isEnabled !== "function") return false;
  try {
    return isEnabled() === true;
  } catch {
    return false;
  }
}

/**
 * True when this request should keep its mid-conversation system turns in `messages[]`.
 * Only plain `anthropic-compatible-*` passthrough is covered: native `claude` keeps its own
 * model/shape policy (shouldUseMidConversationSystem) and the CC bridge builds its own body.
 * The flag reader is injected (chatCore owns the feature-flag import) and only invoked once the
 * cheap scope checks passed.
 */
export function resolveClaudeMidConversationSystemPolicy({
  provider,
  sourceFormat,
  targetFormat,
  clientAnthropicBeta,
  isPassthroughEnabled,
}: {
  provider: string | null | undefined;
  sourceFormat: string | null | undefined;
  targetFormat: string | null | undefined;
  clientAnthropicBeta?: string | null;
  isPassthroughEnabled?: (() => boolean) | null;
}): boolean {
  if (sourceFormat !== FORMATS.CLAUDE || targetFormat !== FORMATS.CLAUDE) return false;
  if (typeof provider !== "string" || !provider.startsWith("anthropic-compatible-")) return false;
  if (isClaudeCodeCompatibleProvider(provider)) return false;
  if (!clientNegotiatedMidConversationSystem(clientAnthropicBeta)) return false;
  return readFlag(isPassthroughEnabled);
}
