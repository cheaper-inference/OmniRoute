// OpenCode Go serves Kimi K3.1 Pro (`kimi-k3.1-pro`) on the chat-completions lane only.
// Values from https://opencode.ai/docs/go/ (endpoint table and pricing, 2026-10-23) and the
// models.dev `opencode-go` entry: 1,048,576 context, 131,072 max output, vision, always-on
// Kimi thinking; $2.00 input / $10.00 output / $0.20 cached / $2.00 cache write per 1M tokens.
import test from "node:test";
import assert from "node:assert/strict";

const { opencode_goProvider } =
  await import("../../open-sse/config/providers/registry/opencode/go/index.ts");
const { OpencodeExecutor, resolveOpencodeTargetFormat } =
  await import("../../open-sse/executors/opencode.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");
const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");

const MODEL = "kimi-k3.1-pro";

test("opencode-go registry lists kimi-k3.1-pro with its published limits", () => {
  const row = (opencode_goProvider.models ?? []).find((entry) => entry.id === MODEL);
  assert.ok(row, "opencode-go registry is missing kimi-k3.1-pro");
  assert.equal(row.name, "Kimi K3.1 Pro");
  assert.equal(row.contextLength, 1_048_576);
  assert.equal(row.maxOutputTokens, 131_072);
  assert.equal(row.supportsReasoning, true);
  assert.equal(row.supportsVision, true);
  // Chat-completions is the registry default lane; no Responses/Claude override.
  assert.equal(row.targetFormat, undefined);
});

test("kimi-k3.1-pro routes to the OpenCode Go chat-completions URL", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode-go", MODEL), "openai");
  const executor = new OpencodeExecutor("opencode-go");
  assert.equal(executor.buildUrl(MODEL, true), "https://opencode.ai/zen/go/v1/chat/completions");
});

test("capability resolver reports the 1M window and 131072 output cap", () => {
  const caps = getResolvedModelCapabilities(
    { provider: "opencode-go", model: MODEL },
    { persistedOverrides: false }
  );
  assert.equal(caps.contextWindow, 1_048_576);
  assert.equal(caps.maxOutputTokens, 131_072);
  assert.equal(caps.supportsVision, true);
});

test("MODEL_SPECS has a separate kimi-k3.1-pro spec; kimi-k3 keeps its 1M output cap", () => {
  const spec = getModelSpec(MODEL);
  assert.ok(spec, "MODEL_SPECS is missing kimi-k3.1-pro");
  assert.equal(spec.contextWindow, 1_048_576);
  assert.equal(spec.maxOutputTokens, 131_072);
  assert.equal(spec.supportsThinking, true);
  assert.equal(spec.supportsTools, true);
  assert.equal(spec.supportsVision, true);
  assert.equal(getModelSpec("kimi-k3")?.maxOutputTokens, 1_048_576);
});

test("opencode-go prices kimi-k3.1-pro at the K3.1 Pro rates", () => {
  const pricing = getPricingForModel("opencode-go", MODEL);
  assert.ok(pricing, "no default pricing for opencode-go/kimi-k3.1-pro");
  assert.equal(pricing.input, 2.0);
  assert.equal(pricing.output, 10.0);
  assert.equal(pricing.cached, 0.2);
  assert.equal(pricing.reasoning, 10.0);
  assert.equal(pricing.cache_creation, 2.0);
});
