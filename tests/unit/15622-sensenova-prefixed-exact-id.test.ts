import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #15622: `<provider>/<id>` is frozen as an exact model id when ANOTHER provider (xkiro)
// catalogs that verbatim id, and the named provider's static registry lacks the bare id. The
// operator's customModels / synced entries for the named provider were never consulted,
// so the request was misrouted to xkiro (no credentials).
// The fixture is deepseek/deepseek-v3.2 (xkiro lists it, the deepseek registry does not).
// It used to be sensenova/sensenova-6.8-flash-lite, which the sensenova registry now lists.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15622-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "15622-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel } = await import("../../src/lib/db/models.ts");
const { getModelInfoCore, parseModel } = await import("../../open-sse/services/model.ts");

const PROVIDER = "deepseek";
const PREFIXED = "deepseek/deepseek-v3.2";
const BARE = "deepseek-v3.2";

function seedConnection(provider: string, id: string, active = 1) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
         (id, provider, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(id, provider, active, now, now);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#15622 <provider>/<customModel> routes to the named provider when the provider is active and has the id", async () => {
  seedConnection(PROVIDER, "conn-15622");
  await addCustomModel(PROVIDER, BARE, "DeepSeek V3.2");

  const info = await getModelInfoCore(PREFIXED, null);
  assert.equal(info.provider, PROVIDER);
  assert.equal(info.model, BARE);
});

test("#15622 inactive connection keeps the exact-id behaviour", async () => {
  seedConnection(PROVIDER, "conn-15622", 0);
  await addCustomModel(PROVIDER, BARE, "DeepSeek V3.2");

  const info = await getModelInfoCore(PREFIXED, null);
  assert.notEqual(info.provider, PROVIDER);
});

test("#15622 prefix whose provider has no such model anywhere stays an exact id", async () => {
  seedConnection(PROVIDER, "conn-15622");

  const info = await getModelInfoCore(PREFIXED, null);
  assert.notEqual(info.provider, PROVIDER);
});

test("sensenova/sensenova-6.8-flash-lite resolves to sensenova from its static registry", () => {
  const parsed = parseModel("sensenova/sensenova-6.8-flash-lite");
  assert.equal(parsed.provider, "sensenova");
  assert.equal(parsed.model, "sensenova-6.8-flash-lite");
});
