import {
  getConfirmedModelUnavailability,
  type ModelAvailabilityScope,
} from "@/lib/db/modelAvailability";
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { isProbeContext } from "@/shared/utils/probeOrigin";
import { getDefaultExecutor } from "@omniroute/open-sse/executors/defaultResolver.ts";
import { hasSpecializedExecutor } from "@omniroute/open-sse/executors/index.ts";
import {
  endpointKindFromUrl,
  isModelAvailabilityConnectionCurrent,
  modelAvailabilityEnabled,
  type ModelAvailabilityConnection,
} from "@omniroute/open-sse/services/modelAvailabilityEvidence.ts";
import { hasModelChangingPayloadRules } from "@omniroute/open-sse/services/payloadRules.ts";
import { getOpenAICompatibleType } from "@omniroute/open-sse/services/provider.ts";
import { warn } from "../utils/logger";
import type { CredentialSelectionOptions } from "./credentialSelectionOptions";

export type ModelUnavailableSelection = {
  modelUnavailable: true;
  connectionId?: never;
  allRateLimited?: never;
  allExpired?: never;
};

export const MODEL_UNAVAILABLE_SELECTION: ModelUnavailableSelection = { modelUnavailable: true };

export function isConfirmedModelUnavailable(
  scope: ModelAvailabilityScope | null,
  nowMs = Date.now()
): boolean {
  if (!scope || !modelAvailabilityEnabled()) return false;
  try {
    return getConfirmedModelUnavailability(scope, nowMs) !== null;
  } catch {
    warn("MODEL_AVAILABILITY", "Could not read model availability evidence");
    return false;
  }
}

type StableConnection = {
  authType: string | null;
  providerSpecificData: Record<string, unknown>;
};

export function hasStableModelAvailabilityIdentity(connection: StableConnection): boolean {
  const extras = connection.providerSpecificData.extraApiKeys;
  return (
    connection.authType === "apikey" &&
    (extras == null || (Array.isArray(extras) && extras.length === 0))
  );
}

function hasStableModelAvailabilityEndpoint(
  provider: string,
  data: Record<string, unknown>
): boolean {
  if (hasSpecializedExecutor(provider) || data.customHeaders || data.requestDefaults) return false;
  if (!provider.startsWith("openai-compatible-")) return provider === "openai";
  // An unstamped compatible node can inherit live node metadata at dispatch.
  if (!data.baseUrl || data.customJson) return false;
  const apiType = getOpenAICompatibleType(provider, data);
  return apiType === "responses" || (apiType === "chat" && data.apiType === "chat");
}

export function getModelAvailabilitySelectionUrl(
  provider: string,
  data: Record<string, unknown>,
  model: string
): string {
  if (!hasStableModelAvailabilityEndpoint(provider, data)) return "";
  try {
    return getDefaultExecutor(provider).buildUrl(model, false, 0, { providerSpecificData: data });
  } catch {
    return "";
  }
}

export function getModelAvailabilityCredentialStamp(
  connection: ProviderConnectionView,
  options: CredentialSelectionOptions
) {
  if (!options.modelAvailabilityEndpointKind || !connection.modelAvailabilityRevision) return {};
  if (!modelAvailabilityEnabled() || !hasStableModelAvailabilityIdentity(connection)) return {};
  if (!hasStableModelAvailabilityEndpoint(connection.provider, connection.providerSpecificData))
    return {};
  const modelAvailabilityConnection: ModelAvailabilityConnection = {
    providerId: connection.provider,
    connectionId: connection.id,
    connectionRevision: connection.modelAvailabilityRevision,
  };
  return { modelAvailabilityConnection, modelAvailabilityProbe: options.modelAvailabilityProbe };
}

function selectionScope(
  provider: string,
  modelId: string,
  connection: ProviderConnectionView
): ModelAvailabilityScope | null {
  if (connection.provider !== provider || !connection.modelAvailabilityRevision) return null;
  if (!hasStableModelAvailabilityIdentity(connection)) return null;
  const url = getModelAvailabilitySelectionUrl(provider, connection.providerSpecificData, modelId);
  if (!url) return null;
  const endpointKind = endpointKindFromUrl(url);
  if (!endpointKind) return null;
  return {
    providerId: provider,
    connectionId: connection.id,
    connectionRevision: connection.modelAvailabilityRevision,
    endpointKind,
    modelId,
  };
}

export function shouldFilterModelAvailability(options: CredentialSelectionOptions): boolean {
  return (
    !!options.modelAvailabilityEndpointKind &&
    !options.modelAvailabilityProbe &&
    !isProbeContext() &&
    modelAvailabilityEnabled()
  );
}

export async function filterModelAvailabilityConnections({
  connections,
  excludedIds,
  provider,
  model,
}: {
  connections: ProviderConnectionView[];
  excludedIds: Set<string>;
  provider: string;
  model: string;
}): Promise<{ connections: ProviderConnectionView[]; exhausted: boolean }> {
  if (await hasModelChangingPayloadRules(provider, model)) return { connections, exhausted: false };
  const remaining = connections.filter(
    (connection) =>
      excludedIds.has(connection.id) ||
      !isConfirmedModelUnavailable(selectionScope(provider, model, connection))
  );
  return {
    connections: remaining,
    exhausted:
      remaining.length < connections.length &&
      remaining.every((connection) => excludedIds.has(connection.id)),
  };
}

export async function isPreselectedModelAvailabilityCurrent(
  credentials: {
    modelAvailabilityConnection?: ModelAvailabilityConnection;
    providerSpecificData?: Record<string, unknown>;
  },
  modelId: string,
  options: CredentialSelectionOptions
): Promise<boolean> {
  const connection = credentials.modelAvailabilityConnection;
  if (!connection || !options.modelAvailabilityEndpointKind || !modelAvailabilityEnabled())
    return true;
  if (!isModelAvailabilityConnectionCurrent(connection)) return false;
  if (
    options.modelAvailabilityProbe ||
    isProbeContext() ||
    (await hasModelChangingPayloadRules(connection.providerId, modelId))
  )
    return true;
  const url = getModelAvailabilitySelectionUrl(
    connection.providerId,
    credentials.providerSpecificData ?? {},
    modelId
  );
  const endpointKind = url ? endpointKindFromUrl(url) : undefined;
  return !endpointKind || !isConfirmedModelUnavailable({ ...connection, modelId, endpointKind });
}
