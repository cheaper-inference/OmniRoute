import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-lru-pass-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-lru-pass-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");

const POOL = 300;
const stamp = (i: number) => new Date(Date.UTC(2026, 0, 1, 0, 0, 0) + i * 1000).toISOString();
// Deterministic shuffle (7919 is coprime with POOL): a presorted list would hide the sort cost.
const shuffled = (i: number) => stamp((i * 7919) % POOL);

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/** `count` connections with shuffled `lastUsedAt`; index 0 is the oldest. */
async function seedPool(
  count: number,
  overrides: (i: number) => Record<string, unknown> = () => ({})
) {
  const ids: string[] = [];
  for (let i = 0; i < count; i++) {
    const { lastUsedAt = shuffled(i), ...rest } = overrides(i) as { lastUsedAt?: string | null };
    const created = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: `lru-${i}`,
      apiKey: `sk-lru-${i}`,
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
      ...rest,
    });
    // createProviderConnection does not take lastUsedAt; set it the way the selector's commit does.
    await providersDb.updateProviderConnection(created.id, { lastUsedAt, consecutiveUseCount: 0 });
    ids.push(created.id);
  }
  return ids;
}

/** Count every parse of one of the seeded `lastUsedAt` strings while `fn` runs. */
async function countLastUsedParses<T>(fn: () => Promise<T>) {
  const seeded = new Set(Array.from({ length: POOL }, (_, i) => stamp(i)));
  const RealDate = globalThis.Date;
  let parses = 0;
  class CountingDate extends RealDate {
    constructor(...args: unknown[]) {
      if (typeof args[0] === "string" && seeded.has(args[0])) parses++;
      super(...(args as []));
    }
    static parse(text: string) {
      if (seeded.has(text)) parses++;
      return RealDate.parse(text);
    }
  }
  globalThis.Date = CountingDate as unknown as DateConstructor;
  try {
    return { result: await fn(), parses };
  } finally {
    globalThis.Date = RealDate;
  }
}

test.beforeEach(resetStorage);
test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("round-robin LRU pick of a large pool parses dates a linear number of times", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "round-robin", stickyRoundRobinLimit: 0 });
  const ids = await seedPool(POOL);

  const { result, parses } = await countLastUsedParses(() => auth.getProviderCredentials("openai"));

  assert.equal(result.connectionId, ids[0], "the least recently used account is picked");
  assert.ok(parses <= 3 * POOL, `expected a linear number of date parses, got ${parses}`);
});

test("least-used picks the same account with a linear number of date parses", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });
  const ids = await seedPool(POOL);

  const { result, parses } = await countLastUsedParses(() => auth.getProviderCredentials("openai"));

  assert.equal(result.connectionId, ids[0]);
  assert.ok(parses <= 3 * POOL, `expected a linear number of date parses, got ${parses}`);
});

test("LRU tie-break order is unchanged: never used first by priority, then oldest", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });
  // 1 and 2 were never used (priority follows insertion order); 0, 3, 4 were used, 0 first.
  const ids = await seedPool(5, (i) => ({ lastUsedAt: i === 1 || i === 2 ? null : stamp(i) }));

  const pick = async (excluded: string[]) =>
    (
      await auth.getProviderCredentials("openai", null, null, null, {
        excludeConnectionIds: excluded,
      })
    ).connectionId;

  assert.equal(await pick([]), ids[1], "never-used account with the best priority wins");
  assert.equal(await pick([ids[1]]), ids[2]);
  assert.equal(await pick([ids[1], ids[2]]), ids[0], "then the oldest used account");
  assert.equal(await pick([ids[1], ids[2], ids[0]]), ids[3]);
});

test("round-robin sticky window keeps the most recently used account", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "round-robin", stickyRoundRobinLimit: 5 });
  const ids = await seedPool(4, (i) => ({ lastUsedAt: stamp(i) }));
  // ids[3] has the newest lastUsedAt and a count below the sticky limit: stay on it.
  const picked = await auth.getProviderCredentials("openai");
  assert.equal(picked.connectionId, ids[3]);
});
