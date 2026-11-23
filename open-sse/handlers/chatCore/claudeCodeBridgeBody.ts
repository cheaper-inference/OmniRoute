/**
 * chatCore Claude Code-compatible bridge request body (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore's translation step (the `isClaudeCodeCompatible`
 * branch). Claude Code-compatible providers expect Anthropic Messages-shaped payloads, but only
 * role/text/max_tokens/effort are extracted from an OpenAI-like view first; the bridge request is
 * then assembled by buildClaudeCodeCompatibleRequest. Returns the dispatch body plus the resolved
 * Claude Code session id, which the handler threads into the execution credentials. The model
 * flag lookups (src/lib/db/models) and the reasoning-rule directive helper
 * (src/lib/reasoningRouting) are injected by the handler so this engine leaf takes no new
 * open-sse → src import edges.
 */

import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";
import {
  buildClaudeCodeCompatibleRequest,
  resolveClaudeCodeCompatibleSessionId,
} from "../../services/claudeCodeCompatible.ts";
import { FORMATS } from "../../translator/formats.ts";
import { translateRequest } from "../../translator/index.ts";
import { extractSystemRoleMessages } from "./claudeSystemRole.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function buildClaudeCodeBridgeBody({
  body,
  sourceFormat,
  targetFormat,
  provider,
  model,
  stream,
  upstreamStream,
  credentials,
  reqLogger,
  clientHeaders,
  isClaudeCodeSemanticPassthrough,
  preserveCacheControl,
  copilotCompatibleReasoning,
  reasoningCacheScope,
  videoBridgeObserved,
  normalizeClaudeUpstreamMessages,
  applyReasoningRuleDirective,
  getModelNormalizeToolCallId,
  getModelPreserveOpenAIDeveloperRole,
  log,
}: {
  body: Record<string, unknown>;
  sourceFormat: string;
  targetFormat: string;
  provider: string;
  model: string;
  stream: boolean;
  upstreamStream: boolean;
  credentials: { providerSpecificData?: unknown } | null | undefined;
  reqLogger: unknown;
  clientHeaders: Parameters<typeof resolveClaudeCodeCompatibleSessionId>[0];
  isClaudeCodeSemanticPassthrough: boolean;
  preserveCacheControl: boolean;
  copilotCompatibleReasoning: boolean;
  reasoningCacheScope: string | null;
  videoBridgeObserved: boolean;
  normalizeClaudeUpstreamMessages: (
    payload: Record<string, unknown>,
    options?: { preserveToolResultBlocks?: boolean }
  ) => void;
  applyReasoningRuleDirective: (bodyInput: unknown, targetFormat?: "claude") => unknown;
  getModelNormalizeToolCallId: (
    providerId: string,
    modelId: string,
    sourceFormat?: string | null
  ) => boolean;
  getModelPreserveOpenAIDeveloperRole: (
    providerId: string,
    modelId: string,
    sourceFormat?: string | null
  ) => boolean | undefined;
  log?: LoggerLike;
}): { translatedBody: Record<string, unknown>; ccSessionId: string } {
  let normalizedForCc = { ...body };

  // Claude Code-compatible providers expect Anthropic Messages-shaped payloads,
  // but we extract only role/text/max_tokens/effort from an OpenAI-like view first.
  if (sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough) {
    normalizedForCc = applyReasoningRuleDirective(
      normalizedForCc,
      "claude"
    ) as typeof normalizedForCc;
    log?.debug?.("FORMAT", "claude-code semantic passthrough enabled for compatible bridge");
  } else if (sourceFormat !== FORMATS.OPENAI) {
    const normalizeToolCallId = getModelNormalizeToolCallId(
      provider || "",
      model || "",
      sourceFormat
    );
    const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
      provider || "",
      model || "",
      sourceFormat
    );
    normalizedForCc = translateRequest(
      sourceFormat,
      FORMATS.OPENAI,
      model,
      { ...body },
      stream,
      credentials,
      provider,
      reqLogger,
      {
        normalizeToolCallId,
        preserveDeveloperRole,
        preserveCacheControl,
        copilotClient: copilotCompatibleReasoning,
        reasoningCacheScope,
        videoTranscriptSensitive: videoBridgeObserved,
      }
    );
  }

  const ccSessionId = resolveClaudeCodeCompatibleSessionId(clientHeaders);
  const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
    credentials?.providerSpecificData
  );
  // OpenAI-shaped bridge requests skip translateRequest too.
  if (sourceFormat === FORMATS.OPENAI) {
    normalizedForCc = applyReasoningRuleDirective(normalizedForCc) as typeof normalizedForCc;
  }
  const translatedBody = buildClaudeCodeCompatibleRequest({
    sourceBody: body,
    normalizedBody: normalizedForCc,
    claudeBody: sourceFormat === FORMATS.CLAUDE ? body : null,
    model,
    stream: upstreamStream,
    sessionId: ccSessionId,
    cwd: process.cwd(),
    now: new Date(),
    preserveCacheControl,
    preserveClaudeMessages: sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough,
    summarizeThinking: ccRequestDefaults.summarizeThinking === true,
  });
  log?.debug?.("FORMAT", "claude-code-compatible bridge enabled");

  if (isClaudeCodeSemanticPassthrough) {
    // Semantic passthrough: only lift system/developer role messages
    // without converting file/document blocks, tool history, etc.
    extractSystemRoleMessages(translatedBody);
  } else {
    // Non-CC path: full normalization including content type conversion.
    // Preserve tool_result blocks only when the upstream target speaks the
    // Anthropic Messages format — OpenAI-compatible gateways reject them
    // and return 503. See issue #13971.
    normalizeClaudeUpstreamMessages(translatedBody, {
      preserveToolResultBlocks: targetFormat === FORMATS.CLAUDE,
    });
  }
  return { translatedBody, ccSessionId };
}
