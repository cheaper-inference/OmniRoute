import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseIntervalMs,
  shouldRepublishMissingTarget,
} from "../../bin/cli/commands/sync-remote.mjs";

test("sync remote daemon validates the poll interval before scheduling", () => {
  assert.equal(parseIntervalMs("60000"), 60000);
  assert.equal(parseIntervalMs(1000), 1000);
  for (const value of ["0", "-1", "999", "abc", "2147483648", Number.NaN]) {
    assert.throws(
      () => parseIntervalMs(value),
      /--interval must be an integer/,
      `accepted ${value}`
    );
  }
});

test("sync remote daemon republishes a target that disappeared remotely", () => {
  assert.equal(shouldRepublishMissingTarget({ lastPushedVersion: "abc" }, null), true);
  assert.equal(shouldRepublishMissingTarget({}, null), false);
  assert.equal(shouldRepublishMissingTarget({ lastPushedVersion: "abc" }, "def"), false);
});
