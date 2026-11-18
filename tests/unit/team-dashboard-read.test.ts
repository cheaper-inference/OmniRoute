import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "team-dashboard-read-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "fixture-dashboard-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "1";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const budgets = await import("../../src/lib/usage/teamUsageLimits.ts");
const pricing = await import("../../src/lib/db/settings/pricing.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const analytics = await import("../../src/lib/db/teamUsageAnalytics.ts");
const listRoute = await import("../../src/app/api/teams/route.ts");
const detailRoute = await import("../../src/app/api/teams/[id]/route.ts");
const memberRoute = await import("../../src/app/api/teams/[id]/members/route.ts");
const params = (id: string) => ({ params: Promise.resolve({ id }) });
function req(url: string, secret?: string, body?: unknown) {
  return new Request("http://localhost" + url, {
    method: body === undefined ? "GET" : "PUT",
    headers: {
      ...(secret ? { authorization: "Bearer " + secret } : {}),
      "Content-Type": "application/json",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
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

test("real additive read handlers reject anonymous and non-management keys", async () => {
  const ordinary = await keys.createApiKey("ordinary", "fixture-ordinary");
  const team = teams.createTeam({ name: "Protected" });
  for (const secret of [undefined, ordinary.key]) {
    const expected = secret ? 403 : 401;
    assert.equal(
      (await listRoute.GET(req("/api/teams?includeKeyOptions=true", secret))).status,
      expected
    );
    assert.equal(
      (await detailRoute.GET(req("/api/teams/" + team.id, secret), params(team.id))).status,
      expected
    );
    assert.equal(
      (
        await memberRoute.PUT(
          req("/api/teams/" + team.id + "/members", secret, {
            apiKeyId: ordinary.id,
            expectedTeamId: null,
          }),
          params(team.id)
        )
      ).status,
      expected
    );
  }
  assert.equal(teams.getActiveBillingTeamForApiKey(ordinary.id), null);
});

test("safe projection has all keys, nullable names and only active ownership; default response stays unchanged", async () => {
  const admin = await keys.createApiKey("admin", "fixture-admin", ["manage"]);
  const key = await keys.createApiKey("", "fixture-unnamed");
  const team = teams.createTeam({ name: "Owner" });
  teams.assignApiKeyBillingTeam(key.id, team.id, "2026-01-01T00:00:00.000Z");
  // Current schema requires names; an empty legacy name is still a safe option.
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT INTO api_keys (id, name, key, machine_id, created_at) VALUES (?, ?, ?, ?, ?)"
  );
  for (let index = 0; index < 205; index++)
    insert.run(
      crypto.randomUUID(),
      "fixture-" + index,
      "invalid-fixture-" + index,
      "fixture",
      new Date().toISOString()
    );
  const defaultBody = await (await listRoute.GET(req("/api/teams", admin.key))).json();
  assert.deepEqual(Object.keys(defaultBody), ["teams"]);
  const body = await (
    await listRoute.GET(req("/api/teams?includeKeyOptions=true", admin.key))
  ).json();
  assert.equal(body.keyOptions.length, 207);
  for (const option of body.keyOptions)
    assert.deepEqual(Object.keys(option).sort(), ["id", "name", "teamId", "teamName"]);
  assert.deepEqual(
    body.keyOptions.find((option: { id: string }) => option.id === key.id),
    { id: key.id, name: key.name, teamId: team.id, teamName: "Owner" }
  );
  teams.archiveTeam(team.id);
  const option = teams.listTeamKeyOptions().find((item) => item.id === key.id)!;
  assert.equal(option.teamId, null);
  assert.equal(option.teamName, null);
  assert.ok(!JSON.stringify(body).includes(admin.key));
  assert.ok(!JSON.stringify(body).includes("invalid-fixture-"));
});

test("zero-member team retains successful historical budget, report includes failed attempts, archived enforcement is inactive", async () => {
  const admin = await keys.createApiKey("admin", "fixture-admin", ["manage"]);
  const key = await keys.createApiKey("worker", "fixture-worker");
  await pricing.updatePricing({
    openai: {
      "dashboard-fixture": { input: 1, cached: 1, output: 1, reasoning: 1, cache_creation: 1 },
    },
  });
  const team = teams.createTeam({ name: "Historical", maxBudgetUsd: 0.5, budgetDuration: "1d" });
  const at = Date.now();
  teams.assignApiKeyBillingTeam(key.id, team.id, new Date(at - 1000).toISOString());
  for (const success of [true, false]) {
    await usage.saveRequestUsage({
      provider: "openai",
      model: "dashboard-fixture",
      apiKeyId: key.id,
      apiKeyName: key.name,
      tokens: { input: 1000000, output: 0 },
      timestamp: new Date(at + (success ? 0 : 1)).toISOString(),
      success,
    });
  }
  teams.unassignApiKeyBillingTeam(key.id, new Date(at + 2).toISOString(), team.id);
  assert.equal(teams.listTeamMembers(team.id).length, 0);
  assert.equal(await budgets.getTeamUsageLimitStatusForApiKey(key.id, at), null);
  const status = await budgets.getTeamUsageLimitStatusForTeam(team.id, at);
  assert.equal(status?.estimatedListCostUsd, 1);
  assert.equal(status?.exceeded, true);
  assert.equal((await analytics.getTeamUsageReport(team.id)).summary.estimatedListCostUsd, 2);
  const response = await detailRoute.GET(req("/api/teams/" + team.id, admin.key), params(team.id));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.members.length, 0);
  assert.equal(body.budgetStatus.estimatedListCostUsd, 1);
  teams.archiveTeam(team.id);
  assert.equal(await budgets.getTeamUsageLimitStatusForTeam(team.id, at), null);
});

test("handler transfer checks expected source inside transaction and preserves history on conflict", async () => {
  const admin = await keys.createApiKey("admin", "fixture-admin", ["manage"]);
  const source = teams.createTeam({ name: "Source" });
  const middle = teams.createTeam({ name: "Middle" });
  const destination = teams.createTeam({ name: "Destination" });
  teams.assignApiKeyBillingTeam(admin.id, source.id, "2026-01-01T00:00:00.000Z");
  teams.assignApiKeyBillingTeam(admin.id, middle.id, "2026-01-02T00:00:00.000Z");
  const url = "/api/teams/" + destination.id + "/members";
  for (const expectedTeamId of [source.id, null]) {
    const conflict = await memberRoute.PUT(
      req(url, admin.key, { apiKeyId: admin.id, expectedTeamId }),
      params(destination.id)
    );
    assert.equal(conflict.status, 409);
    assert.equal(teams.getActiveBillingTeamForApiKey(admin.id)?.id, middle.id);
    assert.equal(teams.listApiKeyBillingHistory(admin.id).length, 2);
  }
  assert.equal(
    (
      await memberRoute.PUT(
        req(url, admin.key, { apiKeyId: admin.id, expectedTeamId: middle.id }),
        params(destination.id)
      )
    ).status,
    200
  );
  assert.equal(teams.getActiveBillingTeamForApiKey(admin.id)?.id, destination.id);
  assert.equal(teams.listApiKeyBillingHistory(admin.id).length, 3);
  // Omitted fourth argument keeps legacy assignment semantics.
  teams.assignApiKeyBillingTeam(admin.id, source.id, "2027-01-01T00:00:00.000Z");
  assert.equal(teams.getActiveBillingTeamForApiKey(admin.id)?.id, source.id);
});

test("a previously unassigned key accepts explicit null expectation", async () => {
  const admin = await keys.createApiKey("admin", "fixture-admin", ["manage"]);
  const team = teams.createTeam({ name: "First" });
  const response = await memberRoute.PUT(
    req("/api/teams/" + team.id + "/members", admin.key, {
      apiKeyId: admin.id,
      expectedTeamId: null,
    }),
    params(team.id)
  );
  assert.equal(response.status, 200);
});
