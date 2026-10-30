// Phase D — turn reporting orchestration.
//
// The executor calls this WITHOUT awaiting, so the properties that matter are:
// it never throws, it never blocks, it sends to both endpoints, and it only
// speaks when the operator has opted in.
import test from "node:test";
import assert from "node:assert/strict";

import {
  createOperationContext,
  createRootContext,
} from "../../open-sse/executors/codebuddy-intl/context.ts";
import {
  reportTurn,
  isCodeBuddyTelemetryEnabled,
  CODEBUDDY_TELEMETRY_FLAG,
} from "../../open-sse/executors/codebuddy-intl/reportTurn.ts";
import {
  CODEBUDDY_REPORT_PATH,
  CODEBUDDY_TRACES_PATH,
} from "../../open-sse/executors/codebuddy-intl/telemetryTransport.ts";

/**
 * Telemetry is opt-in, so every test that asserts an outbound report turns the
 * switch on. `reportTurn` resolves the flag through the shared feature-flag
 * resolver (DB override > env > definition default), and the env layer is
 * enough to drive it here without a database.
 */
function withTelemetryOn<T>(run: () => Promise<T>): Promise<T> {
  const previous = process.env[CODEBUDDY_TELEMETRY_FLAG];
  process.env[CODEBUDDY_TELEMETRY_FLAG] = "true";
  return run().finally(() => {
    if (previous === undefined) delete process.env[CODEBUDDY_TELEMETRY_FLAG];
    else process.env[CODEBUDDY_TELEMETRY_FLAG] = previous;
  });
}

const op = () => createOperationContext(createRootContext(), "conversation");

function recordingFetch(calls: Array<{ url: string; body: unknown }>, status = 200) {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body ?? "{}")) });
    return new Response("{}", { status, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

test("a successful turn reports to both /v2/report and /v1/traces", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];
  const operation = op();

  await withTelemetryOn(() =>
    reportTurn({
      op: operation,
      model: "kimi-k3.1-pro",
      startedAtMs: Date.now() - 1_000,
      endedAtMs: Date.now(),
      firstTokenAtMs: Date.now() - 500,
      credentials: { accessToken: "tok" },
      status: "success",
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      fetchImpl: recordingFetch(calls),
    })
  );

  const urls = calls.map((call) => call.url);
  assert.equal(
    urls.some((url) => url.endsWith(CODEBUDDY_REPORT_PATH)),
    true
  );
  assert.equal(
    urls.some((url) => url.endsWith(CODEBUDDY_TRACES_PATH)),
    true
  );
});

test("report events carry the same ids as the chat request", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];
  const operation = op();

  await withTelemetryOn(() =>
    reportTurn({
      op: operation,
      model: "m",
      startedAtMs: Date.now() - 100,
      endedAtMs: Date.now(),
      credentials: { accessToken: "tok" },
      status: "success",
      fetchImpl: recordingFetch(calls),
    })
  );

  const report = calls.find((call) => call.url.endsWith(CODEBUDDY_REPORT_PATH));
  const events = (report?.body as { events: Array<Record<string, unknown>> }).events;

  assert.ok(events.length > 0);
  for (const event of events) {
    assert.equal(event.conversationRequestId, operation.conversationRequestId);
    assert.equal(event.traceId, operation.traceId);
    assert.equal(event.sessionId, operation.root.conversationId);
  }
});

test("a failed turn still closes its events", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];

  await withTelemetryOn(() =>
    reportTurn({
      op: op(),
      model: "m",
      startedAtMs: Date.now() - 100,
      endedAtMs: Date.now(),
      credentials: { accessToken: "tok" },
      status: "error",
      message: "upstream exploded",
      fetchImpl: recordingFetch(calls),
    })
  );

  const report = calls.find((call) => call.url.endsWith(CODEBUDDY_REPORT_PATH));
  const events = (report?.body as { events: Array<{ event: string; status?: string }> }).events;
  const names = events.map((event) => event.event);

  assert.equal(names.includes("chat_message_status"), true);
  assert.equal(names.at(-1), "chat_request_response");
});

