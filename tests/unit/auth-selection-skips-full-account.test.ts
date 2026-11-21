import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-full-account-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-full-account-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const semaphore = await import("../../open-sse/services/accountSemaphore.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
}

async function seed(name: string, priority: number, maxConcurrent: number | null) {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    testStatus: "active",
    priority,
    maxConcurrent,
    providerSpecificData: {},
  });
  assert.ok(created?.id);
  return created.id as string;
}

/** Take every slot of the account, as the request pipeline does while requests run. */
function fillAccount(connectionId: string, cap: number) {
  return Array.from({ length: cap }, () =>
    semaphore.acquire(`openai:${connectionId}`, { maxConcurrency: cap })
  );
}

test.beforeEach(async () => {
  semaphore.resetAll();
  await resetStorage();
});

test.after(async () => {
  semaphore.resetAll();
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const strategy of ["fill-first", "p2c", "least-used", "round-robin"]) {
  test(`${strategy}: an account at its concurrency cap is skipped while a sibling has room`, async () => {
    await settingsDb.updateSettings({ fallbackStrategy: strategy });
    const full = await seed("full-primary", 1, 1);
    const open = await seed("open-secondary", 2, 4);
    const releases = await Promise.all(fillAccount(full, 1));

    const selected = await auth.getProviderCredentials("openai");

    assert.equal(selected.connectionId, open);
    releases.forEach((release) => release());
  });
}

test("an account without a cap is never treated as full", async () => {
  const uncapped = await seed("uncapped-primary", 1, null);
  await seed("capped-secondary", 2, 1);

  const selected = await auth.getProviderCredentials("openai");

  assert.equal(selected.connectionId, uncapped);
});

test("when every account is at its cap the normal pick is kept", async () => {
  const first = await seed("full-first", 1, 1);
  const second = await seed("full-second", 2, 1);
  const releases = await Promise.all([...fillAccount(first, 1), ...fillAccount(second, 1)]);

  const selected = await auth.getProviderCredentials("openai");

  assert.equal(selected.connectionId, first);
  releases.forEach((release) => release());
});

test("the account is picked again once its slot is released", async () => {
  const primary = await seed("release-primary", 1, 1);
  await seed("release-secondary", 2, 4);
  const releases = await Promise.all(fillAccount(primary, 1));
  releases.forEach((release) => release());

  const selected = await auth.getProviderCredentials("openai");

  assert.equal(selected.connectionId, primary);
});

test("a session pinned to a full account keeps that account", async () => {
  await settingsDb.updateSettings({ sessionAffinityTtlMs: 60_000 });
  const pinned = await seed("pinned-primary", 1, 1);
  await seed("pinned-secondary", 2, 4);
  const first = await auth.getProviderCredentials("openai", null, null, "gpt-4o", {
    sessionKey: "full-account-session",
    forcedConnectionId: pinned,
  });
  assert.equal(first.connectionId, pinned);
  const releases = await Promise.all(fillAccount(pinned, 1));

  const second = await auth.getProviderCredentials("openai", null, null, "gpt-4o", {
    sessionKey: "full-account-session",
  });

  assert.equal(second.connectionId, pinned, "the prompt-cache pin wins over load");
  releases.forEach((release) => release());
});

test("fill-first: a new session pin skips an account at its cap", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first", sessionAffinityTtlMs: 60_000 });
  const full = await seed("new-pin-full-primary", 1, 1);
  const open = await seed("new-pin-open-secondary", 2, 4);
  const releases = await Promise.all(fillAccount(full, 1));

  const selected = await auth.getProviderCredentials("openai", null, null, "gpt-4o", {
    sessionKey: "new-pin-full-session",
  });

  assert.equal(selected.connectionId, open, "a new pin starts where fill-first routes");
  releases.forEach((release) => release());
});

test("an API-key preference keeps a full preferred account and still reports its fallback", async () => {
  const preferred = await seed("preferred-full", 2, 1);
  const sibling = await seed("preferred-sibling", 1, 1);
  const releases = await Promise.all([...fillAccount(preferred, 1), ...fillAccount(sibling, 1)]);

  const selected = await auth.getProviderCredentials("openai", null, null, "gpt-4o", {
    preferredConnectionIds: [preferred, sibling],
  });

  assert.equal(selected.connectionId, preferred, "the key preference wins over load");
  assert.equal(selected.selectedByApiKeyPreference, true);
  assert.equal(
    selected.preferredFallbackAvailable,
    true,
    "a sibling at its cap is still a failover target for the preferred account"
  );
  releases.forEach((release) => release());
});

test("an API-key preference with no sibling reports no fallback", async () => {
  const only = await seed("preferred-only", 1, 4);

  const selected = await auth.getProviderCredentials("openai", null, null, "gpt-4o", {
    preferredConnectionIds: [only],
  });

  assert.equal(selected.connectionId, only);
  assert.equal(selected.selectedByApiKeyPreference, true);
  assert.equal(selected.preferredFallbackAvailable, false);
});
