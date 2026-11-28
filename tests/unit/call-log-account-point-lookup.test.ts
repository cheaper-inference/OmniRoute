import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-account-lookup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a call-log write resolves the account label without touching the cached connection list", async () => {
  let target = "";
  for (let i = 0; i < 30; i++) {
    const created = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: `account-${i}`,
      apiKey: `key-${i}`,
    });
    if (i === 29) target = created.id;
  }

  // Warm the 5 s raw-row cache, then count how often a row's id is read. The old path wrapped
  // every cached row in a new proxy and scanned them with .find(); the point lookup reads none.
  const rows = (await readCache.getCachedRawProviderConnections({})) as Array<
    Record<string, unknown>
  >;
  assert.equal(rows.length, 30);
  let idReads = 0;
  for (const row of rows) {
    const id = row.id;
    Object.defineProperty(row, "id", {
      configurable: true,
      enumerable: true,
      get() {
        idReads += 1;
        return id;
      },
    });
  }

  await callLogs.saveCallLog({
    id: "log-account-point-lookup",
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "gpt-4.1",
    provider: "openai",
    connectionId: target,
    duration: 5,
  });

  const row = core
    .getDbInstance()
    .prepare("SELECT account FROM call_logs WHERE id = ?")
    .get("log-account-point-lookup") as { account?: string } | undefined;
  assert.equal(row?.account, "account-29");
  assert.equal(idReads, 0, "label lookup must not scan the cached connection list");
});
