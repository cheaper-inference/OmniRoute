/**
 * Gemini/Antigravity Google Search grounding → Anthropic server-tool blocks.
 *
 * Claude Code's built-in WebSearch reads its results from a paired
 * `server_tool_use` (name "web_search") + `web_search_tool_result` block. Gemini
 * surfaces the same search as `candidate.groundingMetadata`, which the
 * gemini-to-claude translator used to drop entirely — Claude Code then reported
 * zero results even though the upstream answer was grounded.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { translateResponse } from "../../../open-sse/translator/index.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";

const { geminiToClaudeResponse } =
  await import("../../../open-sse/translator/response/gemini-to-claude.ts");

const GROUNDING = {
  webSearchQueries: ["weather sao paulo"],
  groundingChunks: [
    { web: { uri: "https://weather.com", title: "Weather Today" } },
    { web: { uri: "https://news.example/a", title: "Example News" } },
    // duplicate URL must be collapsed
    { web: { uri: "https://weather.com", title: "Weather Today (dup)" } },
  ],
};

function events(chunk, state = {}) {
  return translateResponse(FORMATS.ANTIGRAVITY, FORMATS.CLAUDE, chunk, state) || [];
}

function searchBlocks(result) {
  return result.filter(
    (event) =>
      event.type === "content_block_start" &&
      (event.content_block.type === "server_tool_use" ||
        event.content_block.type === "web_search_tool_result")
  );
}

/** Every content_block_start must be closed by exactly one content_block_stop at the same index. */
function assertBalancedBlocks(result) {
  const open = new Set();
  for (const event of result) {
    if (event.type === "content_block_start") {
      assert.ok(!open.has(event.index), `block ${event.index} started twice`);
      open.add(event.index);
    } else if (event.type === "content_block_stop") {
      assert.ok(open.has(event.index), `block ${event.index} stopped without a start`);
      open.delete(event.index);
    }
  }
  assert.deepEqual([...open], [], "unclosed content blocks");
}

/** Start indices must be strictly increasing, and each start must precede its stop. */
function assertIncreasingIndices(result) {
  const startIndices = result
    .filter((event) => event.type === "content_block_start")
    .map((event) => event.index);
  for (let i = 1; i < startIndices.length; i += 1) {
    assert.ok(
      startIndices[i] > startIndices[i - 1],
      `block index ${startIndices[i]} does not follow ${startIndices[i - 1]}`
    );
  }
  assertBalancedBlocks(result);
}

test("grounding: single final chunk emits server_tool_use + web_search_tool_result before message_delta", () => {
  const result = events({
    candidates: [
      {
        content: { parts: [{ text: "It is sunny in Sao Paulo." }] },
        finishReason: "STOP",
        groundingMetadata: GROUNDING,
      },
    ],
  });

  const starts = result.filter((event) => event.type === "content_block_start");
  const search = searchBlocks(result);
  assert.equal(search.length, 2, "expected exactly one server_tool_use and one result block");

  const [serverToolUse, toolResult] = search;
  assert.equal(serverToolUse.content_block.type, "server_tool_use");
  assert.equal(serverToolUse.content_block.name, "web_search");
  assert.deepEqual(serverToolUse.content_block.input, {});
  assert.match(serverToolUse.content_block.id, /^srvtoolu_/);

  // query travels in the input_json_delta of the same block
  const queryDelta = result.find(
    (event) => event.type === "content_block_delta" && event.delta.type === "input_json_delta"
  );
  assert.ok(queryDelta, "missing input_json_delta carrying the search query");
  assert.equal(queryDelta.index, serverToolUse.index);
  assert.deepEqual(JSON.parse(queryDelta.delta.partial_json), { query: "weather sao paulo" });

  assert.equal(toolResult.content_block.type, "web_search_tool_result");
  assert.equal(toolResult.content_block.tool_use_id, serverToolUse.content_block.id);
  assert.deepEqual(
    toolResult.content_block.content,
    [
      {
        type: "web_search_result",
        url: "https://weather.com",
        title: "Weather Today",
        encrypted_content: "",
        page_age: null,
      },
      {
        type: "web_search_result",
        url: "https://news.example/a",
        title: "Example News",
        encrypted_content: "",
        page_age: null,
      },
    ],
    "URLs must be deduplicated and titles defaulted"
  );

  // text block first, then the search pair, then the terminal events
  assert.equal(starts[0].content_block.type, "text");
  assertIncreasingIndices(result);
  assert.equal(result[result.length - 2].type, "message_delta");
  assert.equal(result[result.length - 1].type, "message_stop");
  assert.ok(
    result.findIndex((event) => event.type === "message_delta") > toolResult.index,
    "search blocks must precede message_delta"
  );
});

test("grounding: text streamed over several chunks then grounding on the last chunk", () => {
  const state = {};
  const first = events({ candidates: [{ content: { parts: [{ text: "It is " }] } }] }, state);
  const second = events({ candidates: [{ content: { parts: [{ text: "sunny." }] } }] }, state);
  const third = events(
    {
      candidates: [
        {
          content: { parts: [] },
          finishReason: "STOP",
          groundingMetadata: GROUNDING,
        },
      ],
    },
    state
  );

  const result = [...first, ...second, ...third];
  assertBalancedBlocks(result);
  assertIncreasingIndices(result);

  const search = searchBlocks(result);
  assert.equal(search.length, 2);
  assert.equal(
    search[0].index,
    1,
    "the still-open text block (index 0) is closed before the search pair starts"
  );
  assert.equal(result[result.length - 1].type, "message_stop");
});

