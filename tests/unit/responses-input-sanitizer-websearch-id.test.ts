import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";

test("keeps replayed web search call id on generic executors", () => {
  const items = [{ type: "web_search_call", id: "ws_abc" }];
  const result = sanitizeResponsesInputItems(items, false) as Array<Record<string, unknown>>;
  assert.equal(result[0].id, "ws_abc");
});

test("strips malformed web search call id", () => {
  const items = [{ type: "web_search_call", id: null }];
  const result = sanitizeResponsesInputItems(items, false) as Array<Record<string, unknown>>;
  assert.equal("id" in result[0], false);
});

test("leaves prefixed function call id unchanged", () => {
  const items = [{ type: "function_call", id: "fc_123" }];
  const result = sanitizeResponsesInputItems(items, false) as Array<Record<string, unknown>>;
  assert.equal(result[0].id, "fc_123");
});

test("leaves items without id unchanged", () => {
  const items = [{ type: "web_search_call" }];
  const result = sanitizeResponsesInputItems(items, false) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], { type: "web_search_call" });
});

test("leaves Codex compaction replay untouched", () => {
  const items = [{ type: "web_search_call", id: "ws_abc" }];
  const result = sanitizeResponsesInputItems(items, false, {
    preserveWebSearchCalls: true,
  }) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], { type: "web_search_call", id: "ws_abc" });
});
