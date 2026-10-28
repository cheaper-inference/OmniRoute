import assert from "node:assert/strict";
import test from "node:test";

import { handleAudioTranscription } from "../../open-sse/handlers/audioTranscription.ts";
import {
  hasTranscriptionInput,
  resolveTranscriptionFile,
  resolveTranscriptionFileOrResponse,
} from "../../open-sse/utils/transcriptionRemoteAudio.ts";
import {
  fetchRemoteMedia,
  setPinnedFetchTestOverride,
} from "../../src/shared/network/remoteImageFetch.ts";

const REMOTE_AUDIO_URL = "https://8.8.8.8/bot123456:PRIVATE_TELEGRAM_TOKEN/voice.oga";

function urlOnly(model = "groq/whisper-large-v3-turbo", url = REMOTE_AUDIO_URL): FormData {
  const form = new FormData();
  form.set("model", model);
  form.set("url", url);
  return form;
}

test("URL input is fetched by OmniRoute then sent to Groq as file, never as a Telegram URL", async () => {
  const originalFetch = globalThis.fetch;
  const upstreamCalls: Array<{ url: string; body: string; authorization: string }> = [];
  setPinnedFetchTestOverride(
    async () =>
      new Response("binary-ogg-audio", {
        headers: { "content-type": "audio/ogg", "content-length": "16" },
      })
  );
  globalThis.fetch = async (input, init) => {
    const options = init ?? {};
    upstreamCalls.push({
      url: String(input),
      body: new TextDecoder().decode(options.body as Uint8Array),
      authorization: new Headers(options.headers).get("authorization") ?? "",
    });
    return Response.json({ text: "hello" });
  };
  try {
    const form = urlOnly();
    form.set("language", "uk");
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: form,
      credentials: { apiKey: "groq-secret" },
    });

    assert.equal(response.status, 200);
    assert.equal((await response.json()).text, "hello");
    assert.equal(upstreamCalls.length, 1);
    assert.equal(upstreamCalls[0].url, "https://api.groq.com/openai/v1/audio/transcriptions");
    assert.equal(upstreamCalls[0].authorization, "Bearer groq-secret");
    assert.match(upstreamCalls[0].body, /name="file"; filename="audio.ogg"/);
    assert.match(upstreamCalls[0].body, /binary-ogg-audio/);
    assert.match(upstreamCalls[0].body, /name="language"/);
    assert.doesNotMatch(upstreamCalls[0].body, /PRIVATE_TELEGRAM_TOKEN|name="url"/);
  } finally {
    globalThis.fetch = originalFetch;
    setPinnedFetchTestOverride(undefined);
  }
});

test("URL input retains OpenAI-compatible provider routing and multipart field forwarding", async () => {
  const originalFetch = globalThis.fetch;
  let requestUrl = "";
  setPinnedFetchTestOverride(
    async () => new Response("sound", { headers: { "content-type": "audio/ogg" } })
  );
  globalThis.fetch = async (input) => {
    requestUrl = String(input);
    return Response.json({ text: "ok" });
  };
  try {
    const form = urlOnly("openai/whisper-1");
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: form,
      credentials: { apiKey: "openai-key" },
    });
    assert.equal(response.status, 200);
    assert.equal(requestUrl, "https://api.openai.com/v1/audio/transcriptions");
  } finally {
    globalThis.fetch = originalFetch;
    setPinnedFetchTestOverride(undefined);
  }
});

test("uploaded file takes precedence over URL without any remote fetch", async () => {
  const originalFetch = globalThis.fetch;
  setPinnedFetchTestOverride(async () => {
    throw new Error("should not fetch URL");
  });
  globalThis.fetch = async () => Response.json({ text: "ok" });
  try {
    const form = urlOnly();
    form.set("file", new File(["uploaded"], "clip.wav", { type: "audio/wav" }));
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: form,
      credentials: { apiKey: "groq-secret" },
    });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
    setPinnedFetchTestOverride(undefined);
  }
});

