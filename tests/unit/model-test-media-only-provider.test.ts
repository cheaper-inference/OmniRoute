/**
 * #18682: Leonardo and Ideogram have no chat API, but their chat-registry entries (kept so the
 * provider page and connections work) list their image models. isImageOnlyModel treated
 * any image model also present in the chat catalog as chat-capable, so the dashboard
 * model Test sent `leonardo/phoenix` a chat completion (Leonardo: 404 "Endpoint not
 * found") and /v1/chat/completions forwarded it upstream instead of rejecting it.
 */

import assert from "node:assert/strict";
import test from "node:test";

const { isImageOnlyModel, IMAGE_PROVIDERS, getImageProvider } =
  await import("../../open-sse/config/imageRegistry.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { detectTestKind } = await import("../../src/lib/api/modelTestRunner.ts");

test("Leonardo and Ideogram image models are image-only despite their chat-registry rows", () => {
  for (const model of ["leonardo/phoenix", "leonardo/sdxl", "ideogram/V_3", "ideogram/V_2A"]) {
    assert.equal(isImageOnlyModel(model), true, model);
  }
});

test("the dashboard model test skips a Leonardo image model instead of sending it a chat", () => {
  assert.equal(detectTestKind("leonardo/phoenix", null, undefined).isNonChatGeneration, true);
});

test("a provider whose chat catalog also serves chat keeps its image models chat-capable", () => {
  assert.equal(isImageOnlyModel("agnes/agnes-2.5-flash"), false);
  assert.equal(isImageOnlyModel("openai/gpt-4o"), false);
});

test("only providers whose whole chat catalog is image models change classification", () => {
  const changed = new Set<string>();
  for (const [providerId, provider] of Object.entries(IMAGE_PROVIDERS)) {
    const chatIds = new Set(getModelsByProviderId(providerId).map((m: { id: string }) => m.id));
    for (const model of (provider as { models: Array<{ id: string }> }).models) {
      const before = !chatIds.has(model.id);
      if (isImageOnlyModel(`${providerId}/${model.id}`) !== before) changed.add(providerId);
    }
  }
  assert.deepEqual([...changed].sort(), ["ideogram", "leonardo"]);
  assert.ok(getImageProvider("leonardo"));
});
