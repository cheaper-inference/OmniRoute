// `omnirouter launch` / `omnirouter gateway` command layer:
// flag parsing into runLaunch flags, `--` passthrough, usage errors, --list, --cleanup,
// gateway subcommands, plus end-to-end dry-runs through bin/omnirouter.mjs against the stub
// gateway (fake registry, then every tier-core adapter).

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, utimesSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Command, Option } from "commander";

import {
  createPlan,
  defineAdapter,
  findTokenSites,
  LaunchError,
} from "../../../../bin/cli/launch/contract.mjs";
import {
  buildLaunchFlags,
  listLaunchTools,
  registerGatewayCommand,
  registerLaunchCommand,
  runCleanup,
} from "../../../../bin/cli/launch/command.mjs";
import { launchRegistry } from "../../../../bin/cli/launch/registry.mjs";
import { probeTool as realProbeTool } from "../../../../bin/cli/launch/core/resolve-bin.mjs";
import { createOmnirouterProgram } from "../../../../bin/omnirouter.mjs";
import { startStubGateway } from "../../../helpers/launch/stubGateway.mjs";

const roots: string[] = [];
function tempRoot(name: string) {
  const dir = mkdtempSync(join(tmpdir(), `olx-command-${name}-`));
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

function fakeAdapter(id = "fake") {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id,
    displayName: "Fake Tool",
    binaries: ["fake-tool"],
    capabilities: {
      protocol: "openai-chat",
      modelList: { strategy: "inject", view: { name: "fake", filter: {}, order: "catalog" } },
      model: "optional",
      install: { commands: { any: ["npm i -g fake-tool"] } },
      supportsProfile: true,
      platforms: ["linux", "darwin", "win32"],
      tier: "core",
      versionGate: { args: ["--version"], pattern: "(\\d+\\.\\d+\\.\\d+)", min: "1.0.0" },
    },
    plan(ctx: {
      model?: { id: string };
      passthroughArgs: string[];
      view: { hash: string; rows: unknown[] };
    }) {
      const base = createPlan(id, {
        argv: ["--model", ctx.model?.id ?? "", ...ctx.passthroughArgs],
        env: { set: { FAKE_KEY: "${TOKEN}" }, unset: [] },
        modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: ctx.view.rows.length },
      });
      return { ...base, secretSites: findTokenSites(base) };
    },
  });
}

function registryOf(...adapters: Array<{ id: string }>) {
  return {
    get: (id: string) => adapters.find((a) => a.id === id),
    list: () => adapters,
    aliasesOf: () => [],
  };
}

type Recorded = { toolId: string; flags: Record<string, unknown>; deps: Record<string, unknown> };

/** Fresh program with the launch command and a recording runLaunch. */
function harness(options: { legacy?: boolean; root?: (p: Command) => void; deps?: object } = {}) {
  const program = new Command().exitOverride();
  program.configureOutput({ writeOut: () => {}, writeErr: () => {} });
  options.root?.(program);
  const calls: Recorded[] = [];
  const out = { stdout: sink(), stderr: sink(), code: undefined as number | undefined };
  registerLaunchCommand(program, {
    legacy: options.legacy,
    deps: {
      registry: registryOf(fakeAdapter("claude")),
      stdout: out.stdout,
      stderr: out.stderr,
      setExitCode: (c: number) => {
        out.code = c;
      },
      runLaunch: async (toolId: string, flags: Record<string, unknown>, deps: object) => {
        calls.push({ toolId, flags, deps: deps as Record<string, unknown> });
        return { exitCode: 0, warnings: [] };
      },
      ...(options.deps || {}),
    },
  });
  const run = (argv: string[]) => program.parseAsync(["launch", ...argv], { from: "user" });
  return { program, calls, out, run };
}

