import { splitDecisionModel } from "../config/decisionRegistry.ts";
import { discoverDecisionModels } from "./decisionDiscovery.ts";
import { decisionHeaders, readDecisionJson } from "./decisionTransport.ts";
import { validateDecisionRequest } from "./decisionValidation.ts";
import {
  DecisionError,
  record,
  type DecisionBackend,
  type DecisionCredentials,
  type DecisionFetch,
  type DecisionFormat,
  type DecisionRecord,
} from "./decisionTypes.ts";

export interface DecisionAttempt {
  provider: string;
  model: string;
  endpoint: string;
  status: number;
  latencyMs: number;
  requestId: string;
  connectionId: string | null;
  failure: string | null;
  usage: DecisionRecord | null;
  cost: number | null;
}

export interface DecisionGatewayRuntime {
  /** Authenticate even when global keyless mode is enabled; policy includes endpoint/model/budget/rate gates. */
  authorize(request: Request, model: string): Promise<Response | null>;
  /** Must select inside key scope with quota preflight; disabled/cooldown connections are ineligible. */
  select(
    request: Request,
    provider: string,
    model: string
  ): Promise<{ backend: DecisionBackend; credentials: DecisionCredentials }>;
  fetch: DecisionFetch;
  observe(request: Request, attempt: DecisionAttempt): Promise<void>;
  feedback(credentials: DecisionCredentials, attempt: DecisionAttempt): Promise<void>;
  error(status: number, message: string): Response;
}

function finiteCost(usage: DecisionRecord): number | null {
  const cost = usage.cost ?? usage.cost_usd;
  return typeof cost === "number" && Number.isFinite(cost) && cost >= 0 ? cost : null;
}

function decisionFailure(error: unknown, caller: AbortSignal, timeout: AbortSignal) {
  if (caller.aborted) return { status: 499, failure: "cancelled" };
  if (timeout.aborted || record(error).code === "TIMEOUT")
    return { status: 504, failure: "timeout" };
  if (error instanceof DecisionError) return { status: error.status, failure: error.category };
  return { status: 502, failure: "connection_failed" };
}

function validateNativeAnswers(format: DecisionFormat, answers: unknown): void {
  const valid =
    format === "decisions"
      ? Array.isArray(answers)
      : answers &&
        !Array.isArray(answers) &&
        typeof answers === "object" &&
        Object.keys(answers).length > 0;
  if (!valid) throw new DecisionError(502, "invalid_native_response");
}

async function runDecisionAttempt(
  runtime: DecisionGatewayRuntime,
  request: Request,
  format: DecisionFormat,
  body: DecisionRecord,
  backend: DecisionBackend,
  credentials: DecisionCredentials,
  attempt: DecisionAttempt,
  signal: AbortSignal,
  timeout: AbortSignal
): Promise<DecisionRecord | null> {
  const { provider, model } = attempt;
  let result: DecisionRecord | null = null;
  try {
    const catalog = await discoverDecisionModels(backend, credentials, runtime.fetch, signal, {
      model,
    });
    if (!catalog.some((row) => row.id === `${provider}/${model}`))
      throw new DecisionError(404, "decision_model_not_found");
    const upstreamUrl =
      backend.transport === "cloudflare"
        ? `${backend.url}/${model.split("/").map(encodeURIComponent).join("/")}`
        : backend.url;
    const upstreamModel = backend.transport === "cloudflare" ? model.split("/").at(-1) : model;
    const upstream = await runtime.fetch(upstreamUrl, credentials, {
      method: "POST",
      // Unique per outbound attempt; ambiguous failures are never retried.
      headers: { ...decisionHeaders(credentials), "Idempotency-Key": crypto.randomUUID() },
      signal,
      body: JSON.stringify({ ...body, model: upstreamModel }),
    });
    attempt.status = upstream.status;
    if (!upstream.ok) {
      await upstream.body?.cancel();
      throw new DecisionError(upstream.status, `upstream_http_${upstream.status}`);
    }
    const payload = record(await readDecisionJson(upstream, 502, signal));
    if (backend.transport === "cloudflare" && payload.success === false)
      throw new DecisionError(502, "upstream_envelope_failed");
    result = backend.transport === "cloudflare" ? record(payload.result) : payload;
    validateNativeAnswers(format, result.answers);
    attempt.usage = result.usage && typeof result.usage === "object" ? record(result.usage) : null;
    attempt.cost = attempt.usage ? finiteCost(attempt.usage) : null;
    attempt.status = 200;
  } catch (error) {
    result = null;
    Object.assign(attempt, decisionFailure(error, request.signal, timeout));
  }
  return result;
}

