// A compression pool worker stays alive for idleMs (60 s by default) after its last job so the
// next job can reuse it. While idle it must not keep the process alive: a test file or script
// that compressed something used to linger those 60 s before exiting (#18045). A job in flight
// must still hold the process open until the worker replies.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));

test("an idle compression pool worker lets the process exit, a job in flight does not", () => {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const started = Date.now();
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx/esm", "tests/fixtures/compression-worker-pool-exit/pool-child.ts"],
    // Well under the 60 s idleMs: a child held open by its idle worker is killed and fails.
    { cwd: REPO_ROOT, env, encoding: "utf8", timeout: 25_000 }
  );
  const elapsedMs = Date.now() - started;
  assert.equal(result.signal, null, `child did not exit within ${elapsedMs} ms`);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.stdout.trim().split("\n"), ["first first", "second second"]);
});
