/**
 * The daily quota revalidation probes the locked MODEL, not the credential (#20343).
 *
 * A credential that still authenticates says nothing about whether one model's quota
 * window reopened, so the production probe sends one minimal request to the locked
 * model on the locked connection and decides from that model's answer only:
 *   - the model answers            → its lock is cleared;
 *   - a quota / 429 answer         → the lock stays (refreshed from the announced reset);
 *   - anything else                → the lock stays exactly as it was, and it is logged.
 * Sibling models on the same connection are never touched, and a probe never writes
 * a connection-wide cooldown.
 *
 * The model-test runner is injected: no network and no real provider. The locks are
 * real (accountFallback's in-memory store), read back as the sweep sees them.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  clearAllModelLockouts,
  getAllModelLockouts,
  recordModelLockoutFailure,
} from "../../open-sse/services/accountFallback.ts";
import { runDailyQuotaRevalidation } from "../../src/lib/credentialHealth/quotaDailyRevalidationRunner.ts";
import {
  QUOTA_PROBE_MAX_OUTPUT_TOKENS,
  classifyQuotaProbeResult,
  probeLockedModel,
} from "../../src/lib/credentialHealth/quotaRevalidationProbe.ts";
import { runAsProbe, shouldIsolateProbeFailures } from "../../src/shared/utils/probeOrigin.ts";
import type {
  RunSingleModelTestOptions,
  SingleModelTestResult,
} from "../../src/lib/api/modelTestRunner.ts";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const PROVIDER = "antigravity";

/** An exact lock on one model, `days` long. */
function lockModel(connectionId: string, model: string, days = 7) {
  recordModelLockoutFailure(PROVIDER, connectionId, model, "quota_exhausted", 429, 3_000, null, {
    exactCooldownMs: days * DAY,
    scope: "exact",
  });
}

function lockOf(connectionId: string, model: string) {
  return getAllModelLockouts().find(
    (entry) => entry.connectionId === connectionId && entry.model === model
  );
}

/** A lock without its clock-dependent `remainingMs`, for "left exactly as it was" checks. */
function frozenLockOf(connectionId: string, model: string) {
  const entry = lockOf(connectionId, model);
  if (!entry) return undefined;
  const { remainingMs: _remainingMs, ...rest } = entry;
  return rest;
}

const activeConnections =
  (...ids: string[]) =>
  async () =>
    ids.map((id) => ({ id, isActive: true, healthCheckInterval: null }));

const ok = (modelId: string): SingleModelTestResult => ({
  modelId,
  status: "ok",
  latencyMs: 5,
  httpStatus: 200,
  responseText: "O",
});

const overQuota = (modelId: string, extra: Partial<SingleModelTestResult> = {}) =>
  ({
    modelId,
    status: "rate_limited",
    latencyMs: 5,
    statusCode: 429,
    httpStatus: 429,
    rateLimited: true,
    error: "Quota exceeded for this model. Resets in 150h0m0s.",
    ...extra,
  }) satisfies SingleModelTestResult;

/** A recording runner: every call is kept, the answer is scripted per model. */
function scriptedRunner(answer: (options: RunSingleModelTestOptions) => SingleModelTestResult) {
  const calls: RunSingleModelTestOptions[] = [];
  const runModelTest = async (options: RunSingleModelTestOptions) => {
    calls.push(options);
    return answer(options);
  };
  return { calls, runModelTest };
}

const silent = { info: () => {}, warn: () => {} };

test.beforeEach(() => {
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
});

test("the probe is a minimal, failure-isolated request to the locked model on its connection", async () => {
  lockModel("conn-req", "gemini-3-pro");
  const runner = scriptedRunner((options) => ok(options.modelId));

  await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: activeConnections("conn-req"),
    probe: (candidate) =>
      probeLockedModel(candidate, { runModelTest: runner.runModelTest, logger: silent }),
    logger: silent,
  });

  assert.equal(runner.calls.length, 1);
  const [request] = runner.calls;
  assert.equal(request.providerId, PROVIDER);
  assert.equal(request.modelId, `${PROVIDER}/gemini-3-pro`, "the locked model, not a test model");
  assert.equal(request.connectionId, "conn-req", "pinned to the locked connection");
  assert.equal(request.maxOutputTokens, QUOTA_PROBE_MAX_OUTPUT_TOKENS);
  assert.equal(
    QUOTA_PROBE_MAX_OUTPUT_TOKENS,
    16,
    "16 is the floor some upstreams accept: a smaller cap answers 400 and the lock never recovers"
  );
  assert.equal(request.acceptEmptyOutput, true);
  assert.equal(request.isolateFailures, true, "a probe failure must never reach the connection");
});

