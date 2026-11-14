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
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";
import type { SystemOneTarget } from "../config/systemOneRegistry.ts";
import {
  buildCloudflareDecisionRequest,
  cloudflareErrorMessage,
  unwrapCloudflareDecision,
} from "./systemOneCloudflare.ts";
import { buildOllamaSystemOneBody, validateOllamaSystemOneBody } from "./systemOneOllama.ts";

export interface SystemOneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  /**
   * `cloudflare-ai` connections keep the Workers AI account id here; `ollama-local`
   * connections keep their base URL (resolved by the route).
   */
  providerSpecificData?: { accountId?: unknown; baseUrl?: unknown } | null;
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

/** Shortest run of a secret's characters that is treated as that secret. */
const SECRET_FRAGMENT_LEN = 8;

/**
 * Strip this connection's own secrets (token, Cloudflare account id) from text
 * that leaves the handler. Upstream errors and transport exceptions may echo
 * them, and the shared sanitizer does not know unlabelled values. Any run of
 * SECRET_FRAGMENT_LEN or more consecutive characters of a secret is removed,
 * so a secret cut by truncation or with a few characters escaped or encoded
 * (`\u004f…`, `%4f…`) is still caught.
 */
function redactConnectionSecrets(text: string, credentials: SystemOneCredentials | null): string {
  const accountId = credentials?.providerSpecificData?.accountId;
  const configured = [credentials?.apiKey, credentials?.accessToken, accountId].filter(
    (value): value is string => typeof value === "string" && value.length > 0
  );
  // A complete configured value is always removed, whatever its length.
  text = configured.reduce((out, secret) => out.split(secret).join("[redacted]"), text);
  const secrets = configured.filter((value) => value.length >= SECRET_FRAGMENT_LEN);
  if (secrets.length === 0 || text.length < SECRET_FRAGMENT_LEN) return text;
  const fragments = new Set<string>();
  for (const secret of secrets) {
    for (let i = 0; i + SECRET_FRAGMENT_LEN <= secret.length; i++) {
      fragments.add(secret.slice(i, i + SECRET_FRAGMENT_LEN));
    }
  }
  const covered = new Uint8Array(text.length);
  for (let i = 0; i + SECRET_FRAGMENT_LEN <= text.length; i++) {
    if (fragments.has(text.slice(i, i + SECRET_FRAGMENT_LEN))) {
      covered.fill(1, i, i + SECRET_FRAGMENT_LEN);
    }
  }
  let out = "";
  for (let i = 0; i < text.length; i++) {
    if (!covered[i]) out += text[i];
    else if (i === 0 || !covered[i - 1]) out += "[redacted]";
  }
  return out;
}

/**
 * Outward error text: run the shared sanitizer first (it decodes security
 * escapes such as `\u004f`), then remove this connection's own secrets, so a
 * later sanitizer pass cannot turn an escaped secret back into plain text.
 */
function safeErrorText(text: string, options: SystemOneProxyOptions): string {
  // TypeSafe/OpenRouter keep #17994's behaviour; the Cloudflare URL carries the account id.
  if (options.target.backend !== "cloudflare") return text;
  // Before and after: the sanitizer both truncates and decodes escapes.
  const pre = redactConnectionSecrets(text, options.credentials);
  return redactConnectionSecrets(sanitizeErrorMessage(pre), options.credentials);
}

const SAFE_MODEL_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/;

/**
 * Cloudflare results are rebuilt from the documented fields only
 * (`model`, `answers`, numeric `usage` token counts and cost), dropping anything else the
 * envelope carries. The answered model falls back to the registry model when
 * it is not a plain id or contains a connection secret.
 */
function projectCloudflareResult(
  native: Record<string, unknown>,
  target: SystemOneTarget,
  credentials: SystemOneCredentials | null
): SystemOneUpstreamResponse {
  const model =
    typeof native.model === "string" &&
    SAFE_MODEL_ID.test(native.model) &&
    redactConnectionSecrets(native.model, credentials) === native.model
      ? native.model
      : target.upstreamModel;
  const rawUsage = (native.usage ?? {}) as Record<string, unknown>;
  const usage: NonNullable<SystemOneUpstreamResponse["usage"]> = {};
  for (const field of ["input_tokens", "output_tokens", "cost"] as const) {
    if (typeof rawUsage[field] === "number") usage[field] = rawUsage[field];
  }
  const answers = redactStrings(native.answers ?? {}, credentials);
  return { model, answers, usage };
}

/** Redact secrets inside every string of a JSON value (answers), keeping its shape. */
function redactStrings(value: unknown, credentials: SystemOneCredentials | null): unknown {
  if (typeof value === "string") return redactConnectionSecrets(value, credentials);
  if (Array.isArray(value)) return value.map((item) => redactStrings(item, credentials));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        redactConnectionSecrets(k, credentials),
        redactStrings(v, credentials),
      ])
    );
  }
  return value;
}

interface DecisionRequest {
  url: string;
  body: Record<string, unknown>;
}

interface DecisionRequestError {
  status: number;
  message: string;
}

