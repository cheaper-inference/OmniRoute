import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-elevenlabs-music-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "elevenlabs-music-test-secret";
const core = await import("../../src/lib/db/core.ts");
const { handleMusicGeneration } = await import("../../open-sse/handlers/musicGeneration.ts");
const { getAllMusicModels, parseMusicModel } =
  await import("../../open-sse/config/musicRegistry.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const musicRoute = await import("../../src/app/api/v1/music/generations/route.ts");
const originalFetch = globalThis.fetch;
const credentials = { apiKey: "stored-elevenlabs-test-key" };
const generate = (body: Record<string, unknown>, connection = credentials) =>
  handleMusicGeneration({
    body: { model: "elevenlabs/music_v1", prompt: "Calm piano", ...body },
    credentials: connection,
    log: null,
  });

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("ElevenLabs music models are registered and parse into the music handler", () => {
  for (const model of ["music_v1", "music_v2", "music_v2_5"]) {
    assert.equal(parseMusicModel(`elevenlabs/${model}`).provider, "elevenlabs");
    assert.ok(getAllMusicModels().some((entry) => entry.id === `elevenlabs/${model}`));
  }
});

test("unified ElevenLabs music maps seconds, instrumental flag and binary audio", async () => {
  const audio = Uint8Array.from([0, 255, 128, 1]);
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(String(input), "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128");
    assert.equal(init?.method, "POST");
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("xi-api-key"), credentials.apiKey);
    assert.equal(headers.has("authorization"), false);
    assert.deepEqual(JSON.parse(String(init?.body)), {
      model_id: "music_v1",
      prompt: "Calm piano",
      music_length_ms: 3000,
      force_instrumental: true,
      sign_with_c2pa: true,
    });
    return new Response(audio, { headers: { "content-type": "audio/mpeg" } });
  }) as typeof fetch;
  const result = await generate({ duration: 3, instrumental: true, sign_with_c2pa: true });
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].b64_json, Buffer.from(audio).toString("base64"));
  assert.equal(result.data.data[0].format, "mp3");
  assert.equal(typeof result.data.created, "number");
});

test("native millisecond duration wins over the unified seconds alias", async () => {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(new URL(String(input)).searchParams.get("output_format"), "wav_44100");
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model_id, "music_v2_5");
    assert.equal(body.music_length_ms, 5000);
    assert.equal(body.force_instrumental, false);
    return new Response("RIFF", { headers: { "content-type": "audio/wav" } });
  }) as typeof fetch;
  const result = await generate({
    model: "elevenlabs/music_v2_5",
    duration: 3,
    music_length_ms: 5000,
    force_instrumental: false,
    instrumental: true,
    output_format: "wav_44100",
  });
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].format, "wav");
});

test("upstream paid-plan and quota statuses survive unified music normalization", async () => {
  for (const status of [402, 429]) {
    globalThis.fetch = (async () =>
      Response.json(
        { detail: { status: "paid_plan_required", message: "A paid plan is required" } },
        { status }
      )) as typeof fetch;
    const result = await generate({});
    assert.equal(result.success, false);
    assert.equal(result.status, status);
    assert.equal(result.error, "A paid plan is required");
  }
});

test("unified music rejects invalid requests before fetching", async () => {
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response();
  }) as typeof fetch;
  for (const body of [
    { duration: 2 },
    { stream: true },
    { output_format: 123 },
    { prompt: "" },
    { prompt: "piano", composition_plan: {} },
  ]) {
    const result = await generate(body);
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
  }
  assert.equal((await generate({}, { apiKey: "" })).status, 401);
  assert.equal(fetched, false);
});

test("empty, non-audio and transport failures return 502", async () => {
  for (const upstream of [
    () => new Response(null, { headers: { "content-type": "audio/mpeg" } }),
    () => Response.json({ detail: "bad" }),
    () => {
      throw new Error("connection failed");
    },
  ]) {
    globalThis.fetch = (async () => upstream()) as typeof fetch;
    const result = await generate({});
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  }
});

test("unified music route discovers ElevenLabs and generates with the scoped stored connection", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "elevenlabs",
    authType: "apikey",
    name: "ElevenLabs music test",
    apiKey: credentials.apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const key = await apiKeysDb.createApiKey("music client", "music-test-machine", [], {
    allowedConnections: [String(connection.id)],
  });
  const headers = { Authorization: `Bearer ${key.key}`, "Content-Type": "application/json" };
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(new Headers(init?.headers).get("xi-api-key"), credentials.apiKey);
    return new Response("ID3music", { headers: { "content-type": "audio/mpeg" } });
  }) as typeof fetch;
  const response = await musicRoute.POST(
    new Request("http://localhost/v1/music/generations", {
      method: "POST",
      headers,
      body: JSON.stringify({ model: "elevenlabs/music_v1", prompt: "Calm piano", duration: 3 }),
    }),
    {} as never
  );
  assert.equal(response.status, 200);
  assert.equal(
    (await response.json()).data[0].b64_json,
    Buffer.from("ID3music").toString("base64")
  );

  const catalogResponse = await musicRoute.GET(
    new Request("http://localhost/v1/music/generations", { headers })
  );
  assert.equal(catalogResponse.status, 200);
  const catalog = await catalogResponse.json();
  for (const model of ["music_v1", "music_v2", "music_v2_5"]) {
    assert.ok(catalog.data.some((entry: { id: string }) => entry.id === `elevenlabs/${model}`));
  }
});
