// GLM Anthropic transport: every `thinking: { type: "enabled" }` sent to Z.ai's
// /api/anthropic endpoint must carry a valid `budget_tokens`. Z.ai rejects the
// bare form with HTTP 400 "missing field budget_tokens". The glm-5.2-high/-max
// effort tiers force `thinking.type = "enabled"` on that transport, so before this
// fix they sent the bare form whenever the client omitted thinking or asked for
// adaptive thinking (reasoning_effort max/xhigh is translated to adaptive).
import test from "node:test";
import assert from "node:assert/strict";

import { GlmExecutor } from "../../open-sse/executors/glm.ts";

type AnthropicThinking = { type?: string; budget_tokens?: number };
type TransformedRequest = {
  model?: string;
  effort?: string;
  max_tokens?: number;
  thinking?: AnthropicThinking;
};

const CREDENTIALS = { apiKey: "glm-key" };

function toAnthropic(model: string, body: Record<string, unknown>): TransformedRequest {
  const executor = new GlmExecutor("glm");
  return executor.transformForTransport(
    model,
    { messages: [{ role: "user", content: "hi" }], ...body },
    false,
    CREDENTIALS,
    "anthropic"
  ) as TransformedRequest;
}

function assertValidBudget(out: TransformedRequest, label: string) {
  assert.equal(out.thinking?.type, "enabled", `${label}: thinking.type`);
  const budget = out.thinking?.budget_tokens;
  assert.equal(typeof budget, "number", `${label}: budget_tokens must be present`);
  assert.ok(Number.isInteger(budget), `${label}: budget_tokens must be an integer`);
  assert.ok((budget as number) >= 1024, `${label}: budget_tokens >= 1024 (got ${budget})`);
  assert.ok(
    (budget as number) < (out.max_tokens as number),
    `${label}: budget_tokens (${budget}) < max_tokens (${out.max_tokens})`
  );
}

test("glm-5.2-high without client thinking sends enabled thinking with the high-tier budget", () => {
  const out = toAnthropic("glm-5.2-high", {});

  assert.equal(out.model, "glm-5.2");
  assert.equal(out.effort, "high");
  assert.equal(out.max_tokens, 131072);
  assertValidBudget(out, "glm-5.2-high");
  assert.equal(out.thinking?.budget_tokens, 24576);
});

test("glm-5.2-max without client thinking derives a larger budget that still fits max_tokens", () => {
  const out = toAnthropic("glm-5.2-max", {});

  assert.equal(out.model, "glm-5.2");
  assert.equal(out.effort, "max");
  assert.equal(out.max_tokens, 131072);
  assertValidBudget(out, "glm-5.2-max");
  // max tier = full budget, clamped so 1024 tokens stay for the response.
  assert.equal(out.thinking?.budget_tokens, 131072 - 1024);
});

test("glm-5.2 tiers turn adaptive thinking (reasoning_effort max/xhigh) into a budgeted enabled block", () => {
  for (const [model, effort] of [
    ["glm-5.2-max", "max"],
    ["glm-5.2-high", "xhigh"],
  ] as const) {
    const out = toAnthropic(model, { reasoning_effort: effort });
    assertValidBudget(out, `${model} reasoning_effort=${effort}`);
  }
});

test("glm-5.2 tiers turn a client adaptive thinking block without budget into a budgeted enabled block", () => {
  const out = toAnthropic("glm-5.2-max", { thinking: { type: "adaptive" } });
  assertValidBudget(out, "glm-5.2-max adaptive");
});

test("glm-5.2 tiers keep the client's own budget_tokens", () => {
  const out = toAnthropic("glm-5.2-high", {
    max_tokens: 32000,
    thinking: { type: "enabled", budget_tokens: 8000 },
  });

  assert.equal(out.thinking?.type, "enabled");
  assert.equal(out.thinking?.budget_tokens, 8000);
  assertValidBudget(out, "client budget");
});

test("glm-5.2 tier budget is clamped under a small client max_tokens", () => {
  const out = toAnthropic("glm-5.2-high", { max_tokens: 4096 });

  assert.equal(out.max_tokens, 4096);
  assertValidBudget(out, "max_tokens=4096");
  assert.equal(out.thinking?.budget_tokens, 4096 - 1024);
});

test("glm-5.2 tier drops thinking instead of sending an invalid budget when max_tokens is too small", () => {
  const out = toAnthropic("glm-5.2-high", { max_tokens: 1500 });

  assert.equal(out.max_tokens, 1500);
  assert.equal(out.thinking, undefined);
  assert.equal(out.effort, "high");
});

test("non-tier GLM models on the Anthropic transport also get a budget for bare enabled thinking", () => {
  const out = toAnthropic("glm-5.1", { thinking: { type: "enabled" } });
  assertValidBudget(out, "glm-5.1 enabled");
});

test("GLM Anthropic transport leaves disabled thinking untouched", () => {
  const out = toAnthropic("glm-5.1", { thinking: { type: "disabled" } });
  assert.deepEqual(out.thinking, { type: "disabled" });
});

test("glm-5.2-high execute() puts budget_tokens on the Anthropic wire body", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;
  let wireBody: TransformedRequest | null = null;
  let wireUrl = "";
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    wireUrl = String(url);
    wireBody = JSON.parse(String(init.body || "{}"));
    return Response.json({
      id: "msg_1",
      type: "message",
      role: "assistant",
      model: "glm-5.2",
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 1, output_tokens: 1 },
    });
  };

  try {
    await executor.execute({
      model: "glm-5.2-high",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    } as Parameters<GlmExecutor["execute"]>[0]);

    assert.match(wireUrl, /\/api\/anthropic\/v1\/messages/);
    assert.ok(wireBody, "fetch should have been called");
    assertValidBudget(wireBody as TransformedRequest, "wire body");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
