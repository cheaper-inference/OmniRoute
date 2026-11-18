import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "call-log-preview-durable-"));
process.env.DATA_DIR = dataDir;
process.env.NODE_ENV = "test";
const core = await import("../../src/lib/db/core.ts");
const history = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const completed = await import("../../src/lib/usage/completedRequestDetails.ts");
const { buildCallLogListRows, rowMatchesFilter } =
  await import("../../src/app/api/usage/call-logs/route.ts");
type Detail = import("../../src/lib/usage/usageHistory.ts").PendingRequestDetail & {
  persistedLogId?: string;
  attemptGeneration?: string;
};

test.before(async () => {
  await core.ensureDbInitialized();
});
test.beforeEach(() => {
  history.clearPendingRequests();
  core.getDbInstance().prepare("DELETE FROM call_logs").run();
});
test.after(async () => {
  await callLogs.closeCallLogSaves();
  history.clearPendingRequests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function start(correlationId = "same-client-request") {
  const id = history.trackPendingRequest("model", "openai", "account", true, {
    correlationId,
    clientEndpoint: "/v1/responses",
  });
  assert.ok(id);
  return id;
}
function finish(id: string, status = 200) {
  assert.equal(
    history.finalizePendingRequestById(id, {
      status,
      providerResponse: {},
      clientResponse: {},
    }),
    true
  );
}
function generation(id: string) {
  const detail = history.getPendingById().get(id) ?? history.getCompletedDetails().get(id);
  return (detail as Detail | undefined)?.attemptGeneration;
}
function save(id: string, status = 200, extra: Record<string, unknown> = {}) {
  return callLogs.saveCallLog({
    pendingRequestId: id,
    pendingRequestGeneration: generation(id),
    status,
    provider: "openai",
    model: "model",
    connectionId: "account",
    correlationId: "same-client-request",
    duration: 5,
    path: "/v1/responses",
    ...extra,
  });
}
function marker(id: string) {
  const detail = history.getPendingById().get(id) ?? history.getCompletedDetails().get(id);
  return (detail as Detail | undefined)?.persistedLogId;
}
function merge(logs: Awaited<ReturnType<typeof callLogs.getCallLogs>> = []) {
  return buildCallLogListRows({
    logs,
    connections: [],
    pendingDetails: history.getPendingById().values(),
    completedDetails: history.getCompletedDetails().values(),
  });
}
async function list(filter: Record<string, unknown> = {}) {
  return merge(await callLogs.getCallLogs(filter)).filter((row) => rowMatchesFilter(row, filter));
}

test("one completed attempt bridges a pending save and becomes one durable row", async () => {
  const id = start();
  finish(id);
  assert.deepEqual(
    merge().map((row) => row.id),
    [id]
  );
  await save(id);
  const durable = await callLogs.getCallLogs({});
  assert.equal(durable.length, 1);
  const rows = await list();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, durable[0].id);
  assert.equal(marker(id), durable[0].id);
});

test("502 then 200 under the same correlation remain two real attempts", async () => {
  const first = start();
  finish(first, 502);
  const firstSave = save(first, 502);
  const second = start();
  finish(second);
  await save(second);
  await firstSave;
  assert.deepEqual((await list()).map((row) => row.status).sort(), [200, 502]);
  const successfulRow = (await callLogs.getCallLogs({})).find((row) => row.status === 200);
  assert.ok(successfulRow);
  assert.equal(
    marker(second),
    successfulRow.id,
    "a late failed-attempt save must not link the retry preview"
  );
});

test("persistence before finalization keeps one active row and authoritative filter metadata", async () => {
  const id = start();
  await save(id, 200, {
    requestedModel: "requested-alias",
    apiKeyId: "key-one",
    comboName: "combo",
  });
  const durable = await callLogs.getCallLogs({});
  const rows = await list({
    status: "ok",
    apiKey: "key-one",
    combo: "1",
    model: "requested-alias",
  });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, id);
  assert.equal(rows[0].active, true);
  assert.equal(rows[0].apiKeyId, "key-one");
  assert.equal(marker(id), durable[0].id);
  finish(id);
  assert.deepEqual(
    (await list()).map((row) => row.id),
    [durable[0].id]
  );
});

test("finalization while persistence is building still links its completed preview", async () => {
  const id = start();
  const saving = save(id);
  finish(id);
  await saving;
  const durable = await callLogs.getCallLogs({});
  assert.equal(marker(id), durable[0].id);
  assert.deepEqual(
    (await list()).map((row) => row.id),
    [durable[0].id]
  );
});

