import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { resolveApiKeyForcedModel } from "@/sse/handlers/apiKeyForcedModel";

export interface BifrostFastPathGate {
  /** A Response the route must return as-is (key disabled, rate-limited, model not allowed, ...). */
  rejection: Response | null;
  /** False when the native pipeline must serve the request (it owns the routing rewrite). */
  allow: boolean;
}

/**
 * Gate the Bifrost fast-path with the same per-key policy the native pipeline applies.
 *
 * The fast-path answers BEFORE `handleChat()`, which is the only place that runs
 * `enforceApiKeyPolicy()` (allowedModels, budget, schedule, rate limit) on the normal
 * path. Without this gate a disabled or over-budget OmniRoute key would be served by
 * the sidecar with the server's own `BIFROST_API_KEY` credential.
 *
 * Two routing rewrites live inside `handleChat()` and are not replicated by the
 * sidecar: the per-key pinned model (`forcedModel`) and the `X-Route-Model` header.
 * When either applies the request is left to the native pipeline (`allow: false`),
 * which also enforces the policy, so it is not enforced twice here.
 *
 * When the gate admits the request and the sidecar then fails with a 5xx, the request
 * falls back to `handleChat()`, which enforces the policy again: a rate-limited key is
 * counted twice for that one request. That is the accepted cost of the fallback and
 * only happens on a sidecar failure.
 */
export async function gateBifrostFastPath(
  request: Request,
  body: Record<string, unknown>
): Promise<BifrostFastPathGate> {
  if (request.headers.get("x-route-model")?.trim()) {
    return { rejection: null, allow: false };
  }
  if (await resolveApiKeyForcedModel(request)) {
    return { rejection: null, allow: false };
  }

  const keyPolicy = await enforceApiKeyPolicy(
    request,
    typeof body.model === "string" ? body.model : null
  );
  if (keyPolicy.rejection) {
    return { rejection: keyPolicy.rejection, allow: false };
  }
  return { rejection: null, allow: true };
}
