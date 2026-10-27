// call_logs.client_session_id — the client's own session id (opencode's x-opencode-session,
// Claude Code's x-claude-code-session-id, Codex's session_id, or Claude Code's
// metadata.user_id.session_id), persisted per attempt so an operator can join call-log rows
// to the agent session that sent them. Unlike session_tag it is never an OmniRoute-minted
// conversation id and never replaces one: both columns are written side by side.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-client-session-id-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { saveCallLog, getCallLogById, getCallLogs } =
  await import("../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
const { clientSessionIdFromRawRequest } =
  await import("../../open-sse/handlers/chatCore/clientSessionId.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function baseCtx(id: string, clientRawRequest: unknown, overrides: Record<string, unknown> = {}) {
  return {
    traceId: id,
    provider: "openai",
    connectionId: "conn-1",
    model: "gpt-x",
    skillRequestId: "skill-1",
    detailedLoggingEnabled: false,
    reqLogger: null,
    pendingRequestId: id,
    clientRawRequest,
    requestedModel: "gpt-x",
    credentials: { connectionId: "conn-1" },
    startTime: Date.now(),
    body: { messages: [{ role: "user", content: "hi" }] },
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: "my-combo",
    comboStepId: "my-combo-model-1-openai-gpt-x",
    comboExecutionKey: null,
    tokensCompressed: 0,
    apiKeyInfo: { id: "key-1", name: "Key One" },
    noLogEnabled: false,
    ...overrides,
  } as Parameters<typeof persistAttemptLogs>[1];
}

// Polls for the row itself rather than for detailState === "ready": the columns under test are
// written by the INSERT, so this does not depend on the detail-artifact worker finishing.
async function pollForCallLog(traceId: string) {
  const deadline = Date.now() + CALL_LOG_SETTLE_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const rows = await getCallLogs({ correlationId: traceId, limit: 5 });
    if (rows[0]?.id) {
      const row = await getCallLogById(rows[0].id);
      if (row) return row as Record<string, unknown>;
    }
    await new Promise((r) => setTimeout(r, 20));
  }
  return null;
}

test("clientSessionIdFromRawRequest reads each agent's own session header", () => {
  const raw = (headers: Record<string, string>, body?: unknown) => ({
    endpoint: "/v1/chat/completions",
    headers,
    body,
  });
  assert.equal(
    clientSessionIdFromRawRequest(raw({ "x-opencode-session": "ses_eae33138fffebuMYMAtH2Hs3Qs" })),
    "ses_eae33138fffebuMYMAtH2Hs3Qs"
  );
  assert.equal(
    clientSessionIdFromRawRequest(raw({ "x-claude-code-session-id": "c0957b70-6b21-484a" })),
    "c0957b70-6b21-484a"
  );
  assert.equal(
    clientSessionIdFromRawRequest(raw({ session_id: "01a14b61-10d3-7010" })),
    "01a14b61-10d3-7010"
  );
  assert.equal(
    clientSessionIdFromRawRequest(
      raw({}, { metadata: { user_id: JSON.stringify({ session_id: "from-metadata" }) } })
    ),
    "from-metadata"
  );
});

test("clientSessionIdFromRawRequest matches header names case-insensitively and bounds the value", () => {
  assert.equal(
    clientSessionIdFromRawRequest({ headers: { "X-OpenCode-Session": "  ses_mixed  " } }),
    "ses_mixed"
  );
  const long = "s".repeat(500);
  assert.equal(
    clientSessionIdFromRawRequest({ headers: { "x-opencode-session": long } })?.length,
    128
  );
});

test("clientSessionIdFromRawRequest is null without a client session, and never throws", () => {
  assert.equal(clientSessionIdFromRawRequest({ headers: { "user-agent": "curl/8" } }), null);
  assert.equal(clientSessionIdFromRawRequest({ headers: { "x-opencode-session": "   " } }), null);
  assert.equal(clientSessionIdFromRawRequest({ endpoint: "/v1/chat/completions" }), null);
  assert.equal(clientSessionIdFromRawRequest(null), null);
  assert.equal(clientSessionIdFromRawRequest(undefined), null);
  assert.equal(
    clientSessionIdFromRawRequest({ headers: { "x-opencode-session": 42 as unknown as string } }),
    null
  );
  assert.equal(
    clientSessionIdFromRawRequest({ headers: {}, body: { metadata: { user_id: "not json" } } }),
    null
  );
});

test("persistAttemptLogs stores the client session id next to the OmniRoute session_tag", async () => {
  const id = "client-session-attempt-1";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx(
      id,
      {
        endpoint: "/v1/chat/completions",
        headers: { "x-opencode-session": "ses_eae33138fffebuMYMAtH2Hs3Qs" },
      },
      { sessionTag: "conv_1234" }
    )
  );
  const row = await pollForCallLog(id);
  assert.ok(row, "call log row should be persisted");
  assert.equal(row.clientSessionId, "ses_eae33138fffebuMYMAtH2Hs3Qs");
  assert.equal(row.sessionTag, "conv_1234", "session_tag is untouched");
});

test("persistAttemptLogs stores NULL when the client sent no session id", async () => {
  const id = "client-session-attempt-2";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx(id, { endpoint: "/v1/chat/completions", headers: { "user-agent": "curl/8" } })
  );
  const row = await pollForCallLog(id);
  assert.ok(row);
  assert.equal(row.clientSessionId, null);
});

test("persistAttemptLogs stores the client session id even when no-log is on (metadata, not content)", async () => {
  const id = "client-session-attempt-3";
  persistAttemptLogs(
    { status: 200, tokens: { input: 1, output: 2 } },
    baseCtx(
      id,
      { endpoint: "/v1/chat/completions", headers: { "x-opencode-session": "ses_nolog" } },
      { noLogEnabled: true, sessionTag: "conv_nolog" }
    )
  );
  const deadline = Date.now() + CALL_LOG_SETTLE_TIMEOUT_MS;
  let row: Record<string, unknown> | undefined;
  while (Date.now() < deadline && !row) {
    row = coreDb
      .getDbInstance()
      .prepare("SELECT session_tag, client_session_id FROM call_logs WHERE correlation_id = ?")
      .get(id) as Record<string, unknown> | undefined;
    if (!row) await new Promise((r) => setTimeout(r, 20));
  }
  assert.ok(row);
  assert.equal(row.session_tag, "conv_nolog");
  assert.equal(row.client_session_id, "ses_nolog");
});

test("saveCallLog without clientSessionId writes NULL (other call-log writers are unaffected)", async () => {
  const id = `client-session-save-${Date.now()}`;
  await saveCallLog({
    id,
    method: "POST",
    path: "/v1/embeddings",
    status: 200,
    model: "m",
    provider: "p",
    duration: 1,
    tokens: { in: 1, out: 0 },
  });
  const row = coreDb
    .getDbInstance()
    .prepare("SELECT client_session_id FROM call_logs WHERE id = ?")
    .get(id) as Record<string, unknown>;
  assert.ok(row);
  assert.equal(row.client_session_id, null);
});

test("an index on client_session_id exists for per-session lookups", () => {
  const indexes = coreDb.getDbInstance().prepare("PRAGMA index_list(call_logs)").all() as Array<{
    name: string;
  }>;
  assert.ok(indexes.some((ix) => ix.name === "idx_cl_client_session_id"));
});
