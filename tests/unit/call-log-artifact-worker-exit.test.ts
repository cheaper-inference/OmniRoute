// The call-log artifact worker stays alive for 30 s (IDLE_TIMEOUT_MS) after its last write so the
// next write can reuse it. While idle it must not keep the process alive: a CLI or a test file
// that wrote a call log used to linger those 30 s before exiting (#18045). A write in flight
// must still hold the process open until the worker replies.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

test("an idle call-log worker lets the process exit, a write in flight does not", () => {
  const dataDir = mkdtempSync(path.join(tmpdir(), "omniroute-call-log-worker-exit-"));
  try {
    const env: NodeJS.ProcessEnv = { ...process.env, DATA_DIR: dataDir };
    delete env.NODE_TEST_CONTEXT;
    const started = Date.now();
    const result = spawnSync(
      process.execPath,
      ["--import", "tsx/esm", "tests/fixtures/call-log-worker-exit/writer-child.ts"],
      // Well under IDLE_TIMEOUT_MS: a child held open by its idle worker is killed and fails.
      { cwd: REPO_ROOT, env, encoding: "utf8", timeout: 25_000 }
    );
    const elapsedMs = Date.now() - started;
    assert.equal(result.signal, null, `child did not exit within ${elapsedMs} ms`);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.stdout.trim().split("\n"), ["first reply-1", "second reply-2"]);
  } finally {
    rmSync(dataDir, { recursive: true, force: true });
  }
});
