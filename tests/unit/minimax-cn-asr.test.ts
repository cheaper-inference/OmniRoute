import assert from "node:assert/strict";
import test from "node:test";
import { handleAudioTranscription } from "../../open-sse/handlers/audioTranscription.ts";
import {
  FfmpegNotFoundError,
  GeminiLiveError,
} from "../../open-sse/executors/geminiLiveTranscribe.ts";
import { webmConversionErrorResponse } from "../../open-sse/handlers/minimaxTranscription.ts";
import { selectAudioBridgeModel } from "../../src/lib/guardrails/audioBridgeHelpers.ts";

test("existing STT credentials retain automatic priority over MiniMax CN", async () => {
  const model = "minimax-cn/asr-1.0";
  const usable = async (id: string) => id === model || id === "gemini/gemini-3.5-transcribe-live";
  assert.equal(await selectAudioBridgeModel("auto", usable), "gemini/gemini-3.5-transcribe-live");
  assert.equal(await selectAudioBridgeModel(model, usable), model);
  assert.equal(await selectAudioBridgeModel("auto", async (id) => id === model), model);
});

test("WebM failures preserve status without leaking decoder diagnostics or blaming missing ffmpeg", async () => {
  const diagnostic = "private-decoder-stderr";
  for (const [error, expected] of [
    [new GeminiLiveError(diagnostic, 400), /decode/i],
    [new GeminiLiveError(diagnostic, 413), /500 seconds/],
    [new GeminiLiveError(diagnostic, 499), /cancelled/],
    [new GeminiLiveError(diagnostic, 504), /timed out/],
    [new GeminiLiveError(diagnostic, 500), /conversion failed/i],
    [new FfmpegNotFoundError(diagnostic), /install ffmpeg/i],
  ] as const) {
    const response = webmConversionErrorResponse(error);
    const {
      error: { message },
    } = await response.json();
    assert.equal(response.status, error.status);
    assert.match(message, expected);
    assert.ok(!message.includes(diagnostic));
    if (!(error instanceof FfmpegNotFoundError)) assert.doesNotMatch(message, /ffmpeg/i);
  }
});

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
