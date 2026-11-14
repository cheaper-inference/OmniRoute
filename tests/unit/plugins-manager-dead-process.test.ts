// A plugin process that dies is never respawned (loader). The manager must act on the report:
// drop the plugin's hooks, forget the loaded handle, mark the row `error` and write an audit row.
// Before, the dashboard kept listing the dead plugin (and a dead blocking plugin) as active.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before any module that imports core.ts is loaded.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-dead-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
const { getHooks, resetHooks } = await import("../../src/lib/plugins/hooks.ts");
const { getAuditLog } = await import("../../src/lib/compliance/index.ts");

const sourceDirs: string[] = [];

function writePlugin(name: string, indexJs: string) {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dead-src-"));
  const pluginDir = path.join(sourceDir, name);
  fs.mkdirSync(pluginDir, { recursive: true });
  fs.writeFileSync(
    path.join(pluginDir, "plugin.json"),
    JSON.stringify({
      name,
      version: "1.0.0",
      description: "Dead process test plugin",
      main: "index.js",
      hooks: { onRequest: true },
      enabledByDefault: false,
      requires: { permissions: [] },
    })
  );
  fs.writeFileSync(path.join(pluginDir, "index.js"), indexJs);
  sourceDirs.push(sourceDir);
  return { sourceDir, name };
}

const DIES_ON_REQUEST = `module.exports = {
  onRequest: function (ctx) {
    if (ctx.body && ctx.body.die) process.exit(7);
    return { metadata: { alive: true } };
  },
};`;

async function waitFor(pred: () => boolean, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) await new Promise((r) => setTimeout(r, 25));
}

const hookCtx = (body: unknown) =>
  ({ requestId: "req-dead", body, model: "m", provider: "p", metadata: {} }) as never;

test.beforeEach(() => {
  core.resetDbInstance();
  resetHooks();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  for (const dir of sourceDirs) fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5 });
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test(
  "a plugin whose process dies is unregistered, marked error and audited",
  { timeout: 20_000 },
  async () => {
    const { sourceDir, name } = writePlugin("dies-once", DIES_ON_REQUEST);
    await pluginManager.install(sourceDir);
    await pluginManager.activate(name);
    assert.ok(
      getHooks("onRequest").find((r) => r.pluginName === name),
      "hook registered"
    );

    const loaded = pluginManager.getLoaded(name);
    assert.ok(loaded);
    // The plugin process exits mid-call. The hook wrapper fails open, so the call resolves.
    assert.equal(await loaded.plugin.onRequest!(hookCtx({ die: true })), undefined);
    await waitFor(() => pluginManager.getLoaded(name) === undefined);

    assert.equal(pluginManager.getLoaded(name), undefined, "dead handle is dropped");
    assert.equal(
      getHooks("onRequest").find((r) => r.pluginName === name),
      undefined,
      "dead plugin keeps no hooks"
    );
    const row = dbPlugins.getPluginByName(name);
    assert.equal(row?.status, "error");
    assert.match(String(row?.errorMessage ?? ""), /exited unexpectedly \(code 7\)/);
    const audit = getAuditLog({ action: "plugin.process_dead" });
    assert.equal(audit.length, 1);
    assert.equal(audit[0].target, name);

    await pluginManager.uninstall(name);
  }
);

test(
  "a plugin that is deactivated on purpose is not reported dead",
  { timeout: 20_000 },
  async () => {
    const { sourceDir, name } = writePlugin("stays-calm", DIES_ON_REQUEST);
    await pluginManager.install(sourceDir);
    await pluginManager.activate(name);
    await pluginManager.deactivate(name);
    await new Promise((r) => setTimeout(r, 300));

    assert.equal(dbPlugins.getPluginByName(name)?.status, "inactive");
    assert.equal(getAuditLog({ action: "plugin.process_dead" }).length, 0);

    await pluginManager.uninstall(name);
  }
);
