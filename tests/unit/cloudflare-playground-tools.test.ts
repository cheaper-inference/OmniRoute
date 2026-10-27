/**
 * Unit tests for Cloudflare Playground tool call translation.
 *
 * Covers:
 * - serializeCfToolPrompt: contract block generation
 * - parseCfToolCalls: all observed markup shapes (4 patterns)
 * - hasMalformedCfToolIntent: detection of incomplete/broken tool tags
 * - buildCfToolConversationPrompt: injection into first user message
 * - stripCfToolMarkup: cleaning model output
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  serializeCfToolPrompt,
  parseCfToolCalls,
  hasMalformedCfToolIntent,
  buildCfToolConversationPrompt,
  stripCfToolMarkup,
  type CfToolDef,
} from "../../open-sse/translator/cloudflarePlaygroundTools.ts";

// Test tools fixture
const TEST_TOOLS: CfToolDef[] = [
  {
    name: "bash",
    description: "Execute a shell command",
    parameters: {
      type: "object",
      properties: {
        command: { type: "string", description: "The command to run" },
      },
      required: ["command"],
    },
  },
  {
    name: "read_file",
    description: "Read a file",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string" },
      },
      required: ["path"],
    },
  },
];

const TEST_TOOLS_OPENAI = TEST_TOOLS.map((t) => ({
  type: "function" as const,
  function: {
    name: t.name,
    description: t.description,
    parameters: t.parameters,
  },
}));

// ── serializeCfToolPrompt ─────────────────────────────────────────────────────

test("serializeCfToolPrompt returns empty string for empty tools", () => {
  assert.equal(serializeCfToolPrompt([]), "");
  assert.equal(serializeCfToolPrompt(undefined as unknown as CfToolDef[]), "");
});

test("serializeCfToolPrompt generates a readable contract block", () => {
  const prompt = serializeCfToolPrompt(TEST_TOOLS_OPENAI);
  assert.ok(prompt.includes("# Tools"));
  assert.ok(prompt.includes("bash"));
  assert.ok(prompt.includes("read_file"));
  assert.ok(prompt.includes('name="function_name"'));
  assert.ok(prompt.includes("command"));
  assert.ok(prompt.includes("path"));
  // JSON parameters are pretty-printed
  assert.ok(prompt.includes('"type": "object"'));
});

// ── parseCfToolCalls ──────────────────────────────────────────────────────────

test("parseCfToolCalls returns empty array for empty text", () => {
  assert.deepEqual(parseCfToolCalls("", TEST_TOOLS), []);
  assert.deepEqual(parseCfToolCalls("just text", TEST_TOOLS), []);
});

test("parseCfToolCalls handles <tool>...</tool> with omitted name (single tool inference)", () => {
  const singleTool = [TEST_TOOLS[0]];
  const text = '<tool>{"command": "ls -la"}</tool>';
  const calls = parseCfToolCalls(text, singleTool);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command": "ls -la"}');
  assert.ok(calls[0].id.startsWith("call_"));
});

test('parseCfToolCalls handles <tool name="...">...</tool> with explicit name', () => {
  const text = '<tool name="read_file">{"path": "/etc/passwd"}</tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read_file");
  assert.equal(calls[0].arguments, '{"path": "/etc/passwd"}');
});

test("parseCfToolCalls handles <tool:name>...</tool:name> form", () => {
  const text = '<tool:bash>{"command": "echo hello"}</tool:bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command": "echo hello"}');
});

test("parseCfToolCalls handles <shell>...</shell> (tool name as tag, discovered live)", () => {
  const text = '<shell>{"command": "ls"}</shell>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "shell");
  assert.equal(calls[0].arguments, '{"command": "ls"}');
});

test("parseCfToolCalls handles multiple tool calls in one response", () => {
  const text =
    '<tool name="bash">{"command": "ls"}</tool> some text <tool:read_file>{"path": "foo.txt"}</tool:read_file>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[1].name, "read_file");
});

test("parseCfToolCalls infers name from first tool when multiple available and name omitted", () => {
  const text = '<tool>{"command": "pwd"}</tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS); // 2 tools available
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash"); // first tool
});

test("parseCfToolCalls handles attributes with single quotes", () => {
  const text = '<tool name=\'bash\'>{"command": "ls"}</tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
});

test("parseCfToolCalls handles whitespace variations", () => {
  const text = '  < tool  name = "bash" >  { "command": "ls" }  </ tool >  ';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
});

test("parseCfToolCalls handles multiline JSON arguments", () => {
  const text = `<tool name="bash">{
  "command": "echo hello",
  "args": ["a", "b"]
}</tool>`;
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.ok(calls[0].arguments.includes("echo hello"));
  assert.ok(calls[0].arguments.includes('"args"'));
});

// ── hasMalformedCfToolIntent ──────────────────────────────────────────────────

test("hasMalformedCfToolIntent returns false for clean text", () => {
  assert.equal(hasMalformedCfToolIntent("hello world"), false);
  assert.equal(hasMalformedCfToolIntent(""), false);
});

test("hasMalformedCfToolIntent returns false for well-formed tool calls", () => {
  assert.equal(hasMalformedCfToolIntent('<tool>{"command": "ls"}</tool>'), false);
  assert.equal(hasMalformedCfToolIntent('<tool name="bash">{"command": "ls"}</tool>'), false);
});

test("hasMalformedCfToolIntent returns true for unclosed tags", () => {
  assert.equal(hasMalformedCfToolIntent('<tool>{"command": "ls"'), true);
  assert.equal(hasMalformedCfToolIntent('<tool name="bash">{"command": "ls"'), true);
});

test("hasMalformedCfToolIntent returns true for mismatched tags", () => {
  assert.equal(hasMalformedCfToolIntent('<tool>{"command": "ls"}</other>'), true);
});

test("hasMalformedCfToolIntent returns true for invalid JSON in tool call", () => {
  assert.equal(hasMalformedCfToolIntent("<tool>{not valid json}</tool>"), true);
});

// ── buildCfToolConversationPrompt ─────────────────────────────────────────────

test("buildCfToolConversationPrompt returns original messages when no tools", () => {
  const messages = [{ role: "user" as const, content: "hi" }];
  const result = buildCfToolConversationPrompt(messages, []);
  assert.deepEqual(result, messages);
});

test("buildCfToolConversationPrompt prepends tool contract to first user message", () => {
  const messages = [
    { role: "system" as const, content: "You are helpful" },
    { role: "user" as const, content: "What is 2+2?" },
  ];
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  assert.equal(result.length, 2);
  assert.ok(result[0].role === "system");
  assert.ok(result[1].role === "user");
  const userContent = result[1].content as string;
  assert.ok(userContent.includes("# Tools"));
  assert.ok(userContent.includes("What is 2+2?"));
  assert.ok(userContent.includes("---")); // separator
});

test("buildCfToolConversationPrompt handles array content in user message", () => {
  const messages = [
    {
      role: "user" as const,
      content: [
        { type: "text" as const, text: "First part" },
        { type: "text" as const, text: "Second part" },
      ],
    },
  ];
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  const userContent = result[0].content as string;
  assert.ok(userContent.includes("First part"));
  assert.ok(userContent.includes("Second part"));
  assert.ok(userContent.includes("# Tools"));
});

test("buildCfToolConversationPrompt does nothing if no user message exists", () => {
  const messages = [
    { role: "assistant" as const, content: "I am ready" },
    { role: "system" as const, content: "System prompt" },
  ];
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  assert.deepEqual(result, messages);
});

// ── stripCfToolMarkup ─────────────────────────────────────────────────────────

test("stripCfToolMarkup removes <tool>...</tool> tags", () => {
  const text = 'Here is the result: <tool name="bash">{"command": "ls"}</tool> done.';
  const stripped = stripCfToolMarkup(text);
  assert.equal(stripped, "Here is the result:  done.");
});

test("stripCfToolMarkup removes <tool:name>...</tool:name> tags", () => {
  const text = '<tool:bash>{"command": "ls"}</tool:bash> remaining';
  const stripped = stripCfToolMarkup(text);
  assert.equal(stripped, "remaining");
});

test("stripCfToolMarkup removes <shell>...</shell> tags", () => {
  const text = '<shell>{"command": "ls"}</shell> after';
  const stripped = stripCfToolMarkup(text);
  assert.equal(stripped, "after");
});

test("stripCfToolMarkup removes the separator line", () => {
  const text = "---\n\nUser content";
  const stripped = stripCfToolMarkup(text);
  assert.equal(stripped, "User content");
});

test("stripCfToolMarkup handles multiple tags", () => {
  const text = '<tool name="a">1</tool> middle <tool:b>2</tool:b> end';
  const stripped = stripCfToolMarkup(text);
  assert.equal(stripped, "middle  end"); // trimStart removes leading space
});
