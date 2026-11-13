import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** Permissive view of a JSON body for assertions (no explicit any in tests/). */
type Loose = { [key: string]: Loose };

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-launch-sessions-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
process.env.API_KEY_SECRET = "launch-test-api-key-secret";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const launchDb = await import("../../../src/lib/db/launchSessions.ts");
const { viewHash } = await import("../../../src/shared/launch/viewSelect.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");
const sessionsRoute = await import("../../../src/app/api/launch/sessions/route.ts");
const idRoute = await import("../../../src/app/api/launch/sessions/[id]/route.ts");
const usageRoute = await import("../../../src/app/api/launch/sessions/[id]/usage/route.ts");
const capsRoute = await import("../../../src/app/api/launch/capabilities/route.ts");

const ORIGINAL_REQUIRE = process.env.REQUIRE_API_KEY;

test.after(() => {
  if (ORIGINAL_REQUIRE === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Direct handler calls carry no real peer: a localhost URL counts as loopback, any other host
// as remote (getRequestPeerLocality's legacy verdict when no stamping server is running).
const REMOTE = "http://gateway.example.com";
const LOOPBACK = "http://localhost";

function req(
  method: string,
  pathName: string,
  opts: { token?: string; body?: unknown; raw?: string; base?: string } = {}
): Request {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (opts.token) headers.authorization = `Bearer ${opts.token}`;
  const body =
    opts.raw !== undefined
      ? opts.raw
      : opts.body !== undefined
        ? JSON.stringify(opts.body)
        : undefined;
  return new Request(`${opts.base ?? REMOTE}${pathName}`, { method, headers, body });
}

const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

async function newKey(name: string, scopes: string[] = []) {
  const created = await apiKeysDb.createApiKey(name, "machine-test", scopes);
  return { id: created.id as string, key: created.key as string };
}

async function mint(key: string, body: Record<string, unknown> = { tool: "codex" }) {
  const res = await sessionsRoute.POST(req("POST", "/api/launch/sessions", { token: key, body }));
  const json = (await res.json()) as Loose;
  return { res, json };
}

const ids = ["gpt-4o", "claude-sonnet"];
const view = () => ({ hash: viewHash(ids), ids });

test("POST mints a session with a valid API key", async () => {
  const { key } = await newKey("mint");
  const before = Date.now();
  const { res, json } = await mint(key);
  assert.equal(res.status, 201);
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.match(json.token, /^olx_/);
  assert.equal(json.toolId, "codex");
  assert.equal(json.sessionTag, `launch:codex:${json.sessionId}`);
  assert.equal(json.ttlSec, 900);
  assert.equal(json.specVersion, 1);
  assert.equal(json.anonymous, false);
  assert.equal(json.view, null);
  const expires = Date.parse(json.expiresAt);
  assert.ok(Math.abs(expires - (before + 900_000)) < 10_000);
});

test("POST accepts toolId spelling, custom ttlSec and sessionTag", async () => {
  const { key } = await newKey("spelling");
  const { res, json } = await mint(key, { toolId: "aider", ttlSec: 120, sessionTag: "my:tag-1" });
  assert.equal(res.status, 201);
  assert.equal(json.toolId, "aider");
  assert.equal(json.ttlSec, 120);
  assert.equal(json.sessionTag, "my:tag-1");
});

test("schema.ts mirrors of the helper id/tag schemas accept and reject the same inputs", async () => {
  const helpers = await import("../../../src/app/api/launch/launchRouteHelpers.ts");
  const schema = await import("../../../src/app/api/launch/sessions/schema.ts");
  for (const v of ["codex", "Bad", "", "a".repeat(65), "ok-1.2_x", "-lead"]) {
    assert.equal(
      schema.launchMintToolIdSchema.safeParse(v).success,
      helpers.launchToolIdSchema.safeParse(v).success,
      `tool ${v}`
    );
  }
  for (const v of ["my:tag-1", "bad tag", "", "a".repeat(129), "a/b=c.d_e", "x!"]) {
    assert.equal(
      schema.launchMintSessionTagSchema.safeParse(v).success,
      helpers.launchSessionTagSchema.safeParse(v).success,
      `tag ${v}`
    );
  }
  assert.equal(schema.LAUNCH_MINT_SPEC_VERSION, helpers.LAUNCH_SPEC_VERSION);
});

test("POST stores a view and reports {hash,count}", async () => {
  const { key } = await newKey("view");
  const { res, json } = await mint(key, { tool: "codex", view: view() });
  assert.equal(res.status, 201);
  assert.equal(json.view.hash, viewHash(ids));
  assert.equal(json.view.count, 2);
  const meta = await apiKeysDb.getApiKeyMetadata(json.token);
  assert.deepEqual(meta?.launchSession?.view?.ids, ids);
});

test("POST rejects invalid bodies with 400", async () => {
  const { key } = await newKey("bad");
  const cases: Array<[string, Record<string, unknown>]> = [
    ["bad hash", { tool: "codex", view: { hash: "0".repeat(64), ids } }],
    ["malformed hash", { tool: "codex", view: { hash: "zz", ids } }],
    ["unknown key", { tool: "codex", bogus: 1 }],
    ["policy block", { tool: "codex", policy: { budget: 1 } }],
    ["mcp block", { tool: "codex", mcp: { servers: [] } }],
    ["serve prefix", { tool: "codex", view: { ...view(), serve: { prefix: "x" } } }],
    ["no tool", { ttlSec: 120 }],
    ["tool mismatch", { tool: "a", toolId: "b" }],
    ["ttl too small", { tool: "codex", ttlSec: 10 }],
  ];
  for (const [label, body] of cases) {
    const { res, json } = await mint(key, body);
    assert.equal(res.status, 400, label);
    assert.ok(json.error, label);
  }
  const res = await sessionsRoute.POST(
    req("POST", "/api/launch/sessions", { token: key, raw: "{nope" })
  );
  assert.equal(res.status, 400);
});

test("POST auth failures", async () => {
  const none = await sessionsRoute.POST(
    req("POST", "/api/launch/sessions", { body: { tool: "x" } })
  );
  assert.equal(none.status, 401);
  const bad = await sessionsRoute.POST(
    req("POST", "/api/launch/sessions", { token: "sk-not-a-real-key", body: { tool: "x" } })
  );
  assert.equal(bad.status, 401);
});

test("an olx_ token cannot mint another session", async () => {
  const { key } = await newKey("nomint");
  const { json } = await mint(key);
  const res = await sessionsRoute.POST(
    req("POST", "/api/launch/sessions", { token: json.token, body: { tool: "x" } })
  );
  assert.equal(res.status, 403);
});

test("anonymous mint from loopback when REQUIRE_API_KEY is off, refused when on", async () => {
  process.env.REQUIRE_API_KEY = "false";
  const originalPassword = process.env.INITIAL_PASSWORD;
  delete process.env.INITIAL_PASSWORD;
  // The anonymous posture needs zero API keys: drop the ones other tests created.
  core.getDbInstance().prepare("DELETE FROM api_keys").run();
  try {
    const res = await sessionsRoute.POST(
      req("POST", "/api/launch/sessions", { base: LOOPBACK, body: { tool: "codex" } })
    );
    assert.equal(res.status, 201);
    const json = (await res.json()) as Loose;
    assert.equal(json.anonymous, true);
    assert.equal(await apiKeysDb.validateApiKey(json.token), true);

    const remote = await sessionsRoute.POST(
      req("POST", "/api/launch/sessions", { base: REMOTE, body: { tool: "codex" } })
    );
    assert.equal(remote.status, 401);

    process.env.REQUIRE_API_KEY = "true";
    const required = await sessionsRoute.POST(
      req("POST", "/api/launch/sessions", { base: LOOPBACK, body: { tool: "codex" } })
    );
    assert.equal(required.status, 401);
    // anonymous sessions stop validating once keys become mandatory
    assert.equal(await apiKeysDb.validateApiKey(json.token), false);
  } finally {
    if (ORIGINAL_REQUIRE === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE;
    if (originalPassword !== undefined) process.env.INITIAL_PASSWORD = originalPassword;
  }
});

test("anonymous loopback mint is refused once any API key exists", async () => {
  process.env.REQUIRE_API_KEY = "false";
  try {
    await newKey("anon-blocker");
    const res = await sessionsRoute.POST(
      req("POST", "/api/launch/sessions", { base: LOOPBACK, body: { tool: "codex" } })
    );
    assert.equal(res.status, 401);
  } finally {
    if (ORIGINAL_REQUIRE === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE;
  }
});

test("regenerating the parent key kills sessions minted from the old secret", async () => {
  const { id, key } = await newKey("regen");
  const { json } = await mint(key);
  const path = `/api/launch/sessions/${json.sessionId}`;
  assert.equal(await apiKeysDb.validateApiKey(json.token), true);
  const regenerated = await apiKeysDb.regenerateApiKey(id);
  assert.ok(regenerated);
  assert.equal(await apiKeysDb.validateApiKey(json.token), false);
  const patch = await idRoute.PATCH(
    req("PATCH", path, { token: json.token, body: { heartbeat: true } }),
    ctx(json.sessionId)
  );
  assert.equal(patch.status, 401);
  const usage = await usageRoute.GET(
    req("GET", `${path}/usage`, { token: json.token }),
    ctx(json.sessionId)
  );
  assert.equal(usage.status, 401);
});

test("the minted token validates and is never echoed by other routes", async () => {
  const { key } = await newKey("echo");
  const { json } = await mint(key);
  assert.equal(await apiKeysDb.validateApiKey(json.token), true);

  const responses = [
    await idRoute.PATCH(
      req("PATCH", `/api/launch/sessions/${json.sessionId}`, {
        token: json.token,
        body: { heartbeat: true },
      }),
      ctx(json.sessionId)
    ),
    await usageRoute.GET(
      req("GET", `/api/launch/sessions/${json.sessionId}/usage`, { token: json.token }),
      ctx(json.sessionId)
    ),
    await capsRoute.GET(req("GET", "/api/launch/capabilities", { token: json.token })),
  ];
  for (const res of responses) {
    assert.equal(res.status, 200);
    assert.ok(!(await res.text()).includes(json.token));
  }
});

test("PATCH heartbeat moves expiresAt forward", async () => {
  const { key } = await newKey("hb");
  const { json } = await mint(key, { tool: "codex", ttlSec: 60 });
  // age the session so a refresh is visible
  core
    .getDbInstance()
    .prepare("UPDATE launch_sessions SET expires_at = ? WHERE id = ?")
    .run(new Date(Date.now() + 10_000).toISOString(), json.sessionId);
  const res = await idRoute.PATCH(
    req("PATCH", `/api/launch/sessions/${json.sessionId}`, {
      token: json.token,
      body: { heartbeat: true },
    }),
    ctx(json.sessionId)
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as Loose;
  assert.equal(body.sessionId, json.sessionId);
  assert.ok(Date.parse(body.expiresAt) > Date.now() + 30_000);
});

test("PATCH view stores the ids; empty body is 400", async () => {
  const { key } = await newKey("patchview");
  const { json } = await mint(key);
  const ok = await idRoute.PATCH(
    req("PATCH", `/api/launch/sessions/${json.sessionId}`, {
      token: json.token,
      body: { view: view() },
    }),
    ctx(json.sessionId)
  );
  assert.equal(ok.status, 200);
  assert.equal(((await ok.json()) as Loose).view.count, 2);
  const meta = await apiKeysDb.getApiKeyMetadata(json.token);
  assert.deepEqual(meta?.launchSession?.view?.ids, ids);

  const empty = await idRoute.PATCH(
    req("PATCH", `/api/launch/sessions/${json.sessionId}`, { token: json.token, body: {} }),
    ctx(json.sessionId)
  );
  assert.equal(empty.status, 400);
});

test("PATCH ownership: other parent key 404, parent key 200, other session token 404", async () => {
  const a = await newKey("owner-a");
  const b = await newKey("owner-b");
  const sa = (await mint(a.key)).json;
  const sb = (await mint(b.key)).json;
  const path = `/api/launch/sessions/${sa.sessionId}`;

  const other = await idRoute.PATCH(
    req("PATCH", path, { token: b.key, body: { heartbeat: true } }),
    ctx(sa.sessionId)
  );
  assert.equal(other.status, 404);
  const parent = await idRoute.PATCH(
    req("PATCH", path, { token: a.key, body: { heartbeat: true } }),
    ctx(sa.sessionId)
  );
  assert.equal(parent.status, 200);
  const foreignToken = await idRoute.PATCH(
    req("PATCH", path, { token: sb.token, body: { heartbeat: true } }),
    ctx(sa.sessionId)
  );
  assert.equal(foreignToken.status, 404);
});

test("DELETE revokes: token dies, second DELETE is 401, parent key can delete", async () => {
  const { key } = await newKey("del");
  const { json } = await mint(key);
  const path = `/api/launch/sessions/${json.sessionId}`;
  const res = await idRoute.DELETE(req("DELETE", path, { token: json.token }), ctx(json.sessionId));
  assert.equal(res.status, 200);
  assert.equal(((await res.json()) as Loose).revoked, true);

  assert.equal(await apiKeysDb.validateApiKey(json.token), false);
  const patch = await idRoute.PATCH(
    req("PATCH", path, { token: json.token, body: { heartbeat: true } }),
    ctx(json.sessionId)
  );
  assert.equal(patch.status, 401);
  const again = await idRoute.DELETE(
    req("DELETE", path, { token: json.token }),
    ctx(json.sessionId)
  );
  assert.equal(again.status, 401);

  const second = (await mint(key)).json;
  const byParent = await idRoute.DELETE(
    req("DELETE", `/api/launch/sessions/${second.sessionId}`, { token: key }),
    ctx(second.sessionId)
  );
  assert.equal(byParent.status, 200);
  assert.equal(await apiKeysDb.validateApiKey(second.token), false);
});

test("capabilities", async () => {
  const none = await capsRoute.GET(req("GET", "/api/launch/capabilities"));
  assert.equal(none.status, 401);
  const { key } = await newKey("caps");
  const res = await capsRoute.GET(req("GET", "/api/launch/capabilities", { token: key }));
  assert.equal(res.status, 200);
  const body = (await res.json()) as Loose;
  assert.equal(body.version, 1);
  for (const f of ["sessions", "view", "usage"]) assert.ok(body.features.includes(f), f);
  assert.deepEqual(body.policy, []);
  assert.equal(body.mcp, false);
  assert.equal(body.view.prefix, false);
});

test("launch routes are PUBLIC class (handlers do their own auth)", () => {
  assert.equal(classifyRoute("/api/launch/sessions", "POST").routeClass, "PUBLIC");
  assert.equal(classifyRoute("/api/launch/sessions/abc/usage", "GET").routeClass, "PUBLIC");
  assert.equal(classifyRoute("/api/launch/capabilities", "GET").routeClass, "PUBLIC");
});

test("a launch token is never a management credential", async () => {
  const { key } = await newKey("mgr", ["manage"]);
  const parentMeta = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(parentMeta?.scopes.includes("manage"));
  const { json } = await mint(key);
  const meta = await apiKeysDb.getApiKeyMetadata(json.token);
  assert.ok(meta);
  assert.ok(!meta.scopes.includes("manage"));
  assert.ok(!meta.scopes.includes("admin"));
  assert.equal(meta.launchSession?.id, json.sessionId);
  assert.equal(launchDb.isLaunchSessionToken(json.token), true);
});
