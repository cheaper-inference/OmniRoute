/**
 * #20535 — a failing rerank model is retried (loopback /v1/rerank) on EVERY retrieval:
 * no negative cache / breaker / backoff in applyRerank (src/lib/memory/retrieval.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-repro-20535-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.VECTOR_STORE_DISABLE_VEC;

// fake "OmniRoute" loopback whose /v1/rerank always 404s (like the reporter's NVIDIA model)
let rerankHits = 0;
const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/v1/rerank")) rerankHits++;
  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});
await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
const port = (server.address() as { port: number }).port;
process.env.API_PORT = String(port);

const core = await import("../../src/lib/db/core.ts");
const { getDbInstance, resetDbInstance } = core;
const dbSettings = await import("../../src/lib/db/settings.ts");
const memSettings = await import("../../src/lib/memory/settings.ts");
const embCache = await import("../../src/lib/memory/embedding/cache.ts");
const vs = await import("../../src/lib/memory/vectorStore.ts");
const { resolveEmbeddingSource } = await import("../../src/lib/memory/embedding/index.ts");

test.after(async () => {
  await new Promise((r) => server.close(r));
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#20535: every retrieval re-calls /v1/rerank even after it 404'd (no negative cache)", async (t) => {
  const db = getDbInstance();
  vs._resetVectorStoreSingleton();
  const store = vs.getVectorStore();
  if (!store) return t.skip("sqlite-vec unavailable");

  await dbSettings.updateSettings({
    memoryEnabled: true,
    memoryStrategy: "hybrid",
    memoryStaticEnabled: true,
    memoryEmbeddingSource: "static",
    memoryRerankEnabled: true,
    memoryRerankProviderModel: "nvidia/nvidia/nv-rerankqa-mistral-4b-v3",
  });
  memSettings.invalidateMemorySettingsCache();
  const settings = await memSettings.getMemorySettings();
  const resolution = resolveEmbeddingSource(settings);
  assert.equal(resolution.source, "static");

  const dim = resolution.dimensions as number;
  const vec = new Float32Array(dim).fill(0.1);
  // pre-seed embedding cache so no model download / network is needed
  const query = "what is the capital of france";
  embCache.set(
    embCache.buildCacheKey("static", resolution.identity ?? resolution.model, dim, query),
    vec
  );

  await store.ensureReady(resolution);
  for (let i = 1; i <= 3; i++) {
    db.prepare(
      `INSERT INTO memories (rowid, memory_id, id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at)
       VALUES (?, ?, ?, 'k1', '', 'factual', ?, ?, '{}', datetime('now'), datetime('now'), NULL)`
    ).run(i, i, `m${i}`, `key${i}`, `Paris is the capital of France ${i}`);
    await store.upsertVector(`m${i}`, vec);
  }

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");
  const N = 5;
  for (let i = 0; i < N; i++) {
    const out = await retrieveMemories("k1", {
      retrievalStrategy: "hybrid",
      query,
      maxTokens: 2000,
    });
    assert.ok(out.length > 0, "retrieval itself still succeeds");
  }
  console.log(`rerank loopback hits after ${N} retrievals: ${rerankHits}`);
  // EXPECTED (after fix: failure breaker/cooldown): 1 attempt, then skipped. Current: N.
  assert.equal(
    rerankHits,
    1,
    `rerank must be attempted once then skipped (${rerankHits}/${N} hits)`
  );
});

test("#20535: breaker backs off exponentially, expires, and clears on success", async () => {
  const b = await import("../../src/lib/memory/rerankBreaker.ts");
  b._resetRerankBreaker();
  const t0 = 1_000_000;
  assert.equal(b.isRerankCoolingDown("m", t0), false);
  assert.equal(b.recordRerankFailure("m", t0), 60_000);
  assert.equal(b.isRerankCoolingDown("m", t0 + 59_999), true);
  assert.equal(b.isRerankCoolingDown("m", t0 + 60_000), false, "retry allowed after cooldown");
  assert.equal(b.recordRerankFailure("m", t0 + 60_000), 120_000);
  for (let i = 0; i < 10; i++) b.recordRerankFailure("m", t0);
  assert.equal(b.recordRerankFailure("m", t0), 600_000, "capped at 10 min");
  b.recordRerankSuccess("m");
  assert.equal(b.isRerankCoolingDown("m", t0), false);
});
