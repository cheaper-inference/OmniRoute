import assert from "node:assert/strict";
import { after, test } from "node:test";
import { Worker } from "node:worker_threads";
import { ultraEngine } from "../../../open-sse/services/compression/engines/cavemanAdapter.ts";
import {
  applyCompression,
  applyCompressionAsync,
} from "../../../open-sse/services/compression/strategySelector.ts";
import {
  closeCompressionWorkerPoolForTests,
  __setCompressionWorkerFactoryForTests,
} from "../../../open-sse/services/compression/compressionWorkerPool.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

after(() => closeCompressionWorkerPoolForTests());

test("adaptive Ultra in a mixed stack runs in a worker with unchanged output", async () => {
  const body = {
    messages: [
      { role: "system", content: "Keep the system instructions intact." },
      {
        role: "user",
        content:
          "Please basically actually carefully explain this important task. ".repeat(200) +
          "\n```js\nconst total = 1 + 2;\n```",
      },
    ],
  };
  const config = {
    enabled: true,
    preserveSystemPrompt: true,
    stackedPipeline: [
      { engine: "lite" },
      { engine: "ultra", config: { maxTokensPerMessage: 1, compressionRate: 0.5 } },
    ],
  } as CompressionConfig;
  const expected = applyCompression(body, "stacked", { config });
  let posted = 0;
  const original = Worker.prototype.postMessage;
  Worker.prototype.postMessage = function (...args) {
    if (args[0]?.options?.engineStep === "ultra") posted++;
    return original.apply(this, args);
  };
  try {
    const steps: string[] = [];
    const actual = await applyCompressionAsync(body, "stacked", {
      config,
      onEngineStep: (step) => steps.push(step.engine),
    });
    assert.ok(posted > 0, "Ultra must not execute on the gateway thread");
    assert.deepEqual(actual.body, expected.body);
    assert.equal(actual.compressed, expected.compressed);
    assert.deepEqual(actual.body.messages[0], body.messages[0]);
    assert.equal(actual.stats?.compressedTokens, expected.stats?.compressedTokens);
    assert.ok(steps.includes("ultra"), "progress callbacks must stay on the gateway thread");
  } finally {
    Worker.prototype.postMessage = original;
  }
});

test("Ultra worker preserves native Responses shape and step overrides", async () => {
  assert.equal(typeof ultraEngine.applyAsync, "function");
  const body = {
    input: [
      {
        role: "user",
        content: "Please basically actually carefully explain this task. ".repeat(100),
      },
    ],
  };
  const options = { stepConfig: { maxTokensPerMessage: 1, compressionRate: 0.7 } };
  const expected = ultraEngine.apply(body, options);
  const actual = await ultraEngine.applyAsync!(body, options);
  assert.deepEqual(actual.body, expected.body);
  assert.equal(actual.compressed, expected.compressed);
  assert.equal(actual.stats?.mode, expected.stats?.mode);
});

test("a failed Ultra worker does not rerun expensive pruning on the gateway thread", async () => {
  const body = {
    messages: [{ role: "user", content: "Please explain this important task. ".repeat(100) }],
  };
  const before = structuredClone(body);
  await __setCompressionWorkerFactoryForTests(() => {
    throw new Error("worker unavailable");
  });
  try {
    await assert.rejects(ultraEngine.applyAsync!(body), /worker unavailable/);
    assert.deepEqual(body, before);
  } finally {
    await __setCompressionWorkerFactoryForTests(null);
  }
});
