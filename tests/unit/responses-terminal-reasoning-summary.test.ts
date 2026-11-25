import assert from "node:assert/strict";
import test from "node:test";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { initState, translateResponse } from "@omniroute/open-sse/translator/index.ts";
import { NON_ANTHROPIC_THINKING_PLACEHOLDER } from "@omniroute/open-sse/utils/reasoningPlaceholder.ts";
import { resetDbInstance } from "@/lib/db/core.ts";

test.after(() => resetDbInstance());

const summaryText = "The constraints agree.";
const answer = "The answer is 42.";
const secondSummary = "The second summary is terminal-only.";
const reasoningItem = {
  id: "rs_fixture",
  type: "reasoning",
  summary: [{ type: "summary_text", text: summaryText }],
};
const emptyReasoningItem = { ...reasoningItem, summary: [] };

type Scenario =
  | "completed-only"
  | "streamed"
  | "item-done"
  | "encrypted-only"
  | "mixed-rotated-id"
  | "mixed-index-only";

function translateFixture(scenario: Scenario) {
  const state = initState(FORMATS.OPENAI);
  const completedReasoning =
    scenario === "encrypted-only"
      ? { ...emptyReasoningItem, encrypted_content: "opaque-fixture-state" }
      : reasoningItem;
  const items: Record<string, unknown>[] = [
    {
      type: "response.created",
      response: { id: "resp_fixture", model: "gpt-6.2-sol" },
    },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: emptyReasoningItem,
    },
  ];

  const mixed = scenario === "mixed-rotated-id" || scenario === "mixed-index-only";
  const terminalReasoning = mixed
    ? [
        { ...completedReasoning, id: "rs_rotated" },
        {
          ...reasoningItem,
          id: "rs_second",
          summary: [{ type: "summary_text", text: secondSummary }],
        },
      ]
    : [completedReasoning];
  const messageIndex = terminalReasoning.length;
  if (scenario === "streamed" || mixed) {
    items.push({
      type: "response.reasoning_summary_text.delta",
      item_id: scenario === "mixed-index-only" ? undefined : reasoningItem.id,
      output_index: 0,
      summary_index: 0,
      delta: summaryText,
    });
  }

  items.push(
    {
      type: "response.output_item.done",
      output_index: 0,
      item: scenario === "item-done" ? reasoningItem : emptyReasoningItem,
    },
    {
      type: "response.output_text.delta",
      output_index: messageIndex,
      item_id: "msg_fixture",
      content_index: 0,
      delta: answer,
    },
    {
      type: "response.completed",
      response: {
        id: "resp_fixture",
        status: "completed",
        output: [
          ...terminalReasoning,
          {
            id: "msg_fixture",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: answer }],
          },
        ],
        usage: {
          input_tokens: 10,
          output_tokens: 11,
          output_tokens_details: { reasoning_tokens: 6 },
        },
      },
    }
  );

  const chunks = items.flatMap((event) =>
    translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, event, state)
  );
  const choices = chunks.flatMap((chunk) => chunk.choices ?? []);
  assert.equal(chunks.at(-1)?.usage?.completion_tokens_details?.reasoning_tokens, 6);
  assert.equal(choices.map((choice) => choice.delta?.content ?? "").join(""), answer);
  assert.deepEqual(
    choices.filter((choice) => choice.finish_reason != null).map((choice) => choice.finish_reason),
    ["stop"]
  );
  assert.equal(choices.at(-1)?.finish_reason, "stop");
  return choices.flatMap((choice) =>
    typeof choice.delta?.reasoning_content === "string" ? [choice.delta.reasoning_content] : []
  );
}

test("recovers a readable reasoning summary that first appears in response.completed", () => {
  assert.deepEqual(translateFixture("completed-only"), [summaryText]);
});

test("does not repeat a reasoning summary already sent as a delta", () => {
  assert.deepEqual(translateFixture("streamed"), [summaryText]);
});

test("does not repeat a reasoning summary already recovered from output_item.done", () => {
  assert.deepEqual(translateFixture("item-done"), [summaryText]);
});

test("does not invent a reasoning summary for encrypted-only state with reasoning token usage", () => {
  assert.deepEqual(translateFixture("encrypted-only"), []);
});

