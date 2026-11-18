import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type ChatTool = { type: string; function: { name: string; parameters: unknown } };

function translateTools(tools: unknown[]): ChatTool[] {
  const result = openaiResponsesToOpenAIRequest(
    "ollama-cloud/deepseek-v4.1-flash",
    {
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
      tools,
    },
    false,
    {}
  ) as { tools: ChatTool[] };
  return result.tools;
}

/** Every value found under an `enum` key, at any depth. */
function collectEnums(value: unknown, found: unknown[] = []): unknown[] {
  if (Array.isArray(value)) {
    for (const entry of value) collectEnums(entry, found);
  } else if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (key === "enum") found.push(entry);
      collectEnums(entry, found);
    }
  }
  return found;
}

// The deep-truncated shape Codex Desktop sent for mcp__codex_app.create_thread (#18679).
const truncatedSchema = {
  type: "object",
  properties: {
    target: {
      anyOf: [
        {
          type: "object",
          properties: {
            type: { type: "string", enum: "[MaxDepth]" },
            mode: { type: "string", enum: ["fast", "slow"] },
          },
        },
        { type: "null" },
      ],
    },
  },
};

test("#18679 Responses -> Chat drops a string-valued enum from a function tool schema", () => {
  const [tool] = translateTools([
    { type: "function", name: "create_thread", parameters: truncatedSchema },
  ]);

  const enums = collectEnums(tool.function.parameters);
  assert.ok(
    enums.every((entry) => Array.isArray(entry)),
    `every enum must be an array, got ${JSON.stringify(enums)}`
  );
  assert.deepEqual(enums, [["fast", "slow"]]);
});

test("#18679 Responses -> Chat sanitizes namespace (MCP) sub-tool schemas too", () => {
  const [tool] = translateTools([
    {
      type: "namespace",
      name: "mcp__codex_app",
      tools: [{ name: "create_thread", parameters: truncatedSchema }],
    },
  ]);

  assert.equal(tool.function.name, "mcp__codex_app__create_thread");
  assert.deepEqual(collectEnums(tool.function.parameters), [["fast", "slow"]]);
});

test("#18679 Responses -> Chat coerces an index-keyed enum object to an array", () => {
  const [tool] = translateTools([
    {
      type: "function",
      name: "pick",
      parameters: {
        type: "object",
        properties: { choice: { type: "string", enum: { 0: "a", 1: "b" } } },
      },
    },
  ]);

  assert.deepEqual(collectEnums(tool.function.parameters), [["a", "b"]]);
});

test("#18679 Responses -> Chat leaves a valid tool schema unchanged", () => {
  const parameters = {
    type: "object",
    properties: {
      path: { type: "string", description: "File path" },
      mode: { type: "string", enum: ["read", "write"] },
      options: { type: "object", additionalProperties: false, properties: {} },
    },
    required: ["path"],
    additionalProperties: false,
  };
  const [tool] = translateTools([{ type: "function", name: "open_file", parameters }]);

  assert.deepEqual(tool.function.parameters, parameters);
});
