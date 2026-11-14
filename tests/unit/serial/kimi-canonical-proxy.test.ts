import http from "node:http";
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";
const h = await createChatPipelineHarness("kimi-proxy");
process.env.PROXY_AUTO_SELECT_ENABLED = "false";
delete process.env.PROXY_FAIL_OPEN;
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const settings = await import("../../../src/lib/db/settings.ts");
let db: ReturnType<typeof h.core.getDbInstance>;
function migrate() {
  return runMigrations(db);
}
const hostOf = (value: unknown) =>
  (value as { proxy?: { host?: string } | null } | null)?.proxy?.host;
test.beforeEach(async () => {
  await h.resetStorage();
  db = h.core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='240'").run();
  settings.bumpProxyConfigGeneration();
});
test.after(() => h.cleanup());
const proxies = await import("../../../src/lib/db/proxies.ts");
const { safeResolveProxy } = await import("../../../src/sse/handlers/chatHelpers.ts");

async function registryProxy(name: string, status = "active") {
  const proxy = await proxies.createProxy({
    name,
    type: "http",
    host: name + ".test",
    port: 8080,
    username: "fixture-user",
    password: "fixture-password",
    status,
  });
  assert.ok(proxy);
  return proxy;
}
async function oldPoolMember(proxyId: string, position: number) {
  const assignment = await proxies.addProxyToScopePool("provider", "moonshot", proxyId);
  assert.ok(assignment);
  db.prepare("UPDATE proxy_assignments SET scope_id='moonshot',position=? WHERE id=?").run(
    position,
    assignment.id
  );
  return assignment.id;
}
function oldRotation() {
  db.prepare(
    "INSERT INTO proxy_scope_rotation(scope,scope_id,strategy,cursor,sticky_window_minutes,rotated_at,updated_at) VALUES('provider','moonshot','sticky',7,13,'old-rotation','old-update')"
  ).run();
}
test("C10 legacy registry provider pool resolves after migration with intact rotation and proxy credentials", async () => {
  const proxy = await registryProxy("legacy");
  await oldPoolMember(proxy.id, 4);
  oldRotation();
  db.prepare(
    "INSERT INTO provider_connections(id,provider,created_at,updated_at) VALUES('registry','moonshot','old','old')"
  ).run();
  const registry = db.prepare("SELECT * FROM proxy_registry").all();
  const rotation = db.prepare("SELECT * FROM proxy_scope_rotation").get();
  migrate();
  assert.equal(hostOf(await settings.resolveProxyForConnection("registry")), "legacy.test");
  assert.deepEqual(db.prepare("SELECT * FROM proxy_registry").all(), registry);
  assert.deepEqual(db.prepare("SELECT * FROM proxy_scope_rotation").get(), {
    ...rotation,
    scope_id: "kimi",
  });
  const state = db.prepare("SELECT * FROM proxy_assignments").all();
  assert.equal(runMigrations(db), 0);
  assert.deepEqual(db.prepare("SELECT * FROM proxy_assignments").all(), state);
});
test("C10 registry pool collision preserves canonical duplicate rows/order/rotation and appends legacy relative order", async () => {
  const [same, oldA, oldB, current] = await Promise.all(
    ["same", "old-a", "old-b", "current"].map((n) => registryProxy(n))
  );
  await oldPoolMember(same.id, 1);
  const oldAId = await oldPoolMember(oldA.id, 5);
  const oldBId = await oldPoolMember(oldB.id, 8);
  oldRotation();
  await proxies.addProxyToScopePool("provider", "kimi", same.id);
  await proxies.addProxyToScopePool("provider", "kimi", current.id);
  await proxies.setScopeRotationStrategy("provider", "kimi", "random");
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor=11,sticky_window_minutes=29,rotated_at='canonical' WHERE scope='provider' AND scope_id='kimi'"
  ).run();
  const canonical = db
    .prepare(
      "SELECT * FROM proxy_assignments WHERE scope='provider' AND scope_id='kimi' ORDER BY position,id"
    )
    .all();
  const rotation = db
    .prepare("SELECT * FROM proxy_scope_rotation WHERE scope='provider' AND scope_id='kimi'")
    .get();
  await proxies.addProxyToScopePool("account", "moonshot", oldA.id);
  await proxies.addProxyToScopePool("combo", "moonshot", oldB.id);
  await proxies.addProxyToScopePool("global", null, current.id);
  const unrelated = db
    .prepare("SELECT * FROM proxy_assignments WHERE scope!='provider' ORDER BY id")
    .all();
  migrate();
  const pool = await proxies.getScopeProxyPool("provider", "kimi");
  assert.deepEqual(
    pool.map((r) => r.proxyId),
    [same.id, current.id, oldA.id, oldB.id]
  );
  assert.deepEqual(
    db
      .prepare("SELECT * FROM proxy_assignments WHERE scope='provider' ORDER BY position,id")
      .all()
      .slice(0, 2),
    canonical
  );
  assert.deepEqual(
    pool.slice(2).map((r) => r.id),
    [oldAId, oldBId]
  );
  assert.deepEqual(
    db.prepare("SELECT * FROM proxy_scope_rotation WHERE scope='provider'").get(),
    rotation
  );
  assert.deepEqual(
    db.prepare("SELECT * FROM proxy_assignments WHERE scope!='provider' ORDER BY id").all(),
    unrelated
  );
});
test("C10 migrated dead provider pool still blocks the real chat proxy-resolution boundary", async () => {
  const proxy = await registryProxy("dead", "dead");
  await oldPoolMember(proxy.id, 0);
  db.prepare(
    "INSERT INTO provider_connections(id,provider,proxy_enabled,created_at,updated_at) VALUES('dead-connection','moonshot',1,'old','old')"
  ).run();
  migrate();
  assert.equal(proxies.hasBlockingProxyAssignment("dead-connection", "kimi"), true);
  await assert.rejects(
    () => safeResolveProxy("dead-connection", undefined, "kimi"),
    /PROXY_ASSIGNED_UNAVAILABLE/
  );
});
test("C10 later legacy provider inputs share canonical registry scopes without changing account IDs", async () => {
  migrate();
  const proxy = await registryProxy("later");
  await proxies.addProxyToScopePool("provider", "kimi", proxy.id);
  db.prepare(
    "INSERT INTO provider_connections(id,provider,created_at,updated_at) VALUES('later-registry','moonshot','old','old')"
  ).run();
  assert.equal(hostOf(await settings.resolveProxyForConnection("later-registry")), "later.test");
  assert.equal(
    (await proxies.resolveProxyForConnectionFromRegistry("later-registry"))?.proxy?.host,
    "later.test"
  );
  assert.equal(
    (await proxies.resolveProxyForScopeFromRegistry("provider", "moonshot"))?.proxy?.host,
    "later.test"
  );
  assert.deepEqual(
    (await proxies.getScopeProxyPool("provider", "moonshot")).map((r) => r.proxyId),
    [proxy.id]
  );
  await proxies.addProxyToScopePool("account", "moonshot", proxy.id);
  assert.equal(
    db.prepare("SELECT scope_id FROM proxy_assignments WHERE scope='account'").get()?.scope_id,
    "moonshot"
  );
  await proxies.updateProxy(proxy.id, { status: "dead" });
  assert.equal(proxies.hasBlockingProxyAssignment("later-registry"), true);
  assert.equal(proxies.hasBlockingProxyAssignmentForProvider("moonshot"), true);
});

