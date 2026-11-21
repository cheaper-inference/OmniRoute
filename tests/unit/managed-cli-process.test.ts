import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { executeManagedCliCommand } from "../../src/lib/cliTools/managedCliProcess";
import { ManagedCliRuntimeError } from "../../src/lib/cliTools/managedCliError";

const options = {
  cwd: os.tmpdir(),
  env: { NODE_ENV: "test", PATH: process.env.PATH } as NodeJS.ProcessEnv,
  timeout: 5_000,
};

test("managed subprocess captures version stdout without mixing diagnostic stderr", async () => {
  const output = await executeManagedCliCommand(
    process.execPath,
    ["-e", 'process.stderr.write("diagnostic"); process.stdout.write("codex 1.2.3\\n")'],
    options
  );
  assert.equal(output, "codex 1.2.3\n");
});

test("managed subprocess failures do not expose raw command output", async () => {
  await assert.rejects(
    executeManagedCliCommand(
      process.execPath,
      ["-e", 'process.stderr.write("private-output-marker"); process.exit(1)'],
      options
    ),
    (error: unknown) => {
      assert.ok(error instanceof ManagedCliRuntimeError);
      assert.equal(error.code, "install_failed");
      assert.doesNotMatch(error.message, /private-output-marker/);
      return true;
    }
  );
});

test("managed subprocess bounds combined stdout and stderr", async () => {
  await assert.rejects(
    executeManagedCliCommand(
      process.execPath,
      ["-e", 'process.stderr.write("x".repeat(300_000)); setInterval(() => {}, 1_000)'],
      options
    ),
    (error: unknown) =>
      error instanceof ManagedCliRuntimeError && error.code === "install_output_limit"
  );
});

test(
  "managed subprocess timeout terminates its lifecycle descendant group",
  { skip: process.platform === "win32" },
  async (t) => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "managed-cli-process-"));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    const descendantPid = path.join(directory, "descendant.pid");
    const descendant = [
      'const fs = require("node:fs");',
      'process.on("SIGTERM", () => {});',
      `fs.writeFileSync(${JSON.stringify(descendantPid)}, String(process.pid));`,
      "setInterval(() => {}, 1_000);",
    ].join("\n");
    const parent = [
      'const { spawn } = require("node:child_process");',
      'process.on("SIGTERM", () => {});',
      `spawn(process.execPath, ["-e", ${JSON.stringify(descendant)}], { stdio: "inherit" });`,
      "setInterval(() => {}, 1_000);",
    ].join("\n");
    const started = Date.now();
    await assert.rejects(
      executeManagedCliCommand(process.execPath, ["-e", parent], { ...options, timeout: 1_200 }),
      (error: unknown) =>
        error instanceof ManagedCliRuntimeError && error.code === "install_timeout"
    );
    assert.ok(
      Date.now() - started < 5_000,
      "termination must complete within its bounded deadline"
    );
    const pid = Number(await fs.readFile(descendantPid, "utf8"));
    let running = true;
    try {
      process.kill(pid, 0);
      if (process.platform === "linux") {
        // A killed child can remain a zombie briefly until the host init process reaps it.
        const status = await fs.readFile(`/proc/${pid}/stat`, "utf8");
        running = !/\) Z /.test(status);
      }
    } catch (error) {
      if (["ESRCH", "ENOENT"].includes((error as NodeJS.ErrnoException).code ?? ""))
        running = false;
      else throw error;
    }
    assert.equal(running, false, "the npm lifecycle descendant must stop before update cleanup");
  }
);
