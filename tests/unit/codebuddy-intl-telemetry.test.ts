// Phase D — synthetic telemetry with REAL transport.
//
// The events are generated locally from the actual execution (ids, timings,
// tokens, bytes, outcome) and then POSTed to /v2/report and /v1/traces. These
// tests pin the event sequence, the id families and the usage mapping.
import test from "node:test";
import assert from "node:assert/strict";

import {
  createOperationContext,
  createRootContext,
} from "../../open-sse/executors/codebuddy-intl/context.ts";
import {
  CodeBuddyTelemetrySession,
  mapReportCacheMetrics,
  REPORT_EVENT_SEQUENCE,
} from "../../open-sse/executors/codebuddy-intl/telemetry.ts";

const HEX32 = /^[0-9a-f]{32}$/;

function makeSession() {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");
  const session = new CodeBuddyTelemetrySession({
    root,
    machineId: "machine-1",
    accountId: "user-sub-1",
  });
  return { root, op, session };
}

test("a successful turn emits the captured event sequence", () => {
  const { op, session } = makeSession();

  session.requestSend(op, { model: "kimi-k3.1-pro" });
  session.messageSend(op, { model: "kimi-k3.1-pro" });
  session.messageResponse(op, { content: "hello" });
  session.messageStatus(op, { status: "success" });
  session.requestResponse(op, { status: "success" });

  assert.deepEqual(
    session.events.map((event) => event.event),
    [...REPORT_EVENT_SEQUENCE]
  );
});

test("every event carries the same turn identity as the chat request", () => {
  const { root, op, session } = makeSession();
  session.requestSend(op, { model: "m" });
  session.messageSend(op, { model: "m" });
  session.messageResponse(op, { content: "x" });
  session.requestResponse(op, { status: "success" });

  for (const event of session.events) {
    assert.equal(event.sessionId, root.conversationId, event.event);
    assert.equal(event.traceId, root.traceId, event.event);
    assert.match(event.requestId, HEX32, event.event);
    assert.match(event.conversationRequestId, HEX32, event.event);
  }
});

test("the telemetry envelope session id stays separate from the conversation", () => {
  const { root, session } = makeSession();
  assert.notEqual(session.sessionId, root.conversationId);
  assert.notEqual(session.sessionId, root.sessionId);
});

test("usage is recorded once, without double-counting reasoning tokens", () => {
  const { op, session } = makeSession();
  session.messageResponse(op, {
    usage: {
      prompt_tokens: 14218,
      completion_tokens: 131,
      total_tokens: 14349,
      completion_tokens_details: { reasoning_tokens: 95 },
      completion_thinking_tokens: 95,
      prompt_cache_hit_tokens: 768,
      prompt_cache_miss_tokens: 13450,
      credit: 2.15,
    },
  });

  const event = session.events.at(-1);
  assert.ok(event);
  assert.equal(event.usage?.completionTokens, 131);
  assert.equal(event.usage?.reasoningTokens, 95);
  // Reasoning is already inside completion — the total must not add it again.
  assert.equal(event.usage?.totalTokens, 14349);
  assert.equal(event.usage?.credit, 2.15);
});

test("report cache metrics stay distinct from SSE cache metrics", () => {
  const metrics = mapReportCacheMetrics({
    prompt_cache_hit_tokens: 768,
    prompt_cache_miss_tokens: 13450,
  });

  // Captured report shape: hits → cachedTokens, misses → cachedWriteTokens.
  assert.equal(metrics.cachedTokens, 768);
  assert.equal(metrics.cachedWriteTokens, 13450);
  assert.equal(metrics.cachedMissTokens, 0);
});

test("report cache mapping tolerates a missing usage block", () => {
  assert.deepEqual(mapReportCacheMetrics(undefined), {
    cachedTokens: 0,
    cachedWriteTokens: 0,
    cachedMissTokens: 0,
  });
});

test("an aborted turn still closes with a status and a response event", () => {
  const { op, session } = makeSession();
  session.requestSend(op, { model: "m" });
  session.messageSend(op, { model: "m" });
  session.fail(op, { status: "cancelled", message: "client disconnected" });

  const names = session.events.map((event) => event.event);
  assert.equal(names.includes("chat_message_status"), true);
  assert.equal(names.at(-1), "chat_request_response");
});

test("timings are ordered and never invented before they happen", () => {
  const { op, session } = makeSession();
  session.requestSend(op, { model: "m" });
  session.firstToken(op);
  session.messageResponse(op, { content: "hi" });

  const sent = session.events.find((event) => event.event === "chat_request_send");
  const response = session.events.find((event) => event.event === "chat_message_response");
  assert.ok(sent?.presentAt);
  assert.ok(response?.presentAt);
  assert.equal(typeof response?.firstTokenAt, "string");
  assert.ok(Date.parse(response!.firstTokenAt!) >= Date.parse(sent!.presentAt));
});

test("the batch envelope reports the CLI identity and the account", () => {
  const { session } = makeSession();
  const batch = session.buildBatch();

  assert.equal(batch.version, "2.175.0");
  assert.equal(batch.featureModule, "cli_local");
  assert.equal(batch.machineId, "machine-1");
  assert.equal(batch.sessionId, session.sessionId);
  assert.equal(typeof batch.events, "object");
  assert.equal(Array.isArray(batch.events), true);
});

test("building a batch drains the buffer so events are not sent twice", () => {
  const { op, session } = makeSession();
  session.requestSend(op, { model: "m" });

  const first = session.buildBatch();
  assert.equal(first.events.length, 1);

  const second = session.buildBatch();
  assert.equal(second.events.length, 0);
});

test("report events never reuse the HTTP batch request id", () => {
  const { op, session } = makeSession();
  session.requestSend(op, { model: "m" });
  const batch = session.buildBatch();

  assert.match(batch.batchRequestId, HEX32);
  for (const event of batch.events) {
    assert.notEqual(event.requestId, batch.batchRequestId);
  }
});