test("credential OK but the model still over quota: the lock is kept", async () => {
  lockModel("conn-quota", "claude-opus-4-6-thinking");
  const before = lockOf("conn-quota", "claude-opus-4-6-thinking");
  assert.ok(before, "sanity: the lock exists");

  // The credential is fine (the request authenticated); only this model is out of quota.
  const runner = scriptedRunner((options) => overQuota(options.modelId));
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: activeConnections("conn-quota"),
    probe: (candidate) =>
      probeLockedModel(candidate, { runModelTest: runner.runModelTest, logger: silent }),
    logger: silent,
  });

  assert.equal(result.probed, 1);
  assert.equal(result.recovered, 0, "a model still over quota is not a recovery");
  const after = lockOf("conn-quota", "claude-opus-4-6-thinking");
  assert.ok(after, "the lock must survive a quota answer");
  assert.ok(after.until >= before.until, "a quota answer never shortens a guessed lock");
});

test("a quota answer with a fresh reset hint refreshes that model's lock", async () => {
  lockModel("conn-refresh", "gemini-3-pro", 2);
  const before = lockOf("conn-refresh", "gemini-3-pro");
  assert.ok(before);

  const verdict = await probeLockedModel(
    {
      provider: PROVIDER,
      connectionId: "conn-refresh",
      model: "gemini-3-pro",
      reason: before.reason,
      until: before.until,
      lockedAt: Date.parse(before.lockedAt),
    },
    {
      // Retry-After of 6 days: the upstream's own clock moved the reset further out.
      runModelTest: async (options) => overQuota(options.modelId, { retryAfter: 6 * 24 * 3600 }),
      logger: silent,
    }
  );

  assert.equal(verdict, "still-locked");
  const after = lockOf("conn-refresh", "gemini-3-pro");
  assert.ok(after);
  assert.ok(after.until > before.until + 3 * DAY, "the lock follows the fresh reset hint");
});

test("the model answering clears its lock", async () => {
  lockModel("conn-ok", "gemini-3-flash");
  const runner = scriptedRunner((options) => ok(options.modelId));

  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: activeConnections("conn-ok"),
    probe: (candidate) =>
      probeLockedModel(candidate, { runModelTest: runner.runModelTest, logger: silent }),
    logger: silent,
  });

  assert.equal(result.recovered, 1);
  assert.equal(lockOf("conn-ok", "gemini-3-flash"), undefined, "the recovered model is unlocked");
});

test("any other failure keeps the lock unchanged and logs it", async () => {
  lockModel("conn-5xx", "gemini-3-pro");
  const before = frozenLockOf("conn-5xx", "gemini-3-pro");
  const warnings: string[] = [];

  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: activeConnections("conn-5xx"),
    probe: (candidate) =>
      probeLockedModel(candidate, {
        runModelTest: async (options) => ({
          modelId: options.modelId,
          status: "error",
          latencyMs: 5,
          statusCode: 503,
          httpStatus: 503,
          error: "upstream unavailable",
        }),
        logger: { warn: (msg) => warnings.push(msg) },
      }),
    logger: silent,
  });

  assert.equal(result.recovered, 0);
  assert.deepEqual(
    frozenLockOf("conn-5xx", "gemini-3-pro"),
    before,
    "the lock is left exactly as it was"
  );
  assert.equal(warnings.length, 1, "the inconclusive probe is logged");
  assert.match(warnings[0], /inconclusive/);
});

