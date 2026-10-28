/**
 * The OpenRouter-format `pricing` object on GET /v1/models entries — pure helpers
 * (src/app/api/v1/models/catalogPricing.ts). The route-level behaviour is covered by
 * v1-models-openrouter-pricing.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  attachCatalogPricing,
  createComboPricingTargetResolver,
  createPricingRowLookup,
  normalizeCatalogEntryPricing,
  perMillionToPerTokenUsd,
  toCatalogPricing,
} from "../../src/app/api/v1/models/catalogPricing.ts";

const TABLE = {
  openai: {
    "gpt-4o": { input: 2.5, output: 10, cached: 1.25 },
    "o-free": { input: 0, output: 0 },
    "gpt-4-1": { input: 2, output: 8 },
    "dall-e-3": { per_image: 0.04 },
  },
  anthropic: {
    "claude-opus-x": { input: 5, output: 25, cached: 0.5, cache_creation: 6.25 },
  },
  codex: { "gpt-5.5": { input: 1.25, output: 10 } },
  kiro: { "claude-sonnet-x": { input: 3, output: 15 } },
};

const loadTable = async () => TABLE;

test("per-1M rates become plain per-token decimal strings", () => {
  const cases: Array<[number, string]> = [
    [0, "0"],
    [5, "0.000005"],
    [25, "0.000025"],
    [0.5, "0.0000005"],
    [6.25, "0.00000625"],
    [0.075, "0.000000075"],
    [0.0001, "0.0000000001"],
    [1.1, "0.0000011"],
    [3.3, "0.0000033"],
    [1_500_000, "1.5"],
    [3_000_000, "3"],
    [12_000_000, "12"],
  ];
  for (const [perMillion, expected] of cases) {
    assert.equal(perMillionToPerTokenUsd(perMillion), expected, `${perMillion}`);
  }
  // No exponent notation and no float noise, even where `x / 1e6` would produce either.
  assert.equal(String(0.0001 / 1_000_000), "1e-10");
  assert.equal(String(3.3 / 1_000_000), "0.0000032999999999999997");
});

test("a full pricing row yields both halves of the pricing object", () => {
  assert.deepEqual(toCatalogPricing({ input: 5, output: 25, cached: 0.5, cache_creation: 6.25 }), {
    prompt: "0.000005",
    completion: "0.000025",
    input_cache_read: "0.0000005",
    input_cache_write: "0.00000625",
    input: 5,
    output: 25,
    cached: 0.5,
    cache_creation: 6.25,
  });
});

test("per-1M fields that earlier catalog readers saw are kept", () => {
  const longContext = { threshold: 200_000, input: 10, output: 37.5 };
  assert.deepEqual(
    toCatalogPricing({ input: 5, output: 25, reasoning: 30, long_context: longContext }),
    {
      prompt: "0.000005",
      completion: "0.000025",
      input: 5,
      output: 25,
      reasoning: 30,
      long_context: longContext,
    }
  );
});

test("cache fields are omitted when the row has no cache price", () => {
  assert.deepEqual(toCatalogPricing({ input: 2, output: 8 }), {
    prompt: "0.000002",
    completion: "0.000008",
    input: 2,
    output: 8,
  });
});

test("a row without a token rate is not a token price; a missing side bills 0", () => {
  assert.equal(toCatalogPricing({ per_image: 0.04 }), null);
  assert.equal(toCatalogPricing(null), null);
  assert.equal(toCatalogPricing({ input: -1, output: "n/a" }), null);
  assert.deepEqual(toCatalogPricing({ input: "0.13" }), {
    prompt: "0.00000013",
    completion: "0",
    input: 0.13,
    output: 0,
  });
});

test("row lookup follows the cost-accounting fallbacks", () => {
  const lookup = createPricingRowLookup(TABLE);
  assert.deepEqual(lookup("openai", "GPT-4o"), TABLE.openai["gpt-4o"]); // case-insensitive
  assert.deepEqual(lookup("openai", "gpt-4.1"), TABLE.openai["gpt-4-1"]); // dots → hyphens
  assert.deepEqual(lookup("openai", "openai/gpt-4o"), TABLE.openai["gpt-4o"]); // path prefix
  assert.deepEqual(lookup("codex", "gpt-5.5-high"), TABLE.codex["gpt-5.5"]); // codex effort
  assert.equal(lookup("openai", "gpt-unknown"), null);
  assert.equal(lookup("nobody", "gpt-4o"), null);
});

test("attach: known price, free marker, unknown price", async () => {
  const [known, free, catalogFree, unknown] = await attachCatalogPricing(
    [
      { id: "openai/gpt-4o", owned_by: "openai", root: "gpt-4o" },
      { id: "openai/o-free", owned_by: "openai", root: "o-free" },
      { id: "openrouter/some/model:free", owned_by: "openrouter", free: true },
      { id: "openai/gpt-unknown", owned_by: "openai", root: "gpt-unknown" },
    ],
    {},
    loadTable
  );
  assert.deepEqual(known.pricing, {
    prompt: "0.0000025",
    completion: "0.00001",
    input_cache_read: "0.00000125",
    input: 2.5,
    output: 10,
    cached: 1.25,
  });
  assert.deepEqual(free.pricing, { prompt: "0", completion: "0", input: 0, output: 0 });
  assert.deepEqual(catalogFree.pricing, { prompt: "0", completion: "0", input: 0, output: 0 });
  assert.equal("pricing" in unknown, false);
});

test("attach: a credit-metered provider is left to enrichment (no per-token price)", async () => {
  const [entry] = await attachCatalogPricing(
    [{ id: "kr/claude-sonnet-x", owned_by: "kiro", root: "claude-sonnet-x" }],
    {},
    loadTable
  );
  assert.equal("pricing" in entry, false);
});

test("attach: node prefixes resolve to the node id, as in catalog enrichment", async () => {
  const [entry] = await attachCatalogPricing(
    [{ id: "mynode/gpt-4o", owned_by: "mynode", root: "gpt-4o" }],
    { providerNodeIdsByPrefix: { mynode: "openai" } },
    loadTable
  );
  assert.equal((entry.pricing as { prompt: string }).prompt, "0.0000025");
});

test("attach: a combo is priced as its primary target", async () => {
  const [combo, unresolved] = await attachCatalogPricing(
    [
      { id: "my-combo", owned_by: "combo" },
      { id: "dynamic-combo", owned_by: "combo" },
    ],
    {
      resolveComboTarget: (name) =>
        name === "my-combo" ? { provider: "anthropic", model: "claude-opus-x" } : null,
    },
    loadTable
  );
  assert.deepEqual(combo.pricing, {
    prompt: "0.000005",
    completion: "0.000025",
    input_cache_read: "0.0000005",
    input_cache_write: "0.00000625",
    input: 5,
    output: 25,
    cached: 0.5,
    cache_creation: 6.25,
  });
  assert.equal("pricing" in unresolved, false);
});

test("attach: a pricing-table failure leaves the catalog untouched", async () => {
  const models = [{ id: "openai/gpt-4o", owned_by: "openai", root: "gpt-4o" }];
  const result = await attachCatalogPricing(models, {}, async () => {
    throw new Error("db unavailable");
  });
  assert.equal(result, models);
});

test("combo target resolver: first visible target, nested expansion done by the caller", () => {
  const combos = [
    { name: "a", targets: ["hidden/model", "openai/gpt-4o"] },
    { name: "b", targets: ["bad", "openai/gpt-4o"] },
    { name: "c", targets: [] as string[] },
  ];
  const resolve = createComboPricingTargetResolver(
    combos,
    (combo) => combo.targets,
    (target) => {
      const [providerId, modelId] = target.split("/");
      return modelId ? { providerId, modelId } : null;
    },
    (providerId) => providerId === "hidden"
  );
  assert.deepEqual(resolve("a"), { provider: "openai", model: "gpt-4o" });
  assert.equal(resolve("b"), null); // the first target cannot be resolved: price unknown
  assert.equal(resolve("c"), null);
  assert.equal(resolve("missing"), null);
});

test("normalize: an enrichment-only numeric price gets the full shape", () => {
  const entry = normalizeCatalogEntryPricing({
    id: "openai/x",
    owned_by: "openai",
    pricing: { input: 3, output: 15 },
  });
  assert.deepEqual(entry.pricing, {
    prompt: "0.000003",
    completion: "0.000015",
    input: 3,
    output: 15,
  });
});

test("normalize: credit-metered numeric pricing stays exactly as enrichment set it", () => {
  const numeric = { input: 3, output: 15, cached: 1.5, reasoning: 15, cache_creation: 3 };
  for (const owner of ["kr", "kiro"]) {
    const credit = { id: `${owner}/x`, owned_by: owner, pricing: { ...numeric } };
    const normalized = normalizeCatalogEntryPricing(credit);
    assert.equal(normalized, credit);
    assert.deepEqual(normalized.pricing, numeric);
    assert.equal("prompt" in normalized.pricing, false);
    assert.equal("completion" in normalized.pricing, false);
  }
});

test("normalize: leaves attached, unconvertible and absent prices untouched", () => {
  const attached = { prompt: "0", completion: "0", input: 0, output: 0 };
  const kept = { id: "openai/x", owned_by: "openai", pricing: attached };
  assert.equal(normalizeCatalogEntryPricing(kept), kept);

  const unconvertible = { id: "openai/img", owned_by: "openai", pricing: { cached: 0.04 } };
  assert.equal(normalizeCatalogEntryPricing(unconvertible), unconvertible);

  const none = { id: "openai/y", owned_by: "openai" };
  assert.equal(normalizeCatalogEntryPricing(none), none);
});