test("missing provider credentials are rejected before downloading URL audio", async () => {
  setPinnedFetchTestOverride(async () => {
    throw new Error("must not fetch");
  });
  try {
    const response = await handleAudioTranscription({
      formData: urlOnly(),
      credentials: null,
      remoteMediaFetcher: fetchRemoteMedia,
    });
    assert.equal(response.status, 401);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test("rejects HTTP, URL credentials, nonstandard ports, and invalid URLs", async () => {
  for (const url of [
    "http://8.8.8.8/file.ogg",
    "https://user:password@8.8.8.8/file.ogg",
    "https://8.8.8.8:8443/file.ogg",
    "file:///etc/passwd",
    "not-a-url",
  ]) {
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: urlOnly(undefined, url),
      credentials: { apiKey: "groq-secret" },
    });
    assert.equal(response.status, 400, url);
  }
});

test("rejects local, link-local, and cloud metadata URLs without network calls", async () => {
  let calls = 0;
  setPinnedFetchTestOverride(async () => {
    calls++;
    return new Response("unsafe");
  });
  try {
    for (const host of ["127.0.0.1", "169.254.169.254", "10.0.0.5", "192.168.1.3", "[::1]"]) {
      const response = await handleAudioTranscription({
        remoteMediaFetcher: fetchRemoteMedia,
        formData: urlOnly(undefined, `https://${host}/file.ogg`),
        credentials: { apiKey: "groq-secret" },
      });
      assert.equal(response.status, 400, host);
    }
    assert.equal(calls, 0);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test("rejects redirect to a private address rather than following it", async () => {
  let calls = 0;
  setPinnedFetchTestOverride(async () => {
    calls++;
    return new Response(null, {
      status: 302,
      headers: { location: "https://169.254.169.254/latest/meta-data" },
    });
  });
  try {
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: urlOnly(),
      credentials: { apiKey: "groq-secret" },
    });
    assert.equal(response.status, 400);
    assert.equal(calls, 1);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test("refuses oversized remote audio based on Content-Length before reading body", async () => {
  setPinnedFetchTestOverride(
    async () =>
      new Response("x", { headers: { "content-type": "audio/ogg", "content-length": "30000000" } })
  );
  try {
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: urlOnly(),
      credentials: { apiKey: "groq-secret" },
    });
    assert.equal(response.status, 413);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test("refuses HTML response even when the URL ends in .ogg", async () => {
  setPinnedFetchTestOverride(
    async () => new Response("<html>no audio</html>", { headers: { "content-type": "text/html" } })
  );
  try {
    const response = await handleAudioTranscription({
      remoteMediaFetcher: fetchRemoteMedia,
      formData: urlOnly(),
      credentials: { apiKey: "groq-secret" },
    });
    assert.equal(response.status, 415);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test("download policy cannot be weakened: public-only, DNS pinning, HTTPS hops, time and size caps", async () => {
  let opts: Record<string, unknown> = {};
  const file = await resolveTranscriptionFile(urlOnly(), async (_url, options) => {
    opts = options ?? {};
    return {
      buffer: Buffer.from("audio-data"),
      contentType: "audio/ogg",
      url: "https://8.8.8.8/voice.ogg",
    };
  });
  assert.ok(file instanceof Blob);
  assert.equal(file.size, 10);
  assert.equal(opts.guard, "public-only");
  assert.equal(opts.pinDns, true);
  assert.equal(opts.enforceHttps, true);
  assert.equal(opts.maxRedirects, 2);
  assert.equal(opts.maxBytes, 25 * 1024 * 1024);
  assert.equal(opts.timeoutMs, 15000);
});

test("hasTranscriptionInput accepts a file or a url string and rejects neither", () => {
  const withFile = new FormData();
  withFile.set("file", new File(["x"], "a.wav", { type: "audio/wav" }));
  assert.equal(hasTranscriptionInput(withFile), true);
  assert.equal(hasTranscriptionInput(urlOnly()), true);
  assert.equal(hasTranscriptionInput(new FormData()), false);
});

test("resolveTranscriptionFileOrResponse maps failures to a sanitized error Response", async () => {
  const unsafe = await resolveTranscriptionFileOrResponse(
    urlOnly(undefined, "http://8.8.8.8/bot123456:PRIVATE_TELEGRAM_TOKEN/voice.oga"),
    fetchRemoteMedia
  );
  assert.ok("response" in unsafe);
  assert.equal(unsafe.response.status, 400);
  assert.doesNotMatch(await unsafe.response.text(), /PRIVATE_TELEGRAM_TOKEN/);

  const boom = await resolveTranscriptionFileOrResponse(urlOnly(), async () => {
    throw new Error("connect ECONNREFUSED 8.8.8.8/bot123456:SECRET_BOT_TOKEN");
  });
  assert.ok("response" in boom);
  assert.equal(boom.response.status, 502);
  assert.doesNotMatch(await boom.response.text(), /SECRET_BOT_TOKEN|ECONNREFUSED/);

  const ok = await resolveTranscriptionFileOrResponse(urlOnly(), async () => ({
    buffer: Buffer.from("audio-data"),
    contentType: "audio/ogg",
    url: "https://8.8.8.8/voice.ogg",
  }));
  assert.ok("file" in ok);
  assert.equal(ok.file.size, 10);
});
