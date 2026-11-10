import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #17881: a combo with Cloudflare Workers AI llama-3.3-70b-instruct-fp8-fast (24k window)
// must advertise 24000, not an unknown window or the larger sibling's 262144.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-cf-context-17881-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-cf-context-test-secret";
// Cold catalog builds are bounded by CATALOG_BUILD_TIMEOUT_MS (#12627); keep it out of the way.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

const LLAMA_FP8_FAST = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const KIMI = "@cf/moonshotai/kimi-k2.6";

async function getComboEntry(name: string): Promise<Record<string, unknown> | undefined> {
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  return body.data.find((item) => item.id === name);
}

describe("Cloudflare Workers AI combo context window (#17881)", () => {
  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("single-member combo advertises the fp8-fast 24k window", async () => {
    await providersDb.createProviderConnection({
      provider: "cloudflare-ai",
      authType: "apikey",
      name: "cf-test-conn",
      apiKey: "cf-test-key",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { accountId: "test-account" },
    });

    await combosDb.createCombo({
      name: "cf-llama-fp8-combo",
      strategy: "priority",
      models: [{ model: `cf/${LLAMA_FP8_FAST}`, providerId: "cloudflare-ai" }],
    });

    const combo = await getComboEntry("cf-llama-fp8-combo");
    assert.ok(combo, "combo should exist in models list");
    assert.equal(combo?.context_length, 24000);
    assert.equal(combo?.max_input_tokens, 24000);
  });

  it("mixed combo advertises the smallest member window, not the larger sibling's", async () => {
    await combosDb.createCombo({
      name: "cf-llama-kimi-combo",
      strategy: "priority",
      models: [
        { model: `cf/${LLAMA_FP8_FAST}`, providerId: "cloudflare-ai" },
        { model: `cf/${KIMI}`, providerId: "cloudflare-ai" },
      ],
    });

    const combo = await getComboEntry("cf-llama-kimi-combo");
    assert.ok(combo, "combo should exist in models list");
    assert.equal(combo?.context_length, 24000);
    assert.equal(combo?.max_input_tokens, 24000);
  });
});
