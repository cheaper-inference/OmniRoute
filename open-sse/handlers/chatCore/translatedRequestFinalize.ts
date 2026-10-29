/**
 * chatCore post-translation request finalization (chatCore god-file decomposition, slice 2 —
 * design after #15709).
 *
 * Extracted byte-identically from handleChatCore, right after translation: capture the request
 * tool metadata, apply the OpenRouter / Kiro / Claude tool-schema dispatch fixes, resolve the response
 * tool-name map, strip the translator side channels, set the upstream model id, apply the
 * Responses `previous_response_id` policy and the Codex effort-suffix guard. Mutates the
 * translated body in place where the inline block did, and returns the (possibly rebound) body
 * together with the two tool maps the response path needs.
 */

import { applyResponsesPreviousResponseIdPolicy } from "../../utils/responsesStatePolicy.ts";
import { sanitizeKiroTools } from "../../utils/kiroSanitizer.ts";
import { FORMATS } from "../../translator/formats.ts";
import { normalizeClaudeToolsForDispatch } from "./claudeToolDefaults.ts";
import { normalizeToolSchemasForProvider } from "./openrouterToolSchemas.ts";
import { buildClaudePassthroughToolNameMap } from "./passthroughToolNames.ts";
import {
  extractRequestToolMetadata,
  resolveResponseToolNameMap,
  type NamespaceIdentity,
} from "./requestToolIdentity.ts";

