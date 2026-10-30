import { hexId, type CodeBuddyOperationContext } from "./context.ts";
import {
  buildCodeBuddyTelemetryHeaders,
  CODEBUDDY_INTL_CLI,
  CODEBUDDY_INTL_SERVICE_NAME,
} from "./cliProfile.ts";
import type { ReportBatch } from "./telemetry.ts";

/**
 * Real transport for the synthetic CodeBuddy telemetry.
 *
 * Endpoints are the captured ones:
 *  - `POST /v2/report`  — authenticated JSON batch of client events;
 *  - `POST /v1/traces`  — OTLP export, no Authorization header.
 *
 * Hard property: telemetry is a SIDE CHANNEL. It never throws, never blocks the
 * data plane (bounded timeout) and never logs response bodies (they can contain
 * account data).
 *
 * OTLP wire format: the captured CLI sends protobuf. This module sends
 * OTLP/HTTP **JSON** because it needs no protobuf runtime.
 *
 * VERIFIED live against https://www.codebuddy.ai: `POST /v1/traces` accepts the
 * JSON encoding and answers HTTP 200, so no protobuf dependency is needed.
 * `POST /v2/report` additionally requires `eventCode` + `reportDelay` at the top
 * level of the envelope (see ReportBatch in telemetry.ts).
 */

export const CODEBUDDY_REPORT_PATH = "/v2/report";
export const CODEBUDDY_TRACES_PATH = "/v1/traces";
export const CODEBUDDY_DEFAULT_BASE_URL = "https://www.codebuddy.ai";

const OTLP_EXPORTER_USER_AGENT = "OTel-OTLP-Exporter-JavaScript/0.51.1";
const DEFAULT_TIMEOUT_MS = 5_000;

export interface TelemetryResult {
  ok: boolean;
  skipped?: boolean;
  status?: number;
  error?: string;
}

export interface SendOptions {
  baseUrl?: string;
  accessToken?: string | null;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

function normalizeBaseUrl(baseUrl?: string): string {
  return (baseUrl || CODEBUDDY_DEFAULT_BASE_URL).replace(/\/+$/, "");
}

async function postJson(
  url: string,
  headers: Record<string, string>,
  payload: unknown,
  options: SendOptions
): Promise<TelemetryResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    // Deliberately narrow: only the message, never a response body.
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  } finally {
    clearTimeout(timer);
  }
}

/** Send one report batch. An empty batch is skipped (no empty POSTs). */
export async function sendReportBatch(
  batch: ReportBatch,
  options: SendOptions = {}
): Promise<TelemetryResult> {
  if (!batch.events.length) return { ok: true, skipped: true };

  const headers: Record<string, string> = buildCodeBuddyTelemetryHeaders();
  if (options.accessToken) headers.Authorization = `Bearer ${options.accessToken}`;

  return postJson(
    `${normalizeBaseUrl(options.baseUrl)}${CODEBUDDY_REPORT_PATH}`,
    headers,
    batch,
    options
  );
}

export interface CodeBuddySpan {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  startedAtMs: number;
  endedAtMs: number;
  attributes: Record<string, string | number | boolean>;
}

export interface SpanTreeInput {
  model: string;
  startedAtMs: number;
  endedAtMs: number;
  firstTokenAtMs?: number;
  usage?: Record<string, unknown>;
  status?: string;
}

