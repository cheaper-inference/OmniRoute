// Registered provider keys (/api/v1/registered-keys*) are a management-only surface, exactly
// like /api/keys: listing, issuing and revoking them takes the same credential the API-key
// manager takes. Matrix for every handler (GET/POST collection, GET/DELETE item, POST revoke):
//   - no credential → 401 (unchanged);
//   - an API key WITHOUT manage scope (read / write) → 403, and nothing is issued or revoked;
//   - a manage-scoped API key → allowed, response shape unchanged;
//   - a dashboard session → allowed;
//   - login disabled (open instance) → allowed, unchanged.
// Regression guard: the same read key keeps getting 403 on /api/keys, so both surfaces agree.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "omniroute-registered-keys-scope-")
);
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "registered-keys-scope-api-key-secret";
process.env.JWT_SECRET = "registered-keys-scope-jwt-secret";
process.env.INITIAL_PASSWORD = "registered-keys-scope-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const registeredKeysDb = await import("../../src/lib/db/registeredKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const collectionRoute = await import("../../src/app/api/v1/registered-keys/route.ts");
const itemRoute = await import("../../src/app/api/v1/registered-keys/[id]/route.ts");
const revokeRoute = await import("../../src/app/api/v1/registered-keys/[id]/revoke/route.ts");
const apiKeysRoute = await import("../../src/app/api/keys/route.ts");

await updateSettings({ requireLogin: true });
const readKey = await apiKeysDb.createApiKey("read-automation", "machine-registered", ["read"]);
const writeKey = await apiKeysDb.createApiKey("write-automation", "machine-registered", ["write"]);
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-registered", [
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

const BASE_URL = "http://localhost:20128/api/v1/registered-keys";

type RequestFactory = (
  url: string,
  method: string,
  body?: Record<string, unknown>
) => Promise<Request>;

function plainRequest(headers: Record<string, string> = {}): RequestFactory {
  return async (url, method, body) =>
    new Request(url, {
      method,
      headers: body ? { ...headers, "content-type": "application/json" } : headers,
      body: body ? JSON.stringify(body) : undefined,
    });
}

const sessionRequest: RequestFactory = (url, method, body) =>
  makeManagementSessionRequest(url, { method, body });

function bearer(key: string): Record<string, string> {
  return { authorization: `Bearer ${key}` };
}

function routeParams(id: string): { params: Promise<{ id: string }> } {
  return { params: Promise.resolve({ id }) };
}

function seedRegisteredKey(name: string): string {
  const issued = registeredKeysDb.issueRegisteredKey({
    name,
    provider: "openai",
    accountId: "account-a",
  });
  assert.ok(!("idempotencyConflict" in issued), "seed must issue a fresh registered key");
  return issued.id;
}

function revokedAtOf(id: string): string | null {
  const key = registeredKeysDb.getRegisteredKey(id);
  assert.ok(key, `registered key ${id} must still exist`);
  return key.revokedAt;
}

interface Surface {
  name: string;
  okStatus: number;
  /** Top-level JSON keys of the allowed response — the shape must not change with the guard. */
  okKeys: string[];
  /** Whether the allowed path revokes the seeded key. */
  revokes: boolean;
  invoke: (make: RequestFactory, id: string) => Promise<Response>;
}

const SURFACES: Surface[] = [
  {
    name: "GET /api/v1/registered-keys",
    okStatus: 200,
    okKeys: ["keys", "total"],
    revokes: false,
    invoke: async (make) => collectionRoute.GET(await make(BASE_URL, "GET")),
  },
  {
    name: "POST /api/v1/registered-keys",
    okStatus: 201,
    okKeys: [
      "key",
      "keyId",
      "keyPrefix",
      "name",
      "provider",
      "accountId",
      "expiresAt",
      "createdAt",
      "warning",
    ],
    revokes: false,
    invoke: async (make) =>
      collectionRoute.POST(await make(BASE_URL, "POST", { name: "issued-by-test" })),
  },
  {
    name: "GET /api/v1/registered-keys/[id]",
    okStatus: 200,
    okKeys: ["key"],
    revokes: false,
    invoke: async (make, id) =>
      itemRoute.GET(await make(`${BASE_URL}/${id}`, "GET"), routeParams(id)),
  },
  {
    name: "DELETE /api/v1/registered-keys/[id]",
    okStatus: 200,
    okKeys: ["success", "id", "revokedAt"],
    revokes: true,
    invoke: async (make, id) =>
      itemRoute.DELETE(await make(`${BASE_URL}/${id}`, "DELETE"), routeParams(id)),
  },
  {
    name: "POST /api/v1/registered-keys/[id]/revoke",
    okStatus: 200,
    okKeys: ["success", "id", "revokedAt"],
    revokes: true,
    invoke: async (make, id) =>
      revokeRoute.POST(await make(`${BASE_URL}/${id}/revoke`, "POST"), routeParams(id)),
  },
];

