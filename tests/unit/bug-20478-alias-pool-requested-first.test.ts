// #20478: under fill-first and priority, an alias pool (#922) keeps the requested provider id's
// accounts ahead of its aliases' accounts for every auth type, as API-key and mixed pools already
// did (#10581). Priority orders accounts within one provider id, and another alias still serves
// once the requested id has none left. Model parsing resolves `agy/` to `antigravity` (#8013), so
// an `agy/` model requests the antigravity id; only a lookup by the `agy` id puts agy first.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20478-alias-pool-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "alias-pool-requested-first-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");
const oauthOccupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

type AuthType = "apikey" | "oauth";

const STRATEGIES = ["fill-first", "priority"] as const;
const ANTIGRAVITY_IDS = new Set(["antigravity", "agy"]);

let seq = 0;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seed(provider: string, authType: AuthType): Promise<string> {
  seq += 1;
  const name = `${provider}-${authType}-acct${seq}`;
  const created = await providersDb.createProviderConnection({
    provider,
    authType,
    name,
    email: authType === "oauth" ? `${name}@example.invalid` : undefined,
    apiKey: authType === "apikey" ? `sk-test-invalid-20478-${seq}` : undefined,
    accessToken: authType === "oauth" ? `test-invalid-access-20478-${seq}` : undefined,
    refreshToken: authType === "oauth" ? `test-invalid-refresh-20478-${seq}` : undefined,
    isActive: true,
    testStatus: "active",
    // Antigravity logins store their Cloud Code project.
    providerSpecificData: ANTIGRAVITY_IDS.has(provider)
      ? { projectId: `test-project-20478-${seq}` }
      : {},
  });
  assert.ok(created?.id);
  return created.id as string;
}

async function assertPriority(id: string, priority: number) {
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row?.priority, priority, `${row?.name} stored priority`);
}

/** Create numbers each provider id from 1, so explicit priorities go in once every row exists. */
async function setPriority(id: string, priority: number) {
  await providersDb.updateProviderConnection(id, { priority });
  await assertPriority(id, priority);
}

async function pick(
  strategy: string,
  provider: string,
  options: {
    excludeConnectionIds?: string[];
    sessionKey?: string;
    reserveOAuthSession?: boolean;
  } = {}
) {
  await settingsDb.updateSettings({ fallbackStrategy: strategy, sessionAffinityTtlMs: 0 });
  const selected = await getProviderCredentials(provider, null, null, null, options);
  const result = (selected ?? {}) as { connectionId?: string; releaseOAuthSession?: () => void };
  result.releaseOAuthSession?.();
  return result.connectionId;
}

async function assertPicked(actual: string | undefined, expected: string) {
  const label = async (id?: string) => {
    const row = id ? await providersDb.getProviderConnectionById(id) : null;
    return row ? `${row.name} (p${row.priority})` : String(id);
  };
  assert.equal(
    actual,
    expected,
    `picked ${await label(actual)}, expected ${await label(expected)}`
  );
}

/** Seeds the account that gets priority 2 first, so stored order differs from priority order. */
async function seedPair(p2: [string, AuthType], p1: [string, AuthType]) {
  const ids = { p2: await seed(...p2), p1: await seed(...p1) };
  await setPriority(ids.p2, 2);
  await setPriority(ids.p1, 1);
  return ids;
}

test.beforeEach(async () => {
  oauthOccupancy._clearOAuthSessionOccupancyForTest();
  await resetStorage();
});

