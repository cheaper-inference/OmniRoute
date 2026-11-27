import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18059-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-18059-secret";

const core = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const cap = await import("../../src/domain/claudeExtraUsageCap.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.beforeEach(() => cap.__resetClaudeExtraUsageCapForTests());

const R = new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString();
const CAP_SPENT = {
  is_enabled: true,
  monthly_limit: 5000,
  used_credits: 5000,
  utilization: 100,
  decimal_places: 2,
};
const PLAN_EXHAUSTED = {
  five_hour: { utilization: 100, resets_at: R },
  seven_day: { utilization: 100, resets_at: R },
};
const PLAN_ROOM = {
  five_hour: { utilization: 10, resets_at: R },
  seven_day: { utilization: 20, resets_at: R },
};
const OPT_IN = { blockExtraUsage: false };

function load(id: string, payload: Record<string, unknown>, extraUsage: unknown) {
  const usage = { ...normalizeClaudeUsageQuotas(payload), extraUsage };
  quotaCache.setQuotaCache(
    id,
    "claude",
    usage.quotas as Record<string, unknown>,
    usage.modelQuotas as Record<string, unknown>
  );
  cap.recordClaudeExtraUsageCap(id, "claude", usage);
}

test("opt-in, plan windows exhausted AND monthly cap spent -> excluded pre-dispatch", () => {
  load("c-gap", PLAN_EXHAUSTED, CAP_SPENT);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("c-gap", "claude", "claude-opus-4-5", OPT_IN),
    true
  );
});

test("opt-in, plan windows exhausted, cap has room -> stays eligible", () => {
  load("c-room", PLAN_EXHAUSTED, { ...CAP_SPENT, used_credits: 1000, utilization: 20 });
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("c-room", "claude", "claude-opus-4-5", OPT_IN),
    false
  );
});

test("opt-in, plan has room + cap spent -> stays eligible (never block on the cap alone)", () => {
  load("c-plan-room", PLAN_ROOM, CAP_SPENT);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("c-plan-room", "claude", "claude-opus-4-5", OPT_IN),
    false
  );
});

test("default policy keeps excluding exhausted plan windows (unchanged)", () => {
  load("c-ctrl", PLAN_EXHAUSTED, CAP_SPENT);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("c-ctrl", "claude", "claude-opus-4-5", {}),
    true
  );
});

test("a fresh reading with cap room clears the spent state", () => {
  load("c-clear", PLAN_EXHAUSTED, CAP_SPENT);
  load("c-clear", PLAN_EXHAUSTED, { ...CAP_SPENT, used_credits: 0, utilization: 0 });
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("c-clear", "claude", "claude-opus-4-5", OPT_IN),
    false
  );
});

test("spent cap is ignored after the billing month rolls over", () => {
  const now = Date.UTC(2026, 10, 19);
  cap.recordClaudeExtraUsageCap("c-roll", "claude", { extraUsage: CAP_SPENT }, now);
  assert.equal(cap.isClaudeExtraUsageCapKnownSpent("c-roll", now + 1000), true);
  assert.equal(cap.isClaudeExtraUsageCapKnownSpent("c-roll", Date.UTC(2026, 11, 1)), false);
});

test("cap detection: disabled extra usage or missing fields is not spent", () => {
  assert.equal(cap.isClaudeExtraUsageCapSpent({ ...CAP_SPENT, is_enabled: false }), false);
  assert.equal(cap.isClaudeExtraUsageCapSpent(undefined), false);
  assert.equal(cap.isClaudeExtraUsageCapSpent({ is_enabled: true, utilization: 100 }), true);
});
