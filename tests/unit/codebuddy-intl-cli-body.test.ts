// Phase C — CodeBuddy International CLI request body.
//
// Captured shape: system as a string, user content as an array, stream forced,
// `stream_options.include_usage`, `cache_retention: "long"`, and
// `extra_vars.harnessMetadata` as a JSON *string* (not a nested object).
// Reasoning params are per-request evidence, not universal defaults.
import test from "node:test";
import assert from "node:assert/strict";

import {
  createOperationContext,
  createRootContext,
} from "../../open-sse/executors/codebuddy-intl/context.ts";
import {
  applyCliBody,
  readHarnessMetadata,
  HARNESS_METADATA_KEY,
} from "../../open-sse/executors/codebuddy-intl/body.ts";

const root = () => createRootContext();
const op = (purpose: "conversation" | "summary" | "prompt_suggestion" = "conversation") =>
  createOperationContext(root(), purpose);

test("harnessMetadata is serialized as a JSON string", () => {
  const operation = op();
  const body = applyCliBody(
    { model: "kimi-k3.1-pro", messages: [{ role: "user", content: "hi" }] },
    { op: operation }
  );

  const extra = body.extra_vars as Record<string, unknown>;
  assert.equal(typeof extra[HARNESS_METADATA_KEY], "string");

  const parsed = JSON.parse(extra[HARNESS_METADATA_KEY] as string) as Record<string, unknown>;
  assert.equal(parsed.sessionId, operation.root.conversationId);
  assert.equal(parsed.conversationId, operation.conversationId);
  assert.equal(parsed.conversationRequestId, operation.conversationRequestId);
  assert.equal(parsed.messageId, operation.messageId);
  assert.equal(parsed.stepIndex, 0);
});

test("harnessMetadata does not leak the telemetry session id", () => {
  const operation = op();
  const body = applyCliBody({ model: "m", messages: [] }, { op: operation });
  const parsed = readHarnessMetadata(body);

  assert.ok(parsed);
  assert.notEqual(parsed.sessionId, operation.root.sessionId);
});

test("the CLI body forces streaming and long cache retention", () => {
  const body = applyCliBody({ model: "m", messages: [] }, { op: op() });

  assert.equal(body.stream, true);
  assert.deepEqual(body.stream_options, { include_usage: true });
  assert.equal(body.cache_retention, "long");
});

test("step counters stay independent of the harness step index", () => {
  const operation = op();
  const body = applyCliBody(
    { model: "m", messages: [] },
    { op: operation, currentStepCount: 1, totalStepCount: 11, stepIndex: 0 }
  );

  assert.equal(body.currentStepCount, 1);
  assert.equal(body.totalStepCount, 11);
  assert.equal(readHarnessMetadata(body)?.stepIndex, 0);
});

test("reasoning parameters are not invented for a model that did not ask", () => {
  const body = applyCliBody({ model: "glm-5.2", messages: [] }, { op: op() });

  assert.equal(body.reasoning_effort, undefined);
  assert.equal(body.reasoning_summary, undefined);
  assert.equal(body.verbosity, undefined);
});

test("explicit reasoning parameters from the caller are preserved", () => {
  const body = applyCliBody(
    {
      model: "kimi-k3.1-pro",
      messages: [],
      reasoning_effort: "high",
      verbosity: "high",
      temperature: 1,
      max_tokens: 32000,
      initiator: "agent",
    },
    { op: op() }
  );

  assert.equal(body.reasoning_effort, "high");
  assert.equal(body.verbosity, "high");
  assert.equal(body.temperature, 1);
  assert.equal(body.max_tokens, 32000);
  assert.equal(body.initiator, "agent");
});

test("an auxiliary call gets its own agent classification", () => {
  const operation = op("summary");
  const body = applyCliBody({ model: "m", messages: [] }, { op: operation });
  const parsed = readHarnessMetadata(body);

  assert.equal(parsed?.agentType, "auxiliary");
  assert.equal(parsed?.agentPurpose, "summary");
});

test("applyCliBody never mutates the caller's body", () => {
  const original = { model: "m", messages: [{ role: "user", content: "hi" }] };
  const snapshot = JSON.stringify(original);
  applyCliBody(original, { op: op() });
  assert.equal(JSON.stringify(original), snapshot);
});

test("an existing extra_vars object is preserved and extended", () => {
  const body = applyCliBody(
    { model: "m", messages: [], extra_vars: { keep: "yes" } },
    { op: op() }
  );
  const extra = body.extra_vars as Record<string, unknown>;
  assert.equal(extra.keep, "yes");
  assert.equal(typeof extra[HARNESS_METADATA_KEY], "string");
});

test("readHarnessMetadata tolerates missing and malformed values", () => {
  assert.equal(readHarnessMetadata({}), null);
  assert.equal(readHarnessMetadata({ extra_vars: {} }), null);
  assert.equal(readHarnessMetadata({ extra_vars: { harnessMetadata: "{not json" } }), null);
  assert.equal(readHarnessMetadata({ extra_vars: { harnessMetadata: 42 } }), null);
});
