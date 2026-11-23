import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { createRequire, syncBuiltinESMExports } from "node:module";

// #20486: `claude --version` is a full Node CLI boot and takes ~5s warm on
// Windows. The old 4s healthcheck timeout reported a working install as
// healthcheck_failed. Keep a regression test that a probe answering between
// the old and new limits is accepted.
const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const originalSpawn = childProcess.spawn;
const originalClaudeBin = process.env.CLI_CLAUDE_BIN;
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20486-claude-"));

test.after(() => {
  childProcess.spawn = originalSpawn;
  syncBuiltinESMExports();
  if (originalClaudeBin === undefined) delete process.env.CLI_CLAUDE_BIN;
  else process.env.CLI_CLAUDE_BIN = originalClaudeBin;
  fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#20486: claude healthcheck accepts a version probe slower than the old 4s timeout", async () => {
  const fakeClaude = path.join(tempDir, process.platform === "win32" ? "claude.cmd" : "claude");
  fs.writeFileSync(fakeClaude, "@echo off\r\necho claude 2.1.157\r\n");
  if (process.platform !== "win32") fs.chmodSync(fakeClaude, 0o755);
  process.env.CLI_CLAUDE_BIN = fakeClaude;
  delete process.env.CLI_MODE;

  // A version answer after 5.1s: past the previous 4s default, inside the
  // 15s limit introduced by this PR.
  childProcess.spawn = () => {
    const child = new EventEmitter() as EventEmitter & {
      stdout: EventEmitter;
      stderr: EventEmitter;
      kill: () => boolean;
    };
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.kill = () => true;
    setTimeout(() => {
      child.stdout.emit("data", "2.1.157 (Claude Code)\n");
      child.emit("close", 0);
    }, 5100);
    return child;
  };
  syncBuiltinESMExports();

  const { getCliRuntimeStatus } = await import("../../src/shared/services/cliRuntime.ts");
  const status = await getCliRuntimeStatus("claude");

  assert.equal(status.installed, true);
  assert.equal(status.commandPath, fakeClaude);
  assert.equal(status.reason, null, `expected a successful healthcheck, got ${status.reason}`);
  assert.equal(status.runnable, true);
});
