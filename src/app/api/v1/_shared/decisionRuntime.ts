import {
  createDecisionGateway,
  type DecisionAttempt,
  type DecisionGatewayRuntime,
} from "@omniroute/open-sse/handlers/decisionGateway.ts";
import { fetchDecision } from "@omniroute/open-sse/handlers/decisionTransport.ts";
import {
  DecisionError,
  type DecisionCredentials,
} from "@omniroute/open-sse/handlers/decisionTypes.ts";
import { resolveDecisionBackend } from "@omniroute/open-sse/config/decisionRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import {
  extractApiKey,
  isValidApiKey,
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
  markAccountUnavailable,
} from "@/sse/services/auth";
import { enforceApiKeyPolicy, type ApiKeyMetadata } from "@/shared/utils/apiKeyPolicy";
import {
  resolveKeyConnectionScope,
  isKeyScopeBlockedCredentials,
} from "@/sse/services/keyConnectionScope";
import { isAllRateLimitedCredentials } from "./rateLimit";
import { resolveProviderId } from "@/shared/constants/providers";
import { saveCallLog } from "@/lib/usage/callLogs";
import { saveRequestUsage } from "@/lib/usage/usageHistory";

const keys = new WeakMap<Request, ApiKeyMetadata | null>();

export async function authorizeDecision(request: Request, model: string): Promise<Response | null> {
  const apiKey = extractApiKey(request, { allowUrl: false });
  if (!apiKey || !(await isValidApiKey(apiKey)))
    return errorResponse(401, "Valid OmniRoute API key required");
  if (!model) return null;
  const policy = await enforceApiKeyPolicy(request, model);
  if (policy.rejection) return policy.rejection;
  keys.set(request, policy.apiKeyInfo);
  return null;
}

async function selectDecision(request: Request, provider: string, model: string) {
  const scope = await resolveKeyConnectionScope(keys.get(request));
  if (scope.rejection) throw new DecisionError(403, "connection_scope_denied");
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    resolveProviderId(provider),
    null,
    scope.allowedConnections,
    model
  );
  if (!credentials) throw new DecisionError(503, "no_active_connection");
  if (isKeyScopeBlockedCredentials(credentials))
    throw new DecisionError(403, "connection_scope_denied");
  if (isAllRateLimitedCredentials(credentials)) throw new DecisionError(429, "provider_cooldown");
  return {
    backend: {
      ...resolveDecisionBackend(resolveProviderId(provider), credentials as DecisionCredentials),
      provider,
    },
    credentials: credentials as DecisionCredentials,
  };
}

async function observeDecision(request: Request, attempt: DecisionAttempt): Promise<void> {
  const key = keys.get(request);
  const tokens: Record<string, number> | null = attempt.usage ? {} : null;
  for (const name of [
    "input_tokens",
    "output_tokens",
    "total_tokens",
    "prompt_tokens",
    "completion_tokens",
  ]) {
    const value = attempt.usage?.[name];
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) tokens[name] = value;
  }
  if (tokens && attempt.cost !== null) tokens.cost_usd = attempt.cost;
  // Metadata only. Never pass state, questions, request or response into the artifact logger.
  await saveCallLog({
    method: "POST",
    path: attempt.endpoint,
    status: attempt.status,
    provider: attempt.provider,
    model: attempt.model,
    duration: attempt.latencyMs,
    connectionId: attempt.connectionId,
    apiKeyId: key?.id,
    apiKeyName: key?.name,
    correlationId: attempt.requestId,
    tokens,
    error: attempt.failure,
    errorType: attempt.failure,
  });
  await saveRequestUsage(
    {
      provider: attempt.provider,
      model: attempt.model,
      endpoint: attempt.endpoint,
      status: String(attempt.status),
      success: attempt.status === 200,
      tokens,
      serviceTier: "decision-native",
      latencyMs: attempt.latencyMs,
      connectionId: attempt.connectionId,
      apiKeyId: key?.id,
      apiKeyName: key?.name,
      errorCode: attempt.failure,
    },
    { deduplicate: false }
  );
}

async function feedbackDecision(credentials: DecisionCredentials, attempt: DecisionAttempt) {
  if (attempt.status === 200) await clearRecoveredProviderState(credentials);
  else if (credentials.connectionId && attempt.failure?.startsWith("upstream_http_")) {
    await markAccountUnavailable(
      credentials.connectionId,
      attempt.status,
      `Decision upstream HTTP ${attempt.status}`,
      attempt.provider,
      attempt.model,
      null,
      { correlationId: attempt.requestId }
    );
  }
}

export const decisionRuntime: DecisionGatewayRuntime = {
  authorize: authorizeDecision,
  select: selectDecision,
  fetch: fetchDecision,
  observe: observeDecision,
  feedback: feedbackDecision,
  error: errorResponse,
};
export const postDecision = createDecisionGateway(decisionRuntime);
