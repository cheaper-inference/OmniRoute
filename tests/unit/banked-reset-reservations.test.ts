/**
 * "Auto-apply banked resets" — in-process slot reservations.
 *
 * The caps are counted from audit rows that are only written once a claim / redemption
 * settles. A reservation taken synchronously with the decision closes that gap, for the
 * request-path Claude gate and the background job alike: reservations count like success
 * rows until released, and expire on their own after 10 minutes.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-banked-reset-slots-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const audit = await import("../../src/lib/usage/bankedResetAudit.ts");
const job = await import("../../src/lib/services/bankedResetAutoApply.ts");
const { createClaudeSessionResetPolicy } =
  await import("../../src/lib/usage/claudeSessionResetPolicy.ts");

test.beforeEach(() => audit._resetBankedResetReservations());
test.after(() => fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }));

const NOW = Date.parse("2026-11-07T12:00:00.000Z");
const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const iso = (ms: number) => new Date(ms).toISOString();

type Row = { action: string; target: string; status: string; timestamp: string };
type Entry = { action: string; target?: string; status?: string; details?: unknown };

function windowAt(usedPercentage: number, resetAt: number) {
  return {
    usedPercentage,
    remainingPercentage: 100 - usedPercentage,
    resetAt: iso(resetAt),
    reachedThreshold: usedPercentage >= 99,
  };
}

const WALLED = {
  session: windowAt(100, NOW + 3 * HOUR_MS),
  weekly: windowAt(40, NOW + 72 * HOUR_MS),
};

function liveSlots(connectionId = "conn-a", now = NOW) {
  return audit.summarizeBankedResetHistory([], { connectionId, mode: "eager", now });
}

/** A shared world: one audit log, both paths read and write it. */
function createWorld(feature: Record<string, unknown>) {
  const rows: Row[] = [];
  const entries: Entry[] = [];
  const sinks = {
    logAuditEvent: (entry: Entry) => {
      entries.push(entry);
      rows.push({
        action: entry.action,
        target: entry.target ?? "",
        status: entry.status ?? "",
        timestamp: iso(NOW),
      });
    },
    notifyWebhookEvent: () => undefined,
  };
  const windows: Record<string, typeof WALLED> = {
    "conn-a": WALLED,
    "conn-b": WALLED,
    "conn-c": WALLED,
  };
  const getQuotaWindowStatus = (id: string, window: "session" | "weekly") =>
    windows[id]?.[window] ?? null;
  const gate = createClaudeSessionResetPolicy({
    getSettings: async () => ({ bankedResetAutoApply: feature }),
    getProviderConnections: async () => [
      { id: "conn-b", provider: "claude", authType: "oauth" },
      { id: "conn-c", provider: "claude", authType: "oauth" },
    ],
    getQuotaWindowStatus,
    readAuditRows: () => rows,
    sinks,
  });
  const redeemed: { id: string; key: string }[] = [];
  const deps = {
    getSettings: async () => ({ bankedResetAutoApply: feature }),
    getProviderConnections: async (filter: Record<string, unknown>) =>
      filter.provider === "codex"
        ? [{ id: "conn-a", provider: "codex", authType: "oauth", isActive: true }]
        : [],
    getQuotaWindowStatus,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    throttleQuotaFetch: async () => undefined,
    listCredits: async () => ({
      availableCount: 1,
      credits: [{ selectionToken: "credit-a", expiresAt: iso(NOW + 48 * HOUR_MS) }],
    }),
    redeemCredit: async (_provider: string, id: string, key: string) => {
      redeemed.push({ id, key });
      return { outcome: "reset" };
    },
    readAuditRows: () => rows,
    sinks,
  };
  const state = job.createBankedResetAutoApplyState();
  const tick = (now = NOW) => job.runBankedResetAutoApplyTick(deps, state, () => now);
  const wall = (connectionId: string, now = NOW) =>
    gate({ connectionId, sessionResetAt: iso(NOW + 3 * HOUR_MS), now });
  return { rows, entries, deps, state, tick, wall, redeemed };
}

const SESSION_RESET_ON = {
  enabled: true,
  mode: "eager",
  creditTypes: { claudeSessionReset: true },
  minSpacingMinutes: 0,
};

