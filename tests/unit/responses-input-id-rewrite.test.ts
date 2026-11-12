import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";

test("rewrites invalid item ID characters without losing item identity", () => {
  const [item] = sanitizeResponsesInputItems([
    { type: "message", id: "msg bad/id!?", role: "user", content: "hello" },
  ]) as Array<Record<string, unknown>>;
  assert.equal(item.id, "msg_bad_id__");
  assert.equal(item.content, "hello");
});

test("caps item IDs at 64 Unicode code points", () => {
  const longId = `rs_${"a".repeat(80)}`;
  const [item] = sanitizeResponsesInputItems([{ type: "reasoning", id: longId }]) as Array<
    Record<string, unknown>
  >;
  assert.equal(item.id, longId.slice(0, 64));
  assert.equal((item.id as string).length, 64);
});

test("leaves valid item IDs unchanged", () => {
  const input = { type: "function_call", id: "fc_valid-ID_123" };
  const [item] = sanitizeResponsesInputItems([input], false);
  assert.equal(item, input);
});

test("replaces each invalid Unicode code point once", () => {
  const [item] = sanitizeResponsesInputItems([{ type: "message", id: "msg_😀/x" }]) as Array<
    Record<string, unknown>
  >;
  assert.equal(item.id, "msg___x");
});
