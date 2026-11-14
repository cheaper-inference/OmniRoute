import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ACCOUNT_FALLBACK_STRATEGY_VALUES } from "../../src/shared/constants/routingStrategies.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-new-pin-strategy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "new-pin-strategy-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const affinityDb = await import("../../src/lib/db/sessionAccountAffinity.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const auth = await import("../../src/sse/services/auth.ts");
const oauthOccupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

const TTL = 60_000;
const MODEL = "gpt-5.5";
const held: Array<() => void> = [];
// Every account strategy, by where a new session starts.
const LRU_START_STRATEGIES = [
  "round-robin",
  "least-used",
  "p2c",
  "random",
  "strict-random",
  "expiry-first",
];
const ROUTED_START_STRATEGIES = ["fill-first", "priority", "cost-optimized"];

// In-memory command double only; no Redis server or Lua execution.
class FakeRedis {
  values = new Map<string, string>();
  async get(key: string) {
    return this.values.get(key) ?? null;
  }
  async set(key: string, value: string, _mode: "PX", _ttl: number) {
    this.values.set(key, value);
    return "OK";
  }
  async del(key: string) {
    return Number(this.values.delete(key));
  }
  async eval(
    _script: string,
    _keys: number,
    key: string,
    expected: string,
    replacement: string,
    _ttl: number
  ) {
    if (expected === undefined) return [await this.get(key), this.values.has(key) ? 60_000 : -2];
    if ((this.values.get(key) ?? "") !== expected) return [0, await this.get(key), 60_000];
    if (!replacement) return [Number(this.values.delete(key)), null, -2];
    this.values.set(key, replacement);
    return [1, replacement, _ttl];
  }
}

function useDriver(driver: "sqlite" | "redis") {
  if (driver === "sqlite") return;
  const redis = new FakeRedis();
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => true,
  });
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
}

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

function agoIso(ms: number) {
  return new Date(Date.now() - ms).toISOString();
}

async function seedCodex(name: string, priority: number, overrides: Record<string, unknown> = {}) {
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email: `${name}@example.com`,
    accessToken: `access-${name}`,
    refreshToken: `refresh-${name}`,
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
    ...overrides,
  });
  assert.ok(created?.id);
  return created.id as string;
}

/** `top` served the latest request, `middle` an older one, `idle` none (LRU: idle, middle, top). */
async function seedAccounts(topOverrides: Record<string, unknown> = {}) {
  const top = await seedCodex("new-pin-top", 1, topOverrides);
  const middle = await seedCodex("new-pin-middle", 2);
  const idle = await seedCodex("new-pin-idle", 3);
  // createProviderConnection does not persist lastUsedAt; write it through update.
  await providersDb.updateProviderConnection(top, { lastUsedAt: agoIso(1_000) });
  await providersDb.updateProviderConnection(middle, { lastUsedAt: agoIso(60_000) });
  return { top, middle, idle };
}

/** Selects as the chat path does (OAuth session reserved); `hold` keeps the session in flight. */
async function selectFor(sessionKey: string, { hold = false } = {}) {
  const creds = await auth.getProviderCredentials("codex", null, null, MODEL, {
    sessionKey,
    reserveOAuthSession: true,
  });
  if (creds?.releaseOAuthSession) {
    if (hold) held.push(creds.releaseOAuthSession);
    else creds.releaseOAuthSession();
  }
  return creds?.connectionId;
}

function pinOf(sessionKey: string) {
  return affinityDb.getSessionAccountAffinity(sessionKey, "codex", TTL)?.connectionId;
}

test.beforeEach(async () => {
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  oauthOccupancy._clearOAuthSessionOccupancyForTest();
  await resetStorage();
});

