/**
 * Gemini Decision 1 account selection, quota handling and response workflow.
 * The HTTP route performs request validation and caller-key scope admission.
 */
import { CORS_HEADERS } from "@/shared/utils/cors";
import { unusableCredentialsResponse } from "@/app/api/v1/_shared/keyScopedRoute";
import {
  getProviderCredentialsWithQuotaPreflight,
  markAccountUnavailable,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import type { GeminiDecisionsBody } from "@/shared/validation/schemas/geminiDecisions";
import {
  GEMINI_DECISION_MODEL, GEMINI_DECISION_PUBLIC_MODEL,
} from "@/shared/validation/schemas/geminiDecisions";
import { getProviderConnections } from "@/lib/db/providers";
import { saveCallLog } from "@/lib/usageDb";
import { recordUnpricedBudgetUsage } from "@/domain/costRules";
import { recordKeyQuotaUsage } from "@/domain/keyQuota";
import { recordTokenUsage } from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import { generateRequestId } from "@/shared/utils/requestId";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { errorResponse, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  executeGeminiDecision, geminiDecisionErrorText, geminiDecisionInputTokens,
} from "./geminiDecisions.ts";
import type { GeminiDecisionTransportResult } from "./geminiDecisions.ts";

const PROVIDER = "gemini";
const MAX_UPSTREAM_ATTEMPTS = 4;
const TOTAL_DEADLINE_MS = 45_000;
const RETRYABLE_STATUS = new Set([401, 402, 403, 408, 429, 500, 502, 503, 504]);

type AllowedConnections = Parameters<typeof getProviderCredentialsWithQuotaPreflight>[2];
type Credential = {
  apiKey?: string | null;
  connectionId?: string | null;
  projectId?: string | null;
  id?: string | null;
  testStatus?: string | null;
  lastErrorAt?: string | null;
  rateLimitedUntil?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

type FailureState = {
  attempts: number;
  status: number;
  message: string;
  retryAfter: string | null;
  code: string | null;
};

function projectIdOf(credentials: Credential): string | null {
  const data = credentials.providerSpecificData;
  const possible = credentials.projectId || data?.googleProjectId || data?.projectId;
  return typeof possible === "string" && possible.trim() ? possible.trim() : null;
}

/** Quota is Google-project scoped. Sibling keys must not consume the retry budget. */
async function excludeProjectSiblings(project: string, excluded: Set<string>): Promise<void> {
  try {
    const connections = await getProviderConnections({ provider: PROVIDER });
    for (const connection of connections) {
      const sibling = connection as Credential;
      if (projectIdOf(sibling) === project && sibling.id) excluded.add(sibling.id);
    }
  } catch {
    // The selection loop still excludes each selected connection permanently.
  }
}

function jsonSuccess(body: Record<string, unknown>, duration: number, attempts: number): Response {
  const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider: PROVIDER,
    model: GEMINI_DECISION_MODEL,
    usage: { input: geminiDecisionInputTokens(body), output: 0 },
    latencyMs: duration,
    requestId: generateRequestId(),
  });
  // Token counts are not a dollar charge; never claim the cost was zero.
  headers.delete(OMNIROUTE_RESPONSE_HEADERS.responseCost);
  headers.set("X-OmniRoute-Decisions-Attempts", String(attempts));
  return new Response(JSON.stringify(body), { status: 200, headers });
}

function logAttempt(
  response: GeminiDecisionTransportResult,
  credentials: Credential,
  error: string | null
): void {
  void saveCallLog({
    method: "POST",
    path: "/v1/decisions",
    status: response.status,
    model: GEMINI_DECISION_PUBLIC_MODEL,
    provider: PROVIDER,
    duration: response.latencyMs,
    connectionId: credentials.connectionId || null,
    tokens: { prompt_tokens: geminiDecisionInputTokens(response.body), completion_tokens: 0 },
    ...(error ? { error: sanitizeErrorMessage(error).slice(0, 400) } : {}),
  }).catch(() => {});
}

function recordFailure(
  state: FailureState, response: GeminiDecisionTransportResult, error: string | null
): void {
  state.status = response.status;
  state.message = error ? sanitizeErrorMessage(error).slice(0, 350)
    : "Google Decisions returned HTTP " + response.status;
  state.retryAfter = response.headers.get("retry-after");
  const upstreamError = response.body?.error;
  state.code = upstreamError && typeof upstreamError === "object" &&
    !Array.isArray(upstreamError) &&
    typeof (upstreamError as Record<string, unknown>).code === "string"
      ? (upstreamError as Record<string, string>).code : null;
}

function finalFailure(state: FailureState): Response {
  const retryAfter = state.retryAfter && /^\d+(?:\.\d+)?$/.test(state.retryAfter)
    ? Number(state.retryAfter) : undefined;
  return errorResponse(state.status, state.message, {
    retryAfter,
    code: state.code ?? undefined,
  });
}

