import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");
const { capGrokBuildTools } = await import("@omniroute/open-sse/executors/grokCliToolCap");

// xAI's cli-chat-proxy rejects more than 200 tools. A blind `slice(0, 200)` drops whatever
// sits at the end of the list: the hosted `web_search` / `x_search` tools Codex appends after
// its (flattened MCP) functions, and the function a `tool_choice` forces — which then makes
// Grok Build reject the turn because the chosen tool no longer exists.

type Tool = Record<string, unknown>;

function functionTools(count: number): Tool[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "function",
    name: `tool_${i}`,
    parameters: { type: "object", properties: {} },
  }));
}

function transform(body: Record<string, unknown>) {
  const executor = new GrokCliExecutor();
  return executor.transformRequest("grok-4.6", body, true, {} as never) as Record<string, unknown>;
}

function names(tools: unknown): unknown[] {
  return (tools as Tool[]).map((tool) => tool.name ?? tool.type);
}

test("grok-cli transformRequest keeps a trailing web_search tool when capping at 200", () => {
  const tools = [...functionTools(205), { type: "web_search" }];

  const out = transform({ input: "hi", tools });

  assert.equal((out.tools as Tool[]).length, 200);
  assert.deepEqual((out.tools as Tool[]).at(-1), { type: "web_search" });
  // Functions keep their order and fill the remaining 199 slots.
  assert.deepEqual(names(out.tools).slice(0, 199), names(tools.slice(0, 199)));
});

test("grok-cli transformRequest keeps the tool_choice function when capping at 200", () => {
  const tools = functionTools(205);

  const out = transform({
    input: "hi",
    tools,
    tool_choice: { type: "function", name: "tool_204" },
  });

  assert.equal((out.tools as Tool[]).length, 200);
  assert.ok(names(out.tools).includes("tool_204"));
  assert.deepEqual(out.tool_choice, { type: "function", name: "tool_204" });
  // The preferred function takes the last function slot; the rest keep their order.
  assert.deepEqual(names(out.tools).slice(0, 199), names(tools.slice(0, 199)));
});

test("grok-cli transformRequest keeps hosted tools and the forced function together", () => {
  const tools = [...functionTools(202), { type: "web_search" }, { type: "x_search" }];

  const out = transform({
    input: "hi",
    tools,
    tool_choice: { type: "function", function: { name: "tool_201" } },
  });

  const kept = names(out.tools);
  assert.equal(kept.length, 200);
  assert.ok(kept.includes("tool_201"));
  assert.deepEqual(kept.slice(-2), ["web_search", "x_search"]);
  assert.equal(kept[197], "tool_201");
  assert.ok(!kept.includes("tool_197"));
});

test("capGrokBuildTools resolves Chat Completions function names for tool_choice", () => {
  const tools = Array.from({ length: 5 }, (_, i) => ({
    type: "function",
    function: { name: `fn_${i}` },
  }));

  const out = capGrokBuildTools(tools, { type: "function", function: { name: "fn_4" } }, 3);

  assert.deepEqual(out, [tools[0], tools[1], tools[4]]);
});

test("capGrokBuildTools returns the same array when the list fits the cap", () => {
  const tools = [...functionTools(199), { type: "web_search" }];

  assert.equal(capGrokBuildTools(tools, { type: "function", name: "tool_0" }, 200), tools);
  assert.equal(capGrokBuildTools(tools, undefined, 200), tools);
});

test("capGrokBuildTools ignores string and unknown tool_choice values", () => {
  const tools = functionTools(5);

  assert.deepEqual(capGrokBuildTools(tools, "required", 3), tools.slice(0, 3));
  assert.deepEqual(
    capGrokBuildTools(tools, { type: "function", name: "missing" }, 3),
    tools.slice(0, 3)
  );
});

test("capGrokBuildTools never returns more than the cap when hosted tools alone exceed it", () => {
  const tools = [{ type: "web_search" }, { type: "x_search" }, ...functionTools(3)];

  assert.deepEqual(capGrokBuildTools(tools, undefined, 1), [{ type: "web_search" }]);
});
