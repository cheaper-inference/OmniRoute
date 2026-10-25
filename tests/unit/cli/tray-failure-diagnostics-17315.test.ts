import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const traySource = new URL("../../../bin/cli/tray/traySystray.mjs", import.meta.url).href;
const secret = "tray-test-private-token-17315";

function probe(mode: string, useDefaultDataDir = false) {
  const root = mkdtempSync(join(tmpdir(), "omniroute-tray-diagnostics-"));
  const home = join(root, "home");
  const dataDir = useDefaultDataDir ? join(home, ".omniroute") : join(root, "configured-data");
  const packageDir = join(home, ".omniroute", "runtime", "node_modules", "systray2");
  mkdirSync(packageDir, { recursive: true });
  writeFileSync(join(packageDir, "package.json"), JSON.stringify({ main: "index.js" }));
  writeFileSync(
    join(packageDir, "index.js"),
    mode === "invalid-export"
      ? "exports.default = {};"
      : `throw Object.assign(new Error("Authorization: Bearer ${secret}"), {code: "ERR_MODULE_NOT_FOUND"});`
  );
  if (mode === "install") rmSync(packageDir, { recursive: true });
  if (mode === "unwritable") writeFileSync(dataDir, "not a directory");
  if (mode === "append") {
    mkdirSync(join(dataDir, "server"), { recursive: true });
    writeFileSync(join(dataDir, "server", "crash.log"), "existing supervisor diagnostic\n");
  }
  try {
    const child = spawnSync(
      process.execPath,
      [
        "--experimental-strip-types",
        "--input-type=module",
        "--eval",
        `
          import assert from "node:assert/strict";
          import os from "node:os";
          import childProcess from "node:child_process";
          import { mock } from "node:test";
          import { syncBuiltinESMExports } from "node:module";
          mock.method(os, "homedir", () => process.env.OMNI_TRAY_TEST_HOME);
          let installCalls = 0;
          if (process.env.OMNI_TRAY_TEST_MODE === "install") {
            mock.method(childProcess, "execSync", () => {
              installCalls++;
              throw Object.assign(new Error("password=" + process.env.OMNI_TRAY_TEST_SECRET), {code: "EACCES"});
            });
          }
          syncBuiltinESMExports();
          const { initSystrayUnix } = await import(process.env.OMNI_TRAY_TEST_SOURCE);
          const mode = process.env.OMNI_TRAY_TEST_MODE;
          const options = { port: 20128, onQuit() {}, onOpenDashboard() {}, onShowLogs() {} };
          class ThrowingTray {
            constructor() {
              const error = new TypeError("password=" + process.env.OMNI_TRAY_TEST_SECRET);
              if (mode === "hostile-code") {
                let reads = 0;
                Object.defineProperty(error, "code", {
                  get() { return ++reads === 1 ? "EACCES" : process.env.OMNI_TRAY_TEST_SECRET; }
                });
              }
              throw error;
            }
          }
          class WorkingTray {
            onClick() {}
            ready() { return Promise.resolve(); }
          }
          const result = mode.startsWith("import") || mode === "invalid-export" || mode === "install"
            ? await initSystrayUnix(options)
            : await initSystrayUnix(options, async () => mode === "success" ? WorkingTray : ThrowingTray);
          if (mode === "success") assert.ok(result);
          else assert.equal(result, null, "tray remains optional when startup fails");
          if (mode === "install") assert.equal(installCalls, 1, "use simulated npm failure only");
          if (mode === "doctor") {
            const { collectDoctorChecks } = await import(new URL("../commands/doctor.mjs", process.env.OMNI_TRAY_TEST_SOURCE));
            const report = await collectDoctorChecks({ rootDir: os.homedir() }, { skipLiveness: true });
            const crash = report.checks.find(check => check.name === "Crash log");
            assert.equal(crash?.status, "warn");
            assert.match(crash.details.tail, /Tray startup failed during constructor/);
            assert.ok(!JSON.stringify(crash).includes(process.env.OMNI_TRAY_TEST_SECRET));
          }
        `,
      ],
      {
        stdio:
          mode === "import-visible" || mode === "install" ? ["ignore", "ignore", "pipe"] : "ignore",
        encoding: "utf8",
        timeout: 15_000,
        env: {
          PATH: process.env.PATH,
          LANG: process.env.LANG,
          SystemRoot: process.env.SystemRoot,
          DATA_DIR: useDefaultDataDir ? undefined : dataDir,
          OMNI_TRAY_TEST_HOME: home,
          OMNI_TRAY_TEST_SOURCE: traySource,
          OMNI_TRAY_TEST_MODE: mode,
          OMNI_TRAY_TEST_SECRET: secret,
        },
      }
    );
    assert.equal(child.error, undefined, "child must finish without timeout");
    assert.equal(child.status, 0, "diagnostics must preserve graceful tray failure/success");
    if (mode === "import-visible" || mode === "install") assert.ok(!child.stderr.includes(secret));
    const crashLog = join(dataDir, "server", "crash.log");
    if (mode === "success" || mode === "unwritable") {
      assert.equal(existsSync(crashLog), false);
      return;
    }
    assert.ok(
      existsSync(crashLog),
      "tray failure must survive ignored stderr in the doctor crash log"
    );
    const contents = readFileSync(crashLog, "utf8");
    assert.match(contents, /tray/i);
    assert.match(
      contents,
      mode.startsWith("import") ? /import/i : mode === "install" ? /install/i : /constructor/i
    );
    assert.match(
      contents,
      mode.startsWith("import")
        ? /ERR_MODULE_NOT_FOUND/
        : mode === "hostile-code" || mode === "install"
          ? /EACCES/
          : /TypeError/
    );
    assert.ok(!contents.includes(secret), "diagnostics must not persist credentials from errors");
    assert.ok(!contents.includes("password="));
    assert.ok(!contents.includes("Authorization:"));
    if (mode === "append") assert.ok(contents.startsWith("existing supervisor diagnostic\n"));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("#17315 constructor failure persists a safe diagnostic with ignored stderr", () =>
  probe("constructor"));
test("#17315 runtime import failure persists a safe diagnostic with ignored stderr", () =>
  probe("import"));
test("#17315 diagnostic path follows the default data directory when DATA_DIR is absent", () =>
  probe("constructor", true));
test("#17315 successful tray startup does not create a failure diagnostic", () => probe("success"));
test("#17315 diagnostic write failure does not turn optional tray failure into a crash", () =>
  probe("unwritable"));
test("#17315 error code is validated without a second unsafe getter read", () =>
  probe("hostile-code"));
test("#17315 tray diagnostics preserve prior supervisor records", () => probe("append"));
test("#17315 visible stderr does not disclose the import error credential", () =>
  probe("import-visible"));
test("#17315 doctor surfaces the persisted tray failure without exposing credentials", () =>
  probe("doctor"));
test("#17315 invalid constructor export records why the loader returned null", () =>
  probe("invalid-export"));
test("#17315 simulated npm install failure persists a safe diagnostic", () => probe("install"));
