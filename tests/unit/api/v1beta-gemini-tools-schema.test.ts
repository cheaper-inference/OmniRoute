import test from "node:test";
import assert from "node:assert/strict";

// Regression: Gemini `functionDeclarations[].parametersJsonSchema` (sent by Gemini CLI) must
// reach the internal OpenAI-style tool schema instead of being replaced by an empty schema.

const { convertGeminiToInternal } =
  await import("../../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts");

type InternalTool = {
  type: string;
  function: { name: string; description?: string; parameters: unknown };
};

const contents = [{ role: "user", parts: [{ text: "read the file" }] }];

function convert(tools: unknown[]): InternalTool[] {
  const result = convertGeminiToInternal({ contents, tools }, "gemini-2.5-pro", false);
  return (result.tools ?? []) as InternalTool[];
}

test("parametersJsonSchema reaches the internal tool schema intact", () => {
  const schema = {
    type: "object",
    properties: {
      file_path: { type: "string" },
      offset: { type: "number" },
      mode: { anyOf: [{ type: "string" }, { $ref: "#/$defs/Mode" }] },
    },
    required: ["file_path"],
    additionalProperties: false,
    $defs: { Mode: { type: "string", enum: ["fast", "slow"] } },
  };
  const tools = convert([
    {
      functionDeclarations: [
        { name: "read_file", description: "Reads a file", parametersJsonSchema: schema },
      ],
    },
  ]);
  assert.equal(tools.length, 1);
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "read_file");
  assert.equal(tools[0].function.description, "Reads a file");
  assert.deepEqual(tools[0].function.parameters, schema);
});

test("parameters only is still passed through", () => {
  const params = { type: "object", properties: { q: { type: "string" } }, required: ["q"] };
  const tools = convert([{ functionDeclarations: [{ name: "search", parameters: params }] }]);
  assert.deepEqual(tools[0].function.parameters, params);
});

test("parameters wins when both are present", () => {
  const params = { type: "object", properties: { a: { type: "string" } } };
  const jsonSchema = { type: "object", properties: { b: { type: "number" } } };
  const tools = convert([
    {
      functionDeclarations: [
        { name: "both", parameters: params, parametersJsonSchema: jsonSchema },
      ],
    },
  ]);
  assert.deepEqual(tools[0].function.parameters, params);
});

test("falls back to an empty object schema when neither is present", () => {
  const tools = convert([{ functionDeclarations: [{ name: "noargs" }] }]);
  assert.deepEqual(tools[0].function.parameters, { type: "object", properties: {} });
});

test("converts multiple declarations across entries and skips entries without any", () => {
  const schemaB = { type: "object", properties: { x: { type: "integer" } }, required: ["x"] };
  const tools = convert([
    { functionDeclarations: [{ name: "one" }, { name: "two", parametersJsonSchema: schemaB }] },
    { googleSearch: {} },
    { functionDeclarations: [{ name: "three", parameters: schemaB }] },
  ]);
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["one", "two", "three"]
  );
  assert.deepEqual(tools[1].function.parameters, schemaB);
  assert.deepEqual(tools[2].function.parameters, schemaB);
});
