// Unit tests for API key self-service sessions endpoints:
// GET /v1/me/sessions and GET /v1/me/sessions/[id].
// Verifies filtering, pagination, sorting, privacy (connection stripping), and tenant isolation.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-sessions-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const agentSessionsDb = await import("../../src/lib/db/agentSessions.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { buildApiKeySelfServiceSessions, buildApiKeySelfServiceSessionDetail } =
  await import("../../src/lib/usage/apiKeySelfService.ts");
const { GET: getSessionsRoute } = await import("../../src/app/api/v1/me/sessions/route.ts");
const { GET: getSessionDetailRoute } =
  await import("../../src/app/api/v1/me/sessions/[id]/route.ts");
const { SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE } =
  await import("../../src/shared/constants/selfServiceScopes.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let keyAliceToken = "";
let keyAliceId = "";
let _keyBobToken = "";
let keyBobId = "";
let keyNoScopeToken = "";
let sessionAlice1 = "";
let _sessionAlice2 = "";
let sessionBob = "";

test.before(async () => {
  // Create API keys
  const aliceKey = await apiKeysDb.createApiKey("Alice Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyAliceToken = aliceKey.key;
  keyAliceId = aliceKey.id;

  const bobKey = await apiKeysDb.createApiKey("Bob Key", "test-machine", [SELF_USAGE_SCOPE]);
  _keyBobToken = bobKey.key;
  keyBobId = bobKey.id;

  const noScopeKey = await apiKeysDb.createApiKey("No Scope Key", "test-machine", []);
  keyNoScopeToken = noScopeKey.key;

  // Record sessions for Alice
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 100, output: 50 },
    success: true,
    latencyMs: 100,
    timestamp: "2026-09-25T10:00:00.000Z",
    connectionId: "conn-secret-1",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/alice/billing",
      projectSource: "path",
      gitBranch: "main",
    },
  });

  await usageHistory.saveRequestUsage({
    provider: "anthropic",
    model: "claude-sonnet-5",
    tokens: { input: 500, output: 200 },
    success: true,
    latencyMs: 200,
    timestamp: "2026-09-25T11:00:00.000Z",
    connectionId: "conn-secret-2",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "codex",
      clientSessionId: "alice-sess-2",
      projectName: "frontend",
      projectRepo: "github.com/acme/frontend",
      projectPath: "/home/alice/frontend",
      projectSource: "path",
      gitBranch: "feat/ui",
    },
  });

  // Record session for Bob
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 50, output: 25 },
    success: true,
    latencyMs: 50,
    timestamp: "2026-09-25T12:00:00.000Z",
    connectionId: "conn-secret-bob",
    apiKeyId: keyBobId,
    apiKeyName: "Bob Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "bob-sess-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/bob/billing",
      projectSource: "path",
      gitBranch: "fix/bug",
    },
  });

  const db = core.getDbInstance();
  const aliceSessions = agentSessionsDb.listAgentSessions(db, { apiKeyId: keyAliceId });
  sessionAlice1 = aliceSessions.sessions.find((s) => s.clientSessionId === "alice-sess-1")!.id;
  _sessionAlice2 = aliceSessions.sessions.find((s) => s.clientSessionId === "alice-sess-2")!.id;
  const bobSessions = agentSessionsDb.listAgentSessions(db, { apiKeyId: keyBobId });
  sessionBob = bobSessions.sessions[0].id;
});

test("buildApiKeySelfServiceSessions lists only calling key's sessions and strips connection IDs", async () => {
  const result = await buildApiKeySelfServiceSessions({
    id: keyAliceId,
    scopes: [SELF_USAGE_SCOPE],
  });

  assert.equal(result.total, 2);
  assert.equal(result.sessions.length, 2);
  assert.ok(result.sessions.every((s) => s.apiKeyId === keyAliceId));

  // Connection ID stripped without self:account-quota scope
  for (const s of result.sessions) {
    assert.equal("lastConnectionId" in s, false);
  }
});

