import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

test("Codex app-server lifecycle survives retries and settles disconnects (#16029)", () => {
  const scratch = mkdtempSync(join(tmpdir(), "codex-lifecycle-16029-"));
  // Node propagates V8 coverage to the child. Load the same repository source
  // layout during the instrumented CI run while keeping the child env isolated.
  const coveragePreload =
    process.env.NODE_V8_COVERAGE && process.env.OMNIROUTE_CI_SYNC_TSX_CACHE
      ? ["--import", new URL("../../scripts/ci/native-worker-v8-layout.mjs", import.meta.url).href]
      : [];
  try {
    const result = spawnSync(
      process.execPath,
      [
        ...coveragePreload,
        "--import",
        "tsx/esm",
        "--import",
        "./tests/_setup/isolateDataDir.ts",
        "--test",
        "--test-force-exit",
        "tests/unit/_fixtures/codex-app-server-lifecycle-16029.fixture.ts",
      ],
      {
        cwd: fileURLToPath(new URL("../..", import.meta.url)),
        encoding: "utf8",
        timeout: 30_000,
        env: {
          PATH: process.env.PATH,
          NODE_ENV: "test",
          DATA_DIR: join(scratch, "data"),
          OMNIROUTE_PLUGINS_DIR: join(scratch, "plugins"),
          APP_LOG_TO_FILE: "false",
          DISABLE_SQLITE_AUTO_BACKUP: "true",
        },
      }
    );
    assert.ifError(result.error);
    assert.equal(result.signal, null);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
});
