/**
 * Unit tests for Cloudflare Playground tool call translation.
 *
 * Covers:
 * - serializeCfToolPrompt: contract block generation
 * - parseCfToolCalls: all observed markup shapes (4 patterns)
 * - hasMalformedCfToolIntent: detection of incomplete/broken tool tags
 * - buildCfToolConversationPrompt: contract injection + conversation cap
 * - stripCfToolMarkup: cleaning model output
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  serializeCfToolPrompt,
  parseCfToolCalls,
  hasMalformedCfToolIntent,
  buildCfToolConversationPrompt,
  trimCfConversation,
  compactCfConversation,
  stripCfToolMarkup,
  CF_MAX_MESSAGE_CHARS,
  CF_MAX_CONVERSATION_MESSAGES,
  CF_COMPACT_HEADER,
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
  // Concrete example uses the first tool name as the tag
  assert.ok(prompt.includes('<bash>{"arg": value}</bash>'));
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

// ── Regressions: real model output that used to be dropped ──────────────────
// Every payload below was captured from a live playground session (OpenCode
// `ses_e9bc32a3bffeu7t5WwTY8M0ood`). Each one failed to parse before, so the
// model's markup leaked to the client as plain assistant text and the agent
// never received a tool result — it just retried the same turn.

test("parseCfToolCalls recovers a command with unescaped inner double quotes", () => {
  // The model quoted a glob without escaping it — not valid JSON:
  //   {"command":"find . -name "*.py" 2>/dev/null"}
  const command = 'ls -la /srv/*.py 2>/dev/null; find /srv -type f -name "*.py" 2>/dev/null';
  const text = `<tool name="bash">{"command":"${command}"}</tool>`;
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(JSON.parse(calls[0].arguments).command, command);
});

test("parseCfToolCalls recovers a payload closed with a stray extra brace", () => {
  // Observed tail: `...{str(e)}"}}` — one closing brace too many, so JSON.parse
  // rejected a payload that was otherwise entirely correct.
  const text = '<tool name="bash">{"command": "echo hi"}}</tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(JSON.parse(calls[0].arguments).command, "echo hi");
});

test("parseCfToolCalls recovers a file-write payload with escaped newlines and quotes", () => {
  // Observed: `<tool name="write">` carrying an entire script, `\n` escaped and
  // inner quotes backslash-escaped, behind a sentence of prose.
  const text =
    'Let me write the probe script:\n\n<tool name="write">{"path":"/tmp/probe.sh","content":"#!/bin/bash\\nset -e\\necho \\"done\\"\\n"}</tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "write");
  const args = JSON.parse(calls[0].arguments);
  assert.equal(args.path, "/tmp/probe.sh");
  assert.equal(args.content, '#!/bin/bash\nset -e\necho "done"\n');
});

test("parseCfToolCalls recovers a <tool> tag left unterminated by truncation", () => {
  // Observed: `<tool>{"name": "shell", "arguments": {...}}` with no closing
  // tag — the model ran out of output, or simply forgot it.
  const text = '<tool>{"name": "bash", "arguments": {"command": "ls"}}';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command":"ls"}');
});

test("parseCfToolCalls handles the <tool_call> tag spelling", () => {
  // Many models are trained on `<tool_call>` rather than `<tool>`.
  const text = '<tool_call>{"name":"bash","arguments":{"command":"ls"}}</tool_call>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command":"ls"}');
});

test("parseCfToolCalls does not turn prose that merely mentions <tool> into a call", () => {
  // The unterminated-tag recovery must not fire on explanatory text.
  const prose = "Wrap the payload in <tool> tags and put the JSON object right after them.";
  assert.equal(parseCfToolCalls(prose, TEST_TOOLS).length, 0);

  // A mismatched closing tag still counts as malformed intent, not a call.
  assert.equal(hasMalformedCfToolIntent('<tool>{"command": "ls"}</other>'), true);
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

test('parseCfToolCalls handles glommed <tool name="X"{json}> without closing quote', () => {
  const text = '<tool name="read"{"path": "."}></tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read");
  assert.deepEqual(JSON.parse(calls[0].arguments), { path: "." });
});

test("parseCfToolCalls handles glommed tool-name tag <bash{json}>", () => {
  const text = '<bash{"command": "ls -la"}></bash>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls -la" });
});

test("parseCfToolCalls unescapes backslash-escaped quotes in glommed attrs", () => {
  const text = '<tool name="read"{\\"path\\": \\".\\"}></tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read");
  assert.deepEqual(JSON.parse(calls[0].arguments), { path: "." });
});

test("parseCfToolCalls recovers a glommed tag whose JSON contains '>'", () => {
  const text = '<tool name="bash"{"command": "ls > out.txt"}></tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls > out.txt" });
});

test("parseCfToolCalls does not duplicate a well-formed tag with '>' in the JSON", () => {
  const text = '<tool name="bash">{"command": "ls > out.txt"}</tool>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "ls > out.txt" });
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

// ── conversation cap (10 user messages per conversation) ─────────────────────

/** Count the messages the playground's 10-message cap counts. */
const userishCount = (messages: Array<{ role?: string }>) =>
  messages.filter((m) => m.role === "user" || m.role === "tool").length;

