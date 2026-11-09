/**
 * `expiry-first` with `expiryFirstOrder: "deadline"`, and lapsed resets.
 *
 * The Claude pool behind this, measured 2026-11-06/07: a Team account whose week
 * resets on Friday 12:00 UTC and a Max account whose week resets on Wednesday
 * 11:00 UTC. While the quota reads were stale (the usage endpoint answered 429
 * for days), Team's last read still carried the Friday reset of the PREVIOUS
 * week. A reset in the past scored as "expires now", so the stale Team account
 * looked like the most urgent one and took most of the traffic, although its
 * real deadline was a week away and Max's was two days away.
 *
 * `deadline` order is the strict rule the operator asked for: spend the account
 * whose quota is lost first, for as long as it has quota.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectExpiryFirstConnection } from "@/sse/services/expiryFirstAccountSelection";
import {
  resolveExpiryFirstConfig,
  resolveExpiryFirstDeadline,
  scoreExpiryFirstQuota,
} from "@omniroute/open-sse/services/combo/quotaScoring.ts";
import { updateSettingsSchema } from "@/shared/validation/settingsSchemas";

const HOUR = 60 * 60 * 1000;
const NOW = Date.UTC(2026, 10, 9, 17, 0);

type Account = { id: string; priority: number; lastUsedAt?: string | null };
type WindowReading = [remainingPercent: number, resetInHours: number | null];

function claudeView(session: WindowReading, weekly: WindowReading, now: number = NOW) {
  const reading = ([remaining, resetIn]: WindowReading) => ({
    percentUsed: 1 - remaining / 100,
    resetAt: resetIn === null ? null : new Date(now + resetIn * HOUR).toISOString(),
  });
  return { windows: { "session (5h)": reading(session), "weekly (7d)": reading(weekly) } };
}

const pool: Account[] = [
  { id: "team", priority: 1 },
  { id: "max", priority: 2 },
];
const DEADLINE = { expiryFirstOrder: "deadline" };

function pick(
  views: Record<string, Record<string, unknown> | null>,
  settings: Record<string, unknown> | null = DEADLINE,
  accounts: Account[] = pool,
  now: number = NOW
) {
  return selectExpiryFirstConnection(accounts, settings, (id) => views[id] ?? null, now)?.id;
}

describe("expiry-first lapsed resets (stale quota reads)", () => {
  it("does not treat a weekly reset that already passed as expiring now", () => {
    // 2026-11-07 shape: Team's stale read carries last Friday's reset (31h ago, 65% used);
    // Max is fresh, 54% left, resetting in 42h.
    const views = {
      team: claudeView([20, -27], [35, -31]),
      max: claudeView([97, 2], [54, 42]),
    };
    assert.equal(pick(views, null), "max", "rate order");
    assert.equal(pick(views), "max", "deadline order");
  });

  it("rolls a lapsed weekly reset forward by one week and treats the window as refilled", () => {
    const config = resolveExpiryFirstConfig(DEADLINE);
    const deadline = resolveExpiryFirstDeadline(claudeView([100, -1], [10, -31]), config, NOW);
    assert.ok(deadline);
    assert.equal(deadline.usable, 1, "the stale 10% must not cap a refilled week");
    assert.equal(deadline.msUntilDeadline, (168 - 31) * HOUR);
  });

  it("keeps the rate score of a lapsed weekly window bounded by the next reset", () => {
    const config = resolveExpiryFirstConfig(null);
    const { score } = scoreExpiryFirstQuota(claudeView([100, -1], [10, -31]), config, NOW);
    // refilled (1.0) over the rolled-forward 137h, not 0.10 / 0.25h
    assert.ok(Math.abs(score - 1 / 137) < 1e-9, `${score}`);
  });
});

describe("expiry-first deadline order", () => {
  it("spends the account that resets first even when the other holds more per hour", () => {
    // Rate order: Team 25%/48h = 0.0052/h < Max 100%/160h = 0.0063/h -> Max.
    // Deadline order: Team's quota is lost in 48h, Max's in 160h -> Team.
    const views = {
      team: claudeView([90, 3], [25, 48]),
      max: claudeView([100, 4], [100, 160]),
    };
    assert.equal(pick(views, null), "max", "rate order");
    assert.equal(pick(views), "team", "deadline order");
  });

  it("skips the nearest-deadline account while its 5h session is spent", () => {
    const views = {
      team: claudeView([0, 2], [60, 40]),
      max: claudeView([80, 3], [50, 100]),
    };
    assert.equal(pick(views), "max");
  });

  it("skips an exhausted weekly window", () => {
    const views = {
      team: claudeView([100, 2], [0, 10]),
      max: claudeView([80, 3], [50, 100]),
    };
    assert.equal(pick(views), "max");
  });

  it("rotates least-recently-used between deadlines within the tie window", () => {
    const accounts: Account[] = [
      { id: "team", priority: 1, lastUsedAt: new Date(NOW - 1000).toISOString() },
      { id: "max", priority: 2, lastUsedAt: new Date(NOW - 60_000).toISOString() },
    ];
    const views = {
      team: claudeView([90, 3], [40, 50]),
      max: claudeView([90, 3], [40, 50.5]),
    };
    assert.equal(pick(views, DEADLINE, accounts), "max");
    assert.equal(
      pick(views, { ...DEADLINE, expiryFirstDeadlineTieMinutes: 0 }, accounts),
      "team",
      "without a tie window the nearer deadline wins"
    );
  });

  it("falls back to the rate order when no account reports a reset", () => {
    const views = {
      team: claudeView([30, null], [30, null]),
      max: claudeView([90, null], [90, null]),
    };
    assert.equal(pick(views), "max");
  });

  it("falls back to the pool order when no account reports quota", () => {
    assert.equal(pick({}), "team");
  });
});

describe("expiry-first order setting", () => {
  it("defaults to rate and accepts only known values", () => {
    assert.equal(resolveExpiryFirstConfig(null).order, "rate");
    assert.equal(resolveExpiryFirstConfig({ expiryFirstOrder: "bogus" }).order, "rate");
    assert.equal(resolveExpiryFirstConfig(DEADLINE).order, "deadline");
    assert.equal(resolveExpiryFirstConfig(null).deadlineTieMs, HOUR);
    assert.equal(
      resolveExpiryFirstConfig({ expiryFirstDeadlineTieMinutes: 99_999 }).deadlineTieMs,
      24 * HOUR
    );
  });

  it("is accepted per provider in the settings schema", () => {
    const ok = updateSettingsSchema.safeParse({
      providerStrategies: {
        claude: {
          fallbackStrategy: "expiry-first",
          expiryFirstOrder: "deadline",
          expiryFirstDeadlineTieMinutes: 30,
        },
      },
    });
    assert.equal(ok.success, true);
    assert.equal(
      ok.success && ok.data.providerStrategies?.claude?.expiryFirstOrder,
      "deadline",
      "the key must survive parsing"
    );
    const bad = updateSettingsSchema.safeParse({
      providerStrategies: { claude: { expiryFirstOrder: "latest" } },
    });
    assert.equal(bad.success, false);
  });
});