test("a skipped or timed-out probe is never read as a recovery", () => {
  const base = { modelId: "m", latencyMs: 0 };
  assert.equal(
    classifyQuotaProbeResult({ ...base, status: "error", httpStatus: 422, skipped: true }),
    "unknown"
  );
  assert.equal(
    classifyQuotaProbeResult({ ...base, status: "slow", httpStatus: 504, isTimeout: true }),
    "unknown"
  );
  assert.equal(
    classifyQuotaProbeResult({ ...base, status: "error", httpStatus: 403, isQuota: true }),
    "still-locked"
  );
  assert.equal(classifyQuotaProbeResult({ ...base, status: "ok", httpStatus: 200 }), "recovered");
});

test("other models on the same connection are unaffected by a probe", async () => {
  lockModel("conn-shared", "gemini-3-pro");
  lockModel("conn-shared", "gemini-3-flash", 3);
  const siblingBefore = frozenLockOf("conn-shared", "gemini-3-flash");

  // First probe answers with a quota error and a fresh reset (a refresh), the next
  // one recovers; neither may touch the sibling's lock or add one for another model.
  let answer: "quota" | "ok" = "quota";
  const probedModels: string[] = [];
  const probe = (candidate: Parameters<typeof probeLockedModel>[0]) =>
    probeLockedModel(candidate, {
      runModelTest: async (options) => {
        probedModels.push(options.modelId);
        return answer === "quota"
          ? overQuota(options.modelId, { retryAfter: 8 * 24 * 3600 })
          : ok(options.modelId);
      },
      logger: silent,
    });

  await runDailyQuotaRevalidation({
    enabled: true,
    limit: 1,
    loadConnections: activeConnections("conn-shared"),
    probe,
    logger: silent,
  });
  assert.deepEqual(probedModels, [`${PROVIDER}/gemini-3-pro`], "oldest lock first, one per sweep");
  assert.deepEqual(frozenLockOf("conn-shared", "gemini-3-flash"), siblingBefore);

  answer = "ok";
  clearAllModelLockouts();
  lockModel("conn-shared", "gemini-3-pro");
  lockModel("conn-shared", "gemini-3-flash", 3);
  const siblingAgain = frozenLockOf("conn-shared", "gemini-3-flash");
  await runDailyQuotaRevalidation({
    enabled: true,
    nowMs: Date.now() + 2 * DAY, // past the throttle of the first sweep
    limit: 1,
    loadConnections: activeConnections("conn-shared"),
    probe,
    logger: silent,
  });
  assert.equal(lockOf("conn-shared", "gemini-3-pro"), undefined, "the probed model recovered");
  assert.deepEqual(
    frozenLockOf("conn-shared", "gemini-3-flash"),
    siblingAgain,
    "the sibling's lock is untouched"
  );
  assert.deepEqual(
    getAllModelLockouts().map((entry) => entry.model),
    ["gemini-3-flash"],
    "no lock was written for any other model"
  );
});

test("the once-a-day throttle holds per locked model", async () => {
  lockModel("conn-daily", "gemini-3-pro", 10);
  const runner = scriptedRunner((options) => overQuota(options.modelId));
  const sweep = (nowMs: number) =>
    runDailyQuotaRevalidation({
      enabled: true,
      nowMs,
      loadConnections: activeConnections("conn-daily"),
      probe: (candidate) =>
        probeLockedModel(candidate, { runModelTest: runner.runModelTest, logger: silent }),
      logger: silent,
    });

  const start = Date.now();
  await sweep(start);
  assert.equal(runner.calls.length, 1);
  await sweep(start + HOUR);
  await sweep(start + 23 * HOUR);
  assert.equal(runner.calls.length, 1, "no second probe within the day");
  await sweep(start + DAY + 60_000);
  assert.equal(runner.calls.length, 2, "probed again once a full day has passed");
});

