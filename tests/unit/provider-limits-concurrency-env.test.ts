import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-limits-conc-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-provider-limits-concurrency-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.PROVIDER_LIMITS_CONCURRENCY;
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  delete process.env.PROVIDER_LIMITS_CONCURRENCY;
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  await cleanupTempDataDir(TEST_DATA_DIR);
});

async function createGlmApiKeyConnection(i: number) {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Concurrency ${i}`,
    apiKey: `glm-concurrency-key-${i}`,
  });
}

function glmQuotaResponse() {
  return new Response(
    JSON.stringify({
      code: 200,
      success: true,
      data: {
        planName: "max",
        limits: [
          {
            type: "TOKENS_LIMIT",
            unit: 3,
            number: 5,
            percentage: 13,
            nextResetTime: Math.floor(Date.now() / 1000) + 3 * 3600,
            models: [],
          },
        ],
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("getProviderLimitsConcurrency defaults to 5 when unset or blank", () => {
  assert.equal(providerLimits.getProviderLimitsConcurrency(), 5);

  process.env.PROVIDER_LIMITS_CONCURRENCY = "";
  assert.equal(providerLimits.getProviderLimitsConcurrency(), 5);

  process.env.PROVIDER_LIMITS_CONCURRENCY = "   ";
  assert.equal(providerLimits.getProviderLimitsConcurrency(), 5);
});

test("getProviderLimitsConcurrency parses valid positive integers", () => {
  process.env.PROVIDER_LIMITS_CONCURRENCY = "1";
  assert.equal(providerLimits.getProviderLimitsConcurrency(), 1);

  process.env.PROVIDER_LIMITS_CONCURRENCY = "8";
  assert.equal(providerLimits.getProviderLimitsConcurrency(), 8);

  process.env.PROVIDER_LIMITS_CONCURRENCY = " 12 ";
  assert.equal(providerLimits.getProviderLimitsConcurrency(), 12);
});

test("getProviderLimitsConcurrency falls back to 5 on invalid or non-positive values", () => {
  for (const invalid of ["0", "-1", "-10", "abc", "3.5", "5abc", "Infinity", "NaN"]) {
    process.env.PROVIDER_LIMITS_CONCURRENCY = invalid;
    assert.equal(
      providerLimits.getProviderLimitsConcurrency(),
      5,
      `expected fallback 5 for PROVIDER_LIMITS_CONCURRENCY=${JSON.stringify(invalid)}`
    );
  }
});

test("syncAllProviderLimits honors PROVIDER_LIMITS_CONCURRENCY for non-OAuth connections", async () => {
  process.env.PROVIDER_LIMITS_CONCURRENCY = "2";
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
  for (let i = 0; i < 4; i++) await createGlmApiKeyConnection(i);

  let inFlight = 0;
  let maxInFlight = 0;

  globalThis.fetch = (async (input: string | URL | Request) => {
    if (String(input).includes("/quota/limit")) {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 25));
      inFlight--;
    }
    return glmQuotaResponse();
  }) as typeof fetch;

  const result = await providerLimits.syncAllProviderLimits({ source: "scheduled" });
  assert.equal(result.total, 4);
  assert.equal(maxInFlight, 2);
});

test("syncAllProviderLimits falls back to default concurrency 5 when env is invalid", async () => {
  process.env.PROVIDER_LIMITS_CONCURRENCY = "abc";
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
  for (let i = 0; i < 5; i++) await createGlmApiKeyConnection(i);

  let inFlight = 0;
  let maxInFlight = 0;

  globalThis.fetch = (async (input: string | URL | Request) => {
    if (String(input).includes("/quota/limit")) {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 25));
      inFlight--;
    }
    return glmQuotaResponse();
  }) as typeof fetch;

  const result = await providerLimits.syncAllProviderLimits({ source: "scheduled" });
  assert.equal(result.total, 5);
  assert.equal(maxInFlight, 5);
});

test("syncAllProviderLimits explicit options.concurrency overrides PROVIDER_LIMITS_CONCURRENCY", async () => {
  process.env.PROVIDER_LIMITS_CONCURRENCY = "4";
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
  for (let i = 0; i < 3; i++) await createGlmApiKeyConnection(i);

  let inFlight = 0;
  let maxInFlight = 0;

  globalThis.fetch = (async (input: string | URL | Request) => {
    if (String(input).includes("/quota/limit")) {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 20));
      inFlight--;
    }
    return glmQuotaResponse();
  }) as typeof fetch;

  const result = await providerLimits.syncAllProviderLimits({
    source: "scheduled",
    concurrency: 1,
  });
  assert.equal(result.total, 3);
  assert.equal(maxInFlight, 1);
});
