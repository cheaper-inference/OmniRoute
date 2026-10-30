import assert from "node:assert/strict";
import test from "node:test";

import {
  getImageModelEntry,
  modalitiesRequireImageInput,
  parseImageModel,
} from "../../open-sse/config/imageRegistry.ts";

test("unknown modality payloads retain the text-only fallback", () => {
  const inputs: unknown[] = [
    undefined,
    null,
    "image",
    1,
    false,
    { 0: "image", length: 1 },
    { includes: () => true },
    new Set(["image"]),
  ];
  for (const input of inputs) {
    assert.equal(modalitiesRequireImageInput(input), false);
  }
  const editOnly: readonly string[] = ["image"];
  assert.equal(modalitiesRequireImageInput(editOnly), true);
  assert.equal(modalitiesRequireImageInput(["text", "image"]), false);
  assert.equal(modalitiesRequireImageInput([]), false);
});

test("image aliases resolve within an explicit provider boundary", () => {
  assert.deepEqual(parseImageModel("flux-2-max"), {
    provider: "black-forest-labs",
    model: "flux-2-max",
  });
  assert.deepEqual(parseImageModel("fal-ai/flux-2-max"), {
    provider: "fal-ai",
    model: "flux-2-max",
  });
  assert.deepEqual(parseImageModel("antigravity/gemini-3.1-flash-image-preview"), {
    provider: "antigravity",
    model: "gemini-3.1-flash-image",
  });
});

test("empty model inputs and unknown models retain their unresolved results", () => {
  for (const input of [undefined, null, ""]) {
    assert.deepEqual(parseImageModel(input), { provider: null, model: null });
    assert.equal(getImageModelEntry(input), null);
  }
  assert.deepEqual(parseImageModel("unknown-provider/unknown-model"), {
    provider: null,
    model: "unknown-provider/unknown-model",
  });
  assert.equal(getImageModelEntry("unknown-provider/unknown-model"), null);
});

test("alias metadata preserves optional image input and explicit edit requirements", () => {
  const alias = getImageModelEntry("flux-kontext");
  assert.ok(alias);
  assert.equal(alias.provider, "black-forest-labs");
  assert.equal(alias.model, "flux-kontext-pro");
  assert.deepEqual(alias.inputModalities, ["text", "image"]);
  assert.equal(Boolean(alias.imageRequired), false);

  const edit = getImageModelEntry("stability-ai/inpaint");
  assert.ok(edit);
  assert.deepEqual(edit.inputModalities, ["text", "image"]);
  assert.equal(edit.imageRequired, true);
});
