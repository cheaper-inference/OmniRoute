import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getSpecialtyModelsResponse } from "../../_shared/specialtyCatalog";
import { applyCatalogPage, parseCatalogPage } from "../../models/catalogPagination";
import {
  annotateLegacySystemOneModel,
  isLegacySystemOneModel,
} from "@omniroute/open-sse/config/decisionCapabilities.ts";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getProviderAlias } from "@/shared/constants/providers";
import { getProviderConnections } from "@/lib/db/providers";
import { getApiKeyMetadata, isModelAllowedForKey } from "@/lib/db/apiKeys";
import { extractApiKey } from "@/sse/services/auth";
import { resolveKeyConnectionScope } from "@/sse/services/keyConnectionScope";
import { authorizeDecision } from "../../_shared/decisionRuntime";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { resolveDecisionBackend } from "@omniroute/open-sse/config/decisionRegistry.ts";
import { discoverDecisionModels } from "@omniroute/open-sse/handlers/decisionDiscovery.ts";
import { fetchDecision } from "@/lib/providers/decisionFetch";
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
  const nativeFormat = getRegistryEntry(provider)?.format;
  if (
    nativeFormat !== "systemone" &&
    nativeFormat !== "decisions" &&
    !["openai", "ollama-cloud", "ollama-local", "basal", "julia-local", "cloudflare-ai"].includes(
      provider
    ) &&
    !["decisions", "systemone"].includes(String(providerSpecificData.apiType)) &&
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
      const backend = {
        ...resolveDecisionBackend(provider, credentials),
        provider:
          typeof credentials.providerSpecificData?.prefix === "string"
            ? credentials.providerSpecificData.prefix
            : getProviderAlias(provider),
      };
      const signal = AbortSignal.any([
        catalogSignal,
        AbortSignal.timeout(Math.min(backend.timeoutMs, 10_000)),
      ]);
      const found = await discoverDecisionModels(backend, credentials, fetchDecision, signal, {
        onIncomplete: () => {
          partial = true;
        },
      });
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
  const { models, partial: nativePartial } = await collectDecisionCatalog(
    rows,
    request,
    scope.allowedConnections,
    clientKey,
    metadata
  );

  // Page only after both sources have applied authorization and decision filtering.
  const legacyUrl = new URL(request.url);
  legacyUrl.searchParams.delete("limit");
  legacyUrl.searchParams.delete("after");
  const legacy = await getSpecialtyModelsResponse(
    new Request(legacyUrl, request),
    "/v1/systemone/models",
    isLegacySystemOneModel
  );
  if (!legacy.ok && legacy.status < 500) return legacy;
  const legacyPayload = legacy.ok ? record(await legacy.json()) : {};
  const partial =
    nativePartial ||
    !legacy.ok ||
    legacy.headers.get("X-OmniRoute-Catalog-Status") === "partial" ||
    ["last-good", "stale"].includes(legacy.headers.get("x-omniroute-catalog") || "");
  const ordered = mergeDecisionCatalogs(legacyPayload, models);
  return decisionCatalogResponse(request, ordered, partial);
}

function mergeDecisionCatalogs(
  legacyPayload: Record<string, unknown>,
  models: Map<string, DecisionModel>
) {
  const allModels = new Map<string, Record<string, unknown>>();
  for (const row of Array.isArray(legacyPayload.data) ? legacyPayload.data : []) {
    const model = annotateLegacySystemOneModel(record(row));
    if (typeof model.id === "string") allModels.set(model.id, model);
  }
  for (const model of models.values()) allModels.set(model.id, { ...model });
  return [...allModels.values()].sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

function decisionCatalogResponse(
  request: Request,
  ordered: Record<string, unknown>[],
  partial: boolean
) {
  const unavailable = partial && ordered.length === 0;
  const page = parseCatalogPage(request);
  const paged = applyCatalogPage(ordered, page);
  return Response.json(
    {
      object: "list",
      data: paged.models,
      ...(page.limit !== null || page.after
        ? { has_more: paged.hasMore, ...(paged.lastId ? { last_id: paged.lastId } : {}) }
        : {}),
      ...(unavailable ? buildErrorBody(503, "Decision model catalog unavailable") : {}),
    },
    {
      status: unavailable ? 503 : 200,
      headers: {
        "Cache-Control": "no-store",
        "X-OmniRoute-Catalog-Status": unavailable
          ? "unavailable"
          : partial
            ? "partial"
            : "complete",
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