test("every documented flag maps to its camelCase runLaunch flag", async () => {
  const h = harness();
  await h.run([
    "claude",
    "-m",
    "openai/gpt-5.2",
    "--provider",
    "openai",
    "--pick",
    "--favorite",
    "--unfavorite",
    "-p",
    "work",
    "--port",
    "20200",
    "--remote",
    "https://gw.example",
    "--base-url",
    "https://gw2.example",
    "--context",
    "prod",
    "--api-key",
    "sk-a",
    "--token",
    "sk-b",
    "--api-key-env",
    "MY_KEY",
    "--no-start",
    "--keep-gateway",
    "--start-timeout",
    "5000",
    "--inherit-env",
    "--dry-run",
    "--json",
    "--yes",
    "--doctor",
    "--tag",
    "ci",
    "--no-summary",
    "--set-default",
    "--private",
  ]);
  assert.equal(h.calls.length, 1);
  const { toolId, flags, deps } = h.calls[0];
  assert.equal(toolId, "claude");
  assert.deepEqual(flags, {
    model: "openai/gpt-5.2",
    provider: "openai",
    pick: true,
    allModels: false,
    favorite: true,
    unfavorite: true,
    profile: "work",
    port: "20200",
    remote: "https://gw.example",
    baseUrl: "https://gw2.example",
    context: "prod",
    apiKey: "sk-a",
    token: "sk-b",
    apiKeyEnv: "MY_KEY",
    start: false,
    noStart: true,
    keepGateway: true,
    startTimeoutMs: 5000,
    inheritEnv: true,
    dryRun: true,
    json: true,
    yes: true,
    doctor: true,
    cleanup: false,
    tag: "ci",
    summary: false,
    setDefault: true,
    private: true,
    args: [],
  });
  assert.ok(deps.registry, "the registry is passed to runLaunch");
  assert.equal(h.out.code, 0);
});

test("defaults: start and summary on, booleans false, no stray keys", async () => {
  const h = harness();
  await h.run(["claude"]);
  const { flags } = h.calls[0];
  assert.equal(flags.start, true);
  assert.equal(flags.noStart, false);
  assert.equal(flags.summary, true);
  assert.equal(flags.dryRun, false);
  assert.equal("model" in flags, false);
  assert.equal("budget" in flags, false);
  assert.deepEqual(flags.args, []);
});

test("everything after -- goes to the tool verbatim, even launcher-looking flags", async () => {
  const h = harness();
  await h.run(["claude", "-m", "x/y", "--", "--model", "other", "-p", "--weird", "plain"]);
  const { flags } = h.calls[0];
  assert.equal(flags.model, "x/y");
  assert.equal("profile" in flags, false);
  assert.deepEqual(flags.args, ["--model", "other", "-p", "--weird", "plain"]);
});

test("tool resolution goes through the registry (alias handed to runLaunch as typed)", async () => {
  const h = harness();
  await h.run(["CC", "--dry-run"]);
  assert.equal(h.calls[0].toolId, "CC");
});

test("unknown option before -- is a usage error (exit 2) under omnirouter", async () => {
  const h = harness();
  await assert.rejects(h.run(["claude", "--bogus"]), (err: { exitCode: number; code: string }) => {
    assert.equal(err.code, "commander.unknownOption");
    assert.equal(err.exitCode, 2);
    return true;
  });
  assert.equal(h.calls.length, 0);
});

test("legacy mode passes unknown options and stray positionals through to the tool", async () => {
  const h = harness({ legacy: true });
  await h.run(["claude", "--weird", "prompt"]);
  assert.equal(h.calls.length, 1);
  assert.ok((h.calls[0].flags.args as string[]).includes("--weird"));
  assert.ok((h.calls[0].flags.args as string[]).includes("prompt"));
});

test("a stray positional before -- is a usage error with a hint", async () => {
  const h = harness();
  await h.run(["claude", "prompt"]);
  assert.equal(h.calls.length, 0);
  assert.equal(h.out.code, 2);
  assert.match(h.out.stderr.text, /unexpected argument "prompt"/);
  assert.match(h.out.stderr.text, /after --/);
});