async function markFailedCredential(
  credentials: Credential,
  response: GeminiDecisionTransportResult,
  message: string,
  exhaustedProjects: Set<string>,
  tried: Set<string>
): Promise<void> {
  const project = projectIdOf(credentials);
  if (project && response.status === 429) {
    exhaustedProjects.add(project);
    await excludeProjectSiblings(project, tried);
  }
  if (credentials.connectionId && credentials.connectionId !== "env:GEMINI_API_KEY") {
    try {
      await markAccountUnavailable(
        credentials.connectionId, response.status, message, PROVIDER,
        GEMINI_DECISION_MODEL, null, { headers: response.headers }
      );
    } catch {
      // Local retry exclusion still applies if persisting cooldown fails.
    }
  }
}

type AttemptResult =
  | { kind: "response"; response: Response }
  | { kind: "continue" }
  | { kind: "stop" };

type AttemptContext = {
  body: GeminiDecisionsBody;
  selected: unknown;
  state: FailureState;
  tried: Set<string>;
  exhaustedProjects: Set<string>;
  signal: AbortSignal;
  started: number;
  remaining: number;
  apiKeyId: string | null;
};

/** One selected connection is either dispatched once, skipped, or stopped. */
async function attemptDecision(context: AttemptContext): Promise<AttemptResult> {
  const { body, selected, state, tried, exhaustedProjects, signal, started, remaining, apiKeyId } = context;
  const unavailable = unusableCredentialsResponse(PROVIDER, selected);
  if (unavailable) {
    return {
      kind: "response",
      response: state.attempts === 0 ? unavailable : finalFailure(state),
    };
  }

  const credentials = selected as Credential;
  const connectionId = credentials.connectionId;
  if (!connectionId || tried.has(connectionId) || !credentials.apiKey) return { kind: "stop" };
  tried.add(connectionId);
  const project = projectIdOf(credentials);
  if (project && exhaustedProjects.has(project)) return { kind: "continue" };

  state.attempts++;
  const recoverySnapshot = {
    testStatus: credentials.testStatus ?? null,
    lastErrorAt: credentials.lastErrorAt ?? null,
    rateLimitedUntil: credentials.rateLimitedUntil ?? null,
  };
  const response = await executeGeminiDecision({
    model: body.model, input: body.input, questions: body.questions,
  }, credentials.apiKey, {
    signal,
    timeoutMs: Math.min(20_000, remaining),
  });
  const error = response.transportError || geminiDecisionErrorText(response.body);
  logAttempt(response, credentials, error);
  if (response.status === 200 && response.body) {
    // A Decisions response is metered upstream, but we have no verified USD
    // price for this model. Fail closed for limited dollar budgets instead of
    // silently treating it as a free inference call.
    if (apiKeyId) {
      const tokens = geminiDecisionInputTokens(response.body);
      recordKeyQuotaUsage(apiKeyId, tokens);
      recordTokenUsage(apiKeyId, PROVIDER, GEMINI_DECISION_PUBLIC_MODEL, tokens, started);
      recordUnpricedBudgetUsage(apiKeyId, {
        provider: PROVIDER,
        model: GEMINI_DECISION_PUBLIC_MODEL,
      });
    }
    try {
      await clearRecoveredProviderState(credentials, recoverySnapshot);
    } catch {
      // A failed state cleanup must never hide the successful upstream answer.
    }
    return { kind: "response", response: jsonSuccess(response.body, Date.now() - started, state.attempts) };
  }
  if (response.status === 499) {
    return { kind: "response", response: errorResponse(499, "Client request cancelled") };
  }

  recordFailure(state, response, error);
  if (!RETRYABLE_STATUS.has(response.status)) return { kind: "stop" };
  await markFailedCredential(credentials, response, state.message, exhaustedProjects, tried);
  return { kind: "continue" };
}

/**
 * Google quota is project-scoped: retrying sibling keys cannot recover
 * capacity. Every selection uses the caller API key's allowed connection IDs.
 */
export async function handleGeminiDecisionRequest(
  body: GeminiDecisionsBody, allowedConnections: AllowedConnections, signal: AbortSignal,
  apiKeyId: string | null = null
): Promise<Response> {
  const started = Date.now();
  const tried = new Set<string>();
  const exhaustedProjects = new Set<string>();
  const state: FailureState = {
    attempts: 0,
    status: 503,
    message: "No eligible Gemini credentials for Decisions API",
    retryAfter: null,
    code: null,
  };

  while (state.attempts < MAX_UPSTREAM_ATTEMPTS) {
    if (signal.aborted) return errorResponse(499, "Client request cancelled");
    const remaining = TOTAL_DEADLINE_MS - (Date.now() - started);
    if (remaining <= 0) break;
    const selected = await getProviderCredentialsWithQuotaPreflight(
      PROVIDER, null, allowedConnections, GEMINI_DECISION_MODEL,
      { excludeConnectionIds: Array.from(tried) }
    );
    if (!selected) break;
    const outcome = await attemptDecision({
      body, selected, state, tried, exhaustedProjects, signal, started, remaining, apiKeyId,
    });
    if (outcome.kind === "response") return outcome.response;
    if (outcome.kind === "stop") break;
  }
  return finalFailure(state);
}
