import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { ProviderLimitsCacheEntry } from "../../src/lib/db/providerLimits.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-quota-display-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const limits = await import("../../src/lib/db/providerLimits.ts");
const usage = await import("../../src/lib/usage/providerLimits.ts");

const oldTime = "2026-01-01T00:00:00.000Z";
const newTime = "2026-01-01T00:01:00.000Z";
const newerTime = "2026-01-01T00:02:00.000Z";
const resetAt = "2030-01-01T00:00:00.000Z";
const row = (remainingPercentage: number) => ({ remainingPercentage, resetAt });
const cache = () => ({
  quotas: { session: row(90), weekly: row(80), reserve_weekly: row(40) },
  plan: "pro",
  paidCredits: { hasCredits: true, unlimited: false, overageLimitReached: false, balance: 12 },
  message: null,
  fetchedAt: oldTime,
  source: "scheduled",
});

async function account(provider = "codex") {
  return providers.createProviderConnection({
    provider,
    accessToken: "synthetic-access-token",
    providerSpecificData: { privateMarker: "must-not-reach-browser" },
    isActive: true,
  });
}

async function observe(id: string, scope: "codex" | "spark", quotaState: Record<string, unknown>) {
  return providers.updateCodexScopedQuotaState(id, scope, { quotaState });
}

function windows(entry: ProviderLimitsCacheEntry) {
  return entry.quotas as Record<string, Record<string, unknown>>;
}

test.beforeEach((t) => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  t.mock.method(globalThis, "fetch", () => {
    throw new Error("A cached quota read must not make an upstream call");
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("cached display reads reflect accepted response evidence without a live usage fetch", async () => {
  const connection = await account();
  limits.setProviderLimitsCache(connection.id, cache());
  await observe(connection.id, "codex", {
    usage5h: 75,
    limit5h: 100,
    resetAt5h: resetAt,
    observedAt: newTime,
  });
  const entry = (await usage.getSanitizedCachedProviderLimitsMap())[connection.id];
  assert.equal(windows(entry).session.remainingPercentage, 25);
  assert.equal(windows(entry).weekly.remainingPercentage, 80);
  assert.equal(windows(entry).reserve_weekly.remainingPercentage, 40);
  assert.equal(entry.plan, "pro");
  assert.equal(entry.paidCredits?.balance, 12);
  assert.equal(entry.fetchedAt, newTime);
  assert.equal(
    windows(limits.getProviderLimitsCache(connection.id)!).session.remainingPercentage,
    25
  );
  assert.ok(!JSON.stringify(entry).includes("synthetic-access-token"));
  assert.ok(!JSON.stringify(entry).includes("must-not-reach-browser"));
});

test("the existing HTTP response consumer feeds the same cached display without a second fetch", async () => {
  const { persistCodexChildQuotaResponse } =
    await import("../../open-sse/services/codexAccount/quota.ts");
  const connection = await account();
  const persisted = await persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.5",
    headers: {
      "x-codex-5h-usage": "75",
      "x-codex-5h-limit": "100",
      "x-codex-5h-reset-at": resetAt,
    },
    status: 200,
  });
  assert.ok(persisted);
  const entry = (await usage.getSanitizedCachedProviderLimitsMap())[connection.id];
  assert.ok(entry);
  assert.equal(windows(entry).session.remainingPercentage, 25);
  assert.equal(windows(entry).weekly, undefined);
});

test("a session-only HTTP response preserves an already observed weekly window", async () => {
  const { persistCodexChildQuotaResponse } =
    await import("../../open-sse/services/codexAccount/quota.ts");
  const connection = await account();
  await observe(connection.id, "codex", {
    usage7d: 70,
    limit7d: 100,
    resetAt7d: resetAt,
    observedAt: oldTime,
  });
  await persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.5",
    status: 200,
    headers: { "x-codex-5h-usage": "75", "x-codex-5h-limit": "100" },
  });
  const entry = limits.getProviderLimitsCache(connection.id)!;
  assert.equal(windows(entry).session.remainingPercentage, 25);
  assert.equal(windows(entry).weekly.remainingPercentage, 30);
  assert.equal(windows(entry).weekly.resetAt, resetAt);
});