test("an insert failure leaves the completed preview visible and unlinked", async () => {
  const id = start();
  finish(id);
  const db = core.getDbInstance();
  const errors: unknown[][] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  db.exec(
    "CREATE TEMP TRIGGER reject_preview_insert BEFORE INSERT ON call_logs BEGIN SELECT RAISE(FAIL, 'fixture insert failure'); END"
  );
  try {
    await save(id);
  } finally {
    db.exec("DROP TRIGGER reject_preview_insert");
    console.error = original;
  }
  assert.equal(errors.length, 1);
  assert.equal(marker(id), undefined);
  assert.deepEqual(
    (await list()).map((row) => row.id),
    [id]
  );
});

test("an off-page durable row leaves its sole completed preview visible", async () => {
  const id = start();
  finish(id);
  await save(id);
  assert.equal((await callLogs.getCallLogs({ limit: 1, offset: 1 })).length, 0);
  assert.deepEqual(
    (await list({ limit: 1, offset: 1 })).map((row) => row.id),
    [id]
  );
});

test("a filtered durable row leaves a matching completed preview visible", async () => {
  const id = start();
  finish(id);
  await save(id, 502);
  assert.equal((await callLogs.getCallLogs({ status: "ok" })).length, 0);
  assert.deepEqual(
    (await list({ status: "ok" })).map((row) => row.id),
    [id]
  );
});

test("the exact inserted ID is retained when an explicit ID collides", async () => {
  await callLogs.saveCallLog({ id: "occupied-id", model: "unrelated", status: 502 });
  const id = start();
  finish(id);
  await save(id, 200, { id: "occupied-id" });
  const durable = await callLogs.getCallLogs({});
  const ownRow = durable.find((row) => row.model === "model");
  assert.ok(ownRow);
  assert.notEqual(ownRow.id, "occupied-id");
  assert.equal(marker(id), ownRow.id);
  assert.deepEqual(
    new Set((await list()).map((row) => row.id)),
    new Set(durable.map((row) => row.id))
  );
});

test("unlinked completed attempts sharing metadata with a durable row are preserved", async () => {
  const id = start();
  finish(id);
  await callLogs.saveCallLog({
    id: "unrelated-row",
    status: 200,
    provider: "openai",
    model: "model",
    connectionId: "account",
    correlationId: "same-client-request",
  });
  assert.deepEqual(new Set((await list()).map((row) => row.id)), new Set([id, "unrelated-row"]));
});

test("unrelated concurrent attempts complete out of order without losing the peer", async () => {
  const first = start("first-client");
  const second = start("second-client");
  assert.notEqual(first, second);
  finish(second, 502);
  await save(second, 502);
  const rows = await list();
  assert.equal(rows.length, 2);
  assert.ok(rows.some((row) => row.id === first && row.active));
  assert.equal(history.getPendingById().get(first)?.id, first);
  finish(first);
  await save(first);
  assert.deepEqual((await list()).map((row) => row.status).sort(), [200, 502]);
});

test("repeated finalization and late token callbacks preserve the exact link", async () => {
  const id = start();
  finish(id);
  await save(id);
  const durableId = (await callLogs.getCallLogs({}))[0].id;
  assert.equal(history.finalizePendingRequestById(id, { status: 502 }), false);
  history.updateRequestTokensById(id, {
    in: 42,
    out: 7,
    cacheRead: null,
    cacheCreation: null,
    reasoning: null,
    compressed: null,
  });
  await save("missing-preview", 502);
  assert.equal(marker(id), durableId);
  assert.equal(history.getCompletedDetails().get(id)?.tokens?.in, 42);
  assert.equal((await list()).length, 2);
});

