// Bounded previews flatten with Buffer.from(slice, "utf8") so V8 drops the
// parent SlicedString. That round-trip is not behavior-preserving when the cut
// splits a UTF-16 surrogate pair: the unpaired unit becomes U+FFFD. The fixture
// below is exactly that naive slice, so the assertion fails if the cut is not
// pulled back by one code unit first.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  MAX_PREVIEW_STRING,
  truncatePendingPreview,
} from "../../src/lib/usage/usageHistory/helpers.ts";

const { cloneBoundedForLog } = await import("../../open-sse/utils/requestLogger.ts");

const MAX_LOG_STRING_LENGTH = 64 * 1024;
const EMOJI = "😀";
const REPLACEMENT = "\uFFFD";

function logCut(inputLength: number): { marker: string; headLen: number; tailLen: number } {
  const marker = `\n[...truncated ${inputLength - MAX_LOG_STRING_LENGTH} chars...]\n`;
  const keep = Math.max(0, MAX_LOG_STRING_LENGTH - marker.length);
  return { marker, headLen: Math.floor(keep / 2), tailLen: Math.ceil(keep / 2) };
}

test("quota preview cut on an emoji does not become U+FFFD", () => {
  const input = "a".repeat(MAX_PREVIEW_STRING - 1) + EMOJI + "b".repeat(40);
  const naive = Buffer.from(`${input.slice(0, MAX_PREVIEW_STRING)}...`, "utf8").toString("utf8");
  assert.equal(naive.includes(REPLACEMENT), true, "fixture must split a surrogate");
  assert.equal(input.charCodeAt(MAX_PREVIEW_STRING - 1), 0xd83d);

  const out = truncatePendingPreview(input);
  assert.equal(out, "a".repeat(MAX_PREVIEW_STRING - 1) + "...");
  assert.equal(String(out).includes(REPLACEMENT), false);
  assert.ok(String(out).length <= MAX_PREVIEW_STRING + "...".length);
});

test("log preview head cut on an emoji does not become U+FFFD", () => {
  const inputLength = MAX_LOG_STRING_LENGTH + 80;
  const { marker, headLen, tailLen } = logCut(inputLength);
  const input =
    "a".repeat(headLen - 1) +
    EMOJI +
    "c".repeat(inputLength - (headLen - 1) - EMOJI.length - tailLen) +
    "b".repeat(tailLen);
  assert.equal(input.length, inputLength);
  assert.equal(input.charCodeAt(headLen - 1), 0xd83d);

  const naive = Buffer.from(input.slice(0, headLen), "utf8").toString("utf8");
  assert.equal(naive.includes(REPLACEMENT), true, "fixture must split a surrogate");

  const out = cloneBoundedForLog(input);
  assert.equal(out, "a".repeat(headLen - 1) + marker + "b".repeat(tailLen));
  assert.equal(String(out).includes(REPLACEMENT), false);
  assert.ok(String(out).length <= MAX_LOG_STRING_LENGTH);
});

test("log preview tail cut on an emoji does not become U+FFFD", () => {
  const inputLength = MAX_LOG_STRING_LENGTH + 80;
  const { marker, headLen, tailLen } = logCut(inputLength);
  const tailStart = inputLength - tailLen;
  const input =
    "a".repeat(headLen) +
    "c".repeat(tailStart - 1 - headLen) +
    EMOJI +
    "b".repeat(inputLength - (tailStart - 1) - EMOJI.length);
  assert.equal(input.length, inputLength);
  assert.equal(input.charCodeAt(tailStart - 1), 0xd83d);
  assert.equal(input.charCodeAt(tailStart), 0xde00);

  const naive = Buffer.from(input.slice(tailStart), "utf8").toString("utf8");
  assert.equal(naive.includes(REPLACEMENT), true, "fixture must split a surrogate");

  const out = cloneBoundedForLog(input);
  assert.equal(out, "a".repeat(headLen) + marker + "b".repeat(tailLen - 1));
  assert.equal(String(out).includes(REPLACEMENT), false);
  assert.ok(String(out).length <= MAX_LOG_STRING_LENGTH);
});
