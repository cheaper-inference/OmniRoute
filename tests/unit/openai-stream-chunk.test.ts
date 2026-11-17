// The last OpenAI-style stream chunk is normalised in place before it is forwarded: a numeric chunk id
// or tool-call id becomes a string, tool names that were aliased on the way in are restored from the
// alias map, and the result reports whether anything changed and whether any choice carries a
// finish reason.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  findFinishReason,
  normalizeFinalOpenAIStreamChunk,
} from "../../open-sse/utils/openAIStreamChunk.ts";

test("a chunk that needs no change reports nothing changed", () => {
  const chunk = { id: "chatcmpl-1", choices: [{ delta: { content: "hi" } }] };
  assert.deepEqual(normalizeFinalOpenAIStreamChunk(chunk, null), {
    changed: false,
    hasFinishReason: false,
  });
});

test("a numeric chunk id becomes a string", () => {
  const chunk: Record<string, unknown> = { id: 42, choices: [] };
  assert.deepEqual(normalizeFinalOpenAIStreamChunk(chunk, undefined), {
    changed: true,
    hasFinishReason: false,
  });
  assert.equal(chunk.id, "42");
});

test("a missing id is left alone", () => {
  const chunk: Record<string, unknown> = { choices: [] };
  assert.equal(normalizeFinalOpenAIStreamChunk(chunk, null).changed, false);
  assert.equal("id" in chunk, false);
});

test("numeric tool-call ids in every choice become strings", () => {
  const chunk = {
    id: "c",
    choices: [
      { delta: { tool_calls: [{ id: 7 }, { id: "keep" }, { id: null }] } },
      { delta: { tool_calls: [{ id: 8 }] } },
    ],
  };
  assert.equal(normalizeFinalOpenAIStreamChunk(chunk, null).changed, true);
  assert.equal(chunk.choices[0].delta.tool_calls[0].id, "7");
  assert.equal(chunk.choices[0].delta.tool_calls[1].id, "keep");
  assert.equal(chunk.choices[0].delta.tool_calls[2].id, null);
  assert.equal(chunk.choices[1].delta.tool_calls[0].id, "8");
});

test("a choice without a tool_calls array is skipped", () => {
  const chunk = { choices: [null, {}, { delta: {} }, { delta: { tool_calls: "x" } }] };
  assert.equal(normalizeFinalOpenAIStreamChunk(chunk, null).changed, false);
});

test("aliased tool names are restored from the alias map", () => {
  const aliases = new Map([["mcp_lookup", "Lookup"]]);
  const chunk = {
    id: "c",
    choices: [{ delta: { tool_calls: [{ id: "t1", function: { name: "mcp_lookup" } }] } }],
  };
  assert.equal(normalizeFinalOpenAIStreamChunk(chunk, aliases).changed, true);
  assert.equal(chunk.choices[0].delta.tool_calls[0].function.name, "Lookup");
});

test("a finish reason on any choice is reported", () => {
  const stop = { choices: [{ finish_reason: "stop" }, {}] };
  assert.equal(normalizeFinalOpenAIStreamChunk(stop, null).hasFinishReason, true);
  const second = { choices: [{}, { finish_reason: "stop" }] };
  assert.equal(normalizeFinalOpenAIStreamChunk(second, null).hasFinishReason, true);
  const none = { choices: [{ finish_reason: null }] };
  assert.equal(normalizeFinalOpenAIStreamChunk(none, null).hasFinishReason, false);
});

test("findFinishReason returns the first non-empty reason across all choices", () => {
  assert.equal(findFinishReason([{}, { finish_reason: "stop" }]), "stop");
  assert.equal(findFinishReason([{ finish_reason: null }, { finish_reason: "length" }]), "length");
  assert.equal(findFinishReason([{ finish_reason: "stop" }, { finish_reason: "length" }]), "stop");
});

test("findFinishReason returns undefined for empty, missing or null reasons", () => {
  assert.equal(findFinishReason([]), undefined);
  assert.equal(findFinishReason(undefined), undefined);
  assert.equal(findFinishReason(null), undefined);
  assert.equal(findFinishReason("not an array"), undefined);
  assert.equal(findFinishReason([{ finish_reason: null }]), undefined);
  assert.equal(findFinishReason([null, {}]), undefined);
  assert.equal(findFinishReason([{ finish_reason: "" }]), undefined);
});

test("a chunk without choices has no finish reason", () => {
  assert.equal(normalizeFinalOpenAIStreamChunk({ id: "c" }, null).hasFinishReason, false);
});