test("a live reservation counts like a success row; release removes it", () => {
  const token = audit.reserveBankedResetSlot({ connectionId: "conn-a", now: NOW - 5 * MINUTE_MS });
  assert.deepEqual(liveSlots("conn-a"), {
    accountRedemptions24h: 1,
    poolRedemptions24h: 1,
    lastRedemptionAt: iso(NOW - 5 * MINUTE_MS),
  });
  // Another account sees it in the pool count and the spacing, not in its own count.
  assert.deepEqual(liveSlots("conn-b"), {
    accountRedemptions24h: 0,
    poolRedemptions24h: 1,
    lastRedemptionAt: iso(NOW - 5 * MINUTE_MS),
  });
  // Also in dry-run mode: a pending real redemption is a redemption.
  assert.equal(
    audit.summarizeBankedResetHistory([], { connectionId: "conn-a", mode: "dry-run", now: NOW })
      .accountRedemptions24h,
    1
  );

  audit.releaseBankedResetSlot(token);
  audit.releaseBankedResetSlot(token);
  assert.deepEqual(liveSlots("conn-a"), {
    accountRedemptions24h: 0,
    poolRedemptions24h: 0,
    lastRedemptionAt: null,
  });
});

test("a reservation never released expires after 10 minutes", () => {
  audit.reserveBankedResetSlot({ connectionId: "conn-a", now: NOW });
  assert.equal(liveSlots("conn-a", NOW + 10 * MINUTE_MS - 1).accountRedemptions24h, 1);
  assert.deepEqual(liveSlots("conn-a", NOW + 10 * MINUTE_MS), {
    accountRedemptions24h: 0,
    poolRedemptions24h: 0,
    lastRedemptionAt: null,
  });
});

test("gate: two concurrent walls on different accounts with maxPerDay=1 → exactly one claim", async () => {
  const w = createWorld({ ...SESSION_RESET_ON, maxPerDay: 1 });
  const verdicts = await Promise.all([w.wall("conn-b"), w.wall("conn-c")]);
  assert.deepEqual(
    verdicts.map((v) => v?.allow),
    [true, false]
  );

  // The claim settles: one row is written and the reservation is released.
  verdicts[0]?.onSettled?.({ reset: true, outcome: "reset", nextAvailableAt: null });
  assert.equal(w.entries.length, 1);
  assert.equal(w.entries[0].status, "success");
  assert.equal(liveSlots("conn-b").poolRedemptions24h, 0);
});

test("gate: an allowed claim that never settles stops counting after 10 minutes", async () => {
  const w = createWorld({ ...SESSION_RESET_ON, maxPerDay: 1 });
  assert.equal((await w.wall("conn-b"))?.allow, true);
  assert.equal((await w.wall("conn-c", NOW + 9 * MINUTE_MS))?.allow, false);
  assert.equal((await w.wall("conn-c", NOW + 10 * MINUTE_MS))?.allow, true);
});

test("job: a gate claim taken while the job is listing blocks its redemption within minSpacing", async () => {
  const w = createWorld({ ...SESSION_RESET_ON, maxPerDay: 5, minSpacingMinutes: 30 });
  let verdict: Awaited<ReturnType<typeof w.wall>> = null;
  const list = w.deps.listCredits;
  w.deps.listCredits = async () => {
    verdict = await w.wall("conn-b");
    return list();
  };
  await w.tick();
  assert.equal(verdict?.allow, true, "the gate claimed first");
  assert.equal(w.redeemed.length, 0, "the job re-checked the caps before redeeming");
  assert.equal(w.entries.length, 0, "a skip is not audited");

  // After the claim settles, its success row keeps the spacing.
  verdict?.onSettled?.({ reset: true, outcome: "reset", nextAvailableAt: null });
  await w.tick(NOW + 5 * MINUTE_MS);
  assert.equal(w.redeemed.length, 0);
});

test("job: holds a reservation during the redemption and releases it after a failure", async () => {
  const w = createWorld({ enabled: true, mode: "eager", minSpacingMinutes: 0 });
  const during: number[] = [];
  w.deps.redeemCredit = async (_provider: string, id: string, key: string) => {
    during.push(liveSlots("conn-a").accountRedemptions24h);
    w.redeemed.push({ id, key });
    throw Object.assign(new Error("HTTP 502"), { code: "codex_reset_credit_upstream_error" });
  };
  await w.tick();
  assert.deepEqual(during, [1], "reserved before the redemption call");
  assert.equal(w.entries.length, 1);
  assert.equal(w.entries[0].status, "failed");
  assert.equal(liveSlots("conn-a").poolRedemptions24h, 0, "released after the failure");
});

test("job: releases its reservation after a successful redemption", async () => {
  const w = createWorld({ enabled: true, mode: "eager", minSpacingMinutes: 0 });
  await w.tick();
  assert.equal(w.redeemed.length, 1);
  assert.equal(w.entries[0].status, "success");
  // Only the success row counts now — the reservation is gone.
  assert.equal(liveSlots("conn-a").poolRedemptions24h, 0);
  assert.equal(
    audit.summarizeBankedResetHistory(w.rows, { connectionId: "conn-a", mode: "eager", now: NOW })
      .accountRedemptions24h,
    1
  );
});
