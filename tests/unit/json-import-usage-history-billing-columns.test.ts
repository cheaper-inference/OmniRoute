import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-history-import-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");
const { getAllUsageHistory } = await import("../../src/lib/db/usageAnalytics.ts");

type Row = Record<string, unknown>;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertHistory(extra: Row = {}) {
  const row = {
    provider: "openai",
    model: "gpt-4.1",
    connection_id: "conn-1",
    tokens_input: 10,
    tokens_output: 5,
    timestamp: "2026-11-01T10:00:00.000Z",
    endpoint: "/v1/chat/completions",
    cpa_auth_index: "auth-3",
    provider_credits: 1.25,
    provider_cost_usd: 0.0125,
    ...extra,
  };
  const names = Object.keys(row);
  const info = core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history (${names.join(", ")}) VALUES (${names.map((n) => `@${n}`).join(", ")})`
    )
    .run(row) as { lastInsertRowid: number | bigint };
  return Number(info.lastInsertRowid);
}

function stored(id: number): Row {
  return core.getDbInstance().prepare("SELECT * FROM usage_history WHERE id = ?").get(id) as Row;
}

test("a history export restored over a matching row keeps endpoint and provider billing columns", () => {
  const id = insertHistory();
  const exported = getAllUsageHistory().filter((r) => r.id === id);
  assert.equal(exported.length, 1);

  // The live row changes after the export, then the operator restores the backup over it.
  core
    .getDbInstance()
    .prepare("UPDATE usage_history SET endpoint = NULL, provider_cost_usd = 9 WHERE id = ?")
    .run(id);
  runJsonMigration(core.getDbInstance(), { usageHistory: exported });

  const row = stored(id);
  assert.equal(row.endpoint, "/v1/chat/completions");
  assert.equal(row.provider_credits, 1.25);
  assert.equal(row.provider_cost_usd, 0.0125);
  assert.equal(row.cpa_auth_index, "auth-3");
});

test("an import into an empty instance carries the billing columns", () => {
  const id = insertHistory({ timestamp: "2026-11-02T10:00:00.000Z" });
  const exported = getAllUsageHistory().filter((r) => r.id === id);
  core.getDbInstance().prepare("DELETE FROM usage_history WHERE id = ?").run(id);

  runJsonMigration(core.getDbInstance(), { usageHistory: exported });

  const row = stored(id);
  assert.equal(row.endpoint, "/v1/chat/completions");
  assert.equal(row.provider_credits, 1.25);
  assert.equal(row.provider_cost_usd, 0.0125);
});

test("an older backup without the columns does not erase billing data already stored", () => {
  const id = insertHistory({ timestamp: "2026-11-03T10:00:00.000Z" });
  const old = { ...getAllUsageHistory().find((r) => r.id === id)! };
  for (const column of ["endpoint", "cpa_auth_index", "provider_credits", "provider_cost_usd"]) {
    delete old[column];
  }

  runJsonMigration(core.getDbInstance(), { usageHistory: [old] });

  const row = stored(id);
  assert.equal(row.endpoint, "/v1/chat/completions");
  assert.equal(row.provider_credits, 1.25);
  assert.equal(row.provider_cost_usd, 0.0125);
  assert.equal(row.cpa_auth_index, "auth-3");
});

test("an older backup row new to this instance imports with empty billing columns", () => {
  const old = {
    id: 987654,
    provider: "openai",
    model: "gpt-4.1",
    tokens_input: 1,
    timestamp: "2026-11-04T10:00:00.000Z",
  };
  runJsonMigration(core.getDbInstance(), { usageHistory: [old] });

  const row = stored(987654);
  assert.equal(row.endpoint, null);
  assert.equal(row.provider_credits, null);
  assert.equal(row.provider_cost_usd, null);
});
