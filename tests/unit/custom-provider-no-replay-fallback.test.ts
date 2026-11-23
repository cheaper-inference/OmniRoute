import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Companion to custom-provider-no-replay.test.ts: a custom OpenAI-compatible node only
// withholds replay for AMBIGUOUS outcomes. A failure the upstream clearly did not accept
// (429, 4xx, 5xx with an error body, connect error before sending) keeps the normal
// sibling-connection and combo-target fallback.

const harness = await createChatPipelineHarness("custom-provider-no-replay-fallback");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");

type UpstreamReply = (request: http.IncomingMessage, response: http.ServerResponse) => void;
type Upstream = { baseUrl: string; posts: string[]; close: () => Promise<void> };

const MODEL = "fixture-model";
const PRIMARY_KEY = "sk-primary-fixture";
const SIBLING_KEY = "sk-sibling-fixture";

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
});

test.afterEach(async () => {
  await harness.resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

function json(status: number, body: unknown, headers: Record<string, string> = {}): UpstreamReply {
  return (_request, response) => {
    response.writeHead(status, { "content-type": "application/json", ...headers });
    response.end(JSON.stringify(body));
  };
}

const ok = json(200, {
  id: "chatcmpl_fixture",
  object: "chat.completion",
  model: MODEL,
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: "fixture response" },
      finish_reason: "stop",
    },
  ],
});

const destroySocket: UpstreamReply = (request) => request.socket.destroy();

const malformed2xx: UpstreamReply = (_request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end("{bad-json");
};

