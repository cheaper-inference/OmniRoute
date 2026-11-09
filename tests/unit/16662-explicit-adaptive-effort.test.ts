import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  applyThinkingBudget,
  DEFAULT_THINKING_CONFIG,
  setThinkingBudgetConfig,
  ThinkingMode,
} from "../../open-sse/services/thinkingBudget.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

afterEach(() => setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG));

function request(complex = false): Record<string, unknown> {
  return {
    model: "agnes-2.5-flash",
    messages: Array.from({ length: complex ? 201 : 1 }, () => ({
      role: "user",
      content: "say pong",
    })),
    tools: Array.from({ length: complex ? 70 : 0 }, (_, i) => ({
      type: "function",
      function: { name: `tool_${i}`, parameters: { type: "object", properties: {} } },
    })),
  };
}

for (const effort of ["none", "minimal", "low", "medium", "high", "xhigh", "max"]) {
  test(`adaptive preserves explicit ${effort} despite configured high and complex input`, () => {
    const body = { ...request(true), reasoning_effort: effort };
    const before = structuredClone(body);
    const result = applyThinkingBudget(body, { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
    assert.equal(result.reasoning_effort, effort);
    assert.deepEqual(body, before, "client request must not be mutated");
  });
}

test("adaptive preserves a nested Responses effort without adding a conflicting top-level effort", () => {
  const body = { ...request(true), reasoning: { effort: "low", summary: "auto" } };
  const result = applyThinkingBudget(body, { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
  assert.deepEqual(result.reasoning, body.reasoning);
  assert.equal(result.reasoning_effort, undefined);
});

test("adaptive preserves explicit high for long content even with configured max", () => {
  const body = {
    ...request(),
    messages: [{ role: "user", content: "x".repeat(2001) }],
    reasoning_effort: "high",
  };
  assert.equal(
    applyThinkingBudget(body, { mode: ThinkingMode.ADAPTIVE, effortLevel: "max" }).reasoning_effort,
    "high"
  );
});

test("adaptive without explicit effort still scales and preserves configured max behavior", () => {
  const body = { ...request(true), reasoning: {} };
  for (const effortLevel of ["high", "max"]) {
    assert.equal(
      applyThinkingBudget(body, { mode: ThinkingMode.ADAPTIVE, effortLevel }).reasoning_effort,
      "xhigh"
    );
  }
  assert.equal(
    applyThinkingBudget(
      { ...request(), reasoning: {} },
      {
        mode: ThinkingMode.ADAPTIVE,
        effortLevel: "max",
      }
    ).reasoning_effort,
    "xhigh"
  );
});

test("explicit effort does not override strip, custom or passthrough mode policy", () => {
  const body = { ...request(), reasoning_effort: "low" };
  assert.equal(applyThinkingBudget(body, { mode: ThinkingMode.AUTO }).reasoning_effort, undefined);
  assert.equal(
    applyThinkingBudget(body, { mode: ThinkingMode.CUSTOM, customBudget: 131072 }).reasoning_effort,
    "xhigh"
  );
  assert.equal(
    applyThinkingBudget(body, { mode: ThinkingMode.PASSTHROUGH }).reasoning_effort,
    "low"
  );
});

for (const explicit of [true, false]) {
  test(`translator to executor sends ${explicit ? "explicit high" : "automatic max"} to Agnes`, async (t) => {
    setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
    const body = {
      ...request(true),
      ...(explicit ? { reasoning_effort: "high" } : { reasoning: {} }),
    };
    let outbound: Record<string, unknown> | undefined;
    t.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
      outbound = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ choices: [], usage: {} }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    const translated = translateRequest(
      "openai",
      "openai",
      "agnes-2.5-flash",
      body,
      false,
      null,
      "agnes"
    );
    const result = await new DefaultExecutor("agnes").execute({
      model: "agnes-2.5-flash",
      body: translated,
      stream: false,
      credentials: { apiKey: "test-only-16662" },
    });
    assert.equal(result.response.status, 200);
    assert.ok(outbound, "the executor must dispatch through the mocked transport");
    assert.equal(outbound.reasoning_effort, explicit ? "high" : "max");
    assert.equal(outbound.model, "agnes-2.5-flash");
  });
}

// Additional approved-contract controls: allocation never replaces a meaningful
// client effort, while missing/non-string hints still take the automatic path.
for (const hint of [null, 0, false, {}]) {
  test(`adaptive treats non-string effort ${JSON.stringify(hint)} as automatic`, () => {
    const result = applyThinkingBudget(
      { ...request(true), reasoning_effort: hint },
      { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" }
    );
    assert.equal(result.reasoning_effort, "xhigh");
  });
}

test("adaptive still strips explicit effort for a model without reasoning support", () => {
  const result = applyThinkingBudget(
    { ...request(true), model: "llama-3.3-70b-versatile", reasoning_effort: "high" },
    { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" }
  );
  assert.equal(result.reasoning_effort, undefined);
});

for (const scenario of [
  {
    name: "Responses nested effort",
    source: "openai-responses",
    hint: { reasoning: { effort: "low", summary: "auto" } },
    expected: "low",
  },
  {
    name: "Claude output effort",
    source: "claude",
    hint: { output_config: { effort: "low" } },
    expected: "low",
  },
  {
    name: "provider capability normalization",
    source: "openai",
    hint: { reasoning_effort: "xhigh" },
    expected: "max",
  },
]) {
  test(`approved adaptive contract preserves ${scenario.name} on the dispatched wire`, async (t) => {
    setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
    const base = request(true);
    const body =
      scenario.source === "openai-responses"
        ? { model: base.model, input: base.messages, ...scenario.hint }
        : { ...base, ...scenario.hint };
    let outbound: Record<string, unknown> | undefined;
    t.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
      outbound = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ choices: [], usage: {} }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    const translated = translateRequest(
      scenario.source,
      "openai",
      "agnes-2.5-flash",
      body,
      false,
      null,
      "agnes"
    );
    const result = await new DefaultExecutor("agnes").execute({
      model: "agnes-2.5-flash",
      body: translated,
      stream: false,
      credentials: { apiKey: "test-only-16662" },
    });
    assert.equal(result.response.status, 200);
    assert.ok(outbound);
    assert.equal(outbound.reasoning_effort, scenario.expected);
  });
}

test("adaptive honors explicit native Claude effort without reallocating its budget", () => {
  const body = {
    ...request(true),
    model: "claude-sonnet-4-6",
    output_config: { effort: "low" },
    thinking: { type: "enabled", budget_tokens: 1024 },
  };
  const before = structuredClone(body);
  const result = applyThinkingBudget(body, { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
  assert.deepEqual(result.thinking, body.thinking);
  assert.deepEqual(result.output_config, body.output_config);
  assert.deepEqual(body, before);
});

test("adaptive scales native numeric budgets when no discrete effort was requested", () => {
  const result = applyThinkingBudget(
    {
      ...request(true),
      model: "claude-sonnet-4-6",
      thinking: { type: "enabled", budget_tokens: 1024 },
    },
    { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" }
  );
  assert.ok(result.thinking.budget_tokens > 1024);
});

for (const scenario of [
  { name: "top-level thinkingLevel", hint: { thinkingLevel: "low" }, gemini: false },
  { name: "top-level thinking_level", hint: { thinking_level: "low" }, gemini: false },
  {
    name: "Gemini thinkingConfig",
    hint: { generationConfig: { thinkingConfig: { thinkingLevel: "low" } } },
    gemini: true,
  },
  {
    name: "Gemini thinking_config",
    hint: { generationConfig: { thinking_config: { thinkingLevel: "low" } } },
    gemini: true,
  },
]) {
  test(`adaptive honors explicit ${scenario.name} after level normalization`, () => {
    const body = { ...request(true), model: "gemini-3.7-flash", ...scenario.hint };
    const result = applyThinkingBudget(body, { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
    if (scenario.gemini) {
      assert.deepEqual(result.generationConfig, { thinkingConfig: { thinkingBudget: 4096 } });
    } else {
      assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 4096 });
    }
  });
}

test("adaptive preserves explicit thinkingLevel none instead of enabling thinking", () => {
  const result = applyThinkingBudget(
    { ...request(true), model: "gemini-3.7-flash", thinkingLevel: "none" },
    { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" }
  );
  assert.deepEqual(result.thinking, { type: "disabled", budget_tokens: 0 });
});

test("native effort does not bypass strip or custom mode policy", () => {
  const body = {
    ...request(true),
    model: "claude-sonnet-4-6",
    output_config: { effort: "low" },
    thinking: { type: "enabled", budget_tokens: 1024 },
  };
  const stripped = applyThinkingBudget(body, { mode: ThinkingMode.AUTO });
  assert.equal(stripped.thinking, undefined);
  assert.equal(stripped.output_config, undefined);
  const custom = applyThinkingBudget(body, { mode: ThinkingMode.CUSTOM, customBudget: 8192 });
  assert.equal(custom.thinking.budget_tokens, 8192);
});

test("adaptive leaves native max explicit without injecting an automatic budget", () => {
  const result = applyThinkingBudget(
    { ...request(true), model: "claude-opus-4-7", output_config: { effort: "max" } },
    { mode: ThinkingMode.ADAPTIVE, effortLevel: "medium" }
  );
  assert.deepEqual(result.output_config, { effort: "max" });
  assert.equal(result.thinking, undefined);
});

for (const scenario of [
  { name: "empty output effort", hint: { output_config: { effort: "" } } },
  { name: "shadowed thinking alias", hint: { thinkingLevel: "invalid", thinking_level: "low" } },
  { name: "inherited constructor key", hint: { thinkingLevel: "constructor" } },
  { name: "inherited prototype key", hint: { thinkingLevel: "__proto__" } },
]) {
  test(`malformed native ${scenario.name} does not bypass automatic allocation`, () => {
    const result = applyThinkingBudget(
      {
        ...request(true),
        model: "claude-sonnet-4-6",
        thinking: { type: "enabled", budget_tokens: 1024 },
        ...scenario.hint,
      },
      { mode: ThinkingMode.ADAPTIVE, effortLevel: "high" }
    );
    assert.ok(Number.isFinite(result.thinking.budget_tokens));
    assert.ok(result.thinking.budget_tokens > 1024);
  });
}
