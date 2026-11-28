/**
 * Contract tests for the SQLite VersionManagerRepository and its composition
 * root: the async repository and the facade share one table, the repository
 * takes already-defaulted rows, and the legacy synchronous helpers run in the
 * caller's turn.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-version-manager-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const vm = await import("../../../../src/lib/db/versionManager.ts");
const { versionManagerRepositories } =
  await import("../../../../src/lib/db/repositories/versionManagerRepositories.ts");
const { sqliteVersionManagerLegacySync, sqliteVersionManagerRepository } =
  await import("../../../../src/lib/db/repositories/sqliteVersionManagerRepository.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

const FULL_ROW = {
  tool: "cliproxy",
  currentVersion: "1.0.0",
  installedVersion: "1.0.0",
  pinnedVersion: null,
  binaryPath: "/bin/cliproxy",
  status: "installed",
  pid: null,
  port: 8317,
  apiKey: "enc:a",
  managementKey: null,
  autoUpdate: false,
  autoStart: true,
  healthStatus: "unknown",
  configOverrides: { x: 1 },
  errorMessage: null,
};

test("composition root wires the SQLite repository and legacy helpers", () => {
  assert.equal(versionManagerRepositories.tools, sqliteVersionManagerRepository);
  assert.equal(versionManagerRepositories.legacySync, sqliteVersionManagerLegacySync);
  assert.equal(vm.getVersionManagerRepository(), sqliteVersionManagerRepository);
});

test("repository methods return Promises; legacy helpers do not", () => {
  const repo = vm.getVersionManagerRepository();
  const listed = repo.list();
  assert.ok(listed instanceof Promise);
  assert.equal(sqliteVersionManagerLegacySync.list() instanceof Promise, false);
  return listed;
});

test("repository writes are visible through the facade and vice versa", async () => {
  const repo = vm.getVersionManagerRepository();
  await repo.upsert(FULL_ROW);
  const viaFacade = await vm.getVersionManagerTool("cliproxy");
  assert.equal(viaFacade?.apiKey, "enc:a");
  assert.equal(viaFacade?.autoStart, true);
  assert.equal(viaFacade?.autoUpdate, false);
  assert.deepEqual(viaFacade?.configOverrides, { x: 1 });

  await vm.updateServiceField("cliproxy", "status", "running");
  assert.equal((await repo.findByTool("cliproxy"))?.status, "running");
  assert.equal(
    (await repo.list()).some((row) => row.tool === "cliproxy"),
    true
  );
});

test("repository update is a no-op for a missing tool and stamps an existing one", async () => {
  const repo = vm.getVersionManagerRepository();
  await repo.update("ghost", { status: "running" });
  assert.equal(await repo.findByTool("ghost"), null);

  await repo.update("mux", { status: "running", autoStart: true, unknown: 1 });
  const mux = await repo.findByTool("mux");
  assert.equal(mux?.status, "running");
  assert.equal(mux?.autoStart, true);
});

test("repository targeted setters report whether a row changed", async () => {
  const repo = vm.getVersionManagerRepository();
  assert.equal(await repo.setHealth("mux", "healthy"), true);
  assert.equal(await repo.setVersion("mux", "installed_version", "2.0.0"), true);
  assert.equal(await repo.setStatus("mux", "running", 12), true);
  assert.equal(await repo.setStatus("mux", "stopped", undefined, "bye"), true);
  const mux = await repo.findByTool("mux");
  assert.equal(mux?.healthStatus, "healthy");
  assert.equal(mux?.installedVersion, "2.0.0");
  assert.equal(mux?.status, "stopped");
  assert.equal(mux?.pid, 12);
  assert.equal(mux?.errorMessage, "bye");

  assert.equal(await repo.setHealth("ghost", "healthy"), false);
  assert.equal(await repo.setVersion("ghost", "current_version", "1"), false);
  assert.equal(await repo.setStatus("ghost", "running"), false);
  assert.equal(await repo.deleteByTool("mux"), true);
  assert.equal(await repo.deleteByTool("mux"), false);
});

test("repository stores the row exactly as given; defaults belong to the facade", async () => {
  const repo = vm.getVersionManagerRepository();
  await repo.upsert({ ...FULL_ROW, tool: "raw", port: 1, status: "custom", autoUpdate: false });
  const raw = core
    .getDbInstance()
    .prepare("SELECT port, status, auto_update, auto_start FROM version_manager WHERE tool = ?")
    .get("raw");
  assert.deepEqual(
    { ...(raw as object) },
    { port: 1, status: "custom", auto_update: 0, auto_start: 1 }
  );
});
