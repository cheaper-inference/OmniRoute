import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// cliRuntime.ts computes EXPECTED_PARENT_PATHS from os.homedir() at MODULE LOAD
// time, so HOME/USERPROFILE must be redirected before the module is imported.
const isWin = process.platform === "win32";
const binaryName = isWin ? "opencode.cmd" : "opencode";

const sandboxHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7753-home-"));
const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7753-outside-"));

process.env.HOME = sandboxHome;
process.env.USERPROFILE = sandboxHome;
process.env.npm_config_prefix = path.join(sandboxHome, "npm-prefix");
// Keep the real LOCALAPPDATA out of EXPECTED_PARENT_PATHS: on Windows os.tmpdir()
// lives under it, so a temp "untrusted" fixture would otherwise be trusted.
process.env.APPDATA = path.join(sandboxHome, "AppData", "Roaming");
process.env.LOCALAPPDATA = path.join(sandboxHome, "AppData", "Local");
delete process.env.CLI_OPENCODE_BIN;

// On Windows a file symlink needs SeCreateSymbolicLinkPrivilege / Developer Mode,
// so use a directory junction instead: the real file lives in outsideDir, and
// the path we hand to checkKnownPath goes through the junction. realpath()
// therefore escapes EXPECTED_PARENT_PATHS while the original path stays trusted
// — the exact #7753 shape. POSIX keeps a plain directory symlink.
const linkInstallDir = (target: string, linkPath: string) => {
  fs.symlinkSync(target, linkPath, isWin ? "junction" : "dir");
};

// Trusted install container: npm prefix on Windows (the only known-path location
// for opencode there), ~/.local/bin on POSIX.
const installDir = isWin
  ? path.join(sandboxHome, "npm-prefix")
  : path.join(sandboxHome, ".local", "bin");
fs.mkdirSync(sandboxHome, { recursive: true });
linkInstallDir(outsideDir, installDir);

const realBinaryContent = "#!/bin/sh\necho fake-opencode-binary-body-padding\n";
const realBinaryPath = path.join(outsideDir, binaryName);
fs.writeFileSync(realBinaryPath, realBinaryContent);
fs.chmodSync(realBinaryPath, 0o755);

const { getCliRuntimeStatus, checkKnownPath } =
  await import("../../src/shared/services/cliRuntime.ts");

test("#7753: a CLI symlink located inside an expected parent dir is wrongly reported not-installed when its resolved target escapes EXPECTED_PARENT_PATHS", async () => {
  const status = await getCliRuntimeStatus("opencode");
  assert.equal(
    status.installed,
    true,
    `expected installed=true but got installed=${status.installed} reason=${status.reason}`
  );
});

test("#7753: a genuinely unsafe symlink whose ORIGINAL location is also untrusted must still be rejected", async () => {
  // Neither the path we check nor its resolved target is inside any
  // EXPECTED_PARENT_PATHS entry — this must stay rejected as symlink_escape.
  // Use a DIFFERENT target dir from the trusted fixture: isLocationTrusted()
  // also compares against realpath(parent), so sharing the target would make
  // this path trust the resolved npm-prefix junction's destination.
  const untrustedTargetDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "omniroute-7753-untrusted-target-")
  );
  fs.writeFileSync(path.join(untrustedTargetDir, binaryName), realBinaryContent);
  const untrustedDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7753-untrusted-"));
  const untrustedInstallDir = path.join(untrustedDir, "installed");
  linkInstallDir(untrustedTargetDir, untrustedInstallDir);

  const result = await checkKnownPath(path.join(untrustedInstallDir, binaryName));
  assert.equal(result.installed, false);
  assert.equal(result.reason, "symlink_escape");

  await fsp.rm(untrustedInstallDir, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
  await fsp.rm(untrustedDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  await fsp.rm(untrustedTargetDir, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
});

test.after(async () => {
  await fsp.rm(installDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  await fsp.rm(sandboxHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  await fsp.rm(outsideDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
