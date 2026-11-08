import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-shrink-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const pricingSync = await import("../../src/lib/pricingSync.ts");

const originalFetch = globalThis.fetch;
const originalWarn = console.warn;

function liteLLMModels(count: number) {
  const raw: Record<string, unknown> = {};
  for (let i = 0; i < count; i++) {
    raw[`openai/model-${i}`] = {
      input_cost_per_token: 0.000001,
      output_cost_per_token: 0.000002,
      litellm_provider: "openai",
      mode: "chat",
    };
  }
  return raw;
}

function fetchReturns(raw: Record<string, unknown>) {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(raw), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
}

// The provider map also stores each openai model under a second provider id, so count one.
function storedModelCount() {
  return Object.keys(pricingSync.getSyncedPricing().openai ?? {}).length;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  console.warn = () => {};
});

test.after(() => {
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a fetched map under half the stored size is rejected and the stored prices stay", async () => {
  fetchReturns(liteLLMModels(10));
  assert.equal((await pricingSync.syncPricingFromSources({})).success, true);
  assert.equal(storedModelCount(), 10);

  fetchReturns(liteLLMModels(4));
  const result = await pricingSync.syncPricingFromSources({});

  assert.equal(result.success, false);
  assert.match(String(result.error), /shrank|smaller|rejected/i);
  assert.equal(storedModelCount(), 10);
});

test("an empty fetched map is rejected and the stored prices stay", async () => {
  fetchReturns(liteLLMModels(10));
  await pricingSync.syncPricingFromSources({});

  fetchReturns({});
  const result = await pricingSync.syncPricingFromSources({});

  assert.equal(result.success, false);
  assert.equal(storedModelCount(), 10);
});

test("an empty fetched map is rejected on a first sync too", async () => {
  fetchReturns({});
  const result = await pricingSync.syncPricingFromSources({});

  assert.equal(result.success, false);
  assert.equal(storedModelCount(), 0);
});

test("a fetched map at half the stored size is accepted (real removals still sync)", async () => {
  fetchReturns(liteLLMModels(10));
  await pricingSync.syncPricingFromSources({});

  fetchReturns(liteLLMModels(5));
  const result = await pricingSync.syncPricingFromSources({});

  assert.equal(result.success, true);
  assert.equal(storedModelCount(), 5);
});

test("a dry run never trips the guard and never saves", async () => {
  fetchReturns(liteLLMModels(10));
  await pricingSync.syncPricingFromSources({});

  fetchReturns(liteLLMModels(2));
  const result = await pricingSync.syncPricingFromSources({ dryRun: true });

  assert.equal(result.success, true);
  assert.equal(storedModelCount(), 10);
});
