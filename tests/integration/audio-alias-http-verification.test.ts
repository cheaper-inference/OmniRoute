import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { serveRetentionRoutes } from "./_videoRetentionHttp.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-audio-http-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "isolated-audio-http-test-only";
const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { createApiKey, updateApiKeyPermissions } = await import("../../src/lib/db/apiKeys.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { AUDIO_TRANSCRIPTION_PROVIDERS } = await import("../../open-sse/config/audioRegistry.ts");
const route = await import("../../src/app/api/v1/audio/transcriptions/route.ts");

test("real HTTP multipart: exact whisper-1 UI alias, Groq bytes/fields, key policies, combo precedence", async () => {
  const calls: { data: FormData; auth: string | null }[] = [];
  const upstream = await serveRetentionRoutes({
    "/openai/v1/audio/transcriptions": async (request) => {
      calls.push({ data: await request.formData(), auth: request.headers.get("authorization") });
      return Response.json({ text: "mock Groq transcription" });
    },
  });
  const oldUrl = AUDIO_TRANSCRIPTION_PROVIDERS.groq.baseUrl;
  AUDIO_TRANSCRIPTION_PROVIDERS.groq.baseUrl = `${upstream.url}/openai/v1/audio/transcriptions`;
  const server = await serveRetentionRoutes({ "/v1/audio/transcriptions": route.POST });
  try {
    const conn = await createProviderConnection({
      provider: "groq",
      name: "isolated mock Groq",
      apiKey: "mock-groq-only",
      authType: "apikey",
      isActive: true,
    });
    await updateSettings({
      modelAliases: { "whisper-1": "groq/whisper-large-v3-turbo" },
      wildcardAliases: [],
    });
    const bytes = Buffer.from([0, 255, 17, 42, 0, 128]);
    async function send(key?: string) {
      const data = new FormData();
      data.set("model", "whisper-1");
      data.set("file", new Blob([bytes], { type: "audio/wav" }), "clip.wav");
      for (const [k, v] of Object.entries({
        language: "id",
        prompt: "retain prompt",
        response_format: "json",
        temperature: "0.2",
        "timestamp_granularities[]": "word",
      }))
        data.set(k, v);
      return fetch(`${server.url}/v1/audio/transcriptions`, {
        method: "POST",
        body: data,
        headers: key ? { Authorization: `Bearer ${key}` } : {},
      });
    }
    let response = await send();
    assert.equal(response.status, 200, await response.clone().text());
    assert.deepEqual(await response.json(), { text: "mock Groq transcription" });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].auth, "Bearer mock-groq-only");
    assert.equal(calls[0].data.get("model"), "whisper-large-v3-turbo");
    const file = calls[0].data.get("file") as File;
    assert.deepEqual(Buffer.from(await file.arrayBuffer()), bytes);
    assert.equal(file.name, "clip.wav");
    for (const [k, v] of Object.entries({
      language: "id",
      prompt: "retain prompt",
      response_format: "json",
      temperature: "0.2",
      "timestamp_granularities[]": "word",
    }))
      assert.equal(calls[0].data.get(k), v);
    const key = await createApiKey("isolated-policy", "test-machine");
    await updateApiKeyPermissions(key.id, { blockedModels: ["groq/whisper-large-v3-turbo"] });
    response = await send(key.key);
    assert.equal(response.status, 403, await response.clone().text());
    assert.equal(calls.length, 1);
    await updateApiKeyPermissions(key.id, {
      blockedModels: [],
      allowedConnections: ["nonexistent-connection"],
    });
    response = await send(key.key);
    assert.notEqual(response.status, 200);
    assert.equal(calls.length, 1);
    await updateApiKeyPermissions(key.id, { allowedConnections: [conn.id] });
    response = await send(key.key);
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(calls.length, 2);
    await createCombo({ name: "whisper-1", models: ["groq/whisper-large-v3"], config: {} });
    response = await send();
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(calls.at(-1)?.data.get("model"), "whisper-large-v3");
  } finally {
    await server.close();
    await upstream.close();
    AUDIO_TRANSCRIPTION_PROVIDERS.groq.baseUrl = oldUrl;
    core.resetDbInstance();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
