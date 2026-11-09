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
 * inside `messages[]`. Many Anthropic-shaped relays (GLM, Kimi, MiniMax endpoints) answer such
 * a body with 400, and whether a relay accepts it is a property of that relay, not of the
 * client: a client does not always send the `mid-conversation-system-2026-04-07` beta even
 * when its relay accepts the shape. So the in-place shape is a per-connection opt-in
 * (`providerSpecificData.keepMidConversationSystem`, default off). The client's own beta is
 * still forwarded when present (applyClientAnthropicBeta, config/anthropicHeaders.ts) and is
 * never invented. Anything else keeps the legacy full hoist.
 */

import { isClaudeCodeCompatibleProvider } from "./claudeCodeCompatible.ts";
import { FORMATS } from "../translator/formats.ts";

/** Per-connection opt-in on providerSpecificData (strict boolean). */
export function keepsMidConversationSystem(providerSpecificData: unknown): boolean {
  return (
    !!providerSpecificData &&
    typeof providerSpecificData === "object" &&
    (providerSpecificData as Record<string, unknown>).keepMidConversationSystem === true
  );
}

/**
 * True when this request should keep its mid-conversation system turns in `messages[]`.
 * Only plain `anthropic-compatible-*` passthrough is covered: native `claude` keeps its own
 * model/shape policy (shouldUseMidConversationSystem) and the CC bridge builds its own body.
 */
export function resolveClaudeMidConversationSystemPolicy({
  provider,
  sourceFormat,
  targetFormat,
  providerSpecificData,
}: {
  provider: string | null | undefined;
  sourceFormat: string | null | undefined;
  targetFormat: string | null | undefined;
  providerSpecificData?: unknown;
}): boolean {
  if (sourceFormat !== FORMATS.CLAUDE || targetFormat !== FORMATS.CLAUDE) return false;
  if (typeof provider !== "string" || !provider.startsWith("anthropic-compatible-")) return false;
  if (isClaudeCodeCompatibleProvider(provider)) return false;
  return keepsMidConversationSystem(providerSpecificData);
}