type LoggerLike =
  { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

/** The Kiro wire shape the tool-schema sanitizer reaches into. */
type KiroToolCarrier = {
  conversationState: {
    currentMessage: { userInputMessage: { userInputMessageContext: { tools?: unknown } } };
  };
};

export function finalizeTranslatedRequest({
  translatedBody: translatedBodyInput,
  body,
  provider,
  alias,
  effectiveModel,
  sourceFormat,
  targetFormat,
  isClaudePassthrough,
  credentials,
  previousResponseIdMode,
  log,
}: {
  translatedBody: Record<string, unknown>;
  body: Record<string, unknown>;
  provider: string;
  alias: string | null | undefined;
  effectiveModel: string;
  sourceFormat: string;
  targetFormat: string;
  isClaudePassthrough: boolean;
  credentials: unknown;
  previousResponseIdMode: unknown;
  log?: LoggerLike;
}): {
  translatedBody: Record<string, unknown>;
  requestToolIdentityMap: Map<string, NamespaceIdentity> | null;
  toolNameMap: Map<string, string> | null;
} {
  let translatedBody = translatedBodyInput;
  // Keep the request translator's namespace identities separate from toolNameMap:
  // the latter is a Kiro/Claude passthrough alias channel with string values,
  // while namespace identities carry `{namespace, name}` for the #7936 response
  // seam. Capture both before stripping their side channels: a Responses ->
  // Gemini/Antigravity pivot carries both maps, not one recoverable ledger.
  const { requestToolIdentityMap, toolNameAliasMap } = extractRequestToolMetadata(translatedBody);

  // OpenRouter (→ Cohere) 400s the whole request on a malformed `pattern`
  // regex in any tool schema; drop only those constraints before dispatch.
  if (Array.isArray(translatedBody?.tools)) {
    translatedBody.tools = normalizeToolSchemasForProvider(provider, translatedBody.tools, log);
  }

  // Kiro: sanitize tool schemas before dispatch. Kiro returns 400 "Improperly
  // formed request" for unsupported JSON-Schema keywords (anyOf/$ref/if-then,
  // etc.) and tool names >64 chars. Strip those keys and hash-truncate long
  // names; merge the truncated→original nameMap into the existing
  // `_toolNameMap` so kiro-to-openai maps streamed tool-call names back (#1375).
  if (targetFormat === FORMATS.KIRO) {
    const kiroBody = translatedBody as unknown as KiroToolCarrier;
    const kiroTools =
      kiroBody?.conversationState?.currentMessage?.userInputMessage?.userInputMessageContext?.tools;
    if (kiroTools) {
      const { tools: sanitizedKiroTools, nameMap: kiroNameMap } = sanitizeKiroTools(kiroTools);
      kiroBody.conversationState.currentMessage.userInputMessage.userInputMessageContext.tools =
        sanitizedKiroTools;
      if (kiroNameMap.size > 0) {
        const existing =
          translatedBody._toolNameMap instanceof Map
            ? (translatedBody._toolNameMap as Map<string, string>)
            : new Map<string, string>();
        kiroNameMap.forEach((original, truncated) => existing.set(truncated, original));
        translatedBody._toolNameMap = existing;
      }
    }
  }

  // Claude: strict Anthropic-compatible gateways (e.g. MiniMax) reject tool
  // definitions that omit the required `type` discriminator with HTTP 400. Default
  // a missing `type` to "custom" before dispatch, mirroring Anthropic's own
  // inference, so legacy Claude-format tool payloads survive strict gateways (#2195).
  // AgentRouter is the opposite quirk: its Rust deserializer only accepts versioned
  // tool types and 400s on `type: "custom"` — there the discriminator is stripped
  // instead (see claudeToolDefaults.ts).
  if (targetFormat === FORMATS.CLAUDE && Array.isArray(translatedBody.tools)) {
    translatedBody.tools = normalizeClaudeToolsForDispatch(
      translatedBody.tools,
      provider
    ) as typeof translatedBody.tools;
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap ?? toolNameAliasMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  // A later provider-specific ledger (Kiro above) wins; otherwise use the
  // alias map captured before extraction. Namespace identities are distinct
  // from aliases and cannot restore sanitized Gemini names on their own.
  const toolNameMap = resolveResponseToolNameMap(
    translatedToolNameMap,
    nativeClaudeToolNameMap,
    requestToolIdentityMap
  );
  delete translatedBody._toolNameMap;
  delete translatedBody._disableToolPrefix;

  // Update model in body — use resolved alias so the provider gets the correct model ID (#472)
  // Strip provider/alias prefix if it exactly matches the routing prefix so upstream receives the raw model name (#1261)
  let finalModelToUpstream = effectiveModel;
  // Defense-in-depth: only string-strip when effectiveModel is actually a string.
  // The API guards `model` via Zod (z.string()), but internal callers could pass a
  // non-string and a bare `.startsWith` would crash with `startsWith is not a
  // function` (same class as #2359 / #2463). Mirrors 9router's `?.startsWith?.()`.
  if (typeof finalModelToUpstream === "string") {
    if (finalModelToUpstream.startsWith(`${provider}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
    } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
    }
  }
  translatedBody.model = finalModelToUpstream;

  const previousResponseIdPolicy = applyResponsesPreviousResponseIdPolicy(translatedBody, {
    mode: previousResponseIdMode,
    provider,
    sourceFormat,
    targetFormat,
    credentials,
  });
  translatedBody = previousResponseIdPolicy.body as typeof translatedBody;

  // #1789: Prevent output_config.effort from overriding effort encoded in model name (Codex)
  if (provider === "codex" || provider?.startsWith("codex")) {
    const hasEffortSuffix = finalModelToUpstream.match(/-(low|medium|high|xhigh)$/i);
    if (
      hasEffortSuffix &&
      translatedBody.output_config &&
      typeof translatedBody.output_config === "object"
    ) {
      const oc = translatedBody.output_config as Record<string, unknown>;
      if (oc.effort) {
        log?.warn?.(
          "PARAMS",
          `Stripped output_config.effort="${oc.effort}" because model "${finalModelToUpstream}" already encodes effort`
        );
        delete oc.effort;
        if (Object.keys(oc).length === 0) {
          delete translatedBody.output_config;
        }
      }
    }
  }
  return { translatedBody, requestToolIdentityMap, toolNameMap };
}
