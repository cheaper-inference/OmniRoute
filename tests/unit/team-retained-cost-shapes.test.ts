import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "team-shape-review-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "team-shape-review-fixture";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const rollup = await import("../../src/lib/usage/aggregateHistory.ts");
const limits = await import("../../src/lib/usage/teamUsageLimits.ts");
const analytics = await import("../../src/lib/db/teamUsageAnalytics.ts");
const pricing = await import("../../src/lib/db/settings/pricing.ts");
const shapes = await import("../../src/lib/usage/teamCostShapes.ts");
const migration = await import("../../src/lib/db/jsonMigration.ts");
const at = Date.parse("2026-01-02T18:00:00.000Z");
const cutoff = "2026-01-03T00:00:00.000Z";

function clear() {
  core.resetDbInstance();
  keys.resetApiKeyState();
  usage.clearPendingRequests();
  fs.rmSync(dir, { recursive: true, force: true });
}
test.beforeEach(() => {
  clear();
  fs.mkdirSync(dir);
});
test.after(clear);

async function setup() {
  await pricing.updatePricing({ openai: { "review-shapes": { input: 1, output: 0, cached: 0 } } });
  const team = teams.createTeam({ name: "Review", maxBudgetUsd: 0.00025, budgetDuration: "7d" });
  const a = await keys.createApiKey("a", "shape-review-a");
  const b = await keys.createApiKey("b", "shape-review-b");
  for (const key of [a, b])
    teams.assignApiKeyBillingTeam(key.id, team.id, "2026-01-01T00:00:00.000Z");
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ? WHERE id = ?")
    .run("2026-01-08T00:00:00.000Z", team.id);
  return { team, a, b };
}

async function record(
  key: string,
  input: number,
  success = true,
  provider: string | null = "openai"
) {
  await usage.saveRequestUsage({
    provider,
    model: "review-shapes",
    apiKeyId: key,
    success,
    tokens: { input, output: 0 },
    timestamp: "2026-01-02T12:00:00.000Z",
  });
}

async function retain() {
  assert.equal((await rollup.rollupUsageHistoryBeforeDate(cutoff)).errors, 0);
  core.getDbInstance().prepare("DELETE FROM usage_history").run();
}

test("Team retained budget combines all API keys, not a lexicographic MAX shape map", async () => {
  const { team, a, b } = await setup();
  await record(a.id, 100);
  await record(b.id, 200);
  assert.equal(
    (await limits.getTeamUsageLimitStatusForApiKey(a.id, at))?.estimatedListCostUsd,
    0.0003
  );
  await retain();
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, at);
  assert.equal(status?.estimatedListCostUsd, 0.0003);
  assert.equal(status.hasUnpricedUsage, false);
  assert.equal(status.exceeded, true);
  const report = await analytics.getTeamUsageReport(team.id);
  assert.equal(report.summary.estimatedListCostUsd, 0.0003);
  assert.equal(report.byApiKey.length, 2);
});

