/**
 * Characterization of the synchronous plugin registry facade `db/plugins.ts`:
 * the `plugins` registration table and the `plugin_analytics` execution log.
 *
 * Pins row mapping, insert defaults and JSON encoding, ordering and status
 * filtering, the status / enabled / activated_at coupling, manifest and config
 * refreshes, delete and existence checks, and the analytics read shapes, so
 * moving persistence behind repositories cannot change what the plugin
 * manager, the plugin routes, the model-validation fence or the MCP plugin
 * tools observe.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-registry-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const plugins = await import("../../../src/lib/db/plugins.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must stay synchronous");
  return value;
}

function rawPlugin(name: string): Record<string, unknown> | undefined {
  return core.getDbInstance().prepare("SELECT * FROM plugins WHERE name = ?").get(name) as
    Record<string, unknown> | undefined;
}

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function minimalInput(name: string, id = `id-${name}`) {
  return {
    id,
    name,
    version: "1.0.0",
    main: "index.js",
    manifest: { name, version: "1.0.0" },
    pluginDir: `/plugins/${name}`,
  };
}

// ── plugins: insert ─────────────────────────────────────────────────────────

test("insertPlugin: minimal input stores defaults and returns the mapped row", () => {
  const before = Date.now();
  const row = synchronous(plugins.insertPlugin(minimalInput("alpha")));

  assert.deepEqual(rawPlugin("alpha"), {
    id: "id-alpha",
    name: "alpha",
    version: "1.0.0",
    description: null,
    author: null,
    license: "MIT",
    main: "index.js",
    source: "local",
    tags: "[]",
    status: "installed",
    enabled: 0,
    manifest: '{"name":"alpha","version":"1.0.0"}',
    config: "{}",
    config_schema: "{}",
    hooks: "[]",
    permissions: "[]",
    plugin_dir: "/plugins/alpha",
    error_message: null,
    installed_at: row.installedAt,
    updated_at: row.updatedAt,
    activated_at: null,
  });

  assert.deepEqual(Object.keys(row), [
    "id",
    "name",
    "version",
    "description",
    "author",
    "license",
    "main",
    "source",
    "tags",
    "status",
    "enabled",
    "manifest",
    "config",
    "configSchema",
    "hooks",
    "permissions",
    "pluginDir",
    "errorMessage",
    "installedAt",
    "updatedAt",
    "activatedAt",
  ]);
  assert.equal(row.configSchema, "{}");
  assert.equal(row.pluginDir, "/plugins/alpha");
  assert.equal(row.errorMessage, null);
  assert.equal(row.activatedAt, null);
  assert.match(row.installedAt, ISO);
  assert.equal(row.installedAt, row.updatedAt, "insert stamps both columns with one timestamp");
  assert.ok(Date.parse(row.installedAt) >= before - 1);
});

test("insertPlugin: full input is JSON-encoded column by column", () => {
  const row = plugins.insertPlugin({
    ...minimalInput("beta"),
    description: "desc",
    author: "someone",
    license: "Apache-2.0",
    source: "marketplace",
    tags: ["a", "b"],
    status: "active",
    enabled: true,
    config: { k: 1 },
    configSchema: { type: "object" },
    hooks: ["onRequest"],
    permissions: ["network"],
  });

  const raw = rawPlugin("beta")!;
  assert.equal(raw.description, "desc");
  assert.equal(raw.author, "someone");
  assert.equal(raw.license, "Apache-2.0");
  assert.equal(raw.source, "marketplace");
  assert.equal(raw.tags, '["a","b"]');
  assert.equal(raw.status, "active");
  assert.equal(raw.enabled, 1);
  assert.equal(raw.config, '{"k":1}');
  assert.equal(raw.config_schema, '{"type":"object"}');
  assert.equal(raw.hooks, '["onRequest"]');
  assert.equal(raw.permissions, '["network"]');
  assert.equal(raw.activated_at, null, "insert never stamps activated_at, even when active");

  assert.equal(row.enabled, 1);
  assert.equal(row.tags, '["a","b"]', "JSON columns are returned as stored strings");
  assert.equal(row.configSchema, '{"type":"object"}');
});

test("insertPlugin: enabled false and missing both store 0", () => {
  plugins.insertPlugin({ ...minimalInput("off"), enabled: false });
  assert.equal(rawPlugin("off")!.enabled, 0);
});

test("insertPlugin: duplicate name or id throws and leaves the first row", () => {
  plugins.insertPlugin(minimalInput("dup", "id-1"));
  assert.throws(() => plugins.insertPlugin(minimalInput("dup", "id-2")), /UNIQUE/);
  assert.throws(() => plugins.insertPlugin(minimalInput("other", "id-1")), /UNIQUE/);
  assert.equal(plugins.listPlugins().length, 1);
  assert.equal(plugins.getPluginByName("dup")!.id, "id-1");
});

// ── plugins: reads ──────────────────────────────────────────────────────────

test("getPluginById / getPluginByName / pluginExists: hit and miss", () => {
  assert.equal(synchronous(plugins.getPluginById("nope")), null);
  assert.equal(synchronous(plugins.getPluginByName("nope")), null);
  assert.equal(synchronous(plugins.pluginExists("nope")), false);

  plugins.insertPlugin(minimalInput("gamma", "gid"));
  assert.equal(plugins.getPluginById("gid")!.name, "gamma");
  assert.equal(plugins.getPluginByName("gamma")!.id, "gid");
  assert.equal(plugins.pluginExists("gamma"), true);
  assert.equal(plugins.getPluginById("gamma"), null, "id and name are not interchangeable");
  assert.equal(plugins.pluginExists("gid"), false);
});

test("listPlugins: ordered by name, optional exact status filter", () => {
  assert.deepEqual(synchronous(plugins.listPlugins()), []);
  plugins.insertPlugin(minimalInput("zeta"));
  plugins.insertPlugin({ ...minimalInput("alpha"), status: "active" });
  plugins.insertPlugin({ ...minimalInput("Mid"), status: "error" });
  plugins.insertPlugin({ ...minimalInput("beta"), status: "active" });

  assert.deepEqual(
    plugins.listPlugins().map((p) => p.name),
    ["Mid", "alpha", "beta", "zeta"],
    "SQLite binary collation: uppercase sorts first"
  );
  assert.deepEqual(
    plugins.listPlugins("active").map((p) => p.name),
    ["alpha", "beta"]
  );
  assert.deepEqual(plugins.listPlugins("inactive"), []);
  assert.deepEqual(
    plugins.listPlugins(undefined).map((p) => p.name),
    ["Mid", "alpha", "beta", "zeta"]
  );
});

// ── plugins: updates ────────────────────────────────────────────────────────

test("updatePluginStatus: active sets enabled and activated_at; others clear enabled", () => {
  plugins.insertPlugin(minimalInput("svc"));
  const installed = rawPlugin("svc")!;

  assert.equal(synchronous(plugins.updatePluginStatus("svc", "active")), true);
  const active = rawPlugin("svc")!;
  assert.equal(active.status, "active");
  assert.equal(active.enabled, 1);
  assert.equal(active.error_message, null);
  assert.match(active.activated_at as string, ISO);
  assert.equal(active.activated_at, active.updated_at, "same timestamp for both columns");
  assert.equal(active.installed_at, installed.installed_at);

  plugins.updatePluginStatus("svc", "error", "boom");
  const errored = rawPlugin("svc")!;
  assert.equal(errored.status, "error");
  assert.equal(errored.enabled, 0);
  assert.equal(errored.error_message, "boom");
  assert.equal(errored.activated_at, active.activated_at, "activated_at kept via COALESCE");

  plugins.updatePluginStatus("svc", "inactive");
  const inactive = rawPlugin("svc")!;
  assert.equal(inactive.status, "inactive");
  assert.equal(inactive.enabled, 0);
  assert.equal(inactive.error_message, null, "error message cleared when omitted");
  assert.equal(inactive.activated_at, active.activated_at);

  plugins.updatePluginStatus("svc", "installed");
  assert.equal(rawPlugin("svc")!.enabled, 0);
});

test("updatePluginStatus: unknown plugin returns false; invalid status throws", () => {
  assert.equal(plugins.updatePluginStatus("ghost", "active"), false);
  plugins.insertPlugin(minimalInput("chk"));
  assert.throws(() => plugins.updatePluginStatus("chk", "bogus" as never), /CHECK constraint/);
  assert.equal(rawPlugin("chk")!.status, "installed");
});

test("updatePluginManifest: rewrites manifest and hooks only", () => {
  plugins.insertPlugin({ ...minimalInput("man"), hooks: ["onRequest"], config: { keep: true } });
  const before = rawPlugin("man")!;

  assert.equal(
    synchronous(
      plugins.updatePluginManifest("man", { name: "man", version: "2.0.0" }, [
        "onRequest",
        "onStreamComplete",
      ])
    ),
    true
  );
  const after = rawPlugin("man")!;
  assert.equal(after.manifest, '{"name":"man","version":"2.0.0"}');
  assert.equal(after.hooks, '["onRequest","onStreamComplete"]');
  assert.equal(after.version, "1.0.0", "version column is not touched");
  assert.equal(after.config, before.config);
  assert.equal(after.status, before.status);
  assert.match(after.updated_at as string, ISO);
  assert.equal(plugins.updatePluginManifest("ghost", {}, []), false);
});

test("updatePluginConfig: replaces config JSON only", () => {
  plugins.insertPlugin({ ...minimalInput("cfg"), config: { a: 1 } });
  assert.equal(synchronous(plugins.updatePluginConfig("cfg", { b: [2] })), true);
  const raw = rawPlugin("cfg")!;
  assert.equal(raw.config, '{"b":[2]}');
  assert.equal(raw.manifest, '{"name":"cfg","version":"1.0.0"}');
  assert.match(raw.updated_at as string, ISO);
  assert.equal(plugins.updatePluginConfig("ghost", {}), false);
});

test("deletePlugin: removes by name, reports whether a row went away", () => {
  plugins.insertPlugin(minimalInput("del"));
  plugins.insertPlugin(minimalInput("stay"));
  assert.equal(synchronous(plugins.deletePlugin("del")), true);
  assert.equal(plugins.deletePlugin("del"), false);
  assert.equal(plugins.pluginExists("del"), false);
  assert.equal(plugins.pluginExists("stay"), true);
});

// ── plugin_analytics ────────────────────────────────────────────────────────

function rawAnalytics(): Record<string, unknown>[] {
  return core
    .getDbInstance()
    .prepare(
      "SELECT plugin_name, hook, duration_ms, success, error_message FROM plugin_analytics ORDER BY id"
    )
    .all() as Record<string, unknown>[];
}

test("recordPluginExecution: one row per call, success as 0/1, optional error", () => {
  assert.equal(synchronous(plugins.recordPluginExecution("p", "onRequest", 12, true)), undefined);
  plugins.recordPluginExecution("p", "onError", 7, false, "bad");
  plugins.recordPluginExecution("q", "onResponse", 0, false);

  assert.deepEqual(rawAnalytics(), [
    { plugin_name: "p", hook: "onRequest", duration_ms: 12, success: 1, error_message: null },
    { plugin_name: "p", hook: "onError", duration_ms: 7, success: 0, error_message: "bad" },
    { plugin_name: "q", hook: "onResponse", duration_ms: 0, success: 0, error_message: null },
  ]);
  const created = core
    .getDbInstance()
    .prepare("SELECT created_at FROM plugin_analytics LIMIT 1")
    .get() as { created_at: string };
  assert.match(created.created_at, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "SQLite default");
});

test("getPluginAnalytics: per plugin, newest created_at first, mapped shape", () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT INTO plugin_analytics (plugin_name, hook, duration_ms, success, error_message, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  );
  insert.run("p", "old", 1, 1, null, "2026-01-01 00:00:00");
  insert.run("p", "new", 2, 0, "x", "2026-03-01 00:00:00");
  insert.run("p", "mid", 3, 1, null, "2026-02-01 00:00:00");
  insert.run("other", "skip", 4, 1, null, "2026-04-01 00:00:00");

  assert.deepEqual(synchronous(plugins.getPluginAnalytics("p")), [
    {
      pluginName: "p",
      hook: "new",
      durationMs: 2,
      success: false,
      errorMessage: "x",
      createdAt: "2026-03-01 00:00:00",
    },
    {
      pluginName: "p",
      hook: "mid",
      durationMs: 3,
      success: true,
      errorMessage: null,
      createdAt: "2026-02-01 00:00:00",
    },
    {
      pluginName: "p",
      hook: "old",
      durationMs: 1,
      success: true,
      errorMessage: null,
      createdAt: "2026-01-01 00:00:00",
    },
  ]);
  assert.deepEqual(plugins.getPluginAnalytics("none"), []);
});

test("getPluginAnalytics: success is true only for stored 1", () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO plugin_analytics (plugin_name, hook, duration_ms, success) VALUES ('w', 'h', 1, 2)"
    )
    .run();
  assert.equal(plugins.getPluginAnalytics("w")[0].success, false);
});

test("getPluginAnalyticsSummary: zeros when empty, aggregates per plugin", () => {
  assert.deepEqual(synchronous(plugins.getPluginAnalyticsSummary("p")), {
    totalCalls: 0,
    successCount: 0,
    failureCount: 0,
    avgDurationMs: 0,
  });

  plugins.recordPluginExecution("p", "h", 10, true);
  plugins.recordPluginExecution("p", "h", 20, true);
  plugins.recordPluginExecution("p", "h", 35, false, "e");
  plugins.recordPluginExecution("other", "h", 1000, false);

  assert.deepEqual(plugins.getPluginAnalyticsSummary("p"), {
    totalCalls: 3,
    successCount: 2,
    failureCount: 1,
    avgDurationMs: 65 / 3,
  });
});
