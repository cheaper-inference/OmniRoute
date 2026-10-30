// I2 — the operation context must follow the RETRIES of a turn.
//
// `buildHeaders()` runs once per upstream attempt with the SAME body object, so
// a naive `WeakMap.set` makes every retry replay the first attempt's identity:
// same span, `attempt: 1`, `x-stainless-retry-count: 0` on every dispatch. The
// gateway then sees a single attempt, and the telemetry describes a turn that
// never happened. These tests pin that the stored operation advances per
// attempt while the conversation identity stays put.
import test from "node:test";
import assert from "node:assert/strict";

import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";
import { deriveRetryContext } from "../../open-sse/executors/codebuddy-intl/context.ts";
import { readHarnessMetadata } from "../../open-sse/executors/codebuddy-intl/body.ts";
import {
  createOperationContext,
  createRootContext,
} from "../../open-sse/executors/codebuddy-intl/context.ts";

const creds = { accessToken: "***" };

function bodyFor(text: string) {
  return { model: "glm-5.2", messages: [{ role: "user", content: text }] };
}

/** One upstream attempt: the base executor calls both of these per dispatch. */
function dispatch(exec: CodeBuddyIntlExecutor, body: ReturnType<typeof bodyFor>) {
  const headers = exec.buildHeaders(creds, true, null, "glm-5.2", null, body);
  const out = exec.transformRequest("glm-5.2", body, true, creds) as Record<string, unknown>;
  return { headers, metadata: readHarnessMetadata(out) };
}

test("the retry counter advances on every dispatch of the same body", () => {
  const exec = new CodeBuddyIntlExecutor();
  const body = bodyFor("retry me");

  const first = dispatch(exec, body);
  const second = dispatch(exec, body);
  const third = dispatch(exec, body);

  assert.equal(first.headers["x-stainless-retry-count"], "0");
  assert.equal(second.headers["x-stainless-retry-count"], "1");
  assert.equal(third.headers["x-stainless-retry-count"], "2");
});

test("a retry keeps the conversation but gets its own span", () => {
  const exec = new CodeBuddyIntlExecutor();
  const body = bodyFor("retry me");

  const first = dispatch(exec, body);
  const second = dispatch(exec, body);

  // Same turn: the conversation and trace survive the retry so the gateway and
  // the report can group the attempts.
  assert.equal(first.headers["X-Conversation-ID"], second.headers["X-Conversation-ID"]);
  assert.equal(first.headers["X-Trace-ID"], second.headers["X-Trace-ID"]);

  // Different dispatch: a fresh span, and the new one is parented by the failed
  // attempt's span so the tree shows attempt 1 -> attempt 2.
  assert.notEqual(
    first.headers["X-Conversation-Request-ID"],
    second.headers["X-Conversation-Request-ID"]
  );
  assert.notEqual(
    first.headers["X-Conversation-Message-ID"],
    second.headers["X-Conversation-Message-ID"]
  );
});

test("each dispatch stays internally coherent after a retry", () => {
  const exec = new CodeBuddyIntlExecutor();
  const body = bodyFor("retry me");

  dispatch(exec, body);
  const retried = dispatch(exec, body);

  assert.ok(retried.metadata);
  assert.equal(retried.metadata.conversationId, retried.headers["X-Conversation-ID"]);
  assert.equal(
    retried.metadata.conversationRequestId,
    retried.headers["X-Conversation-Request-ID"]
  );
  assert.equal(retried.metadata.messageId, retried.headers["X-Conversation-Message-ID"]);
  assert.equal(retried.metadata.traceId, retried.headers["X-Trace-ID"]);
});

test("a different body still starts at attempt 1", () => {
  const exec = new CodeBuddyIntlExecutor();
  const bodyA = bodyFor("a");
  const bodyB = bodyFor("b");

  dispatch(exec, bodyA);
  dispatch(exec, bodyA);
  const fresh = dispatch(exec, bodyB);

  assert.equal(fresh.headers["x-stainless-retry-count"], "0");
});

test("deriveRetryContext advances the attempt and re-parents the span", () => {
  const op = createOperationContext(createRootContext(), "conversation");
  const retried = deriveRetryContext(op);

  assert.equal(op.attempt, 1);
  assert.equal(retried.attempt, 2);
  assert.equal(retried.spanId.length, 16);
  assert.notEqual(retried.spanId, op.spanId);
  assert.equal(retried.parentSpanId, op.spanId);
  // The turn identity survives.
  assert.equal(retried.root, op.root);
  assert.equal(retried.conversationId, op.conversationId);
  assert.equal(retried.traceId, op.traceId);
  // The retried dispatch is a new message, never a replay of the failed one.
  assert.notEqual(retried.messageId, op.messageId);
  assert.equal(retried.requestId, retried.messageId);
});
