import test from "node:test";
import assert from "node:assert/strict";

const alerts =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaWindowAlerts.ts");

function quota(overrides: Record<string, unknown> = {}) {
  return {
    name: "session",
    used: 0,
    total: 100,
    remainingPercentage: 100,
    resetAt: null,
    ...overrides,
  };
}

function snapshot(quotas: Array<Record<string, unknown>>) {
  return { "conn-1": { provider: "codex", quotas } };
}

test("returns no alert for a healthy window", () => {
  const alertsFound = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 90 })]),
    {}
  );

  assert.deepEqual(alertsFound, []);
});

test("fires once when a window crosses into critical usage", () => {
  const current = snapshot([quota({ remainingPercentage: 10 })]);
  const seen = {};

  const first = alerts.collectQuotaWindowAlerts(current, seen);
  assert.equal(first.length, 1);
  assert.equal(first[0].kind, "below_threshold");
  assert.equal(first[0].severity, "critical");

  // Same state on the next poll must not re-alert.
  const second = alerts.collectQuotaWindowAlerts(current, seen);
  assert.deepEqual(second, []);
});

test("re-fires only after the window recovered and dropped again", () => {
  const seen = {};

  alerts.collectQuotaWindowAlerts(snapshot([quota({ remainingPercentage: 10 })]), seen);
  // Recovery clears the latch.
  assert.deepEqual(
    alerts.collectQuotaWindowAlerts(snapshot([quota({ remainingPercentage: 95 })]), seen),
    []
  );
  const again = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 4 })]),
    seen
  );
  assert.equal(again.length, 1);
});

test("uses the warning threshold between critical and healthy", () => {
  const found = alerts.collectQuotaWindowAlerts(snapshot([quota({ remainingPercentage: 30 })]), {});

  assert.equal(found.length, 1);
  assert.equal(found[0].severity, "warning");
});

test("an already-latched window that starts far below the threshold does not re-alert every poll", () => {
  const seen = {};
  const deep = snapshot([quota({ remainingPercentage: 1 })]);

  alerts.collectQuotaWindowAlerts(deep, seen);
  assert.deepEqual(alerts.collectQuotaWindowAlerts(deep, seen), []);
  assert.deepEqual(alerts.collectQuotaWindowAlerts(deep, seen), []);
});

test("ignores credit rows and other non-window quotas", () => {
  const found = alerts.collectQuotaWindowAlerts(
    snapshot([
      {
        name: "banked_reset_credits",
        used: 0,
        total: 0,
        remaining: 0,
        remainingPercentage: 0,
        isResetCredits: true,
      },
    ]),
    {}
  );

  assert.deepEqual(found, []);
});

test("ignores quotas without a reported percentage", () => {
  const found = alerts.collectQuotaWindowAlerts(
    snapshot([{ name: "session", used: 0, total: 0 }]),
    {}
  );

  assert.deepEqual(found, []);
});

test("treats a stale-after-reset window as recovered", () => {
  const found = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 0, staleAfterReset: true })]),
    {}
  );

  assert.deepEqual(found, []);
});

test("flags an expiring reset credit as a reminder", () => {
  const soon = new Date(Date.now() + 6 * 3_600_000).toISOString();
  const found = alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ creditId: "credit-1", expiresAt: soon }] },
    {}
  );

  assert.equal(found.length, 1);
  assert.equal(found[0].kind, "reset_credit_expiring");
  assert.equal(found[0].creditId, "credit-1");
});

test("does not repeat the reset-credit reminder across polls", () => {
  const soon = new Date(Date.now() + 6 * 3_600_000).toISOString();
  const seen = {};

  alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ creditId: "credit-1", expiresAt: soon }] },
    seen
  );
  assert.deepEqual(
    alerts.collectResetCreditExpiryAlerts(
      { "conn-1": [{ creditId: "credit-1", expiresAt: soon }] },
      seen
    ),
    []
  );
});

test("leaves credits outside the reminder horizon alone", () => {
  const far = new Date(Date.now() + 30 * 24 * 3_600_000).toISOString();
  const found = alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ creditId: "credit-far", expiresAt: far }] },
    {}
  );

  assert.deepEqual(found, []);
});

test("ignores credits without an expiry", () => {
  const found = alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ creditId: "credit-no-expiry", expiresAt: null }] },
    {}
  );

  assert.deepEqual(found, []);
});

test("alerts are silent when the feature is disabled", () => {
  const found = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 2 })]),
    {},
    { enabled: false }
  );

  assert.deepEqual(found, []);
});

test("a fresh window that never reported a healthy value does not alert on first sight", () => {
  // First observation is already critical (e.g. long-running account). The
  // operator gets one alert — not zero — but latches so it stays quiet.
  const seen = {};
  const found = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 5 })]),
    seen
  );

  assert.equal(found.length, 1);
  assert.deepEqual(
    alerts.collectQuotaWindowAlerts(snapshot([quota({ remainingPercentage: 5 })]), seen),
    []
  );
});

test("keeps separate latches per connection and window", () => {
  const seen = {};
  const current = {
    "conn-1": { provider: "codex", quotas: [quota({ name: "session", remainingPercentage: 10 })] },
    "conn-2": { provider: "codex", quotas: [quota({ name: "session", remainingPercentage: 10 })] },
  };

  const found = alerts.collectQuotaWindowAlerts(current, seen);
  assert.equal(found.length, 2);
  assert.notEqual(found[0].key, found[1].key);
});
