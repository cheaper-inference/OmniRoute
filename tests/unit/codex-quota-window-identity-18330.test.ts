import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const isolatedHome = fs.mkdtempSync(path.join(os.tmpdir(), "codex-weekly-18330-"));
process.env.HOME = isolatedHome;
process.env.DATA_DIR = path.join(isolatedHome, "data");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";

const { fetchCodexQuota, unregisterCodexConnection } =
  await import("../../open-sse/services/codexQuotaFetcher.ts");
const { evaluateQuotaCutoff, preflightQuota, registerQuotaFetcher } =
  await import("../../open-sse/services/quotaPreflight.ts");
const { buildCodexUsageQuotas } = await import("../../open-sse/services/codexUsageQuotas.ts");
const { parseCodexQuotaHeaders } = await import("../../open-sse/executors/codex/quota.ts");
const { projectCodexAccountPool } = await import("../../open-sse/services/codexAccount/index.ts");
const { markQuotaHealthy } = await import("../../src/domain/quotaCacheState.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const originalFetch = globalThis.fetch;
const ids = new Set<string>();
const thresholds = {
  resolveMinRemainingPercent: (name: string | null) => (name === "weekly" ? 10 : 0),
  isConfiguredCutoff: (name: string | null) => name === "weekly",
};
const window = (used: number, seconds?: number) => ({
  used_percent: used,
  ...(seconds ? { limit_window_seconds: seconds } : {}),
  reset_after_seconds: 600,
});
async function readQuota(rate_limit: unknown, requestedModel?: string) {
  const id = `identity-${ids.size}`;
  ids.add(id);
  globalThis.fetch = async () => Response.json({ rate_limit });
  const connection = { accessToken: "offline-fixture", providerSpecificData: {}, requestedModel };
  const quota = await fetchCodexQuota(id, connection);
  assert.ok(quota);
  return { id, quota, connection };
}
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  for (const id of ids) unregisterCodexConnection(id);
  resetDbInstance();
  fs.rmSync(isolatedHome, { recursive: true, force: true });
});

for (const used of [94, 90, 85]) {
  test(`weekly-only primary ${used}% enforces weekly cutoff after recent success`, async () => {
    const { id, quota } = await readQuota({ primary_window: window(used, 604800) });
    markQuotaHealthy(id);
    assert.equal(
      evaluateQuotaCutoff(quota, thresholds, { provider: "codex", connectionId: id }).proceed,
      used < 90
    );
    assert.equal(quota.windows?.weekly?.percentUsed, used / 100);
    assert.equal(quota.windows?.session, undefined);
    assert.equal(quota.window5h, undefined);
    assert.equal(quota.window7d?.percentUsed, used / 100);
  });
}
test("reversed windows preserve their duration identity", async () => {
  const { quota } = await readQuota({
    primary_window: window(94, 604800),
    secondary_window: window(20, 18000),
  });
  assert.equal(quota.windows?.weekly?.percentUsed, 0.94);
  assert.equal(quota.windows?.session?.percentUsed, 0.2);
  assert.equal(quota.window5h?.percentUsed, 0.2);
  assert.equal(quota.window7d?.percentUsed, 0.94);
});
for (const duration of [undefined, 3600]) {
  test(`unknown or unsupported duration ${duration} does not fabricate fixed windows`, async () => {
    const { quota } = await readQuota({ primary_window: window(100, duration) });
    assert.equal(quota.window5h, undefined);
    assert.equal(quota.window7d, undefined);
    assert.equal(quota.windows?.session, undefined);
    assert.equal(quota.windows?.weekly, undefined);
    assert.equal(quota.percentUsed, 1, "unknown duration keeps valid exhaustion evidence");
  });
}
test("weekly usage badge and account pool agree without a synthetic 5h row", () => {
  const { quotas } = buildCodexUsageQuotas({ rate_limit: { primary_window: window(94, 604800) } });
  assert.equal(quotas.weekly?.used, 94);
  assert.equal(quotas.session, undefined);
  const pool = projectCodexAccountPool(
    { id: "offline-pool", provider: "codex", providerSpecificData: {} },
    Date.now(),
    { quotas, fetchedAt: new Date().toISOString() }
  );
  const child = pool.children.find((child) => child.key.scope === "codex");
  assert.equal(child?.quota.windows["7d"]?.usedPercentage, 94);
  assert.equal(child?.quota.windows["5h"], null);
});
for (const enabled of [false, true]) {
  test(`explicit weekly cutoff is evaluated when preflight runs with legacy flag ${enabled}`, async () => {
    const { id, quota, connection } = await readQuota({ primary_window: window(94, 604800) });
    registerQuotaFetcher("codex", async () => quota);
    const result = await preflightQuota(
      "codex",
      id,
      { ...connection, providerSpecificData: { quotaPreflightEnabled: enabled } },
      thresholds
    );
    assert.equal(result.proceed, false);
    assert.equal(result.windowName, "weekly");
  });
}

