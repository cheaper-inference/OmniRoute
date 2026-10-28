// Allow large audio/video file uploads — 5min for processing large files (up to 2GB)
export const maxDuration = 300;
import { handleAudioTranslation } from "@omniroute/open-sse/handlers/audioTranslation.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import {
  parseTranslationModel,
  getTranslationProvider,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { resolveDynamicAudioProviders } from "@/app/api/v1/_shared/audioProviderNodes";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  createComboTargetKeyGate,
  keylessProviderRejection,
  resolveKeyConnectionScope,
} from "@/sse/services/keyConnectionScope";
import { unusableCredentialsResponse } from "@/app/api/v1/_shared/keyScopedRoute";
import { attachOmniRouteMetaToResponse } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { getComboByName, getCombos } from "@/lib/db/combos";
import { getUserDatabaseSettings } from "@/lib/db/databaseSettings";
import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import { log } from "@omniroute/open-sse/utils/logger.ts";
import { saveCallLog } from "@/lib/usageDb";

/**
 * Copy a multipart body, swapping only the `model` field. Combo fan-out needs one
 * body per target, and the uploaded file part is reused as-is (a Blob can be read
 * more than once).
 */
function withModel(formData: FormData, modelStr: string): FormData {
  const next = new FormData();
  for (const [key, value] of formData.entries()) {
    if (key === "model") continue;
    next.append(key, value as string | Blob);
  }
  next.set("model", modelStr);
  return next;
}

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

type TranslationCredentials = Awaited<
  ReturnType<typeof getProviderCredentialsWithQuotaPreflight>
> | null;

/**
 * Credentials for a translation provider, bounded by the caller key's connection
 * scope (GHSA-3w2r) — or the response that refuses the request. Local providers
 * (authType "none") need none.
 */
async function resolveTranslationCredentials(
  provider: string,
  providerConfig: { authType?: string; credentialProviderId?: string } | null,
  allowedConnections: string[] | null
): Promise<{ credentials: TranslationCredentials } | { response: Response }> {
  if (!providerConfig) return { credentials: null };
  const credentialKey = providerConfig.credentialProviderId || provider;
  if (providerConfig.authType === "none") {
    // A keyless provider (local default or a keyless remote) is reachable by a
    // connection-scoped key only when its allowlist admits keyless providers or
    // an in-scope connection serves it (chat's #9057).
    const keylessRejection = await keylessProviderRejection(provider, allowedConnections, () =>
      getProviderCredentialsWithQuotaPreflight(credentialKey, null, allowedConnections)
    );
    return keylessRejection ? { response: keylessRejection } : { credentials: null };
  }
  // NOTE: the 2nd arg of this helper is `excludeConnectionId`, not "use this
  // connection" — a combo target's connectionId must never be passed here.
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    credentialKey,
    null,
    allowedConnections
  );
  if (!credentials) {
    return {
      response: errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`),
    };
  }
  const unusable = unusableCredentialsResponse(provider, credentials);
  return unusable ? { response: unusable } : { credentials };
}

/**
 * Translate with one concrete `provider/model` string. Split out of POST so combo
 * fan-out can invoke it once per target.
 */
async function translateWithModel(
  formData: FormData,
  modelStr: string,
  startTime: number,
  apiKeyId?: string | null,
  apiKeyName?: string | null,
  allowedConnections: string[] | null = null
): Promise<Response> {
  // Translation is served by the transcription-capable nodes (Whisper-style
  // endpoints expose both), plus general chat/responses gateways. Remote hosts are
  // opt-in (default OFF).
  const dynamicProviders = await resolveDynamicAudioProviders(
    "/audio/translations",
    "audio-transcriptions"
  );

  const { provider, model: resolvedModel } = parseTranslationModel(modelStr, dynamicProviders);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid translation model: ${modelStr}. Use format: provider/model`
    );
  }

  // Check provider config — hardcoded first, then dynamic
  const providerConfig =
    getTranslationProvider(provider) || dynamicProviders.find((dp) => dp.id === provider) || null;

  // Get credentials — skip for local providers (authType: "none")
  const selection = await resolveTranslationCredentials(
    provider,
    providerConfig,
    allowedConnections
  );
  if (!("credentials" in selection)) return selection.response;
  // The DB connection row is wider than the handler's credentials shape (it reads a subset).
  const credentials = selection.credentials as Parameters<
    typeof handleAudioTranslation
  >[0]["credentials"];

  let response = await handleAudioTranslation({
    formData,
    credentials,
    resolvedProvider: providerConfig,
    resolvedModel,
  });

  const connectionId = (credentials as { connectionId?: string } | null)?.connectionId || undefined;
  const logModel = `${provider}/${resolvedModel}`;

  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
    // No text body / playback duration available from the multipart upload, so
    // per-second pricing cannot be applied → cost 0 (ADD-only headers, body intact).
    response = attachOmniRouteMetaToResponse(response, {
      provider,
      model: resolvedModel,
      costUsd: 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    saveCallLog({
      method: "POST",
      path: "/v1/audio/translations",
      status: 200,
      model: logModel,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      apiKeyId: apiKeyId || undefined,
      apiKeyName: apiKeyName || undefined,
    }).catch(() => {});
  } else if (response) {
    const errorText = await response
      .clone()
      .text()
      .catch(() => "");
    saveCallLog({
      method: "POST",
      path: "/v1/audio/translations",
      status: response.status,
      model: logModel,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      error: errorText.slice(0, 500),
      apiKeyId: apiKeyId || undefined,
      apiKeyName: apiKeyName || undefined,
    }).catch(() => {});
  }
  return response;
}

