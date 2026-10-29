// Cloudflare Workers AI speech-to-text (`@cf/deepgram/nova-3`) on /v1/audio/transcriptions.
//
// The `cloudflare-ai` provider already served chat and images, but had no transcription
// entry, so `cloudflare-ai/@cf/deepgram/nova-3` failed as an unknown transcription provider.
// Wire contract pinned here (fetch is stubbed, fixtures are synthetic):
//   - raw audio POSTed to /accounts/{accountId}/ai/run/{model} with bearer auth; the account
//     id comes from the connection and is URL-encoded so it cannot rewrite the path;
//   - `punctuate=true` always, `diarize=true` only on request, `language` only when non-blank;
//   - verbose_json carries words (with speaker when diarized), one segment per speaker run
//     and num_speakers; diarization implies verbose, as on the native Deepgram path;
//   - Cloudflare's `success:false` envelope (HTTP 200) becomes a 502 with the vendor code,
//     non-2xx statuses pass through, and the token never reaches a response body.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");
const { parseTranscriptionModel, getTranscriptionProvider, getAllAudioModels } =
  await import("../../open-sse/config/audioRegistry.ts");
const { cloudflareNova3ToVerboseJson } =
  await import("../../open-sse/handlers/cloudflareWorkersAiTranscription.ts");

const MODEL = "cloudflare-ai/@cf/deepgram/nova-3";
const TOKEN = "cf-token-SECRET-123";
const CREDENTIALS = { apiKey: TOKEN, providerSpecificData: { accountId: "acct-TEST" } };
const TRANSCRIPT = "Hello there, how Fine thanks. Great.";

// Two speakers, word-level as Workers AI returns them: A A A B B A.
const WORDS = [
  { word: "hello", punctuated_word: "Hello", start: 0, end: 0.4, speaker: 0 },
  { word: "there", punctuated_word: "there,", start: 0.4, end: 0.8, speaker: 0 },
  { word: "how", punctuated_word: "how", start: 0.8, end: 1, speaker: 0 },
  { word: "fine", punctuated_word: "Fine", start: 1.2, end: 1.6, speaker: 1 },
  { word: "thanks", punctuated_word: "thanks.", start: 1.6, end: 2, speaker: 1 },
  { word: "great", punctuated_word: "Great.", start: 2.2, end: 2.6, speaker: 0 },
];

const OK_BODY = {
  success: true,
  errors: [],
  messages: [],
  result: {
    usage: { neurons: 123.4 },
    results: { channels: [{ alternatives: [{ transcript: TRANSCRIPT, words: WORDS }] }] },
  },
};

type Captured = { url: URL; init: RequestInit };