test("legacy retained bucket stays unpriced after later exact-shape rollup", async () => {
  const { team, a } = await setup();
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO daily_team_usage_summary
    (team_id,api_key_id,provider,model,date,total_requests,successful_requests,total_input_tokens,successful_input_tokens)
    VALUES (?,?,'openai','review-shapes','2026-01-02',1,1,100,100)`
  ).run(team.id, a.id);
  await record(a.id, 200);
  await retain();
  const row = db
    .prepare(
      "SELECT total_requests,token_shapes_json,successful_token_shapes_json FROM daily_team_usage_summary"
    )
    .get();
  assert.deepEqual(row, {
    total_requests: 2,
    token_shapes_json: null,
    successful_token_shapes_json: null,
  });
  const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, at);
  assert.equal(status?.hasUnpricedUsage, true);
  assert.equal(status.exceeded, true);
  const report = await analytics.getTeamUsageReport(team.id);
  assert.equal(report.summary.requests, 2);
  assert.equal(report.summary.hasUnpricedUsage, true);
});

test("malformed or incomplete imported shape maps cannot claim fully priced", async () => {
  const { team, a } = await setup();
  await record(a.id, 100);
  await record(a.id, 200);
  await retain();
  const db = core.getDbInstance();
  assert.equal((await analytics.getTeamUsageReport(team.id)).summary.requests, 2);
  for (const map of ["{", '{"[100,0,0,0,0]":1}', '{"[100,0,0,0,0]":1,"bad":1}']) {
    db.prepare(
      "UPDATE daily_team_usage_summary SET token_shapes_json=?,successful_token_shapes_json=?"
    ).run(map, map);
    assert.equal((await limits.getTeamUsageLimitStatusForApiKey(a.id, at))?.hasUnpricedUsage, true);
    assert.equal((await analytics.getTeamUsageReport(team.id)).summary.hasUnpricedUsage, true);
  }
  assert.deepEqual(shapes.parseShapeCounts('{"[100,0,0,0,0]":1,"bad":1}', 2), []);
  assert.deepEqual(shapes.parseShapeCounts('{"[null,0,0,0,0]":1}', 1), []);
});

test("failed missing identity remains reportable but never blocks a successful-only budget", async () => {
  const { team, a } = await setup();
  await record(a.id, 100, false, null);
  for (const retained of [false, true]) {
    if (retained) await retain();
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, at);
    assert.equal(status?.hasUnpricedUsage, false);
    assert.equal(status.exceeded, false);
    const report = await analytics.getTeamUsageReport(team.id);
    assert.equal(report.summary.requests, 1);
    assert.equal(report.summary.successfulRequests, 0);
    assert.equal(report.summary.hasUnpricedUsage, true);
  }
});

test("reports retain failed-attempt estimates while budgets count successful spend only", async () => {
  const { team, a } = await setup();
  await record(a.id, 100);
  await record(a.id, 200, false);
  for (const retained of [false, true]) {
    if (retained) await retain();
    const status = await limits.getTeamUsageLimitStatusForApiKey(a.id, at);
    assert.equal(status?.estimatedListCostUsd, 0.0001);
    assert.equal(status.exceeded, false);
    const report = await analytics.getTeamUsageReport(team.id);
    assert.equal(report.summary.estimatedListCostUsd, 0.0003);
    assert.equal(report.summary.successfulRequests, 1);
    assert.equal(report.summary.requests, 2);
  }
});

test("retained shape maps survive JSON export/import and usage reset", async () => {
  const { a, b } = await setup();
  await record(a.id, 100);
  await record(b.id, 200);
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
  assert.equal(
    (await limits.getTeamUsageLimitStatusForApiKey(a.id, at))?.estimatedListCostUsd,
    0.0003
  );
  const history = await import("../../src/lib/db/cleanup.ts");
  await history.resetUsageHistory("all");
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS n FROM daily_team_usage_summary").get() as { n: number }).n,
    0
  );
});

test("backdated assignments cannot overlap a closed billing interval", async () => {
  const { team, a } = await setup();
  const beta = teams.createTeam({ name: "Beta" });
  teams.unassignApiKeyBillingTeam(a.id, "2026-01-02T00:00:00.000Z");
  assert.throws(
    () => teams.assignApiKeyBillingTeam(a.id, beta.id, "2026-01-01T12:00:00.000Z"),
    /overlaps/
  );
  const assignment = teams.assignApiKeyBillingTeam(a.id, beta.id, "2026-01-02T00:00:00.000Z");
  assert.equal(assignment.validFrom, "2026-01-02T00:00:00.000Z");
  assert.equal(teams.resolveBillingTeamIdForApiKeyAt(a.id, "2026-01-01T23:59:59.999Z"), team.id);
  assert.equal(teams.resolveBillingTeamIdForApiKeyAt(a.id, assignment.validFrom), beta.id);
});

test("terminal writer ignores a supplied Team override and null escape", async () => {
  const { team, a } = await setup();
  const other = teams.createTeam({ name: "Other Team" });
  for (const [index, billingTeamId] of [other.id, null].entries()) {
    const entry = {
      provider: "openai",
      model: "review-shapes",
      apiKeyId: a.id,
      billingTeamId,
      tokens: { input: 100 + index },
      timestamp: `2026-01-02T12:00:0${index}.000Z`,
    };
    await usage.saveRequestUsage(entry);
  }
  const rows = core
    .getDbInstance()
    .prepare("SELECT billing_team_id FROM usage_history ORDER BY timestamp")
    .all();
  assert.deepEqual(rows, [{ billing_team_id: team.id }, { billing_team_id: team.id }]);
});

test("actual current pricing is homogeneous for identical token shapes", async () => {
  const { computeCostFromPricing } = await import("../../src/lib/usage/costCalculator.ts");
  const price = { input: 2, output: 3, cached: 0.2, cache_creation: 2.5, reasoning: 4 };
  for (const shape of [
    { input: 0, output: 10, cacheRead: 100, cacheCreation: 0, reasoning: 2 },
    { input: 100, output: 10, cacheRead: 30, cacheCreation: 40, reasoning: 2 },
    { input: 100, output: 10, cacheRead: 130, cacheCreation: 40, reasoning: 2 },
  ]) {
    for (const count of [1, 2, 7]) {
      const multiplied = Object.fromEntries(Object.entries(shape).map(([k, v]) => [k, v * count]));
      const options = { provider: "codex", model: "gpt-6-sol", serviceTier: "priority" };
      const separate = computeCostFromPricing(price, shape, options) * count;
      assert.ok(Math.abs(computeCostFromPricing(price, multiplied, options) - separate) < 1e-12);
    }
  }
});

test("identical real requests at distinct timestamps agree before and after retention", async () => {
  const { team, a } = await setup();
  for (const hour of [10, 11]) {
    await usage.saveRequestUsage({
      provider: "openai",
      model: "review-shapes",
      apiKeyId: a.id,
      tokens: { input: 100, cacheRead: 30 },
      timestamp: `2026-01-02T${hour}:00:00.000Z`,
    });
  }
  const raw = await analytics.getTeamUsageReport(team.id);
  const budget = await limits.getTeamUsageLimitStatusForApiKey(a.id, at);
  assert.equal(raw.summary.requests, 2);
  assert.equal(raw.summary.estimatedListCostUsd, 0.00014);
  await retain();
  const retained = await analytics.getTeamUsageReport(team.id);
  assert.equal(retained.summary.estimatedListCostUsd, raw.summary.estimatedListCostUsd);
  assert.equal(
    (await limits.getTeamUsageLimitStatusForApiKey(a.id, at))?.estimatedListCostUsd,
    budget?.estimatedListCostUsd
  );
});
