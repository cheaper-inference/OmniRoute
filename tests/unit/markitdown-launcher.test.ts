import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPTS = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/integrations"
);
const LAUNCHER = path.join(SCRIPTS, "launch-markitdown-mcp.mjs");

function runLauncher(args: string[]) {
  return spawnSync(process.execPath, [LAUNCHER, ...args], { encoding: "utf8", timeout: 20_000 });
}

test("--python is an executable path, never a shell script (Hard Rule 13)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "markitdown-launcher-"));
  const marker = path.join(dir, "injected");
  try {
    const result = runLauncher(["--python", `touch ${marker}; true`]);

    assert.equal(fs.existsSync(marker), false, "the --python value ran through a shell");
    assert.equal(result.status, 1);
    assert.match(result.stderr, /markitdown-mcp is not installed/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the server receives the transport flags as separate arguments", (t) => {
  if (process.platform === "win32") return t.skip("uses a POSIX fake interpreter");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "markitdown-launcher-"));
  const log = path.join(dir, "argv.log");
  const python = path.join(dir, "fake python");
  fs.writeFileSync(python, `#!/bin/sh\nprintf '%s|' "$@" >> '${log}'\nprintf '\\n' >> '${log}'\n`, {
    mode: 0o755,
  });
  try {
    const result = runLauncher(["--python", python, "--http", "--port", "4123"]);

    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.deepEqual(fs.readFileSync(log, "utf8").trim().split("\n"), [
      "-m|markitdown_mcp|--help|",
      "-m|markitdown_mcp|--http|--host|127.0.0.1|--port|4123|",
    ]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Writes a fake interpreter that behaves like the server: frames on stdout, none for --help.
function fakeServer(dir: string) {
  const python = path.join(dir, "python");
  fs.writeFileSync(python, `#!/bin/sh\ncase "$*" in *--help*) ;; *) echo FRAME ;; esac\n`, {
    mode: 0o755,
  });
  return python;
}

for (const [name, command, script] of [
  ["node", process.execPath, LAUNCHER],
  ["bash", "bash", path.join(SCRIPTS, "launch-markitdown-mcp.sh")],
] as const) {
  test(`${name} launcher keeps stdout for MCP frames in STDIO mode`, (t) => {
    if (process.platform === "win32") return t.skip("uses a POSIX fake interpreter");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "markitdown-launcher-"));
    try {
      const result = spawnSync(command, [script, "--python", fakeServer(dir)], {
        encoding: "utf8",
        timeout: 20_000,
      });

      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.equal(result.stdout, "FRAME\n");
      assert.match(result.stderr, /STDIO transport/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}
