import test from "node:test";
import assert from "node:assert/strict";
import { visibleCodexModels } from "../../src/shared/constants/codexVariantVisibility.ts";
test("provider view keeps the native base and any standalone suffixed model", () => {
  const rows = ["gpt-6.2-sol", "gpt-6.2-sol-high", "gpt-6.2-sol-ultra", "standalone-max"].map(
    (id) => ({ id })
  );
  assert.deepEqual(visibleCodexModels(rows, true), [rows[0], rows[3]]);
});
test("catalog handles both Codex prefixes without changing combos or other providers", () => {
  const rows = ["cx/base", "cx/base-low", "codex/base", "codex/base(max)"].map((id) => ({
    id,
    owned_by: "codex",
  }));
  const combo = { id: "base-high", owned_by: "combo" };
  assert.deepEqual(visibleCodexModels([...rows, combo]), [rows[0], rows[2], combo]);
});
