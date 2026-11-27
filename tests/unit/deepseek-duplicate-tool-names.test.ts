import "../_setup/isolateDataDir.ts";
import assert from "node:assert/strict";
import test from "node:test";

import { finalizeTranslatedRequest } from "../../open-sse/handlers/chatCore/translatedRequestFinalize.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type Tool = Record<string, unknown>;

const chatTool = (name: string, description: string): Tool => ({
  type: "function",
  function: { name, description, parameters: { type: "object", properties: {} } },
});

function finalize(effectiveModel: string, tools: Tool[], targetFormat = FORMATS.OPENAI) {
  const { translatedBody } = finalizeTranslatedRequest({
    translatedBody: { model: effectiveModel, messages: [], tools },
    body: {},
    provider: effectiveModel.split("/")[0],
    alias: null,
    effectiveModel,
    sourceFormat: FORMATS.OPENAI,
    targetFormat,
    isClaudePassthrough: false,
    credentials: {},
    previousResponseIdMode: "off",
  });
  return translatedBody.tools as Tool[];
}

const describeOf = (tool: Tool) =>
  String((tool.function as Tool | undefined)?.description ?? tool.description);

test("DeepSeek models keep only the first definition of a repeated tool name", () => {
  for (const model of [
    "deepseek/deepseek-v4-flash",
    "opencode-go/deepseek-v4-pro",
    "openrouter/deepseek/deepseek-chat",
  ]) {
    const tools = finalize(model, [
      chatTool("read", "first read"),
      chatTool("write", "write"),
      chatTool("read", "second read"),
    ]);
    assert.deepEqual(tools.map(describeOf), ["first read", "write"], model);
  }
});

test("DeepSeek dedupe also covers the flat Responses tool shape and keeps unnamed tools", () => {
  const tools = finalize(
    "deepseek/deepseek-v4-flash",
    [
      { type: "function", name: "exec", description: "first exec" },
      { type: "web_search" },
      { type: "function", name: "exec", description: "second exec" },
      { type: "web_search" },
    ],
    FORMATS.OPENAI_RESPONSES
  );
  assert.deepEqual(
    tools.map((t) => t.type),
    ["function", "web_search", "web_search"]
  );
  assert.equal(describeOf(tools[0]), "first exec");
});

test("other models keep repeated tool names untouched", () => {
  const tools = finalize("openai/gpt-5", [chatTool("read", "one"), chatTool("read", "two")]);
  assert.deepEqual(tools.map(describeOf), ["one", "two"]);
});