test.afterEach(() => {
  held.splice(0).forEach((release) => release());
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── Leaf: selectSessionAffinityConnection / planSessionAffinityConnection ──

function candidates() {
  return [
    { id: "top", priority: 1, lastUsedAt: agoIso(1_000) },
    { id: "idle", priority: 2, lastUsedAt: agoIso(60_000) },
  ];
}
const firstInPool = <T>(pool: T[]) => pool[0];

test("only spreading strategies keep the LRU session start", () => {
  assert.deepEqual(
    [...LRU_START_STRATEGIES, ...ROUTED_START_STRATEGIES].sort(),
    [...ACCOUNT_FALLBACK_STRATEGY_VALUES].sort(),
    "list every account strategy in exactly one group"
  );
  for (const strategy of ACCOUNT_FALLBACK_STRATEGY_VALUES) {
    assert.equal(
      pin.startsNewSessionsOnLru(strategy),
      LRU_START_STRATEGIES.includes(strategy),
      strategy
    );
  }
});

for (const driver of ["sqlite", "redis"] as const) {
  test(`${driver}: a new pin takes pickNewPin's account and the default stays LRU`, async () => {
    useDriver(driver);
    const store = factory.getSessionAffinityStore();

    const lru = await pin.selectSessionAffinityConnection("glm", "leaf-lru", candidates(), TTL);
    const picked = await pin.selectSessionAffinityConnection(
      "glm",
      "leaf-picked",
      candidates(),
      TTL,
      undefined,
      firstInPool
    );

    assert.equal(lru?.id, "idle");
    assert.equal(picked?.id, "top");
    assert.equal((await store.get("leaf-picked", "glm", TTL))?.connectionId, "top");
  });

  test(`${driver}: an existing pin wins over pickNewPin`, async () => {
    useDriver(driver);
    const store = factory.getSessionAffinityStore();
    await store.upsert("leaf-kept", "glm", "idle", Date.now(), TTL);

    const selected = await pin.selectSessionAffinityConnection(
      "glm",
      "leaf-kept",
      candidates(),
      TTL,
      undefined,
      firstInPool
    );

    assert.equal(selected?.id, "idle");
  });
}

test("planSessionAffinityConnection plans pickNewPin's account and writes the pin only on commit", async () => {
  const plan = pin.planSessionAffinityConnection(
    "glm",
    "leaf-plan",
    candidates(),
    TTL,
    undefined,
    firstInPool
  );

  assert.equal(plan?.connection.id, "top");
  assert.equal(affinityDb.getSessionAccountAffinity("leaf-plan", "glm", TTL), null);
  await plan?.commit();
  assert.equal(affinityDb.getSessionAccountAffinity("leaf-plan", "glm", TTL)?.connectionId, "top");
  assert.equal(
    pin.planSessionAffinityConnection("glm", "leaf-plan-lru", candidates(), TTL)?.connection.id,
    "idle"
  );
});

// ── getProviderCredentials ──

for (const strategy of ROUTED_START_STRATEGIES) {
  test(`${strategy}: new sessions pin the top-priority account even when it was used most recently`, async () => {
    await settingsDb.updateSettings({ fallbackStrategy: strategy, sessionAffinityTtlMs: TTL });
    const { top } = await seedAccounts();

    const sessionA1 = await selectFor("session-a");
    const sessionB1 = await selectFor("session-b");
    const sessionA2 = await selectFor("session-a");

    assert.equal(sessionA1, top, "LRU would have pinned the idle account");
    assert.equal(sessionB1, top);
    assert.equal(sessionA2, top);
    assert.equal(pinOf("session-a"), top);
    assert.equal(pinOf("session-b"), top);
  });
}

for (const strategy of ROUTED_START_STRATEGIES) {
  test(`${strategy}: a new session starts and stays on the top account while another session is in flight there`, async () => {
    await settingsDb.updateSettings({ fallbackStrategy: strategy, sessionAffinityTtlMs: TTL });
    const { top } = await seedAccounts();

    const busy = await selectFor("session-in-flight", { hold: true });
    const fresh = await selectFor("session-fresh", { hold: true });

    assert.equal(busy, top);
    assert.equal(fresh, top, `OAuth session spreading must not move a ${strategy} start (#19262)`);
    assert.equal(pinOf("session-fresh"), top);
    assert.equal(await selectFor("session-fresh"), top);
  });
}

for (const strategy of LRU_START_STRATEGIES) {
  test(`${strategy}: new sessions keep the LRU start`, async () => {
    await settingsDb.updateSettings({ fallbackStrategy: strategy, sessionAffinityTtlMs: TTL });
    const { top, middle, idle } = await seedAccounts();

    const first = await selectFor("spread-1");
    const second = await selectFor("spread-2");
    const third = await selectFor("spread-3");

    assert.deepEqual([first, second, third], [idle, middle, top]);
  });
}

test("fill-first: an existing pin is kept although a new session would start elsewhere", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first", sessionAffinityTtlMs: TTL });
  const { top, middle } = await seedAccounts();
  affinityDb.upsertSessionAccountAffinity("session-kept", "codex", middle, Date.now(), TTL);

  const kept = await selectFor("session-kept");
  const fresh = await selectFor("session-new");

  assert.equal(kept, middle);
  assert.equal(pinOf("session-kept"), middle);
  assert.equal(fresh, top);
});

for (const [label, topOverrides] of [
  ["connection cooldown", { rateLimitedUntil: futureIso(600_000) }],
  [
    "Codex scope cooldown",
    { providerSpecificData: { codexScopeRateLimitedUntil: { codex: futureIso(600_000) } } },
  ],
] as const) {
  test(`fill-first: a new session skips the top account during a ${label}`, async () => {
    await settingsDb.updateSettings({ fallbackStrategy: "fill-first", sessionAffinityTtlMs: TTL });
    const { middle } = await seedAccounts(topOverrides);

    const selected = await selectFor("session-cooldown");

    assert.equal(selected, middle, "next account in priority order, not the LRU idle one");
    assert.equal(pinOf("session-cooldown"), middle);
  });
}

test("fill-first: a session started during a cooldown keeps its pin after the top account recovers", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first", sessionAffinityTtlMs: TTL });
  const { top, middle } = await seedAccounts({ rateLimitedUntil: futureIso() });

  const duringCooldown = await selectFor("session-failover");
  await providersDb.updateProviderConnection(top, { rateLimitedUntil: null });
  const afterRecovery = await selectFor("session-failover");
  const fresh = await selectFor("session-after-recovery");

  assert.equal(duringCooldown, middle);
  assert.equal(afterRecovery, middle, "the pin keeps the conversation's prompt cache");
  assert.equal(fresh, top);
});

