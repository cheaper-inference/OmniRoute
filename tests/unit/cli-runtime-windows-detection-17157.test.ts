/**
 * #17157: Verify Windows CLI helpers (npm global prefix and Windows Node directory lookup)
 * use runtime os.platform() reads rather than build-foldable process.platform constants.
 */
import assert from "node:assert/strict";
import type { ExecFileSyncOptionsWithStringEncoding } from "node:child_process";
import { createRequire, syncBuiltinESMExports } from "node:module";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  getNpmGlobalPrefix,
  __resetNpmGlobalPrefixCacheForTests,
} from "../../src/shared/services/cliRuntimeNpmPrefix.ts";
import { getWindowsSystemNodeBinDirs } from "../../src/shared/services/cliRuntimeWindowsNode.ts";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process") as typeof import("node:child_process");

const originalPlatform = os.platform;
const originalExecFileSync = childProcess.execFileSync;

function validateProgramFiles(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!path.win32.isAbsolute(trimmed)) return "";
  const normalized = path.win32.normalize(trimmed);
  if (normalized.includes("..")) return "";
  const lower = normalized.toLowerCase();
  if (lower === "c:\\program files" || lower.startsWith("c:\\program files\\")) return normalized;
  if (lower === "c:\\program files (x86)" || lower.startsWith("c:\\program files (x86)\\")) {
    return normalized;
  }
  return "";
}

test(
  "#17157 getWindowsSystemNodeBinDirs resolves Windows Node directories when os.platform is win32 while process.platform stays linux",
  { skip: process.platform !== "linux" },
  () => {
    assert.equal(process.platform, "linux");
    const originalProgramFiles = process.env.ProgramFiles;
    process.env.ProgramFiles = "C:\\Program Files";
    delete process.env["ProgramFiles(x86)"];

    try {
      // Unfixed code checks `process.platform !== "win32"` and returns `[]`.
      // Fixed code checks `os.platform() !== "win32"` and resolves `%ProgramFiles%\nodejs`.
      os.platform = () => "win32";
      const dirs = getWindowsSystemNodeBinDirs(validateProgramFiles);
      assert.ok(
        dirs.includes("C:\\Program Files\\nodejs"),
        `expected Windows Node directory, got: ${dirs.join(", ")}`
      );

      // Restore to Linux: must return empty array on POSIX
      os.platform = () => "linux";
      const linuxDirs = getWindowsSystemNodeBinDirs(validateProgramFiles);
      assert.deepEqual(linuxDirs, []);
    } finally {
      os.platform = originalPlatform;
      if (originalProgramFiles === undefined) delete process.env.ProgramFiles;
      else process.env.ProgramFiles = originalProgramFiles;
    }
  }
);

test(
  "#17157 getNpmGlobalPrefix invokes npm with shell: true when os.platform is win32 while process.platform stays linux",
  { skip: process.platform !== "linux" },
  () => {
    assert.equal(process.platform, "linux");
    __resetNpmGlobalPrefixCacheForTests();

    let capturedOptions: ExecFileSyncOptionsWithStringEncoding | undefined;
    childProcess.execFileSync = ((
      _cmd: string,
      _args?: ReadonlyArray<string>,
      options?: ExecFileSyncOptionsWithStringEncoding
    ) => {
      capturedOptions = options;
      return "/custom/npm/prefix\n";
    }) as typeof childProcess.execFileSync;
    syncBuiltinESMExports();

    const originalPrefix = process.env.npm_config_prefix;
    delete process.env.npm_config_prefix;

    try {
      // Unfixed code checks `process.platform === "win32"` and omits `shell: true`.
      // Fixed code checks `os.platform() === "win32"` and passes `{ shell: true }`.
      os.platform = () => "win32";
      const prefix = getNpmGlobalPrefix();
      assert.equal(prefix, "/custom/npm/prefix");
      assert.ok(capturedOptions, "execFileSync should have been executed");
      assert.equal(
        capturedOptions.shell,
        true,
        "Windows npm invocation must use shell: true for .cmd wrappers"
      );

      // On Linux, shell should not be true
      __resetNpmGlobalPrefixCacheForTests();
      capturedOptions = undefined;
      os.platform = () => "linux";
      getNpmGlobalPrefix();
      assert.ok(capturedOptions, "execFileSync should have been executed on Linux");
      assert.equal(
        capturedOptions.shell,
        undefined,
        "Linux npm invocation should not use shell: true"
      );
    } finally {
      os.platform = originalPlatform;
      childProcess.execFileSync = originalExecFileSync;
      syncBuiltinESMExports();
      __resetNpmGlobalPrefixCacheForTests();
      if (originalPrefix !== undefined) process.env.npm_config_prefix = originalPrefix;
    }
  }
);