for (const minutes of [undefined, "60", "bad"]) {
  test(`official headers with duration ${minutes} do not fabricate 5h/7d`, () => {
    const headers: Record<string, string> = { "x-codex-primary-used-percent": "94" };
    if (minutes !== undefined) headers["x-codex-primary-window-minutes"] = minutes;
    assert.equal(parseCodexQuotaHeaders(headers), null);
  });
}
test("alternate duration keys preserve weekly classification and Spark scope", async () => {
  globalThis.fetch = async () =>
    Response.json({
      rateLimit: { primaryWindow: { usedPercent: 20, windowSeconds: 18000 } },
      additionalRateLimits: [
        {
          limitId: "codex_bengalfox",
          rateLimit: {
            primaryWindow: { usedPercent: 94, windowSeconds: "604800", resetAfterSeconds: 600 },
          },
        },
      ],
    });
  const id = "identity-spark-alias";
  ids.add(id);
  const quota = await fetchCodexQuota(id, {
    accessToken: "offline",
    requestedModel: "gpt-5.3-codex-spark",
  });
  assert.equal(quota?.windows?.gpt_5_3_codex_spark_weekly?.percentUsed, 0.94);
  assert.equal(quota?.windows?.gpt_5_3_codex_spark_session, undefined);
  assert.equal(quota?.windows?.session, undefined);
  const display = buildCodexUsageQuotas({
    additionalRateLimits: [
      {
        limitId: "codex_bengalfox",
        rateLimit: { primaryWindow: { usedPercent: 94, windowSeconds: "604800" } },
      },
    ],
  }).quotas;
  assert.equal(display.gpt_5_3_codex_spark_weekly?.used, 94);
});

for (const duration of [undefined, 3600]) {
  test(`unknown usage duration ${duration} cannot hydrate the pool 5h or weekly slots`, () => {
    const { quotas } = buildCodexUsageQuotas({
      rate_limit: { primary_window: window(94, duration) },
    });
    assert.equal(quotas.session, undefined);
    assert.equal(quotas.weekly, undefined);
    assert.equal(quotas.unknown_primary.used, 94);
    const pool = projectCodexAccountPool(
      { id: "offline-unknown", provider: "codex", providerSpecificData: {} },
      Date.now(),
      { quotas, fetchedAt: new Date().toISOString() }
    );
    for (const child of pool.children) {
      assert.equal(child.quota.windows["5h"], null);
      assert.equal(child.quota.windows["7d"], null);
    }
  });
}
test("equal usage keeps the weekly dominant reset for reversed windows", async () => {
  const resetWeekly = Math.floor(Date.now() / 1000) + 5000;
  const { quota } = await readQuota({
    primary_window: { ...window(90, 604800), reset_at: resetWeekly },
    secondary_window: window(90, 18000),
  });
  assert.equal(quota.resetAt, new Date(resetWeekly * 1000).toISOString());
});

test("public cooldown and scoring consumers tolerate absent fixed windows", async () => {
  const { getCodexQuotaCooldownMs } = await import("../../open-sse/services/codexQuotaFetcher.ts");
  const { resolveQuotaWindowByName, resolveResetAwareConfig } =
    await import("../../open-sse/services/combo/quotaScoring.ts");
  const { scoreQuotaPace } = await import("../../open-sse/services/combo/quotaPaceScoring.ts");
  const { quota } = await readQuota({ primary_window: window(100) });
  assert.equal(
    getCodexQuotaCooldownMs(quota),
    0,
    "no fixed-window cooldown is invented for an unknown duration"
  );
  assert.equal(resolveQuotaWindowByName(quota, "session"), null);
  assert.equal(resolveQuotaWindowByName(quota, "weekly"), null);
  assert.equal(scoreQuotaPace(quota, resolveResetAwareConfig({}), Date.now()).score, 0);
  assert.equal(
    evaluateQuotaCutoff(quota).proceed,
    false,
    "known exhaustion still reaches generic cutoff fallback"
  );
});
