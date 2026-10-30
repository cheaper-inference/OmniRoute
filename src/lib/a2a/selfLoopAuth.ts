/**
 * Credential for A2A skills that call back into OmniRoute over HTTP.
 *
 * The self-loop must act as the A2A caller. Sending OMNIROUTE_API_KEY for an
 * API-key caller lends it the deployment key's `manage` scope and bypasses the
 * caller's model allowlist, budget and quota. The configured key is only used
 * when the caller presented no key: a dashboard session, or the keyless
 * posture where OMNIROUTE_API_KEY is unset anyway.
 */

export interface A2ACallerContext {
  /** The API key the A2A caller authenticated with, if any. */
  apiKey?: string | null;
}

export function buildSelfLoopHeaders(caller?: A2ACallerContext): Record<string, string> {
  const key = caller?.apiKey || process.env.OMNIROUTE_API_KEY || "";
  return {
    "Content-Type": "application/json",
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  };
}
