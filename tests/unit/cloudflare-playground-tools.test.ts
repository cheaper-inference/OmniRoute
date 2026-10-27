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
  CF_MAX_MESSAGE_CHARS,
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

test("serializeCfToolPrompt generates a compact contract block", () => {
  const prompt = serializeCfToolPrompt(TEST_TOOLS_OPENAI);
  assert.ok(prompt.includes("# Tools"));
  assert.ok(prompt.includes("bash"));
  assert.ok(prompt.includes("read_file"));
  assert.ok(prompt.includes('name="NAME"'));
  assert.ok(prompt.includes("command: string"));
  assert.ok(prompt.includes("path: string"));
  // Compact one-line signatures instead of pretty-printed JSON
  assert.ok(!prompt.includes('"type": "object"'));
  assert.ok(prompt.length < 1200, `contract should stay small, got ${prompt.length}`);
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

test("parseCfToolCalls handles any declared tool name used as the tag", () => {
  const text = '<bash>{"command": "ls"}</bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command": "ls"}');
});

test("parseCfToolCalls handles <read_file>...</read_file> tag", () => {
  const text = '<read_file>{"path": "src/index.ts"}</read_file>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read_file");
  assert.equal(calls[0].arguments, '{"path": "src/index.ts"}');
});

test("parseCfToolCalls ignores tag names that are not declared tools", () => {
  const text = '<div>{"not": "a tool"}</div>';
  assert.deepEqual(parseCfToolCalls(text, TEST_TOOLS), []);
});

test("parseCfToolCalls unwraps {name, arguments} inside a tool-name tag", () => {
  const text = '<bash>{"name": "bash", "arguments": {"command": "ls"}}</bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command":"ls"}');
});

test("parseCfToolCalls repairs unquoted JSON keys", () => {
  const text = '<bash>{command: "ls -la"}</bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls -la" });
});

test("parseCfToolCalls repairs double-escaped newlines", () => {
  const text = '<bash>{\\n"command": "cat package.json"\\n}</bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "cat package.json" });
});

test("parseCfToolCalls repairs single quotes and trailing commas", () => {
  const text = "<bash>{'command': 'ls',}</bash>";
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls" });
});

test("parseCfToolCalls repairs unquoted values with spaces and pipes", () => {
  const text = "<bash>{command: cat /tmp/package.json | head -3}</bash>";
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), {
    command: "cat /tmp/package.json | head -3",
  });
});

test("parseCfToolCalls repairs nested objects with unquoted keys/values", () => {
  const text = "<bash>{command: ls, opts: {cwd: /tmp, verbose: true}}</bash>";
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), {
    command: "ls",
    opts: { cwd: "/tmp", verbose: true },
  });
});

test("parseCfToolCalls handles function-call style bash({...})", () => {
  const text = 'bash({"command": "cat package.json"})';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "cat package.json" });
});

test("parseCfToolCalls ignores function-call style for undeclared names", () => {
  const text = 'printf({"command": "ls"})';
  assert.deepEqual(parseCfToolCalls(text, TEST_TOOLS), []);
});

test("parseCfToolCalls handles named-argument style bash(command=...)", () => {
  const text = 'bash(command="ls -la")';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls -la" });
});

test("parseCfToolCalls handles named-argument style with mixed scalars", () => {
  const text = 'bash(command="ls", verbose=true, timeout=30)';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), {
    command: "ls",
    verbose: true,
    timeout: 30,
  });
});

test("parseCfToolCalls reads the payload from a tag attribute", () => {
  const text = '<bash="{command: \\"ls -la\\"}"></bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls -la" });
});

test("parseCfToolCalls reads attribute payload with escaped quotes and numbers", () => {
  const text = '<read_file="{path: \\"/etc/hostname\\", offset: 0, limit: 5}"></read_file>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read_file");
  assert.deepEqual(JSON.parse(calls[0].arguments), {
    path: "/etc/hostname",
    offset: 0,
    limit: 5,
  });
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

test("buildCfToolConversationPrompt inserts the contract as its own user message", () => {
  const messages = [
    { role: "system" as const, content: "You are helpful" },
    { role: "user" as const, content: "What is 2+2?" },
  ];
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  assert.equal(result.length, 3);
  assert.equal(result[0].role, "system");
  assert.equal(result[1].role, "user");
  assert.ok((result[1].content as string).includes("# Tools"));
  assert.equal(result[2].role, "user");
  assert.equal(result[2].content, "What is 2+2?");
});

test("buildCfToolConversationPrompt splits an oversized contract into messages under 6000 chars", () => {
  const manyTools = Array.from({ length: 120 }, (_, i) => ({
    type: "function" as const,
    function: {
      name: `tool_${i}`,
      description: "A tool with a fairly long description ".repeat(4),
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
          nested: { type: "object", properties: { a: { type: "string" } } },
        },
        required: ["command"],
      },
    },
  }));
  const result = buildCfToolConversationPrompt(
    [{ role: "user" as const, content: "hi" }],
    manyTools
  );
  assert.ok(result.length > 2, "contract should be split across messages");
  for (const message of result) {
    assert.ok(
      typeof message.content === "string" && message.content.length <= CF_MAX_MESSAGE_CHARS,
      `message exceeds ${CF_MAX_MESSAGE_CHARS} chars`
    );
  }
});

test("buildCfToolConversationPrompt keeps array content in the user message", () => {
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
  const contractMessage = result[0];
  const userMessage = result[result.length - 1];
  assert.ok((contractMessage.content as string).includes("# Tools"));
  assert.deepEqual(userMessage.content, messages[0].content);
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

test("stripCfToolMarkup removes tool-name tags when names are provided", () => {
  const text = 'Before <bash>{"command": "ls"}</bash> after';
  assert.equal(stripCfToolMarkup(text, ["bash"]), "Before  after");
});

test("stripCfToolMarkup leaves undeclared tags alone", () => {
  const text = '<div>{"x": 1}</div> kept';
  assert.equal(stripCfToolMarkup(text, ["bash"]), '<div>{"x": 1}</div> kept');
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
