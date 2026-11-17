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

// A reused pid can belong to an unrelated program that merely mentions OmniRoute in an argument
// (a log path, a positional value). Only the executable, the script a JS runtime runs, or the
// process title prove identity.
test("classifyPidIdentity: an OmniRoute mention in an unrelated argument is foreign", () => {
  const foreign = [
    "node /srv/other/server.js --log=/tmp/omniroute.log",
    "node /srv/other/server.js /data/omniroute/config.json",
    "node --require /srv/omniroute-hook.js /srv/other/server.js",
    "node -e setTimeout(()=>{},1) /fixture/omniroute/server.js",
    "/usr/bin/python3 -m http.server --directory /home/me/omniroute",
    "/usr/bin/tail -f /home/me/.omniroute/logs/app.log",
  ];
  for (const cmdline of foreign) {
    assert.equal(classifyPidIdentity(1, linux(cmdline)), "foreign", cmdline);
  }
  // Space-joined command lines (macOS ps, Windows CommandLine) follow the same rule.
  const darwin = (stdout: string) => ({ platform: "darwin", execFileSync: () => `${stdout}\n` });
  assert.equal(
    classifyPidIdentity(1, darwin("node /srv/other/server.js --log=/tmp/omniroute.log")),
    "foreign"
  );
  const win32 = (stdout: string) => ({ platform: "win32", execFileSync: () => `${stdout}\r\n` });
  assert.equal(
    classifyPidIdentity(
      1,
      win32('"C:\\Program Files\\nodejs\\node.exe" C:\\srv\\server.js --log=C:\\omniroute\\x.log')
    ),
    "foreign"
  );
});

test("classifyPidIdentity: the executable, the runtime's script or the process title prove identity", () => {
  const ours = [
    "node --max-old-space-size=512 --dns-result-order=ipv4first /opt/omniroute/app/server.js",
    "bun --preload /opt/omniroute/bin/polyfill.mjs /opt/omniroute/app/server.js",
    "node --import tsx/esm /home/me/omniroute-main/bin/omniroute.mjs serve",
    "/home/me/.nvm/versions/node/v22.1.0/bin/node /usr/local/bin/omniroute serve",
    "/home/me/.omniroute/tunnel/bin/cloudflared tunnel run",
    "omniroute (v16.2.9)",
  ];
  for (const cmdline of ours) {
    assert.equal(classifyPidIdentity(1, linux(cmdline)), "ours", cmdline);
  }
  const darwin = (stdout: string) => ({ platform: "darwin", execFileSync: () => `${stdout}\n` });
  assert.equal(
    classifyPidIdentity(1, darwin("/Users/me/Application Support/node /Users/me/omniroute/a.js")),
    "ours",
    "unquoted executable path with a space"
  );
  const win32 = (stdout: string) => ({ platform: "win32", execFileSync: () => `${stdout}\r\n` });
  assert.equal(
    classifyPidIdentity(
      1,
      win32('"C:\\Program Files\\nodejs\\node.exe" "C:\\Users\\Jo Do\\omniroute\\dist\\server.js"')
    ),
    "ours",
    "quoted paths with spaces"
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

const KEEP_ALIVE = "console.log('up');setTimeout(()=>{},60000)";

// An OmniRoute child is proven by its entrypoint, so it runs a script file whose path names
// OmniRoute; a stranger runs inline code.
const fixtureDirs: string[] = [];
test.after(() => {
  for (const dir of fixtureDirs) fs.rmSync(dir, { recursive: true, force: true });
});

function omnirouteEntrypoint() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fixture-"));
  fixtureDirs.push(dir);
  fs.mkdirSync(path.join(dir, "omniroute"));
  const file = path.join(dir, "omniroute", "server.js");
  fs.writeFileSync(file, KEEP_ALIVE);
  return file;
}

async function startChild(kind: "stranger" | "omniroute" = "stranger") {
  const args = kind === "omniroute" ? [omnirouteEntrypoint()] : ["-e", KEEP_ALIVE];
  const child = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "ignore"] });
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
    const ours = await startChild("omniroute");
    try {
      writePidFile("server", ours.pid);
      killAllSubprocesses();
      // Bounded wait: the child exits on its own after 60s, which must not pass for a signal.
      const exited = await Promise.race([
        new Promise((resolve) => ours.once("exit", () => resolve(true))),
        new Promise((resolve) => setTimeout(() => resolve(false), 5000)),
      ]);
      assert.equal(exited, true, "the OmniRoute process must be signalled, not outlived");
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
