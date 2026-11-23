import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { getImageProvider, parseImageModel } from "@omniroute/open-sse/config/imageRegistry.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import {
  enforceApiKeyPolicyWithScope,
  unusableCredentialsResponse,
} from "@/app/api/v1/_shared/keyScopedRoute";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import { runImageRequestWithAccounting } from "@/lib/usage/imageRequestAccounting";
import { executeImageWithCredentialFallback } from "@/sse/services/imageCredentialRetry";
import { rejectRetiredCommonChatGptWebProvider } from "@/lib/providers/chatgptWebRetirementResponse";
import { getImageLongJobOptions } from "@/lib/images/imageGenerationLongJobs";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/providers/{provider}/images/generations
 */
export async function POST(request, { params }) {
  const { provider: rawProvider } = await params;
  const retirementResponse = rejectRetiredCommonChatGptWebProvider(rawProvider);
  if (retirementResponse) return retirementResponse;

  // Verify this is a valid image provider
  const imageProvider = getImageProvider(rawProvider);
  if (!imageProvider) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown image provider: ${rawProvider}`);
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }
  const validation = validateBody(v1ImageGenerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;
  const startTime = Date.now();

  // Ensure model has provider prefix
  if (!body.model.includes("/")) {
    body.model = `${rawProvider}/${body.model}`;
  }

  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  // Enforce API key policies (model restrictions + budget limits). GHSA-3w2r:
  // credential selection stays inside the key's connection scope, as in chat.
  const scope = await enforceApiKeyPolicyWithScope(request, body.model);
  if (scope.rejection) return scope.rejection;
  const { policy } = scope;

  // Validate provider match
  const modelProvider = body.model.split("/")[0];
  if (modelProvider !== rawProvider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Model "${body.model}" does not belong to image provider "${rawProvider}"`
    );
  }

  // Use the handler's registry resolution for accounting, without rewriting the
  // request or changing credential selection/retry. Never dispatch an alias that
  // resolves outside the provider whose credentials this scoped route selects.
  const parsedModel = parseImageModel(body.model);
  if (parsedModel.provider !== imageProvider.id) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Model "${body.model}" does not belong to image provider "${rawProvider}"`
    );
  }
  const requestedModel = body.model.slice(rawProvider.length + 1);
  let credentials = await getProviderCredentialsWithQuotaPreflight(
    rawProvider,
    null,
    scope.allowedConnections,
    requestedModel
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for image provider: ${rawProvider}`
    );
  }
  const unusable = unusableCredentialsResponse(rawProvider, credentials);
  if (unusable) return unusable;

  // #16260 — IMAGE_GENERATION_LONG_JOBS (default off): caller cancellation + connection timeout.
  const longJobs = getImageLongJobOptions();
  const execution = await executeImageWithCredentialFallback({
    provider: rawProvider,
    requestedModel,
    credentials,
    allowedConnections: scope.allowedConnections,
    execute: (attemptCredentials) =>
      runImageRequestWithAccounting(
        {
          endpoint: "/v1/images/generations",
          provider: parsedModel.provider,
          model: parsedModel.model,
          apiKeyInfo: policy.apiKeyInfo,
          credentials: attemptCredentials,
          startTime,
        },
        () =>
          handleImageGeneration({
            body,
            credentials: attemptCredentials,
            log,
            ...(longJobs ? { signal: request.signal, longJobs } : {}),
          })
      ),
  });
  credentials = execution.credentials;
  const result = execution.result;

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    return new Response(JSON.stringify((result as any).data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload((result as any).error, "Image generation provider error");
  const message =
    typeof errorPayload?.error?.message === "string"
      ? errorPayload.error.message
      : "Image generation provider error";
  return errorResponse((result as any).status, message);
}
