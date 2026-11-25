import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { getPricingForModel } from "../../src/shared/constants/pricing.ts";
import { getCodexFastCostMultiplier } from "../../src/lib/usage/costCalculator.ts";
import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";
import { splitCodexReasoningSuffix } from "../../open-sse/executors/codex/reasoningSuffix.ts";
import { CODEX_NATIVE_UNPREFIXED_MODELS } from "../../open-sse/services/model.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";
import { stripGpt5SamplingWhenReasoning } from "../../open-sse/services/gpt5SamplingGuard.ts";

const MODEL = "gpt-6.1-terra";
const EFFORTS = ["ultra", "max", "xhigh", "high", "medium", "low"];
const IDS = [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)];

test("GPT-6.1 Terra is catalogued for codex and openai with public API limits", () => {
  const codexIds = getModelsByProviderId("codex")
    .map((entry) => entry.id)
    .filter((id) => id.startsWith(MODEL));
  assert.deepEqual(codexIds.sort(), [...IDS].sort());

  const apiIds = getModelsByProviderId("openai")
    .map((entry) => entry.id)
    .filter((id) => id.startsWith(MODEL));
  assert.deepEqual(apiIds, [MODEL]);
  for (const id of IDS) {
    const spec = getModelSpec(id);
    assert.equal(spec?.contextWindow, 1050000);
    assert.equal(spec?.maxOutputTokens, 128000);
  }
});

test("GPT-6.1 Terra pricing uses Standard rates and the >272k long-context tier", () => {
  const api = getPricingForModel("openai", MODEL);
  assert.ok(api);
  assert.equal(api.input, 1);
  assert.equal(api.output, 5);
  assert.equal(api.cached, 0.05);
  assert.equal(api.cache_creation, 1.25);
  assert.equal(api.long_context?.threshold, 272000);
  assert.equal(api.long_context?.input, 2);
  assert.equal(api.long_context?.output, 7.5);

  const codex = getPricingForModel("cx", MODEL);
  assert.ok(codex);
  assert.equal(codex.input, 1);
  assert.equal(codex.output, 5);
  assert.equal(codex.cached, 0.05);
});

test("GPT-6.1 Terra uses the GPT-6 Codex Fast multiplier", () => {
  assert.equal(getCodexFastCostMultiplier("codex", `${MODEL}-ultra`, "fast"), 2);
  assert.equal(getCodexFastCostMultiplier("codex", MODEL, "fast"), 2);
  assert.equal(getCodexFastCostMultiplier("codex", MODEL, "default"), 1);
});

test("GPT-6.1 Terra keeps Codex native bare ids and effort suffixes", () => {
  for (const id of IDS) {
    assert.ok(CODEX_NATIVE_UNPREFIXED_MODELS.has(id), id);
  }
  for (const effort of EFFORTS) {
    const split = splitCodexReasoningSuffix(`${MODEL}-${effort}`);
    assert.equal(split.baseModel, MODEL);
    assert.equal(split.effort, effort);
  }
  assert.deepEqual(splitCodexReasoningSuffix(MODEL), { baseModel: MODEL, effort: null });
});

test("Terra API tools use Responses and retain none through max reasoning", () => {
  const entry = getModelsByProviderId("openai").find((model) => model.id === MODEL);
  assert.ok(entry);
  assert.equal(entry.targetFormat, "openai-responses");
  assert.equal(entry.toolCalling, true);
  assert.deepEqual(entry.supportedThinkingEfforts, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
  ]);
  assert.equal(
    resolveChatCoreTargetFormat({
      provider: "openai",
      resolvedModel: MODEL,
      apiFormat: undefined,
      customModelTargetFormat: undefined,
      providerSpecificData: null,
    }).targetFormat,
    "openai-responses"
  );

  for (const effort of entry.supportedThinkingEfforts) {
    const request = openaiToOpenAIResponsesRequest(
      MODEL,
      {
        model: MODEL,
        messages: [{ role: "user", content: "Use the test tool." }],
        reasoning_effort: effort,
        tools: [
          {
            type: "function",
            function: { name: "test_tool", parameters: { type: "object", properties: {} } },
          },
        ],
      },
      false,
      {}
    ) as { reasoning: { effort: string; summary?: string }; tools: Array<{ name: string }> };
    assert.equal(request.reasoning.effort, effort);
    assert.equal(
      request.reasoning.summary,
      undefined,
      "Terra must not receive an inferred Codex reasoning summary"
    );
    assert.equal(request.tools[0].name, "test_tool");
  }
});

test("Terra Codex registry keeps Responses, bounded OAuth context and reasoning", () => {
  for (const id of IDS) {
    const entry = getModelsByProviderId("codex").find((model) => model.id === id);
    assert.ok(entry, id);
    assert.equal(entry.targetFormat, "openai-responses", id);
    assert.equal(entry.contextLength, 872000, id);
    assert.equal(entry.maxOutputTokens, 128000, id);
    assert.equal(entry.supportsVision, true, id);
  }
});

test("Terra sampling is preserved without reasoning and filtered with active reasoning", () => {
  const fields = { temperature: 0.7, top_p: 0.9, top_logprobs: 2, logprobs: true };

  // Native Responses input already carries reasoning.effort.
  const noneNative = stripGpt5SamplingWhenReasoning(
    { model: MODEL, reasoning: { effort: "none" }, ...fields }, "openai", MODEL
  );
  for (const [key, value] of Object.entries(fields)) assert.equal(noneNative[key as keyof typeof fields], value);

  const activeNative = stripGpt5SamplingWhenReasoning(
    { model: MODEL, reasoning: { effort: "high" }, ...fields }, "openai", MODEL
  );
  for (const key of Object.keys(fields)) assert.equal((activeNative as Record<string, unknown>)[key], undefined);

  // Chat Completions translation to Responses must obey the same policy.
  const chatWithNone = openaiToOpenAIResponsesRequest(MODEL, {
    model: MODEL, messages: [{ role: "user", content: "hello" }], reasoning_effort: "none",
    temperature: fields.temperature, top_p: fields.top_p,
  }, false, {}) as Record<string, unknown>;
  const forwardedNone = stripGpt5SamplingWhenReasoning(chatWithNone, "openai", MODEL);
  assert.equal(forwardedNone.temperature, fields.temperature);
  assert.equal(forwardedNone.top_p, fields.top_p);

  const chatWithActive = openaiToOpenAIResponsesRequest(MODEL, {
    model: MODEL, messages: [{ role: "user", content: "hello" }], reasoning_effort: "high",
    temperature: fields.temperature, top_p: fields.top_p,
  }, false, {}) as Record<string, unknown>;
  const forwardedActive = stripGpt5SamplingWhenReasoning(chatWithActive, "openai", MODEL);
  assert.equal(forwardedActive.temperature, undefined);
  assert.equal(forwardedActive.top_p, undefined);
});
