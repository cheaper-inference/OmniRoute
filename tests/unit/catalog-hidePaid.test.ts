/**
 * The catalog paid filter and the `auto/*` pool filter share one predicate:
 * a model stays listed only when its provider documents free models AND the
 * model itself qualifies as free.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decideHidePaid } from "../../src/app/api/v1/models/catalogPaidFilter.ts";

describe("catalog decideHidePaid", () => {
  it("keeps a catalog-free model on a free-tier provider listed", () => {
    assert.equal(decideHidePaid(true, "cerebras", "zai-glm-4.7"), false);
  });

  it("hides a paid model even when the payload claims it is free", () => {
    assert.equal(decideHidePaid(true, "openai", "gpt-4o", undefined, true), true);
  });

  it("lists everything when the paid filter is off", () => {
    assert.equal(decideHidePaid(false, "openai", "gpt-4o", undefined, true), false);
  });

  it("lists a catalog-free model that STRICT still excludes without hard-stop proof", async () => {
    // bluesminds/gpt-4o was retired in the November 2026 re-audit; api-airforce is still
    // catalog-free and publishes no hard-stop guarantee.
    assert.equal(decideHidePaid(true, "api-airforce", "x-ai/grok-3"), false);
    const { classifyStrictZeroCostCandidate, findBudgetEntry } =
      await import("../../open-sse/services/autoCombo/strictZeroCostFilter.ts");
    const candidate = {
      provider: "api-airforce",
      model: "x-ai/grok-3",
      connectionId: "c1",
      allowedConnectionIds: ["c1"],
    };
    const verdict = classifyStrictZeroCostCandidate(
      candidate,
      findBudgetEntry(candidate),
      () => null,
      {
        minRemainingAllowance: 1,
        maxStateAgeMs: 180_000,
      }
    );
    assert.equal(verdict.outcome, "no-hard-stop");
  });
});
