/**
 * The daily revalidation pass, end to end against the real lockout store (#20343).
 *
 * The pure selector (quotaDailyRevalidation.ts) decides which locks are due; this
 * file covers the half that touches the store and the upstream: an enabled pass
 * probes the due locks, a passing probe clears the lock, a failing one keeps it,
 * and a disabled pass makes no request at all.
 *
 * Probes are injected, so no network and no real provider is involved. The locks
 * are real: they go through recordModelLockoutFailure() and are read back through
 * getAllModelLockouts(), exactly as the sweep sees them.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  clearAllModelLockouts,
  getAllModelLockouts,
  recordModelLockoutFailure,
} from "../../open-sse/services/accountFallback.ts";
import { runDailyQuotaRevalidation } from "../../src/lib/credentialHealth/quotaDailyRevalidationRunner.ts";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/** A lock whose window is still 5 days away, applied just now. */
function lockProviderModel(provider: string, connectionId: string, model: string) {
  recordModelLockoutFailure(provider, connectionId, model, "429", 429, 3_000, null, {
    exactCooldownMs: 7 * DAY,
    scope: "exact",
    exactCooldownIsRelativeProseReset: true,
    quotaProseMaxCooldownMs: 5 * DAY,
  });
}

test.beforeEach(() => {
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
});

test("an enabled pass probes a long lock and clears it when the quota is back", async () => {
  const now = Date.now();
  lockProviderModel("antigravity", "conn-a", "claude-opus-4-6-thinking");

  const before = getAllModelLockouts();
  assert.equal(before.length, 1, "sanity: the lock must exist");
  assert.ok(before[0].remainingMs > DAY, "sanity: the lock must outlive a day to be due");

  const probed: string[] = [];
  const result = await runDailyQuotaRevalidation({
    nowMs: now,
    enabled: true,
    probe: async (candidate) => {
      probed.push(`${candidate.provider}/${candidate.connectionId}/${candidate.model}`);
      return "recovered";
    },
  });

  assert.equal(result.probed, 1);
  assert.equal(result.recovered, 1);
  assert.deepEqual(probed, ["antigravity/conn-a/claude-opus-4-6-thinking"]);
  // A recovered model must be back in rotation, not waiting out the window.
  assert.equal(getAllModelLockouts().length, 0, "a passing probe must clear the lock");
});

test("a failing probe keeps the lock and does not shorten it", async () => {
  lockProviderModel("antigravity", "conn-b", "gemini-3-pro");
  const before = getAllModelLockouts()[0];

  const result = await runDailyQuotaRevalidation({
    enabled: true,
    probe: async () => "still-locked",
  });

  assert.equal(result.probed, 1);
  assert.equal(result.recovered, 0);
  const after = getAllModelLockouts();
  assert.equal(after.length, 1, "a failing probe must leave the lock in place");
  assert.ok(
    after[0].remainingMs > before.remainingMs - 60_000,
    "a failing probe must not shorten the announced window"
  );
});

test("an inconclusive probe neither clears the lock nor counts as recovered", async () => {
  lockProviderModel("antigravity", "conn-c", "gemini-3-flash");

  const result = await runDailyQuotaRevalidation({
    enabled: true,
    probe: async () => "unknown",
  });

  assert.equal(result.probed, 1);
  assert.equal(result.recovered, 0);
  assert.equal(getAllModelLockouts().length, 1, "an unknown verdict must not unlock the model");
});

test("a disabled pass makes no probe at all (the default)", async () => {
  lockProviderModel("antigravity", "conn-d", "claude-sonnet-4.6");

  let calls = 0;
  const result = await runDailyQuotaRevalidation({
    enabled: false,
    probe: async () => {
      calls += 1;
      return "recovered";
    },
  });

  assert.equal(calls, 0, "the default must spend no upstream request");
  assert.equal(result.probed, 0);
  assert.equal(getAllModelLockouts().length, 1, "the lock must survive a disabled sweep");
});

test("a short lock is not probed even when the pass is enabled", async () => {
  recordModelLockoutFailure("antigravity", "conn-e", "short-model", "429", 429, 1_800_000, null, {
    exactCooldownMs: 30 * 60_000,
    scope: "exact",
  });

  let calls = 0;
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    probe: async () => {
      calls += 1;
      return "recovered";
    },
  });

  assert.equal(calls, 0, "a lock expiring within the day must be left alone");
  assert.equal(result.probed, 0);
});

test("one probing pass does not re-probe the same lock on the next sweep", async () => {
  lockProviderModel("antigravity", "conn-f", "gemini-3-pro");

  let calls = 0;
  const probe = async () => {
    calls += 1;
    return "still-locked" as const;
  };

  await runDailyQuotaRevalidation({ enabled: true, probe });
  assert.equal(calls, 1);

  // The store remembers the probe, so the same lock is not hammered every sweep.
  await runDailyQuotaRevalidation({ enabled: true, probe });
  assert.equal(calls, 1, "a lock probed moments ago must not be probed again");
});

test("the feature flag keeps the pass off by default, with no probe", async () => {
  lockProviderModel("antigravity", "conn-g", "flag-default-model");

  let calls = 0;
  // No `enabled` override: the real flag is consulted, and it defaults to false.
  const result = await runDailyQuotaRevalidation({
    probe: async () => {
      calls += 1;
      return "recovered";
    },
  });

  assert.equal(calls, 0, "the flag defaults to off: no upstream request may be made");
  assert.equal(result.probed, 0);
  assert.equal(getAllModelLockouts().length, 1, "the lock survives the default-off sweep");
});
