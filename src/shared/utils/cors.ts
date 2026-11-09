import { credentialRejectionCorsHeaders } from "@/server/cors/origins";

/**
 * Static CORS headers for route handlers.
 *
 * `Access-Control-Allow-Origin` is intentionally NOT set here. The middleware
 * (`src/middleware.ts` → `applyCorsHeaders`) is the single source of truth for
 * which origin to echo, based on the central allowlist in
 * `src/server/cors/origins.ts`. Route handlers may keep spreading
 * `CORS_HEADERS` for the standard methods/allowed-headers; the middleware
 * overlays the proper origin on the way out.
 */
export const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, x-api-key, anthropic-version, x-omniroute-connection, x-omniroute-allow-cross-version-fallback, X-OmniRoute-Lease-Owner, X-OmniRoute-Lease-Generation, x-internal-test, accept",
} as const;

/**
 * Preflight responder kept for routes that still ship their own OPTIONS handler.
 * Returning 204 with `CORS_HEADERS` is enough; the middleware will add the
 * allowed origin and `Vary: Origin` before the response leaves the server.
 */
export function handleCorsOptions(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * Headers for a route-level 401 that refuses a presented API key: the static
 * `CORS_HEADERS` plus the Origin echo from `credentialRejectionCorsHeaders()`,
 * so browser/Electron clients can read the rejection (#5242) even when the
 * middleware served the request as anonymous (`REQUIRE_API_KEY=false`).
 */
export function credentialRejectionHeaders(request: Request): Record<string, string> {
  return { ...CORS_HEADERS, ...credentialRejectionCorsHeaders(request) };
}
