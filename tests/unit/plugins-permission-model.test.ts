// Opt-in Node.js permission model for plugin processes (PLUGIN_PERMISSION_MODEL_ENABLED).
//
// With the flag off, a plugin is spawned exactly as before: a plugin that declares no
// permissions can still read any file the OmniRoute user can and run child processes.
// With it on, the same plugin is confined to its own directory: reading a file outside it
// and spawning a child process both fail with ERR_ACCESS_DENIED. Declared `file-write`
// opens the plugin's data directory for writes and declared `exec` allows child processes.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadPlugin, type LoadedPlugin } from "../../src/lib/plugins/loader.ts";
import type { Permission, PluginManifestWithDefaults } from "../../src/lib/plugins/manifest.ts";
import {
  buildPermissionModelArgs,
  getPluginDataDir,
  resolvePermissionFlag,
} from "../../src/lib/plugins/permissionModel.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

const BASE_DIR = await mkdtemp(join(tmpdir(), "omniroute-plugin-permission-model-"));
const PLUGIN_DIR = join(BASE_DIR, "plugins", "perm-probe");
const DATA_DIR = join(BASE_DIR, "plugin-data", "perm-probe");
const OUTSIDE_FILE = join(BASE_DIR, "outside", "secret.txt");
const ENTRY = join(PLUGIN_DIR, "index.mjs");

await mkdir(PLUGIN_DIR, { recursive: true });
await mkdir(join(BASE_DIR, "outside"), { recursive: true });
await writeFile(OUTSIDE_FILE, "outside-secret", "utf-8");
// The probe reports what it could do through its onRequest return value, so the test
// does not depend on the probe being able to write anywhere.
await writeFile(
  ENTRY,
  `
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (err) {
    return { ok: false, code: err && err.code ? err.code : String(err) };
  }
}
export async function onRequest(ctx) {
  const outsideFile = ctx.metadata.outsideFile;
  const dataDir = process.env.PLUGIN_DATA_DIR || ctx.metadata.dataDir;
  return {
    metadata: {
      ownRead: attempt(() => readFileSync(new URL(import.meta.url), "utf-8").length > 0),
      outsideRead: attempt(() => readFileSync(outsideFile, "utf-8")),
      exec: attempt(() =>
        execFileSync(process.execPath, ["-e", "process.stdout.write('child-ran')"]).toString()
      ),
      dataWrite: attempt(() => {
        writeFileSync(join(dataDir, "probe.txt"), "written");
        return readFileSync(join(dataDir, "probe.txt"), "utf-8");
      }),
      pluginDataDirEnv: process.env.PLUGIN_DATA_DIR ?? null,
    },
  };
}
`,
  "utf-8"
);

