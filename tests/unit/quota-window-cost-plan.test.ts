import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-plan-"));
process.env.DATA_DIR = tempDir;
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const db = getDbInstance();

process.on("exit", () => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});

function planOf(sql: string, params: Record<string, unknown> | unknown[]): string {
  return db
    .prepare(`EXPLAIN QUERY PLAN ${sql}`)
    .all(...(Array.isArray(params) ? params : [params]))
    .map((row: { detail?: string }) => String(row.detail ?? ""))
    .join(" ");
}

test("a provider window scan uses the expression index", () => {
  const text = planOf(
    `SELECT COUNT(*) FROM usage_history
     WHERE LOWER(provider) = ? AND timestamp >= ? AND timestamp <= ?`,
    ["openai", "2026-10-22T00:00:00.000Z", "2026-10-29T00:00:00.000Z"]
  );
  assert.match(text, /idx_uh_provider_timestamp/);
});

const FILTER =
  "LOWER(provider) = @provider AND timestamp >= @since AND timestamp <= @nowIso AND COALESCE(success, 1) = 1";

test("the three quota cost queries use the expression index", () => {
  const params = {
    provider: "openai",
    since: "2026-10-22T00:00:00.000Z",
    nowIso: "2026-10-29T00:00:00.000Z",
    apiKeyId: "key-1",
  };
  const queries = [
    `SELECT COUNT(*) FROM usage_history WHERE ${FILTER} GROUP BY LOWER(model)`,
    `SELECT COUNT(*) FROM usage_history WHERE ${FILTER} GROUP BY COALESCE(NULLIF(api_key_id, ''), '')`,
    `SELECT id FROM usage_history WHERE ${FILTER} AND api_key_id = @apiKeyId ORDER BY timestamp ASC, id ASC`,
  ];
  for (const sql of queries) {
    assert.match(planOf(sql, params), /idx_uh_provider_timestamp/);
  }
});

test("the daily rollup range scan stays on its own index", async () => {
  const { PRICE_RANGE_FROM } = await import("../../src/lib/usage/aggregateHistory.ts");
  const text = planOf(
    `SELECT * ${PRICE_RANGE_FROM}`,
    ["2026-10-29T00:00:00.000Z", "2026-10-22T00:00:00.000Z", "2026-10-22T00:00:00.000Z"]
  );
  assert.match(text, /idx_uh_provider_model_timestamp/);
  assert.doesNotMatch(text, /idx_uh_provider_timestamp/);
});
