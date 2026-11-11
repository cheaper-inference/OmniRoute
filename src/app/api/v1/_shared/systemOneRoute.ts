/**
 * POST/GET handler for /v1/systemone (#13987). Credential selection, rate-limit
 * handling and usage logging mirror /v1/classify (Jina passthrough).
 */

import {
  handleSystemOneProxy,
  type SystemOneCredentials,
} from "@omniroute/open-sse/handlers/systemOne.ts";
import { resolveSystemOneTarget } from "@omniroute/open-sse/config/systemOneRegistry.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  isKeyScopeBlockedCredentials,
  keyScopeBlockedResponse,
  resolveKeyConnectionScope,
} from "@/sse/services/keyConnectionScope";
import { v1SystemOneSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { readDecisionJson } from "@omniroute/open-sse/handlers/decisionTransport.ts";
import { DecisionError, record } from "@omniroute/open-sse/handlers/decisionTypes.ts";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";

function optionsResponse() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/** Decisions models advertised by the unified catalog (type "decisions"). */
export function systemOneModelsGet(pathname: string) {
  return (request?: Request) =>
    getSpecialtyModelsResponse(request, pathname, (model) => {
      if (model.type === "decisions") return true;
      const endpoints = model.supported_endpoints;
      return Array.isArray(endpoints) && endpoints.includes("decisions");
    });
}

async function postHandler(request: Request): Promise<Response> {
  let rawBody: unknown;
  try {
    rawBody = await readDecisionJson(
      request,
      400,
      AbortSignal.any([request.signal, AbortSignal.timeout(10_000)])
    );
  } catch (error) {
    return errorResponse(
      error instanceof DecisionError ? error.status : HTTP_STATUS.BAD_REQUEST,
      "Invalid JSON body"
    );
  }

  // Extend the merged gateway without changing its TypeSafe/OpenRouter wire contract.
  // Unknown qualified providers use the native decision adapter and its stricter admission.
  const requestedModel = record(rawBody).model;
  if (
    typeof requestedModel === "string" &&
    requestedModel.includes("/") &&
    !resolveSystemOneTarget(requestedModel)
  ) {
    const { postDecision } = await import("./decisionRuntime");
    return postDecision(
      new Request(request.url, {
        method: "POST",
        headers: request.headers,
        signal: request.signal,
        body: JSON.stringify(rawBody),
      }),
      "systemone"
    );
  }

  return postLegacySystemOne(request, rawBody);
}

async function postLegacySystemOne(request: Request, rawBody: unknown): Promise<Response> {
  const validation = validateBody(v1SystemOneSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;
  const model = typeof body.model === "string" ? body.model.trim() : undefined;

  const target = resolveSystemOneTarget(model);
  if (!target) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Unknown decisions model: ${model ?? "(missing)"}. Use "typesafe/<model>", ` +
        `a bare jev-* alias, or "openrouter/<vendor>/<model>" for OpenRouter-hosted decisions models.`
    );
  }

  const policy = await enforceApiKeyPolicy(request, model ?? target.upstreamModel);
  if (policy.rejection) return policy.rejection;

  // GHSA-3w2r: credential selection stays inside the key's connection scope,
  // the same scope /v1/classify and chat apply.
  const scope = await resolveKeyConnectionScope(policy.apiKeyInfo);
  if (scope.rejection) return scope.rejection;

  const credentials = await getProviderCredentialsWithQuotaPreflight(
    target.provider,
    null,
    scope.allowedConnections
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No active credentials for provider: ${target.provider}`
    );
  }
  if (isKeyScopeBlockedCredentials(credentials)) {
    return keyScopeBlockedResponse(target.provider, credentials);
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(target.provider, credentials);
  }

  const response = await handleSystemOneProxy({
    path: new URL(request.url).pathname,
    target,
    body,
    // The key-scope-blocked and all-rate-limited sentinels were refused above;
    // what is left is a real credential record.
    credentials: credentials as SystemOneCredentials,
    requestedModel: model ?? null,
  });
  if (response.ok) {
    await clearRecoveredProviderState(credentials);
  }
  return response;
}

export function createSystemOneRouteHandlers(pathname: string) {
  return {
    OPTIONS: optionsResponse,
    GET: systemOneModelsGet(pathname),
    POST: withInjectionGuard(postHandler),
  };
}
