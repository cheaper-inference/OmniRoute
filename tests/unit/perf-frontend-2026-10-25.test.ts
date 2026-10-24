import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { Command } from "commander";
import nextConfig from "../../next.config.mjs";
import { registerCommands } from "../../bin/cli/commands/registry.mjs";

test("nextConfig.experimental.optimizePackageImports includes barrel packages and omits typo at runtime", () => {
  const imports = nextConfig.experimental?.optimizePackageImports;
  assert.ok(Array.isArray(imports));

  assert.equal(imports.includes("@lobehub/icons"), true);
  assert.equal(imports.includes("lobehub/icons"), false);
  assert.equal(imports.includes("@xyflow/react"), true);
  assert.equal(imports.includes("recharts"), true);
  assert.equal(imports.includes("@dnd-kit/core"), true);
  assert.equal(imports.includes("lucide-react"), true);
});

test("registerCommands registers Commander subcommands with options and fast execution time", () => {
  const program = new Command();

  const start = performance.now();
  registerCommands(program);
  const duration = performance.now() - start;

  assert.ok(duration < 250);
  assert.ok(program.commands.length >= 80);

  const commandNames = program.commands.map((cmd) => cmd.name());
  assert.equal(commandNames.includes("policy"), true);
  assert.equal(commandNames.includes("memory"), true);
  assert.equal(commandNames.includes("stop"), true);
  assert.equal(commandNames.includes("setup-qwen"), true);
  assert.equal(commandNames.includes("models"), true);
  assert.equal(commandNames.includes("health"), true);
  assert.equal(commandNames.includes("config"), true);

  const stopCmd = program.commands.find((cmd) => cmd.name() === "stop");
  assert.ok(stopCmd);
  const stopOptionFlags = stopCmd.options.map((opt) => opt.flags);
  assert.ok(stopOptionFlags.some((flag) => flag.includes("--port")));

  const policyCmd = program.commands.find((cmd) => cmd.name() === "policy");
  assert.ok(policyCmd);
  const policySubcommandNames = policyCmd.commands.map((cmd) => cmd.name());
  assert.equal(policySubcommandNames.includes("create"), true);
  assert.equal(policySubcommandNames.includes("update"), true);
  assert.equal(policySubcommandNames.includes("delete"), true);
  assert.equal(policySubcommandNames.includes("evaluate"), true);
  assert.equal(policySubcommandNames.includes("export"), true);
  assert.equal(policySubcommandNames.includes("import"), true);
});
