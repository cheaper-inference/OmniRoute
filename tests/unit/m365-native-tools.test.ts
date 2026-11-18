import test from "node:test";

import assert from "node:assert/strict";
import { parseFencedToolCalls } from "../../open-sse/executors/copilot-m365-frames.ts";
import { parseDevinToolRequest } from "../../open-sse/executors/devin-agentic/toolParser.ts";
import { validateSchema } from "../../open-sse/utils/toolArgumentSchema.ts";
import {
  buildM365ToolInstructions,
  parseM365ToolOutput,
} from "../../open-sse/executors/m365Protocol/tools.ts";
const tools = [
  {
    name: "terminal_exec",
    description: "Run command",
    parameters: { type: "object", properties: { command: { type: "string" } } },
  },
  { name: "lookup", description: "Lookup", parameters: { type: "object", properties: {} } },
];
const fence = (name: string, body: string) => `\`\`\`${name}\n${body}\n\`\`\``;

test("zero declared tools leave plain JSON, callable examples and source fences as normal text", () => {
  for (const text of [
    "A normal answer",
    '{"ok":true}',
    fence("json", '{"ok":true}'),
    fence("json", '{"name":"unknown","arguments":{}}'),
    fence("typescript", "{ const x = 1; }"),
    fence("bash", "echo literal"),
    "```lookup\n{",
  ])
    assert.deepEqual(parseM365ToolOutput(text, []), { text, calls: [] });
});

test("ordinary language and ambiguous named fences remain text when tools are declared", () => {
  for (const text of [
    "No tool needed",
    fence("json", '{"ok":true}'),
    fence("yaml", "ok: true"),
    fence("yaml", "{ok: true}"),
    fence("typescript", "{ const x = 1; }"),
    fence("unknownlanguage", "{}"),
    fence("unknown_tool", "{}"),
    fence("json", '{"name":"example"}'),
  ]) {
    assert.deepEqual(parseM365ToolOutput(text, tools), { text, calls: [] });
    const mixed = fence("lookup", "{}") + "\n" + text;
    const result = parseM365ToolOutput(mixed, tools);
    assert.equal(result.constraintViolation, undefined);
    assert.equal(result.calls.length, 1);
    assert.equal(result.text, mixed);
  }
});

test("required arguments must be own properties, including prototype names", () => {
  const declared = [
    {
      name: "typed",
      description: "Typed",
      parameters: {
        type: "object",
        required: ["toString"],
        properties: { toString: { type: "string" } },
      },
    },
  ];
  const requiredOnly = [{ ...declared[0], parameters: { type: "object", required: ["toString"] } }];
  assert.equal(
    parseM365ToolOutput(fence("typed", "{}"), requiredOnly).constraintViolation,
    "invalid_tool_arguments"
  );
  assert.equal(
    parseM365ToolOutput(fence("typed", "{}"), declared).constraintViolation,
    "invalid_tool_arguments"
  );
  assert.equal(
    parseM365ToolOutput(fence("typed", '{"toString":"literal"}'), declared).calls.length,
    1
  );
});

test("optional prototype-named properties and valid type unions are not falsely rejected", () => {
  const declared = [
    {
      name: "typed",
      description: "Typed",
      parameters: {
        type: "object",
        properties: { toString: { type: "string" }, value: { type: ["string", "null"] } },
      },
    },
  ];
  for (const args of [{}, { value: null }, { value: "literal" }]) {
    const result = parseM365ToolOutput(fence("typed", JSON.stringify(args)), declared);
    assert.equal(result.constraintViolation, undefined);
    assert.deepEqual(JSON.parse(result.calls[0].arguments), args);
  }
});
test("shared validator retains Devin diagnostics, inherited-key semantics and stable IDs", () => {
  const schema = { type: "object", required: ["toString"] };
  assert.deepEqual(validateSchema({}, schema, "arguments"), []);
  assert.deepEqual(validateSchema({}, schema, "arguments", true), [
    "arguments.toString is required",
  ]);
  const text = '<tool>{"name":"legacy","arguments":{}}</tool>';
  const declared = [{ name: "legacy", input_schema: schema }];
  const first = parseDevinToolRequest(text, declared, "same-turn");
  assert.deepEqual(first?.input, {});
  assert.equal(first?.id, parseDevinToolRequest(text, declared, "same-turn")?.id);
  assert.throws(
    () =>
      parseDevinToolRequest(text, [
        {
          name: "legacy",
          input_schema: {
            type: "object",
            properties: { toString: { type: "string" } },
          },
        },
      ]),
    /arguments.toString must be string, got function/
  );
});

