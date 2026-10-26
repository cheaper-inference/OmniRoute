import assert from "node:assert/strict";
import test from "node:test";
import { normalizeFinalOpenAIStreamChunk } from "../../open-sse/utils/openAIStreamChunk.ts";

test("normalizes every delta even after the chunk ID changed and restores names", () => {
  const first = { id: 0, function: { name: "bash" } };
  const second = { id: false, function: { name: "other" } };
  const parsed = {
    id: 123,
    choices: [
      { delta: { tool_calls: [null, first] }, finish_reason: "tool_calls" },
      { delta: { tool_calls: [second] } },
    ],
  };
  const aliases = new Map([["bash", "Bash"]]);
  assert.deepEqual(normalizeFinalOpenAIStreamChunk(parsed, aliases), {
    changed: true,
    hasFinishReason: true,
  });
  assert.equal(parsed.id, "123");
  assert.equal(first.id, "0");
  assert.equal(second.id, "false");
  assert.equal(first.function.name, "Bash");
  assert.deepEqual(normalizeFinalOpenAIStreamChunk(parsed, aliases), {
    changed: false,
    hasFinishReason: true,
  });
});

test("ignores malformed deltas and uses only the first choice finish reason", () => {
  const stable = { id: "stable" };
  const absent = { id: null };
  const parsed = {
    id: null,
    choices: [
      null,
      {},
      { delta: null },
      { delta: { tool_calls: "invalid" } },
      { delta: { tool_calls: [stable, absent, {}] }, finish_reason: "stop" },
    ],
  };
  assert.deepEqual(normalizeFinalOpenAIStreamChunk(parsed, null), {
    changed: false,
    hasFinishReason: false,
  });
  assert.equal(absent.id, null);
  assert.equal(stable.id, "stable");
});

test("name restoration alone reports a change, including message tool calls", () => {
  const call = { id: 42, function: { name: "bash" } };
  assert.deepEqual(
    normalizeFinalOpenAIStreamChunk(
      { choices: [{ message: { tool_calls: [call] } }] },
      new Map([["bash", "Bash"]])
    ),
    { changed: true, hasFinishReason: false }
  );
  assert.equal(call.id, 42);
  assert.equal(call.function.name, "Bash");
});
