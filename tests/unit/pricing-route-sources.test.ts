import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
import { updatePricingSchema } from "../../src/shared/validation/schemas/pricing.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

interface PricingWithSourcesPayload {
  pricing: Record<string, Record<string, Record<string, number>>>;
  sourceMap: Record<string, Record<string, "default" | "litellm" | "modelsDev" | "user">>;
}

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const pricingRoute = await import("../../src/app/api/pricing/route.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test("pricing GET exposes historical Go prices under the canonical bucket and source", async () => {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "pricing_synced",
      "opencode_go",
      JSON.stringify({ "glm-5.2": { input: 1.4, output: 4.4, cached: 0.26 } })
    );
  invalidateDbCache("pricing");
  const legacyResponse = await pricingRoute.GET(new Request("http://localhost/api/pricing"));
  assert.equal(legacyResponse.status, 200);
  const legacy = updatePricingSchema.parse(await legacyResponse.json());
  assert.deepEqual(legacy["opencode-go"]["glm-5.2"], { input: 1.4, output: 4.4, cached: 0.26 });
  assert.equal(legacy.opencode_go, undefined);
  const response = await pricingRoute.GET(
    new Request("http://localhost/api/pricing?includeSources=1")
  );
  assert.equal(response.status, 200);
  const payload = z
    .object({
      pricing: updatePricingSchema,
      sourceMap: z.record(
        z.string(),
        z.record(z.string(), z.enum(["default", "litellm", "modelsDev", "user"]))
      ),
    })
    .strict()
    .parse(await response.json());
  assert.deepEqual(payload.pricing["opencode-go"]["glm-5.2"], {
    input: 1.4,
    output: 4.4,
    cached: 0.26,
  });
  assert.equal(payload.sourceMap["opencode-go"]["glm-5.2"], "litellm");
  assert.equal(payload.sourceMap.opencode_go, undefined);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("pricing GET keeps legacy payload by default and exposes source metadata on demand", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "route-provider",
    JSON.stringify({
      "model-litellm": { prompt: 1 },
      "model-user": { prompt: 2 },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "route-provider",
    JSON.stringify({
      "model-modelsdev": { prompt: 3 },
      "model-user": { completion: 4 },
    })
  );

  await settingsDb.updatePricing({
    "route-provider": {
      "model-user": { cached: 5 },
    },
  });

  const legacyResponse = await pricingRoute.GET(new Request("http://localhost/api/pricing"));
  assert.equal(legacyResponse.status, 200);
  const legacyPayload = await legacyResponse.json();

  assert.equal("sourceMap" in legacyPayload, false);
  assert.deepEqual(legacyPayload["route-provider"]["model-user"], {
    prompt: 2,
    completion: 4,
    cached: 5,
  });

  const sourceResponse = await pricingRoute.GET(
    new Request("http://localhost/api/pricing?includeSources=1")
  );
  assert.equal(sourceResponse.status, 200);

  const payload = (await sourceResponse.json()) as PricingWithSourcesPayload;
  assert.deepEqual(payload.pricing["route-provider"]["model-user"], {
    prompt: 2,
    completion: 4,
    cached: 5,
  });
  assert.equal(payload.sourceMap["route-provider"]["model-litellm"], "litellm");
  assert.equal(payload.sourceMap["route-provider"]["model-modelsdev"], "modelsDev");
  assert.equal(payload.sourceMap["route-provider"]["model-user"], "user");
  assert.equal(payload.sourceMap.openai["gpt-4o"], "default");
});
