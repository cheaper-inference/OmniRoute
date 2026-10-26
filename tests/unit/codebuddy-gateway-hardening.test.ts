import assert from "node:assert/strict";
import test from "node:test";

import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";
import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";

type Message = Record<string, unknown>;
type RequestBody = {
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  max_completion_tokens?: number;
  tools?: Array<Record<string, unknown>>;
  tool_choice?: unknown;
  messages?: Message[];
  [key: string]: unknown;
};

const EXECUTORS = [
  { id: "codebuddy-cn", exec: new CodeBuddyCnExecutor() },
  { id: "codebuddy-intl", exec: new CodeBuddyIntlExecutor() },
];

test("codebuddy executors normalize tool schemas and invalid tool names (fixes Tencent 11133)", () => {
  for (const { id, exec } of EXECUTORS) {
    const input: RequestBody = {
      model: "glm-5.2",
      tools: [
        {
          type: "function",
          function: {
            name: "mcp:file.read",
            parameters: {
              type: "object",
              pattern: "prefix\\0suffix",
              items: [{ type: "string" }, { type: "integer" }],
              required: ["path", 123],
              enum: ["alpha", "beta"],
              properties: {
                timeout: {
                  type: ["integer", "null"],
                },
              },
            },
          },
        },
      ],
      messages: [
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "mcp:file.read", arguments: '{"path":"/tmp/a"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          name: "mcp:file.read",
          content: "file content",
        },
      ],
    };

    const transformed = exec.transformRequest("glm-5.2", input, false, {}) as RequestBody;

    // 1. Tool name sanitized to valid identifier
    const toolFn = (transformed.tools?.[0] as Record<string, unknown>).function as Record<
      string,
      unknown
    >;
    assert.equal(toolFn.name, "mcp_file_read", `${id}: tool name should be sanitized`);

    // 2. Correlated across assistant tool_calls and tool messages
    const msgs = transformed.messages!;
    const assistantMsg = msgs.find((m) => m.role === "assistant" && Array.isArray(m.tool_calls));
    assert.ok(assistantMsg, `${id}: assistant message with tool_calls must exist`);
    assert.equal(
      (
        (assistantMsg.tool_calls as Array<Record<string, unknown>>)[0].function as Record<
          string,
          unknown
        >
      ).name,
      "mcp_file_read"
    );

    const toolMsg = msgs.find((m) => m.role === "tool");
    assert.ok(toolMsg, `${id}: tool message must exist`);
    assert.equal(toolMsg.name, "mcp_file_read");

    // 3. Side-channel _toolNameMap preserved for response recovery
    const nameMap = (transformed as Record<string, unknown>)._toolNameMap as Map<string, string>;
    assert.ok(nameMap instanceof Map, `${id}: _toolNameMap should be attached`);
    assert.equal(nameMap.get("mcp_file_read"), "mcp:file.read");

    // 4. Schema fixes: null-byte pattern, tuple items, non-string required
    const params = toolFn.parameters as Record<string, unknown>;
    assert.equal(params.pattern, "prefix\\u0000suffix");
    assert.deepEqual(params.items, {
      anyOf: [{ type: "string" }, { type: "integer" }],
    });
    assert.deepEqual(params.required, ["path"]);
  }
});

test("codebuddy executors align turns to prevent Tencent 11153 errors after tool calls", () => {
  for (const { id, exec } of EXECUTORS) {
    const input: RequestBody = {
      model: "glm-5.2",
      messages: [
        { role: "user", content: "list dir" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "c1",
              type: "function",
              function: { name: "list", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "c1", content: "file1.txt" },
        { role: "user", content: "read file1.txt" },
      ],
    };

    const transformed = exec.transformRequest("glm-5.2", input, false, {}) as RequestBody;
    const msgs = transformed.messages!;

    // Find tool message index
    const toolIdx = msgs.findIndex((m) => m.role === "tool");
    assert.ok(toolIdx >= 0, `${id}: tool message found`);

    // Empty assistant message padded between tool result and following user turn
    assert.equal(msgs[toolIdx + 1]?.role, "assistant", `${id}: padded assistant message`);
    assert.equal(msgs[toolIdx + 1]?.content, "");
    assert.equal(msgs[toolIdx + 2]?.role, "user", `${id}: next user message follows`);
    assert.equal(msgs[toolIdx + 2]?.content, "read file1.txt");
  }
});

test("codebuddy executors normalize role developer and max_completion_tokens (fixes Tencent 11101)", () => {
  for (const { id, exec } of EXECUTORS) {
    const input: RequestBody = {
      model: "glm-5.2",
      max_completion_tokens: 4096,
      messages: [
        { role: "developer", content: "system instructions" },
        { role: "user", content: "hello" },
      ],
    };

    const transformed = exec.transformRequest("glm-5.2", input, false, {}) as RequestBody;

    assert.equal(transformed.stream, true, `${id}: forces stream: true`);
    assert.equal(
      transformed.max_completion_tokens,
      undefined,
      `${id}: removes max_completion_tokens`
    );
    assert.equal(transformed.max_tokens, 4096, `${id}: maps to max_tokens`);

    const devMsg = transformed.messages?.find((m) => m.content === "system instructions");
    assert.ok(devMsg, `${id}: instruction message exists`);
    assert.equal(devMsg.role, "system", `${id}: developer role converted to system`);
  }
});

test("codebuddy executors preserve tool_choice object format and message indices", () => {
  const cn = new CodeBuddyCnExecutor();
  const input: RequestBody = {
    model: "glm-5.2",
    tool_choice: { type: "function", function: { name: "read_file" } },
    messages: [
      { role: "user", content: "first user question" },
      { role: "assistant", content: "first assistant answer" },
    ],
  };

  const transformed = cn.transformRequest("glm-5.2", input, false, {}) as RequestBody;

  // 1. tool_choice object must NOT be collapsed to a bare string
  assert.deepEqual(transformed.tool_choice, {
    type: "function",
    function: { name: "read_file" },
  });

  // 2. cn does not inject an unprompted fake system message that shifts indices
  assert.equal(transformed.messages?.length, 2);
  assert.equal(transformed.messages?.[0].role, "user");
  assert.equal(transformed.messages?.[1].role, "assistant");
});
