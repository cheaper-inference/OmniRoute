import test from "node:test";
import assert from "node:assert/strict";

// DeepSeek's V4.x reasoning selector accepts the full low..max effort range (the
// same range Claude and Gemini models already expose here). The registry declared
// only none/low/high/max, so the medium and xhigh tiers were unreachable: a client
// asking for them got no catalog variant (`deepseek-v4-pro-medium` did not exist)
// and the effort could not be selected by id.

const { deepseekProvider } =
  await import("../../open-sse/config/providers/registry/deepseek/index.ts");
const { opencode_goProvider } =
  await import("../../open-sse/config/providers/registry/opencode/go/index.ts");

const EXPECTED_TIERS = ["none", "low", "medium", "high", "xhigh", "max"] as const;

for (const id of ["deepseek-v4-pro", "deepseek-v4-flash", "deepseek-flash"]) {
  test(`deepseek ${id} declares every effort tier none..max`, () => {
    const model = deepseekProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} must stay in the deepseek registry`);
    assert.ok(Array.isArray(model.supportedThinkingEfforts), `${id} must declare its effort tiers`);
    for (const tier of EXPECTED_TIERS) {
      assert.ok(
        model.supportedThinkingEfforts?.includes(tier),
        `${id} must declare the "${tier}" effort tier`
      );
    }
  });
}

test("the v4.1 flash alias row keeps its vision flag with the widened tiers", () => {
  const model = deepseekProvider.models.find((m) => m.id === "deepseek-flash");
  assert.equal(model?.supportsVision, true);
});

for (const id of ["deepseek-v4-pro", "deepseek-v4-flash", "deepseek-v4-flash-vision-exp"]) {
  test(`opencode-go ${id} mirrors the widened tier list`, () => {
    const model = opencode_goProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} must stay in the opencode-go registry`);
    for (const tier of EXPECTED_TIERS) {
      assert.ok(
        model.supportedThinkingEfforts?.includes(tier),
        `${id} must declare the "${tier}" effort tier`
      );
    }
  });
}
