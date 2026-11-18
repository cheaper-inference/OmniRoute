/**
 * POST /api/a2a/tasks checked only OMNIROUTE_API_KEY (open when unset)
 * and ignored REQUIRE_API_KEY. With REQUIRE_API_KEY=true and no
 * OMNIROUTE_API_KEY, an anonymous caller could delegate a task to the
 * Conductor hub, while GET on the same route answered 401. With
 * OMNIROUTE_API_KEY set, a valid OmniRoute key got 401 on POST but 200 on GET.
 * POST now runs the same gate as GET (authorizeA2ATaskRoute).
 *
 * The hub is a loopback mock; `hubCalls` proves a rejected POST never
 * reaches it.
 */
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-post-auth-"));
// Module load uses this file's DB too; each case sets DATA_DIR again.
process.env.DATA_DIR = TEST_DATA_DIR;
const API_KEY_SECRET = "a2a-post-auth-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const tasksRoute = await import("../../src/app/api/a2a/tasks/route.ts");

let hubCalls = 0;
const hub: Server = createServer((req, res) => {
  req.resume();
  req.on("end", () => {
    hubCalls += 1;
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ id: "t_r73", status: "submitted" }));
  });
});
await new Promise<void>((resolve) => hub.listen(0, "127.0.0.1", () => resolve()));
const hubAddr = hub.address();
const HUB_URL = `http://127.0.0.1:${typeof hubAddr === "object" && hubAddr ? hubAddr.port : 0}`;

const ENV_API_KEY = "omniroute-env-key-r73";
const BODY = {
  skill: "conductor",
  messages: [{ role: "user", content: "ping" }],
  metadata: { conductor: { repo: { url: "https://example.com/r.git" } } },
};

// Every case sets the env, the DB and the settings it needs and puts the env
// back when it ends, so it neither depends on nor leaks into other test files
// that share the process (node --test --test-isolation=none), and passes when
// run alone. INITIAL_PASSWORD is cleared because getSettings() turns
// requireLogin on while setup is incomplete.
const ENV_KEYS = [
  "DATA_DIR",
  "INITIAL_PASSWORD",
  "API_KEY_SECRET",
  "OMNIROUTE_DISABLE_REDIS_AUTH_CACHE",
  "REQUIRE_API_KEY",
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "CONDUCTOR_HUB_URL",
] as const;

let dbKey = "";
const pinned = new WeakSet<TestContext>();

async function setPosture(
  t: TestContext,
  requireApiKey: boolean | null,
  envKey: string | null,
  opts: { a2aEnabled?: boolean; requireLogin?: boolean; dbRequireApiKey?: "true" | "false" } = {}
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
  }
  process.env.DATA_DIR = TEST_DATA_DIR;
  process.env.API_KEY_SECRET = API_KEY_SECRET;
  process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
  delete process.env.INITIAL_PASSWORD;
  if (requireApiKey === null) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = requireApiKey ? "true" : "false";
  delete process.env.ROUTER_API_KEY;
  if (envKey === null) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = envKey;
  process.env.CONDUCTOR_HUB_URL = HUB_URL;
  core.resetDbInstance();
  // The DB override wins over the env; clear it so it never leaks between cases.
  featureFlagsDb.removeFeatureFlagOverride("REQUIRE_API_KEY");
  if (opts.dbRequireApiKey) {
    featureFlagsDb.setFeatureFlagOverride("REQUIRE_API_KEY", opts.dbRequireApiKey);
  }
  // Default: the posture where the route is reachable without a session, login off.
  await settings.updateSettings(
    opts.requireLogin
      ? { requireLogin: true, password: "hashed-placeholder", setupComplete: true }
      : { requireLogin: false }
  );
  await settings.updateSettings({ a2aEnabled: opts.a2aEnabled ?? true });
  if (!dbKey) dbKey = (await apiKeysDb.createApiKey("a2a-post-client", "machine-a2a-post", [])).key;
}

function headers(bearer?: string): Record<string, string> {
  return bearer ? { authorization: `Bearer ${bearer}` } : {};
}

async function postWith(
  extra: Record<string, string>,
  body: string = JSON.stringify(BODY)
): Promise<number> {
  const res = await tasksRoute.POST(
    new Request("http://localhost/api/a2a/tasks", {
      method: "POST",
      headers: { "content-type": "application/json", ...extra },
      body,
    })
  );
  return res.status;
}

