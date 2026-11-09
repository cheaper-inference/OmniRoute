// Regression test: /v1/audio/transcriptions must resolve combo names.
//
// /v1/models advertises combos, and both /v1/chat/completions and /v1/embeddings
// resolve them — but the transcription route treated the model string as a literal
// `provider/model` id only. A combo name therefore came back as
// `400 Invalid transcription model: <combo>. Use format: provider/model`, so any
// client populating a model picker from /v1/models offered an option the endpoint
// rejected, and callers had to hardcode the provider's internal model id.
//
// This asserts the combo is expanded to its target before dispatch, and that a
// literal provider/model string still bypasses combo lookup entirely.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audio-combo-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const originalApiKeySecret = process.env.API_KEY_SECRET;
process.env.API_KEY_SECRET = "audio-alias-unit-test-only";

const core = await import("../../src/lib/db/core.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createProviderNode } = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/v1/audio/transcriptions/route.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = originalApiKeySecret;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Minimal but structurally valid WAV so nothing rejects the upload shape. */
function makeWav(): Blob {
  const dataLen = 1600;
  const b = Buffer.alloc(44 + dataLen);
  b.write("RIFF", 0, "ascii");
  b.writeUInt32LE(36 + dataLen, 4);
  b.write("WAVE", 8, "ascii");
  b.write("fmt ", 12, "ascii");
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(16000, 24);
  b.writeUInt32LE(32000, 28);
  b.writeUInt16LE(2, 32);
  b.writeUInt16LE(16, 34);
  b.write("data", 36, "ascii");
  b.writeUInt32LE(dataLen, 40);
  return new Blob([b], { type: "audio/wav" });
}

function transcriptionRequest(model: string) {
  const fd = new FormData();
  fd.set("model", model);
  fd.set("file", makeWav(), "t.wav");
  return new Request("http://localhost/v1/audio/transcriptions", { method: "POST", body: fd });
}

test("a combo name is expanded to its target instead of being rejected", async () => {
  await createProviderNode({
    id: "openai-compatible-audio-transcriptions-test",
    type: "openai-compatible",
    name: "Local STT",
    prefix: "localstt",
    apiType: "audio-transcriptions",
    baseUrl: "http://localhost:9000/v1",
  } as Parameters<typeof createProviderNode>[0]);

  await createCombo({
    name: "transcricao",
    strategy: "priority",
    models: [{ provider: "localstt", model: "whisper-1" }],
  } as Parameters<typeof createCombo>[0]);

  await updateSettings({ modelAliases: { transcricao: "bogus/not-the-combo-target" } });

  const upstreamCalls: string[] = [];
  globalThis.fetch = (async (url: RequestInfo | URL) => {
    upstreamCalls.push(String(url));
    return new Response(JSON.stringify({ text: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const res = await route.POST(transcriptionRequest("transcricao"));
  const body = await res.text();

  assert.notEqual(
    res.status,
    400,
    `combo name must not be rejected as an invalid model — got: ${body}`
  );
  assert.ok(
    !body.includes("Invalid transcription model"),
    `combo must be resolved before model parsing — got: ${body}`
  );
  assert.ok(
    upstreamCalls.some((u) => u.includes("/audio/transcriptions")),
    `expected the combo target to be dispatched, calls: ${JSON.stringify(upstreamCalls)}`
  );
});

test("an unknown bare name is still rejected with the format hint", async () => {
  globalThis.fetch = (async () => new Response("{}", { status: 200 })) as unknown as typeof fetch;

  const res = await route.POST(transcriptionRequest("definitely-not-a-combo-or-model"));
  const body = await res.text();

  assert.equal(res.status, 400);
  assert.match(body, /Invalid transcription model/);
});

const { updateSettings } = await import("../../src/lib/db/settings.ts");

for (const [name, settings, requested] of [
  ["exact", { modelAliases: { "client-stt": "alias-audio/whisper-1" } }, "client-stt"],
  [
    "wildcard",
    { wildcardAliases: [{ pattern: "client-stt-*", target: "alias-audio/whisper-1" }] },
    "client-stt-v1",
  ],
] as const) {
  test(`settings ${name} alias preserves the multipart upload`, async () => {
    await createProviderNode({
      type: "openai-compatible",
      name: "Alias audio",
      prefix: "alias-audio",
      apiType: "audio-transcriptions",
      authType: "none",
      baseUrl: "http://localhost:19999/v1",
    });
    await updateSettings({ modelAliases: {}, wildcardAliases: [], ...settings });
    let sent: FormData | undefined;
    globalThis.fetch = (async (_input, init) => {
      sent = await new Response(init?.body, {
        headers: { "Content-Type": new Headers(init?.headers).get("Content-Type")! },
      }).formData();
      return new Response(JSON.stringify({ text: "alias worked" }), {
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;
    const fd = new FormData();
    fd.set("model", requested);
    fd.set("file", makeWav(), "sample.wav");
    fd.set("language", "en");
    fd.set("prompt", "keep this prompt");
    const res = await route.POST(
      new Request("http://localhost/v1/audio/transcriptions", {
        method: "POST",
        body: fd,
      })
    );
    assert.equal(res.status, 200, await res.clone().text());
    assert.equal(sent?.get("model"), "whisper-1");
    assert.equal(sent?.get("language"), "en");
    assert.equal(sent?.get("prompt"), "keep this prompt");
    assert.deepEqual(
      await (sent?.get("file") as File).arrayBuffer(),
      await makeWav().arrayBuffer()
    );
  });
}

test("alias targets cannot bypass blocked model policy", async () => {
  const { createApiKey, updateApiKeyPermissions } = await import("../../src/lib/db/apiKeys.ts");
  const key = await createApiKey("alias-policy-test", "test-machine");
  await updateApiKeyPermissions(key.id, { blockedModels: ["alias-audio/whisper-1"] });
  await updateSettings({
    modelAliases: { "blocked-alias": "alias-audio/whisper-1" },
    wildcardAliases: [],
  });
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return new Response("{}");
  }) as typeof fetch;
  const fd = new FormData();
  fd.set("model", "blocked-alias");
  fd.set("file", makeWav(), "sample.wav");
  const res = await route.POST(
    new Request("http://localhost/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key.key}` },
      body: fd,
    })
  );
  assert.equal(res.status, 403, await res.clone().text());
  assert.equal(calls, 0);
});
