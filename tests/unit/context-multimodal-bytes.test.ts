import test from "node:test";
import assert from "node:assert/strict";
import { estimateTokens, pruneOlderInlineImages } from "../../open-sse/services/contextManager.ts";

test("audio/video base64 size does not become text context or disqualify large uploads", () => {
  for (const content of [
    { type: "video_url", video_url: { url: "data:video/mp4;base64," + "A".repeat(8_000_000) } },
    { type: "input_audio", input_audio: { data: "A".repeat(8_000_000), format: "wav" } },
  ]) {
    assert.ok(estimateTokens([{ role: "user", content: [content] }]) < 5000);
  }
  assert.ok(estimateTokens([{ role: "user", content: "A".repeat(8_000_000) }]) > 1_000_000);
});
test("image pruning retains Gemini PDF/audio/video blocks", () => {
  const content = ["application/pdf", "audio/wav", "video/mp4"].map((mimeType) => ({
    inlineData: { mimeType, data: "fixture" },
  }));
  const original = [{ role: "user", content }];
  const result = pruneOlderInlineImages(original, { keepLatest: 0 });
  assert.equal(result.pruned, 0);
  assert.deepEqual(result.messages, original);
});
