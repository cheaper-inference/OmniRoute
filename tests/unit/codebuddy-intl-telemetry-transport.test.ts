// Phase D — telemetry transport.
//
// The events are synthetic (OmniRoute builds them) but they are really SENT to
// /v2/report and /v1/traces. Non-negotiable property: telemetry must never be
// able to break the data plane — every failure is swallowed and reported, never
// thrown, and every request is bounded by a timeout.
import test from "node:test";
import assert from "node:assert/strict";

import {
  createOperationContext,
  createRootContext,
} from "../../open-sse/executors/codebuddy-intl/context.ts";
import { CodeBuddyTelemetrySession } from "../../open-sse/executors/codebuddy-intl/telemetry.ts";
import {
  sendReportBatch,
  sendTraceSpans,
  buildSpanTree,
  CODEBUDDY_REPORT_PATH,
  CODEBUDDY_TRACES_PATH,
} from "../../open-sse/executors/codebuddy-intl/telemetryTransport.ts";

function okFetch(calls: Array<{ url: string; init: RequestInit }>): typeof fetch {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

function makeSession() {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");
  const session = new CodeBuddyTelemetrySession({
    root,
    machineId: "machine-1",
    accountId: "user-1",
  });
  session.requestSend(op, { model: "kimi-k3.1-pro" });
  session.messageResponse(op, {
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  });
  session.requestResponse(op, { status: "success" });
  return { root, op, session };
}

test("the report batch is POSTed to /v2/report with the CLI identity", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const { session } = makeSession();

  const result = await sendReportBatch(session.buildBatch(), {
    baseUrl: "https://www.codebuddy.ai",
    accessToken: "token-1",
    fetchImpl: okFetch(calls),
  });

  assert.equal(result.ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `https://www.codebuddy.ai${CODEBUDDY_REPORT_PATH}`);
  assert.equal(calls[0].init.method, "POST");

  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer token-1");
  assert.equal(headers["User-Agent"], "CLI/2.175.0 CodeBuddy/2.175.0");
  assert.equal(headers["X-IDE-Type"], "CLI");

  const body = JSON.parse(String(calls[0].init.body)) as Record<string, unknown>;
  assert.equal(body.version, "2.175.0");
  assert.equal(Array.isArray(body.events), true);

  // Envelope contract verified against the live gateway (HTTP 400
  // "10001:eventCode is empty or not string" without it): the terminal event is
  // named at the TOP LEVEL, and reportDelay/timestamp live there too.
  assert.equal(body.eventCode, "chat_request_response");
  assert.equal(typeof body.reportDelay, "number");
  assert.equal(typeof body.timestamp, "number");
});

test("an empty batch is not sent at all", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const { session } = makeSession();
  session.buildBatch();

  const result = await sendReportBatch(session.buildBatch(), {
    baseUrl: "https://www.codebuddy.ai",
    accessToken: "t",
    fetchImpl: okFetch(calls),
  });

  assert.equal(result.ok, true);
  assert.equal(result.skipped, true);
  assert.equal(calls.length, 0);
});

test("a network failure is reported, never thrown", async () => {
  const { session } = makeSession();
  const failing = (async () => {
    throw new Error("ECONNRESET");
  }) as unknown as typeof fetch;

  const result = await sendReportBatch(session.buildBatch(), {
    baseUrl: "https://www.codebuddy.ai",
    accessToken: "t",
    fetchImpl: failing,
  });

  assert.equal(result.ok, false);
  assert.match(String(result.error), /ECONNRESET/);
});

test("an HTTP error status is reported without leaking the body", async () => {
  const { session } = makeSession();
  const notFound = (async () =>
    new Response('{"secret":"internal detail"}', { status: 404 })) as unknown as typeof fetch;

  const result = await sendReportBatch(session.buildBatch(), {
    baseUrl: "https://www.codebuddy.ai",
    accessToken: "t",
    fetchImpl: notFound,
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, 404);
  assert.equal(JSON.stringify(result).includes("internal detail"), false);
});

test("a hung request is abandoned at the timeout instead of blocking", async () => {
  const { session } = makeSession();
  const hanging = ((_url: unknown, init?: RequestInit) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new Error("aborted")));
    })) as unknown as typeof fetch;

  const started = Date.now();
  const result = await sendReportBatch(session.buildBatch(), {
    baseUrl: "https://www.codebuddy.ai",
    accessToken: "t",
    fetchImpl: hanging,
    timeoutMs: 50,
  });

  assert.equal(result.ok, false);
  assert.ok(Date.now() - started < 5_000);
});

