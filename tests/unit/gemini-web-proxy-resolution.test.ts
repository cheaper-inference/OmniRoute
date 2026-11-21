import assert from "node:assert/strict";
import test from "node:test";
import "../_setup/isolateDataDir.ts";
import { resolvePlaywrightProxyForConnection } from "../../open-sse/services/browserPool.ts";
import { createCombo } from "../../src/lib/db/combos.ts";
import { getDbInstance, shutdownDbInstance } from "../../src/lib/db/core.ts";
import { createProviderConnection } from "../../src/lib/db/providers.ts";
import {
  addProxyToScopePool,
  assignProxyToScope,
  createProxy,
  updateProxy,
} from "../../src/lib/db/proxies.ts";
import { setProxyForLevel } from "../../src/lib/db/settings.ts";

const provider = "gemini-web";
const resolve = (id: string) => resolvePlaywrightProxyForConnection(provider, id);

async function connection(name: string, proxyEnabled = true, providerId = provider) {
  const row = await createProviderConnection({
    provider: providerId,
    authType: "apiKey",
    name,
    apiKey: `fixture-${name}`,
    proxyEnabled,
  });
  return row.id;
}

async function proxy(port: number, type = "http") {
  const row = await createProxy({ name: `local-${port}`, host: "127.0.0.1", port, type });
  assert.ok(row);
  return row.id;
}

function setGlobalProxy(value: boolean) {
  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'proxyEnabled', ?)"
    )
    .run(JSON.stringify(value));
}

test.after(async () => {
  await shutdownDbInstance();
});

test.before(async () => {
  await assignProxyToScope("provider", provider, await proxy(19001));
});

test("a connection with proxy off does not inherit the provider proxy", async () => {
  const id = await connection("disabled", false);
  assert.equal(await resolve(id), undefined);
});

test("no account assignment inherits the configured provider proxy", async () => {
  const id = await connection("unassigned");
  assert.deepEqual(await resolve(id), { server: "http://127.0.0.1:19001" });
});

test("an exhausted account pool does not inherit the provider proxy", async () => {
  const id = await connection("exhausted");
  const dead = await proxy(19002);
  await updateProxy(dead, { status: "inactive" });
  await assignProxyToScope("account", id, dead);
  await assert.rejects(resolve(id), /PROXY_ASSIGNED_UNAVAILABLE/);
});

test("a mixed account pool selects a live member and preserves HTTPS", async () => {
  const id = await connection("mixed");
  const dead = await proxy(19003);
  await updateProxy(dead, { status: "inactive" });
  await assignProxyToScope("account", id, dead);
  await addProxyToScopePool("account", id, await proxy(19004, "https"));
  assert.deepEqual(await resolve(id), { server: "https://127.0.0.1:19004" });
});

test("global proxy off is an explicit direct choice", async () => {
  const id = await connection("global-off");
  await assignProxyToScope("account", id, await proxy(19005));
  setGlobalProxy(false);
  try {
    assert.equal(await resolve(id), undefined);
  } finally {
    setGlobalProxy(true);
  }
});

test("legacy account-specific proxy wins over provider fallback", async () => {
  const id = await connection("legacy");
  await setProxyForLevel("key", id, { type: "http", host: "127.0.0.1", port: 19006 });
  assert.deepEqual(await resolve(id), { server: "http://127.0.0.1:19006" });
});

test("an unavailable assignment table is not treated as unassigned", async () => {
  const id = await connection("assignment-query-error");
  const db = getDbInstance();
  db.exec("ALTER TABLE proxy_assignments RENAME TO proxy_assignments_fixture");
  try {
    await assert.rejects(resolve(id), /fail-closed.*no such table: proxy_assignments/);
  } finally {
    db.exec("ALTER TABLE proxy_assignments_fixture RENAME TO proxy_assignments");
  }
});

test("an unavailable global proxy setting is not treated as enabled", async (t) => {
  const id = await connection("global-setting-error");
  const db = getDbInstance();
  const prepare = db.prepare;
  let failedReads = 0;
  t.mock.method(db, "prepare", (sql: string) => {
    if (sql.includes("key = 'proxyEnabled'")) {
      failedReads++;
      throw new Error("fixture: proxy settings query failed");
    }
    return prepare.call(db, sql);
  });
  await assert.rejects(resolve(id), /fail-closed.*proxy settings query failed/);
  assert.ok(failedReads > 0);
});

test("a stale connection id is not treated as an unassigned account", async () => {
  await assert.rejects(resolve("missing-connection"), /connection no longer exists/);
});

test("an exhausted provider pool does not inherit the global proxy", async () => {
  const dead = await proxy(19008);
  await updateProxy(dead, { status: "inactive" });
  await assignProxyToScope("provider", "test-provider", dead);
  await assignProxyToScope("global", null, await proxy(19009));
  try {
    await assert.rejects(
      resolvePlaywrightProxyForConnection("test-provider", undefined),
      /PROXY_ASSIGNED_UNAVAILABLE/
    );
    assert.deepEqual(await resolvePlaywrightProxyForConnection("unassigned-provider", undefined), {
      server: "http://127.0.0.1:19009",
    });
  } finally {
    await assignProxyToScope("global", null, null);
  }
});

