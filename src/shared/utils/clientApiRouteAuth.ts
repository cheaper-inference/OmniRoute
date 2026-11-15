/**
 * Route-level authentication guard for CLIENT_API (`/api/v1/*`) handlers.
 *
 * Defence-in-depth companion to `clientApiPolicy`
 * (src/server/authz/policies/clientApi.ts), which already fronts these routes
 * through `src/proxy.ts`. The handler-level check must never be *stricter*
 * than the middleware, otherwise callers the pipeline admits get a 401 from
 * the route instead:
 *
 *  - a presented key must be valid, but is only rejected while
 *    `REQUIRE_API_KEY=true`; with enforcement off a stale CLI key degrades to
 *    anonymous instead of failing the whole request (#2257);
 *  - a cookie-authenticated dashboard session is accepted in place of a key —
 *    the dashboard Media page and Playground call these routes with a session
 *    only (same fix as the preset auth mismatch in
 *    `src/app/api/playground/presets/route.ts`);
 *  - anonymous traffic stays allowed while `REQUIRE_API_KEY=false`.
 *
 * @module shared/utils/clientApiRouteAuth
 */

import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { resolveClientApiKey } from "@/sse/services/clientApiKeyResolver";
import { validateApiKey } from "@/lib/db/apiKeys";
import { getSsoShadowSecret } from "@/lib/db/ssoIdentities";
import { clientApiPolicy } from "@/server/authz/policies/clientApi";
import { classifyRoute } from "@/server/authz/classify";
import { AUTHZ_HEADER_AUTH_ID, AUTHZ_HEADER_AUTH_KIND } from "@/server/authz/headers";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import {
  anthropicErrorResponse,
  isAnthropicMessagesPath,
} from "@/shared/utils/anthropicErrorEnvelope";

/** 401 in the caller's protocol shape: Anthropic envelope on /v1/messages, OpenAI elsewhere. */
function unauthorizedResponse(request: Request, message: string): Response {
  let pathname = "";
  try {
    pathname = new URL(request.url).pathname;
  } catch {
    // Unparseable URL: fall back to the OpenAI-compatible shape.
  }
  return isAnthropicMessagesPath(pathname)
    ? anthropicErrorResponse(HTTP_STATUS.UNAUTHORIZED, "authentication_error", message)
    : errorResponse(HTTP_STATUS.UNAUTHORIZED, message);
}

/**
 * Authenticate a client-API request at the route level.
 *
 * @param request - The incoming request.
 * @returns A 401 `Response` the handler must return, or `null` when the
 *          request may proceed to policy enforcement.
 */
export async function enforceClientApiRouteAuth(request: Request): Promise<Response | null> {
  // A client can forge the pipeline's subject headers if a path bypasses the
  // proxy matcher. Re-evaluate the bearer, then require its verified identity
  // to equal the forwarded subject before honoring its shadow key policy.
  if (request.headers.get(AUTHZ_HEADER_AUTH_KIND) === "sso_user") {
    const oid = request.headers.get(AUTHZ_HEADER_AUTH_ID)?.trim();
    const classification = classifyRoute(new URL(request.url).pathname, request.method);
    const outcome = await clientApiPolicy.evaluate({
      request,
      classification,
      requestId: request.headers.get("x-request-id") ?? "route-sso-reauth",
    });
    if (!outcome.allow || outcome.subject.kind !== "sso_user" || outcome.subject.id !== oid) {
      return unauthorizedResponse(request, "Invalid API key");
    }
    // A revocation between middleware and route verification must not be
    // masked by validateApiKey's short-lived positive cache.
    const secret = oid ? getSsoShadowSecret(oid) : null;
    return secret && (await validateApiKey(secret, { bypassCache: true }))
      ? null
      : unauthorizedResponse(request, "Invalid API key");
  }

  // Any presented credential that validates is accepted — a stale Bearer next
  // to a valid x-api-key must not 401 here when `clientApiPolicy` admitted it.
  const { apiKey: apiKeyRaw, valid } = await resolveClientApiKey(request);

  if (valid) return null;
  if (apiKeyRaw) {
    return isRequireApiKeyEnabled() ? unauthorizedResponse(request, "Invalid API key") : null;
  }

  if (await isDashboardSessionAuthenticated(request)) return null;

  return isRequireApiKeyEnabled() ? unauthorizedResponse(request, "Authentication required") : null;
}
