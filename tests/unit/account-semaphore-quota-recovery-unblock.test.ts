import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A quota 429 parks the connection's in-memory account gate until the upstream
// reset (often ~24h for a weekly window). When the quota recovers early (the
// account owner resets it upstream), the persisted cooldowns are released by
// the existing recovery paths, but the in-memory gate stayed blocked: every
// request then waited out the queue timeout and failed with
// `Semaphore timeout after 30000ms for codex:<connection>` until the gate was
// reset by hand. Each recovery path must release the gate too.

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "semaphore-quota-unblock-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "test-only-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const recovery = await import("../../src/lib/db/providers/codexAccountRecovery.ts");
const quotaSnapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");
const semaphore = await import("../../open-sse/services/accountSemaphore.ts");

const DAY_MS = 24 * 3600_000;
const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  semaphore.resetAll();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const recoveredUsage = {
  quotas: { session: { used: 0, total: 100 }, weekly: { used: 0, total: 100 } },
};

async function seedCodex() {
  const until = new Date(Date.now() + DAY_MS).toISOString();
  return db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: crypto.randomUUID(),
    providerSpecificData: {
      codexScopeRateLimitedUntil: { codex: until },
      codexScopeRateLimitSource: { codex: "fallback" },
      codexExhaustedWindowByScope: { codex: "7d" },
    },
  });
}

/** What chatCore does on a QUOTA_EXHAUSTED 429. */
function blockGate(provider: string, connectionId: string): string {
  const key = semaphore.buildAccountSemaphoreKey({ provider, accountKey: connectionId });
  semaphore.markBlocked(key, DAY_MS);
  return key;
}

function blockedUntil(key: string): string | null {
  return semaphore.getStats()[key]?.blockedUntil ?? null;
}

async function canAcquireNow(key: string): Promise<boolean> {
  try {
    const release = await semaphore.acquire(key, { maxConcurrency: 1, timeoutMs: 50 });
    release();
    return true;
  } catch {
    return false;
  }
}

test("recovered Codex usage poll releases that account's semaphore gate only", async () => {
  const a = await seedCodex();
  const b = await seedCodex();
  const keyA = blockGate("codex", a.id);
  const keyB = blockGate("codex", b.id);

  await recovery.syncCodexQuotaObservation(a.id, recoveredUsage, a.providerSpecificData);

  assert.equal(blockedUntil(keyA), null);
  assert.equal(await canAcquireNow(keyA), true);
  assert.notEqual(blockedUntil(keyB), null, "another account's gate must stay blocked");
  assert.equal(await canAcquireNow(keyB), false);
});

test("a still-exhausted or partial Codex reading keeps the gate blocked", async () => {
  for (const quotas of [
    { session: { used: 0, total: 100 }, weekly: { used: 100, total: 100 } },
    { session: { used: 0, total: 100 } },
  ]) {
    const a = await seedCodex();
    const key = blockGate("codex", a.id);
    await recovery.syncCodexQuotaObservation(a.id, { quotas }, a.providerSpecificData);
    assert.notEqual(blockedUntil(key), null);
  }
});

test("a newer cooldown written during the usage fetch keeps the gate blocked", async () => {
  const a = await seedCodex();
  const key = blockGate("codex", a.id);
  await db.updateCodexScopeCooldown(a.id, "codex", new Date(Date.now() + 2 * DAY_MS).toISOString());

  await recovery.syncCodexQuotaObservation(a.id, recoveredUsage, a.providerSpecificData);

  assert.notEqual(blockedUntil(key), null);
});

test("a Codex scope cooldown still parked keeps the shared account gate blocked", async () => {
  // The gate is per connection, not per Codex scope: recovering the main scope
  // while Spark is still parked must not reopen it.
  const until = new Date(Date.now() + DAY_MS).toISOString();
  const a = await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: crypto.randomUUID(),
    providerSpecificData: {
      codexScopeRateLimitedUntil: { codex: until, spark: until },
      codexScopeRateLimitSource: { codex: "fallback", spark: "fallback" },
    },
  });
  const key = blockGate("codex", a.id);

  await recovery.syncCodexQuotaObservation(a.id, recoveredUsage, a.providerSpecificData);

  assert.notEqual(blockedUntil(key), null);
});

test("manual Codex cooldown release also releases the semaphore gate", async () => {
  const a = await seedCodex();
  const key = blockGate("codex", a.id);

  await recovery.clearCodexAccountCooldown(a.id, "codex");

  assert.equal(blockedUntil(key), null);
});

test("a quota snapshot with headroom that lifts the scope cooldown releases the gate", async () => {
  const a = await seedCodex();
  const key = blockGate("codex", a.id);

  quotaSnapshots.saveQuotaSnapshot({
    provider: "codex",
    connection_id: a.id,
    window_key: "session",
    remaining_percentage: 100,
    is_exhausted: 0,
    next_reset_at: new Date(Date.now() + 3600_000).toISOString(),
    window_duration_ms: 18_000_000,
    raw_data: null,
  });

  assert.equal(blockedUntil(key), null);
});

test("generic recovered-quota clear releases the provider account gate", async () => {
  const connection = await db.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: crypto.randomUUID(),
    apiKey: "glm-test-key",
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() - 60_000).toISOString(),
    lastError: "quota exhausted",
    lastErrorType: "quota_exhausted",
    errorCode: 429,
  });
  const id = (connection as { id: string }).id;
  const key = blockGate("glm", id);

  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        code: 200,
        success: true,
        data: {
          planName: "max",
          limits: [
            {
              type: "TOKENS_LIMIT",
              unit: 3,
              number: 5,
              percentage: 13,
              nextResetTime: Math.floor(Date.now() / 1000) + 3 * 3600,
              models: [],
            },
          ],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;

  await providerLimits.fetchAndPersistProviderLimits(id, "manual");

  const updated = (await db.getProviderConnectionById(id)) as Record<string, unknown>;
  assert.equal(updated.testStatus, "active", "precondition: recovery clear ran");
  assert.equal(blockedUntil(key), null);
});
