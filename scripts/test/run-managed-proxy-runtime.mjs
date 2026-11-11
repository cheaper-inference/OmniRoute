import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sweepFixtureChildren } from "./managed-proxy-fixture-children.mjs";

assert.equal(process.env.GITHUB_ACTIONS, "true", "Managed runtime verification is hosted-only");
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const artifacts = path.join(project, "_artifacts");
fs.mkdirSync(artifacts, { recursive: true });
const root = fs.mkdtempSync(path.join(artifacts, "managed-runtime-"));
const env = {};
for (const key of ["PATH", "SystemRoot", "WINDIR", "PATHEXT", "COMSPEC"])
  if (process.env[key]) env[key] = process.env[key];
Object.assign(env, {
  CI: "true",
  GITHUB_ACTIONS: "true",
  NODE_ENV: "test",
  NO_COLOR: "1",
  HOOKMAKER_MAX_TEST_WORKERS: "1",
  MANAGED_PROXY_FIXTURE_ROOT: root,
  STORAGE_ENCRYPTION_KEY: "synthetic-managed-fixture-key",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  NEXT_TELEMETRY_DISABLED: "1",
});
for (const key of [
  "DATA_DIR",
  "HOME",
  "USERPROFILE",
  "APPDATA",
  "LOCALAPPDATA",
  "TEMP",
  "TMP",
  "XDG_CONFIG_HOME",
  "XDG_CACHE_HOME",
  "XDG_DATA_HOME",
]) {
  env[key] = path.join(root, key.toLowerCase());
  fs.mkdirSync(env[key], { recursive: true });
}
env.SQLITE_FILE = env.OMNIROUTE_SQLITE_FILE = path.join(env.DATA_DIR, "storage.sqlite");

let cleanupVerified = true;
/** Run one isolated suite with bounded output-idle/wall time and verified child cleanup. */
async function run(args, wallMs = 120000) {
  const child = spawn(process.execPath, args, {
    cwd: project,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
    // Own the complete POSIX test tree, not only the runner.
    detached: process.platform !== "win32",
  });
  let timedOut = false;
  let idle;
  /** Terminate only this runner's process tree when its progress or wall-time deadline expires. */
  const kill = () => {
    timedOut = true;
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
        windowsHide: true,
        timeout: 10000,
        stdio: "ignore",
      });
    } else {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
  };
  /** Refresh the idle deadline whenever either captured stream produces output. */
  const progress = () => {
    clearTimeout(idle);
    idle = setTimeout(kill, 45000);
  };
  for (const [stream, output] of [
    [child.stdout, process.stdout],
    [child.stderr, process.stderr],
  ])
    stream.on("data", (chunk) => {
      progress();
      output.write(chunk);
    });
  progress();
  const wall = setTimeout(kill, wallMs);
  try {
    const code = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    assert.ok(!timedOut, "Managed runtime command exceeded wall/idle bound");
    assert.equal(code, 0, "Managed runtime command failed");
  } finally {
    clearTimeout(idle);
    clearTimeout(wall);
    if (process.platform !== "win32" && child.pid) {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
    try {
      await sweepFixtureChildren(root, env);
    } catch (error) {
      cleanupVerified = false;
      throw error;
    }
  }
}

try {
  const nodeFiles = fs
    .readdirSync(path.join(project, "tests/integration/managed-proxy"))
    .filter((name) => /^managedProxy.*\.test\.ts$/.test(name))
    .sort();
  assert.deepEqual(nodeFiles, [
    "managedProxyArchive.test.ts",
    "managedProxyConfig.test.ts",
    "managedProxyManager.test.ts",
  ]);
  await run([
    "--import",
    "tsx/esm",
    "--test",
    "--test-concurrency=1",
    "--test-timeout=20000",
    ...nodeFiles.map((name) => `tests/integration/managed-proxy/${name}`),
  ]);
  const uiFiles = fs
    .readdirSync(path.join(project, "tests/integration/managed-proxy"))
    .filter((name) => /^managedProxy.*\.test\.tsx$/.test(name))
    .sort();
  assert.deepEqual(uiFiles, [
    "managedProxyAuth.test.tsx",
    "managedProxyDeletionDispatch.test.tsx",
    "managedProxyDeletionHandlers.test.tsx",
    "managedProxyLifecycle.test.tsx",
    "managedProxyRemoval.test.tsx",
    "managedProxyUi.test.tsx",
  ]);
  await run([
    "node_modules/vitest/vitest.mjs",
    "run",
    "--config",
    "vitest.managed-proxy.config.ts",
    ...uiFiles.map((name) => `tests/integration/managed-proxy/${name}`),
    "--maxWorkers=1",
    "--maxConcurrency=1",
    "--no-file-parallelism",
    "--testTimeout=15000",
    "--hookTimeout=15000",
    "--retry=0",
  ]);
  await run(
    [
      "--import",
      "tsx/esm",
      "--test",
      "--test-concurrency=1",
      "--test-timeout=95000",
      "tests/integration/managed-proxy/deletion-dispatch.test.ts",
    ],
    200000
  );
} finally {
  if (cleanupVerified) fs.rmSync(root, { recursive: true, force: true });
  else console.error("Managed fixture diagnostics retained because cleanup was not verified");
}