test("the span tree has one interaction span with model_request children", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");

  const spans = buildSpanTree(op, {
    model: "kimi-k3.1-pro",
    startedAtMs: 1_000,
    endedAtMs: 1_500,
    firstTokenAtMs: 1_200,
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  });

  const interaction = spans.find((span) => span.name === "interaction");
  const modelRequest = spans.find((span) => span.name === "model_request");
  assert.ok(interaction);
  assert.ok(modelRequest);

  assert.equal(interaction.spanId, root.interactionSpanId);
  assert.equal(interaction.parentSpanId, undefined);
  assert.equal(modelRequest.spanId, op.spanId);
  assert.equal(modelRequest.parentSpanId, root.interactionSpanId);
  assert.equal(interaction.traceId, root.traceId);
  assert.equal(modelRequest.traceId, root.traceId);
});

test("spans use the trace/span id widths the gateway accepts", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");
  const spans = buildSpanTree(op, { model: "m", startedAtMs: 1, endedAtMs: 2 });

  for (const span of spans) {
    assert.match(span.traceId, /^[0-9a-f]{32}$/, span.name);
    assert.match(span.spanId, /^[0-9a-f]{16}$/, span.name);
    if (span.parentSpanId) assert.match(span.parentSpanId, /^[0-9a-f]{16}$/, span.name);
  }
});

test("span timings are monotonic", () => {
  const op = createOperationContext(createRootContext(), "conversation");
  const spans = buildSpanTree(op, {
    model: "m",
    startedAtMs: 1_000,
    endedAtMs: 1_800,
    firstTokenAtMs: 1_250,
  });

  for (const span of spans) {
    assert.ok(span.endedAtMs >= span.startedAtMs, span.name);
  }
});

test("spans are POSTed to /v1/traces as OTLP without an Authorization header", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");
  const spans = buildSpanTree(op, { model: "m", startedAtMs: 1, endedAtMs: 2 });

  const result = await sendTraceSpans(spans, {
    baseUrl: "https://www.codebuddy.ai",
    fetchImpl: okFetch(calls),
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0].url, `https://www.codebuddy.ai${CODEBUDDY_TRACES_PATH}`);

  const headers = calls[0].init.headers as Record<string, string>;
  // Captured: the OTLP exporter sends no Authorization header.
  assert.equal(headers.Authorization, undefined);
  assert.match(headers["User-Agent"], /OTel-OTLP-Exporter/);

  const body = JSON.parse(String(calls[0].init.body)) as {
    resourceSpans: Array<{
      resource: { attributes: Array<{ key: string; value: { stringValue: string } }> };
      scopeSpans: Array<{ spans: unknown[] }>;
    }>;
  };
  const attributes = body.resourceSpans[0].resource.attributes;
  const serviceName = attributes.find((attribute) => attribute.key === "service.name");
  assert.equal(serviceName?.value.stringValue, "CodeBuddy-CLI-2.175.0");
  assert.equal(body.resourceSpans[0].scopeSpans[0].spans.length, spans.length);
});

test("sending an empty span list is a no-op", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const result = await sendTraceSpans([], {
    baseUrl: "https://www.codebuddy.ai",
    fetchImpl: okFetch(calls),
  });

  assert.equal(result.ok, true);
  assert.equal(result.skipped, true);
  assert.equal(calls.length, 0);
});

test("a traces failure never escapes", async () => {
  const op = createOperationContext(createRootContext(), "conversation");
  const spans = buildSpanTree(op, { model: "m", startedAtMs: 1, endedAtMs: 2 });
  const failing = (async () => {
    throw new Error("boom");
  }) as unknown as typeof fetch;

  const result = await sendTraceSpans(spans, {
    baseUrl: "https://www.codebuddy.ai",
    fetchImpl: failing,
  });
  assert.equal(result.ok, false);
});
