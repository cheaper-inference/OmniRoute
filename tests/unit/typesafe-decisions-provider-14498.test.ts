// #14498 — TypeSafe (Jev) is a decisions-only provider.
//
// The public POST /v1/systemone route, its handler and the `typesafe` credential
// already live on the release tip (#17994 / #15278). This PR keeps the provider
// half that the tip still lacked: chat dispatch and chat-model classification
// must never select TypeSafe, and Jev usage has a default price.
import assert from "node:assert/strict";
import test from "node:test";

import { getExecutor } from "../../open-sse/executors/index.ts";
import {
  DECISIONS_ONLY_PROVIDER_IDS,
  isDecisionsOnlyProvider,
} from "../../open-sse/config/decisionsProviders.ts";
import { TYPESAFE_SYSTEMONE_PROVIDER_ID } from "../../open-sse/config/systemOneRegistry.ts";
import {
  filterChatSelectableModels,
  getModelEndpointDecision,
  isChatSelectableModel,
} from "../../open-sse/services/modelEndpointPolicy.ts";
import { DEFAULT_PRICING_INFERENCE } from "../../src/shared/constants/pricing/inference-hosts.ts";

test("TypeSafe cannot fall through to the default chat executor", async () => {
  // Without the guard getExecutor() returns DefaultExecutor("typesafe"), which
  // has no PROVIDERS entry and falls back to the OpenAI endpoint with the
  // TypeSafe key.
  await assert.rejects(getExecutor("typesafe"), (error: Error & { status?: number }) => {
    assert.equal(error.status, 400);
    assert.match(error.message, /System One/);
    assert.match(error.message, /\/v1\/systemone/);
    return true;
  });
});

test("decisions-only provider set is keyed on the System One provider id", () => {
  assert.deepEqual([...DECISIONS_ONLY_PROVIDER_IDS], [TYPESAFE_SYSTEMONE_PROVIDER_ID]);
  assert.equal(isDecisionsOnlyProvider(" TypeSafe "), true);
  assert.equal(isDecisionsOnlyProvider("openai"), false);
  assert.equal(isDecisionsOnlyProvider(null), false);
  assert.equal(isDecisionsOnlyProvider(undefined), false);
});

test("TypeSafe models are never chat-selectable, even with a stored chat default", () => {
  const decision = getModelEndpointDecision("typesafe", "jev-latest");
  assert.deepEqual(decision, {
    kind: "non-chat",
    chatSelectable: false,
    reason: "provider-policy",
  });
  assert.equal(
    isChatSelectableModel("TypeSafe", { id: "jev-preview", supportedEndpoints: ["chat"] }),
    false
  );
  assert.deepEqual(
    filterChatSelectableModels("typesafe", [
      { id: "jev-latest" },
      { id: "jev-1.13.0", supportedEndpoints: ["chat"] },
    ]),
    []
  );
  // Other providers keep their existing classification.
  assert.equal(isChatSelectableModel("openai", { id: "gpt-4o" }), true);
  assert.equal(getModelEndpointDecision("openrouter", "openai/gpt-4o").chatSelectable, true);
});

test("Jev aliases carry the input-only default price", () => {
  const table = DEFAULT_PRICING_INFERENCE as Record<
    string,
    Record<string, { input: number; output: number }>
  >;
  for (const modelId of ["jev-latest", "jev-preview", "jev-1.13.0"]) {
    const price = table.typesafe?.[modelId];
    assert.ok(price, `pricing for ${modelId}`);
    assert.equal(price.input, 0.042);
    assert.equal(price.output, 0);
  }
});
