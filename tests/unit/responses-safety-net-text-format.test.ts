import test from "node:test";
import assert from "node:assert/strict";

import { translateRequest } from "../../open-sse/translator/index.ts";

// Same-format Responses lane: a Chat-shaped body (messages + response_format) is promoted to the
// Responses shape by the safety net in normalizeOpenAIResponsesRequest.
function normalize(extra: Record<string, unknown>) {
  return translateRequest(
    "openai-responses",
    "openai-responses",
    "gpt-5",
    { model: "x", messages: [{ role: "user", content: "hi" }], ...extra },
    false,
    null,
    "openai"
  ) as { text?: { format?: Record<string, unknown> }; response_format?: unknown };
}

test("a Chat json_schema response_format becomes the flat Responses text.format", () => {
  const out = normalize({
    response_format: {
      type: "json_schema",
      json_schema: { name: "answer", schema: { type: "object" }, strict: true },
    },
  });
  assert.deepEqual(out.text?.format, {
    type: "json_schema",
    name: "answer",
    schema: { type: "object" },
    strict: true,
  });
  assert.equal(out.response_format, undefined);
});

test("a Chat json_object response_format becomes text.format json_object", () => {
  const out = normalize({ response_format: { type: "json_object" } });
  assert.deepEqual(out.text?.format, { type: "json_object" });
});

test("an explicit text object wins and response_format is dropped", () => {
  const out = normalize({
    text: { verbosity: "low" },
    response_format: { type: "json_object" },
  });
  assert.deepEqual(out.text, { verbosity: "low" });
  assert.equal(out.response_format, undefined);
});
