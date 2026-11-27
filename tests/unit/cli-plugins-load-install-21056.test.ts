// tests/unit/repro-21056.test.ts (written in the probe worktree, now removed; copy kept in the session scratchpad)
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const BIN = join(ROOT, "bin", "omniroute.mjs");

function makePlugin(parent: string, name = "omniroute-cmd-hello", cmd = "hello-plugin") {
  const dir = join(parent, name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ name, version: "1.0.0", type: "module", main: "index.mjs" })
  );
  writeFileSync(
    join(dir, "index.mjs"),
    `export function register(program){ program.command("${cmd}").description("fixture").action(()=>console.log("RAN")); }\n`
  );
  return dir;
}
function cli(args: string[], env: Record<string, string>) {
  return spawnSync(process.execPath, [BIN, ...args], {
    env: { ...process.env, OMNIROUTE_NO_UPDATE_NOTIFIER: "1", ...env },
    encoding: "utf8",
    timeout: 90_000,
  });
}

test("#21056-1: a discovered plugin's command shows up in --help (loadPlugins wired in)", () => {
  const sandbox = mkdtempSync(join(tmpdir(), "repro-21056-a-"));
  const plugDir = join(sandbox, "plug");
  makePlugin(plugDir);
  const env = {
    HOME: join(sandbox, "home"),
    USERPROFILE: join(sandbox, "home"),
    DATA_DIR: join(sandbox, "data"),
    OMNIROUTE_PLUGIN_PATH: plugDir,
  };
  const list = cli(["plugin", "list", "--output", "json"], env);
  assert.match(list.stdout, /omniroute-cmd-hello/, "precondition: discovery finds the fixture");
  const help = cli(["--help"], env);
  assert.match(help.stdout, /hello-plugin/, "plugin command must be registered in --help");
});

test("#21056-1b: nothing under bin/ invokes loadPlugins()", () => {
  const grep = spawnSync("git", ["grep", "-n", "loadPlugins(", "--", "bin"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  const callers = grep.stdout
    .split("\n")
    .filter((l) => l && !l.includes("export async function loadPlugins"));
  assert.ok(callers.length > 0, "expected at least one caller of loadPlugins in bin/, got none");
});

test("#21056-2: `plugin install .` / `plugin install ./x` hand npm the right spec, and use a location discovery scans", () => {
  const sandbox = mkdtempSync(join(tmpdir(), "repro-21056-b-"));
  const fakeBin = join(sandbox, "bin");
  mkdirSync(fakeBin);
  const log = join(sandbox, "npm-argv.txt");
  writeFileSync(join(fakeBin, "npm"), `#!/bin/sh\necho "$@" >> "${log}"\nexit 0\n`);
  chmodSync(join(fakeBin, "npm"), 0o755);
  const env = {
    HOME: join(sandbox, "home"),
    USERPROFILE: join(sandbox, "home"),
    DATA_DIR: join(sandbox, "data"),
    PATH: `${fakeBin}:${process.env.PATH}`,
  };
  cli(["plugin", "install", ".", "--yes"], env);
  cli(["plugin", "install", "./local-plugin", "--yes"], env);
  const argv = existsSync(log) ? readFileSync(log, "utf8").trim().split("\n") : [];
  console.log("npm argv recorded:", JSON.stringify(argv));
  assert.equal(argv.length, 2);
  assert.doesNotMatch(
    argv[0],
    /omniroute-cmd-\./,
    "`install .` must not become package omniroute-cmd-."
  );
  assert.doesNotMatch(
    argv[1],
    /(^| )-g( |$)/,
    "install uses -g, a location discoverPlugins() never scans"
  );
  assert.match(argv[1], /--prefix \S*\.omniroute\/plugins /);
});

test("#21056-2b: a plugin installed with the CLI's own npm --prefix is found by `plugin list` (symlink too)", () => {
  const sandbox = mkdtempSync(join(tmpdir(), "repro-21056-c-"));
  const src = makePlugin(join(sandbox, "src"), "omniroute-cmd-glob", "glob-cmd");
  const home = join(sandbox, "home");
  const env = { HOME: home, USERPROFILE: home, DATA_DIR: join(sandbox, "data") };
  const prefix = join(home, ".omniroute", "plugins");
  mkdirSync(prefix, { recursive: true });
  const inst = spawnSync(
    "npm",
    ["install", "--prefix", prefix, src, "--offline", "--no-audit", "--no-fund"],
    { env: { ...process.env, ...env }, encoding: "utf8", timeout: 60_000 }
  );
  assert.equal(inst.status, 0, inst.stderr);
  const list = cli(["plugin", "list", "--output", "json"], env);
  assert.match(list.stdout, /omniroute-cmd-glob/);
  const help = cli(["--help"], env);
  assert.match(help.stdout, /glob-cmd/);
});

test("#21056-2c: spec resolution and win32 invocation", async () => {
  const m = await import("../../bin/cli/pluginNpm.mjs");
  assert.equal(m.isLocalPluginSpec("."), true);
  assert.equal(m.isLocalPluginSpec("C:\\x\\p"), true);
  assert.equal(m.isLocalPluginSpec("stripe"), false);
  assert.equal(m.resolvePluginSpec("stripe"), "omniroute-cmd-stripe");
  assert.equal(m.resolvePluginSpec(".", "/a/b"), "/a/b");
  const [file, args, opts] = m.buildPluginNpmInvocation(
    ["install", "--prefix", "C:\\Users\\a b\\.omniroute\\plugins", "omniroute-cmd-x"],
    "win32"
  );
  assert.match(file, /^npm\.cmd install --prefix \^+"C:/);
  assert.deepEqual(args, []);
  assert.equal(opts.shell, true);
  assert.throws(() => m.buildPluginNpmInvocation(["install", "a\nb"], "win32"));
});

test("#21056-3: plugin.mjs spawns npm via the win32-aware helper and surfaces the real error", () => {
  const src = readFileSync(join(ROOT, "bin/cli/commands/plugin.mjs"), "utf8");
  assert.match(readFileSync(join(ROOT, "bin/cli/pluginNpm.mjs"), "utf8"), /npm-exec\.mjs/);
  assert.doesNotMatch(src, /spawnSync\(pm, cmdArgs, \{ stdio: "inherit", shell: false \}\)/);
  assert.doesNotMatch(src, /catch \{\s*process\.stderr\.write\(`✗ Failed to install/);
});

test("#21056-4: scaffold does not require a 4.0.0 host that no release satisfies", () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const src = readFileSync(join(ROOT, "bin/cli/commands/plugin.mjs"), "utf8");
  const major = Number(String(pkg.version).split(".")[0]);
  const m = [...src.matchAll(/>=(\d+)\.0\.0/g)].map((x) => Number(x[1]));
  void 0;
  assert.ok(
    m.every((x) => x <= major),
    `scaffold requires >=${m.join(",")}.0.0 but CLI is ${pkg.version}`
  );
});
