// Opt-in: an account whose cached quota window is near its limit serves only sessions
// already pinned to it; new sessions route to another account. Default off.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-sticky-only-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const affinityDb = await import("../../src/lib/db/sessionAccountAffinity.ts");
const { setQuotaCache } = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");

const FLAG = "OMNIROUTE_QUOTA_STICKY_ONLY_USED_PERCENT";
const TTL = 60_000;
const PROVIDER = "openai";
const MODEL = "gpt-5.2";

async function seed(remaining: number[]) {
  const ids: string[] = [];
  for (const [i, left] of remaining.entries()) {
    const c = await providersDb.createProviderConnection({
      provider: PROVIDER,
      authType: "apikey",
      name: `sticky-${i}`,
      apiKey: `k-${i}`,
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
    const id = String(c.id);
    setQuotaCache(id, PROVIDER, {
      session: {
        used: 100 - left,
        total: 100,
        remainingPercentage: left,
        resetAt: new Date(Date.now() + 600_000).toISOString(),
      },
    });
    ids.push(id);
  }
  return ids;
}

async function pick(sessionKey?: string) {
  const r = (await auth.getProviderCredentials(PROVIDER, null, null, MODEL, {
    ...(sessionKey ? { sessionKey } : {}),
  })) as { connectionId?: string } | null;
  return r?.connectionId;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  await settingsDb.updateSettings({ sessionAffinityTtlMs: TTL });
  process.env[FLAG] = "90";
});
test.afterEach(() => {
  delete process.env[FLAG];
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a new session skips the account near its limit", async () => {
  const [a, b] = await seed([5, 80]);
  assert.notEqual(await pick("s-new"), a);
  assert.equal(await pick("s-new-2"), b);
});

test("a session already pinned to the account keeps using it", async () => {
  const [a] = await seed([5, 80]);
  affinityDb.upsertSessionAccountAffinity("s-run", PROVIDER, a, Date.now(), TTL);
  assert.equal(await pick("s-run"), a);
});

test("a request without a session key does not use the account near its limit", async () => {
  const [a, b] = await seed([5, 80]);
  assert.notEqual(await pick(), a);
  assert.equal(await pick(), b);
});

test("is off by default: the first account is chosen as before", async () => {
  delete process.env[FLAG];
  const [a] = await seed([5, 80]);
  assert.equal(await pick("s-new"), a);
});

test("an invalid threshold leaves routing unchanged", async () => {
  process.env[FLAG] = "abc";
  const [a] = await seed([5, 80]);
  assert.equal(await pick("s-new"), a);
});

test("the account is still used when every account is near its limit", async () => {
  const [a] = await seed([5, 8]);
  assert.equal(await pick("s-new"), a);
});

test("an account below the threshold is not held back", async () => {
  const [a] = await seed([40, 80]);
  assert.equal(await pick("s-new"), a);
});

test("does nothing when session affinity is off", async () => {
  await settingsDb.updateSettings({ sessionAffinityTtlMs: 0 });
  const [a] = await seed([5, 80]);
  assert.equal(await pick("s-new"), a);
});
