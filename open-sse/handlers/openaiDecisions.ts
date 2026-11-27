/**
 * Native OpenAI Decisions proxy (`POST /v1/decisions`, #18838).
 *
 * Forwards one validated Decisions request to the `openai` connection's Decisions endpoint
 * and returns its typed `answers` untouched. The call leaves through the guarded decision
 * transport shared with the `decision` auto-router (#20852): provider outbound guard, no
 * retries, redirects refused, the 5 s timeout ceiling and the 64 KB answer cap. Each attempt
 * carries a fresh `Idempotency-Key`; nothing is replayed automatically.
 *
 * Failures are status-only: no upstream body, URL, key or prompt reaches the response or
 * the call log.
 */
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";
import { MAX_DECISION_TIMEOUT_MS } from "../services/decision/config.ts";
import {
  postDecisionJson,
  type DecisionPostFailure,
  type DecisionTransport,
} from "../services/decision/transport.ts";
import {
  OPENAI_DECISIONS_PROVIDER_ID,
  resolveOpenAiDecisionsUrl,
  type NativeDecisionModel,
  type OpenAiDecisionsRequest,
} from "../services/decision/native/openaiDecisions.ts";

export interface OpenAiDecisionsCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

export interface OpenAiDecisionsProxyOptions {
  /** Public path the client called (`/v1/decisions`). */
  path: string;
  model: NativeDecisionModel;
  body: OpenAiDecisionsRequest;
  credentials: OpenAiDecisionsCredentials;
  /** Test seam; production uses the guarded transport. */
  transport?: DecisionTransport;
}

type DecisionUsage = { input_tokens?: unknown; output_tokens?: unknown };

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function tokenCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

/** Client-facing status for a failed upstream call. */
function failureStatus(failure: DecisionPostFailure): number {
  if (failure.reason === "timeout") return 504;
  if (failure.reason === "http_error" && typeof failure.status === "number") {
    // Client-side problems (bad question, unknown model, rate limit) keep their status;
    // an upstream server error is a bad gateway here.
    return failure.status >= 400 && failure.status < 500 ? failure.status : 502;
  }
  return 502;
}

function failureMessage(failure: DecisionPostFailure): string {
  if (failure.reason === "http_error") {
    return `Decisions upstream returned HTTP ${failure.status ?? "error"}`;
  }
  if (failure.reason === "timeout") return "Decisions upstream timed out";
  if (failure.reason === "invalid_response") {
    return "Decisions upstream answer was not bounded JSON";
  }
  return "Decisions upstream request failed";
}

function logDecisionsCall(
  options: OpenAiDecisionsProxyOptions,
  outcome: { status: number; usage: DecisionUsage | null; error?: string; startTime: number }
): void {
  saveCallLog({
    method: "POST",
    path: options.path,
    status: outcome.status,
    model: options.model.qualified,
    provider: OPENAI_DECISIONS_PROVIDER_ID,
    duration: Date.now() - outcome.startTime,
    tokens: {
      prompt_tokens: tokenCount(outcome.usage?.input_tokens),
      completion_tokens: tokenCount(outcome.usage?.output_tokens),
    },
    connectionId: options.credentials.connectionId || null,
    ...(outcome.error ? { error: outcome.error } : {}),
  }).catch(() => {});
}

export async function handleOpenAiDecisionsProxy(
  options: OpenAiDecisionsProxyOptions
): Promise<Response> {
  const startTime = Date.now();
  const token = options.credentials.apiKey || options.credentials.accessToken;
  if (!token) {
    return errorResponse(
      401,
      `No active credentials for provider: ${OPENAI_DECISIONS_PROVIDER_ID}`
    );
  }
  const url = resolveOpenAiDecisionsUrl(options.credentials.providerSpecificData);
  if (!url) {
    return errorResponse(
      400,
      "The openai connection base URL is not usable for Decisions (http(s) only, no credentials, query or fragment, not this gateway)"
    );
  }

  const result = await postDecisionJson({
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: { ...options.body, model: options.model.upstream },
    timeoutMs: MAX_DECISION_TIMEOUT_MS,
    transport: options.transport,
  });

  if (!result.ok) {
    const failure = result as DecisionPostFailure;
    const status = failureStatus(failure);
    logDecisionsCall(options, { status, usage: null, error: failure.reason, startTime });
    return errorResponse(status, failureMessage(failure));
  }
  const data = result.data;
  if (!isRecord(data) || !Array.isArray(data.answers)) {
    logDecisionsCall(options, { status: 502, usage: null, error: "invalid_response", startTime });
    return errorResponse(502, "Decisions upstream answer had no answers array");
  }

  const usage = isRecord(data.usage) ? (data.usage as DecisionUsage) : null;
  logDecisionsCall(options, { status: 200, usage, startTime });
  const headers = new Headers({
    ...CORS_HEADERS,
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  attachOmniRouteMetaHeaders(headers, {
    provider: OPENAI_DECISIONS_PROVIDER_ID,
    model: options.model.qualified,
    costUsd: 0,
    latencyMs: Date.now() - startTime,
    requestId: generateRequestId(),
  });
  return new Response(JSON.stringify(data), { status: 200, headers });
}
