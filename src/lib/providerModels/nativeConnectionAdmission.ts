import { isDeepStrictEqual } from "node:util";
import { getProviderConnectionById } from "@/lib/db/providers";
import { toProviderConnection } from "@/lib/db/providers/lazyConnectionView";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { isCatalogFreeModel } from "@/shared/utils/freeModels";
import { buildConnectionConcurrencyFields } from "@/sse/services/connectionConcurrencyFields";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import {
  isAccountUnavailable,
  isModelLocked,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { resolveModelSemaphoreMaxConcurrency } from "@omniroute/open-sse/handlers/chatCore/executorHelpers.ts";
import {
  assertNativeConnectionUnleased,
  NativeConnectionLeaseError,
} from "@omniroute/open-sse/handlers/systemOneLease.ts";
import {
  systemOneUrl,
  type SystemOneCredentials,
} from "@omniroute/open-sse/handlers/systemOneTransport.ts";
import {
  isConnectionEligibleForTier,
  systemOneCredentialToken,
  type SystemOneCandidate,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";

type SelectedCredentials = SystemOneCredentials & {
  authType?: unknown;
  quotaWindowThresholds?: Record<string, unknown> | null;
};

function stale(): Response {
  return errorResponse(409, "The selected native connection changed; submit a new request", {
    code: "systemone_connection_changed",
  });
}
function unavailable(): Response {
  return errorResponse(403, "The selected native connection is no longer eligible", {
    code: "systemone_connection_unavailable",
  });
}

function terminalStatus(status: string | null, candidate: SystemOneCandidate): boolean {
  const normalized = (status || "").trim().toLowerCase();
  if (normalized === "credits_exhausted" && candidate.provider === "openrouter")
    return !isCatalogFreeModel("openrouter", candidate.model);
  return ["credits_exhausted", "banned", "expired"].includes(normalized);
}

/**
 * Final queued-admission check for the already selected identity. The uncached
 * single-row getter is intentional: refreshing a selection cache would not see
 * another worker's revocation. Credentials are compared in memory, never logged
 * or substituted. Unrelated display metadata and quota observations are ignored.
 */
export async function revalidateNativeConnection(
  candidate: SystemOneCandidate,
  selected: SelectedCredentials
): Promise<Response | null> {
  const id = selected.connectionId;
  if (!id) return unavailable();
  let current: ReturnType<typeof toProviderConnection>;
  try {
    const row = await getProviderConnectionById(id);
    if (!row) return unavailable();
    current = toProviderConnection(row);
    assertNativeConnectionUnleased(id);
  } catch (error) {
    if (error instanceof NativeConnectionLeaseError)
      return errorResponse(409, "Native connection is reserved by an exclusive session lease", {
        type: "lease_error",
        code: "LEASE_CAPACITY_UNAVAILABLE",
      });
    return errorResponse(503, "Native connection authorization is unavailable", {
      code: "systemone_connection_authorization_unavailable",
    });
  }
  if (
    !current.isActive ||
    current.provider !== candidate.provider ||
    !isConnectionEligibleForTier(candidate.tier, current, candidate.provider) ||
    isModelExcludedByConnection(candidate.model, current.providerSpecificData) ||
    isAccountUnavailable(current.rateLimitedUntil) ||
    terminalStatus(current.testStatus, candidate) ||
    isModelLocked(candidate.provider, id, candidate.model)
  )
    return unavailable();

  if (
    systemOneCredentialToken(current) !== systemOneCredentialToken(selected) ||
    (selected.authType !== undefined && selected.authType !== current.authType)
  )
    return stale();
  try {
    if (systemOneUrl(candidate.provider, current) !== systemOneUrl(candidate.provider, selected))
      return stale();
  } catch {
    return stale();
  }
  const caps = buildConnectionConcurrencyFields(current);
  if (
    (caps.maxConcurrent ?? null) !== (selected.maxConcurrent ?? null) ||
    (caps.rateLimitMaxConcurrent ?? null) !== (selected.rateLimitMaxConcurrent ?? null) ||
    resolveModelSemaphoreMaxConcurrency(caps, candidate.model) !==
      resolveModelSemaphoreMaxConcurrency(
        { modelConcurrency: selected.modelConcurrency },
        candidate.model
      ) ||
    !isDeepStrictEqual(
      current.quotaWindowThresholds ?? null,
      selected.quotaWindowThresholds ?? null
    ) ||
    !isDeepStrictEqual(
      current.providerSpecificData.limitPolicy ?? null,
      selected.providerSpecificData?.limitPolicy ?? null
    )
  )
    return stale();
  return null;
}
