// LHC:COVERS src/shared/constants/pricing/regional.ts src/shared/constants/pricing/default-pricing.ts open-sse/config/providers/registry/zcode/index.ts
import test from "node:test";
import assert from "node:assert/strict";
import { getPricingForModel } from "../../src/shared/constants/pricing.ts";
import { ZCODE_MODELS } from "../../open-sse/config/providers/registry/zcode/index.ts";

const ZCODE_PROVIDERS = [
  "zcode",
  "zc",
  "zcode-start",
  "zc-start",
  "zcode-individual",
  "zc-individual",
  "zcode-cn-start",
  "zc-cn-start",
  "zcode-cn-individual",
  "zc-cn-individual",
] as const;

test("all ZCode Coding Plan models have explicit zero pricing on every tariff route", () => {
  for (const provider of ZCODE_PROVIDERS) {
    for (const model of ZCODE_MODELS) {
      const pricing = getPricingForModel(provider, model.id);
      assert.ok(pricing, provider + "/" + model.id + " must have a configured price");
      for (const field of ["input", "output", "cached", "reasoning", "cache_creation"] as const)
        assert.equal(pricing[field], 0, provider + "/" + model.id + " " + field + " must be free");
    }
  }
});

test("ZCode free pricing does not change paid standard GLM pricing", () => {
  assert.deepEqual(getPricingForModel("glm", "glm-5.3-flash"), {
    input: 0.075,
    output: 0.25,
    cached: 0.015,
    reasoning: 0.25,
    cache_creation: 0.075,
  });
});
