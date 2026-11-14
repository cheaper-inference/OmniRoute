// Legacy `omniroute launch` on the launch core: routing of a known tool
// to the new command, the legacy Claude path (deprecation note, `--start` through runLaunch),
// env parity between buildClaudeEnv and the claude adapter, and the shared executor
// (executeLegacyLaunch) running real child processes.

import { test } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";

import { Command } from "commander";

import {
  buildClaudeEnv,
  executeLegacyLaunch,
  legacyLaunchRoute,
  registerLaunch,
  runLaunchCommand,
  splitLaunchTail,
} from "../../../../bin/cli/commands/launch.mjs";
import claudeAdapter from "../../../../bin/cli/launch/adapters/claude.mjs";
import { claudeWindowEnv } from "../../../../bin/cli/launch/contract.mjs";
import { substitutePlan } from "../../../../bin/cli/launch/core/execute.mjs";
import { launchRegistry } from "../../../../bin/cli/launch/registry.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";

const roots: string[] = [];
function tempRoot(name: string) {
  const dir = mkdtempSync(join(tmpdir(), `olx-legacy-${name}-`));
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

// --- routing -------------------------------------------------------------------------------

test("legacyLaunchRoute: known id or alias goes to core, anything else stays legacy", () => {
  const registry = launchRegistry;
  const alias = launchRegistry.aliasesOf("claude")[0] ?? launchRegistry.aliasesOf("codex")[0];
  const rows: Array<[string[], number, string]> = [
    [["codex"], 0, "core"],
    [["claude", "-p"], 0, "core"],
    [["fix the bug"], 0, "legacy"],
    [["not-a-tool"], 0, "legacy"],
    [[], 0, "legacy"],
    [["codex"], 1, "legacy"],
  ];
  if (alias) rows.push([[alias], 0, "core"]);
  for (const [positionals, afterDashDash, expected] of rows) {
    assert.equal(
      legacyLaunchRoute(positionals, { afterDashDash, registry }),
      expected,
      JSON.stringify({ positionals, afterDashDash })
    );
  }
});

test("splitLaunchTail: option values are skipped, `--` counts, root-only options are dropped", () => {
  const valueFlags = new Set(["--port", "-m", "--model", "--output"]);
  const dropFlags = new Set(["--output", "-q"]);
  const a = splitLaunchTail(["--port", "3000", "codex", "--dry-run"], { valueFlags, dropFlags });
  assert.deepEqual(a.positionals, ["codex"]);
  assert.equal(a.afterDashDash, 0);
  assert.deepEqual(a.forwarded, ["--port", "3000", "codex", "--dry-run"]);
  assert.equal(legacyLaunchRoute(a.positionals, { ...a, registry: launchRegistry }), "core");

  const b = splitLaunchTail(["--", "codex"], { valueFlags, dropFlags });
  assert.deepEqual(b.positionals, ["codex"]);
  assert.equal(b.afterDashDash, 1);
  assert.equal(legacyLaunchRoute(b.positionals, { ...b, registry: launchRegistry }), "legacy");

  const c = splitLaunchTail(["-m", "x/y", "--output", "json", "-q", "codex", "--port=1"], {
    valueFlags,
    dropFlags,
  });
  assert.deepEqual(c.positionals, ["codex"]);
  assert.deepEqual(c.forwarded, ["-m", "x/y", "codex", "--port=1"]);
});

function harness(env: Record<string, string> = {}) {
  const calls: Array<{ toolId: string; flags: Record<string, unknown> }> = [];
  const legacyCalls: Array<{ opts: Record<string, unknown>; args: string[] }> = [];
  const codes: number[] = [];
  const stdout = sink();
  const stderr = sink();
  const deps = {
    registry: launchRegistry,
    env,
    stdout,
    stderr,
    setExitCode: (code: number) => codes.push(code),
    runLaunch: async (toolId: string, flags: Record<string, unknown>) => {
      calls.push({ toolId, flags });
      return { exitCode: 0, warnings: [] };
    },
    runLaunchCommand: async (opts: Record<string, unknown>, args: string[]) => {
      legacyCalls.push({ opts, args });
      return 7;
    },
  };
  const root = new Command();
  root.name("omniroute").exitOverride();
  root.option("--context <name>", "context");
  root.option("--output <format>", "output");
  root.option("--api-key <key>", "key");
  root.option("--base-url <url>", "url");
  registerLaunch(root, { deps });
  return { root, calls, legacyCalls, codes, stdout, stderr };
}

test("registerLaunch: `launch codex --dry-run` reaches the core with toolId codex", async () => {
  const h = harness();
  await h.root.parseAsync(["launch", "codex", "--dry-run"], { from: "user" });
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].toolId, "codex");
  assert.equal(h.calls[0].flags.dryRun, true);
  assert.equal(h.legacyCalls.length, 0);
  assert.deepEqual(h.codes, [0]);
  assert.equal(h.stderr.text, "", "no deprecation note on the core path");
});

