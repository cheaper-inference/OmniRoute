import {
  handleOcr,
  resolveVertexOcrAccessToken,
  resolveVertexOcrBaseUrl,
  VERTEX_DEEPSEEK_OCR_PROVIDER_ID,
} from "@omniroute/open-sse/handlers/ocr.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { parseOcrModel } from "@omniroute/open-sse/config/ocrRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  isKeyScopeBlockedCredentials,
  keyScopeBlockedResponse,
  resolveKeyConnectionScope,
} from "@/sse/services/keyConnectionScope";
import { v1OcrSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { getComboByName } from "@/lib/db/combos";
import { runModelEndpointCombo } from "@/lib/combos/modelEndpointCombo";
import { getRequestedModelEndpointMismatch } from "@/lib/providerModels/modelEndpointGuard";
import { recordOcrRequest } from "@/lib/usage/specialtyRequestAccounting";

export { resolveVertexOcrAccessToken };

/**
 * Custom-endpoint providers (e.g. azure-document-intelligence, vertex-deepseek-ocr) store the
 * connection's resource endpoint under providerSpecificData, not as a top-level credentials
 * field — mirror the convention used across src/lib/providers/validation/* (see e.g.
 * urlHelpers.ts). handleOcr reads credentials.baseUrl, so surface it here. An existing
 * top-level baseUrl always wins (kept for tests/callers that pass it directly). The
 * vertex-deepseek-ocr project/location resolution itself lives in the open-sse handler
 * (resolveVertexOcrBaseUrl) — routes may not import executor implementations directly (see
 * EXECUTOR_IMPORT_RESTRICTION in eslint.config.mjs).
 */
export function resolveOcrCredentials<
  T extends {
    baseUrl?: string;
    apiKey?: string;
    providerSpecificData?: Record<string, unknown>;
  },
>(credentials: T, providerId?: string): T {
  if (credentials?.baseUrl) return credentials;
  const providerSpecificBaseUrl = credentials?.providerSpecificData?.baseUrl;
  if (typeof providerSpecificBaseUrl === "string" && providerSpecificBaseUrl.trim()) {
    return { ...credentials, baseUrl: providerSpecificBaseUrl };
  }
  if (providerId === VERTEX_DEEPSEEK_OCR_PROVIDER_ID) {
    const vertexBaseUrl = resolveVertexOcrBaseUrl(credentials);
    if (vertexBaseUrl) return { ...credentials, baseUrl: vertexBaseUrl };
  }
  return credentials;
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

/** Dispatch one resolved combo target through the matching OCR provider. */
async function dispatchOcrModel(
  body: Record<string, unknown> & { model: string },
  allowedConnections: string[] | null,
  accounting: { apiKeyInfo?: { id?: string; name?: string } | null; startTime: number }
): Promise<Response> {
  const { provider } = parseOcrModel(body.model);
  const resolvedProvider = provider || "mistral";
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    resolvedProvider,
    null,
    allowedConnections
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for provider: ${resolvedProvider}`
    );
  }
  if (isKeyScopeBlockedCredentials(credentials)) {
    return keyScopeBlockedResponse(resolvedProvider, credentials);
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(resolvedProvider, credentials);
  }

  const tokenReadyCredentials = await resolveVertexOcrAccessToken(resolvedProvider, credentials);
  const ocrCredentials = resolveOcrCredentials(tokenReadyCredentials, resolvedProvider);
  const response = await handleOcr({
    body,
    credentials: ocrCredentials,
    onSuccess: (result) =>
      recordOcrRequest({
        ...result,
        apiKeyId: accounting.apiKeyInfo?.id,
        apiKeyName: accounting.apiKeyInfo?.name,
        connectionId:
          "connectionId" in credentials && typeof credentials.connectionId === "string"
            ? credentials.connectionId
            : null,
        startTime: accounting.startTime,
        annotated: Boolean(body.bbox_annotation_format || body.document_annotation_format),
      }),
  });
  if (response?.ok) await clearRecoveredProviderState(credentials);
  return response;
}

/**
 * POST /v1/ocr — document OCR
 * Mistral OCR API compatible.
 */
/** Validate and execute an OCR request, including named combo routing. */
async function postHandler(request, _context) {
  const startTime = Date.now();
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1OcrSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  const model = body.model || "mistral-ocr-latest";

  const endpointMismatch = await getRequestedModelEndpointMismatch(model, "ocr");
  if (endpointMismatch) return errorResponse(HTTP_STATUS.BAD_REQUEST, endpointMismatch);

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, model);
  if (policy.rejection) return policy.rejection;
  // GHSA-3w2r: credential selection stays inside the key's connection scope,
  // the same scope chat applies.
  const scope = await resolveKeyConnectionScope(policy.apiKeyInfo);
  if (scope.rejection) return scope.rejection;
  const routedBody = { ...body, model };
  if (!model.includes("/")) {
    const combo = await getComboByName(model);
    if (combo) {
      return runModelEndpointCombo({
        name: model,
        endpoint: "ocr",
        request,
        body: routedBody,
        policy,
        allowedConnections: scope.allowedConnections,
        dispatch: (targetBody, allowedConnections) =>
          dispatchOcrModel(
            targetBody as Record<string, unknown> & { model: string },
            allowedConnections,
            { apiKeyInfo: policy.apiKeyInfo, startTime }
          ),
      });
    }
  }
  return dispatchOcrModel(routedBody, scope.allowedConnections, {
    apiKeyInfo: policy.apiKeyInfo,
    startTime,
  });
}

export const POST = withInjectionGuard(postHandler);
