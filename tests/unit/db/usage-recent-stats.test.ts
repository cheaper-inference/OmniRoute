import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-recent-stats-"));
process.env.DATA_DIR = dir;
const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getRecentUsageRows } = await import("../../../src/lib/db/usageRecentStats.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("recent usage includes both window bounds and separates stored cost from priceable tokens", () => {
  const start = "2026-01-01T00:00:00.100Z";
  const end = "2026-01-01T00:00:59.900Z";
  const insert = getDbInstance().prepare(`
    INSERT INTO usage_history
      (provider, model, timestamp, service_tier, tokens_input, tokens_cache_read,
       provider_cost_usd, calculated_cost_usd)
    VALUES ('fixture-provider', 'fixture-model', ?, 'standard', ?, ?, ?, ?)
  `);
  insert.run("2026-01-01T00:00:00.099Z", 1000, 100, null, null);
  insert.run(start, 100, 20, 0.25, 0.5);
  insert.run(end, 50, null, null, null);
  insert.run("2026-01-01T00:00:59.901Z", 1000, 100, null, null);

  const rows = getRecentUsageRows(start, end);
  assert.equal(rows.length, 1);
  assert.partialDeepStrictEqual(rows[0], {
    minute: "2026-01-01T00:00:00.000Z",
    provider: "fixture-provider",
    model: "fixture-model",
    service_tier: "standard",
    request_count: 2,
    tokens_input: 150,
    tokens_cache_read: 20,
    cached_input_unknown_requests: 1,
    cost_tokens_input: 50,
    cost_tokens_cache_read: 0,
    stored_cost: 0.25,
  });
});
