import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sem-cache-hit-"));
process.env.DATA_DIR = DIR;

const { checkSemanticCache } = await import("../../open-sse/handlers/chatCore/semanticCache.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { sanitizeChatRequestBody } =
  await import("../../open-sse/handlers/chatCore/sanitization.ts");
const { echoModelInObject } = await import("../../open-sse/services/responseModelEcho.ts");
const { snapshotBodyForCacheWrite } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const sem = await import("../../src/lib/semanticCache.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const chatResponse = (content: string, model = "gpt-4o") => ({
  id: "x",
  object: "chat.completion",
  model,
  choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
  usage: { prompt_tokens: 60, completion_tokens: 40 },
});

const lookup = (body: Record<string, unknown>) =>
  checkSemanticCache({
    semanticCacheEnabled: true,
    body,
    clientRawRequest: { headers: {} },
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
  } as unknown as Parameters<typeof checkSemanticCache>[0]);

const store = (body: Record<string, unknown>, translatedResponse: unknown) =>
  storeSemanticCacheResponse({
    enabled: true,
    body,
    headers: {},
    model: "gpt-4o",
    provider: "openai",
    apiKeyId: "k1",
    translatedResponse,
    usage: { prompt_tokens: 60, completion_tokens: 40 },
  });

test("one legacy cache hit counts one hit and the tokens once", async () => {
  sem.clearCache();
  const body = { messages: [{ role: "user", content: "count me" }], temperature: 0 };
  store(body, chatResponse("ok"));
  assert.ok(await lookup(body), "expected a hit");
  const stats = sem.getCacheStats();
  assert.equal(stats.hits, 1);
  assert.equal(stats.tokensSaved, 100);
});

test("the cache write key equals the read key after the body is sanitized in place", async () => {
  sem.clearCache();
  const body: Record<string, unknown> = {
    messages: [{ role: "user", content: "hi", name: "" }],
    temperature: 0,
    tools: [
      {
        type: "function",
        function: { name: "ping", parameters: { type: "object", properties: {} } },
      },
    ],
  };
  const forWrite = snapshotBodyForCacheWrite(body);
  sanitizeChatRequestBody(body, "openai", "openai");
  store(forWrite, chatResponse("cached"));
  // The next request arrives with the original, unsanitized shape and must hit.
  const next = {
    messages: [{ role: "user", content: "hi", name: "" }],
    temperature: 0,
    tools: [
      {
        type: "function",
        function: { name: "ping", parameters: { type: "object", properties: {} } },
      },
    ],
  };
  assert.ok(await lookup(next), "the stored entry is found by the read-side key");
});

test("echoing the model into the answer does not change the cached copy", async () => {
  sem.clearCache();
  const body = { messages: [{ role: "user", content: "echo probe" }], temperature: 0 };
  const response = chatResponse("hi", "upstream-model");
  store(body, response);
  echoModelInObject(response, "alias-requested-by-caller-A");
  const hit = await lookup(body);
  const served = (await hit!.response.json()) as { model: string };
  assert.equal(served.model, "upstream-model");
});

// Wiring: handleChatCore must key the cache write on the snapshot. A no-arg tool schema is
// rewritten in place by sanitize (an empty parameters object gains a placeholder property), so
// the second identical request only hits when the write used the original shape.
test("chat pipeline: a request with a no-arg tool is a cache HIT the second time", async () => {
  const { createChatPipelineHarness } = await import("../integration/_chatPipelineHarness.ts");
  const h = await createChatPipelineHarness("sem-cache-wiring");
  try {
    await h.resetStorage();
    await h.seedConnection("openai", { apiKey: ["test", "wiring", "key"].join("-") });
    let upstreamCalls = 0;
    globalThis.fetch = async () => {
      upstreamCalls++;
      return new Response(JSON.stringify(chatResponse("wired")), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    const body = {
      model: "openai/gpt-4o",
      stream: false,
      temperature: 0,
      messages: [{ role: "user", content: `wiring ${crypto.randomUUID()}` }],
      tools: [
        {
          type: "function",
          function: { name: "ping", parameters: { type: "object", properties: {} } },
        },
      ],
    };
    const first = await h.handleChat(h.buildRequest({ body }));
    await first.text();
    const second = await h.handleChat(h.buildRequest({ body }));
    await second.text();
    assert.equal(first.headers.get("X-OmniRoute-Cache"), "MISS");
    assert.equal(second.headers.get("X-OmniRoute-Cache"), "HIT");
    assert.equal(upstreamCalls, 1);
  } finally {
    await h.cleanup();
  }
});
