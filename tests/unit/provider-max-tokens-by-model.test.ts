import test from "node:test";
import assert from "node:assert/strict";

import { normalizeUpstreamRequestParams } from "../../open-sse/handlers/chatCore/upstreamRequestParams.ts";

// PROVIDER_MAX_TOKENS is a per-provider API limit. For openai and anthropic the real limit is
// per model (gpt-5.5 and claude-opus-4-6 allow 128000), so the model's own output cap decides.
function run(
  provider: string,
  field: "max_tokens" | "max_completion_tokens",
  value: number,
  modelOutputCap?: number | null
) {
  const body: Record<string, unknown> = { model: "m", messages: [], [field]: value };
  normalizeUpstreamRequestParams({
    translatedBody: body,
    modelSupportsMaxTokens: field === "max_tokens",
    provider,
    model: "m",
    targetFormat: "openai",
    providerSpecificData: null,
    modelOutputCap,
  });
  return body[field];
}

test("openai: a model with a 128000 output cap is not clamped to the 16384 provider cap", () => {
  assert.equal(run("openai", "max_completion_tokens", 100000, 128000), 100000);
});

test("anthropic: a model with a 128000 output cap is not clamped to the 65536 provider cap", () => {
  assert.equal(run("anthropic", "max_tokens", 100000, 128000), 100000);
});

test("openai and anthropic: a request above the model cap is clamped to the model cap", () => {
  assert.equal(run("openai", "max_completion_tokens", 200000, 128000), 128000);
  assert.equal(run("anthropic", "max_tokens", 200000, 128000), 128000);
});

test("openai: a model with a smaller cap than the provider table keeps that smaller cap", () => {
  assert.equal(run("openai", "max_tokens", 100000, 8192), 8192);
});

test("openai and anthropic: a model with no known cap keeps the provider cap", () => {
  assert.equal(run("openai", "max_completion_tokens", 100000), 16384);
  assert.equal(run("openai", "max_completion_tokens", 100000, null), 16384);
  assert.equal(run("anthropic", "max_tokens", 100000, null), 65536);
});

test("providers whose table cap is a real API limit ignore the model cap", () => {
  assert.equal(run("sensenova", "max_tokens", 100000, 128000), 65536);
  assert.equal(run("groq", "max_tokens", 100000, 128000), 16384);
  assert.equal(run("gemini", "max_tokens", 100000, 128000), 65536);
});

test("a request below every cap is left alone", () => {
  assert.equal(run("openai", "max_completion_tokens", 1000, 128000), 1000);
  assert.equal(run("openai", "max_completion_tokens", 1000), 1000);
});

test("chat path: the body sent to OpenAI keeps a large max_completion_tokens for a 128000 model", async () => {
  const { createChatPipelineHarness } = await import("../integration/_chatPipelineHarness.ts");
  const h = await createChatPipelineHarness("provider-max-tokens-by-model");
  try {
    await h.resetStorage();
    await h.seedConnection("openai", { name: "max-tokens", apiKey: "k-max-tokens" });
    let sent: Record<string, unknown> = {};
    globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
      sent = JSON.parse(String(init.body ?? "{}")) as Record<string, unknown>;
      return h.buildOpenAIResponse("ok", "gpt-5.5");
    }) as typeof fetch;
    const res = await h.handleChat(
      h.buildRequest({
        body: {
          model: "openai/gpt-5.5",
          stream: false,
          max_completion_tokens: 100000,
          messages: [{ role: "user", content: `cap ${crypto.randomUUID()}` }],
        },
      })
    );
    await res.text();
    const wire = sent.max_completion_tokens ?? sent.max_tokens;
    assert.equal(
      wire,
      100000,
      JSON.stringify({
        max_completion_tokens: sent.max_completion_tokens,
        max_tokens: sent.max_tokens,
      })
    );
  } finally {
    await h.cleanup();
  }
});
