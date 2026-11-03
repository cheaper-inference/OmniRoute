/**
 * Regression guard for routing parseModel()'s hot-path logging through the
 * level-gated project logger (was raw console.*, which blocks the event loop).
 *
 * These expected values were captured from the pre-change implementation and
 * verified identical to the post-change implementation across a 25-input
 * differential matrix — so this locks in that the logging change is purely a
 * logging change and does not alter parseModel's routing behavior.
 *
 * Run: node --import tsx/esm --test tests/unit/model-logger-gating.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const { parseModel } = await import("../../open-sse/services/model.ts");

// [input, expected ParsedModel] — captured from the original implementation.
const CASES: Array<[string, ReturnType<typeof parseModel>]> = [
  [
    "openai/gpt-4o",
    {
      provider: "openai",
      model: "gpt-4o",
      isAlias: false,
      providerAlias: "openai",
      extendedContext: false,
    },
  ],
  [
    "deepseek/deepseek-chat",
    {
      provider: null,
      model: "deepseek/deepseek-chat",
      isAlias: true,
      providerAlias: null,
      extendedContext: false,
    },
  ],
  [
    "anthropic/claude-sonnet-4-5[1m]",
    {
      provider: "anthropic",
      model: "claude-sonnet-4-5",
      isAlias: false,
      providerAlias: "anthropic",
      extendedContext: true,
    },
  ],
  [
    "gpt-4o",
    { provider: null, model: "gpt-4o", isAlias: true, providerAlias: null, extendedContext: false },
  ],
  // Path traversal — rejected (security path, now logged via log.warn).
  [
    "../etc/passwd",
    { provider: null, model: null, isAlias: false, providerAlias: null, extendedContext: false },
  ],
  // Control char (NUL) — rejected. Built via fromCharCode so the escape can't be
  // mangled by tooling; a literal "model null" (space) is NOT rejected and must
  // remain an exact-model-id hit.
  [
    `model${String.fromCharCode(0)}null`,
    { provider: null, model: null, isAlias: false, providerAlias: null, extendedContext: false },
  ],
  [
    "openrouter/openai/gpt-4o",
    {
      provider: "openrouter",
      model: "openai/gpt-4o",
      isAlias: false,
      providerAlias: "openrouter",
      extendedContext: false,
    },
  ],
  [
    "  spaced/model  ",
    {
      provider: "spaced",
      model: "model",
      isAlias: false,
      providerAlias: "spaced",
      extendedContext: false,
    },
  ],
];

test("parseModel routing behavior is unchanged after the logging fix", () => {
  for (const [input, expected] of CASES) {
    const got = parseModel(input);
    assert.deepEqual(got, expected, `parseModel(${JSON.stringify(input)}) changed`);
  }
});

test("security rejection paths still reject (malformed model string)", () => {
  // These exercise the log.warn branch; the rejection must be intact.
  assert.equal(parseModel("../etc/passwd").model, null);
  assert.equal(parseModel(`model${String.fromCharCode(0)}null`).model, null);
  assert.equal(parseModel("").provider, null);
  assert.equal(parseModel(null).provider, null);
  assert.equal(parseModel(undefined).provider, null);
});
