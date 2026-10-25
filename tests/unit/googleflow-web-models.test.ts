import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeVideoModel,
  normalizeImageModel,
  normalizeVideoAspectRatio,
  normalizeImageAspectRatio,
  VIDEO_MODEL_MAP,
  IMAGE_MODEL_MAP,
} from "../../open-sse/executors/googleflow-web/flowClient.ts";

test("normalizeVideoModel: resolves active Flow video models from UI screenshot", () => {
  assert.equal(normalizeVideoModel("veo-3.1-quality"), "veo_3_1_quality");
  assert.equal(normalizeVideoModel("veo-3.1"), "veo_3_1_quality");
  assert.equal(normalizeVideoModel("veo-3.1-fast"), "veo_3_1_fast");
  assert.equal(normalizeVideoModel("veo-3.1-lite"), "veo_3_1_lite");
  assert.equal(normalizeVideoModel("omni-1.1-flash"), "omni_flash");
  assert.equal(normalizeVideoModel("googleflow-web/veo-3.1-fast"), "veo_3_1_fast");
  assert.equal(normalizeVideoModel("gflow/veo-3.1-quality"), "veo_3_1_quality");
});

test("normalizeVideoModel: defaults to veo_3_1_fast when undefined", () => {
  assert.equal(normalizeVideoModel(undefined), "veo_3_1_fast");
});

test("normalizeImageModel: resolves active Flow image models from UI screenshot", () => {
  assert.equal(normalizeImageModel("nano-banana-2.1"), "NARWHAL");
  assert.equal(normalizeImageModel("nano-banana-2"), "NARWHAL");
  assert.equal(normalizeImageModel("nano-banana-pro"), "GEM_PIX_2");
  assert.equal(normalizeImageModel("nano-banana-2-lite"), "HARBOR_SEAL");
  assert.equal(normalizeImageModel("omni-1.1-flash"), "omni_flash");
  assert.equal(normalizeImageModel("googleflow-web/nano-banana-pro"), "GEM_PIX_2");
});

test("normalizeVideoAspectRatio: accepts 16:9 and 9:16", () => {
  assert.equal(normalizeVideoAspectRatio("16:9"), "16:9");
  assert.equal(normalizeVideoAspectRatio("9:16"), "9:16");
  assert.equal(normalizeVideoAspectRatio("vertical"), "9:16");
  assert.equal(normalizeVideoAspectRatio("invalid"), "16:9");
});

test("normalizeImageAspectRatio: accepts 16:9, 4:3, 1:1, 3:4, 9:16", () => {
  assert.equal(normalizeImageAspectRatio("16:9"), "16:9");
  assert.equal(normalizeImageAspectRatio("4:3"), "4:3");
  assert.equal(normalizeImageAspectRatio("1:1"), "1:1");
  assert.equal(normalizeImageAspectRatio("3:4"), "3:4");
  assert.equal(normalizeImageAspectRatio("9:16"), "9:16");
  assert.equal(normalizeImageAspectRatio("unknown"), "16:9");
});
