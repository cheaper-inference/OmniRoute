import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A source checkout runs the call-log artifact worker through tsx (`--import tsx/esm`). tsx lists
// its whole disk cache (os.tmpdir()/tsx-<uid>) the first time a thread transforms a file; on the
// shared devbox that cache held 585k entries and the worker's first reply took 5.3-7.5 s against
// 0.4 s with TSX_DISABLE_CACHE=1. The probe worker below speaks the writer's protocol and reports
// the TSX_DISABLE_CACHE value it was started with in `relPath`.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-worker-tsx-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  writeCallArtifactAsync,
  closeCallLogArtifactWriter,
  callLogWorkerOptions,
  __setCallLogWorkerOverrideForTests,
} = await import("../../src/lib/usage/callLogArtifactWriter.ts");

const probeWorkerFile = path.join(TEST_DATA_DIR, "env-probe-worker.mjs");
fs.writeFileSync(
  probeWorkerFile,
  [
    'import { parentPort } from "node:worker_threads";',
    'parentPort.on("message", ({ id }) => {',
    '  const relPath = process.env.TSX_DISABLE_CACHE ?? "unset";',
    '  parentPort.postMessage({ id, result: { relPath, sizeBytes: 0, sha256: "" } });',
    "});",
    "",
  ].join("\n")
);

test.after(async () => {
  __setCallLogWorkerOverrideForTests(null);
  await closeCallLogArtifactWriter(0);
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a worker started through tsx skips tsx's disk cache", async () => {
  __setCallLogWorkerOverrideForTests({
    workerFile: probeWorkerFile,
    execArgv: ["--import", "tsx/esm"],
  });
  const result = await writeCallArtifactAsync({
    schemaVersion: 5,
    summary: {
      id: "tsx-cache-probe",
      timestamp: "2026-10-19T00:00:00.000Z",
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "test-model",
      requestedModel: null,
      provider: "test-provider",
      account: "test-account",
      connectionId: null,
      duration: 1,
      tokens: {
        in: 1,
        out: 1,
        cacheRead: null,
        cacheWrite: null,
        reasoning: null,
        compressed: null,
      },
      requestType: "chat",
      sourceFormat: "openai",
      targetFormat: "openai",
      apiKeyId: null,
      apiKeyName: null,
      comboName: null,
      comboStepId: null,
      comboExecutionKey: null,
    },
    requestBody: {},
    responseBody: {},
    error: null,
  });
  assert.equal(result?.relPath, "1");
});

test("a compiled worker keeps the default worker environment", () => {
  assert.deepEqual(callLogWorkerOptions([]), { execArgv: [] });
});

test("a tsx worker gets the parent environment plus TSX_DISABLE_CACHE", () => {
  const options = callLogWorkerOptions(["--import", "tsx/esm"]);
  assert.deepEqual(options.execArgv, ["--import", "tsx/esm"]);
  assert.equal(options.env?.TSX_DISABLE_CACHE, "1");
  assert.equal(options.env?.DATA_DIR, process.env.DATA_DIR);
});
