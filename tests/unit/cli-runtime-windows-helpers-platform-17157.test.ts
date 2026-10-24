/**
 * #17157 (helpers): the Windows CLI helper modules must read the runtime OS
 * through node:os, not a bare process.platform that a server bundler may fold
 * to "linux" at build time. process.platform stays Linux here while os.platform
 * is stubbed, so the test fails if a helper consults process.platform.
 *
 * Helper fix originally proposed in #17234 (@PrinceThummar011).
 */
import assert from "node:assert/strict";
import { createRequire, syncBuiltinESMExports } from "node:module";
import os from "node:os";
import test from "node:test";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process") as typeof import("node:child_process");

const originalPlatform = os.platform;
const originalExecFileSync = childProcess.execFileSync;
const originalEnv = { ...process.env };

test.afterEach(() => {
  os.platform = originalPlatform;
  childProcess.execFileSync = originalExecFileSync;
  syncBuiltinESMExports();
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

const onLinux = { skip: process.platform !== "linux" };

test(
  "#17157 getWindowsSystemNodeBinDirs follows os.platform(), not process.platform",
  onLinux,
  async () => {
    const mod = await import(
      `../../src/shared/services/cliRuntimeWindowsNode.ts?case=dirs-${Date.now()}-${Math.random()}`
    );
    const validate = (value: string | undefined) => value ?? "";
    process.env.ProgramFiles = "C:\\Program Files";
    process.env["ProgramFiles(x86)"] = "C:\\Program Files (x86)";

    assert.equal(process.platform, "linux");
    assert.deepEqual(mod.getWindowsSystemNodeBinDirs(validate), []);

    os.platform = () => "win32";
    assert.deepEqual(mod.getWindowsSystemNodeBinDirs(validate), [
      "C:\\Program Files\\nodejs",
      "C:\\Program Files (x86)\\nodejs",
    ]);
    assert.equal(process.platform, "linux");
  }
);

test(
  "#17157 getNpmGlobalPrefix spawns npm through the shell when os.platform() is win32",
  onLinux,
  async () => {
    delete process.env.npm_config_prefix;
    const mod = await import(
      `../../src/shared/services/cliRuntimeNpmPrefix.ts?case=prefix-${Date.now()}-${Math.random()}`
    );
    const observed: Array<{ shell: unknown }> = [];
    childProcess.execFileSync = ((_cmd: string, _args: string[], options: { shell?: unknown }) => {
      observed.push({ shell: options?.shell });
      return "/opt/npm-global\n";
    }) as unknown as typeof childProcess.execFileSync;
    syncBuiltinESMExports();

    assert.equal(process.platform, "linux");
    mod.__resetNpmGlobalPrefixCacheForTests();
    os.platform = () => "win32";
    mod.getNpmGlobalPrefix();
    assert.equal(observed.at(-1)?.shell, true, "win32 runtime must use shell:true for npm.cmd");

    mod.__resetNpmGlobalPrefixCacheForTests();
    os.platform = originalPlatform;
    mod.getNpmGlobalPrefix();
    assert.equal(observed.at(-1)?.shell, undefined, "POSIX runtime must not force a shell");
  }
);
