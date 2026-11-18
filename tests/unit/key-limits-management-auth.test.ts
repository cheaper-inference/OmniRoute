// The key-issuance caps (/api/v1/providers/[provider]/limits and /api/v1/accounts/[id]/limits)
// are operator configuration: they are what POST /api/v1/registered-keys checks before it issues
// a provider credential, so they take the same management credential that route takes.
// Matrix for every handler (GET and PUT on both routes):
//   - no credential → 401;
//   - an API key WITHOUT manage/admin scope (none / read / write) → 403, nothing read or written;
//   - a manage- or admin-scoped API key → allowed, response shape unchanged;
//   - a dashboard session → allowed;
//   - login disabled (open instance) → allowed, unchanged.
// Regression guard: GET /api/v1/quotas/check stays a Bearer-key read (docs/reference/API_REFERENCE.md).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "omniroute-key-limits-auth-")
);
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "key-limits-auth-api-key-secret";
process.env.JWT_SECRET = "key-limits-auth-jwt-secret";
process.env.INITIAL_PASSWORD = "key-limits-auth-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const registeredKeysDb = await import("../../src/lib/db/registeredKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { classifyRoute } = await import("../../src/server/authz/classify.ts");
const providerLimitsRoute =
  await import("../../src/app/api/v1/providers/[provider]/limits/route.ts");
const accountLimitsRoute = await import("../../src/app/api/v1/accounts/[id]/limits/route.ts");
const quotaCheckRoute = await import("../../src/app/api/v1/quotas/check/route.ts");

await updateSettings({ requireLogin: true });
const inferenceKey = await apiKeysDb.createApiKey("inference-client", "machine-limits", []);
const readKey = await apiKeysDb.createApiKey("read-automation", "machine-limits", ["read"]);
const writeKey = await apiKeysDb.createApiKey("write-automation", "machine-limits", ["write"]);
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-limits", ["manage"]);
const adminKey = await apiKeysDb.createApiKey("admin-automation", "machine-limits", ["admin"]);

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const BASE_URL = "http://localhost:20128/api/v1";
const PROVIDER = "openai";
const ACCOUNT = "account-a";
// Unusual on purpose, so a body that leaks the seeded cap cannot match by accident.
const OPERATOR_CAPS = { maxActiveKeys: 7919, dailyIssueLimit: 7907, hourlyIssueLimit: 7901 };
const NEW_CAPS = { maxActiveKeys: 104729, dailyIssueLimit: 104723, hourlyIssueLimit: 104717 };

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

function seedOperatorCaps(): void {
  registeredKeysDb.setProviderKeyLimit(PROVIDER, OPERATOR_CAPS);
  registeredKeysDb.setAccountKeyLimit(ACCOUNT, OPERATOR_CAPS);
}

function storedCaps(): unknown {
  const provider = registeredKeysDb.getProviderKeyLimit(PROVIDER);
  const account = registeredKeysDb.getAccountKeyLimit(ACCOUNT);
  return {
    provider: [provider?.maxActiveKeys, provider?.dailyIssueLimit, provider?.hourlyIssueLimit],
    account: [account?.maxActiveKeys, account?.dailyIssueLimit, account?.hourlyIssueLimit],
  };
}

interface Surface {
  name: string;
  /** Top-level JSON keys of the allowed response — the shape must not change with the guard. */
  okKeys: string[];
  /** Whether the allowed path writes NEW_CAPS over the seeded caps. */
  writes: boolean;
  invoke: (make: RequestFactory) => Promise<Response>;
}

const providerUrl = `${BASE_URL}/providers/${PROVIDER}/limits`;
const accountUrl = `${BASE_URL}/accounts/${ACCOUNT}/limits`;
const providerParams = { params: Promise.resolve({ provider: PROVIDER }) };
const accountParams = { params: Promise.resolve({ id: ACCOUNT }) };

const SURFACES: Surface[] = [
  {
    name: "GET /api/v1/providers/[provider]/limits",
    okKeys: ["limits", "provider"],
    writes: false,
    invoke: async (make) => providerLimitsRoute.GET(await make(providerUrl, "GET"), providerParams),
  },
  {
    name: "PUT /api/v1/providers/[provider]/limits",
    okKeys: ["limits", "provider"],
    writes: true,
    invoke: async (make) =>
      providerLimitsRoute.PUT(await make(providerUrl, "PUT", NEW_CAPS), providerParams),
  },
  {
    name: "GET /api/v1/accounts/[id]/limits",
    okKeys: ["accountId", "limits"],
    writes: false,
    invoke: async (make) => accountLimitsRoute.GET(await make(accountUrl, "GET"), accountParams),
  },
  {
    name: "PUT /api/v1/accounts/[id]/limits",
    okKeys: ["accountId", "limits"],
    writes: true,
    invoke: async (make) =>
      accountLimitsRoute.PUT(await make(accountUrl, "PUT", NEW_CAPS), accountParams),
  },
];

