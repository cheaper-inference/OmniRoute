/**
 * With requireLogin=false, isAuthenticated() is true for every caller, so an
 * anonymous PUT /api/settings/feature-flags could write a DB override for
 * REQUIRE_API_KEY, OUTBOUND_SSRF_GUARD_ENABLED and the other security flags.
 * For most of them the override wins over env and takes effect without a
 * restart; three are read from env only today and are covered defensively.
 * Those flags now need a credential even with login off (a dashboard session,
 * a manage-scope API key, an oma_ access token with write scope or higher, or
 * the CLI token or internal-service token sent from loopback); every other
 * flag keeps the open-mode behaviour.
 *
 * test:unit:fast runs many files in one process, so the env and login settings
 * this file needs are set before each test. after() puts back the env (except
 * DATA_DIR, which is set at load time), the login settings and the flag
 * overrides. The API keys created here stay in the test DB.
 */
import test, { after, before, beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ff-protected-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const TEST_ENV: Record<string, string> = {
  API_KEY_SECRET: "ff-protected-test-secret",
  JWT_SECRET: "ff-protected-jwt-secret",
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: "1",
  REQUIRE_API_KEY: "true",
};
const LOGIN_KEYS = ["password", "requireLogin"];

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const ffDb = await import("../../src/lib/db/featureFlags.ts");
const defs = await import("../../src/shared/constants/featureFlagDefinitions.ts");
const protectedFlags = await import("../../src/shared/constants/protectedFeatureFlags.ts");
const { isRequireApiKeyEnabled } = await import("../../src/shared/utils/featureFlags.ts");
const route = await import("../../src/app/api/settings/feature-flags/route.ts");

// Removed at process exit: in a shared process the DB may live in this directory.
test.after(() => {
  core.resetDbInstance?.();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let manageKey = "";
let inferenceKey = "";

const UNPROTECTED_FLAG = "RADAR_ENABLED";
const EXTRA_PROTECTED = [
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "MITM_DISABLE_TLS_VERIFY",
  "OMNIROUTE_MCP_ENFORCE_SCOPES",
  "SKILLS_SANDBOX_NETWORK_ENABLED",
];

async function sessionCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true, sub: "ff-user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

type Cred = { cookie?: string; bearer?: string };

function authHeaders(cred: Cred): Record<string, string> {
  const h: Record<string, string> = {};
  if (cred.cookie) h.cookie = cred.cookie;
  if (cred.bearer) h.authorization = `Bearer ${cred.bearer}`;
  return h;
}

async function put(key: string, value: string | undefined, cred: Cred = {}): Promise<number> {
  const res = await route.PUT(
    new Request("http://localhost/api/settings/feature-flags", {
      method: "PUT",
      headers: { "content-type": "application/json", ...authHeaders(cred) },
      body: JSON.stringify(value === undefined ? { key } : { key, value }),
    }) as never
  );
  return res.status;
}

async function clearAll(cred: Cred = {}): Promise<number> {
  const res = await route.DELETE(
    new Request("http://localhost/api/settings/feature-flags", {
      method: "DELETE",
      headers: authHeaders(cred),
    }) as never
  );
  return res.status;
}

function sampleValue(key: string): string {
  const d = defs.FEATURE_FLAG_DEFINITIONS.find((x) => x.key === key);
  assert.ok(d, `definition for ${key}`);
  if (d.type === "enum" && d.enumValues?.length) {
    return d.enumValues.find((v) => v !== d.defaultValue) ?? d.enumValues[0];
  }
  return d.defaultValue === "true" ? "false" : "true";
}

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
  await settings.updateSettings(restore);
}

describe("PUT/DELETE /api/settings/feature-flags protect security flags with login off", () => {
  const savedEnv: Record<string, string | undefined> = {};
  let savedLogin: Record<string, string | undefined> = {};
  let savedOverrides: Record<string, string> = {};

  before(() => {
    for (const name of Object.keys(TEST_ENV)) savedEnv[name] = process.env[name];
    savedLogin = readLoginRows();
    savedOverrides = ffDb.getFeatureFlagOverrides();
  });

  // Per test, not once: other files' top-level beforeEach hooks also run
  // before these tests in a shared process and may reset env or the DB.
  beforeEach(async () => {
    Object.assign(process.env, TEST_ENV);
    ffDb.clearAllFeatureFlagOverrides();
    await settings.updateSettings({ requireLogin: false, password: "hashed-placeholder" });
    manageKey = (await apiKeysDb.createApiKey("ff-manage", "m-ff-1", ["manage"])).key;
    inferenceKey = (await apiKeysDb.createApiKey("ff-infer", "m-ff-2", [])).key;
  });

  after(async () => {
    ffDb.clearAllFeatureFlagOverrides();
    for (const [key, value] of Object.entries(savedOverrides)) {
      ffDb.setFeatureFlagOverride(key, value);
    }
    await restoreLoginRows(savedLogin);
    for (const [name, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  test("login off: anonymous PUT cannot turn REQUIRE_API_KEY off", async () => {
    assert.equal(isRequireApiKeyEnabled(), true);
    assert.equal(await put("REQUIRE_API_KEY", "false"), 401);
    assert.equal(ffDb.getFeatureFlagOverrides().REQUIRE_API_KEY, undefined);
    assert.equal(isRequireApiKeyEnabled(), true);
  });

  test("login off: anonymous PUT cannot turn OUTBOUND_SSRF_GUARD_ENABLED off", async () => {
    assert.equal(await put("OUTBOUND_SSRF_GUARD_ENABLED", "false"), 401);
    assert.equal(ffDb.getFeatureFlagOverrides().OUTBOUND_SSRF_GUARD_ENABLED, undefined);
  });

  test("login off: anonymous PUT without value cannot remove a security override", async () => {
    ffDb.setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    assert.equal(await put("REQUIRE_API_KEY", undefined), 401);
    assert.equal(ffDb.getFeatureFlagOverrides().REQUIRE_API_KEY, "true");
  });

  test("login off: every protected flag rejects anonymous and inference-key PUT", async () => {
    const protectedKeys = defs.FEATURE_FLAG_DEFINITIONS.map((d) => d.key).filter((k) =>
      protectedFlags.isProtectedFeatureFlag(k)
    );
    assert.ok(protectedKeys.length >= 15, `protected flags: ${protectedKeys.join(",")}`);
    for (const key of protectedKeys) {
      assert.equal(await put(key, sampleValue(key)), 401, `${key} anonymous`);
      assert.equal(await put(key, sampleValue(key), { bearer: "sk-junk" }), 403, `${key} junk`);
      assert.equal(await put(key, sampleValue(key), { bearer: inferenceKey }), 403, `${key} infer`);
    }
    assert.deepEqual(ffDb.getFeatureFlagOverrides(), {});
  });

  test("protected set = every security-category flag plus the listed extras", () => {
    for (const d of defs.FEATURE_FLAG_DEFINITIONS) {
      const expected = d.category === "security" || EXTRA_PROTECTED.includes(d.key);
      assert.equal(protectedFlags.isProtectedFeatureFlag(d.key), expected, d.key);
    }
    const known = new Set(defs.FEATURE_FLAG_DEFINITIONS.map((d) => d.key));
    for (const k of EXTRA_PROTECTED) assert.ok(known.has(k), `${k} is a defined flag`);
  });

  test("login off: session and manage-scope key can still change protected flags", async () => {
    assert.equal(await put("REQUIRE_API_KEY", "false", { cookie: await sessionCookie() }), 200);
    assert.equal(isRequireApiKeyEnabled(), false);
    assert.equal(await put("REQUIRE_API_KEY", "true", { bearer: manageKey }), 200);
    assert.equal(isRequireApiKeyEnabled(), true);
    assert.equal(await put("OUTBOUND_SSRF_GUARD_ENABLED", undefined, { bearer: manageKey }), 200);
  });

  test("login off: other flags keep the open-mode behaviour", async () => {
    assert.equal(protectedFlags.isProtectedFeatureFlag(UNPROTECTED_FLAG), false);
    assert.equal(await put(UNPROTECTED_FLAG, "true"), 200);
    assert.equal(ffDb.getFeatureFlagOverrides()[UNPROTECTED_FLAG], "true");
    assert.equal(await put(UNPROTECTED_FLAG, undefined), 200);
  });

  test("login off: anonymous DELETE cannot clear a security override", async () => {
    ffDb.setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    ffDb.setFeatureFlagOverride(UNPROTECTED_FLAG, "true");
    assert.equal(await clearAll(), 401);
    assert.equal(ffDb.getFeatureFlagOverrides().REQUIRE_API_KEY, "true");
    assert.equal(await clearAll({ cookie: await sessionCookie() }), 200);
    assert.deepEqual(ffDb.getFeatureFlagOverrides(), {});
  });

  test("login off: anonymous DELETE cannot clear a protected flag outside the security category", async () => {
    ffDb.setFeatureFlagOverride("OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS", "false");
    assert.equal(await clearAll(), 401);
    assert.equal(ffDb.getFeatureFlagOverrides().OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS, "false");
    assert.equal(await clearAll({ bearer: inferenceKey }), 403);
    assert.equal(await clearAll({ bearer: manageKey }), 200);
    assert.deepEqual(ffDb.getFeatureFlagOverrides(), {});
  });

  test("login off: anonymous DELETE still clears when no security override is set", async () => {
    ffDb.setFeatureFlagOverride(UNPROTECTED_FLAG, "true");
    assert.equal(await clearAll(), 200);
    assert.deepEqual(ffDb.getFeatureFlagOverrides(), {});
  });
});