async function post(bearer?: string, body: string = JSON.stringify(BODY)): Promise<number> {
  return postWith(headers(bearer), body);
}

async function getWith(extra: Record<string, string>): Promise<number> {
  const res = await tasksRoute.GET(
    new Request("http://localhost/api/a2a/tasks", { headers: extra })
  );
  return res.status;
}

async function get(bearer?: string): Promise<number> {
  return getWith(headers(bearer));
}

test.after(async () => {
  await new Promise((resolve) => hub.close(resolve));
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY unset: anonymous POST is 401", async (t) => {
  await setPosture(t, true, null);
  const before = hubCalls;
  assert.equal(await post(), 401);
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY unset: unknown key on POST is 401", async (t) => {
  await setPosture(t, true, null);
  const before = hubCalls;
  assert.equal(await post("sk-not-a-real-key"), 401);
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY unset: a valid key still delegates", async (t) => {
  await setPosture(t, true, null);
  const before = hubCalls;
  assert.equal(await post(dbKey), 201);
  assert.equal(hubCalls, before + 1);
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: anonymous and unknown key are 401", async (t) => {
  await setPosture(t, true, ENV_API_KEY);
  const before = hubCalls;
  assert.equal(await post(), 401);
  assert.equal(await post("sk-not-a-real-key"), 401);
  assert.equal(hubCalls, before);
});

test("requireLogin=false, REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: a valid DB key is accepted on POST", async (t) => {
  await setPosture(t, true, ENV_API_KEY);
  assert.equal(await post(dbKey), 201, "was 401 before: POST only knew OMNIROUTE_API_KEY");
  assert.equal(await post(ENV_API_KEY), 201, "OMNIROUTE_API_KEY itself keeps working");
});

test("REQUIRE_API_KEY=true: GET and POST accept and reject the same credentials", async (t) => {
  for (const envKey of [null, ENV_API_KEY]) {
    await setPosture(t, true, envKey);
    const creds: Array<[string, string | undefined]> = [
      ["none", undefined],
      ["unknown key", "sk-not-a-real-key"],
      ["db key", dbKey],
    ];
    if (envKey) creds.push(["OMNIROUTE_API_KEY", envKey]);
    for (const [label, bearer] of creds) {
      const getOk = (await get(bearer)) === 200;
      const postOk = (await post(bearer)) === 201;
      assert.equal(postOk, getOk, `OMNIROUTE_API_KEY=${envKey ? "set" : "unset"}, ${label}`);
    }
  }
});

test("REQUIRE_API_KEY=false, OMNIROUTE_API_KEY set: POST keeps the legacy key gate", async (t) => {
  await setPosture(t, false, ENV_API_KEY);
  const before = hubCalls;
  assert.equal(await post(), 401, "no key");
  assert.equal(await post("sk-not-a-real-key"), 401, "unknown key");
  assert.equal(await post(dbKey), 401, "DB key (unchanged: only OMNIROUTE_API_KEY passes here)");
  assert.equal(
    await postWith({ "x-api-key": ENV_API_KEY, "anthropic-version": "2023-06-01" }),
    401,
    "env key in x-api-key (this gate reads only Authorization)"
  );
  assert.equal(hubCalls, before);
  assert.equal(await post(ENV_API_KEY), 201);
  assert.equal(await postWith({ authorization: ENV_API_KEY }), 201, "bare env key (unchanged)");
});

test("REQUIRE_API_KEY=false, no OMNIROUTE_API_KEY, requireLogin=false: open (unchanged)", async (t) => {
  await setPosture(t, false, null);
  assert.equal(await post(), 201);
  assert.equal(await get(), 200);
});

test("REQUIRE_API_KEY=true: auth runs before the body is read; a bad body gets 401, not 400", async (t) => {
  await setPosture(t, true, null);
  const before = hubCalls;
  for (const [label, body] of [
    ["invalid JSON", "{not json"],
    ["empty body", ""],
    ["no messages", JSON.stringify({ skill: "conductor" })],
  ]) {
    assert.equal(await post(undefined, body), 401, `anonymous, ${label}`);
    assert.equal(await post(dbKey, body), 400, `valid key, ${label}`);
  }
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
});