test("registerLaunch: options before the tool are kept (`--port 3000 codex`)", async () => {
  const h = harness();
  await h.root.parseAsync(["launch", "--port", "3000", "codex", "--dry-run", "--", "--full-auto"], {
    from: "user",
  });
  assert.equal(h.calls[0].toolId, "codex");
  assert.equal(h.calls[0].flags.port, "3000");
  assert.deepEqual(h.calls[0].flags.args, ["--full-auto"]);
});

test("registerLaunch: root options typed before `launch` reach the core command", async () => {
  const h = harness();
  await h.root.parseAsync(["--context", "work", "--output", "json", "launch", "codex"], {
    from: "user",
  });
  assert.equal(h.calls[0].toolId, "codex");
  assert.equal(h.calls[0].flags.context, "work");
});

test("registerLaunch: `launch codex --help` prints the core help without exiting", async () => {
  const h = harness();
  await h.root.parseAsync(["launch", "codex", "--help"], { from: "user" });
  assert.equal(h.calls.length, 0);
  assert.deepEqual(h.codes, [0]);
  assert.match(h.stdout.text, /Launchable tools:/);
});

test("registerLaunch: `launch --help` keeps the legacy help (with --start)", async () => {
  const h = harness();
  let out = "";
  h.root.configureOutput({ writeOut: (s: string) => (out += s) });
  for (const sub of h.root.commands) sub.configureOutput({ writeOut: (s: string) => (out += s) });
  await assert.rejects(
    h.root.parseAsync(["launch", "--help"], { from: "user" }),
    (error: { code?: string }) => error.code === "commander.helpDisplayed"
  );
  assert.match(out, /claudeArgs/);
  assert.match(out, /--start/);
  assert.equal(h.calls.length + h.legacyCalls.length, 0);
});

test("registerLaunch: `launch -- codex` stays legacy (claude with prompt codex) + note", async () => {
  const h = harness();
  await h.root.parseAsync(["launch", "--", "codex"], { from: "user" });
  assert.equal(h.calls.length, 0);
  assert.equal(h.legacyCalls.length, 1);
  assert.deepEqual(h.legacyCalls[0].args, ["codex"]);
  assert.deepEqual(h.codes, [7]);
  assert.match(h.stderr.text, /deprecated/);
  assert.equal(h.stderr.text.split("\n").filter(Boolean).length, 1, "one line");
});

test("registerLaunch: unknown first word is legacy; note silenced by OMNIROUTE_NO_DEPRECATION", async () => {
  const h = harness({ OMNIROUTE_NO_DEPRECATION: "1" });
  await h.root.parseAsync(["launch", "--port", "3001", "fix", "it"], { from: "user" });
  assert.equal(h.legacyCalls.length, 1);
  assert.deepEqual(h.legacyCalls[0].args, ["fix", "it"]);
  assert.equal(h.legacyCalls[0].opts.port, "3001");
  assert.equal(h.stderr.text, "");
});

test("registerLaunch: legacy `--start` runs runLaunch('claude') with the claude args", async () => {
  const h = harness({ OMNIROUTE_NO_DEPRECATION: "1" });
  await h.root.parseAsync(
    ["launch", "--start", "--token", "tk", "--profile", "work", "--inherit-env", "-p", "@x hi"],
    { from: "user" }
  );
  assert.equal(h.legacyCalls.length, 0);
  assert.equal(h.calls.length, 1);
  const { toolId, flags } = h.calls[0];
  assert.equal(toolId, "claude");
  assert.deepEqual(flags.args, ["-p", "@x hi"]);
  assert.equal(flags.start, true);
  assert.equal(flags.noStart, false);
  assert.equal(flags.token, "tk");
  assert.equal(flags.profile, "work");
  assert.equal(flags.inheritEnv, true);
  assert.equal(flags.preset, undefined);
  assert.deepEqual(h.codes, [0]);
});

test("registerLaunch(program) with no options still registers the legacy command", () => {
  const root = new Command();
  const cmd = registerLaunch(root);
  assert.equal(cmd.name(), "launch");
  assert.ok(cmd.options.some((o: { long?: string }) => o.long === "--start"));
});

// --- env parity: buildClaudeEnv vs the claude adapter plan ----------------------------------

