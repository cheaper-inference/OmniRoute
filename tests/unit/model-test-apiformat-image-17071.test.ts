// #17071 — the dashboard "Test model" probe ignored a custom model's "Image Generation"
// apiFormat whenever the add-model form's default "chat" endpoint tick survived, so an
// Agnes image model was sent as a chat completion and chat.ts (#6457) answered 400.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Own DATA_DIR before any DB import, so a single-file run never writes to ~/.omniroute.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-17071-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { detectTestKind, runSingleModelTest } = await import("../../src/lib/api/modelTestRunner.ts");
const { isImageOnlyModel } = await import("../../open-sse/config/imageRegistry.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const serial = { concurrency: false };

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("#17071 — isImageOnlyModel: image-registry model absent from the chat catalog", serial, () => {
  assert.equal(isImageOnlyModel("agnes/agnes-image-2.5-flash"), true);
  assert.equal(isImageOnlyModel("agnes/agnes-2.5-flash"), false, "chat model");
  assert.equal(isImageOnlyModel("openai/gpt-4o"), false, "not an image-registry model");
});

test("#17071 — apiFormat images-generations wins over the default chat tick", serial, () => {
  const result = detectTestKind(
    "vendor/custom-image",
    { apiFormat: "images-generations", supportedEndpoints: ["chat", "images"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, true);
});

test("#17071 — apiFormat video wins over the default chat tick", serial, () => {
  const result = detectTestKind(
    "vendor/custom-video",
    { apiFormat: "video", supportedEndpoints: ["chat", "videos"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, true);
});

test(
  "#17071 — image-only registry model is never chat-probed, even without metadata",
  serial,
  () => {
    assert.equal(
      detectTestKind("agnes/agnes-image-2.5-flash", null, undefined).isNonChatGeneration,
      true
    );
  }
);

test("#17071 — 'images-generations' endpoint tag counts as generation-only", serial, () => {
  const result = detectTestKind(
    "vendor/x",
    { supportedEndpoints: ["images-generations"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, true);
});

test("#17071 — chat-catalog models stay chat-probed", serial, () => {
  assert.equal(
    detectTestKind("agnes/agnes-2.5-flash", { supportedEndpoints: ["chat"] }, undefined)
      .isNonChatGeneration,
    false
  );
});

test("#17071 — the issue's stored Agnes row is skipped and never dispatched", serial, async () => {
  const { addCustomModel } = await import("../../src/lib/db/models.ts");
  await addCustomModel(
    "agnes",
    "agnes-image-2.5-flash",
    undefined,
    "manual",
    "images-generations",
    ["chat", "images"]
  );

  const originalFetch = globalThis.fetch;
  let dispatched = false;
  globalThis.fetch = async () => {
    dispatched = true;
    throw new Error("an image-only model must not be dispatched as a chat completion");
  };

  try {
    const result = await runSingleModelTest({
      providerId: "agnes",
      modelId: "agnes-image-2.5-flash",
      timeoutMs: 1_000,
    });

    assert.equal(dispatched, false);
    assert.equal(result.status, "error");
    assert.equal(result.httpStatus, 422);
    assert.equal(result.skipped, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
