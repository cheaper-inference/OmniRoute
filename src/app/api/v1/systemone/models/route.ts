import { handleSystemOneModels } from "@omniroute/open-sse/handlers/systemOneModels.ts";
import { enforceApiKeyPolicy, validateApiKeyRoutingTarget } from "@/shared/utils/apiKeyPolicy";
import { resolveKeyConnectionScope } from "@/sse/services/keyConnectionScope";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1/systemone/models — live catalog of the decisions models that
 * POST /v1/systemone accepts, read from the configured TypeSafe and OpenRouter
 * connections. Endpoint category, budget and rate limits apply as for POST; the
 * key's connection scope and model rules narrow the list using the exact ids
 * (`typesafe/…`, `openrouter/…`) the POST route receives.
 */
export async function GET(request: Request) {
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  const { apiKey, apiKeyInfo } = policy;
  const scope = await resolveKeyConnectionScope(apiKeyInfo);
  if (scope.rejection) return scope.rejection;

  return handleSystemOneModels({
    signal: request.signal,
    allowedConnections: scope.allowedConnections,
    isModelAllowed: async (modelId) =>
      (await validateApiKeyRoutingTarget(request, apiKey, apiKeyInfo, modelId)) === null,
  });
}
