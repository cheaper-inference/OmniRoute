/**
 * POST /v1/decisions — native OpenAI Decisions (#18838).
 *
 * CORS preflight → bounded body read → Zod → model resolution → API key policy (model
 * allowlist, endpoint category, budget and usage limits) → connection scope → scoped
 * credential selection with quota preflight → handler. Credential and scope handling mirror
 * /v1/systemone; the credential record comes from the shared decision credential resolver
 * (stored connection inside the key's allowlist, never the environment key).
 */
import { handleOpenAiDecisionsProxy } from "@omniroute/open-sse/handlers/openaiDecisions.ts";
import {
  MAX_DECISIONS_REQUEST_BYTES,
  OPENAI_DECISIONS_PROVIDER_ID,
  openAiDecisionsRequestSchema,
  resolveOpenAiDecisionModel,
} from "@omniroute/open-sse/services/decision/native/openaiDecisions.ts";
import { resolveDecisionConnectionCredentials } from "@omniroute/open-sse/services/decision/credentials.ts";
import {
  readBoundedJson,
  type DecisionTransport,
} from "@omniroute/open-sse/services/decision/transport.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  isKeyScopeBlockedCredentials,
  keyScopeBlockedResponse,
  resolveKeyConnectionScope,
} from "@/sse/services/keyConnectionScope";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";

function optionsResponse() {
  return new Response(null, { headers: CORS_HEADERS });
}

function tooLargeResponse(): Response {
  return errorResponse(
    HTTP_STATUS.PAYLOAD_TOO_LARGE,
    `Decisions request body exceeds ${MAX_DECISIONS_REQUEST_BYTES} bytes`
  );
}

/** Refuse a declared oversized body before anything (the injection guard included) reads it. */
function withDeclaredSizeLimit(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    const declared = Number(request.headers.get("content-length"));
    if (Number.isFinite(declared) && declared > MAX_DECISIONS_REQUEST_BYTES) {
      await request.body?.cancel().catch(() => {});
      return tooLargeResponse();
    }
    return handler(request);
  };
}

async function readRequestBody(request: Request): Promise<{ body: unknown } | Response> {
  try {
    return { body: await readBoundedJson(request, MAX_DECISIONS_REQUEST_BYTES) };
  } catch (error) {
    if (error instanceof Error && error.message === "oversized") return tooLargeResponse();
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }
}

export interface DecisionsRouteDeps {
  /** Test seam; production leaves through the guarded decision transport. */
  transport?: DecisionTransport;
}

async function postHandler(request: Request, deps: DecisionsRouteDeps): Promise<Response> {
  const read = await readRequestBody(request);
  if (read instanceof Response) return read;

  const validation = validateBody(openAiDecisionsRequestSchema, read.body);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;
  const model = resolveOpenAiDecisionModel(body.model);
  if (!model) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Unknown Decisions model: ${body.model}. POST /v1/decisions serves "openai/gpt-6-luna"; ` +
        `System One models (typesafe/…, jev-*, openrouter/…) use POST /v1/systemone.`
    );
  }

  // Key policy before any credential is read: model allowlist, endpoint category, budget.
  const policy = await enforceApiKeyPolicy(request, model.qualified);
  if (policy.rejection) return policy.rejection;
  const scope = await resolveKeyConnectionScope(policy.apiKeyInfo);
  if (scope.rejection) return scope.rejection;

  const credentials = await resolveDecisionConnectionCredentials(
    { provider: OPENAI_DECISIONS_PROVIDER_ID, apiKeyAllowedConnections: scope.allowedConnections },
    {
      getCredentials: (provider, allowlist) =>
        getProviderCredentialsWithQuotaPreflight(provider, null, allowlist, model.upstream),
    }
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No active credentials for provider: ${OPENAI_DECISIONS_PROVIDER_ID}`
    );
  }
  if (isKeyScopeBlockedCredentials(credentials)) {
    return keyScopeBlockedResponse(OPENAI_DECISIONS_PROVIDER_ID, credentials);
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(OPENAI_DECISIONS_PROVIDER_ID, credentials);
  }

  const response = await handleOpenAiDecisionsProxy({
    path: new URL(request.url).pathname,
    model,
    body,
    credentials: credentials as Parameters<typeof handleOpenAiDecisionsProxy>[0]["credentials"],
    transport: deps.transport,
  });
  if (response.ok) await clearRecoveredProviderState(credentials);
  return response;
}

export function createDecisionsRouteHandlers(deps: DecisionsRouteDeps = {}) {
  return {
    OPTIONS: optionsResponse,
    POST: withDeclaredSizeLimit(
      withInjectionGuard((request: Request) => postHandler(request, deps))
    ),
  };
}
