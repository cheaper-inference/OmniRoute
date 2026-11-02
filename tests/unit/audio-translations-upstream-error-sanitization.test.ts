// Regression guard: /v1/audio/translations must not echo an opaque upstream error body.
// #15159 moved audioSpeech / audioTranscription onto the shared `upstreamErrorResponse`;
// translation kept a local helper that returned the raw upstream text (and no CORS).
import assert from "node:assert/strict";
import { test } from "node:test";

const { handleAudioTranslation } = await import("../../open-sse/handlers/audioTranslation.ts");

async function translateWithUpstream(upstream: Response): Promise<Response> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => upstream;
  try {
    const formData = new FormData();
    formData.append("model", "openai/whisper-1");
    formData.append("file", new File([Buffer.from("abc")], "clip.wav", { type: "audio/wav" }));
    return await handleAudioTranslation({ formData, credentials: { apiKey: "openai-key" } });
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("translation: an opaque HTML upstream error is not echoed to the client", async () => {
  const html =
    "<html><body><pre>Error: boom\n  at /srv/app/node_modules/undici/index.js:1:1\napi_key=sk-live-TRANSLATE-SECRET-4242</pre></body></html>";
  const response = await translateWithUpstream(
    new Response(html, { status: 502, headers: { "content-type": "text/html" } })
  );

  assert.equal(response.status, 502);
  const raw = await response.text();
  assert.ok(!raw.includes("sk-live-TRANSLATE-SECRET-4242"), `leaked a credential: ${raw}`);
  assert.ok(!raw.includes("/srv/app/node_modules"), `leaked a path: ${raw}`);
  assert.ok(!raw.includes("<html"), `echoed the HTML body: ${raw}`);
  const parsed = JSON.parse(raw) as { error?: { message?: string } };
  assert.equal(parsed.error?.message, "Upstream error (502)");
  assert.ok(response.headers.get("access-control-allow-methods"), "lost CORS on error response");
});

test("translation: a hostile JSON upstream message keeps its reason but not its secrets", async () => {
  const hostile = JSON.stringify({
    error: {
      message:
        "upstream rejected the request\n    at Object.post (/srv/app/node_modules/groq/dist/index.js:88:15)\napi_key=sk-live-AUDIO-SECRET-4242",
    },
  });
  const response = await translateWithUpstream(
    new Response(hostile, { status: 502, headers: { "content-type": "application/json" } })
  );

  assert.equal(response.status, 502);
  const raw = await response.text();
  assert.ok(!raw.includes("sk-live-AUDIO-SECRET-4242"), `leaked a credential: ${raw}`);
  assert.ok(!raw.includes("/srv/app/node_modules"), `leaked a path: ${raw}`);
  const parsed = JSON.parse(raw) as { error?: { message?: string } };
  assert.match(parsed.error?.message ?? "", /upstream rejected the request/);
});

test("translation: a JSON upstream error keeps its reason and carries CORS", async () => {
  const response = await translateWithUpstream(
    new Response(JSON.stringify({ error: { message: "too many requests" } }), {
      status: 429,
      headers: { "content-type": "application/json" },
    })
  );
  const body = (await response.json()) as { error?: { message?: string } };
  assert.equal(response.status, 429);
  assert.equal(body.error?.message, "too many requests");
  assert.ok(response.headers.get("access-control-allow-methods"), "lost CORS on error response");
});
