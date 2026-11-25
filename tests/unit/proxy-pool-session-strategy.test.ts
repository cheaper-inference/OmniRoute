import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The `session` rotation strategy keeps one conversation on one pool member: the pick is a
// rendezvous hash of the session key over the eligible members, so it needs no cursor, a
// member set aside moves only its own conversations, and they come back when it recovers.
// Without a session key the strategy behaves like round-robin.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-session-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const schemas = await import("../../src/shared/validation/schemas/proxy.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetProxyRefusalMemoryForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Member = { id: string; host: string; port: number };
let seq = 0;

async function pool(
  size: number,
  scope = "provider",
  scopeId: string | null = "openai"
): Promise<Member[]> {
  const members: Member[] = [];
  for (let i = 0; i < size; i++) {
    seq++;
    const host = `10.8.0.${seq}`;
    const port = 9100 + seq;
    const proxy = await proxiesDb.createProxy({ name: `member ${seq}`, type: "http", host, port });
    await proxiesDb.addProxyToScopePool(scope, scopeId, proxy.id);
    members.push({ id: proxy.id, host, port });
  }
  return members;
}

function setAside(member: Member) {
  memory.noteProxyRefusal(
    memory.proxyEgressKey({ type: "http", host: member.host, port: member.port }),
    "proxy_unreachable"
  );
}

function rotationRow() {
  return core
    .getDbInstance()
    .prepare(
      "SELECT cursor, rotated_at FROM proxy_scope_rotation WHERE scope = 'provider' AND scope_id IS 'openai'"
    )
    .get() as { cursor: number; rotated_at: string | null };
}

async function pick(sessionKey?: string, scope = "provider", scopeId: string | null = "openai") {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry(scope, scopeId, {
    sessionKey,
  });
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("session: the same key always resolves to the same member, without writing the cursor", async () => {
  await pool(4);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  assert.equal(await proxiesDb.getScopeRotationStrategy("provider", "openai"), "session");
  const first = await pick("sess-A");
  for (let i = 0; i < 20; i++) assert.equal(await pick("sess-A"), first);
  assert.equal(rotationRow().cursor, 0);
});

test("session: different keys spread over more than one member", async () => {
  await pool(4);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  const hosts = new Set<string>();
  for (let i = 0; i < 64; i++) hosts.add(await pick(`sess-${i}`));
  assert.ok(hosts.size >= 2, `expected a spread, got ${[...hosts]}`);
});

test("session: a member set aside moves only its own conversations, which return when it recovers", async () => {
  const members = await pool(4);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  const keys = Array.from({ length: 48 }, (_, i) => `sess-${i}`);
  const before = new Map<string, string>();
  for (const k of keys) before.set(k, await pick(k));
  const victimHost = before.get(keys[0]) as string;
  setAside(members.find((m) => m.host === victimHost)!);
  for (const k of keys) {
    const now = await pick(k);
    if (before.get(k) === victimHost) assert.notEqual(now, victimHost, k);
    else assert.equal(now, before.get(k), k);
  }
  memory.__resetProxyRefusalMemoryForTesting();
  for (const k of keys) assert.equal(await pick(k), before.get(k), k);
});

test("session: with every member set aside, each conversation stays on its earlier member", async () => {
  const members = await pool(3);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  const keys = Array.from({ length: 24 }, (_, i) => `sess-${i}`);
  const before = new Map<string, string>();
  for (const k of keys) before.set(k, await pick(k));
  for (const m of members) setAside(m);
  for (const k of keys) assert.equal(await pick(k), before.get(k), k);
});

test("session: without an identifier, behaves like round-robin", async () => {
  const [a, b] = await pool(2);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  assert.deepEqual(
    [await pick(), await pick(), await pick(), await pick()],
    [a.host, b.host, a.host, b.host]
  );
});

test("session: a pool mixing an edge relay picks by id, with no special case", async () => {
  await pool(2);
  const relay = await proxiesDb.createProxy({
    name: "edge relay",
    type: "vercel",
    host: "relay.example.test",
    port: 443,
  });
  await proxiesDb.addProxyToScopePool("provider", "openai", relay.id);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  const byKey = new Map<string, string>();
  for (let i = 0; i < 48; i++) byKey.set(`sess-${i}`, await pick(`sess-${i}`));
  assert.ok([...byKey.values()].includes("relay.example.test"), "the relay takes part in the hash");
  for (const [k, host] of byKey) assert.equal(await pick(k), host, k);
});

test("session: the pick reports its strategy only when a session key chose it", async () => {
  await pool(2);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "session");
  const bySession = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai", {
    sessionKey: "sess-A",
  });
  assert.equal((bySession as { rotationStrategy?: string }).rotationStrategy, "session");
  const withoutKey = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai");
  assert.equal("rotationStrategy" in (withoutKey as object), false);
});

