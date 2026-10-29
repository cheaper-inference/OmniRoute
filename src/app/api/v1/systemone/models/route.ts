import { handleSystemOneModels } from "@omniroute/open-sse/handlers/systemOneModels.ts";
import { enforceApiKeyPolicy, validateApiKeyRoutingTarget } from "@/shared/utils/apiKeyPolicy";

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

/**
 * GET /v1/systemone/models — live catalog of System One (decision) models.
 *
 * Read from each configured TypeSafe, OpenRouter and Ollama connection. The API key's
 * endpoint category, budget and rate limits apply as for POST /v1/systemone, and its
 * connection and model rules narrow the list with the same gateway-qualified ids
 * (`typesafe/…`, `openrouter/…`, `ollama-local/…`) the POST route enforces.
 */
export async function GET(request: Request) {
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  const { apiKey, apiKeyInfo } = policy;
  return handleSystemOneModels({
    signal: request.signal,
    allowedConnections: apiKeyInfo?.allowedConnections,
    isModelAllowed: async (modelId) =>
      (await validateApiKeyRoutingTarget(request, apiKey, apiKeyInfo, modelId)) === null,
  });
}
