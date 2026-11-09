import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(process.env.TMPDIR ?? ".", "L06-context-overflow-"));

const { isContextOverflowText } = await import("../../open-sse/services/accountFallback.ts");
const { isContextOverflow400 } = await import("../../open-sse/services/combo/comboPredicates.ts");

const validationErrors = [
  'Provider error 400: {"error":{"message":"Invalid value for max_tokens: maximum token count is 32768","code":"invalid_value","param":"max_tokens"}}',
  '{"error":{"code":"invalid_type","param":"max_completion_tokens","message":"max_completion_tokens must be an integer"}}',
  "The max_tokens parameter is illegal: maximum token value exceeded",
  '{"error":{"code":"invalid_value","param":"tools[0].function.name","message":"Invalid value: maximum token length exceeded"}}',
];

test("parameter validation echoes are not context overflow", () => {
  for (const error of validationErrors) {
    assert.equal(isContextOverflowText(error), false, error);
    assert.equal(isContextOverflow400(error), false, error);
  }
});

test("genuine context overflow and rate-limit guards keep their behavior", () => {
  const overflow =
    'Provider error 400: {"error":{"code":"context_length_exceeded","message":"prompt is too long"}}';
  assert.equal(isContextOverflowText(overflow), true);
  assert.equal(isContextOverflow400(overflow), true);
  assert.equal(isContextOverflowText("input exceeds maximum input tokens per minute"), false);
});

test("context overflow bodies that name a token field and a param keep matching", () => {
  const vllm =
    '{"object":"error","message":"\'max_tokens\' or \'max_completion_tokens\' is too large: 5000. This model\'s maximum context length is 4096 tokens and your request has 40 input tokens (5000 > 4096 - 40).","type":"BadRequestError","param":null,"code":400}';
  assert.equal(isContextOverflowText(vllm), true);
  assert.equal(isContextOverflow400(vllm), true);
});

test("an explicit overflow message keeps matching when the error code is invalid_value", () => {
  const explicit = [
    '{"error":{"code":"invalid_value","message":"input too long"}}',
    '{"error":{"code":"invalid_value","message":"input is too long for this model"}}',
  ];
  for (const error of explicit) {
    assert.equal(isContextOverflowText(error), true, error);
    assert.equal(isContextOverflow400(error), true, error);
  }
});
