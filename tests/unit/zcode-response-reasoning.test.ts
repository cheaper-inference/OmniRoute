import test from "node:test";
import assert from "node:assert/strict";
import { ZcodeExecutor } from "../../open-sse/executors/zcode.ts";

async function responseFor(result: Record<string, unknown>, stream: boolean) {
  const before = process.env.ZCODE_TRANSPORT;
  process.env.ZCODE_TRANSPORT = "app-server";
  try {
    const executor = new ZcodeExecutor({
      providerId: "builtin:zai-coding-plan",
      clientFactory: () => ({
        async start() {},
        async close() {},
        async call(_channel, method) {
          if (method === "initialize") return { available: true };
          if (method === "getView")
            return {
              providers: [
                {
                  providerId: "builtin:zai-coding-plan",
                  models: [{ modelId: "GLM-5.3", config: {} }],
                },
              ],
            };
          return result;
        },
      }),
    });
    const output = await executor.execute({
      model: "glm-5.3",
      stream,
      credentials: {},
      body: { messages: [{ role: "user", content: "Статус?" }] },
    });
    const response = "response" in output ? output.response : output;
    assert.equal(response.status, 200);
    return response;
  } finally {
    if (before === undefined) delete process.env.ZCODE_TRANSPORT;
    else process.env.ZCODE_TRANSPORT = before;
  }
}

for (const stream of [false, true]) {
  test(`ZCode ${stream ? "SSE" : "JSON"} separates inline thinking and compression prefixes`, async () => {
    const response = await responseFor(
      {
        text: "<think>Проверю состояние.</think>\n<think>Проверю результат.</think>\n[COMPRESSED:aging:fullSummary] [COMPRESSED:summary] Готово.",
        finishReason: "stop",
        usage: { inputTokens: 11, outputTokens: 22 },
      },
      stream
    );
    const body = stream
      ? JSON.parse(
          (await response.text())
            .split("\n")
            .find((line) => line.startsWith("data: {"))!
            .slice(6)
        )
      : await response.json();
    const message = stream ? body.choices[0].delta : body.choices[0].message;
    assert.equal(message.content, "Готово.");
    assert.equal(message.reasoning_content, "Проверю состояние.\n\nПроверю результат.");
  });
}

test("ZCode keeps structured reasoning and caller tool arguments separate from content", async () => {
  const response = await responseFor(
    {
      text: "",
      reasoning: "Need caller result",
      finishReason: "tool-calls",
      toolCalls: [
        {
          id: "call_1",
          name: "echo",
          input: { text: "<think>literal</think> [COMPRESSED:summary]" },
        },
      ],
    },
    true
  );
  const body = JSON.parse((await response.text()).split("\n")[0].slice(6));
  assert.equal(body.choices[0].delta.reasoning_content, "Need caller result");
  assert.deepEqual(JSON.parse(body.choices[0].delta.tool_calls[0].function.arguments), {
    text: "<think>literal</think> [COMPRESSED:summary]",
  });
});

test("ZCode keeps incomplete and nested thinking out of visible content", async () => {
  const response = await responseFor(
    { text: "<think>First\n<think>Second</think>\n<think>Still checking" },
    false
  );
  const message = (await response.json()).choices[0].message;
  assert.equal(message.content, "");
  assert.equal(message.reasoning_content.includes("<think>"), false);
  assert.match(message.reasoning_content, /Second/);
  assert.match(message.reasoning_content, /Still checking/);
});

test("ZCode preserves literal markup in code and prose", async () => {
  for (const text of [
    "```xml\n<think>literal</think>\n```",
    "Example: [COMPRESSED:summary] is a marker.",
    "Use <think>literal</think> as input.",
  ]) {
    const message = (await (await responseFor({ text }, false)).json()).choices[0].message;
    assert.equal(message.content, text);
    assert.equal(message.reasoning_content, undefined);
  }
});

test("ZCode consumes the matching outer close of nested reasoning", async () => {
  const message = (
    await (await responseFor({ text: "<think>A<think>B</think>C</think>Ответ" }, false)).json()
  ).choices[0].message;
  assert.equal(message.content, "Ответ");
  assert.equal(message.reasoning_content, "ABC");
});
