/** Local, explicitly requested decision inventory; no provider requests or provider-key reads. */
import { errorResponse } from "@omniroute/open-sse/utils/error";
import { getDeclaredModelEndpoints } from "@omniroute/open-sse/services/modelEndpointPolicy";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle";
import {
  isSystemOneProvider,
  SYSTEMONE_BACKENDS,
  type SystemOneBackend,
  systemOneModelTier,
  systemOneTierAllowed,
} from "@omniroute/open-sse/config/systemOneRegistry";
import {
  applyOperatorPricing,
  toDecisionCatalogModel,
} from "@omniroute/open-sse/handlers/systemOneCatalog";
import { getCachedRawProviderConnections } from "@/lib/db/readCache";
import { createLazyConnectionView } from "@/lib/db/providers/lazyConnectionView";
import {
  getAllCustomModels,
  getModelIsHidden,
  getSyncedAvailableModelsByConnection,
} from "@/lib/db/models";
import { getModelsByProviderId } from "@/shared/constants/models";
import { getSettings } from "@/lib/db/settings";
import { getNativeCatalogPricing } from "@/lib/usage/nativeCatalogPricing";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { enforceApiKeyPolicy, validateApiKeyRoutingTarget } from "@/shared/utils/apiKeyPolicy";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import { isModelExposureAllowed } from "@/shared/utils/modelExposureList";
import { decideHidePaid } from "./catalogPaidFilter";

type InventoryRow = Record<string, unknown> & { id: string };
type Connection = {
  id?: unknown;
  provider?: unknown;
  isActive?: unknown;
  providerSpecificData?: unknown;
};
const DECISION_ENDPOINTS = new Set(["systemone", "decision", "decisions"]);

export function isDecisionCatalogKind(value: unknown): boolean {
  return typeof value === "string" && DECISION_ENDPOINTS.has(value);
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function inventory(value: unknown): InventoryRow[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is InventoryRow =>
          !!item && typeof item === "object" && typeof item.id === "string" && item.id.length > 0
      )
    : [];
}

function decisionEndpoints(provider: string, row: InventoryRow): string[] | null {
  const declared = getDeclaredModelEndpoints(row, provider);
  if (!declared?.some((endpoint) => DECISION_ENDPOINTS.has(endpoint))) return null;
  return [
    ...new Set(
      declared.map((endpoint) => (DECISION_ENDPOINTS.has(endpoint) ? "systemone" : endpoint))
    ),
  ];
}

function permitsTier(connection: Connection, provider: string, model: string): boolean {
  return systemOneTierAllowed(
    provider,
    systemOneModelTier(provider, model),
    record(connection.providerSpecificData)
  );
}

/**
 * An explicit kind changes the source inventory, not the authorization scope.
 * The native endpoint category applies even though the read uses /v1/models.
 * Listing is not proof of credentials, account entitlement, or inference success.
 */
