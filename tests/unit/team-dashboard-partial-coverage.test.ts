import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "team-dashboard-boundary-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "fixture-boundary-only";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const pricing = await import("../../src/lib/db/settings/pricing.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const aggregation = await import("../../src/lib/usage/aggregateHistory.ts");
const route = await import("../../src/app/api/teams/[id]/route.ts");
test.beforeEach(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  usage.clearPendingRequests();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
});
test.after(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dir, { recursive: true, force: true });
});
async function fixture(partial: boolean) {
  const admin = await keys.createApiKey("admin", "fixture-admin", ["manage"]);
  await pricing.updatePricing({
    openai: { "boundary-fixture": { input: 1, output: 1, cached: 1 } },
  });
  const team = teams.createTeam({
    name: "Retained boundary",
    maxBudgetUsd: 100,
    budgetDuration: "7d",
  });
  const today = Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00.000Z");
  const start = today - 86400000 + (partial ? 12 * 3600000 : 0);
  const reset = start + 7 * 86400000;
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at=? WHERE id=?")
    .run(new Date(reset).toISOString(), team.id);
  teams.assignApiKeyBillingTeam(admin.id, team.id, new Date(start - 86400000).toISOString());
  const times = partial ? [start + 3600000, reset - 3600000] : [start + 3600000];
  for (const timestamp of times)
    await usage.saveRequestUsage({
      provider: "openai",
      model: "boundary-fixture",
      apiKeyId: admin.id,
      tokens: { input: 1000000, output: 0 },
      success: true,
      timestamp: new Date(timestamp).toISOString(),
    });
  await aggregation.rollupUsageHistoryBeforeDate("9999-01-01");
  core.getDbInstance().prepare("DELETE FROM usage_history WHERE billing_team_id=?").run(team.id);
  const response = await route.GET(
    new Request("http://localhost/api/teams/" + team.id, {
      headers: { authorization: "Bearer " + admin.key },
    }),
    { params: Promise.resolve({ id: team.id }) }
  );
  assert.equal(response.status, 200);
  return (await response.json()).budgetStatus;
}
test("dashboard exposes retained partial boundary uncertainty without changing accepted soft enforcement", async () => {
  const status = await fixture(true);
  assert.equal(status.hasPartialRetainedUsage, true);
  assert.equal(status.estimatedListCostUsd, 0);
  assert.equal(status.hasUnpricedUsage, false);
  assert.equal(status.exceeded, false);
});
test("complete UTC buckets retain exact shapes and do not show a partial-coverage warning", async () => {
  const status = await fixture(false);
  assert.equal(status.hasPartialRetainedUsage, false);
  assert.equal(status.estimatedListCostUsd, 1);
  assert.equal(status.hasUnpricedUsage, false);
  assert.equal(status.exceeded, false);
});
