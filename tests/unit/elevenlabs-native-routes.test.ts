import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-elevenlabs-native-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "elevenlabs-native-route-test-secret";

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const voicesRoute = await import("../../src/app/api/v1/voices/route.ts");
const speechRoute = await import("../../src/app/api/v1/text-to-speech/[voiceId]/route.ts");
const transcriptionRoute = await import("../../src/app/api/v1/speech-to-text/route.ts");
const { nativeGenerationRoutes } = await import("./helpers/elevenLabsGenerationRoutes.ts");
const originalFetch = globalThis.fetch;
const API_KEY = "test-elevenlabs-key";

function seedCredential() {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
         (id, provider, auth_type, is_active, api_key, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run("elevenlabs-native-test", "elevenlabs", "apikey", 1, API_KEY, now, now);
  readCache.invalidateDbCache("connections");
}

function clearCredentials() {
  core
    .getDbInstance()
    .prepare("DELETE FROM provider_connections WHERE provider = ?")
    .run("elevenlabs");
  readCache.invalidateDbCache("connections");
}

test.beforeEach(async () => {
  await core.ensureDbInitialized();
  seedCredential();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /v1/voices forwards query and stored xi-api-key", async () => {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(String(input), "https://api.elevenlabs.io/v1/voices?show_legacy=true");
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("xi-api-key"), API_KEY);
    assert.equal(headers.has("authorization"), false);
    return Response.json({ voices: [{ voice_id: "voice_1" }] });
  }) as typeof fetch;

  const response = await voicesRoute.GET(
    new Request("http://localhost/v1/voices?show_legacy=true")
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/json");
  assert.deepEqual(await response.json(), { voices: [{ voice_id: "voice_1" }] });
});

test("POST /v1/text-to-speech/[voiceId] forwards JSON and binary response", async () => {
  const payload = JSON.stringify({ text: "Hello", model_id: "eleven_turbo_v2_5" });
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(
      String(input),
      "https://api.elevenlabs.io/v1/text-to-speech/voice_123?output_format=mp3_44100_128"
    );
    assert.equal(init?.method, "POST");
    assert.equal(new Headers(init?.headers).get("content-type"), "application/json");
    assert.equal(await new Response(init?.body).text(), payload);
    return new Response(Uint8Array.from([1, 2, 3]), {
      headers: { "Content-Type": "audio/mpeg" },
    });
  }) as typeof fetch;

  const response = await speechRoute.POST(
    new Request("http://localhost/v1/text-to-speech/voice_123?output_format=mp3_44100_128", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    }),
    { params: Promise.resolve({ voiceId: "voice_123" }) }
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "audio/mpeg");
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), Uint8Array.from([1, 2, 3]));
});

test("POST /v1/speech-to-text forwards multipart body, query, status and error body", async () => {
  const form = new FormData();
  form.set("model_id", "scribe_v1");
  form.set("file", new Blob(["audio"], { type: "audio/wav" }), "sample.wav");

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(
      String(input),
      "https://api.elevenlabs.io/v1/speech-to-text?tag_audio_events=true"
    );
    const contentType = new Headers(init?.headers).get("content-type");
    assert.match(contentType || "", /^multipart\/form-data; boundary=/);
    const forwarded = await new Response(init?.body, {
      headers: { "Content-Type": contentType || "" },
    }).formData();
    assert.equal(forwarded.get("model_id"), "scribe_v1");
    assert.equal(await (forwarded.get("file") as Blob).text(), "audio");
    return Response.json({ detail: { message: "unsupported audio" } }, { status: 422 });
  }) as typeof fetch;

  const response = await transcriptionRoute.POST(
    new Request("http://localhost/v1/speech-to-text?tag_audio_events=true", {
      method: "POST",
      body: form,
    })
  );
  assert.equal(response.status, 422);
  assert.deepEqual(await response.json(), { detail: { message: "unsupported audio" } });
});

