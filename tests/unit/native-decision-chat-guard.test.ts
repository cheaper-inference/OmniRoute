import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-native-guard-"));
process.env.DATA_DIR = dir;
process.env.MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED = "false";
const { getRequestedModelEndpointMismatch } =
  await import("../../src/lib/providerModels/modelEndpointGuard.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const combos = await import("../../src/lib/db/combos.ts");
const core = await import("../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  assert.ok(dir.startsWith(path.join(os.tmpdir(), "omni-native-guard-")));
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5 });
});
test("native transport rejects chat locally with optional capability gate disabled", async () => {
  assert.match(
    (await getRequestedModelEndpointMismatch("supersoniclabs/julia-1", "chat")) || "",
    /POST \/v1\/systemone/
  );
  assert.equal(await getRequestedModelEndpointMismatch("openai/gpt-4o", "chat"), null);
});
test("default executor refuses native provider and compatible combo leaves before fetch", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("Unexpected upstream request");
  };
  try {
    for (const [provider, apiType] of [
      ["supersoniclabs", undefined],
      ["openai-compatible-chat-test", "systemone"],
    ]) {
      const result = await new DefaultExecutor(provider).execute({
        model: "julia-1",
        body: { messages: [{ role: "user", content: "test" }] },
        stream: false,
        credentials: { apiKey: "test", providerSpecificData: { apiType } },
        signal: new AbortController().signal,
      });
      assert.equal(result.response.status, 400);
    }
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = original;
  }
});
test("exact combo name wins without allowing native executor chat dispatch", async () => {
  await combos.createCombo({ name: "supersoniclabs/julia-1", models: ["openai/gpt-4o"] });
  assert.equal(await getRequestedModelEndpointMismatch("supersoniclabs/julia-1", "chat"), null);
});
