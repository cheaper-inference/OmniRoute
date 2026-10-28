/**
 * Unit tests for Cloudflare Playground tool call translation.
 *
 * Covers:
 * - serializeCfToolPrompt: contract block generation
 * - parseCfToolCalls: every observed markup shape (a nine-step pattern ladder,
 *   ending in the wrong-closer / unclosed-body recovery)
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
  buildCfToolReminder,
  trimCfConversation,
  compactCfConversation,
  stripCfToolMarkup,
  finalizeCfToolCalls,
  cfToolNonce,
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
  assert.ok(prompt.includes("# Tool Calling Instructions"));
  assert.ok(prompt.includes("bash"));
  assert.ok(prompt.includes("read_file"));
  // The worked example spells the call with the first declared tool plus a
  // concrete argument set — a few-shot shape reads better than an abstract
  // placeholder, which the models kept reproducing as the tag.
  assert.match(prompt, /<bash>\{"arg": value, "_nonce": "[a-z0-9]+"\}<\/bash>/);
  // Wrapper shapes stay forbidden even though a real tag is now shown.
  assert.ok(prompt.includes("Do NOT use markdown code fences"));
  assert.ok(prompt.includes("attribute-based arguments"));
  assert.ok(prompt.includes("command: string"));
  assert.ok(prompt.includes("path: string"));
  // Compact one-line signatures instead of pretty-printed JSON
  assert.ok(!prompt.includes('"type": "object"'));
  // The worked + negative examples dominate the fixed preamble (~1.8k for two
  // tools, ~2.6k for OpenCode's twelve), so the bound tracks the preamble, not
  // the tool count.
  assert.ok(prompt.length < 2000, `contract should stay small, got ${prompt.length}`);
});

test("serializeCfToolPrompt says the tool name belongs in the tag, not the JSON", () => {
  const prompt = serializeCfToolPrompt(TEST_TOOLS_OPENAI);
  assert.ok(
    prompt.includes("Use exclusively `<tool_name>...</tool_name>`"),
    'the rule that prevents `<edit>{"arg": "read"}` must be stated'
  );
  // The contract names the wrapper shapes it rejects (code fences, `<tool>`,
  // `<tool_call>`, attribute arguments) now that the example uses a real tag.
  assert.ok(prompt.includes("Do NOT use markdown code fences"));
  // Requirement is stated twice: once in the example, once as a rule.
  const nonce = prompt.match(/"_nonce": "([a-z0-9]+)"/)?.[1];
  assert.ok(nonce, "contract should carry a nonce");
  assert.ok(
    prompt.includes(
      `\`"_nonce": "${nonce}"\` exactly as provided. Any mismatch will cause the call to be rejected.`
    )
  );
});

test("serializeCfToolPrompt is stable for one tool set", () => {
  // The executor re-serializes the contract for its repair retry; a nonce that
  // changed between the two would reject the model's retry as unbound.
  assert.equal(serializeCfToolPrompt(TEST_TOOLS_OPENAI), serializeCfToolPrompt(TEST_TOOLS_OPENAI));
});

test("cfToolNonce returns the nonce the contract asked for", () => {
  const prompt = serializeCfToolPrompt(TEST_TOOLS_OPENAI);
  assert.ok(prompt.includes(cfToolNonce(TEST_TOOLS_OPENAI)));
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

test("parseCfToolCalls preserves brackets, asterisks and quotes in the payload byte-for-byte", () => {
  // Regression guard for the repair passes. A model writing Python emits
  // `Optional[str]`, `Dict[str, Any]`, `**kwargs`, `servers["text"]` and
  // `[{}])[0]` — exactly the characters a lossy "repair" would eat. The real
  // capture (`jolly-nebula/8941`, a 9,723-char `kw-ai/orchestrator/
  // query_processor.py`) round-trips unchanged, so assert equality against the
  // expected string rather than a substring: any dropped `[`, `]` or `*`
  // silently writes a corrupted file to disk, which is worse than dropping the
  // call, and a substring check would not catch it.
  const content = [
    "from typing import Dict, Any, Optional, List",
    "",
    "@dataclass",
    "class Query:",
    "    image_prompt: Optional[str] = None",
    "    image_seed: Optional[int] = None",
    "",
    "    def to_dict(self) -> Dict[str, Any]:",
    "        return {}",
    "",
    "class QueryProcessor:",
    "    def __init__(self, arbiter):",
    "        self.arbiter = arbiter",
    "",
    "    def route_text_only(self, query, **kwargs) -> Dict[str, Any]:",
    '        text_server = self.arbiter.servers["text"]',
    '        text = result.get("choices", [{}])[0].get("text", "")',
    "        return text",
    "",
  ].join("\n");

  // Trailing `}` reproduces the observed stray brace, forcing the repair path
  // rather than plain `JSON.parse`.
  const text = `<tool name="write">{"path":"kw/query_processor.py","content":${JSON.stringify(
    content
  )}}}</tool>`;

  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "write");
  const args = JSON.parse(calls[0].arguments);
  assert.equal(args.path, "kw/query_processor.py");
  assert.equal(args.content, content);
  // Belt and braces: the characters that were reported as visibly mangled.
  assert.ok(args.content.includes("Optional[str]"));
  assert.ok(args.content.includes("Dict[str, Any]"));
  assert.ok(args.content.includes("**kwargs"));
  assert.ok(args.content.includes('servers["text"]'));
  assert.ok(args.content.includes("[{}])[0]"));
});

test("parseCfToolCalls handles the <tool_call> tag spelling", () => {
  // Many models are trained on `<tool_call>` rather than `<tool>`.
  const text = '<tool_call>{"name":"bash","arguments":{"command":"ls"}}</tool_call>';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.equal(calls[0].arguments, '{"command":"ls"}');
});

// ── XML-style arguments: <tool><param>value</param></tool> ──────────────────
// Observed live (`ses_e9bc32a3bffeu7t5WwTY8M0ood`, seq 9032, `finish: stop`):
// instead of the JSON the contract asks for, the model emitted XML argument
// tags. Every call in the turn was dropped and the markup leaked as text.
// These use their own fixture because the behaviour depends on the tool's
// declared parameter names.

const XML_TOOLS: CfToolDef[] = [
  {
    name: "read",
    description: "Read a file",
    parameters: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "shell",
    description: "Execute a shell command",
    parameters: {
      type: "object",
      properties: { command: { type: "string" } },
      required: ["command"],
    },
  },
  {
    name: "write",
    description: "Write a file",
    parameters: {
      type: "object",
      properties: { path: { type: "string" }, content: { type: "string" } },
      required: ["path", "content"],
    },
  },
];

test("parseCfToolCalls parses XML-style <read><path>…</path></read>", () => {
  const text = "<read><path>kw-ai/orchestrator/query_processor.py</path></read>";
  const calls = parseCfToolCalls(text, XML_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read");
  assert.equal(calls[0].arguments, '{"path":"kw-ai/orchestrator/query_processor.py"}');
});

test("parseCfToolCalls keeps all five XML calls of one turn, in order", () => {
  const text = [
    "I'll continue from where we left off.",
    "",
    "<read><path>kw-ai/orchestrator/query_processor.py</path></read>",
    '<shell><command>ps aux | grep -E "(comfyui|python.*main.py)" | grep -v grep</command></shell>',
    "<read><path>kw-ai/orchestrator/arbiter.py</path></read>",
    "<read><path>kw-ai/orchestrator/memory_manager.py</path></read>",
    "<read><path>kw-ai/orchestrator/__init__.py</path></read>",
  ].join("\n");

  const calls = parseCfToolCalls(text, XML_TOOLS);
  assert.deepEqual(
    calls.map((c) => [c.name, JSON.parse(c.arguments)]),
    [
      ["read", { path: "kw-ai/orchestrator/query_processor.py" }],
      ["shell", { command: 'ps aux | grep -E "(comfyui|python.*main.py)" | grep -v grep' }],
      ["read", { path: "kw-ai/orchestrator/arbiter.py" }],
      ["read", { path: "kw-ai/orchestrator/memory_manager.py" }],
      ["read", { path: "kw-ai/orchestrator/__init__.py" }],
    ]
  );

  // The prose survives; the markup does not.
  const visible = stripCfToolMarkup(
    text,
    calls.map((c) => c.name)
  );
  assert.equal(visible.trim(), "I'll continue from where we left off.");
});

test("parseCfToolCalls maps a single XML param onto the declared argument name", () => {
  // Models write <file_path> for a tool whose declared argument is `path`.
  const text = "<read><file_path>/etc/hostname</file_path></read>";
  const calls = parseCfToolCalls(text, XML_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read");
  assert.equal(calls[0].arguments, '{"path":"/etc/hostname"}');
});

test("parseCfToolCalls keeps XML params separate when the tool takes several", () => {
  const text = "<write><path>/tmp/a.txt</path><content>line1\nline2</content></write>";
  const calls = parseCfToolCalls(text, XML_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), {
    path: "/tmp/a.txt",
    content: "line1\nline2",
  });
});

test("parseCfToolCalls decodes XML entities in XML-style arguments", () => {
  const text = "<read><path>a&amp;b&lt;c&gt;.txt</path></read>";
  const calls = parseCfToolCalls(text, XML_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(JSON.parse(calls[0].arguments).path, "a&b<c>.txt");
});

test("parseCfToolCalls ignores XML-style markup that is not a declared tool", () => {
  const text = "Use <div><span>this</span></div> to wrap the output.";
  assert.deepEqual(parseCfToolCalls(text, XML_TOOLS), []);
});

test("parseCfToolCalls parses XML-style arguments inside an explicit <tool> wrapper", () => {
  const text = '<tool name="read"><path>/etc/hosts</path></tool>';
  const calls = parseCfToolCalls(text, XML_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "read");
  assert.equal(calls[0].arguments, '{"path":"/etc/hosts"}');
});

test("parseCfToolCalls does not turn prose that merely mentions <tool> into a call", () => {
  // The unterminated-tag recovery must not fire on explanatory text.
  const prose = "Wrap the payload in <tool> tags and put the JSON object right after them.";
  assert.equal(parseCfToolCalls(prose, TEST_TOOLS).length, 0);
});

test("parseCfToolCalls recovers a body closed with the wrong tag", () => {
  // `</other>` is not `</tool>`, but the JSON body is complete: reading it is
  // strictly better than dropping the turn and burning a repair retry.
  const calls = parseCfToolCalls('<tool>{"command": "ls"}</other>', TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
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

test("parseCfToolCalls infers the name from the argument schema when omitted", () => {
  // Two tools available, so the name cannot come from the array. It comes from
  // the only schema the payload satisfies — never from `availableTools[0]`.
  const fromCommand = parseCfToolCalls('<tool>{"command": "pwd"}</tool>', TEST_TOOLS);
  assert.equal(fromCommand.length, 1);
  assert.equal(fromCommand[0].name, "bash");

  const fromPath = parseCfToolCalls('<tool>{"path": "a.py"}</tool>', TEST_TOOLS);
  assert.equal(fromPath.length, 1);
  assert.equal(fromPath[0].name, "read_file");
});

test("parseCfToolCalls refuses to guess when two schemas fit the payload", () => {
  const calls = parseCfToolCalls(
    '<tool>{"pattern": "*.ts"}</tool>',
    [
      {
        name: "glob",
        parameters: {
          type: "object",
          properties: { pattern: { type: "string" } },
          required: ["pattern"],
        },
      },
      {
        name: "grep",
        parameters: {
          type: "object",
          properties: { pattern: { type: "string" } },
          required: ["pattern"],
        },
      },
    ]
    // Both tools accept {pattern}: no call is better than the wrong one.
  );
  assert.deepEqual(calls, []);
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

test("hasMalformedCfToolIntent returns false for a recoverable mismatched tag", () => {
  // A complete body closed with the wrong tag used to reach the retry path; the
  // parser now reads it, so the executor must not re-ask.
  assert.equal(hasMalformedCfToolIntent('<tool>{"command": "ls"}</other>'), false);
});

test("hasMalformedCfToolIntent returns true for a wrong closing tag with no body", () => {
  assert.equal(hasMalformedCfToolIntent('<tool>{"command": "ls"</other>'), true);
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
  assert.ok((result[0].content as string).includes("# Tool Calling Instructions"));
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
  assert.ok((result[1].content as string).includes("# Tool Calling Instructions"));
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
  assert.ok((contractMessage.content as string).includes("# Tool Calling Instructions"));
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

// ── tool reminder (in-context contract restatement) ───────────────────────────

test("buildCfToolReminder returns empty string for empty tools", () => {
  assert.equal(buildCfToolReminder([]), "");
});

test("buildCfToolReminder restates the contract with this request's nonce", () => {
  const reminder = buildCfToolReminder(TEST_TOOLS_OPENAI);
  const nonce = cfToolNonce(TEST_TOOLS_OPENAI);

  assert.ok(reminder.includes("# Tool Call Reminder"));
  // Shape line plus a concrete quick example the model can copy.
  assert.ok(reminder.includes(`<TOOL>{"arg": value, "_nonce": "${nonce}"}</TOOL>`));
  assert.ok(reminder.includes("Put the tool name in the XML tag itself"));
  assert.ok(!reminder.includes("<bash>{"), "the reminder must not prime the first tool");
  // The binding is the one the caller validated against, not a fresh one.
  assert.ok(reminder.includes(`"_nonce": "${nonce}"`));
  // Escaping guidance for large bodies — the failure the reminder exists for.
  assert.ok(reminder.includes('escape every double quote as \\" and every newline as \\n'));
  // Declared tags are listed so an invented tag is not the obvious choice.
  assert.ok(reminder.includes("<bash> <read_file>"));
  // The no-tool escape hatch must survive, or the model calls a tool regardless.
  assert.ok(reminder.includes("If no tool call is needed"));
});

test("buildCfToolReminder stays bounded however many tools are declared", () => {
  const many = Array.from({ length: 400 }, (_, i) => ({
    type: "function" as const,
    function: { name: `tool_${i}`, parameters: { type: "object" } },
  }));
  const reminder = buildCfToolReminder(many);
  assert.ok(reminder.length < 1000, `reminder was ${reminder.length} chars`);
  assert.ok(reminder.includes("(+394 more)"));
});

test("buildCfToolConversationPrompt restates the contract near the end on a long conversation", () => {
  // 12 user turns + replies + latest question: well past the reminder threshold.
  const messages = Array.from({ length: 12 }, (_, i) => [
    { role: "user" as const, content: `turn ${i}` },
    { role: "assistant" as const, content: `reply ${i}` },
  ]).flat();
  messages.push({ role: "user" as const, content: "latest question" });

  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  const reminderIndexes = result
    .map((message, i) =>
      ((message.content as string) ?? "").includes("# Tool Call Reminder") ? i : -1
    )
    .filter((i) => i >= 0);

  assert.equal(reminderIndexes.length, 1);
  // Author's-note position: inside the recency window but not the last message,
  // so the caller's own turn is still what the model answers.
  assert.equal(reminderIndexes[0], result.length - 2);
  assert.equal(result[result.length - 1].content, "latest question");
  // The full contract still travels at the top.
  assert.ok((result[0].content as string).includes("# Tool Calling Instructions"));
  assert.ok(!(result[0].content as string).includes("# Tool Call Reminder"));
});

test("buildCfToolConversationPrompt omits the reminder on a short conversation", () => {
  const messages = [
    { role: "user" as const, content: "run it" },
    { role: "assistant" as const, content: "ok" },
    { role: "user" as const, content: "now this" },
  ];
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  assert.ok(!result.some((m) => ((m.content as string) ?? "").includes("# Tool Call Reminder")));
  // Contract + the untouched conversation, with no slot spent on a reminder.
  assert.equal(result.length, messages.length + 1);
  assert.ok((result[0].content as string).includes("# Tool Calling Instructions"));
});

test("buildCfToolConversationPrompt still honours the 10-message cap with a reminder", () => {
  const messages = Array.from({ length: 20 }, (_, i) => ({
    role: "user" as const,
    content: `turn ${i}`,
  }));
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  assert.equal(userishCount(result), CF_MAX_CONVERSATION_MESSAGES);
  assert.equal(result[result.length - 1].content, "turn 19");
  assert.ok(result.some((m) => ((m.content as string) ?? "").includes("# Tool Call Reminder")));
});

test("buildCfToolConversationPrompt never lands the reminder between a tool call and its results", () => {
  // Long enough to want a reminder, and the tail is a run of tool results.
  const messages = [
    ...Array.from({ length: 6 }, (_, i) => ({ role: "user" as const, content: `turn ${i}` })),
    { role: "user" as const, content: "run the checks" },
    { role: "assistant" as const, content: '<bash>{"command": "ls"}</bash>' },
    { role: "tool" as const, content: "result one" },
    { role: "tool" as const, content: "result two" },
  ];
  const result = buildCfToolConversationPrompt(messages, TEST_TOOLS_OPENAI);
  const reminderIndex = result.findIndex((message) =>
    ((message.content as string) ?? "").includes("# Tool Call Reminder")
  );

  assert.ok(reminderIndex > 0);
  // Depth 1 pointed at a tool result, so the reminder moved past the whole run.
  assert.equal(reminderIndex, result.length - 1);
  assert.equal(result[result.length - 2].content, "result two");
});

test("buildCfToolConversationPrompt keeps every reminder message under the char cap", () => {
  const reminder = buildCfToolReminder(TEST_TOOLS_OPENAI);
  const result = buildCfToolConversationPrompt(
    Array.from({ length: 12 }, (_, i) => ({ role: "user" as const, content: `turn ${i}` })),
    TEST_TOOLS_OPENAI
  );
  for (const message of result) {
    const content =
      typeof message.content === "string" ? message.content : JSON.stringify(message.content);
    if (content.includes("# Tool Call Reminder")) {
      assert.ok(
        content.length <= CF_MAX_MESSAGE_CHARS,
        `${content.length} > ${CF_MAX_MESSAGE_CHARS}`
      );
    }
  }
  assert.ok(reminder.length <= CF_MAX_MESSAGE_CHARS);
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

// ── finalizeCfToolCalls: nonce binding + argument schema ──────────────────────

test("finalizeCfToolCalls accepts a call with a missing _nonce", () => {
  // Shapes with no JSON body (XML argument tags) cannot carry one.
  const calls = [{ id: "call_1", name: "bash", arguments: '{"command": "ls"}' }];
  assert.deepEqual(finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123"), calls);
});

test("finalizeCfToolCalls keeps the model's argument bytes when nothing changes", () => {
  // A repair pass that re-serialized every payload would silently rewrite the
  // spacing the model chose, so byte-for-byte fidelity is asserted here.
  const calls = [{ id: "call_1", name: "bash", arguments: '{ "command" : "ls -la" }' }];
  const out = finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123");
  assert.equal(out?.[0].arguments, '{ "command" : "ls -la" }');
});

test("finalizeCfToolCalls strips a matching _nonce", () => {
  const calls = [
    { id: "call_1", name: "bash", arguments: '{"command": "ls", "_nonce": "abc123"}' },
  ];
  const out = finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123");
  assert.equal(out?.length, 1);
  assert.equal(out?.[0].arguments, '{"command":"ls"}');
});

test("finalizeCfToolCalls rejects a call bound to another request's nonce", () => {
  // This is the replay case: a call echoed from an earlier turn (or injected by
  // something other than the model) carries a nonce the client never granted.
  const calls = [
    { id: "call_1", name: "bash", arguments: '{"command": "rm -rf /", "_nonce": "stale"}' },
  ];
  assert.equal(finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123"), null);
});

test("finalizeCfToolCalls rejects arguments that violate the declared schema", () => {
  const calls = [{ id: "call_1", name: "bash", arguments: '{"cmd": "ls"}' }];
  assert.equal(finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123"), null);
});

test("finalizeCfToolCalls rejects an undeclared tool name", () => {
  const calls = [{ id: "call_1", name: "nope", arguments: '{"command": "ls"}' }];
  assert.equal(finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123"), null);
});

test("finalizeCfToolCalls resolves an alias onto the declared tool", () => {
  // Models emit `read` for a tool declared as `read_file`; the shared matcher
  // maps it rather than throwing the call away.
  const calls = [{ id: "call_1", name: "read", arguments: '{"path": "a.py"}' }];
  const out = finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123");
  assert.equal(out?.[0].name, "read_file");
  assert.equal(out?.[0].arguments, '{"path": "a.py"}');
});

test("finalizeCfToolCalls binds an envelope-shaped call's nonce", () => {
  // `{"name","arguments"}` is self-contained, so a replayed one looks exactly
  // like a fresh one. Its `_nonce` has to survive unwrapping to be checked.
  const calls = parseCfToolCalls(
    '<tool>{"name": "bash", "arguments": {"command": "ls"}, "_nonce": "stale"}</tool>',
    TEST_TOOLS
  );
  assert.equal(calls.length, 1);
  assert.equal(finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123"), null);
});

test("finalizeCfToolCalls returns null for an empty turn", () => {
  assert.equal(finalizeCfToolCalls([], TEST_TOOLS_OPENAI, "abc123"), null);
});

test("finalizeCfToolCalls rejects rather than executing an unparseable payload", () => {
  const calls = [{ id: "call_1", name: "bash", arguments: "not json" }];
  assert.equal(finalizeCfToolCalls(calls, TEST_TOOLS_OPENAI, "abc123"), null);
});

// ── hasMalformedCfToolIntent: declared-tool tags ──────────────────────────────

test("hasMalformedCfToolIntent sees an unclosed declared-tool block", () => {
  // The five-call XML turn was lost because this returned false for tags other
  // than <tool>/<shell>, so the repair retry never fired.
  assert.equal(hasMalformedCfToolIntent("<read><path>a.py", ["read"]), true);
  assert.equal(hasMalformedCfToolIntent("<read><path>a.py</readd>", ["read"]), true);
});

test("hasMalformedCfToolIntent ignores a well-formed declared-tool block", () => {
  assert.equal(hasMalformedCfToolIntent("<read><path>a.py</path></read>", ["read"]), false);
  assert.equal(hasMalformedCfToolIntent('<read>{"path": "a.py"}</read>', ["read"]), false);
});

test("hasMalformedCfToolIntent ignores a bare mention of a tool tag", () => {
  // Prose that names the tag must not trigger a repair retry — that would
  // replace a perfectly good answer with a second one.
  assert.equal(hasMalformedCfToolIntent("Wrap the payload in <read> tags.", ["read"]), false);
  assert.equal(hasMalformedCfToolIntent("Wrap the payload in <tool> tags.", ["read"]), false);
});
