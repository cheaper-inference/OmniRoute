import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

// src/lib/db/core.ts resolves DATA_DIR once, the first time it is imported (through
// cliproxy.ts), so pin one temp dir before the dynamic imports below and reset only
// the installer folders between tests — same pattern as the #6877 spawn-args test.
const FIXED_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cliproxy-win-"));
process.env.DATA_DIR = FIXED_DATA_DIR;

const { getInstalledVersion, getEffectiveDataDir, resolveSpawnArgs, CLIPROXY_DEFAULT_PORT } =
  await import("../../../../src/lib/services/installers/cliproxy.ts");
const { getDefaultBinaryDataDir } =
  await import("../../../../src/lib/versionManager/binaryManager.ts");
const { upsertVersionManagerTool, deleteVersionManagerTool } =
  await import("../../../../src/lib/db/versionManager.ts");
const { resetDbInstance } = await import("../../../../src/lib/db/core.ts");

const binDir = path.join(FIXED_DATA_DIR, "bin");
const managedName = () => (os.platform() === "win32" ? "cliproxyapi.exe" : "cliproxyapi");
const extractedName = () => (os.platform() === "win32" ? "cli-proxy-api.exe" : "cli-proxy-api");

function extractVersion(version: string, nestedFolder?: string): string {
  const dir = path.join(binDir, `cliproxyapi-${version}`, ...(nestedFolder ? [nestedFolder] : []));
  fs.mkdirSync(dir, { recursive: true });
  const binary = path.join(dir, extractedName());
  fs.writeFileSync(binary, `binary-${version}`);
  return binary;
}

describe("cliproxy windows support (#20180)", () => {
  beforeEach(async () => {
    process.env.DATA_DIR = FIXED_DATA_DIR;
    for (const sub of ["bin", "services"]) {
      fs.rmSync(path.join(FIXED_DATA_DIR, sub), { recursive: true, force: true });
    }
    await deleteVersionManagerTool("cliproxy");
  });

  after(() => {
    resetDbInstance();
    if (ORIGINAL_DATA_DIR === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = ORIGINAL_DATA_DIR;
    }
    fs.rmSync(FIXED_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("getInstalledVersion extracts version from versioned subfolder when binary is copied to bin", async () => {
    extractVersion("1.4.2");
    // Copied binary in bin/ (the Windows copyFile path), so its parent names no version.
    fs.writeFileSync(path.join(binDir, managedName()), "binary-1.4.2");

    assert.equal(await getInstalledVersion(), "1.4.2");
  });

  it("getInstalledVersion reports the committed version, not the newest directory", async () => {
    // Rolled back to 1.0.0: the copy in bin/ is 1.0.0 while 2.0.0 is still on disk.
    extractVersion("1.0.0");
    extractVersion("2.0.0");
    fs.writeFileSync(path.join(binDir, managedName()), "binary-1.0.0");
    await upsertVersionManagerTool({
      tool: "cliproxy",
      installedVersion: "1.0.0",
      status: "installed",
    });

    assert.equal(await getInstalledVersion(), "1.0.0");
  });

  it("getInstalledVersion skips a version directory left empty by a failed update", async () => {
    extractVersion("1.4.2");
    fs.mkdirSync(path.join(binDir, "cliproxyapi-2.0.0"), { recursive: true });
    fs.writeFileSync(path.join(binDir, managedName()), "binary-1.4.2");

    assert.equal(await getInstalledVersion(), "1.4.2");
  });

  it("resolveSpawnArgs falls back to versioned directory when bin copy is missing and repairs it", () => {
    extractVersion("2.0.1");

    const spawnArgs = resolveSpawnArgs(CLIPROXY_DEFAULT_PORT);
    assert.ok(fs.existsSync(spawnArgs.command), `Command must exist: ${spawnArgs.command}`);
  });

  it("resolveSpawnArgs finds a binary nested in the archive's wrapper folder", () => {
    const nested = extractVersion("2.0.1", "release");

    const spawnArgs = resolveSpawnArgs(CLIPROXY_DEFAULT_PORT);
    assert.equal(spawnArgs.command, nested);
  });

  it("installer paths follow the data dir db/core.ts resolved, not a later raw env value", () => {
    process.env.DATA_DIR = "relative-data-dir";
    assert.equal(getEffectiveDataDir(), FIXED_DATA_DIR);
  });

  it("getDefaultBinaryDataDir honors process.env.DATA_DIR override", () => {
    assert.equal(getDefaultBinaryDataDir(), FIXED_DATA_DIR);
  });

  it("getDefaultBinaryDataDir makes a relative DATA_DIR absolute", () => {
    process.env.DATA_DIR = "relative-data-dir";
    assert.equal(getDefaultBinaryDataDir(), path.resolve("relative-data-dir"));
  });
});
