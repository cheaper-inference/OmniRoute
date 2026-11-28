import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-terminal-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a caller with only closed Kimi connections gets provider_unavailable; enabling one selects it", async () => {
  await resetStorage();
  const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const connection = await providersDb.createProviderConnection({
      provider: "kimi-coding",
      name: "fixture-" + i,
      authType: "oauth",
      accessToken: "fixture-" + i,
      priority: i + 1,
      isActive: false,
      testStatus: "active",
    });
    rows.push(connection.id);
  }
  const select = (ids = rows) =>
    auth.getProviderCredentials("kimi-coding", null, ids, "fixture-model");
  async function assertClosed(ids: string[], text: RegExp) {
    const selected = await select(ids);
    assert.ok(selected?.allExpired);
    assert.equal("connectionId" in selected, false);
    const response = handleNoCredentials(
      selected,
      null,
      "kimi-coding",
      "fixture-model",
      null,
      null
    );
    assert.equal(response.status, 503);
    const { error } = await response.json();
    assert.equal(error.code, "provider_unavailable");
    assert.match(error.message, text);
    for (const id of rows) assert.equal(error.message.includes(id), false);
  }
  await assertClosed(rows, /switched off/);
  await providersDb.updateProviderConnection(rows[0], { isActive: true, testStatus: "active" });
  assert.equal((await select())?.connectionId, rows[0]);
  await assertClosed(rows.slice(1), /switched off/);
  for (const id of rows)
    await providersDb.updateProviderConnection(id, { isActive: false, testStatus: "banned" });
  await assertClosed(rows, /health block/);
  await providersDb.updateProviderConnection(rows[0], { isActive: true, testStatus: "banned" });
  await assertClosed(rows, /health block/);
});
