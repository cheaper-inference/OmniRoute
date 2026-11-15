import { test } from "node:test";
import assert from "node:assert/strict";

import { stripJsonFence, unfenceJsonOutput } from "../../open-sse/utils/jsonFence.ts";

test("stripJsonFence keeps a bare fenced block whose inner text is not JSON", () => {
  const prose = "```\nI cannot answer that.\n```";
  assert.equal(stripJsonFence(prose), prose);
});

test("stripJsonFence keeps a ```json fenced block whose inner text is not valid JSON", () => {
  const broken = '```json\n{"a":\n```';
  assert.equal(stripJsonFence(broken), broken);
});

test("stripJsonFence still unwraps a fenced JSON array and JSON scalar", () => {
  assert.equal(stripJsonFence("```json\n[1,2]\n```"), "[1,2]");
  assert.equal(stripJsonFence("```\n42\n```"), "42");
});

test("unfenceJsonOutput leaves non-JSON fenced message content untouched in JSON mode", () => {
  const prose = "```\nI cannot answer that.\n```";
  const response = { choices: [{ message: { role: "assistant", content: prose } }] };
  unfenceJsonOutput({ response_format: { type: "json_object" } }, response);
  assert.equal(response.choices[0].message.content, prose);
});
