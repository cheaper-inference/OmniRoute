/**
 * Auto-apply banked resets — the pure policy (src/lib/usage/bankedResetPolicy.ts).
 *
 * Table-driven: every rule, the "first failing check is the reason" order, and the
 * fail-closed handling of unknown data (only the last-resort pool rule treats unknown
 * as "no headroom"). No I/O — time is passed in.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  decideBankedReset,
  isBankedResetAccountInScope,
  mergeBankedResetAutoApplySettings,
  type BankedResetPolicyInput,
} from "../../src/lib/usage/bankedResetPolicy.ts";
import { createBankedResetAutoApplyDefaults } from "../../src/shared/constants/bankedResetAutoApply.ts";

const NOW = Date.parse("2026-11-07T12:00:00.000Z");
const MIN = 60_000;
const HOUR = 60 * MIN;
const iso = (ms: number) => new Date(ms).toISOString();

type Overrides = {
  settings?: Record<string, unknown>;
  account?: Partial<BankedResetPolicyInput["account"]>;
  pool?: BankedResetPolicyInput["pool"];
  history?: Partial<BankedResetPolicyInput["history"]>;
  now?: number;
};

/** Baseline: enabled, eager, walled 5-hour window resetting in 3 h, weekly half used. */
function input(o: Overrides = {}): BankedResetPolicyInput {
  return {
    settings: mergeBankedResetAutoApplySettings({ enabled: true, mode: "eager", ...o.settings }),
    now: o.now ?? NOW,
    account: {
      id: "conn-a",
      provider: "codex",
      creditType: "codexCredits",
      walled: "session",
      session: { usedPercentage: 100, resetAt: iso(NOW + 3 * HOUR) },
      weekly: { usedPercentage: 50, resetAt: iso(NOW + 72 * HOUR) },
      creditExpiresAt: null,
      ...o.account,
    },
    pool: o.pool ?? [],
    history: {
      accountRedemptions24h: 0,
      poolRedemptions24h: 0,
      lastRedemptionAt: null,
      ...o.history,
    },
  };
}

const notWalled = { walled: null, session: { usedPercentage: 80, resetAt: iso(NOW + HOUR) } };
const roomy = [{ id: "conn-b", sessionRemainingPercent: 50, weeklyRemainingPercent: 50 }];

