import {
  handleSystemOneProxy,
  type SystemOneCredentials,
} from "@omniroute/open-sse/handlers/systemOne.ts";
import { resolveSystemOneTarget } from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { validateSystemOneBackendBody } from "@omniroute/open-sse/handlers/systemOneValidation.ts";
import { resolveLocalSyncedEndpointRoute } from "@/lib/providerModels/syncedEndpointRouting";
import { getSyncedAvailableModelsForConnection } from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import { getModelLockoutInfo } from "@omniroute/open-sse/services/accountFallback.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1SystemOneSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/systemone — typed decision (System One) models.
 *
 * TypeSafe-compatible body `{ model, state, questions }`. The model prefix selects the
 * backend connection: `typesafe/` (native TypeSafe), `openrouter/` (also bare ids and the
 * `~vendor/model` alias), or `ollama-local/` (a configured local Ollama). The TypeSafe SDKs
 * work against OmniRoute by pointing their base URL here.
 */
type Target = ReturnType<typeof resolveSystemOneTarget>;

async function parseRequest(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body") };
  }
  const validation = validateBody(v1SystemOneSchema, rawBody);
  if (isValidationFailure(validation)) {
    return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message) };
  }
  const body = validation.data;
  let target: Target;
  try {
    target = resolveSystemOneTarget(body.model);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid System One target";
    return { error: errorResponse(400, message) };
  }
  const backend = validateSystemOneBackendBody(target.provider, body);
  if (backend.ok === false) return { error: errorResponse(backend.status, backend.message) };
  return { body, target };
}

/**
 * A row whose `systemone` endpoint came from Ollama's /api/show carries that host's full
 * capability list, so a missing `supportsVision` there means text-only. A model routed only
 * by an operator override has no capability evidence and is left to the upstream.
 */
async function acceptsImages(provider: string, connectionId: string, model: string) {
  const rows = await getSyncedAvailableModelsForConnection(provider, connectionId);
  const row = rows.find((candidate) => candidate.id === model);
  return !row?.supportedEndpoints?.includes("systemone") || row.supportsVision === true;
}

/** Narrow the key's connection allowlist to Ollama hosts whose live catalog has the model. */
async function resolveAllowedConnections(
  target: Target,
  keyConnections: string[] | undefined,
  hasImages: boolean
): Promise<{ ids: string[] | null } | { error: Response }> {
  const allowed = keyConnections?.length ? keyConnections : null;
  if (target.provider !== "ollama-local") return { ids: allowed };
  const route = await resolveLocalSyncedEndpointRoute(target.canonicalModel, "systemone");
  if (!route) return { ids: allowed };
  const eligible = route.connectionIds.filter((id) => !allowed || allowed.includes(id));
  if (!eligible.length) {
    return { error: errorResponse(403, "No allowed Ollama connection has this decision model") };
  }
  if (!hasImages) return { ids: eligible };
  const withVision: string[] = [];
  for (const id of eligible) {
    if (await acceptsImages(route.provider, id, route.model)) withVision.push(id);
  }
  if (!withVision.length) {
    return { error: errorResponse(400, `Model ${target.canonicalModel} does not accept images`) };
  }
  return { ids: withVision };
}

/**
 * The selector returns no credentials both when the backend has no usable connection and
 * when every connection locked this one model after the upstream said it does not have it
 * (Ollama 404 model_not_found). The second case is not a credentials problem: answer 404
 * so the caller pulls the model instead of re-checking its keys. Retryable lockouts never
 * get here, they come back as all-rate-limited (429).
 */
async function lockedModelResponse(
  provider: string,
  model: string,
  allowed: string[] | null
): Promise<Response | null> {
  const active = (await getProviderConnections({ provider, isActive: true })).filter(
    (row: { id: string }) => !allowed || allowed.includes(row.id)
  );
  if (!active.length) return null;
  const locked = active.every((row: { id: string }) =>
    Boolean(getModelLockoutInfo(provider, row.id, model))
  );
  if (!locked) return null;
  return errorResponse(
    HTTP_STATUS.NOT_FOUND,
    `Model ${model} is not available on ${provider}: the upstream reported it missing`
  );
}

async function postHandler(request: Request) {
  const parsed = await parseRequest(request);
  if ("error" in parsed) return parsed.error;
  const { body, target } = parsed;

  const policy = await enforceApiKeyPolicy(request, target.canonicalModel);
  if (policy.rejection) return policy.rejection;

  const connections = await resolveAllowedConnections(
    target,
    policy.apiKeyInfo?.allowedConnections,
    Array.isArray(body.images) && body.images.length > 0
  );
  if ("error" in connections) return connections.error;

  const canonicalModel = target.model.replace(/^~/, "");
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    target.provider,
    null,
    connections.ids,
    canonicalModel
  );
  if (!credentials) {
    return (
      (await lockedModelResponse(target.provider, canonicalModel, connections.ids)) ??
      errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${target.provider}`)
    );
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(target.provider, credentials);
  }

  // The selector's union also carries all-expired / key-policy / lease markers. The
  // handler rejects every marker with 401 — a keyless local backend included, which
  // must never fall through to the default Ollama host.
  const response = await handleSystemOneProxy({
    body: { ...body, model: target.model },
    provider: target.provider,
    requestedModel: body.model,
    signal: request.signal,
    credentials: credentials as SystemOneCredentials,
    canonicalModel,
    apiKeyInfo: policy.apiKeyInfo,
  });
  if (response?.ok) await clearRecoveredProviderState(credentials);
  return response;
}

export const POST = withInjectionGuard(postHandler);
