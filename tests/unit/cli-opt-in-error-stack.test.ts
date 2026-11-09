import { strict as assert } from "node:assert";
import { test } from "node:test";

import { formatCliError } from "../../bin/cli/utils/formatCliError.mjs";

test("CLI errors use the concise message by default", () => {
  const error = new Error("provider unavailable");
  assert.equal(formatCliError(error, false), "provider unavailable");
});

test("CLI stack output is available only with debug opt-in", () => {
  const error = new Error("provider unavailable");
  assert.equal(formatCliError(error, true), error.stack);
  assert.equal(formatCliError(error, false), "provider unavailable");
});

test("CLI error formatting tolerates non-Error thrown values", () => {
  assert.equal(formatCliError("unexpected failure", false), "unexpected failure");
  assert.equal(formatCliError("unexpected failure", true), "unexpected failure");
  assert.equal(formatCliError({ message: "custom error" }, true), "custom error");
  assert.equal(formatCliError(undefined, false), "undefined");
  assert.equal(formatCliError(null, true), "null");
});
