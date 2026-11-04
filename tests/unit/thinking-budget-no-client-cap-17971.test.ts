import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #17971: a reasoning request with NO client output cap must not receive an injected
// 4096 ceiling even when the registry model declares maxOutputTokens.

test("codebuddy-intl deepseek-v4.1-flash: no client cap -> no injected ceiling (#17971)", () => {
  const executor = new DefaultExecutor("codebuddy-intl");
  const body = {
    model: "deepseek-v4.1-flash",
    reasoning_effort: "medium",
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "deepseek-v4.1-flash");

  assert.equal(body.max_tokens, undefined, `injected max_tokens=${body.max_tokens}`);
  assert.equal(body.max_completion_tokens, undefined);
});

test("full transformRequest path leaves no cap (#17971)", () => {
  const executor = new DefaultExecutor("codebuddy-intl");
  const out = executor.transformRequest(
    "deepseek-v4.1-flash",
    {
      model: "deepseek-v4.1-flash",
      reasoning_effort: "medium",
      messages: [{ role: "user", content: "hi" }],
    },
    false,
    { apiKey: "k" }
  ) as Record<string, unknown>;
  assert.equal(out.max_tokens, undefined, `injected max_tokens=${out.max_tokens}`);
});

test("explicit small cap is still respected (#17971 control)", () => {
  const executor = new DefaultExecutor("codebuddy-intl");
  const body = {
    model: "deepseek-v4.1-flash",
    reasoning_effort: "medium",
    max_tokens: 2000,
  } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "deepseek-v4.1-flash");
  assert.equal(body.max_tokens, 2000);
});

test("explicit non-positive cap is repaired to the floor (#17971)", () => {
  const executor = new DefaultExecutor("codebuddy-intl");
  const body = {
    model: "deepseek-v4.1-flash",
    reasoning_effort: "medium",
    max_tokens: 0,
  } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "deepseek-v4.1-flash");
  assert.equal(body.max_tokens, 4096);
});

test("alwaysReasons model with no cap keeps its declared max (#13198 / #17971)", () => {
  const executor = new DefaultExecutor("reka");
  const body = { model: "reka-flash-3" } as Record<string, unknown>;
  executor.ensureThinkingBudget(body, "reka-flash-3");
  assert.equal(body.max_tokens, 8192);
});
