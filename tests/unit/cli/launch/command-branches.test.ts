// `omnirouter launch` / `gateway` command layer: the branches command.test.ts does not reach.
// --cleanup combined with --json / a tool / --list, runLaunch deps forwarding, flag key order,
// root-option promotion, --list row reasons, the help footer, the gateway text renderers and
// the runCleanup edge cases. Everything runs against injected deps and private temp dirs.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Command } from "commander";

import { LaunchError } from "../../../../bin/cli/launch/contract.mjs";
import {
  buildLaunchFlags,
  listLaunchTools,
  registerGatewayCommand,
  registerLaunchCommand,
  runCleanup,
} from "../../../../bin/cli/launch/command.mjs";

const roots: string[] = [];
function tempRoot(name: string) {
  const dir = mkdtempSync(join(tmpdir(), `olx-command-branches-${name}-`));
  roots.push(dir);
  return dir;
}
test.after(() => {
  for (const dir of roots) rmSync(dir, { recursive: true, force: true });
});

function sink() {
  let text = "";
  return {
    write: (chunk: string) => ((text += String(chunk)), true),
    get text() {
      return text;
    },
  };
}

type Adapter = {
  id: string;
  displayName?: string;
  capabilities: { tier: string; platforms: string[] };
};

function adapter(id: string, platforms = ["linux", "darwin", "win32"]): Adapter {
  return { id, displayName: `${id} tool`, capabilities: { tier: "core", platforms } };
}

function registryOf(...adapters: Adapter[]) {
  return {
    get: (id: string) => adapters.find((a) => a.id === id),
    list: () => adapters,
    aliasesOf: () => [],
  };
}

type Recorded = { toolId: string; flags: Record<string, unknown>; deps: Record<string, unknown> };

function harness(deps: Record<string, unknown> = {}, root?: (p: Command) => void) {
  const program = new Command().exitOverride();
  program.configureOutput({ writeOut: () => {}, writeErr: () => {} });
  root?.(program);
  const calls: Recorded[] = [];
  const out = { stdout: sink(), stderr: sink(), code: undefined as number | undefined };
  registerLaunchCommand(program, {
    deps: {
      registry: registryOf(adapter("claude")),
      stdout: out.stdout,
      stderr: out.stderr,
      setExitCode: (c: number) => {
        out.code = c;
      },
      runLaunch: async (toolId: string, flags: Record<string, unknown>, d: object) => {
        calls.push({ toolId, flags, deps: d as Record<string, unknown> });
        return { exitCode: 0 };
      },
      ...deps,
    },
  });
  const run = (argv: string[]) => program.parseAsync(["launch", ...argv], { from: "user" });
  return { program, calls, out, run };
}

const REMOVED = { leases: 2, tempDirs: ["/t/a", "/t/b"] };

// ---- --cleanup combinations ----

test("--cleanup --json without a tool prints the cleanup document on stdout, exit 0", async () => {
  const seen: unknown[] = [];
  const h = harness({
    stateDir: "/state",
    cleanup: async (args: unknown) => (seen.push(args), REMOVED),
  });
  await h.run(["--cleanup", "--json"]);
  assert.deepEqual(seen, [{ stateDir: "/state" }]);
  assert.deepEqual(JSON.parse(h.out.stdout.text), { cleanup: REMOVED });
  assert.equal(h.out.stdout.text, `${JSON.stringify({ cleanup: REMOVED }, null, 2)}\n`);
  assert.equal(h.out.stderr.text, "");
  assert.equal(h.out.code, 0);
  assert.equal(h.calls.length, 0);
});

test("--cleanup --json with a tool stays silent about the sweep and still launches", async () => {
  const h = harness({ stateDir: "/state", cleanup: async () => REMOVED });
  await h.run(["claude", "--cleanup", "--json"]);
  assert.equal(h.out.stdout.text, "");
  assert.equal(h.out.stderr.text, "");
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].flags.cleanup, true);
  assert.equal(h.out.code, 0);
});