test("the connection inherits its combo proxy before the global proxy", async () => {
  const id = await connection("combo-fallback", true, "combo-browser");
  const combo = await createCombo({ name: "browser-combo", models: ["combo-browser/example"] });
  assert.equal(typeof combo.id, "string");
  await assignProxyToScope("combo", String(combo.id), await proxy(19011));
  await assignProxyToScope("global", null, await proxy(19012));
  try {
    assert.deepEqual(await resolvePlaywrightProxyForConnection("combo-browser", id), {
      server: "http://127.0.0.1:19011",
    });
  } finally {
    await assignProxyToScope("combo", String(combo.id), null);
    await assignProxyToScope("global", null, null);
  }
});

test("an exhausted combo pool does not inherit the global proxy", async () => {
  const id = await connection("combo-exhausted", true, "combo-browser");
  const combo = await createCombo({
    name: "browser-dead-combo",
    models: ["combo-browser/example"],
  });
  const dead = await proxy(19013);
  await updateProxy(dead, { status: "inactive" });
  assert.equal(typeof combo.id, "string");
  await assignProxyToScope("combo", String(combo.id), dead);
  await assignProxyToScope("global", null, await proxy(19014));
  try {
    await assert.rejects(
      resolvePlaywrightProxyForConnection("combo-browser", id),
      /PROXY_ASSIGNED_UNAVAILABLE: combo/
    );
  } finally {
    await assignProxyToScope("combo", String(combo.id), null);
    await assignProxyToScope("global", null, null);
  }
});

test("automatic proxy fallback is used only when explicitly enabled", async (t) => {
  const id = await connection("automatic", true, "automatic-browser");
  const off = await connection("automatic-off", false, "automatic-browser");
  const port = 19015;
  await proxy(port);
  const { __setProxyFallbackTestHooks, clearProxyFallbackCache } =
    await import("../../open-sse/utils/proxyFallback.ts");
  const address = `http://127.0.0.1:${port}`;
  const probes: string[] = [];
  const key = Symbol.for("omniroute.featureFlagResolver");
  const globals = globalThis as Record<symbol, unknown>;
  const original = globals[key];
  let enabled = false;
  let outcome: "working" | "unavailable" | "error" = "working";
  globals[key] = (flag: string) => flag === "PROXY_AUTO_SELECT_ENABLED" && enabled;
  clearProxyFallbackCache();
  __setProxyFallbackTestHooks({
    getProxyCandidates: async () => {
      if (outcome === "error") throw new Error("fixture: automatic proxy selection failed");
      return [address];
    },
    testSingleProxy: async (url) => {
      probes.push(url);
      return { ok: outcome === "working", latencyMs: 1 };
    },
  });
  t.after(() => {
    if (original === undefined) delete globals[key];
    else globals[key] = original;
    __setProxyFallbackTestHooks(null);
    clearProxyFallbackCache();
  });
  assert.equal(await resolvePlaywrightProxyForConnection("automatic-browser", id), undefined);
  enabled = true;
  assert.equal(await resolvePlaywrightProxyForConnection("automatic-browser", off), undefined);
  assert.deepEqual(probes, []);
  assert.deepEqual(await resolvePlaywrightProxyForConnection("automatic-browser", id), {
    server: address,
  });
  assert.deepEqual(probes, [address]);

  clearProxyFallbackCache();
  outcome = "unavailable";
  assert.equal(await resolvePlaywrightProxyForConnection("automatic-browser", id), undefined);
  assert.deepEqual(probes, [address, address]);

  clearProxyFallbackCache();
  outcome = "error";
  await assert.rejects(
    resolvePlaywrightProxyForConnection("automatic-browser", id),
    /refusing direct connection \(fail-closed\): fixture: automatic proxy selection failed/
  );
  assert.deepEqual(probes, [address, address]);
});

test("an assigned proxy with an invalid port does not inherit the provider proxy", async () => {
  const id = await connection("invalid-port");
  await setProxyForLevel("key", id, { type: "http", host: "127.0.0.1", port: 70000 });
  await assert.rejects(resolve(id), /invalid host or port/);
});

test("authenticated SOCKS5 is rejected before creating a browser context", async () => {
  const id = await connection("socks-auth");
  const row = await createProxy({
    name: "local-socks-auth",
    type: "socks5",
    host: "127.0.0.1",
    port: 19007,
    username: "fixture-user",
    password: "fixture-password",
  });
  assert.ok(row);
  await assignProxyToScope("account", id, row.id);
  await assert.rejects(resolve(id), /browser does not support authenticated SOCKS5/i);
});
