/**
 * #18676: two image cost-accounting gaps.
 *  1. /v1/images/edits never priced an edit: no cost header, and an API key's USD budget
 *     was checked but never drawn down, so a budgeted key could edit without limit.
 *  2. Image pricing looked up the prefixed id (`openrouter/black-forest-labs/flux.2-pro`)
 *     and its last segment (`flux.2-pro`), never the provider-local id a price is keyed by
 *     (`black-forest-labs/flux.2-pro`), so nested ids billed $0 on /v1/images/generations.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-cost-18676-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-cost-18676-secret";
process.env.REQUIRE_API_KEY = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const costRules = await import("../../src/domain/costRules.ts");
const { calculateModalCost, getPricingLookupModels } =
  await import("../../src/lib/usage/costCalculator.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");

const MODEL = "black-forest-labs/flux.2-pro";
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
const originalFetch = globalThis.fetch;

await updatePricing({ openrouter: { [MODEL]: { output_cost_per_image: 0.03 } } } as never);
await providersDb.createProviderConnection({
  provider: "openrouter",
  authType: "apikey",
  name: "openrouter-test",
  apiKey: "sk-or-test-18676",
  isActive: true,
  testStatus: "active",
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** OpenRouter's unified Image API, returning `count` images. */
function stubOpenRouter(count = 1) {
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        data: Array.from({ length: count }, () => ({ b64_json: PNG.toString("base64") })),
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;
}

async function budgetedKey() {
  const key = (await apiKeysDb.createApiKey("budgeted", "machine-18676")) as {
    id: string;
    key: string;
  };
  costRules.setBudget(key.id, { dailyLimitUsd: 10 });
  return key;
}

function editRequest(apiKey: string, model = `openrouter/${MODEL}`) {
  return new Request("http://localhost/api/v1/images/edits", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      prompt: "make the apple green",
      images: [`data:image/png;base64,${PNG.toString("base64")}`],
    }),
  });
}

test("the pricing lookup tries the provider-local id of a nested model", () => {
  assert.ok(
    getPricingLookupModels("openrouter", `openrouter/${MODEL}`).includes(MODEL),
    "provider-local id missing from the lookup keys"
  );
});

test("a nested image model passed with its provider prefix prices from its provider-local key", async () => {
  assert.equal(
    await calculateModalCost("image", "openrouter", `openrouter/${MODEL}`, { n: 1 }),
    0.03
  );
  assert.equal(await calculateModalCost("image", "openrouter", MODEL, { n: 2 }), 0.06);
});

test("a successful edit returns its cost and draws the API key's budget down", async () => {
  const key = await budgetedKey();
  stubOpenRouter();

  const response = await imageEditRoute.POST(editRequest(key.key));

  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(Number(response.headers.get("x-omniroute-response-cost")), 0.03);
  assert.equal(costRules.getDailyTotal(key.id), 0.03);
  const body = (await response.json()) as { data: Array<{ b64_json?: string }> };
  assert.equal(body.data[0].b64_json, PNG.toString("base64"));
});

test("an edit is charged for every image it returns", async () => {
  const key = await budgetedKey();
  stubOpenRouter(2);

  const response = await imageEditRoute.POST(editRequest(key.key));

  assert.equal(response.status, 200);
  assert.equal(costRules.getDailyTotal(key.id), 0.06);
});

test("a failed edit is not charged", async () => {
  const key = await budgetedKey();
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: { message: "upstream down" } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const response = await imageEditRoute.POST(editRequest(key.key));

  assert.notEqual(response.status, 200);
  assert.equal(costRules.getDailyTotal(key.id), 0);
});
