// Visible-thinking guard for the `redact-thinking-*` Anthropic beta.
//
// OmniRoute adds `redact-thinking-2026-02-12` for opaque Claude clients and for
// clients that negotiated `interleaved-thinking-2025-05-14` (selectBetaFlags),
// and the static API-key beta set includes it too. With that beta active,
// Anthropic returns thinking blocks with an empty `thinking` string (signature
// only), which silently overrides a client that explicitly asked for readable
// thinking via `thinking.display: "summarized"`.
//
// Rule: the redact beta is dropped when the request body asks for summarized
// thinking, or when the operator sets OMNIROUTE_REDACT_THINKING=false — unless
// the client itself negotiated a redact-thinking beta in its own anthropic-beta
// (or a CC-compatible connection explicitly opted in via requestDefaults).
//
// Claude OAuth exception: `redact-thinking-2026-02-12` is part of the Claude Code
// OAuth wire fingerprint (open-sse/config/anthropicHeaders.ts). OmniRoute leaves
// it untouched on OAuth requests unless the operator opts in with the default-off
// CLAUDE_OAUTH_SUMMARIZED_THINKING_UNREDACTED feature flag.

export const REDACT_THINKING_BETA_PREFIX = "redact-thinking-";

/** Default-off feature flag that lets the OAuth fingerprint drop the redact beta. */
export const CLAUDE_OAUTH_SUMMARIZED_THINKING_FLAG = "CLAUDE_OAUTH_SUMMARIZED_THINKING_UNREDACTED";

type EnvLike = Record<string, string | undefined>;

// The server feature-flag resolver (DB override > env > definition default) is
// published on globalThis by src/shared/utils/featureFlagResolverBridge.ts under
// this process-wide symbol. Reading it here keeps open-sse free of a new src
// import (boundary ratchet); tests/unit/claude-summarized-thinking-redact-beta.test.ts
// locks the key against the bridge.
const FEATURE_FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");

/**
 * True only when the operator enabled CLAUDE_OAUTH_SUMMARIZED_THINKING_UNREDACTED.
 * Fails closed (OAuth fingerprint unchanged) when the resolver throws.
 */
export function isClaudeOAuthSummarizedThinkingUnredacted(env: EnvLike = process.env): boolean {
  try {
    const resolver = (globalThis as Record<symbol, unknown>)[FEATURE_FLAG_RESOLVER_KEY];
    if (typeof resolver === "function") {
      return (resolver as (key: string) => boolean)(CLAUDE_OAUTH_SUMMARIZED_THINKING_FLAG) === true;
    }
    const raw = env[CLAUDE_OAUTH_SUMMARIZED_THINKING_FLAG];
    return raw === "true" || raw === "1" || raw === "yes";
  } catch {
    return false;
  }
}

function isRedactThinkingToken(token: string): boolean {
  return token.trim().toLowerCase().startsWith(REDACT_THINKING_BETA_PREFIX);
}

export function isRedactThinkingDisabledByEnv(env: EnvLike = process.env): boolean {
  const raw = env.OMNIROUTE_REDACT_THINKING;
  if (typeof raw !== "string") return false;
  return ["false", "0", "off", "no"].includes(raw.trim().toLowerCase());
}

export function requestsSummarizedThinking(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const thinking = (body as Record<string, unknown>).thinking;
  if (!thinking || typeof thinking !== "object") return false;
  const display = (thinking as Record<string, unknown>).display;
  return typeof display === "string" && display.trim().toLowerCase() === "summarized";
}

export function clientNegotiatedRedactThinking(clientBeta: string | null | undefined): boolean {
  if (typeof clientBeta !== "string") return false;
  return clientBeta.split(",").some(isRedactThinkingToken);
}

/** True when OmniRoute must not add/keep a redact-thinking beta on its own. */
export function shouldSuppressRedactThinking(
  body: unknown,
  clientBeta?: string | null,
  env: EnvLike = process.env
): boolean {
  if (clientNegotiatedRedactThinking(clientBeta)) return false;
  return requestsSummarizedThinking(body) || isRedactThinkingDisabledByEnv(env);
}

/**
 * Remove `redact-thinking-*` tokens from the outbound anthropic-beta header
 * (any casing) when shouldSuppressRedactThinking() holds and the connection did
 * not explicitly opt into redact-thinking. On a Claude OAuth request
 * (`claudeOAuth: true`) the header is left alone unless the
 * CLAUDE_OAUTH_SUMMARIZED_THINKING_UNREDACTED flag is on. Returns true when the
 * header changed.
 */
export function stripRedactThinkingBetaForVisibleThinking(
  headers: Record<string, string>,
  body: unknown,
  clientHeaders?: Record<string, string> | null,
  options: { connectionOptedIn?: boolean; claudeOAuth?: boolean; env?: EnvLike } = {}
): boolean {
  if (options.connectionOptedIn === true) return false;
  const env = options.env ?? process.env;
  if (options.claudeOAuth === true && !isClaudeOAuthSummarizedThinkingUnredacted(env)) {
    return false;
  }
  const clientBeta = clientHeaders
    ? (Object.entries(clientHeaders).find(([key]) => key.toLowerCase() === "anthropic-beta")?.[1] ??
      null)
    : null;
  if (!shouldSuppressRedactThinking(body, clientBeta, env)) return false;

  let changed = false;
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() !== "anthropic-beta" || typeof headers[key] !== "string") continue;
    const tokens = headers[key]
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const kept = tokens.filter((value) => !isRedactThinkingToken(value));
    if (kept.length !== tokens.length) {
      headers[key] = kept.join(",");
      changed = true;
    }
  }
  return changed;
}