test("missing tool: exit 2 listing launchable ids; --json prints the error document", async () => {
  const h = harness();
  await h.run(["--json"]);
  assert.equal(h.out.code, 2);
  const doc = JSON.parse(h.out.stdout.text);
  assert.equal(doc.error.code, "UsageError");
  assert.match(doc.error.hint, /claude/);
});

test("--start-timeout must be an integer", async () => {
  const h = harness();
  await h.run(["claude", "--start-timeout", "soon"]);
  assert.equal(h.out.code, 2);
  assert.match(h.out.stderr.text, /--start-timeout/);
});

test("reserved flag through the real runLaunch: exit 2, not yet supported", async () => {
  const stdout = sink();
  const stderr = sink();
  let code: number | undefined;
  const program = new Command().exitOverride();
  registerLaunchCommand(program, {
    deps: {
      registry: registryOf(fakeAdapter("claude")),
      stdout,
      stderr,
      setExitCode: (c: number) => {
        code = c;
      },
      launchDeps: { acquireGateway: async () => assert.fail("must not be reached") },
    },
  });
  await program.parseAsync(["launch", "claude", "--budget", "5"], { from: "user" });
  assert.equal(code, 2);
  assert.match(stderr.text, /--budget is not yet supported/);
});

test("root-program --api-key/--base-url/--context typed on the CLI reach the launch flags", async () => {
  const h = harness({
    root: (p) =>
      p
        .addOption(new Option("--api-key <key>").env("OLX_TEST_ROOT_KEY"))
        .addOption(new Option("--base-url <url>").env("OLX_TEST_ROOT_URL"))
        .addOption(new Option("--context <name>")),
  });
  await h.program.parseAsync(["--api-key", "sk-root", "--context", "prod", "launch", "claude"], {
    from: "user",
  });
  assert.equal(h.calls[0].flags.apiKey, "sk-root");
  assert.equal(h.calls[0].flags.context, "prod");
});

test("root-program options coming from env are NOT promoted (OMNIROUTE_BASE_URL stays inert)", async () => {
  process.env.OLX_TEST_ROOT_URL = "https://from-env.example";
  try {
    const h = harness({
      root: (p) => p.addOption(new Option("--base-url <url>").env("OLX_TEST_ROOT_URL")),
    });
    await h.program.parseAsync(["launch", "claude"], { from: "user" });
    assert.equal("baseUrl" in h.calls[0].flags, false);
  } finally {
    delete process.env.OLX_TEST_ROOT_URL;
  }
});

test("buildLaunchFlags splits positionals at -- and keeps @preset", () => {
  const { toolId, flags } = buildLaunchFlags(
    "@fast",
    ["claude", "a", "b"],
    {},
    { afterDashDash: 2 }
  );
  assert.equal(toolId, "claude");
  assert.equal(flags.preset, "@fast");
  assert.deepEqual(flags.args, ["a", "b"]);
});

test("launch --list --json: installed/version/launchable/tier per tool (injected resolver)", async () => {
  const installed = fakeAdapter("claude");
  const missing = fakeAdapter("codex");
  const tooOld = fakeAdapter("aider");
  const h = harness({
    deps: {
      registry: registryOf(installed, missing, tooOld),
      platform: "linux",
      resolveBinary: async (adapter: { id: string }) => {
        if (adapter.id === "codex") throw new LaunchError("ToolNotFound", "codex: not found");
        return { command: `/usr/bin/${adapter.id}`, shell: false };
      },
      probeTool: async (adapter: { id: string }) => {
        if (adapter.id === "aider") throw new LaunchError("ToolVersionTooOld", "aider too old");
        return { version: "2.0.0", features: {}, warnings: [] };
      },
    },
  });
  await h.run(["--list", "--json"]);
  assert.equal(h.out.code, 0);
  const { tools } = JSON.parse(h.out.stdout.text);
  assert.deepEqual(
    tools.map((t: { id: string }) => t.id),
    ["claude", "codex", "aider"]
  );
  for (const t of tools) {
    for (const key of ["id", "displayName", "tier", "installed", "version", "launchable"]) {
      assert.ok(key in t, `${t.id} has ${key}`);
    }
  }
  assert.deepEqual(
    tools.map((t: { installed: boolean; launchable: boolean; version: string | null }) => [
      t.installed,
      t.launchable,
      t.version,
    ]),
    [
      [true, true, "2.0.0"],
      [false, false, null],
      [true, false, null],
    ]
  );
  assert.equal(tools[2].reason, "aider too old");
  assert.equal(h.calls.length, 0, "--list never launches");
});

