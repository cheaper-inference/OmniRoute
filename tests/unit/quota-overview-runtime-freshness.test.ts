import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFixtureHealthAccount as buildHealthAccount } from "./quota-overview-projection-fixtures.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import { runtimeCooldownEvidence } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/runtimeCooldown.ts";

const now = Date.parse("2099-01-01T00:00:00Z");
const iso = (delta: number) => new Date(now + delta).toISOString();
const connection = { id: "synthetic", provider: "claude", isActive: true };
const data = { quotas: [{ name: "weekly", remainingPercentage: 80 }] };
const row = { id: connection.id, status: "healthy", testStatus: "active", lockouts: [] };
const evidence = { observedAt: iso(-2000), cooldown: row };

test("newer connection cooldown overrides an older healthy summary as one complete source", () => {
  const c = {
    ...connection,
    runtimeObservedAt: iso(-1000),
    updatedAt: iso(-3000),
    testStatus: "unavailable",
    rateLimitedUntil: iso(60000),
    lastErrorAt: iso(-60000),
    lastErrorType: "rate_limit",
  };
  const selected = runtimeCooldownEvidence(c, evidence, now);
  assert.equal(selected.runtime, c);
  assert.equal(selected.row, undefined);
  assert.equal(selected.until, now + 60000);
  const account = buildHealthAccount(c, data, {}, now, evidence);
  assert.equal(account.status, "critical");
  assert.equal(account.runtimeObservedAt, c.runtimeObservedAt);
  assert.equal(account.recoverAt, iso(60000));
  assert.equal(account.reasons.find((r) => r.type === "cooldown")?.durationMs, 120000);
  assert.equal(displayAccount(account, now).kind, "cd5");
});

test("newer healthy summary clears the older connection cooldown without merging fields", () => {
  const c = {
    ...connection,
    updatedAt: iso(-3000),
    testStatus: "banned",
    rateLimitedUntil: iso(60000),
    lastErrorAt: iso(-60000),
    lastErrorType: "server_error",
  };
  const account = buildHealthAccount(c, data, {}, now, evidence);
  assert.equal(runtimeCooldownEvidence(c, evidence, now).runtime, row);
  assert.equal(account.status, "ok");
  assert.equal(account.runtimeObservedAt, evidence.observedAt);
  assert.equal(account.recoverAt, undefined);
  assert.equal(displayAccount(account, now).kind, "ok");
});

test("freshness uses the shared timestamp parser, runtimeObservedAt before updatedAt, and summary on ties", () => {
  for (const [runtimeObservedAt, updatedAt, useConnection] of [
    [undefined, iso(-1000), true],
    [undefined, iso(-3000), false],
    [String(now - 1000), iso(-3000), true],
    [iso(-3000), iso(-1000), false],
    [iso(-2000), iso(-1000), false],
    ["invalid", iso(-1000), false],
    [undefined, undefined, false],
  ] as const) {
    const c = { ...connection, runtimeObservedAt, updatedAt };
    const e = { ...evidence, observedAt: `${now - 2000}.0` };
    assert.equal(runtimeCooldownEvidence(c, e, now).runtime, useConnection ? c : row);
  }
});

test("newer connection does not borrow summary connection fields but preserves independent model locks", () => {
  const c = { ...connection, updatedAt: iso(-1000), testStatus: "active" };
  const e = {
    ...evidence,
    cooldown: {
      ...row,
      testStatus: "banned",
      cooldownRemainingMs: 60000,
      lastErrorAt: iso(-60000),
      lastErrorType: "server_error",
      lockouts: [{ model: "synthetic-model", remainingMs: 60000, reason: "429" }],
    },
  };
  const selected = runtimeCooldownEvidence(c, e, now);
  assert.equal(selected.runtime, c);
  assert.equal(selected.until, 0);
  assert.equal(selected.derived, false);
  const account = buildHealthAccount(c, data, {}, now, e);
  assert.equal(account.status, "alert");
  assert.equal(account.runtimeObservedAt, c.updatedAt);
  assert.ok(!account.reasons.some((r) => ["cooldown", "terminal"].includes(r.type)));
  assert.deepEqual(
    account.reasons.filter((r) => r.type === "lockout"),
    [{ type: "lockout", scope: "scoped", window: "synthetic-model", resetAt: iso(58000) }]
  );
});

test("newer banned or expired connection is not hidden by a healthy summary", () => {
  for (const testStatus of ["banned", "expired"]) {
    const c = { ...connection, updatedAt: iso(-1000), testStatus };
    const account = buildHealthAccount(c, data, {}, now, evidence);
    assert.equal(account.status, "critical");
    assert.equal(account.reasons.find((r) => r.type === "terminal")?.terminal, testStatus);
  }
});
