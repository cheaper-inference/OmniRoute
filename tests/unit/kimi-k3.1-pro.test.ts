import test from "node:test";
import assert from "node:assert/strict";

import {
  getRegistryEntry,
  getRegistryModelThinkingEfforts,
} from "../../open-sse/config/providerRegistry.ts";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base.ts";
import { normalizeMoonshotRequest } from "../../open-sse/executors/moonshot.ts";
import { splitKimiCodingEffortVariant } from "../../open-sse/utils/kimiCodingEffortVariant.ts";
import {
  getKimiCodeStaticThinkingPolicy,
  KIMI_CODING_WIRE_MODEL_ALIASES,
} from "../../open-sse/config/providers/registry/kimi/coding/runtime.ts";
import { requiresReasoningReplay } from "../../open-sse/services/reasoningCache.ts";
import { requiresAuthenticReasoningContent } from "../../open-sse/utils/reasoningContentInjector.ts";
import { buildSyncedCapabilities } from "../../src/app/api/v1/models/syncedCapabilities.ts";
import { parseKimiCodingModels } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";

const K31 = "kimi-k3.1-pro";
const K31_HS = "kimi-k3.1-pro-highspeed";
const CODING_K31 = "k3.1-pro";
const CODING_K31_HS = "k3.1-pro-highspeed";
const TIERS = ["low", "high", "max"];

function modelIds(provider: string): string[] {
  const entry = getRegistryEntry(provider);
  assert.ok(entry, `${provider} registry entry must exist`);
  return (entry.models ?? []).map((model) => model.id);
}

test("Moonshot and Coding Plan catalogs include K3.1 Pro and Highspeed", () => {
  for (const provider of ["moonshot", "kimi", "kimi-coding", "kimi-coding-apikey"]) {
    const ids = modelIds(provider);
    const expected = provider.startsWith("kimi-coding")
      ? [CODING_K31, CODING_K31_HS]
      : [K31, K31_HS];
    for (const id of expected) assert.ok(ids.includes(id), `${provider} must list ${id}`);
  }
});

test("K3.1 Pro exposes native capabilities and Highspeed shares the model spec", () => {
  const capabilities = getResolvedModelCapabilities({ provider: "moonshot", model: K31 });
  assert.equal(capabilities.contextWindow, 1048576);
  assert.equal(capabilities.maxOutputTokens, 1048576);
  assert.equal(capabilities.supportsThinking, true);
  assert.equal(capabilities.supportsTools, true);
  assert.equal(capabilities.supportsVision, true);
  assert.equal(capabilities.interleavedField, "reasoning_content");
  assert.equal(getModelSpec(K31_HS), getModelSpec(K31));
  assert.deepEqual(getRegistryModelThinkingEfforts("moonshot", K31), TIERS);

  const codingCapabilities = getResolvedModelCapabilities({
    provider: "kimi-coding",
    model: CODING_K31,
  });
  assert.equal(codingCapabilities.contextWindow, 1048576);
  assert.equal(codingCapabilities.supportsThinking, true);
  assert.equal(codingCapabilities.supportsTools, true);
  assert.equal(codingCapabilities.supportsVision, true);
});

test("K3.1 resolves native video and replay on every offline catalog", () => {
  const catalogs: Array<[string, string[]]> = [
    ["moonshot", [K31, K31_HS]],
    ["kimi", [K31, K31_HS]],
    ["kimi-coding", [CODING_K31, CODING_K31_HS]],
    ["kimi-coding-apikey", [CODING_K31, CODING_K31_HS]],
  ];
  for (const [provider, models] of catalogs) {
    const entry = getRegistryEntry(provider);
    assert.ok(entry);
    for (const model of models) {
      const label = `${provider}/${model}`;
      const capabilities = getResolvedModelCapabilities({ provider, model });
      assert.equal(capabilities.supportsVision, true, label);
      assert.equal(capabilities.supportsVideo, true, label);
      assert.equal(getModelSpec(model), getModelSpec(K31), label);
      assert.equal(
        requiresReasoningReplay({ provider, model, allowLegacyFallback: false }),
        true,
        label
      );
      const registryModel = entry.models?.find((candidate) => candidate.id === model);
      assert.ok(registryModel, label);
      assert.equal(registryModel.supportsVideo, true, label);
      if (provider.startsWith("kimi-coding")) {
        assert.equal(registryModel.supportsVision, undefined, label);
      }
    }
  }
});

