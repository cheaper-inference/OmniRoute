/**
 * GET /v1/embeddings (and the other specialty lists) must not re-filter the whole unified
 * catalog on every poll. A repeat poll over an unchanged catalog reuses the filtered body;
 * a catalog change shows up on the next poll.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-specialty-memo-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CATALOG_BUILD_TIMEOUT_MS ??= "180000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const specialty = await import("../../src/app/api/v1/_shared/specialtyCatalog.ts");

const OPENAI_EMBEDDING = "openai/text-embedding-3-small";

let predicateCalls = 0;
const isEmbedding = (model: Record<string, unknown>) => {
  predicateCalls++;
  return model.type === "embedding";
};

async function poll(): Promise<string[]> {
  const response = await specialty.getSpecialtyModelsResponse(
    new Request("http://localhost/v1/embeddings"),
    "/v1/embeddings",
    isEmbedding
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { object: string; data: Array<{ id: string }> };
  assert.equal(body.object, "list");
  return body.data.map((model) => model.id);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a catalog change is visible on the next poll", async () => {
  const before = await poll();
  assert.ok(predicateCalls > 0, "setup: a cold poll filters the catalog");
  assert.equal(before.includes(OPENAI_EMBEDDING), false, "setup: no connection, no model");

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-conn",
    apiKey: ["test", "key", "value"].join("-"),
    isActive: true,
    testStatus: "active",
  });
  const after = await poll();
  assert.ok(after.includes(OPENAI_EMBEDDING), "the new connection's embedding model is listed");
});

test("a repeat poll over an unchanged catalog does not filter the catalog again", async () => {
  await poll();
  const callsAfterFirstPoll = predicateCalls;
  const first = await poll();
  const second = await poll();

  assert.deepEqual(second, first);
  assert.equal(
    predicateCalls,
    callsAfterFirstPoll,
    "a repeat poll re-ran the filter over the whole catalog"
  );
});