test("--cleanup with a tool (text) reports on stderr then launches", async () => {
  const h = harness({ stateDir: "/state", cleanup: async () => REMOVED });
  await h.run(["claude", "--cleanup"]);
  assert.equal(h.out.stderr.text, "omnirouter: cleanup removed 2 stale leases, 2 temp dirs\n");
  assert.equal(h.calls.length, 1);
});

test("--cleanup --list sweeps first, then lists", async () => {
  const h = harness({
    stateDir: "/state",
    cleanup: async () => REMOVED,
    resolveBinary: async () => {
      throw new Error("absent");
    },
    probeTool: async () => ({}),
    platform: "linux",
  });
  await h.run(["--cleanup", "--list"]);
  assert.match(h.out.stderr.text, /cleanup removed 2 stale leases/);
  assert.match(h.out.stdout.text, /^TOOL {2}/);
  assert.match(h.out.stdout.text, /claude +core +no +- +not installed/);
  assert.equal(h.out.code, 0);
  assert.equal(h.calls.length, 0);
});

test("--list with a tool is a usage error (exit 2, --json error document)", async () => {
  const h = harness();
  await h.run(["claude", "--list", "--json"]);
  assert.equal(h.out.code, 2);
  const doc = JSON.parse(h.out.stdout.text);
  assert.equal(doc.error.code, "UsageError");
  assert.match(doc.error.message, /--list takes no tool/);
});

// ---- missing tool / preset / runLaunch hand-over ----

test("missing tool uses registry.ids() when the registry has it", async () => {
  const h = harness({
    registry: { ...registryOf(adapter("claude")), ids: () => ["alpha", "beta"] },
  });
  await h.run([]);
  assert.equal(h.out.code, 2);
  assert.match(h.out.stderr.text, /missing tool/);
  assert.match(h.out.stderr.text, /launchable tools: alpha, beta \(or omnirouter launch --list\)/);
});

test("a preset alone runs launch with an empty tool id", async () => {
  const h = harness();
  await h.run(["@work"]);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].toolId, "");
  assert.equal(h.calls[0].flags.preset, "@work");
});

test("runLaunch deps: stdout/stderr/env forwarded first, then launchDeps, then registry", async () => {
  const env = { PATH: "/bin" };
  const registry = registryOf(adapter("claude"));
  const h = harness({ env, registry, launchDeps: { homeDir: "/h", registry: "overridden" } });
  await h.run(["claude"]);
  const { deps } = h.calls[0];
  assert.deepEqual(Object.keys(deps), ["stdout", "stderr", "env", "homeDir", "registry"]);
  assert.equal(deps.env, env);
  assert.equal(deps.homeDir, "/h");
  assert.equal(deps.registry, registry);
});

test("runLaunch deps omit stdout/stderr/env that were not injected", async () => {
  const program = new Command().exitOverride();
  const calls: Array<Record<string, unknown>> = [];
  let code: number | undefined;
  registerLaunchCommand(program, {
    deps: {
      registry: registryOf(adapter("claude")),
      setExitCode: (c: number) => {
        code = c;
      },
      runLaunch: async (_id: string, _flags: object, d: Record<string, unknown>) => {
        calls.push(d);
        return undefined;
      },
    },
  });
  await program.parseAsync(["launch", "claude"], { from: "user" });
  assert.deepEqual(Object.keys(calls[0]), ["registry"]);
  assert.equal(code, 0, "an undefined result exits 0");
});

test("runLaunch exit code is propagated; a thrown error is reported", async () => {
  const exit = harness({ runLaunch: async () => ({ exitCode: 7 }) });
  await exit.run(["claude"]);
  assert.equal(exit.out.code, 7);

  const thrown = harness({
    runLaunch: async () => {
      throw new LaunchError("UsageError", "bad launch");
    },
  });
  await thrown.run(["claude"]);
  assert.equal(thrown.out.code, 2);
  assert.match(thrown.out.stderr.text, /bad launch/);
});

// ---- flags ----

