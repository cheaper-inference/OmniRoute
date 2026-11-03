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
import {
  buildCloudflareDecisionRequest,
  cloudflareErrorMessage,
  unwrapCloudflareDecision,
} from "./systemOneCloudflare.ts";

export interface SystemOneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  /** `cloudflare-ai` connections keep the Workers AI account id here. */
  providerSpecificData?: { accountId?: unknown } | null;
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

/**
 * Strip this connection's own secrets (token, Cloudflare account id) from text
 * that leaves the handler. Upstream errors and transport exceptions may echo
 * them verbatim, and the shared sanitizer does not know unlabelled values.
 */
function redactConnectionSecrets(text: string, credentials: SystemOneCredentials | null): string {
  const accountId = credentials?.providerSpecificData?.accountId;
  const secrets = [credentials?.apiKey, credentials?.accessToken, accountId].filter(
    (value): value is string => typeof value === "string" && value.length >= 8
  );
  return secrets.reduce((out, secret) => out.split(secret).join("[redacted]"), text);
}

interface DecisionRequest {
  url: string;
  body: Record<string, unknown>;
}

/** Upstream URL + body for the target backend; null = unusable connection config. */
function buildDecisionRequest(options: SystemOneProxyOptions): DecisionRequest | null {
  const { target, body } = options;
  if (target.backend === "cloudflare") {
    return buildCloudflareDecisionRequest(
      target.upstreamModel,
      options.credentials?.providerSpecificData?.accountId,
      body
    );
  }
  return {
    url: target.upstreamUrl,
    body: { model: target.upstreamModel, state: body.state, questions: body.questions },
  };
}

function postDecision(
  options: SystemOneProxyOptions,
  request: DecisionRequest,
  token: string
): Promise<Response> {
  const fetchImpl: typeof fetch = options.fetchImpl ?? fetch;
  return fetchImpl(request.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request.body),
  });
}

/**
 * Cloudflare wraps the native body in `{ success, result }`. Unwrap it so every
 * backend returns the same `{ model, answers, usage }`; a 200 without a usable
 * result (`success: false`, job not completed) is reported as a 502.
 */
function normalizeBackendBody(
  target: SystemOneTarget,
  status: number,
  parsed: SystemOneUpstreamResponse | null
): { status: number; parsed: SystemOneUpstreamResponse | null } {
  if (target.backend !== "cloudflare") return { status, parsed };
  const message = cloudflareErrorMessage(parsed);
  if (status < 200 || status >= 300) return { status, parsed: message ? { message } : parsed };
  const native = unwrapCloudflareDecision(parsed);
  if (native) return { status, parsed: native as SystemOneUpstreamResponse };
  return { status: 502, parsed: { message: message || "Cloudflare returned no decision result" } };
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

  const request = buildDecisionRequest(options);
  if (!request) {
    return errorResponse(
      400,
      `Provider ${provider} needs a valid Account ID (32 lowercase hex characters) in its connection settings`
    );
  }

  try {
    const res = await postDecision(options, request, token);
    const text = await res.text();
    const normalized = normalizeBackendBody(options.target, res.status, parseUpstreamBody(text));
    const { parsed } = normalized;
    const ok = normalized.status >= 200 && normalized.status < 300;
    const usage = ok ? parsed?.usage : undefined;
    const answeredModel = resolveAnsweredModel(parsed, options);
    const rawError = upstreamErrorMessage(parsed);
    const upstreamError = rawError && redactConnectionSecrets(rawError, options.credentials);

    logDecisionCall(options, {
      status: normalized.status,
      ok,
      model: answeredModel,
      usage,
      error: upstreamError || redactConnectionSecrets(text.slice(0, 500), options.credentials),
      startTime,
    });

    if (!ok) {
      return errorResponse(
        normalized.status,
        upstreamError || `Provider returned HTTP ${normalized.status}`
      );
    }

    return buildSuccessResponse(parsed, {
      provider,
      model: answeredModel,
      cost: usage?.cost,
      startTime,
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const message = redactConnectionSecrets(raw, options.credentials);
    return errorResponse(500, `System One request failed: ${message}`);
  }
}
