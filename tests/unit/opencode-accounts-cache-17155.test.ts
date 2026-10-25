import test from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import {
  listForRequest,
  releaseRequestList,
  type ScopedAccountHealth,
} from "../../open-sse/executors/opencodeAccountScope.ts";

function fixture() {
  const executor = new OpencodeExecutor("opencode");
  executor.accountHealth.set("alpha", { cooldownUntil: 10, consecutiveFails: 1 });
  return executor;
}

const health = (cooldownUntil = 0, consecutiveFails = 0): ScopedAccountHealth => ({
  cooldownUntil,
  consecutiveFails,
});
const members = (executor: OpencodeExecutor) => executor.accounts.map((a) => a.fingerprint);

test("warm reads reuse the populated and default direct-member views", () => {
  const executor = fixture();
  assert.strictEqual(executor.accounts, executor.accounts);
  assert.equal(executor.accounts[0].proxy, null);
  const empty = new OpencodeExecutor("opencode");
  assert.deepEqual(empty.accounts, [
    { fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
  ]);
  assert.strictEqual(empty.accounts, empty.accounts);
});

test("cooldown and failure setters invalidate the cache while old references stay live", () => {
  const executor = fixture();
  const first = executor.accounts;
  first[0].cooldownUntil = 100;
  const second = executor.accounts;
  assert.notStrictEqual(first, second);
  assert.equal(second[0].cooldownUntil, 100);
  first[0].consecutiveFails = 7;
  const third = executor.accounts;
  assert.notStrictEqual(second, third);
  assert.deepEqual(executor.accountHealth.get("alpha"), health(100, 7));
  assert.equal(second[0].consecutiveFails, 7);
  assert.equal(first[0].cooldownUntil, 100);
  assert.strictEqual(third, executor.accounts);
});

test("direct value replacement and in-place health updates remain visible through old getters", () => {
  const executor = fixture();
  const old = executor.accounts[0];
  executor.accountHealth.set("alpha", health(200, 3));
  assert.equal(old.cooldownUntil, 200);
  assert.equal(old.consecutiveFails, 3);
  const current = executor.accountHealth.get("alpha")!;
  current.cooldownUntil = 300;
  current.consecutiveFails = 4;
  assert.equal(old.cooldownUntil, 300);
  assert.equal(executor.accounts[0].consecutiveFails, 4);
});

test("Map.set adds members after a warm default view", () => {
  const executor = new OpencodeExecutor("opencode");
  const empty = executor.accounts;
  assert.strictEqual(executor.accountHealth.set("alpha", health()), executor.accountHealth);
  assert.deepEqual(members(executor), ["alpha"]);
  assert.notStrictEqual(executor.accounts, empty);
});

test("Map.set adds members after a warm populated view", () => {
  const executor = fixture();
  void executor.accounts;
  executor.accountHealth.set("beta", health());
  assert.deepEqual(members(executor), ["alpha", "beta"]);
});

test("Map.delete removes members while old getters preserve historical fallback", () => {
  const executor = fixture();
  executor.accountHealth.set("beta", health());
  const old = executor.accounts[0];
  assert.equal(executor.accountHealth.delete("alpha"), true);
  assert.equal(executor.accountHealth.delete("missing"), false);
  assert.deepEqual(members(executor), ["beta"]);
  assert.equal(old.cooldownUntil, 0);
  assert.equal(old.consecutiveFails, 0);
});

test("Map.clear restores the direct-member default", () => {
  const executor = fixture();
  void executor.accounts;
  assert.equal(executor.accountHealth.clear(), undefined);
  assert.deepEqual(members(executor), [""]);
  assert.strictEqual(executor.accounts, executor.accounts);
});

test("same-size delete/set and re-insertion preserve current Map membership and order", () => {
  const executor = fixture();
  executor.accountHealth.set("beta", health());
  void executor.accounts;
  executor.accountHealth.delete("alpha");
  executor.accountHealth.set("gamma", health());
  assert.deepEqual(members(executor), ["beta", "gamma"]);
  executor.accountHealth.delete("beta");
  executor.accountHealth.set("beta", health());
  assert.deepEqual(members(executor), ["gamma", "beta"]);
});

test("replacing the public Map preserves its identity and binds new views to that Map", () => {
  const executor = fixture();
  const oldStore = executor.accountHealth;
  const old = executor.accounts;
  const replacement = new Map([["alpha", health(900, 9)]]);
  executor.accountHealth = replacement;
  assert.strictEqual(executor.accountHealth, replacement);
  assert.ok(executor.accountHealth instanceof Map);
  const current = executor.accounts;
  assert.notStrictEqual(current, old);
  assert.equal(current[0].cooldownUntil, 900);
  old[0].consecutiveFails = 5;
  assert.equal(oldStore.get("alpha")?.consecutiveFails, 5);
  assert.equal(replacement.get("alpha")?.consecutiveFails, 9);
  replacement.set("beta", health());
  assert.deepEqual(members(executor), ["alpha", "beta"]);
});

test("an old view setter can restore a deleted member in the same Map", () => {
  const executor = fixture();
  const old = executor.accounts[0];
  executor.accountHealth.delete("alpha");
  assert.deepEqual(members(executor), [""]);
  old.consecutiveFails = 6;
  assert.deepEqual(members(executor), ["alpha"]);
  assert.deepEqual(executor.accountHealth.get("alpha"), health(0, 6));
});

test("release writes health before callback and releases the request list exactly once", () => {
  const store = new Map<string, ScopedAccountHealth>();
  const origin = {};
  const credentials = { providerSpecificData: { fingerprints: ["alpha"] } };
  const list = listForRequest(origin, store, credentials);
  list[0].cooldownUntil = 400;
  list[0].consecutiveFails = 4;
  let calls = 0;
  const callback = () => {
    calls++;
    assert.deepEqual(store.get("alpha"), health(400, 4));
  };
  releaseRequestList(origin, store, callback);
  releaseRequestList(origin, store, callback);
  assert.equal(calls, 1);
  assert.notStrictEqual(listForRequest(origin, store, credentials), list);
  releaseRequestList(origin, store);
});

test("release without a stored list does not invoke the callback or mutate health", () => {
  const store = new Map([["alpha", health(10, 1)]]);
  let calls = 0;
  for (const origin of [undefined, null, 42, "body", {}]) {
    releaseRequestList(origin, store, () => calls++);
  }
  assert.equal(calls, 0);
  assert.deepEqual([...store], [["alpha", health(10, 1)]]);
});

test("release without an optional callback still writes health visible to the executor", () => {
  const executor = fixture();
  const old = executor.accounts;
  const origin = {};
  const list = listForRequest(origin, executor.accountHealth, {
    providerSpecificData: { fingerprints: ["alpha", "beta"] },
  });
  list[0].cooldownUntil = 500;
  list[1].consecutiveFails = 2;
  releaseRequestList(origin, executor.accountHealth);
  assert.equal(old[0].cooldownUntil, 500);
  assert.deepEqual(members(executor), ["alpha", "beta"]);
  assert.equal(executor.accounts[1].consecutiveFails, 2);
});

test("execute releases the real request list and invalidates a warm view after writeback", async () => {
  const executor = new OpencodeExecutor("opencode-zen");
  const fingerprint = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  executor.accountHealth.set(fingerprint, health(0, 1));
  const warm = executor.accounts;
  const originalFetch = globalThis.fetch;
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched++;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  const body = { messages: [{ role: "user", content: "synthetic cache fixture" }], stream: false };
  const credentials = {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: { fingerprints: [fingerprint] },
  };
  const requestList = listForRequest(body, executor.accountHealth, credentials);
  try {
    await executor.execute({
      model: "deepseek-v4-flash-free",
      body,
      stream: false,
      signal: null,
      credentials,
      log: { debug() {}, info() {}, warn() {}, error() {} },
    });
    assert.equal(dispatched, 1);
    assert.notStrictEqual(executor.accounts, warm);
    assert.strictEqual(executor.accounts, executor.accounts);
    assert.notStrictEqual(listForRequest(body, executor.accountHealth, credentials), requestList);
  } finally {
    globalThis.fetch = originalFetch;
    releaseRequestList(body, executor.accountHealth);
  }
});
