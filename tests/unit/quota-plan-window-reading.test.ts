/**
 * tests/unit/quota-plan-window-reading.test.ts
 *
 * The plan-window reading is the account figure of one provider plan window,
 * read from the same cached usage fetch as getSaturation. It is null whenever
 * getSaturation falls back to another window, the worst case across windows,
 * rate-limit headers or the fail-open 0, so only a figure of the requested
 * window itself can drive the attribution book.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plan-window-reading-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const sat = await import("../../src/lib/quota/saturationSignals.ts");
const { claudePlanReading, codexPlanReading, bailianPlanReading } =
  await import("../../src/lib/quota/planWindowReading.ts");
const { getSaturation, getPlanWindowReading } = sat;

type QuotaWindow = "5h" | "hourly" | "daily" | "weekly" | "monthly";

const AT = 1_800_000_000_000;
const ISO = "2026-11-20T15:00:00.000Z";
const RESET = Date.parse(ISO);
const DIM = { unit: "percent", window: "5h" } as const;

function oauthUsage(fetchUsage: (conn: Record<string, unknown>) => Promise<unknown>): void {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage,
  });
}

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat.__setGenericUsageFetcherForTests(null);
  sat._clearSaturationCache();
  sat._clearRateLimitHeaders();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("claude: the window's own figure and reset time", () => {
  assert.deepEqual(
    claudePlanReading(
      { quotas: { "session (5h)": { used: 60, total: 100, resetAt: ISO } } },
      "5h",
      AT
    ),
    { used: 0.6, resetAt: RESET, fetchedAt: AT }
  );
  assert.deepEqual(
    claudePlanReading(
      { quotas: { "weekly (7d)": { used: 30, total: 100, resetAt: null } } },
      "weekly",
      AT
    ),
    { used: 0.3, resetAt: null, fetchedAt: AT }
  );
});

test("claude: no reading for stale, unreported, missing or borrowed windows", () => {
  const cases: Array<[unknown, QuotaWindow]> = [
    [{ quotas: { "weekly (7d)": { used: 30, total: 100 } } }, "monthly"],
    [{ quotas: { "session (5h)": { used: 60, total: 100 } }, _stale: true }, "5h"],
    [{ quotas: { "session (5h)": { used: 0, total: 100, fractionReported: false } } }, "5h"],
    [{ quotas: {} }, "5h"],
    [{ message: "rate limited" }, "5h"],
    [null, "5h"],
  ];
  for (const [usage, window] of cases) assert.equal(claudePlanReading(usage, window, AT), null);
});

test("codex and bailian: per-window figure, never the worst-case fallback", () => {
  const codex = {
    percentUsed: 0.9,
    windows: {
      session: { percentUsed: 0.42, resetAt: ISO },
      weekly: { percentUsed: 0.9, resetAt: null },
    },
  };
  assert.deepEqual(codexPlanReading(codex, "5h", AT), {
    used: 0.42,
    resetAt: RESET,
    fetchedAt: AT,
  });
  assert.deepEqual(codexPlanReading(codex, "weekly", AT), {
    used: 0.9,
    resetAt: null,
    fetchedAt: AT,
  });
  for (const q of [
    { ...codex, stale: true },
    { percentUsed: 0.9, windows: {} },
    { windows: { session: { percentUsed: NaN, resetAt: null } } },
    null,
  ]) {
    assert.equal(codexPlanReading(q, "5h", AT), null);
  }
  assert.equal(codexPlanReading(codex, "monthly", AT), null);
  assert.equal(
    codexPlanReading({ windows: { session: { percentUsed: 1.4, resetAt: null } } }, "5h", AT)?.used,
    1
  );
  const bailian = {
    percentUsed: 0.7,
    windows: {
      window_5h: { percentUsed: 0.2, resetAt: ISO },
      window_weekly: { percentUsed: 0.5, resetAt: null },
      window_monthly: { percentUsed: 0.7, resetAt: ISO },
    },
  };
  assert.deepEqual(
    (["5h", "weekly", "monthly"] as const).map((w) => bailianPlanReading(bailian, w, AT)?.used),
    [0.2, 0.5, 0.7]
  );
  assert.equal(bailianPlanReading(bailian, "daily", AT), null);
});

test("getSaturation keeps its value and the reading shares the cached fetch", async () => {
  let fetches = 0;
  oauthUsage(
    async () => (fetches++, { quotas: { "session (5h)": { used: 60, total: 100, resetAt: ISO } } })
  );
  const [value, reading] = await Promise.all([
    getSaturation("c1", "claude", DIM),
    getPlanWindowReading("c1", "claude", DIM),
  ]);
  assert.deepEqual([value, reading?.used, reading?.resetAt, fetches], [0.6, 0.6, RESET, 1]);
  assert.deepEqual(await getPlanWindowReading("c1", "claude", DIM), reading); // cached entry, same fetchedAt
  assert.equal(fetches, 1);
});

test("a failed usage read is 0 for getSaturation and no reading", async () => {
  oauthUsage(async () => {
    throw new Error("usage down");
  });
  assert.deepEqual(
    [await getSaturation("c2", "claude", DIM), await getPlanWindowReading("c2", "claude", DIM)],
    [0, null]
  );
});

test("the rate-limit-header fallback is a saturation value, never a reading", async () => {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id) => ({ id, apiKey: "sk", authType: "apikey" }),
    fetchUsage: async () => ({}),
  });
  sat.storeRateLimitHeaders("c3", "anthropic", {
    "anthropic-ratelimit-requests-limit": "100",
    "anthropic-ratelimit-requests-remaining": "10",
  });
  assert.deepEqual(
    [await getSaturation("c3", "claude", DIM), await getPlanWindowReading("c3", "claude", DIM)],
    [0.9, null]
  );
});

test("providers without a plan-window mapping yield no reading", async () => {
  sat._clearSaturationCache();
  sat.__setGenericUsageFetcherForTests(async () => {
    throw new Error("no usage");
  });
  sat.storeRateLimitHeaders("c4", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "250",
  });
  assert.deepEqual(
    [await getSaturation("c4", "openai", DIM), await getPlanWindowReading("c4", "openai", DIM)],
    [0.75, null]
  );
});
