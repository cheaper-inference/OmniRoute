/**
 * Shared Claude Code WebSearch block emitters
 * (open-sse/translator/helpers/claudeServerWebSearch.ts).
 *
 * The response-side half of the module is pure — providers hand it normalized
 * `{url, title}` hits plus the next free content-block index, and it returns the
 * `server_tool_use` + `web_search_tool_result` pair every translator splices into
 * its own event stream. The Gemini/Antigravity integration is covered end-to-end by
 * gemini-grounding-to-claude-web-search.test.ts; this file pins the helper contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  buildClaudeWebSearchBlockEvents,
  toClaudeWebSearchResults,
} from "../../../open-sse/translator/helpers/claudeServerWebSearch.ts";

const HIT = { url: "https://weather.com", title: "Weather Today" };

test("toClaudeWebSearchResults: dedupes by URL, first occurrence wins", () => {
  const results = toClaudeWebSearchResults([
    HIT,
    { url: "https://news.example/a", title: "Example News" },
    { url: "https://weather.com", title: "Weather Today (dup)" },
  ]);

  assert.deepEqual(results, [
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
  ]);
});

test("toClaudeWebSearchResults: missing or blank title falls back to the URL", () => {
  const results = toClaudeWebSearchResults([
    { url: "https://a.example" },
    { url: "https://b.example", title: "" },
    { url: "https://c.example", title: 42 },
  ]);

  assert.deepEqual(
    results.map((result) => result.title),
    ["https://a.example", "https://b.example", "https://c.example"]
  );
});

test("toClaudeWebSearchResults: entries without a usable url are skipped", () => {
  const results = toClaudeWebSearchResults([
    { title: "no url" },
    { url: "", title: "empty" },
    { url: 7, title: "non-string" },
    { url: null },
    HIT,
  ]);

  assert.deepEqual(
    results.map((result) => result.url),
    ["https://weather.com"]
  );
});

test("toClaudeWebSearchResults: empty and non-array input yield no results", () => {
  assert.deepEqual(toClaudeWebSearchResults([]), []);
  assert.deepEqual(toClaudeWebSearchResults(null), []);
  assert.deepEqual(toClaudeWebSearchResults(undefined), []);
});

test("buildClaudeWebSearchBlockEvents: emits the 5 events at startIndex and startIndex+1", () => {
  const results = toClaudeWebSearchResults([HIT]);
  const built = buildClaudeWebSearchBlockEvents({ query: "weather", results, startIndex: 3 });

  assert.deepEqual(
    built.events.map((event) => event.type),
    [
      "content_block_start",
      "content_block_delta",
      "content_block_stop",
      "content_block_start",
      "content_block_stop",
    ]
  );
  assert.deepEqual(
    built.events.map((event) => event.index),
    [3, 3, 3, 4, 4]
  );
  assert.equal(built.nextIndex, 5);
  assert.equal(built.events[0].content_block.type, "server_tool_use");
  assert.equal(built.events[0].content_block.name, "web_search");
  assert.deepEqual(built.events[0].content_block.input, {});
  assert.equal(built.events[3].content_block.type, "web_search_tool_result");
  assert.equal(built.events[3].content_block.tool_use_id, built.toolUseId);
  assert.deepEqual(built.events[3].content_block.content, results);
});

test("buildClaudeWebSearchBlockEvents: query travels in the input_json_delta of the same block", () => {
  const built = buildClaudeWebSearchBlockEvents({
    query: "weather sao paulo",
    results: [],
    startIndex: 0,
  });

  const delta = built.events[1];
  assert.equal(delta.delta.type, "input_json_delta");
  assert.equal(delta.index, 0);
  assert.deepEqual(JSON.parse(delta.delta.partial_json), { query: "weather sao paulo" });
});

test("buildClaudeWebSearchBlockEvents: caller-provided id is used verbatim", () => {
  const built = buildClaudeWebSearchBlockEvents({
    query: "q",
    results: [],
    startIndex: 0,
    toolUseId: "srvtoolu_test_0",
  });

  assert.equal(built.toolUseId, "srvtoolu_test_0");
  assert.equal(built.events[0].content_block.id, "srvtoolu_test_0");
  assert.equal(built.events[3].content_block.tool_use_id, "srvtoolu_test_0");
});

test("buildClaudeWebSearchBlockEvents: generated id keeps the srvtoolu_ prefix", () => {
  const built = buildClaudeWebSearchBlockEvents({ query: "q", results: [], startIndex: 2 });

  assert.match(built.toolUseId, /^srvtoolu_/);
  assert.equal(built.events[0].content_block.id, built.toolUseId);
});

test("buildClaudeWebSearchBlockEvents: every start is balanced by a stop at the same index", () => {
  const built = buildClaudeWebSearchBlockEvents({
    query: "q",
    results: toClaudeWebSearchResults([HIT]),
    startIndex: 7,
  });

  const open = new Set();
  for (const event of built.events) {
    if (event.type === "content_block_start") {
      assert.ok(!open.has(event.index), `block ${event.index} started twice`);
      open.add(event.index);
    } else if (event.type === "content_block_stop") {
      assert.ok(open.has(event.index), `block ${event.index} stopped without a start`);
      open.delete(event.index);
    }
  }
  assert.deepEqual([...open], []);
});
