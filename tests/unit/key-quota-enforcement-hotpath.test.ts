import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-hotpath-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const quotaDb = await import("../../src/lib/db/keyQuota.ts");
const quotaDomain = await import("../../src/domain/keyQuota.ts");
const ledger = await import("../../src/lib/db/costLedger.ts");

const nowMs = Date.parse("2026-09-14T12:00:30.000Z");
const clock = { now: () => nowMs };

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function seedUsage() {
  quotaDomain.recordKeyQuotaUsage("key-1", 900, clock);
  quotaDomain.recordKeyQuotaUsage("key-1", 100, clock);
  ledger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 5,
    success: true,
    timestamp: "2026-09-14T12:00:00.000Z",
  });
}

function traceReads<T>(read: () => T) {
  const spy = test.mock.method(core.getDbInstance(), "prepare");
  try {
    const result = read();
    return { result, sql: spy.mock.calls.map((call) => String(call.arguments[0])) };
  } finally {
    spy.mock.restore();
  }
}

function assertReads(sql: string[], counterReads: number, ledgerReads: number) {
  assert.equal(sql.filter((query) => query.includes("FROM api_key_quota_limits")).length, 1);
  assert.equal(
    sql.filter((query) => query.includes("FROM api_key_quota_counters")).length,
    counterReads
  );
  assert.equal(
    sql.filter((query) => query.includes("FROM request_cost_ledger")).length,
    ledgerReads
  );
  assert.equal(sql.length, 1 + counterReads + ledgerReads);
}

for (const config of [undefined, null, 0, -1]) {
  test(`unlimited quota (${config}): reads limits only despite recorded usage`, () => {
    seedUsage();
    if (config !== undefined) {
      quotaDb.upsertKeyQuotaLimits("key-1", {
        tpmLimit: config,
        rpmLimit: config,
        monthlyAmountUsd: config,
      });
    }
    const { result, sql } = traceReads(() => quotaDomain.checkKeyQuota("key-1", clock));
    assert.equal(result.allowed, true);
    assert.equal(result.status?.enabled, false);
    assertReads(sql, 0, 0);
  });
}

for (const dimension of ["tpm", "rpm", "monthly"] as const) {
  test(`${dimension}-only quota: reads and enforces only the configured dimension`, () => {
    seedUsage();
    quotaDb.upsertKeyQuotaLimits("key-1", {
      ...(dimension === "tpm" ? { tpmLimit: 1000 } : {}),
      ...(dimension === "rpm" ? { rpmLimit: 2 } : {}),
      ...(dimension === "monthly" ? { monthlyAmountUsd: 5 } : {}),
    });
    const { result, sql } = traceReads(() => quotaDomain.checkKeyQuota("key-1", clock));
    assert.equal(result.allowed, false);
    assert.equal(result.dimension, dimension);
    assertReads(sql, dimension === "monthly" ? 0 : 2, dimension === "monthly" ? 1 : 0);
  });
}

test("minute quotas: skip the ledger and preserve sliding-window weighting", () => {
  quotaDb.upsertKeyQuotaLimits("key-1", { tpmLimit: 750, rpmLimit: 1.5 });
  quotaDomain.recordKeyQuotaUsage("key-1", 1000, { now: () => nowMs - 60_000 });
  quotaDomain.recordKeyQuotaUsage("key-1", 250, clock);
  const { result, sql } = traceReads(() => quotaDomain.checkKeyQuota("key-1", clock));
  assert.equal(result.status?.counters.tpmUsed, 750);
  assert.equal(result.status?.counters.rpmUsed, 1.5);
  assert.equal(result.dimension, "tpm");
  assertReads(sql, 4, 0);
});

