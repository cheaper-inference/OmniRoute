/**
 * chatCore pure Claude → Claude passthrough request body (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore's translation step (the `isClaudePassthrough`
 * branch). Forwards the client's Messages API body as-is without an OpenAI round-trip — the
 * Claude→OpenAI→Claude double translation was lossy and corrupted payloads at high context
 * (150+ msgs, 100+ tools; #1359). Claude Code sends well-formed Messages API payloads, so they are
 * trusted regardless of combo strategy or cache_control settings; only the Anthropic-specific
 * hygiene below is applied. Returns the body to dispatch. The reasoning-rule directive helper
 * (src/lib/reasoningRouting) is injected by the handler so this engine leaf takes no new
 * open-sse → src import edge.
 */

import { shouldUseMidConversationSystem } from "../../executors/claudeIdentity.ts";
import { ensureCacheControlOnLastUserMessage } from "../../services/claudeCodeConstraints.ts";
import { hoistDeferredToolsForTarget } from "../../translator/helpers/claudeDeferredTools.ts";
import { splitMisplacedToolResults } from "../../translator/helpers/claudeHelper.ts";
import { FORMATS } from "../../translator/formats.ts";
import { sanitizeAnthropicPassthroughHistory } from "./anthropicPassthroughHistory.ts";
import {
  extractSystemRoleMessages,
  hoistLeadingTextSystemMessages,
  relocateDirectiveOnlyMessages,
} from "./claudeSystemRole.ts";
import type { ClaudeMessage } from "./claudeMessageTypes.ts";
import { stripOutputConfigFormatForCompat } from "./outputConfigFormatStrip.ts";
import { stripClaudeRejectedTopLevelFields } from "./passthroughHelpers.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function buildClaudePassthroughBody({
  body,
  provider,
  clientHeaders,
  isClaudeCodeSemanticPassthrough,
  effectiveModel,
  targetFormat,
  preserveCacheControl,
  normalizeClaudeUpstreamMessages,
  applyReasoningRuleDirective,
  log,
}: {
  body: Record<string, unknown>;
  provider: string;
  clientHeaders: Headers | Record<string, unknown> | null | undefined;
  isClaudeCodeSemanticPassthrough: boolean;
  effectiveModel: string;
  targetFormat: string;
  preserveCacheControl: boolean;
  normalizeClaudeUpstreamMessages: (
    payload: Record<string, unknown>,
    options?: { preserveToolResultBlocks?: boolean }
  ) => void;
  applyReasoningRuleDirective: (bodyInput: unknown, targetFormat?: "claude") => unknown;
  log?: LoggerLike;
}): Record<string, unknown> {
  // applyReasoningRuleDirective returns unknown; the hoist helper requires a record.
  const claudePassthroughBody = applyReasoningRuleDirective({ ...body }, "claude");
  const translatedBody = hoistDeferredToolsForTarget(
    claudePassthroughBody !== null &&
      typeof claudePassthroughBody === "object" &&
      !Array.isArray(claudePassthroughBody)
      ? (claudePassthroughBody as Record<string, unknown>)
      : { ...(body as Record<string, unknown>) },
    provider
  );
  translatedBody._disableToolPrefix = true;

  // Sanitize historical thinking-block signatures for Anthropic-native Claude OAuth.
  // Only Anthropic's first-party API validates these signatures (token-bound); third-party
  // Claude-shape providers do not. See redactPassthroughThinkingSignatures + issue #2454.
  if (provider === "claude") {
    // Also drops foreign server_tool_use ids (z.ai `call_…`) that fail ^srvtoolu_ (9router#3685).
    translatedBody.messages = sanitizeAnthropicPassthroughHistory(
      translatedBody.messages
    ) as typeof translatedBody.messages;

    stripClaudeRejectedTopLevelFields(translatedBody, clientHeaders);
  }

  // Legacy models reject role:"system" messages. Supported models accept
  // them behind a beta, and hoisting them breaks the prompt cache prefix.
  if (isClaudeCodeSemanticPassthrough) {
    if (provider !== "claude" || !shouldUseMidConversationSystem(translatedBody, effectiveModel)) {
      extractSystemRoleMessages(translatedBody);
    } else {
      // The mid-conversation-system path keeps system-role messages inside
      // messages[], but a directive-only message (content: [] +
      // output_config) at messages[0] is rejected by Anthropic. Move it past
      // the first real turn; Anthropic accepts the form at any other position.
      // A text-bearing system message at messages[0] (e.g. the Output Styles
      // injection) is rejected there too: hoist the leading run into the
      // top-level `system` parameter first.
      hoistLeadingTextSystemMessages(translatedBody);
      relocateDirectiveOnlyMessages(translatedBody);
    }
    if (Array.isArray(translatedBody.messages)) {
      translatedBody.messages = splitMisplacedToolResults(
        translatedBody.messages as ClaudeMessage[]
      ) as typeof translatedBody.messages;
    }
    if (provider === "claude") {
      ensureCacheControlOnLastUserMessage(translatedBody);
    }
  } else {
    // Same guard as the CC-bridge path: only preserve tool_result blocks
    // for Anthropic-native targets. See issue #13971. This branch only runs
    // under isClaudePassthrough (sourceFormat === targetFormat === CLAUDE,
    // defined in handleChatCore), so targetFormat === FORMATS.CLAUDE always holds
    // here — the guard is a no-op on this call site, kept for symmetry with the
    // CC-bridge one rather than a change to code the issue said not to touch.
    normalizeClaudeUpstreamMessages(translatedBody, {
      preserveToolResultBlocks: targetFormat === FORMATS.CLAUDE,
    });
  }

  log?.debug?.("FORMAT", `claude passthrough (preserveCache=${preserveCacheControl})`);

  // Migrate deprecated top-level `output_format` → `output_config.format`.
  // Anthropic returns a 400 on the legacy field; some clients (e.g. ForgeCode)
  // still emit it. Preserves an existing output_config.format if present.
  if (translatedBody.output_format !== undefined) {
    const oc =
      translatedBody.output_config && typeof translatedBody.output_config === "object"
        ? (translatedBody.output_config as Record<string, unknown>)
        : {};
    if (oc.format === undefined) oc.format = translatedBody.output_format;
    translatedBody.output_config = oc;
    delete translatedBody.output_format;
  }

  // Fix #1719: Strip output_config.format for non-Anthropic Claude-compatible providers
  // (first-party `claude` OAuth and `anthropic` API-key keep it).
  // Third-party Claude endpoints (MiniMax, DeepSeek via aggregators) reject this field
  // with 400 errors since they don't support Anthropic's structured output / json_schema.
  stripOutputConfigFormatForCompat(translatedBody, provider);
  return translatedBody;
}
