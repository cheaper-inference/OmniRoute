import { CORS_HEADERS } from "./cors.ts";
import { detectFormat } from "../services/provider.ts";
import { SKIP_PATTERNS } from "../config/constants.ts";
import { createNonStreamingResponse, createStreamingResponse } from "./bypassResponse.ts";
import {
  CLAUDE_CODE_LOCAL_COMMAND_PREFIX_FLAG,
  CLAUDE_CODE_LOCAL_FILEPATHS_FLAG,
  CLAUDE_CODE_LOCAL_SUGGESTION_FLAG,
  detectClaudeCodeMetaReply,
} from "./claudeCodeMetaRequests.ts";
import { isRegisteredFeatureFlagEnabled } from "./registeredFeatureFlag.ts";

/**
 * Reply text for the bypass response: `undefined` keeps the default reply (one of the five
 * patterns matched), a string is a local Claude Code helper reply, `null` means no bypass.
 */
function resolveBypassReplyText(body: unknown, shouldBypass: boolean): string | undefined | null {
  if (shouldBypass) return undefined;
  const reply = detectClaudeCodeMetaReply(body, {
    commandPrefix: isRegisteredFeatureFlagEnabled(CLAUDE_CODE_LOCAL_COMMAND_PREFIX_FLAG),
    suggestion: isRegisteredFeatureFlagEnabled(CLAUDE_CODE_LOCAL_SUGGESTION_FLAG),
    filepaths: isRegisteredFeatureFlagEnabled(CLAUDE_CODE_LOCAL_FILEPATHS_FLAG),
  });
  return reply ? reply.text : null;
}

/**
 * Check for bypass patterns — return fake response without calling provider.
 *
 * Intentionally limited to Claude CLI requests only because:
 * 1. The bypass patterns (title extraction, warmup, count) are specific to
 *    Claude CLI's internal protocol — other clients don't send these patterns.
 * 2. False-positive bypasses would silently break real requests.
 * 3. The SKIP_PATTERNS config allows user-defined patterns for every client.
 *
 * When none of the five patterns above matches, three more Claude Code helper
 * requests can be answered locally, each behind its own default-off feature flag
 * (see detectClaudeCodeMetaReply in claudeCodeMetaRequests.ts for the strict shapes):
 * - bash command-prefix classification (CLAUDE_CODE_LOCAL_COMMAND_PREFIX_ENABLED)
 * - next-prompt suggestion mode, answered empty (CLAUDE_CODE_LOCAL_SUGGESTION_ENABLED)
 * - file-path extraction for simple commands (CLAUDE_CODE_LOCAL_FILEPATHS_ENABLED)
 *
 * @param {object} body - Request body
 * @param {string} model - Model name
 * @param {string} userAgent - User-Agent header
 * @returns {object|null} Bypass response or null to proceed normally
 */
export function handleBypassRequest(body, model, userAgent = "") {
  const normalizedUserAgent = typeof userAgent === "string" ? userAgent : "";
  if (!normalizedUserAgent.includes("claude-cli")) return null;
  if (!body.messages?.length) return null;

  const messages = body.messages;
  const getText = (content) => {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join(" ");
    }
    return "";
  };

  let shouldBypass = false;

  // Pattern 1: Title extraction (assistant message = "{")
  const lastMsg = messages[messages.length - 1];
  if (lastMsg?.role === "assistant" && lastMsg.content?.[0]?.text === "{") {
    shouldBypass = true;
  }

  // Pattern 2: Warmup
  if (!shouldBypass) {
    const firstText = getText(messages[0]?.content);
    shouldBypass = firstText === "Warmup";
  }

  // Pattern 3: Count
  if (!shouldBypass && messages.length === 1 && messages[0]?.role === "user") {
    const firstText = getText(messages[0]?.content);
    shouldBypass = firstText === "count";
  }

  // Pattern 4: Skip patterns
  if (!shouldBypass && SKIP_PATTERNS?.length) {
    const userMessages = messages.filter((m) => m.role === "user");
    const userText = userMessages.map((m) => getText(m.content)).join(" ");
    shouldBypass = SKIP_PATTERNS.some((p) => userText.includes(p));
  }

  // Pattern 5: Quota probe — max_tokens=1 + "quota" keyword (FCC try_quota_mock).
  if (!shouldBypass && body.max_tokens === 1) {
    const userText = messages
      .filter((m) => m.role === "user")
      .map((m) => getText(m.content))
      .join(" ")
      .toLowerCase();
    shouldBypass = userText.includes("quota");
  }

  const replyText = resolveBypassReplyText(body, shouldBypass);
  if (replyText === null) return null;

  const sourceFormat = detectFormat(body);
  const stream = body.stream !== false;

  return stream
    ? createStreamingResponse(sourceFormat, model, replyText)
    : createNonStreamingResponse(sourceFormat, model, replyText);
}
