import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("native image dispatch requires locality and uses the selected connected account", async (context) => {
  const folder = await mkdtemp(join(tmpdir(), "rosebud-image-test-"));
  const previous = process.env.DATA_DIR;
  process.env.DATA_DIR = folder;
  const { handleRosebudImageGeneration } =
    await import("../../open-sse/handlers/imageGeneration/providers/rosebud.ts");
  const { rosebudRuntime } = await import("../../open-sse/services/rosebud/runtime.ts");
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  try {
    const denied = await handleRosebudImageGeneration({ body: {}, peerLocality: "remote" });
    assert.equal(denied.status, 403);
    const connection = await createProviderConnection({
      provider: "rosebud",
      authType: "none",
      isActive: true,
      name: "Test account",
      providerSpecificData: { rosebudProfile: "isolated-test" },
    });
    assert.ok(connection);
    context.mock.method(rosebudRuntime, "models", async () => [
      { id: "test-image", category: "image", output_formats: ["png"] },
    ]);
    const job = {
      id: "a".repeat(64),
      profile: "isolated-test",
      model: "test-image",
      category: "image",
      input: {},
      fingerprint: "test",
      status: "succeeded",
      estimatedCredits: 250,
      actualCredits: 250,
      updatedAt: new Date().toISOString(),
    };
    context.mock.method(rosebudRuntime, "generate", async (profile: string) => {
      assert.equal(profile, "isolated-test");
      return job;
    });
    context.mock.method(rosebudRuntime, "artifact", async () => ({
      data: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      job,
      mime: "image/png",
      sha256: "test",
    }));
    const result = await handleRosebudImageGeneration({
      body: { model: "rosebud/test-image", prompt: "test" },
      peerLocality: "lan",
      credentials: { connectionId: String(connection.id) },
    });
    assert.equal(result.success, true);
    if (result.success) {
      assert.ok(result.data.data[0].b64_json);
      assert.equal(result.data.rosebud_usage.unit, "rosebud_credits");
      assert.equal(result.data.rosebud_usage.usd_cost, null);
    }
    context.mock.method(rosebudRuntime, "artifact", async () => {
      throw new Error("download unavailable");
    });
    const failedDownload = await handleRosebudImageGeneration({
      body: { model: "rosebud/test-image", prompt: "test" },
      peerLocality: "lan",
      credentials: { connectionId: String(connection.id) },
    });
    assert.equal(failedDownload.status, 422);
    assert.equal(failedDownload.rosebudUsage?.job_id, job.id);
    const controller = new AbortController();
    controller.abort();
    const cancelled = await handleRosebudImageGeneration({
      body: { model: "rosebud/test-image", prompt: "test" },
      peerLocality: "lan",
      credentials: { connectionId: String(connection.id) },
      signal: controller.signal,
    });
    assert.equal(cancelled.status, 408);
    const { RosebudError } = await import("../../open-sse/services/rosebud/cli.ts");
    context.mock.method(rosebudRuntime, "read", async () => ({
      ...job,
      id: "b".repeat(64),
      status: "failed",
      unpaidFailure: true,
      actualCredits: undefined,
    }));

    for (const [code, status] of [
      ["insufficient_credits", 402],
      ["throttled", 429],
      ["key_expired", 401],
    ] as const) {
      context.mock.method(rosebudRuntime, "generate", async () => {
        const error = new RosebudError(code, status);
        error.jobId = "b".repeat(64);
        throw error;
      });
      const rejected = await handleRosebudImageGeneration({
        body: { model: "rosebud/test-image", prompt: "test" },
        peerLocality: "lan",
        credentials: { connectionId: String(connection.id) },
      });
      assert.equal(rejected.status, status);
      assert.equal(rejected.rosebudUsage, undefined);
    }
    const unsupported = await handleRosebudImageGeneration({
      body: { model: "rosebud/test-image", rosebud_inputs: { output_format: "svg" } },
      peerLocality: "lan",
      credentials: { connectionId: String(connection.id) },
    });
    assert.equal(unsupported.status, 400);
    const missing = await handleRosebudImageGeneration({
      body: { model: "rosebud/test-image" },
      peerLocality: "lan",
    });
    assert.equal(missing.status, 401);
  } finally {
    resetDbInstance();
    if (previous === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previous;
    await rm(folder, { recursive: true, force: true });
  }
});

test("OpenAI SDK does not automatically repeat a submitted Rosebud job error", async () => {
  const { default: OpenAI } = await import("openai");
  let calls = 0;
  const client = new OpenAI({
    apiKey: "test-only",
    baseURL: "http://mock.invalid/v1",
    maxRetries: 2,
    fetch: async () => {
      calls++;
      return new Response(
        JSON.stringify({
          error: { message: "Job continues; retrieve its existing result", type: "provider_error" },
          rosebud_usage: { job_id: "a".repeat(64) },
        }),
        { status: 422, headers: { "Content-Type": "application/json", "x-should-retry": "false" } }
      );
    },
  });
  await assert.rejects(client.images.generate({ model: "rosebud/test-image", prompt: "test" }));
  assert.equal(calls, 1);
});
