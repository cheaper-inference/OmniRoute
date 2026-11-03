/**
 * GET /api/services/singbox/status — response contract.
 *
 * Pins the field-by-field precedence (live supervisor status first, then the
 * version_manager row, then the static default) so the handler can be split into
 * small helpers without changing the JSON the Services dashboard tab reads.
 */
import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-singbox-status-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");
const { upsertVersionManagerTool } = await import("../../../../src/lib/db/versionManager.ts");
const { registerSupervisor, unregisterSupervisor } =
  await import("../../../../src/lib/services/registry.ts");
const { SINGBOX_DEFAULT_PORT, SINGBOX_PINNED_VERSION } =
  await import("../../../../src/lib/services/installers/singbox.ts");
const { GET } = await import("../../../../src/app/api/services/singbox/status/route.ts");

type Registered = Parameters<typeof registerSupervisor>[0];

function fakeSupervisor(status: Record<string, unknown>): Registered {
  return { getStatus: () => ({ tool: "singbox", ...status }) } as unknown as Registered;
}

function writeInstalledManifest(version: string): void {
  const dir = path.join(TEST_DATA_DIR, "services", "singbox");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ version }));
}

describe("GET /api/services/singbox/status", () => {
  before(async () => {
    await upsertVersionManagerTool({
      tool: "singbox",
      status: "stopped",
      port: 20999,
      autoStart: true,
      installedVersion: "1.0.0-row",
      errorMessage: "row error",
    });
  });

  afterEach(() => {
    unregisterSupervisor("singbox");
    fs.rmSync(path.join(TEST_DATA_DIR, "services"), { recursive: true, force: true });
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  });

  it("falls back to the version_manager row when no supervisor is registered", async () => {
    const res = await GET();
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), {
      tool: "singbox",
      state: "stopped",
      pid: null,
      port: 20999,
      health: "unknown",
      startedAt: null,
      lastError: "row error",
      installedVersion: "1.0.0-row",
      latestVersion: SINGBOX_PINNED_VERSION,
      updateAvailable: false,
      autoStart: true,
      adopted: false,
      autoRestartAdopted: false,
    });
  });

  it("prefers the live supervisor status and the on-disk installed version", async () => {
    registerSupervisor(
      fakeSupervisor({
        state: "running",
        pid: 4321,
        port: SINGBOX_DEFAULT_PORT,
        health: "healthy",
        startedAt: "2026-10-28T00:00:00.000Z",
        lastError: "live error",
        adopted: true,
      })
    );
    writeInstalledManifest("1.13.0");

    const res = await GET();
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), {
      tool: "singbox",
      state: "running",
      pid: 4321,
      port: SINGBOX_DEFAULT_PORT,
      health: "healthy",
      startedAt: "2026-10-28T00:00:00.000Z",
      lastError: "live error",
      installedVersion: "1.13.0",
      latestVersion: SINGBOX_PINNED_VERSION,
      updateAvailable: true,
      autoStart: true,
      adopted: true,
      autoRestartAdopted: false,
    });
  });

  it("reports no update when the on-disk version is the pinned release", async () => {
    writeInstalledManifest(SINGBOX_PINNED_VERSION);
    const body = (await (await GET()).json()) as Record<string, unknown>;
    assert.equal(body.installedVersion, SINGBOX_PINNED_VERSION);
    assert.equal(body.updateAvailable, false);
  });
});
