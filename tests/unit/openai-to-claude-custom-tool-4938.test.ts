import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// Regression: Chat Completions custom tools carry their definition under `custom`
// (`{ type: "custom", custom: { name, description, input_schema | format } }`). The
// openai-to-claude tool mapping only unwrapped `tool.function`, so the name was read off
// the wrapper (which has none) and the tool was silently dropped: the model never saw it.

function messagesWith(tools: unknown[]) {
  return { messages: [{ role: "user", content: "use the tool" }], tools };
}

test("openaiToClaudeRequest: custom tool with input_schema is unwrapped, not dropped", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    messagesWith([
      {
        type: "custom",
        custom: {
          name: "example_tool",
          description: "Example custom tool",
          input_schema: { type: "object", properties: { value: { type: "string" } } },
        },
      },
    ]),
    false
  );

  assert.ok(Array.isArray(translated.tools), "expected translated.tools to be an array");
  assert.equal(translated.tools.length, 1, "expected the custom tool to survive translation");
  const tool = translated.tools[0];
  assert.match(tool.name, /example_tool$/);
  assert.equal(tool.description, "Example custom tool");
  assert.deepEqual(tool.input_schema, {
    type: "object",
    properties: { value: { type: "string" } },
  });
});

test("openaiToClaudeRequest: custom tool name maps back to the original name for responses", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    messagesWith([
      { type: "custom", custom: { name: "example_tool", input_schema: { type: "object" } } },
    ]),
    false
  );

  assert.equal(translated.tools.length, 1);
  const tool = translated.tools[0];
  // The prefix may be empty; the mapping (when kept) must resolve to the original name.
  if (translated._toolNameMap) {
    assert.equal(translated._toolNameMap.get(tool.name), "example_tool");
  }
  // An object schema without properties is backfilled, as for function tools (#595).
  assert.deepEqual(tool.input_schema, { type: "object", properties: {} });
});

test("openaiToClaudeRequest: freeform custom tool (format, no schema) gets the default object schema", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    messagesWith([
      {
        type: "custom",
        custom: { name: "apply_patch", description: "Apply a patch", format: { type: "text" } },
      },
    ]),
    false
  );

  assert.equal(translated.tools.length, 1, "expected the freeform custom tool to survive");
  const tool = translated.tools[0];
  assert.match(tool.name, /apply_patch$/);
  assert.equal(tool.description, "Apply a patch");
  assert.deepEqual(tool.input_schema, { type: "object", properties: {}, required: [] });
  assert.equal("format" in tool, false, "the OpenAI grammar/format must not leak to Claude");
});

test("openaiToClaudeRequest: custom tool honors strict and parameters like a function tool", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    messagesWith([
      {
        type: "custom",
        custom: {
          name: "lookup",
          strict: true,
          parameters: { type: "object", properties: { id: { type: "integer" } } },
        },
      },
    ]),
    false
  );

  assert.equal(translated.tools.length, 1);
  assert.equal(translated.tools[0].strict, true);
  assert.deepEqual(translated.tools[0].input_schema, {
    type: "object",
    properties: { id: { type: "integer" } },
  });
});

test("openaiToClaudeRequest: function, bare-function and Claude-shape custom tools are unchanged", () => {
  const schema = { type: "object", properties: { city: { type: "string" } } };
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    messagesWith([
      { type: "function", function: { name: "spec_fn", description: "a", parameters: schema } },
      { function: { name: "bare_fn", description: "b", parameters: schema } },
      // Claude Code v2.1+ declares Claude-format tools with type "custom" and no wrapper.
      { type: "custom", name: "claude_shape", description: "c", input_schema: schema },
      // A custom wrapper whose payload is not an object stays dropped (no name to use).
      { type: "custom", custom: "not-an-object" },
    ]),
    false
  );

  assert.deepEqual(
    translated.tools.map((tool: { name: string }) =>
      tool.name.replace(/^.*?(?=spec_fn|bare_fn|claude_shape)/, "")
    ),
    ["spec_fn", "bare_fn", "claude_shape"]
  );
  assert.deepEqual(
    translated.tools.map((tool: { description: string }) => tool.description),
    ["a", "b", "c"]
  );
  for (const tool of translated.tools) assert.deepEqual(tool.input_schema, schema);
});

test("translateRequest openai→claude: custom tool schema keeps the numeric-string coercion", () => {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-sonnet-4",
    {
      model: "claude-sonnet-4",
      ...messagesWith([
        {
          type: "custom",
          custom: {
            name: "example_tool",
            input_schema: {
              type: "object",
              properties: { value: { type: "string", minLength: "1", maxLength: "200" } },
            },
          },
        },
      ]),
    },
    false
  ) as { tools?: Array<{ name: string; input_schema: Record<string, unknown> }> };

  assert.ok(Array.isArray(translated.tools));
  assert.equal(translated.tools.length, 1, "expected the custom tool to reach the Claude body");
  const value = (
    translated.tools[0].input_schema.properties as Record<string, Record<string, unknown>>
  ).value;
  assert.equal(value.minLength, 1);
  assert.equal(value.maxLength, 200);
});
