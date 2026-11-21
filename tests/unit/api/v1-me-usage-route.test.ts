// GET /api/v1/me/usage: the usage and cost series of the calling API key.
// The handler runs with its default wiring against usage rows seeded through the src/lib/db
// and src/lib/usage modules, in a temporary DATA_DIR of its own set before any module that can
// open the database is imported. Some tests inject the builder or the gate's key store.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-me-usage-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../../src/lib/usage/usageHistory.ts");
const dbSettings = await import("../../../src/lib/db/databaseSettings.ts");
const { SELF_USAGE_SCOPE } = await import("../../../src/shared/constants/selfServiceScopes.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");
const {
  isPublicApiRoute,
  isPublicReadonlyCorsRoute,
  PUBLIC_API_ROUTE_PREFIXES,
  PUBLIC_API_ROUTES_EXACT,
  PUBLIC_READONLY_API_ROUTES_EXACT,
  PUBLIC_READONLY_CORS_API_ROUTES,
} = await import("../../../src/shared/constants/publicApiRoutes.ts");
const { handleSelfUsageGet } = await import("../../../src/server/selfService/usageHandler.ts");
type SelfUsageHandlerDeps =
  import("../../../src/server/selfService/usageHandler.ts").SelfUsageHandlerDeps;
type SelfUsageResponse = import("../../../src/shared/schemas/selfUsage.ts").SelfUsageResponse;

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