function numberOrUndefined(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/**
 * Build the captured two-span tree: `interaction` (the turn) owns the
 * `model_request` span, whose ids match the chat request's B3 headers.
 */
export function buildSpanTree(
  op: CodeBuddyOperationContext,
  input: SpanTreeInput
): CodeBuddySpan[] {
  const startedAtMs = Math.min(input.startedAtMs, input.endedAtMs);
  const endedAtMs = Math.max(input.startedAtMs, input.endedAtMs);
  const usage = input.usage ?? {};
  const promptTokens = numberOrUndefined(usage.prompt_tokens);
  const completionTokens = numberOrUndefined(usage.completion_tokens);

  const modelAttributes: Record<string, string | number | boolean> = {
    "gen_ai.operation.name": "chat",
    "gen_ai.request.model": input.model,
    "gen_ai.response.model": input.model,
    "codebuddy.conversation_id": op.conversationId,
    "codebuddy.conversation_request_id": op.conversationRequestId,
    "codebuddy.message_id": op.messageId,
    "codebuddy.agent_purpose": op.agentPurpose,
    "codebuddy.step_index": op.stepIndex,
    "codebuddy.status": input.status ?? "success",
  };
  if (promptTokens !== undefined) modelAttributes["gen_ai.usage.input_tokens"] = promptTokens;
  if (completionTokens !== undefined) {
    modelAttributes["gen_ai.usage.output_tokens"] = completionTokens;
  }
  if (input.firstTokenAtMs !== undefined) {
    modelAttributes["codebuddy.first_token_ms"] = Math.max(0, input.firstTokenAtMs - startedAtMs);
  }

  const interaction: CodeBuddySpan = {
    traceId: op.traceId,
    spanId: op.root.interactionSpanId,
    name: "interaction",
    startedAtMs,
    endedAtMs,
    attributes: {
      "codebuddy.conversation_id": op.conversationId,
      "codebuddy.conversation_request_id": op.conversationRequestId,
      "codebuddy.agent_purpose": op.agentPurpose,
      "codebuddy.status": input.status ?? "success",
    },
  };

  const modelRequest: CodeBuddySpan = {
    traceId: op.traceId,
    spanId: op.spanId,
    parentSpanId: op.root.interactionSpanId,
    name: "model_request",
    startedAtMs,
    endedAtMs,
    attributes: modelAttributes,
  };

  return [interaction, modelRequest];
}

function toOtlpAttributes(
  attributes: Record<string, string | number | boolean>
): Array<{ key: string; value: Record<string, unknown> }> {
  return Object.entries(attributes).map(([key, value]) => {
    if (typeof value === "number") {
      return { key, value: { doubleValue: value } };
    }
    if (typeof value === "boolean") {
      return { key, value: { boolValue: value } };
    }
    return { key, value: { stringValue: String(value) } };
  });
}

function toOtlpPayload(spans: CodeBuddySpan[]) {
  return {
    resourceSpans: [
      {
        resource: {
          attributes: toOtlpAttributes({
            "service.name": CODEBUDDY_INTL_SERVICE_NAME,
            "telemetry.sdk.name": "opentelemetry",
            "telemetry.sdk.language": "nodejs",
            "telemetry.sdk.version": "1.30.1",
          }),
        },
        scopeSpans: [
          {
            scope: { name: "codebuddy-cli", version: CODEBUDDY_INTL_CLI.version },
            spans: spans.map((span) => ({
              traceId: span.traceId,
              spanId: span.spanId,
              ...(span.parentSpanId ? { parentSpanId: span.parentSpanId } : {}),
              name: span.name,
              kind: 1,
              startTimeUnixNano: String(BigInt(Math.round(span.startedAtMs)) * 1_000_000n),
              endTimeUnixNano: String(BigInt(Math.round(span.endedAtMs)) * 1_000_000n),
              attributes: toOtlpAttributes(span.attributes),
              status: { code: 1 },
            })),
          },
        ],
      },
    ],
  };
}

/** Export spans. No Authorization header — matching the captured exporter. */
export async function sendTraceSpans(
  spans: CodeBuddySpan[],
  options: SendOptions = {}
): Promise<TelemetryResult> {
  if (!spans.length) return { ok: true, skipped: true };

  const headers: Record<string, string> = {
    "User-Agent": OTLP_EXPORTER_USER_AGENT,
    "Content-Type": "application/json",
  };

  return postJson(
    `${normalizeBaseUrl(options.baseUrl)}${CODEBUDDY_TRACES_PATH}`,
    headers,
    toOtlpPayload(spans),
    options
  );
}

/** Correlation id for one telemetry flush, useful when logging a failure. */
export function telemetryFlushId(): string {
  return hexId(16);
}
