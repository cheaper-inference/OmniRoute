/**
 * Forward the upstream `anthropic-ratelimit-*` response headers to the client.
 *
 * Claude-format clients (Claude Code, the Anthropic SDK) read these headers to
 * show rate-limit state and schedule retries. OmniRoute already consumes them
 * internally (rateLimitManager/headers.ts, claudeUsageCooldown.ts) but drops
 * them on the client response. Opt-in because the upstream values describe one
 * provider connection, while a client request may be served from a pool:
 * set CLAUDE_FORWARD_RATELIMIT_HEADERS=true (default off).
 */
import { inheritResponsePolicies } from "./responsePolicies.ts";

export const FORWARD_RATE_LIMIT_HEADERS_ENV = "CLAUDE_FORWARD_RATELIMIT_HEADERS";

export function isForwardUpstreamRateLimitHeadersEnabled(): boolean {
  const raw = process.env[FORWARD_RATE_LIMIT_HEADERS_ENV];
  return raw === "true" || raw === "1";
}

function collectUpstreamRateLimitHeaders(
  providerHeaders: Headers | Record<string, string> | null | undefined
): Array<[string, string]> {
  if (!providerHeaders) return [];
  const entries: Array<[string, string]> = [];
  if (typeof Headers !== "undefined" && providerHeaders instanceof Headers) {
    providerHeaders.forEach((value, name) => {
      if (name.toLowerCase().startsWith("anthropic-ratelimit-")) entries.push([name, value]);
    });
    return entries;
  }
  for (const [name, value] of Object.entries(providerHeaders as Record<string, string>)) {
    if (name.toLowerCase().startsWith("anthropic-ratelimit-")) entries.push([name, value]);
  }
  return entries;
}

/**
 * Copy `anthropic-ratelimit-*` headers from the answered provider response onto
 * the client response. Returns the input unchanged when the flag is off, the
 * upstream headers carry none, or the response is missing.
 */
export function forwardUpstreamRateLimitHeaders(
  response: Response,
  providerHeaders: Headers | Record<string, string> | null | undefined
): Response {
  if (!response || !isForwardUpstreamRateLimitHeadersEnabled()) return response;
  const entries = collectUpstreamRateLimitHeaders(providerHeaders);
  if (entries.length === 0) return response;

  const apply = (headers: Headers) => {
    for (const [name, value] of entries) headers.set(name, value);
  };
  try {
    apply(response.headers);
    return response;
  } catch {
    // Immutable headers (e.g. Response.redirect): clone, then re-apply. The
    // wrapper must keep the routing policies the original response carried.
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    apply(cloned.headers);
    return inheritResponsePolicies(response, cloned);
  }
}
