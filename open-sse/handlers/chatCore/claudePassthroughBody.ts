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
import { detachClaudeCodeRewriteTargets } from "../../executors/claudeOauthBodyIsolation.ts";
import { ensureCacheControlOnLastUserMessage } from "../../services/claudeCodeConstraints.ts";
import {
  acceptsInlineToolAdditions,
  hoistDeferredToolsForTarget,
} from "../../translator/helpers/claudeDeferredTools.ts";
import {
  disableManualThinkingWithoutFinalBlock,
  ensurePassthroughCacheBreakpoints,
  splitMisplacedToolResults,
  type ClaudeRequestBody,
} from "../../translator/helpers/claudeHelper.ts";
import { FORMATS } from "../../translator/formats.ts";
import type { ConnectionCacheOverride } from "../../utils/cacheControlPolicy.ts";
import { sanitizeAnthropicPassthroughHistory } from "./anthropicPassthroughHistory.ts";
import { normalizeAdvisorToolModels } from "./claudeAdvisorTool.ts";
import {
  extractSystemRoleMessages,
  hoistLeadingTextSystemMessages,
  relocateDirectiveOnlyMessages,
} from "./claudeSystemRole.ts";
import type { ClaudeMessage } from "./claudeMessageTypes.ts";
import { stripOutputConfigFormatForCompat } from "./outputConfigFormatStrip.ts";
import { stripClaudeRejectedTopLevelFields } from "./passthroughHelpers.ts";

const BILLING_LINE = /^x-anthropic-billing-header:[^\n]*(?:\r?\n)?/i;

// Claude Code's billing line rotates every turn. A non-Claude target cannot use it, and it breaks
// that target's prompt-cache prefix. Replace the system value; never mutate the client's array.
// shortcut: Anthropic-shape means provider claude/anthropic/anthropic-compatible-* or a "claude"
// model name; a custom host that proxies real Claude under another name keeps losing the line.
function dropBillingLine(body: Record<string, unknown>): void {
  const { system } = body;
  if (typeof system === "string") {
    const text = system.replace(BILLING_LINE, "");
    if (text) body.system = text;
    else delete body.system;
  } else if (Array.isArray(system)) {
    body.system = system.flatMap((block) => {
      const text = block?.text;
      if (typeof text !== "string" || !BILLING_LINE.test(text)) return [block];
      const rest = text.replace(BILLING_LINE, "");
      return rest ? [{ ...block, text: rest }] : [];
    });
  }
}

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

type ClaudePassthroughBodyInput = {
  body: Record<string, unknown>;
  provider: string;
  clientHeaders: Headers | Record<string, unknown> | null | undefined;
  isClaudeCodeSemanticPassthrough: boolean;
  effectiveModel: string;
  targetFormat: string;
  preserveCacheControl: boolean;
  connectionCacheOverride?: ConnectionCacheOverride | null;
  normalizeClaudeUpstreamMessages: (
    payload: Record<string, unknown>,
    options?: { preserveToolResultBlocks?: boolean }
  ) => void;
  applyReasoningRuleDirective: (bodyInput: unknown, targetFormat?: "claude") => unknown;
  log?: LoggerLike;
};

/**
 * Anthropic-native upstreams only: third-party Claude-shape providers have their own (or no)
 * caching semantics. A connection's cache override is the operator's opt-out.
 */
function acceptsInjectedCacheBreakpoints(
  provider: string,
  connectionCacheOverride: ConnectionCacheOverride | null | undefined
): boolean {
  if (provider !== "claude" && !provider.startsWith("anthropic-compatible-")) return false;
  return (
    connectionCacheOverride?.supportsPromptCaching !== false &&
    connectionCacheOverride?.cacheControlPassthrough !== "strip"
  );
}

export function buildClaudePassthroughBody({
  body,
  provider,
  clientHeaders,
  isClaudeCodeSemanticPassthrough,
  effectiveModel,
  targetFormat,
  preserveCacheControl,
  connectionCacheOverride,
  normalizeClaudeUpstreamMessages,
  applyReasoningRuleDirective,
  log,
}: ClaudePassthroughBodyInput): Record<string, unknown> {
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

  if (!acceptsInlineToolAdditions(provider) && !/claude/i.test(effectiveModel)) {
    dropBillingLine(translatedBody);
  }

  const isFirstPartyAnthropic = provider === "claude" || provider === "anthropic";
  // Sanitize historical thinking-block signatures for first-party Anthropic (OAuth + API key).
  // Only Anthropic's first-party API validates these signatures (token-bound); third-party
  // Claude-shape providers do not. See redactPassthroughThinkingSignatures + issue #2454.
  if (isFirstPartyAnthropic) {
    // Also drops foreign server_tool_use ids (z.ai `call_…`) that fail ^srvtoolu_ (9router#3685).
    translatedBody.messages = sanitizeAnthropicPassthroughHistory(
      translatedBody.messages
    ) as typeof translatedBody.messages;
    // Manual `enabled` thinking needs a thinking block on the final tool_use turn; with none
    // left (unsigned ones were dropped) turn thinking off instead of injecting a placeholder.
    disableManualThinkingWithoutFinalBlock(translatedBody as ClaudeRequestBody);

    stripClaudeRejectedTopLevelFields(translatedBody, clientHeaders);
  }
  if (provider === "claude" || provider === "anthropic") {
    // Claude Code names the advisor tool's model with the OmniRoute alias (claude-opus-5.5).
    normalizeAdvisorToolModels(translatedBody);
  }

  // Legacy models reject role:"system" messages. Supported models accept
  // them behind a beta, and hoisting them breaks the prompt cache prefix.
  // Only the native `claude` dispatch sends that beta (selectBetaFlags); the
  // `anthropic` API-key dispatch does not, so it always hoists.
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
    if (isFirstPartyAnthropic) {
      // The marker is written into the last user block, which the client body still owns.
      detachClaudeCodeRewriteTargets(translatedBody);
      ensureCacheControlOnLastUserMessage(translatedBody, { countTools: provider === "anthropic" });
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
    // Marker-less Anthropic clients (e.g. Cursor) ship zero cache
    // breakpoints through pure passthrough, re-billing the full prefix
    // every turn (678M uncached prompt tokens/week observed). Inject the
    // standard breakpoints ONLY when the body carries none anywhere —
    // a client that manages its own markers stays byte-untouched. A combo
    // replays the caller's body on its next step, so write into copies only.
    if (acceptsInjectedCacheBreakpoints(provider, connectionCacheOverride)) {
      detachClaudeCodeRewriteTargets(translatedBody);
      ensurePassthroughCacheBreakpoints(translatedBody as ClaudeRequestBody, provider);
    }
  }

  log?.debug?.("FORMAT", `claude passthrough (preserveCache=${preserveCacheControl})`);

  // Migrate deprecated top-level `output_format` → `output_config.format`.
  // Anthropic returns a 400 on the legacy field; some clients (e.g. ForgeCode)
  // still emit it. Preserves an existing output_config.format if present.
  if (translatedBody.output_format !== undefined) {
    // Copy-on-write: output_config may be the caller's shared object (shallow
    // body copy per combo leg); writing format into it leaks to the other legs.
    const oc =
      translatedBody.output_config && typeof translatedBody.output_config === "object"
        ? { ...(translatedBody.output_config as Record<string, unknown>) }
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
