import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { systrayModuleSpecifier, SYSTRAY_PACKAGE } from "../../../bin/cli/runtime/trayRuntime.ts";

function installedRuntime(t: TestContext) {
  const runtimeDir = mkdtempSync(path.join(os.tmpdir(), "omniroute tray #%"));
  t.after(() => rmSync(runtimeDir, { recursive: true, force: true }));
  const packageDir = path.join(runtimeDir, "node_modules", SYSTRAY_PACKAGE);
  mkdirSync(path.join(packageDir, "lib"), { recursive: true });
  writeFileSync(
    path.join(packageDir, "package.json"),
    JSON.stringify({ name: SYSTRAY_PACKAGE, main: "lib/tray.cjs" })
  );
  const entry = path.join(packageDir, "lib", "tray.cjs");
  writeFileSync(entry, "module.exports = class SysTray {};");
  return { runtimeDir, entry };
}

// Preserve the Windows drive-letter regression while testing an actual package
// entry. A syntactically valid file:// directory URL is still rejected by ESM.
test("systrayModuleSpecifier returns an escaped file URL for an installed package", (t) => {
  const { runtimeDir, entry } = installedRuntime(t);
  const spec = systrayModuleSpecifier(runtimeDir);
  assert.match(spec, /^file:\/\//);
  assert.ok(spec.includes(SYSTRAY_PACKAGE));
  assert.equal(spec, pathToFileURL(entry).href);
  assert.match(spec, /%20/);
  assert.match(spec, /%23/);
  assert.match(spec, /%25/);
});

test("systrayModuleSpecifier resolves the package main entry instead of its directory", (t) => {
  const { runtimeDir, entry } = installedRuntime(t);
  assert.equal(systrayModuleSpecifier(runtimeDir), pathToFileURL(entry).href);
});