test("late artifact enrichment cannot restore a snapshot without its durable link", async () => {
  await callLogs.saveCallLog({
    id: "enrichment-row",
    status: 200,
    provider: "openai",
    model: "model",
    connectionId: "account",
    responseBody: { from: "artifact" },
  });
  const stale: Detail = {
    id: "enrichment-preview",
    model: "model",
    provider: "openai",
    connectionId: "account",
    startedAt: Date.now(),
    providerResponse: null,
    clientResponse: null,
  };
  completed.storeCompletedDetail({ ...stale, persistedLogId: "enrichment-row" });
  completed.maybeEnrichCompletedDetail(stale, "account");
  const deadline = Date.now() + 5000;
  while (!history.getCompletedDetails().get(stale.id)?.providerResponse && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.deepEqual(history.getCompletedDetails().get(stale.id)?.providerResponse, {
    from: "artifact",
  });
  assert.equal(marker(stale.id), "enrichment-row");
});

test("an earlier attempt first saved after public-ID reuse cannot mark the retry preview", async () => {
  const first = start();
  const firstGeneration = generation(first);
  finish(first, 502);
  const second = start();
  const secondGeneration = generation(second);
  assert.equal(second, first, "live-detail continuity keeps the public preview ID");
  finish(second);
  await save(first, 502, { pendingRequestGeneration: firstGeneration });
  assert.equal(marker(second), undefined, "the old callback cannot claim the new preview");
  await save(second, 200, { pendingRequestGeneration: secondGeneration });
  const success = (await callLogs.getCallLogs({ status: "ok" }))[0];
  assert.equal(marker(second), success.id);
  assert.deepEqual(
    (await list({ status: "ok" })).map((row) => row.id),
    [success.id]
  );
  assert.deepEqual((await list()).map((row) => row.status).sort(), [200, 502]);
});

test("a prior completed preview can link while a retry with its public ID is active", async () => {
  const first = start();
  const firstGeneration = generation(first);
  finish(first, 502);
  const second = start();
  await save(first, 502, { pendingRequestGeneration: firstGeneration });
  const failedRow = (await callLogs.getCallLogs({}))[0];
  assert.equal((history.getCompletedDetails().get(first) as Detail)?.persistedLogId, failedRow.id);
  assert.equal((history.getPendingById().get(second) as Detail)?.persistedLogId, undefined);
  assert.equal((await list()).length, 2);
});

test("a save without a captured generation cannot guess a reused preview's identity", async () => {
  const first = start();
  finish(first, 502);
  const second = start();
  finish(second);
  await save(first, 502, { pendingRequestGeneration: undefined });
  assert.equal(marker(second), undefined);
  assert.equal((await list()).length, 2);
});

test("late enrichment from an earlier generation cannot overwrite the reused preview", async () => {
  await callLogs.saveCallLog({
    id: "old-enrichment-row",
    status: 200,
    provider: "openai",
    model: "model",
    connectionId: "account",
    responseBody: { from: "old-artifact" },
  });
  const stale: Detail = {
    id: "reused-enrichment-preview",
    model: "model",
    provider: "openai",
    connectionId: "account",
    startedAt: Date.now(),
    attemptGeneration: "first",
    providerResponse: null,
    clientResponse: null,
  };
  completed.storeCompletedDetail({
    ...stale,
    attemptGeneration: "second",
    persistedLogId: "current-row",
    providerResponse: { from: "current-attempt" },
  });
  completed.maybeEnrichCompletedDetail(stale, "account");
  const deadline = Date.now() + 5000;
  while (!stale.providerResponse && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.deepEqual(stale.providerResponse, { from: "old-artifact" }, "enrichment completed");
  assert.deepEqual(history.getCompletedDetails().get(stale.id)?.providerResponse, {
    from: "current-attempt",
  });
  assert.equal(marker(stale.id), "current-row");
});

test("a successful deferred lock retry establishes linkage only after insertion", async () => {
  const id = start();
  finish(id);
  const db = core.getDbInstance();
  db.pragma("busy_timeout = 25");
  const locker = new Database(path.join(dataDir, "storage.sqlite"));
  locker.exec("BEGIN IMMEDIATE");
  try {
    const saving = save(id);
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(marker(id), undefined);
    assert.equal((await callLogs.getCallLogs({})).length, 0);
    locker.exec("ROLLBACK");
    await Promise.all([saving, new Promise((resolve) => setTimeout(resolve, 1100))]);
    const durable = (await callLogs.getCallLogs({}))[0];
    assert.ok(durable);
    assert.equal(marker(id), durable.id);
    assert.deepEqual(
      (await list()).map((row) => row.id),
      [durable.id]
    );
  } finally {
    if (locker.inTransaction) locker.exec("ROLLBACK");
    locker.close();
    db.pragma("busy_timeout = 2000");
  }
});

test("the attempt logger forwards the generation captured at registration", async () => {
  const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
  const id = start();
  const capturedGeneration = generation(id);
  finish(id);
  persistAttemptLogs(
    { status: 200 },
    {
      traceId: "logger-trace",
      provider: "openai",
      model: "model",
      connectionId: "account",
      pendingRequestId: id,
      pendingRequestGeneration: capturedGeneration,
      skillRequestId: "test",
      detailedLoggingEnabled: false,
      reqLogger: null,
      clientRawRequest: null,
      requestedModel: "model",
      credentials: null,
      startTime: Date.now(),
      body: {},
      sourceFormat: "openai",
      targetFormat: "openai",
      comboName: null,
      comboStepId: null,
      comboExecutionKey: null,
      tokensCompressed: 0,
      apiKeyInfo: null,
      noLogEnabled: false,
    }
  );
  assert.equal(await callLogs.waitForCallLogSaves(5000), true);
  const durable = (await callLogs.getCallLogs({}))[0];
  assert.equal(marker(id), durable.id);
  assert.deepEqual(
    (await list()).map((row) => row.id),
    [durable.id]
  );
  assert.equal("attemptGeneration" in (await list())[0], false);
});

test("repeated persistence callbacks preserve the first confirmed link", async () => {
  const id = start();
  finish(id);
  await save(id, 200, { id: "first-confirmed-row" });
  await save(id, 200, { id: "later-callback-row" });
  assert.equal(marker(id), "first-confirmed-row");
  assert.deepEqual(
    new Set((await list()).map((row) => row.id)),
    new Set(["first-confirmed-row", "later-callback-row"])
  );
});

test("a terminal lock failure leaves the completed preview unlinked", async () => {
  const id = start();
  finish(id);
  const db = core.getDbInstance();
  db.pragma("busy_timeout = 25");
  const locker = new Database(path.join(dataDir, "storage.sqlite"));
  locker.exec("BEGIN IMMEDIATE");
  const errors: unknown[][] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  try {
    await Promise.all([save(id), new Promise((resolve) => setTimeout(resolve, 1200))]);
    assert.equal(errors.length, 1);
    assert.equal(marker(id), undefined);
    assert.deepEqual(
      (await list()).map((row) => row.id),
      [id]
    );
  } finally {
    console.error = original;
    if (locker.inTransaction) locker.exec("ROLLBACK");
    locker.close();
    db.pragma("busy_timeout = 2000");
  }
});

for (const state of ["active", "completed"] as const) {
  test(`an unlinked ${state} retry cannot be collapsed into an older row sharing its public ID`, async () => {
    const first = start();
    finish(first, 502);
    await save(first, 502, { id: first });
    const second = start();
    assert.equal(second, first);
    if (state === "completed") finish(second);
    assert.equal(history.getPendingById().get(second)?.persistedLogId, undefined);
    if (state === "completed") assert.equal(marker(second), undefined);

    const rows = await list();
    assert.equal(rows.length, 2, "the older durable attempt and unlinked retry are distinct");
    assert.deepEqual(
      rows.map((row) => row.status).sort(),
      state === "active" ? [0, 502] : [200, 502]
    );
    const preview = rows.find((row) => row.active || row.completed);
    assert.ok(preview);
    assert.equal(preview.status, state === "active" ? 0 : 200);
  });
}

for (const state of ["active", "completed", "durable"] as const) {
  test(`account rename cannot discard a matching ${state} row after merging`, async () => {
    const providers = await import("../../src/lib/db/providers.ts");
    const settings = await import("../../src/lib/db/settings.ts");
    const { GET } = await import("../../src/app/api/usage/call-logs/route.ts");
    await settings.updateSettings({ requireLogin: false });
    const connection = await providers.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "before-rename",
      displayName: "before-rename",
    });
    const connectionId = String(connection.id);
    const id = history.trackPendingRequest("model", "openai", connectionId, true);
    assert.ok(id);
    const capturedGeneration = generation(id);
    if (state !== "active") finish(id);
    await callLogs.saveCallLog({
      pendingRequestId: id,
      pendingRequestGeneration: capturedGeneration,
      connectionId,
      provider: "openai",
      model: "model",
      status: 200,
      noLog: true,
    });
    if (state !== "durable")
      await providers.updateProviderConnection(connectionId, { name: "after-rename" });
    const saved = await callLogs.getCallLogs({ account: "before-rename" });
    assert.equal(saved.length, 1, "SQL still accepts the original stored account");
    assert.equal(saved[0].account, state === "durable" ? "before-rename" : "after-rename");
    const response = await GET(
      new Request("http://localhost/api/usage/call-logs?account=before-rename")
    );
    assert.equal(response.status, 200);
    const rows = await response.json();
    assert.equal(rows.length, 1);
    assert.equal(rows[0].id, state === "durable" ? saved[0].id : id);
    assert.equal(rows[0].account, "before-rename");
    if (state === "active") finish(id);
  });
}