test.after(() => {
  delete process.env.QUOTA_SELF_PANEL;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let a = { id: "", key: "" };
let b = { id: "", key: "" };
let c = { id: "", key: "" };
let unscoped = { id: "", key: "" };
let future = { id: "", key: "" };
let revoked = { id: "", key: "" };
let retention = { id: "", key: "" };
let recorded = { id: "", key: "" };
let reused = { id: "", key: "" };
let revokedLater = { id: "", key: "" };

test.before(async () => {
  const created = await Promise.all([
    apiKeysDb.createApiKey("Key A", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key B", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key C", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key unscoped", "test-machine", []),
    apiKeysDb.createApiKey("Key future", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key losing scope", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key retention", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key recorded", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key reused", "test-machine", [SELF_USAGE_SCOPE]),
    apiKeysDb.createApiKey("Key revoked later", "test-machine", [SELF_USAGE_SCOPE]),
  ]);
  [a, b, c, unscoped, future, revoked, retention, recorded, reused, revokedLater] = created.map(
    (k) => ({
      id: k.id,
      key: k.key,
    })
  );
});

test.beforeEach(() => {
  process.env.QUOTA_SELF_PANEL = "true";
});

const bearer = (k: string) => ({ Authorization: `Bearer ${k}` });
const call = (
  query: string,
  headers: Record<string, string> = {},
  deps: SelfUsageHandlerDeps = {}
) => handleSelfUsageGet(new Request(`http://localhost/api/v1/me/usage${query}`, { headers }), deps);

// Distinct timestamps, a minute or more in the past: identical rows written in the same
// millisecond would be merged by the writer's duplicate guard.
let seq = 0;
function seed(o: Record<string, unknown>) {
  seq += 1;
  return usageHistory.saveRequestUsage({
    tokens: { input: 100, output: 50 },
    success: true,
    latencyMs: 100,
    timestamp: new Date(Date.now() - 60_000 - seq * 1000).toISOString(),
    connectionId: "conn-secret-1",
    ...o,
  } as Parameters<typeof usageHistory.saveRequestUsage>[0]);
}

const EMPTY_USAGE: SelfUsageResponse = {
  range: "30d",
  generatedAt: "2026-05-27T15:30:00.000Z",
  coverage: {
    from: "2026-04-27T15:30:00.000Z",
    to: "2026-05-27T15:30:00.000Z",
    retentionDays: 30,
    truncatedByRetention: false,
  },
  summary: {
    requests: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    costUsd: 0,
    listPriceUsd: 0,
    successfulRequests: 0,
    successRatePct: 0,
    uniqueModels: 0,
    avgLatencyMs: 0,
    firstRequest: null,
    lastRequest: null,
  },
  daily: [],
  dailyByModel: [],
  byModel: [],
  byModelTruncated: false,
  byProvider: [],
};

async function assertFixed500(res: Response, leaks: string[]) {
  const text = await res.text();
  assert.equal(res.status, 500);
  assert.equal(res.headers.get("Cache-Control"), "no-store");
  assert.equal(JSON.parse(text).error.message, "Failed to build usage");
  for (const leak of [...leaks, "    at "]) assert.ok(!text.includes(leak), `leaked: ${leak}`);
  for (const [name, value] of res.headers) {
    for (const leak of leaks) assert.ok(!value.includes(leak), `leaked in header ${name}`);
  }
}

test("both spellings are client API routes, with no public-route entry", () => {
  assert.equal(classifyRoute("/v1/me/usage").routeClass, "CLIENT_API");
  assert.equal(classifyRoute("/api/v1/me/usage").routeClass, "CLIENT_API");
  // Reachable without a dashboard session only through the existing "/api/v1/" prefix, like
  // /api/v1/me/status; the handler authenticates the key itself.
  const usagePath = "/api/v1/me/usage";
  assert.equal(isPublicApiRoute(usagePath, "GET"), isPublicApiRoute("/api/v1/me/status", "GET"));
  assert.deepEqual(
    PUBLIC_API_ROUTE_PREFIXES.filter((prefix) => usagePath.startsWith(prefix)),
    ["/api/v1/"]
  );
  const ownEntries = [
    ...PUBLIC_API_ROUTES_EXACT,
    ...PUBLIC_READONLY_API_ROUTES_EXACT,
    ...PUBLIC_READONLY_CORS_API_ROUTES,
  ].filter((route) => route.startsWith("/api/v1/me") || route.startsWith("/v1/me"));
  assert.deepEqual(ownEntries, []);
  assert.equal(isPublicReadonlyCorsRoute(usagePath, "GET"), false);
});

test("key A never sees key B's rows, including a row that only matches by name", async () => {
  await seed({ apiKeyId: a.id, apiKeyName: "Key A", provider: "claude", model: "claude-sonnet-5" });
  await seed({ apiKeyId: a.id, apiKeyName: "Key A", provider: "claude", model: "claude-sonnet-5" });
  await seed({ apiKeyId: b.id, apiKeyName: "Key B", provider: "openai", model: "gpt-5" });
  await seed({ apiKeyId: b.id, apiKeyName: a.id, provider: "openai", model: "gpt-5" }); // name == A's id
  // Legacy rows without a key id, named after A: NULL and empty-string api_key_id.
  await seed({ apiKeyName: a.id, provider: "openai", model: "legacy-null-model" });
  await seed({ apiKeyName: a.id, provider: "openai", model: "legacy-empty-model" });
  const legacy = core
    .getDbInstance()
    .prepare("UPDATE usage_history SET api_key_id = '' WHERE model = 'legacy-empty-model'")
    .run();
  assert.equal(legacy.changes, 1);

  const res = await call("?range=7d", bearer(a.key));
  assert.deepEqual([res.status, res.headers.get("Cache-Control")], [200, "no-store"]);
  const text = await res.text();
  const body = JSON.parse(text);
  assert.equal(body.summary.requests, 2);
  assert.deepEqual(
    body.byProvider.map((p: { provider: string }) => p.provider),
    ["claude"]
  );
  assert.deepEqual(
    body.byModel.map((m: { model: string }) => m.model),
    ["claude-sonnet-5"]
  );
  for (const leak of ["gpt-5", "legacy-", "conn-secret-1", "Key A", "Key B", a.id, b.id]) {
    assert.ok(!text.includes(leak), `leaked: ${leak}`);
  }
  assert.equal((await (await call("?range=7d", bearer(b.key))).json()).summary.requests, 2);
});

test("the response has exactly the documented keys", async () => {
  const body = await (await call("?range=7d", bearer(a.key))).json();
  assert.deepEqual(Object.keys(body).sort(), [
    "byModel",
    "byModelTruncated",
    "byProvider",
    "coverage",
    "daily",
    "dailyByModel",
    "generatedAt",
    "range",
    "summary",
  ]);
  assert.deepEqual(Object.keys(body.coverage).sort(), [
    "from",
    "retentionDays",
    "to",
    "truncatedByRetention",
  ]);
  for (const day of body.daily) assert.match(day.date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(
    body.daily.reduce((sum: number, day: { requests: number }) => sum + day.requests, 0),
    body.summary.requests
  );
  assert.equal(body.byModelTruncated, false);
});

test("a cut per-model list reaches the wire with byModelTruncated set", async () => {
  const res = await call("", bearer(a.key), {
    buildUsage: async () => ({ ...EMPTY_USAGE, byModelTruncated: true }),
  });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).byModelTruncated, true);
});

test("a subscription request is $0 billed and priced at list price", async () => {
  await seed({
    apiKeyId: c.id,
    apiKeyName: "Key C",
    provider: "claude",
    model: "claude-opus-4-8",
    tokens: { input: 1000, output: 1000 },
  });
  const body = await (await call("?range=1d", bearer(c.key))).json();
  assert.equal(body.summary.requests, 1);
  assert.equal(body.summary.costUsd, 0);
  assert.ok(body.summary.listPriceUsd > 0, "list price of a subscription request");
  assert.equal(body.byModel[0].listPriceUsd, body.summary.listPriceUsd);
  assert.equal(body.daily[0].listPriceUsd, body.summary.listPriceUsd);
});

test("a row stamped after now is not counted", async () => {
  await seed({ apiKeyId: future.id, provider: "openai", model: "gpt-5" });
  await seed({
    apiKeyId: future.id,
    provider: "openai",
    model: "from-the-future",
    timestamp: new Date(Date.now() + 3 * 86_400_000).toISOString(),
  });
  const text = await (await call("?range=1d", bearer(future.key))).text();
  const body = JSON.parse(text);
  assert.equal(body.summary.requests, 1);
  assert.ok(body.summary.lastRequest <= body.coverage.to);
  assert.ok(!text.includes("from-the-future"));
});

test("the gate runs before the reuse: a key that loses self:usage is refused at once", async () => {
  const first = await call("?range=7d", bearer(revoked.key));
  assert.equal(first.status, 200);
  await apiKeysDb.updateApiKeyPermissions(revoked.id, { scopes: [] });
  const after = await call("?range=7d", bearer(revoked.key));
  assert.deepEqual([after.status, after.headers.get("Cache-Control")], [403, "no-store"]);
});

test("coverage follows the operator's stored raw-history retention setting", async () => {
  // Default wiring: no injected retention. A fresh database carries the value its migration
  // seeded (046_database_settings.sql), not the code's fallback of 30.
  const stored = dbSettings.getUserDatabaseSettings().retention;
  const seeded = stored.usageHistory;
  const fresh = await (await call("?range=90d", bearer(retention.key))).json();
  assert.equal(fresh.coverage.retentionDays, seeded);
  assert.notEqual(seeded, 30);
  dbSettings.updateDatabaseSettings({ retention: { ...stored, usageHistory: 7 } });
  try {
    const month = await (await call("?range=30d", bearer(retention.key))).json();
    assert.deepEqual(
      [month.coverage.retentionDays, month.coverage.truncatedByRetention],
      [7, true]
    );
    const week = await (await call("?range=7d", bearer(retention.key))).json();
    assert.deepEqual([week.coverage.retentionDays, week.coverage.truncatedByRetention], [7, false]);
  } finally {
    dbSettings.updateDatabaseSettings({ retention: { ...stored } });
  }
});

test("provider and model are returned as recorded; an unpriced model counts 0", async () => {
  // The shape written for a combo whose every target was refused: the routing label as
  // provider and the client's model string.
  await seed({
    apiKeyId: recorded.id,
    provider: "team-internal-combo",
    model: "my-alias",
    success: false,
    tokens: {},
    comboStrategy: "team-internal-combo",
  });
  await seed({ apiKeyId: recorded.id, provider: "openai", model: "totally-unpriced-model-xyz" });
  const body = await (await call("?range=1d", bearer(recorded.key))).json();
  const providers = body.byProvider.map((p: { provider: string }) => p.provider).sort();
  assert.deepEqual(providers, ["openai", "team-internal-combo"]);
  const unpriced = body.byModel.find(
    (m: { model: string }) => m.model === "totally-unpriced-model-xyz"
  );
  assert.deepEqual([unpriced.costUsd, unpriced.listPriceUsd], [0, 0]);
  assert.deepEqual([body.summary.costUsd, body.summary.listPriceUsd], [0, 0]);
  assert.equal(body.summary.successRatePct, 50);
});

test("the default path reuses a built series within the reuse window", async () => {
  // Key and range used by no other test, so the module's shared reuse cannot collide.
  await seed({ apiKeyId: reused.id, provider: "openai", model: "gpt-5" });
  const first = await (await call("?range=90d", bearer(reused.key))).json();
  await seed({ apiKeyId: reused.id, provider: "openai", model: "recorded-in-between" });
  const text = await (await call("?range=90d", bearer(reused.key))).text();
  const second = JSON.parse(text);
  assert.equal(first.summary.requests, 1);
  assert.equal(second.generatedAt, first.generatedAt);
  assert.equal(second.summary.requests, 1);
  assert.ok(!text.includes("recorded-in-between"));
});

test("a key revoked after its series was cached is refused, not served", async () => {
  const before = await call("?range=7d", bearer(revokedLater.key));
  assert.equal(before.status, 200);
  assert.equal(await apiKeysDb.revokeApiKey(revokedLater.id), true);
  const after = await call("?range=7d", bearer(revokedLater.key));
  assert.deepEqual([after.status, after.headers.get("Cache-Control")], [401, "no-store"]);
});

test("range is a closed set with a default", async () => {
  assert.equal((await (await call("", bearer(a.key))).json()).range, "30d");
  for (const bad of [
    "?range=all",
    "?range=365d",
    "?range=ytd",
    "?range=7d%27%20OR%201=1",
    "?range=",
    "?range=7D",
    "?range=7d&range=all",
  ]) {
    const res = await call(bad, bearer(a.key));
    assert.deepEqual([res.status, res.headers.get("Cache-Control")], [400, "no-store"], bad);
    assert.equal((await res.json()).error.message, "Invalid range");
  }
});

test("authentication runs before range validation", async () => {
  assert.equal((await call("?range=all")).status, 401);
  assert.equal((await call("?range=all", bearer(unscoped.key))).status, 403);
});

test("auth, flag, headers and error sanitization follow the quota route", async () => {
  assert.equal((await call("")).status, 401);
  assert.equal((await call("", bearer(unscoped.key))).status, 403);
  assert.equal((await call("", bearer(a.key))).headers.get("Cache-Control"), "no-store");
  assert.equal((await call("", { "x-api-key": a.key })).status, 200);
  const viaQuery = await call(`?range=7d&apiKey=${a.key}&key=${a.key}`);
  assert.equal(viaQuery.status, 401);
  const boom = await call("", bearer(a.key), {
    buildUsage: async () => {
      throw new Error("no such table at /srv/x.ts:1");
    },
  });
  await assertFixed500(boom, ["no such table", "/srv/x.ts"]);
  delete process.env.QUOTA_SELF_PANEL;
  const off = await call("", bearer(a.key));
  assert.deepEqual([off.status, off.headers.get("Cache-Control")], [404, "no-store"]);
});

test("the builder receives the calling key's id, scopes and the parsed range", async () => {
  const seen: Array<[unknown, unknown]> = [];
  const res = await call("?range=90d", bearer(a.key), {
    buildUsage: async (key, range) => {
      seen.push([key, range]);
      return { ...EMPTY_USAGE, range };
    },
  });
  assert.equal(res.status, 200);
  assert.deepEqual(seen, [[{ id: a.id, scopes: [SELF_USAGE_SCOPE] }, "90d"]]);
});

test("keys outside the contract never reach the wire; a broken result is the fixed 500", async () => {
  const extraRes = await call("", bearer(a.key), {
    buildUsage: async () =>
      ({
        ...EMPTY_USAGE,
        connectionId: "conn-x",
        apiKeyName: "Key B",
        byModel: [
          {
            model: "m",
            provider: "p",
            requests: 1,
            promptTokens: 1,
            completionTokens: 1,
            totalTokens: 2,
            costUsd: 0,
            listPriceUsd: 0,
            avgLatencyMs: 1,
            successRatePct: 100,
            lastUsed: null,
            accountKey: "acct-secret",
            comboName: "combo-secret",
          },
        ],
      }) as unknown as SelfUsageResponse,
  });
  assert.equal(extraRes.status, 200);
  const extra = await extraRes.text();
  assert.deepEqual(Object.keys(JSON.parse(extra).byModel[0]).sort(), [
    "avgLatencyMs",
    "completionTokens",
    "costUsd",
    "lastUsed",
    "listPriceUsd",
    "model",
    "promptTokens",
    "provider",
    "requests",
    "successRatePct",
    "totalTokens",
  ]);
  for (const leak of ["connectionId", "conn-x", "Key B", "acct-secret", "combo-secret"]) {
    assert.ok(!extra.includes(leak), `leaked: ${leak}`);
  }
  const broken = await call("", bearer(a.key), {
    buildUsage: async () =>
      ({ ...EMPTY_USAGE, daily: "not-a-list" }) as unknown as SelfUsageResponse,
  });
  await assertFixed500(broken, ["not-a-list", "ZodError", "invalid_type"]);
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
  const res = await call("?range=all", bearer(a.key), { keyStore: failingStore });
  await assertFixed500(res, ["SQLITE_CANTOPEN", "storage.sqlite"]);
  assert.deepEqual(lookups, [a.key]);
});

test("a builder refusal for a missing self:usage scope is a 403", async () => {
  const res = await call("", bearer(a.key), {
    buildUsage: async () => {
      throw new Error("missing_self_usage_scope");
    },
  });
  assert.deepEqual([res.status, res.headers.get("Cache-Control")], [403, "no-store"]);
});

test("the route file is a thin shell over the handler", () => {
  const src = fs.readFileSync(path.join(repoRoot, "src/app/api/v1/me/usage/route.ts"), "utf8");
  for (const piece of [
    /handleSelfUsageGet/,
    /dynamic = "force-dynamic"/,
    /export async function GET/,
  ]) {
    assert.match(src, piece);
  }
});
