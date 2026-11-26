/**
 * The origin of the inference API as key holders reach it, reported by the self-service quota
 * endpoint (GET /v1/me/quota/{provider}).
 *
 * Order: OMNIROUTE_PUBLIC_API_BASE_URL, then OMNIROUTE_PUBLIC_BASE_URL, then null. Never the
 * request's own origin, and never NEXT_PUBLIC_BASE_URL: its documented default
 * (http://localhost:20128) would be handed out as a public URL. A set but invalid
 * OMNIROUTE_PUBLIC_API_BASE_URL yields null rather than the dashboard origin, so an operator who
 * configured a separate API origin is never silently given the other one; that case is logged
 * once per process (the variable name only, never its value). Values are reduced to scheme, host
 * and port (normalizeOrigin: http/https only, lowercased, credentials dropped).
 */

import { createLogger } from "@/shared/utils/logger";
import { normalizeOrigin } from "./publicOrigin";

/** The only two variables this resolver reads (a whole NodeJS.ProcessEnv fits too). */
interface PublicApiBaseUrlEnv {
  OMNIROUTE_PUBLIC_API_BASE_URL?: string;
  OMNIROUTE_PUBLIC_BASE_URL?: string;
}

/** Whether the invalid-API-origin warning was already logged, and where it goes. */
interface InvalidApiOriginNotice {
  warned: boolean;
  log: { warn: (fields: Record<string, unknown>, message: string) => void };
}

/** Process-wide: the warning is logged at most once, not on every request. */
const PROCESS_NOTICE: InvalidApiOriginNotice = {
  warned: false,
  log: createLogger("public-api-base-url"),
};

function warnInvalidApiOrigin(notice: InvalidApiOriginNotice): void {
  if (notice.warned) return;
  notice.warned = true;
  notice.log.warn(
    { variable: "OMNIROUTE_PUBLIC_API_BASE_URL" },
    "OMNIROUTE_PUBLIC_API_BASE_URL is set but is not an http(s) origin; no public API base URL is reported"
  );
}

function originOrNull(value: string): string | null {
  try {
    return normalizeOrigin(value);
  } catch {
    return null;
  }
}

/** The two variables above, read from process.env when called. */
function readProcessEnv(): PublicApiBaseUrlEnv {
  return {
    OMNIROUTE_PUBLIC_API_BASE_URL: process.env.OMNIROUTE_PUBLIC_API_BASE_URL,
    OMNIROUTE_PUBLIC_BASE_URL: process.env.OMNIROUTE_PUBLIC_BASE_URL,
  };
}

/**
 * Resolve the public API origin from `env`. The default reads exactly the two variables above
 * from process.env, so callers (and tests) can pass their own values instead. `notice` holds the
 * warn-once state for an invalid API origin (process-wide by default).
 */
export function resolvePublicApiBaseUrl(
  env: PublicApiBaseUrlEnv = readProcessEnv(),
  notice: InvalidApiOriginNotice = PROCESS_NOTICE
): string | null {
  const apiValue = env.OMNIROUTE_PUBLIC_API_BASE_URL?.trim();
  if (apiValue) {
    const apiOrigin = originOrNull(apiValue);
    if (apiOrigin === null) warnInvalidApiOrigin(notice);
    return apiOrigin;
  }
  const publicOrigin = env.OMNIROUTE_PUBLIC_BASE_URL?.trim();
  return publicOrigin ? originOrNull(publicOrigin) : null;
}
