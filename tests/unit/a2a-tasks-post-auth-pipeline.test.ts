/**
 * POST /api/a2a/tasks through the real authz proxy (src/proxy.ts ->
 * runAuthzPipeline) and then the route handler, so route classification and
 * the requireLogin postures are covered, not just the handler.
 *
 * Locks down three things the handler-only test cannot see:
 *  - with requireLogin=true the route stays MANAGEMENT: anonymous callers get
 *    401 and a plain inference key 403 from the middleware;
 *  - with REQUIRE_API_KEY=true and OMNIROUTE_API_KEY set, management
 *    credentials (dashboard session, manage-scope key, write-scope access
 *    token) now create tasks, as they already could with GET (was 401);
 *  - the pre-onboarding loopback window (no password, setup not complete)
 *    rejects anonymous POSTs when REQUIRE_API_KEY=true, like requireLogin=false.
 *
 * The Conductor hub is a loopback mock; `hubCalls` proves a rejected POST
 * never reaches it.
 */
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-post-pipeline-"));
// Module load uses this file's DB too; each case sets DATA_DIR again.
process.env.DATA_DIR = TEST_DATA_DIR;
const JWT_SECRET = "a2a-post-pipeline-test-jwt-secret";
const STAMP_TOKEN = "a2a-post-pipeline-stamp-token";

const { NextRequest } = await import("next/server");
const { SignJWT } = await import("jose");
const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokens = await import("../../src/lib/db/accessTokens.ts");
const { proxy } = await import("../../src/proxy.ts");
const tasksRoute = await import("../../src/app/api/a2a/tasks/route.ts");

let hubCalls = 0;
const hub: Server = createServer((req, res) => {
  req.resume();
  req.on("end", () => {
    hubCalls += 1;
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ id: "t_pipeline", status: "submitted" }));
  });
});
await new Promise<void>((resolve) => hub.listen(0, "127.0.0.1", () => resolve()));
const hubAddr = hub.address();
const HUB_URL = `http://127.0.0.1:${typeof hubAddr === "object" && hubAddr ? hubAddr.port : 0}`;

// Every case sets the env, the DB and the settings it needs and puts the env
// back when it ends, so it neither depends on nor leaks into other test files
// that share the process (node --test --test-isolation=none).
const TEST_ENV: Record<string, string | undefined> = {
  DATA_DIR: TEST_DATA_DIR,
  API_KEY_SECRET: "a2a-post-pipeline-test-secret",
  JWT_SECRET,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: "1",
  OMNIROUTE_PEER_STAMP_TOKEN: STAMP_TOKEN,
  CONDUCTOR_HUB_URL: HUB_URL,
  ROUTER_API_KEY: undefined,
  INITIAL_PASSWORD: undefined,
};
const ENV_KEYS = [...Object.keys(TEST_ENV), "REQUIRE_API_KEY", "OMNIROUTE_API_KEY"];
const pinned = new WeakSet<TestContext>();

const ENV_API_KEY = "omniroute-env-key-a2a-pipeline";
const bearer = (token: string) => ({ authorization: `Bearer ${token}` });
let CREDS: Record<string, Record<string, string>> | null = null;

/** Credentials live in this file's DB; create them the first time a case needs them. */
async function credentials(): Promise<Record<string, Record<string, string>>> {
  if (CREDS) return CREDS;
  const inferenceKey = (await apiKeysDb.createApiKey("a2a-infer", "machine-a2a-infer", [])).key;
  const manageKey = (await apiKeysDb.createApiKey("a2a-manage", "machine-a2a-manage", ["manage"]))
    .key;
  const readToken = accessTokens.createAccessToken({ name: "a2a-read", scope: "read" }).secret;
  const writeToken = accessTokens.createAccessToken({ name: "a2a-write", scope: "write" }).secret;
  const session = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(JWT_SECRET));
  CREDS = {
    anonymous: {},
    "unknown key": bearer("sk-not-a-real-key"),
    "inference key": bearer(inferenceKey),
    "manage key": bearer(manageKey),
    "dashboard session": { cookie: `auth_token=${session}` },
    "read token": bearer(readToken),
    "write token": bearer(writeToken),
    OMNIROUTE_API_KEY: bearer(ENV_API_KEY),
    "env key, bare": { authorization: ENV_API_KEY },
    "env key, Bearer + tab": { authorization: `Bearer\t${ENV_API_KEY}` },
    "env key, x-api-key": { "x-api-key": ENV_API_KEY, "anthropic-version": "2023-06-01" },
    "env key, x-goog-api-key": { "x-goog-api-key": ENV_API_KEY },
  };
  return CREDS;
}

