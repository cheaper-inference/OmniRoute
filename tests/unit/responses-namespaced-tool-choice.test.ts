import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

// Codex Desktop declares grouped tools as Responses `namespace` tools. The request
// translator flattens each child onto a Chat function whose wire name folds the
// namespace in (`multi_agent_v1__spawn_agent`, #8295). A forced tool_choice that names
// the child by `{ namespace, name }` must resolve to that same wire name — forcing the
// bare leaf makes strict upstreams reject the request (unknown forced tool) or ignore it.

type ChatTool = { function: { name: string } };

function translate(body: Record<string, unknown>) {
  return openaiResponsesToOpenAIRequest(
    "openai/gpt-5.5",
    { model: "openai/gpt-5.5", input: "Spawn a helper", stream: false, ...body },
    false,
    {}
  ) as Record<string, unknown>;
}

function toolNames(result: Record<string, unknown>): string[] {
  return (result.tools as ChatTool[]).map((tool) => tool.function.name);
}

const multiAgentNamespace = {
  type: "namespace",
  name: "multi_agent_v1",
  tools: [
    {
      type: "function",
      name: "spawn_agent",
      description: "Spawn a sub-agent",
      parameters: { type: "object", properties: { task: { type: "string" } } },
    },
  ],
};

test("namespaced function tool_choice resolves to the flattened wire name", () => {
  const result = translate({
    tools: [multiAgentNamespace],
    tool_choice: { type: "function", name: "spawn_agent", namespace: "multi_agent_v1" },
  });

  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "multi_agent_v1__spawn_agent" },
  });
  assert.ok(toolNames(result).includes("multi_agent_v1__spawn_agent"));
});

test("namespaced custom tool_choice resolves to the flattened wire name", () => {
  const result = translate({
    tools: [
      {
        type: "namespace",
        name: "functions",
        tools: [{ type: "custom", name: "exec", description: "Run code" }],
      },
    ],
    tool_choice: { type: "custom", name: "exec", namespace: "functions" },
  });

  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "exec" },
  });
  assert.ok(toolNames(result).includes("exec"));
});

test("namespace already ending in `__` does not double the separator", () => {
  const result = translate({
    tools: [
      {
        type: "namespace",
        name: "mcp__server__",
        tools: [{ type: "function", name: "read", parameters: { type: "object" } }],
      },
    ],
    tool_choice: { type: "function", name: "read", namespace: "mcp__server__" },
  });

  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "mcp__server__read" },
  });
  assert.ok(toolNames(result).includes("mcp__server__read"));
});

test("tool_choice without namespace is unchanged", () => {
  const result = translate({
    tools: [{ type: "function", name: "spawn_agent", parameters: { type: "object" } }],
    tool_choice: { type: "function", name: "spawn_agent" },
  });

  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "spawn_agent" },
  });
});

test("namespaced tool_choice whose qualified name is not declared keeps the leaf", () => {
  const result = translate({
    tools: [{ type: "function", name: "spawn_agent", parameters: { type: "object" } }],
    tool_choice: { type: "function", name: "spawn_agent", namespace: "multi_agent_v1" },
  });

  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "spawn_agent" },
  });
});

test("allowed_tools entries with a namespace resolve to the flattened wire name", () => {
  const result = translate({
    tools: [
      multiAgentNamespace,
      { type: "function", name: "other_tool", parameters: { type: "object" } },
    ],
    tool_choice: {
      type: "allowed_tools",
      mode: "required",
      tools: [{ type: "function", name: "spawn_agent", namespace: "multi_agent_v1" }],
    },
  });

  assert.equal(result.tool_choice, "required");
  assert.deepEqual(toolNames(result), ["multi_agent_v1__spawn_agent"]);
});