test("buildApiKeySelfServiceSessions preserves connection IDs with self:account-quota scope", async () => {
  const result = await buildApiKeySelfServiceSessions({
    id: keyAliceId,
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
  });

  assert.equal(result.total, 2);
  const s1 = result.sessions.find((s) => s.clientSessionId === "alice-sess-1");
  assert.ok(s1);
  assert.equal(s1.lastConnectionId, "conn-secret-1");
});

test("buildApiKeySelfServiceSessions filters by project and client", async () => {
  const byProject = await buildApiKeySelfServiceSessions(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    { project: "billing-api" }
  );
  assert.equal(byProject.total, 1);
  assert.equal(byProject.sessions[0].projectName, "billing-api");

  const byClient = await buildApiKeySelfServiceSessions(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    { client: "codex" }
  );
  assert.equal(byClient.total, 1);
  assert.equal(byClient.sessions[0].client, "codex");
});

test("buildApiKeySelfServiceSessions throws without self:usage scope", async () => {
  await assert.rejects(
    () => buildApiKeySelfServiceSessions({ id: keyAliceId, scopes: [] }),
    /missing_self_usage_scope/
  );
});

test("buildApiKeySelfServiceSessionDetail returns session with recent requests", async () => {
  const detail = await buildApiKeySelfServiceSessionDetail(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    sessionAlice1
  );

  assert.ok(detail);
  assert.equal(detail.session.id, sessionAlice1);
  assert.equal(detail.session.projectName, "billing-api");
  assert.equal("lastConnectionId" in detail.session, false);
  assert.ok(detail.recentRequests.length >= 1);
  assert.equal(detail.recentRequests[0].model, "gpt-4o");
  assert.equal("connectionId" in detail.recentRequests[0], false);
});

test("buildApiKeySelfServiceSessionDetail refuses access to another key's session", async () => {
  const detail = await buildApiKeySelfServiceSessionDetail(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    sessionBob
  );
  assert.equal(detail, null);
});

test("route GET /v1/me/sessions requires authentication and self:usage scope", async () => {
  // No auth header -> 401
  const resNoAuth = await getSessionsRoute(new Request("http://localhost/api/v1/me/sessions"));
  assert.equal(resNoAuth.status, 401);

  // Missing scope -> 403
  const resNoScope = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions", {
      headers: { Authorization: `Bearer ${keyNoScopeToken}` },
    })
  );
  assert.equal(resNoScope.status, 403);
});

test("route GET /v1/me/sessions validates query params and returns session list", async () => {
  // Bad limit -> 400
  const resBadLimit = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions?limit=500", {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    })
  );
  assert.equal(resBadLimit.status, 400);

  // Valid query -> 200
  const resValid = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions?project=billing-api&limit=10", {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    })
  );
  assert.equal(resValid.status, 200);
  const data = await resValid.json();
  assert.equal(data.total, 1);
  assert.equal(data.sessions[0].projectName, "billing-api");
});

test("route GET /v1/me/sessions/[id] returns detail or 404 for foreign session", async () => {
  // Valid own session -> 200
  const resOwn = await getSessionDetailRoute(
    new Request(`http://localhost/api/v1/me/sessions/${sessionAlice1}`, {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    }),
    { params: Promise.resolve({ id: sessionAlice1 }) }
  );
  assert.equal(resOwn.status, 200);
  const data = await resOwn.json();
  assert.equal(data.session.id, sessionAlice1);
  assert.equal(data.recentRequests.length, 1);

  // Foreign session -> 404
  const resForeign = await getSessionDetailRoute(
    new Request(`http://localhost/api/v1/me/sessions/${sessionBob}`, {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    }),
    { params: Promise.resolve({ id: sessionBob }) }
  );
  assert.equal(resForeign.status, 404);
});

