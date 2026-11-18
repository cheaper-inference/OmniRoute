import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-models-filter-"));
process.env.DATA_DIR = TEST_DATA_DIR;

import type { RankableModel, FreeProviderRanking } from "../../src/lib/freeProviderRankings.ts";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { bulkUpsertModelIntelligence } = await import("../../src/lib/db/modelIntelligence.ts");
const { isRankableModelFree, computeFreeProviderRankings } =
  await import("../../src/lib/freeProviderRankings.ts");

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("isRankableModelFree", () => {
  it("returns true for catalogued free models", () => {
    assert.equal(
      isRankableModelFree("gemini", { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" }),
      true
    );
    assert.equal(
      isRankableModelFree("vertex", { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" }),
      true
    );
  });

  it("returns false for paid models on providers with free tiers", () => {
    assert.equal(
      isRankableModelFree("vertex", { id: "claude-opus-5-5", name: "Claude Opus 5.5" }),
      false
    );
    assert.equal(
      isRankableModelFree("gemini", { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" }),
      false
    );
  });

  it("returns true for models with :free suffix", () => {
    assert.equal(
      isRankableModelFree("openrouter", {
        id: "meta-llama/llama-3.3-70b-instruct:free",
        name: "Llama 3.3 70B (free)",
      }),
      true
    );
  });

  it("returns true for models with explicit free or isFree flag", () => {
    const customFree: RankableModel & { free: boolean } = {
      id: "custom-free-model",
      name: "Custom Model",
      free: true,
    };
    assert.equal(isRankableModelFree("custom-provider", customFree), true);

    const customIsFree: RankableModel & { isFree: boolean } = {
      id: "custom-isfree-model",
      name: "Custom Model",
      isFree: true,
    };
    assert.equal(isRankableModelFree("custom-provider", customIsFree), true);
  });

  it("returns true for models with 'free' or 'grátis' in display name", () => {
    assert.equal(
      isRankableModelFree("groq", { id: "custom-llama", name: "Llama 3 Free Tier" }),
      true
    );
  });

  it("returns false for non-free models on providers with hasFree: false", () => {
    assert.equal(
      isRankableModelFree("devin-cli-agentic", {
        id: "claude-opus-5-max-fast",
        name: "Claude Opus 5 Max",
      }),
      false
    );
  });
});

describe("FreeProviderRanking considered models shape", () => {
  it("supports considered models array and isFree metadata on ranking", () => {
    const mockRanking: FreeProviderRanking = {
      id: "gemini",
      name: "Google Gemini",
      icon: "google",
      color: "#4285F4",
      category: "apikey",
      topModel: {
        modelId: "gemini-2.5-flash",
        modelName: "Gemini 2.5 Flash",
        score: 0.941,
        eloRaw: 1350,
        confidence: "high",
        category: "default",
        isFree: true,
      },
      averageScore: 0.941,
      modelCount: 1,
      models: [
        {
          modelId: "gemini-2.5-flash",
          modelName: "Gemini 2.5 Flash",
          score: 0.941,
          eloRaw: 1350,
          confidence: "high",
          category: "default",
          isFree: true,
        },
      ],
    };

    assert.equal(mockRanking.models?.length, 1);
    assert.equal(mockRanking.models?.[0].isFree, true);
    assert.equal(mockRanking.models?.[0].modelId, "gemini-2.5-flash");
  });
});

describe("computeFreeProviderRankings with freeModelsOnly option", () => {
  it("filters out paid models when freeModelsOnly is true", async () => {
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 86400000).toISOString();

    bulkUpsertModelIntelligence([
      {
        model: "claude-opus-5-5",
        category: "default",
        source: "arena_elo",
        score: 0.98,
        eloRaw: 1500,
        confidence: "high",
        syncedAt: now,
        expiresAt,
      },
      {
        model: "gemini-2.5-flash",
        category: "default",
        source: "arena_elo",
        score: 0.85,
        eloRaw: 1300,
        confidence: "high",
        syncedAt: now,
        expiresAt,
      },
    ]);

    // Unfiltered ranking (freeModelsOnly: false / undefined)
    const allRankings = await computeFreeProviderRankings("default", 50, { freeModelsOnly: false });
    const vertexAll = allRankings.find((r) => r.id === "vertex");
    assert.ok(vertexAll, "Vertex should be in all rankings");
    assert.equal(vertexAll.topModel?.modelId, "claude-opus-5-5");
    assert.equal(vertexAll.topModel?.isFree, false);
    assert.ok(vertexAll.models && vertexAll.models.length >= 2);

    // Free models only ranking
    const freeRankings = await computeFreeProviderRankings("default", 50, { freeModelsOnly: true });
    const vertexFree = freeRankings.find((r) => r.id === "vertex");
    assert.ok(
      vertexFree,
      "Vertex should still be in free rankings because it has gemini-2.5-flash"
    );
    assert.equal(vertexFree.topModel?.modelId, "gemini-2.5-flash");
    assert.equal(vertexFree.topModel?.score, 0.85);
    assert.equal(vertexFree.topModel?.isFree, true);
    assert.ok(vertexFree.models?.every((m) => m.isFree === true));
    assert.ok(!vertexFree.models?.some((m) => m.modelId === "claude-opus-5-5"));
  });
});
