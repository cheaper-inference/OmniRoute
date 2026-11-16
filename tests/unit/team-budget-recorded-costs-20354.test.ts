import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "team-costs-20354-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "synthetic-team-costs-fixture";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.UNPRICED_USAGE_BUDGET_POLICY;
delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const rollup = await import("../../src/lib/usage/aggregateHistory.ts");
const limits = await import("../../src/lib/usage/teamUsageLimits.ts");
const analytics = await import("../../src/lib/db/teamUsageAnalytics.ts");
const pricing = await import("../../src/lib/db/settings/pricing.ts");
const flags = await import("../../src/lib/db/featureFlags.ts");
const cache = await import("../../src/lib/db/readCache.ts");
const shapes = await import("../../src/lib/usage/teamCostShapes.ts");
const migration = await import("../../src/lib/db/jsonMigration.ts");
const now = Date.parse("2026-01-02T18:00:00.000Z");
let sequence = 0;

function clear() {
  core.resetDbInstance();
  keys.resetApiKeyState();
  usage.clearPendingRequests();
  fs.rmSync(dir, { recursive: true, force: true });
}
test.beforeEach(() => {
  clear();
  fs.mkdirSync(dir);
  sequence = 0;
});
test.after(clear);

async function setup() {
  await pricing.updatePricing({ openai: { "synthetic-priced": { input: 1, output: 0 } } });
  const team = teams.createTeam({ name: "Example Team", maxBudgetUsd: 100, budgetDuration: "30d" });
  const a = await keys.createApiKey("a", "synthetic-team-key-a");
  const b = await keys.createApiKey("b", "synthetic-team-key-b");
  for (const key of [a, b])
    teams.assignApiKeyBillingTeam(key.id, team.id, "2026-01-01T00:00:00.000Z");
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ? WHERE id = ?")
    .run("2026-01-31T00:00:00.000Z", team.id);
  return { team, a, b };
}

async function record(
  key: string,
  options: {
    model?: string;
    cost?: number;
    estimate?: number;
    success?: boolean;
    input?: number;
    timestamp?: string;
    unit?: string;
    provider?: string;
  } = {}
) {
  await usage.saveRequestUsage(
    {
      provider: options.provider ?? "openai",
      model: options.model ?? "synthetic-unpriced-20354",
      apiKeyId: key,
      success: options.success ?? true,
      tokens: {
        input: options.input ?? 1000,
        output: 0,
        ...(options.cost !== undefined ? { cost_usd: options.cost } : {}),
      },
      calculatedCostUsd: options.estimate,
      billingUnit: options.unit,
      timestamp:
        options.timestamp ??
        new Date(Date.parse("2026-01-02T12:00:00.000Z") + sequence++ * 1000).toISOString(),
    },
    { deduplicate: false }
  );
}
async function retain() {
  assert.equal((await rollup.rollupUsageHistoryBeforeDate("2026-01-03T00:00:00.000Z")).errors, 0);
  core.getDbInstance().prepare("DELETE FROM usage_history").run();
}

test("an exact recorded charge prices a Team even with no catalogue row", async () => {
  const { team, a } = await setup();
  await record(a.id, { cost: 0.0123 });
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.actualProviderCostUsd, 0.0123);
  assert.equal(status.accountedCostUsd, 0.0123);
  assert.equal(status.estimatedListCostUsd, 0);
  assert.equal(status.hasUnpricedListUsage, true);
  assert.equal(status.hasUnpricedUsage, false);
  assert.equal(status.exceeded, false);
  const report = await analytics.getTeamUsageReport(team.id);
  assert.equal(report.summary.actualProviderCostUsd, 0.0123);
  assert.equal(report.summary.accountedCostUsd, 0.0123);
});

test("reported zero is known, not missing; stored estimates are not labelled actual", async () => {
  const { team, a } = await setup();
  await record(a.id, { cost: 0, estimate: 9 });
  await record(a.id, { estimate: 0.2 });
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.actualProviderCostUsd, 0);
  assert.equal(status.accountedCostUsd, 0.2);
  assert.equal(status.hasUnpricedUsage, false);
  const report = await analytics.getTeamUsageReport(team.id);
  assert.equal(report.summary.actualProviderCostUsd, 0);
  assert.equal(report.summary.accountedCostUsd, 0.2);
});

test("mixed sources never reprice reported/stored amounts or double count tokens", async () => {
  const { team, a, b } = await setup();
  await record(a.id, { model: "synthetic-priced", cost: 0.25, estimate: 7 });
  await record(a.id, { model: "synthetic-priced", estimate: 0.05 });
  await record(b.id, { model: "synthetic-priced", input: 1000 });
  const status = await limits.getTeamUsageLimitStatusForApiKey(b.id, now);
  assert.equal(status?.accountedCostUsd, 0.301);
  assert.equal(status.actualProviderCostUsd, 0.25);
  assert.equal(status.estimatedListCostUsd, 0.003);
  const report = await analytics.getTeamUsageReport(team.id);
  assert.equal(report.summary.accountedCostUsd, 0.301);
  assert.equal(
    report.byApiKey.reduce((sum, row) => sum + row.accountedCostUsd, 0),
    0.301
  );
});

