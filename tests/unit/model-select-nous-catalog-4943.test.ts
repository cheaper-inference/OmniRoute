import test from "node:test";
import assert from "node:assert/strict";
import { filterChatSelectableModels } from "@omniroute/open-sse/services/modelEndpointPolicy.ts";
import { normalizeOpenAiLikeModelsResponse } from "@/app/api/providers/[id]/models/discovery/normalizers";
import { resetDbInstance } from "@/lib/db/core";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import { shouldFetchLiveModels } from "@/shared/components/modelSelectLiveProviders";

const provider = "nous-research";

test.after(() => resetDbInstance());

test("the selector requests the Nous catalog alongside its static models", () => {
  assert.equal(shouldFetchLiveModels(provider), true);
});

test("Nous discovery keeps image-input chat and excludes media-only rows from chat", () => {
  const response = {
    data: [
      { id: "Hermes-Vision", architecture: { modality: "text+image->text" } },
      { id: "Canvas", architecture: { modality: "text->image" } },
      { id: "Vector", output_modalities: ["embedding"] },
      { id: "Hermes-Next" },
    ],
  };
  const models = normalizeDiscoveredModels(
    normalizeOpenAiLikeModelsResponse(response, provider),
    provider
  );
  const chatModels = filterChatSelectableModels(provider, models);
  assert.deepEqual(
    chatModels.map(({ id, supportsVision }) => ({ id, supportsVision })),
    [
      { id: "Hermes-Vision", supportsVision: true },
      { id: "Hermes-Next", supportsVision: undefined },
    ]
  );
});

test("Nous discovery collapses qualified duplicates and preserves other namespaces", () => {
  const response = {
    data: [
      { id: "Hermes-4-70B" },
      { id: "nous/Hermes-4-70B" },
      { id: "nous-research/nous/Hermes-Next" },
      { id: "publisher/model" },
    ],
  };
  const models = normalizeDiscoveredModels(
    normalizeOpenAiLikeModelsResponse(response, provider),
    provider
  );
  assert.deepEqual(
    models.map((model) => model.id),
    ["Hermes-4-70B", "Hermes-Next", "publisher/model"]
  );
});