/**
 * Local Ollama (#14667): its own body limits; the route has already resolved the
 * connection's base URL into `target.upstreamUrl`.
 */
function buildOllamaDecisionRequest(
  options: SystemOneProxyOptions
): DecisionRequest | DecisionRequestError {
  const validation = validateOllamaSystemOneBody(options.body);
  if (validation.ok === false) return { status: validation.status, message: validation.message };
  if (!options.target.upstreamUrl) {
    return { status: 400, message: "The ollama-local connection has no usable base URL" };
  }
  return {
    url: options.target.upstreamUrl,
    body: buildOllamaSystemOneBody(options.target.upstreamModel, options.body),
  };
}

/** Upstream URL + body for the target backend, or why the request cannot be sent. */
function buildDecisionRequest(
  options: SystemOneProxyOptions
): DecisionRequest | DecisionRequestError {
  const { target, body } = options;
  if (target.backend === "cloudflare") {
    const request = buildCloudflareDecisionRequest(
      target.upstreamModel,
      options.credentials?.providerSpecificData?.accountId,
      body
    );
    return (
      request ?? {
        status: 400,
        message: `Provider ${target.provider} needs a valid Account ID (32 lowercase hex characters) in its connection settings`,
      }
    );
  }
  if (target.backend === "ollama-local") return buildOllamaDecisionRequest(options);
  return {
    url: target.upstreamUrl,
    body: { model: target.upstreamModel, state: body.state, questions: body.questions },
  };
}

function postDecision(
  options: SystemOneProxyOptions,
  request: DecisionRequest,
  token: string | null | undefined
): Promise<Response> {
  const fetchImpl: typeof fetch = options.fetchImpl ?? fetch;
  return fetchImpl(request.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // A local Ollama needs no key; send one only when the connection has it.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
  parsed: SystemOneUpstreamResponse | null,
  credentials: SystemOneCredentials | null
): { status: number; parsed: SystemOneUpstreamResponse | null } {
  if (target.backend !== "cloudflare") return { status, parsed };
  const message = cloudflareErrorMessage(parsed);
  if (status < 200 || status >= 300) return { status, parsed: message ? { message } : parsed };
  const native = unwrapCloudflareDecision(parsed);
  if (native) return { status, parsed: projectCloudflareResult(native, target, credentials) };
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

interface DecisionOutcome {
  status: number;
  ok: boolean;
  parsed: SystemOneUpstreamResponse | null;
  /** Raw upstream text (connection secrets already removed for Cloudflare errors). */
  text: string;
  usage: SystemOneUpstreamResponse["usage"];
  answeredModel: string;
  upstreamError: string | undefined;
}

/** Read, normalize and sanitize an upstream decisions response. */
async function readDecisionResponse(
  options: SystemOneProxyOptions,
  res: Response
): Promise<DecisionOutcome> {
  const raw = await res.text();
  const isCloudflare = options.target.backend === "cloudflare";
  // Redact before parseUpstreamBody truncates a non-JSON error body: a secret
  // cut off at the cap would no longer match exactly. Only the connection's
  // own secrets here; the shared sanitizer runs on the extracted message, so
  // the JSON envelope stays parseable.
  const text = res.ok || !isCloudflare ? raw : redactConnectionSecrets(raw, options.credentials);
  const normalized = normalizeBackendBody(
    options.target,
    res.status,
    parseUpstreamBody(text),
    options.credentials
  );
  const { parsed } = normalized;
  const ok = normalized.status >= 200 && normalized.status < 300;
  // A failed Cloudflare call never reports an upstream-supplied model name.
  const answeredModel =
    ok || !isCloudflare
      ? resolveAnsweredModel(parsed, options)
      : options.requestedModel || options.target.provider;
  const rawError = upstreamErrorMessage(parsed);
  return {
    status: normalized.status,
    ok,
    parsed,
    text,
    usage: ok ? parsed?.usage : undefined,
    answeredModel,
    upstreamError: rawError ? safeErrorText(rawError, options) : undefined,
  };
}

export async function handleSystemOneProxy(options: SystemOneProxyOptions): Promise<Response> {
  const startTime = Date.now();
  const provider = options.target.provider;
  const token = options.credentials?.apiKey || options.credentials?.accessToken;

  if (!token && options.target.backend !== "ollama-local") {
    return errorResponse(401, `No active credentials for provider: ${provider}`);
  }

  const request = buildDecisionRequest(options);
  if (!("url" in request)) return errorResponse(request.status, request.message);

  try {
    const res = await postDecision(options, request, token);
    const { status, ok, parsed, text, usage, answeredModel, upstreamError } =
      await readDecisionResponse(options, res);

    logDecisionCall(options, {
      status,
      ok,
      model: answeredModel,
      usage,
      error: upstreamError || safeErrorText(text, options).slice(0, 500),
      startTime,
    });

    if (!ok) {
      return errorResponse(status, upstreamError || `Provider returned HTTP ${status}`);
    }

    return buildSuccessResponse(parsed, {
      provider,
      model: answeredModel,
      cost: usage?.cost,
      startTime,
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const message = safeErrorText(raw, options);
    return errorResponse(500, `System One request failed: ${message}`);
  }
}
