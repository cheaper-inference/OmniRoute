import assert from "node:assert/strict";
import test from "node:test";
import { nextFallback, stripRunPrefix, type TierMap } from "../src/askgate.ts";

const tiers: TierMap = new Map([
  ["claude-opus-4-8", 75],
  ["claude-opus-4-6", 25],
  ["claude-sonnet-4-6", 15],
  ["gpt-5.6-sol", 30],
]);

const ask = async () => "allow" as const;

test("default path stays in family and never steps upward", async () => {
  const result = await nextFallback({
    requestedModelId: "claude-opus-4-8",
    tiers,
    ask,
    candidates: [
      { modelId: "claude-sonnet-4-6" },
      { modelId: "gpt-5.6-sol", crossFamily: true },
    ],
  });
  assert.equal("modelId" in result && result.modelId, "claude-sonnet-4-6");
});

test("a missing consent header strips cross-family and stops", async () => {
  const result = await nextFallback({
    requestedModelId: "claude-opus-4-8",
    tiers,
    ask,
    candidates: [{ modelId: "gpt-5.6-sol", crossFamily: true }],
  });
  assert.equal(result.modelId, null);
  assert.equal("cross_family_consent" in result && result.cross_family_consent, false);
  assert.match(result.line, /Stopped on claude-opus-4-8/);
});

test("consent still asks before a cross-family step", async () => {
  const seen: string[] = [];
  const result = await nextFallback({
    requestedModelId: "claude-opus-4-8",
    tiers,
    headers: { "x-open-design-cross-family": "1" },
    candidates: [{ modelId: "gpt-5.6-sol", crossFamily: true }],
    ask: (candidate) => {
      seen.push(candidate.modelId);
      return "deny";
    },
  });
  assert.deepEqual(seen, ["gpt-5.6-sol"]);
  assert.equal(result.modelId, null);
});

test("a deny stops on the requested model", async () => {
  const result = await nextFallback({
    requestedModelId: "claude-opus-4-8",
    tiers,
    candidates: [{ modelId: "claude-sonnet-4-6" }],
    ask: () => "deny",
  });
  assert.equal(result.modelId, null);
  assert.match(result.line, /Stopped on claude-opus-4-8/);
});

test("upward promotion is blocked even when the ask would allow it", async () => {
  const result = await nextFallback({
    requestedModelId: "claude-sonnet-4-6",
    tiers,
    candidates: [{ modelId: "claude-opus-4-8" }],
    ask,
  });
  assert.equal(result.modelId, null);
});

test("same-model retry happens once and only when nothing in family qualifies", async () => {
  let calls = 0;
  const result = await nextFallback({
    requestedModelId: "claude-opus-4-8",
    tiers,
    candidates: [
      { modelId: "claude-opus-4-8", sameModel: true },
      { modelId: "claude-opus-4-8", sameModel: true },
    ],
    ask: () => {
      calls += 1;
      return "allow";
    },
  });
  assert.equal(calls, 1);
  assert.equal("modelId" in result && result.modelId, "claude-opus-4-8");
});

test("a model with no tier entry is not an in-family candidate", async () => {
  const result = await nextFallback({
    requestedModelId: "claude-opus-4-8",
    tiers,
    candidates: [{ modelId: "claude-mystery" }],
    ask,
  });
  assert.equal(result.modelId, null);
});

test("cpa run prefixes are stripped before the family check", () => {
  assert.equal(stripRunPrefix("cpa-base/claude-opus-4-8"), "claude-opus-4-8");
  assert.equal(stripRunPrefix("cpa-fast/gpt-5.6-sol"), "gpt-5.6-sol");
  assert.equal(stripRunPrefix("cpa-deep:claude-sonnet-4-6"), "claude-sonnet-4-6");
});