test("schema: the pool route accepts strategy session", () => {
  assert.equal(
    schemas.proxyRotationStrategySchema.safeParse({ scope: "global", strategy: "session" }).success,
    true
  );
});

// ── Chat path: resolveProxyForConnection carries the session key to the pool ──

async function makeConnection(provider = "openai"): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apiKey",
    name: `Conn ${Date.now()} ${Math.random()}`,
    apiKey: "sk-test",
  });
  return (conn as { id: string }).id;
}

async function accountPool(provider: string, strategy: string, size = 3): Promise<string> {
  const connId = await makeConnection(provider);
  await pool(size, "account", connId);
  await proxiesDb.setScopeRotationStrategy("account", connId, strategy);
  return connId;
}

async function chatPick(connId: string, sessionKey?: string) {
  const resolved = await settingsDb.resolveProxyForConnection(connId, undefined, undefined, {
    sessionKey,
  });
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("chat: a common provider keeps the conversation on the same member", async () => {
  const connId = await accountPool("openai", "session");
  const first = await chatPick(connId, "sess-A");
  for (let i = 0; i < 5; i++) assert.equal(await chatPick(connId, "sess-A"), first);
});

test("chat: a per-IP quota provider spreads conversations and keeps each one stable", async () => {
  const connId = await accountPool("opencode-go", "session");
  const byKey = new Map<string, string>();
  for (let i = 0; i < 32; i++) byKey.set(`sess-${i}`, await chatPick(connId, `sess-${i}`));
  assert.ok(new Set(byKey.values()).size >= 2, `expected a spread, got ${[...byKey.values()]}`);
  for (const [k, host] of byKey) assert.equal(await chatPick(connId, k), host, k);
});

test("chat: a provider whose web session is pinned to the IP stays on one member", async () => {
  const connId = await accountPool("grok-web", "session");
  const hosts = new Set<string>();
  for (let i = 0; i < 32; i++) hosts.add(await chatPick(connId, `sess-${i}`));
  assert.equal(hosts.size, 1);
});

test("chat: with round-robin, the session key changes nothing for a per-IP quota provider", async () => {
  const connId = await accountPool("opencode-go", "round-robin");
  const hosts = new Set<string>();
  for (let i = 0; i < 32; i++) hosts.add(await chatPick(connId, `sess-${i}`));
  assert.equal(hosts.size, 1);
});

test("chat: session on the global pool keeps the conversation stable when the account has no pool", async () => {
  const connId = await makeConnection("openai");
  await pool(3, "global", null);
  await proxiesDb.setScopeRotationStrategy("global", null, "session");
  const byKey = new Map<string, string>();
  for (let i = 0; i < 16; i++) byKey.set(`sess-${i}`, await chatPick(connId, `sess-${i}`));
  assert.ok(new Set(byKey.values()).size >= 2, `expected a spread, got ${[...byKey.values()]}`);
  for (const [k, host] of byKey) assert.equal(await chatPick(connId, k), host, k);
});

test("chat helpers: safeResolveProxy and the pool re-selection resolver carry the session key", async () => {
  const { safeResolveProxy, publishPoolReselectResolver } =
    await import("../../src/sse/handlers/chatHelpers.ts");
  const connId = await accountPool("openai", "session", 4);
  const expected = await chatPick(connId, "sess-A");
  for (let i = 0; i < 5; i++) {
    const resolved = await safeResolveProxy(connId, undefined, undefined, null, "sess-A");
    assert.equal((resolved as { proxy: { host: string } }).proxy.host, expected);
  }
  const sink: { reselectPoolMember?: () => Promise<unknown> } = {};
  publishPoolReselectResolver(
    sink as never,
    { source: "registry", proxy: { host: expected } },
    { connectionId: connId, sessionKey: "sess-A" }
  );
  assert.equal(typeof sink.reselectPoolMember, "function");
  for (let i = 0; i < 5; i++) {
    const next = (await sink.reselectPoolMember!()) as { host: string };
    assert.equal(next.host, expected);
  }
});