test("legacy shell branch cannot bypass none or forced tool choice", () => {
  const declared = [{ ...tools[0], name: "bash" }, tools[1]];
  assert.equal(parseFencedToolCalls(fence("bash", "echo nope"), declared, "none").length, 0);
  assert.equal(
    parseFencedToolCalls(fence("sh", "echo nope"), declared, {
      type: "function",
      function: { name: "lookup" },
    }).length,
    0
  );
  assert.equal(parseFencedToolCalls(fence("lookup", "[]"), declared, "auto").length, 0);
});
test("single-generation parser reuses JSON fences and routes shell aliases only to schema-derived declared command tools", () => {
  const result = parseM365ToolOutput(fence("bash", "printf hello"), tools);
  assert.equal(result.calls[0].name, "terminal_exec");
  assert.deepEqual(JSON.parse(result.calls[0].arguments), { command: "printf hello" });
  assert.equal(parseM365ToolOutput(fence("unknown", "{}"), tools).calls.length, 0);
  assert.equal(parseM365ToolOutput(fence("bash", "printf hello"), [tools[1]]).calls.length, 0);
  assert.deepEqual(
    JSON.parse(parseM365ToolOutput(fence("lookup", '{"x":1}'), tools).calls[0].arguments),
    { x: 1 }
  );
});
test("none forced required parallel flag and object arguments are enforced", () => {
  const both = fence("lookup", "{}") + "\n" + fence("bash", "echo hello");
  assert.equal(parseM365ToolOutput(both, tools, { toolChoice: "none" }).calls.length, 0);
  assert.deepEqual(
    parseM365ToolOutput(both, tools, {
      toolChoice: { type: "function", function: { name: "terminal_exec" } },
    }).calls.map((c) => c.name),
    ["terminal_exec"]
  );
  assert.equal(parseM365ToolOutput(both, tools, { parallelToolCalls: false }).calls.length, 1);
  assert.equal(parseM365ToolOutput(both, tools, { parallelToolCalls: true }).calls.length, 2);
  assert.equal(
    parseM365ToolOutput("answer", tools, { toolChoice: "required" }).constraintViolation,
    "tool_required"
  );
  for (const arg of ["[]", "null", "123", '"text"'])
    assert.equal(parseM365ToolOutput(fence("lookup", arg), tools).calls.length, 0);
});
test("single accepted call document guard has an exact trimmed 1500-character structured preamble boundary", () => {
  for (const prefix of ["# Heading\n", "| Name | Value |\n| --- | --- |\n"]) {
    for (const length of [1499, 1500, 1501]) {
      const preamble = prefix + "x".repeat(length - prefix.length);
      const text = "  \n" + preamble + "\n  " + fence("bash", "echo literal");
      const result = parseM365ToolOutput(text, tools);
      assert.equal(result.calls.length, length < 1500 ? 1 : 0);
      assert.equal(result.documentGuarded === true, length >= 1500);
      assert.equal(result.text, text);
    }
  }
});
test("short headings, long unstructured prose and opening actions remain actions", () => {
  const block = fence("bash", "echo literal");
  for (const text of [
    "# Action\n" + block,
    "Example:\n" + block,
    "Here is a sample command:\n" + block,
    "x".repeat(1501) + "\n" + block,
    block + "\n# Report\n" + "x".repeat(2000),
    "# Action\n" + "x".repeat(200) + "\n" + block,
  ]) {
    const result = parseM365ToolOutput(text, tools);
    assert.equal(result.calls.length, 1);
    assert.equal(result.documentGuarded, undefined);
  }
});
test("multiple accepted calls are not suppressed by headings or prose", () => {
  const text =
    "# Plan\n" +
    "x".repeat(1600) +
    "\n" +
    fence("lookup", "{}") +
    "\n" +
    fence("bash", "echo literal");
  assert.equal(parseM365ToolOutput(text, tools).calls.length, 2);
  assert.equal(parseM365ToolOutput(text, tools, { parallelToolCalls: false }).calls.length, 1);
});
test("undeclared language fences do not count as accepted calls for the document guard", () => {
  const text =
    "# Document\n" +
    "x".repeat(1500) +
    "\n" +
    fence("javascript", "console.log('example')") +
    "\n" +
    fence("lookup", "{}");
  const result = parseM365ToolOutput(text, tools);
  assert.equal(result.calls.length, 0);
  assert.equal(result.documentGuarded, true);
});
test("required and typed arguments are validated without coercing literal strings", () => {
  const declared = [
    {
      name: "typed",
      description: "Typed arguments",
      parameters: {
        type: "object",
        required: ["path", "count", "config"],
        additionalProperties: false,
        properties: {
          path: { type: "string" },
          count: { type: "integer" },
          config: {
            type: "object",
            required: ["enabled"],
            properties: { enabled: { type: "boolean" } },
          },
        },
      },
    },
  ];
  for (const args of [
    {},
    { path: 7, count: 1, config: { enabled: true } },
    { path: "x", count: "1", config: { enabled: true } },
    { path: "x", count: 1, config: { enabled: "true" } },
    { path: "x", count: 1, config: null },
    { path: "x", count: 1, config: { enabled: true }, extra: 1 },
  ]) {
    const result = parseM365ToolOutput(fence("typed", JSON.stringify(args)), declared);
    assert.equal(result.calls.length, 0);
    assert.equal(result.constraintViolation, "invalid_tool_arguments");
  }
  const args = {
    path: "C:\\literal\\n $HOME 'quoted' </tool><tool>literal",
    count: 1,
    config: { enabled: false },
  };
  const result = parseM365ToolOutput(fence("typed", JSON.stringify(args)), declared);
  assert.deepEqual(JSON.parse(result.calls[0].arguments), args);
});
test("detectably malformed declared calls and explicit unknown envelopes reject the whole batch before parallel selection", () => {
  for (const bad of [
    fence("lookup", "{broken}"),
    fence("lookup", "[]"),
    fence("json", '{"name":"unknown_tool","arguments":{}}'),
    fence("unknown_tool", '{"name":"unknown_tool","arguments":{}}'),
    "```lookup\n{",
    fence("bash", '{"command":42}'),
  ]) {
    for (const parallelToolCalls of [true, false]) {
      const result = parseM365ToolOutput(fence("lookup", "{}") + "\n" + bad, tools, {
        parallelToolCalls,
      });
      assert.equal(result.calls.length, 0, bad);
      assert.equal(result.constraintViolation, "invalid_tool_arguments");
    }
  }
});
test("shell aliases must satisfy the full declared schema", () => {
  const declared = [
    {
      name: "terminal",
      description: "Run command",
      parameters: {
        type: "object",
        required: ["command", "cwd"],
        properties: { command: { type: "string" }, cwd: { type: "string" } },
      },
    },
  ];
  const result = parseM365ToolOutput(fence("bash", "echo literal"), declared);
  assert.equal(result.calls.length, 0);
  assert.equal(result.constraintViolation, "invalid_tool_arguments");
  const args = { command: "echo $HOME", cwd: "C:\\literal" };
  assert.deepEqual(
    JSON.parse(
      parseM365ToolOutput(fence("bash", JSON.stringify(args)), declared).calls[0].arguments
    ),
    args
  );
});
test("prompt contains schema and one inert example, no router turn and obeys none", () => {
  const prompt = buildM365ToolInstructions(tools, {
    toolChoice: "required",
    parallelToolCalls: false,
  });
  assert.match(prompt, /terminal_exec/);
  assert.match(prompt, /command/);
  assert.match(prompt, /one call/i);
  assert.equal((prompt.match(/```lookup/g) || []).length, 1);
  assert.equal(buildM365ToolInstructions(tools, { toolChoice: "none" }), "");
  assert.equal(
    parseM365ToolOutput("x".repeat(100), tools, { maxTextLength: 10 }).constraintViolation,
    "text_limit"
  );
});

test("shell JSON arrays/scalars are not commands; forced exact names cannot reroute to another tool", () => {
  const shellTools = [{ ...tools[0], name: "bash" }, tools[0]];
  for (const body of ["[]", "null", "123", '"text"'])
    assert.equal(parseM365ToolOutput(fence("bash", body), shellTools).calls.length, 0);
  assert.equal(
    parseM365ToolOutput(fence("bash", "echo x"), shellTools, { toolChoice: "terminal_exec" }).calls
      .length,
    0
  );
  assert.equal(
    parseM365ToolOutput("answer", tools, { toolChoice: "terminal_exec" }).constraintViolation,
    "forced_tool_missing"
  );
});

test("schema-derived shell keys and array item types preserve their declared contract", () => {
  for (const key of ["cmd", "script"]) {
    const declared = [
      {
        name: "bash",
        description: "Run",
        parameters: { type: "object", required: [key], properties: { [key]: { type: "string" } } },
      },
    ];
    const result = parseM365ToolOutput(fence("sh", "echo literal"), declared);
    assert.deepEqual(JSON.parse(result.calls[0].arguments), { [key]: "echo literal" });
  }
  const declared = [
    {
      name: "typed",
      description: "Typed",
      parameters: {
        type: "object",
        required: ["items", "mode"],
        properties: {
          items: { type: "array", items: { type: "integer" } },
          mode: { type: "string", enum: ["read", "write"] },
        },
      },
    },
  ];
  for (const args of [
    { items: ["1"], mode: "read" },
    { items: [1], mode: "unknown" },
  ])
    assert.equal(
      parseM365ToolOutput(fence("typed", JSON.stringify(args)), declared).constraintViolation,
      "invalid_tool_arguments"
    );
  assert.equal(
    parseM365ToolOutput(fence("typed", '{"items":[1],"mode":"read"}'), declared).calls.length,
    1
  );
});

test("JSON shell aliases map object arguments to the schema-derived tool", () => {
  const result = parseM365ToolOutput(fence("bash", '{"command":"echo hello"}'), tools);
  assert.equal(result.calls[0]?.name, "terminal_exec");
  assert.deepEqual(JSON.parse(result.calls[0].arguments), { command: "echo hello" });
  for (const alias of ["pwsh", "ps1", "zsh", "cmd"])
    assert.equal(
      parseM365ToolOutput(fence(alias, "echo hello"), tools).calls[0]?.name,
      "terminal_exec"
    );
});
