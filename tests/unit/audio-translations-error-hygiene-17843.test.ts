// Regression guard for #17843 — /v1/audio/translations was the one audio
// handler #15159 missed: its local extractUpstreamErrorMessage echoed any
// non-JSON upstream body (HTML error page, plaintext stack trace, a body that
// echoes a credential) verbatim into `error.message`, and its error responses
// carried no CORS headers. The sibling speech/transcription handlers use the
// shared `upstreamErrorResponse` (open-sse/utils/audioResponse.ts), which
// never echoes an opaque body, sanitizes a JSON body's own message, and
// re-applies CORS.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranslation } = await import("../../open-sse/handlers/audioTranslation.ts");

const HOSTILE_HTML =
  "<html><body><pre>Error: connect ECONNREFUSED 10.0.0.5:443\n  at /srv/app/node_modules/undici/index.js:1:1\napi_key=sk-live-HTML-SECRET-7777</pre></body></html>";

const HOSTILE_JSON = JSON.stringify({
  error: {
    message:
      "upstream rejected the request\n    at Object.post (/srv/app/node_modules/groq/dist/index.js:88:15)\napi_key=sk-live-AUDIO-SECRET-4242",
  },
});

function buildFile() {
  return new File([Buffer.from("abc")], "clip.wav", { type: "audio/wav" });
}

function buildFormData() {
  const formData = new FormData();
  formData.append("model", "openai/whisper-1");
  formData.append("file", buildFile());
  return formData;
}

async function runWithUpstream(
  upstream: { status: number; body: string; contentType?: string },
  run: (response: Response) => Promise<void>
): Promise<void> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(upstream.body, {
      status: upstream.status,
      headers: { "content-type": upstream.contentType ?? "text/html" },
    })) as typeof fetch;
  try {
    const response = await handleAudioTranslation({
      formData: buildFormData(),
      credentials: { apiKey: "test-key" },
    });
    await run(response);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("#17843 an opaque HTML upstream body is never echoed to the client", async () => {
  await runWithUpstream({ status: 502, body: HOSTILE_HTML }, async (response) => {
    assert.equal(response.status, 502);
    const raw = await response.text();
    assert.ok(!raw.includes("sk-live-HTML-SECRET-7777"), `leaked a credential: ${raw}`);
    assert.ok(!raw.includes("/srv/app/node_modules"), `leaked a server path: ${raw}`);
    assert.ok(!raw.includes("ECONNREFUSED"), `echoed the opaque body: ${raw}`);
    const parsed = JSON.parse(raw) as { error?: { message?: string } };
    assert.match(parsed.error?.message ?? "", /Upstream error \(502\)/);
  });
});

test("#17843 a hostile JSON message keeps its reason but not its credentials", async () => {
  await runWithUpstream(
    { status: 502, body: HOSTILE_JSON, contentType: "application/json" },
    async (response) => {
      assert.equal(response.status, 502);
      const raw = await response.text();
      assert.ok(!raw.includes("sk-live-AUDIO-SECRET-4242"), `leaked a credential: ${raw}`);
      assert.ok(!raw.includes("/srv/app/node_modules"), `leaked a server path: ${raw}`);
      const parsed = JSON.parse(raw) as { error?: { message?: string } };
      assert.ok((parsed.error?.message ?? "").length > 0, "lost the error message entirely");
    }
  );
});

test("#17843 a safe JSON reason is preserved", async () => {
  await runWithUpstream(
    {
      status: 429,
      body: JSON.stringify({ error: { message: "Rate limit exceeded for this organization" } }),
      contentType: "application/json",
    },
    async (response) => {
      assert.equal(response.status, 429);
      const parsed = (await response.json()) as { error?: { message?: string } };
      assert.match(parsed.error?.message ?? "", /Rate limit exceeded/);
    }
  );
});

test("#17843 error responses carry CORS headers", async () => {
  await runWithUpstream({ status: 502, body: HOSTILE_HTML }, async (response) => {
    // Same CORS contract #15159 pinned for the sibling handlers: the canonical
    // error builders emit no CORS, upstreamErrorResponse re-applies the shared set.
    assert.ok(
      response.headers.get("access-control-allow-methods"),
      "error response is missing access-control-allow-methods"
    );
    assert.ok(
      response.headers.get("access-control-allow-headers"),
      "error response is missing access-control-allow-headers"
    );
  });
});
