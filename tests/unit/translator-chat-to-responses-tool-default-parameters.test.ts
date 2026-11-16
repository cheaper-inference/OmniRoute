import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type ResponsesTool = { type: string; name: string; parameters?: unknown };

function translateTools(tools: unknown[]): ResponsesTool[] {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    { messages: [{ role: "user", content: "hi" }], tools },
    false,
    null
  ) as { tools: ResponsesTool[] };
  return result.tools;
}

test("a Chat function tool without parameters gets an empty object schema on Responses", () => {
  const [tool] = translateTools([
    { type: "function", function: { name: "get_time", description: "Current time" } },
  ]);
  assert.deepEqual(tool.parameters, { type: "object", properties: {} });
});

test("a Chat function tool with parameters keeps its own schema", () => {
  const schema = { type: "object", properties: { tz: { type: "string" } }, required: ["tz"] };
  const [tool] = translateTools([
    { type: "function", function: { name: "get_time", parameters: schema } },
  ]);
  assert.deepEqual(tool.parameters, schema);
});
