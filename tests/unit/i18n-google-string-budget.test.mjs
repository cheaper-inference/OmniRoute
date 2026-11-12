import assert from "node:assert/strict";
import test from "node:test";
import {
  translateSegmentsWithGoogle,
  translateStringsWithGoogle,
} from "../../scripts/i18n/lib/google-translate.mjs";

for (const [name, translate] of [
  ["segments", translateSegmentsWithGoogle],
  ["ICU strings", translateStringsWithGoogle],
]) {
  test(`${name} rejects invalid concurrency even when no prose requires transport`, async () => {
    for (const concurrency of [NaN, Infinity, 0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
      await assert.rejects(
        translate([""], "de", {
          concurrency,
          fetchImpl: async () => assert.fail("invalid budget reached transport"),
        }),
        /concurrency must be a positive integer/
      );
    }
  });
  test(`${name} rejects invalid timeout using the V4 signed-timer domain`, async () => {
    for (const timeoutMs of [NaN, Infinity, 0, -1, 1.5, 2147483648]) {
      await assert.rejects(
        translate([""], "de", {
          timeoutMs,
          fetchImpl: async () => assert.fail("invalid timeout reached transport"),
        }),
        /timeout must be a positive 32-bit integer/
      );
    }
  });
  test(`${name} accepts positive integer limits while preserving nonprose`, async () => {
    assert.deepEqual(
      await translate([""], "de", {
        concurrency: 1,
        timeoutMs: 2147483647,
        fetchImpl: async () => assert.fail("empty text requires no transport"),
      }),
      [""]
    );
  });
}