test("response evidence creates a display entry even before the first scheduled usage sync", async () => {
  const connection = await account();
  await observe(connection.id, "codex", {
    usage5h: 0,
    limit5h: 100,
    resetAt5h: resetAt,
    observedAt: newTime,
  });
  const entry = (await usage.getSanitizedCachedProviderLimitsMap())[connection.id];
  assert.ok(entry);
  assert.equal(windows(entry).session.remainingPercentage, 100);
  assert.equal(windows(entry).weekly, undefined, "unknown is not fabricated health");
  assert.equal(entry.fetchedAt, newTime);
});

test("Codex and Spark observations cannot overwrite one another", async () => {
  const connection = await account();
  limits.setProviderLimitsCache(connection.id, cache());
  await observe(connection.id, "spark", {
    usage5h: 100,
    limit5h: 100,
    resetAt5h: resetAt,
    observedAt: newTime,
  });
  const entry = limits.getProviderLimitsCache(connection.id)!;
  assert.equal(windows(entry).session.remainingPercentage, 90);
  assert.equal(windows(entry).gpt_5_3_codex_spark_session.remainingPercentage, 0);
  assert.equal(windows(entry).gpt_5_3_codex_spark_weekly, undefined);
});

test("a late older observation cannot replace newer quota or clear its cooldown", async () => {
  const connection = await account();
  await providers.updateCodexScopedQuotaState(connection.id, "codex", {
    quotaState: { usage5h: 100, limit5h: 100, observedAt: newerTime },
    rateLimitedUntil: resetAt,
    rateLimitSource: "quota_reset",
  });
  await providers.updateCodexScopedQuotaState(connection.id, "codex", {
    quotaState: { usage5h: 10, limit5h: 100, observedAt: newTime },
    rateLimitedUntil: null,
  });
  const saved = await providers.getProviderConnectionById(connection.id);
  assert.equal(saved!.providerSpecificData.codexScopeRateLimitedUntil.codex, resetAt);
  assert.equal(
    windows(limits.getProviderLimitsCache(connection.id)!).session.remainingPercentage,
    0
  );
});

test("sparse evidence keeps each window's original observation time", async () => {
  const connection = await account();
  await observe(connection.id, "codex", {
    usage5h: 20,
    limit5h: 100,
    usage7d: 70,
    limit7d: 100,
    observedAt: oldTime,
  });
  await observe(connection.id, "codex", {
    usage5h: 40,
    limit5h: 100,
    observedAt: newerTime,
  });
  limits.setProviderLimitsCache(connection.id, { ...cache(), fetchedAt: newTime });
  const entry = limits.getProviderLimitsCache(connection.id)!;
  assert.equal(windows(entry).session.remainingPercentage, 60);
  assert.equal(
    windows(entry).weekly.remainingPercentage,
    80,
    "an unchanged older weekly observation must not outrank a newer usage snapshot"
  );
  limits.deleteProviderLimitsCache(connection.id);
  const withoutPoll = limits.getProviderLimitsCache(connection.id)!;
  assert.equal(
    windows(withoutPoll).weekly.remainingPercentage,
    30,
    "the prior weekly observation survives a session-only update"
  );
});

test("normalized percentage signals are displayed without inventing token counts", async () => {
  const connection = await account();
  await observe(connection.id, "codex", {
    observedAt: newTime,
    quotaSignal: {
      scope: "codex",
      limitId: "codex",
      windows: [
        { id: "primary", percentUsed: 0.75, windowSeconds: 18000, resetAt },
        { id: "secondary", percentUsed: 0.5, windowSeconds: 604800, resetAt },
      ],
    },
  });
  const entry = limits.getProviderLimitsCache(connection.id)!;
  assert.ok(entry);
  assert.equal(windows(entry).session.remainingPercentage, 25);
  assert.equal(windows(entry).weekly.remainingPercentage, 50);
  assert.equal(windows(entry).session.total, 0);
  assert.equal(windows(entry).session.used, 0);
});