test("K3.1 normalizes effort, fixed sampling, and max_completion_tokens", () => {
  const input = {
    max_tokens: 2000000,
    temperature: 0.3,
    top_p: 0.5,
    frequency_penalty: 1,
    presence_penalty: 1,
    n: 2,
    thinking: { type: "disabled" },
    enable_thinking: false,
    reasoning: { effort: "low", summary: "auto" },
    tool_choice: "required",
    messages: [{ role: "user", content: "test" }],
  };
  const output = normalizeMoonshotRequest(K31, input) as Record<string, unknown>;

  assert.equal(output.max_completion_tokens, 1048576);
  assert.equal(output.max_tokens, undefined);
  assert.equal(output.temperature, undefined);
  assert.equal(output.top_p, undefined);
  assert.equal(output.frequency_penalty, undefined);
  assert.equal(output.presence_penalty, undefined);
  assert.equal(output.n, undefined);
  assert.equal(output.thinking, undefined);
  assert.equal(output.enable_thinking, undefined);
  assert.equal(output.reasoning, undefined);
  assert.equal(output.reasoning_effort, "low");
  assert.equal(output.tool_choice, "required");
  assert.deepEqual(output.messages, input.messages);
  assert.equal(input.max_tokens, 2000000, "normalization must not mutate the caller's object");
});

test("K3.1 defaults to max and maps compatibility efforts without hiding none/off", () => {
  for (const model of [K31, K31_HS]) {
    assert.equal(normalizeMoonshotRequest(model, {}).reasoning_effort, "max");
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "medium" }).reasoning_effort,
      "high"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "xhigh" }).reasoning_effort,
      "max"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "ultra" }).reasoning_effort,
      "max"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "minimum" }).reasoning_effort,
      "low"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "light" }).reasoning_effort,
      "low"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "none" }).reasoning_effort,
      "none"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "off" }).reasoning_effort,
      "off"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { reasoning_effort: "disabled" }).reasoning_effort,
      "disabled"
    );
  }
});

test("Moonshot K3.1 prioritizes native thinking effort over disabled", () => {
  for (const model of [K31, K31_HS]) {
    assert.equal(
      normalizeMoonshotRequest(model, {
        thinking: { type: "disabled", effort: "low" },
      }).reasoning_effort,
      "low"
    );
    assert.equal(
      normalizeMoonshotRequest(model, {
        thinking: { type: "enabled", effort: "medium" },
      }).reasoning_effort,
      "high"
    );
    assert.equal(
      normalizeMoonshotRequest(model, { thinking: { type: "enabled" } }).reasoning_effort,
      "max"
    );
  }
});

test("Moonshot preserves explicit invalid K3.1 effort values", () => {
  for (const model of [K31, K31_HS]) {
    for (const value of ["on", "auto", "", 123, true, false, null, {}, []]) {
      const output = normalizeMoonshotRequest(model, { reasoning_effort: value });
      assert.deepEqual(output.reasoning_effort, value, `${model}: ${JSON.stringify(value)}`);
    }
  }
});

test("base sanitation preserves none/off and maps xhigh to max for K3.1", () => {
  const catalogs: Array<[string, string[]]> = [
    ["moonshot", [K31, K31_HS]],
    ["kimi", [K31, K31_HS]],
    ["kimi-coding", [CODING_K31, CODING_K31_HS]],
    ["kimi-coding-apikey", [CODING_K31, CODING_K31_HS]],
  ];
  for (const [provider, models] of catalogs) {
    for (const model of models) {
      for (const effort of ["none", "off", "disabled"]) {
        const output = sanitizeReasoningEffortForProvider(
          { reasoning_effort: effort },
          provider,
          model
        ) as Record<string, unknown>;
        assert.equal(output.reasoning_effort, effort, `${provider}/${model}: ${effort}`);
      }
      const output = sanitizeReasoningEffortForProvider(
        { reasoning_effort: "xhigh" },
        provider,
        model
      ) as Record<string, unknown>;
      assert.equal(output.reasoning_effort, "max", `${provider}/${model}`);
    }
  }
});

