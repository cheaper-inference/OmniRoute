import { FalClient, FalError } from "@omniroute/open-sse/handlers/fal/client";
import {
  falCapabilities,
  compileFalInput,
  falRecord,
} from "@omniroute/open-sse/handlers/fal/schema";
import { getFalDefinition, saveFalDefinition } from "@/lib/db/fal";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch";
import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import {
  enforceApiKeyPolicyWithScope,
  unusableCredentialsResponse,
} from "@/app/api/v1/_shared/keyScopedRoute";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import { proxyConfigToUrl, isRelayType } from "@omniroute/open-sse/utils/proxyDispatcher";
import { resolveEnvProxyUrl } from "@omniroute/open-sse/utils/proxyEnv";

export async function falContext(
  request: Request,
  endpoint: string | null,
  pinnedConnectionId?: string,
  existingJob = false
) {
  if (!(await isAuthenticated(request)))
    return { rejection: errorResponse(401, "Authentication required") };
  const scope = await enforceApiKeyPolicyWithScope(
    request,
    endpoint ? `fal-ai/${endpoint}` : null,
    existingJob ? { existingFalJob: true } : undefined
  );
  if (scope.rejection) return { rejection: scope.rejection };
  if (
    pinnedConnectionId &&
    scope.allowedConnections &&
    !scope.allowedConnections.includes(pinnedConnectionId)
  ) {
    return { rejection: errorResponse(403, "Fal job connection is outside this API key's scope") };
  }
  const pinned = pinnedConnectionId ? await getProviderConnectionById(pinnedConnectionId) : null;
  if (pinnedConnectionId && (pinned?.provider !== "fal-ai" || pinned.isActive === false)) {
    return { rejection: errorResponse(403, "Fal job connection is unavailable") };
  }
  const credentials =
    existingJob && pinnedConnectionId
      ? { ...pinned, connectionId: pinnedConnectionId }
      : await getProviderCredentialsWithQuotaPreflight(
          "fal-ai",
          null,
          pinnedConnectionId ? [pinnedConnectionId] : scope.allowedConnections,
          endpoint ? `fal-ai/${endpoint}` : null
        );
  if (!credentials) return { rejection: errorResponse(401, "No credentials for fal-ai") };
  const unusable = unusableCredentialsResponse("fal-ai", credentials);
  if (unusable) return { rejection: unusable };
  const selected = falRecord(credentials);
  const connectionId = String(selected.connectionId ?? "");
  if (!connectionId) throw new FalError("Fal requires a persisted provider connection", 503);
  const proxy = await resolveProxyForConnection(
    connectionId,
    scope.policy.apiKeyInfo?.id,
    "fal-ai"
  );
  const client = new FalClient(String(selected.apiKey || selected.accessToken || ""), (url, init) =>
    runWithProxyContext(proxy.proxy, () => fetch(url, init))
  );
  return {
    rejection: null,
    client,
    connectionId,
    owner: scope.policy.apiKeyInfo?.id ?? "dashboard",
    apiKeyInfo: scope.policy.apiKeyInfo,
    realtime: {
      token: String(selected.apiKey || selected.accessToken || ""),
      proxyUrl: () => {
        if (isRelayType(String(falRecord(proxy.proxy).type ?? "")))
          throw new FalError("The selected relay does not support fal realtime", 409);
        return proxyConfigToUrl(proxy.proxy) ?? resolveEnvProxyUrl("https://fal.run");
      },
    },
  };
}

export async function resolveFalDefinition(
  client: FalClient,
  connectionId: string,
  endpoint: string,
  signal?: AbortSignal,
  refresh = false
) {
  const cached = getFalDefinition(connectionId, endpoint, refresh);
  if (cached) return cached;
  const definition = await client.definition(endpoint, signal);
  falCapabilities(definition);
  compileFalInput(definition);
  saveFalDefinition(connectionId, definition);
  return definition;
}
