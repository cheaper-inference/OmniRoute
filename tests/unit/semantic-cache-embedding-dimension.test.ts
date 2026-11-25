// Regression coverage for the semantic-cache embedding-dimension split brain:
// the settings API reported the stored dimension while the runtime resolved the environment
// override first, so the dashboard could show 1024 for a runtime using 768. The dimension was
// also read-only in the UI and never compared against the live embedding probe.
//
// Contract enforced here:
//   1. Dimension precedence is env → stored setting → settings-model default, reported by the
//      API together with its source.
//   2. An environment override is reported, never written back into the database.
//   3. A probe whose vector length disagrees with the configured dimension is surfaced
//      (`dimensionMismatch`), and the configured value is kept.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-semcache-dimension-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const DIMENSION_ENV = "OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_DIMENSION";
delete process.env[DIMENSION_ENV];

const core = await import("../../src/lib/db/core.ts");
const {
  DEFAULT_SEMANTIC_CACHE_CONFIG,
  checkEmbeddingDimension,
  resolveSemanticCacheConfig,
  resolveSemanticCacheEmbeddingDimension,
} = await import("../../open-sse/config/semanticCacheConfig.ts");
const { ensureSemanticCacheDbBridge } =
  await import("../../src/lib/cache/semanticCacheDbBridge.ts");
const { getPersistedCacheSetting, updateDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { DEFAULT_DATABASE_SETTINGS } = await import("../../src/types/databaseSettings.ts");

const SETTINGS_DEFAULT_DIMENSION = DEFAULT_DATABASE_SETTINGS.cache.semanticCacheEmbeddingDimension;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function withDimensionEnv<T>(
  value: string | undefined,
  run: () => Promise<T> | T
): Promise<T> {
  const previous = process.env[DIMENSION_ENV];
  if (value === undefined) delete process.env[DIMENSION_ENV];
  else process.env[DIMENSION_ENV] = value;
  try {
    return await run();
  } finally {
    if (previous === undefined) delete process.env[DIMENSION_ENV];
    else process.env[DIMENSION_ENV] = previous;
  }
}

function makeJsonRequest(method: string, body?: unknown): Request {
  return new Request("http://localhost/api/settings/cache-config", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
  delete process.env[DIMENSION_ENV];
});

test("dimension resolution is env-first and names the winning layer", async () => {
  assert.deepEqual(resolveSemanticCacheEmbeddingDimension(undefined), {
    dimension: DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingDimension,
    source: "default",
  });
  assert.deepEqual(resolveSemanticCacheEmbeddingDimension(1024), {
    dimension: 1024,
    source: "db",
  });

  await withDimensionEnv("768", () => {
    // The environment layer wins even though a stored value exists.
    assert.deepEqual(resolveSemanticCacheEmbeddingDimension(1024), {
      dimension: 768,
      source: "env",
    });
  });

  // A broken override keeps the historical 1536 fallback instead of silently deferring to the
  // stored value.
  await withDimensionEnv("not-a-number", () => {
    assert.deepEqual(resolveSemanticCacheEmbeddingDimension(1024), {
      dimension: DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingDimension,
      source: "default",
    });
  });
  await withDimensionEnv("0", () => {
    assert.deepEqual(resolveSemanticCacheEmbeddingDimension(1024), {
      dimension: DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingDimension,
      source: "default",
    });
  });
});

test("the runtime config uses the environment override over the stored dimension", async () => {
  ensureSemanticCacheDbBridge();
  updateDatabaseSettings({ cache: { semanticCacheEmbeddingDimension: 1024 } });

  assert.equal(resolveSemanticCacheConfig().embeddingDimension, 1024);

  await withDimensionEnv("768", () => {
    assert.equal(
      resolveSemanticCacheConfig().embeddingDimension,
      768,
      "OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_DIMENSION must win over the database value"
    );
    assert.equal(getPersistedCacheSetting("semanticCacheEmbeddingDimension"), 1024);
  });
});

test("a live probe dimension is surfaced as a mismatch without overwriting the setting", () => {
  assert.deepEqual(checkEmbeddingDimension(768, 1024), {
    configured: 1024,
    source: "db",
    detected: 768,
    mismatch: true,
  });
  assert.deepEqual(checkEmbeddingDimension(1024, 1024), {
    configured: 1024,
    source: "db",
    detected: 1024,
    mismatch: false,
  });
  assert.equal(checkEmbeddingDimension(undefined, 1024).mismatch, false);
});

test("cache-config reports the effective dimension and its source", async (t) => {
  const cacheConfigRoute = await import("../../src/app/api/settings/cache-config/route.ts");

  await t.test("fresh settings report the settings-model default as source=default", async () => {
    const response = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.semanticCacheEmbeddingDimension, SETTINGS_DEFAULT_DIMENSION);
    assert.equal(body.semanticCacheEmbeddingDimensionSource, "default");
    assert.equal(body.semanticCacheEmbeddingDimensionConfigured, null);
  });

  await t.test("PUT 768 then GET reports effective 768 with source=db", async () => {
    const putResponse = await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { semanticCacheEmbeddingDimension: 768 }) as never
    );
    assert.equal(putResponse.status, 200);

    const response = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const body = await response.json();

    assert.equal(body.semanticCacheEmbeddingDimension, 768);
    assert.equal(body.semanticCacheEmbeddingDimensionSource, "db");
    assert.equal(body.semanticCacheEmbeddingDimensionConfigured, 768);
    assert.equal(getPersistedCacheSetting("semanticCacheEmbeddingDimension"), 768);
  });

  await t.test("an env override reports 768 while the stored 1024 stays untouched", async () => {
    updateDatabaseSettings({ cache: { semanticCacheEmbeddingDimension: 1024 } });

    await withDimensionEnv("768", async () => {
      const response = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
      const body = await response.json();

      assert.equal(body.semanticCacheEmbeddingDimension, 768);
      assert.equal(body.semanticCacheEmbeddingDimensionSource, "env");
      assert.equal(body.semanticCacheEmbeddingDimensionConfigured, 1024);
    });

    // Reading the effective value must never persist the environment value.
    assert.equal(
      getPersistedCacheSetting("semanticCacheEmbeddingDimension"),
      1024,
      "the env override must not leak into the database"
    );
  });

  await t.test("PUT null clears the persisted dimension back to default", async () => {
    await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { semanticCacheEmbeddingDimension: 768 }) as never
    );
    assert.equal(getPersistedCacheSetting("semanticCacheEmbeddingDimension"), 768);

    const clearResponse = await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { semanticCacheEmbeddingDimension: null }) as never
    );
    assert.equal(clearResponse.status, 200);
    assert.equal(getPersistedCacheSetting("semanticCacheEmbeddingDimension"), undefined);

    const response = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const body = await response.json();
    assert.equal(body.semanticCacheEmbeddingDimensionSource, "default");
    assert.equal(body.semanticCacheEmbeddingDimensionConfigured, null);
  });

  await t.test("PUT rejects dimensions that cannot be a vector length", async () => {
    for (const invalid of [512.5, 0, -7, 65_537]) {
      const response = await cacheConfigRoute.PUT(
        makeJsonRequest("PUT", { semanticCacheEmbeddingDimension: invalid }) as never
      );
      assert.equal(response.status, 400, `${invalid} must be rejected`);
    }
  });
});