test("namespaced K3.1 also preserves none instead of clamping it", () => {
  const output = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "none" },
    "moonshot",
    "moonshot/kimi-k3.1-pro"
  ) as Record<string, unknown>;
  assert.equal(output.reasoning_effort, "none");
});

test("K3.1 preserved efforts still fold the camel-case alias onto the canonical field", () => {
  for (const effort of ["none", "bogus"]) {
    const output = sanitizeReasoningEffortForProvider(
      { reasoningEffort: effort, messages: [] },
      "moonshot",
      K31
    ) as Record<string, unknown>;
    assert.equal(output.reasoning_effort, effort, effort);
    assert.equal(Object.prototype.hasOwnProperty.call(output, "reasoningEffort"), false, effort);
  }
});

test("Kimi Code static thinking policy and wire aliases cover K3.1", () => {
  for (const model of [CODING_K31, CODING_K31_HS]) {
    assert.deepEqual(getKimiCodeStaticThinkingPolicy(model), {
      supportsThinking: true,
      supportedThinkingEfforts: TIERS,
      defaultThinkingEffort: "max",
    });
  }
  assert.equal(KIMI_CODING_WIRE_MODEL_ALIASES[K31], CODING_K31);
  assert.equal(KIMI_CODING_WIRE_MODEL_ALIASES[K31_HS], CODING_K31_HS);
  assert.deepEqual(splitKimiCodingEffortVariant("kimi-coding", `${K31}-high`), {
    wireModel: CODING_K31,
    effort: "high",
  });
  assert.deepEqual(splitKimiCodingEffortVariant("kimi-coding-apikey", `${K31_HS}-low`), {
    wireModel: CODING_K31_HS,
    effort: "low",
  });
  for (const [provider, prefix] of [
    ["kimi-coding", "kmc"],
    ["kimi-coding-apikey", "kmca"],
  ]) {
    for (const [alias, wireModel] of [
      [K31, CODING_K31],
      [K31_HS, CODING_K31_HS],
    ]) {
      for (const model of [alias, `${prefix}/${alias}`]) {
        assert.deepEqual(splitKimiCodingEffortVariant(provider, model), {
          wireModel,
          effort: null,
        });
      }
    }
  }
});

test("K3.1 publishes effort tiers and requires authentic reasoning replay", () => {
  const capabilities = buildSyncedCapabilities(
    { id: CODING_K31, supportsThinking: true, supportedThinkingEfforts: TIERS },
    "kimi-coding-apikey"
  );
  assert.ok(capabilities);
  assert.deepEqual(capabilities.effort_tiers, TIERS);

  for (const model of [K31, K31_HS]) {
    assert.equal(
      requiresReasoningReplay({ provider: "moonshot", model, allowLegacyFallback: true }),
      true
    );
    assert.equal(requiresAuthenticReasoningContent("moonshot", model), true);
  }
});

test("Kimi Code discovery maps K3.1 Pro metadata", () => {
  const discovered = parseKimiCodingModels({
    data: [
      {
        id: CODING_K31,
        display_name: "Kimi K3.1 Pro",
        protocol: "anthropic",
        context_length: 1048576,
        supports_thinking_type: "only",
        think_efforts: {
          support: true,
          valid_efforts: TIERS,
          default_effort: "max",
        },
        supports_image_in: true,
        supports_video_in: true,
        supports_tool_use: true,
      },
    ],
  });

  assert.deepEqual(discovered, [
    {
      id: CODING_K31,
      name: "Kimi K3.1 Pro",
      owned_by: "kimi-code",
      targetFormat: "claude",
      upstreamProtocol: "anthropic",
      context_length: 1048576,
      supportsThinking: true,
      alwaysThinking: true,
      supportedThinkingEfforts: TIERS,
      defaultThinkingEffort: "max",
      supportsVision: true,
      supportsVideo: true,
      supportsTools: true,
    },
  ]);
});
