import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-redis-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const { sessionAffinityAccountIdentity } =
  await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const NOW = Date.now(),
  TTL = 45000;
const session = "legacy-session";
const key = (provider: string) =>
  "session_affinity:" +
  provider +
  ":" +
  createHash("sha256")
    .update(provider + ":" + session)
    .digest("hex");
function record(connectionId = "legacy", accountIdentity?: string) {
  return {
    connectionId,
    ...(accountIdentity ? { accountIdentity } : {}),
    createdAt: new Date(NOW - 1000).toISOString(),
    lastUsedAt: new Date(NOW - 100).toISOString(),
    expiresAt: new Date(NOW + TTL).toISOString(),
  };
}
// Keyed Redis command double, including the pair-key Lua operations' atomic boundary.
class Redis {
  rows = new Map<string, { raw: string; ttl: number }>();
  fail = false;
  hold?: Promise<void>;
  beforeMutation?: () => void;
  seed(provider: string, connectionId = "legacy", accountIdentity?: string) {
    this.rows.set(key(provider), {
      raw: JSON.stringify(record(connectionId, accountIdentity)),
      ttl: TTL,
    });
  }
  async get(k: string) {
    if (this.fail) throw Error("fixture outage");
    return this.rows.get(k)?.raw ?? null;
  }
  async set(k: string, v: string, _mode: string, ttl: number) {
    this.rows.set(k, { raw: v, ttl });
  }
  async del(k: string) {
    return Number(this.rows.delete(k));
  }
  async eval(_script: string, count: number, k: string, ...args: Array<string | number>) {
    if (this.fail) throw Error("fixture outage");
    const legacy = count === 2 ? String(args.shift()) : undefined;
    if (!args.length) {
      const source = this.rows.has(k) ? k : legacy && this.rows.has(legacy) ? legacy : k;
      if (count === 2 && source === k && this.rows.has(k)) this.rows.delete(legacy!);
      const row = this.rows.get(source);
      return [row?.raw ?? null, row?.ttl ?? -2, ...(count === 2 ? [source === k ? 1 : 2] : [])];
    }
    this.beforeMutation?.();
    this.beforeMutation = undefined;
    const source = this.rows.has(k) ? k : legacy && this.rows.has(legacy) ? legacy : k;
    if (count === 2 && source === k && this.rows.has(k)) this.rows.delete(legacy!);
    const expectedSlot = count === 2 ? Number(args.shift()) : 1;
    const expectedKey = expectedSlot === 1 ? k : expectedSlot === 2 ? legacy : undefined;
    const [expected, replacement, ttl] = args;
    const row = this.rows.get(source);
    if (source !== expectedKey || (row?.raw ?? "") !== expected)
      return [0, row?.raw ?? null, row?.ttl ?? -2, ...(count === 2 ? [source === k ? 1 : 2] : [])];
    const existed = !!row;
    this.rows.delete(source);
    if (legacy) this.rows.delete(legacy);
    if (replacement) this.rows.set(k, { raw: String(replacement), ttl: Number(ttl) });
    const hold = this.hold;
    this.hold = undefined;
    if (hold) await hold;
    return [
      replacement ? 1 : Number(existed),
      replacement || null,
      replacement ? ttl : -2,
      ...(count === 2 ? [1] : []),
    ];
  }
}
test.afterEach(() => local.delete(session, "kimi"));
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
function setup() {
  const redis = new Redis();
  return { redis, store: new RedisSessionAffinityStore(async () => redis, local, 100) };
}
test("C2 legacy-only read retains account bytes and server TTL; healthy canonical retires superseded key", async () => {
  const { redis, store } = setup();
  redis.seed("moonshot");
  const legacy = await store.get(session, "kimi", 60000, NOW);
  assert.equal(legacy?.connectionId, "legacy");
  assert.equal(legacy?.expiresAt, new Date(NOW + TTL).toISOString());
  redis.seed("kimi", "healthy");
  assert.equal((await store.get(session, "moonshot", 60000, NOW))?.connectionId, "healthy");
  assert.equal(redis.rows.has(key("moonshot")), false);
});
test("C2 legacy touch moves pin with createdAt intact and clear cannot resurrect old Redis or local pin", async () => {
  const { redis, store } = setup();
  redis.seed("moonshot");
  await store.touch(session, "moonshot", NOW + 1000, 60000);
  assert.equal(JSON.parse(redis.rows.get(key("kimi"))?.raw ?? "null")?.connectionId, "legacy");
  assert.equal(JSON.parse(redis.rows.get(key("kimi"))!.raw).createdAt, record().createdAt);
  assert.equal(redis.rows.has(key("moonshot")), false);
  redis.seed("moonshot", "obsolete");
  await store.delete(session, "kimi");
  assert.equal(redis.rows.size, 0);
  assert.equal(await store.get(session, "kimi", 60000), null);
  redis.fail = true;
  assert.equal(await store.get(session, "moonshot", 60000), null);
});
test("C2 stale legacy observation cannot overwrite or delete a concurrent canonical winner", async () => {
  const { redis, store } = setup();
  redis.seed("moonshot");
  const observed = await store.get(session, "kimi", 60000, NOW);
  assert.ok(observed);
  redis.seed("kimi", "healthy");
  const winner = await store.upsert(session, "moonshot", "loser", NOW, 60000, undefined, observed);
  assert.equal(winner?.connectionId, "healthy");
  assert.equal(redis.rows.has(key("moonshot")), false);
  await store.delete(session, "moonshot", observed);
  assert.equal(JSON.parse(redis.rows.get(key("kimi"))!.raw).connectionId, "healthy");
});
test("C2 legacy upsert and identity-guarded eviction preserve a different account", async () => {
  const { redis, store } = setup();
  const candidate = { id: "legacy", apiKey: "synthetic-account", provider: "kimi" };
  const identity = sessionAffinityAccountIdentity(candidate, "kimi")!;
  redis.seed("moonshot", "legacy", identity);
  assert.equal(await store.evict(session, "kimi", "legacy", "b".repeat(64)), false);
  assert.equal(redis.rows.has(key("moonshot")), true);
  await store.upsert(session, "kimi", "legacy", NOW, 60000, identity);
  assert.equal(redis.rows.has(key("moonshot")), false);
  assert.equal(await store.evict(session, "moonshot", "legacy", identity), true);
  assert.equal(redis.rows.size, 0);
});

