/**
 * Unit tests for OpenRouter benchmarks integration in src/lib/arenaEloSync.ts
 */

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-or-benchmarks-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const MIGRATION_SQL = fs.readFileSync(
  path.resolve(
    import.meta.dirname ?? __dirname,
    "../../src/lib/db/migrations/097_model_intelligence.sql"
  ),
  "utf8"
);
const MIGRATION_242_SQL = fs.readFileSync(
  path.resolve(
    import.meta.dirname ?? __dirname,
    "../../src/lib/db/migrations/242_model_intelligence_permaslug.sql"
  ),
  "utf8"
);
const MIGRATION_243_SQL = fs.readFileSync(
  path.resolve(
    import.meta.dirname ?? __dirname,
    "../../src/lib/db/migrations/243_model_intelligence_metric.sql"
  ),
  "utf8"
);

import { tryOpenSync } from "../../src/lib/db/adapters/driverFactory";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types";

const core = await import("../../src/lib/db/core.ts");
const {
  OPENROUTER_BENCHMARKS_API,
  normalizeOpenRouterModelSlug,
  resolveOpenRouterApiKey,
  fetchOpenRouterBenchmarks,
  transformOpenRouterBenchmarksToModelIntelligence,
  syncArenaElo,
  getArenaEloSyncStatus,
  resetArenaEloSyncStateForTests,
  stopArenaEloSync,
} = await import("../../src/lib/arenaEloSync.ts");

import type { OpenRouterBenchmarksResponse } from "../../src/lib/arenaEloSync.ts";

const originalFetch = globalThis.fetch;

function mockFetch(impl: (url: string, opts?: RequestInit) => Promise<Response>): void {
  globalThis.fetch = impl as typeof fetch;
}

