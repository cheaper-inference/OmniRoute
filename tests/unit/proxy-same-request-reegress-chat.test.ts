import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// PROXY_REEGRESS_ON_QUOTA_429 wiring in the chat loop: a per-IP 429 received through a pool
// member re-sends the same request with the same account through another member. Never after
// a response started, never in a loop, never for a non-pool proxy, and nothing changes with
// the flag off.

const harness = await createChatPipelineHarness("proxy-same-request-reegress");
const { BaseExecutor, buildOpenAIResponse, buildRequest, core, handleChat, resetStorage } = harness;
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const { withUpstreamStatusCapture } = await import("../../open-sse/utils/upstreamStatusCapture.ts");
const { currentAppliedProxySink } = await import("../../open-sse/utils/appliedProxyContext.ts");

const ENV_KEYS = [
  "PROXY_REEGRESS_ON_QUOTA_429",
  "PROXY_REEGRESS_MAX_ATTEMPTS",
  "OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS",
];

const servers: net.Server[] = [];
const ports: number[] = [];

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
  });
}

test.before(async () => {
  for (let i = 0; i < 3; i++) {
    const server = net.createServer((s) => s.destroy());
    servers.push(server);
    ports.push(await listen(server));
  }
});

test.beforeEach(async () => {
  await resetStorage();
  memory.__resetProxyRefusalMemoryForTesting();
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  for (const key of ENV_KEYS) delete process.env[key];
  // Without this, a single account cooling after the 429 is waited out and the request
  // restarts later through another member. That existing path is not under test here.
  await harness.settingsDb.updateSettings({ requestRetry: 0 });
});

test.after(async () => {
  for (const key of ENV_KEYS) delete process.env[key];
  memory.__resetProxyRefusalMemoryForTesting();
  await harness.cleanup();
  servers.forEach((s) => s.close());
});

function quota429(): Response {
  return new Response(
    JSON.stringify({
      error: { message: "Too many requests from this address", type: "rate_limit_error" },
    }),
    { status: 429, headers: { "Content-Type": "application/json" } }
  );
}

type Observed = { ports: string[]; auths: Set<string> };

// Records the egress port each upstream call went through and answers per port. Wrapped in
// the status capture so the provider's real status reaches the applied-proxy sink.
function installUpstream(answer: (port: string) => Response): Observed {
  const observed: Observed = { ports: [], auths: new Set() };
  const mock = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input instanceof Request ? input.url : String(input);
    const proxyUrl = resolveProxyForRequest(url).proxyUrl;
    const port = proxyUrl ? new URL(proxyUrl).port : "direct";
    observed.ports.push(port);
    const request = input instanceof Request ? input : new Request(url, init);
    observed.auths.add(request.headers.get("authorization") || "");
    return answer(port);
  };
  globalThis.fetch = withUpstreamStatusCapture(mock, currentAppliedProxySink) as typeof fetch;
  return observed;
}

async function seedPool(count: number) {
  const seeded = await harness.seedConnection("openai", { apiKey: "sk-only-account" });
  assert.ok(seeded);
  const conn = { id: String(seeded.id) };
  const members: Array<{ id: string }> = [];
  for (let i = 0; i < count; i++) {
    const proxy = await proxiesDb.createProxy({
      name: `member-${i}`,
      type: "http",
      host: "127.0.0.1",
      port: ports[i],
    });
    assert.ok(proxy);
    await proxiesDb.addProxyToScopePool("account", conn.id, proxy.id);
    members.push(proxy);
  }
  return { conn, members };
}

function chatBody(stream = false) {
  return {
    model: "openai/gpt-4o-mini",
    stream,
    messages: [{ role: "user", content: "hello" }],
  };
}

const P = (i: number) => String(ports[i]);

test("per-IP 429 on member A: the same request leaves through member B with the same account", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  await seedPool(2);
  const observed = installUpstream((port) =>
    port === P(0) ? quota429() : buildOpenAIResponse("served", "gpt-4o-mini")
  );

  const response = await handleChat(buildRequest({ body: chatBody() }));

  assert.equal(response.status, 200);
  assert.equal(observed.ports[0], P(0));
  assert.equal(observed.ports.at(-1), P(1));
  assert.deepEqual(new Set(observed.ports), new Set([P(0), P(1)]));
  assert.equal(observed.auths.size, 1);
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), "1");
  assert.equal(response.headers.get("X-OmniRoute-Account-Fallbacks"), null);
});

