import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";

// Refreshed 2026-10-20 against the live OpenCode Zen sources:
//   - served IDs:  https://opencode.ai/zen/v1/models
//   - $0 pricing:  https://opencode.ai/docs/zen/
// Only IDs present in BOTH sources are catalogued (the free set rotates:
// "free for a limited time"). This test pins that intersection so a silent
// drift in the data file is caught.

const EXPECTED_FREE_IDS = [
  "opencode/big-pickle",
  "opencode/beam-free",
  "opencode/mimo-v2.6-flash-free",
  "opencode/nemotron-3.5-super-vl-free",
  "opencode/nemotron-3.5-lightning-free",
  "opencode/jev-1.13-free",
  "opencode/longcat-2.5-preview-free",
  "opencode/deepseek-v4.1-flash-free",
  "opencode/glm-5.3-flash-free",
  "opencode/minimax-m3.1-flash-free",
];

// Dropped 2026-10-20 — gone from the served /zen/v1/models endpoint.
const REMOVED_IDS = [
  "opencode/nemotron-3-super-free",
  "opencode/mimo-v2.5-free",
  "opencode/north-mini-code-free",
  "opencode/nemotron-3-ultra-free",
];

describe("OpenCode Zen free catalog refresh (2026-10-20)", () => {
  const rows = FREE_MODEL_BUDGETS.filter((r) => r.provider === "opencode-zen");

  it("lists exactly the verified current free model ids", () => {
    const ids = rows.map((r) => r.modelId).sort();
    assert.deepEqual(ids, [...EXPECTED_FREE_IDS].sort());
  });

  it("keeps every free row on the recurring-uncapped opencode-zen-free pool", () => {
    for (const row of rows) {
      assert.equal(row.freeType, "recurring-uncapped", row.modelId);
      assert.equal(row.poolKey, "opencode-zen-free", row.modelId);
      assert.equal(row.tos, "caution", row.modelId);
      assert.equal(row.monthlyTokens, 0, row.modelId);
      assert.equal(row.creditTokens, 0, row.modelId);
    }
  });

  it("drops the ids that left the served endpoint", () => {
    const ids = new Set(rows.map((r) => r.modelId));
    for (const gone of REMOVED_IDS) {
      assert.equal(ids.has(gone), false, gone);
    }
  });
});
