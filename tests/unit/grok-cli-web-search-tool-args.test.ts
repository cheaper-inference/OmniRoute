import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// Codex CLI declares its native search as `{ type: "web_search", external_web_access: false }`.
// With search interception off, that tool reaches Grok Build verbatim and the whole turn fails
// with `400 Argument not supported: external_web_access` (`search_context_size` fails the same
// way). transformRequest() must drop those OpenAI-only arguments and keep the tool, so Grok
// still runs its own web search. `user_location`, `filters` and `allowed_domains` are accepted.

function transform(body: Record<string, unknown>) {
  const executor = new GrokCliExecutor();
  return executor.transformRequest("grok-4.6", body, true, {} as never) as Record<string, unknown>;
}

test("grok-cli transformRequest drops external_web_access from the native web_search tool", () => {
  const body = {
    input: [{ role: "user", content: [{ type: "input_text", text: "news?" }] }],
    tools: [
      { type: "web_search", external_web_access: false },
      { type: "function", name: "shell", parameters: { type: "object", properties: {} } },
    ],
  };

  const out = transform(body);

  assert.deepEqual(out.tools, [
    { type: "web_search" },
    { type: "function", name: "shell", parameters: { type: "object", properties: {} } },
  ]);
  // The caller's body is not mutated.
  assert.deepEqual(body.tools[0], { type: "web_search", external_web_access: false });
});

test("grok-cli transformRequest drops search_context_size and keeps arguments Grok accepts", () => {
  const tool = {
    type: "web_search",
    external_web_access: true,
    search_context_size: "low",
    filters: { allowed_domains: ["x.ai"] },
    user_location: { type: "approximate", country: "VN" },
  };

  const out = transform({ input: "hi", tools: [tool] });

  assert.deepEqual(out.tools, [
    {
      type: "web_search",
      filters: { allowed_domains: ["x.ai"] },
      user_location: { type: "approximate", country: "VN" },
    },
  ]);
});

test("grok-cli transformRequest leaves tools without web_search untouched", () => {
  const tools = [{ type: "function", name: "shell", parameters: { type: "object" } }];

  const out = transform({ input: "hi", tools });

  assert.deepEqual(out.tools, tools);
});

// A translated Anthropic forced server search becomes { type: "web_search" }.
// Grok Build rejects that object as ModelToolChoice, but accepts "required".
test("grok-cli requires the native search when it is the only available tool", () => {
  const body = {
    input: "Search Python history",
    tools: [{ type: "web_search" }],
    tool_choice: { type: "web_search" },
    reasoning: { effort: "medium" },
  };
  const out = transform(body);
  assert.equal(out.tool_choice, "required");
  assert.deepEqual(out.tools, body.tools);
  assert.equal((out.reasoning as Record<string, unknown>).effort, "medium");
  assert.deepEqual(body.tool_choice, { type: "web_search" });
});

test("grok-cli does not broaden a forced search to unrelated tools", () => {
  const choice = { type: "web_search" };
  for (const tools of [
    undefined,
    [],
    [{ type: "function", name: "shell", parameters: { type: "object" } }],
    [{ type: "web_search" }, { type: "function", name: "shell", parameters: { type: "object" } }],
  ]) {
    assert.deepEqual(transform({ input: "hi", tools, tool_choice: choice }).tool_choice, choice);
  }
});

test("grok-cli preserves automatic, disabled and explicit function choices", () => {
  for (const choice of [
    undefined,
    "auto",
    "none",
    "required",
    { type: "function", name: "web_search" },
  ]) {
    assert.deepEqual(
      transform({ input: "hi", tools: [{ type: "web_search" }], tool_choice: choice }).tool_choice,
      choice
    );
  }
});
