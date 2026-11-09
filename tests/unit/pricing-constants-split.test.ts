// Characterization of the pricing.ts split (god-file decomposition): the host became a barrel that
// re-exports DEFAULT_PRICING (merged from semantic family files that import shared tier consts)
// and keeps the helper functions. Pure-data move → behavior identical. Locks: public surface, the
// spread-merge integrity, and that lookups/cost math resolve unchanged.
import { test } from "node:test";
import assert from "node:assert/strict";

const P = await import("../../src/shared/constants/pricing.ts");

test("barrel still exports DEFAULT_PRICING + supported helpers", () => {
  for (const name of ["DEFAULT_PRICING", "getPricingForModel", "getDefaultPricing"]) {
    assert.ok(name in P, `missing export: ${name}`);
  }
  assert.equal(Object.hasOwn(P, "calculateCostFromTokens"), false);
});

test("DEFAULT_PRICING merges every family file; families partition all entries", async () => {
  const merged = Object.keys((P as Record<string, object>).DEFAULT_PRICING).length;
  const families: [string, string][] = [
    ["oauth-subscriptions", "DEFAULT_PRICING_OAUTH"],
    ["frontier-labs", "DEFAULT_PRICING_FRONTIER"],
    ["inference-hosts", "DEFAULT_PRICING_INFERENCE"],
    ["regional", "DEFAULT_PRICING_REGIONAL"],
    ["devin", "DEFAULT_PRICING_DEVIN"],
  ];
  let famTotal = 0;
  const seen = new Set<string>();
  for (const [file, exportName] of families) {
    const mod = await import(`../../src/shared/constants/pricing/${file}.ts`);
    for (const k of Object.keys(mod[exportName])) {
      assert.ok(!seen.has(k), `pricing key ${k} appears in more than one family`);
      seen.add(k);
      famTotal++;
    }
  }
  assert.equal(merged, famTotal, "spread-merge lost/duplicated a top-level key");
  assert.ok(merged > 25);
});

test("shared tier consts feed the parts (a known model resolves to a shared rate)", () => {
  const pricing = (P as Record<string, (p: string, m: string) => unknown>).getPricingForModel(
    "openai",
    "gpt-4o"
  );
  assert.ok(pricing && typeof pricing === "object");
  assert.equal(typeof (pricing as { input?: number }).input, "number");
});

test("formatCost remains re-exported from the pricing barrel", () => {
  const fn = (P as Record<string, (value: number) => string>).formatCost;
  assert.equal(fn(0.0123), "$0.0123");
});

test("#18500: obsolete NVIDIA passthrough IDs are not priced as free defaults", () => {
  const obsoleteModels = [
    "moonshotai/kimi-k2.5",
    "z-ai/glm4.7",
    "deepseek-ai/deepseek-v3.2",
    "nvidia/llama-3.3-70b-instruct",
    "meta/llama-4-maverick-17b-128e-instruct",
    "deepseek/deepseek-r1",
  ];
  // The pricing barrel is the public surface used to resolve default rates;
  // the same six obsolete IDs must be absent from both exported access paths.
  for (const [source, nvidia] of [
    ["DEFAULT_PRICING", P.DEFAULT_PRICING.nvidia],
    ["getDefaultPricing", P.getDefaultPricing().nvidia],
  ] as const) {
    assert.ok(nvidia && typeof nvidia === "object", `${source}: missing NVIDIA defaults`);
    for (const modelId of obsoleteModels) {
      assert.equal(
        Object.hasOwn(nvidia, modelId),
        false,
        `${source}: stale NVIDIA model ${modelId} must not have a default zero price`
      );
    }
  }
});
