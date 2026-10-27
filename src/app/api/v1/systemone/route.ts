/**
 * `POST /v1/systemone` — typed decision requests (System One / Jev).
 *
 * A System One model answers `noul` / `choice` / `score` questions with
 * calibrated probabilities instead of text, so this route is deliberately NOT a
 * chat path: no translation, no streaming, no combo expansion. It validates the
 * envelope, resolves the client's model id into ordered `(provider, model)`
 * candidates, and hands the attempt loop to `./dispatch.ts`, which selects
 * credentials from the normal provider connection store and dispatches through
 * `handleSystemOneProxy` (call log, usage, cost and cooldown all go through the
 * existing writers).
 *
 * Gate order — authentication runs before any API-key policy, because the
 * policy layer intentionally allows keyless local mode and assumes the route
 * already rejected an invalid key.
 *
 * Nothing on this path logs the request body: a decision `state` is routinely
 * the operator's own data, and no error message echoes it back either.
 */

import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import {
  enforceApiKeyPolicy,
  revalidateApiKeyPolicy,
  validateApiKeyRoutingTarget,
} from "@/shared/utils/apiKeyPolicy";
import { v1SystemOneSchema } from "@/shared/validation/schemas";
import {
  isValidationFailure,
  validateBody,
  type ValidationResult,
} from "@/shared/validation/helpers";
import { validateSystemOneRequestBody } from "@omniroute/open-sse/services/typesafe/systemOneAnswers.ts";
import {
  isSystemOneProvider,
  resolveSystemOneCandidates,
  SystemOneTargetError,
  type SystemOneCandidate,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { resolveIncomingCorrelationId } from "@/shared/utils/correlationPreserve.ts";
import { getProviderConnections } from "@/lib/db/providers";
import {
  readRequestBodyWithLimit,
  RequestBodyTooLargeError,
} from "@/shared/middleware/bodySizeGuard";
import { JEV_SYSTEMONE_LIMITS } from "@omniroute/open-sse/config/systemOneRegistry.ts";
import * as log from "@/sse/utils/logger";

import { dispatchSystemOne } from "./dispatch.ts";

import { rejectNativeManagedLease } from "@omniroute/open-sse/handlers/systemOneLease.ts";

export const dynamic = "force-dynamic";

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

/** Name the offending field without reproducing the value it was rejected for. */
function invalidEnvelopeResponse(validation: ValidationResult<unknown>): Response {
  if (!isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid request");
  }
  const [detail] = validation.error.details;
  return errorResponse(
    HTTP_STATUS.BAD_REQUEST,
    detail?.field ? `${detail.field}: ${detail.message}` : validation.error.message
  );
}

/**
 * Backends a bare alias may fan out to: only those this installation has an
 * active connection for. Without it an unconfigured backend would consume one
 * of the bounded candidate slots and the caller would get a per-provider "no
 * connection" error instead of "configure one of these".
 *
 * A failed read restricts nothing — the credential selector still gates every
 * candidate, so the worst case is a wasted candidate slot, not a wrong backend.
 */
async function configuredSystemOneProviders(): Promise<string[] | null> {
  try {
    const connections = (await getProviderConnections({ isActive: true })) as Array<{
      provider?: unknown;
    }>;
    const providers = new Set<string>();
    for (const connection of connections) {
      if (typeof connection.provider === "string" && isSystemOneProvider(connection.provider)) {
        providers.add(connection.provider);
      }
    }
    return [...providers];
  } catch (error) {
    log.warn(
      "SYSTEMONE",
      `Could not read configured backends; allowing the full candidate chain: ${sanitizeErrorMessage(error)}`
    );
    return null;
  }
}

function resolveCandidates(
  model: string,
  availableProviders: string[] | null
): SystemOneCandidate[] | Response {
  try {
    return resolveSystemOneCandidates(model, { availableProviders });
  } catch (error) {
    const status = error instanceof SystemOneTargetError ? error.status : HTTP_STATUS.BAD_REQUEST;
    return errorResponse(status, sanitizeErrorMessage(error));
  }
}

export async function POST(request: Request): Promise<Response> {
  let rawBody: unknown;
  try {
    const bytes = await readRequestBodyWithLimit(request, JEV_SYSTEMONE_LIMITS.maxBodyBytes);
    rawBody = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError)
      return errorResponse(413, "System One request body exceeds the byte budget");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1SystemOneSchema, rawBody);
  if (isValidationFailure(validation)) return invalidEnvelopeResponse(validation);

  // The envelope gate above proves the shape; this proves the typed-decision
  // contract (question types and their criteria) before a credential is spent.
  const envelope = validateSystemOneRequestBody(validation.data);
  if (envelope.ok === false) return errorResponse(envelope.status, envelope.message);

  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  const body = validation.data as Record<string, unknown>;
  const requestedModel = String(body.model).trim();

  // Covers the model rules, budget, quota and the `systemone` endpoint category.
  const policy = await enforceApiKeyPolicy(request, requestedModel);
  if (policy.rejection) return policy.rejection;
  const leaseRejection = rejectNativeManagedLease(request, policy.apiKeyInfo);
  if (leaseRejection) return leaseRejection;

  const candidates = resolveCandidates(requestedModel, await configuredSystemOneProviders());
  if (candidates instanceof Response) return candidates;

  const allowedConnections = policy.apiKeyInfo?.allowedConnections?.length
    ? policy.apiKeyInfo.allowedConnections
    : null;

  return dispatchSystemOne(
    {
      candidates,
      body,
      requestedModel,
      allowedConnections,
      apiKeyInfo: policy.apiKeyInfo
        ? { id: policy.apiKeyInfo.id, name: policy.apiKeyInfo.name }
        : null,
      correlationId: resolveIncomingCorrelationId(request.headers.get("x-correlation-id")),
      signal: request.signal,
    },
    {
      // Routing resolved the caller's id onto one or more canonical
      // `<provider>/<model>` ids; re-check each against the key's rules without
      // consuming budget, token or rate-limit state a second time.
      validateRoutingTarget: (canonicalModel) =>
        validateApiKeyRoutingTarget(request, policy.apiKey, policy.apiKeyInfo, canonicalModel),
      authorizeAttempt: async (candidate, credentials) => {
        const fresh = await revalidateApiKeyPolicy(request, candidate.canonicalModel);
        if (fresh.rejection) return fresh.rejection;
        if (policy.apiKeyInfo && fresh.apiKeyInfo?.id !== policy.apiKeyInfo.id) {
          return errorResponse(401, "API key is no longer available");
        }
        const managed = rejectNativeManagedLease(request, fresh.apiKeyInfo);
        if (managed) return managed;
        const allowed = fresh.apiKeyInfo?.allowedConnections;
        if (credentials && allowed?.length && !allowed.includes(credentials.connectionId ?? "")) {
          return errorResponse(403, "The selected connection is excluded by this API key");
        }
        return null;
      },
    }
  );
}