test("recovers an unseen item while deduplicating a streamed summary with a rotated ID", () => {
  assert.deepEqual(translateFixture("mixed-rotated-id"), [summaryText, secondSummary]);
});

test("recovers an unseen item when the streamed summary was identified only by output index", () => {
  assert.deepEqual(translateFixture("mixed-index-only"), [summaryText, secondSummary]);
});

function summaryItem(id: string | undefined, ...parts: string[]) {
  return { type: "reasoning", id, summary: parts.map((text) => ({ type: "summary_text", text })) };
}

function reasoningDone(item: ReturnType<typeof summaryItem>, outputIndex?: number) {
  return { type: "response.output_item.done", item, output_index: outputIndex };
}

function reasoningDelta(text: string, itemId?: string, outputIndex?: number) {
  return {
    type: "response.reasoning_summary_text.delta",
    delta: text,
    item_id: itemId,
    output_index: outputIndex,
    summary_index: 0,
  };
}

function completed(...output: unknown[]) {
  return { type: "response.completed", response: { status: "completed", output } };
}

function translateReasoning(events: unknown[]) {
  const state = initState(FORMATS.OPENAI);
  return events
    .flatMap((event) => translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, event, state))
    .flatMap((chunk) => chunk.choices ?? [])
    .flatMap((choice) => choice.delta?.reasoning_content ?? []);
}

test("separate unidentified done items survive and reconcile once with the terminal snapshot", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDone(summaryItem(undefined, summaryText)),
      reasoningDone(summaryItem(undefined, secondSummary)),
      completed(summaryItem("rs_a", summaryText), summaryItem("rs_b", secondSummary)),
    ]),
    [summaryText, secondSummary]
  );
});

test("an unidentified done item does not hide a distinct identified done item", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDone(summaryItem(undefined, summaryText)),
      reasoningDone(summaryItem("rs_b", secondSummary), 1),
    ]),
    [summaryText, secondSummary]
  );
});

test("fragmented anonymous runs on either side of a named delta match their own terminal items", () => {
  const firstFragment = summaryText.slice(0, 2);
  const secondFragment = summaryText.slice(2);
  const thirdSummary = "A third streamed summary.";
  const fourthSummary = "A fourth summary first appears at completion.";
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(firstFragment),
      reasoningDelta(secondFragment),
      reasoningDelta(secondSummary, "rs_b", 1),
      reasoningDelta(thirdSummary),
      completed(
        summaryItem("rs_a", summaryText),
        summaryItem("rs_b", secondSummary),
        summaryItem("rs_c", thirdSummary),
        summaryItem("rs_d", fourthSummary)
      ),
    ]),
    [firstFragment, secondFragment, secondSummary, thirdSummary, fourthSummary]
  );
});

test("successive terminal items consume their own prefixes of one anonymous run", () => {
  const partial = secondSummary.slice(0, 8);
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(summaryText.slice(0, 2)),
      reasoningDelta(summaryText.slice(2) + partial),
      completed(
        summaryItem("rs_a", summaryText),
        summaryItem("rs_b", secondSummary),
        summaryItem("rs_c", "A new terminal summary.")
      ),
    ]),
    [summaryText.slice(0, 2), summaryText.slice(2) + partial, "A new terminal summary."]
  );
});

test("an ID match learns the output index before the terminal item rotates its ID", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(summaryText, "rs_a"),
      reasoningDone(summaryItem("rs_a", summaryText), 0),
      completed(summaryItem("rs_rotated", summaryText), summaryItem("rs_b", secondSummary)),
    ]),
    [summaryText, secondSummary]
  );
});

test("an output-index match learns the ID before an index-less snapshot", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(summaryText, undefined, 0),
      reasoningDone(summaryItem("rs_a", summaryText), 0),
      reasoningDone(summaryItem("rs_a", summaryText)),
      completed(summaryItem("rs_a", summaryText), summaryItem("rs_b", secondSummary)),
    ]),
    [summaryText, secondSummary]
  );
});

test("identical text on distinct known items is emitted once per item", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(summaryText, "rs_a", 0),
      completed(summaryItem("rs_a", summaryText), summaryItem("rs_b", summaryText)),
    ]),
    [summaryText, summaryText]
  );
});

