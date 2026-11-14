import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rerank-snapshot-merge-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "synthetic-snapshot-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { getApiKeySpendRows } = await import("../../src/lib/db/apiKeySpend.ts");
const { getSuccessfulUsageModelGroupsSince } = await import("../../src/lib/db/usageModelGroups.ts");
const { rawCostSums } = await import("../../src/lib/db/usageAnalytics/billing.ts");
const { getApiKeyUsageLimitStatus } = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const { getTeamUsageLimitStatusForApiKey } = await import("../../src/lib/usage/teamUsageLimits.ts");
const { getUsageStats, getConnectionSpendUsdSinceAdded } =
  await import("../../src/lib/usage/usageStats.ts");
const { getUnpricedUsageReport } = await import("../../src/lib/usage/unpricedUsage.ts");
const model = "synthetic-shared-model";

test.beforeEach(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
});
test.after(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dir, { recursive: true, force: true });
});

function insert(
  keyId: string,
  provider: string,
  endpoint: string,
  input: number,
  reported: number | null,
  calculated: number | null,
  teamId: string | null = null,
  billingUnit: string | null = endpoint === "/v1/ocr" ? "page" : null
) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history
       (timestamp, provider, model, api_key_id, connection_id, endpoint,
        tokens_input, tokens_output, success, provider_cost_usd, calculated_cost_usd,
        billing_unit, billing_team_id)
       VALUES (?, ?, ?, ?, 'synthetic-connection', ?, ?, 0, 1, ?, ?, ?, ?)`
    )
    .run(
      new Date(Date.now() - 1000).toISOString(),
      provider,
      model,
      keyId,
      endpoint,
      input,
      reported,
      calculated,
      billingUnit,
      teamId
    );
}

function near(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-9, `expected ${expected}, got ${actual}`);
}

async function seed() {
  await updatePricing({
    cortecs: { [model]: { input: 2, output: 4 } },
    mistral: { [model]: { input: 999, output: 999 } },
  });
  return keys.createApiKey("Synthetic merged billing", "synthetic-snapshot-machine");
}

test("mixed OCR snapshots, exact rerank USD and token aliases are counted once", async () => {
  const key = await seed();
  insert(key.id, "mistral", "/v1/ocr", 4000, null, 0.2);
  insert(key.id, "cortecs", "/v1/rerank", 5000, 0.03, null);
  insert(key.id, "cortecs", "/v1/chat/completions", 1000, null, null);
  insert(key.id, "cortecs", "/v1/rerank", 7777, null, null);
  const since = new Date(Date.now() - 3600000).toISOString();
  const rows = getApiKeySpendRows(key.id, since);
  const rerank = rows.find((row) => row.provider === "cortecs");
  assert.equal(rerank?.promptTokens, 1000);
  assert.equal(rerank?.unpricedUnitRequests, 1, "legacy rows share the unit billing signal");
  assert.equal(Object.hasOwn(rerank!, "unpricedRerankRequests"), false);
  near(Number(rerank?.storedCost), 0.03);
  const raw = core
    .getDbInstance()
    .prepare(`SELECT ${rawCostSums("u")} FROM usage_history u`)
    .get() as { storedCost: number; costPromptTokens: number };
  near(raw.storedCost, 0.23);
  assert.equal(raw.costPromptTokens, 1000);
  const limits = await getApiKeyUsageLimitStatus({
    id: key.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 2,
  });
  near(limits.dailySpentUsd, 0.232);
  near(limits.weeklySpentUsd, 0.232);
  assert.equal(limits.dailyHasUnpricedUsage, true);
  const unknown = (await getUnpricedUsageReport()).models;
  assert.equal(unknown.length, 1);
  assert.equal(unknown[0].provider, "cortecs");
  assert.equal(Object.hasOwn(unknown[0], "unpricedRerankRequests"), false);
  near((await getUsageStats()).byApiKey[`id:${key.id}`].cost, 0.232);
  near((await getConnectionSpendUsdSinceAdded("cortecs", "synthetic-connection")).costUsd, 0.032);
});

test("legacy and unit-marked reranks share one unpriced counter without counting known zero", async () => {
  const key = await seed();
  insert(key.id, "cortecs", "/v1/rerank", 1000, null, null);
  insert(key.id, "cortecs", "/rerank", 1000, null, null, null, "request");
  insert(key.id, "cortecs", "/v1/rerank", 1000, 0, 3, null, "request");
  insert(key.id, "cortecs", "/v1/rerank", 1000, null, 0.02, null, "request");
  insert(key.id, "cortecs", "/v1/chat/completions", 1000, null, null);
  const since = new Date(Date.now() - 3600000).toISOString();
  const [row] = getApiKeySpendRows(key.id, since);
  assert.equal(row.unpricedUnitRequests, 2);
  assert.equal(row.promptTokens, 1000);
  near(Number(row.storedCost), 0.02);
  assert.equal(Object.hasOwn(row, "unpricedRerankRequests"), false);
  const [group] = getSuccessfulUsageModelGroupsSince(since);
  assert.equal(group.unpricedUnitRequests, 2);
  assert.equal(Object.hasOwn(group, "unpricedRerankRequests"), false);
  assert.equal((await getUnpricedUsageReport()).models.length, 1);
});

test("zero catalogue snapshots stay known without requiring current token prices", async () => {
  const key = await seed();
  insert(key.id, "mistral", "/v1/ocr", 9000, null, 0);
  insert(key.id, "cortecs", "/v1/rerank", 9000, 0, 3);
  const limits = await getApiKeyUsageLimitStatus({
    id: key.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
  });
  assert.equal(limits.dailySpentUsd, 0);
  assert.equal(limits.dailyHasUnpricedUsage, false);
  assert.deepEqual((await getUnpricedUsageReport()).models, []);
  assert.equal((await getUsageStats()).byApiKey[`id:${key.id}`].cost, 0);
});

test("memoized team budgets still distinguish reranks from a Cortecs chat alias", async () => {
  const key = await seed();
  const team = teams.createTeam({
    name: "Synthetic budget",
    maxBudgetUsd: 1,
    budgetDuration: "7d",
  });
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ? WHERE id = ?")
    .run(new Date(Date.now() + 6 * 86400000).toISOString(), team.id);
  teams.assignApiKeyBillingTeam(key.id, team.id, new Date(Date.now() - 3600000).toISOString());
  insert(key.id, "cortecs", "/v1/chat/completions", 1000, null, null, team.id);
  insert(key.id, "cortecs", "/v1/rerank", 5000, null, null, team.id);
  const status = await getTeamUsageLimitStatusForApiKey(key.id, Date.now());
  assert.ok(status);
  near(status.estimatedListCostUsd, 0.002);
  assert.equal(status.hasUnpricedUsage, true);
  assert.equal(status.exceeded, true);
});