test("a quota answer refreshes the SAME lock scope it was probed for", async () => {
  // A family lock refreshed under the exact key would write a second, phantom entry and
  // leave the real one parked: the refresh has to reuse the candidate's own scope.
  recordModelLockoutFailure(
    PROVIDER,
    "conn-scope",
    "gemini-3-pro",
    "quota_exhausted",
    429,
    3_000,
    null,
    {
      exactCooldownMs: 50 * DAY,
      scope: "quota_family",
    }
  );
  const familyKey = getAllModelLockouts().find(
    (entry) => entry.connectionId === "conn-scope" && entry.model === "family:gemini"
  );
  assert.ok(familyKey, "sanity: the family lock exists");

  await probeLockedModel(
    {
      provider: PROVIDER,
      connectionId: "conn-scope",
      model: "family:gemini",
      scope: "quota_family",
      reason: familyKey.reason,
      until: familyKey.until,
      lockedAt: Date.parse(familyKey.lockedAt),
    },
    {
      resolveModel: async () => ({ model: "gemini-3-pro" }),
      runModelTest: async (options) => overQuota(options.modelId, { retryAfter: 6 * 24 * 3600 }),
      logger: silent,
    }
  );

  const locks = getAllModelLockouts().filter((entry) => entry.connectionId === "conn-scope");
  assert.deepEqual(
    locks.map((entry) => entry.model),
    ["family:gemini", "family:gemini"],
    "the family lock is refreshed under both spellings and no exact:family:gemini phantom"
  );
  assert.deepEqual(
    locks.map((entry) => entry.provider).sort(),
    ["agy", "antigravity"],
    "one quota keeps one deadline: the sibling spelling is refreshed too, not left stale"
  );
});

test("a family lock is probed through a real model of its own family", async () => {
  recordModelLockoutFailure(
    PROVIDER,
    "conn-family",
    "gemini-3-pro",
    "quota_exhausted",
    429,
    3_000,
    null,
    {
      exactCooldownMs: 7 * DAY,
      scope: "quota_family",
    }
  );
  const familyLock = getAllModelLockouts().find(
    (entry) => entry.connectionId === "conn-family" && entry.scope === "quota_family"
  );
  assert.ok(familyLock, "sanity: a family lock exists");

  const runner = scriptedRunner((options) => ok(options.modelId));
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: activeConnections("conn-family"),
    probe: (candidate) =>
      probeLockedModel(candidate, {
        runModelTest: runner.runModelTest,
        loadSyncedModels: async () => [],
        logger: silent,
      }),
    logger: silent,
  });

  assert.equal(result.recovered, 1);
  assert.equal(runner.calls.length, 1);
  assert.match(
    runner.calls[0].modelId,
    /gemini|flash|pro/,
    "a concrete model of the gemini family reaches upstream, not the bucket name"
  );
  assert.equal(
    runner.calls[0].modelId.includes("family:"),
    false,
    "the bucket name is never sent upstream"
  );
  assert.equal(
    lockOf("conn-family", "family:gemini"),
    undefined,
    "the recovered family is unlocked"
  );
});

test("a family lock with no resolvable model spends no upstream request", async () => {
  recordModelLockoutFailure(
    "antigravity",
    "conn-unresolvable",
    "gemini-3-pro",
    "quota_exhausted",
    429,
    3_000,
    null,
    {
      exactCooldownMs: 7 * DAY,
      scope: "quota_family",
    }
  );
  const before = frozenLockOf("conn-unresolvable", "family:gemini");
  assert.ok(before, "sanity: the family lock exists");

  const warnings: string[] = [];
  let calls = 0;
  const result = await runDailyQuotaRevalidation({
    enabled: true,
    loadConnections: activeConnections("conn-unresolvable"),
    probe: (candidate) =>
      probeLockedModel(candidate, {
        resolveModel: async () => ({ unavailable: "no chat model of this family is known" }),
        runModelTest: async (options) => {
          calls += 1;
          return ok(options.modelId);
        },
        logger: { warn: (msg) => warnings.push(msg) },
      }),
    logger: silent,
  });

  assert.equal(calls, 0, "an unresolvable bucket must not buy a request");
  assert.equal(result.recovered, 0);
  assert.deepEqual(frozenLockOf("conn-unresolvable", "family:gemini"), before);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /skipping/);
});

test("a failure-isolated probe stays isolated even when probeCanDisable is opted in", async () => {
  assert.equal(await shouldIsolateProbeFailures(), false, "outside a probe nothing is isolated");
  // `isolateFailures` short-circuits before the flag / settings lookup, so the opt-in
  // that lets operator-pressed probes count as real traffic never applies to it.
  const isolated = await runAsProbe(() => shouldIsolateProbeFailures(), {
    isolateFailures: true,
  });
  assert.equal(isolated, true);
});
