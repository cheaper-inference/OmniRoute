// pluginManager.activate() wires PLUGIN_PERMISSION_MODEL_ENABLED into the loader: with the
// flag on, an activated plugin that declares no permissions cannot read a file outside its
// directory or spawn a child process; with it off (the default) both still work.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE_DIR = await mkdtemp(join(tmpdir(), "omniroute-plugin-perm-manager-"));
const PLUGIN_ROOT = join(BASE_DIR, "plugins");
const SOURCE_ROOT = join(BASE_DIR, "plugin-sources");
const OUTSIDE_FILE = join(BASE_DIR, "outside", "secret.txt");

const ORIGINAL_ENV = {
  OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR,
  PLUGIN_PERMISSION_MODEL_ENABLED: process.env.PLUGIN_PERMISSION_MODEL_ENABLED,
};
process.env.OMNIROUTE_PLUGINS_DIR = PLUGIN_ROOT;
delete process.env.PLUGIN_PERMISSION_MODEL_ENABLED;

await mkdir(PLUGIN_ROOT, { recursive: true });
await mkdir(join(BASE_DIR, "outside"), { recursive: true });
await writeFile(OUTSIDE_FILE, "outside-secret", "utf-8");

const core = await import("../../src/lib/db/core.ts");
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");

test.after(async () => {
  for (const name of ["perm-manager-off", "perm-manager-on"]) {
    await pluginManager.deactivate(name).catch(() => {});
  }
  core.resetDbInstance();
  await rm(BASE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

async function writeProbePlugin(name: string): Promise<string> {
  const dir = join(SOURCE_ROOT, name);
  await mkdir(dir, { recursive: true });
  await writeFile(
    join(dir, "plugin.json"),
    JSON.stringify({
      name,
      version: "1.0.0",
      main: "index.mjs",
      hooks: { onRequest: true },
      requires: { permissions: [] },
    })
  );
  await writeFile(
    join(dir, "index.mjs"),
    `
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (err) {
    return { ok: false, code: err && err.code ? err.code : String(err) };
  }
}
export async function onRequest(ctx) {
  return {
    metadata: {
      outsideRead: attempt(() => readFileSync(ctx.metadata.outsideFile, "utf-8")),
      exec: attempt(() =>
        execFileSync(process.execPath, ["-e", "process.stdout.write('child-ran')"]).toString()
      ),
    },
  };
}
`
  );
  return dir;
}

async function probeActivated(name: string) {
  await pluginManager.install(await writeProbePlugin(name));
  await pluginManager.activate(name);
  const loaded = pluginManager.getLoaded(name);
  assert.ok(loaded?.plugin.onRequest, `${name} must be loaded with an onRequest hook`);
  const result = (await loaded.plugin.onRequest({
    requestId: name,
    body: {},
    model: "m",
    metadata: { outsideFile: OUTSIDE_FILE },
  })) as { metadata?: Record<string, unknown> } | undefined;
  assert.ok(result?.metadata, `${name} must answer its onRequest hook`);
  return result.metadata;
}

test(
  "flag off (default): an activated plugin keeps full process privileges",
  {
    timeout: 60_000,
  },
  async () => {
    const probe = await probeActivated("perm-manager-off");
    assert.deepEqual(probe.outsideRead, { ok: true, value: "outside-secret" });
    assert.deepEqual(probe.exec, { ok: true, value: "child-ran" });
  }
);

test(
  "flag on: an activated plugin without permissions is confined",
  {
    timeout: 60_000,
  },
  async () => {
    process.env.PLUGIN_PERMISSION_MODEL_ENABLED = "true";
    try {
      const probe = await probeActivated("perm-manager-on");
      assert.deepEqual(probe.outsideRead, { ok: false, code: "ERR_ACCESS_DENIED" });
      assert.deepEqual(probe.exec, { ok: false, code: "ERR_ACCESS_DENIED" });
    } finally {
      delete process.env.PLUGIN_PERMISSION_MODEL_ENABLED;
    }
  }
);
