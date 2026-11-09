import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-mark-trust-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const { buildClientRawRequest } = await import("../../src/sse/handlers/chat.ts");
const { buildInternalChatRequest } = await import("../../src/lib/api/modelTestRunner.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const {
  SELF_HOP_HEADER,
  listenPort,
  ownListenerSelfHopToken,
  stampOwnListenerSelfHop,
  trustedInternalTestMark,
} = await import("../../open-sse/utils/selfHop.ts");
const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

const MARK = { "X-Internal-Test": "combo-health-check" };
const CHAT_URL = "http://localhost/v1/chat/completions";
const originalFetch = globalThis.fetch;
const originalEnvKey = process.env.OMNIROUTE_API_KEY;

const requestBody = () =>
  JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [{ role: "user", content: "Reply with OK only." }],
    max_tokens: 16,
    stream: false,
    temperature: 0,
  });

function chatRequest(headers: Record<string, string> = {}) {
  return new Request(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: requestBody(),
  });
}

async function seedSuppressedConnection() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-mark-trust",
    apiKey: "sk-mark-trust",
    isActive: true,
    testStatus: "credits_exhausted",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });
}

function openBreaker() {
  const breaker = getCircuitBreaker("openai");
  breaker.state = STATE.OPEN;
  breaker.lastFailureTime = Date.now();
  breaker.resetTimeout = 60_000;
}

function countUpstreamCalls() {
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return Response.json({
      id: "chatcmpl-mark-trust",
      choices: [{ message: { role: "assistant", content: "OK" } }],
    });
  };
  return calls;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
});

test.afterEach(async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  globalThis.fetch = originalFetch;
  resetAllCircuitBreakers();
  if (originalEnvKey === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = originalEnvKey;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REJECTED_CLIENTS: Array<[string, () => Record<string, string>]> = [
  ["the bare mark", () => ({ ...MARK })],
  ["the mark in another case", () => ({ "x-INTERNAL-test": "combo-health-check" })],
  ["a forged self-hop token", () => ({ ...MARK, [SELF_HOP_HEADER]: "0".repeat(64) })],
  ["an empty self-hop token", () => ({ ...MARK, [SELF_HOP_HEADER]: "" })],
  ["an unknown bearer", () => ({ ...MARK, Authorization: "Bearer sk-not-internal" })],
];

for (const [name, headers] of REJECTED_CLIENTS) {
  test(`a client sending ${name} stays out of a cooled-down connection`, async () => {
    await seedSuppressedConnection();
    const calls = countUpstreamCalls();

    const response = await chatRoute.POST(chatRequest(headers()));

    assert.equal(response.status, 503);
    assert.deepEqual(calls, []);
  });
}

test("a client's mark does not reach a provider behind an open breaker", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-breaker",
    apiKey: "sk-breaker",
    isActive: true,
    testStatus: "active",
  });
  openBreaker();
  const calls = countUpstreamCalls();

  const response = await chatRoute.POST(chatRequest(MARK));

  assert.equal(response.status, 503);
  assert.deepEqual(calls, []);
});

// The deployment env key is also an ordinary key a client can hold, so presenting it proves
// nothing about where the request came from.
test("a client holding the deployment env key cannot claim the mark", async () => {
  process.env.OMNIROUTE_API_KEY = "sk-deployment-env-key";
  await seedSuppressedConnection();
  const calls = countUpstreamCalls();

  const response = await chatRoute.POST(
    chatRequest({ ...MARK, Authorization: "Bearer sk-deployment-env-key" })
  );

  assert.equal(response.status, 503);
  assert.deepEqual(calls, []);
});

test("the in-process model test still reaches a cooled-down connection", async () => {
  await seedSuppressedConnection();
  const calls = countUpstreamCalls();

  const response = await chatRoute.POST(
    buildInternalChatRequest(JSON.parse(requestBody()), new AbortController().signal)
  );

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
});

test("a hop back to this listener still reaches a cooled-down connection", async () => {
  await seedSuppressedConnection();
  openBreaker();
  const calls = countUpstreamCalls();
  const hop: { headers?: HeadersInit } = {
    headers: { ...MARK, "Content-Type": "application/json" },
  };
  stampOwnListenerSelfHop(`http://127.0.0.1:${listenPort()}/v1/chat/completions`, hop);

  const response = await chatRoute.POST(
    new Request(CHAT_URL, { method: "POST", headers: hop.headers, body: requestBody() })
  );

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
});

test("the client header record drops a forged mark", () => {
  const raw = buildClientRawRequest(chatRequest({ ...MARK, "X-Client": "kept" }), {});

  assert.equal(raw.headers["x-internal-test"], undefined);
  assert.equal(raw.headers["x-client"], "kept");
});

test("the client header record keeps a trusted mark and never holds the token", () => {
  const raw = buildClientRawRequest(
    chatRequest({ ...MARK, [SELF_HOP_HEADER]: ownListenerSelfHopToken() }),
    {}
  );

  assert.equal(raw.headers["x-internal-test"], "combo-health-check");
  assert.equal(raw.headers[SELF_HOP_HEADER], undefined);
});

test("Cline upstream traffic only gets the health-check label on a trusted mark", () => {
  const executor = new DefaultExecutor("cline");
  const clientType = (headers: Record<string, string>) =>
    executor.buildHeaders(
      { apiKey: "tok-abc" },
      true,
      buildClientRawRequest(chatRequest(headers), {}).headers
    )["X-CLIENT-TYPE"];

  assert.equal(clientType(MARK), "omniroute");
  assert.equal(
    clientType({ ...MARK, [SELF_HOP_HEADER]: ownListenerSelfHopToken() }),
    "omniroute-internal-health-check"
  );
});

test("the mark is only read next to the process token", () => {
  const token = ownListenerSelfHopToken();

  assert.equal(trustedInternalTestMark(new Headers(MARK)), null);
  assert.equal(trustedInternalTestMark(new Headers({ [SELF_HOP_HEADER]: token })), null);
  assert.equal(
    trustedInternalTestMark(new Headers({ ...MARK, [SELF_HOP_HEADER]: token })),
    "combo-health-check"
  );
  assert.equal(trustedInternalTestMark(null), null);
});

test("the process token is fully redacted from request logs", async () => {
  const token = ownListenerSelfHopToken();
  const logger = await createRequestLogger("openai", "openai", "gpt-4.1", {});

  logger.logClientRawRequest("/v1/embeddings", {}, { [SELF_HOP_HEADER]: token });

  const logged = logger.getPipelinePayloads()?.clientRawRequest?.headers;
  assert.deepEqual(logged, { [SELF_HOP_HEADER]: "[REDACTED]" });
});
