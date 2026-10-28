// #16384 — `filterToOpenAIFormat` is the only sanitizer on the OpenAI→OpenAI
// chat-completions passthrough, but while it allowlists content-block TYPES it
// forwarded every unknown FIELD on a known-type block via `...rest`. A popular
// chat client stamps text parts with a compaction `message_id`; strict
// validators (Cerebras `400 property 'messages.2.user.message_id' is
// unsupported`, Mistral `422 extra_forbidden`, Groq) then reject the WHOLE
// request, and in a priority combo every strict target burns a 400/422. Same
// bug class as 9router#1157 (top-level `client_metadata`), one level deeper.
import test from "node:test";
import assert from "node:assert/strict";

const openaiHelper = await import("../../open-sse/translator/helpers/openaiHelper.ts");

test("unknown fields on a text part are stripped (#16384)", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "hello", message_id: "msg_01ABC", source: "compaction" }],
      },
    ],
  };

  const result = openaiHelper.filterToOpenAIFormat(body);

  assert.deepEqual(result.messages[0].content, [{ type: "text", text: "hello" }]);
});

test("unknown fields on image and audio parts are stripped, payload carriers survive", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: "https://x/y.png" }, message_id: "msg_2" },
          { type: "input_audio", input_audio: { data: "base64", format: "wav" }, extra: 1 },
        ],
      },
    ],
  };

  const result = openaiHelper.filterToOpenAIFormat(body);

  assert.deepEqual(result.messages[0].content, [
    { type: "image_url", image_url: { url: "https://x/y.png" } },
    { type: "input_audio", input_audio: { data: "base64", format: "wav" } },
  ]);
});

test("file/document part carriers the converter reads survive the allowlist", () => {
  // A file-typed block without a usable payload is converted to labelled text
  // from `file.content` — the conversion must keep working after the rebuild.
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "file", name: "notes.txt", content: "file body", message_id: "msg_3" },
          { type: "document", document: { url: "https://x/d.pdf" }, message_id: "msg_4" },
        ],
      },
    ],
  };

  const result = openaiHelper.filterToOpenAIFormat(body);

  assert.deepEqual(result.messages[0].content[0], { type: "text", text: "[notes.txt]\nfile body" });
  assert.deepEqual(result.messages[0].content[1], {
    type: "document",
    document: { url: "https://x/d.pdf" },
  });
});

test("cache_control survives only when preservation is requested (#2069 contract)", () => {
  const content = [
    { type: "text", text: "keep", cache_control: { type: "ephemeral" }, message_id: "m" },
  ];
  const stripped = openaiHelper.filterToOpenAIFormat({
    messages: [{ role: "user", content: structuredClone(content) }],
  });
  assert.deepEqual(stripped.messages[0].content, [{ type: "text", text: "keep" }]);

  const preserved = openaiHelper.filterToOpenAIFormat(
    { messages: [{ role: "user", content: structuredClone(content) }] },
    { preserveCacheControl: true }
  );
  assert.deepEqual(preserved.messages[0].content, [
    { type: "text", text: "keep", cache_control: { type: "ephemeral" } },
  ]);
});

test("signature stays stripped and moonshot video_url stays opt-in (no regression)", () => {
  // filterToOpenAIFormat mutates/reassigns body.messages — build a fresh body
  // per call.
  const videoBody = () => ({
    messages: [{ role: "user", content: [{ type: "video_url", video_url: "https://x/v" }] }],
  });
  // Without the opt-in the block is dropped and the emptied message is
  // filtered out entirely (pre-existing behavior).
  const withoutFlag = openaiHelper.filterToOpenAIFormat(videoBody());
  assert.equal(withoutFlag.messages.length, 0);

  const withFlag = openaiHelper.filterToOpenAIFormat(videoBody(), { preserveVideoUrl: true });
  assert.deepEqual(withFlag.messages[0].content, [{ type: "video_url", video_url: "https://x/v" }]);
});
