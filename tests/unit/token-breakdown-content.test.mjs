import assert from "node:assert/strict";
import test from "node:test";
import { countTokenBreakdown } from "../../bin/cli/runtime/tokenBreakdownContent.mjs";
import {
  validateTokenBreakdown,
  createTokenBreakdown,
} from "../../bin/cli/runtime/tokenBreakdown.mjs";
const encode = (text) => Array.from(text);
for (const [format, body] of [
  [
    "Chat",
    {
      tools: [{ function: { name: "read_file" } }],
      messages: [
        { role: "system", content: "Base" },
        {
          role: "assistant",
          tool_calls: [{ id: "a", function: { name: "read_file", arguments: "{}" } }],
        },
        { role: "tool", tool_call_id: "a", content: "فارسی 😀" },
        { role: "user", content: "Next" },
      ],
    },
  ],
  [
    "Responses",
    {
      instructions: "Base",
      input: [
        { type: "function_call", call_id: "a", name: "read_file", arguments: "{}" },
        { type: "function_call_output", call_id: "a", output: "فارسی 😀" },
      ],
    },
  ],
  [
    "Claude",
    {
      system: "Base",
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "a", name: "read_file", input: {} }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "a",
              content: [{ type: "text", text: "فارسی 😀" }],
            },
          ],
        },
      ],
    },
  ],
])
  test(`${format}: fixed category/source sums and Unicode bytes round-trip without duplicate counting`, () => {
    const out = countTokenBreakdown(body, encode);
    assert.equal(validateTokenBreakdown(out).status, "ok");
    assert.equal(out.sources.fileReads.bytes, Buffer.byteLength("فارسی 😀"));
    assert.equal(out.categories.toolOutputs.bytes, out.sources.fileReads.bytes);
    assert.equal(out.heuristicChars, 0);
    assert.equal(JSON.stringify(out).includes("فارسی"), false);
  });
test("MCP, unknown, future and ambiguous call IDs never become file/search sources", () => {
  const input = [
    { type: "function_call_output", call_id: "future", output: "future" },
    { type: "function_call", call_id: "future", name: "read_file" },
    { type: "function_call", call_id: "dup", name: "read_file" },
    { type: "function_call_output", call_id: "dup", output: "ambiguous" },
    { type: "function_call", call_id: "dup", name: "search" },
    { type: "function_call", call_id: "mcp", name: "mcp__filesystem__read_file_search" },
    { type: "function_call_output", call_id: "mcp", output: "mcp" },
    { type: "function_call_output", call_id: "unknown", output: "unknown" },
  ];
  const out = countTokenBreakdown({ input }, encode);
  assert.equal(out.sources.fileReads.parts, 0);
  assert.equal(out.sources.localSearch.parts, 0);
  assert.equal(out.sources.mcpResults.parts, 1);
  assert.equal(out.sources.otherOrUnknown.parts, 3);
});
test("the exact-work boundary never overshoots and media are disclosed as omitted", () => {
  let counted = 0;
  const out = countTokenBreakdown(
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "😀".repeat(3000) },
            { type: "image_url", image_url: { url: "data:synthetic" } },
          ],
        },
      ],
    },
    (text) => {
      counted += text.length;
      return encode(text);
    },
    { maxChars: 1500 }
  );
  assert.ok(counted <= 1500);
  assert.equal(out.exactChars + out.heuristicChars, 6000);
  assert.equal(out.omittedMedia, 1);
  assert.equal(validateTokenBreakdown(out).status, "ok");
});
test("real numeric worker handles JSON, is reaped, and rejects malformed JSON", async () => {
  const counter = createTokenBreakdown();
  try {
    assert.equal(
      (await counter.submit('{"messages":[{"role":"user","content":"Hello"}]}')).status,
      "ok"
    );
    assert.equal((await counter.submit("invalid JSON")).status, "invalid_json");
  } finally {
    await counter.stop();
  }
});
