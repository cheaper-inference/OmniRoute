/**
 * #17188: combo selection must use the gateway's model field, not the
 * ignored x-combo body extension. These cases are dependency-free and guard
 * the shared contract used by MCP route_request and A2A smart-routing.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveRequestedComboModel } from "../../open-sse/utils/resolveRequestedComboModel.ts";
import { resolveA2AComboAttribution } from "../../src/lib/a2a/resolveComboAttribution.ts";

test("no combo preserves the caller's model without changing its spelling", () => {
  const model = "gemini/gemini-2.5-pro";
  assert.deepEqual(resolveRequestedComboModel(model, undefined), {
    model,
    requestedCombo: null,
  });
  assert.deepEqual(resolveRequestedComboModel(model, null), {
    model,
    requestedCombo: null,
  });
});

test("a requested combo replaces the model passed to the gateway", () => {
  assert.deepEqual(resolveRequestedComboModel("openai/gpt-6", "  Coding Team [1m]  "), {
    model: "Coding Team [1m]",
    requestedCombo: "Coding Team [1m]",
  });
  assert.deepEqual(resolveRequestedComboModel("auto", "combo/nested-chain"), {
    model: "combo/nested-chain",
    requestedCombo: "combo/nested-chain",
  });
  assert.deepEqual(resolveRequestedComboModel("auto", "uuid-of-stored-combo"), {
    model: "uuid-of-stored-combo",
    requestedCombo: "uuid-of-stored-combo",
  });
});

test("malformed combo requests are rejected instead of silently falling back", () => {
  for (const invalid of ["", "   ", 123, true, [], {}, { name: "combo" }]) {
    assert.throws(
      () => resolveRequestedComboModel("fallback", invalid),
      /combo must be a non-empty string/
    );
  }
});

test("A2A telemetry separates requested combos from confirmed execution", () => {
  assert.deepEqual(
    resolveA2AComboAttribution({ requested_combo: " Team A ", confirmed_combo: null }),
    { comboId: "default", requestedCombo: "Team A" }
  );
  assert.deepEqual(
    resolveA2AComboAttribution({ requested_combo: "Team A", confirmed_combo: "Team B" }),
    { comboId: "Team B", requestedCombo: "Team A" }
  );
  assert.deepEqual(resolveA2AComboAttribution({}), {
    comboId: "default",
    requestedCombo: null,
  });
  assert.deepEqual(resolveA2AComboAttribution({ requested_combo: 5, confirmed_combo: {} }), {
    comboId: "default",
    requestedCombo: null,
  });
});
