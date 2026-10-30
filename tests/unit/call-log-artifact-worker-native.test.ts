import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-native-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { writeCallArtifactAsync, closeCallLogArtifactWriter } =
  await import("../../src/lib/usage/callLogArtifactWriter.ts");

test.after(async () => {
  await closeCallLogArtifactWriter(0);
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function buildArtifact(id: string) {
  return {
    schemaVersion: 5 as const,
    summary: {
      id,
      timestamp: "2026-10-28T12:34:56.789Z",
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
    requestBody: { messages: [{ role: "user", content: id }] },
    responseBody: { content: "written by the source worker" },
    error: null,
  };
}

function esbuildChildren(): number[] {
  if (process.platform !== "linux") return [];
  const children = new Set<number>();
  for (const task of fs.readdirSync("/proc/self/task")) {
    try {
      const pids = fs.readFileSync(`/proc/self/task/${task}/children`, "utf8").trim();
      for (const pid of pids.split(/\s+/).filter(Boolean)) {
        if (fs.readFileSync(`/proc/${pid}/comm`, "utf8").trim() === "esbuild") {
          children.add(Number(pid));
        }
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return [...children];
}

test("native source writes survive idle restarts and forced close without esbuild children", async (t) => {
  const baseline = new Set(esbuildChildren());
  const extraChildren = new Set<number>();
  const workers = new Set<Worker>();
  const terminations: Promise<number>[] = [];
  const postMessage = Worker.prototype.postMessage;
  const terminate = Worker.prototype.terminate;
  t.mock.method(
    Worker.prototype,
    "postMessage",
    function (this: Worker, ...args: Parameters<Worker["postMessage"]>) {
      workers.add(this);
      return postMessage.apply(this, args);
    }
  );
  t.mock.method(Worker.prototype, "terminate", function (this: Worker) {
    const terminated = terminate.call(this);
    terminations.push(terminated);
    return terminated;
  });
  t.mock.timers.enable({ apis: ["setTimeout"] });

  const census = () => {
    for (const pid of esbuildChildren()) {
      if (!baseline.has(pid)) extraChildren.add(pid);
    }
  };

  try {
    for (let cycle = 0; cycle < 3; cycle++) {
      const artifact = buildArtifact(`native-cycle-${cycle}`);
      const result = await writeCallArtifactAsync(artifact);
      assert.ok(result, "the real source worker must write an artifact");
      const serialized = fs.readFileSync(
        path.join(TEST_DATA_DIR, "call_logs", result.relPath),
        "utf8"
      );
      assert.deepEqual(JSON.parse(serialized), artifact);
      assert.equal(result.sizeBytes, Buffer.byteLength(serialized));
      assert.match(result.sha256, /^[0-9a-f]{8}$/);
      assert.equal(workers.size, cycle + 1, "an idle worker must be restarted");
      census();

      if (cycle < 2) {
        t.mock.timers.tick(29_999);
        assert.equal(terminations.length, cycle, "keep the existing idle timeout");
        t.mock.timers.tick(1);
        assert.equal(terminations.length, cycle + 1);
        await Promise.all(terminations);
        census();
      }
    }

    const pending = [
      writeCallArtifactAsync(buildArtifact("forced-active")),
      writeCallArtifactAsync(buildArtifact("forced-queued")),
    ];
    await closeCallLogArtifactWriter(0);
    assert.deepEqual(await Promise.all(pending), [null, null]);
    await Promise.all(terminations);
    assert.equal(terminations.length, 3);
    census();
    assert.equal(await writeCallArtifactAsync(buildArtifact("after-close")), null);
    assert.deepEqual(
      [...extraChildren],
      [],
      "worker lifecycles must not spawn esbuild children/zombies"
    );
  } finally {
    await closeCallLogArtifactWriter(0);
    await Promise.all(terminations);
    t.mock.timers.reset();
  }
});

test("source worker does not inherit CLI preloads", () => {
  const preloadFile = path.join(TEST_DATA_DIR, "main-thread-only.mjs");
  fs.writeFileSync(
    preloadFile,
    'import { isMainThread } from "node:worker_threads";\n' +
      'if (!isMainThread) throw new Error("inherited CLI preload");\n'
  );
  const childFile = path.join(TEST_DATA_DIR, "source-writer-child.mjs");
  const writerUrl = new URL("../../src/lib/usage/callLogArtifactWriter.ts", import.meta.url).href;
  fs.writeFileSync(
    childFile,
    [
      `import { writeCallArtifactAsync, closeCallLogArtifactWriter } from ${JSON.stringify(writerUrl)};`,
      `const result = await writeCallArtifactAsync(${JSON.stringify(buildArtifact("cli-preloads"))});`,
      "await closeCallLogArtifactWriter();",
      'if (!result) throw new Error("source write failed");',
      "console.log(JSON.stringify(result));",
    ].join("\n")
  );
  const child = spawnSync(
    process.execPath,
    ["--import", "tsx/esm", "--import", pathToFileURL(preloadFile).href, childFile],
    { encoding: "utf8", timeout: 20_000 }
  );
  assert.equal(child.status, 0, child.stderr);
  const result = JSON.parse(child.stdout);
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(TEST_DATA_DIR, "call_logs", result.relPath), "utf8")),
    buildArtifact("cli-preloads")
  );
});
