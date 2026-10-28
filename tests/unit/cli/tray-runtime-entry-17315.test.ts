import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const runtimeSource = new URL("../../../bin/cli/runtime/trayRuntime.ts", import.meta.url).href;

// Run the actual ESM loader in a fresh process: tsx's resolution hooks can hide
// unsupported directory imports. Mock homedir before importing the production
// module so this test never reads/writes the operator's runtime or credentials.
function runProbe(mode: string) {
  const root = mkdtempSync(join(tmpdir(), "omniroute-tray-17315-"));
  const packageDir = join(root, ".omniroute", "runtime", "node_modules", "systray2");
  mkdirSync(packageDir, { recursive: true });
  writeFileSync(
    join(packageDir, "package.json"),
    JSON.stringify({
      name: "systray2",
      version: "2.1.4",
      main: "index.js",
      type: mode.startsWith("esm-") ? "module" : "commonjs",
    })
  );
  // Match systray2@2.1.4's TypeScript-compiled CJS export shape without a GUI binary.
  const constructor = 'class SysTray { constructor() { this.marker = "fixture"; } }';
  const fixtureSources: Record<string, string> = {
    "plain-cjs": `module.exports = ${constructor};`,
    "esm-default": `export default ${constructor};`,
    "esm-named": `export ${constructor};`,
    invalid: "exports.default = { notAConstructor: true };",
    arrow: 'exports.default = () => ({ marker: "fixture" });',
    "no-invocation":
      'exports.default = class SysTray { constructor() { throw new Error("must not run"); } };',
  };
  writeFileSync(
    join(packageDir, "index.js"),
    fixtureSources[mode] ??
      'Object.defineProperty(exports, "__esModule", { value: true });\n' +
        `exports.default = ${constructor};\n`
  );
  try {
    return spawnSync(
      process.execPath,
      [
        "--experimental-strip-types",
        "--input-type=module",
        "--eval",
        `
          import assert from "node:assert/strict";
          import os from "node:os";
          import { mock } from "node:test";
          import { join } from "node:path";
          import { pathToFileURL } from "node:url";
          import { registerHooks, syncBuiltinESMExports } from "node:module";
          mock.method(os, "homedir", () => process.env.OMNI_TRAY_TEST_ROOT);
          syncBuiltinESMExports();
          const runtimeDir = join(os.homedir(), ".omniroute", "runtime");
          const packageDir = join(runtimeDir, "node_modules", "systray2");
          const directoryURL = pathToFileURL(packageDir).href;
          const entryURL = pathToFileURL(join(packageDir, "index.js")).href;
          const mode = process.env.OMNI_TRAY_TEST_MODE;
          if (mode === "unwrap") {
            // Isolate bug 2 by bypassing ONLY bug 1 in the Node resolver. The
            // production loadSystray function and export selection stay intact.
            registerHooks({
              resolve(specifier, context, nextResolve) {
                return nextResolve(specifier === directoryURL ? entryURL : specifier, context);
              },
            });
          }
          const { systrayModuleSpecifier, loadSystray } = await import(process.env.OMNI_TRAY_TEST_SOURCE);
          if (mode === "control") {
            const mod = await import(entryURL);
            assert.equal(typeof mod.default, "object");
            assert.equal(typeof mod.default.default, "function");
            assert.equal(new mod.default.default().marker, "fixture");
          } else if (mode === "specifier") {
            const mod = await import(systrayModuleSpecifier(runtimeDir));
            assert.ok(mod, "resolved package entry must import with native Node ESM");
          } else {
            const ctor = await loadSystray();
            if (mode === "invalid" || mode === "arrow") {
              assert.equal(ctor, null, "invalid exports must not escape as constructors");
              process.exit(0);
            }
            assert.equal(typeof ctor, "function", "loadSystray must return the constructor");
            if (mode !== "no-invocation") assert.equal(new ctor().marker, "fixture");
          }
        `,
      ],
      {
        encoding: "utf8",
        timeout: 15_000,
        env: {
          PATH: process.env.PATH,
          LANG: process.env.LANG,
          SystemRoot: process.env.SystemRoot,
          NODE_OPTIONS: "",
          DATA_DIR: join(root, "data"),
          OMNI_TRAY_TEST_ROOT: root,
          OMNI_TRAY_TEST_MODE: mode,
          OMNI_TRAY_TEST_SOURCE: runtimeSource,
        },
      }
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

for (const [mode, description] of [
  ["control", "real Node interop exposes the fixture constructor through double default"],
  ["specifier", "package entry imports successfully without tsx directory resolution"],
  ["loader", "cached systray2 loads as a constructor through the production loader"],
  ["unwrap", "production loader unwraps the CJS constructor when entry resolution succeeds"],
  ["plain-cjs", "plain CommonJS constructor exports remain supported"],
  ["esm-default", "ESM default constructor exports remain supported"],
  ["esm-named", "ESM named SysTray constructor exports remain supported"],
  ["invalid", "nonfunction exports are rejected"],
  ["arrow", "nonconstructible function exports are rejected"],
  ["no-invocation", "constructor validation never runs the native tray constructor"],
]) {
  test(`#17315 ${description}`, () => {
    const result = runProbe(mode);
    assert.equal(result.error, undefined, "probe must launch and finish without timeout");
    assert.equal(result.status, 0, result.stderr || result.stdout);
  });
}
