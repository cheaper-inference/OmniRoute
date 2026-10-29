import test from "node:test";
import assert from "node:assert/strict";

import { nvidiaProvider } from "../../open-sse/config/providers/registry/nvidia/index.ts";

const EXPECTED_MODEL_IDS = [
  "meta/muse-glimmer-30b",
  "poolside/laguna-xs-2.1",
  "google/gemma-4-31b-it",
  "google/diffusiongemma-26b-a4b-it",
  "nvidia/nemotron-3-ultra-550b-a55b",
  "nvidia/nemotron-3.5-super-vl-120b-a12b",
  "nvidia/nemotron-3.5-lightning-30b-a3b",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
] as const;

test("NVIDIA NIM registry exactly matches the current hosted-model catalog", () => {
  assert.deepEqual(
    nvidiaProvider.models.map((model) => model.id),
    EXPECTED_MODEL_IDS
  );
});

test("NVIDIA NIM registry preserves known model capabilities", () => {
  const byId = new Map(nvidiaProvider.models.map((model) => [model.id, model]));

  for (const id of ["nvidia/nemotron-3-nano-omni-30b-a3b-reasoning"]) {
    assert.equal(byId.get(id)?.supportsReasoning, true, `${id} must support reasoning`);
  }

  const omni = byId.get("nvidia/nemotron-3-nano-omni-30b-a3b-reasoning");
  assert.equal(omni?.supportsVision, true, "Nemotron 3 Nano Omni must support vision");

  // The emergency fallback default since #18418 (it replaced openai/gpt-oss-120b).
  assert.equal(
    byId.get("nvidia/nemotron-3.5-super-vl-120b-a12b")?.supportsVision,
    true,
    "Nemotron 3.5 Super VL must support vision"
  );
});
