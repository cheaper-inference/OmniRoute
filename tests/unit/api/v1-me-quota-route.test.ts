// GET /api/v1/me/quota/{provider}: the self-service quota view of the calling API key.
// The handler is exercised directly (with an injectable builder) against a temporary DATA_DIR
// of its own, set before any module that can open the database is imported.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-me-quota-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const TEST_SECRET = "test-secret-at-least-32-chars-long-0123456789";
process.env.API_KEY_SECRET = TEST_SECRET;

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { updateApiKeySelfServiceSettings } =
  await import("../../../src/lib/db/apiKeySelfServiceSettings.ts");
const { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } =
  await import("../../../src/shared/constants/selfServiceScopes.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");
const {
  isPublicApiRoute,
  isPublicReadonlyCorsRoute,
  PUBLIC_API_ROUTE_PREFIXES,
  PUBLIC_API_ROUTES_EXACT,
  PUBLIC_READONLY_API_ROUTES_EXACT,
  PUBLIC_READONLY_CORS_API_ROUTES,
} = await import("../../../src/shared/constants/publicApiRoutes.ts");
const { handleSelfQuotaGet } = await import("../../../src/server/selfService/quotaHandler.ts");
type QuotaSelfViewInput = import("../../../src/lib/quota/selfViewTypes.ts").QuotaSelfViewInput;
type QuotaSelfViewDeps = import("../../../src/lib/quota/selfViewTypes.ts").QuotaSelfViewDeps;
type SelfQuotaHandlerDeps =
  import("../../../src/server/selfService/quotaHandler.ts").SelfQuotaHandlerDeps;

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

