import assert from "node:assert/strict";
import test from "node:test";
import { normalizeResponsesSseIds } from "../../open-sse/utils/responsesStreamHelpers.ts";

test("normalizes IDs while copying only changed nested objects", () => {
  const unchanged = { id: "stable", call_id: null };
  const changed = { id: 0, call_id: false, text: "keep" };
  const output = [unchanged, changed, null, [1]];
  const response = { id: 123, output, status: "completed" };
  const item = { id: 42, call_id: "existing" };
  const payload = { response_id: 0, item_id: false, call_id: null, item, response };
  assert.equal(normalizeResponsesSseIds(payload), true);
  assert.deepEqual(payload, {
    response_id: "0",
    item_id: "false",
    call_id: null,
    item: { id: "42", call_id: "existing" },
    response: {
      id: "123",
      status: "completed",
      output: [unchanged, { id: "0", call_id: "false", text: "keep" }, null, [1]],
    },
  });
  assert.notEqual(payload.response, response);
  assert.notEqual(payload.response.output, output);
  assert.equal(payload.response.output[0], unchanged);
  assert.equal(response.id, 123);
  assert.equal(changed.id, 0);
  assert.equal(item.id, 42);
  const normalized = payload.response;
  assert.equal(normalizeResponsesSseIds(payload), false);
  assert.equal(payload.response, normalized);
});

test("unchanged and malformed nested values retain identity", () => {
  for (const response of [
    null,
    [],
    "invalid",
    {},
    { id: null },
    { id: "x", output: [{ id: "y" }] },
  ]) {
    const payload = { response, item: { id: "item" } };
    const item = payload.item;
    assert.equal(normalizeResponsesSseIds(payload), false);
    assert.equal(payload.response, response);
    assert.equal(payload.item, item);
  }
});
