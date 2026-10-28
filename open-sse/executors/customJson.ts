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
 * (`retry: false`, no redirects) and never replayed by routing fallback (see
 * open-sse/utils/noReplayResponse.ts). The outbound URL guard is enforced on every call,
 * not only when the node is saved.
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
import { SafeOutboundFetchError, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";

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
  if (!(error instanceof SafeOutboundFetchError)) return 502;
  if (error.code === "URL_GUARD_BLOCKED" || error.code === "INVALID_URL") return 403;
  if (error.code === "TIMEOUT") return 504;
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

export async function executeCustomJson(input: ExecuteInput): Promise<ExecutorExecuteResult> {
  const providerData = asRecord(input.credentials?.providerSpecificData);
  const endpoint = typeof providerData.baseUrl === "string" ? providerData.baseUrl.trim() : "";
  const headers: Record<string, string> = {};
  const redactedNames: string[] = [];
  let config: CustomJsonConfig;
  let payload: JsonRecord;

  try {
    config = normalizeCustomJsonConfig(providerData.customJson, endpoint);
    payload = buildCustomJsonRequest(config, input.model, input.body);
    const built = buildCustomJsonHeaders(config, input.credentials?.apiKey);
    Object.assign(headers, built.base);
    applyCustomHeaders(headers, providerData.customHeaders);
    for (const [name, value] of Object.entries(built.auth)) {
      setHeader(headers, name, value);
      redactedNames.push(name.toLowerCase());
    }
  } catch (error) {
    const known = error instanceof CustomJsonError;
    const response = errorResponse(
      known ? error.status : 400,
      known ? error.message : "Invalid custom JSON request"
    );
    return { response, url: endpoint, headers: {} };
  }

  // Request logs persist the returned headers: never keep the credential there.
  const loggedHeaders = Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [
      name,
      redactedNames.includes(name.toLowerCase()) ? REDACTED : value,
    ])
  );
  const result = { url: endpoint, headers: loggedHeaders, transformedBody: payload };

  let upstream: Response;
  try {
    upstream = await safeOutboundFetch(endpoint, {
      method: config.method,
      headers,
      body: JSON.stringify(payload),
      guard: getProviderOutboundGuard(),
      retry: false,
      allowRedirect: false,
      signal: input.signal ?? undefined,
    });
  } catch (error) {
    if (input.signal?.aborted) throw input.signal.reason ?? error;
    return {
      ...result,
      response: errorResponse(fetchFailureStatus(error), "Custom JSON endpoint request failed"),
    };
  }

  // Upstream errors pass through unchanged; chatCore parses and sanitizes them.
  if (!upstream.ok) return { ...result, response: upstream };

  let text: string;
  try {
    text = extractCustomJsonText(config, JSON.parse(await upstream.text()));
  } catch (error) {
    if (input.signal?.aborted) throw input.signal.reason ?? error;
    const reason = error instanceof CustomJsonError ? error.message : "invalid JSON";
    return { ...result, response: errorResponse(502, `Custom JSON response: ${reason}`) };
  }

  return { ...result, response: buildCompletionResponse(text, input.model, input.stream === true) };
}
