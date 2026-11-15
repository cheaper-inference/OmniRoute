import test from "node:test";
import assert from "node:assert/strict";
import { runNonStreamingProviderLeg } from "../../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { sumBuyerCostMicro } from "../../../open-sse/utils/buyerCostMicro.ts";
import { baseInput, makeExecutorResult } from "../_helpers/nonStreamingProviderLegFixtures.ts";

function emptyBody(cost: unknown) {
  return {
    choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 1, completion_tokens: 0, buyer_cost_micro: cost },
  };
}

for (const policy of ["follow-up", "disabled", "no-family", "fallback-throws"] as const) {
  for (const cost of [17, 0, undefined, null, "17", -1]) {
    test(`${policy} empty receipt retains raw charge ${String(cost)}`, async () => {
      let calls = 0;
      const result = await runNonStreamingProviderLeg(
        baseInput({
          phase: policy === "follow-up" ? "follow-up" : "initial",
          allowModelFallback: policy !== "disabled",
          provider: policy === "fallback-throws" ? "gemini" : "openai",
          model: policy === "fallback-throws" ? "gemini-3-pro" : "no-family-fixture",
          clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
          executeProviderRequest: async () => {
            if (++calls > 1) throw new Error("fallback unavailable");
            return makeExecutorResult(emptyBody(cost));
          },
        })
      );
      assert.equal(calls, policy === "fallback-throws" ? 2 : 1);
      assert.equal(result.kind, "error");
      assert.equal(result.receipt.errorType, "empty_content");
      const expected = typeof cost === "number" && cost >= 0 ? cost : null;
      assert.equal(result.receipt.buyerCostMicro, expected);
      assert.equal(result.buyerCostMicro ?? null, expected);
      assert.equal(
        sumBuyerCostMicro([{ buyerCostMicro: 23 }, result.receipt]),
        expected === null ? null : 23 + expected
      );
    });
  }
}

for (const cost of [9, 0, undefined, "9"]) {
  test(`failed fallback uses its own charge ${String(cost)}, not the empty original`, async () => {
    let calls = 0;
    const fallbackSelection = { current: null };
    const result = await runNonStreamingProviderLeg(
      baseInput({
        provider: "gemini",
        model: "gemini-3-pro",
        clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
        executeProviderRequest: async () =>
          ++calls === 1
            ? makeExecutorResult(emptyBody(17))
            : {
                ...makeExecutorResult(
                  { error: { message: "unavailable" }, usage: { buyer_cost_micro: cost } },
                  503
                ),
                upstreamHttpSelection: fallbackSelection,
              },
      })
    );
    assert.equal(calls, 2);
    assert.equal(result.kind, "error");
    assert.equal(result.upstreamHttpSelection, fallbackSelection);
    assert.notEqual(result.receipt.model, "gemini-3-pro");
    const expected = typeof cost === "number" ? cost : null;
    assert.equal(result.receipt.buyerCostMicro, expected);
    assert.equal(result.buyerCostMicro ?? null, expected);
  });
}

for (const status of [200, 503]) {
  test(`unparseable fallback (${status}) never inherits the original charge`, async () => {
    let calls = 0;
    const result = await runNonStreamingProviderLeg(
      baseInput({
        provider: "gemini",
        model: "gemini-3-pro",
        clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
        executeProviderRequest: async () =>
          ++calls === 1
            ? makeExecutorResult(emptyBody(17))
            : makeExecutorResult("not-json", status),
      })
    );
    assert.equal(calls, 2);
    assert.equal(result.kind, "error");
    assert.notEqual(result.receipt.model, "gemini-3-pro");
    assert.equal(result.receipt.buyerCostMicro, null);
    assert.equal(result.buyerCostMicro ?? null, null);
    assert.equal(sumBuyerCostMicro([{ buyerCostMicro: 23 }, result.receipt]), null);
  });
}