test("launch --list text output is a table; --list with a tool is a usage error", async () => {
  const deps = {
    resolveBinary: async () => ({ command: "/x", shell: false }),
    probeTool: async () => ({ version: "1.2.3", features: {}, warnings: [] }),
  };
  const h = harness({ deps });
  await h.run(["--list"]);
  assert.match(h.out.stdout.text, /^TOOL\s+TIER\s+INSTALLED\s+VERSION/);
  assert.match(h.out.stdout.text, /claude\s+core\s+yes\s+1\.2\.3/);
  const h2 = harness({ deps });
  await h2.run(["claude", "--list"]);
  assert.equal(h2.out.code, 2);
});

test("listLaunchTools on the real registry returns all 19 tools in registry order", async () => {
  const rows = await listLaunchTools(launchRegistry, {
    platform: "linux",
    resolveBinary: async () => {
      throw new LaunchError("ToolNotFound", "no");
    },
    probeTool: async () => assert.fail("not probed when missing"),
  });
  assert.equal(rows.length, 19);
  assert.deepEqual(
    rows.map((r: { id: string }) => r.id),
    launchRegistry.ids()
  );
  assert.ok(rows.every((r: { displayName: string }) => r.displayName));
});

test("launch --help lists launchable ids with their tier and hides reserved flags", () => {
  const program = new Command();
  const cmd = registerLaunchCommand(program);
  let help = "";
  cmd.configureOutput({ writeOut: (s: string) => (help += s) });
  cmd.outputHelp();
  assert.match(help, /claude\s+core/);
  assert.match(help, /pool\s+supported/);
  assert.doesNotMatch(help, /--budget <amount>/);
  assert.match(help, /--no-summary/);
});

test("--cleanup prunes leases and removes only old launcher temp dirs", async () => {
  const tmpRoot = tempRoot("cleanup");
  const old = join(tmpRoot, "omnirouter-old");
  const fresh = join(tmpRoot, "omnirouter-fresh");
  const other = join(tmpRoot, "unrelated-old");
  for (const dir of [old, fresh, other]) mkdirSync(dir);
  const twoDaysAgo = (Date.now() - 2 * 24 * 60 * 60 * 1000) / 1000;
  utimesSync(old, twoDaysAgo, twoDaysAgo);
  utimesSync(other, twoDaysAgo, twoDaysAgo);
  const pruned: string[] = [];
  const result = await runCleanup({
    stateDir: "/state",
    tmpRoot,
    pruneLeases: (dir: string) => (pruned.push(dir), 3),
  });
  assert.deepEqual(pruned, ["/state"]);
  assert.equal(result.leases, 3);
  assert.deepEqual(result.tempDirs, [old]);
  assert.equal(existsSync(old), false);
  assert.equal(existsSync(fresh), true);
  assert.equal(existsSync(other), true);
});

test("launch --cleanup without a tool runs the sweep and exits 0 without launching", async () => {
  const h = harness({
    deps: { cleanup: async () => ({ leases: 1, tempDirs: ["/t/a"] }), stateDir: "/s" },
  });
  await h.run(["--cleanup"]);
  assert.equal(h.out.code, 0);
  assert.equal(h.calls.length, 0);
  assert.match(h.out.stderr.text, /1 stale leases, 1 temp dirs/);
});

// ---- gateway ----