test("an anonymous done snapshot suppresses only one matching terminal item", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDone(summaryItem(undefined, summaryText)),
      completed(summaryItem("rs_a", summaryText), summaryItem("rs_b", summaryText)),
    ]),
    [summaryText, summaryText]
  );
});

test("an unidentified partial delta is not replayed at either snapshot boundary", () => {
  const partial = summaryText.slice(0, 7);
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(partial),
      reasoningDone(summaryItem(undefined, summaryText)),
      completed(summaryItem("rs_a", summaryText), summaryItem("rs_b", secondSummary)),
    ]),
    [partial, secondSummary]
  );
});

test("placeholder parts are removed before the terminal summary is joined", () => {
  assert.deepEqual(
    translateReasoning([
      completed(
        summaryItem("rs_a", summaryText, NON_ANTHROPIC_THINKING_PLACEHOLDER, secondSummary)
      ),
    ]),
    [`${summaryText}\n\n${secondSummary}`]
  );
});

test("a filtered placeholder delta does not hide a real terminal summary", () => {
  assert.deepEqual(
    translateReasoning([
      reasoningDelta(NON_ANTHROPIC_THINKING_PLACEHOLDER, "rs_a", 0),
      completed(summaryItem("rs_a", summaryText)),
    ]),
    [summaryText]
  );
});

test("a terminal item with multiple placeholder-only parts is invisible", () => {
  assert.deepEqual(
    translateReasoning([
      completed(
        summaryItem("rs_a", NON_ANTHROPIC_THINKING_PLACEHOLDER, NON_ANTHROPIC_THINKING_PLACEHOLDER)
      ),
    ]),
    []
  );
});

for (const tool of [
  {
    name: "weather",
    deferredName: false,
    fragments: ['{"city":', '"Paris"}'],
    expectedInput: { city: "Paris" },
  },
  {
    name: "Read",
    deferredName: true,
    fragments: ['{"file_path":"notes.txt",', '"limit":3000}'],
    expectedInput: { file_path: "notes.txt", filePath: "notes.txt", limit: 2000 },
  },
]) {
  test(`Claude closes the ${tool.name} tool before emitting the late terminal summary`, () => {
    const state = { ...initState(FORMATS.CLAUDE), requestedThinking: true };
    const toolItem = {
      type: "function_call",
      id: "fc_fixture",
      call_id: "call_fixture",
      name: tool.name,
      arguments: tool.fragments.join(""),
    };
    const events = [
      { type: "response.created", response: { id: "resp_fixture", model: "test-model" } },
      reasoningDone(summaryItem("rs_fixture"), 0),
      {
        type: "response.output_item.added",
        output_index: 1,
        item: { ...toolItem, arguments: "", name: tool.deferredName ? "" : tool.name },
      },
      ...tool.fragments.map((delta) => ({
        type: "response.function_call_arguments.delta",
        output_index: 1,
        item_id: toolItem.id,
        delta,
      })),
      { type: "response.output_item.done", output_index: 1, item: toolItem },
      completed(summaryItem("rs_fixture", summaryText), toolItem),
      null,
    ].flatMap((event) => translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, event, state));

    const blocks = events.filter((event) => event.type.startsWith("content_block_"));
    // A consumer must be able to dispatch each block at its stop before another starts.
    assert.deepEqual(
      blocks.map((event) => [event.type, event.index]),
      [
        ["content_block_start", 0],
        ["content_block_delta", 0],
        ["content_block_stop", 0],
        ["content_block_start", 1],
        ["content_block_delta", 1],
        ["content_block_stop", 1],
      ]
    );
    assert.equal(blocks[0].content_block.type, "tool_use");
    assert.equal(blocks[0].content_block.id, toolItem.call_id);
    assert.equal(blocks[0].content_block.name, tool.name);
    assert.equal(blocks[1].delta.type, "input_json_delta");
    assert.deepEqual(JSON.parse(blocks[1].delta.partial_json), tool.expectedInput);
    assert.equal(blocks[3].content_block.type, "thinking");
    assert.deepEqual(blocks[4].delta, { type: "thinking_delta", thinking: summaryText });
    assert.equal(events.at(-2)?.delta?.stop_reason, "tool_use");
    assert.equal(events.at(-1)?.type, "message_stop");
  });
}