test("REQUIRE_API_KEY=true, a2aEnabled off: anonymous POST is 401, not 503", async (t) => {
  await setPosture(t, true, null, { a2aEnabled: false });
  const before = hubCalls;
  assert.equal(await post(), 401, "anonymous");
  assert.equal(await post("sk-not-a-real-key"), 401, "unknown key");
  assert.equal(await post(dbKey), 503, "valid key");
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: a bare env key or a tab after Bearer is 401", async (t) => {
  await setPosture(t, true, ENV_API_KEY);
  const before = hubCalls;
  for (const [label, value] of [
    ["bare key", ENV_API_KEY],
    ["Bearer + tab", `Bearer\t${ENV_API_KEY}`],
  ]) {
    assert.equal(await postWith({ authorization: value }), 401, `POST, ${label}`);
    assert.equal(await getWith({ authorization: value }), 401, `GET, ${label}`);
  }
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: the env key in the other headers GET reads also creates tasks", async (t) => {
  await setPosture(t, true, ENV_API_KEY);
  for (const [label, h] of [
    [
      "x-api-key + anthropic-version",
      { "x-api-key": ENV_API_KEY, "anthropic-version": "2023-06-01" },
    ],
    ["x-api-key + Claude user agent", { "x-api-key": ENV_API_KEY, "user-agent": "claude-cli/1.0" }],
    ["x-goog-api-key", { "x-goog-api-key": ENV_API_KEY }],
  ] as Array<[string, Record<string, string>]>) {
    assert.equal(await getWith(h), 200, `GET, ${label}`);
    const before = hubCalls;
    assert.equal(await postWith(h), 201, `POST, ${label} (was 401)`);
    assert.equal(hubCalls, before + 1, label);
  }
  // Without anthropic-version or a Claude user agent, x-api-key is not read.
  assert.equal(await postWith({ "x-api-key": ENV_API_KEY }), 401, "plain x-api-key");
});

test("REQUIRE_API_KEY from the DB applies to POST, and the DB value wins over the env", async (t) => {
  await setPosture(t, null, null, { dbRequireApiKey: "true" });
  let before = hubCalls;
  assert.equal(await post(), 401, "DB on, env unset: anonymous");
  assert.equal(await post("sk-not-a-real-key"), 401, "DB on, env unset: unknown key");
  assert.equal(hubCalls, before, "the Conductor hub must not be called");

  await setPosture(t, null, ENV_API_KEY, { dbRequireApiKey: "true" });
  before = hubCalls;
  assert.equal(
    await post(dbKey),
    201,
    "DB on, env key set: a DB key passes the REQUIRE_API_KEY gate"
  );
  assert.equal(hubCalls, before + 1);

  await setPosture(t, true, null, { dbRequireApiKey: "false" });
  assert.equal(await post(), 201, "DB off, env REQUIRE_API_KEY=true: open with login off");

  // setPosture clears the DB value, so the env decides again.
  await setPosture(t, true, null);
  assert.equal(await post(), 401, "DB value cleared, env REQUIRE_API_KEY=true: anonymous");
});

test("REQUIRE_API_KEY off, requireLogin=true: the handler itself rejects anonymous POST", async (t) => {
  // The middleware stops this request first in a real server; this checks the
  // handler does not rely on that.
  await setPosture(t, false, null, { requireLogin: true });
  const before = hubCalls;
  assert.equal(await post(), 401);
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
});

test("REQUIRE_API_KEY=true, OMNIROUTE_API_KEY set: Authorization wins over x-api-key and x-goog-api-key", async (t) => {
  await setPosture(t, true, ENV_API_KEY);
  const before = hubCalls;
  for (const [label, other] of [
    ["x-api-key", { "x-api-key": ENV_API_KEY, "anthropic-version": "2023-06-01" }],
    ["x-goog-api-key", { "x-goog-api-key": ENV_API_KEY }],
  ] as Array<[string, Record<string, string>]>) {
    const wrongBearer = { authorization: "Bearer sk-not-a-real-key", ...other };
    assert.equal(await getWith(wrongBearer), 401, `GET, wrong Bearer + env key in ${label}`);
    assert.equal(await postWith(wrongBearer), 401, `POST, wrong Bearer + env key in ${label}`);
  }
  assert.equal(hubCalls, before, "the Conductor hub must not be called");
  const rightBearer = {
    authorization: `Bearer ${ENV_API_KEY}`,
    "x-goog-api-key": "sk-not-a-real-key",
  };
  assert.equal(await getWith(rightBearer), 200, "GET, env key Bearer + wrong x-goog-api-key");
  assert.equal(await postWith(rightBearer), 201, "POST, env key Bearer + wrong x-goog-api-key");
  assert.equal(hubCalls, before + 1);
});
