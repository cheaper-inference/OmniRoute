// A call-log artifact file carries an 8-hex FNV-1a checksum (stored in call_logs.artifact_sha256)
// that was written but never checked on read. A flipped byte on disk that still parses as JSON
// (disk rot, a partial restore) was served as a "ready" detail. The resolver now recomputes the
// checksum and treats a mismatch as unreadable: detailState "corrupt", no payload.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-artifact-checksum-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";
process.env.CALL_LOG_MAX_ENTRIES = "100";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifacts = await import("../../src/lib/usage/callLogArtifacts.ts");
const resolver = await import("../../src/lib/usage/callLogDetailResolver.ts");

const LOGS_DIR = path.join(TEST_DATA_DIR, "call_logs");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function saveLog(id: string) {
  await callLogs.saveCallLog({
    id,
    timestamp: "2026-03-30T12:34:56.789Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 42,
    requestBody: { messages: [{ role: "user", content: "hello world" }] },
    responseBody: { id: "resp_1", choices: [{ message: { content: "the answer is 42" } }] },
    pipelinePayloads: { clientResponse: { body: { final: true } } },
  });
  const detail = await callLogs.getCallLogById(id);
  assert.equal(detail?.detailState, "ready", "fixture: the artifact is written and readable");
  assert.match(detail?.artifactSha256 || "", /^[0-9a-f]{8}$/, "fixture: the checksum is stored");
  return detail!;
}

/** Flip one byte of the artifact so it still parses as JSON ("42" -> "43"). */
function flipOneByte(relPath: string) {
  const file = path.join(LOGS_DIR, relPath);
  const bytes = fs.readFileSync(file);
  const at = bytes.indexOf(Buffer.from("42"), bytes.indexOf(Buffer.from("the answer is")));
  assert.ok(at > 0, "fixture: the marker is in the file");
  bytes[at + 1] = "3".charCodeAt(0);
  fs.writeFileSync(file, bytes);
  JSON.parse(bytes.toString("utf8")); // still valid JSON: only the checksum can catch it
}

test("an artifact whose bytes changed on disk resolves as corrupt, not ready", async () => {
  const detail = await saveLog("chk_flip");
  flipOneByte(detail.artifactRelPath!);

  const after = await callLogs.getCallLogById("chk_flip");
  assert.equal(after?.detailState, "corrupt");
  assert.equal(after?.requestBody, null, "a corrupt file must not serve its payload");
  assert.equal(after?.responseBody, null);
  const row = core
    .getDbInstance()
    .prepare("SELECT detail_state FROM call_logs WHERE id = ?")
    .get("chk_flip") as { detail_state: string };
  assert.equal(row.detail_state, "corrupt", "the dashboard path records the state");
});

test("an untouched artifact still resolves as ready and serves its payload", async () => {
  await saveLog("chk_ok");
  const detail = await callLogs.getCallLogById("chk_ok");
  assert.equal(detail?.detailState, "ready");
  assert.equal(
    (detail?.responseBody as { choices: Array<{ message: { content: string } }> }).choices[0]
      .message.content,
    "the answer is 42"
  );
});

test("the export resolver (no dashboard callback) also refuses a changed artifact", async () => {
  const detail = await saveLog("chk_export");
  flipOneByte(detail.artifactRelPath!);
  const states: string[] = [];
  const resolved = await resolver.resolveCallLogDetail(
    core.getDbInstance(),
    {
      id: "chk_export",
      timestamp: detail.timestamp,
      model: detail.model,
      status: detail.status,
      detailState: "ready",
      artifactRelPath: detail.artifactRelPath,
      artifactSha256: detail.artifactSha256,
      error: null,
      hasPipelineDetails: true,
    },
    LOGS_DIR,
    { onArtifactState: (_rel, state) => states.push(state) }
  );
  assert.equal(resolved.detailState, "corrupt");
  assert.equal(resolved.requestBody, null);
  assert.deepEqual(states, ["corrupt"]);
});

test("a row with no stored checksum is trusted: old rows stay readable", async () => {
  const detail = await saveLog("chk_legacy");
  core
    .getDbInstance()
    .prepare("UPDATE call_logs SET artifact_sha256 = NULL WHERE id = ?")
    .run("chk_legacy");
  flipOneByte(detail.artifactRelPath!);
  const after = await callLogs.getCallLogById("chk_legacy");
  assert.equal(after?.detailState, "ready", "nothing to verify against: keep the old behaviour");
});

test("verifyArtifactChecksum matches the checksum the writer stored", () => {
  const written = artifacts.writeCallArtifact({
    schemaVersion: 5,
    summary: {
      id: "chk_unit",
      timestamp: "2026-03-30T12:34:56.789Z",
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "m",
      provider: "p",
      account: "-",
      duration: 1,
      tokens: { in: 0, out: 0 },
    },
    requestBody: { a: 1 },
    responseBody: null,
    error: null,
  } as never);
  assert.ok(written);
  const text = fs.readFileSync(path.join(LOGS_DIR, written.relPath), "utf8");
  assert.equal(artifacts.verifyArtifactChecksum(text, written.sha256), true);
  assert.equal(artifacts.verifyArtifactChecksum(text + " ", written.sha256), false);
  assert.equal(artifacts.verifyArtifactChecksum(text, "00000000"), false);
  assert.equal(
    artifacts.verifyArtifactChecksum(text, null),
    true,
    "no stored checksum: unverifiable"
  );
  assert.equal(artifacts.verifyArtifactChecksum(text, written.sha256.toUpperCase()), true);
});
