/**
 * Characterization of the `versionManager.ts` facade over the version_manager
 * table (managed CLI binaries and embedded services).
 *
 * Pins upsert defaults, the overwrite-on-conflict semantics, the camelCase
 * update whitelist and boolean mapping, row decoding fallbacks, the embedded
 * service field whitelist and when each export touches storage relative to its
 * first await, so moving persistence behind a repository cannot change what the
 * version-manager / services routes, the service supervisor, bootstrap and the
 * health monitor observe.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-version-manager-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const vm = await import("../../../src/lib/db/versionManager.ts");

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

type RawRow = Record<string, unknown>;

function rawRow(tool: string): RawRow | undefined {
  return core.getDbInstance().prepare("SELECT * FROM version_manager WHERE tool = ?").get(tool) as
    RawRow | undefined;
}

function exec(sql: string, ...params: unknown[]): void {
  core
    .getDbInstance()
    .prepare(sql)
    .run(...params);
}

const OLD_STAMP = "2000-01-01 00:00:00";

function ageRow(tool: string): void {
  exec(
    "UPDATE version_manager SET created_at = ?, updated_at = ?, last_health_check = ? WHERE tool = ?",
    OLD_STAMP,
    OLD_STAMP,
    OLD_STAMP,
    tool
  );
}

// ── reads ──────────────────────────────────────────────────────────────────

test("status lists the migration-seeded embedded services in storage order", async () => {
  const rows = await vm.getVersionManagerStatus();
  assert.deepEqual(
    rows.map((row) => [row.tool, row.status, row.port, row.autoUpdate, row.providerExpose]),
    [
      ["9router", "not_installed", 20130, true, true],
      ["mux", "not_installed", 8322, false, false],
      ["bifrost", "not_installed", 8080, true, true],
      ["openwa", "not_installed", 8323, false, false],
      ["llmlingua", "not_installed", 20135, false, false],
      ["singbox", "not_installed", 20140, false, false],
    ]
  );
  const router = rows[0];
  assert.equal(router.autoStart, false);
  assert.equal(router.autoRestartAdopted, false);
  assert.equal(router.healthStatus, "unknown");
  assert.equal(router.apiKey, null);
  assert.equal(router.configOverrides, null);
  assert.equal(typeof router.createdAt, "string");
});

test("missing tool reads as null", async () => {
  assert.equal(await vm.getVersionManagerTool("ghost"), null);
  assert.equal(await vm.getServiceRow("ghost"), null);
});

test("decoding: non-string text, non-number pid/port and flag spellings", async () => {
  exec(
    `INSERT INTO version_manager (tool, current_version, installed_version, pid, port,
       api_key, auto_update, auto_start, auto_restart_adopted, provider_expose,
       health_status, config_overrides, error_message, logs_buffer_path, last_sync_at)
     VALUES ('odd', X'35', 'v1', 'not-a-pid', NULL, X'37', '1', 1, 'yes', '0', NULL, '[1,2]', X'39', X'33', X'34')`
  );
  exec("UPDATE version_manager SET status = X'41' WHERE tool = 'odd'");
  const tool = await vm.getVersionManagerTool("odd");
  assert.ok(tool);
  assert.equal(tool.currentVersion, null, "blob text column decodes to null");
  assert.equal(tool.installedVersion, "v1");
  assert.equal(tool.status, "not_installed", "non-string status falls back");
  assert.equal(tool.pid, null);
  assert.equal(tool.port, 8317, "missing port falls back to 8317");
  assert.equal(tool.apiKey, null);
  assert.equal(tool.autoUpdate, true, "'1' text counts as on");
  assert.equal(tool.autoStart, true);
  assert.equal(tool.autoRestartAdopted, false, "only 1 / true / '1' count as on");
  assert.equal(tool.providerExpose, false);
  assert.equal(tool.healthStatus, "unknown");
  assert.deepEqual(tool.configOverrides, [1, 2], "any JSON object (arrays included) survives");
  assert.equal(tool.errorMessage, null);
  assert.equal(tool.logsBufferPath, null);
  assert.equal(tool.lastSyncAt, null);
});

test("decoding: invalid, blank or scalar config overrides read as null", async () => {
  exec("INSERT INTO version_manager (tool, config_overrides) VALUES ('bad', '{oops')");
  exec("INSERT INTO version_manager (tool, config_overrides) VALUES ('blank', '   ')");
  exec("INSERT INTO version_manager (tool, config_overrides) VALUES ('scalar', '42')");
  exec("INSERT INTO version_manager (tool, config_overrides) VALUES ('nul', 'null')");
  for (const tool of ["bad", "blank", "scalar", "nul"]) {
    assert.equal((await vm.getVersionManagerTool(tool))?.configOverrides, null, tool);
  }
});

// ── upsert ─────────────────────────────────────────────────────────────────

test("upsert insert applies defaults and returns the stored row", async () => {
  const tool = await vm.upsertVersionManagerTool({ tool: "cliproxy" });
  assert.equal(tool.tool, "cliproxy");
  assert.equal(tool.status, "not_installed");
  assert.equal(tool.port, 8317);
  assert.equal(tool.autoUpdate, true);
  assert.equal(tool.autoStart, false);
  assert.equal(tool.healthStatus, "unknown");
  assert.equal(tool.pid, null);
  assert.equal(tool.configOverrides, null);
  const raw = rawRow("cliproxy");
  assert.equal(raw?.auto_update, 1);
  assert.equal(raw?.auto_start, 0);
  assert.equal(raw?.provider_expose, 0);
  assert.equal(raw?.auto_restart_adopted, 0);
});

test("upsert insert stores every provided field", async () => {
  const tool = await vm.upsertVersionManagerTool({
    tool: "cliproxy",
    currentVersion: "1.2.0",
    installedVersion: "1.1.0",
    pinnedVersion: "1.0.0",
    binaryPath: "/bin/cliproxy",
    status: "running",
    pid: 321,
    port: 9000,
    apiKey: "enc:api",
    managementKey: "enc:mgmt",
    autoUpdate: false,
    autoStart: true,
    healthStatus: "healthy",
    configOverrides: { flag: true, nested: { n: 1 } },
    errorMessage: "warn",
  });
  assert.deepEqual(
    {
      currentVersion: tool.currentVersion,
      installedVersion: tool.installedVersion,
      pinnedVersion: tool.pinnedVersion,
      binaryPath: tool.binaryPath,
      status: tool.status,
      pid: tool.pid,
      port: tool.port,
      apiKey: tool.apiKey,
      managementKey: tool.managementKey,
      autoUpdate: tool.autoUpdate,
      autoStart: tool.autoStart,
      healthStatus: tool.healthStatus,
      configOverrides: tool.configOverrides,
      errorMessage: tool.errorMessage,
    },
    {
      currentVersion: "1.2.0",
      installedVersion: "1.1.0",
      pinnedVersion: "1.0.0",
      binaryPath: "/bin/cliproxy",
      status: "running",
      pid: 321,
      port: 9000,
      apiKey: "enc:api",
      managementKey: "enc:mgmt",
      autoUpdate: false,
      autoStart: true,
      healthStatus: "healthy",
      configOverrides: { flag: true, nested: { n: 1 } },
      errorMessage: "warn",
    }
  );
  assert.equal(rawRow("cliproxy")?.config_overrides, '{"flag":true,"nested":{"n":1}}');
});

test("upsert conflict overwrites every upsert column, resetting omitted ones to defaults", async () => {
  await vm.upsertVersionManagerTool({
    tool: "9router",
    apiKey: "enc:old",
    pinnedVersion: "2.0.0",
    autoStart: true,
    autoUpdate: false,
    port: 20130,
  });
  exec(
    "UPDATE version_manager SET api_key = 'enc:old', management_key = 'enc:mgmt', provider_expose = 1, auto_restart_adopted = 1, logs_buffer_path = '/tmp/l', last_sync_at = 'x', last_update_check = 'y' WHERE tool = '9router'"
  );
  const before = rawRow("9router");
  ageRow("9router");

  const after = await vm.upsertVersionManagerTool({ tool: "9router", installedVersion: "3.0.0" });
  assert.equal(after.id, before?.id, "conflict keeps the row id");
  assert.equal(after.installedVersion, "3.0.0");
  assert.equal(after.apiKey, null, "omitted api key is cleared");
  assert.equal(after.managementKey, null, "omitted management key is cleared");
  assert.equal(after.pinnedVersion, null);
  assert.equal(after.autoStart, false);
  assert.equal(after.autoUpdate, true);
  assert.equal(after.port, 8317, "omitted port resets to 8317, not the seeded port");
  assert.equal(after.createdAt, OLD_STAMP, "created_at survives the conflict");
  assert.notEqual(after.updatedAt, OLD_STAMP, "updated_at is stamped");
  assert.equal(after.providerExpose, true, "non-upsert columns are left alone");
  assert.equal(after.autoRestartAdopted, true);
  assert.equal(after.logsBufferPath, "/tmp/l");
  assert.equal(after.lastSyncAt, "x");
  assert.equal(after.lastUpdateCheck, "y");
  assert.equal(after.lastHealthCheck, OLD_STAMP);
});

test("upsert writes before its first await; the read-back happens after", async () => {
  const pending = vm.upsertVersionManagerTool({ tool: "sync-write", status: "installed" });
  assert.equal(rawRow("sync-write")?.status, "installed");
  assert.equal((await pending).status, "installed");
});

// ── updateVersionManagerTool ───────────────────────────────────────────────

test("update of a missing tool returns null and creates nothing", async () => {
  assert.equal(await vm.updateVersionManagerTool("ghost", { status: "running" }), null);
  assert.equal(rawRow("ghost"), undefined);
});

test("update maps camelCase to snake_case, ignores unknown keys and stamps updated_at", async () => {
  ageRow("mux");
  const updated = await vm.updateVersionManagerTool("mux", {
    currentVersion: "0.9.0",
    installedVersion: "0.8.0",
    pinnedVersion: "0.7.0",
    binaryPath: "/opt/mux",
    status: "running",
    pid: 77,
    port: 8400,
    apiKey: "enc:k",
    managementKey: "enc:m",
    healthStatus: "healthy",
    errorMessage: "e",
    logsBufferPath: "/logs",
    lastSyncAt: "2026-01-01",
    tool: "renamed",
    id: 999,
    createdAt: "nope",
    lastHealthCheck: "nope",
    lastUpdateCheck: "nope",
    "status = 'pwned' --": "x",
  });
  assert.ok(updated);
  assert.equal(updated.tool, "mux");
  assert.equal(updated.currentVersion, "0.9.0");
  assert.equal(updated.installedVersion, "0.8.0");
  assert.equal(updated.pinnedVersion, "0.7.0");
  assert.equal(updated.binaryPath, "/opt/mux");
  assert.equal(updated.status, "running");
  assert.equal(updated.pid, 77);
  assert.equal(updated.port, 8400);
  assert.equal(updated.apiKey, "enc:k");
  assert.equal(updated.managementKey, "enc:m");
  assert.equal(updated.healthStatus, "healthy");
  assert.equal(updated.errorMessage, "e");
  assert.equal(updated.logsBufferPath, "/logs");
  assert.equal(updated.lastSyncAt, "2026-01-01");
  assert.equal(updated.id, 2);
  assert.equal(updated.createdAt, OLD_STAMP);
  assert.equal(updated.lastHealthCheck, OLD_STAMP);
  assert.equal(updated.lastUpdateCheck, null);
  assert.notEqual(updated.updatedAt, OLD_STAMP);
  assert.equal(rawRow("renamed"), undefined);
});

test("update with no recognised keys still stamps updated_at", async () => {
  ageRow("openwa");
  const updated = await vm.updateVersionManagerTool("openwa", { nope: 1 });
  assert.ok(updated);
  assert.notEqual(updated.updatedAt, OLD_STAMP);
  assert.equal(updated.status, "not_installed");
});

test("update stores flags as 1 only for literal true", async () => {
  await vm.updateVersionManagerTool("bifrost", {
    autoUpdate: 1,
    autoStart: true,
    autoRestartAdopted: "true",
    providerExpose: null,
  });
  const raw = rawRow("bifrost");
  assert.equal(raw?.auto_update, 0, "numeric 1 is not true");
  assert.equal(raw?.auto_start, 1);
  assert.equal(raw?.auto_restart_adopted, 0);
  assert.equal(raw?.provider_expose, 0, "null flag stores 0 instead of clearing");
});

test("update clears nullable columns with null and serialises config overrides", async () => {
  await vm.updateVersionManagerTool("llmlingua", {
    binaryPath: "/b",
    pid: 5,
    configOverrides: { a: [1] },
  });
  assert.equal(rawRow("llmlingua")?.config_overrides, '{"a":[1]}');
  const cleared = await vm.updateVersionManagerTool("llmlingua", {
    binaryPath: null,
    pid: null,
    configOverrides: null,
  });
  assert.equal(cleared?.binaryPath, null);
  assert.equal(cleared?.pid, null);
  assert.equal(cleared?.configOverrides, null);
  assert.equal(rawRow("llmlingua")?.config_overrides, null);
});

test("update awaits the existence check before writing", async () => {
  const pending = vm.updateVersionManagerTool("singbox", { status: "running" });
  assert.equal(rawRow("singbox")?.status, "not_installed", "no write before the first await");
  assert.equal((await pending)?.status, "running");
});

// ── targeted helpers ───────────────────────────────────────────────────────

test("updateToolHealth stamps last_health_check only", async () => {
  ageRow("9router");
  const pending = vm.updateToolHealth("9router", "healthy");
  assert.equal(rawRow("9router")?.health_status, "healthy", "writes synchronously");
  assert.equal(await pending, true);
  const raw = rawRow("9router");
  assert.notEqual(raw?.last_health_check, OLD_STAMP);
  assert.equal(raw?.updated_at, OLD_STAMP);
  assert.equal(await vm.updateToolHealth("ghost", "healthy"), false);
});

test("updateToolVersion writes the named column and stamps updated_at", async () => {
  ageRow("mux");
  assert.equal(await vm.updateToolVersion("mux", "current_version", "1.0.0"), true);
  assert.equal(await vm.updateToolVersion("mux", "installed_version", "0.9.0"), true);
  const raw = rawRow("mux");
  assert.equal(raw?.current_version, "1.0.0");
  assert.equal(raw?.installed_version, "0.9.0");
  assert.notEqual(raw?.updated_at, OLD_STAMP);
  assert.equal(await vm.updateToolVersion("ghost", "current_version", "1"), false);
});

test("setToolStatus keeps pid when omitted and always overwrites the error", async () => {
  ageRow("bifrost");
  const pending = vm.setToolStatus("bifrost", "running", 4321, "boot");
  assert.equal(rawRow("bifrost")?.pid, 4321, "writes synchronously");
  assert.equal(await pending, true);
  assert.equal(rawRow("bifrost")?.error_message, "boot");
  assert.notEqual(rawRow("bifrost")?.updated_at, OLD_STAMP);

  assert.equal(await vm.setToolStatus("bifrost", "stopped"), true);
  const raw = rawRow("bifrost");
  assert.equal(raw?.status, "stopped");
  assert.equal(raw?.pid, 4321, "pid untouched without a pid argument");
  assert.equal(raw?.error_message, null, "error cleared when omitted");
  assert.equal(await vm.setToolStatus("ghost", "running"), false);
});

test("delete reports whether a row was removed", async () => {
  await vm.upsertVersionManagerTool({ tool: "temp" });
  assert.equal(await vm.deleteVersionManagerTool("temp"), true);
  assert.equal(await vm.deleteVersionManagerTool("temp"), false);
  assert.equal(rawRow("temp"), undefined);
});

// ── embedded service helpers ───────────────────────────────────────────────

test("getServiceRow is the same read as getVersionManagerTool", async () => {
  assert.deepEqual(await vm.getServiceRow("9router"), await vm.getVersionManagerTool("9router"));
});

test("updateServiceField writes whitelisted fields and rejects the rest", async () => {
  const updated = await vm.updateServiceField("9router", "providerExpose", false);
  assert.equal(updated?.providerExpose, false);
  assert.equal((await vm.updateServiceField("9router", "autoStart", true))?.autoStart, true);
  assert.equal(await vm.updateServiceField("ghost", "status", "running"), null);

  for (const field of ["managementKey", "configOverrides", "pinnedVersion", "tool", "bogus"]) {
    await assert.rejects(
      () => vm.updateServiceField("9router", field, "x"),
      new RegExp(`field "${field}" is not in the allowed list`)
    );
  }
  assert.equal(rawRow("9router")?.management_key, null);
});
