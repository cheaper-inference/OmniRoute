import { endpointKindFromPath } from "@omniroute/open-sse/services/modelAvailabilityEvidence.ts";
import { getProviderCredentialsWithQuotaPreflight } from "../services/auth";
import type { CredentialSelectionOptions } from "../services/credentialSelectionOptions";
import { isPreselectedModelAvailabilityCurrent } from "../services/modelAvailabilitySelection";
import { resolveForcedConnectionForCredentialPool } from "../services/sessionAffinityPin";
import {
  comboStalledConnectionIds,
  type ComboStalledConnections,
} from "./chat/comboStalledConnections.ts";

export function modelAvailabilitySelectionOptions(
  endpointPath: string | undefined,
  requestedModel: string,
  probe: boolean
): CredentialSelectionOptions {
  // A bare model can be replaced by an account's default after selection.
  const endpointKind = requestedModel.includes("/") && endpointKindFromPath(endpointPath || "");
  return endpointKind
    ? { modelAvailabilityEndpointKind: endpointKind, modelAvailabilityProbe: probe }
    : {};
}

export function selectChatCredentials({
  provider,
  model,
  allowedConnections,
  options,
  excluded,
  forcedConnectionId,
  ownerConnectionId,
}: {
  provider: string;
  model: string;
  allowedConnections: string[] | null;
  options: CredentialSelectionOptions;
  excluded: Set<string>;
  forcedConnectionId: string | null;
  ownerConnectionId?: string;
}) {
  const effectiveForcedId = resolveForcedConnectionForCredentialPool({
    forcedConnectionId,
    excludedConnectionIds: excluded,
    connections: [],
    allowRateLimitedConnections:
      options.allowRateLimitedConnections || options.allowSuppressedConnections,
    bypassQuotaPolicy: options.bypassQuotaPolicy,
    isQuotaExhausted: () => false,
    isQuotaPolicyBlocked: () => false,
  });
  return getProviderCredentialsWithQuotaPreflight(provider, null, allowedConnections, model, {
    ...options,
    excludeConnectionIds: Array.from(excluded),
    ...(ownerConnectionId || effectiveForcedId
      ? { forcedConnectionId: ownerConnectionId || effectiveForcedId }
      : {}),
  });
}

export function canReusePreselectedChatCredentials(
  credentials: Parameters<typeof isPreselectedModelAvailabilityCurrent>[0] | null | undefined,
  model: string,
  options: CredentialSelectionOptions
) {
  if (!credentials) return false;
  if (!credentials.modelAvailabilityConnection) return true;
  return isPreselectedModelAvailabilityCurrent(credentials, model, options);
}

// Empty turns and combo target timeouts prefer an allowed sibling.
export function getChatCredentialExclusions(
  excluded: Set<string>,
  {
    provider,
    canUseSibling,
    emptyTurnConnectionId,
    stalled,
  }: {
    provider: string;
    canUseSibling: boolean;
    emptyTurnConnectionId?: string | null;
    stalled?: ComboStalledConnections | null;
  }
): Set<string> {
  const result = new Set(excluded);
  if (!canUseSibling) return result;
  if (emptyTurnConnectionId) result.add(emptyTurnConnectionId);
  for (const id of comboStalledConnectionIds(stalled, provider)) result.add(id);
  return result;
}
