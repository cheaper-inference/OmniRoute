import assert from "node:assert/strict";
import { test } from "node:test";
import {
  parseRuntimeTimestamp,
  runtimeCooldownEvidence,
  sameCooldown,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/runtimeCooldown.ts";
const now = Date.parse("2099-01-01T00:00:00Z");
test("runtime parser matches cooldownUntilMs for ISO, epoch numbers, SQLite TEXT and absent/invalid values", () => {
  for (const value of [
    now,
    String(now),
    `${now}.0`,
    ` ${now}.0 `,
    new Date(now),
    new Date(now).toISOString(),
  ])
    assert.equal(parseRuntimeTimestamp(value), now);
  for (const value of [null, undefined, "", "not-a-date"])
    assert.ok(Number.isNaN(parseRuntimeTimestamp(value)));
  assert.equal(parseRuntimeTimestamp(0), 0);
});
test("only derived deadlines get an inclusive 5s identity tolerance, measured against the original", () => {
  const observation = { until: now + 3600000, observedAt: now, derived: true };
  for (const delta of [-5000, -1, 0, 1, 5000])
    assert.equal(
      sameCooldown(observation, { until: observation.until + delta, derived: true }),
      true
    );
  for (const delta of [-5001, 5001])
    assert.equal(
      sameCooldown(observation, { until: observation.until + delta, derived: true }),
      false
    );
  assert.equal(
    sameCooldown(
      { ...observation, derived: false },
      { until: observation.until + 1, derived: false }
    ),
    false
  );
  assert.equal(sameCooldown(observation, { until: observation.until + 1, derived: false }), false);
});
test("one source, explicit deadline priority, and fresh summary boundary are shared by capture/projection", () => {
  const connection = {
    id: "a",
    provider: "claude",
    rateLimitedUntil: String(now + 7200000),
    lastErrorAt: String(now - 86400000),
  };
  const row = {
    id: "a",
    status: "cooling_down",
    rateLimitedUntil: `${now + 1800000}.0`,
    cooldownRemainingMs: 7200000,
    lastErrorAt: String(now),
    lockouts: [],
  };
  const evidence = { cooldown: row, observedAt: `${now}.0` };
  const selected = runtimeCooldownEvidence(connection, evidence, now);
  assert.equal(selected.runtime, row);
  assert.equal(selected.until, now + 1800000);
  assert.equal(selected.derived, false);
  assert.equal(runtimeCooldownEvidence(connection, evidence, now + 90000).runtime, row);
  assert.equal(runtimeCooldownEvidence(connection, evidence, now + 90001).runtime, connection);
  assert.equal(
    runtimeCooldownEvidence(connection, { ...evidence, summaryFailed: true }, now).runtime,
    connection
  );
  const healthy = runtimeCooldownEvidence(
    connection,
    {
      ...evidence,
      cooldown: { ...row, rateLimitedUntil: null, cooldownRemainingMs: 0, lastErrorAt: null },
    },
    now
  );
  assert.equal(healthy.until, 0);
  assert.equal(healthy.runtime.lastErrorAt, null);
});