test.after(() => {
  delete process.env.QUOTA_SELF_PANEL;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let scoped = { id: "", key: "" };
let unscoped = { id: "", key: "" };
let accountKey = { id: "", key: "" };

test.before(async () => {
  const a = await apiKeysDb.createApiKey("self-quota-scoped", "test-machine", [SELF_USAGE_SCOPE]);
  const b = await apiKeysDb.createApiKey("self-quota-unscoped", "test-machine", []);
  const c = await apiKeysDb.createApiKey(
    "self-quota-account",
    "test-machine",
    [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    { allowedConnections: ["conn-allowed-1"] }
  );
  scoped = { id: a.id, key: a.key };
  unscoped = { id: b.id, key: b.key };
  accountKey = { id: c.id, key: c.key };
});

test.beforeEach(() => {
  process.env.QUOTA_SELF_PANEL = "true";
});

const EMPTY_VIEW = {
  provider: "claude",
  generatedAt: "2026-05-27T15:30:00.000Z",
  pools: [],
  availableModels: [],
  expiresAt: null,
  apiBaseUrl: null,
  blocks: { schedules: [], modelCaps: [] },
};

const bearer = (k: string) => ({ Authorization: `Bearer ${k}` });
const call = (
  provider: string,
  headers: Record<string, string> = {},
  deps: SelfQuotaHandlerDeps = {},
  url = "http://localhost/api/v1/me/quota/x"
) => handleSelfQuotaGet(new Request(url, { headers }), provider, deps);

/** A builder stub that records what the handler passes in and answers EMPTY_VIEW. */
function recordingBuilder() {
  const seen: { input?: QuotaSelfViewInput; deps?: QuotaSelfViewDeps } = {};
  const buildView = async (input: QuotaSelfViewInput, deps?: QuotaSelfViewDeps) => {
    seen.input = input;
    seen.deps = deps;
    return EMPTY_VIEW;
  };
  return { seen, buildView };
}

async function assertFixed500(res: Response, leaks: string[]) {
  const text = await res.text();
  assert.equal(res.status, 500);
  assert.equal(res.headers.get("Cache-Control"), "no-store");
  assert.equal(JSON.parse(text).error.message, "Failed to build quota view");
  for (const leak of [...leaks, "    at "]) assert.ok(!text.includes(leak), `leaked: ${leak}`);
  for (const [name, value] of res.headers) {
    for (const leak of leaks) assert.ok(!value.includes(leak), `leaked in header ${name}`);
  }
}

test("both spellings are client API routes, with no public-route entry", () => {
  assert.equal(classifyRoute("/v1/me/quota/claude").routeClass, "CLIENT_API");
  assert.equal(classifyRoute("/api/v1/me/quota/claude").routeClass, "CLIENT_API");
  // Every /api/v1/ route is reachable without a dashboard session through the existing
  // "/api/v1/" prefix (its handler authenticates the key itself, as /api/v1/me/status does).
  // What must hold: that prefix is the only match, there is no entry of the route's own, and
  // the read-only CORS relaxation does not apply.
  const quotaPath = "/api/v1/me/quota/claude";
  assert.equal(isPublicApiRoute(quotaPath, "GET"), isPublicApiRoute("/api/v1/me/status", "GET"));
  assert.deepEqual(
    PUBLIC_API_ROUTE_PREFIXES.filter((prefix) => quotaPath.startsWith(prefix)),
    ["/api/v1/"]
  );
  const ownEntries = [
    ...PUBLIC_API_ROUTES_EXACT,
    ...PUBLIC_READONLY_API_ROUTES_EXACT,
    ...PUBLIC_READONLY_CORS_API_ROUTES,
  ].filter((route) => route.startsWith("/api/v1/me") || route.startsWith("/v1/me"));
  assert.deepEqual(ownEntries, []);
  assert.equal(isPublicReadonlyCorsRoute(quotaPath, "GET"), false);
});

test("flag off is 404; no key is 401; no scope is 403; a bad provider is 400", async () => {
  delete process.env.QUOTA_SELF_PANEL;
  const off = await call("claude", bearer(scoped.key));
  assert.deepEqual([off.status, off.headers.get("Cache-Control")], [404, "no-store"]);
  process.env.QUOTA_SELF_PANEL = "true";
  assert.equal((await call("claude")).status, 401);
  const noScope = await call("claude", bearer(unscoped.key));
  assert.deepEqual([noScope.status, noScope.headers.get("Cache-Control")], [403, "no-store"]);
  const bad = await call("cl aude/../x", bearer(scoped.key));
  assert.deepEqual([bad.status, bad.headers.get("Cache-Control")], [400, "no-store"]);
  assert.equal((await bad.json()).error.message, "Invalid provider");
});

test("the key is read from headers only, never from the query string or a cookie", async () => {
  const viaQuery = await call(
    "claude",
    {},
    {},
    `http://localhost/api/v1/me/quota/claude?apiKey=${scoped.key}&key=${scoped.key}`
  );
  assert.equal(viaQuery.status, 401);
  const viaCookie = await call("claude", { Cookie: `apiKey=${scoped.key}; auth_token=x` });
  assert.equal(viaCookie.status, 401);
  for (const res of [viaQuery, viaCookie]) {
    assert.equal(res.headers.get("Cache-Control"), "no-store");
  }
});

test("a key outside any pool gets 200 with an empty pool list and exactly the documented keys", async () => {
  const res = await call("claude", bearer(scoped.key));
  assert.deepEqual([res.status, res.headers.get("Cache-Control")], [200, "no-store"]);
  const body = await res.json();
  assert.deepEqual(body.pools, []);
  assert.deepEqual(Object.keys(body).sort(), [
    "apiBaseUrl",
    "availableModels",
    "blocks",
    "expiresAt",
    "generatedAt",
    "pools",
    "provider",
  ]);
});

test("the builder receives the calling key's identity and sharing settings", async () => {
  const { seen, buildView } = recordingBuilder();
  await call("anthropic", { "x-api-key": scoped.key }, { buildView });
  assert.deepEqual(
    [seen.input?.apiKeyId, seen.input?.provider, seen.input?.sharedQuotaProviders],
    [scoped.id, "anthropic", null]
  );
});

test("the builder receives the key's scopes, quotas, connections, expiry, sharing list and secret", async () => {
  updateApiKeySelfServiceSettings(accountKey.id, { sharedQuotaProviders: ["claude"] });
  const { seen, buildView } = recordingBuilder();
  const res = await call("  CC ", bearer(accountKey.key), { buildView });
  assert.equal(res.status, 200);
  assert.deepEqual(seen.input, {
    apiKeyId: accountKey.id,
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedQuotas: [],
    allowedConnections: ["conn-allowed-1"],
    expiresAt: null,
    sharedQuotaProviders: ["claude"],
    // Trimmed, lower-cased and alias-resolved (cc is the registry alias of claude).
    provider: "claude",
  });
  assert.equal(seen.deps?.secret, TEST_SECRET);
});

test("a builder failure is a fixed 500 message; keys outside the contract never reach the wire", async () => {
  const boom = await call("claude", bearer(scoped.key), {
    buildView: async () => {
      throw new Error("SQLITE_ERROR at /home/app/src/lib/quota/selfView.ts:42:7");
    },
  });
  await assertFixed500(boom, ["SQLITE_ERROR", "selfView.ts", "/home/app"]);
  const extraRes = await call("claude", bearer(scoped.key), {
    buildView: async () => ({ ...EMPTY_VIEW, poolId: "p", connectionId: "c" }) as typeof EMPTY_VIEW,
  });
  // A 200 with the documented view: a fixed 500 body would also lack the extra keys.
  assert.equal(extraRes.status, 200);
  const extra = await extraRes.text();
  assert.deepEqual(JSON.parse(extra), EMPTY_VIEW);
  assert.ok(!extra.includes("poolId") && !extra.includes("connectionId"));
});

test("a view that breaks the contract is the same fixed 500", async () => {
  const res = await call("claude", bearer(scoped.key), {
    buildView: async () => ({ ...EMPTY_VIEW, pools: "not-a-list" }) as unknown as typeof EMPTY_VIEW,
  });
  await assertFixed500(res, ["not-a-list", "ZodError", "invalid_type"]);
});

test("a key store failure inside the real authentication gate is the same fixed 500", async () => {
  const lookups: string[] = [];
  const failingStore = {
    validateApiKey: async (key: string) => {
      lookups.push(key);
      throw new Error("SQLITE_CANTOPEN /data/storage.sqlite");
    },
    getApiKeyMetadata: async () => {
      throw new Error("SQLITE_CANTOPEN /data/storage.sqlite");
    },
  };
  const res = await call("claude", bearer(scoped.key), { keyStore: failingStore });
  await assertFixed500(res, ["SQLITE_CANTOPEN", "storage.sqlite"]);
  // The real gate read the header credential and reached the injected store.
  assert.deepEqual(lookups, [scoped.key]);
  // The flag check still runs before the store: with the flag off the store is never read.
  delete process.env.QUOTA_SELF_PANEL;
  const off = await call("claude", bearer(scoped.key), { keyStore: failingStore });
  assert.equal(off.status, 404);
  assert.deepEqual(lookups, [scoped.key]);
});

test("a missing server secret is the same fixed 500, without naming the secret", async () => {
  delete process.env.API_KEY_SECRET;
  try {
    const res = await call("claude", bearer(scoped.key));
    await assertFixed500(res, ["API_KEY_SECRET", "missing_pool_ref_secret", "secret"]);
  } finally {
    process.env.API_KEY_SECRET = TEST_SECRET;
  }
});

test("a builder refusal for a missing self:usage scope is a 403", async () => {
  const res = await call("claude", bearer(scoped.key), {
    buildView: async () => {
      throw new Error("missing_self_usage_scope");
    },
  });
  assert.deepEqual([res.status, res.headers.get("Cache-Control")], [403, "no-store"]);
});

test("the route file is a thin shell over the handler", () => {
  const src = fs.readFileSync(
    path.join(repoRoot, "src/app/api/v1/me/quota/[provider]/route.ts"),
    "utf8"
  );
  for (const piece of [/handleSelfQuotaGet/, /await params/, /dynamic = "force-dynamic"/]) {
    assert.match(src, piece);
  }
});
