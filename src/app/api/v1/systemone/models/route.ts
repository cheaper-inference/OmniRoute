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
  record,
  type DecisionCredentials,
  type DecisionModel,
} from "@omniroute/open-sse/handlers/decisionTypes.ts";

export const runtime = "nodejs";

function catalogConnection(row: Record<string, unknown>): DecisionCredentials | null {
  const connectionId = row.id;
  const provider = row.provider;
  if (
    typeof connectionId !== "string" ||
    !connectionId ||
    typeof provider !== "string" ||
    !provider
  )
    throw new Error("Invalid connection record");
  const providerSpecificData = record(row.providerSpecificData);
  if (
    !["openai", "ollama-local", "basal", "julia-local"].includes(provider) &&
    !providerSpecificData.decision
  )
    return null;
  return {
    connectionId,
    providerSpecificData,
    ...(typeof row.apiKey === "string" ? { apiKey: row.apiKey } : {}),
    ...(typeof row.accessToken === "string" ? { accessToken: row.accessToken } : {}),
  };
}

async function collectDecisionCatalog(
  rows: Awaited<ReturnType<typeof getProviderConnections>>,
  request: Request,
  allowedConnections: string[] | null | undefined,
  clientKey: string,
  metadata: Awaited<ReturnType<typeof getApiKeyMetadata>>
) {
  const models = new Map<string, DecisionModel>();
  let partial = false;
  const catalogSignal = AbortSignal.any([request.signal, AbortSignal.timeout(30_000)]);
  for (const row of rows) {
    if (catalogSignal.aborted) {
      partial = true;
      break;
    }
    try {
      const credentials = catalogConnection(row);
      if (!credentials) continue;
      if (allowedConnections && !allowedConnections.includes(credentials.connectionId)) continue;
      const provider = row.provider as string;
      const backend = resolveDecisionBackend(provider, credentials);
      const signal = AbortSignal.any([
        catalogSignal,
        AbortSignal.timeout(Math.min(backend.timeoutMs, 10_000)),
      ]);
      const found = await discoverDecisionModels(backend, credentials, fetchDecision, signal);
      await addAllowedDecisionModels(found, models, clientKey, metadata);
    } catch {
      // A failed backend never becomes an empty complete catalog.
      partial = true;
    }
  }
  return { models, partial };
}

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
  const { models, partial } = await collectDecisionCatalog(
    rows,
    request,
    scope.allowedConnections,
    clientKey,
    metadata
  );

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

async function addAllowedDecisionModels(
  found: DecisionModel[],
  models: Map<string, DecisionModel>,
  clientKey: string,
  metadata: Awaited<ReturnType<typeof getApiKeyMetadata>>
) {
  for (const model of found) {
    if (!(await isModelAllowedForKey(clientKey, model.id))) continue;
    if (metadata?.allowedEndpoints?.length && !metadata.allowedEndpoints.includes("decisions"))
      continue;
    models.set(model.id, model);
  }
}
