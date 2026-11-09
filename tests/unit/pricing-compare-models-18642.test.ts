/**
 * #18642: Costs > Pricing "Compare models" view. The same model is listed under different
 * ids per provider; `normalizeModelKey` groups the safe cases (case, org/path prefix,
 * `.`/`-`/`p` version separators) and leaves everything else on its own row. Ids below are
 * real listings of GLM 5.2 from models.dev (all carry canonical_model_id `zhipuai/glm-5.2`).
 */

import assert from "node:assert/strict";
import test from "node:test";

const { normalizeModelKey, buildModelComparison } =
  await import("../../src/app/(dashboard)/dashboard/settings/components/pricingCompare.ts");

test("GLM 5.2 listings from different providers normalize to one key", () => {
  for (const id of [
    "glm-5.2",
    "zai-org/GLM-5.2",
    "z-ai/glm-5.2",
    "zai/glm-5.2",
    "accounts/fireworks/models/glm-5p2",
    "glm-5-2",
  ]) {
    assert.equal(normalizeModelKey(id), "glm-5.2", id);
  }
});

test("variants, quantizations and vendor-prefixed names stay on their own key", () => {
  for (const id of [
    "glm-5.2-fast",
    "zai-org/GLM-5.2-FP8",
    "glm-5.2:thinking",
    "zai-glm-5-2",
    "glm5.2",
  ]) {
    assert.notEqual(normalizeModelKey(id), "glm-5.2", id);
  }
});

test("neighbouring versions and sizes never merge", () => {
  const pairs: Array<[string, string]> = [
    ["glm-5", "glm-5.2"],
    ["glm-5.2", "glm-5.3"],
    ["claude-sonnet-4", "claude-sonnet-4.5"],
    ["gpt-4o", "gpt-4o-mini"],
    ["llama-3.1-8b", "llama-3.1-70b"],
    ["qwen2.5-72b-instruct", "qwen2.5-7b-instruct"],
  ];
  for (const [a, b] of pairs) {
    assert.notEqual(normalizeModelKey(a), normalizeModelKey(b), `${a} vs ${b}`);
  }
  assert.equal(
    normalizeModelKey("qwen2p5-72b-instruct"),
    normalizeModelKey("Qwen2.5-72B-Instruct")
  );
});

const PROVIDERS = [
  { id: "zai", alias: "zai", models: [{ id: "glm-5.2", name: "GLM 5.2" }] },
  {
    id: "fireworks",
    alias: "fireworks",
    models: [
      { id: "accounts/fireworks/models/glm-5p2", name: "GLM 5.2" },
      { id: "accounts/fireworks/models/glm-5p2-fast", name: "GLM 5.2 Fast" },
    ],
  },
  { id: "together", alias: "together", models: [{ id: "zai-org/GLM-5.2", name: "GLM-5.2" }] },
  { id: "unpriced-host", alias: "uph", models: [{ id: "glm-5.2", name: "GLM 5.2" }] },
  { id: "solo", alias: "solo", models: [{ id: "solo-model-1", name: "Solo 1" }] },
];

const PRICING = {
  zai: { "glm-5.2": { input: 1.4, output: 4.4, cached: 0.26 } },
  fireworks: {
    "accounts/fireworks/models/glm-5p2": { input: 1.2, output: 4.0 },
    "accounts/fireworks/models/glm-5p2-fast": { input: 3, output: 9 },
  },
  together: { "zai-org/GLM-5.2": { input: 1.2, output: 3.5 } },
  solo: { "solo-model-1": { input: 1, output: 1 } },
};

test("offers of the same model are grouped and sorted cheapest first, unpriced last", () => {
  const groups = buildModelComparison(PROVIDERS, PRICING, { searchQuery: "" });
  const glm = groups.find((group) => group.key === "glm-5.2");
  assert.ok(glm, "glm-5.2 group missing");
  assert.deepEqual(
    glm.offers.map((offer) => offer.providerAlias),
    ["together", "fireworks", "zai", "uph"]
  );
  const unpriced = glm.offers.at(-1);
  assert.equal(unpriced?.priced, false);
  assert.equal(unpriced?.input, null, "an unpriced offer must not read as $0");
  assert.equal(glm.offers[2].cached, 0.26);
});

test("only models offered by two or more providers are listed when nothing is searched", () => {
  const keys = buildModelComparison(PROVIDERS, PRICING, { searchQuery: "" }).map((g) => g.key);
  assert.deepEqual(keys, ["glm-5.2"]);
  assert.ok(!keys.includes("glm-5.2-fast"), "a variant is not folded into the base model");
});

test("a search also shows single-provider matches, and a free model is priced at $0", () => {
  const groups = buildModelComparison(
    [...PROVIDERS, { id: "free", alias: "free", models: [{ id: "solo-model-1", name: "Solo" }] }],
    { ...PRICING, free: { "solo-model-1": { input: 0, output: 0 } } },
    { searchQuery: "fast" }
  );
  assert.deepEqual(
    groups.map((g) => g.key),
    ["glm-5.2-fast"]
  );
  const solo = buildModelComparison(
    [...PROVIDERS, { id: "free", alias: "free", models: [{ id: "solo-model-1", name: "Solo" }] }],
    { ...PRICING, free: { "solo-model-1": { input: 0, output: 0 } } },
    { searchQuery: "solo" }
  )[0];
  assert.deepEqual(
    solo.offers.map((offer) => [offer.providerAlias, offer.priced, offer.input]),
    [
      ["free", true, 0],
      ["solo", true, 1],
    ]
  );
});

test("the pricing namespace of a provider is read from pricingKey when it differs from alias", () => {
  const groups = buildModelComparison(
    [
      {
        id: "node-1",
        alias: "local",
        pricingKey: "node-1",
        models: [{ id: "glm-5.2", name: "GLM" }],
      },
      PROVIDERS[0],
    ],
    { ...PRICING, "node-1": { "glm-5.2": { input: 0.5, output: 1 } } },
    { searchQuery: "" }
  );
  assert.deepEqual(
    groups[0].offers.map((offer) => [offer.providerAlias, offer.input]),
    [
      ["local", 0.5],
      ["zai", 1.4],
    ]
  );
});

test("the compare view keeps the providers the Auth and Configured filters keep", async () => {
  const { providersForComparison } =
    await import("../../src/app/(dashboard)/dashboard/settings/components/pricingTabFilters.ts");
  const providers = [
    { id: "openrouter", alias: "openrouter", authType: "apikey" },
    { id: "zai", alias: "zai", authType: "apikey" },
    { id: "codex", alias: "cx", authType: "oauth" },
    { id: "devin-cli-agentic", alias: "dva", authType: "none" },
  ];
  const connected = new Set(["openrouter", "codex"]);
  const pick = (authFilter: string, displayMode: "all" | "configured", blocked: string[] = []) =>
    providersForComparison(providers, {
      authFilter,
      displayMode,
      connectedProviderIds: connected,
      blockedProviders: blocked,
    }).map((p) => p.alias);

  assert.deepEqual(pick("all", "all"), ["openrouter", "zai", "cx", "dva"]);
  assert.deepEqual(pick("apikey", "all"), ["openrouter", "zai"]);
  assert.deepEqual(pick("all", "configured"), ["openrouter", "cx", "dva"]);
  assert.deepEqual(pick("all", "configured", ["dva"]), ["openrouter", "cx"]);
  assert.deepEqual(pick("unknown", "all"), ["dva"]);
});