test("GET /v1/me/sessions normalizes timezone offset in from/to query params to UTC", async () => {
  // Alice has sessions at 10:00Z and 11:00Z.
  // 13:30+03:00 is 10:30Z, so it should exclude 10:00Z and include 11:00Z.
  const req = new Request(
    "http://localhost:20128/v1/me/sessions?from=" + encodeURIComponent("2026-09-25T13:30:00+03:00"),
    { headers: { Authorization: "Bearer " + keyAliceToken } }
  );
  const res = await getSessionsRoute(req);
  assert.equal(res.status, 200);
  const data = (await res.json()) as {
    total: number;
    sessions: Array<{ clientSessionId: string }>;
  };
  assert.equal(data.total, 1);
  assert.equal(data.sessions[0].clientSessionId, "alice-sess-2");
});

test("GET /v1/me/sessions returns an explicit token split with cached input counted once", async () => {
  // Stored input includes cache reads and writes; the response spells out the uncached part.
  await usageHistory.saveRequestUsage({
    provider: "anthropic",
    model: "claude-sonnet-5",
    tokens: { input: 10000, output: 40, cacheRead: 9000, cacheCreation: 900 },
    success: true,
    latencyMs: 100,
    timestamp: "2026-09-25T16:00:00.000Z",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-cache",
      projectName: "cache-demo",
      projectRepo: null,
      projectPath: "/home/alice/cache-demo",
      projectSource: "path",
      gitBranch: "main",
    },
  });

  const res = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions?project=cache-demo", {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    })
  );
  assert.equal(res.status, 200);
  const data = (await res.json()) as {
    sessions: Array<{ id: string; tokens: Record<string, number> }>;
  };
  assert.deepEqual(data.sessions[0].tokens, {
    input: 10000,
    uncachedInput: 100,
    cacheRead: 9000,
    cacheCreation: 900,
    output: 40,
    reasoning: 0,
    total: 10040,
  });

  const detailRes = await getSessionDetailRoute(
    new Request(`http://localhost/api/v1/me/sessions/${data.sessions[0].id}`, {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    }),
    { params: Promise.resolve({ id: data.sessions[0].id }) }
  );
  const detail = (await detailRes.json()) as {
    recentRequests: Array<{ tokens: Record<string, number> }>;
  };
  assert.deepEqual(detail.recentRequests[0].tokens, {
    input: 10000,
    uncachedInput: 100,
    cacheRead: 9000,
    cacheCreation: 900,
    output: 40,
    reasoning: 0,
  });
});

// clientSessionId filter. Carol and Dave both use the client session id "shared-sess", so the
// filter has to stay scoped to the calling key even when the id itself collides.
let keyCarolToken = "";
let keyCarolId = "";
let keyDaveToken = "";
let keyDaveId = "";

async function recordClientSession(
  apiKey: { id: string; name: string },
  clientSessionId: string,
  timestamp: string
) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 10, output: 5 },
    success: true,
    latencyMs: 10,
    timestamp,
    apiKeyId: apiKey.id,
    apiKeyName: apiKey.name,
    agentContext: {
      client: "claude-code",
      clientSessionId,
      projectName: "client-filter",
      projectRepo: null,
      projectPath: "/home/dev/client-filter",
      projectSource: "path",
      gitBranch: "main",
    },
  });
}

