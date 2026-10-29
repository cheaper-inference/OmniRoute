// Relay tokens are reusable inference credentials: POST /api/relay/tokens mints one and
// returns it in clear (once), GET lists the inventory, and /api/relay/tokens/[id] edits,
// toggles or revokes one. Credential issuance stays authenticated even when the dashboard
// runs with login disabled (open instance):
//   - no credential → 401, whatever `requireLogin` says;
//   - a signed-in dashboard session → allowed, as before;
//   - a manage-scoped API key → may list, edit and revoke (minting is operator-only, see
//     relay-tokens-mint-operator.test.ts).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-relay-tokens-auth-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "relay-tokens-auth-api-key-secret";
process.env.JWT_SECRET = "relay-tokens-auth-jwt-secret";
process.env.INITIAL_PASSWORD = "relay-tokens-auth-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const relayDb = await import("../../src/lib/db/relayProxies.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const tokensRoute = await import("../../src/app/api/relay/tokens/route.ts");
const tokenByIdRoute = await import("../../src/app/api/relay/tokens/[id]/route.ts");

const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-relay", ["manage"]);

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
type ItemRoute = {
  GET: (request: Request, ctx: { params: Promise<{ id: string }> }) => Promise<Response>;
  PATCH: (request: Request, ctx: { params: Promise<{ id: string }> }) => Promise<Response>;
  DELETE: (request: Request, ctx: { params: Promise<{ id: string }> }) => Promise<Response>;
};

const collection = tokensRoute as unknown as CollectionRoute;
const item = tokenByIdRoute as unknown as ItemRoute;

const COLLECTION_URL = "http://localhost:20128/api/relay/tokens";
const itemUrl = (id: string) => `${COLLECTION_URL}/${id}`;
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

function anonymous(url: string, method = "GET", body?: unknown): Request {
  return new Request(url, {
    method,
    headers: body === undefined ? {} : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function withManageKey(url: string, method = "GET", body?: unknown): Request {
  const request = anonymous(url, method, body);
  request.headers.set("authorization", `Bearer ${manageKey.key}`);
  return request;
}

function seedToken(name: string): string {
  return relayDb.createRelayToken({ name }).id;
}

async function assertUnauthenticated(response: Response): Promise<void> {
  const text = await response.text();
  assert.equal(response.status, 401, `expected 401, got ${response.status}: ${text}`);
  assert.ok(!text.includes("at /"), "401 body must not leak a stack trace");
}

test("with login disabled, anonymous callers cannot list or mint relay tokens", async () => {
  await updateSettings({ requireLogin: false });
  try {
    await assertUnauthenticated(await collection.GET(anonymous(COLLECTION_URL)));
    await assertUnauthenticated(
      await collection.POST(anonymous(COLLECTION_URL, "POST", { name: "anon-mint" }))
    );
    assert.equal(
      relayDb.getRelayTokens().some((t) => t.name === "anon-mint"),
      false,
      "an anonymous mint must not persist a token"
    );
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

test("with login disabled, anonymous callers cannot read, edit, toggle or revoke a relay token", async () => {
  const id = seedToken("open-mode-target");
  await updateSettings({ requireLogin: false });
  try {
    await assertUnauthenticated(await item.GET(anonymous(itemUrl(id)), ctx(id)));
    await assertUnauthenticated(
      await item.PATCH(anonymous(itemUrl(id), "PATCH", { enabled: false }), ctx(id))
    );
    await assertUnauthenticated(
      await item.PATCH(anonymous(itemUrl(id), "PATCH", { name: "renamed-anon" }), ctx(id))
    );
    await assertUnauthenticated(await item.DELETE(anonymous(itemUrl(id), "DELETE"), ctx(id)));
    const after = relayDb.getRelayToken(id);
    assert.ok(after, "an anonymous DELETE must not revoke the token");
    assert.equal(after.enabled, true, "an anonymous PATCH must not toggle the token");
    assert.equal(after.name, "open-mode-target", "an anonymous PATCH must not rename the token");
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

test("with login enabled, anonymous callers still get 401 on every handler", async () => {
  const id = seedToken("closed-mode-target");
  await assertUnauthenticated(await collection.GET(anonymous(COLLECTION_URL)));
  await assertUnauthenticated(
    await collection.POST(anonymous(COLLECTION_URL, "POST", { name: "anon-mint-closed" }))
  );
  await assertUnauthenticated(await item.GET(anonymous(itemUrl(id)), ctx(id)));
  await assertUnauthenticated(
    await item.PATCH(anonymous(itemUrl(id), "PATCH", { enabled: false }), ctx(id))
  );
  await assertUnauthenticated(await item.DELETE(anonymous(itemUrl(id), "DELETE"), ctx(id)));
});

for (const requireLogin of [false, true]) {
  const mode = requireLogin ? "login enabled" : "login disabled";

  test(`${mode}: a dashboard session lists, mints, edits and revokes relay tokens`, async () => {
    await updateSettings({ requireLogin });
    try {
      const minted = await collection.POST(
        await makeManagementSessionRequest(COLLECTION_URL, {
          method: "POST",
          body: { name: `session-mint-${mode}` },
        })
      );
      assert.equal(minted.status, 200);
      const mintedBody = await minted.json();
      assert.match(mintedBody.rawToken, /\S+/, "mint returns the raw token once");

      const listed = await collection.GET(await makeManagementSessionRequest(COLLECTION_URL));
      assert.equal(listed.status, 200);
      const listedBody = await listed.json();
      assert.ok(listedBody.some((t: { id: string }) => t.id === mintedBody.id));
      assert.ok(
        listedBody.every((t: Record<string, unknown>) => t.tokenHash === undefined),
        "the inventory never exposes token hashes"
      );

      const patched = await item.PATCH(
        await makeManagementSessionRequest(itemUrl(mintedBody.id), {
          method: "PATCH",
          body: { enabled: false },
        }),
        ctx(mintedBody.id)
      );
      assert.equal(patched.status, 200);
      assert.equal(relayDb.getRelayToken(mintedBody.id)?.enabled, false);

      const fetched = await item.GET(
        await makeManagementSessionRequest(itemUrl(mintedBody.id)),
        ctx(mintedBody.id)
      );
      assert.equal(fetched.status, 200);

      const deleted = await item.DELETE(
        await makeManagementSessionRequest(itemUrl(mintedBody.id), { method: "DELETE" }),
        ctx(mintedBody.id)
      );
      assert.equal(deleted.status, 200);
      assert.equal(relayDb.getRelayToken(mintedBody.id), null);
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });

  test(`${mode}: a manage-scoped API key still lists, edits and revokes`, async () => {
    await updateSettings({ requireLogin });
    try {
      const id = seedToken(`key-managed-${mode}`);

      assert.equal((await collection.GET(withManageKey(COLLECTION_URL))).status, 200);
      assert.equal(
        (await item.PATCH(withManageKey(itemUrl(id), "PATCH", { name: "renamed" }), ctx(id)))
          .status,
        200
      );
      assert.equal((await item.DELETE(withManageKey(itemUrl(id), "DELETE"), ctx(id))).status, 200);
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });
}
