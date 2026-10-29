/**
 * GHSA-3w2r: the two steps every direct /v1 route repeats to stay inside the
 * caller API key's connection scope, so each route answers with one check
 * instead of two (see `src/sse/services/keyConnectionScope.ts` for the rule).
 */
import { enforceApiKeyPolicy, type ApiKeyPolicyResult } from "@/shared/utils/apiKeyPolicy";
import {
  isKeyScopeBlockedCredentials,
  keyScopeBlockedResponse,
  resolveKeyConnectionScope,
} from "@/sse/services/keyConnectionScope";
import { isAllRateLimitedCredentials, rateLimitedProviderResponse } from "./rateLimit";

export interface ScopedApiKeyPolicy {
  policy: ApiKeyPolicyResult;
  /** Connection ids the key may use; null = the key is not connection-scoped. */
  allowedConnections: string[] | null;
  /** The policy rejection, or the key-scope refusal (chat's 503 for an empty scope). */
  rejection: Response | null;
}

/** `enforceApiKeyPolicy`, then the key's connection scope computed the way chat does. */
export async function enforceApiKeyPolicyWithScope(
  request: Request,
  modelStr: string | null,
  options?: Parameters<typeof enforceApiKeyPolicy>[2]
): Promise<ScopedApiKeyPolicy> {
  const policy = await enforceApiKeyPolicy(request, modelStr, options);
  if (policy.rejection) return { policy, allowedConnections: null, rejection: policy.rejection };
  const scope = await resolveKeyConnectionScope(policy.apiKeyInfo);
  return { policy, allowedConnections: scope.allowedConnections, rejection: scope.rejection };
}

/**
 * The answer for a credential selection that must not be dispatched: chat's 403
 * when the key's scope hid every connection (#13832), the provider's 429 when
 * every account is rate limited. Null when the selection may be used.
 */
export function unusableCredentialsResponse(
  provider: string,
  credentials: unknown
): Response | null {
  if (isKeyScopeBlockedCredentials(credentials)) {
    return keyScopeBlockedResponse(provider, credentials);
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(provider, credentials);
  }
  return null;
}
