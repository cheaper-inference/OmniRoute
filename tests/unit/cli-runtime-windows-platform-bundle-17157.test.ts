/**
 * #17157: Linux-built Turbopack bundles must not erase Windows CLI discovery.
 *
 * Keep process.platform as Linux while simulating the runtime platform through
 * node:os. This deliberately fails if isWindows() consults process.platform
 * (which the server bundler may have folded to "linux" at build time).
 */
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { createRequire, syncBuiltinESMExports } from "node:module";
import os from "node:os";
import test from "node:test";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process") as typeof import("node:child_process");

test(
  "#17157 CLI detection keeps Windows known paths and where.exe reachable on Linux",
  { skip: process.platform !== "linux" },
  async () => {
    const cliRuntime = await import("../../src/shared/services/cliRuntime.ts");
    const originalPlatform = os.platform;
    const originalSpawn = childProcess.spawn;
    const observed: Array<{ command: string; args: string[] }> = [];

    try {
      childProcess.spawn = ((command, args) => {
        const name = String(command);
        observed.push({ command: name, args: [...(args ?? [])] });
        const stdout = new EventEmitter();
        const child = Object.assign(new EventEmitter(), {
          stdout,
          stderr: new EventEmitter(),
          kill: () => true,
        });
        queueMicrotask(() => {
          const output =
            name === "where.exe"
              ? "C:\\tools\\claude\r\n/c/Users/tester/AppData/Roaming/npm/claude.cmd"
              : "/usr/local/bin/claude";
          stdout.emit("data", output);
          child.emit("close", 0);
        });
        return child as unknown as ReturnType<typeof childProcess.spawn>;
      }) as typeof childProcess.spawn;
      syncBuiltinESMExports();

      // The build host remains Linux; only the runtime platform function changes.
      assert.equal(process.platform, "linux");
      os.platform = () => "win32";
      const windowsPaths = cliRuntime.getKnownToolPaths("claude");
      assert.ok(
        windowsPaths.some((p) => p.endsWith("/.local/bin/claude.exe")),
        "native Claude Windows installation must remain in the compiled path list"
      );
      const windowsResult = await cliRuntime.locateCommand("claude", {});
      assert.equal(windowsResult.installed, true);
      assert.equal(
        windowsResult.commandPath,
        String.raw`C:\Users\tester\AppData\Roaming\npm\claude.cmd`
      );
      assert.deepEqual(observed[0], { command: "where.exe", args: ["claude"] });

      // Exercise the public status API, not just the lower-level locator.
      // Force the same PATH lookup irrespective of CLIs on the CI runner.
      const previousClaudeOverride = process.env.CLI_CLAUDE_BIN;
      process.env.CLI_CLAUDE_BIN = "claude";
      try {
        const status = await cliRuntime.getCliRuntimeStatus("claude");
        assert.equal(status.installed, true, "Windows Claude CLI should be discovered");
        assert.equal(status.runnable, true, "a successful --version probe must be runnable");
        assert.equal(status.reason, null, "do not fall into settings_found_binary_unresolved");
        assert.match(status.commandPath || "", /claude\.cmd$/i);
        assert.ok(
          observed.some(
            (call) => /claude\.cmd$/i.test(call.command) && call.args[0] === "--version"
          ),
          "the resolved Windows shim must receive a version healthcheck"
        );
      } finally {
        if (previousClaudeOverride === undefined) delete process.env.CLI_CLAUDE_BIN;
        else process.env.CLI_CLAUDE_BIN = previousClaudeOverride;
      }

      // The original Linux lookup still uses the POSIX command probe.
      os.platform = originalPlatform;
      const posixResult = await cliRuntime.locateCommand("claude", {});
      assert.equal(posixResult.installed, true);
      assert.equal(posixResult.commandPath, "claude");
      assert.deepEqual(observed.at(-1), {
        command: "sh",
        args: ["-c", 'command -v -- "$1"', "sh", "claude"],
      });
      assert.equal(process.platform, "linux");
    } finally {
      os.platform = originalPlatform;
      childProcess.spawn = originalSpawn;
      syncBuiltinESMExports();
    }
  }
);
