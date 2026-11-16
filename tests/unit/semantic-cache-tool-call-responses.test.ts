// A response that carries client-visible tool calls must not be cached:
// a cache hit would replay a stale tool-call argument list instead of letting
// the model decide again. Applies to the Layer-1/Layer-2 semantic manager.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-tool-calls-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { SemanticCacheManager } =
  await import("../../open-sse/services/cache/semanticCacheManager.ts");
const { MemoryVectorStore } = await import("../../open-sse/services/cache/memoryVectorStore.ts");

const core = await import("../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

const MESSAGES = [{ role: "user", content: "what is 2+2?" }];
const TOOL_CALL_RESPONSE = {
  id: "chatcmpl-tool-calls",
  choices: [
    {
      index: 0,
      finish_reason: "tool_calls",
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "memory_search", arguments: "{}" } },
        ],
      },
    },
  ],
};

function makeManager() {
  return new SemanticCacheManager(
    { enabled: true, backend: "memory", requireZeroTemperature: false },
    new MemoryVectorStore({ maxEntries: 10 })
  );
}

test("a non-stream response carrying tool_calls is not stored", async () => {
  const manager = makeManager();
  await manager.store({
    body: { messages: MESSAGES, temperature: 0 },
    response: TOOL_CALL_RESPONSE,
    model: "gpt-4o-mini",
    provider: "openai",
  });
  const result = await manager.lookup({
    body: { messages: MESSAGES, temperature: 0 },
    model: "gpt-4o-mini",
    provider: "openai",
  });
  assert.equal(result.hit, false, "a cached tool-call response would replay stale arguments");
});

test("a response with both text and tool_calls is not stored either", async () => {
  const manager = makeManager();
  const response = {
    id: "mixed",
    choices: [
      {
        index: 0,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: "checking",
          tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "" } }],
        },
      },
    ],
  };
  await manager.store({
    body: { messages: MESSAGES, temperature: 0 },
    response,
    model: "gpt-4o-mini",
    provider: "openai",
  });
  const result = await manager.lookup({
    body: { messages: MESSAGES, temperature: 0 },
    model: "gpt-4o-mini",
    provider: "openai",
  });
  assert.equal(result.hit, false);
});

test("a plain text response is still stored and served", async () => {
  const manager = makeManager();
  const response = {
    id: "plain",
    choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: "4" } }],
  };
  await manager.store({
    body: { messages: MESSAGES, temperature: 0 },
    response,
    model: "gpt-4o-mini",
    provider: "openai",
  });
  const result = await manager.lookup({
    body: { messages: MESSAGES, temperature: 0 },
    model: "gpt-4o-mini",
    provider: "openai",
  });
  assert.equal(result.hit, true, "text-only responses must remain cacheable");
});

const OTHER_TOOL_CALL_SHAPES: Array<[string, Record<string, unknown>]> = [
  [
    "a Gemini functionCall part",
    { candidates: [{ content: { parts: [{ functionCall: { name: "f", args: {} } }] } }] },
  ],
  [
    "a Claude content_block_start tool_use event",
    { type: "content_block_start", content_block: { type: "tool_use", id: "t1", name: "f" } },
  ],
  [
    "a Responses output_item.added function_call event",
    { type: "response.output_item.added", item: { type: "function_call", name: "f" } },
  ],
  [
    "a Responses output_item.done custom_tool_call event",
    { type: "response.output_item.done", item: { type: "custom_tool_call", name: "f" } },
  ],
];

for (const [label, shape] of OTHER_TOOL_CALL_SHAPES) {
  test(`${label} is not stored, as a response or as a stream chunk`, async () => {
    for (const where of ["response", "streamChunks"] as const) {
      const manager = makeManager();
      await manager.store({
        body: { messages: MESSAGES, temperature: 0 },
        response: where === "response" ? shape : { id: "plain", choices: [] },
        ...(where === "streamChunks" ? { streamChunks: [shape] } : {}),
        model: "gpt-4o-mini",
        provider: "openai",
      });
      const result = await manager.lookup({
        body: { messages: MESSAGES, temperature: 0 },
        model: "gpt-4o-mini",
        provider: "openai",
      });
      assert.equal(result.hit, false, `${where}: a cached tool call would replay stale arguments`);
    }
  });
}