/** Loopback upstream that answers per API key and records every POST it received. */
async function startUpstream(byKey: Record<string, UpstreamReply>): Promise<Upstream> {
  const posts: string[] = [];
  const server = http.createServer((request, response) => {
    const key = String(request.headers.authorization || "").replace(/^Bearer\s+/i, "");
    posts.push(key);
    request.resume();
    request.on("end", () =>
      (byKey[key] ?? json(500, { error: { message: "unknown key" } }))(request, response)
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as net.AddressInfo;
  return {
    baseUrl: `http://127.0.0.1:${port}/v1`,
    posts,
    close: async () => {
      const closed = new Promise<void>((resolve) => server.close(() => resolve()));
      server.closeAllConnections();
      await closed;
    },
  };
}

async function closedPortBaseUrl(): Promise<string> {
  const probe = net.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address() as net.AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  return `http://127.0.0.1:${port}/v1`;
}

async function seedNode(id: string, prefix: string, baseUrl: string) {
  await providersDb.createProviderNode({
    id,
    type: "openai-compatible",
    apiType: "chat",
    name: `${prefix} fixture`,
    prefix,
    baseUrl,
  });
  await modelsDb.addCustomModel(id, MODEL, "Fixture model", "manual", "chat-completions", ["chat"]);
}

async function seedKeyConnection(
  provider: string,
  apiKey: string,
  priority: number,
  baseUrl: string
) {
  return harness.seedConnection(provider, {
    name: `${provider}-${apiKey}`,
    apiKey,
    priority,
    providerSpecificData: { apiType: "chat", baseUrl },
  });
}

async function chat(model: string) {
  const response = await harness.handleChat(
    harness.buildRequest({
      body: {
        model,
        messages: [{ role: "user", content: "one controlled request" }],
        stream: false,
      },
    })
  );
  const text = await response.text();
  return { status: response.status, text };
}

/** One custom node with a primary and a sibling connection on the same loopback upstream. */
async function runWithSibling(primary: UpstreamReply, options: { primaryBaseUrl?: string } = {}) {
  const upstream = await startUpstream({ [PRIMARY_KEY]: primary, [SIBLING_KEY]: ok });
  try {
    const provider = "openai-compatible-chat-sibling";
    await seedNode(provider, "custom-sibling", upstream.baseUrl);
    await seedKeyConnection(provider, PRIMARY_KEY, 1, options.primaryBaseUrl ?? upstream.baseUrl);
    await seedKeyConnection(provider, SIBLING_KEY, 2, upstream.baseUrl);
    const result = await chat(`custom-sibling/${MODEL}`);
    return { ...result, posts: [...upstream.posts] };
  } finally {
    await upstream.close();
  }
}

/** A priority combo over two custom nodes: target A first, then target B. */
async function runCombo(targetA: UpstreamReply) {
  const upstream = await startUpstream({ "sk-target-a": targetA, "sk-target-b": ok });
  try {
    await seedNode("openai-compatible-chat-target-a", "custom-a", upstream.baseUrl);
    await seedNode("openai-compatible-chat-target-b", "custom-b", upstream.baseUrl);
    await seedKeyConnection("openai-compatible-chat-target-a", "sk-target-a", 1, upstream.baseUrl);
    await seedKeyConnection("openai-compatible-chat-target-b", "sk-target-b", 1, upstream.baseUrl);
    await harness.combosDb.createCombo({
      name: "custom-node-combo",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      models: [`custom-a/${MODEL}`, `custom-b/${MODEL}`],
    });
    const result = await chat("custom-node-combo");
    return { ...result, posts: [...upstream.posts] };
  } finally {
    await upstream.close();
  }
}

const count = (posts: string[], key: string) => posts.filter((posted) => posted === key).length;

test("custom node 429 falls back to a sibling connection", async () => {
  const result = await runWithSibling(
    json(429, { error: { message: "fixture rate limit" } }, { "retry-after": "30" })
  );
  assert.ok(count(result.posts, PRIMARY_KEY) >= 1, `primary was never tried: ${result.posts}`);
  assert.equal(count(result.posts, SIBLING_KEY), 1, `sibling must serve the 429: ${result.posts}`);
  assert.equal(result.status, 200, result.text);
});

test("custom node definite 4xx (403) falls back to a sibling connection", async () => {
  const result = await runWithSibling(json(403, { error: { message: "fixture forbidden" } }));
  assert.ok(count(result.posts, PRIMARY_KEY) >= 1, `primary was never tried: ${result.posts}`);
  assert.equal(count(result.posts, SIBLING_KEY), 1, `sibling must serve the 403: ${result.posts}`);
  assert.equal(result.status, 200, result.text);
});

test("custom node connect error before sending falls back to a sibling connection", async () => {
  const result = await runWithSibling(ok, { primaryBaseUrl: await closedPortBaseUrl() });
  assert.deepEqual(result.posts, [SIBLING_KEY], "only the sibling can have received a POST");
  assert.equal(result.status, 200, result.text);
});

test("custom node ambiguous transport failure is not replayed on a sibling connection", async () => {
  const result = await runWithSibling(destroySocket);
  assert.deepEqual(result.posts, [PRIMARY_KEY], `one uncertain dispatch only: ${result.posts}`);
  assert.equal(result.status, 502);
});

test("custom node 429 on its only connection keeps the normal same-node retry", async () => {
  let attempts = 0;
  const upstream = await startUpstream({
    [PRIMARY_KEY]: (request, response) => {
      attempts += 1;
      const reply =
        attempts === 1
          ? json(429, { error: { message: "fixture rate limit" } }, { "retry-after": "1" })
          : ok;
      reply(request, response);
    },
  });
  try {
    const provider = "openai-compatible-chat-single";
    await seedNode(provider, "custom-single", upstream.baseUrl);
    await seedKeyConnection(provider, PRIMARY_KEY, 1, upstream.baseUrl);
    const result = await chat(`custom-single/${MODEL}`);
    assert.equal(upstream.posts.length, 2, "a 429 was not accepted, so it is retried");
    assert.equal(result.status, 200, result.text);
  } finally {
    await upstream.close();
  }
});

test("combo: custom target 429 fails over to the next target", async () => {
  const result = await runCombo(json(429, { error: { message: "fixture rate limit" } }));
  assert.ok(count(result.posts, "sk-target-a") >= 1);
  assert.equal(count(result.posts, "sk-target-b"), 1, `next target must serve: ${result.posts}`);
  assert.equal(result.status, 200, result.text);
});

test("combo: custom target 5xx with an error body fails over to the next target", async () => {
  const result = await runCombo(json(503, { error: { message: "fixture overloaded" } }));
  assert.ok(count(result.posts, "sk-target-a") >= 1);
  assert.equal(count(result.posts, "sk-target-b"), 1, `next target must serve: ${result.posts}`);
  assert.equal(result.status, 200, result.text);
});

test("combo: an ambiguous custom target failure is not resent to the next target", async () => {
  const result = await runCombo(destroySocket);
  assert.deepEqual(result.posts, ["sk-target-a"], `one uncertain dispatch only: ${result.posts}`);
  assert.equal(result.status, 502);
});

test("combo: a malformed 2xx from a custom target is not resent to the next target", async () => {
  const result = await runCombo(malformed2xx);
  assert.deepEqual(result.posts, ["sk-target-a"], `one uncertain dispatch only: ${result.posts}`);
  assert.ok(result.status >= 400, "a malformed reply must not become success");
});

test("non-custom provider: a 429 keeps its normal retry", async () => {
  await harness.seedConnection("openai", { apiKey: "sk-openai-retry" });
  let attempts = 0;
  globalThis.fetch = async () => {
    attempts += 1;
    if (attempts === 1) {
      return new Response(JSON.stringify({ error: { message: "fixture rate limit" } }), {
        status: 429,
        headers: { "content-type": "application/json", "retry-after": "1" },
      });
    }
    return new Response(
      JSON.stringify({
        id: "chatcmpl_openai",
        object: "chat.completion",
        model: "gpt-4o-mini",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  const result = await chat("openai/gpt-4o-mini");
  assert.equal(attempts, 2);
  assert.equal(result.status, 200, result.text);
});

test("preferred-account failover does not hop a slow custom node to its sibling", async () => {
  // The preferred-connection response-start deadline (#19259) ends in one sibling hop, which
  // resends the request. A custom node withholds replay, so it waits for its own answer.
  const PREFERRED_HEADERS_DELAY_MS = 2_500;
  const upstream = await startUpstream({
    [PRIMARY_KEY]: (request, response) => {
      setTimeout(() => ok(request, response), PREFERRED_HEADERS_DELAY_MS);
    },
    [SIBLING_KEY]: ok,
  });
  try {
    const provider = "openai-compatible-chat-preferred";
    await seedNode(provider, "custom-preferred", upstream.baseUrl);
    const primary = (await seedKeyConnection(provider, PRIMARY_KEY, 1, upstream.baseUrl)) as {
      id: string;
    };
    await seedKeyConnection(provider, SIBLING_KEY, 2, upstream.baseUrl);
    await harness.settingsDb.updateSettings({
      resilienceSettings: {
        preferredAccountFailover: {
          enabled: true,
          defaultTimeoutMs: 500,
          providerTimeoutsMs: {},
          modelTimeoutsMs: {},
        },
      },
    });
    const key = (await harness.apiKeysDb.createApiKey("custom preferred", "machine-test", [], {
      preferredConnections: [primary.id],
    })) as { key: string };

    const response = await harness.handleChat(
      harness.buildRequest({
        authKey: key.key,
        body: {
          model: `custom-preferred/${MODEL}`,
          messages: [{ role: "user", content: "one controlled request" }],
          stream: false,
        },
      })
    );
    const text = await response.text();
    assert.deepEqual(upstream.posts, [PRIMARY_KEY], `no sibling hop: ${upstream.posts}`);
    assert.equal(response.status, 200, text);
  } finally {
    await upstream.close();
  }
});
