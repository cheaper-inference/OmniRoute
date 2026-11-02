/** Generic System One decision transport, sharing normal credentials and accounting. */

import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog, saveRequestUsage } from "@/lib/usageDb";
import { recordCost } from "@/domain/costRules";
import { markAccountUnavailable } from "../../src/sse/services/auth.ts";
import { isCredentialDiagnosticSentinel } from "../../src/sse/services/credentialSentinel.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  SYSTEMONE_BACKENDS,
  nativeSystemOnePricing,
  type SystemOneProvider,
} from "../config/systemOneRegistry.ts";
import {
  fetchSystemOne,
  systemOneHeaders,
  systemOneUrl,
  type SystemOneCredentials,
} from "./systemOneTransport.ts";
import { calculateCostDetailed } from "@/lib/usage/costCalculator";
export type { SystemOneCredentials } from "./systemOneTransport.ts";

/** Backend for callers that pass no provider; the route always resolves one explicitly. */
const DEFAULT_SYSTEMONE_PROVIDER: SystemOneProvider = "openrouter";

export interface SystemOneProxyOptions {
  body: Record<string, unknown>;
  credentials: SystemOneCredentials | null;
  /** Upstream model identity used for per-connection/model cooldown. */
  canonicalModel?: string | null;
  requestedModel?: string;
  apiKeyInfo?: { id?: string | null; name?: string | null } | null;
  provider?: SystemOneProvider;
  signal?: AbortSignal;
  timeoutMs?: number;
}

// 422 is a request-shape error from the caller, not a fault of the connection.
function shouldCoolDownConnection(status: number): boolean {
  return status === 401 || status === 403 || status === 429 || status >= 500;
}

type SystemOneUpstreamBody = {
  model?: string;
  usage?: { input_tokens?: number; output_tokens?: number; cost?: number };
  message?: string;
  detail?: { message?: string };
  error?: { message?: string } | string;
};

type SystemOneCall = {
  startTime: number;
  connectionId: string | null;
  requestedModel: string | null;
  /** Model id sent upstream; names the call when the response omits `model`. */
  upstreamModel: string | null;
  canonicalModel: string | null;
  apiKeyInfo: SystemOneProxyOptions["apiKeyInfo"];
  provider: SystemOneProvider;
};

type SystemOneUsage = { model: string; inputTokens: number; outputTokens: number };

function parseUpstreamBody(text: string): SystemOneUpstreamBody | null {
  try {
    const parsed: unknown = text ? JSON.parse(text) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as SystemOneUpstreamBody)
      : null;
  } catch {
    return null;
  }
}

function readUsage(parsed: SystemOneUpstreamBody | null, call: SystemOneCall): SystemOneUsage {
  return {
    model: parsed?.model || call.upstreamModel || call.requestedModel || "systemone",
    inputTokens: nonNegativeCount(parsed?.usage?.input_tokens),
    outputTokens: nonNegativeCount(parsed?.usage?.output_tokens),
  };
}

function upstreamErrorMessage(parsed: SystemOneUpstreamBody | null, status: number): string {
  const nested = typeof parsed?.error === "string" ? parsed.error : parsed?.error?.message;
  return parsed?.message || parsed?.detail?.message || nested || `Provider returned HTTP ${status}`;
}

async function logCall(call: SystemOneCall, status: number, usage: SystemOneUsage, error?: string) {
  await saveCallLog({
    method: "POST",
    path: "/v1/systemone",
    status,
    model: usage.model,
    requestedModel: call.requestedModel,
    provider: call.provider,
    duration: Date.now() - call.startTime,
    tokens: { prompt_tokens: usage.inputTokens, completion_tokens: usage.outputTokens },
    connectionId: call.connectionId,
    requestType: "systemone",
    apiKeyId: call.apiKeyInfo?.id || undefined,
    apiKeyName: call.apiKeyInfo?.name || undefined,
    ...(error ? { error } : {}),
  }).catch(() => {});
}

async function upstreamFailure(
  call: SystemOneCall,
  res: Response,
  parsed: SystemOneUpstreamBody | null
): Promise<Response> {
  const message = sanitizeErrorMessage(upstreamErrorMessage(parsed, res.status));
  await logCall(call, res.status, readUsage(parsed, call), message);
  if (
    call.connectionId &&
    (shouldCoolDownConnection(res.status) || res.status === 402 || res.status === 404)
  ) {
    try {
      await markAccountUnavailable(
        call.connectionId,
        res.status,
        message,
        call.provider,
        call.canonicalModel,
        null,
        { headers: res.headers }
      );
    } catch {
      // The upstream response has priority over a best-effort cooldown write.
    }
  }
  const response = errorResponse(res.status, message);
  const retryAfter = res.headers.get("retry-after");
  if (retryAfter) response.headers.set("retry-after", retryAfter);
  return response;
}

async function recordSuccess(call: SystemOneCall, usage: SystemOneUsage, costUsd: number | null) {
  await logCall(call, 200, usage);
  const apiKeyId = call.apiKeyInfo?.id || undefined;
  await saveRequestUsage({
    provider: call.provider,
    model: usage.model,
    tokens: { prompt_tokens: usage.inputTokens, completion_tokens: usage.outputTokens },
    status: "200",
    success: true,
    latencyMs: Date.now() - call.startTime,
    connectionId: call.connectionId || undefined,
    apiKeyId,
    apiKeyName: call.apiKeyInfo?.name || undefined,
    endpoint: "/v1/systemone",
  }).catch(() => {});
  if (apiKeyId && costUsd !== null) {
    recordCost(apiKeyId, costUsd, {
      provider: call.provider,
      model: usage.model,
      tokens: { input: usage.inputTokens, output: usage.outputTokens },
      success: true,
    });
  }
}

