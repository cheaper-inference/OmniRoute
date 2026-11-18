import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCIMixedMedia } from "../../open-sse/utils/ciMixedMedia.ts";
import { detectMediaParts } from "../../open-sse/utils/mediaParts.ts";
import { CheaperInferenceExecutor } from "../../open-sse/executors/cheaperinference.ts";

const parts = [
  {
    type: "file",
    file: { filename: "report.pdf", file_data: "data:application/pdf;base64,JVBERfixture" },
  },
  { type: "input_audio", input_audio: { data: "audio-bytes", format: "wav" } },
  { type: "video_url", video_url: { url: "data:video/mp4;base64,video-bytes" } },
  { type: "image_url", image_url: { url: "data:image/png;base64,image-bytes" } },
];
const body = (content: unknown[]) => ({
  messages: [
    { role: "user", content },
    { role: "user", content: "continue" },
  ],
});

test("mixed CI Chat uses typed files without changing media bytes or the original request", () => {
  const original = body(parts);
  const before = JSON.stringify(original);
  const result = normalizeCIMixedMedia(original) as ReturnType<typeof body>;
  const content = result.messages[0].content as typeof parts;
  assert.deepEqual(content[0], parts[0]);
  assert.equal(content[1].file?.file_data, "data:audio/wav;base64,audio-bytes");
  assert.equal(content[2].file?.file_data, parts[2].video_url?.url);
  assert.deepEqual(content[3], parts[3]);
  assert.equal(JSON.stringify(original), before);
  assert.deepEqual(
    new Set(detectMediaParts(result.messages).map((part) => part.kind)),
    new Set(["document", "audio", "video", "image"])
  );
});
test("single-modality requests retain their proven carriers", () => {
  for (const part of parts) {
    const original = body([part]);
    assert.equal(normalizeCIMixedMedia(original), original);
  }
});
test("unknown audio formats are left for validation rather than assigned a MIME type", () => {
  const original = body([
    parts[0],
    { type: "input_audio", input_audio: { data: "fixture", format: "constructor" } },
  ]);
  assert.deepEqual(normalizeCIMixedMedia(original), original);
});
test("remote URLs, behavioral metadata and tool declarations are preserved", () => {
  const remote = {
    type: "video_url",
    video_url: { url: "https://example.com/video.mp4?signature=fixture" },
  };
  const sampled = {
    type: "video_url",
    video_url: { url: "data:video/mp4;base64,fixture", fps: 2 },
  };
  const tools = [{ example: parts[1] }];
  const original = { ...body([parts[0], remote, sampled]), tools };
  const result = normalizeCIMixedMedia(original) as typeof original;
  assert.deepEqual(result.messages[0].content, original.messages[0].content);
  assert.equal(result.tools, tools);
});
test("CI executor applies mixed inline normalization to Chat requests", () => {
  const result = new CheaperInferenceExecutor().transformRequest(
    "gemini-4-argon",
    body(parts),
    false,
    { apiKey: "fixture" }
  ) as ReturnType<typeof body>;
  assert.equal(
    (result.messages[0].content as typeof parts)[2].file?.file_data,
    parts[2].video_url?.url
  );
});