test("grounding: emitted once when it arrives before the finishReason chunk", () => {
  const state = {};
  const withGrounding = events(
    {
      candidates: [{ content: { parts: [{ text: "Answer" }] }, groundingMetadata: GROUNDING }],
    },
    state
  );
  const finish = events(
    {
      candidates: [{ content: { parts: [] }, finishReason: "STOP", groundingMetadata: GROUNDING }],
    },
    state
  );

  assert.equal(
    searchBlocks(withGrounding).length,
    2,
    "search blocks emitted on the grounding chunk"
  );
  assert.equal(
    searchBlocks(finish).length,
    0,
    "grounding must not be re-emitted on the finish chunk"
  );

  const result = [...withGrounding, ...finish];
  assertBalancedBlocks(result);
  assertIncreasingIndices(result);
  assert.equal(result[result.length - 1].type, "message_stop");
});

test("grounding: Antigravity-wrapped response is unwrapped", () => {
  const result = events({
    response: {
      responseId: "resp-ag",
      modelVersion: "antigravity/gemini-3-pro",
      candidates: [
        {
          content: { parts: [{ text: "wrapped" }] },
          finishReason: "STOP",
          groundingMetadata: GROUNDING,
        },
      ],
    },
  });

  assert.equal(searchBlocks(result).length, 2);
  assertBalancedBlocks(result);
  assertIncreasingIndices(result);
});

test("grounding: snake_case grounding_metadata is read", () => {
  const result = events({
    candidates: [
      {
        content: { parts: [{ text: "snake" }] },
        finishReason: "STOP",
        grounding_metadata: {
          web_search_queries: ["snake query"],
          grounding_chunks: [{ web: { uri: "https://snake.example", title: "Snake" } }],
        },
      },
    ],
  });

  const queryDelta = result.find(
    (event) => event.type === "content_block_delta" && event.delta.type === "input_json_delta"
  );
  assert.deepEqual(JSON.parse(queryDelta.delta.partial_json), { query: "snake query" });

  const toolResult = searchBlocks(result)[1];
  assert.deepEqual(toolResult.content_block.content, [
    {
      type: "web_search_result",
      url: "https://snake.example",
      title: "Snake",
      encrypted_content: "",
      page_age: null,
    },
  ]);
});

test("grounding: no groundingMetadata keeps the previous event sequence (regression guard)", () => {
  const result = events({
    candidates: [{ content: { parts: [{ text: "plain" }] }, finishReason: "STOP" }],
  });

  assert.deepEqual(
    result.map((event) => event.type),
    [
      "message_start",
      "content_block_start",
      "content_block_delta",
      "content_block_stop",
      "message_delta",
      "message_stop",
    ]
  );
  assert.equal(result[1].content_block.type, "text");
  assert.equal(result[2].delta.text, "plain");
});

test("grounding: metadata with zero web chunks emits no search blocks", () => {
  const result = events({
    candidates: [
      {
        content: { parts: [{ text: "no results" }] },
        finishReason: "STOP",
        groundingMetadata: { webSearchQueries: ["nothing"], groundingChunks: [] },
      },
    ],
  });

  assert.equal(searchBlocks(result).length, 0);
  assert.equal(result[result.length - 1].type, "message_stop");
});

test("grounding: query falls back to empty string when webSearchQueries is absent", () => {
  const result = events({
    candidates: [
      {
        content: { parts: [{ text: "x" }] },
        finishReason: "STOP",
        groundingMetadata: { groundingChunks: [{ web: { uri: "https://only.example" } }] },
      },
    ],
  });

  const queryDelta = result.find(
    (event) => event.type === "content_block_delta" && event.delta.type === "input_json_delta"
  );
  assert.deepEqual(JSON.parse(queryDelta.delta.partial_json), { query: "" });

  // missing title defaults to the URL
  const toolResult = searchBlocks(result)[1];
  assert.equal(toolResult.content_block.content[0].title, "https://only.example");
});

test("grounding: direct translator call closes an open text block before the search pair", () => {
  const state = {};
  geminiToClaudeResponse(
    {
      responseId: "resp-direct",
      modelVersion: "gemini-2.5-pro",
      candidates: [{ content: { parts: [{ text: "Hello" }] } }],
    },
    state
  );

  const result = geminiToClaudeResponse(
    {
      candidates: [
        {
          content: { parts: [] },
          finishReason: "STOP",
          groundingMetadata: GROUNDING,
        },
      ],
    },
    state
  );

  // text block (0) closed, then server_tool_use (1) and result (2)
  assert.equal(result[0].type, "content_block_stop");
  assert.equal(result[0].index, 0);
  assert.equal(result[1].content_block.type, "server_tool_use");
  assert.equal(result[1].index, 1);
  assert.equal(result[4].content_block.type, "web_search_tool_result");
  assert.equal(result[4].index, 2);
  assert.equal(result[result.length - 1].type, "message_stop");
});
