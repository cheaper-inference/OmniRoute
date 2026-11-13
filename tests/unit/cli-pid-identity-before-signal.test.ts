import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const BASE_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pid-identity-"));
process.env.DATA_DIR = BASE_DATA_DIR;

const { classifyPidIdentity, cleanupPidFile, killAllSubprocesses, readPidFile, writePidFile } =
  await import("../../bin/cli/utils/pid.mjs");
const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");

// A pid file left behind by a crash or reboot can name a pid that now belongs
// to an unrelated same-user process. `omniroute stop` must prove the pid still
// runs OmniRoute (command line) before it signals it, and must never signal a
// pid whose command line it cannot read.

const SERVED = "node /opt/omniroute/dist/server.js";
const linux = (cmdline: string) => ({
  platform: "linux",
  readFileSync: () => cmdline.replaceAll(" ", "\0"),
});
const fsError = (code: string) => () => {
  throw Object.assign(new Error(code), { code });
};

test("classifyPidIdentity (linux): reads /proc cmdline", () => {
  assert.equal(classifyPidIdentity(1, linux(SERVED)), "ours");
  assert.equal(classifyPidIdentity(1, linux("node /usr/local/bin/omniroute serve")), "ours");
  assert.equal(
    classifyPidIdentity(1, linux("node /home/me/omniroute-main/dist/server.js")),
    "ours"
  );
  assert.equal(
    classifyPidIdentity(1, linux("omniroute (v16.2.9)")),
    "ours",
    "renamed process title"
  );
  assert.equal(classifyPidIdentity(1, linux("/usr/bin/python3 -c pass")), "foreign");
  assert.notEqual(classifyPidIdentity(1, linux("")), "ours", "empty command line is unproven");
  const noEntry = { platform: "linux", readFileSync: fsError("ENOENT") };
  assert.equal(classifyPidIdentity(1, { ...noEntry, existsSync: () => true }), "gone");
  assert.equal(
    classifyPidIdentity(1, { ...noEntry, existsSync: () => false }),
    "unknown",
    "no procfs: a live pid is not proven ours"
  );
  assert.equal(
    classifyPidIdentity(1, { platform: "linux", readFileSync: fsError("EACCES") }),
    "unknown"
  );
});

test("classifyPidIdentity (macOS): fixed-path ps, pid as one argv entry", () => {
  const calls: Array<[string, string[]]> = [];
  const deps = (stdout: string | Error) => ({
    platform: "darwin",
    execFileSync(command: string, args: string[]) {
      calls.push([command, args]);
      if (stdout instanceof Error) throw stdout;
      return stdout;
    },
  });
  assert.equal(classifyPidIdentity(321, deps(`${SERVED}\n`)), "ours");
  assert.deepEqual(calls[0], ["/bin/ps", ["-p", "321", "-o", "command="]]);
  assert.equal(classifyPidIdentity(321, deps("/usr/bin/python3 -c pass\n")), "foreign");
  assert.equal(
    classifyPidIdentity(321, deps(Object.assign(new Error("x"), { status: 1 }))),
    "unknown"
  );
  assert.equal(classifyPidIdentity(321, deps(new Error("ENOENT"))), "unknown");
});

test("classifyPidIdentity (windows): fixed-path PowerShell, pid passed by env", () => {
  let seen: { command: string; args: string[]; env: Record<string, string> } | null = null;
  const result = classifyPidIdentity(654, {
    platform: "win32",
    execFileSync(command: string, args: string[], options: { env: Record<string, string> }) {
      seen = { command, args, env: options.env };
      return "C:\\Program Files\\nodejs\\node.exe C:\\omniroute\\dist\\server.js\r\n";
    },
  });
  assert.equal(result, "ours");
  assert.ok(seen);
  assert.match(seen!.command, /powershell\.exe$/i);
  assert.equal(seen!.env.OMNIROUTE_PROBE_PID, "654");
  assert.ok(!seen!.args.join(" ").includes("654"), "pid must not be interpolated into the script");
});

// --- behaviour against real processes -------------------------------------

async function startChild(...extraArgs: string[]) {
  const child = spawn(
    process.execPath,
    ["-e", "console.log('up');setTimeout(()=>{},60000)", ...extraArgs],
    { stdio: ["ignore", "pipe", "ignore"] }
  );
  await new Promise((resolve) => child.stdout.once("data", resolve));
  return child;
}

function alive(pid: number) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function withDataDir(fn: () => Promise<void>) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pid-identity-"));
  process.env.DATA_DIR = dir;
  const log = console.log;
  console.log = () => {};
  try {
    await fn();
  } finally {
    console.log = log;
    process.env.DATA_DIR = BASE_DATA_DIR;
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("readPidFile hides a live pid that does not run OmniRoute", async () => {
  await withDataDir(async () => {
    const stranger = await startChild();
    try {
      writePidFile("server", stranger.pid);
      assert.equal(readPidFile("server"), null);
    } finally {
      stranger.kill("SIGKILL");
    }
  });
});

test("readPidFile keeps a dead pid so stale-file handling stays unchanged", async () => {
  await withDataDir(async () => {
    writePidFile("server", 2999999);
    assert.equal(readPidFile("server"), 2999999);
  });
});

test("killAllSubprocesses does not signal an unrelated process and still clears the pid file", async () => {
  await withDataDir(async () => {
    const stranger = await startChild();
    try {
      writePidFile("server", stranger.pid);
      killAllSubprocesses();
      await new Promise((resolve) => setTimeout(resolve, 200));
      assert.equal(alive(stranger.pid!), true, "unrelated process must survive");
      assert.equal(fs.existsSync(path.join(process.env.DATA_DIR!, "server", ".pid")), false);
    } finally {
      stranger.kill("SIGKILL");
    }
  });
});

test("killAllSubprocesses still stops a process whose command line names OmniRoute", async () => {
  await withDataDir(async () => {
    const ours = await startChild("/fixture/omniroute/server.js");
    try {
      writePidFile("server", ours.pid);
      killAllSubprocesses();
      await new Promise((resolve) => ours.once("exit", resolve));
      assert.equal(alive(ours.pid!), false);
    } finally {
      ours.kill("SIGKILL");
      cleanupPidFile("server");
    }
  });
});

test("omniroute stop leaves an unrelated process alone when the pid file is stale", async () => {
  await withDataDir(async () => {
    const stranger = await startChild();
    try {
      writePidFile("server", stranger.pid);
      writePidFile("supervisor", stranger.pid);
      const exitCode = await runStopCommand(
        { port: "20128" },
        {
          execFileAsync: async () => ({ stdout: "", stderr: "" }),
          processKill: () => true,
          sleep: async () => {},
        }
      );
      assert.equal(exitCode, 0);
      await new Promise((resolve) => setTimeout(resolve, 200));
      assert.equal(alive(stranger.pid!), true, "stop must not signal the unrelated pid");
    } finally {
      stranger.kill("SIGKILL");
    }
  });
});
