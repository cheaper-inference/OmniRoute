import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

const priorDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-tool-choice-none-"));
process.env.DATA_DIR = dataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

const provider = "openai-compatible-eu-tool-choice-fixture";
const model = "mistralai/mistral-medium-3-5";
// A reserved test hostname plus a mocked fetch: no real network or provider credentials.
const baseUrl = "https://eu-openrouter.example.test/api/v1";
const credentials = {
  apiKey: "fixture-not-a-real-key",
  providerSpecificData: { baseUrl, apiType: "chat", targetFormat: FORMATS.OPENAI },
};
const tool = {
  type: "function",
  function: {
    name: "view_knowledge_file",
    parameters: { type: "object", properties: { id: { type: "string" } } },
  },
};

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (priorDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = priorDataDir;
});

function finalizerHistory(): Array<Record<string, unknown>> {
  const messages: Array<Record<string, unknown>> = [
    { role: "user", content: "Summarize the synthetic knowledge files." },
  ];
  for (let round = 1; round <= 8; round++) {
    const id = `call_finalizer_${round}`;
    messages.push(
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id,
            type: "function",
            function: { name: tool.function.name, arguments: '{"id":"synthetic"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: id, content: `Synthetic result ${round}.` }
    );
  }
  return messages;
}

for (const stream of [true, false]) {
  for (const tools of [undefined, [], [tool]]) {
    test(`generic Chat serialization preserves none after eight tool rounds: stream=${stream}, tools=${tools === undefined ? "absent" : tools.length}`, async (t) => {
      const calls: Array<{ url: string; headers: Headers; body: string }> = [];
      t.mock.method(
        globalThis,
        "fetch",
        async (url: string | URL | Request, init: RequestInit = {}) => {
          calls.push({
            url: String(url),
            headers: new Headers(init.headers),
            body: String(init.body),
          });
          return new Response(
            stream
              ? 'data: {"choices":[{"delta":{"content":"Final answer."},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n'
              : '{"choices":[{"message":{"role":"assistant","content":"Final answer."},"finish_reason":"stop"}]}',
            {
              status: 200,
              headers: { "content-type": stream ? "text/event-stream" : "application/json" },
            }
          );
        }
      );
      const original = {
        model: `eu-openrouter/${model}`,
        messages: finalizerHistory(),
        ...(tools === undefined ? {} : { tools }),
        tool_choice: "none",
        parallel_tool_calls: false,
        stream,
      };
      const snapshot = structuredClone(original);
      const translated = translateRequest(
        FORMATS.OPENAI,
        FORMATS.OPENAI,
        model,
        structuredClone(original),
        stream,
        credentials,
        provider
      ) as Record<string, unknown>;
      assert.equal(
        translated.tool_choice,
        "none",
        "same-format translation must preserve the directive"
      );
      const prepared = await prepareUpstreamBody({
        translatedBody: translated,
        rawBody: original,
        modelToCall: model,
        originModel: model,
        provider,
        targetFormat: FORMATS.OPENAI,
        credentials,
      });
      const result = await new DefaultExecutor(provider).execute({
        model,
        body: prepared,
        stream,
        credentials,
      });
      await result.response.text();

      assert.equal(calls.length, 1, "one mocked upstream request, no generation retry");
      assert.equal(calls[0].url, `${baseUrl}/chat/completions`);
      const outbound: Record<string, unknown> = JSON.parse(calls[0].body);
      assert.equal(
        outbound.tool_choice,
        "none",
        "the actual serialized HTTP body must retain none"
      );
      assert.equal(outbound.parallel_tool_calls, false);
      assert.equal(outbound.stream, stream);
      assert.equal(outbound.model, model);
      // DefaultExecutor already enriches tool results with their function name.
      // Preserve that behavior while requiring every original call/result/content.
      const expectedHistory = snapshot.messages.map((message) =>
        message.role === "tool" ? { ...message, name: tool.function.name } : message
      );
      assert.deepEqual(
        outbound.messages,
        expectedHistory,
        "retain every assistant call and tool result"
      );
      if (!tools?.length) {
        assert.ok(
          outbound.tools === undefined ||
            (Array.isArray(outbound.tools) && outbound.tools.length === 0),
          "empty definitions may be omitted, but no dummy tool may be introduced"
        );
      } else {
        assert.equal((outbound.tools as unknown[]).length, tools.length);
      }
      assert.deepEqual(original, snapshot, "the caller's conversation must remain unchanged");
    });
  }
}