test("unknown prices retain default blocking but produce actionable errors in both envelopes", async () => {
  const { a } = await setup();
  await record(a.id);
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.blockReason, "unpriced_usage");
  assert.equal(status.unpricedUsagePolicy, "fail_closed");
  assert.equal(status.exceeded, true);
  assert.deepEqual(status.unpricedModels, ["openai/synthetic-unpriced-20354"]);
  // Pin the window to wall time only for the actual admission helper.
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ?")
    .run(new Date(Date.now() + 10 * 86400000).toISOString());
  core
    .getDbInstance()
    .prepare("UPDATE usage_history SET timestamp = ?")
    .run(new Date().toISOString());
  for (const route of ["/v1/chat/completions", "/v1/messages"]) {
    const response = await limits.buildTeamUsageLimitPolicyRejection(
      new Request("http://localhost" + route),
      a.id
    );
    assert.equal(response?.status, 400);
    const text = await response.text();
    assert.match(text, /unpriced|no configured price/i);
    assert.match(text, /synthetic-unpriced-20354/);
    assert.doesNotMatch(text, /reached its shared usage quota|window resets/i);
  }
});

test("opt-in availability continues inference while keeping unknown usage visible", async () => {
  const { a } = await setup();
  await record(a.id);
  flags.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.hasUnpricedUsage, true);
  assert.equal(status.unpricedUsagePolicy, "count_as_zero");
  assert.equal(status.accountedCostUsd, 0);
  assert.equal(status.blockReason, null);
  assert.equal(status.exceeded, false);
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ?")
    .run(new Date(Date.now() + 10 * 86400000).toISOString());
  core
    .getDbInstance()
    .prepare("UPDATE usage_history SET timestamp = ?")
    .run(new Date().toISOString());
  for (const route of ["/v1/chat/completions", "/v1/messages"]) {
    assert.equal(
      await limits.buildTeamUsageLimitPolicyRejection(
        new Request("http://localhost" + route),
        a.id
      ),
      null
    );
  }
});

test("invalid explicit policy stays closed even with the legacy availability switch", async () => {
  const { a } = await setup();
  await record(a.id);
  process.env.UNPRICED_USAGE_BUDGET_POLICY = "invalid";
  process.env.USAGE_LIMIT_IGNORE_UNPRICED = "true";
  try {
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.unpricedUsagePolicy, "fail_closed");
    assert.equal(status.blockReason, "unpriced_usage");
  } finally {
    delete process.env.UNPRICED_USAGE_BUDGET_POLICY;
    delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;
  }
});

test("the legacy availability switch also applies to Teams", async () => {
  const { a } = await setup();
  await record(a.id);
  process.env.USAGE_LIMIT_IGNORE_UNPRICED = "true";
  try {
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.unpricedUsagePolicy, "count_as_zero");
    assert.equal(status.exceeded, false);
    assert.equal(status.hasUnpricedUsage, true);
  } finally {
    delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;
  }
});

test("page-based and credit-metered usage without a recorded amount is not token-priced as free", async () => {
  const { a } = await setup();
  await record(a.id, { unit: "page", model: "synthetic-priced", input: 0 });
  await pricing.updatePricing({ kiro: { "synthetic-priced": { input: 1, output: 0 } } });
  await record(a.id, { provider: "kiro", model: "synthetic-priced" });
  for (const retained of [false, true]) {
    if (retained) await retain();
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.hasUnpricedUsage, true);
    assert.equal(status.accountedCostUsd, 0);
    assert.equal(status.blockReason, "unpriced_usage");
  }
});

test("recorded non-token charges survive retention without catalog conversion", async () => {
  const { a } = await setup();
  await record(a.id, { unit: "page", model: "synthetic-priced", input: 0, cost: 0.12 });
  for (const retained of [false, true]) {
    if (retained) await retain();
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.hasUnpricedUsage, false);
    assert.equal(status.actualProviderCostUsd, 0.12);
    assert.equal(status.accountedCostUsd, 0.12);
    assert.equal(status.estimatedListCostUsd, 0);
  }
});