test("C10 subscription selectors remain canonical after actual refresh/rebind and a dead replacement blocks", async () => {
  const subscriptions = await import("../../../src/lib/proxySubscription/index.ts");
  let host = "10.60.0.1";
  const server = http.createServer((_request, response) => {
    response.writeHead(200, { "content-type": "text/plain" });
    response.end(
      "proxies:\n  - name: fixture-node\n    type: http\n    server: " + host + "\n    port: 8080\n"
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const port = (server.address() as { port: number }).port;
    const sub = await subscriptions.createSubscription({
      name: "legacy subscription",
      url: "http://127.0.0.1:" + port + "/feed",
      enabled: true,
      mode: "rule",
      ruleProviders: ["moonshot"],
    });
    db.prepare(
      "INSERT INTO provider_connections(id,provider,created_at,updated_at) VALUES('subscription-account','moonshot','old','old')"
    ).run();
    migrate();
    host = "10.60.0.2";
    await subscriptions.syncSubscription(sub.id);
    assert.equal(
      hostOf(await proxies.resolveProxyForConnectionFromRegistry("subscription-account")),
      host
    );
    assert.deepEqual((await subscriptions.getSubscriptionById(sub.id))?.ruleProviders, ["kimi"]);
    const row = db
      .prepare<{ id: string }>("SELECT id FROM proxy_registry WHERE subscription_id=? AND host=?")
      .get(sub.id, host)!;
    await proxies.updateProxy(row.id, { status: "dead" });
    await subscriptions.applySubscription(sub.id);
    assert.equal(await proxies.resolveProxyForConnectionFromRegistry("subscription-account"), null);
    assert.equal(proxies.hasBlockingProxyAssignment("subscription-account"), true);
    assert.equal(
      db
        .prepare("SELECT 1 FROM proxy_assignments WHERE scope='provider' AND scope_id='moonshot'")
        .get(),
      undefined
    );
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
test("C3 later imported raw Moonshot connection still resolves the canonical legacy KV proxy", async () => {
  await settings.setProxyForLevel("provider", "kimi", {
    type: "http",
    host: "legacy-map.test",
    port: 8080,
  });
  migrate();
  const connection = await h.seedConnection("moonshot", { apiKey: "legacy-map" });
  assert.equal(hostOf(await settings.resolveProxyForConnection(connection.id)), "legacy-map.test");
});
test("C10 subscription selector migration preserves null, empty, malformed and unrelated identities", () => {
  for (const [id, value] of [
    ["null", null],
    ["empty", "[]"],
    ["bad", "{broken"],
    ["both", JSON.stringify(["openai", "moonshot", "kimi", "kimi-coding"])],
  ] as const)
    db.prepare(
      "INSERT INTO proxy_subscriptions(id,name,url,enabled,mode,rule_providers,update_interval_minutes,status,created_at,updated_at) VALUES(?,?,?,0,'rule',?,60,'empty','old','old')"
    ).run(id, id, "https://example.test/" + id, value);
  migrate();
  const read = (id: string) =>
    db.prepare("SELECT rule_providers FROM proxy_subscriptions WHERE id=?").get(id)?.rule_providers;
  assert.equal(read("null"), null);
  assert.equal(read("empty"), "[]");
  assert.equal(read("bad"), "{broken");
  assert.deepEqual(JSON.parse(read("both") as string), ["openai", "kimi", "kimi-coding"]);
});
