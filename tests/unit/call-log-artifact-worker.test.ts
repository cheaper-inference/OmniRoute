import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { buildSync } from "esbuild";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-worker-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { writeCallArtifactAsync, closeCallLogArtifactWriter, resolveCallLogArtifactWorker } =
  await import("../../src/lib/usage/callLogArtifactWriter.ts");

test.after(async () => {
  await closeCallLogArtifactWriter();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function buildArtifact(id: string) {
  return {
    schemaVersion: 5 as const,
    summary: {
      id,
      timestamp: "2026-08-11T12:34:56.789Z",
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "test-model",
      requestedModel: null,
      provider: "test-provider",
      account: "test-account",
      connectionId: null,
      duration: 10,
      tokens: {
        in: 1,
        out: 2,
        cacheRead: null,
        cacheWrite: null,
        reasoning: null,
        compressed: null,
      },
      requestType: "chat",
      sourceFormat: "openai",
      targetFormat: "openai",
      apiKeyId: null,
      apiKeyName: null,
      comboName: null,
      comboStepId: null,
      comboExecutionKey: null,
    },
    requestBody: { worker: true },
    responseBody: { content: "written" },
    error: null,
  };
}

test("worker resolution covers npm, standalone, source, and missing layouts", () => {
  const layoutRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-worker-layout-"));
  const createWorker = (workerFile: string) => {
    fs.mkdirSync(path.dirname(workerFile), { recursive: true });
    fs.writeFileSync(workerFile, "");
  };

  try {
    const npmRoot = path.join(layoutRoot, "package", "dist");
    const npmWorker = path.join(npmRoot, "src", "lib", "usage", "callLogArtifactWorker.js");
    createWorker(npmWorker);
    assert.deepEqual(
      resolveCallLogArtifactWorker({
        moduleDir: path.join(npmRoot, ".next", "server", "chunks"),
        cwd: path.join(layoutRoot, "unrelated-caller"),
        entryFile: path.join(npmRoot, "server.js"),
        fileExists: fs.existsSync,
      }),
      { workerFile: npmWorker, execArgv: [] }
    );

    const standaloneRoot = path.join(layoutRoot, "standalone");
    const standaloneWorker = path.join(
      standaloneRoot,
      "src",
      "lib",
      "usage",
      "callLogArtifactWorker.js"
    );
    createWorker(standaloneWorker);
    assert.deepEqual(
      resolveCallLogArtifactWorker({
        moduleDir: path.join(standaloneRoot, ".next", "server", "chunks"),
        cwd: standaloneRoot,
        entryFile: null,
        fileExists: fs.existsSync,
      }),
      { workerFile: standaloneWorker, execArgv: [] }
    );

    const sourceDir = path.join(layoutRoot, "source", "src", "lib", "usage");
    const sourceWorker = path.join(sourceDir, "callLogArtifactWorker.ts");
    createWorker(sourceWorker);
    assert.deepEqual(
      resolveCallLogArtifactWorker({
        moduleDir: sourceDir,
        cwd: path.join(layoutRoot, "unrelated-source-caller"),
        entryFile: null,
        fileExists: fs.existsSync,
      }),
      { workerFile: sourceWorker, execArgv: [] }
    );

    const cwdSourceRoot = path.join(layoutRoot, "cwd-source");
    const cwdSourceWorker = path.join(cwdSourceRoot, "src/lib/usage/callLogArtifactWorker.ts");
    createWorker(cwdSourceWorker);
    assert.deepEqual(
      resolveCallLogArtifactWorker({
        moduleDir: path.join(layoutRoot, "compiled-chunk"),
        cwd: cwdSourceRoot,
        entryFile: null,
        fileExists: fs.existsSync,
      }),
      { workerFile: cwdSourceWorker, execArgv: [] }
    );

    const moduleJs = path.join(sourceDir, "callLogArtifactWorker.js");
    createWorker(moduleJs);
    assert.deepEqual(
      resolveCallLogArtifactWorker({
        moduleDir: sourceDir,
        cwd: standaloneRoot,
        entryFile: path.join(npmRoot, "server.js"),
        fileExists: fs.existsSync,
      }),
      { workerFile: moduleJs, execArgv: [] }
    );

    const missingRoot = path.join(layoutRoot, "missing");
    assert.deepEqual(
      resolveCallLogArtifactWorker({
        moduleDir: path.join(missingRoot, ".next", "server", "chunks"),
        cwd: path.join(layoutRoot, "unrelated-missing-caller"),
        entryFile: path.join(missingRoot, "server.js"),
        fileExists: fs.existsSync,
      }),
      {
        workerFile: path.join(missingRoot, "src", "lib", "usage", "callLogArtifactWorker.js"),
        execArgv: [],
      }
    );
  } finally {
    fs.rmSync(layoutRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }

  const resolved = resolveCallLogArtifactWorker();
  assert.equal(fs.existsSync(resolved.workerFile), true);
  assert.equal(path.basename(resolved.workerFile), "callLogArtifactWorker.ts");
  assert.deepEqual(resolved.execArgv, []);

  const source = fs.readFileSync("src/lib/usage/callLogArtifactWriter.ts", "utf8");
  assert.doesNotMatch(source, /firstAncestorWith|MAX_WALK_UP|runtimeAnchors/);
  assert.doesNotMatch(source, /new Worker\(/);
  assert.match(source, /Reflect\.construct\(Worker/);
});

test("packaged JS bundles execute from standalone and scoped node_modules layouts", () => {
  const layoutRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-worker-bundle-"));
  try {
    const bundle = buildSync({
      entryPoints: ["src/lib/usage/callLogArtifactWorker.ts"],
      bundle: true,
      platform: "node",
      packages: "external",
      format: "esm",
      write: false,
    }).outputFiles[0].text;

    for (const scoped of [false, true]) {
      const runtimeRoot = scoped
        ? path.join(layoutRoot, "node_modules", "@omniroute", "runtime")
        : path.join(layoutRoot, "standalone");
      const workerFile = path.join(runtimeRoot, "src/lib/usage/callLogArtifactWorker.js");
      fs.mkdirSync(path.dirname(workerFile), { recursive: true });
      fs.writeFileSync(workerFile, bundle);
      if (scoped) {
        fs.writeFileSync(path.join(runtimeRoot, "package.json"), '{"type":"module"}');
      }
      const entryFile = path.join(runtimeRoot, "server.cjs");
      fs.writeFileSync(
        entryFile,
        [
          'const fs = require("node:fs");',
          'const { Worker } = require("node:worker_threads");',
          'const { pathToFileURL } = require("node:url");',
          "const worker = new Worker(pathToFileURL(process.argv[2]), { execArgv: [] });",
          'worker.on("error", (error) => { console.error(error); process.exitCode = 1; });',
          'worker.once("message", async (reply) => {',
          "  console.log(JSON.stringify(reply));",
          "  await worker.terminate();",
          "});",
          'worker.postMessage({ id: 1, artifact: JSON.parse(fs.readFileSync(0, "utf8")),',
          "  environment: { dataDir: process.argv[3] } });",
        ].join("\n")
      );
      const resolved = resolveCallLogArtifactWorker({
        moduleDir: path.join(runtimeRoot, ".next/server/chunks"),
        cwd: layoutRoot,
        entryFile,
      });
      assert.deepEqual(resolved, { workerFile, execArgv: [] });
      const artifact = buildArtifact(scoped ? "scoped-bundle" : "standalone-bundle");
      const result = spawnSync(process.execPath, [entryFile, resolved.workerFile, runtimeRoot], {
        input: JSON.stringify(artifact),
        encoding: "utf8",
        timeout: 20_000,
      });
      assert.equal(result.status, 0, result.stderr);
      const reply = JSON.parse(result.stdout);
      assert.equal(reply.id, 1);
      assert.ok(reply.result);
      const serialized = fs.readFileSync(
        path.join(runtimeRoot, "call_logs", reply.result.relPath),
        "utf8"
      );
      assert.deepEqual(JSON.parse(serialized), artifact);
      assert.equal(reply.result.sizeBytes, Buffer.byteLength(serialized));
      assert.match(reply.result.sha256, /^[0-9a-f]{8}$/);
    }
  } finally {
    fs.rmSync(layoutRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("async worker writes call-log artifact and returns matching metadata", async () => {
  const artifact = buildArtifact("worker-write-1");
  const result = await writeCallArtifactAsync(artifact);
  assert.ok(result);

  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", result.relPath);
  const serialized = fs.readFileSync(artifactPath, "utf8");
  assert.equal(result.sizeBytes, Buffer.byteLength(serialized));
  assert.match(result.sha256, /^[0-9a-f]{8}$/);
  assert.deepEqual(JSON.parse(serialized), artifact);
});

test("bounded queue fails open and rate-limits saturation warnings", async () => {
  const originalWarn = console.warn;
  let warningCount = 0;
  console.warn = () => {
    warningCount++;
  };

  try {
    const writes = Array.from({ length: 131 }, (_, index) =>
      writeCallArtifactAsync(buildArtifact(`worker-overflow-${index}`))
    );
    assert.equal(warningCount, 1);

    await closeCallLogArtifactWriter(0);
    const results = await Promise.all(writes);
    assert.ok(results.every((result) => result === null));
  } finally {
    console.warn = originalWarn;
  }
});
