import assert from "node:assert/strict";
import test from "node:test";
import { findBalancedJsonEnd } from "../../open-sse/handlers/responseSanitizer/balancedJson.ts";

test("balanced JSON boundary ignores quoted braces and escaped quotes", () => {
  const object = JSON.stringify({ nested: { text: 'brace } and quote " and slash \\' } });
  const prefix = "to=functions.read ";
  const content = `${prefix}${object} visible text {}`;
  assert.equal(findBalancedJsonEnd(content, prefix.length), prefix.length + object.length - 1);
});

test("balanced JSON boundary rejects invalid starts and incomplete envelopes", () => {
  assert.equal(findBalancedJsonEnd("{}", -1), -1);
  assert.equal(findBalancedJsonEnd("{}", 2), -1);
  assert.equal(findBalancedJsonEnd("[]", 0), -1);
  assert.equal(findBalancedJsonEnd('{"nested": {}}', 0), 13);
  assert.equal(findBalancedJsonEnd('{"text": "unterminated }', 0), -1);
  assert.equal(findBalancedJsonEnd('{"nested": {}', 0), -1);
});
