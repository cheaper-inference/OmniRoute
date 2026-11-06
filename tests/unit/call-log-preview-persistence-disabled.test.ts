import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "call-log-preview-disabled-"));
process.env.DATA_DIR = dataDir;
process.env.NEXT_PHASE = "phase-production-build";
const core = await import("../../src/lib/db/core.ts");
const history = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { buildCallLogListRows } = await import("../../src/app/api/usage/call-logs/route.ts");

test.after(async () => {
  await callLogs.closeCallLogSaves();
  history.clearPendingRequests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("disabled disk persistence keeps its completed preview without a durable link", async () => {
  const id = history.trackPendingRequest("model", "openai", "account", true);
  assert.ok(id);
  const generation = history.getPendingById().get(id)?.attemptGeneration;
  history.finalizePendingRequestById(id, { status: 200, providerResponse: {}, clientResponse: {} });
  await callLogs.saveCallLog({
    pendingRequestId: id,
    pendingRequestGeneration: generation,
    status: 200,
    model: "model",
  });
  assert.equal(history.getCompletedDetails().get(id)?.persistedLogId, undefined);
  const rows = buildCallLogListRows({
    logs: [],
    connections: [],
    pendingDetails: history.getPendingById().values(),
    completedDetails: history.getCompletedDetails().values(),
  });
  assert.deepEqual(
    rows.map((row) => row.id),
    [id]
  );
  assert.equal(fs.existsSync(path.join(dataDir, "storage.sqlite")), false);
});
