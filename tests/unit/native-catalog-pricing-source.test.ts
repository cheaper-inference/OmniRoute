import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, beforeEach, test } from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "native-catalog-price-source-"));
process.env.DATA_DIR = dataDir;
const db = await import("../../src/lib/db/core.ts");
const pricing = await import("../../src/lib/db/settings/pricing.ts");
const { defaultSystemOneModelsDeps, handleSystemOneModels } =
  await import("../../open-sse/handlers/systemOneModels.ts");
beforeEach(() => {
  db.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
after(() => {
  db.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("native catalog never labels merged chat default or imported rates as operator overrides", async () => {
  assert.ok(
    await pricing.getPricingForModel("openai", "gpt-6-luna"),
    "fixture must exercise an existing merged ordinary price"
  );
  assert.equal(await defaultSystemOneModelsDeps.getPricingForModel("openai", "gpt-6-luna"), null);
  db.getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES(?,?,?)")
    .run(
      "pricing_synced",
      "openrouter",
      JSON.stringify({ "fixture-native": { input: 42, output: 5 } })
    );
  assert.equal(
    await defaultSystemOneModelsDeps.getPricingForModel("openrouter", "fixture-native"),
    null
  );
});

test("actual complete user zero rate is honored only for generic-token-compatible native contracts", async () => {
  await pricing.updatePricing({
    openrouter: { "fixture-native": { input: 0, output: 0 } },
    openai: { "gpt-6-luna": { input: 0, output: 0 } },
    liquid: { "d1.1": { input: 0, output: 0 } },
  });
  assert.deepEqual(
    await defaultSystemOneModelsDeps.getPricingForModel("openrouter", "fixture-native"),
    { input: 0, output: 0 }
  );
  assert.equal(await defaultSystemOneModelsDeps.getPricingForModel("openai", "gpt-6-luna"), null);
  assert.equal(await defaultSystemOneModelsDeps.getPricingForModel("liquid", "d1.1"), null);
});

test("incomplete user override cannot borrow missing rate fields from lower layers", async () => {
  await pricing.updatePricing({ openrouter: { "fixture-native": { input: 0 } } });
  const override = await defaultSystemOneModelsDeps.getPricingForModel(
    "openrouter",
    "fixture-native"
  );
  assert.equal(override, null);
});

test("verified upstream native catalog price survives when global chat override is inapplicable", async () => {
  await pricing.updatePricing({ openai: { "gpt-6-luna": { input: 900, output: 900 } } });
  const response = await handleSystemOneModels(
    {},
    {
      listConnections: async () => [
        { id: "fixture-connection", provider: "openai", apiKey: "fixture-only" },
      ],
      isConnectionUnavailable: () => false,
      fetchSystemOne: async () =>
        Response.json({
          data: [
            {
              id: "gpt-6-luna",
              pricing: { prompt: "0.000001", completion: "0" },
              pricing_currency: "USD",
              pricing_unit: "token",
            },
          ],
        }),
    }
  );
  assert.equal(response.status, 200);
  const rows = (await response.json()).data;
  assert.equal(rows[0].pricing_source, "upstream");
  assert.deepEqual(rows[0].pricing, { prompt: "0.000001", completion: "0" });
});
