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
    exactCooldownMs: 5 * DAY,
    scope: "exact",
  });
}

/** Every connection the tests lock is active and keeps the default health-check cadence. */
const allActive = async () =>
  ["conn-a", "conn-b", "conn-c", "conn-d", "conn-e", "conn-f", "conn-g", "conn-h", "conn-i"].map(
    (id) => ({
      id,
      isActive: true,
      healthCheckInterval: null,
    })
  );

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
    loadConnections: allActive,
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
    loadConnections: allActive,
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
    loadConnections: allActive,
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
    loadConnections: allActive,
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

  await runDailyQuotaRevalidation({ enabled: true, loadConnections: allActive, probe });
  assert.equal(calls, 1);

  // The store remembers the probe, so the same lock is not hammered every sweep.
  await runDailyQuotaRevalidation({ enabled: true, loadConnections: allActive, probe });
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

test("a lock on an inactive or health-check-opted-out connection is never probed", async () => {
  // The probe is the regular connection test, which switches a connection back on
  // when it passes: probing an operator- or ban-disabled connection from here
  // would re-enable it behind the operator's back.
  lockProviderModel("antigravity", "conn-off", "gemini-3-pro");
  lockProviderModel("antigravity", "conn-optout", "gemini-3-pro");
  lockProviderModel("antigravity", "conn-on", "gemini-3-pro");

  const probed: string[] = [];
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: async () => [
      { id: "conn-off", isActive: false, healthCheckInterval: null },
      { id: "conn-optout", isActive: true, healthCheckInterval: 0 },
      { id: "conn-on", isActive: true, healthCheckInterval: null },
    ],
    probe: async (candidate) => {
      probed.push(candidate.connectionId);
      return "recovered";
    },
  });

  assert.deepEqual(probed, ["conn-on"], "only the active, opted-in connection may be probed");
  assert.equal(result.recovered, 1);
  const remaining = getAllModelLockouts()
    .map((entry) => entry.connectionId)
    .sort();
  assert.deepEqual(
    remaining,
    ["conn-off", "conn-optout"],
    "skipped locks stay exactly as they were"
  );
});

test("a lock whose connection no longer exists is not probed", async () => {
  lockProviderModel("antigravity", "conn-gone", "gemini-3-pro");

  let calls = 0;
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: async () => [],
    probe: async () => {
      calls += 1;
      return "recovered";
    },
  });

  assert.equal(calls, 0);
  assert.equal(result.probed, 0);
  assert.equal(getAllModelLockouts().length, 1);
});

test("unreadable connections make the pass probe nothing", async () => {
  lockProviderModel("antigravity", "conn-i", "gemini-3-pro");

  let calls = 0;
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: async () => {
      throw new Error("db unavailable");
    },
    probe: async () => {
      calls += 1;
      return "recovered";
    },
    logger: {},
  });

  assert.equal(calls, 0, "an unreadable connection list must not lead to a probe");
  assert.equal(result.probed, 0);
  assert.equal(getAllModelLockouts().length, 1);
});

test("a recovered family lock also releases its persisted deadline; an exact lock does not", async () => {
  // A family lock is stored on the connection row as well and rehydrated on every
  // credential read, so clearing only the in-memory entry would restore it right away.
  recordModelLockoutFailure(
    "antigravity",
    "conn-family",
    "gemini-3-pro",
    "quota_exhausted",
    429,
    3_000,
    null,
    {
      exactCooldownMs: 5 * DAY,
      scope: "quota_family",
    }
  );
  recordModelLockoutFailure("openai", "conn-exact-only", "gpt-4o", "429", 429, 3_000, null, {
    exactCooldownMs: 5 * DAY,
    scope: "exact",
  });

  const released: string[] = [];
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: async () => [
      { id: "conn-family", isActive: true, healthCheckInterval: null },
      { id: "conn-exact-only", isActive: true, healthCheckInterval: null },
    ],
    probe: async () => "recovered",
    releaseFamilyLock: async (candidate) => {
      released.push(`${candidate.provider}/${candidate.model}`);
      return true;
    },
  });

  assert.equal(result.recovered, 2);
  assert.deepEqual(
    released,
    ["antigravity/family:gemini"],
    "only the family lock has a connection-row record to release"
  );
  assert.deepEqual(getAllModelLockouts(), [], "both recovered locks (and their keys) are gone");
});

test("an inconclusive or still-locked family probe never releases the persisted deadline", async () => {
  recordModelLockoutFailure(
    "antigravity",
    "conn-family-keeplock",
    "claude-opus-4-6-thinking",
    "quota_exhausted",
    429,
    3_000,
    null,
    {
      exactCooldownMs: 5 * DAY,
      scope: "quota_family",
    }
  );

  let releases = 0;
  await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: async () => [
      { id: "conn-family-keeplock", isActive: true, healthCheckInterval: null },
    ],
    probe: async () => "unknown",
    releaseFamilyLock: async () => {
      releases += 1;
      return true;
    },
  });
  assert.equal(releases, 0);
  assert.ok(
    getAllModelLockouts().some((entry) => entry.model === "family:claude"),
    "the family lock survives an inconclusive probe"
  );
});

test("an Antigravity family lock installed under both spellings is probed once and both are cleared", async () => {
  // `lockAntigravityFamilyModel()` writes the SAME family under `agy` AND `antigravity`,
  // so one quota appears as two lock keys. Probing both spends two requests on one
  // question, and clearing only the probed spelling leaves the family parked for the
  // next credential read.
  const until = Date.now() + 5 * DAY;
  for (const alias of ["agy", "antigravity"]) {
    recordModelLockoutFailure(
      alias,
      "conn-pair",
      "claude-opus-4-6-thinking",
      "quota_exhausted",
      429,
      3_000,
      null,
      {
        exactCooldownMs: until - Date.now(),
        scope: "quota_family",
      }
    );
  }
  assert.equal(
    getAllModelLockouts().filter((entry) => entry.connectionId === "conn-pair").length,
    2,
    "sanity: the family is installed under both spellings"
  );

  const probes: string[] = [];
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: async () => [
      {
        id: "conn-pair",
        provider: "antigravity",
        isActive: true,
        healthCheckInterval: null,
      },
    ],
    probe: async (candidate) => {
      probes.push(`${candidate.provider}/${candidate.model}`);
      return "recovered";
    },
    releaseFamilyLock: async () => true,
    logger: {},
  });

  assert.equal(result.probed, 1, "one quota is one probe, not one per spelling");
  assert.deepEqual(
    probes,
    ["antigravity/family:claude"],
    "one probe, asked through the connection's own provider spelling"
  );
  assert.equal(result.recovered, 1);
  assert.deepEqual(
    getAllModelLockouts(),
    [],
    "both spellings of the recovered family are released"
  );
});

test("a sweep cadence of 0 (sweep turned off) makes no probe even with the flag on", async () => {
  lockProviderModel("antigravity", "conn-h", "gemini-3-pro");

  let calls = 0;
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    sweepIntervalMs: 0,
    loadConnections: allActive,
    probe: async () => {
      calls += 1;
      return "recovered";
    },
  });

  assert.equal(calls, 0, "an operator who turned the sweep off must see no upstream request");
  assert.equal(result.probed, 0);
  assert.equal(getAllModelLockouts().length, 1);

  // A positive cadence keeps the daily probe.
  const enabledResult = await runDailyQuotaRevalidation({
    enabled: true,
    sweepIntervalMs: 300_000,
    loadConnections: allActive,
    probe: async () => {
      calls += 1;
      return "recovered";
    },
  });
  assert.equal(calls, 1);
  assert.equal(enabledResult.recovered, 1);
});