function decisionResponseHeaders(attempt: DecisionAttempt, target: string, attempts: number) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "X-OmniRoute-Request-Id": attempt.requestId,
    "X-OmniRoute-Provider": attempt.provider,
    "X-OmniRoute-Model": encodeURIComponent(target),
    "X-OmniRoute-Latency-Ms": String(attempt.latencyMs),
    "X-OmniRoute-Cost-Status": attempt.cost === null ? "unknown" : "known",
    "X-OmniRoute-Usage-Status": attempt.usage === null ? "unknown" : "reported",
    "X-OmniRoute-Fallback-Attempts": String(attempts),
  });
  if (attempt.cost !== null) headers.set("X-OmniRoute-Response-Cost", String(attempt.cost));
  return headers;
}

async function runDecisionTargets(
  runtime: DecisionGatewayRuntime,
  request: Request,
  format: DecisionFormat,
  body: ReturnType<typeof validateDecisionRequest>,
  requestId: string
): Promise<Response> {
  let target = body.model;
  let fallbacks: string[] = [];
  let attempts = 0;
  while (true) {
    const rejection = await runtime.authorize(request, target);
    if (rejection) return rejection;
    const { provider, model } = splitDecisionModel(target);
    const selected = await runtime.select(request, provider, model);
    const { backend, credentials } = selected;
    if (backend.format !== format)
      throw new DecisionError(400, "cross_format_translation_unsupported");
    if (attempts === 0) fallbacks = backend.fallbackModels;
    const start = Date.now();
    const timeout = AbortSignal.timeout(backend.timeoutMs);
    const signal = AbortSignal.any([request.signal, timeout]);
    const attempt: DecisionAttempt = {
      provider,
      model,
      endpoint: `/v1/${format}`,
      status: 502,
      latencyMs: 0,
      requestId,
      connectionId: credentials.connectionId || null,
      failure: null,
      usage: null,
      cost: null,
    };
    const result = await runDecisionAttempt(
      runtime,
      request,
      format,
      body,
      backend,
      credentials,
      attempt,
      signal,
      timeout
    );
    attempt.latencyMs = Date.now() - start;
    await runtime.observe(request, attempt);
    await runtime.feedback(credentials, attempt);
    const headers = decisionResponseHeaders(attempt, target, attempts);
    if (result) return new Response(JSON.stringify(result), { status: 200, headers });
    // Only an explicit operator policy can substitute models. Never retry ambiguous timeouts/cancellation.
    const fallback = nextDecisionFallback(request, attempt, fallbacks);
    if (!fallback || attempts >= 4) {
      const response = runtime.error(attempt.status, `Decision gateway: ${attempt.failure}`);
      for (const [name, value] of headers) response.headers.set(name, value);
      return response;
    }
    target = fallback;
    attempts++;
  }
}

/** Provider-neutral route factory. No vendor branches, credentials store or routing engine here. */
export function createDecisionGateway(runtime: DecisionGatewayRuntime) {
  return async function post(request: Request, format: DecisionFormat): Promise<Response> {
    const requestId = crypto.randomUUID();
    try {
      // Before reading an untrusted body or resolving any upstream.
      const admission = await runtime.authorize(request, "");
      if (admission) return admission;
      const body = validateDecisionRequest(
        format,
        await readDecisionJson(
          request,
          400,
          AbortSignal.any([request.signal, AbortSignal.timeout(10_000)])
        )
      );
      return await runDecisionTargets(runtime, request, format, body, requestId);
    } catch (error) {
      return runtime.error(
        error instanceof DecisionError ? error.status : request.signal.aborted ? 499 : 503,
        error instanceof DecisionError ? error.message : "Decision gateway unavailable"
      );
    }
  };
}

function nextDecisionFallback(request: Request, attempt: DecisionAttempt, fallbacks: string[]) {
  if (request.signal.aborted) return null;
  if (![429, 500, 502, 503].includes(attempt.status)) return null;
  return attempt.failure?.startsWith("upstream_http_") ? fallbacks.shift() : null;
}
