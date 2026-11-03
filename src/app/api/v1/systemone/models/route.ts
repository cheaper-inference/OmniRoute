import { getProviderConnections } from "@/lib/db/providers";
import { getApiKeyMetadata, isModelAllowedForKey } from "@/lib/db/apiKeys";
import { extractApiKey } from "@/sse/services/auth";
import { resolveKeyConnectionScope } from "@/sse/services/keyConnectionScope";
import { authorizeDecision } from "../../_shared/decisionRuntime";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { resolveDecisionBackend } from "@omniroute/open-sse/config/decisionRegistry.ts";
import { discoverDecisionModels } from "@omniroute/open-sse/handlers/decisionDiscovery.ts";
import { fetchDecision } from "@omniroute/open-sse/handlers/decisionTransport.ts";
import {
  type DecisionCredentials,
  type DecisionModel,
} from "@omniroute/open-sse/handlers/decisionTypes.ts";

export const runtime = "nodejs";

/** Enumeration reads connections; it must not rotate credentials or mutate affinity. */
export async function GET(request: Request) {
  const admission = await authorizeDecision(request, "");
  if (admission) return admission;
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;
  const clientKey = extractApiKey(request, { allowUrl: false });
  const metadata = await getApiKeyMetadata(clientKey);
  const scope = await resolveKeyConnectionScope(metadata);
  if (scope.rejection) return scope.rejection;
  const rows = await getProviderConnections({ isActive: true });
  const models = new Map<string, DecisionModel>();
  let partial = false;
  const catalogSignal = AbortSignal.any([request.signal, AbortSignal.timeout(30_000)]);
  for (const row of rows) {
    if (catalogSignal.aborted) {
      partial = true;
      break;
    }
    if (scope.allowedConnections && !scope.allowedConnections.includes(row.id)) continue;
    if (
      !["openai", "ollama-local", "basal", "julia-local"].includes(row.provider) &&
      !row.providerSpecificData?.decision
    )
      continue;
    try {
      const credentials = { ...row, connectionId: row.id } as DecisionCredentials;
      const backend = resolveDecisionBackend(row.provider, credentials);
      const signal = AbortSignal.any([
        catalogSignal,
        AbortSignal.timeout(Math.min(backend.timeoutMs, 10_000)),
      ]);
      const found = await discoverDecisionModels(backend, credentials, fetchDecision, signal);
      for (const model of found) {
        if (!(await isModelAllowedForKey(clientKey, model.id))) continue;
        if (metadata?.allowedEndpoints?.length && !metadata.allowedEndpoints.includes("decisions"))
          continue;
        models.set(model.id, model);
      }
    } catch {
      // A failed backend never becomes an empty complete catalog.
      partial = true;
    }
  }
  return Response.json(
    { object: "list", data: [...models.values()] },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-OmniRoute-Catalog-Status": partial ? "partial" : "complete",
      },
    }
  );
}
