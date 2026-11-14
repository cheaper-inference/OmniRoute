import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rankings-pricing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { computeFreeProviderRankings } = await import("../../src/lib/freeProviderRankings.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("computeFreeProviderRankings pricing overlay", () => {
  it("does not write DB pricing onto the shared registry model objects", async () => {
    const providerId = "gemini";
    const models = (REGISTRY[providerId]?.models ?? []) as Array<{ id: string; pricing?: unknown }>;
    const target = models.find((m) => !m.pricing);
    assert.ok(target, "expected a pricing-less registry model on the gemini provider");

    getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("pricing_synced", providerId, JSON.stringify({ [target.id]: { input: 1, output: 2 } }));

    await computeFreeProviderRankings();

    assert.equal(target.pricing, undefined);
  });
});
