// Phase A — CodeBuddy International CLI request context and correlation.
//
// Captured from CLI/2.175.0: the official client keeps a per-conversation
// UUIDv7 (`X-Conversation-ID` == `baggage.codebuddy.session_id`), a per-turn
// 32-hex `X-Conversation-Request-ID` that the MAIN turn also mirrors on
// `X-Root-Request-ID` and in `baggage.codebuddy.conversation_request_id`, and a
// fresh per-step `X-Conversation-Message-ID` that is mirrored on `X-Request-ID`.
//
// Trace ids are a SEPARATE family: `X-Trace-ID` == `X-B3-TraceId` == the
// traceparent trace-id, and it is NOT the root request id. Auxiliary calls keep
// the root trace and baggage but carry their own request/message ids, and each
// purpose has its own rules (see the matrix in the test).
import test from "node:test";
import assert from "node:assert/strict";

import {
  createRootContext,
  createOperationContext,
  buildCorrelationHeaders,
  buildBaggage,
  buildTraceparent,
  buildB3,
  createUuidv7,
  hexId,
  PURPOSE_POLICY,
  type AgentPurpose,
} from "../../open-sse/executors/codebuddy-intl/context.ts";

const UUID_V7_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const HEX32_RE = /^[0-9a-f]{32}$/;
const HEX16_RE = /^[0-9a-f]{16}$/;

test("createUuidv7 emits RFC 9562 version 7 UUIDs", () => {
  const now = Date.UTC(2026, 9, 25, 12, 0, 0);
  const a = createUuidv7(now);
  assert.match(a, UUID_V7_RE);
  // Timestamp prefix: 48-bit big-endian milliseconds.
  assert.equal(a.slice(0, 13).replace(/-/g, "").slice(0, 12), now.toString(16).padStart(12, "0"));
  // Monotonic-ish across calls in the same millisecond: never identical.
  assert.notEqual(createUuidv7(now), a);
  assert.match(createUuidv7(now), UUID_V7_RE);
});

test("hexId produces fixed-width lowercase hex ids", () => {
  assert.match(hexId(16), HEX32_RE);
  assert.match(hexId(8), HEX16_RE);
  assert.equal(new Set(Array.from({ length: 200 }, () => hexId(16))).size, 200);
});

test("root context keeps conversation, turn and trace as distinct families", () => {
  const root = createRootContext();
  assert.match(root.conversationId, UUID_V7_RE);
  assert.match(root.conversationRequestId, HEX32_RE);
  assert.match(root.traceId, HEX32_RE);
  assert.match(root.interactionSpanId, HEX16_RE);
  assert.match(root.sessionId, UUID_V7_RE);

  // The whole point of the correction: trace id is NOT the root request id.
  assert.notEqual(root.traceId, root.conversationRequestId);
});

test("root context can adopt a caller conversation id", () => {
  const conversationId = createUuidv7();
  const root = createRootContext({ conversationId });
  assert.equal(root.conversationId, conversationId);
});

test("main conversation turn mirrors request id onto X-Root-Request-ID", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");

  assert.equal(op.agentType, "main");
  assert.equal(op.conversationId, root.conversationId);
  assert.equal(op.conversationRequestId, root.conversationRequestId);
  assert.equal(op.requestId, op.messageId);

  const headers = buildCorrelationHeaders(op);
  assert.equal(headers["X-Conversation-ID"], root.conversationId);
  assert.equal(headers["X-Conversation-Request-ID"], root.conversationRequestId);
  assert.equal(headers["X-Conversation-Message-ID"], op.messageId);
  assert.equal(headers["X-Request-ID"], op.messageId);
  assert.equal(headers["X-Root-Request-ID"], root.conversationRequestId);
  assert.equal(headers["X-Trace-ID"], root.traceId);
  assert.equal(headers["X-B3-TraceId"], root.traceId);
  assert.equal(headers["X-B3-SpanId"], op.spanId);
  assert.equal(headers["X-B3-ParentSpanId"], op.parentSpanId);
  assert.equal(headers["x-codebuddy-request"], "1");
});

test("each step gets a fresh message id while the turn keeps its request id", () => {
  const root = createRootContext();
  const first = createOperationContext(root, "conversation", { stepIndex: 0 });
  const second = createOperationContext(root, "conversation", { stepIndex: 1 });

  assert.notEqual(first.messageId, second.messageId);
  assert.equal(first.conversationRequestId, second.conversationRequestId);
  assert.equal(first.requestId, first.messageId);
  assert.equal(second.requestId, second.messageId);
  assert.match(first.messageId, HEX32_RE);
});

