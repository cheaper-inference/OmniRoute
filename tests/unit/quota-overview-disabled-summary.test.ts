import assert from "node:assert/strict";
import test from "node:test";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  countDisplay,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const now = Date.now();
const iso = (delta: number) => new Date(now + delta).toISOString();
const connection = {
  id: "synthetic-disabled-summary",
  provider: "openai",
  isActive: true,
  testStatus: "active",
  runtimeObservedAt: iso(-1000),
};
const usage = {
  fetchedAt: iso(0),
  quotas: { session: { remainingPercentage: 80, resetAt: iso(3600000) } },
};
const availability = buildConnectionQuotaAvailability(connection, usage, {
  enabled: false,
  defaultThresholdPercent: 2,
  providerWindowDefaults: {},
});
const cooldown = {
  id: connection.id,
  status: "healthy",
  isActive: false,
  testStatus: "active",
  lockouts: [],
};
function project(runtimeObservedAt = connection.runtimeObservedAt, observedAt = now) {
  return displayAccount(
    buildHealthAccount({ ...connection, runtimeObservedAt }, undefined, {}, now, {
      availability,
      availabilityObservedAt: now,
      cooldown,
      observedAt,
    }),
    now
  );
}

test("a newer disabled summary pauses an active connection and removes it from available counts", () => {
  const account = project();
  assert.equal(account.kind, "paused");
  assert.equal(account.status, "paused");
  assert.equal(account.runtimeAvailability?.state, "DISABLED");
  assert.equal(countDisplay([account]).ok, 0);
});

test("a newer enabled connection supersedes a disabled summary", () => {
  const account = project(iso(0), now - 500);
  assert.equal(account.kind, "ok");
  assert.equal(account.runtimeAvailability?.state, "AVAILABLE");
  assert.equal(countDisplay([account]).ok, 1);
});

test("a summary without an active field preserves the connection disabled state", () => {
  const account = displayAccount(
    buildHealthAccount({ ...connection, isActive: false }, undefined, {}, now, {
      availability,
      availabilityObservedAt: now,
      cooldown: { id: connection.id, status: "healthy", testStatus: "active", lockouts: [] },
      observedAt: now,
    }),
    now
  );
  assert.equal(account.kind, "paused");
  assert.equal(countDisplay([account]).ok, 0);
});

test("a newer enabled summary supersedes a disabled connection", () => {
  const account = buildHealthAccount({ ...connection, isActive: false }, undefined, {}, now, {
    availability,
    availabilityObservedAt: now,
    cooldown: { ...cooldown, isActive: true },
    observedAt: now,
  });
  assert.equal(account.status, "ok");
  assert.equal(account.runtimeAvailability?.state, "AVAILABLE");
});

test("an expired nonterminal disabled summary cannot pause an enabled connection", () => {
  const account = project(iso(-120000), now - 90001);
  assert.notEqual(account.kind, "paused");
  assert.equal(account.kind, "ok");
  assert.equal(account.runtimeAvailability?.state, "AVAILABLE");
});