const CRED_NAMES = [
  "anonymous",
  "unknown key",
  "inference key",
  "manage key",
  "dashboard session",
  "read token",
  "write token",
  "OMNIROUTE_API_KEY",
];

const REMOTE = "http://omni.example.test:20128/api/a2a/tasks";
const BODY = JSON.stringify({
  skill: "conductor",
  messages: [{ role: "user", content: "ping" }],
  metadata: { conductor: { repo: { url: "https://example.com/r.git" } } },
});

type Outcome = { status: number; stage: "middleware" | "handler"; hub: number };

/** Run the request through proxy(); if it passes, call the handler with the forwarded headers. */
async function call(
  method: "GET" | "POST",
  cred: string,
  opts: { loopback?: boolean } = {}
): Promise<Outcome> {
  const headers: Record<string, string> = { ...(await credentials())[cred] };
  const body = method === "POST" ? BODY : undefined;
  if (body) headers["content-type"] = "application/json";
  if (opts.loopback) {
    headers["x-omniroute-peer-ip"] = `${STAMP_TOKEN}|127.0.0.1`;
  }
  const mw = await proxy(new NextRequest(REMOTE, { method, headers, body }));
  const forwarded = mw.headers.get("x-middleware-override-headers");
  if (!forwarded) return { status: mw.status, stage: "middleware", hub: 0 };
  const next: Record<string, string> = {};
  for (const name of forwarded.split(",")) {
    const value = mw.headers.get(`x-middleware-request-${name}`);
    if (value !== null) next[name] = value;
  }
  const before = hubCalls;
  const req = new NextRequest(REMOTE, { method, headers: next, body });
  const res = method === "POST" ? await tasksRoute.POST(req) : await tasksRoute.GET(req);
  return { status: res.status, stage: "handler", hub: hubCalls - before };
}

