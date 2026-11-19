// An assistant-last Claude turn is a prefill: Anthropic returns 400
// "final assistant content cannot end with trailing whitespace" when the last
// text block ends on whitespace (compression can leave that). Trim only the
// trailing whitespace; drop the block only when it trims to empty.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-final-assistant-ws-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;

const { normalizeClaudeFinalAssistantWhitespace } =
  await import("../../open-sse/services/assistantPrefill.ts");

test.after(() => {
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

const msg = (content: unknown) => ({ role: "assistant", content });

test("trims trailing whitespace on the last text block only", () => {
  const input = [
    { role: "user", content: "hi" },
    msg([
      { type: "text", text: "leading and inner  whitespace kept\n\n" },
      { type: "text", text: "tail  \n " },
    ]),
  ];
  const result = normalizeClaudeFinalAssistantWhitespace(input);
  assert.equal(result[1].content[0].text, "leading and inner  whitespace kept\n\n");
  assert.equal(result[1].content[1].text, "tail");
  assert.notStrictEqual(result, input);
  assert.notStrictEqual(result[1], input[1], "input message must not be mutated");
});

test("a last text block that trims to empty is removed", () => {
  const result = normalizeClaudeFinalAssistantWhitespace([
    { role: "user", content: "hi" },
    msg([
      { type: "text", text: "keep" },
      { type: "text", text: "   \n" },
    ]),
  ]);
  assert.deepEqual(result[1].content, [{ type: "text", text: "keep" }]);
});

test("a final assistant turn that becomes empty is dropped", () => {
  const result = normalizeClaudeFinalAssistantWhitespace([
    { role: "user", content: "hi" },
    msg("   \n\t"),
  ]);
  assert.deepEqual(result, [{ role: "user", content: "hi" }]);
});

test("a final assistant turn with a tool_use is unchanged", () => {
  const input = [
    { role: "user", content: "hi" },
    msg([
      { type: "text", text: "tail  " },
      { type: "tool_use", id: "toolu_1", name: "x", input: {} },
    ]),
  ];
  assert.strictEqual(normalizeClaudeFinalAssistantWhitespace(input), input);
});

test("non-assistant-last input is returned unchanged", () => {
  const input = [{ role: "user", content: "hi  " }];
  assert.strictEqual(normalizeClaudeFinalAssistantWhitespace(input), input);
});
