import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-limits-banned-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-limits-banned-secret";
process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  await cleanupTempDataDir(TEST_DATA_DIR);
});

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

// Counts quota requests per API key, so each account is traced on its own.
function stubQuotaFetch(): Map<string, number> {
  const calls = new Map<string, number>();
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    if (String(input).includes("/quota/limit")) {
      const auth = new Headers(init?.headers).get("authorization") ?? "";
      calls.set(auth, (calls.get(auth) ?? 0) + 1);
    }
    return glmQuotaResponse();
  }) as typeof fetch;
  return calls;
}

async function makeGlm(name: string, apiKey: string, testStatus?: string) {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name,
    apiKey,
  });
  if (testStatus) await providersDb.updateProviderConnection(conn.id, { testStatus });
  return conn;
}

test("scheduled sync does not call upstream for a banned account but still polls healthy ones", async () => {
  await makeGlm("Healthy", "glm-healthy-key");
  await makeGlm("Banned", "glm-banned-key", "banned");
  const calls = stubQuotaFetch();

  await providerLimits.syncAllProviderLimits({ source: "scheduled" });

  assert.equal(calls.get("Bearer glm-healthy-key"), 1, "healthy account is polled");
  assert.equal(calls.get("Bearer glm-banned-key") ?? 0, 0, "banned account is not polled");
});

test("manual sync still checks a banned account live (force-check path)", async () => {
  await makeGlm("Banned", "glm-banned-key", "banned");
  const calls = stubQuotaFetch();

  await providerLimits.syncAllProviderLimits({ source: "manual" });

  assert.equal(calls.get("Bearer glm-banned-key"), 1, "manual sync must still reach upstream");
});
