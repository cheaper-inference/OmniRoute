/**
 * Regression test for #19863 — AgentBridge reports certTrusted=false on Windows
 * although direct certificate check returns true.
 *
 * Root cause: `src/mitm/cert/install.ts` defined `const IS_WIN = process.platform === "win32"`
 * and `const IS_MAC = process.platform === "darwin"` as module-load constants.
 * When Turbopack/Next.js builds the production server bundle on Linux CI, it
 * constant-folds `process.platform === "win32"` at build time to `false`, pruning
 * `checkCertInstalledWindows()` from the Next.js bundle and falling through to the
 * Linux file-check branch which always returns `false` on Windows.
 *
 * Fix: Replace module-load constants with dynamic runtime checks (`isWin()`, `isMac()`)
 * backed by `os.platform()`, which bundlers cannot statically fold.
 */
import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";

import {
  isWin,
  isMac,
  buildCertManualGuide,
  checkCertInstalled,
} from "../../src/mitm/cert/install.ts";

test("isWin and isMac are dynamic runtime functions, not static constants", () => {
  assert.equal(typeof isWin, "function", "isWin must be an exported callable function");
  assert.equal(typeof isMac, "function", "isMac must be an exported callable function");
});

test("isWin and isMac accurately reflect os.platform() at runtime", () => {
  const currentPlatform = os.platform();
  if (currentPlatform === "win32") {
    assert.equal(isWin(), true, "isWin() should return true on win32");
    assert.equal(isMac(), false, "isMac() should return false on win32");
  } else if (currentPlatform === "darwin") {
    assert.equal(isMac(), true, "isMac() should return true on darwin");
    assert.equal(isWin(), false, "isWin() should return false on darwin");
  } else {
    assert.equal(isWin(), false, "isWin() should return false on non-windows");
    assert.equal(isMac(), false, "isMac() should return false on non-mac");
  }
});

test("buildCertManualGuide defaults platform to dynamic os.platform() without folding", () => {
  const guide = buildCertManualGuide("C:/test/cert.crt");
  assert.equal(
    guide.platform,
    os.platform(),
    "guide.platform should match the dynamic os.platform()"
  );
  assert.ok(Array.isArray(guide.steps), "guide steps should be an array");
  assert.ok(guide.steps.length > 0, "guide steps should not be empty");
});

test("checkCertInstalled does not throw when checking non-existent cert file", async () => {
  const dummyCertPath = path.join(os.tmpdir(), "non-existent-cert-19863.crt");
  const result = await checkCertInstalled(dummyCertPath);
  assert.equal(result, false, "non-existent cert should return false without crashing");
});