test("flags keep the documented key order (dry-run JSON depends on it)", () => {
  const { flags } = buildLaunchFlags(
    "claude",
    ["@p", "x"],
    {
      model: "m",
      provider: "p",
      profile: "w",
      port: "1",
      remote: "r",
      baseUrl: "b",
      context: "c",
      apiKey: "k",
      token: "t",
      apiKeyEnv: "E",
      startTimeout: "5",
      tag: "g",
      budget: "1",
      budgetFallback: "f",
      mode: "o",
      compression: "z",
      mcp: true,
      statusline: true,
      exec: "e",
      install: true,
    },
    { afterDashDash: 1 }
  );
  assert.deepEqual(Object.keys(flags), [
    "model",
    "provider",
    "pick",
    "allModels",
    "favorite",
    "unfavorite",
    "profile",
    "port",
    "remote",
    "baseUrl",
    "context",
    "apiKey",
    "token",
    "apiKeyEnv",
    "start",
    "noStart",
    "keepGateway",
    "startTimeoutMs",
    "inheritEnv",
    "dryRun",
    "json",
    "yes",
    "doctor",
    "cleanup",
    "tag",
    "summary",
    "setDefault",
    "private",
    "budget",
    "budgetFallback",
    "mode",
    "compression",
    "mcp",
    "statusline",
    "exec",
    "install",
    "preset",
    "args",
  ]);
  assert.equal(flags.startTimeoutMs, 5);
  assert.equal(flags.preset, "@p");
  assert.deepEqual(flags.args, ["x"]);
});

test("buildLaunchFlags: legacy keeps extra words as tool args; bare @ is a word", () => {
  const legacy = buildLaunchFlags(
    "claude",
    ["prompt", "tail"],
    {},
    { legacy: true, afterDashDash: 1 }
  );
  assert.equal(legacy.toolId, "claude");
  assert.deepEqual(legacy.flags.args, ["prompt", "tail"]);
  assert.equal("preset" in legacy.flags, false);

  assert.throws(
    () => buildLaunchFlags("claude", ["@"], {}),
    (err: Error) => err.message === 'unexpected argument "@"'
  );
  assert.equal(buildLaunchFlags("@", undefined, {}).toolId, "@");
  assert.deepEqual(buildLaunchFlags(undefined, undefined, {}, { afterDashDash: 5 }).flags.args, []);
});

test("--start-timeout rejects negatives and fractions", () => {
  for (const value of ["-1", "1.5"]) {
    assert.throws(
      () => buildLaunchFlags("claude", [], { startTimeout: value }),
      (err: Error) => err.message === `--start-timeout must be a non-negative integer, got ${value}`
    );
  }
  assert.equal(buildLaunchFlags("claude", [], { startTimeout: "0" }).flags.startTimeoutMs, 0);
});

test("root options: the launch-level value wins over a root --api-key typed on the CLI", async () => {
  const h = harness({}, (p) => {
    p.option("--api-key <key>").option("--base-url <url>").option("--context <name>");
  });
  await h.program.parseAsync(
    ["--api-key", "root-key", "--context", "rc", "launch", "claude", "--api-key", "own"],
    { from: "user" }
  );
  const { flags } = h.calls[0];
  assert.equal(flags.apiKey, "own");
  assert.equal(flags.context, "rc");
  assert.equal("baseUrl" in flags, false);
});

test("root options: the nearest ancestor that set a value on the CLI wins", async () => {
  const program = new Command().exitOverride().option("--base-url <url>");
  const mid = program.command("mid").option("--base-url <url>");
  const calls: Recorded[] = [];
  registerLaunchCommand(mid, {
    deps: {
      registry: registryOf(adapter("claude")),
      setExitCode: () => {},
      runLaunch: async (toolId: string, flags: Record<string, unknown>, d: object) => {
        calls.push({ toolId, flags, deps: d as Record<string, unknown> });
        return { exitCode: 0 };
      },
    },
  });
  await program.parseAsync(["--base-url", "top", "mid", "--base-url", "near", "launch", "claude"], {
    from: "user",
  });
  assert.equal(calls[0].flags.baseUrl, "near");
});

// ---- --list rows ----

