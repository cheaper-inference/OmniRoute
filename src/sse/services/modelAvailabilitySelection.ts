import {
  getConfirmedModelUnavailability,
  isCurrentModelAvailabilityConnection,
  recordModelAvailabilityObservation,
} from "@/lib/db/modelAvailability";
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isProbeContext } from "@/shared/utils/probeOrigin";
import { getDefaultExecutor } from "@omniroute/open-sse/executors/defaultResolver.ts";
import { hasSpecializedExecutor } from "@omniroute/open-sse/executors/index.ts";
import {
  createModelAvailabilityDispatch,
  endpointKindFromUrl,
} from "@omniroute/open-sse/services/modelAvailabilityEvidence.ts";
import type {
  ModelAvailabilityConnection,
  ModelAvailabilityObservation,
  ModelAvailabilityObserver,
  ModelAvailabilityScope,
} from "@omniroute/open-sse/utils/modelAvailabilityTypes.ts";
import { hasModelChangingPayloadRules } from "@omniroute/open-sse/services/payloadRules.ts";
import { getOpenAICompatibleType } from "@omniroute/open-sse/services/provider.ts";
import { warn } from "../utils/logger";
import type {
  CredentialSelectionOptions,
  ModelAvailabilitySelectionHooks,
} from "./credentialSelectionOptions";

function modelAvailabilityEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("MODEL_AVAILABILITY_EVIDENCE_ENABLED");
  } catch {
    warn("MODEL_AVAILABILITY", "Could not resolve the model availability flag");
    return false;
  }
}

function isModelAvailabilityConnectionCurrent(connection: ModelAvailabilityConnection): boolean {
  try {
    return isCurrentModelAvailabilityConnection(connection);
  } catch {
    warn("MODEL_AVAILABILITY", "Could not check the model availability connection revision");
    return false;
  }
}

function recordObservation(
  scope: ModelAvailabilityScope,
  observation: ModelAvailabilityObservation
) {
  if (!modelAvailabilityEnabled()) return;
  try {
    recordModelAvailabilityObservation(scope, observation);
  } catch {
    warn("MODEL_AVAILABILITY", "Could not write model availability evidence");
  }
}

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

function hasStableModelAvailabilityIdentity(connection: StableConnection): boolean {
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

function getModelAvailabilitySelectionUrl(
  provider: string,
  data: Record<string, unknown>,
  model: string
): string {
  if (!hasStableModelAvailabilityEndpoint(provider, data)) return "";
  try {
    return (
      getDefaultExecutor(provider).buildUrl(model, false, 0, { providerSpecificData: data }) ?? ""
    );
  } catch {
    return "";
  }
}

const createModelAvailabilityObserver: ModelAvailabilityObserver = (
  provider,
  requestId,
  selected,
  executed
) => {
  const connection = selected.modelAvailabilityConnection as
    ModelAvailabilityConnection | undefined;
  const apiKey = selected.apiKey;
  if (!connection || typeof apiKey !== "string" || !apiKey) return undefined;
  if (
    connection.providerId !== provider ||
    connection.connectionId !== executed.connectionId ||
    executed.apiKey !== apiKey ||
    executed.accessToken ||
    !modelAvailabilityEnabled()
  )
    return undefined;
  if (
    !hasStableModelAvailabilityIdentity({
      authType: typeof selected.authType === "string" ? selected.authType : null,
      providerSpecificData: (executed.providerSpecificData ?? {}) as Record<string, unknown>,
    })
  )
    return undefined;

  const data = (selected.providerSpecificData ?? {}) as Record<string, unknown>;
  return createModelAvailabilityDispatch({
    connection,
    apiKey,
    requestId,
    resolveEndpoint: (model) => getModelAvailabilitySelectionUrl(provider, data, model),
    isProbe: () => selected.modelAvailabilityProbe === true || isProbeContext(),
    isEnabled: modelAvailabilityEnabled,
    isCurrentConnection: isModelAvailabilityConnectionCurrent,
    record: recordObservation,
  });
};

function getModelAvailabilityCredentialStamp(connection: ProviderConnectionView, probe: boolean) {
  if (!connection.modelAvailabilityRevision) return {};
  if (!modelAvailabilityEnabled() || !hasStableModelAvailabilityIdentity(connection)) return {};
  if (!hasStableModelAvailabilityEndpoint(connection.provider, connection.providerSpecificData))
    return {};
  const modelAvailabilityConnection: ModelAvailabilityConnection = {
    providerId: connection.provider,
    connectionId: connection.id,
    connectionRevision: connection.modelAvailabilityRevision,
  };
  return {
    modelAvailabilityConnection,
    modelAvailabilityProbe: probe,
    createModelAvailabilityObserver,
  };
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

const filterModelAvailabilityConnections: ModelAvailabilitySelectionHooks["filterConnections"] =
  async ({ connections, excludedIds, provider, model }) => {
    if (await hasModelChangingPayloadRules(provider, model))
      return { connections, exhausted: false };
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
  };

export function createModelAvailabilitySelection(probe: boolean): ModelAvailabilitySelectionHooks {
  return {
    probe,
    shouldFilter: () => !probe && !isProbeContext() && modelAvailabilityEnabled(),
    stampCredentials: (connection) => getModelAvailabilityCredentialStamp(connection, probe),
    filterConnections: filterModelAvailabilityConnections,
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
  if (!connection || !options.modelAvailability || !modelAvailabilityEnabled()) return true;
  if (!isModelAvailabilityConnectionCurrent(connection)) return false;
  if (
    options.modelAvailability.probe ||
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
