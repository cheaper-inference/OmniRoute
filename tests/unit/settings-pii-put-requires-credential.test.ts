/**
 * With requireLogin=false the authz pipeline lets every caller through to
 * /api/settings/pii, and the PUT handler's requireManagementAuth() without
 * alwaysRequireAuth let them through too. An anonymous
 * PUT {"enabledTypes":[],"customPatterns":[]} then turned PII masking off for
 * all traffic while PII_REDACTION_ENABLED still read as on. The PUT now needs a
 * credential (requireManagementAuth with alwaysRequireAuth) even with login
 * off. Requests go through runAuthzPipeline() first and then the route
 * handler, the way Next calls them.
 *
 * test:unit:fast runs many files in one process, so the env and credentials
 * this file needs are set before each test. after() puts back the env (except
 * DATA_DIR, which is set at load time), the login settings and the
 * PII_REDACTION_ENABLED override, and writes back the saved PII settings (this
 * stores a PII settings row even if there was none). The API keys and access
 * tokens created here stay in the test DB.
 */
import test, { after, before, beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-pii-put-cred-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const TEST_ENV: Record<string, string | undefined> = {
  API_KEY_SECRET: "pii-put-cred-api-key-secret",
  JWT_SECRET: "pii-put-cred-jwt-secret",
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: "1",
  OMNIROUTE_PEER_STAMP_TOKEN: "pii-put-cred-peer-stamp",
  OMNIROUTE_INTERNAL_SERVICE_TOKEN: "pii-put-cred-internal-service-token-0123456789",
  OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE: undefined,
  INITIAL_PASSWORD: undefined,
  PII_REDACTION_ENABLED: undefined,
  PII_RESPONSE_SANITIZATION: undefined,
};

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { getMachineTokenSync } = await import("../../src/lib/machineToken.ts");
const ffDb = await import("../../src/lib/db/featureFlags.ts");
const piiDb = await import("../../src/lib/db/piiSettings.ts");
const { runAuthzPipeline } = await import("../../src/server/authz/pipeline.ts");
const route = await import("../../src/app/api/settings/pii/route.ts");

// Removed at process exit: in a shared process the DB may live in this directory.
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Placeholder bcrypt-shaped hash: a password exists, so this is not the
// no-password bootstrap window.
const PASSWORD_HASH = "$2b$10$abcdefghijklmnopqrstuuJ8aW2lm1dXq0x4QhQ6Yq0c6w1y3v6e";
const LOGIN_KEYS = ["password", "setupComplete", "requireLogin"];

type BaseCred = "none" | "invalidKey" | "inferenceKey" | "manageKey" | "session";
type TokenCred =
  "cliLoopback" | "cliLan" | "internalLoopback" | "internalLan" | "omaWrite" | "omaRead";
type Cred = BaseCred | TokenCred;
const CRED_HEADERS = {} as Record<Cred, Record<string, string>>;
// A caller on the LAN, not loopback. Credentials may override it with LOOPBACK_PEER.
const LAN_PEER = { "x-omniroute-peer-ip": `${TEST_ENV.OMNIROUTE_PEER_STAMP_TOKEN}|192.168.1.20` };
const LOOPBACK_PEER = { "x-omniroute-peer-ip": `${TEST_ENV.OMNIROUTE_PEER_STAMP_TOKEN}|127.0.0.1` };
const OPERATOR_PATTERN = {
  id: "p1",
  name: "ticket",
  type: "regex" as const,
  pattern: "PROJ-\\d+",
  enabled: true,
};
const WIPE = { enabledTypes: [], customPatterns: [] };

function readLoginRows(): Record<string, string | undefined> {
  const db = core.getDbInstance();
  const get = db.prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = ?");
  return Object.fromEntries(
    LOGIN_KEYS.map((key) => [key, (get.get(key) as { value?: string } | undefined)?.value])
  );
}

async function restoreLoginRows(rows: Record<string, string | undefined>) {
  const db = core.getDbInstance();
  const restore: Record<string, unknown> = {};
  for (const key of LOGIN_KEYS) {
    if (rows[key] === undefined) {
      db.prepare("DELETE FROM key_value WHERE namespace = 'settings' AND key = ?").run(key);
    } else {
      restore[key] = JSON.parse(rows[key] as string);
    }
  }
  // Also bumps the settings revision and drops the read cache.
  await settingsDb.updateSettings(restore);
}

async function setLogin(requireLogin: boolean) {
  await settingsDb.updateSettings({ password: PASSWORD_HASH, setupComplete: true, requireLogin });
}

function operatorBaseline() {
  ffDb.setFeatureFlagOverride("PII_REDACTION_ENABLED", "true");
  piiDb.setPiiSettings({ enabledTypes: null, customPatterns: [OPERATOR_PATTERN] });
}

function storedSettings() {
  piiDb.clearPiiSettingsCache();
  return piiDb.getPiiSettings();
}

/** runAuthzPipeline, then the handler with the headers the pipeline forwards. */
async function call(method: "GET" | "PUT", cred: Cred, body?: unknown) {
  const headers: Record<string, string> = { ...LAN_PEER, ...CRED_HEADERS[cred] };
  if (body !== undefined) headers["content-type"] = "application/json";
  const init = { method, headers, body: body === undefined ? undefined : JSON.stringify(body) };
  const url = "http://localhost:20128/api/settings/pii";
  const gate = await runAuthzPipeline(new NextRequest(url, init), { enforce: true });
  if (gate.headers.get("x-middleware-next") !== "1") {
    return { layer: "pipeline", status: gate.status };
  }
  const forwarded = { ...headers };
  const overridden = (gate.headers.get("x-middleware-override-headers") || "").split(",");
  for (const name of overridden.filter(Boolean)) {
    const value = gate.headers.get(`x-middleware-request-${name}`);
    if (value === null) delete forwarded[name];
    else forwarded[name] = value;
  }
  const res = await route[method](new Request(url, { ...init, headers: forwarded }));
  return { layer: "handler", status: res.status };
}

describe("PUT /api/settings/pii needs a credential with login off", () => {
  const savedEnv: Record<string, string | undefined> = {};
  let savedLogin: Record<string, string | undefined> = {};
  let savedPiiFlag: string | undefined;
  let savedPii: ReturnType<typeof piiDb.getPiiSettings>;

  before(() => {
    for (const name of Object.keys(TEST_ENV)) savedEnv[name] = process.env[name];
    savedLogin = readLoginRows();
    savedPiiFlag = ffDb.getFeatureFlagOverride("PII_REDACTION_ENABLED");
    savedPii = storedSettings();
  });

  // Per test, not once: other files' top-level beforeEach hooks also run
  // before these tests in a shared process and may reset env or the DB.
  beforeEach(async () => {
    for (const [name, value] of Object.entries(TEST_ENV)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    const manageKey = (await apiKeysDb.createApiKey("pii-manage", "m-pii-1", ["manage"])).key;
    const inferenceKey = (await apiKeysDb.createApiKey("pii-infer", "m-pii-2", [])).key;
    const sessionToken = await new SignJWT({ authenticated: true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    const cliToken = getMachineTokenSync();
    const internalToken = TEST_ENV.OMNIROUTE_INTERNAL_SERVICE_TOKEN as string;
    const omaWrite = accessTokensDb.createAccessToken({ name: "pii-write", scope: "write" }).secret;
    const omaRead = accessTokensDb.createAccessToken({ name: "pii-read", scope: "read" }).secret;
    Object.assign(CRED_HEADERS, {
      none: {},
      invalidKey: { authorization: "Bearer sk-not-a-real-key" },
      inferenceKey: { authorization: `Bearer ${inferenceKey}` },
      manageKey: { authorization: `Bearer ${manageKey}` },
      session: { cookie: `auth_token=${sessionToken}` },
      cliLoopback: { ...LOOPBACK_PEER, "x-omniroute-cli-token": cliToken },
      cliLan: { "x-omniroute-cli-token": cliToken },
      internalLoopback: { ...LOOPBACK_PEER, "x-omniroute-internal-service-token": internalToken },
      internalLan: { "x-omniroute-internal-service-token": internalToken },
      omaWrite: { authorization: `Bearer ${omaWrite}` },
      omaRead: { authorization: `Bearer ${omaRead}` },
    });
  });

  after(async () => {
    await restoreLoginRows(savedLogin);
    if (savedPiiFlag === undefined) ffDb.removeFeatureFlagOverride("PII_REDACTION_ENABLED");
    else ffDb.setFeatureFlagOverride("PII_REDACTION_ENABLED", savedPiiFlag);
    piiDb.setPiiSettings(savedPii);
    piiDb.clearPiiSettingsCache();
    for (const [name, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  test("login off: anonymous PUT is refused and the operator's settings stay", async () => {
    await setLogin(false);
    operatorBaseline();
    const res = await call("PUT", "none", WIPE);
    assert.deepEqual(res, { layer: "handler", status: 401 });
    assert.deepEqual(storedSettings(), { enabledTypes: null, customPatterns: [OPERATOR_PATTERN] });
  });

  test("login off: anonymous partial edits are refused too", async () => {
    await setLogin(false);
    // Not just the full wipe: dropping the operator's patterns or narrowing the
    // type selection would weaken masking as well.
    const bodies = [{ customPatterns: [] }, { enabledTypes: ["email"] }];
    let checked = 0;
    for (const body of bodies) {
      operatorBaseline();
      const res = await call("PUT", "none", body);
      assert.deepEqual(res, { layer: "handler", status: 401 }, JSON.stringify(body));
      assert.deepEqual(
        storedSettings(),
        { enabledTypes: null, customPatterns: [OPERATOR_PATTERN] },
        JSON.stringify(body)
      );
      checked++;
    }
    assert.equal(checked, 2);
  });

  test("login off: inference-only and unknown keys get 403 and change nothing", async () => {
    await setLogin(false);
    operatorBaseline();
    for (const cred of ["inferenceKey", "invalidKey"] as const) {
      const res = await call("PUT", cred, WIPE);
      assert.deepEqual(res, { layer: "handler", status: 403 }, cred);
    }
    assert.deepEqual(storedSettings(), { enabledTypes: null, customPatterns: [OPERATOR_PATTERN] });
  });

  test("login off: a session or a manage key can still save", async () => {
    await setLogin(false);
    for (const cred of ["session", "manageKey"] as const) {
      operatorBaseline();
      const res = await call("PUT", cred, { enabledTypes: ["email"] });
      assert.deepEqual(res, { layer: "handler", status: 200 }, cred);
      assert.deepEqual(storedSettings().enabledTypes, ["email"], cred);
    }
  });

  test("login off: CLI and internal-service tokens only from loopback, oma_ tokens need write scope", async () => {
    await setLogin(false);
    const expected: Record<TokenCred, number> = {
      cliLoopback: 200,
      cliLan: 401,
      internalLoopback: 200,
      internalLan: 401,
      omaWrite: 200,
      omaRead: 403,
    };
    for (const [cred, status] of Object.entries(expected) as Array<[TokenCred, number]>) {
      operatorBaseline();
      const res = await call("PUT", cred, { enabledTypes: ["email"] });
      assert.deepEqual(res, { layer: "handler", status }, cred);
      assert.deepEqual(storedSettings().enabledTypes, status === 200 ? ["email"] : null, cred);
    }
  });

  test("login off: GET stays open, as for the other open-mode settings reads", async () => {
    await setLogin(false);
    operatorBaseline();
    const res = await call("GET", "none");
    assert.deepEqual(res, { layer: "handler", status: 200 });
  });

  test("login on: unchanged (anonymous 401, inference key 403, manage key and session 200)", async () => {
    await setLogin(true);
    const expected: Record<BaseCred, number> = {
      none: 401,
      invalidKey: 403,
      inferenceKey: 403,
      manageKey: 200,
      session: 200,
    };
    for (const [cred, status] of Object.entries(expected) as Array<[BaseCred, number]>) {
      operatorBaseline();
      const res = await call("PUT", cred, { enabledTypes: ["email"] });
      assert.equal(res.status, status, cred);
      const saved = storedSettings().enabledTypes;
      assert.deepEqual(saved, status === 200 ? ["email"] : null, cred);
    }
  });
});