function gatewayHarness(api: object) {
  const program = new Command().exitOverride();
  const out = { stdout: sink(), stderr: sink(), code: undefined as number | undefined };
  const seen: Array<[string, unknown]> = [];
  registerGatewayCommand(program, {
    deps: {
      stateDir: "/state/launch",
      stdout: out.stdout,
      stderr: out.stderr,
      setExitCode: (c: number) => {
        out.code = c;
      },
      gatewayStatus: async (args: unknown) => {
        seen.push(["status", args]);
        return {
          running: true,
          owned: true,
          kept: false,
          leases: 2,
          pid: 42,
          baseUrl: "http://127.0.0.1:20128",
        };
      },
      keepGateway: async (args: unknown) => (seen.push(["keep", args]), { kept: true }),
      stopOwnedGateway: async (args: unknown) => (seen.push(["stop", args]), { stopped: true }),
      ...api,
    },
  });
  const run = (argv: string[]) => program.parseAsync(["gateway", ...argv], { from: "user" });
  return { out, seen, run };
}

test("gateway status --json is wired to gatewayStatus with the launch state dir", async () => {
  const g = gatewayHarness({});
  await g.run(["status", "--json", "--port", "20200"]);
  assert.deepEqual(g.seen, [["status", { stateDir: "/state/launch", port: "20200" }]]);
  assert.equal(JSON.parse(g.out.stdout.text).leases, 2);
  assert.equal(g.out.code, 0);
});

test("gateway status text names the owner, pid and active launches", async () => {
  const g = gatewayHarness({});
  await g.run(["status"]);
  assert.match(g.out.stdout.text, /running, started by a launcher, pid 42, 2 active launches/);
});

test("gateway keep and stop call core; a not-owned stop is a usage error (exit 2)", async () => {
  const g = gatewayHarness({});
  await g.run(["keep"]);
  assert.deepEqual(g.seen, [["keep", { stateDir: "/state/launch" }]]);
  assert.match(g.out.stdout.text, /kept/);

  const ok = gatewayHarness({});
  await ok.run(["stop"]);
  assert.deepEqual(ok.seen, [["stop", { stateDir: "/state/launch" }]]);
  assert.equal(ok.out.code, 0);

  const refused = gatewayHarness({
    stopOwnedGateway: async () => {
      throw new LaunchError("UsageError", "No launcher-started gateway is running", {
        hint: "Use `omniroute stop`",
      });
    },
  });
  await refused.run(["stop"]);
  assert.equal(refused.out.code, 2);
  assert.match(refused.out.stderr.text, /No launcher-started gateway is running/);
});

// ---- end to end through bin/omnirouter.mjs ----

const PARENT_KEY = "sk-parent-SECRET-0123456789";

function e2eLaunchDeps(root: string, extra: object = {}) {
  return {
    env: { PATH: process.env.PATH ?? "", HOME: root },
    homeDir: root,
    cwd: root,
    dataDir: join(root, "data"),
    isTTY: false,
    loadPreferences: () => ({ favorites: [], recent: [] }),
    readToolDefaults: () => null,
    readLastLaunch: () => null,
    acquireGateway: async () => assert.fail("dry-run must not acquire the gateway"),
    ...extra,
  };
}

async function runOmnirouter(argv: string[], launchDeps: object, registry?: object) {
  const stdout = sink();
  const stderr = sink();
  let code: number | undefined;
  const program = await createOmnirouterProgram({
    launch: {
      ...(registry ? { registry } : {}),
      stdout,
      stderr,
      setExitCode: (c: number) => {
        code = c;
      },
      launchDeps,
    },
  });
  program.exitOverride();
  await program.parseAsync(["node", "omnirouter", ...argv]);
  return { stdout: stdout.text, stderr: stderr.text, code };
}

test("omnirouter program: name, new launch replaces the legacy one, gateway registered", async () => {
  const program = await createOmnirouterProgram();
  assert.equal(program.name(), "omnirouter");
  const launches = program.commands.filter((c) => c.name() === "launch");
  assert.equal(launches.length, 1);
  assert.ok(launches[0].options.some((o) => o.long === "--dry-run"));
  assert.ok(program.commands.some((c) => c.name() === "gateway"));
});

