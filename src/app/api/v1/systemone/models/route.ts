/**
 * `GET /v1/systemone/models` — the typed-decision model catalog.
 *
 * Read-only companion to `POST /v1/systemone`: it lists the decision models
 * exposed by eligible configured backend connections, assembled by
 * `handleSystemOneModels`. Listing does not establish inference entitlement. Decision models are deliberately absent
 * from the unified `/v1/models` catalog (they answer questions, not chats), so
 * this is the only place a client can discover them.
 *
 * Same gates as the decision route — authentication first, then the API-key
 * policy (which covers the shared `systemone` endpoint category) — and the
 * calling key's scope is honored twice: its connection allowlist narrows which
 * accounts may be read, and its model rules filter the ids that come back, so
 * the catalog never advertises a model the same key would be refused on POST.
 */

import { handleSystemOneModels } from "@omniroute/open-sse/handlers/systemOneModels.ts";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import { enforceApiKeyPolicy, validateApiKeyRoutingTarget } from "@/shared/utils/apiKeyPolicy";

import { rejectNativeManagedLease } from "@omniroute/open-sse/handlers/systemOneLease.ts";

export const dynamic = "force-dynamic";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  // No model to check yet — this call enforces the key's status, schedule and
  // the `systemone` endpoint category for the catalog itself.
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;
  const leaseRejection = rejectNativeManagedLease(request, policy.apiKeyInfo);
  if (leaseRejection) return leaseRejection;

  const allowedConnections = policy.apiKeyInfo?.allowedConnections?.length
    ? policy.apiKeyInfo.allowedConnections
    : null;

  return handleSystemOneModels({
    allowedConnections,
    // The catalog offers the canonical, gateway-qualified id that POST accepts,
    // so the same check the dispatch loop runs per candidate decides visibility.
    isModelAllowed: async (modelId) =>
      !(await validateApiKeyRoutingTarget(request, policy.apiKey, policy.apiKeyInfo, modelId)),
    signal: request.signal,
  });
}