test("listLaunchTools: unsupported platform, not installed, probe failure, missing version", async () => {
  const registry = {
    list: () => [],
    loadAll: async () => [
      adapter("winonly", ["win32"]),
      adapter("absent"),
      adapter("broken"),
      adapter("noversion"),
      adapter("good"),
    ],
    entry: (id: string) => (id === "good" ? { displayName: "Good Tool" } : undefined),
  };
  const rows = await listLaunchTools(registry, {
    platform: "linux",
    env: {},
    resolveBinary: async (a: Adapter) => {
      if (a.id === "absent") throw new Error("nope");
      return { command: `/bin/${a.id}` };
    },
    probeTool: async (a: Adapter) => {
      if (a.id === "broken") throw new LaunchError("ToolVersionTooOld", "too old");
      return a.id === "good" ? { version: "1.2.3" } : {};
    },
  });
  const byId = Object.fromEntries(rows.map((r: { id: string }) => [r.id, r]));
  assert.equal(byId.winonly.reason, "not supported on linux");
  assert.equal(byId.winonly.installed, false);
  assert.deepEqual(byId.winonly.aliases, []);
  assert.equal(byId.absent.reason, "not installed");
  assert.equal(byId.absent.command, null);
  assert.equal(byId.broken.installed, true);
  assert.equal(byId.broken.command, "/bin/broken");
  assert.equal(byId.broken.launchable, false);
  assert.equal(byId.broken.reason, "too old");
  assert.equal(byId.noversion.version, null);
  assert.equal(byId.noversion.launchable, true);
  assert.equal(byId.noversion.reason, null);
  assert.equal(byId.good.displayName, "Good Tool");
  assert.equal(byId.good.version, "1.2.3");
  assert.deepEqual(Object.keys(byId.good), [
    "id",
    "displayName",
    "tier",
    "aliases",
    "installed",
    "version",
    "command",
    "launchable",
    "reason",
  ]);
});

test("launch --list text table: launchable rows have an empty note", async () => {
  const h = harness({
    platform: "linux",
    resolveBinary: async () => ({ command: "/bin/claude" }),
    probeTool: async () => ({ version: "9.9.9" }),
  });
  await h.run(["--list"]);
  const lines = h.out.stdout.text.split("\n");
  assert.equal(lines[0], "TOOL    TIER  INSTALLED  VERSION  NOTE");
  assert.equal(lines[1], "claude  core  yes        9.9.9");
  assert.equal(h.out.code, 0);
});

// ---- help footer ----

function helpOf(registry: object) {
  const program = new Command().exitOverride();
  let text = "";
  program.configureOutput({ writeOut: (s) => (text += s), writeErr: () => {} });
  registerLaunchCommand(program, { deps: { registry } });
  try {
    program.parse(["launch", "--help"], { from: "user" });
  } catch {
    // commander exits through exitOverride after printing help
  }
  return text;
}

test("help footer: aliases from metadata registries; a broken registry is reported", () => {
  const meta = {
    list: () => assert.fail("metadata registry must not load adapters"),
    ids: () => ["claude"],
    entry: () => ({ tier: "core", displayName: "Claude Code" }),
    aliasesOf: () => ["cc", "claude-code"],
  };
  assert.match(helpOf(meta), / {2}claude {5}core {7}Claude Code \(aliases: cc, claude-code\)\n/);

  const broken = {
    list: () => {
      throw new Error("registry down");
    },
  };
  const text = helpOf(broken);
  assert.match(text, /Launchable tools:\n {2}\(registry unavailable\)\n/);
  assert.match(text, /Reserved for a later release \(exit 2\): --budget --budget-fallback/);
});

// ---- gateway text renderers ----

function gateway(api: Record<string, unknown>) {
  const program = new Command().exitOverride();
  const out = { stdout: sink(), stderr: sink(), code: undefined as number | undefined };
  registerGatewayCommand(program, {
    deps: {
      stateDir: "/state",
      stdout: out.stdout,
      stderr: out.stderr,
      setExitCode: (c: number) => {
        out.code = c;
      },
      gatewayStatus: async () => ({}),
      keepGateway: async () => ({}),
      stopOwnedGateway: async () => ({}),
      ...api,
    },
  });
  const run = (argv: string[]) => program.parseAsync(["gateway", ...argv], { from: "user" });
  return { out, run };
}