test("summary keeps the root trace but takes its own conversation and request", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "summary");

  assert.equal(op.agentType, "auxiliary");
  assert.notEqual(op.conversationId, root.conversationId);
  assert.match(op.conversationId, UUID_V7_RE);
  assert.notEqual(op.conversationRequestId, root.conversationRequestId);
  assert.equal(op.root.conversationRequestId, root.conversationRequestId);
  assert.equal(op.spanId !== root.interactionSpanId, true);
  assert.equal(op.parentSpanId, root.interactionSpanId);

  const headers = buildCorrelationHeaders(op);
  // Captured: summary omits both the root request header and x-codebuddy-request.
  assert.equal(headers["X-Root-Request-ID"], undefined);
  assert.equal(headers["x-codebuddy-request"], undefined);
  // ...while the trace family still points at the shared turn.
  assert.equal(headers["X-Trace-ID"], root.traceId);
  assert.equal(headers["X-B3-ParentSpanId"], root.interactionSpanId);
  assert.equal(headers["X-Conversation-ID"], op.conversationId);
});

test("prompt_suggestion keeps the root conversation and root request header", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "prompt_suggestion");

  assert.equal(op.agentType, "auxiliary");
  assert.equal(op.conversationId, root.conversationId);
  assert.notEqual(op.conversationRequestId, root.conversationRequestId);
  assert.notEqual(op.messageId, op.conversationRequestId);

  const headers = buildCorrelationHeaders(op);
  assert.equal(headers["X-Conversation-ID"], root.conversationId);
  assert.equal(headers["X-Root-Request-ID"], root.conversationRequestId);
  assert.equal(headers["x-codebuddy-request"], "1");
  assert.equal(headers["X-B3-ParentSpanId"], root.interactionSpanId);
});

test("every purpose has an explicit policy instead of an assumed default", () => {
  for (const purpose of Object.keys(PURPOSE_POLICY) as AgentPurpose[]) {
    const root = createRootContext();
    const op = createOperationContext(root, purpose);
    const headers = buildCorrelationHeaders(op);

    assert.match(headers["X-Conversation-ID"], UUID_V7_RE, purpose);
    assert.match(headers["X-Conversation-Request-ID"], HEX32_RE, purpose);
    assert.match(headers["X-Conversation-Message-ID"], HEX32_RE, purpose);
    assert.match(headers["X-Trace-ID"], HEX32_RE, purpose);
    assert.match(headers["X-B3-SpanId"], HEX16_RE, purpose);
    assert.equal(headers["X-Trace-ID"], root.traceId, purpose);
  }
});

test("baggage always describes the root turn, even for auxiliaries", () => {
  const root = createRootContext();

  for (const purpose of Object.keys(PURPOSE_POLICY) as AgentPurpose[]) {
    const op = createOperationContext(root, purpose);
    const baggage = buildBaggage(op);
    assert.match(baggage, new RegExp(`codebuddy\\.session_id=${root.conversationId}`));
    assert.match(
      baggage,
      new RegExp(`codebuddy\\.conversation_request_id=${root.conversationRequestId}`)
    );
    // The telemetry session id is a different identifier and must not leak here.
    assert.equal(baggage.includes(root.sessionId), false);
  }
});

test("traceparent and b3 agree on trace and span ids", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");

  const traceparent = buildTraceparent(op);
  const b3 = buildB3(op);

  const match = /^00-([0-9a-f]{32})-([0-9a-f]{16})-01$/.exec(traceparent);
  assert.ok(match, `unexpected traceparent ${traceparent}`);
  assert.equal(match[1], root.traceId);
  assert.equal(match[2], op.spanId);

  assert.equal(b3, `${root.traceId}-${op.spanId}-1-${op.parentSpanId}`);
});

test("retries allocate a new span and keep the operation identity", () => {
  const root = createRootContext();
  const op = createOperationContext(root, "conversation");
  const retry = createOperationContext(root, "conversation", {
    conversationRequestId: op.conversationRequestId,
    messageId: op.messageId,
    retry: true,
  });

  assert.notEqual(retry.spanId, op.spanId);
  assert.equal(retry.conversationRequestId, op.conversationRequestId);
  assert.equal(retry.messageId, op.messageId);
  assert.equal(retry.traceId, root.traceId);
});

test("two concurrent requests never share generated identifiers", () => {
  const a = createRootContext();
  const b = createRootContext();

  assert.notEqual(a.conversationId, b.conversationId);
  assert.notEqual(a.conversationRequestId, b.conversationRequestId);
  assert.notEqual(a.traceId, b.traceId);
  assert.notEqual(a.sessionId, b.sessionId);

  const opA = createOperationContext(a, "conversation");
  const opB = createOperationContext(b, "conversation");
  assert.notEqual(opA.messageId, opB.messageId);
  assert.notEqual(opA.spanId, opB.spanId);
});
