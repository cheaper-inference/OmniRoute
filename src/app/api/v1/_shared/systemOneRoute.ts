/**
 * POST/GET handler for /v1/systemone (#13987). Credential selection, rate-limit
 * handling and usage logging mirror /v1/classify (Jina passthrough).
 */

import {
  handleSystemOneProxy,
  type SystemOneCredentials,
} from "@omniroute/open-sse/handlers/systemOne.ts";
import {
  resolveSystemOneTarget,
  type SystemOneTarget,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { errorResponse, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
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
import { buildOllamaSystemOneUrl } from "@/app/api/v1/_shared/systemOneOllamaUrl";
import {
  isSystemOneCloudflareBackendEnabled,
  isSystemOneOllamaLocalBackendEnabled,
} from "@/shared/utils/featureFlags";

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

/**
 * Decisions backend for the request model, or the 400 to return: unknown model,
 * or a Cloudflare (#16676) / local Ollama (#14667) model while that backend's
 * default-off flag is off.
 */
function resolveEnabledTarget(
  model: string | undefined
): { target: SystemOneTarget } | { rejection: Response } {
  const target = resolveSystemOneTarget(model);
  if (!target) {
    return {
      rejection: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Unknown decisions model: ${model ?? "(missing)"}. Use "typesafe/<model>", ` +
          `a bare jev-* alias, "openrouter/<vendor>/<model>" for OpenRouter-hosted decisions models, ` +
          `"cloudflare-ai/<jev|clef|clef-flash>" for Cloudflare Workers AI ` +
          `(needs the SYSTEMONE_CLOUDFLARE_BACKEND_ENABLED feature flag), ` +
          `or "ollama-local/<model>" for a local Ollama ` +
          `(needs the SYSTEMONE_OLLAMA_LOCAL_BACKEND_ENABLED feature flag).`
      ),
    };
  }
  if (target.backend === "cloudflare" && !isSystemOneCloudflareBackendEnabled()) {
    return {
      rejection: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Decisions model ${model} needs the Cloudflare Workers AI backend, which is off. ` +
          `Enable the SYSTEMONE_CLOUDFLARE_BACKEND_ENABLED feature flag to use it.`
      ),
    };
  }
  if (target.backend === "ollama-local" && !isSystemOneOllamaLocalBackendEnabled()) {
    return {
      rejection: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Decisions model ${model} needs the local Ollama backend, which is off. ` +
          `Enable the SYSTEMONE_OLLAMA_LOCAL_BACKEND_ENABLED feature flag to use it.`
      ),
    };
  }
  return { target };
}

/**
 * Backends whose URL depends on the selected connection: `ollama-local` (#14667) posts
 * to that connection's base URL, never to a request field.
 */
function bindConnectionUrl(
  target: SystemOneTarget,
  credentials: SystemOneCredentials
): { target: SystemOneTarget } | { rejection: Response } {
  if (target.backend !== "ollama-local") return { target };
  try {
    const upstreamUrl = buildOllamaSystemOneUrl(credentials.providerSpecificData?.baseUrl);
    return { target: { ...target, upstreamUrl } };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    return {
      rejection: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Invalid ollama-local base URL: ${sanitizeErrorMessage(raw)}`
      ),
    };
  }
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

  const resolved = resolveEnabledTarget(model);
  if ("rejection" in resolved) return resolved.rejection;
  const { target } = resolved;

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

  // The key-scope-blocked and all-rate-limited sentinels were refused above;
  // what is left is a real credential record.
  const bound = bindConnectionUrl(target, credentials as SystemOneCredentials);
  if ("rejection" in bound) return bound.rejection;

  const response = await handleSystemOneProxy({
    path: new URL(request.url).pathname,
    target: bound.target,
    body,
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
