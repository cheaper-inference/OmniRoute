import test from "node:test";
import assert from "node:assert/strict";

import { parseFreebuffUsage } from "../../open-sse/services/usage/freebuff.ts";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";

test("freebuff usage: groups models by pool and keeps fractional weighted usage", () => {
  const reset = "2026-11-11T08:00:00.000Z";
  const { quotas } = parseFreebuffUsage({
    status: "none",
    rateLimitsByModel: {
      "deepseek/deepseek-v4-pro": {
        model: "deepseek/deepseek-v4-pro",
        pool: "premium",
        poolLabel: "Premium",
        limit: 5,
        recentCount: 2.34,
        period: "pacific_day",
        resetAt: reset,
      },
      "openai/gpt-5.6-luna": {
        model: "openai/gpt-5.6-luna",
        pool: "premium",
        poolLabel: "Premium",
        limit: 5,
        recentCount: 2.34,
        period: "pacific_day",
        resetAt: reset,
      },
    },
    freebucks: {
      daily: { limit: 100, spent: 40, remaining: 60, resetAt: reset },
      wallet: { balance: 0 },
    },
  });

  assert.deepEqual(Object.keys(quotas), ["Premium", "Freebucks (daily)"]);
  assert.equal(quotas["Premium"].used, 2.3);
  assert.equal(quotas["Premium"].total, 5);
  assert.equal(quotas["Premium"].resetAt, reset);
  assert.equal(quotas["Freebucks (daily)"].remaining, 60);
});

test("freebuff usage: active session becomes a one-hour quota", () => {
  const parsed = parseFreebuffUsage({
    status: "active",
    model: "deepseek/deepseek-v4-pro",
    remainingMs: 30_000,
    expiresAt: "2026-11-10T20:00:00.000Z",
    freebucks: {
      daily: { limit: 25, spent: 5, remaining: 20, resetAt: "2026-11-11T08:00:00.000Z" },
    },
  });
  assert.equal(parsed.quotas["Current session"].used, 60 * 60 * 1000 - 30_000);
  assert.equal(parsed.quotas["Current session"].total, 60 * 60 * 1000);
  assert.equal(parsed.quotas["Current session"].fractionReported, false);

  // Preflight must enforce Freebucks, never the display-only session countdown.
  const quotaInfo = convertUsageToQuotaInfo(parsed, { provider: "freebuff" });
  assert.ok(quotaInfo);
  assert.equal(quotaInfo!.windows?.["Current session"], undefined);
  assert.ok(quotaInfo!.windows?.["Freebucks (daily)"]);
});

test("freebuff usage: empty payload yields no quotas", () => {
  assert.deepEqual(parseFreebuffUsage({}).quotas, {});
});

test("freebuff usage: models sharing a pool are reported once, at the worst usage", () => {
  // Shape taken from a live GET /api/v1/freebuff/session response: every
  // "limited" row shares the same daily allowance, so summing would double-count.
  const reset = "2026-11-12T08:00:00.000Z";
  const row = (model: string, recentCount: number) => ({
    model,
    pool: "limited",
    poolLabel: "Daily",
    limit: 6,
    recentCount,
    period: "pacific_day",
    resetAt: reset,
    windowHours: 24,
    entitlementBreakdown: { base: 6, referral: 0, streak: 0 },
  });
  const { quotas } = parseFreebuffUsage({
    status: "none",
    rateLimitsByModel: {
      "m-096e75164d": row("m-096e75164d", 0),
      "m-8db1ccbba6": row("m-8db1ccbba6", 1.5),
      "m-69307952f8": row("m-69307952f8", 4),
    },
    freebucks: {
      balance: 10,
      daily: { limit: 25, spent: 15, remaining: 10, resetAt: reset },
      wallet: { balance: 0, monthlyBonus: 0 },
    },
  });

  assert.deepEqual(Object.keys(quotas).sort(), ["Daily", "Freebucks (daily)"]);
  assert.equal(quotas["Daily"].used, 4, "worst usage in the shared pool");
  assert.equal(quotas["Daily"].total, 6);
  assert.equal(quotas["Daily"].remaining, 2);
  assert.match(String(quotas["Daily"].displayName), /2 of 6 sessions left this day/);
  assert.equal(quotas["Freebucks (daily)"].used, 15);
  assert.equal(quotas["Freebucks (daily)"].remaining, 10);
});

test("freebuff usage: freebucks prefers the reported remaining over spent", () => {
  const { quotas } = parseFreebuffUsage({
    freebucks: {
      balance: 5,
      daily: { limit: 25, spent: 99, remaining: 20, resetAt: "2026-11-11T22:00:00.000Z" },
      wallet: { balance: 3 },
    },
  });
  assert.equal(quotas["Freebucks (daily)"].used, 5);
  assert.equal(quotas["Freebucks (daily)"].remaining, 20);
  assert.match(String(quotas["Freebucks (daily)"].displayName), /\+3 wallet/);
});

test("freebuff usage: a phone-verification wall is surfaced as a quota", () => {
  const { quotas } = parseFreebuffUsage({
    status: "spend_limited",
    message: "Verify your phone number (or choose a paid plan) to continue",
    verificationRequired: true,
    verificationKind: "phone",
    resetAt: "2026-11-11T09:04:22.104Z",
  });
  assert.ok(quotas["Verification"]);
  assert.match(String(quotas["Verification"].displayName), /verification required \(phone\)/i);
  assert.equal(quotas["Verification"].remaining, 0);
});

test("freebuff usage: a weekly pool is labelled as a week", () => {
  const { quotas } = parseFreebuffUsage({
    rateLimitsByModel: {
      "m-x": {
        model: "m-x",
        pool: "weekly",
        poolLabel: "Weekly",
        limit: 10,
        recentCount: 3,
        period: "pacific_week",
        resetAt: "2026-11-18T08:00:00.000Z",
      },
    },
  });
  assert.match(String(quotas["Weekly"].displayName), /left this week/);
});