const cases: Array<[string, Overrides, string, string]> = [
  // 1. feature / credit type / scope
  ["feature disabled", { settings: { enabled: false } }, "skip", "disabled"],
  [
    "credit type off",
    { settings: { creditTypes: { codexCredits: false } } },
    "skip",
    "credit-type-off",
  ],
  [
    "scope all, account toggled off",
    { settings: { connections: { "conn-a": false } } },
    "skip",
    "out-of-scope",
  ],
  [
    "scope selected, account not listed",
    { settings: { accountScope: "selected" } },
    "skip",
    "out-of-scope",
  ],
  [
    "scope selected, account listed",
    { settings: { accountScope: "selected", connections: { "conn-a": true } } },
    "redeem",
    "walled-session",
  ],
  // 2. schedule
  [
    "outside the UTC schedule",
    { settings: { schedule: { enabled: true, startHourUtc: 0, endHourUtc: 6 } } },
    "skip",
    "outside-schedule",
  ],
  [
    "end hour is exclusive",
    { settings: { schedule: { enabled: true, startHourUtc: 6, endHourUtc: 12 } } },
    "skip",
    "outside-schedule",
  ],
  [
    "inside the UTC schedule",
    { settings: { schedule: { enabled: true, startHourUtc: 12, endHourUtc: 13 } } },
    "redeem",
    "walled-session",
  ],
  [
    "schedule crossing midnight",
    { settings: { schedule: { enabled: true, startHourUtc: 22, endHourUtc: 13 } } },
    "redeem",
    "walled-session",
  ],
  [
    "disabled schedule is ignored",
    { settings: { schedule: { enabled: false, startHourUtc: 0, endHourUtc: 1 } } },
    "redeem",
    "walled-session",
  ],
  // 3. caps
  ["account daily cap", { history: { accountRedemptions24h: 1 } }, "skip", "account-daily-cap"],
  [
    "pool daily cap",
    { settings: { maxPerAccountPerDay: 5 }, history: { poolRedemptions24h: 3 } },
    "skip",
    "pool-daily-cap",
  ],
  ["min spacing", { history: { lastRedemptionAt: iso(NOW - 29 * MIN) } }, "skip", "min-spacing"],
  [
    "spacing elapsed",
    { history: { lastRedemptionAt: iso(NOW - 30 * MIN) } },
    "redeem",
    "walled-session",
  ],
  // 4. trigger
  ["no wall, no credit expiry", { account: notWalled }, "skip", "not-walled"],
  [
    "no wall, credit expiring and account busy enough",
    { account: { ...notWalled, creditExpiresAt: iso(NOW + 23 * HOUR) } },
    "redeem",
    "expiring-credit",
  ],
  [
    "no wall, credit expiring but account mostly idle",
    {
      account: {
        walled: null,
        session: { usedPercentage: 10, resetAt: null },
        weekly: { usedPercentage: 40, resetAt: null },
        creditExpiresAt: iso(NOW + HOUR),
      },
    },
    "skip",
    "not-walled",
  ],
  [
    "no wall, credit expiring, usage unknown",
    { account: { walled: null, session: null, weekly: null, creditExpiresAt: iso(NOW + HOUR) } },
    "skip",
    "not-walled",
  ],
  [
    "no wall, credit expires after the horizon",
    { account: { ...notWalled, creditExpiresAt: iso(NOW + 25 * HOUR) } },
    "skip",
    "not-walled",
  ],
  [
    "no wall, credit already expired",
    { account: { ...notWalled, creditExpiresAt: iso(NOW - MIN) } },
    "skip",
    "not-walled",
  ],
  // 5. natural-reset guard
  [
    "session resets naturally soon",
    { account: { session: { usedPercentage: 100, resetAt: iso(NOW + 90 * MIN) } } },
    "skip",
    "session-resets-soon",
  ],
  [
    "session reset time unknown",
    { account: { session: { usedPercentage: 100, resetAt: null } } },
    "skip",
    "session-reset-unknown",
  ],
  [
    "weekly resets naturally soon",
    {
      account: { walled: "weekly", weekly: { usedPercentage: 100, resetAt: iso(NOW + 12 * HOUR) } },
    },
    "skip",
    "weekly-resets-soon",
  ],
  [
    "weekly reset time unknown",
    { account: { walled: "weekly", weekly: { usedPercentage: 100, resetAt: null } } },
    "skip",
    "weekly-reset-unknown",
  ],
  [
    "weekly wall far from reset",
    {
      account: { walled: "weekly", weekly: { usedPercentage: 100, resetAt: iso(NOW + 13 * HOUR) } },
    },
    "redeem",
    "walled-weekly",
  ],
  // 6. weekly floor (5-hour walls only)
  [
    "weekly remaining below floor",
    { account: { weekly: { usedPercentage: 91, resetAt: null } } },
    "skip",
    "weekly-floor",
  ],
  [
    "weekly remaining at floor",
    { account: { weekly: { usedPercentage: 90, resetAt: null } } },
    "redeem",
    "walled-session",
  ],
  ["weekly usage unknown", { account: { weekly: null } }, "skip", "weekly-unknown"],
  // 7. last-resort pool rule
  [
    "last-resort with a roomy sibling",
    { settings: { mode: "last-resort" }, pool: roomy },
    "skip",
    "pool-has-headroom",
  ],
  [
    "last-resort, sibling below headroom in one window",
    {
      settings: { mode: "last-resort" },
      pool: [{ id: "conn-b", sessionRemainingPercent: 50, weeklyRemainingPercent: 9 }],
    },
    "redeem",
    "walled-session",
  ],
  [
    "last-resort, sibling with unknown windows counts as no headroom",
    {
      settings: { mode: "last-resort" },
      pool: [{ id: "conn-b", sessionRemainingPercent: 50, weeklyRemainingPercent: null }],
    },
    "redeem",
    "walled-session",
  ],
  [
    "last-resort, the account itself is not its own headroom",
    {
      settings: { mode: "last-resort" },
      pool: [{ id: "conn-a", sessionRemainingPercent: 50, weeklyRemainingPercent: 50 }],
    },
    "redeem",
    "walled-session",
  ],
  [
    "last-resort, expiring credit bypasses the pool rule",
    {
      settings: { mode: "last-resort" },
      pool: roomy,
      account: { ...notWalled, creditExpiresAt: iso(NOW + HOUR) },
    },
    "redeem",
    "expiring-credit",
  ],
  ["eager ignores pool headroom", { pool: roomy }, "redeem", "walled-session"],
  // 8. mode
  ["dry-run mode", { settings: { mode: "dry-run" } }, "dry-run", "walled-session"],
  // Order: the first failing check wins.
  [
    "disabled beats every later check",
    { settings: { enabled: false }, history: { accountRedemptions24h: 9 }, account: notWalled },
    "skip",
    "disabled",
  ],
  [
    "schedule beats caps",
    {
      settings: { schedule: { enabled: true, startHourUtc: 0, endHourUtc: 1 } },
      history: { accountRedemptions24h: 9 },
    },
    "skip",
    "outside-schedule",
  ],
  [
    "caps beat the trigger",
    { history: { poolRedemptions24h: 3, accountRedemptions24h: 0 }, account: notWalled },
    "skip",
    "pool-daily-cap",
  ],
  [
    "trigger beats the guards",
    { account: { ...notWalled, weekly: { usedPercentage: 99, resetAt: null } } },
    "skip",
    "not-walled",
  ],
  [
    "natural-reset guard beats the weekly floor",
    {
      account: {
        session: { usedPercentage: 100, resetAt: iso(NOW + MIN) },
        weekly: { usedPercentage: 99, resetAt: null },
      },
    },
    "skip",
    "session-resets-soon",
  ],
  [
    "weekly floor beats the pool rule",
    {
      settings: { mode: "last-resort" },
      pool: roomy,
      account: { weekly: { usedPercentage: 99, resetAt: null } },
    },
    "skip",
    "weekly-floor",
  ],
];

