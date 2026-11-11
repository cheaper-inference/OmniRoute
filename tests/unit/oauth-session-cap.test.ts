// Opt-in OAUTH_MAX_SESSIONS_PER_ACCOUNT: an OAuth account that already serves N other sessions
// is skipped for a new session. A session it already serves keeps using it. Default off.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-oauth-session-cap-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const occupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

const FLAG = "OAUTH_MAX_SESSIONS_PER_ACCOUNT";
const PROVIDER = "claude";
const MODEL = "claude-sonnet-4-5";

// Priorities 1, 10 and 20 sit outside the +1 window of the soft occupancy ranking, so only the
// hard cap can move a second session to another account. createProviderConnection renumbers
// priority on insert, so the gaps are written straight to the table.
const PRIORITIES = [1, 10, 20];

async function seed(n: number) {
  const ids: string[] = [];
  for (let i = 0; i < n; i++) {
    const c = await providersDb.createProviderConnection({
      provider: PROVIDER,
      authType: "oauth",
      name: `oauth-cap-${i}`,
      email: `oauth-cap-${i}@example.invalid`,
      accessToken: `at-${i}`,
      refreshToken: `rt-${i}`,
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      isActive: true,
      testStatus: "active",
    });
    ids.push(String(c.id));
    core
      .getDbInstance()
      .prepare("UPDATE provider_connections SET priority = ? WHERE id = ?")
      .run(PRIORITIES[i], c.id);
  }
  return ids;
}

async function pick(sessionKey: string, reserve = true) {
  const r = (await auth.getProviderCredentials(PROVIDER, null, null, MODEL, {
    sessionKey,
    reserveOAuthSession: reserve,
  })) as { connectionId?: string; releaseOAuthSession?: () => void } | null;
  return r;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  // fill-first keeps every session on the first account, so only the cap can move one.
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first" });
  occupancy._clearOAuthSessionOccupancyForTest();
  delete process.env[FLAG];
});
test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("hasOAuthSessionRoom: counts other sessions only", () => {
  occupancy.reserveOAuthSession("acc", "s1");
  occupancy.reserveOAuthSession("acc", "s2");
  assert.equal(occupancy.hasOAuthSessionRoom("acc", "s3", 2), false);
  assert.equal(
    occupancy.hasOAuthSessionRoom("acc", "s1", 2),
    true,
    "an existing session keeps its slot"
  );
  assert.equal(occupancy.hasOAuthSessionRoom("acc", "s3", 3), true);
  assert.equal(occupancy.hasOAuthSessionRoom("acc", "s3", 0), true, "0 = no cap");
});

test("a new session moves to the next account once the first is full", async () => {
  process.env[FLAG] = "1";
  const [a, b] = await seed(2);
  const first = await pick("sess-1");
  assert.equal(first?.connectionId, a);
  const second = await pick("sess-2");
  assert.equal(second?.connectionId, b);
});

test("a session already on the full account keeps using it", async () => {
  process.env[FLAG] = "1";
  const [a] = await seed(2);
  const first = await pick("sess-1");
  assert.equal(first?.connectionId, a);
  const again = await pick("sess-1");
  assert.equal(again?.connectionId, a);
});

test("releasing the slot lets a new session use the account again", async () => {
  process.env[FLAG] = "1";
  const [a] = await seed(1);
  const first = await pick("sess-1");
  assert.equal(first?.connectionId, a);
  first?.releaseOAuthSession?.();
  const next = await pick("sess-2");
  assert.equal(next?.connectionId, a);
});

test("is off by default: a second session stays on the first account", async () => {
  const [a] = await seed(2);
  assert.equal((await pick("sess-1"))?.connectionId, a);
  assert.equal((await pick("sess-2"))?.connectionId, a);
});

test("when every account is full the request still gets one", async () => {
  process.env[FLAG] = "1";
  const [a, b] = await seed(2);
  await pick("sess-1");
  await pick("sess-2");
  const third = await pick("sess-3");
  assert.ok([a, b].includes(String(third?.connectionId)));
});

test("an invalid value turns the cap off", async () => {
  process.env[FLAG] = "x";
  const [a] = await seed(2);
  assert.equal((await pick("sess-1"))?.connectionId, a);
  assert.equal((await pick("sess-2"))?.connectionId, a);
});
