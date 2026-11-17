/**
 * Custom JSON API executor.
 *
 * Fills the node's JSON request template, sends ONE request to the full endpoint URL
 * (method/auth from the node config, operator custom headers merged through the
 * canonical sanitizer), reads the reply from the configured response path and presents
 * it as an OpenAI chat completion (JSON, or a two-chunk SSE stream when the caller
 * streams) so the regular response translators deliver it in the client's format.
 *
 * Business calls can have side effects, so the request is never retried here
 * (no retry, no redirects) and never replayed by routing fallback (see
 * open-sse/utils/noReplayResponse.ts). The outbound URL guard is enforced on every call,
 * not only when the node is saved: the string-level check plus the connect-time
 * DNS-rebinding guard of `dispatchGuarded()`, the same transport every other executor
 * uses for an operator-supplied base URL (kept in the engine — no open-sse → src import).
 */
import { randomUUID } from "node:crypto";
import type { ExecuteInput, ExecutorExecuteResult } from "./base.ts";
import { applyCustomHeaders } from "./default/customHeaders.ts";
import {
  CustomJsonError,
  type CustomJsonConfig,
  buildCustomJsonHeaders,
  buildCustomJsonRequest,
  extractCustomJsonText,
  normalizeCustomJsonConfig,
} from "../utils/customJson.ts";
import { errorResponse } from "../utils/error.ts";
import { assertDispatchUrlAllowed, dispatchGuarded } from "./dispatchPin.ts";
import { isConnectGuardRefusal } from "../utils/connectGuardDispatcher.ts";
import { FetchTimeoutError, fetchWithTimeout } from "../utils/fetchTimeout.ts";

/** Provider id used when the caller (the dashboard test probe) has no connection id. */
const DEFAULT_CUSTOM_JSON_PROVIDER = "openai-compatible-custom-json";

type JsonRecord = Record<string, unknown>;

const REDACTED = "[REDACTED]";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function setHeader(headers: Record<string, string>, name: string, value: string): void {
  const lower = name.toLowerCase();
  for (const existing of Object.keys(headers)) {
    if (existing.toLowerCase() === lower) delete headers[existing];
  }
  headers[name] = value;
}

function fetchFailureStatus(error: unknown): number {
  if (isConnectGuardRefusal(error)) return 403;
  if (error instanceof FetchTimeoutError) return 504;
  return 502;
}

function buildCompletionResponse(text: string, model: string, stream: boolean): Response {
  const common = {
    id: `chatcmpl-${randomUUID()}`,
    created: Math.floor(Date.now() / 1000),
    model,
  };
  if (!stream) {
    const body = {
      ...common,
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
    };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const chunks = [
    {
      ...common,
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant", content: text }, finish_reason: null }],
    },
    {
      ...common,
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
  ];
  const sse = chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("");
  return new Response(`${sse}data: [DONE]\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  });
}

type PreparedRequest = {
  config: CustomJsonConfig;
  payload: JsonRecord;
  headers: Record<string, string>;
  /** Request logs persist the returned headers: never keep the credential there. */
  loggedHeaders: Record<string, string>;
};

function prepareRequest(input: ExecuteInput, providerData: JsonRecord, endpoint: string) {
  const config = normalizeCustomJsonConfig(providerData.customJson, endpoint);
  const payload = buildCustomJsonRequest(config, input.model, input.body);
  const built = buildCustomJsonHeaders(config, input.credentials?.apiKey);
  const headers: Record<string, string> = { ...built.base };
  applyCustomHeaders(headers, providerData.customHeaders);
  const authNames = new Set<string>();
  for (const [name, value] of Object.entries(built.auth)) {
    setHeader(headers, name, value);
    authNames.add(name.toLowerCase());
  }
  const loggedHeaders = Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [
      name,
      authNames.has(name.toLowerCase()) ? REDACTED : value,
    ])
  );
  return { config, payload, headers, loggedHeaders } satisfies PreparedRequest;
}

async function callEndpoint(
  input: ExecuteInput,
  provider: string,
  endpoint: string,
  prepared: PreparedRequest
) {
  try {
    assertDispatchUrlAllowed(provider, endpoint);
  } catch {
    // Invalid, private (public-only mode) or cloud-metadata URL: refused before any request.
    return errorResponse(403, "Custom JSON endpoint request failed");
  }
  try {
    const reply = await fetchWithTimeout(endpoint, {
      method: prepared.config.method,
      headers: prepared.headers,
      body: JSON.stringify(prepared.payload),
      // A pinned redirect mode makes dispatchGuarded send exactly one request (no follow).
      redirect: "manual",
      signal: input.signal ?? undefined,
      fetchFn: (url, init) => dispatchGuarded(provider, String(url), init ?? {}, input.credentials),
    });
    if (reply.status >= 300 && reply.status < 400) {
      void reply.body?.cancel().catch(() => {});
      return errorResponse(502, "Custom JSON endpoint request failed");
    }
    return reply;
  } catch (error) {
    if (input.signal?.aborted) throw input.signal.reason ?? error;
    return errorResponse(fetchFailureStatus(error), "Custom JSON endpoint request failed");
  }
}

async function completionFromReply(input: ExecuteInput, config: CustomJsonConfig, reply: Response) {
  try {
    const text = extractCustomJsonText(config, JSON.parse(await reply.text()));
    return buildCompletionResponse(text, input.model, input.stream === true);
  } catch (error) {
    if (input.signal?.aborted) throw input.signal.reason ?? error;
    const reason = error instanceof CustomJsonError ? error.message : "invalid JSON";
    return errorResponse(502, `Custom JSON response: ${reason}`);
  }
}

export async function executeCustomJson(
  input: ExecuteInput,
  provider: string = DEFAULT_CUSTOM_JSON_PROVIDER
): Promise<ExecutorExecuteResult> {
  const providerData = asRecord(input.credentials?.providerSpecificData);
  const endpoint = typeof providerData.baseUrl === "string" ? providerData.baseUrl.trim() : "";

  let prepared: PreparedRequest;
  try {
    prepared = prepareRequest(input, providerData, endpoint);
  } catch (error) {
    const known = error instanceof CustomJsonError;
    const response = errorResponse(
      known ? error.status : 400,
      known ? error.message : "Invalid custom JSON request"
    );
    return { response, url: endpoint, headers: {} };
  }

  const result = {
    url: endpoint,
    headers: prepared.loggedHeaders,
    transformedBody: prepared.payload,
  };
  const upstream = await callEndpoint(input, provider, endpoint, prepared);
  // Upstream errors pass through unchanged; chatCore parses and sanitizes them.
  if (!upstream.ok) return { ...result, response: upstream };
  return { ...result, response: await completionFromReply(input, prepared.config, upstream) };
}
