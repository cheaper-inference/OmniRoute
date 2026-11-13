import test from "node:test";
import assert from "node:assert/strict";

import { defaultClaudeToolType } from "../../open-sse/handlers/chatCore/claudeToolDefaults.ts";

test("a falsy type (null, empty string, explicit undefined) becomes custom", () => {
  const out = defaultClaudeToolType([
    { type: null, name: "a" },
    { type: "", name: "b" },
    { type: undefined, name: "c" },
    { name: "d" },
  ]) as Array<Record<string, unknown>>;
  assert.deepEqual(
    out.map((tool) => tool.type),
    ["custom", "custom", "custom", "custom"]
  );
  assert.deepEqual(
    out.map((tool) => tool.name),
    ["a", "b", "c", "d"]
  );
});

test("a declared type, including a built-in one, is kept", () => {
  const out = defaultClaudeToolType([
    { type: "custom", name: "a" },
    { type: "bash_20241022", name: "bash" },
  ]) as Array<Record<string, unknown>>;
  assert.deepEqual(
    out.map((tool) => tool.type),
    ["custom", "bash_20241022"]
  );
});

test("the caller's tool objects are not changed", () => {
  const tool = { type: null, name: "a" };
  defaultClaudeToolType([tool]);
  assert.equal(tool.type, null);
});