test("trimCfConversation returns messages untouched when they already fit", () => {
  const messages = [
    { role: "user" as const, content: "hi" },
    { role: "assistant" as const, content: "hello" },
    { role: "user" as const, content: "bye" },
  ];
  assert.deepEqual(trimCfConversation(messages, 10), messages);
});

test("trimCfConversation keeps the newest user turns and drops the oldest", () => {
  const messages = [
    { role: "user" as const, content: "turn 1" },
    { role: "assistant" as const, content: "reply 1" },
    { role: "user" as const, content: "turn 2" },
    { role: "assistant" as const, content: "reply 2" },
    { role: "user" as const, content: "turn 3" },
    { role: "assistant" as const, content: "reply 3" },
    { role: "user" as const, content: "turn 4" },
  ];
  const trimmed = trimCfConversation(messages, 2);
  assert.equal(userishCount(trimmed), 2);
  // Starts on a user turn, never on an orphaned assistant reply.
  assert.equal(trimmed[0].role, "user");
  assert.equal(trimmed[0].content, "turn 3");
  assert.equal(trimmed[trimmed.length - 1].content, "turn 4");
  assert.ok(!trimmed.some((m) => m.content === "turn 1"));
  assert.ok(!trimmed.some((m) => m.content === "turn 2"));
});

test("trimCfConversation counts replayed tool results as user turns", () => {
  const messages = [
    { role: "user" as const, content: "run it" },
    { role: "assistant" as const, content: '<tool name="bash">{}</tool>' },
    { role: "tool" as const, content: "ok" },
    { role: "assistant" as const, content: "done" },
    { role: "user" as const, content: "and again" },
  ];
  const trimmed = trimCfConversation(messages, 2);
  assert.equal(userishCount(trimmed), 2);
  assert.equal(trimmed[0].role, "tool");
  assert.equal(trimmed[0].content, "ok");
  assert.equal(trimmed[trimmed.length - 1].content, "and again");
});

test("trimCfConversation returns nothing for a non-positive budget", () => {
  const messages = [{ role: "user" as const, content: "hi" }];
  assert.deepEqual(trimCfConversation(messages, 0), []);
});

// ── conversation compaction (old turns kept as one block) ────────────────────

test("compactCfConversation leaves a fitting conversation untouched", () => {
  const messages = [
    { role: "user" as const, content: "hi" },
    { role: "assistant" as const, content: "hello" },
  ];
  const { block, tail } = compactCfConversation(messages, 10);
  assert.equal(block, null);
  assert.deepEqual(tail, messages);
});

test("compactCfConversation folds older turns into one block with role headers", () => {
  const messages = [
    { role: "user" as const, content: "the original task" },
    { role: "assistant" as const, content: "on it" },
    { role: "user" as const, content: "a follow-up" },
    { role: "assistant" as const, content: "done" },
    { role: "user" as const, content: "the newest question" },
  ];
  const { block, tail } = compactCfConversation(messages, 1);

  assert.ok(block, "expected a compacted block");
  assert.ok(block!.startsWith(CF_COMPACT_HEADER));
  assert.ok(block!.includes("### USER\nthe original task"));
  assert.ok(block!.includes("### ASSISTANT\non it"));
  assert.ok(block!.includes("a follow-up"));
  // The verbatim window keeps the newest turn as a real message.
  assert.deepEqual(tail, [messages[4]]);
  assert.ok(!block!.includes("the newest question"));
});

test("compactCfConversation renders replayed tool calls and results", () => {
  const messages = [
    { role: "user" as const, content: "run it" },
    {
      role: "assistant" as const,
      content: null,
      tool_calls: [
        {
          id: "call_1",
          type: "function" as const,
          function: { name: "bash", arguments: '{"command": "ls"}' },
        },
      ],
    },
    { role: "tool" as const, content: "README.md", tool_call_id: "call_1" },
    { role: "user" as const, content: "newest" },
  ];
  const { block } = compactCfConversation(messages, 1);
  assert.ok(block!.includes('### ASSISTANT\n<tool name="bash">{"command": "ls"}</tool>'));
  assert.ok(
    block!.includes('### TOOL RESULT\n<tool_result call_id="call_1">README.md</tool_result>')
  );
});

