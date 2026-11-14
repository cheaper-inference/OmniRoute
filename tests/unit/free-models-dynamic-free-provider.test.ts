import { test, describe, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dynamic-free-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const intelligenceDb = await import("../../src/lib/db/modelIntelligence.ts");
const { providerHasFreeModels } = await import("../../src/shared/utils/freeModels.ts");
const rankings = await import("../../src/lib/freeProviderRankings.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("dynamic free models detection", () => {
  test("providerHasFreeModels detects free models in passed-in candidate list", () => {
    assert.equal(providerHasFreeModels("unknown-provider-xyz"), false);
    assert.equal(providerHasFreeModels("unknown-provider-xyz", [{ id: "m1", isFree: true }]), true);
    assert.equal(providerHasFreeModels("unknown-provider-xyz", [{ id: "m1:free" }]), true);
    assert.equal(
      providerHasFreeModels("unknown-provider-xyz", [
        { id: "m1", pricing: { prompt: 0, completion: 0 } },
      ]),
      true
    );
    assert.equal(
      providerHasFreeModels("unknown-provider-xyz", [
        { id: "m1", pricing: { prompt: 1, completion: 2 } },
      ]),
      false
    );
  });

  test("providerHasFreeModels detects custom models with isFree: true in database", async () => {
    const providerId = "dynamic-custom-prov";
    assert.equal(providerHasFreeModels(providerId), false);

    await modelsDb.addCustomModel(
      providerId,
      "test-free-1",
      "Test Free 1",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      false,
      undefined,
      true // isFree
    );

    // Raw key_value writes bypass the writers that invalidate the memoized free-model answer.
    modelsDb.clearLiveOrCustomFreeModelsCache();
    assert.equal(providerHasFreeModels(providerId), true);
  });

  test("providerHasFreeModels detects synced available models from /models in database", async () => {
    const providerId = "dynamic-synced-prov";
    assert.equal(providerHasFreeModels(providerId), false);

    const db = core.getDbInstance();
    db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    ).run(
      `${providerId}:conn-1`,
      JSON.stringify([{ id: "synced-free:free", name: "Synced Free Model" }])
    );

    // Raw key_value writes bypass the writers that invalidate the memoized free-model answer.
    modelsDb.clearLiveOrCustomFreeModelsCache();
    assert.equal(providerHasFreeModels(providerId), true);
  });

  test("providerHasFreeModels detects zero-cost pricing in models_dev_pricing", async () => {
    const providerId = "dynamic-pricing-prov";
    assert.equal(providerHasFreeModels(providerId), false);

    const db = core.getDbInstance();
    db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('models_dev_pricing', ?, ?)"
    ).run(providerId, JSON.stringify({ "zero-cost-model": { input: 0, output: 0 } }));

    // Raw key_value writes bypass the writers that invalidate the memoized free-model answer.
    modelsDb.clearLiveOrCustomFreeModelsCache();
    assert.equal(providerHasFreeModels(providerId), true);
  });

  test("computeFreeProviderRankings with freeModelsOnly:true includes dynamically free provider", async () => {
    const providerId = "logfare";
    // logfare has passthroughModels: true and empty static models, but is registered in APIKEY_PROVIDERS
    await modelsDb.addCustomModel(
      providerId,
      "logfare-model-free",
      "Logfare Free Model",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      false,
      undefined,
      true
    );

    intelligenceDb.upsertModelIntelligence({
      model: "logfare-model-free",
      source: "arena_elo",
      category: "default",
      score: 0.88,
      eloRaw: 1250,
      confidence: "high",
      expiresAt: null,
    });

    const ranking = await rankings.computeFreeProviderRankings(undefined, 200, {
      freeModelsOnly: true,
    });
    const logfareEntry = ranking.find((r) => r.id === providerId);
    assert.ok(logfareEntry, "logfare should appear in free-only rankings when it has free models");
    assert.equal(logfareEntry?.topModel?.modelId, "logfare-model-free");
    assert.equal(logfareEntry?.topModel?.isFree, true);
  });
});
