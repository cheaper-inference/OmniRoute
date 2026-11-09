import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("anti-avalanche-chat-wiring");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;

const originalFetch = globalThis.fetch;
const originalRetryConfig = {
  maxAttempts: BaseExecutor.RETRY_CONFIG.maxAttempts,
  delayMs: BaseExecutor.RETRY_CONFIG.delayMs,
};

const TPM_BODY =
  "Rate limit reached for gpt-4o-mini on tokens per minute (TPM): Limit 30000, Requested 45000.";

function chatBody(text: string) {
  return {
    model: "openai/gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: text }],
  };
}

// Same-key transport retries are not the avalanche: count distinct upstream credentials instead.
function bearerOf(init?: RequestInit) {
  return new Headers(init?.headers).get("authorization") ?? "";
}

function upstreamError(status: number, message: string) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function seedThreeOpenAIKeys() {
  for (let index = 1; index <= 3; index += 1) {
    await seedConnection("openai", { name: `openai-key-${index}`, priority: index });
  }
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = 1;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  // Opt-in guard: these tests exercise it enabled unless they say otherwise.
  process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED = "true";
  await resetStorage();
  clearAllModelLockouts();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryConfig.delayMs;
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED;
  clearAllModelLockouts();
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("an explicit TPM 429 stops at the first key and tags the response as suppressed", async () => {
  await seedThreeOpenAIKeys();
  const keysUsed = new Set<string>();
  globalThis.fetch = async (_url, init) => {
    keysUsed.add(bearerOf(init));
    return upstreamError(429, TPM_BODY);
  };

  const response = await handleChat(buildRequest({ body: chatBody("a very large agent history") }));

  assert.equal(response.status, 429);
  assert.equal(keysUsed.size, 1, "the TPM rejection must not cascade over the remaining keys");
  assert.equal(response.headers.get("x-omniroute-anti-avalanche"), "suppressed");
  assert.equal(response.headers.get("x-omniroute-avalanche-reason"), "explicit_tpm_limit");
});

test("a suppressed TPM 429 keeps the key out for the whole upstream Retry-After", async () => {
  await seedThreeOpenAIKeys();
  const keysUsed: string[] = [];
  globalThis.fetch = async (_url, init) => {
    keysUsed.push(bearerOf(init));
    if (keysUsed.length > 1) return buildOpenAIResponse("served by a sibling key");
    return new Response(JSON.stringify({ error: { message: TPM_BODY } }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": "3600" },
    });
  };

  const first = await handleChat(buildRequest({ body: chatBody("a very large agent history") }));
  assert.equal(first.status, 429);
  assert.equal(keysUsed.length, 1);

  const second = await handleChat(buildRequest({ body: chatBody("the next request") }));
  assert.equal(second.status, 200);
  assert.notEqual(keysUsed[1], keysUsed[0], "the first key must still be cooling down");
});

test("an ordinary small 429 still fails over to the next key", async () => {
  await seedThreeOpenAIKeys();
  const keysUsed = new Set<string>();
  globalThis.fetch = async (_url, init) => {
    keysUsed.add(bearerOf(init));
    if (keysUsed.size === 1) return upstreamError(429, "Too many requests, slow down");
    return buildOpenAIResponse("served by a sibling key");
  };

  const response = await handleChat(buildRequest({ body: chatBody("hello") }));

  assert.equal(response.status, 200);
  assert.equal(keysUsed.size, 2);
  assert.equal(response.headers.get("x-omniroute-anti-avalanche"), null);
});

test("a quota-exhausted 429 on a massive prompt still fails over to a sibling key", async () => {
  await seedThreeOpenAIKeys();
  const keysUsed = new Set<string>();
  globalThis.fetch = async (_url, init) => {
    keysUsed.add(bearerOf(init));
    if (keysUsed.size === 1) return upstreamError(429, "You exceeded your current quota");
    return buildOpenAIResponse("served by a sibling key");
  };

  const response = await handleChat(buildRequest({ body: chatBody("large ".repeat(73_500)) }));

  assert.equal(response.status, 200);
  assert.equal(keysUsed.size, 2);
  assert.equal(response.headers.get("x-omniroute-anti-avalanche"), null);
});

test("HTTP 413 keeps the #13350 fallback to another key", async () => {
  await seedThreeOpenAIKeys();
  const keysUsed = new Set<string>();
  globalThis.fetch = async (_url, init) => {
    keysUsed.add(bearerOf(init));
    if (keysUsed.size === 1) return upstreamError(413, "Request entity too large");
    return buildOpenAIResponse("served by a sibling key");
  };

  const response = await handleChat(buildRequest({ body: chatBody("hello") }));

  assert.equal(response.status, 200);
  assert.equal(keysUsed.size, 2);
  assert.equal(response.headers.get("x-omniroute-anti-avalanche"), null);
});

test("the guard is off by default: an unset env keeps the normal failover over a TPM 429", async () => {
  delete process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED;
  await seedThreeOpenAIKeys();
  const keysUsed = new Set<string>();
  globalThis.fetch = async (_url, init) => {
    keysUsed.add(bearerOf(init));
    if (keysUsed.size < 3) return upstreamError(429, TPM_BODY);
    return buildOpenAIResponse("served by the third key");
  };

  const response = await handleChat(buildRequest({ body: chatBody("a very large agent history") }));

  assert.equal(response.status, 200);
  assert.equal(keysUsed.size, 3);
  assert.equal(response.headers.get("x-omniroute-anti-avalanche"), null);
});

test("OMNIROUTE_AVALANCHE_PROTECTION_ENABLED=false restores the cascading failover", async () => {
  process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED = "false";
  await seedThreeOpenAIKeys();
  const keysUsed = new Set<string>();
  globalThis.fetch = async (_url, init) => {
    keysUsed.add(bearerOf(init));
    if (keysUsed.size < 3) return upstreamError(429, TPM_BODY);
    return buildOpenAIResponse("served by the third key");
  };

  const response = await handleChat(buildRequest({ body: chatBody("a very large agent history") }));

  assert.equal(response.status, 200);
  assert.equal(keysUsed.size, 3);
});