test("compactCfConversation drops system messages and keeps the first user turn", () => {
  const messages = [
    { role: "system" as const, content: "IGNORE ME" },
    { role: "user" as const, content: "first" },
    { role: "user" as const, content: "second" },
  ];
  const { block } = compactCfConversation(messages, 1);
  assert.ok(!block!.includes("IGNORE ME"));
  assert.ok(block!.includes("first"));
});

test("compactCfConversation caps each turn inside the block", () => {
  const messages = [
    { role: "user" as const, content: "u".repeat(5000) },
    { role: "tool" as const, content: "t".repeat(5000), tool_call_id: "c" },
    { role: "user" as const, content: "newest" },
  ];
  const { block } = compactCfConversation(messages, 1);
  assert.ok(block!.length <= CF_MAX_MESSAGE_CHARS);
  assert.ok(block!.includes("[+4300 chars]"), "the user turn is capped at 700 chars");
  // The tool result is capped at 400 chars on top of its `<tool_result>` wrapper.
  assert.match(block!, /\[\+46\d\d chars\]/, "the tool result is capped at 400 chars");
});

test("compactCfConversation elides the middle, never the newest turns", () => {
  const messages = [
    ...Array.from({ length: 40 }, (_, i) => ({
      role: "user" as const,
      content: `turn ${i} ${"x".repeat(600)}`,
    })),
    { role: "user" as const, content: "newest" },
  ];
  const { block, tail } = compactCfConversation(messages, 1);
  assert.ok(block!.length <= CF_MAX_MESSAGE_CHARS, `block is ${block!.length} chars`);
  // Head (the original task) and tail (closest to the live window) survive.
  assert.ok(block!.includes("turn 0"));
  assert.ok(block!.includes("turn 39"));
  assert.ok(/\.\.\. \d+ earlier turns \([\d,]+ chars\) elided \.\.\./.test(block!));
  assert.deepEqual(tail, [messages[messages.length - 1]]);
});

test("compactCfConversation returns no block when the budget is zero", () => {
  const messages = [
    { role: "user" as const, content: "one" },
    { role: "user" as const, content: "two" },
  ];
  const { block, tail } = compactCfConversation(messages, 0);
  assert.ok(block);
  assert.deepEqual(tail, []);
});

test("buildCfToolConversationPrompt compacts older history to the 10 user-message cap", () => {
  // 12 user turns + their assistant replies + 1 contract = 13 user messages,
  // one past the playground's limit.
  const messages = Array.from({ length: 12 }, (_, i) => [
    { role: "user" as const, content: `turn ${i}` },
    { role: "assistant" as const, content: `reply ${i}` },
  ]).flat();
  messages.push({ role: "user" as const, content: "latest question" });

  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);

  assert.equal(userishCount(result), CF_MAX_CONVERSATION_MESSAGES);
  // The contract survives the trim and the caller's own turn is never dropped.
  assert.ok((result[0].content as string).includes("# Tools"));
  assert.equal(result[result.length - 1].content, "latest question");
  // The oldest turns are kept in one compacted block, so the model can still see
  // what the session started from.
  assert.ok((result[1].content as string).includes(CF_COMPACT_HEADER));
  assert.ok((result[1].content as string).includes("### USER\nturn 0"));
});

test("buildCfToolConversationPrompt trims even when there are no tools", () => {
  const messages = Array.from({ length: 13 }, (_, i) => ({
    role: "user" as const,
    content: `turn ${i}`,
  }));
  const result = buildCfToolConversationPrompt(messages, []);
  assert.equal(userishCount(result), CF_MAX_CONVERSATION_MESSAGES);
  assert.equal(result[result.length - 1].content, "turn 12");
});

test("buildCfToolConversationPrompt never lets the contract swallow the user's turn", () => {
  // A contract big enough to need every slot still leaves room for the prompt.
  const manyTools = Array.from({ length: 400 }, (_, i) => ({
    type: "function" as const,
    function: {
      name: `tool_${i}`,
      description: "A tool with a fairly long description ".repeat(4),
      parameters: { type: "object", properties: { command: { type: "string" } } },
    },
  }));
  const result = buildCfToolConversationPrompt(
    [{ role: "user" as const, content: "the only question" }],
    manyTools
  );
  assert.equal(userishCount(result), CF_MAX_CONVERSATION_MESSAGES);
  assert.equal(result[result.length - 1].content, "the only question");
});

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
