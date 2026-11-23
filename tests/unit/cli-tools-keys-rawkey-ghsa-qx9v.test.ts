/**
 * GET /api/cli-tools/keys must only hand plaintext API keys (`rawKey`) to the instance
 * operator (dashboard session, machine-bound local CLI credential, or an instance with
 * login disabled). Machine credentials — API keys of any scope and `oma_` access tokens,
 * including read-scoped ones — still get the listing, but only with the masked `key`.
 * If the operator check itself fails, the route fails closed with a 503.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-keys-rawkey-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "cli-keys-rawkey-api-key-secret";
process.env.JWT_SECRET = "cli-keys-rawkey-jwt-secret";
process.env.INITIAL_PASSWORD = "cli-keys-rawkey-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { requireManagementAuth } = await import("../../src/lib/api/requireManagementAuth.ts");
const keysRoute = await import("../../src/app/api/cli-tools/keys/route.ts");

await updateSettings({ requireLogin: true });
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-keys-rawkey", [
  "manage",
]);
const victimKey = await apiKeysDb.createApiKey("victim-admin", "machine-keys-rawkey", ["admin"]);

test.after(() => {
  try {
    apiKeysDb.resetApiKeyState?.();
  } catch {}
  try {
    core.resetDbInstance();
  } catch {}
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

const URL_KEYS = "http://localhost:20128/api/cli-tools/keys";

function entryFor(payload: { keys: Array<Record<string, unknown>> }) {
  const entry = payload.keys.find((k) => k.id === victimKey.id);
  assert.ok(entry, "victim key is listed");
  return entry;
}

test("a read-scoped access token gets the listing without plaintext keys", async () => {
  const reader = accessTokensDb.createAccessToken({ name: "reader", scope: "read" });
  const res = await keysRoute.GET(
    new Request(URL_KEYS, { headers: { authorization: `Bearer ${reader.secret}` } })
  );
  assert.equal(res.status, 200);
  const raw = await res.text();
  assert.ok(!raw.includes(victimKey.key), "plaintext key must not appear anywhere in the body");
  const entry = entryFor(JSON.parse(raw));
  assert.equal(entry.rawKey, undefined);
  assert.notEqual(entry.key, victimKey.key, "masked key is kept");
});

test("a manage-scoped API key gets the listing without plaintext keys", async () => {
  const res = await keysRoute.GET(
    new Request(URL_KEYS, { headers: { authorization: `Bearer ${manageKey.key}` } })
  );
  assert.equal(res.status, 200);
  const raw = await res.text();
  assert.ok(!raw.includes(victimKey.key));
  assert.equal(entryFor(JSON.parse(raw)).rawKey, undefined);
});

test("a dashboard session still receives rawKey", async () => {
  const res = await keysRoute.GET(await makeManagementSessionRequest(URL_KEYS));
  assert.equal(res.status, 200);
  const entry = entryFor(await res.json());
  assert.equal(entry.rawKey, victimKey.key);
  assert.notEqual(entry.key, victimKey.key);
});

test("the machine-bound local CLI credential still receives rawKey", async () => {
  const res = await keysRoute.GET(
    new Request(URL_KEYS, {
      headers: {
        "x-omniroute-auth-kind": "management_key",
        "x-omniroute-auth-label": "local-cli-token",
      },
    })
  );
  assert.equal(res.status, 200);
  assert.equal(entryFor(await res.json()).rawKey, victimKey.key);
});

test("an instance with login disabled still receives rawKey", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const res = await keysRoute.GET(new Request(URL_KEYS));
    assert.equal(res.status, 200);
    assert.equal(entryFor(await res.json()).rawKey, victimKey.key);
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

test("fails closed with 503 and no key material when the operator check throws", async () => {
  // `request.ip` is read by the CLI-token check. Count how many times the management
  // gate reads it, then throw on the next read — i.e. inside resolveOperatorCredential.
  const mkRequest = (throwAfter: number, counter: { n: number }) => {
    const req = new Request(URL_KEYS, {
      headers: {
        authorization: `Bearer ${manageKey.key}`,
        "x-omniroute-cli-token": "not-the-real-token",
      },
    });
    Object.defineProperty(req, "ip", {
      get() {
        counter.n += 1;
        if (counter.n > throwAfter)
          throw new Error("auth backend exploded: SECRET-INTERNAL-DETAIL");
        return undefined;
      },
    });
    return req;
  };

  const probe = { n: 0 };
  assert.equal(await requireManagementAuth(mkRequest(Infinity, probe)), null);
  assert.ok(probe.n > 0, "probe must observe at least one ip read");

  const counter = { n: 0 };
  const res = await keysRoute.GET(mkRequest(probe.n, counter));
  assert.ok(counter.n > probe.n, "the operator check must have been reached");
  assert.equal(res.status, 503);
  const raw = await res.text();
  assert.ok(!raw.includes(victimKey.key));
  assert.ok(!raw.includes("SECRET-INTERNAL-DETAIL"));
  assert.ok(!raw.includes("rawKey"));
});
