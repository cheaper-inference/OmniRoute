import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("custom-provider-no-replay");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");

test.beforeEach(async () => {
  await harness.resetStorage();
});

test.afterEach(async () => {
  await harness.resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function runCustomProviderRequest(
  respond: http.RequestListener,
  disableCooldownRetries = false
): Promise<{ upstreamPosts: number; responseStatus: number }> {
  const provider = "openai-compatible-chat-no-replay";
  const prefix = "custom-no-replay";
  let upstreamPosts = 0;
  const server = http.createServer((request, response) => {
    upstreamPosts += 1;
    respond(request, response);
  });

  try {
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const baseUrl = `http://127.0.0.1:${address.port}/v1`;

    await providersDb.createProviderNode({
      id: provider,
      type: "openai-compatible",
      apiType: "chat",
      name: "No-replay fixture",
      prefix,
      baseUrl,
    });
    await modelsDb.addCustomModel(
      provider,
      "fixture-model",
      "Fixture model",
      "manual",
      "chat-completions",
      ["chat"]
    );
    await harness.seedConnection(provider, {
      providerSpecificData: { apiType: "chat", baseUrl },
    });
    if (disableCooldownRetries) {
      await harness.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
    }

    const response = await harness.handleChat(
      harness.buildRequest({
        body: {
          model: `${prefix}/fixture-model`,
          messages: [{ role: "user", content: "one controlled request" }],
          stream: false,
        },
      })
    );
    await response.text();
    return { upstreamPosts, responseStatus: response.status };
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
}

test("custom OpenAI-compatible transport failure dispatches once", async () => {
  const result = await runCustomProviderRequest((request) => request.socket.destroy());
  assert.equal(
    result.upstreamPosts,
    1,
    `one uncertain dispatch must not be replayed; observed ${result.upstreamPosts} upstream POSTs`
  );
  assert.equal(result.responseStatus, 502);
});

test("custom OpenAI-compatible transport failure is not replayed with cooldown disabled", async () => {
  const result = await runCustomProviderRequest((request) => request.socket.destroy(), true);
  assert.equal(
    result.upstreamPosts,
    1,
    `one uncertain dispatch must not be replayed; observed ${result.upstreamPosts} upstream POSTs`
  );
  assert.equal(result.responseStatus, 502);
});

test("custom OpenAI-compatible malformed response is not replayed", async () => {
  const result = await runCustomProviderRequest((_, response) => {
    response.statusCode = 200;
    response.setHeader("content-type", "application/json");
    response.end("{bad-json");
  }, true);
  assert.equal(
    result.upstreamPosts,
    1,
    `malformed response must not cause another upstream POST; observed ${result.upstreamPosts}`
  );
  assert.ok(result.responseStatus >= 400, "malformed provider response must not become success");
});

test("custom OpenAI-compatible rate limit is surfaced without another POST", async () => {
  const result = await runCustomProviderRequest((_, response) => {
    response.statusCode = 429;
    response.setHeader("content-type", "application/json");
    response.setHeader("retry-after", "1");
    response.end(JSON.stringify({ error: { message: "fixture rate limit" } }));
  });
  assert.equal(
    result.upstreamPosts,
    1,
    `rate-limit response must not trigger another upstream POST; observed ${result.upstreamPosts}`
  );
  assert.equal(result.responseStatus, 429);
});
