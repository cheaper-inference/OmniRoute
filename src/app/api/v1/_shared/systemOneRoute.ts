/**
 * Shared POST/GET handler for /v1/systemone and /v1/decisions (#13987).
 *
 * Both paths serve the identical System One decisions contract; /v1/decisions
 * exists so OpenRouter-alpha-shaped clients keep working against the gateway
 * base URL unchanged. Credential selection, rate-limit handling and usage
 * logging mirror /v1/classify (Jina passthrough).
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
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

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
