// The key-health callback preserves dispatch order even when responses arrive out of order.
import test from "node:test";
import assert from "node:assert/strict";
import { resolveResilienceSettings } from "../../src/lib/resilience/settings.ts";

import {
  executeProviderRequest,
  makeResponseKeyHealthRecorder,
  type ExecuteProviderRequestDeps,
} from "../../open-sse/handlers/chatCore/executeProviderRequest.ts";

type Recorded = {
  status: number;
  creds: Record<string, unknown> | null | undefined;
  transport: string | undefined;
  failureDetail: string | undefined;
  retryAfterMs: number | null | undefined;
  requestSeq: number;
};

function recorderSpy() {
  const calls: Recorded[] = [];
  const record = (
    status: number,
    creds: Record<string, unknown> | null | undefined,
    transport: string | undefined,
    failureDetail: string | undefined,
    retryAfterMs: number | null | undefined,
    requestSeq: number
  ) => {
    calls.push({ status, creds, transport, failureDetail, retryAfterMs, requestSeq });
  };
  return { calls, record };
}

test("the response callback reports the dispatch sequence it was built with", () => {
  const requestSeq = 1_700_000_000_123;
  const { calls, record } = recorderSpy();
  const recorder = makeResponseKeyHealthRecorder(record, requestSeq);

  const creds = { connectionId: "conn" };
  recorder(
    new Response("{}", { status: 401, headers: { "content-type": "application/json" } }),
    creds,
    "http",
    "unauthorized"
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].status, 401);
  assert.equal(calls[0].creds, creds, "the callback must forward the credentials it was given");
  assert.equal(calls[0].transport, "http");
  assert.equal(calls[0].failureDetail, "unauthorized");
  assert.equal(calls[0].retryAfterMs, null);
  assert.equal(
    calls[0].requestSeq,
    requestSeq,
    "the callback must not replace the dispatch sequence when the response arrives"
  );
});

test("rate limiting forwards Retry-After and preserves the dispatch sequence", () => {
  const requestSeq = 1_600_000_000_000;
  const { calls, record } = recorderSpy();
  const recorder = makeResponseKeyHealthRecorder(record, requestSeq);

  recorder(
    new Response("{}", {
      status: 429,
      headers: { "content-type": "application/json", "retry-after": "7" },
    }),
    { connectionId: "conn" },
    "http"
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].retryAfterMs, 7_000);
  assert.equal(calls[0].failureDetail, "");
  assert.equal(calls[0].requestSeq, requestSeq);
});

test("a successful response also carries the dispatch sequence", () => {
  const requestSeq = 1_650_000_000_000;
  const { calls, record } = recorderSpy();
  const recorder = makeResponseKeyHealthRecorder(record, requestSeq);

  recorder(new Response("{}", { status: 200, headers: { "content-type": "application/json" } }), {
    connectionId: "conn",
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].status, 200);
  assert.equal(calls[0].retryAfterMs, null);
  assert.equal(calls[0].failureDetail, "");
  assert.equal(calls[0].requestSeq, requestSeq);
});

function requestDeps(
  response: Response,
  record: ExecuteProviderRequestDeps["recordKeyHealthStatus"],
  stream: boolean
): ExecuteProviderRequestDeps {
  const controller = new AbortController();
  const credentials = { connectionId: "kh-real-dispatch", apiKey: "fixture" };
  const body = { model: "fixture-model", messages: [{ role: "user", content: "offline" }] };
  return {
    agentGoalPolicy: {
      detected: false,
      readinessMaxTimeoutMs: 600_000,
      streamRecoveryEnabled: false,
    },
    assertManagedLeaseFence: () => {},
    buildUpstreamHeadersForExecute: () => ({}),
    clientRawRequest: { headers: new Headers(), signal: controller.signal },
    clientResponseFormat: "chat.completions",
    connectionId: null,
    correlationId: null,
    credentials: null,
    dedupEnabled: false,
    dedupHash: null,
    effectiveModel: body.model,
    executor: { execute: async () => response },
    extendedContext: false,
    getExecutionCredentials: () => credentials,
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => false,
    isOpencodeClient: false,
    log: null,
    model: body.model,
    onCredentialsRefreshed: null,
    pendingScope: { id: null, model: body.model, provider: "openai", connectionId: null },
    provider: "openai",
    providerRequestCapture: { capture: () => {}, body: (fallback: unknown) => fallback },
    rawBody: body,
    recordKeyHealthStatus: record,
    requestedModel: body.model,
    resilienceSettings: resolveResilienceSettings(null),
    settings: null,
    skipUpstreamRetry: false,
    stream,
    streamController: { signal: controller.signal },
    targetFormat: "openai",
    trace: () => {},
    traceId: "key-health-dispatch-test",
    translatedBody: body,
    trustedEffortContext: {},
    upstreamStream: stream,
    userAgent: "offline-key-health-test",
  };
}

for (const stream of [true, false]) {
  for (const status of [403, 402]) {
    test(`the ${stream ? "streaming" : "non-streaming"} ${status} dispatch records its own response and sequence`, async () => {
      const { record, calls } = recorderSpy();
      const response = new Response(
        JSON.stringify({ error: { message: "Workspace access denied" } }),
        {
          status,
          headers: { "content-type": "application/json" },
        }
      );
      const result = await executeProviderRequest(requestDeps(response, record, stream));
      await result.response.text();
      assert.equal(calls.length, 1);
      assert.equal(calls[0].status, status);
      assert.equal(calls[0].creds?.connectionId, "kh-real-dispatch");
      assert.match(calls[0].failureDetail ?? "", /Workspace access denied/);
      assert.ok(Number.isSafeInteger(calls[0].requestSeq) && calls[0].requestSeq > 0);
    });
  }
}

test("streaming auth-error classification uses the 64 KiB error cap, not the completion cap", async () => {
  const { record, calls } = recorderSpy();
  const body = JSON.stringify({
    error: { message: "Workspace access denied" },
    padding: "x".repeat(65_536),
  });
  const response = new Response(body, {
    status: 403,
    headers: { "content-type": "application/json" },
  });
  const result = await executeProviderRequest(requestDeps(response, record, true));
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].failureDetail,
    "",
    "an over-cap error is not fully buffered for classification"
  );
  assert.equal(await result.response.text(), body, "the client error body remains intact");
});
