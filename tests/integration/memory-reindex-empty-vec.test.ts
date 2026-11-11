/**
 * POST /api/memory/reindex with force:false (what the dashboard button sends)
 * must build the vector index when memories exist but vec_memories was never
 * created — e.g. memories written before an embedding source was configured.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reindex-empty-vec-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "test-secret-reindex-empty-vec";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { getMemoryVecMeta, countMemoryReindexPending } =
  await import("../../src/lib/db/memoryVec.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");
const memoryStore = await import("../../src/lib/memory/store.ts");
const { POST } = await import("../../src/app/api/memory/reindex/route.ts");

const DIM = 8;
const stub = http.createServer((req, res) => {
  req.resume();
  req.on("end", () => {
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        object: "list",
        model: "stub-embed",
        data: [{ object: "embedding", index: 0, embedding: Array(DIM).fill(0.125) }],
        usage: { prompt_tokens: 1, total_tokens: 1 },
      })
    );
  });
});
await new Promise<void>((resolve) => stub.listen(0, "127.0.0.1", resolve));

test.after(async () => {
  await new Promise((resolve) => stub.close(resolve));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function vecTableExists(): boolean {
  return !!core
    .getDbInstance()
    .prepare("SELECT 1 FROM sqlite_master WHERE name = 'vec_memories'")
    .get();
}

async function until(predicate: () => boolean, ms = 3000): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    if (predicate()) return true;
    await new Promise((r) => setTimeout(r, 25));
  }
  return predicate();
}

test("reindex with force:false indexes memories that have no vector index yet", async () => {
  // Memories saved while no embedding source is configured are never flagged
  // needs_reindex (scheduleVectorUpsert returns early on a null source).
  for (const n of [1, 2, 3]) {
    await memoryStore.createMemory({
      content: `memory number ${n}`,
      key: `k${n}`,
      type: MemoryType.FACTUAL,
      sessionId: "",
      apiKeyId: "api-key-1",
      metadata: {},
      expiresAt: null,
    });
  }
  await new Promise((r) => setImmediate(r));
  assert.equal(countMemoryReindexPending(), 0, "precondition: nothing flagged");
  assert.equal(vecTableExists(), false, "precondition: no vec_memories");

  // Operator then configures a self-hosted endpoint the registry has no width for.
  await updateSettings({
    memoryEmbeddingSource: "remote",
    memoryEmbeddingCustomBaseUrl: `http://127.0.0.1:${(stub.address() as AddressInfo).port}/v1`,
    memoryEmbeddingCustomModelId: "stub-embed",
  });
  invalidateMemorySettingsCache();

  const res = await POST(
    await makeManagementSessionRequest("http://localhost/api/memory/reindex", {
      method: "POST",
      body: { force: false },
    })
  );
  assert.equal(res.status, 200);

  assert.ok(await until(vecTableExists), "vec_memories must be created by the reindex");
  assert.ok(await until(() => countMemoryReindexPending() === 0));
  assert.equal(getMemoryVecMeta().activeDim, DIM);
  const rows = core.getDbInstance().prepare("SELECT COUNT(*) AS c FROM vec_memories").get() as {
    c: number;
  };
  assert.equal(rows.c, 3);
});
