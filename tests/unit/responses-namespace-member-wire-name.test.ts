import { test } from "node:test";
import assert from "node:assert/strict";
import { openaiResponsesToOpenAIRequest } from "../../open-sse/translator/request/openai-responses.ts";

// A namespace member is dropped in favour of an explicit flat tool only when both would carry the
// same Chat wire name. The Chat conversion qualifies a member as `<namespace>__<leaf>`, so a flat
// `search` and `mcp__github.search` are two different tools. The default `functions` namespace keeps
// bare leaf names (#17890), so a flat `exec` and `functions.exec` stay one tool (pinned by
// responses-tool-call-lifecycle-16106 and responses-default-functions-namespace-17890).
const params = { type: "object", properties: {} };
const flat = (name: string) => ({ type: "function", name, parameters: params });
const ns = (name: string, members: string[]) => ({
  type: "namespace",
  name,
  tools: members.map((member) => ({ type: "function", name: member, parameters: params })),
});

function chatNames(body: Record<string, unknown>): string[] {
  const out = openaiResponsesToOpenAIRequest("gpt-5", body, false, null) as {
    tools?: Array<{ function: { name: string } }>;
  };
  return (out.tools ?? []).map((tool) => tool.function.name);
}

test("a flat tool and a namespace member with the same leaf both reach Chat", () => {
  const names = chatNames({ input: "x", tools: [flat("search"), ns("mcp__github", ["search"])] });
  assert.deepEqual(names.sort(), ["mcp__github__search", "search"]);
});

test("the same holds when the flat tool comes from additional_tools", () => {
  const names = chatNames({
    input: [
      { type: "additional_tools", tools: [flat("search")] },
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
    ],
    tools: [ns("mcp__github", ["search"])],
  });
  assert.deepEqual(names.sort(), ["mcp__github__search", "search"]);
});

test("a flat tool named like the member's wire name still wins, with no duplicate", () => {
  const names = chatNames({
    input: "x",
    tools: [flat("mcp__github__search"), ns("mcp__github", ["search"])],
  });
  assert.deepEqual(names, ["mcp__github__search"]);
});

test("the default functions namespace still yields to a flat tool of the same name", () => {
  const names = chatNames({ input: "x", tools: [flat("exec"), ns("functions", ["exec"])] });
  assert.deepEqual(names, ["exec"]);
});
