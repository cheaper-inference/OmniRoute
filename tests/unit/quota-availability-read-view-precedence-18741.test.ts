// #18741 — buildConnectionQuotaAvailability seeds the scoped read view from the fresh
// provider-limits usage BEFORE consulting SQLite snapshots. Pins the precedence (fresh usage
// wins over a stale snapshot, and the snapshot is not read at all when usage carries quotas)
// plus the unchanged fallback (no usage -> the snapshot still hydrates the decision).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18741-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const availability = await import("../../src/lib/usage/availability.ts");

const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
const future = new Date(Date.now() + 48 * 3600e3).toISOString();

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function saveSnapshot(id: string, remainingPercentage: number, exhausted: boolean) {
  snapshots.saveQuotaSnapshot({
    provider: "codex",
    connection_id: id,
    window_key: "weekly",
    remaining_percentage: remainingPercentage,
    is_exhausted: exhausted ? 1 : 0,
    next_reset_at: future,
    window_duration_ms: 604800000,
    raw_data: "{}",
  });
}

function usageWith(remainingPercentage: number) {
  return {
    fetchedAt: new Date().toISOString(),
    quotas: { weekly: { remainingPercentage, resetAt: future } },
    modelQuotas: {},
  };
}

function accountUsable(id: string, usage: ReturnType<typeof usageWith> | undefined) {
  return availability.buildConnectionQuotaAvailability(
    { id, provider: "codex", isActive: true },
    usage,
    policy
  ).account.usable;
}

test("fresh provider-limits usage wins over a stale exhausted snapshot", () => {
  saveSnapshot("conn-a-18741", 0, true);
  assert.equal(accountUsable("conn-a-18741", usageWith(80)), true);
});

test("fresh exhausted usage still blocks over a healthy snapshot", () => {
  saveSnapshot("conn-b-18741", 80, false);
  assert.equal(accountUsable("conn-b-18741", usageWith(0)), false);
});

test("without usage the persisted snapshot still hydrates the decision", () => {
  saveSnapshot("conn-c-18741", 0, true);
  assert.equal(accountUsable("conn-c-18741", undefined), false);
});

test("no usage and no snapshot stays unknown, not exhausted", () => {
  assert.notEqual(accountUsable("conn-d-18741", undefined), false);
});
