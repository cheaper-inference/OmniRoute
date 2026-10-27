// #17890 — the Responses default `functions` namespace must keep bare leaf names on the
// Chat wire (`exec`, `wait`); other namespaces stay prefixed (#8295).
import test from "node:test";
import assert from "node:assert/strict";

await import("../../open-sse/translator/bootstrap.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");

const params = { type: "object", properties: {} };
const CODEX_BODY = {
  model: "gpt-6-luna",
  instructions: "coding agent",
  input: [
    {
      type: "additional_tools",
      role: "developer",
      tools: [
        {
          type: "namespace",
          name: "functions",
          tools: [
            { type: "custom", name: "exec", description: "shell", parameters: params },
            { type: "function", name: "wait", description: "wait", parameters: params },
          ],
        },
        {
          type: "namespace",
          name: "mcp__cua_repl",
          tools: [
            { type: "function", name: "js", description: "js", parameters: params },
            { type: "function", name: "js_reset", description: "reset", parameters: params },
          ],
        },
      ],
    },
    { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
    {
      type: "function_call",
      call_id: "call_1",
      namespace: "functions",
      name: "wait",
      arguments: "{}",
    },
    { type: "function_call_output", call_id: "call_1", output: "ok" },
  ],
};

type ChatTool = { function: { name: string } };
type ChatOut = {
  tools: ChatTool[];
  messages: Array<{ tool_calls?: ChatTool[] }>;
  _namespaceToolIdentityMap: Map<string, { namespace: string; name: string }>;
};

function toChat(body: Record<string, unknown>): ChatOut {
  return translateRequest(
    "openai-responses",
    "openai",
    "gpt-6-luna",
    structuredClone(body),
    true,
    null,
    null,
    null
  ) as unknown as ChatOut;
}

test("#17890: functions namespace keeps bare leaf names; other namespaces stay prefixed", () => {
  const out = toChat(CODEX_BODY);
  const names = out.tools.map((t) => t.function.name);
  assert.deepEqual(names, ["exec", "wait", "mcp__cua_repl__js", "mcp__cua_repl__js_reset"]);
});

test("#17890: replayed history call in `functions` uses the bare name", () => {
  const out = toChat(CODEX_BODY);
  const call = out.messages.flatMap((m) => m.tool_calls ?? [])[0];
  assert.equal(call.function.name, "wait");
});

test("#17890: identity map restores {functions, exec} for the bare name", () => {
  const out = toChat(CODEX_BODY);
  const map = out._namespaceToolIdentityMap;
  assert.deepEqual(map.get("exec"), { namespace: "functions", name: "exec" });
});

test("#17890: flat `exec` + functions.exec collision never yields duplicate Chat names", () => {
  const body: Record<string, unknown> = structuredClone(CODEX_BODY);
  body.tools = [{ type: "function", name: "exec", description: "flat", parameters: params }];
  const out = toChat(body);
  const names = out.tools.map((t) => t.function.name);
  assert.equal(new Set(names).size, names.length, `duplicate names: ${names.join(",")}`);
});
