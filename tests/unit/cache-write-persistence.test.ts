import assert from "node:assert/strict";
import { after, test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cache-write-persistence-"));
process.env.DATA_DIR = dir;
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { saveCallLog, getCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const { buildCacheHealthResponse } = await import("../../src/lib/usage/cacheHealth.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { createPreMigrationBackup } =
  await import("../../src/lib/db/migrationRunner/preMigrationBackup.ts");
const { restoreDbBackup } = await import("../../src/lib/db/backup.ts");
after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("tier usage survives the real log sink and management/cache-health projections", async () => {
  await saveCallLog({
    id: "synthetic-tiers",
    status: 200,
    provider: "anthropic",
    model: "synthetic-model",
    tokens: {
      prompt_tokens: 110,
      completion_tokens: 2,
      cache_creation_input_tokens: 100,
      cache_creation: { ephemeral_5m_input_tokens: 30, ephemeral_1h_input_tokens: 70 },
    },
  });
  const [row] = await getCallLogs({ limit: 1 });
  assert.deepEqual(row.cacheWriteUsage, {
    total: 100,
    fiveMinute: 30,
    oneHour: 70,
    unknown: 0,
    status: "reported",
  });
  const summary = buildCacheHealthResponse({ range: "1h" });
  assert.equal(summary.cacheWrite5mTotal, 30);
  assert.equal(summary.cacheWrite1hTotal, 70);
  assert.equal(summary.cacheWriteUnknownTotal, 0);
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO call_logs (id,timestamp,status,model,tokens_cache_creation) VALUES (?, ?, 200, ?, 50)"
  ).run("synthetic-legacy", new Date().toISOString(), "synthetic-model");
  const legacy = (await getCallLogs({ limit: 10 })).find((r) => r.id === "synthetic-legacy");
  assert.equal(legacy?.cacheWriteUsage.status, "unknown");
  assert.equal(buildCacheHealthResponse({ range: "1h" }).cacheWriteUnknownTotal, 50);
});

test("diagnostic price snapshot and tier metadata survive the existing backup/restore path", async () => {
  await updatePricing({
    anthropic: { "claude-synthetic": { input: 1, output: 2, cache_creation: 1.25 } },
  });
  await saveCallLog({
    id: "synthetic-priced",
    status: 200,
    provider: "anthropic",
    model: "claude-synthetic",
    tokens: {
      prompt_tokens: 110,
      completion_tokens: 2,
      cache_creation_input_tokens: 100,
      cache_creation: { ephemeral_5m_input_tokens: 30, ephemeral_1h_input_tokens: 70 },
    },
  });
  const before = (await getCallLogs({ limit: 10 })).find((row) => row.id === "synthetic-priced");
  assert.ok(before);
  assert.ok(Math.abs(before.cacheWriteEstimate.knownTierCostUsd! - 0.0001775) < 1e-12);
  assert.equal(before.cacheWriteEstimate.pricedTokens, 100);
  const receipt = createPreMigrationBackup(getDbInstance());
  assert.ok(receipt);
  getDbInstance().prepare("DELETE FROM call_logs WHERE id='synthetic-priced'").run();
  await restoreDbBackup(`db_state-${receipt.sha256}_pre-migration.sqlite`);
  const restored = (await getCallLogs({ limit: 10 })).find((row) => row.id === "synthetic-priced");
  assert.deepEqual(restored?.cacheWriteUsage, before.cacheWriteUsage);
  assert.deepEqual(restored?.cacheWriteEstimate, before.cacheWriteEstimate);
});
