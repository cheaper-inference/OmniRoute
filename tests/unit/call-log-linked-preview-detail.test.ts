import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "linked-preview-detail-"));
process.env.DATA_DIR = dataDir;
process.env.NODE_ENV = "test";
const core = await import("../../src/lib/db/core.ts");
const history = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifacts = await import("../../src/lib/usage/callLogArtifacts.ts");
const writer = await import("../../src/lib/usage/callLogArtifactWriter.ts");
const { GET } = await import("../../src/app/api/logs/[id]/route.ts");
const { buildCallLogListRows } = await import("../../src/app/api/usage/call-logs/route.ts");

const releaseFile = path.join(dataDir, "release-artifact");
const workerFile = path.join(dataDir, "held-artifact-worker.mjs");
fs.writeFileSync(
  workerFile,
  `
  import { parentPort } from "node:worker_threads";
  import fs from "node:fs";
  parentPort.on("message", ({ id }) => {
    const timer = setInterval(() => {
      if (!fs.existsSync(${JSON.stringify(releaseFile)})) return;
      clearInterval(timer);
      parentPort.postMessage({ id, result: null });
    }, 10);
  });
`
);
writer.__setCallLogWorkerOverrideForTests({ workerFile, execArgv: [] });

test.before(async () => {
  await core.ensureDbInitialized();
});
test.beforeEach(() => {
  history.clearPendingRequests();
  core.getDbInstance().prepare("DELETE FROM call_logs").run();
  fs.rmSync(releaseFile, { force: true });
  fs.rmSync(path.join(dataDir, "call_logs"), { recursive: true, force: true });
});
test.after(async () => {
  await callLogs.closeCallLogSaves();
  writer.__setCallLogWorkerOverrideForTests(null);
  history.clearPendingRequests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const cachedResponse = { text: "cached answer" };
function start(correlationId = "detail-retry", response = cachedResponse) {
  const id = history.trackPendingRequest("model", "openai", "account", true, {
    correlationId,
    clientEndpoint: "/v1/responses",
    clientRequest: { input: "cached request" },
  });
  assert.ok(id);
  const generation = history.getPendingById().get(id)?.attemptGeneration;
  history.finalizePendingRequestById(id, {
    status: 200,
    providerResponse: response,
    clientResponse: response,
  });
  return { id, generation };
}
function save(attempt: ReturnType<typeof start>, extra: Record<string, unknown> = {}) {
  return callLogs.saveCallLog({
    pendingRequestId: attempt.id,
    pendingRequestGeneration: attempt.generation,
    status: 200,
    duration: 99,
    model: "model",
    provider: "openai",
    connectionId: "account",
    correlationId: "detail-retry",
    ...extra,
  });
}
async function detail(id: string) {
  // Trusted in-process invocation; HTTP management authentication is unchanged.
  const response = await GET(undefined as unknown as Request, { params: { id } });
  assert.equal(response.status, 200);
  return response.json();
}
async function onlyListedId() {
  const rows = buildCallLogListRows({
    logs: await callLogs.getCallLogs({}),
    connections: [],
    pendingDetails: history.getPendingById().values(),
    completedDetails: history.getCompletedDetails().values(),
  });
  assert.equal(rows.length, 1);
  return rows[0].id as string;
}
async function waitForLink(id: string) {
  const deadline = Date.now() + 5000;
  while (!history.getCompletedDetails().get(id)?.persistedLogId && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.ok(history.getCompletedDetails().get(id)?.persistedLogId);
}

test("the sole summary-only row still opens its completed cached pipeline", async () => {
  const attempt = start();
  await save(attempt, { noLog: true });
  const id = await onlyListedId();
  assert.notEqual(id, attempt.id);
  const result = await detail(id);
  assert.equal(result.id, id);
  assert.equal(result.duration, 99, "durable summary fields remain authoritative");
  assert.equal(result.detailState, "none");
  assert.deepEqual(result.pipelinePayloads?.clientResponse, cachedResponse);
  assert.equal(result.hasPipelineDetails, true);
  assert.deepEqual((await detail(attempt.id)).pipelinePayloads?.clientResponse, cachedResponse);
});

test("cached detail remains available while its artifact is queued and after write failure", async () => {
  const attempt = start();
  const saving = save(attempt, { responseBody: cachedResponse });
  try {
    await waitForLink(attempt.id);
    const id = await onlyListedId();
    const pending = await detail(id);
    assert.equal(pending.detailState, "pending");
    assert.deepEqual(pending.pipelinePayloads?.clientResponse, cachedResponse);
    fs.writeFileSync(releaseFile, "release");
    await saving;
    const missing = await detail(id);
    assert.equal(missing.detailState, "missing");
    assert.deepEqual(missing.pipelinePayloads?.clientResponse, cachedResponse);
    assert.equal(missing.id, id);
  } finally {
    fs.writeFileSync(releaseFile, "release");
    await saving;
  }
});

for (const hasPayload of [false, true]) {
  test(`durable pipeline precedence with readable payload: ${hasPayload}`, async () => {
    const attempt = start();
    await save(attempt, { noLog: true });
    const id = await onlyListedId();
    const durableResponse = { text: "durable answer" };
    const pipeline = hasPayload ? { clientResponse: durableResponse } : {};
    const artifact = artifacts.writeCallArtifact({
      schemaVersion: 5,
      summary: { id, timestamp: new Date().toISOString(), model: "model" },
      requestBody: null,
      responseBody: null,
      error: null,
      pipeline,
    } as never);
    assert.ok(artifact);
    core
      .getDbInstance()
      .prepare("UPDATE call_logs SET detail_state = 'ready', artifact_relpath = ? WHERE id = ?")
      .run(artifact.relPath, id);
    const result = await detail(id);
    assert.equal(result.detailState, "ready");
    assert.deepEqual(
      result.pipelinePayloads?.clientResponse,
      hasPayload ? durableResponse : cachedResponse
    );
  });
}

for (const savedRetry of [false, true]) {
  test(`an older durable ID cannot select another generation (retry saved: ${savedRetry})`, async () => {
    const first = start();
    await save(first, { id: first.id, noLog: true });
    const second = start();
    assert.equal(second.id, first.id);
    if (savedRetry) await save(second, { noLog: true });
    const result = await detail(first.id);
    assert.equal(result.pipelinePayloads, null);
    assert.equal(result.duration, 99);
  });
}

test("an exact link wins over a conflicting public-ID cache entry", async () => {
  const conflicting = start("other-request", { text: "other attempt" });
  const attempt = start();
  await save(attempt, { id: conflicting.id, noLog: true });
  const result = await detail(conflicting.id);
  assert.deepEqual(result.pipelinePayloads?.clientResponse, cachedResponse);
  assert.equal(result.id, conflicting.id);
});

test("deleting a durable row leaves public lookup intact without creating an alias", async () => {
  const attempt = start();
  await save(attempt, { noLog: true });
  const id = await onlyListedId();
  core.getDbInstance().prepare("DELETE FROM call_logs WHERE id = ?").run(id);
  const missing = await GET(undefined as unknown as Request, { params: { id } });
  assert.equal(missing.status, 404);
  const publicPreview = await detail(attempt.id);
  assert.equal(publicPreview.id, attempt.id);
  assert.deepEqual(publicPreview.pipelinePayloads?.clientResponse, cachedResponse);
});
