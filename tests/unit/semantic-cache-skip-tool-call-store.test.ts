import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-tool-calls-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { generateSignature, getCachedResponse, clearCache } =
  await import("../../src/lib/semanticCache.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");

// A response that carries client-visible tool calls must not enter the exact-match cache:
// a later identical request would replay a stale argument list (and skip the tool round trip).

test.after(() => {
  clearCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REQUEST = { messages: [{ role: "user", content: "weather in Paris?" }], temperature: 0 };

const TEXT = {
  choices: [{ finish_reason: "stop", message: { role: "assistant", content: "ok" } }],
};
const TOOL_SHAPES: Array<[string, Record<string, unknown>]> = [
  [
    "OpenAI tool_calls",
    {
      choices: [
        {
          finish_reason: "tool_calls",
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              { id: "c1", type: "function", function: { name: "weather", arguments: "{}" } },
            ],
          },
        },
      ],
    },
  ],
  [
    "OpenAI legacy function_call",
    {
      choices: [
        {
          finish_reason: "function_call",
          message: { role: "assistant", function_call: { name: "weather", arguments: "{}" } },
        },
      ],
    },
  ],
  [
    "Claude tool_use",
    {
      stop_reason: "tool_use",
      content: [{ type: "tool_use", id: "t1", name: "weather", input: {} }],
    },
  ],
  [
    "Responses function_call",
    { output: [{ type: "function_call", call_id: "c1", name: "weather", arguments: "{}" }] },
  ],
  [
    "Gemini functionCall",
    { candidates: [{ content: { parts: [{ functionCall: { name: "weather", args: {} } }] } }] },
  ],
];

type Stored = { response: unknown };
function stubDeps(stored: Stored[]) {
  return {
    isCacheableForWrite: () => true,
    isSmallEnoughForSemanticCache: () => true,
    generateSignature: () => "sig",
    setCachedResponse: (_s: unknown, _m: string, response: unknown) => stored.push({ response }),
  } as never;
}

for (const [name, response] of TOOL_SHAPES) {
  test(`non-streaming store skips a ${name} response`, () => {
    const stored: Stored[] = [];
    storeSemanticCacheResponse(
      {
        enabled: true,
        body: REQUEST,
        headers: undefined,
        translatedResponse: response,
        model: "m",
      },
      stubDeps(stored)
    );
    assert.equal(stored.length, 0);
  });
}

test("non-streaming store still caches a text response and an empty tool_calls list", () => {
  const stored: Stored[] = [];
  const emptyList = {
    choices: [
      { finish_reason: "stop", message: { role: "assistant", content: "ok", tool_calls: [] } },
    ],
  };
  for (const translatedResponse of [TEXT, emptyList]) {
    storeSemanticCacheResponse(
      { enabled: true, body: REQUEST, headers: undefined, translatedResponse, model: "m" },
      stubDeps(stored)
    );
  }
  assert.equal(stored.length, 2);
});

test("streaming store skips an assembled body that carries tool_calls", () => {
  const stored: Stored[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: { ...TOOL_SHAPES[0][1], _streamed: true },
      body: REQUEST,
      headers: undefined,
      model: "m",
    },
    stubDeps(stored)
  );
  assert.equal(stored.length, 0);
});

test("streaming store still caches an assembled text body", () => {
  const stored: Stored[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: { ...TEXT, _streamed: true },
      body: REQUEST,
      headers: undefined,
      model: "m",
    },
    stubDeps(stored)
  );
  assert.equal(stored.length, 1);
});

test("real cache: a tool_calls response is not served back, a text response is", () => {
  clearCache();
  const toolRequest = { messages: [{ role: "user", content: "tool turn" }], temperature: 0 };
  const textRequest = { messages: [{ role: "user", content: "text turn" }], temperature: 0 };
  const signature = (body: typeof REQUEST) =>
    generateSignature("gpt-x", body.messages, body.temperature, undefined, undefined, null);

  storeSemanticCacheResponse({
    enabled: true,
    body: toolRequest,
    headers: undefined,
    translatedResponse: TOOL_SHAPES[0][1],
    model: "gpt-x",
  });
  storeSemanticCacheResponse({
    enabled: true,
    body: textRequest,
    headers: undefined,
    translatedResponse: TEXT,
    model: "gpt-x",
  });

  assert.equal(getCachedResponse(signature(toolRequest)), null);
  assert.deepEqual(getCachedResponse(signature(textRequest)), TEXT);
});
