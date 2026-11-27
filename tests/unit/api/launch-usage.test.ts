import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** Permissive view of a JSON body for assertions (no explicit any in tests/). */
type Loose = { [key: string]: Loose };

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-launch-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "launch-test-api-key-secret";
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const launchDb = await import("../../../src/lib/db/launchSessions.ts");
const agentDb = await import("../../../src/lib/db/agentSessions.ts");
const sessionsRoute = await import("../../../src/app/api/launch/sessions/route.ts");
const idRoute = await import("../../../src/app/api/launch/sessions/[id]/route.ts");
const usageRoute = await import("../../../src/app/api/launch/sessions/[id]/usage/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REMOTE = "http://gateway.example.com";

function req(method: string, pathName: string, token?: string, body?: unknown): Request {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (token) headers.authorization = `Bearer ${token}`;
  return new Request(`${REMOTE}${pathName}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

async function newKey(name: string) {
  const created = await apiKeysDb.createApiKey(name, "machine-test", []);
  return { id: created.id as string, key: created.key as string };
}

async function mint(key: string, tool = "codex") {
  const res = await sessionsRoute.POST(req("POST", "/api/launch/sessions", key, { tool }));
  assert.equal(res.status, 201);
  return (await res.json()) as { sessionId: string; token: string; sessionTag: string };
}

async function getUsage(id: string, token?: string) {
  return usageRoute.GET(req("GET", `/api/launch/sessions/${id}/usage`, token), ctx(id));
}

function record(
  apiKeyId: string,
  sessionId: string,
  opts: { success?: boolean; input?: number; output?: number; cost?: number; model?: string } = {}
) {
  return agentDb.recordAgentSessionUsage(core.getDbInstance() as never, {
    context: {
      client: "codex",
      clientSessionId: sessionId,
      projectName: null,
      projectRepo: null,
      projectPath: null,
      projectSource: null,
      gitBranch: null,
    },
    apiKeyId,
    apiKeyName: "k",
    timestamp: new Date().toISOString(),
    success: opts.success ?? true,
    tokens: {
      input: opts.input ?? 0,
      output: opts.output ?? 0,
      cacheRead: 0,
      cacheCreation: 0,
      reasoning: 0,
    },
    costUsd: opts.cost ?? 0,
    priced: true,
    provider: "openai",
    model: opts.model ?? "gpt-4o",
    connectionId: null,
  });
}

test("fresh session reports zero usage", async () => {
  const { id, key } = await newKey("fresh");
  void id;
  const s = await mint(key);
  const res = await getUsage(s.sessionId, s.token);
  assert.equal(res.status, 200);
  const body = (await res.json()) as Loose;
  assert.equal(body.sessionId, s.sessionId);
  assert.equal(body.toolId, "codex");
  assert.equal(body.sessionTag, s.sessionTag);
  assert.equal(body.requests, 0);
  assert.equal(body.errors, 0);
  assert.deepEqual(body.models, []);
  assert.equal("costUsd" in body, false);
  assert.equal(body.agentSessionId, null);
  assert.equal(body.endedAt, undefined);
});

test("usage sums the agent session row and persists agent_session_id", async () => {
  const { id, key } = await newKey("sums");
  const s = await mint(key);
  const agentId = record(id, s.sessionId, { input: 100, output: 20, cost: 0.5, model: "gpt-4o" });
  record(id, s.sessionId, { success: false, input: 50, output: 5, cost: 0.25, model: "gpt-4o" });

  const body = (await (await getUsage(s.sessionId, s.token)).json()) as Loose;
  assert.equal(body.requests, 2);
  assert.equal(body.errors, 1);
  assert.equal(body.inputTokens, 150);
  assert.equal(body.outputTokens, 25);
  assert.ok(Math.abs(body.costUsd - 0.75) < 1e-9);
  assert.equal(body.agentSessionId, agentId);
  assert.equal(launchDb.getLaunchSession(s.sessionId)?.agentSessionId, agentId);
});

test("per-model breakdown falls back to usage_history rows tagged with the agent session", async () => {
  // call_logs + request_cost_ledger seeding is heavy, so cover the usage_history fallback:
  // with no ledger rows for the session tag the models come from getAgentSessionRecentUsage.
  const { id, key } = await newKey("models");
  const s = await mint(key);
  const agentId = record(id, s.sessionId, { model: "gpt-4o" });
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT INTO usage_history (provider, model, timestamp, agent_session_id) VALUES (?, ?, ?, ?)"
  );
  const now = new Date().toISOString();
  insert.run("openai", "gpt-4o", now, agentId);
  insert.run("openai", "gpt-4o", now, agentId);
  insert.run("anthropic", "claude-sonnet", now, agentId);
  const body = (await (await getUsage(s.sessionId, s.token)).json()) as Loose;
  assert.deepEqual(body.models, [
    { id: "gpt-4o", requests: 2 },
    { id: "claude-sonnet", requests: 1 },
  ]);
});

test("usage from another parent key with the same client session id is not counted", async () => {
  const a = await newKey("iso-a");
  const b = await newKey("iso-b");
  const s = await mint(a.key);
  record(b.id, s.sessionId, { input: 999, output: 999, cost: 9 });
  const body = (await (await getUsage(s.sessionId, s.token)).json()) as Loose;
  assert.equal(body.requests, 0);
  assert.equal(body.inputTokens, 0);
  assert.equal(body.agentSessionId, null);

  record(a.id, s.sessionId, { input: 1, output: 2, cost: 0.1 });
  const after = (await (await getUsage(s.sessionId, a.key)).json()) as Loose;
  assert.equal(after.requests, 1);
  assert.equal(after.inputTokens, 1);
});

test("usage auth: session token and parent key ok, other key 404, no credential 401", async () => {
  const a = await newKey("auth-a");
  const b = await newKey("auth-b");
  const s = await mint(a.key);
  assert.equal((await getUsage(s.sessionId, s.token)).status, 200);
  assert.equal((await getUsage(s.sessionId, a.key)).status, 200);
  assert.equal((await getUsage(s.sessionId, b.key)).status, 404);
  assert.equal((await getUsage(s.sessionId)).status, 401);
  assert.equal((await getUsage("missing-session-id", a.key)).status, 404);
});

test("after DELETE the parent key still reads usage and endedAt is set", async () => {
  const { id, key } = await newKey("ended");
  const s = await mint(key);
  record(id, s.sessionId, { input: 10, output: 1, cost: 0.01 });
  const del = await idRoute.DELETE(
    req("DELETE", `/api/launch/sessions/${s.sessionId}`, s.token),
    ctx(s.sessionId)
  );
  assert.equal(del.status, 200);

  assert.equal((await getUsage(s.sessionId, s.token)).status, 401);
  const res = await getUsage(s.sessionId, key);
  assert.equal(res.status, 200);
  const body = (await res.json()) as Loose;
  assert.ok(typeof body.endedAt === "string" && !Number.isNaN(Date.parse(body.endedAt)));
  assert.equal(body.requests, 1);
});
