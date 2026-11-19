import test from "node:test";
import assert from "node:assert/strict";
import {
  M365_DOCUMENTED_MODELS,
  resolveM365Profile,
} from "../../open-sse/executors/m365Protocol/profile.ts";

test("legacy IDs retain tier routing and tone", () => {
  for (const model of [
    undefined,
    "copilot-m365",
    "copilot-m365-gpt-5-5-chat",
    "copilot-m365-claude-opus",
  ]) {
    const individual = resolveM365Profile({ model });
    assert.equal(individual.scenario, "OfficeWebPaidConsumerCopilot");
    assert.equal(individual.licenseType, "Starter");
    assert.equal(resolveM365Profile({ model, tier: "enterprise" }).scenario, "officeweb");
    assert.equal(resolveM365Profile({ model, tier: "edu" }).scenario, "OfficeWebIncludedCopilot");
  }
  assert.equal(resolveM365Profile({ model: "copilot-m365-claude-opus" }).tone, "Claude_Opus");
  assert.equal(resolveM365Profile({}).tone, "Magic");
});
test("explicit work-school catalog pairs exact documented tones with scenarios without availability claims", () => {
  const cases = [
    ["gpt-5.5", "Gpt_5_5_Chat", false],
    ["gpt-5.5-think-deeper", "Gpt_5_5_Reasoning", false],
    ["gpt-5.6", "Gpt_5_6_Chat", false],
    ["gpt-5.6-think-deeper", "Gpt_5_6_Reasoning", false],
    ["gpt-6-think-deeper", "Gpt_6_Reasoning", true],
    ["gpt-6-sol", "Gpt_6_Sol_Reasoning", false],
    ["gpt-6.1-sol", "Gpt_61_Sol_Reasoning", false],
    ["claude-sonnet-4.6", "Claude_Sonnet", false],
    ["claude-sonnet-5", "Claude_Sonnet_5", true],
    ["claude-sonnet-5.5", "Claude_Sonnet", true],
    ["claude-opus-4.8", "Claude_Opus", false],
    ["claude-opus-5.5", "Claude_Opus", true],
  ] as const;
  for (const [model, tone, paid] of cases) {
    const result = resolveM365Profile({
      model,
      tier: "enterprise",
    });
    assert.equal(result.tone, tone);
    assert.equal(result.scenario, paid ? "OfficeWebPaidCopilot" : "OfficeWebIncludedCopilot");
    assert.equal(result.licenseType, paid ? "Premium" : "Starter");
    assert.equal(result.availability, "unverified");
  }
});
test("explicit overrides win model and tier defaults independently; unknown names do not select tones", () => {
  const result = resolveM365Profile({
    model: "gpt-6-think-deeper",
    scenario: "custom",
    licenseType: "Custom",
    tone: "CustomTone",
    agent: "custom",
  });
  assert.equal(result.scenario, "custom");
  assert.equal(result.licenseType, "Custom");
  assert.equal(result.tone, "CustomTone");
  assert.equal(result.agent, "custom");
  assert.equal(resolveM365Profile({ model: "invented-opus" }).tone, "Magic");
});

// Frozen documented mapping: no account-specific discovery or guessed version routing.
const DOCUMENTED_TONES: Record<string, string> = {
  "m365-copilot": "Magic",
  auto: "Magic",
  quick: "Gpt_5_5_Chat",
  "think-deeper": "Gpt_5_5_Reasoning",
  claude: "Claude_Sonnet",
  "claude-sonnet": "Claude_Sonnet",
  "claude-sonnet-4.5": "Claude_Sonnet",
  "claude-sonnet-4.6": "Claude_Sonnet",
  "claude-sonnet-5.5": "Claude_Sonnet",
  "claude-sonnet-5": "Claude_Sonnet_5",
  "claude-sonnet-think-deeper": "Claude_Sonnet_Reasoning",
  "claude-opus": "Claude_Opus",
  "claude-opus-5": "Claude_Opus",
  "claude-opus-5.5": "Claude_Opus",
  "claude-opus-4.8": "Claude_Opus",
  "claude-opus-4.5": "Claude_Opus",
  "gpt-5.5": "Gpt_5_5_Chat",
  "gpt-5.5-quick": "Gpt_5_5_Chat",
  "gpt-5.5-think-deeper": "Gpt_5_5_Reasoning",
  "gpt-5.6": "Gpt_5_6_Chat",
  "gpt-5.6-quick": "Gpt_5_6_Chat",
  "gpt-5.6-think-deeper": "Gpt_5_6_Reasoning",
  "gpt-6-think-deeper": "Gpt_6_Reasoning",
  "gpt-6-sol": "Gpt_6_Sol_Reasoning",
  "gpt-6.1-sol": "Gpt_61_Sol_Reasoning",
  "gpt-5.4": "Gpt_5_4_Reasoning",
  "gpt-5.4-think-deeper": "Gpt_5_4_Reasoning",
  "gpt-5.4-quick": "Gpt_5_4_Chat",
  "gpt-5.3": "Gpt_5_3_Chat",
  "gpt-5.3-quick": "Gpt_5_3_Chat",
  "gpt-5.3-think-deeper": "Gpt_5_3_Reasoning",
  "gpt-5.2": "Gpt_5_2_Chat",
  "gpt-5.2-quick": "Gpt_5_2_Chat",
  "gpt-5.2-think-deeper": "Gpt_5_2_Reasoning",
};
test("all documented standalone IDs select exact tones and model-aware scenarios across tiers", () => {
  assert.deepEqual(
    Object.keys(M365_DOCUMENTED_MODELS).sort(),
    Object.keys(DOCUMENTED_TONES).sort()
  );
  for (const [model, tone] of Object.entries(DOCUMENTED_TONES)) {
    const paid =
      (["Claude_Opus", "Claude_Sonnet_5", "Gpt_6_Reasoning"].includes(tone) &&
        !["claude-opus-4.8", "claude-opus-4.5"].includes(model)) ||
      model === "claude-sonnet-5.5";
    for (const tier of [undefined, "enterprise", "work", "edu"]) {
      const result = resolveM365Profile({ model, tier });
      assert.equal(result.tone, tone, model);
      assert.equal(
        result.scenario,
        paid ? "OfficeWebPaidCopilot" : "OfficeWebIncludedCopilot",
        model
      );
      assert.equal(result.licenseType, paid ? "Premium" : "Starter", model);
      assert.equal(result.availability, "unverified");
    }
  }
});
test("canonical overrides win independently and unknown variants never invent a route", () => {
  assert.equal(resolveM365Profile({ model: "claude-sonnet-5.5", scenario: "raw" }).scenario, "raw");
  assert.equal(
    resolveM365Profile({ model: "claude-opus-4.8", licenseType: "raw" }).licenseType,
    "raw"
  );
  assert.equal(resolveM365Profile({ model: "gpt-5.5", tone: "Raw" }).tone, "Raw");
  assert.equal(resolveM365Profile({ model: "gpt-6-sol", agent: "raw" }).agent, "raw");
  for (const model of [
    "gpt-6-chat",
    "claude-opus-99",
    "claude-sonnet-5.5[1m]",
    "toString",
    "__proto__",
  ]) {
    assert.equal(resolveM365Profile({ model }).tone, "Magic", model);
    assert.equal(resolveM365Profile({ model }).scenario, "OfficeWebPaidConsumerCopilot", model);
  }
});