test("gateway status text: not running, kept, external, owned with state", async () => {
  const cases: Array<[object, string]> = [
    [{ running: false, baseUrl: "http://h:1" }, "gateway at http://h:1: not running\n"],
    [
      { running: true, kept: true, leases: 0, baseUrl: "http://h:1" },
      "gateway at http://h:1: running, kept after a launch (now a normal gateway), 0 active launches\n",
    ],
    [
      { running: true, leases: 1, pid: 9, baseUrl: "http://h:1" },
      "gateway at http://h:1: running, external (not started by a launcher), pid 9, 1 active launches\n",
    ],
    [
      { running: true, owned: true, state: "draining", leases: 3, baseUrl: "http://h:1" },
      "gateway at http://h:1: running, started by a launcher (draining), 3 active launches\n",
    ],
  ];
  for (const [status, expected] of cases) {
    const g = gateway({ gatewayStatus: async () => status });
    await g.run(["status"]);
    assert.equal(g.out.stdout.text, expected);
    assert.equal(g.out.code, 0);
  }
});

test("gateway keep with nothing to keep; keep/stop --json print the core result", async () => {
  const none = gateway({ keepGateway: async () => ({ kept: false }) });
  await none.run(["keep"]);
  assert.equal(none.out.stdout.text, "no launcher-started gateway to keep\n");

  const kept = gateway({ keepGateway: async () => ({ kept: true }) });
  await kept.run(["keep"]);
  assert.equal(kept.out.stdout.text, "gateway kept: it now runs until `omniroute stop`\n");

  const keepJson = gateway({ keepGateway: async () => null });
  await keepJson.run(["keep", "--json"]);
  assert.equal(keepJson.out.stdout.text, "null\n");

  const stopJson = gateway({ stopOwnedGateway: async () => ({ stopped: true }) });
  await stopJson.run(["stop", "--json"]);
  assert.equal(stopJson.out.stdout.text, `${JSON.stringify({ stopped: true }, null, 2)}\n`);

  const stopText = gateway({});
  await stopText.run(["stop"]);
  assert.equal(stopText.out.stdout.text, "launcher gateway stopped\n");
});

test("gateway errors with --json print the error document on stdout", async () => {
  const g = gateway({
    gatewayStatus: async () => {
      throw new LaunchError("UsageError", "status failed");
    },
  });
  await g.run(["status", "--json"]);
  assert.equal(g.out.code, 2);
  assert.equal(JSON.parse(g.out.stdout.text).error.message, "status failed");
});

test("gateway with partial deps loads the missing functions from core", async () => {
  const g = gateway({ gatewayStatus: undefined, keepGateway: async () => ({ kept: true }) });
  await g.run(["keep"]);
  assert.match(g.out.stdout.text, /gateway kept/);
});

// ---- runCleanup edge cases ----

test("runCleanup: a throwing prune counts 0 leases; a missing tmp root removes nothing", async () => {
  const result = await runCleanup({
    stateDir: "/state",
    tmpRoot: join(tempRoot("missing"), "does-not-exist"),
    pruneLeases: () => {
      throw new Error("lease dir unreadable");
    },
  });
  assert.deepEqual(result, { leases: 0, tempDirs: [] });
});

test("runCleanup: skips prefixed files, keeps young dirs, honours the injected clock", async () => {
  const tmpRoot = tempRoot("edges");
  const file = join(tmpRoot, "omnirouter-file");
  const dir = join(tmpRoot, "omnirouter-dir");
  writeFileSync(file, "x");
  mkdirSync(dir);
  const twoDaysAgo = (Date.now() - 2 * 24 * 60 * 60 * 1000) / 1000;
  utimesSync(file, twoDaysAgo, twoDaysAgo);

  const young = await runCleanup({ stateDir: "/s", tmpRoot, pruneLeases: () => 0 });
  assert.deepEqual(young.tempDirs, []);
  assert.equal(existsSync(dir), true);

  const later = Date.now() + 2 * 24 * 60 * 60 * 1000;
  const old = await runCleanup({ stateDir: "/s", tmpRoot, now: later, pruneLeases: () => 1 });
  assert.deepEqual(old, { leases: 1, tempDirs: [dir] });
  assert.equal(existsSync(dir), false);
  assert.equal(existsSync(file), true, "a prefixed file is never removed");
});