function adapterEnv(overrides: Record<string, unknown>, token?: string) {
  const ctx = fixtureCtx({
    tool: "claude",
    version: "2.1.300",
    viewSpec: claudeAdapter.capabilities.modelList.view,
    ...overrides,
  });
  const plan = claudeAdapter.plan(ctx);
  return substitutePlan(plan, { token }).env.set as Record<string, string>;
}

test("env parity: base URL and an explicit token agree", () => {
  const legacy = buildClaudeEnv({ PATH: "/bin" }, "http://127.0.0.1:20128/", "tok-1");
  const core = adapterEnv({ rootUrl: "http://127.0.0.1:20128/" }, "tok-1");
  assert.equal(core.ANTHROPIC_BASE_URL, legacy.ANTHROPIC_BASE_URL);
  assert.equal(core.ANTHROPIC_AUTH_TOKEN, legacy.ANTHROPIC_AUTH_TOKEN);
  assert.equal(legacy.ANTHROPIC_AUTH_TOKEN, "tok-1");
});

test("env parity: claudeWindowEnv keys agree for the routed model's window", () => {
  for (const model of ["anthropic/claude-sonnet-4-6", "small/ctx-32k", "openai/gpt-5.2"]) {
    const core = adapterEnv({ model });
    const row = fixtureCtx({
      viewSpec: claudeAdapter.capabilities.modelList.view,
      model,
    }).model as { contextTokens: number };
    const legacy = buildClaudeEnv({ PATH: "/bin" }, 20128, "t", {
      contextWindow: row.contextTokens,
    });
    for (const key of Object.keys(claudeWindowEnv(row.contextTokens))) {
      assert.equal(core[key], legacy[key], `${model} ${key}`);
    }
    for (const key of ["CLAUDE_CODE_AUTO_COMPACT_WINDOW", "CLAUDE_CODE_MAX_CONTEXT_TOKENS"]) {
      assert.equal(core[key], legacy[key], `${model} ${key} (absent on both or equal)`);
    }
  }
});

test("env parity: a profile maps to the same CLAUDE_CONFIG_DIR", () => {
  const home = "/home/fixture";
  const legacy = buildClaudeEnv({ PATH: "/bin" }, 20128, "t", {
    configDir: join(home, ".claude", "profiles", "work"),
  });
  const core = adapterEnv({ home, profile: "work" });
  assert.equal(core.CLAUDE_CONFIG_DIR, legacy.CLAUDE_CONFIG_DIR);
});

// --- execution through the core executor ----------------------------------------------------

const posixOnly = process.platform === "win32" ? "POSIX fake binaries" : false;

function fakeTool(dir: string, name: string, out: string) {
  const js = join(dir, `${name}.cjs`);
  writeFileSync(
    js,
    [
      'const fs = require("node:fs");',
      "const keys = ['ANTHROPIC_BASE_URL','ANTHROPIC_AUTH_TOKEN','CLAUDE_CODE_AUTO_COMPACT_WINDOW',",
      "  'LEGACY_MARK','CLAUDE_CONFIG_DIR','ANTHROPIC_API_KEY'];",
      "const env = {}; for (const k of keys) if (k in process.env) env[k] = process.env[k];",
      `fs.writeFileSync(${JSON.stringify(out)}, JSON.stringify({ env, argv: process.argv.slice(2) }));`,
      "const exit = process.argv.slice(2).find((a) => a.startsWith('exit='));",
      "if (process.argv.includes('sleep')) setTimeout(() => {}, 20000);",
      "else process.exit(exit ? Number(exit.slice(5)) : 0);",
    ].join("\n")
  );
  const bin = join(dir, name);
  writeFileSync(
    bin,
    `#!/bin/sh\nexec ${JSON.stringify(process.execPath)} ${JSON.stringify(js)} "$@"\n`
  );
  chmodSync(bin, 0o755);
  return bin;
}

test(
  "executeLegacyLaunch: env arrives verbatim, exit code propagates",
  { skip: posixOnly },
  async () => {
    const dir = tempRoot("exec");
    const out = join(dir, "seen.json");
    const bin = fakeTool(dir, "tool", out);
    const env = { PATH: process.env.PATH ?? "/bin", LEGACY_MARK: "a b $c", ANTHROPIC_API_KEY: "" };
    const code = await executeLegacyLaunch({
      command: bin,
      args: ["two words", "exit=5"],
      env,
      notFoundMessage: "nope",
      stdio: "ignore",
      signalSource: new EventEmitter(),
    });
    assert.equal(code, 5);
    const seen = JSON.parse(readFileSync(out, "utf8"));
    assert.deepEqual(seen.argv, ["two words", "exit=5"]);
    assert.deepEqual(seen.env, { LEGACY_MARK: "a b $c", ANTHROPIC_API_KEY: "" });
  }
);

