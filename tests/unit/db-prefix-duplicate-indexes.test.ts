import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prefix-indexes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

// Each index below is a leftmost prefix of a wider index that stays in the schema, so it only
// adds write cost: idx_uh_provider ⊂ idx_uh_provider_model_timestamp, idx_uh_timestamp ⊂ idx_uh_dedup,
// idx_call_logs_request_type ⊂ idx_cl_request_provider.
const REDUNDANT = ["idx_uh_provider", "idx_uh_timestamp", "idx_call_logs_request_type"];
const KEPT = ["idx_uh_provider_model_timestamp", "idx_uh_dedup", "idx_cl_request_provider"];

function indexNames(): Set<string> {
  const rows = core
    .getDbInstance()
    .prepare("SELECT name FROM sqlite_master WHERE type = 'index'")
    .all() as Array<{ name: string }>;
  return new Set(rows.map((row) => row.name));
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a fresh database has no prefix-duplicate index and keeps the wider ones", () => {
  const names = indexNames();
  for (const name of REDUNDANT) assert.equal(names.has(name), false, `${name} must not exist`);
  for (const name of KEPT) assert.ok(names.has(name), `${name} must stay`);
});

test("an upgraded database loses the prefix-duplicate indexes at boot", () => {
  const db = core.getDbInstance();
  db.exec("CREATE INDEX idx_uh_timestamp ON usage_history(timestamp)");
  db.exec("CREATE INDEX idx_uh_provider ON usage_history(provider)");
  db.exec("CREATE INDEX idx_call_logs_request_type ON call_logs(request_type)");
  core.resetDbInstance();

  const names = indexNames();
  for (const name of REDUNDANT) assert.equal(names.has(name), false, `${name} survived boot`);
  for (const name of KEPT) assert.ok(names.has(name), `${name} must stay`);
});

test("the queries the dropped indexes served still use an index", () => {
  const db = core.getDbInstance();
  const plan = (sql: string) =>
    (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all() as Array<{ detail: string }>)
      .map((row) => row.detail)
      .join(" | ");
  for (const sql of [
    "SELECT COUNT(*) FROM usage_history WHERE timestamp >= '2026-01-01'",
    "SELECT * FROM usage_history WHERE timestamp >= '2026-01-01' ORDER BY timestamp ASC LIMIT 10",
    "SELECT COUNT(*) FROM usage_history WHERE provider = 'openai'",
    "SELECT provider FROM call_logs WHERE request_type = 'search' GROUP BY provider",
  ]) {
    const detail = plan(sql);
    assert.ok(/USING (COVERING )?INDEX/.test(detail), `${sql} -> ${detail}`);
    assert.ok(!/SCAN (usage_history|call_logs)\b(?! USING)/.test(detail), `${sql} -> ${detail}`);
  }
});