export async function getLocalDecisionCatalogResponse(request: Request): Promise<Response> {
  const nativeUrl = new URL(request.url);
  nativeUrl.pathname = "/v1/systemone/models";
  const nativeRequest = new Request(nativeUrl, {
    method: "GET",
    headers: request.headers,
    signal: request.signal,
  });
  const policy = await enforceApiKeyPolicy(nativeRequest, null, { consumeRequestRateLimit: false });
  if (policy.rejection) return policy.rejection;
  if (request.signal.aborted) return errorResponse(499, "Request aborted by caller");

  const settings = await getSettings();
  const allowed = policy.apiKeyInfo?.allowedConnections;
  const connections = (await getCachedRawProviderConnections())
    .map(createLazyConnectionView)
    .filter(
      (connection) =>
        connection.isActive !== false &&
        typeof connection.id === "string" &&
        typeof connection.provider === "string" &&
        (!allowed?.length || allowed.includes(connection.id)) &&
        !isProviderBlockedByIdOrAlias(connection.provider, settings.blockedProviders)
    );
  const customByProvider = await getAllCustomModels();
  const rows: Array<Record<string, unknown>> = [];

  for (const provider of new Set(connections.map((connection) => String(connection.provider)))) {
    if (request.signal.aborted) return errorResponse(499, "Request aborted by caller");
    const group = connections.filter((connection) => connection.provider === provider);
    const snapshots = await getSyncedAvailableModelsByConnection(provider);
    const entries = new Map<
      string,
      { row: InventoryRow; connections: Connection[]; source: string }
    >();
    // Closed, documented ids are useful local configuration choices even when
    // a provider has no catalog endpoint. They prove neither account access nor
    // live availability, and never arise from a failed remote catalog request.
    const backend: SystemOneBackend | undefined = isSystemOneProvider(provider)
      ? SYSTEMONE_BACKENDS[provider]
      : undefined;
    const documented = new Map<string, InventoryRow>();
    for (const id of backend?.documentedModels ?? backend?.supportedModels ?? []) {
      const row: InventoryRow = {
        id,
        supportedEndpoints: getDeclaredModelEndpoints({ id }, provider) ?? ["systemone"],
      };
      documented.set(id, row);
      entries.set(id, { row, connections: group, source: "documented" });
    }
    function withDocumentedCapability(row: InventoryRow): InventoryRow {
      const seed = documented.get(row.id);
      if (!seed) return row;
      return {
        ...seed,
        ...row,
        supportedEndpoints: [
          ...new Set([
            ...(seed.supportedEndpoints as string[]),
            ...(getDeclaredModelEndpoints(row, provider) ?? []),
          ]),
        ],
      };
    }
    for (const row of inventory(getModelsByProviderId(provider))) {
      const seed = documented.get(row.id);
      // Ordinary static chat tariffs/context limits are not native API evidence.
      if (seed && !decisionEndpoints(provider, row)) continue;
      entries.set(row.id, {
        row: withDocumentedCapability(row),
        connections: group,
        source: "registry",
      });
    }
    for (const connection of group) {
      for (const row of inventory(snapshots[String(connection.id)])) {
        const prior = entries.get(row.id);
        entries.set(row.id, {
          row: withDocumentedCapability(row),
          connections:
            prior?.source === "synced" ? [...prior.connections, connection] : [connection],
          source: "synced",
        });
      }
    }
    for (const row of inventory(customByProvider[provider]))
      entries.set(row.id, { row, connections: group, source: "custom" });

    for (const { row, connections: modelConnections, source } of entries.values()) {
      const endpoints = decisionEndpoints(provider, row);
      if (
        !endpoints ||
        row.visibility === "hide" ||
        row.supportedInApi === false ||
        !isModelSelectable(provider, row.id)
      )
        continue;
      if (getModelIsHidden(provider, row.id) || getModelIsHidden(provider, row.id, "decision"))
        continue;
      if (!isModelExposureAllowed(provider, row.id, settings)) continue;
      if (
        decideHidePaid(
          settings.hidePaidModels === true,
          provider,
          row.id,
          row.pricing,
          row.isFree === true
        )
      )
        continue;
      if (
        !modelConnections.some(
          (connection) =>
            permitsTier(connection, provider, row.id) &&
            !isModelExcludedByConnection(row.id, connection.providerSpecificData)
        )
      )
        continue;
      const projected = toDecisionCatalogModel(provider, {
        ...row,
        supportedEndpoints: endpoints,
        ...(row.inputModalities ? { input_modalities: row.inputModalities } : {}),
        ...(row.outputModalities ? { output_modalities: row.outputModalities } : {}),
        ...(row.decisionPrimitives ? { decision_primitives: row.decisionPrimitives } : {}),
        ...(row.canonicalModelId ? { canonical_model_id: row.canonicalModelId } : {}),
        ...(row.modelAuthor ? { author: row.modelAuthor } : {}),
        ...(row.modelOwner ? { model_owner: row.modelOwner } : {}),
        ...(row.upstreamRoot ? { upstream_root: row.upstreamRoot } : {}),
        ...(row.resolvedAliasTarget ? { resolved_alias_target: row.resolvedAliasTarget } : {}),
        ...(row.decisionPricing
          ? { pricing: row.decisionPricing, pricing_currency: "USD", pricing_unit: "token" }
          : {}),
        context_length: row.context_length ?? row.inputTokenLimit ?? row.contextWindow,
      });
      if (!projected) continue;
      if (
        await validateApiKeyRoutingTarget(
          nativeRequest,
          policy.apiKey,
          policy.apiKeyInfo,
          projected.id
        )
      )
        continue;
      const priced = applyOperatorPricing(
        projected,
        await getNativeCatalogPricing(provider, row.id)
      );
      rows.push({
        ...priced,
        type: "decision",
        api_format: "systemone",
        supported_endpoints: endpoints,
        catalog_source: source,
        ...(documented.has(row.id) ? { decision_capability_source: "documented" } : {}),
        authorization_status: "unverified",
        native_adapter: isSystemOneProvider(provider) ? "available" : "unavailable",
        inference_access: "unverified",
        ...(source === "custom" ? { custom: true } : {}),
      });
      if (rows.length % 50 === 0) await new Promise<void>((resolve) => setImmediate(resolve));
    }
  }
  if (request.signal.aborted) return errorResponse(499, "Request aborted by caller");
  rows.sort((left, right) =>
    String(left.id) < String(right.id) ? -1 : String(left.id) > String(right.id) ? 1 : 0
  );
  return Response.json(
    { object: "list", data: rows },
    { headers: { "Cache-Control": "no-store" } }
  );
}
