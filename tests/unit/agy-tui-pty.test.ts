// The pseudo-terminal shim: how agy is started, and what its environment may not
// inherit. Nothing here spawns agy; the command line and the env are the contract.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";

import { childEnv, ptyCommand } from "../../open-sse/services/agyTuiPty.ts";
import { AgyTuiUnsupportedError, AgyTuiTerminal } from "../../open-sse/services/agyTuiPty.ts";
import { HOOK_ENV } from "../../open-sse/services/agyTuiHooks.ts";

describe("agyTuiPty — the command", () => {
  it("runs agy under `script` so the child sees a pty", () => {
    const spec = ptyCommand("/usr/local/bin/agy", ["--settings", "{}"], "linux");
    assert.ok(spec);
    assert.equal(spec.file, "script");
    assert.equal(spec.args[0], "-qfc");
    assert.equal(spec.args[1], "'/usr/local/bin/agy' '--settings' '{}'");
    assert.equal(spec.args[2], "/dev/null");
  });

  it("quotes an argument that would otherwise be shell syntax", () => {
    const spec = ptyCommand("/usr/bin/agy", ["--settings", '{"a":"it\'s"}'], "linux");
    assert.ok(spec);
    // The single quote inside the JSON must survive as a quote, not close the arg.
    assert.match(spec.args[1], /'\\''/);
  });

  it("uses the BSD `script` form on macOS, which has no -c and takes the command as argv", () => {
    const spec = ptyCommand("/usr/bin/agy", ["--settings", '{"a":"it\'s"}'], "darwin");
    assert.deepEqual(spec, {
      file: "script",
      args: ["-q", "/dev/null", "/usr/bin/agy", "--settings", '{"a":"it\'s"}'],
    });
  });

  it("has no command on Windows", () => {
    assert.equal(ptyCommand("C:\\agy.exe", [], "win32"), null);
  });

  it("refuses to construct a terminal where there is no pty", () => {
    // The platform is pinned: CI runs on Linux, where `script` exists and the
    // real platform would never take the refusal branch this test is about.
    assert.throws(
      () =>
        new AgyTuiTerminal({
          executable: "C:\\agy.exe",
          args: [],
          platform: "win32",
        }),
      (error: unknown) =>
        error instanceof AgyTuiUnsupportedError && /pseudo-terminal/.test(error.message)
    );
  });
});

describe("agyTuiPty — a child that fails", () => {
  // An empty folder as the child's PATH: even if the missing cwd below ever
  // existed, the host's `script` (and so its agy) could not be started.
  const emptyPath = fs.mkdtempSync(path.join(os.tmpdir(), "agy-tui-pty-test-"));
  after(() => fs.rmSync(emptyPath, { recursive: true, force: true }));

  it("records a spawn failure as the child having gone, instead of throwing it", async () => {
    // A missing cwd makes the spawn fail asynchronously with an "error" event;
    // unheard, that event would be thrown and take the whole process down.
    const terminal = new AgyTuiTerminal({
      executable: "/nonexistent/agy",
      args: [],
      cwd: "/nonexistent-omniroute-agy-tui-cwd",
      env: { PATH: emptyPath },
      platform: "linux",
    });
    const deadline = Date.now() + 5_000;
    while (!terminal.failure && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.match(String(terminal.failure?.message), /ENOENT/);
    assert.equal(terminal.exited, true);
    terminal.send("\r"); // a write after the failure is dropped, not thrown
    terminal.close();
  });
});

describe("agyTuiPty — the child environment", () => {
  it("never passes on an inherited hook directory", () => {
    const previous = process.env[HOOK_ENV];
    process.env[HOOK_ENV] = "/tmp/somebody-elses-hooks";
    try {
      // An inherited value would make the operator's own agy write our files.
      assert.equal(childEnv()[HOOK_ENV], undefined);
      assert.equal(childEnv({ [HOOK_ENV]: "/tmp/ours" })[HOOK_ENV], "/tmp/ours");
    } finally {
      if (previous === undefined) delete process.env[HOOK_ENV];
      else process.env[HOOK_ENV] = previous;
    }
  });

  it("names the terminal agy is drawn on", () => {
    assert.equal(childEnv().TERM, "xterm-256color");
  });

  it("keeps the caller's environment", () => {
    const marker = process.platform === "win32" ? "Path" : "PATH";
    const env = childEnv({ HOME: "/home/account" });
    assert.equal(env.HOME, "/home/account");
    assert.equal(env[marker], process.env[marker]);
  });

  it("ignores an override the caller left undefined", () => {
    const marker = process.platform === "win32" ? "USERPROFILE" : "HOME";
    const previous = process.env[marker];
    assert.equal(childEnv({ [marker]: undefined })[marker], previous);
  });
});
