import { getRequestedModelEndpointMismatch } from "@/lib/providerModels/modelEndpointGuard";
import { handleMusicGeneration } from "@omniroute/open-sse/handlers/musicGeneration.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { parseMusicModel, getMusicProvider } from "@omniroute/open-sse/config/musicRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { resolveLocalOverrideCredentials } from "@/app/api/v1/_shared/videoModelResolution";
import {
  enforceApiKeyPolicyWithScope,
  unusableCredentialsResponse,
} from "@/app/api/v1/_shared/keyScopedRoute";
import {
  failedMediaGenerationResponse,
  mediaGenerationOptionsResponse,
  promptRequiredResponse,
  readMediaGenerationBody,
  successfulMediaGenerationResponse,
} from "@/app/api/v1/_shared/mediaGenerationRoute";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import { getComboByName } from "@/lib/db/combos";
import { runModelEndpointCombo } from "@/lib/combos/modelEndpointCombo";

export const dynamic = "force-dynamic";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return mediaGenerationOptionsResponse();
}

/**
 * GET /v1/music/generations — list available music models
 */
export async function GET(request?: Request) {
  return getSpecialtyModelsResponse(
    request,
    "/v1/music/generations",
    (model) => model.type === "music"
  );
}

async function dispatchMusicModel(
  request: Request,
  body: Record<string, unknown> & { model: string; duration?: number },
  allowedConnections: string[] | null,
  apiKeyId: string | undefined,
  startTime: number
) {
  const mismatch = await getRequestedModelEndpointMismatch(body.model, "music");
  if (mismatch) return errorResponse(HTTP_STATUS.BAD_REQUEST, mismatch);

  const { provider } = parseMusicModel(body.model);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid music model: ${body.model}. Use format: provider/model`
    );
  }

  const providerConfig = getMusicProvider(provider);
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    credentials = await getProviderCredentialsWithQuotaPreflight(
      provider,
      null,
      allowedConnections
    );
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for music provider: ${provider}`
      );
    }
    const unusable = unusableCredentialsResponse(provider, credentials);
    if (unusable) return unusable;
  } else if (providerConfig?.authType === "none") {
    const local = await resolveLocalOverrideCredentials(provider, allowedConnections);
    if (local.rejection) return local.rejection;
    credentials = local.credentials;
  }

  const result = await handleMusicGeneration({ body, credentials, log, signal: request.signal });
  if (!result.success) {
    return failedMediaGenerationResponse(result, "Music generation provider error");
  }
  await clearRecoveredProviderState(credentials);
  return successfulMediaGenerationResponse({
    result,
    billingMode: "audio",
    provider,
    model: body.model,
    startTime,
    duration: body.duration,
    apiKeyId,
  });
}

/**
 * POST /v1/music/generations — generate music
 */
async function postHandler(request, context) {
  const parsed = await readMediaGenerationBody(request, log, "MUSIC");
  if (parsed.state === "invalid") {
    return parsed.response;
  }
  const body = parsed.body;
  const startTime = Date.now();

  const promptError = promptRequiredResponse(body);
  if (promptError) return promptError;

  // Enforce API key policies (model restrictions + budget limits)
  // GHSA-3w2r: credential selection stays inside the key's connection scope,
  // the same scope chat applies.
  const scope = await enforceApiKeyPolicyWithScope(request, body.model);
  if (scope.rejection) return scope.rejection;
  if (typeof body.model === "string" && !body.model.includes("/")) {
    const combo = await getComboByName(body.model);
    if (combo) {
      return runModelEndpointCombo({
        name: body.model,
        endpoint: "music",
        request,
        body,
        policy: scope.policy,
        allowedConnections: scope.allowedConnections,
        dispatch: (routedBody, allowedConnections) =>
          dispatchMusicModel(
            request,
            routedBody as Record<string, unknown> & { model: string; duration?: number },
            allowedConnections,
            scope.policy.apiKeyInfo?.id,
            startTime
          ),
      });
    }
  }
  return dispatchMusicModel(
    request,
    body,
    scope.allowedConnections,
    scope.policy.apiKeyInfo?.id,
    startTime
  );
}

export const POST = withInjectionGuard(postHandler);
