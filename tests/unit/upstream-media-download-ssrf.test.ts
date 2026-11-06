import { after, before, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import dns from "node:dns";
import type { AddressInfo } from "node:net";

import { handleMusicGeneration } from "../../open-sse/handlers/musicGeneration.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";
import { handleVideoGeneration } from "../../open-sse/handlers/videoGeneration.ts";
import { handleLeonardoVideoGeneration } from "../../open-sse/handlers/videoGeneration/leonardoHandler.ts";
import { normalizeRunwayVideoResult } from "../../open-sse/handlers/videoGeneration/runwayHelpers.ts";
import { handleHaiperImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/haiper.ts";
import { handleIdeogramImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/ideogram.ts";
import { handleLeonardoImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/leonardo.ts";
import { handleMagnificImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/magnific.ts";
import { handleAiHordeImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/aihorde.ts";
import { handleSyntxSpeech } from "../../open-sse/handlers/syntxAudio.ts";
import { fetchSyntxMediaBytes, SyntxMediaError } from "../../open-sse/services/syntxMedia.ts";
import { aiHordeImageCatalog } from "../../open-sse/services/aihordeImageCatalog.ts";
import {
  UPSTREAM_MEDIA_LIMITS,
  downloadUpstreamMedia,
  setPinnedFetchTestOverride,
  upstreamAudioContentType,
} from "../../src/shared/network/remoteImageFetch.ts";

// Provider result URLs (generated image / song / speech / video) are chosen by the upstream,
// not by OmniRoute. Each handler below must refuse to download one that points at loopback,
// at the cloud metadata address, or at a public host that redirects to loopback. Before the
// fix every handler fetched these with a bare fetch() and returned the bytes to the caller.

const SECRET = "LOOPBACK-ONLY-SECRET-5d1e";
const IMDS_SECRET = "IMDS-ROLE-CREDENTIALS-93ac";
const PUBLIC_BYTES = "public-media-bytes";
const REDIRECTOR = "203.0.113.10";
const PUBLIC_MEDIA = "203.0.113.11";
const MISSING_MEDIA = "203.0.113.12";
// Answers with a Content-Length of `oversizeLength` and a one-byte body.
const SIZED_MEDIA = "203.0.113.13";
// /hop/N redirects to /hop/N-1; /hop/0 serves PUBLIC_BYTES.
const HOPS = "203.0.113.14";
// Serves PUBLIC_BYTES with the Content-Type named in the path (/type/audio/wav).
const TYPED_MEDIA = "203.0.113.15";
// Answers 404 / 302 with a body stream that records whether it was cancelled.
const TRACKED_MEDIA = "203.0.113.16";
// Serves `bigBody` (allocated by the test that needs it).
const BIG_MEDIA = "203.0.113.17";
// Aborts `midDownloadAbort` when the download starts, then honours the request signal.
const SLOW_MEDIA = "203.0.113.18";

let oversizeLength = 0;
let bigBody: Buffer = Buffer.alloc(0);
let cancelledBodies = 0;
let publicHits = 0;
let midDownloadAbort: AbortController | null = null;

let loopbackServer: http.Server;
let loopbackPort = 0;
let loopbackHits = 0;
// Requests addressed to 127.0.0.1, counted before any connection is tried, so the loopback
// cases do not depend on the loopback interface being up.
let loopbackRequests = 0;
let imdsHits = 0;
let apiRoute: (url: URL, init: RequestInit) => Response | undefined = () => undefined;

// Saved when the suite starts and put back when it ends. The suite scopes the hooks, so
// other test files sharing the process (--test-isolation=none) never see these mocks.
let originalFetch: typeof fetch = globalThis.fetch;
let originalSetTimeout: typeof setTimeout = globalThis.setTimeout;

function trackedBody(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    pull: (controller) => controller.enqueue(new TextEncoder().encode("tracked")),
    cancel: () => {
      cancelledBodies++;
    },
  });
}

async function mockFetch(input: string | URL | Request, init: RequestInit = {}) {
  const url = new URL(input instanceof Request ? input.url : String(input));
  if (init.signal?.aborted) throw new DOMException("This operation was aborted", "AbortError");
  if (url.hostname === "127.0.0.1") loopbackRequests++;
  if (url.hostname === "127.0.0.1" && url.port === String(loopbackPort)) {
    return originalFetch(`http://127.0.0.1:${loopbackPort}${url.pathname}`);
  }
  if (url.hostname === "169.254.169.254") {
    imdsHits++;
    return new Response(IMDS_SECRET, { status: 200 });
  }
  if (url.hostname === REDIRECTOR) {
    const location = `https://127.0.0.1:${loopbackPort}/secret`;
    if (init.redirect === "manual") {
      return new Response(null, { status: 302, headers: { location } });
    }
    return mockFetch(location, init);
  }
  if (url.hostname === PUBLIC_MEDIA) {
    publicHits++;
    return new Response(PUBLIC_BYTES, { status: 200, headers: { "content-type": "audio/mpeg" } });
  }
  if (url.hostname === SIZED_MEDIA) {
    return new Response("x", {
      status: 200,
      headers: { "content-length": String(oversizeLength) },
    });
  }
  if (url.hostname === BIG_MEDIA) return new Response(bigBody, { status: 200 });
  if (url.hostname === SLOW_MEDIA) {
    publicHits++;
    midDownloadAbort?.abort();
    // Like the real fetch, reject with the signal's own reason, which need not be an Error.
    if (init.signal?.aborted) throw init.signal.reason;
    return new Response(PUBLIC_BYTES, { status: 200 });
  }
  if (url.hostname === HOPS) {
    const n = Number(url.pathname.split("/").pop());
    if (n === 0) return new Response(PUBLIC_BYTES, { status: 200 });
    return new Response(null, { status: 302, headers: { location: `/hop/${n - 1}` } });
  }
  if (url.hostname === TYPED_MEDIA) {
    const type = url.pathname.slice("/type/".length);
    return new Response(PUBLIC_BYTES, { status: 200, headers: { "content-type": type } });
  }
  if (url.hostname === TRACKED_MEDIA) {
    if (url.pathname === "/redirect") {
      const headers = { location: `https://${PUBLIC_MEDIA}/after-redirect` };
      return new Response(trackedBody(), { status: 302, headers });
    }
    return new Response(trackedBody(), { status: 404 });
  }
  if (url.hostname === MISSING_MEDIA) {
    return new Response("<html>not found</html>", { status: 404 });
  }
  const routed = apiRoute(url, init);
  if (routed) return routed;
  return new Response(`unexpected ${url}`, { status: 500 });
}

const json = (value: unknown) =>
  new Response(JSON.stringify(value), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

describe("upstream media downloads", () => {
  before(async () => {
    originalFetch = globalThis.fetch;
    originalSetTimeout = globalThis.setTimeout;
    loopbackServer = http.createServer((_req, res) => {
      loopbackHits++;
      res.writeHead(200, { "content-type": "audio/mpeg" });
      res.end(SECRET);
    });
    await new Promise<void>((resolve) => loopbackServer.listen(0, "127.0.0.1", resolve));
    loopbackPort = (loopbackServer.address() as AddressInfo).port;
    globalThis.fetch = mockFetch as typeof fetch;
    // Provider poll loops sleep 2 s / 5 s between polls; skip only those waits.
    globalThis.setTimeout = ((fn: (...args: unknown[]) => void, ms?: number, ...args: unknown[]) =>
      originalSetTimeout(fn, ms === 2000 || ms === 5000 ? 0 : ms, ...args)) as typeof setTimeout;
    setPinnedFetchTestOverride(mockFetch as typeof fetch);
  });

  after(async () => {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
    setPinnedFetchTestOverride(undefined);
    await new Promise<void>((resolve) => loopbackServer.close(() => resolve()));
  });

  // Defence in depth. The loopback cases count requests addressed to 127.0.0.1 before any
  // connection, and the rebinding tests count fetches that skip the pin, so no other test
  // needs lo. This one only confirms the loopback server answers, so loopbackHits === 0 is
  // meaningful. In a network namespace (`unshare -rn`) lo starts DOWN; run
  // `ip link set lo up` first, or this test fails.
  test("test setup: the loopback server is reachable", async () => {
    const res = await originalFetch(`http://127.0.0.1:${loopbackPort}/probe`).catch((err) => {
      throw new Error(`loopback server unreachable, is lo up? ${err?.cause?.code ?? err}`);
    });
    assert.equal(await res.text(), SECRET);
  });

  beforeEach(() => {
    loopbackHits = 0;
    loopbackRequests = 0;
    imdsHits = 0;
    publicHits = 0;
    cancelledBodies = 0;
  });

  // `status` is the HTTP status the handler reports; undefined where the code under test throws.
  type Outcome = { ok: boolean; payload: string; status?: number; contentType?: string | null };

  function decodeB64Result(result: {
    success?: boolean;
    status?: number;
    data?: { data?: Array<{ b64_json?: string }> };
    error?: unknown;
  }): Outcome {
    const b64 = result?.data?.data?.[0]?.b64_json;
    return {
      ok: result?.success === true,
      status: result?.success === true ? 200 : result?.status,
      payload: b64 ? Buffer.from(b64, "base64").toString("utf8") : JSON.stringify(result),
    };
  }

  async function responseOutcome(response: Response): Promise<Outcome> {
    return {
      ok: response.status === 200,
      status: response.status,
      contentType: response.headers.get("content-type"),
      payload: await response.text(),
    };
  }

  function fakeSyntxJwt(): string {
    const claims = { sub: "1", exp: Math.floor(Date.now() / 1000) + 3600 };
    return `eyJhbGciOiJub25lIn0.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.x`;
  }

  // SYNTX API calls go through the handler's fetchImpl; the result download does not.
  function syntxApi(mediaUrl: string): typeof fetch {
    return (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method || "GET").toUpperCase();
      if (url.endsWith("/api/v1/chats") && method === "POST") return json({ uuid: "chat-s1" });
      if (url.includes("/api/v1/audio/generate")) return json({ ok: true });
      if (url.includes("/api/v1/chats/chat-s1/messages")) {
        return json({
          messages: [
            {
              author_id: -1,
              created_at: new Date(Date.now() + 60_000).toISOString(),
              message_object: [{ object_type: "audio", object_url: mediaUrl, completed: true }],
            },
          ],
        });
      }
      return new Response(`unexpected ${url}`, { status: 500 });
    }) as typeof fetch;
  }

  type Kind = keyof typeof UPSTREAM_MEDIA_LIMITS;
  type Driver = (mediaUrl: string, signal?: AbortSignal) => Promise<Outcome>;

  const drivers: Record<string, Driver> = {
    "udio song_path (musicGeneration.ts)": async (mediaUrl, signal) => {
      apiRoute = (url) => {
        if (url.pathname === "/api/generate-proxy") return json({ track_ids: ["t1"] });
        if (url.pathname === "/api/songs") return json([{ finished: true, song_path: mediaUrl }]);
      };
      return decodeB64Result(
        await handleMusicGeneration({
          body: { model: "udio/udio-default", prompt: "p" },
          credentials: { apiKey: "udio-cookie" },
          log: null,
          signal,
        })
      );
    },
    "kie speech audio_url (audioSpeech.ts direct)": async (mediaUrl) => {
      apiRoute = (url) => {
        if (url.pathname === "/api/v1/jobs/createTask") {
          return json({ code: 200, data: { audio_url: mediaUrl } });
        }
      };
      return responseOutcome(
        await handleAudioSpeech({
          body: { model: "kie/kie-tts", input: "hello", voice: "alloy" },
          credentials: { apiKey: "kie-key" },
          resolvedProvider: {
            id: "kie",
            format: "kie-audio",
            baseUrl: "https://api.kie.ai/",
            authType: "bearer",
          } as never,
          resolvedModel: "kie/kie-tts",
        })
      );
    },
    "kie speech audio_url (audioSpeech.ts poll)": async (mediaUrl) => {
      apiRoute = (url) => {
        if (url.pathname === "/api/v1/jobs/createTask") return json({ data: { taskId: "k1" } });
        if (url.pathname === "/api/v1/jobs/recordInfo") {
          return json({ data: { state: "success", response: { audio_url: mediaUrl } } });
        }
      };
      return responseOutcome(
        await handleAudioSpeech({
          body: { model: "kie/kie-tts", input: "hello", voice: "alloy" },
          credentials: { apiKey: "kie-key" },
          resolvedProvider: {
            id: "kie",
            format: "kie-audio",
            baseUrl: "https://api.kie.ai/",
            authType: "bearer",
          } as never,
          resolvedModel: "kie/kie-tts",
        })
      );
    },
    "magnific generated[0] (magnific.ts)": async (mediaUrl) => {
      apiRoute = (url, init) => {
        if ((init.method || "GET") === "POST") return json({ data: { task_id: "m1" } });
        if (url.pathname.endsWith("/m1")) {
          return json({ data: { status: "COMPLETED", generated: [mediaUrl] } });
        }
      };
      return decodeB64Result(
        await handleMagnificImageGeneration({
          model: "realism",
          provider: "magnific",
          providerConfig: { baseUrl: "https://api.magnific.com/v1/ai/mystic" },
          body: { prompt: "p", poll_interval_ms: 1 },
          credentials: { apiKey: "m-key" },
          log: null,
        } as never)
      );
    },
    "haiper image creation_url (haiper.ts)": async (mediaUrl) => {
      apiRoute = (url, init) => {
        if ((init.method || "GET") === "POST") return json({ job_id: "h1" });
        if (url.pathname.endsWith("/h1"))
          return json({ status: "completed", creation_url: mediaUrl });
      };
      return decodeB64Result(
        await handleHaiperImageGeneration({
          model: "gen2",
          provider: "haiper",
          providerConfig: {
            baseUrl: "https://api.haiper.ai/v1/jobs/gen2/text2image",
            statusUrl: "https://api.haiper.ai/v1/jobs",
          },
          body: { prompt: "p" },
          credentials: { apiKey: "h-key" },
          log: null,
        })
      );
    },
    "ideogram data[0].url (ideogram.ts)": async (mediaUrl) => {
      apiRoute = (_url, init) => {
        if ((init.method || "GET") === "POST") return json({ data: [{ url: mediaUrl }] });
      };
      return decodeB64Result(
        await handleIdeogramImageGeneration({
          model: "V_3",
          provider: "ideogram",
          providerConfig: { baseUrl: "https://api.ideogram.ai/v1/ideogram-v3/generate" },
          body: { prompt: "p" },
          credentials: { apiKey: "i-key" },
          log: null,
        })
      );
    },
    "leonardo image generated_images[0] (leonardo.ts)": async (mediaUrl) => {
      apiRoute = (url, init) => {
        if ((init.method || "GET") === "POST")
          return json({ sdGenerationJob: { generationId: "l1" } });
        if (url.pathname.endsWith("/l1")) {
          return json({
            generations_by_pk: { status: "COMPLETE", generated_images: [{ url: mediaUrl }] },
          });
        }
      };
      return decodeB64Result(
        await handleLeonardoImageGeneration({
          model: "phoenix",
          provider: "leonardo",
          providerConfig: { baseUrl: "https://cloud.leonardo.ai/api/rest/v1/generations" },
          body: { prompt: "p" },
          credentials: { apiKey: "l-key" },
          log: null,
        })
      );
    },
    "haiper video creation_url (videoGeneration.ts)": async (mediaUrl, signal) => {
      apiRoute = (url, init) => {
        if ((init.method || "GET") === "POST") return json({ job_id: "hv1" });
        if (url.pathname.endsWith("/hv1"))
          return json({ status: "completed", creation_url: mediaUrl });
      };
      return decodeB64Result(
        await handleVideoGeneration({
          body: { model: "haiper/gen2", prompt: "p" },
          credentials: { apiKey: "h-key" },
          log: null,
          signal,
        })
      );
    },
    "leonardo video motionMP4URL (leonardoHandler.ts)": async (mediaUrl, signal) => {
      apiRoute = (url, init) => {
        if ((init.method || "GET") === "POST")
          return json({ motionVideoGenerationJob: { generationId: "lv1" } });
        if (url.pathname.endsWith("/lv1")) {
          return json({
            generations_by_pk: {
              status: "COMPLETE",
              generated_images: [{ motionMP4URL: mediaUrl }],
            },
          });
        }
      };
      return decodeB64Result(
        await handleLeonardoVideoGeneration({
          model: "phoenix",
          provider: "leonardo",
          providerConfig: {
            baseUrl: "https://cloud.leonardo.ai/api/rest/v2/generations-text-to-video",
            statusUrl: "https://cloud.leonardo.ai/api/rest/v1/generations",
          },
          body: { prompt: "p" },
          credentials: { apiKey: "l-key" },
          log: null,
          signal,
          pollIntervalMs: 1,
        })
      );
    },
    "syntx speech audio (syntxAudio.ts)": async (mediaUrl) =>
      responseOutcome(
        await handleSyntxSpeech({
          model: "elevenlabs/eleven_multilingual_v2",
          body: { input: "hello" },
          credentials: { accessToken: fakeSyntxJwt() },
          fetchImpl: syntxApi(mediaUrl),
        })
      ),
    "runway task.output (runwayHelpers.ts)": async (mediaUrl, signal) => {
      try {
        const videos = await normalizeRunwayVideoResult({ output: [mediaUrl] }, {}, signal);
        return decodeB64Result({ success: true, data: { data: videos } });
      } catch (err) {
        return { ok: false, payload: String(err) };
      }
    },
  };

  const blockedTargets: Record<string, () => string> = {
    "a loopback URL": () => `https://127.0.0.1:${loopbackPort}/secret`,
    "the cloud metadata address": () =>
      "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
    "a public host that 302-redirects to loopback": () => `https://${REDIRECTOR}/song.mp3`,
  };

  const siteKind: Record<string, Kind> = {
    "udio song_path (musicGeneration.ts)": "audio",
    "kie speech audio_url (audioSpeech.ts direct)": "audio",
    "kie speech audio_url (audioSpeech.ts poll)": "audio",
    "magnific generated[0] (magnific.ts)": "image",
    "haiper image creation_url (haiper.ts)": "image",
    "ideogram data[0].url (ideogram.ts)": "image",
    "leonardo image generated_images[0] (leonardo.ts)": "image",
    "haiper video creation_url (videoGeneration.ts)": "video",
    "leonardo video motionMP4URL (leonardoHandler.ts)": "video",
    "syntx speech audio (syntxAudio.ts)": "audio",
    "runway task.output (runwayHelpers.ts)": "video",
  };
  // SYNTX keeps its own 50 MiB read limit (SYNTX_MEDIA_MAX_BYTES).
  const siteCap = (site: string) =>
    site.startsWith("syntx") ? 50 * 1024 * 1024 : UPSTREAM_MEDIA_LIMITS[siteKind[site]].maxBytes;

  for (const [site, drive] of Object.entries(drivers)) {
    for (const [label, target] of Object.entries(blockedTargets)) {
      test(`${site}: refuses ${label}`, async () => {
        const outcome = await drive(target());
        assert.equal(outcome.ok, false, `download should fail, got: ${outcome.payload}`);
        if (outcome.status !== undefined) assert.equal(outcome.status, 502, outcome.payload);
        assert.doesNotMatch(outcome.payload, /\b\w+Error:/, "no error class name in the message");
        assert.ok(!outcome.payload.includes(SECRET), "loopback body must not reach the caller");
        assert.ok(
          !outcome.payload.includes(IMDS_SECRET),
          "metadata body must not reach the caller"
        );
        assert.equal(loopbackRequests, 0, "no request may be sent to loopback");
        assert.equal(loopbackHits, 0, "loopback server must not be contacted");
        assert.equal(imdsHits, 0, "metadata address must not be contacted");
      });
    }

    test(`${site}: still downloads a public HTTPS result URL`, async () => {
      const outcome = await drive(`https://${PUBLIC_MEDIA}/result.bin`);
      assert.equal(outcome.ok, true, outcome.payload);
      assert.equal(outcome.payload, PUBLIC_BYTES);
    });

    test(`${site}: refuses a result one byte over its ${siteKind[site]} cap`, async () => {
      oversizeLength = siteCap(site) + 1;
      const outcome = await drive(`https://${SIZED_MEDIA}/big.bin`);
      assert.equal(outcome.ok, false, `download should fail, got: ${outcome.payload}`);
      // SYNTX already answered an over-limit body with 413 before this change; that stays.
      const expected = site.startsWith("syntx") ? 413 : 502;
      if (outcome.status !== undefined) assert.equal(outcome.status, expected, outcome.payload);
      assert.doesNotMatch(outcome.payload, /Remote image/);
    });

    test(`${site}: accepts a result exactly at its ${siteKind[site]} cap`, async () => {
      oversizeLength = siteCap(site);
      const outcome = await drive(`https://${SIZED_MEDIA}/at-cap.bin`);
      assert.equal(outcome.ok, true, outcome.payload);
    });
  }

  // Runway through handleVideoGeneration, so the handler's signal plumbing is covered too.
  const runwayHandlerDriver: Driver = async (mediaUrl, signal) => {
    apiRoute = (url, init) => {
      if ((init.method || "GET") === "POST") return json({ id: "rt1" });
      if (url.pathname.endsWith("/tasks/rt1")) {
        return json({ id: "rt1", status: "SUCCEEDED", output: [mediaUrl] });
      }
    };
    return decodeB64Result(
      await handleVideoGeneration({
        body: { model: "runwayml/gen4.5", prompt: "p" },
        credentials: { apiKey: "r-key" },
        log: null,
        signal,
      })
    );
  };
  const abortDrivers: Record<string, Driver> = {
    "udio song_path (musicGeneration.ts)": drivers["udio song_path (musicGeneration.ts)"],
    "haiper video creation_url (videoGeneration.ts)":
      drivers["haiper video creation_url (videoGeneration.ts)"],
    "leonardo video motionMP4URL (leonardoHandler.ts)":
      drivers["leonardo video motionMP4URL (leonardoHandler.ts)"],
    "runway task.output (runwayHelpers.ts)": drivers["runway task.output (runwayHelpers.ts)"],
    "runway handler (videoGeneration.ts)": runwayHandlerDriver,
  };

  for (const [site, driver] of Object.entries(abortDrivers)) {
    test(`${site}: a cancelled request does not download the result`, async () => {
      const controller = new AbortController();
      controller.abort();
      const outcome = await driver(`https://${PUBLIC_MEDIA}/result.bin`, controller.signal);
      assert.equal(outcome.ok, false, outcome.payload);
      assert.equal(publicHits, 0, "the result host must not be contacted after the abort");
    });

    test(`${site}: a request cancelled during the download stops it`, async () => {
      const controller = new AbortController();
      midDownloadAbort = controller;
      try {
        const outcome = await driver(`https://${SLOW_MEDIA}/result.bin`, controller.signal);
        assert.equal(publicHits, 1, "the download must have started");
        assert.equal(outcome.ok, false, outcome.payload);
      } finally {
        midDownloadAbort = null;
      }
    });
  }

  for (const [label, reason] of [
    ["an Error", new DOMException("This operation was aborted", "AbortError")],
    ["a non-Error", "client went away"],
  ] as const) {
    test(`haiper video: an abort with ${label} reason during the download is a 499`, async () => {
      apiRoute = (url, init) => {
        if ((init.method || "GET") === "POST") return json({ job_id: "hv-abort" });
        if (url.pathname.endsWith("/hv-abort")) {
          return json({ status: "completed", creation_url: `https://${SLOW_MEDIA}/result.bin` });
        }
      };
      const controller = new AbortController();
      midDownloadAbort = { abort: () => controller.abort(reason) } as AbortController;
      try {
        const result = await handleVideoGeneration({
          body: { model: "haiper/gen2", prompt: "p" },
          credentials: { apiKey: "h-key" },
          log: null,
          signal: controller.signal,
        });
        assert.equal(publicHits, 1, "the download must have started");
        assert.deepEqual(result, { success: false, status: 499, error: "Request aborted" });
      } finally {
        midDownloadAbort = null;
      }
    });
  }

  test("runway handler: a public result still downloads", async () => {
    const outcome = await runwayHandlerDriver(`https://${PUBLIC_MEDIA}/result.bin`);
    assert.equal(outcome.ok, true, outcome.payload);
    assert.equal(outcome.payload, PUBLIC_BYTES);
  });

  test("syntx speech downloads through the pinned connection", async () => {
    let pinnedHits = 0;
    setPinnedFetchTestOverride(((input: string | URL | Request, init?: RequestInit) => {
      pinnedHits++;
      return mockFetch(input, init);
    }) as typeof fetch);
    try {
      const outcome = await drivers["syntx speech audio (syntxAudio.ts)"](
        `https://${PUBLIC_MEDIA}/speech.mp3`
      );
      assert.equal(outcome.ok, true, outcome.payload);
      assert.equal(pinnedHits, 1);
    } finally {
      setPinnedFetchTestOverride(mockFetch as typeof fetch);
    }
  });

  test("runway: all outputs share one video byte budget", async () => {
    const cap = UPSTREAM_MEDIA_LIMITS.video.maxBytes;
    bigBody = Buffer.alloc(cap - 10 * 1024 * 1024, 1);
    oversizeLength = 20 * 1024 * 1024; // under the cap alone, over what the first output left
    try {
      await assert.rejects(
        normalizeRunwayVideoResult(
          { output: [`https://${BIG_MEDIA}/a.mp4`, `https://${SIZED_MEDIA}/b.mp4`] },
          {}
        ),
        /Runway output fetch failed \(Remote media exceeds \d+ byte limit\)/
      );
    } finally {
      bigBody = Buffer.alloc(0);
    }
  });

  test("upstream media follows at most three redirects", async () => {
    const opts = { maxBytes: 1024, timeoutMs: 1_000 };
    const ok = await downloadUpstreamMedia(`https://${HOPS}/hop/3`, opts);
    assert.equal(ok.buffer.toString(), PUBLIC_BYTES);
    await assert.rejects(downloadUpstreamMedia(`https://${HOPS}/hop/4`, opts), /redirect limit/);
  });

  test("upstream media cancels the body of a redirect and of an error response", async () => {
    const opts = { maxBytes: 1024, timeoutMs: 1_000 };
    await downloadUpstreamMedia(`https://${TRACKED_MEDIA}/redirect`, opts);
    await assert.rejects(downloadUpstreamMedia(`https://${TRACKED_MEDIA}/missing`, opts), /404/);
    assert.equal(cancelledBodies, 2);
  });

  test("kie speech keeps an audio/* Content-Type and relabels anything else", async () => {
    const drive = drivers["kie speech audio_url (audioSpeech.ts direct)"];
    const wav = await drive(`https://${TYPED_MEDIA}/type/audio/wav`);
    assert.equal(wav.contentType, "audio/wav");
    const html = await drive(`https://${TYPED_MEDIA}/type/text/html`);
    assert.equal(html.ok, true, html.payload);
    assert.equal(html.contentType, "audio/mpeg");
    assert.equal(upstreamAudioContentType("audio/ogg; codecs=opus"), "audio/ogg; codecs=opus");
    assert.equal(upstreamAudioContentType("application/octet-stream"), "audio/mpeg");
  });

  test("syntx speech relabels a non-audio Content-Type", async () => {
    const drive = drivers["syntx speech audio (syntxAudio.ts)"];
    const html = await drive(`https://${TYPED_MEDIA}/type/text/html`);
    assert.equal(html.ok, true, html.payload);
    assert.equal(html.contentType, "audio/mpeg");
  });

  test("fetchSyntxMediaBytes refuses loopback, metadata and redirect-to-loopback URLs", async () => {
    for (const target of Object.values(blockedTargets)) {
      await assert.rejects(
        fetchSyntxMediaBytes(target()),
        (err: unknown) => err instanceof SyntxMediaError && err.status === 502
      );
    }
    assert.equal(loopbackRequests, 0);
    assert.equal(loopbackHits, 0);
    assert.equal(imdsHits, 0);
    const ok = await fetchSyntxMediaBytes(`https://${PUBLIC_MEDIA}/out.png`);
    assert.equal(ok.bytes.toString(), PUBLIC_BYTES);
  });

  test("fetchSyntxMediaBytes cancels the body of an error response", async () => {
    await assert.rejects(
      fetchSyntxMediaBytes(`https://${TRACKED_MEDIA}/gone.png`),
      (err: unknown) => err instanceof SyntxMediaError && err.status === 404
    );
    assert.equal(cancelledBodies, 1);
  });

  for (const site of [
    "kie speech audio_url (audioSpeech.ts direct)",
    "kie speech audio_url (audioSpeech.ts poll)",
  ]) {
    test(`${site}: an upstream 404 is not relayed as a 200 audio response`, async () => {
      const outcome = await drivers[site](`https://${MISSING_MEDIA}/gone.mp3`);
      assert.equal(outcome.ok, false, `expected a non-200 response, got: ${outcome.payload}`);
    });
  }

  test("aihorde R2 download is pinned to the checked address (no second DNS lookup)", async () => {
    // The guard resolves r2.rebind.test to a public address; a connection that resolved the
    // name again would get loopback. The mock global fetch plays that second resolution, so
    // reaching it means the connection was not pinned to the checked address.
    aiHordeImageCatalog.replace([
      { name: "FLUX.1-schnell", count: 3, queued: 0, eta: 1, performance: 1, jobs: 0 },
    ]);
    const originalLookup = dns.promises.lookup;
    let rebindFetches = 0;
    (dns.promises as { lookup: unknown }).lookup = (async (host: string, opts?: unknown) => {
      if (host === "r2.rebind.test") return [{ address: "203.0.113.7", family: 4 }];
      return (originalLookup as (h: string, o?: unknown) => Promise<unknown>)(host, opts);
    }) as typeof dns.promises.lookup;
    setPinnedFetchTestOverride(undefined);
    apiRoute = (url, init) => {
      if (url.pathname.includes("/v2/generate/async")) {
        return new Response(JSON.stringify({ id: "job-rebind" }), { status: 202 });
      }
      if ((init.method || "GET").toUpperCase() === "DELETE") return json({});
      if (url.pathname.includes("/v2/generate/check/")) {
        return json({ done: true, is_possible: true, faulted: false });
      }
      if (url.pathname.includes("/v2/generate/status/")) {
        return json({ generations: [{ img: "https://r2.rebind.test/img.png" }] });
      }
    };
    const forward = globalThis.fetch;
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      if (url.hostname === "r2.rebind.test") {
        rebindFetches++;
        return originalFetch(`http://127.0.0.1:${loopbackPort}/rebound`);
      }
      return forward(input, init);
    }) as typeof fetch;
    try {
      const result = await handleAiHordeImageGeneration({
        model: "FLUX.1-schnell",
        provider: "aihorde",
        body: { model: "aihorde/FLUX.1-schnell", prompt: "p" },
        credentials: { apiKey: "horde-key" },
        timeoutMs: 5_000,
      });
      assert.ok(!JSON.stringify(result).includes(Buffer.from(SECRET).toString("base64")));
      assert.equal(result.success, false);
      assert.equal(rebindFetches, 0, "download must not go through an unpinned connection");
      assert.equal(loopbackHits, 0);
    } finally {
      globalThis.fetch = forward;
      (dns.promises as { lookup: unknown }).lookup = originalLookup;
      setPinnedFetchTestOverride(mockFetch as typeof fetch);
    }
  });

  test("downloadUpstreamMedia refuses a plain-http result URL even on a public host", async () => {
    await assert.rejects(
      downloadUpstreamMedia(`http://${PUBLIC_MEDIA}/result.bin`, {
        maxBytes: 1024,
        timeoutMs: 1_000,
      })
    );
  });

  test("downloadUpstreamMedia connects to the address it checked (no second DNS lookup)", async () => {
    const originalLookup = dns.promises.lookup;
    let rebindFetches = 0;
    (dns.promises as { lookup: unknown }).lookup = (async (host: string, opts?: unknown) => {
      if (host === "media.rebind.test") return [{ address: "203.0.113.8", family: 4 }];
      return (originalLookup as (h: string, o?: unknown) => Promise<unknown>)(host, opts);
    }) as typeof dns.promises.lookup;
    setPinnedFetchTestOverride(undefined);
    const forward = globalThis.fetch;
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      if (url.hostname === "media.rebind.test") {
        rebindFetches++;
        return originalFetch(`http://127.0.0.1:${loopbackPort}/rebound`);
      }
      return forward(input, init);
    }) as typeof fetch;
    try {
      // The pinned connection goes to unroutable TEST-NET and times out; an unpinned one
      // would land on the mock's "second resolution" and return the loopback secret.
      await assert.rejects(
        downloadUpstreamMedia("https://media.rebind.test/v.mp4", { maxBytes: 1024, timeoutMs: 300 })
      );
      assert.equal(rebindFetches, 0, "download must not go through an unpinned connection");
      assert.equal(loopbackHits, 0);
    } finally {
      globalThis.fetch = forward;
      (dns.promises as { lookup: unknown }).lookup = originalLookup;
      setPinnedFetchTestOverride(mockFetch as typeof fetch);
    }
  });

  test("downloadUpstreamMedia enforces the caller's byte cap", async () => {
    await assert.rejects(
      downloadUpstreamMedia(`https://${PUBLIC_MEDIA}/result.bin`, {
        maxBytes: 4,
        timeoutMs: 1_000,
      }),
      /exceed|limit|too large/i
    );
  });
});
