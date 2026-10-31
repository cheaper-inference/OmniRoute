/**
 * Monthly USD key quota accounting for usage that cannot be priced.
 *
 * The per-key monthly amount quota sums `request_cost_ledger`, which only ever
 * receives a positive priced amount. A completed metered call to a model with no
 * pricing row (and no provider-reported cost) therefore never reached the quota,
 * so a key with a monthly cap could keep spending on that model all month. The
 * quota now fails closed for the rest of the calendar month, the policy the
 * dollar budget (#17162) and the usage limit (#12341) already apply, with the
 * same USAGE_LIMIT_IGNORE_UNPRICED opt-out.
 *
 * End-to-end proof through the real chat pipeline:
 * tests/integration/key-quota-monthly-unpriced-fail-closed.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-unpriced-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-unpriced-test-secret";

const core = await import("../../src/lib/db/core.ts");
const costRules = await import("../../src/domain/costRules.ts");
const keyQuotaDb = await import("../../src/lib/db/keyQuota.ts");
const keyQuota = await import("../../src/domain/keyQuota.ts");

const KEY = "key-quota-unpriced";
const CTX = costRules.buildCostCtx(
  "openai",
  "gpt-unpriced",
  { prompt_tokens: 10 },
  "standard",
  null
);
const DAY_MS = 24 * 60 * 60 * 1000;

function giveMonthlyQuota(limitUsd: number | null, extra: Record<string, number | null> = {}) {
  keyQuotaDb.clearKeyQuotaLimits(KEY);
  keyQuotaDb.upsertKeyQuotaLimits(KEY, { monthlyAmountUsd: limitUsd, ...extra });
}

function chargeUnpriced() {
  costRules.recordChatCallCost({ id: KEY }, 0, CTX, true, true);
}

function monthStartMs(nowMs = Date.now()) {
  const now = new Date(nowMs);
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
}

test.beforeEach(() => {
  keyQuotaDb.clearKeyQuotaLimits(KEY);
  costRules.resetCostData();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an unpriced metered charge closes the monthly quota for the rest of the month", () => {
  giveMonthlyQuota(1);
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, true);

  chargeUnpriced();

  const verdict = keyQuota.checkKeyQuota(KEY);
  assert.equal(verdict.allowed, false);
  assert.equal(verdict.dimension, "monthly");
  assert.match(String(verdict.reason), /without a price/i);
  assert.equal(verdict.status?.counters.monthlyAmountUsd, 0, "no fabricated spend is recorded");
});

test("the streaming charge site (recordUnpricedBudgetUsage) closes the monthly quota too", () => {
  giveMonthlyQuota(1);
  costRules.recordUnpricedBudgetUsage(KEY, { provider: "openai", model: "gpt-unpriced" });
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, false);
});

test("a priced charge of $0 (a genuinely free model) leaves the monthly quota open", () => {
  giveMonthlyQuota(1);
  costRules.recordChatCallCost({ id: KEY }, 0, CTX, true, false);
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, true);
});

test("USAGE_LIMIT_IGNORE_UNPRICED=true counts unpriced usage as $0 for the monthly quota", () => {
  const previous = process.env.USAGE_LIMIT_IGNORE_UNPRICED;
  process.env.USAGE_LIMIT_IGNORE_UNPRICED = "true";
  try {
    giveMonthlyQuota(1);
    chargeUnpriced();
    assert.equal(keyQuota.checkKeyQuota(KEY).allowed, true);
  } finally {
    if (previous === undefined) delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;
    else process.env.USAGE_LIMIT_IGNORE_UNPRICED = previous;
  }
});

test("a key without a monthly cap is not affected (rpm-only quota, no quota at all)", () => {
  chargeUnpriced();
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, true);
  assert.equal(keyQuota.loadUnpricedQuotaMonthStart(KEY), null, "nothing is stored");

  giveMonthlyQuota(null, { rpmLimit: 1000 });
  chargeUnpriced();
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, true);
});

test("the closure is stored with its month, so a restart keeps it and a new month clears it", () => {
  giveMonthlyQuota(1);
  chargeUnpriced();
  assert.equal(keyQuota.loadUnpricedQuotaMonthStart(KEY), monthStartMs());

  const nextMonth = monthStartMs() + 32 * DAY_MS;
  assert.equal(keyQuota.checkKeyQuota(KEY, { now: () => nextMonth }).allowed, true);
});

test("saving the quota again reopens it, and clearing the quota forgets the closure", () => {
  giveMonthlyQuota(1);
  chargeUnpriced();
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, false);

  keyQuotaDb.upsertKeyQuotaLimits(KEY, { monthlyAmountUsd: 1 });
  assert.equal(keyQuota.checkKeyQuota(KEY).allowed, true);

  chargeUnpriced();
  keyQuotaDb.clearKeyQuotaLimits(KEY);
  assert.equal(keyQuota.loadUnpricedQuotaMonthStart(KEY), null);
});

test("priced spend over the cap still reports the spend, not the unpriced reason", () => {
  giveMonthlyQuota(1);
  chargeUnpriced();
  const verdict = keyQuota.checkKeyQuota(KEY, { monthTotalUsd: 5 });
  assert.equal(verdict.allowed, false);
  assert.match(String(verdict.reason), /quota exceeded/i);
});
