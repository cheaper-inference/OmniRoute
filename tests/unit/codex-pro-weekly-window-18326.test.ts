import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Refs #18326. Synthetic validation-plan fixtures, not a captured reporter response.
const home = fs.mkdtempSync(path.join(os.tmpdir(), "codex-issue-18326-"));
process.env.HOME = home;
process.env.DATA_DIR = path.join(home, "data");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";

const { fetchCodexQuota, unregisterCodexConnection } =
  await import("../../open-sse/services/codexQuotaFetcher.ts");
const { getCodexUsage } = await import("../../open-sse/services/usage/codex.ts");
const { buildCodexUsageQuotas } = await import("../../open-sse/services/codexUsageQuotas.ts");
const { projectCodexAccountPool } = await import("../../open-sse/services/codexAccount/index.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const ids = new Set<string>();
const resetSeconds = Math.floor(Date.now() / 1000) + 600;
const resetAt = new Date(resetSeconds * 1000).toISOString();
const window = (used: number, seconds?: number) => ({
  used_percent: used,
  ...(seconds === undefined ? {} : { limit_window_seconds: seconds }),
  reset_at: resetSeconds,
});
const connection = {
  id: "issue-18326-pool",
  provider: "codex",
  providerSpecificData: {
    codexLimitPolicy: { use5h: false, useWeekly: true },
    allowPaidCredits: false,
  },
};

test.after(() => {
  for (const id of ids) unregisterCodexConnection(id);
  resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true });
});

for (const fixture of [
  {
    name: "Pro weekly-only primary",
    body: { plan_type: "pro", rate_limit: { primary_window: window(94, 604800) } },
    session: null,
    weekly: 94,
  },
  {
    name: "Pro weekly-only camelCase",
    body: {
      planType: "pro",
      rateLimit: {
        primaryWindow: { usedPercent: 94, windowSeconds: "604800", resetAt: resetSeconds },
      },
    },
    session: null,
    weekly: 94,
  },
  {
    name: "Plus dual-window control",
    body: {
      plan_type: "plus",
      rate_limit: {
        primary_window: window(20, 18000),
        secondary_window: window(94, 604800),
      },
    },
    session: 20,
    weekly: 94,
  },
  {
    name: "Pro reversed dual-window control",
    body: {
      plan_type: "pro",
      rate_limit: {
        primary_window: window(94, 604800),
        secondary_window: window(20, 18000),
      },
    },
    session: 20,
    weekly: 94,
  },
]) {
  test(`#18326 ${fixture.name}: fetcher, usage badge and account pool agree`, async (t) => {
    let requests = 0;
    t.mock.method(globalThis, "fetch", async (input: string) => {
      assert.equal(input, "https://chatgpt.com/backend-api/wham/usage");
      requests += 1;
      return Response.json(fixture.body);
    });
    const id = `issue-18326-${ids.size}`;
    ids.add(id);
    const routing = await fetchCodexQuota(id, {
      accessToken: "synthetic-offline-token",
      providerSpecificData: connection.providerSpecificData,
    });
    const usage = await getCodexUsage("synthetic-offline-token", connection.providerSpecificData);
    assert.ok(routing);
    assert.ok("quotas" in usage && usage.quotas);
    assert.equal(requests, 2, "both public fetch paths exercised the synthetic response");
    assert.equal(usage.plan, routing.plan);
    const pool = projectCodexAccountPool(connection, Date.now(), {
      quotas: usage.quotas,
      fetchedAt: new Date().toISOString(),
    });
    const normal = pool.children.find((child) => child.key.scope === "codex");
    assert.ok(normal);
    for (const [key, slot, expected] of [
      ["session", "5h", fixture.session],
      ["weekly", "7d", fixture.weekly],
    ] as const) {
      const badge = usage.quotas[key];
      const projected = normal.quota.windows[slot];
      if (expected === null) {
        assert.equal(badge, undefined, "missing 5h quota must not become a usage badge");
        assert.equal(projected, null, "missing 5h quota must remain absent in the pool");
        assert.equal(routing.windows?.[key], undefined);
        assert.equal(routing.window5h, undefined);
      } else {
        assert.equal(badge?.used, expected);
        assert.equal(badge?.total, 100);
        assert.equal(badge?.resetAt, resetAt);
        assert.equal(projected?.usedPercentage, expected);
        assert.equal(projected?.resetAt, badge.resetAt);
        assert.equal(routing.windows?.[key]?.percentUsed, expected / 100);
      }
    }
  });
}

for (const seconds of [undefined, 3600]) {
  test(`#18326 duration ${seconds}: Pro plan alone cannot manufacture a 5h or 7d slot`, async (t) => {
    const body = { plan_type: "pro", rate_limit: { primary_window: window(94, seconds) } };
    t.mock.method(globalThis, "fetch", async () => Response.json(body));
    const id = `issue-18326-${ids.size}`;
    ids.add(id);
    const routing = await fetchCodexQuota(id, { accessToken: "synthetic-offline-token" });
    assert.ok(routing);
    assert.equal(routing.percentUsed, 0.94, "unknown duration must retain measured usage");
    assert.equal(routing.window5h, undefined);
    assert.equal(routing.window7d, undefined);
    const { quotas } = buildCodexUsageQuotas(body);
    assert.equal(quotas.unknown_primary?.used, 94);
    assert.equal(quotas.session, undefined);
    assert.equal(quotas.weekly, undefined);
    const pool = projectCodexAccountPool(connection, Date.now(), {
      quotas,
      fetchedAt: new Date().toISOString(),
    });
    for (const child of pool.children) {
      assert.equal(child.quota.windows["5h"], null);
      assert.equal(child.quota.windows["7d"], null);
    }
  });
}

test("#18326 Spark weekly evidence does not replace the normal account's weekly usage", () => {
  const { quotas } = buildCodexUsageQuotas({
    plan_type: "pro",
    rate_limit: { primary_window: window(12, 604800) },
    additional_rate_limits: [
      {
        limit_id: "codex_bengalfox",
        rate_limit: { primary_window: window(94, 604800) },
      },
    ],
  });
  const pool = projectCodexAccountPool(connection, Date.now(), {
    quotas,
    fetchedAt: new Date().toISOString(),
  });
  const normal = pool.children.find((child) => child.key.scope === "codex");
  const spark = pool.children.find((child) => child.key.scope === "spark");
  assert.equal(normal?.quota.windows["7d"]?.usedPercentage, 12);
  assert.equal(spark?.quota.windows["7d"]?.usedPercentage, 94);
  assert.equal(normal?.quota.windows["5h"], null);
  assert.equal(spark?.quota.windows["5h"], null);
});