function restoreFetch(): void {
  globalThis.fetch = originalFetch;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

let testAdapter: SqliteAdapter;

function createTestAdapter(): SqliteAdapter {
  const patchedSql = MIGRATION_SQL.replace(
    /\n\s*synced_at TEXT NOT NULL DEFAULT \(datetime\('now'\)\)/,
    "\n  synced_at TEXT NOT NULL"
  );
  const adapter = tryOpenSync(":memory:")!;
  adapter.exec(`
    CREATE TABLE IF NOT EXISTS key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    );
    CREATE TABLE IF NOT EXISTS provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      auth_type TEXT,
      name TEXT,
      email TEXT,
      priority INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      access_token TEXT,
      refresh_token TEXT,
      expires_at TEXT,
      token_expires_at TEXT,
      scope TEXT,
      project_id TEXT,
      test_status TEXT,
      error_code TEXT,
      last_error TEXT,
      last_error_at TEXT,
      last_error_type TEXT,
      last_error_source TEXT,
      backoff_level INTEGER DEFAULT 0,
      rate_limited_until TEXT,
      health_check_interval INTEGER,
      last_health_check_at TEXT,
      last_tested TEXT,
      api_key TEXT,
      id_token TEXT,
      provider_specific_data TEXT,
      expires_in INTEGER,
      display_name TEXT,
      global_priority INTEGER,
      default_model TEXT,
      token_type TEXT,
      consecutive_use_count INTEGER DEFAULT 0,
      rate_limit_protection INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  adapter.exec(patchedSql);
  adapter.exec(MIGRATION_242_SQL);
  adapter.exec(MIGRATION_243_SQL);
  return adapter;
}

beforeEach(() => {
  core.resetDbInstance();
  testAdapter = createTestAdapter();
  globalThis.__omnirouteDb = testAdapter as never;
  stopArenaEloSync();
  resetArenaEloSyncStateForTests();
  delete process.env.ARENA_ELO_SYNC_ENABLED;
  delete process.env.OPENROUTER_API_KEY;
});

afterEach(() => {
  restoreFetch();
  stopArenaEloSync();
  resetArenaEloSyncStateForTests();
  delete process.env.ARENA_ELO_SYNC_ENABLED;
  delete process.env.OPENROUTER_API_KEY;
  core.resetDbInstance();
});

// ═══════════════════════════════════════════════════════════
// 1. normalizeOpenRouterModelSlug()
// ═══════════════════════════════════════════════════════════

describe("normalizeOpenRouterModelSlug()", () => {
  it("strips vendor prefixes and yields base without date snapshot and version variants", () => {
    const res = normalizeOpenRouterModelSlug("anthropic/claude-opus-5.5-20260921");
    assert.ok(res.includes("claude-opus-5.5-20260921"));
    assert.ok(res.includes("claude-opus-5.5"));
    assert.ok(res.includes("claude-opus-5-5"));
  });

  it("normalizes OpenAI model with snapshot date", () => {
    const res = normalizeOpenRouterModelSlug("openai/gpt-6-sol-20260922");
    assert.ok(res.includes("gpt-6-sol-20260922"));
    assert.ok(res.includes("gpt-6-sol"));
  });

  it("maps inverted Claude versioning e.g. claude-4.6-sonnet to claude-sonnet-4-6", () => {
    const res = normalizeOpenRouterModelSlug("anthropic/claude-4.6-sonnet-20260217");
    assert.ok(res.includes("claude-4.6-sonnet-20260217"));
    assert.ok(res.includes("claude-4.6-sonnet"));
    assert.ok(res.includes("claude-sonnet-4-6"));
  });

  it("handles model without vendor prefix or date unchanged", () => {
    const res = normalizeOpenRouterModelSlug("gpt-4o");
    assert.deepStrictEqual(res, ["gpt-4o"]);
  });

  it("handles -preview models by including base model without preview", () => {
    const res = normalizeOpenRouterModelSlug("google/gemini-3.1-pro-preview");
    assert.ok(res.includes("gemini-3.1-pro-preview"));
    assert.ok(res.includes("gemini-3.1-pro"));
  });

  it("handles -preview snapshot date models", () => {
    const res = normalizeOpenRouterModelSlug("google/gemini-3.1-flash-lite-preview-20260303");
    assert.ok(res.includes("gemini-3.1-flash-lite-preview-20260303"));
    assert.ok(res.includes("gemini-3.1-flash-lite-preview"));
    assert.ok(res.includes("gemini-3.1-flash-lite"));
  });

  it("normalizes vendor prefixes from major AI labs (Z.AI, Moonshot, Meta-Llama, MistralAI, DeepSeek-AI, x-AI, Microsoft, MiniMax)", () => {
    // Z.AI / Zhipu GLM
    const glmRes = normalizeOpenRouterModelSlug("z-ai/glm-5.3");
    assert.ok(glmRes.includes("glm-5.3"));
    assert.ok(glmRes.includes("glm-5-3"));
    assert.ok(!glmRes.some((v) => v.startsWith("z-ai/")));

    // Moonshot AI / Kimi
    const kimiRes = normalizeOpenRouterModelSlug("moonshotai/kimi-k3");
    assert.ok(kimiRes.includes("kimi-k3"));
    assert.ok(!kimiRes.some((v) => v.startsWith("moonshotai/")));

    // Meta Llama
    const llamaRes = normalizeOpenRouterModelSlug("meta-llama/llama-3.3-70b-instruct");
    assert.ok(llamaRes.includes("llama-3.3-70b-instruct"));
    assert.ok(!llamaRes.some((v) => v.startsWith("meta-llama/")));

    // Mistral AI
    const mistralRes = normalizeOpenRouterModelSlug("mistralai/mistral-large-2411");
    assert.ok(mistralRes.includes("mistral-large-2411"));
    assert.ok(!mistralRes.some((v) => v.startsWith("mistralai/")));

    // DeepSeek AI
    const deepseekRes = normalizeOpenRouterModelSlug("deepseek-ai/deepseek-v4-pro");
    assert.ok(deepseekRes.includes("deepseek-v4-pro"));
    assert.ok(!deepseekRes.some((v) => v.startsWith("deepseek-ai/")));

    // x-AI
    const grokRes = normalizeOpenRouterModelSlug("x-ai/grok-2-1212");
    assert.ok(grokRes.includes("grok-2-1212"));
    assert.ok(!grokRes.some((v) => v.startsWith("x-ai/")));

    // Microsoft
    const phiRes = normalizeOpenRouterModelSlug("microsoft/phi-4");
    assert.ok(phiRes.includes("phi-4"));
    assert.ok(!phiRes.some((v) => v.startsWith("microsoft/")));

    // MiniMax
    const minimaxRes = normalizeOpenRouterModelSlug("minimax/minimax-m3");
    assert.ok(minimaxRes.includes("minimax-m3"));
    assert.ok(!minimaxRes.some((v) => v.startsWith("minimax/")));
  });

  it("strips -instruct, -it, and -chat suffixes to include base model variant", () => {
    const llamaRes = normalizeOpenRouterModelSlug("meta-llama/llama-3.3-70b-instruct");
    assert.ok(llamaRes.includes("llama-3.3-70b-instruct"));
    assert.ok(llamaRes.includes("llama-3.3-70b"));
    assert.ok(llamaRes.includes("llama-3-3-70b"));

    const gemmaRes = normalizeOpenRouterModelSlug("google/gemma-4-31b-it");
    assert.ok(gemmaRes.includes("gemma-4-31b-it"));
    assert.ok(gemmaRes.includes("gemma-4-31b"));

    const qwenRes = normalizeOpenRouterModelSlug("qwen/qwen-2.5-72b-instruct");
    assert.ok(qwenRes.includes("qwen-2.5-72b-instruct"));
    assert.ok(qwenRes.includes("qwen-2.5-72b"));
  });
});

// ═══════════════════════════════════════════════════════════
// 2. resolveOpenRouterApiKey()
// ═══════════════════════════════════════════════════════════

describe("resolveOpenRouterApiKey()", () => {
  it("resolves from OPENROUTER_API_KEY env var when no DB connection exists", async () => {
    process.env.OPENROUTER_API_KEY = "sk-or-v1-env-key-12345";
    const key = await resolveOpenRouterApiKey();
    assert.strictEqual(key, "sk-or-v1-env-key-12345");
  });

  it("returns null when neither env var nor DB connection exists", async () => {
    const key = await resolveOpenRouterApiKey();
    assert.strictEqual(key, null);
  });

  it("prioritizes active DB provider_connections row over env var", async () => {
    process.env.OPENROUTER_API_KEY = "sk-or-env-fallback";
    testAdapter.exec(`
      INSERT INTO provider_connections (id, provider, api_key, auth_type, is_active)
      VALUES ('conn-1', 'openrouter', 'sk-or-db-primary', 'apikey', 1)
    `);
    const key = await resolveOpenRouterApiKey();
    assert.strictEqual(key, "sk-or-db-primary");
  });

  it("ignores inactive DB connection and falls back to env var", async () => {
    process.env.OPENROUTER_API_KEY = "sk-or-env-fallback";
    testAdapter.exec(`
      INSERT INTO provider_connections (id, provider, api_key, auth_type, is_active)
      VALUES ('conn-1', 'openrouter', 'sk-or-db-inactive', 'apikey', 0)
    `);
    const key = await resolveOpenRouterApiKey();
    assert.strictEqual(key, "sk-or-env-fallback");
  });
});

// ═══════════════════════════════════════════════════════════
// 3. fetchOpenRouterBenchmarks()
// ═══════════════════════════════════════════════════════════

describe("fetchOpenRouterBenchmarks()", () => {
  it("sends Authorization header and returns parsed benchmarks data on 200", async () => {
    let capturedHeader = "";
    mockFetch(async (url: string, opts?: RequestInit) => {
      assert.strictEqual(url, OPENROUTER_BENCHMARKS_API);
      capturedHeader = String(
        (opts?.headers as Record<string, string>)?.["Authorization"] ??
          (opts?.headers as Record<string, string>)?.["authorization"]
      );
      return jsonResponse({
        data: [
          {
            source: "artificial-analysis",
            model_permaslug: "openai/gpt-4o",
            intelligence_index: 25.0,
          },
        ],
        meta: { model_count: 1 },
      });
    });

    const res = await fetchOpenRouterBenchmarks("test-api-key-abc");
    assert.strictEqual(capturedHeader, "Bearer test-api-key-abc");
    assert.strictEqual(res.data.length, 1);
    assert.strictEqual(res.data[0].model_permaslug, "openai/gpt-4o");
  });

  it("throws descriptive error when upstream returns non-200 status", async () => {
    mockFetch(
      async () => new Response("Unauthorized", { status: 401, statusText: "Unauthorized" })
    );
    await assert.rejects(
      () => fetchOpenRouterBenchmarks("bad-key"),
      /OpenRouter Benchmarks API fetch failed \[401\]/
    );
  });

  it("throws descriptive error on invalid JSON response", async () => {
    mockFetch(async () => new Response("<html>Gateway Timeout</html>", { status: 200 }));
    await assert.rejects(
      () => fetchOpenRouterBenchmarks("test-key"),
      /OpenRouter Benchmarks API returned invalid JSON/
    );
  });

  it("throws descriptive error when response is missing data array", async () => {
    mockFetch(async () => jsonResponse({ success: true }));
    await assert.rejects(() => fetchOpenRouterBenchmarks("test-key"), /missing data array/);
  });
});

// ═══════════════════════════════════════════════════════════
// 4. transformOpenRouterBenchmarksToModelIntelligence()
// ═══════════════════════════════════════════════════════════

describe("transformOpenRouterBenchmarksToModelIntelligence()", () => {
  it("returns empty array for empty response", () => {
    const res = transformOpenRouterBenchmarksToModelIntelligence({ data: [] });
    assert.deepStrictEqual(res, []);
  });

  it("normalizes Artificial Analysis indices and maps to categories", () => {
    const samplePayload: OpenRouterBenchmarksResponse = {
      data: [
        {
          source: "artificial-analysis",
          model_permaslug: "anthropic/claude-4.6-sonnet-20260217",
          intelligence_index: 50.0,
          coding_index: 80.0,
          agentic_index: 40.0,
        },
        {
          source: "artificial-analysis",
          model_permaslug: "openai/gpt-4o",
          intelligence_index: 10.0,
          coding_index: 20.0,
          agentic_index: 10.0,
        },
      ],
    };

    const entries = transformOpenRouterBenchmarksToModelIntelligence(samplePayload);
    assert.ok(entries.length > 0);

    // Highest model should score close to 0.98 on coding
    const sonnetCoding = entries.find(
      (e) => e.model === "claude-4.6-sonnet" && e.category === "coding"
    );
    assert.ok(sonnetCoding);
    assert.strictEqual(sonnetCoding.source, "arena_elo");
    assert.strictEqual(sonnetCoding.score, 0.98); // (80 - 20)/(80 - 20) * 0.58 + 0.4 = 0.98
    assert.strictEqual(sonnetCoding.confidence, "high");

    // Lowest model should score close to 0.40 on coding
    const gptCoding = entries.find((e) => e.model === "gpt-4o" && e.category === "coding");
    assert.ok(gptCoding);
    assert.strictEqual(gptCoding.score, 0.4);

    // Sonnet debugging from agentic_index
    const sonnetDebug = entries.find(
      (e) => e.model === "claude-4.6-sonnet" && e.category === "debugging"
    );
    assert.ok(sonnetDebug);
    assert.strictEqual(sonnetDebug.score, 0.98);

    // Canonical alias claude-sonnet-4-6 should also be present
    const canonicalCoding = entries.find(
      (e) => e.model === "claude-sonnet-4-6" && e.category === "coding"
    );
    assert.ok(canonicalCoding);
    assert.strictEqual(canonicalCoding.score, 0.98);
  });

  it("uses intelligence_index as fallback when coding_index or agentic_index is null", () => {
    const payload: OpenRouterBenchmarksResponse = {
      data: [
        {
          source: "artificial-analysis",
          model_permaslug: "deepseek/deepseek-chat",
          intelligence_index: 30.0,
          coding_index: null,
          agentic_index: null,
        },
      ],
    };

    const entries = transformOpenRouterBenchmarksToModelIntelligence(payload);
    const codeEntry = entries.find((e) => e.model === "deepseek-chat" && e.category === "coding");
    const debugEntry = entries.find(
      (e) => e.model === "deepseek-chat" && e.category === "debugging"
    );
    const defaultEntry = entries.find(
      (e) => e.model === "deepseek-chat" && e.category === "default"
    );

    assert.ok(codeEntry);
    assert.ok(debugEntry);
    assert.ok(defaultEntry);
    assert.strictEqual(codeEntry.confidence, "medium");
    assert.strictEqual(debugEntry.confidence, "medium");
    assert.strictEqual(defaultEntry.confidence, "high");
    assert.strictEqual(codeEntry.permaslug, "deepseek/deepseek-chat");
    assert.strictEqual(defaultEntry.permaslug, "deepseek/deepseek-chat");
  });

  it("supplements models from Design Arena and OpenRouter sources", () => {
    const payload: OpenRouterBenchmarksResponse = {
      data: [
        {
          source: "design-arena",
          model_permaslug: "meta/llama-3.3-70b",
          category: "codecategories",
          elo: 1350,
          tournament_stats: { total: 3000 },
        },
        {
          source: "openrouter",
          model_permaslug: "google/gemma-3-27b",
          benchmark_type: "gpqa_diamond",
          accuracy: 0.75,
          total_tasks: 250,
        },
      ],
    };

    const entries = transformOpenRouterBenchmarksToModelIntelligence(payload);
    const llamaCode = entries.find((e) => e.model === "llama-3.3-70b" && e.category === "coding");
    assert.ok(llamaCode);
    assert.strictEqual(llamaCode.eloRaw, 1350);
    assert.strictEqual(llamaCode.confidence, "medium");
    assert.strictEqual(llamaCode.metric, "design-arena:elo");
    // Design Arena 0.85 discount: min=max=1350 -> base 0.4 -> 0.4 * 0.85 = 0.34
    assert.strictEqual(llamaCode.score, 0.34);

    const gemmaDefault = entries.find((e) => e.model === "gemma-3-27b" && e.category === "default");
    assert.ok(gemmaDefault);
    // OpenRouter 0.70 discount: single model -> acc 0.75 -> base 0.4 + 0.58 * 0.75 = 0.835 -> 0.835 * 0.7 = 0.5845
    assert.strictEqual(gemmaDefault.score, 0.5845);
    assert.strictEqual(gemmaDefault.confidence, "medium");
    assert.strictEqual(gemmaDefault.eloRaw, 75);
    assert.strictEqual(gemmaDefault.metric, "openrouter:gpqa_diamond");
  });

  it("normalizes benchmarks with (max - min) spread and aggregates multiple benches for a model", () => {
    const payload: OpenRouterBenchmarksResponse = {
      data: [
        {
          source: "openrouter",
          model_permaslug: "deepseek/deepseek-v3",
          benchmark_type: "gpqa_diamond",
          accuracy: 0.8,
          total_tasks: 200,
        },
        {
          source: "openrouter",
          model_permaslug: "meta/llama-3.1-8b",
          benchmark_type: "gpqa_diamond",
          accuracy: 0.4,
          total_tasks: 200,
        },
        {
          source: "openrouter",
          model_permaslug: "deepseek/deepseek-v3",
          benchmark_type: "mmlu",
          accuracy: 90.0, // 0-100 scale test
          total_tasks: 300,
        },
        {
          source: "openrouter",
          model_permaslug: "meta/llama-3.1-8b",
          benchmark_type: "mmlu",
          accuracy: 60.0, // 0-100 scale test
          total_tasks: 300,
        },
      ],
    };

    const entries = transformOpenRouterBenchmarksToModelIntelligence(payload);
    const dsDefault = entries.find((e) => e.model === "deepseek-v3" && e.category === "default");
    assert.ok(dsDefault);
    // For deepseek: on gpqa (0.80 - 0.40)/(0.80 - 0.40) = 1.0; on mmlu (0.90 - 0.60)/(0.90 - 0.60) = 1.0
    // Avg norm = 1.0, baseScore = 0.4 + 0.58 * 1.0 = 0.98. With 0.7 discount: 0.98 * 0.7 = 0.686
    assert.strictEqual(dsDefault.score, 0.686);
    assert.strictEqual(dsDefault.confidence, "medium"); // 200 + 300 = 500 tasks
    assert.strictEqual(dsDefault.eloRaw, 86); // (0.80 * 200 + 0.90 * 300) / 500 = 0.86 -> 86%
    assert.strictEqual(dsDefault.metric, "openrouter:multi-bench");

    const llamaDefault = entries.find(
      (e) => e.model === "llama-3.1-8b" && e.category === "default"
    );
    assert.ok(llamaDefault);
    // For llama: on gpqa 0.0; on mmlu 0.0. Avg norm = 0.0. BaseScore = 0.4. With 0.7 discount: 0.4 * 0.7 = 0.28
    assert.strictEqual(llamaDefault.score, 0.28);
    assert.strictEqual(llamaDefault.eloRaw, 52); // (0.40 * 200 + 0.60 * 300) / 500 = 0.52 -> 52%
    assert.strictEqual(llamaDefault.metric, "openrouter:multi-bench");
  });

  it("never overwrites existing base model row with a different metric in withSynthesizedBaseRows", () => {
    // Artificial Analysis measured gpt-5.2 with intelligence_index
    // Design Arena measured gpt-5.2-high with a higher raw score
    const payload: OpenRouterBenchmarksResponse = {
      data: [
        {
          source: "artificial-analysis",
          model_permaslug: "openai/gpt-5.2",
          intelligence_index: 50.0,
        },
        {
          source: "design-arena",
          model_permaslug: "openai/gpt-5.2-high",
          elo: 1600,
          tournament_stats: { total: 5000 },
        },
      ],
    };

    const entries = transformOpenRouterBenchmarksToModelIntelligence(payload);
    const baseEntry = entries.find((e) => e.model === "gpt-5.2" && e.category === "default");
    assert.ok(baseEntry);
    // Base entry must keep Artificial Analysis metric, not be overwritten by Design Arena ELO
    assert.strictEqual(baseEntry.metric, "artificial-analysis:intelligence");
    assert.strictEqual(baseEntry.permaslug, "openai/gpt-5.2");
  });

  it("allows variant overwrite when metrics match and variant score is strictly higher", () => {
    const payload: OpenRouterBenchmarksResponse = {
      data: [
        {
          source: "design-arena",
          model_permaslug: "openai/gpt-5.2",
          elo: 1200,
          tournament_stats: { total: 2000 },
        },
        {
          source: "design-arena",
          model_permaslug: "openai/gpt-5.2-high",
          elo: 1500,
          tournament_stats: { total: 5000 },
        },
      ],
    };

    const entries = transformOpenRouterBenchmarksToModelIntelligence(payload);
    const baseEntry = entries.find((e) => e.model === "gpt-5.2" && e.category === "default");
    assert.ok(baseEntry);
    // Metrics match (both design-arena:elo), higher variant score wins
    assert.strictEqual(baseEntry.metric, "design-arena:elo");
    assert.strictEqual(baseEntry.eloRaw, 1500);
  });
});

// ═══════════════════════════════════════════════════════════
// 5. syncArenaElo() with OpenRouter integration
// ═══════════════════════════════════════════════════════════

describe("syncArenaElo() with OpenRouter integration", () => {
  it("uses OpenRouter when API key is configured and updates model_intelligence DB", async () => {
    process.env.OPENROUTER_API_KEY = "sk-or-valid-test-key";

    let openRouterCalled = false;
    let arenaWulongCalled = false;

    mockFetch(async (url: string) => {
      if (url.includes("openrouter.ai")) {
        openRouterCalled = true;
        return jsonResponse({
          data: [
            {
              source: "artificial-analysis",
              model_permaslug: "openai/gpt-4o",
              intelligence_index: 30.0,
              coding_index: 45.0,
            },
          ],
        });
      }
      if (url.includes("api.wulong.dev")) {
        arenaWulongCalled = true;
        return jsonResponse({ meta: { leaderboard: "text", model_count: 0 }, models: [] });
      }
      return new Response("Not found", { status: 404 });
    });

    const res = await syncArenaElo();
    assert.strictEqual(res.success, true);
    assert.ok(openRouterCalled, "OpenRouter API should be called");
    assert.strictEqual(
      arenaWulongCalled,
      false,
      "Wulong endpoint should not be called on OpenRouter success"
    );

    const status = getArenaEloSyncStatus();
    assert.ok(status.sources.includes("openrouter"));
    assert.ok(status.sources.includes("arena_elo"));

    // Verify DB entries
    const rows = testAdapter
      .prepare("SELECT * FROM model_intelligence WHERE model = 'gpt-4o' AND source = 'arena_elo'")
      .all() as Array<{ category: string; score: number }>;
    assert.ok(rows.length > 0);
    assert.ok(rows.some((r) => r.category === "coding"));
  });

  it("falls back to Arena AI leaderboards if OpenRouter fetch fails", async () => {
    process.env.OPENROUTER_API_KEY = "sk-or-failing-key";

    let openRouterCalled = false;
    let arenaWulongCalled = false;

    mockFetch(async (url: string) => {
      if (url.includes("openrouter.ai")) {
        openRouterCalled = true;
        return new Response("Service Unavailable", { status: 503 });
      }
      if (url.includes("api.wulong.dev")) {
        arenaWulongCalled = true;
        return jsonResponse({
          meta: { leaderboard: "text", model_count: 1 },
          models: [
            {
              rank: 1,
              model: "anthropic/claude-3-5-sonnet",
              vendor: "Anthropic",
              score: 1250,
              ci: 5,
              votes: 2000,
              license: "proprietary",
            },
          ],
        });
      }
      return new Response("Not found", { status: 404 });
    });

    const res = await syncArenaElo();
    assert.strictEqual(res.success, true);
    assert.ok(openRouterCalled, "OpenRouter API should be attempted first");
    assert.ok(arenaWulongCalled, "Arena AI leaderboards should be called as secondary fallback");

    const rows = testAdapter
      .prepare(
        "SELECT * FROM model_intelligence WHERE model = 'claude-3-5-sonnet' AND source = 'arena_elo'"
      )
      .all();
    assert.ok(rows.length > 0);
  });

  it("calls Arena AI leaderboards directly when no OpenRouter API key is configured", async () => {
    let openRouterCalled = false;
    let arenaWulongCalled = false;

    mockFetch(async (url: string) => {
      if (url.includes("openrouter.ai")) {
        openRouterCalled = true;
        return jsonResponse({ data: [] });
      }
      if (url.includes("api.wulong.dev")) {
        arenaWulongCalled = true;
        return jsonResponse({
          meta: { leaderboard: "code", model_count: 1 },
          models: [
            {
              rank: 1,
              model: "deepseek/deepseek-coder",
              vendor: "DeepSeek",
              score: 1300,
              ci: 5,
              votes: 6000,
              license: "open",
            },
          ],
        });
      }
      return new Response("Not found", { status: 404 });
    });

    const res = await syncArenaElo();
    assert.strictEqual(res.success, true);
    assert.strictEqual(openRouterCalled, false);
    assert.strictEqual(arenaWulongCalled, true);
  });
});