test.after(async () => {
  oauthOccupancy._clearOAuthSessionOccupancyForTest();
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const strategy of STRATEGIES) {
  test(`${strategy}: antigravity OAuth p2 + agy OAuth p1, a request for antigravity picks antigravity p2`, async () => {
    const ids = await seedPair(["antigravity", "oauth"], ["agy", "oauth"]);

    await assertPicked(await pick(strategy, "antigravity"), ids.p2);
  });

  test(`${strategy}: antigravity OAuth p2 + agy OAuth p1, an agy/ model requests antigravity and picks antigravity p2`, async () => {
    const ids = await seedPair(["antigravity", "oauth"], ["agy", "oauth"]);
    // The chat path asks for the parsed provider, and parsing resolves `agy/` to `antigravity`.
    const parsed = parseModel("agy/gemini-3-pro");
    assert.equal(parsed.provider, "antigravity");
    assert.equal(parsed.providerAlias, "agy");

    await assertPicked(await pick(strategy, parsed.provider as string), ids.p2);
  });

  test(`${strategy}: antigravity OAuth p2 + agy OAuth p1, a lookup by the agy id picks agy p1`, async () => {
    const ids = await seedPair(["antigravity", "oauth"], ["agy", "oauth"]);

    await assertPicked(await pick(strategy, "agy"), ids.p1);
  });

  test(`${strategy}: a retry without antigravity p1 picks antigravity p2 before agy p1`, async () => {
    const antigravityP1 = await seed("antigravity", "oauth");
    const antigravityP2 = await seed("antigravity", "oauth");
    const agyP1 = await seed("agy", "oauth");
    await assertPriority(antigravityP1, 1);
    await assertPriority(antigravityP2, 2);
    await assertPriority(agyP1, 1);

    await assertPicked(
      await pick(strategy, "antigravity", { excludeConnectionIds: [antigravityP1] }),
      antigravityP2
    );
  });

  test(`${strategy}: with both antigravity accounts excluded, agy p1 still serves`, async () => {
    const antigravityP1 = await seed("antigravity", "oauth");
    const antigravityP2 = await seed("antigravity", "oauth");
    const agyP1 = await seed("agy", "oauth");

    await assertPicked(
      await pick(strategy, "antigravity", {
        excludeConnectionIds: [antigravityP1, antigravityP2],
      }),
      agyP1
    );
  });

  test(`${strategy}: API keys, jina-ai p2 + jina-reader p1, a request for jina-ai picks jina-ai p2`, async () => {
    const ids = await seedPair(["jina-ai", "apikey"], ["jina-reader", "apikey"]);

    await assertPicked(await pick(strategy, "jina-ai"), ids.p2);
  });

  test(`${strategy}: kimi-coding OAuth p2 + kimi-coding-apikey p1, a request for kimi-coding picks the OAuth p2`, async () => {
    const ids = await seedPair(["kimi-coding", "oauth"], ["kimi-coding-apikey", "apikey"]);

    await assertPicked(await pick(strategy, "kimi-coding"), ids.p2);
  });

  test(`${strategy}: API keys, nvidia p2 + nvidia_nim p1, each requested id picks its own account`, async () => {
    const ids = await seedPair(["nvidia", "apikey"], ["nvidia_nim", "apikey"]);

    await assertPicked(await pick(strategy, "nvidia"), ids.p2);
    await assertPicked(await pick(strategy, "nvidia_nim"), ids.p1);
  });

  test(`${strategy}: a retry without jina-ai p1 picks jina-ai p2 before jina-reader p1`, async () => {
    const jinaP1 = await seed("jina-ai", "apikey");
    const jinaP2 = await seed("jina-ai", "apikey");
    const readerP1 = await seed("jina-reader", "apikey");
    await assertPriority(jinaP1, 1);
    await assertPriority(jinaP2, 2);
    await assertPriority(readerP1, 1);

    await assertPicked(await pick(strategy, "jina-ai", { excludeConnectionIds: [jinaP1] }), jinaP2);
  });

  test(`${strategy}: one provider id, openai API keys p2 + p1, picks p1`, async () => {
    const ids = await seedPair(["openai", "apikey"], ["openai", "apikey"]);

    await assertPicked(await pick(strategy, "openai"), ids.p1);
  });

  test(`${strategy}: one provider id, claude OAuth p2 + p1, picks p1`, async () => {
    const ids = await seedPair(["claude", "oauth"], ["claude", "oauth"]);

    await assertPicked(await pick(strategy, "claude"), ids.p1);
  });

  test(`${strategy}: two antigravity OAuth p1 accounts, the first busy, picks the idle one`, async () => {
    await setPriority(await seed("antigravity", "oauth"), 1);
    await setPriority(await seed("antigravity", "oauth"), 1);
    // Occupy the account the pool lists first, so only the availability tie-break can skip it.
    const [busy, idle] = (
      await providersDb.getRawProviderConnections({ provider: "antigravity", isActive: true })
    ).map((row) => (row as { id: string }).id);
    const release = oauthOccupancy.reserveOAuthSession(busy, "foreign-session", 60_000);
    try {
      await assertPicked(await pick(strategy, "antigravity", { sessionKey: "my-session" }), idle);
    } finally {
      release();
    }
  });

  test(`${strategy}: a busy antigravity p1 still spreads to an idle agy p1 when reserving an OAuth session`, async () => {
    const antigravityP1 = await seed("antigravity", "oauth");
    const agyP1 = await seed("agy", "oauth");
    await assertPriority(antigravityP1, 1);
    await assertPriority(agyP1, 1);
    // The OAuth session spread (#19578) still crosses aliases at the selected priority.
    const release = oauthOccupancy.reserveOAuthSession(antigravityP1, "foreign-session", 60_000);
    try {
      await assertPicked(
        await pick(strategy, "antigravity", {
          sessionKey: "my-session",
          reserveOAuthSession: true,
        }),
        agyP1
      );
    } finally {
      release();
    }
  });
}