async function run(
  fields: Record<string, string> = {},
  {
    credentials = CREDENTIALS as Record<string, unknown>,
    upstreamBody = OK_BODY as unknown,
    status = 200,
    model = MODEL,
  } = {}
) {
  const originalFetch = globalThis.fetch;
  const calls: Captured[] = [];
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: new URL(String(url)), init: init ?? {} });
    return Response.json(upstreamBody, { status });
  };
  try {
    const formData = new FormData();
    formData.append("model", model);
    formData.append("file", new File([Buffer.from("abcd")], "clip.webm", { type: "audio/webm" }));
    for (const [key, value] of Object.entries(fields)) formData.append(key, value);
    const response = await handleAudioTranscription({ formData, credentials });
    const text = await response.text();
    return { calls, status: response.status, text, payload: text ? JSON.parse(text) : null };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("registry resolves cloudflare-ai and its cf alias to the Workers AI transcription format", () => {
  for (const model of [MODEL, "cf/@cf/deepgram/nova-3"]) {
    const parsed = parseTranscriptionModel(model);
    assert.equal(parsed.provider, "cloudflare-ai", model);
    assert.equal(parsed.model, "@cf/deepgram/nova-3", model);
  }
  assert.equal(getTranscriptionProvider("cloudflare-ai")?.format, "cloudflare-workers-ai");
  assert.ok(
    (getAllAudioModels() as Array<{ id: string; provider: string; subtype: string }>).some(
      (m) => m.id === MODEL && m.provider === "cloudflare-ai" && m.subtype === "transcription"
    )
  );
});

test("posts raw audio to /accounts/{id}/ai/run/{model} with bearer auth and returns {text}", async () => {
  const { calls, status, payload } = await run();

  assert.equal(status, 200);
  assert.equal(calls.length, 1);
  const [{ url, init }] = calls;
  assert.equal(
    url.origin + url.pathname,
    "https://api.cloudflare.com/client/v4/accounts/acct-TEST/ai/run/@cf/deepgram/nova-3"
  );
  assert.equal(url.searchParams.get("punctuate"), "true");
  assert.equal(url.searchParams.get("diarize"), null);
  assert.equal(url.searchParams.get("language"), null);
  assert.equal(init.method, "POST");
  const headers = init.headers as Record<string, string>;
  assert.equal(headers.Authorization, `Bearer ${TOKEN}`);
  assert.equal(headers["Content-Type"], "audio/webm");
  assert.equal((init.body as ArrayBuffer).byteLength, 4);
  assert.deepEqual(payload, { text: TRANSCRIPT });
});

test("the account id is URL-encoded so it cannot rewrite the path or add a query", async () => {
  const { calls } = await run(
    {},
    { credentials: { apiKey: TOKEN, providerSpecificData: { accountId: "acct/x?y" } } }
  );
  assert.equal(
    calls[0].url.pathname,
    "/client/v4/accounts/acct%2Fx%3Fy/ai/run/@cf/deepgram/nova-3"
  );
  assert.equal(calls[0].url.searchParams.get("y"), null);
});

test("a top-level accountId on the credentials is accepted, like the chat executor", async () => {
  const { calls, status } = await run(
    {},
    { credentials: { apiKey: TOKEN, accountId: "top-acct" } }
  );
  assert.equal(status, 200);
  assert.match(calls[0].url.pathname, /^\/client\/v4\/accounts\/top-acct\/ai\/run\//);
});

test("a connection without an account id returns 400 before any upstream call", async () => {
  const saved = process.env.CLOUDFLARE_ACCOUNT_ID;
  delete process.env.CLOUDFLARE_ACCOUNT_ID;
  try {
    const { calls, status, payload } = await run(
      {},
      { credentials: { apiKey: TOKEN, providerSpecificData: {} } }
    );
    assert.equal(status, 400);
    assert.equal(calls.length, 0);
    assert.match(JSON.stringify(payload), /account id/i);
  } finally {
    if (saved !== undefined) process.env.CLOUDFLARE_ACCOUNT_ID = saved;
  }
});

test("diarize and language are forwarded only when the client asks", async () => {
  for (const [value, expected] of [
    ["true", "true"],
    ["1", "true"],
    ["false", null],
    ["", null],
  ] as const) {
    const { calls } = await run({ diarize: value });
    assert.equal(calls[0].url.searchParams.get("diarize"), expected, `diarize=${value}`);
  }
  // Same spellings the Deepgram and Soniox paths accept.
  const { calls: speakerLabels } = await run({ speaker_labels: "true" });
  assert.equal(speakerLabels[0].url.searchParams.get("diarize"), "true");

  const { calls: withLanguage } = await run({ language: " pt " });
  assert.equal(withLanguage[0].url.searchParams.get("language"), "pt");
  const { calls: blankLanguage } = await run({ language: "   " });
  assert.equal(blankLanguage[0].url.searchParams.get("language"), null);

  // Client-only fields never reach the provider.
  const { calls: clientOnly } = await run({ response_format: "verbose_json", temperature: "0.2" });
  assert.equal(clientOnly[0].url.searchParams.get("response_format"), null);
  assert.equal(clientOnly[0].url.searchParams.get("temperature"), null);
});

test("diarized verbose_json has words with speaker, one segment per speaker run and num_speakers", async () => {
  const { status, payload } = await run({
    diarize: "true",
    response_format: "verbose_json",
    language: "en",
  });

  assert.equal(status, 200);
  assert.equal(payload.task, "transcribe");
  assert.equal(payload.text, TRANSCRIPT);
  assert.equal(payload.language, "en");
  assert.equal(payload.duration, 2.6);
  assert.equal(payload.words.length, 6);
  assert.deepEqual(payload.words[0], { word: "Hello", start: 0, end: 0.4, speaker: 0 });
  assert.equal(payload.num_speakers, 2);
  assert.deepEqual(payload.usage, { neurons: 123.4 });
  // A A A | B B | A -> three segments, in order, each spanning its run.
  assert.deepEqual(payload.segments, [
    { id: 0, start: 0, end: 1, text: "Hello there, how", speaker: 0 },
    { id: 1, start: 1.2, end: 2, text: "Fine thanks.", speaker: 1 },
    { id: 2, start: 2.2, end: 2.6, text: "Great.", speaker: 0 },
  ]);
});

test("diarization alone implies the verbose body, as on the Deepgram path", async () => {
  const { payload } = await run({ diarize: "true" });
  assert.equal(payload.segments.length, 3);
  assert.equal(payload.num_speakers, 2);
});

test("verbose_json without speaker labels keeps one unlabeled segment and no num_speakers", () => {
  const body = cloudflareNova3ToVerboseJson(
    {
      result: {
        results: {
          channels: [
            {
              alternatives: [
                {
                  transcript: "hi you",
                  words: [
                    { word: "hi", start: 0, end: 0.3 },
                    { word: "you", start: 0.3, end: 0.5 },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    ""
  );
  assert.equal(body.text, "hi you");
  assert.deepEqual(body.words, [
    { word: "hi", start: 0, end: 0.3 },
    { word: "you", start: 0.3, end: 0.5 },
  ]);
  assert.deepEqual(body.segments, [{ id: 0, start: 0, end: 0.5, text: "hi you" }]);
  assert.equal("num_speakers" in body, false);
  assert.equal("language" in body, false);
});

test("an empty or hostile result maps to an empty transcript instead of throwing", () => {
  const empty = cloudflareNova3ToVerboseJson({ success: true, result: { results: {} } }, "");
  assert.equal(empty.text, "");
  assert.deepEqual(empty.words, []);
  assert.deepEqual(empty.segments, []);
  assert.equal(empty.duration, 0);

  const dirty = cloudflareNova3ToVerboseJson(
    {
      result: {
        results: {
          channels: [
            {
              alternatives: [
                {
                  transcript: "ok",
                  words: [null, 7, { word: "ok", start: "x", end: 1, speaker: "nope" }],
                },
              ],
            },
          ],
        },
        usage: { neurons: "lots" },
      },
    },
    ""
  );
  assert.deepEqual(dirty.words, [{ word: "ok", start: 0, end: 1 }]);
  assert.equal("usage" in dirty, false);
  assert.equal("num_speakers" in dirty, false);
});

test("success:false inside HTTP 200 becomes a 502 carrying the vendor code, never the token", async () => {
  const { status, text } = await run(
    {},
    {
      upstreamBody: {
        success: false,
        result: null,
        messages: [],
        errors: [{ code: 5006, message: `bad input for token ${TOKEN}` }],
      },
    }
  );
  assert.equal(status, 502);
  assert.match(text, /5006/);
  assert.equal(text.includes(TOKEN), false);
});

test("a non-2xx upstream status (429 neuron quota) passes through", async () => {
  const { status, text } = await run(
    {},
    {
      status: 429,
      upstreamBody: {
        success: false,
        result: null,
        messages: [],
        errors: [{ code: 4006, message: "daily free allocation used up" }],
      },
    }
  );
  assert.equal(status, 429);
  assert.equal(text.includes(TOKEN), false);
});

test("missing credentials short-circuit with 401 before any upstream call", async () => {
  const { calls, status } = await run({}, { credentials: {} });
  assert.equal(status, 401);
  assert.equal(calls.length, 0);
});
