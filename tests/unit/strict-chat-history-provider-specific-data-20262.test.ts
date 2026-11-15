import assert from "node:assert/strict";
import test from "node:test";
import { z } from "zod";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { validateProviderSpecificData } from "../../src/shared/validation/providerSpecificData.ts";

const TOOLS = [
  { type: "function", function: { name: "read_file", parameters: { type: "object" } } },
];

test("strictChatHistory via providerSpecificData repairs broken tool sequence on custom OpenAI nodes (#20262)", async () => {
  const executor = await getExecutor("openai");

  // A split assistant turn and out-of-order tool results:
  // assistant (commentary only), assistant (tool_calls), tool_result 2, tool_result 1
  const body = {
    model: "claude-sonnet-5-5",
    stream: true,
    tools: TOOLS,
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: "I will check the files.",
      },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "read_file", arguments: "{}" } },
          { id: "call_2", type: "function", function: { name: "read_file", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_2", content: "result 2" },
      { role: "tool", tool_call_id: "call_1", content: "result 1" },
    ],
  };

  // With strictChatHistory: false / undefined -> untouched
  const untouched = (await executor.transformRequest(
    "claude-sonnet-5-5",
    JSON.parse(JSON.stringify(body)),
    true,
    {
      apiKey: "sk-test",
      providerSpecificData: {},
    }
  )) as typeof body;

  assert.equal(
    untouched.messages.filter((m) => m.role === "assistant").length,
    2,
    "untouched assistant messages count must remain 2"
  );
  const untouchedResults = untouched.messages.filter((m) => m.role === "tool");
  assert.equal(
    untouchedResults[0].tool_call_id,
    "call_2",
    "untouched tool results remain out of order"
  );

  // With strictChatHistory: true in providerSpecificData -> repaired!
  const repaired = (await executor.transformRequest(
    "claude-sonnet-5-5",
    JSON.parse(JSON.stringify(body)),
    true,
    {
      apiKey: "sk-test",
      providerSpecificData: { strictChatHistory: true },
    }
  )) as typeof body;

  // The split assistant turns must be coalesced into 1 assistant turn containing both tool calls in call order
  const assistantTurns = repaired.messages.filter((m) => m.role === "assistant");
  assert.equal(assistantTurns.length, 1, "repaired assistant turns must be coalesced to 1");
  assert.equal(assistantTurns[0].content, "I will check the files.", "commentary is preserved");
  assert.equal(
    (assistantTurns[0] as unknown as { tool_calls: unknown[] }).tool_calls.length,
    2,
    "coalesced assistant turn must have 2 tool calls"
  );

  const toolResults = repaired.messages.filter((m) => m.role === "tool");
  assert.equal(toolResults.length, 2, "both tool results must be retained");
  assert.equal(
    toolResults[0].tool_call_id,
    "call_1",
    "first tool result must match first call in call order"
  );
  assert.equal(
    toolResults[1].tool_call_id,
    "call_2",
    "second tool result must match second call in call order"
  );
});

test("validateProviderSpecificData accepts boolean strictChatHistory and rejects invalid values (#20262)", () => {
  const schema = z.record(z.unknown()).superRefine(validateProviderSpecificData);

  const validTrue = schema.safeParse({ strictChatHistory: true });
  assert.equal(validTrue.success, true);

  const validFalse = schema.safeParse({ strictChatHistory: false });
  assert.equal(validFalse.success, true);

  const invalid = schema.safeParse({ strictChatHistory: "true" });
  assert.equal(invalid.success, false);
});
