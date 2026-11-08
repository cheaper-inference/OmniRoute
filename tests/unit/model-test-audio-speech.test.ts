import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-speech-probe-"));
process.env.DATA_DIR = dataDir;
const {
  detectTestKind,
  buildInternalAudioSpeechRequest,
  extractModelTestResponseText,
  runSingleModelTest,
} = await import("../../src/lib/api/modelTestRunner.ts");
const providers = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
test.after(() => {
  core.closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("speech models select their audio endpoint from metadata or provider type", () => {
  for (const metadata of [
    { apiFormat: "audio-speech" },
    { supportedEndpoints: ["audio-speech"] },
  ]) {
    assert.equal(detectTestKind("el/eleven_turbo_v2_5", metadata).isAudioSpeech, true);
  }
  assert.equal(detectTestKind("vendor/opaque", null, "audio-speech").isAudioSpeech, true);
  assert.equal(
    detectTestKind("vendor/chat", { supportedEndpoints: ["chat", "audio-speech"] }).isAudioSpeech,
    false
  );
});

test("speech probe uses a tiny speech body, connection pin and abort signal", async () => {
  const controller = new AbortController();
  const request = buildInternalAudioSpeechRequest(
    "el/eleven_turbo_v2_5",
    controller.signal,
    "test-connection"
  );
  assert.equal(new URL(request.url).pathname, "/v1/audio/speech");
  assert.equal(request.headers.get("X-OmniRoute-Connection"), "test-connection");
  assert.equal(request.headers.get("X-Internal-Test"), "combo-health-check");
  assert.deepEqual(await request.json(), {
    model: "el/eleven_turbo_v2_5",
    input: "Hi",
    voice: "alloy",
    response_format: "mp3",
  });
  controller.abort();
  assert.equal(request.signal.aborted, true);
});

test("speech probe accepts nonempty audio but rejects empty or non-audio responses", async () => {
  const result = await extractModelTestResponseText(
    new Response(new Uint8Array([1, 2, 3]), { headers: { "Content-Type": "audio/mpeg" } }),
    false,
    true
  );
  assert.match(result.text, /3 bytes/);
  for (const response of [
    new Response(null, { headers: { "Content-Type": "audio/mpeg" } }),
    new Response("not audio", { headers: { "Content-Type": "text/plain" } }),
  ]) {
    assert.equal((await extractModelTestResponseText(response, false, true)).text, "");
  }
});

test("speech model tests dispatch to speech handler and consume returned audio", async () => {
  await providers.createProviderNode({
    id: "openai-compatible-speech-probe",
    type: "openai-compatible",
    name: "Speech probe",
    prefix: "speechprobe",
    apiType: "audio-speech",
    baseUrl: "http://127.0.0.1:19876/v1",
  });
  const connection = await providers.createProviderConnection({
    provider: "openai-compatible-speech-probe",
    authType: "apikey",
    name: "Speech test",
    apiKey: "test-only-not-a-real-key",
    isActive: true,
    testStatus: "active",
  });
  const originalFetch = globalThis.fetch;
  const requests: { url: string; body: Record<string, unknown> }[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    requests.push({ url: String(input), body: JSON.parse(String(init?.body)) });
    return new Response(new Uint8Array([1, 2, 3]), { headers: { "Content-Type": "audio/mpeg" } });
  }) as typeof fetch;
  try {
    const result = await runSingleModelTest({
      providerId: "openai-compatible-speech-probe",
      modelId: "speechprobe/opaque-voice",
      connectionId: connection.id,
      timeoutMs: 5000,
    });
    assert.equal(result.status, "ok", JSON.stringify(result));
    assert.equal(requests.length, 1);
    assert.match(requests[0].url, /\/audio\/speech$/);
    assert.equal(requests[0].body.input, "Hi");
    assert.equal(requests[0].body.messages, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
