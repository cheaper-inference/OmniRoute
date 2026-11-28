import { getFalCompatibilityPreparer } from "@/lib/fal/compatibility";
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
  type MediaGenerationResultLike,
} from "@/app/api/v1/_shared/mediaGenerationRoute";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import { getComboByName } from "@/lib/db/combos";
import { runModelEndpointCombo } from "@/lib/combos/modelEndpointCombo";
import { toCallLogApiKeyContext, trackMediaWrites } from "@/lib/usage/callLogApiKeyContext";
import { recordSpecialtyCallLog } from "@/lib/usage/specialtyRequestAccounting";
import type { ApiKeyPolicyResult } from "@/shared/utils/apiKeyPolicy";

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

type MusicBody = Record<string, unknown> & { model: string; duration?: unknown };
type MusicCredentials = Parameters<typeof handleMusicGeneration>[0]["credentials"];

/** Dispatch one resolved combo target through the provider's music executor. */
async function dispatchMusicModel(
  request: Request,
  body: MusicBody,
  allowedConnections: string[] | null,
  apiKeyInfo: ApiKeyPolicyResult["apiKeyInfo"],
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

  return generateMusicForConnection(request, body, provider, credentials, apiKeyInfo, startTime);
}

async function generateMusicForConnection(
  request: Request,
  body: MusicBody,
  provider: string,
  credentials: MusicCredentials,
  apiKeyInfo: ApiKeyPolicyResult["apiKeyInfo"],
  startTime: number
) {
  const endpoint = "/v1/music/generations";
  const identity = toCallLogApiKeyContext(apiKeyInfo, credentials);
  const { result, mediaWrites } = await trackMediaWrites<MediaGenerationResultLike>(
    identity,
    endpoint,
    () =>
      handleMusicGeneration({
        prepareFalInput: getFalCompatibilityPreparer(),
        body,
        credentials,
        log,
        signal: request.signal,
      })
  );
  if (!result.success) {
    return failedMediaGenerationResponse(result, "Music generation provider error");
  }
  await clearRecoveredProviderState(credentials);
  if (!mediaWrites.callLog) {
    await recordSpecialtyCallLog({ ...identity, provider, model: body.model, endpoint, startTime });
  }
  return successfulMediaGenerationResponse({
    result,
    billingMode: "audio",
    provider,
    model: body.model,
    startTime,
    duration:
      apiKeyInfo && provider === "elevenlabs" && typeof body.music_length_ms === "number"
        ? body.music_length_ms / 1000
        : body.duration,
    apiKeyId: identity.apiKeyId,
    musicAccounting: apiKeyInfo
      ? { ...identity, usage: (result.data as { usage?: unknown } | undefined)?.usage }
      : undefined,
  });
}

/**
 * POST /v1/music/generations — generate music
 */
/** Validate and execute the OpenAI-compatible music generation request. */
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
            routedBody as MusicBody,
            allowedConnections,
            scope.policy.apiKeyInfo,
            startTime
          ),
      });
    }
  }
  return dispatchMusicModel(
    request,
    body,
    scope.allowedConnections,
    scope.policy.apiKeyInfo,
    startTime
  );
}

export const POST = withInjectionGuard(postHandler);
