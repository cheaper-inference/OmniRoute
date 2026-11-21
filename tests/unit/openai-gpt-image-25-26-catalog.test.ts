import test from "node:test";
import assert from "node:assert/strict";

// OpenAI's image generation guide and model pages list gpt-image-2.5-flare,
// gpt-image-2.5-sunburst, gpt-image-2.6-flare and gpt-image-2.6-sunburst. The Codex and
// OpenRouter image providers already carry them; the direct openai provider did not.
// The vendor pages do not list a plain gpt-image-2.5 or gpt-image-2.6 id.

const { getImageProvider, getImageModelEntry } =
  await import("../../open-sse/config/imageRegistry.ts");

const IDS = [
  "gpt-image-2.5-flare",
  "gpt-image-2.5-sunburst",
  "gpt-image-2.6-flare",
  "gpt-image-2.6-sunburst",
];
const VENDOR_SIZES = ["1024x1024", "1536x1024", "1024x1536"];

test("the openai image provider lists the GPT Image 2.5 and 2.6 Flare and Sunburst ids", () => {
  const models = getImageProvider("openai")?.models ?? [];
  const ids = models.map((model) => model.id);
  for (const id of IDS) assert.ok(ids.includes(id), `${id} missing, got: ${ids.join(", ")}`);
  assert.equal(ids.includes("gpt-image-2.5"), false, "no vendor id for a plain gpt-image-2.5");
  assert.equal(ids.includes("gpt-image-2.6"), false, "no vendor id for a plain gpt-image-2.6");
});

test("getImageModelEntry resolves openai/gpt-image-2.5-flare and the other new ids", () => {
  for (const id of IDS) {
    const entry = getImageModelEntry(`openai/${id}`);
    assert.equal(entry?.provider, "openai", id);
    assert.equal(entry?.model, id, id);
  }
});

test("the new openai image ids declare the vendor's recommended sizes, not the DALL-E 3 list", () => {
  const models = getImageProvider("openai")?.models ?? [];
  for (const id of IDS) {
    const model = models.find((entry) => entry.id === id);
    assert.deepEqual(model?.supportedSizes, VENDOR_SIZES, id);
  }
});
