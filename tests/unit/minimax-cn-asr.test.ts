import assert from "node:assert/strict";
import test from "node:test";
import { handleAudioTranscription } from "../../open-sse/handlers/audioTranscription.ts";

test("MiniMax CN ASR strips the provider prefix and moves the language hint to a header", async (t) => {
  const upstream = t.mock.method(globalThis, "fetch", async (address, options) => {
    assert.equal(address, "https://api.minimax.cn/v1/speech_to_text");
    assert.equal(new Headers(options.headers).get("authorization"), "Bearer test-key");
    assert.equal(new Headers(options.headers).get("language"), "zh");
    const form = await new Request(address, options).formData();
    assert.equal(form.get("model"), "asr-1.0");
    assert.equal(form.has("language"), false);
    const file = form.get("file");
    assert.ok(file instanceof File);
    assert.equal(file.name, "test.mp3");
    assert.equal(await file.text(), "fixture");
    return Response.json({ text: "你好", duration: 1.2 });
  });
  const formData = new FormData();
  formData.set("file", new File(["fixture"], "test.mp3", { type: "audio/mpeg" }));
  formData.set("model", "minimax-cn/asr-1.0");
  formData.set("language", "zh");
  const response = await handleAudioTranscription({
    formData,
    credentials: { apiKey: "test-key" },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { text: "你好", duration: 1.2 });
  assert.equal(upstream.mock.callCount(), 1);
});

test("MiniMax CN ASR rejects an invalid language before uploading the recording", async (t) => {
  const upstream = t.mock.method(globalThis, "fetch");
  const formData = new FormData();
  formData.set("file", new File(["fixture"], "test.mp3"));
  formData.set("model", "minimax-cn/asr-1.0");
  formData.set("language", "zh\r\ninvalid");
  const response = await handleAudioTranscription({
    formData,
    credentials: { apiKey: "test-key" },
  });
  assert.equal(response.status, 400);
  assert.equal(upstream.mock.callCount(), 0);
});
