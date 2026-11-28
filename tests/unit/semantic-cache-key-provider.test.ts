import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Two provider nodes can serve one model id for one API key. By default they share a cache entry
// (the key has no provider). SEMANTIC_CACHE_PROVIDER_KEY_ENABLED adds the answering provider to the key.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sem-cache-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const FLAG = "SEMANTIC_CACHE_PROVIDER_KEY_ENABLED";

const core = await import("../../src/lib/db/core.ts");
const { generateSignature, getCachedResponse, clearCache } =
  await import("../../src/lib/semanticCache.ts");
const { checkSemanticCache } = await import("../../open-sse/handlers/chatCore/semanticCache.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");

test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  delete process.env[FLAG];
  clearCache();
});

const messages = [{ role: "user", content: "Return two plus two." }];
const body = { model: "shared-model", messages, temperature: 0 };
const reply = (text: string) => ({
  id: "chatcmpl-x",
  object: "chat.completion",
  model: "shared-model",
  choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
  usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
});
const sign = (provider?: string) =>
  generateSignature("shared-model", messages, 0, undefined, "key-scope", null, provider);

function readArgs(provider: string) {
  return {
    semanticCacheEnabled: true,
    body,
    clientRawRequest: { headers: {} },
    model: "shared-model",
    provider,
    stream: false,
    reqLogger: { logConvertedResponse: () => {} },
    effectiveServiceTier: undefined,
    pendingScope: { id: null, model: "shared-model", provider, connectionId: null },
    startTime: Date.now() - 5,
    log: { debug: () => {} },
    persistAttemptLogs: () => {},
    apiKeyId: "key-scope",
  } as unknown as Parameters<typeof checkSemanticCache>[0];
}

function store(provider: string, text: string) {
  storeSemanticCacheResponse({
    enabled: true,
    body,
    headers: {},
    translatedResponse: reply(text),
    model: "shared-model",
    provider,
    apiKeyId: "key-scope",
  });
}

test("flag off: the key has no provider, whatever provider is passed", () => {
  const literal = createHash("sha256")
    .update(
      '{"messages":[{"content":"Return two plus two.","role":"user"}],"model":"shared-model","schema":2,"temperature":0,"top_p":1}'
    )
    .digest("hex");
  assert.equal(sign(), `key-scope.${literal}`);
  assert.equal(sign("provider-a"), sign());
  assert.equal(sign("provider-b"), sign());
});

test("flag off: a reply stored by one provider is served to a request for another", async () => {
  store("provider-a", "from provider a");
  assert.ok(await checkSemanticCache(readArgs("provider-b")), "provider b shares the entry");
});

test("flag on: the key differs per answering provider and keeps the key-scope prefix", () => {
  process.env[FLAG] = "true";
  assert.notEqual(sign("provider-a"), sign("provider-b"));
  assert.notEqual(sign("provider-a"), sign());
  assert.ok(sign("provider-a").startsWith("key-scope."));
});

test("flag on: a call with no provider keeps the provider-less key", () => {
  const off = sign();
  process.env[FLAG] = "true";
  assert.equal(sign(), off);
  assert.equal(generateSignature("shared-model", messages, 0, undefined, "key-scope"), off);
});

test("flag on: a reply stored by one provider is not served to a request for another", async () => {
  process.env[FLAG] = "true";
  store("provider-a", "from provider a");
  assert.ok(getCachedResponse(sign("provider-a")), "the entry exists under provider a");
  assert.equal(getCachedResponse(sign("provider-b")), null, "provider b has no entry");
  assert.equal(await checkSemanticCache(readArgs("provider-b")), null, "provider b must dispatch");
  assert.ok(await checkSemanticCache(readArgs("provider-a")), "provider a is served its own entry");
});

test("flag on: a streamed reply is stored under its answering provider", () => {
  process.env[FLAG] = "true";
  storeStreamingSemanticCacheResponse({
    enabled: true,
    streamStatus: 200,
    streamResponseBody: reply("streamed from provider a"),
    body,
    headers: {},
    model: "shared-model",
    provider: "provider-a",
    apiKeyId: "key-scope",
  });
  assert.ok(getCachedResponse(sign("provider-a")));
  assert.equal(getCachedResponse(sign("provider-b")), null);
});
