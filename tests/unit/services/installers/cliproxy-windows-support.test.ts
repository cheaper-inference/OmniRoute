import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  getInstalledVersion,
  resolveSpawnArgs,
  CLIPROXY_DEFAULT_PORT,
} from "../../../../src/lib/services/installers/cliproxy.ts";
import { getDefaultBinaryDataDir } from "../../../../src/lib/versionManager/binaryManager.ts";

describe("cliproxy windows support (#20180)", () => {
  let tmpDataDir: string;
  let originalDataDir: string | undefined;

  beforeEach(() => {
    tmpDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cliproxy-win-"));
    originalDataDir = process.env.DATA_DIR;
    process.env.DATA_DIR = tmpDataDir;
  });

  afterEach(() => {
    if (originalDataDir !== undefined) {
      process.env.DATA_DIR = originalDataDir;
    } else {
      delete process.env.DATA_DIR;
    }
    if (fs.existsSync(tmpDataDir)) {
      fs.rmSync(tmpDataDir, { recursive: true, force: true });
    }
  });

  it("getInstalledVersion extracts version from versioned subfolder when binary is copied to bin", async () => {
    const binDir = path.join(tmpDataDir, "bin");
    const versionDir = path.join(binDir, "cliproxyapi-1.4.2");
    fs.mkdirSync(versionDir, { recursive: true });
    const executableName = os.platform() === "win32" ? "cliproxyapi.exe" : "cliproxyapi";
    // Create copied binary in bin/ (which simulates Windows copyFile fallback)
    fs.writeFileSync(path.join(binDir, executableName), "dummy-binary");
    fs.writeFileSync(path.join(versionDir, executableName), "dummy-binary");

    const version = await getInstalledVersion();
    assert.equal(version, "1.4.2");
  });

  it("resolveSpawnArgs falls back to versioned directory when bin copy is missing and repairs it", () => {
    const binDir = path.join(tmpDataDir, "bin");
    const versionDir = path.join(binDir, "cliproxyapi-2.0.1");
    fs.mkdirSync(versionDir, { recursive: true });
    const binName = os.platform() === "win32" ? "cli-proxy-api.exe" : "cli-proxy-api";
    const binaryFile = path.join(versionDir, binName);
    fs.writeFileSync(binaryFile, "binary-content");

    const spawnArgs = resolveSpawnArgs(CLIPROXY_DEFAULT_PORT);
    assert.ok(fs.existsSync(spawnArgs.command), `Command must exist: ${spawnArgs.command}`);
  });

  it("getDefaultBinaryDataDir honors process.env.DATA_DIR override", () => {
    assert.equal(getDefaultBinaryDataDir(), tmpDataDir);
  });
});