for (const [name, overrides, action, reason] of cases) {
  test(`decideBankedReset: ${name} → ${action} (${reason})`, () => {
    const decision = decideBankedReset(input(overrides));
    assert.equal(decision.action, action);
    assert.equal(decision.reason, reason);
  });
}

test("decideBankedReset: non-skip decisions carry their trigger", () => {
  assert.deepEqual(decideBankedReset(input()), {
    action: "redeem",
    reason: "walled-session",
    trigger: "walled-session",
  });
  assert.equal(decideBankedReset(input({ settings: { enabled: false } })).trigger, undefined);
});

test("isBankedResetAccountInScope: all = everyone except false, selected = only true", () => {
  const all = mergeBankedResetAutoApplySettings({ connections: { off: false, on: true } });
  assert.equal(isBankedResetAccountInScope(all, "unlisted"), true);
  assert.equal(isBankedResetAccountInScope(all, "off"), false);
  const selected = mergeBankedResetAutoApplySettings({
    accountScope: "selected",
    connections: { off: false, on: true },
  });
  assert.equal(isBankedResetAccountInScope(selected, "unlisted"), false);
  assert.equal(isBankedResetAccountInScope(selected, "on"), true);
});

test("mergeBankedResetAutoApplySettings: absent → defaults (off, dry-run)", () => {
  const merged = mergeBankedResetAutoApplySettings(undefined);
  assert.deepEqual(merged, createBankedResetAutoApplyDefaults());
  assert.equal(merged.enabled, false);
  assert.equal(merged.mode, "dry-run");
  assert.deepEqual(merged.creditTypes, {
    codexCredits: true,
    claudeCredits: true,
    claudeSessionReset: false,
  });
});

test("mergeBankedResetAutoApplySettings: partial objects keep defaults for missing fields", () => {
  const merged = mergeBankedResetAutoApplySettings({
    enabled: true,
    creditTypes: { claudeSessionReset: true },
    schedule: { enabled: true },
    maxPerDay: 7,
  });
  assert.equal(merged.enabled, true);
  assert.equal(merged.mode, "dry-run");
  assert.equal(merged.maxPerDay, 7);
  assert.equal(merged.maxPerAccountPerDay, 1);
  assert.deepEqual(merged.creditTypes, {
    codexCredits: true,
    claudeCredits: true,
    claudeSessionReset: true,
  });
  assert.deepEqual(merged.schedule, { enabled: true, startHourUtc: 0, endHourUtc: 24 });
});

test("mergeBankedResetAutoApplySettings: an invalid stored value falls back to defaults (off)", () => {
  const merged = mergeBankedResetAutoApplySettings({ enabled: true, weeklyFloorPercent: 500 });
  assert.deepEqual(merged, createBankedResetAutoApplyDefaults());
  assert.deepEqual(
    mergeBankedResetAutoApplySettings("garbage"),
    createBankedResetAutoApplyDefaults()
  );
});

test("createBankedResetAutoApplyDefaults returns a fresh object each call", () => {
  const a = createBankedResetAutoApplyDefaults();
  a.connections.x = true;
  a.creditTypes.codexCredits = false;
  const b = createBankedResetAutoApplyDefaults();
  assert.deepEqual(b.connections, {});
  assert.equal(b.creditTypes.codexCredits, true);
});