test("e2e: omnirouter launch <fake> --dry-run --json against the stub gateway", async () => {
  const stub = await startStubGateway({ parentKey: PARENT_KEY });
  try {
    const root = tempRoot("e2e");
    const res = await runOmnirouter(
      ["launch", "fake", "--remote", stub.url, "--api-key", PARENT_KEY, "--dry-run", "--json"],
      e2eLaunchDeps(root, {
        resolveBinary: async () => ({ command: "/opt/fake-tool", shell: false }),
        probeTool: async () => ({ version: "1.5.0", features: {}, warnings: [] }),
      }),
      registryOf(fakeAdapter("fake"))
    );
    assert.equal(res.code, 0, `${res.stdout}\n${res.stderr}`);
    const doc = JSON.parse(res.stdout);
    assert.equal(doc.target, "fake");
    assert.equal(doc.gateway.status, "running");
    assert.equal(doc.env.set.FAKE_KEY, "${TOKEN}");
    assert.ok(doc.model, "a model was picked from the stub catalog");
    assert.ok(!res.stdout.includes(PARENT_KEY) && !res.stderr.includes(PARENT_KEY));
    assert.ok(
      stub.requests.every(
        (r: { path?: string; url?: string }) =>
          !String(r.path ?? r.url ?? "").includes("/api/launch/sessions")
      ),
      "dry-run mints no session"
    );
  } finally {
    await stub.close();
  }
});

test("e2e: unknown tool through the real pipeline exits 2 with launchable ids", async () => {
  const res = await runOmnirouter(
    ["launch", "nope", "--dry-run", "--json"],
    e2eLaunchDeps(tempRoot("e2e-unknown"))
  );
  assert.equal(res.code, 2);
  const doc = JSON.parse(res.stdout);
  assert.equal(doc.error.code, "UsageError");
  assert.match(doc.error.hint, /claude/);
});

const CORE_TOOLS = launchRegistry
  .ids()
  .filter((id: string) => launchRegistry.entry(id)?.tier === "core");

test("the core tier has the 12 documented core tools", () => {
  assert.deepEqual(
    [...CORE_TOOLS].sort(),
    [
      "aider",
      "claude",
      "cline",
      "codex",
      "crush",
      "deepseek",
      "hermes",
      "omp",
      "openclaw",
      "opencode",
      "pi",
      "qwen",
    ].sort()
  );
});

for (const id of CORE_TOOLS) {
  test(`real adapter dry-run: ${id} exits 0 with a redacted plan`, async () => {
    const stub = await startStubGateway({ parentKey: PARENT_KEY });
    try {
      const root = tempRoot(`dry-${id}`);
      const res = await runOmnirouter(
        [
          "launch",
          id,
          "--remote",
          stub.url,
          "--api-key",
          PARENT_KEY,
          "-m",
          "anthropic/claude-sonnet-4-6",
          "--dry-run",
          "--json",
          "--yes",
        ],
        e2eLaunchDeps(root, {
          resolveBinary: async (adapter: { binaries: string[] }) => ({
            command: `/opt/bin/${adapter.binaries[0]}`,
            shell: false,
          }),
          probeTool: (adapter: object, bin: object, d: object) =>
            realProbeTool(adapter, bin, { ...d, runVersion: async () => "99.0.0\n" }),
        })
      );
      assert.equal(res.code, 0, `${id}: ${res.stdout}\n${res.stderr}`);
      const doc = JSON.parse(res.stdout);
      assert.equal(doc.target, id);
      assert.equal(doc.model, "anthropic/claude-sonnet-4-6");
      assert.ok(!res.stdout.includes(PARENT_KEY), `${id}: parent key leaked into the plan`);
      assert.ok(!res.stderr.includes(PARENT_KEY), `${id}: parent key leaked into stderr`);
      assert.ok(!/olx_[A-Za-z0-9]/.test(res.stdout), `${id}: a session token appears in the plan`);
    } finally {
      await stub.close();
    }
  });
}
