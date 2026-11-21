import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-limit-prune-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");

const flush = async () => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
};

const DAY = 86_400_000;
const DAY_ONE = Date.UTC(2026, 5, 15, 12, 0, 0);

test.beforeEach(() => {
  mock.timers.enable({ apis: ["Date"], now: DAY_ONE });
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  counter.clearTokenLimitCache();
});

test.afterEach(() => {
  mock.timers.reset();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function dailyLimit(apiKeyId: string, scopeValue: string) {
  return tokenLimits.upsertTokenLimit({
    apiKeyId,
    scopeType: "model",
    scopeValue,
    tokenLimit: 1_000_000,
    resetInterval: "daily",
  });
}

const rows = (sql: string, ...args: unknown[]) =>
  core
    .getDbInstance()
    .prepare(sql)
    .all(...args) as Array<Record<string, unknown>>;

test("a rolled-over window drops the old counter rows of that limit only", async () => {
  const live = dailyLimit("k-prune", "gpt-4o");
  const other = dailyLimit("k-prune", "gpt-4o-mini");

  for (let day = 0; day < 4; day++) {
    mock.timers.setTime(DAY_ONE + day * DAY);
    counter.recordTokenUsage("k-prune", "openai", "gpt-4o", 100);
    await flush();
  }
  // The other limit sees one request on day one only; its single row must survive.
  mock.timers.setTime(DAY_ONE);
  counter.recordTokenUsage("k-prune", "openai", "gpt-4o-mini", 7);
  await flush();
  mock.timers.setTime(DAY_ONE + 3 * DAY);

  const liveRows = rows(
    "SELECT window_start FROM api_key_token_counters WHERE limit_id = ?",
    live.id
  );
  assert.equal(liveRows.length, 1, "only the current window keeps a counter row");
  assert.equal(tokenLimits.getWindowUsage(live, Date.now()), 100);
  assert.equal(
    rows("SELECT window_start FROM api_key_token_counters WHERE limit_id = ?", other.id).length,
    1
  );

  // The audit trail still records every rollover (3 for four days of use).
  assert.equal(
    rows("SELECT id FROM api_key_token_limit_reset_logs WHERE limit_id = ?", live.id).length,
    3
  );
});

test("the reset audit keeps only the newest rows per limit", () => {
  const limit = dailyLimit("k-audit", "gpt-4o");
  const other = dailyLimit("k-audit", "gpt-4o-mini");
  tokenLimits.logTokenLimitReset(other.id, 1, "other-window");
  for (let i = 1; i <= 150; i++) tokenLimits.logTokenLimitReset(limit.id, i, `w${i}`);

  const kept = rows(
    "SELECT prev_tokens FROM api_key_token_limit_reset_logs WHERE limit_id = ? ORDER BY id",
    limit.id
  );
  assert.ok(kept.length <= 100, `kept ${kept.length}`);
  assert.equal(kept.at(-1)?.prev_tokens, 150, "the newest row is kept");
  assert.equal(
    rows("SELECT id FROM api_key_token_limit_reset_logs WHERE limit_id = ?", other.id).length,
    1,
    "another limit's audit rows are untouched"
  );
});
