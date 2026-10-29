// tests/unit/combo-health-unreported-window.test.ts — #10095 follow-up: a window the upstream
// did not report is persisted as remaining_percentage=0 + raw_data {"fractionReported":false}.
// Combo health and combo forecast read "the last snapshot with a percentage" per connection,
// so that placeholder 0 could become the connection's remaining quota.
// Same isolation pattern as combo-health-empty-snapshot.test.ts (real DB, DATA_DIR in tmp).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-combo-health-unreported-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const comboForecast = await import("../../src/lib/usage/comboForecast.ts");
const { buildProviderHealth, buildQuotaHealth } =
  await import("../../src/lib/usage/comboHealth.ts");

async function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// saveQuotaSnapshot stamps created_at with millisecond precision; make the order unambiguous.
const tick = () => new Promise((resolve) => setTimeout(resolve, 5));

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

const REPORTED = {
  provider: "antigravity",
  connection_id: "conn-1",
  window_key: "gemini-3-flash",
  is_exhausted: 0,
  next_reset_at: "2026-01-01T05:00:00.000Z",
  window_duration_ms: 18_000_000,
  raw_data: null,
} as const;

// Exactly what quotaCache.ts persists for a window without a reported fraction.
const UNREPORTED = {
  provider: "antigravity",
  connection_id: "conn-1",
  window_key: "chat_20706",
  remaining_percentage: 0,
  is_exhausted: 0,
  next_reset_at: null,
  window_duration_ms: null,
  raw_data: JSON.stringify({ fractionReported: false }),
} as const;

const SINCE = "1970-01-01T00:00:00.000Z";

test("isUnreportedQuotaSnapshot recognises only the fractionReported:false marker", () => {
  const is = quotaSnapshotsDb.isUnreportedQuotaSnapshot;
  assert.equal(is({ raw_data: '{"fractionReported":false}' } as never), true);
  assert.equal(is({ rawData: '{"fractionReported":false}' } as never), true);
  assert.equal(is({ rawData: { fractionReported: false } } as never), true);
  assert.equal(is({ raw_data: null } as never), false);
  assert.equal(is({ raw_data: "{}" } as never), false);
  assert.equal(is({ raw_data: '{"fractionReported":true}' } as never), false);
  assert.equal(is({ raw_data: "not json" } as never), false);
  assert.equal(is({} as never), false);
});

test("an unreported window written last does not become the provider's remaining quota", async () => {
  quotaSnapshotsDb.saveQuotaSnapshot({ ...REPORTED, remaining_percentage: 69.1 });
  await tick();
  quotaSnapshotsDb.saveQuotaSnapshot(UNREPORTED);

  const q = buildQuotaHealth(["antigravity"], SINCE);
  assert.equal(q.providers[0].remainingPct, 69.1);
  assert.equal(q.worstRemainingPct, 69.1);
  assert.equal(q.providers[0].isExhausted, false);
});

test("an unreported window does not drag the first reading or the trend", async () => {
  quotaSnapshotsDb.saveQuotaSnapshot(UNREPORTED);
  await tick();
  quotaSnapshotsDb.saveQuotaSnapshot({ ...REPORTED, remaining_percentage: 80 });

  const h = buildProviderHealth(
    "antigravity",
    quotaSnapshotsDb.getQuotaSnapshots({ provider: "antigravity", since: SINCE })
  );
  assert.equal(h.remainingPct, 80);
  assert.equal(h.trend, "stable");
});

test("only unreported windows read as unknown (null), never 0%", () => {
  quotaSnapshotsDb.saveQuotaSnapshot(UNREPORTED);
  quotaSnapshotsDb.saveQuotaSnapshot({ ...UNREPORTED, window_key: "chat_23310" });

  const q = buildQuotaHealth(["antigravity"], SINCE);
  assert.equal(q.providers[0].remainingPct, null);
  assert.equal(q.worstRemainingPct, null);
  assert.equal(q.providers[0].isExhausted, false);
});

test("combo forecast ignores an unreported window when projecting a connection's quota", async () => {
  const combo = await combosDb.createCombo({
    name: "combo-forecast-unreported",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "antigravity",
        model: "antigravity/gemini-3-flash",
        connectionId: "conn-1",
        label: "Antigravity",
      },
    ],
  });
  quotaSnapshotsDb.saveQuotaSnapshot({ ...REPORTED, remaining_percentage: 60 });
  await tick();
  quotaSnapshotsDb.saveQuotaSnapshot(UNREPORTED);

  const forecast = await comboForecast.buildComboForecastResponse({
    range: "7d",
    horizon: "7d",
    comboId: String(combo.id),
  });

  const quota = forecast.combos[0].targets[0].quota;
  assert.equal(quota.scope, "connection");
  assert.equal(quota.remainingPct, 60);
});
