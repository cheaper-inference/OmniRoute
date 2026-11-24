import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("custom-provider-no-replay");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

type FixtureOptions = {
  disableCooldownRetries?: boolean;
  cooldownBeforeDispatchMs?: number;
  preferredResponseStartCapMs?: number;
  responseDelayMs?: number;
  resetAfterRequestBody?: boolean;
};

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
  options: FixtureOptions = {}
): Promise<{
  upstreamPosts: number;
  responseStatus: number;
  elapsedMs: number;
  acceptedRequest?: { method: string; url: string; body: unknown };
}> {
  const provider = "openai-compatible-chat-no-replay";
  const prefix = "custom-no-replay";
  let upstreamPosts = 0;
  let acceptedRequest: { method: string; url: string; body: unknown } | undefined;
  const server = http.createServer((request, response) => {
    upstreamPosts += 1;
    if (options.responseDelayMs !== undefined || options.resetAfterRequestBody) {
      let body = "";
      request.setEncoding("utf8");
      request.on("data", (chunk: string) => {
        body += chunk;
      });
      request.on("end", () => {
        acceptedRequest = {
          method: request.method ?? "",
          url: request.url ?? "",
          body: JSON.parse(body) as unknown,
        };
        if (options.resetAfterRequestBody) {
          response.writeHead(200, { "content-type": "application/json" });
          response.flushHeaders();
          response.destroy();
          return;
        }
        setTimeout(() => {
          response.statusCode = 200;
          response.setHeader("content-type", "application/json");
          response.end(
            JSON.stringify({
              id: "chatcmpl_fixture",
              object: "chat.completion",
              model: "fixture-model",
              choices: [
                {
                  index: 0,
                  message: { role: "assistant", content: "fixture response" },
                  finish_reason: "stop",
                },
              ],
            })
          );
        }, options.responseDelayMs);
      });
    } else {
      respond(request, response);
    }
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
    const primaryConnection = await harness.seedConnection(provider, {
      rateLimitedUntil:
        options.cooldownBeforeDispatchMs === undefined
          ? undefined
          : Date.now() + options.cooldownBeforeDispatchMs,
      providerSpecificData: { apiType: "chat", baseUrl },
    });
    const connectionIds = [primaryConnection.id];
    let authKey: string | undefined;
    if (options.preferredResponseStartCapMs !== undefined) {
      const siblingConnection = await harness.seedConnection(provider, {
        providerSpecificData: { apiType: "chat", baseUrl },
      });
      connectionIds.push(siblingConnection.id);
      const key = await harness.seedApiKey({ allowedConnections: connectionIds });
      authKey = key.key;
      await apiKeysDb.updateApiKeyPermissions(key.id, {
        preferredConnections: [primaryConnection.id],
      });
      await harness.settingsDb.updateSettings({
        resilienceSettings: {
          preferredAccountFailover: {
            enabled: true,
            defaultTimeoutMs: options.preferredResponseStartCapMs,
            providerTimeoutsMs: {},
            modelTimeoutsMs: {},
          },
        },
      });
    }
    if (options.disableCooldownRetries) {
      await harness.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
    } else if (options.cooldownBeforeDispatchMs !== undefined) {
      await harness.settingsDb.updateSettings({ requestRetry: 1, maxRetryIntervalSec: 3 });
    }

    const startedAt = Date.now();
    const response = await harness.handleChat(
      harness.buildRequest({
        authKey,
        body: {
          model: `${prefix}/fixture-model`,
          messages: [{ role: "user", content: "one controlled request" }],
          stream: false,
        },
      })
    );
    await response.text();
    return {
      upstreamPosts,
      responseStatus: response.status,
      elapsedMs: Date.now() - startedAt,
      acceptedRequest,
    };
  } finally {
    const closed = new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
    server.closeAllConnections();
    await closed;
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

test("custom OpenAI-compatible request is not replayed after the fixture receives its full POST", async () => {
  const result = await runCustomProviderRequest(() => {}, { resetAfterRequestBody: true });
  assert.equal(result.upstreamPosts, 1);
  assert.equal(result.responseStatus, 502);
  assert.deepEqual(result.acceptedRequest, {
    method: "POST",
    url: "/v1/chat/completions",
    body: {
      model: "fixture-model",
      messages: [{ role: "user", content: "one controlled request" }],
      stream: false,
    },
  });
});

test("custom OpenAI-compatible route waits for cooldown before its first dispatch", async () => {
  const result = await runCustomProviderRequest(
    (_, response) => {
      response.statusCode = 200;
      response.setHeader("content-type", "application/json");
      response.end(
        JSON.stringify({
          id: "chatcmpl_fixture",
          object: "chat.completion",
          model: "fixture-model",
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: "fixture response" },
              finish_reason: "stop",
            },
          ],
        })
      );
    },
    { cooldownBeforeDispatchMs: 150 }
  );
  assert.equal(result.upstreamPosts, 1);
  assert.equal(result.responseStatus, 200);
  assert.ok(
    result.elapsedMs >= 100,
    `expected pre-dispatch cooldown wait, got ${result.elapsedMs}ms`
  );
});

test("custom OpenAI-compatible request keeps the ordinary deadline for its preferred connection", async () => {
  const result = await runCustomProviderRequest(() => {}, {
    preferredResponseStartCapMs: 500,
    responseDelayMs: 800,
  });
  assert.equal(result.upstreamPosts, 1);
  assert.equal(result.responseStatus, 200);
});

test("custom OpenAI-compatible transport failure is not replayed with cooldown disabled", async () => {
  const result = await runCustomProviderRequest((request) => request.socket.destroy(), {
    disableCooldownRetries: true,
  });
  assert.equal(
    result.upstreamPosts,
    1,
    `one uncertain dispatch must not be replayed; observed ${result.upstreamPosts} upstream POSTs`
  );
  assert.equal(result.responseStatus, 502);
});

test("custom OpenAI-compatible malformed response is not replayed", async () => {
  const result = await runCustomProviderRequest(
    (_, response) => {
      response.statusCode = 200;
      response.setHeader("content-type", "application/json");
      response.end("{bad-json");
    },
    { disableCooldownRetries: true }
  );
  assert.equal(
    result.upstreamPosts,
    1,
    `malformed response must not cause another upstream POST; observed ${result.upstreamPosts}`
  );
  assert.ok(result.responseStatus >= 400, "malformed provider response must not become success");
});

// A 429 is a definite rejection (the upstream did not accept the request), so it keeps the
// normal retry chain; only ambiguous outcomes above are withheld from replay.
test("custom OpenAI-compatible rate limit keeps the normal retry", async () => {
  const result = await runCustomProviderRequest((_, response) => {
    response.statusCode = 429;
    response.setHeader("content-type", "application/json");
    response.setHeader("retry-after", "1");
    response.end(JSON.stringify({ error: { message: "fixture rate limit" } }));
  });
  assert.ok(
    result.upstreamPosts > 1,
    `a rejected (429) request must keep its normal retry; observed ${result.upstreamPosts} POSTs`
  );
  assert.equal(result.responseStatus, 429);
});
