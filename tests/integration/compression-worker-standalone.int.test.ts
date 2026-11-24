import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, readFileSync } from "node:fs";
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import { Worker } from "node:worker_threads";
import { build } from "esbuild";

import type { CompressionWorkerMessage } from "../../open-sse/services/compression/compressionWorkerProtocol.ts";
import type { CompressionResult } from "../../open-sse/services/compression/types.ts";

const standalone = resolve(process.env.OMNIROUTE_STANDALONE_DIR ?? ".build/next/standalone");
const workerFile = join(standalone, "open-sse/services/compression/compressionWorker.js");
const workerScope = join(standalone, "open-sse/services/compression/package.json");

function runWorker(): Promise<CompressionWorkerMessage> {
  return new Promise((resolveResult, reject) => {
    // Production starts the bundle with plain node; do not inherit the test runner's tsx loader.
    const worker = new Worker(workerFile, { execArgv: [] });
    const timer = setTimeout(() => {
      void worker.terminate();
      reject(new Error("standalone compression worker did not reply"));
    }, 30_000);
    worker.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    worker.on("message", (message: CompressionWorkerMessage) => {
      if (message.type !== "result" && message.type !== "error") return;
      clearTimeout(timer);
      void worker.terminate();
      resolveResult(message);
    });
    worker.postMessage({
      id: 12797,
      body: {
        messages: [
          {
            role: "user",
            content: "Please basically actually simply carefully help with this task. ".repeat(80),
          },
        ],
      },
      mode: "stacked",
      options: {
        config: {
          stackedPipeline: [{ engine: "rtk" }, { engine: "caveman" }],
        },
      },
    });
  });
}

test(
  "real standalone artifact starts the compression worker and returns a result",
  {
    skip: process.env.RUN_STANDALONE_INT !== "1" && "requires a real npm run build artifact",
  },
  async () => {
    assert.ok(existsSync(join(standalone, "server.js")), "build the real standalone server first");
    assert.ok(existsSync(workerFile), "postbuild must colocate the compression worker");
    assert.equal(JSON.parse(readFileSync(workerScope, "utf8")).type, "module");
    assert.ok(readFileSync(workerFile, "utf8").length > 1024, "placeholder was not replaced");

    const message = await runWorker();
    assert.equal(message.type, "result", message.type === "error" ? message.error : "");
    if (message.type !== "result") return;
    assert.equal(message.id, 12797);
    assert.ok(message.result.body.messages, "worker returned a compressed request body");
    assert.ok(message.result.stats, "real compression completed rather than failing open");
  }
);

test(
  "the Turbopack-compiled pool starts a compression worker from an installed path with spaces",
  {
    skip: process.env.RUN_STANDALONE_INT !== "1" && "requires a Next.js fixture build",
    timeout: 180_000,
  },
  async (context) => {
    const root = resolve(import.meta.dirname, "../..");
    const fixturePath = "tests/fixtures/compression-packaged-runtime";
    const fixture = join(root, fixturePath);
    const env: NodeJS.ProcessEnv = { NEXT_TELEMETRY_DISABLED: "1" };
    for (const key of ["PATH", "HOME", "USERPROFILE", "SYSTEMROOT", "TEMP", "TMP"]) {
      if (process.env[key]) env[key] = process.env[key];
    }
    const compile = spawn(
      process.execPath,
      [join(root, "node_modules/next/dist/bin/next"), "build", fixture, "--turbopack"],
      { cwd: root, env, stdio: "inherit", signal: AbortSignal.timeout(120_000) }
    );
    const [buildCode] = await once(compile, "exit");
    assert.equal(buildCode, 0, "The Turbopack fixture should compile");

    const temporary = await mkdtemp(join(tmpdir(), "compression install "));
    context.after(() => rm(temporary, { recursive: true, force: true, maxRetries: 5 }));
    const installation = join(temporary, "package with spaces");
    await cp(join(fixture, ".next/standalone"), installation, { recursive: true });
    const serverRoot = join(installation, fixturePath);
    const workerDir = join(serverRoot, "open-sse/services/compression");
    await mkdir(workerDir, { recursive: true });
    await build({
      entryPoints: [join(root, "open-sse/services/compression/compressionWorker.ts")],
      outfile: join(workerDir, "compressionWorker.js"),
      bundle: true,
      platform: "node",
      packages: "external",
      format: "esm",
      tsconfig: join(root, "tsconfig.json"),
    });
    await writeFile(join(workerDir, "package.json"), '{"type":"module"}\n', "utf8");
    await cp(join(root, "src/lib/db/migrations"), join(serverRoot, "src/lib/db/migrations"), {
      recursive: true,
    });
    // Mirror the install's external engine packages without rebuilding its dependency closure.
    await symlink(
      join(root, "node_modules"),
      join(serverRoot, "node_modules"),
      process.platform === "win32" ? "junction" : "dir"
    );

    // Call the emitted route in plain Node with the same cwd as standalone server.js.
    // The test needs the real compiled pool and Worker, so no HTTP listener is needed.
    const resultFile = join(temporary, "result.json");
    const runRoute = `
      const { writeFile } = require("node:fs/promises");
      const { routeModule } = require("./.next/server/app/api/compress/route.js");
      void routeModule.userland.POST().then(async (response) => {
        await writeFile(process.env.FIXTURE_RESULT_FILE, await response.text(), "utf8");
      });
    `;
    const worker = spawn(process.execPath, ["--eval", runRoute], {
      cwd: serverRoot,
      env: { ...env, DATA_DIR: join(temporary, "data"), FIXTURE_RESULT_FILE: resultFile },
      stdio: "inherit",
      signal: AbortSignal.timeout(20_000),
    });
    const [workerCode] = await once(worker, "exit");
    assert.equal(workerCode, 0, "The compiled route should report a compression result");
    const result = JSON.parse(readFileSync(resultFile, "utf8")) as CompressionResult;
    assert.equal(result.compressed, true);
    assert.ok(result.stats);
    assert.deepEqual((result.body.messages as unknown[])[0], {
      role: "system",
      content: "Keep this instruction unchanged.",
    });
  }
);