test("flag off: the 429 comes back and only one egress is used", async () => {
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  await seedPool(2);
  const observed = installUpstream((port) =>
    port === P(0) ? quota429() : buildOpenAIResponse("served", "gpt-4o-mini")
  );

  const response = await handleChat(buildRequest({ body: chatBody() }));

  assert.equal(response.status, 429);
  assert.deepEqual(new Set(observed.ports), new Set([P(0)]));
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), null);
});

test("one-member pool: the 429 comes back without a re-send", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  await seedPool(1);
  const observed = installUpstream(() => quota429());

  const response = await handleChat(buildRequest({ body: chatBody() }));

  assert.equal(response.status, 429);
  assert.equal(new Set(observed.ports).size, 1);
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), null);
});

test("every member refuses: each is tried once, then the original 429, no loop", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  await seedPool(2);
  const observed = installUpstream(() => quota429());

  const response = await handleChat(buildRequest({ body: chatBody() }));

  assert.equal(response.status, 429);
  assert.deepEqual(new Set(observed.ports), new Set([P(0), P(1)]));
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), "1");
});

test("limit 1: at most two egresses for the account even with three refusing members", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  process.env.PROXY_REEGRESS_MAX_ATTEMPTS = "1";
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  await seedPool(3);
  const observed = installUpstream(() => quota429());

  const response = await handleChat(buildRequest({ body: chatBody() }));

  assert.equal(response.status, 429);
  assert.equal(new Set(observed.ports).size, 2);
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), "1");
});

test("provider outside the refusal scope: no re-send", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  await seedPool(2);
  const observed = installUpstream((port) =>
    port === P(0) ? quota429() : buildOpenAIResponse("served", "gpt-4o-mini")
  );

  const response = await handleChat(buildRequest({ body: chatBody() }));

  assert.equal(response.status, 429);
  assert.deepEqual(new Set(observed.ports), new Set([P(0)]));
});

test("per-API-key proxy: no re-send", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  const { conn, members } = await seedPool(2);
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'perKeyProxyEnabled', 'true')"
    )
    .run();
  await providersDb.updateProviderConnection(conn.id, { perKeyProxyEnabled: true });
  const key = await apiKeysDb.createApiKey("reegress-key", "machine-test");
  await apiKeysDb.updateApiKeyPermissions(key.id, { proxyId: members[0].id });
  const observed = installUpstream((port) =>
    port === P(0) ? quota429() : buildOpenAIResponse("served", "gpt-4o-mini")
  );

  const response = await handleChat(buildRequest({ body: chatBody(), authKey: key.key }));

  assert.equal(response.status, 429);
  assert.deepEqual(new Set(observed.ports), new Set([P(0)]));
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), null);
});

test("stream: a 200 cut mid-stream is never re-sent", async () => {
  process.env.PROXY_REEGRESS_ON_QUOTA_429 = "true";
  process.env.OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS = "all";
  await seedPool(2);
  const encoder = new TextEncoder();
  const observed = installUpstream(
    () =>
      new Response(
        new ReadableStream({
          start(controller) {
            const chunk = {
              id: "chatcmpl_stream",
              object: "chat.completion.chunk",
              model: "gpt-4o-mini",
              choices: [{ index: 0, delta: { role: "assistant", content: "partial answer" } }],
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
            setTimeout(() => controller.error(new Error("connection cut")), 20);
          },
        }),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )
  );

  const response = await handleChat(buildRequest({ body: chatBody(true) }));
  assert.equal(response.status, 200);
  try {
    await response.text();
  } catch {
    // the cut surfaces to the client; what matters is that nothing was re-sent
  }

  assert.equal(observed.ports.length, 1);
  assert.equal(response.headers.get("X-OmniRoute-Same-Account-Retries"), null);
});
