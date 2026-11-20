/**
 * The origin of the inference API as key holders reach it, reported by the self-service quota
 * endpoint (GET /v1/me/quota/{provider}).
 *
 * Order: OMNIROUTE_PUBLIC_API_BASE_URL, then OMNIROUTE_PUBLIC_BASE_URL, then null. Never the
 * request's own origin, and never NEXT_PUBLIC_BASE_URL: its documented default
 * (http://localhost:20128) would be handed out as a public URL. A set but invalid
 * OMNIROUTE_PUBLIC_API_BASE_URL yields null rather than the dashboard origin, so an operator who
 * configured a separate API origin is never silently given the other one. Values are reduced to
 * scheme, host and port (normalizeOrigin: http/https only, lowercased).
 */

import { normalizeOrigin } from "./publicOrigin";

/** The only two variables this resolver reads (a whole NodeJS.ProcessEnv fits too). */
interface PublicApiBaseUrlEnv {
  OMNIROUTE_PUBLIC_API_BASE_URL?: string;
  OMNIROUTE_PUBLIC_BASE_URL?: string;
}

function originOrNull(value: string): string | null {
  try {
    return normalizeOrigin(value);
  } catch {
    return null;
  }
}

/**
 * Resolve the public API origin from `env`. The default reads exactly the two variables above
 * from process.env, so callers (and tests) can pass their own values instead.
 */
export function resolvePublicApiBaseUrl(
  env: PublicApiBaseUrlEnv = {
    OMNIROUTE_PUBLIC_API_BASE_URL: process.env.OMNIROUTE_PUBLIC_API_BASE_URL,
    OMNIROUTE_PUBLIC_BASE_URL: process.env.OMNIROUTE_PUBLIC_BASE_URL,
  }
): string | null {
  const apiOrigin = env.OMNIROUTE_PUBLIC_API_BASE_URL?.trim();
  if (apiOrigin) return originOrNull(apiOrigin);
  const publicOrigin = env.OMNIROUTE_PUBLIC_BASE_URL?.trim();
  return publicOrigin ? originOrNull(publicOrigin) : null;
}