test("combined quotas: retain threshold precedence and enforce newly configured limits", () => {
  seedUsage();
  quotaDb.upsertKeyQuotaLimits("key-1", { tpmLimit: 1000, rpmLimit: 2, monthlyAmountUsd: 5 });
  const { result, sql } = traceReads(() => quotaDomain.checkKeyQuota("key-1", clock));
  assert.equal(result.dimension, "tpm");
  assert.equal(result.status?.monthlyExceeded, true);
  assertReads(sql, 4, 1);

  quotaDb.upsertKeyQuotaLimits("key-1", { tpmLimit: null });
  assert.equal(quotaDomain.checkKeyQuota("key-1", clock).dimension, "rpm");
  quotaDb.upsertKeyQuotaLimits("key-1", { rpmLimit: null });
  assert.equal(quotaDomain.checkKeyQuota("key-1", clock).dimension, "monthly");
  quotaDb.upsertKeyQuotaLimits("key-1", { monthlyAmountUsd: 6 });
  assert.equal(quotaDomain.checkKeyQuota("key-1", clock).allowed, true);
  quotaDb.clearKeyQuotaLimits("key-1");
  const cleared = traceReads(() => quotaDomain.checkKeyQuota("key-1", clock));
  assert.equal(cleared.result.allowed, true);
  assertReads(cleared.sql, 0, 0);
});

test("monthly quota: an injected zero total skips the ledger but is still enforced", () => {
  seedUsage();
  quotaDb.upsertKeyQuotaLimits("key-1", { monthlyAmountUsd: 5 });
  const allowed = traceReads(() =>
    quotaDomain.checkKeyQuota("key-1", { ...clock, monthTotalUsd: 0 })
  );
  assert.equal(allowed.result.allowed, true);
  assertReads(allowed.sql, 0, 0);
  const blocked = traceReads(() =>
    quotaDomain.checkKeyQuota("key-1", { ...clock, monthTotalUsd: 5 })
  );
  assert.equal(blocked.result.dimension, "monthly");
  assertReads(blocked.sql, 0, 0);
});

test("dashboard status: reports every recorded counter for an unlimited key", () => {
  seedUsage();
  const { result, sql } = traceReads(() => quotaDb.getKeyQuotaStatus("key-1", clock));
  assert.equal(result.enabled, false);
  assert.deepEqual(result.counters, { tpmUsed: 1000, rpmUsed: 2, monthlyAmountUsd: 5 });
  assertReads(sql, 4, 1);
  assert.equal(ledger.listLedgerEntries("key-1").length, 1);
});

test("dashboard status: reports unrestricted usage even with only an RPM limit", () => {
  seedUsage();
  quotaDb.upsertKeyQuotaLimits("key-1", { rpmLimit: 3 });
  const status = quotaDb.getKeyQuotaStatus("key-1", clock);
  assert.deepEqual(status.counters, { tpmUsed: 1000, rpmUsed: 2, monthlyAmountUsd: 5 });
  assert.equal(status.rpmExceeded, false);
});

test("quota status: uses one clock sample for counters and window reset", () => {
  seedUsage();
  quotaDb.upsertKeyQuotaLimits("key-1", { rpmLimit: 2 });
  let clockReads = 0;
  const result = quotaDomain.checkKeyQuota("key-1", {
    now: () => {
      clockReads++;
      return nowMs + (clockReads - 1) * 60_000;
    },
  });
  assert.equal(result.dimension, "rpm");
  assert.equal(result.status?.windowResetAtIso, "2026-09-14T12:01:00.000Z");
  assert.equal(clockReads, 1);
});

test("quota status: another key's recorded usage does not consume this key's limits", () => {
  seedUsage();
  quotaDb.upsertKeyQuotaLimits("key-2", { tpmLimit: 1, rpmLimit: 1, monthlyAmountUsd: 1 });
  const { result, sql } = traceReads(() => quotaDomain.checkKeyQuota("key-2", clock));
  assert.equal(result.allowed, true);
  assert.deepEqual(result.status?.counters, { tpmUsed: 0, rpmUsed: 0, monthlyAmountUsd: 0 });
  assertReads(sql, 4, 1);
});

test("missing API key: performs no database reads", () => {
  const { result, sql } = traceReads(() => quotaDomain.checkKeyQuota(null, clock));
  assert.deepEqual(result, { allowed: true, reason: null, dimension: null });
  assert.deepEqual(sql, []);
});

test("quota storage errors: preserve the request gate's fail-open behavior", () => {
  const spy = test.mock.method(core.getDbInstance(), "prepare", () => {
    throw new Error("quota database unavailable");
  });
  try {
    assert.deepEqual(quotaDomain.checkKeyQuota("key-1", clock), {
      allowed: true,
      reason: null,
      dimension: null,
    });
  } finally {
    spy.mock.restore();
  }
});
