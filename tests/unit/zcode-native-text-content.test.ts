import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const testDataDir = mkdtempSync(join(tmpdir(), "omniroute-zcode-native-content-"));
process.env.DATA_DIR = testDataDir;
process.env.ZCODE_TRANSPORT = "native-host";
process.env.ZCODE_NATIVE_SERVER_ROOT = join(testDataDir, "synthetic-native-host");
process.env.ZCODE_NATIVE_CONNECTION_ID = "native-content-fixture";

const { ZcodeExecutor } = await import("../../open-sse/executors/zcode.ts");
const { NativeZcodeHostClient } =
  await import("../../open-sse/executors/zcode/nativeHostClient.ts");

test.after(() => cleanupTempDataDir(testDataDir));

function captureNativeRequest(t: TestContext) {
  const calls: Record<string, unknown>[] = [];
  t.mock.method(NativeZcodeHostClient.prototype, "start", async () => {});
  t.mock.method(NativeZcodeHostClient.prototype, "close", async () => {});
  t.mock.method(
    NativeZcodeHostClient.prototype,
    "call",
    async (channel: string, method: string, args: unknown[]) => {
      if (method === "getView") {
        assert.equal(channel, "model-selection");
        return {
          providers: [
            {
              providerId: "account:zai-individual-coding-plan",
              models: [{ modelId: "GLM-5.3-Flash", config: {} }],
            },
          ],
        };
      }
      assert.equal(channel, "zcode-agent");
      assert.equal(method, "generateWorkspaceText");
      calls.push(args[0] as Record<string, unknown>);
      return { text: "native text accepted", finishReason: "stop" };
    }
  );
  return {
    calls,
    async execute(body: Record<string, unknown>) {
      const result = await new ZcodeExecutor({ provider: "zcode-individual" }).execute({
        model: "glm-5.3-flash",
        body,
        stream: false,
        credentials: { connectionId: "native-content-fixture" },
      });
      return "response" in result ? result.response : result;
    },
  };
}

test("native ZCode accepts ordered Responses text parts without mutating caller messages", async (t) => {
  const fixture = captureNativeRequest(t);
  const messages = [
    { role: "developer", content: [{ type: "text", text: "Keep instructions." }] },
    {
      role: "user",
      content: [
        { type: "input_text", text: "first " },
        { type: "text", text: "second " },
        { type: "output_text", text: "third" },
      ],
    },
  ];
  const original = structuredClone(messages);
  const response = await fixture.execute({ messages });
  assert.equal(response.status, 200, await response.text());
  assert.deepEqual(fixture.calls[0].messages, [
    { role: "system", content: "Keep instructions." },
    { role: "user", content: "first second third" },
  ]);
  assert.deepEqual(messages, original);
});

test("native ZCode text normalization preserves caller tool calls, results and schemas", async (t) => {
  const fixture = captureNativeRequest(t);
  const toolCall = {
    id: "call_zcn_typed_content",
    type: "function",
    function: { name: "echo", arguments: '{"value":"client-owned-result"}' },
  };
  const parameters = {
    type: "object",
    properties: { value: { type: "string" } },
    required: ["value"],
  };
  const messages = [
    { role: "user", content: [{ type: "input_text", text: "Use echo." }] },
    { role: "assistant", content: null, tool_calls: [toolCall] },
    {
      role: "tool",
      name: "echo",
      tool_call_id: toolCall.id,
      content: [{ type: "text", text: "client-owned-result" }],
    },
  ];
  const original = structuredClone(messages);
  const response = await fixture.execute({
    messages,
    tools: [{ type: "function", function: { name: "echo", parameters } }],
  });
  assert.equal(response.status, 200, await response.text());
  assert.deepEqual(fixture.calls[0].messages, [
    { role: "user", content: "Use echo." },
    {
      role: "assistant",
      content: "",
      toolCalls: [{ id: toolCall.id, name: "echo", input: { value: "client-owned-result" } }],
    },
    {
      role: "tool",
      toolName: "echo",
      toolCallId: toolCall.id,
      content: "client-owned-result",
    },
  ]);
  assert.deepEqual(fixture.calls[0].tools, [{ name: "echo", inputSchema: parameters }]);
  assert.deepEqual(messages, original);
});

test("native ZCode rejects mixed media and malformed text instead of silently dropping parts", async (t) => {
  const fixture = captureNativeRequest(t);
  const imageUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aK0cAAAAASUVORK5CYII=";
  for (const invalidPart of [
    { type: "image_url", image_url: { url: imageUrl } },
    { type: "input_audio", input_audio: { data: "synthetic", format: "wav" } },
    { type: "text", text: 7 },
  ]) {
    const response = await fixture.execute({
      messages: [
        { role: "user", content: [{ type: "text", text: "Keep this part." }, invalidPart] },
      ],
    });
    assert.equal(response.status, 400, await response.text());
  }
  assert.equal(fixture.calls.length, 0);
});