function listSessionsAs(token: string, query: string) {
  return getSessionsRoute(
    new Request(`http://localhost/api/v1/me/sessions?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}

type SessionListBody = {
  total: number;
  limit: number;
  offset: number;
  sessions: Array<{ id: string; apiKeyId: string; clientSessionId: string }>;
};

test.before(async () => {
  const carol = await apiKeysDb.createApiKey("Carol Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyCarolToken = carol.key;
  keyCarolId = carol.id;
  const dave = await apiKeysDb.createApiKey("Dave Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyDaveToken = dave.key;
  keyDaveId = dave.id;

  const carolKey = { id: keyCarolId, name: "Carol Key" };
  const daveKey = { id: keyDaveId, name: "Dave Key" };
  await recordClientSession(carolKey, "shared-sess", "2026-09-26T10:00:00.000Z");
  await recordClientSession(carolKey, "carol-only", "2026-09-26T10:05:00.000Z");
  await recordClientSession(daveKey, "shared-sess", "2026-09-26T10:10:00.000Z");
  await recordClientSession(daveKey, "dave-only", "2026-09-26T10:15:00.000Z");
});

test("GET /v1/me/sessions?clientSessionId returns the calling key's session with that id", async () => {
  const res = await listSessionsAs(keyCarolToken, "clientSessionId=carol-only");
  assert.equal(res.status, 200);
  const data = (await res.json()) as SessionListBody;
  assert.equal(data.total, 1);
  assert.equal(data.sessions.length, 1);
  assert.equal(data.sessions[0].clientSessionId, "carol-only");
  assert.equal(data.sessions[0].apiKeyId, keyCarolId);
});

test("GET /v1/me/sessions?clientSessionId returns an empty list when nothing matches", async () => {
  const res = await listSessionsAs(keyCarolToken, "clientSessionId=unknown-sess");
  assert.equal(res.status, 200);
  const data = (await res.json()) as SessionListBody;
  assert.equal(data.total, 0);
  assert.deepEqual(data.sessions, []);
});

test("GET /v1/me/sessions?clientSessionId never returns another key's session", async () => {
  const foreign = await listSessionsAs(keyCarolToken, "clientSessionId=dave-only");
  const foreignData = (await foreign.json()) as SessionListBody;
  assert.equal(foreignData.total, 0);
  assert.deepEqual(foreignData.sessions, []);

  const carolShared = (await (
    await listSessionsAs(keyCarolToken, "clientSessionId=shared-sess")
  ).json()) as SessionListBody;
  const daveShared = (await (
    await listSessionsAs(keyDaveToken, "clientSessionId=shared-sess")
  ).json()) as SessionListBody;
  assert.equal(carolShared.total, 1);
  assert.equal(carolShared.sessions[0].apiKeyId, keyCarolId);
  assert.equal(daveShared.total, 1);
  assert.equal(daveShared.sessions[0].apiKeyId, keyDaveId);
  assert.notEqual(carolShared.sessions[0].id, daveShared.sessions[0].id);
});

test("GET /v1/me/sessions validates clientSessionId", async () => {
  for (const value of ["", "%20%20", "x".repeat(129)]) {
    const res = await listSessionsAs(keyCarolToken, `clientSessionId=${value}`);
    assert.equal(res.status, 400, `clientSessionId=${value.slice(0, 20)}`);
    const body = (await res.json()) as { error: string };
    assert.equal(body.error, "Invalid query parameters");
  }

  const longest = await listSessionsAs(keyCarolToken, `clientSessionId=${"x".repeat(128)}`);
  assert.equal(longest.status, 200);

  const padded = await listSessionsAs(keyCarolToken, "clientSessionId=%20carol-only%20");
  const paddedData = (await padded.json()) as SessionListBody;
  assert.equal(paddedData.total, 1);
  assert.equal(paddedData.sessions[0].clientSessionId, "carol-only");
});

test("GET /v1/me/sessions?clientSessionId keeps limit and offset", async () => {
  const firstPage = (await (
    await listSessionsAs(keyCarolToken, "clientSessionId=shared-sess&limit=1&offset=0")
  ).json()) as SessionListBody;
  assert.equal(firstPage.total, 1);
  assert.equal(firstPage.sessions.length, 1);
  assert.equal(firstPage.limit, 1);

  const pastEnd = (await (
    await listSessionsAs(keyCarolToken, "clientSessionId=shared-sess&limit=1&offset=1")
  ).json()) as SessionListBody;
  assert.equal(pastEnd.total, 1);
  assert.deepEqual(pastEnd.sessions, []);
  assert.equal(pastEnd.offset, 1);
});

test("listAgentSessions without an api key filters by client session id across keys", () => {
  const { sessions, total } = agentSessionsDb.listAgentSessions(core.getDbInstance(), {
    clientSessionId: "shared-sess",
  });
  assert.equal(total, 2);
  assert.deepEqual(sessions.map((s) => s.apiKeyId).sort(), [keyCarolId, keyDaveId].sort());
});