async function assertRefusedWithoutSideEffect(
  surface: Surface,
  make: RequestFactory,
  expectedStatus: 401 | 403,
  secret?: string
): Promise<void> {
  const id = seedRegisteredKey(`${surface.name} ${expectedStatus}`);
  const totalBefore = registeredKeysDb.listRegisteredKeys().length;

  const response = await surface.invoke(make, id);
  const body = await response.json();
  const serialized = JSON.stringify(body);

  assert.equal(response.status, expectedStatus, `${surface.name} must answer ${expectedStatus}`);
  assert.ok(!serialized.includes("at /"), "error body must not leak a stack trace");
  if (secret) assert.ok(!serialized.includes(secret), "error body must not echo the credential");
  assert.equal(revokedAtOf(id), null, "a refused call must not revoke the key");
  assert.equal(
    registeredKeysDb.listRegisteredKeys().length,
    totalBefore,
    "a refused call must not issue a key"
  );
}

async function assertAllowed(surface: Surface, make: RequestFactory): Promise<void> {
  const id = seedRegisteredKey(`${surface.name} allowed`);
  const response = await surface.invoke(make, id);
  const body = await response.json();

  assert.equal(response.status, surface.okStatus, JSON.stringify(body));
  assert.deepEqual(Object.keys(body).sort(), [...surface.okKeys].sort());
  if (surface.revokes) {
    assert.ok(revokedAtOf(id), "the allowed revoke must mark the key revoked");
  } else {
    assert.equal(revokedAtOf(id), null);
  }
}

for (const surface of SURFACES) {
  test(`${surface.name}: unauthenticated callers get 401`, async () => {
    await assertRefusedWithoutSideEffect(surface, plainRequest(), 401);
  });

  test(`${surface.name}: a read-scoped API key is refused with 403`, async () => {
    const id = seedRegisteredKey(`${surface.name} read 403 body`);
    const response = await surface.invoke(plainRequest(bearer(readKey.key)), id);
    const body = (await response.json()) as {
      error?: { message?: string; type?: string };
      requestId?: string;
    };
    assert.equal(response.status, 403);
    assert.equal(body.error?.type, "invalid_request");
    assert.match(body.error?.message ?? "", /manage/i);
    assert.equal(typeof body.requestId, "string", "403 goes through createErrorResponse()");
    assert.equal(revokedAtOf(id), null, "a read key must not be able to revoke");

    await assertRefusedWithoutSideEffect(
      surface,
      plainRequest(bearer(readKey.key)),
      403,
      readKey.key
    );
  });

  test(`${surface.name}: a write-scoped API key is refused with 403`, async () => {
    await assertRefusedWithoutSideEffect(
      surface,
      plainRequest(bearer(writeKey.key)),
      403,
      writeKey.key
    );
  });

  test(`${surface.name}: a manage-scoped API key is allowed`, async () => {
    await assertAllowed(surface, plainRequest(bearer(manageKey.key)));
  });

  test(`${surface.name}: a dashboard session is allowed`, async () => {
    await assertAllowed(surface, sessionRequest);
  });

  test(`${surface.name}: with login disabled the instance is open`, async () => {
    await updateSettings({ requireLogin: false });
    try {
      await assertAllowed(surface, plainRequest());
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });
}

test("regression guard: the same read key still gets 403 on GET /api/keys", async () => {
  const response = await apiKeysRoute.GET(
    new Request("http://localhost:20128/api/keys", { headers: bearer(readKey.key) })
  );
  const body = await response.json();
  assert.equal(response.status, 403, JSON.stringify(body));
});
