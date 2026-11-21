import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const state = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cloud-billing-"));
process.env.DATA_DIR = state;
const previousCaches = Object.getOwnPropertyDescriptor(globalThis, "caches");
Object.defineProperty(globalThis, "caches", { value: {}, configurable: true });
const core = await import("../../src/lib/db/core.ts");
const { ensureUsageHistoryColumns } = await import("../../src/lib/db/schemaColumns.ts");
const { getApiKeySpendRows } = await import("../../src/lib/db/apiKeySpend.ts");

test.after(() => {
  core.resetDbInstance();
  if (previousCaches) Object.defineProperty(globalThis, "caches", previousCaches);
  else Reflect.deleteProperty(globalThis, "caches");
  fs.rmSync(state, { recursive: true, force: true });
});

test("cloud bootstrap supports document-cost queries without filesystem migrations", () => {
  assert.equal(core.isCloud, true);
  const db = core.getDbInstance();
  const columns = db.prepare<{ name: string }>("PRAGMA table_info(usage_history)").all();
  for (const name of [
    "endpoint",
    "provider_cost_usd",
    "calculated_cost_usd",
    "billing_unit",
    "billing_quantity",
    "billing_unit_price_usd",
  ]) {
    assert.ok(
      columns.some((column) => column.name === name),
      `missing ${name}`
    );
  }
  ensureUsageHistoryColumns(db);
  ensureUsageHistoryColumns(db);
  const insert = db.prepare(`INSERT INTO usage_history
    (provider, model, api_key_id, tokens_input, success, timestamp,
      provider_cost_usd, calculated_cost_usd, billing_unit)
    VALUES ('mistral', 'document-billing', 'cloud-key', 100, 1, ?, ?, ?, 'page')`);
  const timestamp = new Date().toISOString();
  insert.run(timestamp, 0.123, 0.6);
  insert.run(timestamp, null, 0.02);
  insert.run(timestamp, null, null);
  const rows = getApiKeySpendRows("cloud-key", "1970-01-01T00:00:00.000Z");
  assert.equal(rows.length, 1);
  assert.ok(Math.abs(Number(rows[0].storedCost) - 0.143) < 1e-12);
  assert.equal(rows[0].promptTokens, 100, "stored costs must not also be token-priced");
  assert.equal(rows[0].unpricedUnitRequests, 1);

  db.prepare(
    `INSERT INTO usage_history
    (provider, model, api_key_id, tokens_input, success, timestamp, endpoint, billing_unit)
    VALUES ('cortecs', 'synthetic-reranker', 'cloud-key', 100, 1, ?, '/v1/rerank', ?)`
  ).run(timestamp, "request");
  const rerank = getApiKeySpendRows("cloud-key", "1970-01-01T00:00:00.000Z").find(
    (row) => row.provider === "cortecs"
  );
  assert.equal(rerank?.promptTokens, 0);
  assert.equal(rerank?.unpricedUnitRequests, 1);
  assert.equal(Object.hasOwn(rerank!, "unpricedRerankRequests"), false);
});
