import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Command } from "commander";

const WORKTREE_ROOT = path.resolve(import.meta.dirname, "../..");

// ─── 1. bin/omniroute.mjs wiring ──────────────────────────────────────────────

test("#21056: bin/omniroute.mjs imports and invokes loadPlugins before parseAsync", () => {
  const omnirouteSrc = fs.readFileSync(path.join(WORKTREE_ROOT, "bin/omniroute.mjs"), "utf8");
  assert.match(
    omnirouteSrc,
    /loadPlugins/,
    "bin/omniroute.mjs must import or reference loadPlugins"
  );
  assert.match(
    omnirouteSrc,
    /await\s+loadPlugins\s*\(\s*program\s*\)/,
    "bin/omniroute.mjs must await loadPlugins(program) before parsing args"
  );
});

// ─── 2. loadPlugins end-to-end registration ───────────────────────────────────

test("#21056: loadPlugins registers custom plugin commands onto the Commander program", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-test-"));
  const prevPluginPath = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = tmpDir;

  try {
    // Create a mock plugin package in tmpDir
    const pluginDir = path.join(tmpDir, "omniroute-cmd-greeter");
    fs.mkdirSync(pluginDir, { recursive: true });
    fs.writeFileSync(
      path.join(pluginDir, "package.json"),
      JSON.stringify({
        name: "omniroute-cmd-greeter",
        version: "1.0.0",
        description: "Test greeter plugin",
        main: "index.mjs",
      })
    );
    fs.writeFileSync(
      path.join(pluginDir, "index.mjs"),
      `export function register(program, ctx) {
        program
          .command("greeter")
          .description("Greeter command")
          .action(() => {});
      }`
    );

    const { loadPlugins } = await import("../../bin/cli/plugins.mjs");
    const program = new Command();
    program.name("omniroute");

    const loadedCount = await loadPlugins(program);
    assert.equal(loadedCount, 1, "must discover and load 1 plugin");

    const greeterCmd = program.commands.find((c) => c.name() === "greeter");
    assert.ok(greeterCmd, "command 'greeter' from the plugin must be registered on program");
    assert.equal(greeterCmd.description(), "Greeter command");
  } finally {
    if (prevPluginPath !== undefined) {
      process.env.OMNIROUTE_PLUGIN_PATH = prevPluginPath;
    } else {
      delete process.env.OMNIROUTE_PLUGIN_PATH;
    }
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ─── 3. Windows-safe npm invocation in bin/cli/commands/plugin.mjs ────────────

test("#21056: plugin.mjs routes npm execution through npm-exec helper for Windows safety", () => {
  const pluginSrc = fs.readFileSync(
    path.join(WORKTREE_ROOT, "bin/cli/commands/plugin.mjs"),
    "utf8"
  );

  // Must not spawn bare "npm" literal without the helper
  assert.equal(
    /spawnSync\(\s*["']npm["']/.test(pluginSrc),
    false,
    "plugin.mjs must not spawn literal 'npm' without resolving platform wrapper"
  );

  // Must import npmBin and npmExecInvocation from npm-exec.mjs
  assert.match(
    pluginSrc,
    /npmExecInvocation/,
    "plugin.mjs must use npmExecInvocation from ../npm-exec.mjs for Windows safety"
  );
});

// ─── 4. Error messages in plugin install / remove ─────────────────────────────

test("#21056: error handlers in plugin install/remove include underlying error message", () => {
  const pluginSrc = fs.readFileSync(
    path.join(WORKTREE_ROOT, "bin/cli/commands/plugin.mjs"),
    "utf8"
  );

  // Catch blocks must not swallow err.message
  assert.match(
    pluginSrc,
    /catch\s*\(\s*err\s*\)\s*\{[\s\S]*?err\.message/,
    "plugin.mjs catch block must print err.message when install/remove fails"
  );
});

// ─── 5. Scaffold template engine version ─────────────────────────────────────

test("#21056: plugin scaffold does not require an impossible >=4.0.0 engine", () => {
  const pluginSrc = fs.readFileSync(
    path.join(WORKTREE_ROOT, "bin/cli/commands/plugin.mjs"),
    "utf8"
  );

  // Should not hardcode >=4.0.0 which misleadingly breaks on 3.8.x
  assert.equal(
    />=4\.0\.0/.test(pluginSrc),
    false,
    "plugin scaffold template must not hardcode '>=4.0.0' for 3.8.x releases"
  );
});

// ─── 6. Plugin discovery in node_modules and user plugin directory ────────────

test("#21056: discoverPlugins finds plugins inside node_modules directory", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-nm-test-"));
  const prevPluginPath = process.env.OMNIROUTE_PLUGIN_PATH;
  process.env.OMNIROUTE_PLUGIN_PATH = tmpDir;

  try {
    // Simulate npm install into node_modules
    const nmPluginDir = path.join(tmpDir, "node_modules", "omniroute-cmd-helper");
    fs.mkdirSync(nmPluginDir, { recursive: true });
    fs.writeFileSync(
      path.join(nmPluginDir, "package.json"),
      JSON.stringify({
        name: "omniroute-cmd-helper",
        version: "2.1.0",
        description: "Helper plugin in node_modules",
        main: "index.mjs",
      })
    );

    const { discoverPlugins } = await import("../../bin/cli/plugins.mjs");
    const plugins = await discoverPlugins();

    const helperPlugin = plugins.find((p) => p.name === "omniroute-cmd-helper");
    assert.ok(helperPlugin, "plugin installed in node_modules must be discovered");
    assert.equal(helperPlugin.version, "2.1.0");
  } finally {
    if (prevPluginPath !== undefined) {
      process.env.OMNIROUTE_PLUGIN_PATH = prevPluginPath;
    } else {
      delete process.env.OMNIROUTE_PLUGIN_PATH;
    }
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
