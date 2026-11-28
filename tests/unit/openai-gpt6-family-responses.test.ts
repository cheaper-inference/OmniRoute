import { describe, it } from "node:test";
import assert from "node:assert";

// OpenAI rejects function tools combined with reasoning_effort on
// /v1/chat/completions for the GPT-6 and GPT-5.6+ families ("Function tools with
// reasoning_effort are not supported for gpt-6.2-sol in /v1/chat/completions").
// Ids that post-date the curated catalog must still route to the Responses API.
describe("OpenAI GPT-6 / GPT-5.6+ family routes to the Responses API", () => {
  it("routes an uncatalogued GPT-6.x id to openai-responses, with or without prefix", async () => {
    const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-6.2-sol"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "openai/gpt-6.2-sol"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-6.2-astra"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-6.2-sol-high"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-7-sol"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-5.7-sol"), "openai-responses");
  });

  it("keeps older OpenAI models on chat completions", async () => {
    const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-5.5"), null);
    assert.strictEqual(getModelTargetFormat("openai", "gpt-5.4-mini"), null);
    assert.strictEqual(getModelTargetFormat("openai", "gpt-4o"), null);
  });

  it("does not apply the OpenAI family rule to other providers", async () => {
    const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
    assert.strictEqual(getModelTargetFormat("openai-compatible-chat-x", "gpt-6.2-sol"), null);
  });
});
