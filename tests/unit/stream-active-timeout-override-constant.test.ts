/**
 * STREAM_ACTIVE_TIMEOUT_OVERRIDE_MS is what streamingTail passes to the per-target
 * resolver. It must stay undefined when the operator left STREAM_ACTIVE_TIMEOUT_MS
 * unset; only then can a declared budget (e.g. GLM's 50 minutes) raise the default
 * cap. STREAM_ACTIVE_TIMEOUT_MS itself always has a value (the default when unset),
 * so reading it here would turn the default into a hard cap and cut those targets
 * off at 21 minutes again.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

delete process.env.STREAM_ACTIVE_TIMEOUT_MS;
const constants = await import("../../open-sse/config/constants.ts");

test("with STREAM_ACTIVE_TIMEOUT_MS unset the override constant is undefined", () => {
  assert.equal(constants.STREAM_ACTIVE_TIMEOUT_OVERRIDE_MS, undefined);
  assert.equal(constants.STREAM_ACTIVE_TIMEOUT_MS, constants.DEFAULT_STREAM_ACTIVE_TIMEOUT_MS);
});