test("native ElevenLabs routes reject missing credentials and traversal", async (t) => {
  await t.test("missing credential", async () => {
    clearCredentials();
    let fetched = false;
    globalThis.fetch = (async () => {
      fetched = true;
      return new Response();
    }) as typeof fetch;

    const response = await voicesRoute.GET(new Request("http://localhost/v1/voices"));
    assert.equal(response.status, 401);
    assert.equal(fetched, false);
    assert.match((await response.json()).error.message, /No credentials for provider: elevenlabs/);
  });

  await t.test("traversal voice ID", async () => {
    seedCredential();
    let fetched = false;
    globalThis.fetch = (async () => {
      fetched = true;
      return new Response();
    }) as typeof fetch;

    const response = await speechRoute.POST(
      new Request("http://localhost/v1/text-to-speech/..%2Fvoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }),
      { params: Promise.resolve({ voiceId: "../voices" }) }
    );
    assert.equal(response.status, 400);
    assert.equal(fetched, false);
    assert.match((await response.json()).error.message, /Invalid ElevenLabs voice ID/);
  });
});

for (const { path: routePath, route, body } of nativeGenerationRoutes) {
  test(`POST ${routePath} forwards native JSON, query and stored credentials`, async () => {
    const payload = { ...body, provider_extension: { keep: true } };
    const contentType = routePath.endsWith("detailed/stream")
      ? "text/event-stream"
      : routePath.endsWith("/plan")
        ? "application/json"
        : routePath.endsWith("/detailed")
          ? "multipart/mixed; boundary=music"
          : "audio/mpeg";
    const responseBytes = routePath.endsWith("detailed/stream")
      ? new TextEncoder().encode('data: {"type":"audio_chunk","audio":"AP8B"}\n\n')
      : routePath.endsWith("/plan")
        ? new TextEncoder().encode(JSON.stringify({ sections: [], positive_global_styles: [] }))
        : Uint8Array.from([0, 255, 1]);
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(
        String(input),
        `https://api.elevenlabs.io${routePath}?output_format=mp3_44100_128&enable_logging=true`
      );
      assert.equal(init?.method, "POST");
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("xi-api-key"), API_KEY);
      assert.equal(headers.get("content-type"), "application/json");
      assert.equal(headers.has("authorization"), false);
      assert.equal(headers.has("cookie"), false);
      assert.deepEqual(JSON.parse(String(init?.body)), payload);
      return new Response(responseBytes, {
        headers: {
          "Content-Type": contentType,
          "character-cost": "10",
          "song-id": "song-test",
          "request-id": "native-test",
          "set-cookie": "must-not-leak=1",
        },
      });
    }) as typeof fetch;
    const response = await route.POST(
      new Request(`http://localhost${routePath}?output_format=mp3_44100_128&enable_logging=true`, {
        method: "POST",
        headers: {
          Authorization: "Bearer caller-key",
          "xi-api-key": "caller-provider-key",
          Cookie: "session=secret",
        },
        body: JSON.stringify(payload),
      })
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("character-cost"), "10");
    assert.equal(response.headers.get("song-id"), "song-test");
    assert.equal(response.headers.get("request-id"), "native-test");
    assert.equal(response.headers.has("set-cookie"), false);
    assert.equal(response.headers.get("content-type"), contentType);
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), responseBytes);
  });

  test(`${routePath} rejects invalid JSON, invalid body and missing credentials without fetch`, async () => {
    let fetched = false;
    globalThis.fetch = (async () => {
      fetched = true;
      return new Response();
    }) as typeof fetch;
    for (const body of ["{", "{}", "[]"]) {
      const response = await route.POST(
        new Request(`http://localhost${routePath}`, { method: "POST", body })
      );
      assert.equal(response.status, 400);
    }
    clearCredentials();
    const response = await route.POST(
      new Request(`http://localhost${routePath}`, { method: "POST", body: JSON.stringify(body) })
    );
    assert.equal(response.status, 401);
    assert.equal(fetched, false);
    assert.equal((await route.OPTIONS()).status, 204);
  });

  test(`${routePath} preserves upstream plan and rate-limit failures`, async () => {
    for (const status of [402, 429]) {
      const error = { detail: { status: "paid_plan_required", message: "Upgrade required" } };
      globalThis.fetch = (async () =>
        Response.json(error, { status, headers: { "retry-after": "30" } })) as typeof fetch;
      const response = await route.POST(
        new Request(`http://localhost${routePath}`, { method: "POST", body: JSON.stringify(body) })
      );
      assert.equal(response.status, status);
      assert.equal(response.headers.get("retry-after"), "30");
      assert.deepEqual(await response.json(), error);
    }
  });
}

test(
  "native music streaming returns the first chunk before upstream closes and propagates cancellation",
  { timeout: 5000 },
  async () => {
    const { route, body, path: routePath } = nativeGenerationRoutes[2];
    const abort = new AbortController();
    let cancelled = false;
    let upstreamController: ReadableStreamDefaultController<Uint8Array>;
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(init?.signal, request.signal);
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            upstreamController = controller;
            controller.enqueue(Uint8Array.from([1, 2]));
          },
          cancel() {
            cancelled = true;
          },
        }),
        { headers: { "content-type": "audio/mpeg" } }
      );
    }) as typeof fetch;
    const request = new Request(`http://localhost${routePath}`, {
      method: "POST",
      body: JSON.stringify(body),
      signal: abort.signal,
    });
    const response = await route.POST(request);
    const reader = response.body!.getReader();
    assert.deepEqual((await reader.read()).value, Uint8Array.from([1, 2]));
    upstreamController!.enqueue(Uint8Array.from([3]));
    assert.deepEqual((await reader.read()).value, Uint8Array.from([3]));
    await reader.cancel();
    assert.equal(cancelled, true);
    abort.abort();
    assert.equal(request.signal.aborted, true);
  }
);

test("sound and music numeric limits and mutually exclusive inputs reject before upstream", async () => {
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response();
  }) as typeof fetch;
  const invalid = [
    { route: nativeGenerationRoutes[0], body: { text: "bell", duration_seconds: 0.4 } },
    { route: nativeGenerationRoutes[0], body: { text: "bell", prompt_influence: 1.1 } },
    { route: nativeGenerationRoutes[1], body: { prompt: "piano", music_length_ms: 2999 } },
    { route: nativeGenerationRoutes[1], body: { prompt: "piano", composition_plan: {} } },
    { route: nativeGenerationRoutes[1], body: { prompt: "piano", seed: -1 } },
  ];
  for (const { route: entry, body } of invalid) {
    assert.equal(
      (
        await entry.route.POST(
          new Request(`http://localhost${entry.path}`, {
            method: "POST",
            body: JSON.stringify(body),
          })
        )
      ).status,
      400
    );
  }
  assert.equal(fetched, false);
});

test("native generation maps a transport failure to a sanitized 502", async () => {
  globalThis.fetch = (async () => {
    throw new Error("ElevenLabs connection failed");
  }) as typeof fetch;
  const { route, body, path: routePath } = nativeGenerationRoutes[0];
  const response = await route.POST(
    new Request(`http://localhost${routePath}`, { method: "POST", body: JSON.stringify(body) })
  );
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error.message, "ElevenLabs connection failed");
});
