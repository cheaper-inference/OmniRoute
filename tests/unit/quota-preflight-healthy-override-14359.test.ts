// #14359 — the preflight cutoff reads the quota fetcher's window data
// independently of the quota cache, so a connection the healthy override has
// stood down (or whose park expired) was still skipped pre-dispatch when the
// console reported 0% remaining. evaluateQuotaCutoff must honour the same
// healthy override the dispatch-time predicates honour.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-preflight-14359-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports are required: DATA_DIR must be set before the db modules
// open SQLite (same pattern as tests/unit/quota-cache-hydrate-5015.test.ts).
const coreDb = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { evaluateQuotaCutoff } = await import("../../open-sse/services/quotaPreflight.ts");

const FAR_RESET = new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString();

// qwen-style quota: only the weekly window, reported fully used.
const exhaustedQuota = {
  used: 40_000,
  total: 40_000,
  percentUsed: 1,
  resetAt: FAR_RESET,
  windows: { weekly: { percentUsed: 1, resetAt: FAR_RESET } },
  limitReached: true,
};

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14359 preflight cuts off a connection whose windows report 0% remaining", () => {
  quotaCache.__clearForTests();
  const decision = evaluateQuotaCutoff(exhaustedQuota, undefined, {
    provider: "qwen-cloud-token-plan",
    connectionId: "pf-14359",
  });
  assert.equal(decision.proceed, false, "0%-remaining windows must cut off");
});

test("#17879 a measured weekly cutoff outranks the recent-success override", () => {
  quotaCache.__clearForTests();
  quotaCache.markQuotaHealthy("pf-healthy-14359");

  const scope = { provider: "claude", connectionId: "pf-healthy-14359" };
  const thresholds = {
    resolveMinRemainingPercent: (window: string | null) => (window === "weekly (7d)" ? 10 : 5),
    isConfiguredCutoff: (window: string | null) => window === "weekly (7d)",
  };
  const quota = {
    used: 90,
    total: 100,
    percentUsed: 0.9,
    windows: {
      "session (5h)": { percentUsed: 0.4, resetAt: FAR_RESET },
      "weekly (7d)": { percentUsed: 0.9, resetAt: FAR_RESET },
    },
  };
  const atCutoff = evaluateQuotaCutoff(quota, thresholds, scope);
  assert.equal(atCutoff.proceed, false, "a measured 10% remaining must block dispatch");
  assert.equal(atCutoff.windowName, "weekly (7d)");

  const aboveCutoff = evaluateQuotaCutoff(
    {
      ...quota,
      percentUsed: 0.89,
      windows: { ...quota.windows, "weekly (7d)": { percentUsed: 0.89, resetAt: FAR_RESET } },
    },
    thresholds,
    scope
  );
  assert.equal(aboveCutoff.proceed, true, "a measured 11% remaining stays eligible");
  assert.deepEqual(evaluateQuotaCutoff(null, thresholds, scope), { proceed: true });
});

test("#17879 explicit 0% cutoff remains enforceable after a success", () => {
  quotaCache.markQuotaHealthy("pf-zero-17879");
  const result = evaluateQuotaCutoff(
    exhaustedQuota,
    {
      resolveMinRemainingPercent: () => 0,
      isConfiguredCutoff: (window) => window === "weekly",
    },
    { provider: "qwen-cloud-token-plan", connectionId: "pf-zero-17879" }
  );
  assert.equal(result.proceed, false);
  assert.equal(result.windowName, "weekly");
});

test("#17879 a configured credit cutoff retains available free-trial headroom", () => {
  quotaCache.markQuotaHealthy("pf-trial-17879");
  const decision = evaluateQuotaCutoff(
    {
      used: 50,
      total: 50,
      percentUsed: 1,
      windows: {
        credit: { percentUsed: 1 },
        credit_freetrial: { percentUsed: 0 },
      },
    },
    {
      resolveMinRemainingPercent: () => 10,
      isConfiguredCutoff: (window) => window === "credit",
    },
    { connectionId: "pf-trial-17879" }
  );
  assert.equal(decision.proceed, true);
});

test("#17879 global preflight enable counts as a configured policy after a success", async () => {
  const { buildAutoQuotaThresholds } =
    await import("../../open-sse/services/combo/quotaExhaustionCutoff.ts");
  quotaCache.markQuotaHealthy("pf-global-17879");
  const decision = evaluateQuotaCutoff(
    {
      used: 99,
      total: 100,
      percentUsed: 0.99,
      windows: { weekly: { percentUsed: 0.99, resetAt: FAR_RESET } },
    },
    buildAutoQuotaThresholds("openai", undefined, {
      quotaPreflight: { enabled: true, defaultThresholdPercent: 2 },
    } as Parameters<typeof buildAutoQuotaThresholds>[2]),
    { connectionId: "pf-global-17879" }
  );
  assert.equal(decision.proceed, false, "default 2% cutoff is enforced when preflight is enabled");
});

test("#17879 codex window aliases resolve a configured base-window override", async () => {
  const { buildAutoQuotaThresholds } =
    await import("../../open-sse/services/combo/quotaExhaustionCutoff.ts");
  const thresholds = buildAutoQuotaThresholds(
    "codex",
    { quotaWindowThresholds: { session: 10 } },
    null
  );
  assert.equal(thresholds.isConfiguredCutoff?.("session (5h)"), true);
  assert.equal(thresholds.resolveMinRemainingPercent("session (5h)"), 10);
});

test("#17879 a reset window is not treated as a current cutoff reading", () => {
  quotaCache.markQuotaHealthy("pf-reset-17879");
  const decision = evaluateQuotaCutoff(
    {
      used: 100,
      total: 100,
      percentUsed: 1,
      windows: { weekly: { percentUsed: 1, resetAt: new Date(Date.now() - 60_000).toISOString() } },
    },
    { resolveMinRemainingPercent: () => 10, isConfiguredCutoff: () => true },
    { connectionId: "pf-reset-17879" }
  );
  assert.equal(decision.proceed, true);
});

test("#14359 an unconfigured exhaustion hint still yields to a recent success", () => {
  quotaCache.__clearForTests();
  quotaCache.markQuotaHealthy("pf-recovery-14359");
  const decision = evaluateQuotaCutoff(exhaustedQuota, undefined, {
    provider: "qwen-cloud-token-plan",
    connectionId: "pf-recovery-14359",
  });
  assert.equal(decision.proceed, true);
});
