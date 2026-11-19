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

// macOS ps and Windows CommandLine lose argument boundaries. Re-joining unquoted tokens into one
// path is a guess: an argument after an extensionless script or executable must not be glued
// onto it to make an OmniRoute path. A re-join counts only when exactly one candidate path is a
// real file; anything else cannot be proven and fails closed.
test("classifyPidIdentity: an ambiguous re-join of unquoted tokens never proves OmniRoute", () => {
  const files =
    (...paths: string[]) =>
    (p: string) =>
      paths.includes(p);
  const darwin = (stdout: string, isFile = files()) => ({
    platform: "darwin",
    execFileSync: () => `${stdout}\n`,
    isFile,
  });
  const win32 = (stdout: string, isFile = files()) => ({
    platform: "win32",
    execFileSync: () => `${stdout}\r\n`,
    isFile,
  });
  const cases: Array<[string, ReturnType<typeof darwin>]> = [
    // Extensionless script followed by an OmniRoute-named argument.
    [
      "macOS, script exists",
      darwin("node /srv/other/server omniroute.js", files("/srv/other/server")),
    ],
    ["macOS, nothing exists", darwin("node /srv/other/server omniroute.js")],
    [
      "macOS, both candidates exist",
      darwin(
        "node /srv/other/server omniroute.js",
        files("/srv/other/server", "/srv/other/server omniroute.js")
      ),
    ],
    [
      "windows, script exists",
      win32(
        '"C:\\Program Files\\nodejs\\node.exe" C:\\srv\\other\\server omniroute.js',
        files("C:\\srv\\other\\server")
      ),
    ],
    ["windows, nothing exists", win32("C:\\nodejs\\node.exe C:\\srv\\other\\server omniroute.js")],
    // Extensionless executable followed by an argument that ends like a runtime or an .exe.
    [
      "macOS executable",
      darwin("/srv/other/tool omniroute/node /x/y.js", files("/srv/other/tool")),
    ],
    [
      "windows executable",
      win32("C:\\tools\\foo omniroute\\x.exe --flag", files("C:\\tools\\foo")),
    ],
    ["windows executable, nothing exists", win32("C:\\tools\\foo omniroute\\x.exe --flag")],
  ];
  for (const [name, deps] of cases) {
    assert.equal(classifyPidIdentity(1, deps), "unknown", name);
  }
});

// The same guess hides in runtime options: Node accepts `--option value` for string options, so
// after a bare option the runtime does not know as a flag, the next token may be its value
// rather than the script. Even with an exact argv that cannot be proven either way.
test("classifyPidIdentity: a token after an unrecognised bare runtime option is not the script", () => {
  // No prefix makes an option valueless: --trace-*, --experimental-*, --no-* and --inspect-*
  // all have members that take a separate value. Only an exact allowlist is trusted.
  for (const cmdline of [
    "node --watch-path /home/me/omniroute /srv/other/server.js",
    "node --report-dir /var/omniroute /srv/other/server.js",
    "node --trace-event-file-pattern /tmp/omniroute /srv/other/server.js",
    "node --trace-event-categories omniroute /srv/other/server.js",
    "node --experimental-sea-config /tmp/omniroute.json /srv/other/server.js",
    "node --inspect-port /tmp/omniroute /srv/other/server.js",
    "node --no-warnings --trace-event-file-pattern /tmp/omniroute /srv/other/server.js",
    "bun --smol --config /tmp/omniroute.toml /srv/other/server.js",
  ]) {
    assert.equal(classifyPidIdentity(1, linux(cmdline)), "unknown", cmdline);
  }
  // A known value option still has its value skipped, so the foreign script is what is judged.
  assert.equal(
    classifyPidIdentity(1, linux("node --experimental-loader /tmp/omniroute.mjs /srv/x.js")),
    "foreign"
  );
  for (const cmdline of [
    "node --no-warnings /opt/omniroute/app/server.js",
    "node --no-warnings --enable-source-maps /opt/omniroute/app/server.js",
    // How OmniRoute spawns itself (scripts/build/runtime-env.mjs, serve.mjs, plugins/loader.ts).
    "node --dns-result-order=ipv4first --max-old-space-size=512 /opt/omniroute/app/server.js",
    "node --import tsx/esm /opt/omniroute/bin/omniroute.mjs serve",
    "bun --preload /opt/omniroute/bin/polyfill.mjs /opt/omniroute/app/server.js",
    "bun --smol /opt/omniroute/app/server.js",
  ]) {
    assert.equal(classifyPidIdentity(1, linux(cmdline)), "ours", cmdline);
  }
});

test("classifyPidIdentity: a re-join proven by exactly one real file still identifies OmniRoute", () => {
  const files =
    (...paths: string[]) =>
    (p: string) =>
      paths.includes(p);
  assert.equal(
    classifyPidIdentity(1, {
      platform: "darwin",
      execFileSync: () => "node /Users/Jo Do/omniroute/server.js\n",
      isFile: files("/Users/Jo Do/omniroute/server.js"),
    }),
    "ours"
  );
  assert.equal(
    classifyPidIdentity(1, {
      platform: "win32",
      execFileSync: () => "C:\\Program Files\\nodejs\\node.exe C:\\omniroute\\dist\\server.js\r\n",
      isFile: files("C:\\Program Files\\nodejs\\node.exe"),
    }),
    "ours"
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
  // An unquoted executable path with a space is re-joined only when the real file proves it.
  assert.equal(
    classifyPidIdentity(1, {
      platform: "darwin",
      execFileSync: () => "/Users/me/Application Support/node /Users/me/omniroute/a.js\n",
      isFile: (p: string) => p === "/Users/me/Application Support/node",
    }),
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
    // The unquoted "Program Files" path is re-joined only when the real file proves it.
    isFile: (p: string) => p === "C:\\Program Files\\nodejs\\node.exe",
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
