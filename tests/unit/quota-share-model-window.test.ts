import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qs-model-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const buckets = await import("../../src/lib/quota/accountBuckets.ts");
const satMod = await import("../../src/lib/quota/saturationSignals.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");
const { selectQuotaShareTarget, _clearDrrStateForTest } =
  await import("../../open-sse/services/combo/quotaShareStrategy.ts");
const { applyStrategyOrdering } =
  await import("../../open-sse/services/combo/applyStrategyOrdering.ts");
const { _clearInflightForTest } =
  await import("../../open-sse/services/combo/quotaShareInflight.ts");

const FABLE = "claude/claude-fable-5-1";
const SONNET = "claude/claude-sonnet-5";
const HOUR = 3_600_000;
const iso = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();
const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

/** An /api/oauth/usage body: account windows with headroom, plus one optional Fable window. */
function usagePayload(scoped: Record<string, unknown> | null): Record<string, unknown> {
  const week = iso(72 * HOUR);
  const fable = {
    kind: "weekly_scoped",
    resetsAt: week,
    scope: { model: { id: "claude-fable-5-1", display_name: "Fable" } },
  };
  return {
    five_hour: { utilization: 10, resets_at: iso(2 * HOUR) },
    seven_day: { utilization: 20, resets_at: week },
    limits: [
      { kind: "session", percent: 10, resetsAt: iso(2 * HOUR), isActive: false },
      { kind: "weekly_all", percent: 20, resetsAt: week, isActive: false },
      ...(scoped ? [{ ...fable, ...scoped }] : []),
    ],
  };
}

function target(connectionId: string, modelStr: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${connectionId}`,
    executionKey: `ek-${connectionId}`,
    modelStr,
    provider: "claude",
    providerId: "claude",
    connectionId,
    weight: 100,
    label: null,
  };
}

/** The same reading into both stores, as getClaudeUsage hands it to their feeders. */
function feedBoth(connectionId: string, scoped: Record<string, unknown> | null): void {
  const reading = normalizeClaudeUsageQuotas(usagePayload(scoped));
  quotaCache.setQuotaCache(connectionId, "claude", reading.quotas, reading.modelQuotas);
  buckets.updateAccountBuckets(connectionId, reading as never, Date.now());
}

/** True when ordering sent `connectionId` behind the clean account. */
function demoted(connectionId: string, model: string, combo: string): boolean {
  const result = selectQuotaShareTarget(
    [target(connectionId, model), target("clean", model)],
    combo,
    Date.now()
  );
  result.decrementInflight(); // keep in-flight load out of the next draw (P2C)
  const ordered = result.orderedTargets.map((t) => t.connectionId);
  return ordered[0] === "clean" && ordered[1] === connectionId;
}

test.beforeEach(() => {
  buckets._clearBucketsForTest();
  quotaCache.__clearForTests();
  _clearDrrStateForTest();
  _clearInflightForTest();
});

test.after(() => {
  satMod.__setAnthropicSaturationDepsForTests(null);
  satMod._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const CRITICAL = { isActive: true, severity: "critical" };
const CASES: Array<[string, Record<string, unknown> | null, boolean]> = [
  ["active, critical, 100% used", { percent: 100, ...CRITICAL }, true],
  ["active, critical, no percentage reported", { ...CRITICAL }, true],
  ["active, no severity, 100% used", { percent: 100, isActive: true }, true],
  ["active, critical, quota left (warning)", { percent: 80, ...CRITICAL }, false],
  ["100% used but not active", { percent: 100, isActive: false }, false],
  [
    "active with a non-critical severity",
    { percent: 100, isActive: true, severity: "warning" },
    false,
  ],
  ["window already reset", { percent: 100, ...CRITICAL, resetsAt: iso(-HOUR) }, false],
  ["no reset time", { percent: 100, ...CRITICAL, resetsAt: null }, false],
  ["no model window reported", null, false],
];

for (const [index, [label, scoped, fableExhausted]] of CASES.entries()) {
  test(`ordering and credential selection agree: ${label}`, () => {
    const conn = `agree-${index}`;
    feedBoth(conn, scoped);
    for (const model of [FABLE, SONNET]) {
      const refused = quotaCache.isQuotaExhaustedForRequest(conn, "claude", model);
      assert.equal(refused, model === FABLE && fableExhausted, `${model}: selection`);
      assert.equal(demoted(conn, model, `combo-${index}-${model}`), refused, `${model}: ordering`);
    }
  });
}

test("a selection-time override accepts the account; ordering still ranks it last", () => {
  feedBoth("agree-extra", { percent: 100, ...CRITICAL });
  const optedIn = { blockExtraUsage: false };
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("agree-extra", "claude", FABLE, optedIn),
    false
  );
  assert.equal(demoted("agree-extra", FABLE, "combo-extra"), true, "ranked last, never dropped");
});

test("a usage read with an exhausted model window sends that account last for that model only", async () => {
  const payloads: Record<string, Record<string, unknown>> = {
    "qs-a": usagePayload({ percent: 100, ...CRITICAL }),
    "qs-b": usagePayload(null),
  };
  satMod.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id) => ({ id, provider: "claude", authType: "oauth", accessToken: "t" }),
    fetchUsage: async (conn) => ({
      ...normalizeClaudeUsageQuotas(payloads[String(conn.id)]),
      bootstrap: null,
    }),
  });
  for (const id of ["qs-a", "qs-b"]) {
    await satMod.getSaturation(id, "claude", { unit: "percent", window: "5h" });
  }

  const order = async (model: string) => {
    const name = `qtSd/pool/${model}`; // the virtual name the client sends
    const { orderedTargets, quotaShareRelease } = await applyStrategyOrdering(
      "quota-share",
      [target("qs-a", model), target("qs-b", model)],
      {
        combo: { id: name, name, models: [] },
        config: {},
        body: { model: name },
        log: noopLog,
        apiKeyAllowedConnections: null,
      } as never
    );
    quotaShareRelease?.();
    return orderedTargets.map((t) => t.connectionId);
  };
  assert.deepEqual(await order(FABLE), ["qs-b", "qs-a"], "exhausted model window goes last");
  assert.deepEqual(await order(SONNET), ["qs-a", "qs-b"], "another model keeps its place");
});
