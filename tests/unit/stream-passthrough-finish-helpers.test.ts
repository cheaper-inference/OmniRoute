import { test } from "node:test";
import assert from "node:assert/strict";

import {
  NATIVE_FINISH_ERROR_REASONS,
  nativeFinishFailure,
  readPassthroughChatId,
} from "../../open-sse/utils/streamPassthroughFinish.ts";

test("nativeFinishFailure maps every error native_finish_reason to a 502 failure", () => {
  for (const reason of NATIVE_FINISH_ERROR_REASONS) {
    const failure = nativeFinishFailure({
      choices: [{ delta: {}, finish_reason: "stop", native_finish_reason: reason }],
    });
    assert.deepEqual(failure, {
      status: 502,
      message: `Upstream stream failed: ${reason}`,
      code: "upstream_native_finish_error",
      type: "server_error",
    });
  }
});

test("nativeFinishFailure ignores non-error and missing native_finish_reason values", () => {
  assert.equal(nativeFinishFailure({ choices: [{ native_finish_reason: "stop" }] }), null);
  assert.equal(nativeFinishFailure({ choices: [{ native_finish_reason: 42 }] }), null);
  assert.equal(nativeFinishFailure({ choices: [{ finish_reason: "stop" }] }), null);
  assert.equal(nativeFinishFailure({ choices: [] }), null);
  assert.equal(nativeFinishFailure({ choices: "nope" }), null);
  assert.equal(nativeFinishFailure({}), null);
  assert.equal(nativeFinishFailure(null), null);
});

test("readPassthroughChatId keeps string ids, stringifies numeric ids, rejects the rest", () => {
  assert.equal(readPassthroughChatId({ id: "chatcmpl-1" }), "chatcmpl-1");
  assert.equal(readPassthroughChatId({ id: 7 }), "7");
  assert.equal(readPassthroughChatId({ id: "" }), null);
  assert.equal(readPassthroughChatId({ id: null }), null);
  assert.equal(readPassthroughChatId({ id: { nested: true } }), null);
  assert.equal(readPassthroughChatId({}), null);
  assert.equal(readPassthroughChatId(undefined), null);
});
