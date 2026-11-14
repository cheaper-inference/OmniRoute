import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The default (SQLite + memory) semantic cache key did not include the provider that answered. Two
// provider nodes that serve the same model id for one API key shared an entry, so a reply made by
// provider A was served to a request for provider B. The dual-layer manager already scopes by
// provider (`cacheByProvider`); the default path now does the same, behind a key schema bump.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sem-cache-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { generateSignature, SEMANTIC_CACHE_KEY_SCHEMA, getCachedResponse, clearCache } =
  await import("../../src/lib/semanticCache.ts");
const { checkSemanticCache } = await import("../../open-sse/handlers/chatCore/semanticCache.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  clearCache();
});

const messages = [{ role: "user", content: "Return two plus two." }];
const reply = (text: string) => ({
  id: "chatcmpl-x",
  object: "chat.completion",
  model: "shared-model",
  choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
  usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
});

function readArgs(provider: string, body: Record<string, unknown>) {
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
    apiKeyId: "key-provider-scope",
  } as unknown as Parameters<typeof checkSemanticCache>[0];
}

function store(provider: string, body: Record<string, unknown>, text: string) {
  storeSemanticCacheResponse({
    enabled: true,
    body,
    headers: {},
    translatedResponse: reply(text),
    model: "shared-model",
    provider,
    apiKeyId: "key-provider-scope",
  });
}

test("a signature differs per answering provider", () => {
  const a = generateSignature("shared-model", messages, 0, 1, "k", null, null, "provider-a");
  const b = generateSignature("shared-model", messages, 0, 1, "k", null, null, "provider-b");
  assert.notEqual(a, b);
  assert.ok(a.startsWith("k.") && b.startsWith("k."), "the api key namespace prefix is kept");
});

test("a signature with no provider is the same as before for a given schema", () => {
  const none = generateSignature("shared-model", messages, 0, 1, "k");
  assert.equal(generateSignature("shared-model", messages, 0, 1, "k", null, null, undefined), none);
});

test("the key schema is bumped, so entries stored under the old key are not reused", () => {
  assert.ok(SEMANTIC_CACHE_KEY_SCHEMA >= 4);
});

test("a reply stored by one provider is not served to a request for another provider", async () => {
  const body = { model: "shared-model", messages, temperature: 0 };
  store("provider-a", body, "from provider a");
  const sig = (provider: string) =>
    generateSignature(
      "shared-model",
      messages,
      0,
      undefined,
      "key-provider-scope",
      null,
      null,
      provider
    );
  assert.ok(getCachedResponse(sig("provider-a")), "the entry exists under provider a");
  assert.equal(getCachedResponse(sig("provider-b")), null, "provider b has no entry");

  const hitB = await checkSemanticCache(readArgs("provider-b", body));
  assert.equal(hitB, null, "provider b must dispatch");
  const hitA = await checkSemanticCache(readArgs("provider-a", body));
  assert.ok(hitA, "provider a is served its own entry");
});
