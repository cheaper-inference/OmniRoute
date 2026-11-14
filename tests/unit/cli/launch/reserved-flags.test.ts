// Reserved v1.x flags: parsed by commander, hidden from help, rejected by core with exit 2.

import test from "node:test";
import assert from "node:assert/strict";
import { Command } from "commander";

import { defineAdapter, createPlan } from "../../../../bin/cli/launch/contract.mjs";
import { buildLaunchFlags, registerLaunchCommand } from "../../../../bin/cli/launch/command.mjs";

function sink() {
  return {
    chunks: [] as string[],
    write(s: unknown) {
      this.chunks.push(String(s));
      return true;
    },
    text() {
      return this.chunks.join("");
    },
  };
}

const fakeAdapter = defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "claude",
  binaries: ["claude"],
  capabilities: {
    protocol: "openai-chat",
    modelList: {
      strategy: "inject",
      view: { name: "fake", filter: { capabilities: ["tools"] }, order: "preferences" },
    },
    model: "optional",
    install: { commands: { any: ["npm i -g claude"] } },
    supportsProfile: false,
    platforms: ["linux", "darwin", "win32"],
    tier: "core",
    passthrough: [],
  },
  plan() {
    return createPlan("claude", { argv: ["claude"], env: { set: {}, unset: [] } });
  },
});

const fakeRegistry = {
  get: (id: string) => (id === "claude" ? fakeAdapter : undefined),
  list: () => [fakeAdapter],
  aliasesOf: () => [] as string[],
};

const launchDeps = {
  acquireGateway: () => {
    throw new Error("must not be reached");
  },
};

function setup(extraDeps: Record<string, unknown> = {}) {
  const program = new Command().exitOverride();
  const stdout = sink();
  const stderr = sink();
  const state = { code: undefined as number | undefined };
  const cmd = registerLaunchCommand(program, {
    deps: {
      registry: fakeRegistry,
      setExitCode: (c: number) => {
        state.code = c;
      },
      stdout,
      stderr,
      launchDeps: { ...launchDeps, stdout, stderr },
      ...extraDeps,
    },
  });
  return { program, cmd, stdout, stderr, state };
}

const CASES: Array<{ name: string; argv: string[]; spelled: string }> = [
  { name: "--budget", argv: ["--budget", "5"], spelled: "--budget" },
  { name: "--budget-fallback", argv: ["--budget-fallback", "m"], spelled: "--budget-fallback" },
  { name: "--mode", argv: ["--mode", "fast"], spelled: "--mode" },
  { name: "--compression", argv: ["--compression", "high"], spelled: "--compression" },
  { name: "--mcp", argv: ["--mcp"], spelled: "--mcp" },
  { name: "--statusline", argv: ["--statusline"], spelled: "--statusline" },
  { name: "--exec", argv: ["--exec", "hi"], spelled: "--exec" },
  { name: "--install", argv: ["--install"], spelled: "--install" },
  { name: "@preset after tool", argv: ["@mypreset"], spelled: "@" },
];

for (const c of CASES) {
  test(`reserved ${c.name} is rejected with exit 2`, async () => {
    const { program, stderr, state } = setup();
    await program.parseAsync(["launch", "claude", ...c.argv], { from: "user" });
    assert.equal(state.code, 2);
    assert.match(stderr.text(), /not yet supported/);
    assert.ok(stderr.text().includes(c.spelled), stderr.text());
  });

  test(`reserved ${c.name} with --json prints a UsageError document`, async () => {
    const { program, stdout, state } = setup();
    await program.parseAsync(["launch", "claude", ...c.argv, "--json"], { from: "user" });
    assert.equal(state.code, 2);
    const doc = JSON.parse(stdout.text());
    assert.equal(doc.error.code, "UsageError");
    assert.match(doc.error.message, /not yet supported/);
    assert.ok(doc.error.message.includes(c.spelled), doc.error.message);
  });
}

test("@preset before the tool is rejected too", async () => {
  const { program, stderr, state } = setup();
  await program.parseAsync(["launch", "@mypreset", "claude"], { from: "user" });
  assert.equal(state.code, 2);
  assert.match(stderr.text(), /not yet supported/);
});

test("reserved flags are hidden from launch --help", () => {
  const { cmd } = setup();
  const help = cmd.helpInformation();
  assert.match(help, /--dry-run/);
  for (const flag of [
    "--budget",
    "--budget-fallback",
    "--mode",
    "--compression",
    "--mcp",
    "--statusline",
    "--exec",
    "--install",
  ]) {
    assert.ok(!help.includes(`${flag} `) && !help.includes(`${flag}\n`), `${flag} visible`);
  }
});

test("a non-reserved launch is not rejected and reaches runLaunch", async () => {
  const calls: unknown[][] = [];
  const { program, state, stderr } = setup({
    runLaunch: async (...args: unknown[]) => {
      calls.push(args);
      return { exitCode: 0 };
    },
  });
  await program.parseAsync(["launch", "claude", "--dry-run"], { from: "user" });
  assert.equal(state.code, 0);
  assert.equal(stderr.text(), "");
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "claude");
  assert.equal((calls[0][1] as { dryRun: boolean }).dryRun, true);
});

test("buildLaunchFlags maps @x to flags.preset", () => {
  const a = buildLaunchFlags("@x", ["claude"], {});
  assert.equal(a.flags.preset, "@x");
  assert.equal(a.toolId, "claude");
  const b = buildLaunchFlags("claude", ["@y"], {});
  assert.equal(b.flags.preset, "@y");
  assert.equal(b.toolId, "claude");
  assert.deepEqual(buildLaunchFlags("claude", [], {}).flags.preset, undefined);
});