test.after(async () => {
  await rm(BASE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeManifest(permissions: Permission[]): PluginManifestWithDefaults {
  return {
    name: "perm-probe",
    version: "1.0.0",
    license: "MIT",
    main: "index.mjs",
    source: "local",
    tags: [],
    requires: { permissions },
    hooks: {
      onRequest: true,
      onResponse: false,
      onError: false,
      onInstall: false,
      onActivate: false,
      onDeactivate: false,
      onUninstall: false,
      onStreamComplete: false,
    },
    skills: [],
    enabledByDefault: false,
    configSchema: {},
  } as PluginManifestWithDefaults;
}

type Attempt = { ok: boolean; value?: unknown; code?: string };
type Probe = {
  ownRead: Attempt;
  outsideRead: Attempt;
  exec: Attempt;
  dataWrite: Attempt;
  pluginDataDirEnv: string | null;
};

async function runProbe(
  permissions: Permission[],
  options: Parameters<typeof loadPlugin>[2]
): Promise<Probe> {
  let loaded: LoadedPlugin | undefined;
  try {
    loaded = await loadPlugin(ENTRY, makeManifest(permissions), {
      hookTimeoutMs: 20_000,
      ...options,
    });
    const result = (await loaded.plugin.onRequest?.({
      requestId: "perm-probe",
      body: {},
      model: "m",
      metadata: { outsideFile: OUTSIDE_FILE, dataDir: DATA_DIR },
    })) as { metadata?: Probe } | undefined;
    assert.ok(result?.metadata, "the probe plugin must answer its onRequest hook");
    return result.metadata;
  } finally {
    loaded?.cleanup();
  }
}

test("the permission model flag is defined and off by default", () => {
  const flag = FEATURE_FLAG_DEFINITIONS.find(
    (entry) => entry.key === "PLUGIN_PERMISSION_MODEL_ENABLED"
  );
  assert.ok(flag, "PLUGIN_PERMISSION_MODEL_ENABLED must be a defined feature flag");
  assert.equal(flag.defaultValue, "false");
  assert.equal(flag.type, "boolean");
  assert.equal(flag.category, "security");
});

test(
  "flag off: a plugin without permissions still reads outside its dir and runs children",
  {
    timeout: 60_000,
  },
  async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const probe = await runProbe([], {});
    assert.equal(probe.ownRead.ok, true);
    assert.deepEqual(probe.outsideRead, { ok: true, value: "outside-secret" });
    assert.deepEqual(probe.exec, { ok: true, value: "child-ran" });
    assert.equal(probe.dataWrite.ok, true);
    assert.equal(probe.pluginDataDirEnv, null, "flag off must not change the plugin env");
  }
);

test(
  "flag on: a plugin without permissions cannot read outside its dir or run children",
  {
    timeout: 60_000,
  },
  async () => {
    const probe = await runProbe([], {
      permissionModel: true,
      pluginDir: PLUGIN_DIR,
      dataDir: DATA_DIR,
    });
    assert.equal(probe.ownRead.ok, true, "the plugin must still read its own directory");
    assert.deepEqual(probe.outsideRead, { ok: false, code: "ERR_ACCESS_DENIED" });
    assert.deepEqual(probe.exec, { ok: false, code: "ERR_ACCESS_DENIED" });
    assert.deepEqual(probe.dataWrite, { ok: false, code: "ERR_ACCESS_DENIED" });
  }
);

test(
  "flag on: declared file-write and exec are granted, outside reads stay denied",
  {
    timeout: 60_000,
  },
  async () => {
    await rm(DATA_DIR, { recursive: true, force: true });
    const probe = await runProbe(["file-write", "exec"], {
      permissionModel: true,
      pluginDir: PLUGIN_DIR,
      dataDir: DATA_DIR,
    });
    assert.equal(probe.pluginDataDirEnv, DATA_DIR);
    assert.deepEqual(probe.dataWrite, { ok: true, value: "written" });
    assert.equal(await readFile(join(DATA_DIR, "probe.txt"), "utf-8"), "written");
    assert.deepEqual(probe.exec, { ok: true, value: "child-ran" });
    assert.deepEqual(probe.outsideRead, { ok: false, code: "ERR_ACCESS_DENIED" });
  }
);

test("buildPermissionModelArgs maps manifest permissions to Node.js flags", () => {
  const base = {
    hostScriptPath: "/tmp/host.mjs",
    pluginDir: "/p/plugins/x",
    dataDir: "/p/plugin-data/x",
    permissionFlag: "--permission",
  };
  assert.deepEqual(buildPermissionModelArgs({ ...base, permissions: [] }), [
    "--permission",
    "--allow-fs-read=/tmp/host.mjs",
    "--allow-fs-read=/p/plugins/x",
  ]);
  assert.deepEqual(
    buildPermissionModelArgs({ ...base, permissions: ["network", "env", "file-read"] }),
    [
      "--permission",
      "--allow-fs-read=/tmp/host.mjs",
      "--allow-fs-read=/p/plugins/x",
      "--allow-fs-read=/p/plugin-data/x",
    ]
  );
  assert.deepEqual(buildPermissionModelArgs({ ...base, permissions: ["file-write", "exec"] }), [
    "--permission",
    "--allow-fs-read=/tmp/host.mjs",
    "--allow-fs-read=/p/plugins/x",
    "--allow-fs-read=/p/plugin-data/x",
    "--allow-fs-write=/p/plugin-data/x",
    "--allow-child-process",
  ]);
});

test("resolvePermissionFlag prefers --permission and falls back for older runtimes", () => {
  assert.equal(resolvePermissionFlag(new Set(["--permission"])), "--permission");
  assert.equal(resolvePermissionFlag(new Set()), "--experimental-permission");
  // Every supported Node.js line (>=22.22.2, 24, 26) accepts the stable name.
  assert.equal(resolvePermissionFlag(), "--permission");
});

test("getPluginDataDir is plugin-data/<name> next to the plugin root", () => {
  assert.equal(
    getPluginDataDir(join(BASE_DIR, "plugins"), "perm-probe"),
    join(BASE_DIR, "plugin-data", "perm-probe")
  );
  assert.equal(existsSync(join(BASE_DIR, "plugins")), true);
});
