// Opt-in (OMNIROUTE_CLAUDE_SESSION_CACHE_KEY): reuse the Claude Code session id as the
// OpenAI prompt_cache_key when the caller sent none, so every turn of one session keeps
// hitting the same upstream prompt cache. Claude-to-Responses conversion drops the key.
import { passthroughUpstreamSessionId } from "../../executors/claudeIdentity.ts";
import { FORMATS } from "../../translator/formats.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

const SESSION_HEADER = "x-claude-code-session-id";

export function isClaudeSessionCacheKeyEnabled(): boolean {
  return /^(1|true|yes|on)$/i.test((process.env.OMNIROUTE_CLAUDE_SESSION_CACHE_KEY || "").trim());
}

/**
 * Returns the session id to use as prompt_cache_key, or null to leave the body alone.
 * The caller applies the provider gates (cache support, rejecting providers).
 */
export function resolveClaudeSessionCacheKey(
  body: Record<string, unknown>,
  provider: string | null | undefined,
  targetFormat: string,
  clientHeaders: unknown
): string | null {
  if (!isClaudeSessionCacheKeyEnabled()) return null;
  if (targetFormat !== FORMATS.OPENAI && targetFormat !== FORMATS.OPENAI_RESPONSES) return null;
  // The Codex executor derives its own session and cache key.
  if (provider === "codex") return null;
  if (body.prompt_cache_key) return null;
  const raw = getHeaderValueCaseInsensitive(
    clientHeaders as Record<string, unknown> | Headers | null | undefined,
    SESSION_HEADER
  );
  return passthroughUpstreamSessionId({ [SESSION_HEADER]: raw ?? undefined });
}