test("executeLegacyLaunch: missing binary gives 127 and the not-found message", async () => {
  const stderr = sink();
  const code = await executeLegacyLaunch({
    command: join(tempRoot("missing"), "no-such-tool"),
    env: { PATH: "/nonexistent" },
    notFoundMessage: "The 'claude' CLI was not found in PATH.",
    stdio: "ignore",
    signalSource: new EventEmitter(),
    stderr,
  });
  assert.equal(code, 127);
  assert.equal(stderr.text, "The 'claude' CLI was not found in PATH.\n");
});

test("executeLegacyLaunch: a forwarded SIGTERM exits 143", { skip: posixOnly }, async () => {
  const dir = tempRoot("signal");
  const out = join(dir, "seen.json");
  const bin = fakeTool(dir, "tool", out);
  const signals = new EventEmitter();
  const done = executeLegacyLaunch({
    command: bin,
    args: ["sleep"],
    env: { PATH: process.env.PATH ?? "/bin" },
    notFoundMessage: "nope",
    stdio: "ignore",
    signalSource: signals,
    signalTimeoutMs: 2000,
  });
  for (let i = 0; i < 100; i++) {
    try {
      readFileSync(out);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 20));
    }
  }
  signals.emit("SIGTERM");
  assert.equal(await done, 143);
  assert.equal(signals.listenerCount("SIGTERM"), 0, "handlers removed");
});

async function stubGateway(catalog: unknown) {
  const server = http.createServer((req, res) => {
    res.setHeader("content-type", "application/json");
    if (req.url === "/api/monitoring/health") res.end("{}");
    else if (req.url === "/v1/models") res.end(JSON.stringify(catalog));
    else {
      res.statusCode = 404;
      res.end("{}");
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return { url: `http://127.0.0.1:${port}`, close: () => server.close() };
}

test(
  "runLaunchCommand: spawns claude via core with the buildClaudeEnv env",
  { skip: posixOnly },
  async () => {
    const dir = tempRoot("run");
    const binDir = join(dir, "bin");
    mkdirSync(binDir);
    const out = join(dir, "seen.json");
    fakeTool(binDir, "claude", out);
    const gw = await stubGateway({ data: [{ id: "glm/glm-5.2", max_input_tokens: 131072 }] });
    const originalPath = process.env.PATH;
    process.env.PATH = `${binDir}${delimiter}${originalPath}`;
    try {
      const code = await runLaunchCommand(
        { remote: gw.url, token: "tok-9", profile: "work", claudeHome: join(dir, "claude-home") },
        ["--model", "glm/glm-5.2", "exit=3"]
      );
      assert.equal(code, 3);
      const seen = JSON.parse(readFileSync(out, "utf8"));
      assert.deepEqual(seen.argv, ["--model", "glm/glm-5.2", "exit=3"]);
      assert.equal(seen.env.ANTHROPIC_BASE_URL, gw.url);
      assert.equal(seen.env.ANTHROPIC_AUTH_TOKEN, "tok-9");
      assert.equal(seen.env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "111411");
      assert.equal(seen.env.CLAUDE_CONFIG_DIR, join(dir, "claude-home", "profiles", "work"));
    } finally {
      process.env.PATH = originalPath;
      gw.close();
    }
  }
);

test("runLaunchCommand: missing claude returns 127", { skip: posixOnly }, async () => {
  const gw = await stubGateway({ data: [] });
  const originalPath = process.env.PATH;
  const originalError = console.error;
  const lines: string[] = [];
  process.env.PATH = join(tempRoot("nopath"), "empty");
  try {
    const stderrWrite = process.stderr.write.bind(process.stderr);
    (process.stderr as unknown as { write: (s: string) => boolean }).write = (s: string) => (
      lines.push(String(s)),
      true
    );
    try {
      const code = await runLaunchCommand({ remote: gw.url, token: "t" }, []);
      assert.equal(code, 127);
    } finally {
      (process.stderr as unknown as { write: typeof stderrWrite }).write = stderrWrite;
    }
    assert.match(lines.join(""), /not found/);
  } finally {
    process.env.PATH = originalPath;
    console.error = originalError;
    gw.close();
  }
});

test("runLaunchCommand: unreachable gateway exits 1 without spawning", async () => {
  const gw = await stubGateway({ data: [] });
  const url = gw.url;
  gw.close();
  const originalError = console.error;
  const lines: string[] = [];
  console.error = (...args: unknown[]) => lines.push(args.join(" "));
  try {
    assert.equal(await runLaunchCommand({ remote: url, token: "t" }, []), 1);
  } finally {
    console.error = originalError;
  }
  assert.match(lines.join("\n"), /not reachable/);
});