test("malformed and unknown-duration evidence does not create zero/healthy windows", async () => {
  const connection = await account();
  await observe(connection.id, "codex", {
    observedAt: newTime,
    usage5h: 0,
    limit5h: null,
    quotaSignal: {
      scope: "codex",
      windows: [
        { id: "primary", percentUsed: 0.2, windowSeconds: null },
        { id: "secondary", percentUsed: 2, windowSeconds: 604800 },
      ],
    },
  });
  assert.equal(limits.getProviderLimitsCache(connection.id), null);
  assert.deepEqual(await usage.getSanitizedCachedProviderLimitsMap(), {});
});

test("an accepted usage refresh advances only the windows it actually observed", async () => {
  const recovery = await import("../../src/lib/db/providers/codexAccountRecovery.ts");
  const connection = await account();
  await observe(connection.id, "codex", {
    usage5h: 20,
    limit5h: 100,
    usage7d: 70,
    limit7d: 100,
    observedAt: oldTime,
  });
  const before = await providers.getProviderConnectionById(connection.id);
  await recovery.syncCodexQuotaObservation(
    connection.id,
    {
      quotas: { session: { used: 40, total: 100 } },
    },
    before!.providerSpecificData
  );
  const saved = await providers.getProviderConnectionById(connection.id);
  const state = saved!.providerSpecificData.codexQuotaStateByScope.codex;
  assert.equal(state.observedAtByWindow["5h"], state.observedAt);
  assert.equal(state.observedAtByWindow["7d"], oldTime);
  assert.equal(
    windows(limits.getProviderLimitsCache(connection.id)!).session.remainingPercentage,
    60
  );
});

test("usage refresh supersedes percentage-only evidence without restamping a sibling", async () => {
  const recovery = await import("../../src/lib/db/providers/codexAccountRecovery.ts");
  const connection = await account();
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: {
      codexQuotaStateByScope: {
        codex: {
          observedAt: oldTime,
          quotaSignal: {
            scope: "codex",
            windows: [
              { id: "primary", windowSeconds: 18000, percentUsed: 0.2 },
              { id: "secondary", windowSeconds: 604800, percentUsed: 0.7 },
            ],
          },
        },
      },
    },
  });
  const before = await providers.getProviderConnectionById(connection.id);
  await recovery.syncCodexQuotaObservation(
    connection.id,
    {
      quotas: { session: { used: 40, total: 100 } },
    },
    before!.providerSpecificData
  );
  const entry = limits.getProviderLimitsCache(connection.id)!;
  assert.equal(windows(entry).session.remainingPercentage, 60);
  assert.equal(windows(entry).weekly.remainingPercentage, 30);
  assert.equal(windows(entry).weekly.observedAt, oldTime);
});

test("re-reading caches never refreshes the observation timestamp", async () => {
  const connection = await account();
  await observe(connection.id, "codex", {
    usage5h: 50,
    limit5h: 100,
    observedAt: oldTime,
  });
  const first = limits.getProviderLimitsCache(connection.id);
  assert.ok(first);
  assert.equal(first.fetchedAt, oldTime);
  assert.deepEqual(limits.getAllProviderLimitsCache()[connection.id], first);
});

test("newer usage snapshots and non-Codex entries retain their values", async () => {
  const connection = await account();
  await observe(connection.id, "codex", {
    usage5h: 100,
    limit5h: 100,
    observedAt: oldTime,
  });
  const entry = { ...cache(), fetchedAt: newerTime };
  limits.setProviderLimitsCache(connection.id, entry);
  assert.equal(
    windows(limits.getProviderLimitsCache(connection.id)!).session.remainingPercentage,
    90
  );
  const other = await account("openai");
  limits.setProviderLimitsCache(other.id, entry);
  assert.deepEqual(
    limits.getAllProviderLimitsCache()[other.id],
    limits.getProviderLimitsCache(other.id)
  );
});