test("catalog edits cannot reprice stored provider charges or calculated snapshots", async () => {
  const { a } = await setup();
  await record(a.id, { model: "synthetic-priced", cost: 0.1 });
  await record(a.id, { model: "synthetic-priced", estimate: 0.2 });
  await record(a.id, { model: "synthetic-priced" });
  await pricing.updatePricing({ openai: { "synthetic-priced": { input: 10, output: 0 } } });
  for (const retained of [false, true]) {
    if (retained) await retain();
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.accountedCostUsd, 0.31);
    assert.equal(status.estimatedListCostUsd, 0.03);
  }
});

test("later recorded costs are retained beside explicitly unknown legacy requests", async () => {
  const { team, a } = await setup();
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO daily_team_usage_summary
    (team_id,api_key_id,provider,model,date,total_requests,successful_requests)
    VALUES (?,?,'openai','synthetic-unpriced-20354','2026-01-02',1,1)`
  ).run(team.id, a.id);
  await record(a.id, { cost: 0.1 });
  await retain();
  await record(a.id, { cost: 0.2 });
  await retain();
  await retain(); // replay must not double count committed source rows
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.accountedCostUsd, 0.3);
  assert.equal(status.actualProviderCostUsd, 0.3);
  assert.equal(status.hasUnpricedUsage, true);
  const report = await analytics.getTeamUsageReport(team.id);
  assert.equal(report.summary.requests, 3);
  assert.equal(report.summary.accountedCostUsd, 0.3);
});

test("extended cost shapes survive history JSON export/import byte for byte", async () => {
  const { team, a } = await setup();
  await record(a.id, { cost: 0.12, estimate: 3, unit: "page" });
  await retain();
  const db = core.getDbInstance();
  const exported = {
    apiKeys: db.prepare("SELECT * FROM api_keys").all(),
    teams: teams.listTeams(),
    apiKeyBillingTeamHistory: teams.listAllApiKeyBillingHistory(),
    dailyTeamUsageSummary: db.prepare("SELECT * FROM daily_team_usage_summary").all(),
  };
  const before = JSON.stringify(exported.dailyTeamUsageSummary);
  db.prepare("DELETE FROM daily_team_usage_summary").run();
  db.prepare("DELETE FROM api_key_billing_team_history").run();
  db.prepare("DELETE FROM teams").run();
  db.prepare("DELETE FROM api_keys").run();
  migration.runJsonMigration(db, exported as never);
  assert.equal(JSON.stringify(db.prepare("SELECT * FROM daily_team_usage_summary").all()), before);
  assert.equal((await analytics.getTeamUsageReport(team.id)).summary.accountedCostUsd, 0.12);
});

test("corrupt retained accounting cannot use the missing-price availability exception", async () => {
  const { a } = await setup();
  await record(a.id, { cost: 0.1 });
  await retain();
  core
    .getDbInstance()
    .prepare("UPDATE daily_team_usage_summary SET successful_token_shapes_json = ?")
    .run("{");
  flags.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.hasPricingFailure, true);
  assert.equal(status.blockReason, "pricing_unavailable");
  assert.equal(status.exceeded, true);
  await record(a.id, { cost: 0.2 });
  await retain();
  const after = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(after?.accountedCostUsd, 0.2);
  assert.equal(after.hasPricingFailure, true);
  assert.equal(after.blockReason, "pricing_unavailable");
});

test("retained imported identities keep their existing case-normalized catalog lookup", async () => {
  const { team, a } = await setup();
  await record(a.id, { model: "synthetic-priced" });
  await retain();
  core
    .getDbInstance()
    .prepare(
      "UPDATE daily_team_usage_summary SET provider='OPENAI', model='SYNTHETIC-PRICED', service_tier=''"
    )
    .run();
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
  assert.equal(status?.accountedCostUsd, 0.001);
  assert.equal(status.hasUnpricedUsage, false);
  assert.equal((await analytics.getTeamUsageReport(team.id)).summary.accountedCostUsd, 0.001);
});

test("an unreadable usage store cannot authorize inference as zero spend", async () => {
  const { a } = await setup();
  flags.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");
  core
    .getDbInstance()
    .prepare("ALTER TABLE usage_history RENAME TO unavailable_usage_history")
    .run();
  await assert.rejects(limits.getTeamUsageLimitStatusForApiKey(a.id, now), /usage_history/);
});

test("billing shape parser rejects malformed costs and counts without treating unknown as zero", () => {
  const shape = "[1,0,0,0,0,0,0.2,null,null]";
  assert.equal(
    shapes.parseBillingShapeCounts(JSON.stringify({ [shape]: 1 }), 1).entries[0].shape
      .providerCostUsd,
    0
  );
  const mixed = shapes.parseBillingShapeCounts(
    JSON.stringify({ legacy_unpriced: 2, [shape]: 1 }),
    3
  );
  assert.equal(mixed.unpricedRequests, 2);
  assert.equal(mixed.entries.length, 1);
  assert.deepEqual(
    shapes.parseShapeCounts(JSON.stringify({ legacy_unpriced: 2, [shape]: 1 }), 3),
    []
  );
  for (const value of [
    null,
    "{",
    "[]",
    "null",
    '{"legacy_unpriced":-1}',
    '{"[1,0,0,0,0,-1,null,null,null]":1}',
    '{"[1,0,0,0,0,null,null,3,null]":1}',
    '{"[1,0,0,0,0]":0.5}',
    '{"[1,0,0,0,0]":2}',
    '{"[1,0,0,0,0]":9007199254740992}',
  ]) {
    assert.equal(shapes.parseBillingShapeCounts(value, 1).unpricedRequests, 1);
  }
});

test("billing maps reject an invalid later entry rather than exposing a priced prefix", () => {
  const first = "[1,0,0,0,0,0.1,null,null,null]";
  for (const tail of [
    { "[2,0,0,0,0]": -1 },
    { bad: 1 },
    { "[2,0,0,0,0]": Number.MAX_SAFE_INTEGER },
  ]) {
    const result = shapes.parseBillingShapeCounts(JSON.stringify({ [first]: 1, ...tail }), 2);
    assert.deepEqual(result.entries, []);
    assert.equal(result.unpricedRequests, 2);
    assert.equal(result.invalid, true);
  }
  const zero = shapes.parseBillingShapeCounts(
    JSON.stringify({ "[1,0,0,0,0]": 0, legacy_invalid: 0 }),
    0
  );
  assert.deepEqual(zero.entries, []);
  assert.equal(zero.unpricedRequests, 0);
  assert.notEqual(zero.invalid, true);
});

test("known cap exhaustion still blocks both keys under availability mode", async () => {
  const { a, b } = await setup();
  flags.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");
  await record(a.id, { cost: 100 });
  await record(b.id);
  for (const key of [a, b]) {
    const status = await limits.getTeamUsageLimitStatusForApiKey(key.id, now);
    assert.equal(status?.blockReason, "cap_exceeded");
    assert.equal(status.accountedCostUsd, 100);
    assert.equal(status.exceeded, true);
  }
});

test("pricing lookup errors are not relaxed by availability mode", async () => {
  const { a } = await setup();
  await record(a.id);
  flags.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");
  const table = await cache.getCachedPricing();
  Object.defineProperty(table, "__synthetic_pricing_failure__", {
    enumerable: true,
    configurable: true,
    get() {
      throw Error("synthetic lookup failure");
    },
  });
  try {
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.hasPricingFailure, true);
    assert.equal(status.blockReason, "pricing_unavailable");
    assert.equal(status.exceeded, true);
  } finally {
    delete table.__synthetic_pricing_failure__;
  }
});

test("retention preserves reported zero, positive charges, estimates and mixed keys", async () => {
  const { team, a, b } = await setup();
  await record(a.id, { cost: 0 });
  await record(a.id, { cost: 0.1 });
  await record(b.id, { estimate: 0.2 });
  await record(b.id, { model: "synthetic-priced" });
  for (const retained of [false, true]) {
    if (retained) await retain();
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, now);
    assert.equal(status?.accountedCostUsd, 0.301);
    assert.equal(status.actualProviderCostUsd, 0.1);
    assert.equal(status.hasUnpricedUsage, false);
    const report = await analytics.getTeamUsageReport(team.id);
    assert.equal(report.summary.accountedCostUsd, 0.301);
    assert.equal(report.summary.actualProviderCostUsd, 0.1);
  }
});

test("failed charges stay in reports but never count toward successful-use enforcement", async () => {
  const { team, a } = await setup();
  await record(a.id, { cost: 0.1 });
  await record(a.id, { cost: 120, success: false });
  for (const retained of [false, true]) {
    if (retained) await retain();
    assert.equal((await limits.getTeamUsageLimitStatusForApiKey(a.id, now))?.accountedCostUsd, 0.1);
    const report = await analytics.getTeamUsageReport(team.id);
    assert.equal(report.summary.accountedCostUsd, 120.1);
    assert.equal(report.summary.actualProviderCostUsd, 120.1);
  }
});

test("costs outside the active window or belonging to a previous Team do not leak", async () => {
  const { a } = await setup();
  await record(a.id, { cost: 120, timestamp: "2025-12-31T12:00:00.000Z" });
  await record(a.id, { cost: 0.1 });
  const other = teams.createTeam({
    name: "Other Example",
    maxBudgetUsd: 100,
    budgetDuration: "30d",
  });
  teams.assignApiKeyBillingTeam(a.id, other.id, "2026-01-02T13:00:00.000Z");
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ? WHERE id = ?")
    .run("2026-01-31T00:00:00.000Z", other.id);
  assert.equal((await limits.getTeamUsageLimitStatusForApiKey(a.id, now))?.accountedCostUsd, 0);
});