async function setPosture(
  t: TestContext,
  login: "on" | "off" | "pre-onboarding",
  requireApiKey: boolean,
  envKey: boolean
) {
  if (!pinned.has(t)) {
    pinned.add(t);
    const saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
    t.after(() => {
      for (const k of ENV_KEYS) {
        if (saved[k] === undefined) delete process.env[k];
        else process.env[k] = saved[k];
      }
      core.resetDbInstance();
    });
    for (const [k, v] of Object.entries(TEST_ENV)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    core.resetDbInstance();
  }
  if (login === "pre-onboarding") {
    await settings.updateSettings({
      requireLogin: true,
      password: "",
      setupComplete: false,
      a2aEnabled: true,
    });
  } else {
    await settings.updateSettings({
      requireLogin: login === "on",
      password: "hashed-placeholder",
      setupComplete: true,
      a2aEnabled: true,
    });
  }
  process.env.REQUIRE_API_KEY = requireApiKey ? "true" : "false";
  if (envKey) process.env.OMNIROUTE_API_KEY = ENV_API_KEY;
  else delete process.env.OMNIROUTE_API_KEY;
}

function assertCreated(o: Outcome, label: string) {
  assert.deepEqual(o, { status: 201, stage: "handler", hub: 1 }, label);
}

test.after(async () => {
  await new Promise((resolve) => hub.close(resolve));
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("requireLogin=true: the middleware still guards POST (route stays MANAGEMENT)", async (t) => {
  for (const requireApiKey of [false, true]) {
    for (const envKey of [false, true]) {
      await setPosture(t, "on", requireApiKey, envKey);
      const tag = `REQUIRE_API_KEY=${requireApiKey} OMNIROUTE_API_KEY=${envKey ? "set" : "unset"}`;
      assert.deepEqual(
        await call("POST", "anonymous"),
        { status: 401, stage: "middleware", hub: 0 },
        `${tag}: anonymous`
      );
      assert.deepEqual(
        await call("POST", "inference key"),
        { status: 403, stage: "middleware", hub: 0 },
        `${tag}: a key without the manage scope`
      );
    }
  }
});

test("requireLogin=true, REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: management credentials create tasks (was 401)", async (t) => {
  await setPosture(t, "on", true, true);
  for (const cred of ["dashboard session", "manage key", "write token", "OMNIROUTE_API_KEY"]) {
    assertCreated(await call("POST", cred), cred);
  }
});

test("requireLogin=true, REQUIRE_API_KEY off, OMNIROUTE_API_KEY set: only the env key creates tasks (unchanged)", async (t) => {
  await setPosture(t, "on", false, true);
  for (const cred of ["dashboard session", "manage key", "write token"]) {
    assert.deepEqual(await call("POST", cred), { status: 401, stage: "handler", hub: 0 }, cred);
  }
  assertCreated(await call("POST", "OMNIROUTE_API_KEY"), "OMNIROUTE_API_KEY");
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY unset: anonymous POST is 401 with login off and before onboarding", async (t) => {
  for (const login of ["off", "pre-onboarding"] as const) {
    await setPosture(t, login, true, false);
    const loopback = login === "pre-onboarding";
    for (const cred of ["anonymous", "unknown key"]) {
      assert.deepEqual(
        await call("POST", cred, { loopback }),
        { status: 401, stage: "handler", hub: 0 },
        `login=${login}: ${cred}`
      );
    }
    assert.deepEqual(
      await call("POST", "read token", { loopback }),
      { status: 403, stage: "handler", hub: 0 },
      `login=${login}: a read-scope token cannot create tasks`
    );
    for (const cred of ["inference key", "manage key", "dashboard session", "write token"]) {
      assertCreated(await call("POST", cred, { loopback }), `login=${login}: ${cred}`);
    }
  }
});

test("REQUIRE_API_KEY=true: POST and GET accept the same credentials (read token aside)", async (t) => {
  for (const login of ["on", "off"] as const) {
    for (const envKey of [false, true]) {
      await setPosture(t, login, true, envKey);
      for (const cred of CRED_NAMES) {
        if (cred === "read token") continue; // read scope: GET only, by design
        if (cred === "OMNIROUTE_API_KEY" && !envKey) continue;
        const getOk = (await call("GET", cred)).status === 200;
        const postOk = (await call("POST", cred)).status === 201;
        assert.equal(
          postOk,
          getOk,
          `login=${login} OMNIROUTE_API_KEY=${envKey ? "set" : "unset"}: ${cred}`
        );
      }
    }
  }
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: which headers carry the env key on POST", async (t) => {
  for (const login of ["off", "pre-onboarding", "on"] as const) {
    await setPosture(t, login, true, true);
    const loopback = login === "pre-onboarding";
    // Read the same way as GET: was 401 on POST before, for every login setting.
    for (const cred of ["env key, x-api-key", "env key, x-goog-api-key"]) {
      assertCreated(await call("POST", cred, { loopback }), `login=${login}: ${cred}`);
    }
    // Used to pass the old Authorization-only check on POST.
    for (const cred of ["env key, bare", "env key, Bearer + tab"]) {
      const o = await call("POST", cred, { loopback });
      assert.deepEqual([o.status, o.hub], [401, 0], `login=${login}: ${cred}`);
    }
  }
});
