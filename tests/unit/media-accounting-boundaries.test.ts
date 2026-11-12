import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "media-boundaries-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { normalizeMediaUsage, priceMediaRequest } =
  await import("../../src/lib/usage/mediaRequestAccounting.ts");
const { imageRequestBill, runImageRequestWithAccounting } =
  await import("../../src/lib/usage/imageRequestAccounting.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("nested billing details retain only finite nonnegative scalars and the cache flag", () => {
  assert.deepEqual(
    normalizeMediaUsage({
      cost: 0.02,
      prompt_tokens_details: {
        cached_tokens: 0,
        cache_creation_tokens: 3,
        cache_write_tokens: -1,
        reasoning_tokens: Infinity,
        cache_creation_in_prompt: false,
        prompt: "synthetic private content",
      },
      input_tokens_details: [],
      completion_tokens_details: { reasoning_tokens: 2 },
      output_tokens_details: { cache_creation_in_prompt: "false" },
    }),
    {
      cost_usd: 0.02,
      prompt_tokens_details: {
        cached_tokens: 0,
        cache_creation_tokens: 3,
        cache_creation_in_prompt: false,
      },
      completion_tokens_details: { reasoning_tokens: 2 },
    }
  );
});

test("fallback dimensional tariffs preserve known zero, missing quantities and exact USD", async () => {
  await updatePricing({
    synthetic: {
      seconds: { output_cost_per_second: 0.001 },
      characters: { output_cost_per_character: 0.002 },
      images: { input_cost_per_image: 0 },
    },
  });
  for (const [model, unit, rate] of [
    ["seconds", "second", 0.001],
    ["characters", "character", 0.002],
    ["images", "image", 0],
  ] as const) {
    const bill = await priceMediaRequest({ provider: "synthetic", model, unit, quantity: 2 });
    assert.equal(bill.costUsd, rate * 2);
    assert.equal(bill.unitPriceUsd, rate);
    assert.equal(bill.reportedCostUsd, null);
    const missing = await priceMediaRequest({ provider: "synthetic", model, unit, quantity: NaN });
    assert.equal(missing.costUsd, null);
    assert.equal(missing.quantity, null);
    const exact = await priceMediaRequest({
      provider: "synthetic",
      model,
      unit,
      quantity: 2,
      usage: { cost_usd: 0 },
    });
    assert.equal(exact.costUsd, 0);
    assert.equal(exact.reportedCostUsd, 0);
    assert.equal(exact.unitPriceUsd, null);
  }
});

test("image quantity counts only delivered entries in either response envelope", async () => {
  await updatePricing({ synthetic: { picture: { output_cost_per_image: 0.03 } } });
  const entries = [
    null,
    {},
    1,
    { url: "" },
    { url: "https://example.invalid/image" },
    { b64_json: "eA==" },
  ];
  for (const data of [entries, { data: entries }]) {
    const result = { success: true, data };
    const actual = await runImageRequestWithAccounting(
      {
        endpoint: "/v1/images/generations",
        provider: "synthetic",
        model: "synthetic/picture",
        startTime: Date.now(),
      },
      async () => result
    );
    assert.equal(actual, result);
    const bill = imageRequestBill(result);
    assert.ok(bill);
    assert.equal(bill.quantity, 2);
    assert.equal(bill.costUsd, 0.06);
    assert.equal(imageRequestBill(data), bill);
  }
  const rows = core
    .getDbInstance()
    .prepare("SELECT billing_quantity, calculated_cost_usd FROM usage_history")
    .all();
  assert.deepEqual(rows, [
    { billing_quantity: 2, calculated_cost_usd: 0.06 },
    { billing_quantity: 2, calculated_cost_usd: 0.06 },
  ]);
});
