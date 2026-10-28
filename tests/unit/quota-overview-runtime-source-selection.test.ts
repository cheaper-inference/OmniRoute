import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFixtureHealthAccount as buildHealthAccount } from "./quota-overview-projection-fixtures.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const now = Date.parse("2099-01-01T00:00:00Z");
const iso = (delta: number) => new Date(now + delta).toISOString();
const connection = {
  id: "synthetic",
  provider: "claude",
  isActive: true,
  testStatus: "active",
  runtimeObservedAt: iso(-1000),
};
const data = { quotas: [{ name: "weekly", remainingPercentage: 80 }] };
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };

for (const testStatus of ["expired", "banned", "credits_exhausted"]) {
  for (const lastErrorAt of [iso(0), iso(-48 * 3600000), null]) {
    test(`aged ${testStatus} summary remains terminal with confirmation ${lastErrorAt}`, () => {
      const evidence = {
        policy,
        observedAt: iso(0),
        cooldown: { id: connection.id, status: "terminal", testStatus, lastErrorAt, lockouts: [] },
      };
      for (const elapsed of [0, 90001, 48 * 3600000]) {
        const account = buildHealthAccount(connection, data, {}, now + elapsed, evidence);
        assert.equal(account.status, "critical");
        assert.equal(displayAccount(account, now + elapsed).kind, "act");
        assert.notEqual(account.runtimeAvailability?.state, "AVAILABLE");
        assert.equal(account.runtimeObservedAt, iso(0));
      }
      const recovered = buildHealthAccount(
        { ...connection, runtimeObservedAt: iso(90002) },
        data,
        {},
        now + 90002,
        evidence
      );
      assert.equal(recovered.status, "ok");
      assert.equal(recovered.runtimeAvailability?.state, "AVAILABLE");
    });
  }
}

test("newer connection status preserves fresh summary model locks until their absolute deadline", () => {
  const c = { ...connection, runtimeObservedAt: iso(1000) };
  const evidence = {
    policy,
    observedAt: iso(0),
    cooldown: {
      id: c.id,
      status: "model_locked",
      testStatus: "banned",
      cooldownRemainingMs: 60000,
      lastErrorType: "server_error",
      lockouts: [{ model: "synthetic-model", remainingMs: 30000, reason: "429" }],
    },
  };
  const account = buildHealthAccount(c, data, {}, now + 1000, evidence);
  assert.equal(account.status, "alert");
  assert.equal(account.runtimeAvailability?.state, "AVAILABLE");
  assert.equal(account.runtimeObservedAt, c.runtimeObservedAt);
  assert.deepEqual(
    account.reasons.filter((r) => r.type === "lockout"),
    [{ type: "lockout", scope: "scoped", window: "synthetic-model", resetAt: iso(30000) }]
  );
  assert.ok(!account.reasons.some((r) => ["terminal", "cooldown"].includes(r.type)));
  const expired = buildHealthAccount(c, data, {}, now + 30000, evidence);
  assert.equal(expired.status, "ok");
  assert.ok(!expired.reasons.some((r) => r.type === "lockout"));
});

test("nonterminal summary fields and model locks stop applying after summary freshness expires", () => {
  const evidence = {
    policy,
    observedAt: iso(0),
    cooldown: {
      id: connection.id,
      status: "model_locked",
      testStatus: "unavailable",
      cooldownRemainingMs: 3600000,
      lockouts: [{ model: "synthetic-model", remainingMs: 3600000, reason: "429" }],
    },
  };
  const account = buildHealthAccount(connection, data, {}, now + 90001, evidence);
  assert.equal(account.status, "ok");
  assert.ok(!account.reasons.some((r) => ["cooldown", "lockout"].includes(r.type)));
});
