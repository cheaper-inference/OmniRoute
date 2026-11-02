/**
 * System One decisions proxy (#13987).
 *
 * POST /v1/systemone forwards one typed-decision request — a `state` plus a
 * map of `questions` (`noul` / `choice` / `score`) — to the backend selected by
 * resolveSystemOneTarget. Both backends share the same request/response wire
 * shape, so the proxy is a model-rewriting passthrough: answers, calibrated
 * probabilities and usage (input/output tokens, cost) flow through untouched.
 * Decisions models are NOT chat models —
 * decisions-tagged models are excluded from chat pickers by the shared
 * classification (classifyModelSupportedEndpoints).
 *
 * Follows the same credential, rate-limit and call-log contract as
 * handleJinaFoundationProxy (POST /v1/classify).
 */

import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";
import type { SystemOneTarget } from "../config/systemOneRegistry.ts";

export interface SystemOneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
}

export interface SystemOneProxyOptions {
  /** Public path the client called ("/v1/systemone"). */
  path: string;
  target: SystemOneTarget;
  body: {
    state?: unknown;
    questions?: unknown;
  } & Record<string, unknown>;
  credentials: SystemOneCredentials | null;
  /** Client-requested model id (for logs when upstream reports none). */
  requestedModel?: string | null;
  fetchImpl?: typeof fetch;
}

interface SystemOneUpstreamResponse {
  model?: string;
  answers?: unknown;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    cost?: number;
  };
  error?: { message?: string } | string;
  message?: string;
}

function parseUpstreamBody(text: string): SystemOneUpstreamResponse | null {
  try {
    return text ? (JSON.parse(text) as SystemOneUpstreamResponse) : null;
  } catch {
    return { error: text.slice(0, 500) };
  }
}

function upstreamErrorMessage(parsed: SystemOneUpstreamResponse | null): string | undefined {
  const { message, error } = parsed ?? {};
  return message || (typeof error === "string" ? error : error?.message);
}

function buildSuccessResponse(
  parsed: SystemOneUpstreamResponse | null,
  meta: { provider: string; model: string; cost: unknown; startTime: number }
): Response {
  const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider: meta.provider,
    model: meta.model,
    costUsd: typeof meta.cost === "number" ? meta.cost : 0,
    latencyMs: Date.now() - meta.startTime,
    requestId: generateRequestId(),
  });
  return new Response(JSON.stringify(parsed), { status: 200, headers });
}

function postDecision(options: SystemOneProxyOptions, token: string): Promise<Response> {
  const fetchImpl: typeof fetch = options.fetchImpl ?? fetch;
  return fetchImpl(options.target.upstreamUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: options.target.upstreamModel,
      state: options.body.state,
      questions: options.body.questions,
    }),
  });
}

function logDecisionCall(
  options: SystemOneProxyOptions,
  outcome: {
    status: number;
    ok: boolean;
    model: string;
    usage: SystemOneUpstreamResponse["usage"];
    error: string;
    startTime: number;
  }
): void {
  saveCallLog({
    method: "POST",
    path: options.path,
    status: outcome.status,
    model: outcome.model,
    provider: options.target.provider,
    duration: Date.now() - outcome.startTime,
    tokens: {
      prompt_tokens: outcome.usage?.input_tokens ?? 0,
      completion_tokens: outcome.usage?.output_tokens ?? 0,
    },
    connectionId: options.credentials?.connectionId || null,
    ...(outcome.ok ? {} : { error: outcome.error }),
  }).catch(() => {});
}

function resolveAnsweredModel(
  parsed: SystemOneUpstreamResponse | null,
  options: SystemOneProxyOptions
): string {
  const upstreamModel = typeof parsed?.model === "string" ? parsed.model : "";
  return upstreamModel || options.requestedModel || options.target.provider;
}

export async function handleSystemOneProxy(options: SystemOneProxyOptions): Promise<Response> {
  const startTime = Date.now();
  const provider = options.target.provider;
  const token = options.credentials?.apiKey || options.credentials?.accessToken;

  if (!token) {
    return errorResponse(401, `No active credentials for provider: ${provider}`);
  }

  try {
    const res = await postDecision(options, token);
    const text = await res.text();
    const parsed = parseUpstreamBody(text);
    const usage = res.ok ? parsed?.usage : undefined;
    const answeredModel = resolveAnsweredModel(parsed, options);
    const upstreamError = upstreamErrorMessage(parsed);

    logDecisionCall(options, {
      status: res.status,
      ok: res.ok,
      model: answeredModel,
      usage,
      error: upstreamError || text.slice(0, 500),
      startTime,
    });

    if (!res.ok) {
      return errorResponse(res.status, upstreamError || `Provider returned HTTP ${res.status}`);
    }

    return buildSuccessResponse(parsed, {
      provider,
      model: answeredModel,
      cost: usage?.cost,
      startTime,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return errorResponse(500, `System One request failed: ${message}`);
  }
}
