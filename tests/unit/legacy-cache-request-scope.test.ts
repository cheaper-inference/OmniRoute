import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The legacy semantic cache (SQLite + memory) is the live cache path. It must honor the same
// request controls as the dual-layer manager: the tenant key, the no-store and no-cache headers,
// and the Responses conversation fields. (The answering provider is not part of the key: see the
// shortcut note on signatureScopeOf.)
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "legacy-cache-scope-"));
process.env.DATA_DIR = DIR;
const { checkSemanticCache } = await import("../../open-sse/handlers/chatCore/semanticCache.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");
const sem = await import("../../src/lib/semanticCache.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const reply = (text: string) => ({
  id: "i",
  object: "chat.completion",
  model: "gpt-4o",
  choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
  usage: { prompt_tokens: 1, completion_tokens: 1 },
});

type Headers = Record<string, string>;
const lookupArgs = (body: unknown, headers: Headers) =>
  ({
    semanticCacheEnabled: true,
    body,
    clientRawRequest: { headers },
    model: "gpt-4o",
    provider: "openai",
    stream: false,
    reqLogger: { logConvertedResponse: () => {} },
    effectiveServiceTier: undefined,
    pendingScope: { id: null, model: "gpt-4o", provider: "openai", connectionId: null },
    startTime: Date.now(),
    log: null,
    persistAttemptLogs: () => {},
    apiKeyId: "k1",
  }) as unknown as Parameters<typeof checkSemanticCache>[0];

const store = (body: unknown, headers: Headers, text: string) =>
  storeSemanticCacheResponse({
    enabled: true,
    body,
    headers,
    translatedResponse: reply(text),
    model: "gpt-4o",
    provider: "openai",
    apiKeyId: "k1",
    usage: { prompt_tokens: 1, completion_tokens: 1 },
  } as unknown as Parameters<typeof storeSemanticCacheResponse>[0]);

async function served(body: unknown, headers: Headers) {
  const hit = await checkSemanticCache(lookupArgs(body, headers));
  return hit
    ? ((await hit.response.json()) as ReturnType<typeof reply>).choices[0].message.content
    : null;
}

const question = (text: string) => ({
  messages: [{ role: "user", content: text }],
  temperature: 0,
});

test("a reply stored under one x-omniroute-cache-key is not served under another", async () => {
  const body = question("tenant question 1");
  store(body, { "x-omniroute-cache-key": "tenantA" }, "answer-for-A");
  assert.equal(await served(body, { "x-omniroute-cache-key": "tenantB" }), null);
  assert.equal(await served(body, {}), null);
  assert.equal(await served(body, { "x-omniroute-cache-key": "tenantA" }), "answer-for-A");
});

test("x-omniroute-cache-no-store keeps a reply out of the cache", async () => {
  const body = question("no store question 2");
  store(body, { "x-omniroute-cache-no-store": "true" }, "must-not-be-stored");
  assert.equal(await served(body, {}), null);
});

test("cache-control: no-store and pragma: no-cache keep a reply out of the cache", async () => {
  for (const headers of [{ "cache-control": "no-store" }, { pragma: "no-cache" }]) {
    const body = question(`header question ${Object.keys(headers)[0]}`);
    store(body, headers, "must-not-be-stored");
    assert.equal(await served(body, {}), null, JSON.stringify(headers));
    // And a reader that sends no-cache never reads an entry another caller stored.
    store(body, {}, "stored-without-header");
    assert.equal(await served(body, {}), "stored-without-header");
  }
});

test("the streaming store honors the same controls", async () => {
  const body = question("streaming scope question 4");
  const write = (headers: Headers) =>
    storeStreamingSemanticCacheResponse({
      enabled: true,
      streamStatus: 200,
      streamResponseBody: {
        choices: [
          { message: { role: "assistant", content: "streamed answer" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1 },
      },
      body,
      headers,
      model: "gpt-4o",
      provider: "openai",
      apiKeyId: "k1",
      streamUsage: { prompt_tokens: 1, completion_tokens: 1 },
    } as unknown as Parameters<typeof storeStreamingSemanticCacheResponse>[0]);
  write({ "x-omniroute-cache-no-store": "true" });
  assert.equal(await served(body, {}), null, "no-store stream was cached");
  write({ "x-omniroute-cache-key": "tenantA" });
  assert.equal(await served(body, { "x-omniroute-cache-key": "tenantB" }), null);
  assert.equal(await served(body, {}), null);
});

test("a Responses call keeps previous_response_id, conversation and store in its key", () => {
  const keyOf = (extra: Record<string, unknown>) => {
    const body = { input: "and the second one?", temperature: 0, ...extra };
    return sem.generateSignature(
      "gpt-4o",
      body.input,
      0,
      undefined,
      "k1",
      sem.outputContractOf(body),
      sem.signatureScopeOf({})
    );
  };
  assert.notEqual(
    keyOf({ previous_response_id: "resp_A" }),
    keyOf({ previous_response_id: "resp_B" })
  );
  assert.notEqual(keyOf({ conversation: "conv_A" }), keyOf({ conversation: "conv_B" }));
  assert.notEqual(keyOf({ store: true }), keyOf({ store: false }));
  assert.notEqual(keyOf({ previous_response_id: "resp_A" }), keyOf({}));
  assert.equal(
    keyOf({ previous_response_id: "resp_A" }),
    keyOf({ previous_response_id: "resp_A" })
  );
});

test("generateSignature keeps its old shape when no scope is given", () => {
  const withoutScope = sem.generateSignature("m", [{ role: "user", content: "x" }], 0, 1, "k1");
  const empty = sem.generateSignature("m", [{ role: "user", content: "x" }], 0, 1, "k1", null);
  assert.equal(withoutScope, empty);
  assert.notEqual(
    withoutScope,
    sem.generateSignature("m", [{ role: "user", content: "x" }], 0, 1, "k1", null, {
      cacheKey: "tenantA",
    })
  );
});

test("pragma: no-cache is a bypass on read, like cache-control: no-cache", () => {
  const body = question("pragma read question 5");
  assert.equal(sem.isCacheableForRead(body, { pragma: "no-cache" }), false);
  assert.equal(sem.isCacheableForRead(body, { "cache-control": "no-cache" }), false);
  assert.equal(sem.isCacheableForRead(body, {}), true);
});

test("a Responses call on a conversation is never served from the cache", async () => {
  // The conversation grows upstream with every turn, so the same body and id can need a new
  // answer later: the id in the key alone cannot make a cached reply current.
  for (const conversation of ["conv_read_A", { id: "conv_read_B" }]) {
    const body = { ...question("conversation read question 6"), conversation };
    assert.equal(sem.isCacheableForRead(body, {}), false, JSON.stringify(conversation));
    store(body, {}, "turn-one-answer");
    assert.equal(await served(body, {}), null, JSON.stringify(conversation));
  }
  assert.equal(sem.isCacheableForRead(question("conversation read question 6"), {}), true);
});
