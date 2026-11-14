import test from "node:test";
import assert from "node:assert/strict";

import { launchFastPathCommand } from "../../../../bin/omnirouter.mjs";

const cmd = (...args: string[]) => launchFastPathCommand(["node", "omnirouter", ...args]);

test("launchFastPathCommand: root options alone, without a command, use the full program", () => {
  assert.equal(cmd("-q"), null);
  assert.equal(cmd("--api-key", "k"), null);
  assert.equal(cmd("--output=json"), null);
});

test("launchFastPathCommand: every --output choice is accepted in both spellings", () => {
  for (const choice of ["table", "json", "jsonl", "csv"]) {
    assert.equal(cmd("--output", choice, "launch"), "launch", choice);
    assert.equal(cmd(`--output=${choice}`, "gateway"), "gateway", choice);
  }
});

test("launchFastPathCommand: an empty inline value is a value, a bare `=` option is not", () => {
  assert.equal(cmd("--api-key=", "launch"), "launch");
  assert.equal(cmd("--=x", "launch"), null);
  assert.equal(cmd("-q=1", "launch"), null);
});

test("launchFastPathCommand: only the first non-option word decides", () => {
  assert.equal(cmd("launch", "gateway"), "launch");
  assert.equal(cmd("gateway", "launch"), "gateway");
  assert.equal(cmd("models", "launch"), null);
});
