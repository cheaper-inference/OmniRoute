import { FalClient, FalError } from "@omniroute/open-sse/handlers/fal/client";
import {
  falCapabilities,
  compileFalInput,
  falRecord,
} from "@omniroute/open-sse/handlers/fal/schema";
import { getFalDefinition, saveFalDefinition, findFalReservation } from "@/lib/db/fal";
import type { FalRecord } from "@omniroute/open-sse/handlers/fal/schema";
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
  const selection = await selectCredentials(scope, endpoint, pinnedConnectionId, existingJob);
  if (selection.rejection) return { rejection: selection.rejection };
  const credentials = selection.credentials;
  if (!credentials) return { rejection: errorResponse(401, "No credentials for fal-ai") };
  const unusable = unusableCredentialsResponse("fal-ai", credentials);
  if (unusable) return { rejection: unusable };
  const selected = falRecord(credentials);
  const connectionId = String(selected.connectionId ?? "");
  if (!connectionId) throw new FalError("Fal requires a persisted provider connection", 503);
  return buildContext(scope, selected, connectionId);
}
async function selectCredentials(
  scope: Awaited<ReturnType<typeof enforceApiKeyPolicyWithScope>>,
  endpoint: string | null,
  pinnedConnectionId: string | undefined,
  existingJob: boolean
) {
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
  return { credentials, rejection: null };
}
async function buildContext(
  scope: Awaited<ReturnType<typeof enforceApiKeyPolicyWithScope>>,
  selected: FalRecord,
  connectionId: string
) {
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
      proxyUrl: (origin = "https://fal.run") => {
        if (isRelayType(String(falRecord(proxy.proxy).type ?? "")))
          throw new FalError("The selected relay does not support fal realtime", 409);
        return proxyConfigToUrl(proxy.proxy) ?? resolveEnvProxyUrl(origin);
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

/** Recover an existing receipt only; callers still enforce full policy for new inference. */
export async function recoverFalReceipt(
  request: Request,
  endpoint: string,
  input: FalRecord,
  idempotencyKey: string,
  connectionId?: string
): Promise<Response | null> {
  if (!(await isAuthenticated(request))) return errorResponse(401, "Authentication required");
  const scope = await enforceApiKeyPolicyWithScope(request, `fal-ai/${endpoint}`, {
    existingFalJob: true,
  });
  if (scope.rejection) return scope.rejection;
  const job = findFalReservation(
    scope.policy.apiKeyInfo?.id ?? "dashboard",
    idempotencyKey,
    endpoint,
    input
  );
  if (!job) return null;
  if (connectionId && connectionId !== job.connectionId)
    throw new FalError("Idempotency-Key is bound to another connection");
  const context = await falContext(request, endpoint, job.connectionId, true);
  if (context.rejection) return context.rejection;
  return Response.json(
    {
      id: job.id,
      status: job.status,
      request_id: job.requestId ?? null,
      status_url: `/v1/fal/jobs/${job.id}`,
      response_url: `/v1/fal/jobs/${job.id}?result=true`,
      cancel_url: job.cancelUrl ? `/v1/fal/jobs/${job.id}` : null,
    },
    { status: 202, headers: { "X-Request-ID": job.id, "Cache-Control": "no-store" } }
  );
}
