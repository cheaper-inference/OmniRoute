import test from "node:test";
import assert from "node:assert/strict";

const alerts =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaWindowAlerts.ts");
const parsing =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts");

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

test("a null or blank remainingPercentage is not read as an exhausted window", () => {
  // `Number(null)`, `Number("")` and `Number("  ")` are all 0, which used to fire and
  // latch a false critical alert (#18631 review).
  for (const value of [null, "", "   "]) {
    const seen = {};
    const found = alerts.collectQuotaWindowAlerts(
      snapshot([quota({ name: "session", remainingPercentage: value })]),
      seen
    );

    assert.deepEqual(found, [], `remainingPercentage=${JSON.stringify(value)} must stay silent`);
    assert.deepEqual(seen, {}, `remainingPercentage=${JSON.stringify(value)} must not latch`);
  }
});

test("a numeric string remainingPercentage is still honoured", () => {
  // Some providers serialize the percentage; that is a real value, unlike a blank string.
  const found = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ name: "session", remainingPercentage: "12" })]),
    {}
  );

  assert.equal(found.length, 1);
  assert.equal(found[0].severity, "critical");
  assert.equal(found[0].remainingPercentage, 12);
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

/** Same shape `open-sse/services/codexUsageQuotas.ts` produces: no `remainingPercentage`. */
function codexUsage(sessionUsedPercent: number) {
  const resetAt = new Date(Date.now() + 3_600_000).toISOString();
  return {
    quotas: {
      session: {
        used: sessionUsedPercent,
        total: 100,
        remaining: 100 - sessionUsedPercent,
        resetAt,
        unlimited: false,
      },
      weekly: { used: 10, total: 100, remaining: 90, resetAt, unlimited: false },
    },
    bankedResetCredits: 2,
  };
}

test("a real parsed Codex snapshot alerts on a low window", () => {
  const quotas = parsing.parseQuotaData("codex", codexUsage(90));
  const found = alerts.collectQuotaWindowAlerts({ "conn-1": { quotas } }, {});

  assert.equal(found.length, 1);
  assert.equal(found[0].windowName, "session");
  assert.equal(found[0].severity, "critical");
  assert.equal(found[0].remainingPercentage, 10);
});

test("a real parsed Codex snapshot stays quiet above the warning threshold", () => {
  const quotas = parsing.parseQuotaData("codex", codexUsage(20));

  assert.deepEqual(alerts.collectQuotaWindowAlerts({ "conn-1": { quotas } }, {}), []);
});

test("a warning window alerts once more when it reaches critical", () => {
  const seen = {};

  const warning = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 30 })]),
    seen
  );
  assert.equal(warning[0].severity, "warning");

  const critical = alerts.collectQuotaWindowAlerts(
    snapshot([quota({ remainingPercentage: 10 })]),
    seen
  );
  assert.equal(critical.length, 1);
  assert.equal(critical[0].severity, "critical");

  // Critical is the top: bouncing inside it, or back to warning, stays quiet.
  for (const remainingPercentage of [5, 20, 12]) {
    assert.deepEqual(
      alerts.collectQuotaWindowAlerts(snapshot([quota({ remainingPercentage })]), seen),
      []
    );
  }
});

test("a credit from the list route (selectionToken) alerts", () => {
  const soon = new Date(Date.now() + 6 * 3_600_000).toISOString();
  const found = alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ selectionToken: "token-1", expiresAt: soon }] },
    {}
  );

  assert.equal(found.length, 1);
  assert.equal(found[0].key, "conn-1:credit:token-1");
});

test("a re-issued credit with a new expiry alerts again", () => {
  const seen = {};
  const first = new Date(Date.now() + 6 * 3_600_000).toISOString();
  const second = new Date(Date.now() + 12 * 3_600_000).toISOString();

  alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ selectionToken: "t", expiresAt: first }] },
    seen
  );
  const found = alerts.collectResetCreditExpiryAlerts(
    { "conn-1": [{ selectionToken: "t", expiresAt: second }] },
    seen
  );

  assert.equal(found.length, 1);
});

test("evaluateQuotaAlerts reports a change on recovery, not only on a new alert", () => {
  const latch = {};
  const drop = alerts.evaluateQuotaAlerts({
    latch,
    quotaSnapshot: snapshot([quota({ remainingPercentage: 10 })]),
    expiringCredits: {},
    liveConnectionIds: ["conn-1"],
  });
  assert.equal(drop.windowAlerts.length, 1);
  assert.equal(drop.changed, true);

  const steady = alerts.evaluateQuotaAlerts({
    latch,
    quotaSnapshot: snapshot([quota({ remainingPercentage: 10 })]),
    expiringCredits: {},
    liveConnectionIds: ["conn-1"],
  });
  assert.equal(steady.changed, false);

  const recovered = alerts.evaluateQuotaAlerts({
    latch,
    quotaSnapshot: snapshot([quota({ remainingPercentage: 95 })]),
    expiringCredits: {},
    liveConnectionIds: ["conn-1"],
  });
  assert.equal(recovered.windowAlerts.length, 0);
  assert.equal(recovered.changed, true);
  assert.deepEqual(latch, {});
});

test("pruneQuotaAlertLatch drops deleted connections and expired credits only", () => {
  const nowMs = 1_000_000;
  const latch = {
    "live:session": 10,
    "gone:session": 10,
    "live:credit:expired": nowMs - 1,
    "live:credit:pending": nowMs + 1,
  };

  alerts.pruneQuotaAlertLatch(latch, ["live"], nowMs);

  assert.deepEqual(latch, { "live:session": 10, "live:credit:pending": nowMs + 1 });
});

test("pruneQuotaAlertLatch keeps connection entries until the list has loaded", () => {
  const latch = { "conn-1:session": 10 };

  alerts.pruneQuotaAlertLatch(latch, [], 0);

  assert.deepEqual(latch, { "conn-1:session": 10 });
});

test("selectConnectionsWithBankedCredits picks active Codex accounts holding credits", () => {
  const quotas = parsing.parseQuotaData("codex", codexUsage(10));
  const noCredits = parsing.parseQuotaData("codex", {
    ...codexUsage(10),
    bankedResetCredits: 0,
  });

  const selected = alerts.selectConnectionsWithBankedCredits(
    [
      { id: "with-credits", provider: "codex" },
      { id: "without-credits", provider: "codex" },
      { id: "inactive", provider: "codex", isActive: false },
      { id: "other-provider", provider: "claude" },
      { id: "not-loaded", provider: "codex" },
    ],
    {
      "with-credits": { quotas },
      "without-credits": { quotas: noCredits },
      inactive: { quotas },
      "other-provider": { quotas },
    }
  );

  assert.deepEqual(selected, ["with-credits"]);
});
