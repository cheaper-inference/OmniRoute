/**
 * MiniMax M3.1 Flash (#18110): registered in both official MiniMax registries after M3
 * (the first entry is the provider default), with the graduated effort vocabulary up to
 * max, and priced from https://platform.minimax.io/docs/guides/pricing.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

describe("MiniMax M3.1 Flash registry entries", () => {
  for (const providerId of ["minimax", "minimax-cn"]) {
    it(`${providerId} lists MiniMax-M3.1-Flash right after the default MiniMax-M3`, () => {
      const ids = REGISTRY[providerId].models.map((m) => m.id);
      assert.equal(ids[0], "MiniMax-M3");
      assert.equal(ids[1], "MiniMax-M3.1-Flash");
    });

    it(`${providerId} declares the M3.1 Flash capabilities`, () => {
      const flash = REGISTRY[providerId].models.find((m) => m.id === "MiniMax-M3.1-Flash");
      assert.ok(flash);
      assert.equal(flash.name, "MiniMax M3.1 Flash");
      assert.equal(flash.contextLength, 1_000_000);
      assert.equal(flash.supportsReasoning, true);
      assert.equal(flash.supportsVision, true);
      assert.equal(flash.supportsVideo, true);
      assert.equal(flash.supportsXHighEffort, true);
      assert.deepEqual(flash.supportedThinkingEfforts, ["low", "medium", "high", "xhigh", "max"]);
    });

    it(`${providerId} leaves the existing MiniMax-M3 entry untouched`, () => {
      const m3 = REGISTRY[providerId].models.find((m) => m.id === "MiniMax-M3");
      assert.ok(m3);
      assert.equal(m3.contextLength, 1_048_576);
      assert.equal(m3.supportsVideo, undefined);
      assert.equal(m3.supportedThinkingEfforts, undefined);
    });
  }
});

describe("MiniMax M3.1 Flash reasoning effort", () => {
  const effortOf = (model: string, effort: string) =>
    (
      sanitizeReasoningEffortForProvider({ model, reasoning_effort: effort }, "minimax", model) as {
        reasoning_effort?: string;
      }
    ).reasoning_effort;

  for (const model of ["MiniMax-M3.1-Flash", "minimax/minimax-m3.1-flash"]) {
    it(`${model} keeps xhigh and max`, () => {
      assert.equal(effortOf(model, "xhigh"), "xhigh");
      assert.equal(effortOf(model, "max"), "max");
      assert.equal(effortOf(model, "medium"), "medium");
    });

    it(`${model} clamps the undeclared ultra to its max ceiling`, () => {
      assert.equal(effortOf(model, "ultra"), "max");
    });
  }

  for (const model of ["MiniMax-M3", "minimax-m2.7"]) {
    it(`${model} still clamps xhigh, max and ultra to high`, () => {
      assert.equal(effortOf(model, "xhigh"), "high");
      assert.equal(effortOf(model, "max"), "high");
      assert.equal(effortOf(model, "ultra"), "high");
    });
  }
});

describe("MiniMax M3.1 Flash pricing", () => {
  it("prices M3.1 Flash under the canonical id and its lowercase alias", () => {
    const pricing = getDefaultPricing();
    for (const key of ["MiniMax-M3.1-Flash", "minimax-m3.1-flash"]) {
      assert.equal(pricing.minimax[key].input, 0.15, `${key} input`);
      assert.equal(pricing.minimax[key].output, 0.6, `${key} output`);
      assert.equal(pricing.minimax[key].cached, 0.015, `${key} cached`);
    }
  });
});
