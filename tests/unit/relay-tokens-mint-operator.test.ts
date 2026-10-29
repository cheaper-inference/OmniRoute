// Minting a relay token hands out a reusable inference credential, so it follows the same
// operator-only rule as the other credential-issuing actions (sync tokens, backup restore):
//   - a signed-in dashboard session (or the local CLI) may mint;
//   - API keys of any scope — manage included — are machine credentials and get 403;
//   - listing / editing / revoking keep accepting a manage-scoped key.
// The mint handler also never echoes a raw exception message back to the caller.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-relay-mint-operator-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "relay-mint-operator-api-key-secret";
process.env.JWT_SECRET = "relay-mint-operator-jwt-secret";
process.env.INITIAL_PASSWORD = "relay-mint-operator-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const relayDb = await import("../../src/lib/db/relayProxies.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const tokensRoute = await import("../../src/app/api/relay/tokens/route.ts");

const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-relay-mint", [
  "manage",
]);

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

type CollectionRoute = {
  GET: (request: Request) => Promise<Response>;
  POST: (request: Request) => Promise<Response>;
};
const collection = tokensRoute as unknown as CollectionRoute;
const URL_ = "http://localhost:20128/api/relay/tokens";

function manageKeyRequest(method: string, body?: unknown): Request {
  return new Request(URL_, {
    method,
    headers: {
      authorization: `Bearer ${manageKey.key}`,
      ...(body === undefined ? {} : { "content-type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

for (const requireLogin of [true, false]) {
  const mode = requireLogin ? "login enabled" : "login disabled";

  test(`${mode}: a manage-scoped API key cannot mint a relay token`, async () => {
    await updateSettings({ requireLogin });
    try {
      const name = `key-mint-denied-${mode}`;
      const response = await collection.POST(manageKeyRequest("POST", { name }));
      const text = await response.text();
      assert.equal(response.status, 403, `expected 403, got ${response.status}: ${text}`);
      assert.ok(!text.includes("rawToken"), "a denied mint must not return a token");
      assert.ok(!text.includes("at /"), "403 body must not leak a stack trace");
      assert.equal(
        relayDb.getRelayTokens().some((t) => t.name === name),
        false,
        "a denied mint must not persist a token"
      );
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });

  test(`${mode}: a dashboard session still mints a relay token`, async () => {
    await updateSettings({ requireLogin });
    try {
      const response = await collection.POST(
        await makeManagementSessionRequest(URL_, {
          method: "POST",
          body: { name: `session-mint-ok-${mode}` },
        })
      );
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.match(body.rawToken, /\S+/);
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });
}

test("a manage-scoped API key can still list the relay token inventory", async () => {
  const response = await collection.GET(manageKeyRequest("GET"));
  assert.equal(response.status, 200);
});

test("minting with a malformed JSON body answers 400 without echoing the parser message", async () => {
  const request = await makeManagementSessionRequest(URL_, { method: "POST", body: { name: "x" } });
  const malformed = new Request(URL_, {
    method: "POST",
    headers: Object.fromEntries(request.headers),
    body: "{ not json",
  });
  const response = await collection.POST(malformed);
  const text = await response.text();
  assert.equal(response.status, 400);
  assert.ok(!/JSON|Unexpected|position|token/i.test(text.replace(/Invalid JSON body/, "")));
  assert.equal(JSON.parse(text).error, "Invalid JSON body");
});

test("an unexpected failure while minting answers 500 with a sanitized message", async (t) => {
  const secret = "sk-live-0123456789abcdefghijklmnopqrstuvwxyz";
  const db = core.getDbInstance();
  const original = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (/INSERT INTO relay_tokens/i.test(sql)) {
      throw new Error(`disk failure while writing ${secret} at /srv/omniroute/db.sqlite`);
    }
    return original(sql);
  });
  const response = await collection.POST(
    await makeManagementSessionRequest(URL_, { method: "POST", body: { name: "boom" } })
  );
  const text = await response.text();
  assert.equal(response.status, 500);
  assert.ok(!text.includes(secret), "the response must not echo the exception message verbatim");
  assert.ok(!text.includes("/srv/omniroute"), "the response must not leak server paths");
});