/**
 * POST /v1/audio/translations — translate audio to English text
 * OpenAI Whisper API compatible (multipart/form-data). Unlike
 * /v1/audio/transcriptions, output is always English regardless of the
 * source audio language.
 */
export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid multipart form data");
  }

  const startTime = Date.now();

  const model = formData.get("model");
  if (!model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }
  const modelStr = String(model);

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, modelStr);
  if (policy.rejection) return policy.rejection;

  // Forwarded into translateWithModel() (and combo fan-out below) so the
  // resulting call_logs row is attributable to the API key that made the
  // request, matching the pattern every other proxied route follows (#13544).
  const apiKeyId = policy.apiKeyInfo?.id || null;
  const apiKeyName = policy.apiKeyInfo?.name || null;
  // GHSA-3w2r: credential selection (direct and per combo target) stays inside
  // the key's connection scope, the same scope chat applies.
  const scope = await resolveKeyConnectionScope(policy.apiKeyInfo);
  if (scope.rejection) return scope.rejection;
  const { allowedConnections } = scope;

  // A bare name (no "/") may be a combo. /v1/models advertises combos, and chat,
  // embeddings and the sibling /v1/audio/transcriptions all resolve them —
  // resolving here too keeps the catalog honest and frees callers from hardcoding
  // a provider's internal model id.
  if (!modelStr.includes("/")) {
    try {
      const combo = await getComboByName(modelStr);
      if (combo) {
        let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
        try {
          allCombos = await getCombos();
        } catch {}
        let settings = {};
        try {
          settings = getUserDatabaseSettings();
        } catch {}

        return handleComboChat({
          body: { model: modelStr } as any,
          combo: combo as any,
          handleSingleModel: async (_reqBody: any, targetModelStr: string) =>
            translateWithModel(
              withModel(formData, targetModelStr),
              targetModelStr,
              startTime,
              apiKeyId,
              apiKeyName,
              allowedConnections
            ),
          isModelAvailable: createComboTargetKeyGate(policy, modelStr),
          log,
          settings,
          allCombos: allCombos as any,
          relayOptions: undefined,
          signal: undefined,
        } as any);
      }
    } catch (err) {
      log.error("AUDIO", `Combo resolution failed for ${modelStr}: ${err}`);
    }
  }

  return translateWithModel(
    formData,
    modelStr,
    startTime,
    apiKeyId,
    apiKeyName,
    allowedConnections
  );
}
