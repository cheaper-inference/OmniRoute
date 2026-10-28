import test from "node:test";
import assert from "node:assert/strict";

import { GlmExecutor } from "../../open-sse/executors/glm.ts";

type ThinkingBody = { thinking?: unknown };

test("GlmExecutor keeps explicit enabled thinking type over adaptive default", () => {
  const executor = new GlmExecutor("glmt");
  const body = {
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "enabled", budget_tokens: 1000 },
  };

  const transformed = executor.transformRequest("glm-5.1", body, true, {
    apiKey: "glm-key",
  }) as ThinkingBody;

  assert.deepEqual(transformed.thinking, { type: "enabled", budget_tokens: 1000 });
});

test("GlmExecutor applies adaptive default when thinking type is missing", () => {
  const executor = new GlmExecutor("glmt");

  const withoutThinking = executor.transformRequest(
    "glm-5.1",
    { messages: [{ role: "user", content: "hi" }] },
    true,
    { apiKey: "glm-key" }
  ) as ThinkingBody;
  assert.deepEqual(withoutThinking.thinking, { type: "adaptive", budget_tokens: 24_576 });

  const typeless = executor.transformRequest(
    "glm-5.1",
    { messages: [{ role: "user", content: "hi" }], thinking: { budget_tokens: 1000 } },
    true,
    { apiKey: "glm-key" }
  ) as ThinkingBody;
  assert.deepEqual(typeless.thinking, { type: "adaptive", budget_tokens: 1000 });
});

test("GlmExecutor leaves thinking untouched without connection default", () => {
  const executor = new GlmExecutor("glm");
  const body = {
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "enabled", budget_tokens: 1000 },
  };

  const transformed = executor.transformRequest("glm-5.1", body, false, {
    apiKey: "glm-key",
  }) as ThinkingBody;

  assert.deepEqual(transformed.thinking, { type: "enabled", budget_tokens: 1000 });
});