test("fill-first lease path plans the new pin on the top-priority account", async () => {
  await settingsDb.updateSettings({ fallbackStrategy: "fill-first", sessionAffinityTtlMs: TTL });
  const makeConnection = async (name: string, priority: number, lastUsedAt?: string) => {
    const connection = await providersDb.createProviderConnection({
      provider: "glm",
      authType: "apikey",
      name: `new-pin-lease-${name}`,
      apiKey: `synthetic-new-pin-lease-${name}`,
      isActive: true,
      testStatus: "active",
      priority,
    });
    const id = String(connection.id);
    // createProviderConnection does not persist lastUsedAt; write it through update.
    if (lastUsedAt) await providersDb.updateProviderConnection(id, { lastUsedAt });
    return id;
  };
  const top = await makeConnection("top", 1, agoIso(1_000));
  const idle = await makeConnection("idle", 2);
  const key = await apiKeysDb.createApiKey("synthetic", "test", ["lease:exclusive"], {
    allowedConnections: [top, idle],
  });
  const owner = `vlo_${"P".repeat(43)}`;

  const selected = await auth.getProviderCredentials("glm", null, [top, idle], null, {
    sessionKey: "session-lease",
    sessionAffinityTtlMs: TTL,
    materializeCredentials: false,
    lease: {
      apiKeyId: key.id,
      context: {
        leaseOwnerId: owner,
        leaseOwnerHash: leases.hashLeaseOwnerId(owner),
        ownerDiagnostic: "synthetic",
        generation: 1,
      },
      mode: "acquire" as const,
    },
  });

  assert.equal(selected?.connectionId, top, "LRU would have planned the idle account");
  assert.equal(
    affinityDb.getSessionAccountAffinity("session-lease", "glm", TTL)?.connectionId,
    top
  );
  leases.invalidateExclusiveConnectionLease({
    leaseOwnerId: owner,
    generation: 1,
    apiKeyId: key.id,
    reason: "CONNECTION_INELIGIBLE",
  });
});

test("cost-optimized: a new pin across alias providers takes the lowest priority, as an unpinned request does", async () => {
  await settingsDb.updateSettings({
    fallbackStrategy: "cost-optimized",
    sessionAffinityTtlMs: TTL,
  });
  const seedApiKey = async (provider: string, name: string) => {
    const created = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `new-pin-alias-${name}`,
      apiKey: `synthetic-new-pin-alias-${name}`,
      isActive: true,
      testStatus: "active",
    });
    assert.ok(created?.id);
    return created.id as string;
  };
  // nvidia searches [nvidia, nvidia_nim] (#922), so the pool lists priority 2 before priority 1.
  const second = await seedApiKey("nvidia", "second");
  // createProviderConnection renumbers per provider; an explicit update keeps 2.
  await providersDb.updateProviderConnection(second, { priority: 2 });
  const first = await seedApiKey("nvidia_nim", "first");

  const unpinned = await auth.getProviderCredentials("nvidia");
  const pinned = await auth.getProviderCredentials("nvidia", null, null, null, {
    sessionKey: "session-alias",
  });

  assert.equal(unpinned?.connectionId, first);
  assert.equal(pinned?.connectionId, first, "the pin goes where cost-optimized routes");
  assert.equal(
    affinityDb.getSessionAccountAffinity("session-alias", "nvidia", TTL)?.connectionId,
    first
  );
});
