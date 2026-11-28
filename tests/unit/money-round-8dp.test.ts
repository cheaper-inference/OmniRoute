/**
 * Opt-in money rounding (OMNIROUTE_MONEY_ROUND_8DP, default off). Every USD amount is rounded
 * half away from zero to 8 decimals, once, before it reaches the spend history and the cost
 * ledger, so both hold the identical value and their sums reconcile.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-money-8dp-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_MONEY_ROUND_8DP;

const core = await import("../../src/lib/db/core.ts");
const money = await import("../../src/lib/usage/moneyRound.ts");
const ledger = await import("../../src/lib/db/costLedger.ts");
const domainState = await import("../../src/lib/db/domainState.ts");
const usageDb = await import("../../src/lib/usageDb.ts");
const { SpendBatchWriter } = await import("../../src/lib/spend/batchWriter.ts");
const db = () => core.getDbInstance();

const ON = () => (process.env.OMNIROUTE_MONEY_ROUND_8DP = "true");
const ledgerRows = () =>
  (
    db().prepare("SELECT amount_usd FROM request_cost_ledger ORDER BY id").all() as Array<{
      amount_usd: number;
    }>
  ).map((r) => r.amount_usd);
const spendRows = () =>
  (
    db().prepare("SELECT cost FROM domain_cost_history ORDER BY rowid").all() as Array<{
      cost: number;
    }>
  ).map((r) => r.cost);

test.before(async () => {
  await core.ensureDbInitialized();
});
test.beforeEach(() => {
  delete process.env.OMNIROUTE_MONEY_ROUND_8DP;
  db().exec("DELETE FROM request_cost_ledger; DELETE FROM domain_cost_history;");
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("rounds half away from zero to 8 decimals, exactly on ties", () => {
  const cases: Array<[number, number]> = [
    [0.1 + 0.2, 0.3],
    [1 / 3, 0.33333333],
    [2.5e-9, 0],
    [5e-9, 1e-8],
    [1.5e-8, 2e-8],
    [2.5e-8, 3e-8],
    [1.000000015, 1.00000002], // Math.round(x * 1e8) / 1e8 gives 1.00000001 here
    [1.000000125, 1.00000013],
    [123456.123456785, 123456.12345679],
    [4.9999999e-9, 0],
    [1e21, 1e21],
    [12.5, 12.5],
    [0, 0],
  ];
  for (const [input, want] of cases) assert.equal(money.roundMoney8(input), want, String(input));
  assert.equal(money.roundMoney8(-5e-9), -1e-8, "half away from zero, also for a negative");
});

test("a value already at 8 decimals or fewer is returned untouched (same bits)", () => {
  for (const v of [0.00000001, 0.5, 3.14159265, 1234.5])
    assert.ok(Object.is(money.roundMoney8(v), v));
});

test("a non-finite value is passed through for the caller's own guard to reject", () => {
  assert.ok(Number.isNaN(money.roundMoney8(Number.NaN)));
  assert.equal(money.roundMoney8(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
});

test("off by default: the stores keep the raw double", () => {
  ledger.recordLedgerEntry({ apiKeyId: "k", provider: "p", model: "m", amountUsd: 0.1 + 0.2 });
  domainState.saveCostEntry("k", 0.1 + 0.2);
  assert.deepEqual(ledgerRows(), [0.30000000000000004]);
  assert.deepEqual(spendRows(), [0.30000000000000004]);
});

test("on: the ledger and the spend history hold the identical rounded value", () => {
  ON();
  const amounts = [0.1 + 0.2, 1 / 3, 2.5e-9, 1.000000015];
  for (const amount of amounts) {
    ledger.recordLedgerEntry({ apiKeyId: "k", provider: "p", model: "m", amountUsd: amount });
    domainState.saveCostEntry("k", amount);
  }
  assert.deepEqual(ledgerRows(), [0.3, 0.33333333, 0, 1.00000002]);
  assert.deepEqual(spendRows(), ledgerRows());
});

test("on: the batch writers round too, and a sum of many small amounts reconciles", () => {
  ON();
  const many = Array.from({ length: 1000 }, (_, i) => (i + 1) / 7e6); // 1000 repeating decimals
  ledger.recordLedgerEntries(
    many.map((amountUsd) => ({ apiKeyId: "k", provider: "p", model: "m", amountUsd }))
  );
  domainState.batchSaveCostEntries(
    many.map((cost) => ({ apiKeyId: "k", cost, timestamp: Date.now() }))
  );
  const ledgerSum = db().prepare("SELECT SUM(amount_usd) AS s FROM request_cost_ledger").get() as {
    s: number;
  };
  const spendSum = db().prepare("SELECT SUM(cost) AS s FROM domain_cost_history").get() as {
    s: number;
  };
  assert.equal(ledgerSum.s, spendSum.s, "both stores sum to the same number");
  assert.ok(
    ledgerRows().every((v) => money.roundMoney8(v) === v),
    "every stored value is already at 8 decimals"
  );
});

test("on: a negative or non-numeric amount still follows each store's own rule", () => {
  ON();
  ledger.recordLedgerEntry({ apiKeyId: "k", provider: "p", model: "m", amountUsd: -1 });
  ledger.recordLedgerEntry({
    apiKeyId: "k",
    provider: "p",
    model: "m",
    amountUsd: "oops" as never,
  });
  assert.deepEqual(ledgerRows(), [0, 0]);
});

test("on: the usage rows hold the same rounded amount as the ledger", async () => {
  ON();
  const amount = 0.1 + 0.2;
  ledger.recordLedgerEntry({ apiKeyId: "k", provider: "p", model: "m", amountUsd: amount });
  await usageDb.saveRequestUsage({
    provider: "openai",
    model: "gpt-x",
    apiKeyId: "k",
    tokens: { input: 1, output: 1, cost_usd: amount },
    calculatedCostUsd: 1 / 3,
    billingUnitPriceUsd: 2.5e-9,
    status: "200",
    success: true,
    timestamp: new Date().toISOString(),
  });
  await usageDb.flushUsageWrites?.();
  const row = db()
    .prepare(
      "SELECT provider_cost_usd AS p, calculated_cost_usd AS c, billing_unit_price_usd AS u FROM usage_history ORDER BY id DESC LIMIT 1"
    )
    .get() as { p: number; c: number; u: number };
  assert.equal(row.p, ledgerRows()[0], "the provider-reported cost equals the ledger amount");
  assert.equal(row.c, 0.33333333);
  assert.equal(row.u, 0);
});

test("on: the pending total a budget check reads equals what the flush stores", async () => {
  ON();
  const stored: Array<{ cost: number }> = [];
  const writer = new SpendBatchWriter({
    persistEntries: (entries: Array<{ cost: number }>) => {
      stored.push(...entries);
    },
    flushIntervalMs: 60_000,
  });
  for (let i = 1; i <= 200; i += 1) writer.increment("k", i / 7e6);
  const pending = writer.getPendingCostTotal("k");
  await writer.flush();
  await writer.stop();
  assert.equal(stored.length, 200);
  assert.equal(
    pending,
    stored.reduce((sum, e) => sum + e.cost, 0),
    "the in-memory total and the stored rows add up to the same number"
  );
  writer.increment("k", 2.5e-9);
  assert.equal(writer.getPendingCostTotal("k"), 0, "an amount that rounds to zero is dropped");
});

test("off: the buffer keeps the raw amount", () => {
  const writer = new SpendBatchWriter({ persistEntries: () => {}, flushIntervalMs: 60_000 });
  writer.increment("k", 0.1 + 0.2);
  assert.equal(writer.getPendingCostTotal("k"), 0.30000000000000004);
  void writer.stop();
});