function successResponse(
  text: string,
  call: SystemOneCall,
  usage: SystemOneUsage,
  costUsd: number | null
) {
  const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider: call.provider,
    model: usage.model,
    costUsd,
    latencyMs: Date.now() - call.startTime,
    requestId: generateRequestId(),
    usage: { prompt_tokens: usage.inputTokens, completion_tokens: usage.outputTokens },
  });
  if (costUsd === null) headers.delete("X-OmniRoute-Response-Cost");
  headers.set("X-OmniRoute-Cost-Status", costUsd === null ? "unknown" : "known");
  return new Response(text, { status: 200, headers });
}

function describeCall(options: SystemOneProxyOptions): SystemOneCall {
  const upstreamModel = typeof options.body.model === "string" ? options.body.model : null;
  return {
    startTime: Date.now(),
    connectionId: options.credentials?.connectionId || null,
    requestedModel: options.requestedModel || upstreamModel,
    upstreamModel,
    canonicalModel:
      options.canonicalModel || (upstreamModel ? upstreamModel.replace(/^~/, "") : null),
    apiKeyInfo: options.apiKeyInfo,
    provider: options.provider || DEFAULT_SYSTEMONE_PROVIDER,
  };
}

/** A decision response must answer at least one question with a keyed object. */
function isInvalidSuccessBody(parsed: SystemOneUpstreamBody | null): boolean {
  const answers = (parsed as Record<string, unknown> | null)?.answers;
  return (
    !answers ||
    typeof answers !== "object" ||
    Array.isArray(answers) ||
    Object.keys(answers).length === 0
  );
}

async function failTransport(
  err: unknown,
  call: SystemOneCall,
  options: SystemOneProxyOptions,
  timedOut: boolean
): Promise<Response> {
  if (options.signal?.aborted) return errorResponse(499, "System One request aborted by caller");
  const status = timedOut ? 504 : 502;
  const message = timedOut ? "System One request timed out" : sanitizeErrorMessage(err);
  // URL-guard rejections are configuration errors, not evidence the account is unhealthy.
  if (call.connectionId && !(err as { code?: string })?.code?.includes("URL")) {
    await markAccountUnavailable(
      call.connectionId,
      status,
      message,
      call.provider,
      call.canonicalModel
    ).catch(() => {});
  }
  return errorResponse(status, message);
}

/**
 * Real credentials name the selected connection; selector markers (allExpired,
 * leaseFenceStale, ...) do not. A keyless local backend has no other proof, so without
 * a connection id it would otherwise dispatch to the default host.
 */
function hasDispatchableCredentials(provider: SystemOneProvider, credentials: unknown): boolean {
  if (
    !credentials ||
    typeof credentials !== "object" ||
    isCredentialDiagnosticSentinel(credentials)
  ) {
    return false;
  }
  const record = credentials as SystemOneCredentials & Record<string, unknown>;
  if (record.leaseFenceStale || record.leaseRequired || record.waitingForCapacity) return false;
  if (!SYSTEMONE_BACKENDS[provider].requiresKey) return typeof record.connectionId === "string";
  return Boolean(record.apiKey || record.accessToken);
}

export async function handleSystemOneProxy(options: SystemOneProxyOptions): Promise<Response> {
  const provider = options.provider || DEFAULT_SYSTEMONE_PROVIDER;
  if (!hasDispatchableCredentials(provider, options.credentials)) {
    return errorResponse(401, `No credentials for provider: ${provider}`);
  }
  const call = describeCall(options);
  const timeoutSignal = AbortSignal.timeout(
    options.timeoutMs ?? SYSTEMONE_BACKENDS[provider].timeoutMs
  );
  const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;

  try {
    const res = await fetchSystemOne(
      systemOneUrl(provider, options.credentials),
      options.credentials,
      {
        method: "POST",
        headers: systemOneHeaders(options.credentials),
        body: JSON.stringify(options.body),
        signal,
      }
    );
    const text = await res.text();
    const parsed = parseUpstreamBody(text);

    if (!res.ok) return upstreamFailure(call, res, parsed);
    if (isInvalidSuccessBody(parsed)) {
      const message = "System One upstream returned an invalid response body";
      await logCall(call, 502, readUsage(parsed, call), message);
      return errorResponse(502, message);
    }

    const usage = readUsage(parsed, call);
    const costUsd = await systemOneCost(provider, usage.model, parsed?.usage);
    await recordSuccess(call, usage, costUsd);
    return successResponse(text, call, usage, costUsd);
  } catch (err) {
    return failTransport(err, call, options, timeoutSignal.aborted);
  }
}

function isNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/**
 * `null` means unknown; a reported or local zero is a known cost. Token estimates use
 * the operator's pricing table first, then a backend's published rate (native Jev).
 */
export async function systemOneCost(
  provider: SystemOneProvider,
  model: string,
  usage?: SystemOneUpstreamBody["usage"]
): Promise<number | null> {
  if (provider === "ollama-local") return 0;
  if (provider !== "typesafe" && isNonNegative(usage?.cost)) return usage.cost;
  if (!isNonNegative(usage?.input_tokens)) return null;
  const outputTokens = nonNegativeCount(usage.output_tokens);
  const result = await calculateCostDetailed(provider, model, {
    input_tokens: usage.input_tokens,
    output_tokens: outputTokens,
  });
  if (result.priced) return result.costUsd;
  const published = nativeSystemOnePricing(provider, model);
  if (!published) return null;
  return (usage.input_tokens * published.input + outputTokens * published.output) / 1_000_000;
}

function nonNegativeCount(value: unknown): number {
  return isNonNegative(value) ? value : 0;
}
