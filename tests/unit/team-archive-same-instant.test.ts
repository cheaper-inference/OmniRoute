import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-team-archive-instant-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "team-archive-instant-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("archiving a team in the same instant a key was bound still archives, clamping valid_to", async () => {
  const key = await apiKeys.createApiKey("agent-same-instant", "machine-instant-01");
  const team = teams.createTeam({ name: "Same Instant" });
  const T = "2026-08-21T00:00:00.000Z";

  teams.assignApiKeyBillingTeam(key.id, team.id, T);

  const archived = teams.archiveTeam(team.id, T);

  // The archive must actually take effect - not roll back behind a raw SqliteError.
  assert.equal(archived?.status, "archived");
  assert.equal(teams.getTeam(team.id)?.status, "archived");
  assert.equal(archived?.archivedAt, T);

  const history = teams.listApiKeyBillingHistory(key.id);
  assert.equal(history.length, 1);
  const binding = history[0];
  assert.equal(binding.validFrom, T);
  assert.notEqual(binding.validTo, null);
  // Clamped forward by exactly 1ms so the migration-161 CHECK
  // (valid_to IS NULL OR valid_to > valid_from) holds on a degenerate interval.
  assert.equal(binding.validTo, "2026-08-21T00:00:00.001Z");
  assert.ok((binding.validTo as string) > binding.validFrom);

  // The clamp must not leave the binding open.
  assert.equal(teams.getActiveBillingTeamForApiKey(key.id), null);
});

test("archiving strictly after the binding start uses the archive instant verbatim", async () => {
  const key = await apiKeys.createApiKey("agent-later", "machine-instant-02");
  const team = teams.createTeam({ name: "Later Archive" });
  const from = "2026-08-21T00:00:00.000Z";
  const at = "2026-08-21T06:30:00.000Z";

  teams.assignApiKeyBillingTeam(key.id, team.id, from);
  const archived = teams.archiveTeam(team.id, at);

  assert.equal(archived?.status, "archived");
  const binding = teams.listApiKeyBillingHistory(key.id)[0];
  assert.equal(binding.validFrom, from);
  assert.equal(binding.validTo, at);
});

test("archiving clamps every same-instant binding independently", async () => {
  const keyA = await apiKeys.createApiKey("agent-multi-a", "machine-instant-03");
  const keyB = await apiKeys.createApiKey("agent-multi-b", "machine-instant-04");
  const team = teams.createTeam({ name: "Multi Binding" });
  const collide = "2026-08-21T00:00:00.000Z";
  const earlier = "2026-08-20T00:00:00.000Z";

  teams.assignApiKeyBillingTeam(keyA.id, team.id, earlier);
  teams.assignApiKeyBillingTeam(keyB.id, team.id, collide);

  const archived = teams.archiveTeam(team.id, collide);
  assert.equal(archived?.status, "archived");

  const bindingA = teams.listApiKeyBillingHistory(keyA.id)[0];
  const bindingB = teams.listApiKeyBillingHistory(keyB.id)[0];
  // A started earlier, so it closes exactly at the archive instant.
  assert.equal(bindingA.validTo, collide);
  // B collided, so only B is clamped.
  assert.equal(bindingB.validTo, "2026-08-21T00:00:00.001Z");
  assert.ok((bindingA.validTo as string) > bindingA.validFrom);
  assert.ok((bindingB.validTo as string) > bindingB.validFrom);
});
