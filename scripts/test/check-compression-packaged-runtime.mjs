import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const fixture = path.join(root, "tests/fixtures/compression-packaged-runtime");
const LEVELS = { DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40 };
function log(level, message) {
  if (LEVELS[level] >= LEVELS.INFO)
    process.stderr.write(
      `${new Date().toISOString()} ${level} [packaged-compression] ${message}\n`
    );
}
const env = Object.fromEntries(
  [
    "PATH",
    "SystemRoot",
    "WINDIR",
    "TEMP",
    "TMP",
    "HOME",
    "USERPROFILE",
    "LANG",
    "NODE_EXTRA_CA_CERTS",
  ]
    .filter((k) => process.env[k])
    .map((k) => [k, process.env[k]])
);
env.NEXT_TELEMETRY_DISABLED = "1";
async function command(args) {
  const child = spawn(process.execPath, args, { cwd: root, env, stdio: "inherit" });
  const [code] = await once(child, "exit");
  assert.equal(code, 0, "Packaged fixture build failed");
}
let server;
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), "compression package "));
try {
  if (!process.argv.includes("--skip-build"))
    await command(["node_modules/next/dist/bin/next", "build", fixture, "--turbopack"]);
  const installation = path.join(temporary, "installation with spaces");
  await fs.cp(path.join(fixture, ".next/standalone"), installation, { recursive: true });
  const serverRoot = path.join(installation, "tests/fixtures/compression-packaged-runtime");
  await fs.cp(
    path.join(root, "src/lib/db/migrations"),
    path.join(serverRoot, "src/lib/db/migrations"),
    { recursive: true }
  );
  const workerDir = path.join(serverRoot, "open-sse/services/compression");
  await fs.mkdir(workerDir, { recursive: true });
  await build({
    entryPoints: [path.join(root, "open-sse/services/compression/compressionWorker.ts")],
    outfile: path.join(workerDir, "compressionWorker.js"),
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    tsconfig: path.join(root, "tsconfig.json"),
    logLevel: "warning",
  });
  await fs.writeFile(path.join(workerDir, "package.json"), '{"type":"module"}\n');
  // External engine packages resolve from the prepared source install; this probes the emitted
  // pool/worker seam, not npm dependency-closure completeness.
  await fs.symlink(
    path.join(root, "node_modules"),
    path.join(serverRoot, "node_modules"),
    process.platform === "win32" ? "junction" : "dir"
  );
  const { createServer } = await import("node:net");
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const preload = pathToFileURL(path.join(fixture, "deny-worker-preload.mjs")).href;
  server = spawn(process.execPath, ["--import", preload, path.join(serverRoot, "server.js")], {
    cwd: temporary,
    env: {
      ...env,
      PORT: String(port),
      HOSTNAME: "127.0.0.1",
      DATA_DIR: path.join(temporary, "data"),
      NODE_OPTIONS: `--import=${preload}`,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let errors = "";
  server.stdout.resume();
  server.stderr.on("data", (chunk) => {
    errors = (errors + chunk).slice(-20000);
  });
  const deadline = Date.now() + 30000;
  let response;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error("Packaged fixture exited before serving");
    try {
      response = await fetch(`http://127.0.0.1:${port}/api/compress`, {
        method: "POST",
        signal: AbortSignal.timeout(25000),
      });
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  assert.ok(response, "Packaged fixture did not become ready");
  assert.equal(response.status, 200, `Emitted pool failed its real worker job: ${errors}`);
  const result = await response.json();
  assert.equal(result.shrunk, true);
  assert.equal(result.neutral, false);
  assert.equal(result.stacked, true);
  assert.deepEqual(result.steps, [
    { engine: "rtk", state: "done" },
    { engine: "caveman", state: "done" },
  ]);
  assert.deepEqual(result.neutralBody, result.neutralExpected);
  assert.equal(result.preservedStructure, true);
  assert.doesNotMatch(
    errors,
    /worker path failed open|MODULE_NOT_FOUND|gateway preload reached worker/
  );
  log("INFO", "Turbopack emitted pool passed RTK, neutral, ordered stack and cleanup probes");
} catch (error) {
  log("ERROR", "Packaged compression runtime check failed");
  throw error;
} finally {
  if (server && server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    const timer = setTimeout(() => {
      log("WARNING", "Stopping fixture after shutdown deadline");
      server.kill("SIGKILL");
    }, 5000);
    try {
      await exited;
    } finally {
      clearTimeout(timer);
    }
  }
  await fs.rm(temporary, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