test("C2 missing expected digest and missing candidate cannot evict API account by reused local id", async () => {
  const { redis, store } = setup();
  redis.seed("kimi", "reused", "a".repeat(64));
  assert.equal(await store.evict(session, "kimi", "reused"), false);
  assert.equal(redis.rows.has(key("kimi")), true);
  const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
  const eviction = await import("../../src/lib/db/sessionAffinity/requestEviction.ts");
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => true,
  });
  try {
    assert.equal(
      await eviction.evictSessionAccountAffinityForConnectionAsync(session, "moonshot", "reused"),
      false
    );
    assert.equal(redis.rows.has(key("kimi")), true);
  } finally {
    factory._setSessionAffinityRedisForTests(null);
    delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  }
});
test("C2 late legacy promotion clears only its own timeout fallback bytes", async () => {
  const { redis } = setup();
  redis.seed("moonshot");
  let release!: () => void;
  redis.hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  const store = new RedisSessionAffinityStore(async () => redis, local, 10);
  await store.upsert(session, "kimi", "timeout", NOW, 60000);
  assert.equal(local.get(session, "kimi", 60000, NOW)?.connectionId, "timeout");
  local.upsert(session, "kimi", "newer", NOW + 1, 60000);
  release();
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(local.get(session, "kimi", 60000, NOW)?.connectionId, "newer");
  assert.equal(redis.rows.has(key("moonshot")), false);
  assert.equal((await store.get(session, "kimi", 60000, NOW))?.connectionId, "timeout");
  assert.equal(local.get(session, "kimi", 60000, NOW), null);
});
test("C2 legacy account digest is accepted only after verifying the actual candidate identity", async () => {
  const { redis, store } = setup();
  const candidate = {
    id: "account",
    provider: "kimi",
    authType: "oauth",
    email: "fixture@example.test",
  };
  const expected = sessionAffinityAccountIdentity(candidate, "kimi");
  const { resolveUsageAccountIdentity } = await import("../../src/lib/usage/accountIdentity.ts");
  const legacy = createHash("sha256")
    .update(resolveUsageAccountIdentity({ ...candidate, provider: "moonshot" }).accountKey)
    .digest("hex");
  redis.seed("moonshot", "old-local-id", legacy);
  assert.equal(await store.evict(session, "kimi", candidate.id, "f".repeat(64)), false);
  assert.equal(await store.evict(session, "kimi", candidate.id, expected), true);
  assert.equal(redis.rows.size, 0);
});
test("C2 an observation from another session cannot authorize equal-byte legacy mutation", async () => {
  const { redis, store } = setup();
  redis.seed("moonshot");
  const observed = await store.get(session, "kimi", 60000, NOW);
  assert.ok(observed);
  const other = "other-session";
  const otherLegacy =
    "session_affinity:moonshot:" +
    createHash("sha256")
      .update("moonshot:" + other)
      .digest("hex");
  redis.rows.set(otherLegacy, { raw: JSON.stringify(record()), ttl: TTL });
  const winner = await store.upsert(other, "kimi", "loser", NOW, 60000, undefined, observed);
  assert.equal(winner?.connectionId, "legacy");
  assert.equal(JSON.parse(redis.rows.get(otherLegacy)!.raw).connectionId, "legacy");
});