async function assertRefused(
  surface: Surface,
  make: RequestFactory,
  expectedStatus: 401 | 403,
  secret?: string
): Promise<void> {
  seedOperatorCaps();
  const before = storedCaps();

  const response = await surface.invoke(make);
  const body = (await response.json()) as {
    error?: { message?: string; type?: string };
    requestId?: string;
  };
  const serialized = JSON.stringify(body);

  assert.equal(response.status, expectedStatus, `${surface.name}: ${serialized}`);
  assert.equal(body.error?.type, "invalid_request");
  assert.equal(typeof body.requestId, "string", "refusal goes through createErrorResponse()");
  assert.ok(!serialized.includes("at /"), "error body must not leak a stack trace");
  if (expectedStatus === 403) assert.match(body.error?.message ?? "", /manage/i);
  if (secret) assert.ok(!serialized.includes(secret), "error body must not echo the credential");
  assert.ok(
    !serialized.includes(String(OPERATOR_CAPS.maxActiveKeys)),
    "a refused call must not disclose the configured caps"
  );
  assert.deepEqual(storedCaps(), before, "a refused call must not change the caps");
}

async function assertAllowed(surface: Surface, make: RequestFactory): Promise<void> {
  seedOperatorCaps();
  const response = await surface.invoke(make);
  const body = (await response.json()) as { limits?: Record<string, unknown> };

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.deepEqual(Object.keys(body).sort(), [...surface.okKeys].sort());

  const expected = surface.writes ? NEW_CAPS : OPERATOR_CAPS;
  assert.equal(body.limits?.maxActiveKeys, expected.maxActiveKeys);
  assert.equal(body.limits?.dailyIssueLimit, expected.dailyIssueLimit);
  assert.equal(body.limits?.hourlyIssueLimit, expected.hourlyIssueLimit);
}

test("the limits routes sit on the client API class, so the handler guard is the only gate", () => {
  for (const url of [providerUrl, accountUrl]) {
    assert.equal(classifyRoute(new URL(url).pathname, "PUT").routeClass, "CLIENT_API");
  }
});

for (const surface of SURFACES) {
  test(`${surface.name}: unauthenticated callers get 401`, async () => {
    await assertRefused(surface, plainRequest(), 401);
  });

  test(`${surface.name}: an inference key with no scopes is refused with 403`, async () => {
    await assertRefused(surface, plainRequest(bearer(inferenceKey.key)), 403, inferenceKey.key);
  });

  test(`${surface.name}: a read-scoped API key is refused with 403`, async () => {
    await assertRefused(surface, plainRequest(bearer(readKey.key)), 403, readKey.key);
  });

  test(`${surface.name}: a write-scoped API key is refused with 403`, async () => {
    await assertRefused(surface, plainRequest(bearer(writeKey.key)), 403, writeKey.key);
  });

  test(`${surface.name}: a manage-scoped API key is allowed`, async () => {
    await assertAllowed(surface, plainRequest(bearer(manageKey.key)));
  });

  test(`${surface.name}: an admin-scoped API key is allowed`, async () => {
    await assertAllowed(surface, plainRequest(bearer(adminKey.key)));
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

  // The /api/v1/ public prefix must not count as "auth not required" here: with no password
  // configured yet, a caller with no credential still gets 401 once setup is complete.
  test(`${surface.name}: with no password configured an anonymous caller gets 401`, async () => {
    const initialPassword = process.env.INITIAL_PASSWORD;
    delete process.env.INITIAL_PASSWORD;
    await updateSettings({ setupComplete: true });
    try {
      await assertRefused(surface, plainRequest(), 401);
    } finally {
      process.env.INITIAL_PASSWORD = initialPassword;
      await updateSettings({ setupComplete: false });
    }
  });
}

test("PUT checks the credential before it reads the body", async () => {
  const refused = await providerLimitsRoute.PUT(
    new Request(providerUrl, {
      method: "PUT",
      headers: { ...bearer(inferenceKey.key), "content-type": "application/json" },
      body: "{not json",
    }),
    providerParams
  );
  assert.equal(refused.status, 403);

  const invalid = await accountLimitsRoute.PUT(
    await plainRequest(bearer(manageKey.key))(accountUrl, "PUT", { maxActiveKeys: -1 }),
    accountParams
  );
  assert.equal(invalid.status, 400, "an authorized caller still gets body validation");
});

test("regression guard: GET /api/v1/quotas/check still answers an inference key", async () => {
  registeredKeysDb.setProviderKeyLimit("quota-open", { maxActiveKeys: 5 });
  const response = await quotaCheckRoute.GET(
    new Request(`${BASE_URL}/quotas/check?provider=quota-open`, {
      headers: bearer(inferenceKey.key),
    })
  );
  const body = (await response.json()) as { allowed?: boolean; provider?: string };

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.allowed, true);
  assert.equal(body.provider, "quota-open");
});
