import assert from "node:assert/strict";
import test from "node:test";
import { resolveStreamIndices } from "../../src/lib/streamIndices.ts";

test("inherits indices unless a numeric index is present", () => {
  for (const value of [{}, { index: "2" }, { index: null }]) {
    assert.deepEqual(resolveStreamIndices(value, 3, 4), { choiceIdx: 3, toolIdx: 4 });
  }
});

test("choice markers win over tool markers", () => {
  for (const marker of ["delta", "message", "finish_reason"]) {
    assert.deepEqual(
      resolveStreamIndices({ index: 0, [marker]: {}, function: {}, id: "tool" }, 3, 4),
      { choiceIdx: 0, toolIdx: 4 }
    );
  }
});

test("tool markers override only the tool index", () => {
  for (const value of [{ function: {} }, { id: "tool" }, { type: "function" }]) {
    assert.deepEqual(resolveStreamIndices({ index: 2, ...value }, 3, 4), {
      choiceIdx: 3,
      toolIdx: 2,
    });
  }
  assert.deepEqual(resolveStreamIndices({ index: 2, id: "", delta: null }, 3, 4), {
    choiceIdx: 2,
    toolIdx: 4,
  });
});
