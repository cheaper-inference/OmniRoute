import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "in-memory-usage-"));
process.env.DATA_DIR = dataDir;
const history = await import("../../src/lib/usage/usageHistory.ts");
const { saveCallLog, closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { buildCallLogListRows } = await import("../../src/app/api/usage/call-logs/route.ts");
const { clearCompletedDetails } = await import("../../src/lib/usage/completedRequestDetails.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");

// Exercise the persistence admission gate without writing request artifacts.
await closeCallLogSaves();

test.after(() => {
  clearCompletedDetails();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const finalizeFirst of [false, true]) {
  test(`usage survives closed persistence (finalize first: ${finalizeFirst})`, async () => {
    const id = history.trackPendingRequest("model", "provider", "connection", true);
    assert.ok(id);
    const capturedGeneration = history.getPendingById().get(id)?.attemptGeneration;
    const finish = () =>
      history.finalizePendingRequestById(id, {
        status: 200,
        providerResponse: {},
        clientResponse: {},
      });
    if (finalizeFirst) finish();
    await saveCallLog({
      id: `attempt-${id}`,
      pendingRequestId: id,
      pendingRequestGeneration: capturedGeneration,
      tokens: {
        prompt_tokens: 43979,
        completion_tokens: 243,
        prompt_tokens_details: { cached_tokens: 43000 },
        completion_tokens_details: { reasoning_tokens: 100 },
      },
    });
    if (!finalizeFirst) finish();
    const rows = buildCallLogListRows({
      logs: [],
      connections: [],
      pendingDetails: [],
      completedDetails: history.getCompletedDetails().values(),
    });
    const row = rows.find((entry) => entry.id === id);
    assert.equal(history.getCompletedDetails().get(id)?.persistedLogId, undefined);
    assert.equal(row.tokens.in, 43979);
    assert.equal(row.tokens.out, 243);
    assert.equal(row.tokens.cacheRead, 43000);
    assert.equal(row.tokens.reasoning, 100);
    assert.equal(row.tokens.cacheCreation, null);
    assert.equal(getDbInstance().prepare("SELECT count(*) AS n FROM call_logs").get().n, 0);
  });
}

test("concurrent requests keep separate usage and missing updates preserve recorded counters", async () => {
  const first = history.trackPendingRequest("model", "provider", "connection", true);
  const second = history.trackPendingRequest("model", "provider", "connection", true);
  await saveCallLog({
    id: first,
    tokens: {
      input_tokens: 20,
      output_tokens: 0,
      cache_read_input_tokens: 100,
      cache_creation_input_tokens: 30,
    },
  });
  await saveCallLog({ id: first });
  await saveCallLog({ id: second, tokens: { input: 900, output: 12 } });
  for (const id of [first, second])
    history.finalizePendingRequestById(id, {
      providerResponse: {},
      clientResponse: {},
      status: 200,
    });
  const rows = buildCallLogListRows({
    logs: [],
    connections: [],
    pendingDetails: [],
    completedDetails: history.getCompletedDetails().values(),
  });
  assert.equal(rows.find((r) => r.id === first).tokens.in, 150);
  assert.equal(rows.find((r) => r.id === first).tokens.out, 0);
  assert.equal(rows.find((r) => r.id === first).tokens.cacheCreation, 30);
  assert.equal(rows.find((r) => r.id === second).tokens.in, 900);
  assert.equal(rows.find((r) => r.id === second).tokens.out, 12);
});

test("chat attempt logging connects its trace id to the live pending request id", () => {
  const id = history.trackPendingRequest("model", "provider", "connection", true);
  persistAttemptLogs(
    { status: 200, tokens: { input: 1234, output: 56 } },
    {
      traceId: "separate-attempt-trace",
      pendingRequestId: id,
      provider: "provider",
      model: "model",
      connectionId: "connection",
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
  history.finalizePendingRequestById(id, { providerResponse: {}, clientResponse: {} });
  assert.equal(history.getCompletedDetails().get(id)?.tokens?.in, 1234);
  assert.equal(history.getCompletedDetails().get(id)?.tokens?.out, 56);
});

test("late artifact enrichment does not erase usage recorded after finalization", async () => {
  const { writeCallArtifact } = await import("../../src/lib/usage/callLogArtifacts.ts");
  const id = history.trackPendingRequest("enrichment-model", "provider", "connection", true);
  const timestamp = new Date().toISOString();
  const artifactPath = `usage-enrichment/${id}.json`;
  writeCallArtifact(
    {
      schemaVersion: 5,
      summary: { id, timestamp, model: "enrichment-model" },
      responseBody: { restored: true },
    } as never,
    artifactPath
  );
  getDbInstance()
    .prepare(
      "INSERT INTO call_logs (id, timestamp, model, connection_id, artifact_relpath, detail_state) VALUES (?, ?, ?, ?, ?, 'ready')"
    )
    .run(`artifact-${id}`, timestamp, "enrichment-model", "connection", artifactPath);

  // Finalization starts asynchronous artifact recovery with a pre-usage snapshot.
  history.finalizePendingRequestById(id, { status: 200 });
  await saveCallLog({ id, tokens: { input: 4321, output: 65 } });
  const deadline = Date.now() + 5000;
  while (!history.getCompletedDetails().get(id)?.providerResponse && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  const detail = history.getCompletedDetails().get(id);
  assert.deepEqual(detail?.providerResponse, { restored: true });
  assert.equal(detail?.tokens?.in, 4321);
  assert.equal(detail?.tokens?.out, 65);
});

for (const finalizeFirst of [false, true]) {
  test(`mixed evidence survives live reader without persistence (finalize first: ${finalizeFirst})`, async () => {
    const usageEvidence = {
      input: { source: "reported" as const },
      output: { source: "estimated" as const, method: "characters" },
      cacheRead: { source: "unknown" as const },
      cacheCreation: { source: "reported" as const },
    };
    const id = history.trackPendingRequest("fixture", "synthetic", "fixture", true);
    const finish = () =>
      history.finalizePendingRequestById(id, {
        status: 200,
        providerResponse: {},
        clientResponse: {},
      });
    if (finalizeFirst) finish();
    await saveCallLog({
      id,
      tokens: {
        prompt_tokens: 12,
        completion_tokens: 3,
        cache_creation_input_tokens: 0,
        usage_evidence: usageEvidence,
      },
    });
    const pendingRows = buildCallLogListRows({
      logs: [],
      connections: [],
      pendingDetails: [...history.getPendingById().values()],
      completedDetails: history.getCompletedDetails().values(),
    });
    assert.deepEqual(pendingRows.find((row) => row.id === id)?.usageEvidence, usageEvidence);
    if (!finalizeFirst) finish();
    const rows = buildCallLogListRows({
      logs: [],
      connections: [],
      pendingDetails: [],
      completedDetails: history.getCompletedDetails().values(),
    });
    const row = rows.find((row) => row.id === id);
    assert.deepEqual(row?.usageEvidence, usageEvidence);
    assert.equal(row?.estimated, true);
    assert.equal(row?.costEstimated, true);
    assert.equal(row?.tokens.cacheRead, null);
    assert.equal(row?.tokens.cacheCreation, 0);
    assert.equal(
      getDbInstance().prepare("SELECT count(*) AS n FROM call_logs WHERE id = ?").get(id).n,
      0
    );
  });
}

test("entry-level estimated marker survives the live reader", async () => {
  const id = history.trackPendingRequest("fixture", "synthetic", "fixture", true);
  await saveCallLog({ id, usageEstimated: true, tokens: { input: 12, output: 3 } });
  const rows = buildCallLogListRows({
    logs: [],
    connections: [],
    pendingDetails: [...history.getPendingById().values()],
    completedDetails: [],
  });
  assert.equal(rows.find((row) => row.id === id)?.estimated, true);
});