test("a telemetry outage never throws", async () => {
  const failing = (async () => {
    throw new Error("network down");
  }) as unknown as typeof fetch;

  await assert.doesNotReject(() =>
    withTelemetryOn(() =>
      reportTurn({
        op: op(),
        model: "m",
        startedAtMs: Date.now() - 100,
        endedAtMs: Date.now(),
        credentials: { accessToken: "tok" },
        status: "success",
        fetchImpl: failing,
      })
    )
  );
});

test("an HTTP error response never throws", async () => {
  await assert.doesNotReject(() =>
    withTelemetryOn(() =>
      reportTurn({
        op: op(),
        model: "m",
        startedAtMs: Date.now() - 100,
        endedAtMs: Date.now(),
        credentials: { accessToken: "tok" },
        status: "success",
        fetchImpl: recordingFetch([], 500),
      })
    )
  );
});

test("telemetry is opt-in: disabled unless the operator enables the flag", () => {
  // Default-off is the whole point: OmniRoute must not report on anyone's behalf.
  assert.equal(
    isCodeBuddyTelemetryEnabled(() => false),
    false
  );
  assert.equal(
    isCodeBuddyTelemetryEnabled(() => true),
    true
  );
  // A failing flag store must never enable reporting silently.
  assert.equal(
    isCodeBuddyTelemetryEnabled(() => {
      throw new Error("flag store down");
    }),
    false
  );
});

test("the default resolution of the flag is disabled", async () => {
  const previous = process.env[CODEBUDDY_TELEMETRY_FLAG];
  delete process.env[CODEBUDDY_TELEMETRY_FLAG];
  try {
    assert.equal(isCodeBuddyTelemetryEnabled(), false);
  } finally {
    if (previous !== undefined) process.env[CODEBUDDY_TELEMETRY_FLAG] = previous;
  }
});

test("a disabled flag sends nothing at all", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];
  const previous = process.env[CODEBUDDY_TELEMETRY_FLAG];
  delete process.env[CODEBUDDY_TELEMETRY_FLAG];

  try {
    await reportTurn({
      op: op(),
      model: "m",
      startedAtMs: Date.now() - 100,
      endedAtMs: Date.now(),
      credentials: { accessToken: "tok" },
      status: "success",
      fetchImpl: recordingFetch(calls),
    });
  } finally {
    if (previous !== undefined) process.env[CODEBUDDY_TELEMETRY_FLAG] = previous;
  }

  assert.equal(calls.length, 0);
});

test("the machine id comes from the account, never from an invented identity", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];

  await withTelemetryOn(() =>
    reportTurn({
      op: op(),
      model: "m",
      startedAtMs: Date.now() - 100,
      endedAtMs: Date.now(),
      credentials: {
        accessToken: "tok",
        providerSpecificData: { machineId: "machine-abc", userId: "user-xyz" },
      },
      status: "success",
      fetchImpl: recordingFetch(calls),
    })
  );

  const report = calls.find((call) => call.url.endsWith(CODEBUDDY_REPORT_PATH));
  const body = report?.body as { machineId: string; accountId?: string };
  assert.equal(body.machineId, "machine-abc");
  assert.equal(body.accountId, "user-xyz");
});

test("without an account machine id none is synthesised", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];

  await withTelemetryOn(() =>
    reportTurn({
      op: op(),
      model: "m",
      startedAtMs: Date.now() - 100,
      endedAtMs: Date.now(),
      credentials: { accessToken: "tok" },
      status: "success",
      fetchImpl: recordingFetch(calls),
    })
  );

  const report = calls.find((call) => call.url.endsWith(CODEBUDDY_REPORT_PATH));
  const body = report?.body as { machineId?: string };
  // A fabricated `omniroute-<platform>-<arch>` would both out the proxy and
  // disclose the host it runs on.
  assert.equal(body.machineId, undefined);
  assert.equal(JSON.stringify(body).includes("omniroute-"), false);
});
