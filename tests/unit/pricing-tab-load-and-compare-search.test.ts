/**
 * Costs > Pricing follow-ups from the #18651 / #18775 reviews: the optional connections and
 * settings requests must not take the tab down, the Configured filter is only offered once
 * both have loaded, a provider search in Compare models keeps that provider's comparisons,
 * and the Compare empty state does not tell a user who already searched to search.
 */

import assert from "node:assert/strict";
import test from "node:test";

const { fetchPricingBundle, hasPricingConfiguration } =
  await import("../../src/app/(dashboard)/dashboard/settings/components/pricingBundle.ts");
const { buildModelComparison, compareEmptyMessageKey } =
  await import("../../src/app/(dashboard)/dashboard/settings/components/pricingCompare.ts");

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const CATALOG = { openai: { id: "openai", alias: "openai", models: [] } };

/** Stubs the five Pricing requests; `overrides` replaces one by path. */
function stubPricingFetch(overrides: Record<string, () => Promise<Response>> = {}) {
  globalThis.fetch = (async (url: unknown) => {
    const path = String(url);
    if (overrides[path]) return overrides[path]();
    if (path === "/api/pricing/models") return json(CATALOG);
    if (path === "/api/pricing?includeSources=1") return json({ pricing: { openai: {} } });
    if (path === "/api/pricing/sync") return json({ enabled: false });
    if (path === "/api/providers") return json({ connections: [{ provider: "openai" }] });
    if (path === "/api/settings") return json({ blockedProviders: ["duckai"] });
    throw new Error(`unexpected fetch ${path}`);
  }) as typeof fetch;
}

test("a full load carries the catalog and both Configured inputs", async () => {
  stubPricingFetch();
  const bundle = await fetchPricingBundle();
  assert.deepEqual(bundle.catalog, CATALOG);
  assert.deepEqual([...(bundle.connectedProviderIds ?? [])], ["openai"]);
  assert.deepEqual(bundle.blockedProviders, ["duckai"]);
  assert.equal(hasPricingConfiguration(bundle), true);
});

test("a settings or connections request that fails outright does not fail the pricing load", async () => {
  for (const path of ["/api/settings", "/api/providers"]) {
    stubPricingFetch({ [path]: async () => Promise.reject(new TypeError("fetch failed")) });
    const bundle = await fetchPricingBundle();
    assert.deepEqual(bundle.catalog, CATALOG, path);
    assert.deepEqual(bundle.pricing, { openai: {} }, path);
    assert.equal(hasPricingConfiguration(bundle), false, path);
  }
});

test("a non-OK settings or connections response leaves the Configured filter unavailable", async () => {
  stubPricingFetch({ "/api/settings": async () => json({ error: "nope" }, 500) });
  let bundle = await fetchPricingBundle();
  assert.equal(bundle.blockedProviders, undefined);
  assert.equal(hasPricingConfiguration(bundle), false);

  stubPricingFetch({ "/api/providers": async () => json({ error: "nope" }, 401) });
  bundle = await fetchPricingBundle();
  assert.equal(bundle.connectedProviderIds, undefined);
  assert.equal(hasPricingConfiguration(bundle), false);
});

test("a 2xx settings or connections response that is not a JSON object does not fail the load", async () => {
  const notJson = async () =>
    new Response("<html>proxy error</html>", { headers: { "content-type": "text/html" } });
  for (const path of ["/api/settings", "/api/providers"]) {
    for (const body of [notJson, async () => json(null)]) {
      stubPricingFetch({ [path]: body });
      const bundle = await fetchPricingBundle();
      assert.deepEqual(bundle.catalog, CATALOG, path);
      assert.deepEqual(bundle.pricing, { openai: {} }, path);
      assert.equal(hasPricingConfiguration(bundle), false, path);
    }
  }
});

const PROVIDERS = [
  { id: "bluesminds", alias: "bluesminds", models: [{ id: "gpt-4o", name: "GPT-4o" }] },
  { id: "openai", alias: "openai", models: [{ id: "gpt-4o", name: "GPT-4o" }] },
  { id: "groq", alias: "groq", models: [{ id: "llama-3.3-70b", name: "Llama 3.3 70B" }] },
];

test("a provider search keeps that provider's comparisons with every offer", () => {
  const groups = buildModelComparison(PROVIDERS, {}, { searchQuery: "bluesminds" });
  assert.deepEqual(
    groups.map((group) => group.key),
    ["gpt-4o"]
  );
  assert.deepEqual(groups[0].offers.map((offer) => offer.providerAlias).sort(), [
    "bluesminds",
    "openai",
  ]);
});

test("a model search still matches by model id and name", () => {
  const byId = buildModelComparison(PROVIDERS, {}, { searchQuery: "llama-3.3" });
  assert.deepEqual(
    byId.map((group) => group.name),
    ["Llama 3.3 70B"]
  );
});

test("the Compare empty state only suggests searching when nothing was searched or filtered out", () => {
  assert.equal(
    compareEmptyMessageKey({ searchQuery: "", providerCount: 12 }),
    "pricingCompareEmpty"
  );
  assert.equal(
    compareEmptyMessageKey({ searchQuery: "no-such-model", providerCount: 12 }),
    "noProvidersMatch"
  );
  assert.equal(
    compareEmptyMessageKey({ searchQuery: "  ", providerCount: 12 }),
    "pricingCompareEmpty"
  );
  assert.equal(compareEmptyMessageKey({ searchQuery: "", providerCount: 0 }), "noProvidersMatch");
});

test("the Providers filter offers Configured only once its inputs have loaded", async () => {
  const { pricingDisplayModeOptions } =
    await import("../../src/app/(dashboard)/dashboard/settings/components/pricingTabFilters.ts");
  assert.deepEqual(pricingDisplayModeOptions("All (3)", "Configured (1)", false), [
    { value: "all", label: "All (3)" },
  ]);
  assert.deepEqual(pricingDisplayModeOptions("All (3)", "Configured (1)", true), [
    { value: "all", label: "All (3)" },
    { value: "configured", label: "Configured (1)" },
  ]);
});
