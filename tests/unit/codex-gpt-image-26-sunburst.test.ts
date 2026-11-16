import test from "node:test";
import assert from "node:assert/strict";
import {
  getImageModelEntry,
  parseImageModel,
  getAllImageModels,
} from "../../open-sse/config/imageRegistry.ts";
import { CODEX_IMAGE_PROVIDER } from "../../open-sse/config/providers/registry/codex/imageModels.ts";

test("CODEX_IMAGE_PROVIDER registers gpt-image-2.6-sunburst", () => {
  const modelEntry = CODEX_IMAGE_PROVIDER.models.find((m) => m.id === "gpt-image-2.6-sunburst");
  assert.ok(modelEntry, "gpt-image-2.6-sunburst must be present in CODEX_IMAGE_PROVIDER.models");
  assert.equal(modelEntry?.name, "GPT Image 2.6 Sunburst (Codex)");
});

test("getImageModelEntry resolves cx/gpt-image-2.6-sunburst and codex/gpt-image-2.6-sunburst", () => {
  for (const modelStr of ["cx/gpt-image-2.6-sunburst", "codex/gpt-image-2.6-sunburst"]) {
    const entry = getImageModelEntry(modelStr);
    assert.ok(entry, `expected getImageModelEntry to resolve ${modelStr}`);
    assert.equal(entry?.provider, "codex");
    assert.equal(entry?.model, "gpt-image-2.6-sunburst");
  }
});

test("parseImageModel resolves cx/gpt-image-2.6-sunburst to codex provider", () => {
  const parsed = parseImageModel("cx/gpt-image-2.6-sunburst");
  assert.deepEqual(parsed, { provider: "codex", model: "gpt-image-2.6-sunburst" });
});

test("getAllImageModels includes codex/gpt-image-2.6-sunburst", () => {
  const allCodex = getAllImageModels()
    .filter((m) => m.provider === "codex")
    .map((m) => m.id);
  assert.ok(
    allCodex.includes("codex/gpt-image-2.6-sunburst"),
    "codex/gpt-image-2.6-sunburst must be present in getAllImageModels"
  );
});
