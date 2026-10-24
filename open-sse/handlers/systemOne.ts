/**
 * System One decisions proxy (#13987).
 *
 * POST /v1/systemone (alias POST /v1/decisions) forwards one typed-decision
 * request — a `state` plus a map of `questions` (`noul` / `choice` / `score`) —
 * to the backend selected by resolveSystemOneTarget. Both backends share the
 * same request/response wire shape, so the proxy is a model-rewriting
 * passthrough: answers, calibrated probabilities and usage (input/output
 * tokens, cost) flow through untouched. Decisions models are NOT chat models —
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
  /** Public path the client called ("/v1/systemone" or "/v1/decisions"). */
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

export async function handleSystemOneProxy(options: SystemOneProxyOptions): Promise<Response> {
  const startTime = Date.now();
  const provider = options.target.provider;
  const token = options.credentials?.apiKey || options.credentials?.accessToken;
  const connectionId = options.credentials?.connectionId || null;

  if (!token) {
    return errorResponse(401, `No active credentials for provider: ${provider}`);
  }

  const fetchImpl: typeof fetch = options.fetchImpl ?? fetch;

  try {
    const res = await fetchImpl(options.target.upstreamUrl, {
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

    const text = await res.text();
    let parsed: SystemOneUpstreamResponse | null = null;
    try {
      parsed = text ? (JSON.parse(text) as SystemOneUpstreamResponse) : null;
    } catch {
      parsed = { error: text.slice(0, 500) };
    }

    const usage = res.ok ? parsed?.usage : undefined;
    const answeredModel =
      (typeof parsed?.model === "string" && parsed.model) || options.requestedModel || provider;

    saveCallLog({
      method: "POST",
      path: options.path,
      status: res.status,
      model: answeredModel,
      provider,
      duration: Date.now() - startTime,
      tokens: {
        prompt_tokens: usage?.input_tokens ?? 0,
        completion_tokens: usage?.output_tokens ?? 0,
      },
      connectionId,
      ...(res.ok
        ? {}
        : {
            error:
              parsed?.message ||
              (typeof parsed?.error === "string" ? parsed.error : parsed?.error?.message) ||
              text.slice(0, 500),
          }),
    }).catch(() => {});

    if (!res.ok) {
      const message =
        parsed?.message ||
        (typeof parsed?.error === "string" ? parsed.error : parsed?.error?.message) ||
        `Provider returned HTTP ${res.status}`;
      return errorResponse(res.status, message);
    }

    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider,
      model: answeredModel,
      costUsd: typeof usage?.cost === "number" ? usage.cost : 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify(parsed), { status: 200, headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return errorResponse(500, `System One request failed: ${message}`);
  }
}
