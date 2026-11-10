import { after, before, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";

import { handleAudioTranscription } from "../../open-sse/handlers/audioTranscription.ts";
import { setSafeOutboundPinnedFetchTestOverride } from "../../src/shared/network/safeOutboundFetch.ts";

// Gladia's submit response names the URL to poll (`result_url`), and the poll carries the
// `x-gladia-key` header. fetch() strips Authorization on a cross-origin redirect but keeps
// custom headers like this one, so the handler must only poll Gladia's own origin and must
// not follow redirects.

const KEY = "gladia-secret-key-0c7e";
const COLLECTOR = "collector.example";

let collectorHits: Array<Record<string, string>> = [];
let resultUrl = "";
let pollRedirectsTo: string | null = null;
// Polls that reached a Gladia-named host, on any scheme, port or subdomain.
let gladiaPolls: string[] = [];
let gladiaApiAddress = "203.0.113.30";
let pinnedTo: Array<{ address: string; family: number }> = [];
// When set, the first canonical poll answers 503 with a body that records its cancellation.
let failFirstPoll = false;
let cancelledPollBodies = 0;

const resultUrlCanonical = "https://api.gladia.io/v2/pre-recorded/job-1";
// Saved when the suite starts and put back when it ends. The suite scopes the hooks, so
// other test files sharing the process (--test-isolation=none) never see these mocks.
let originalFetch: typeof fetch = globalThis.fetch;
let originalSetTimeout: typeof setTimeout = globalThis.setTimeout;
let originalLookup: typeof dns.promises.lookup = dns.promises.lookup;

function headersOf(init: RequestInit = {}): Record<string, string> {
  return Object.fromEntries(new Headers(init.headers).entries());
}

async function mockFetch(input: string | URL | Request, init: RequestInit = {}) {
  const url = new URL(input instanceof Request ? input.url : String(input));
  if (url.hostname === COLLECTOR) {
    collectorHits.push(headersOf(init));
    return new Response(JSON.stringify({ status: "done", result: { transcription: {} } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
  if (url.href === "https://api.gladia.io/v2/upload") {
    return Response.json({ audio_url: "https://api.gladia.io/file/1" });
  }
  if (url.href === "https://api.gladia.io/v2/pre-recorded") {
    return Response.json({ id: "job-1", result_url: resultUrl });
  }
  if (url.pathname === "/v2/pre-recorded/job-1" && url.href !== resultUrlCanonical) {
    gladiaPolls.push(url.href);
    return Response.json({ status: "done", result: { transcription: { full_transcript: "x" } } });
  }
  if (url.href === resultUrlCanonical) {
    gladiaPolls.push(url.href);
    if (failFirstPoll && gladiaPolls.length === 1) {
      const body = new ReadableStream<Uint8Array>({
        pull: (controller) => controller.enqueue(new TextEncoder().encode("busy")),
        cancel: () => {
          cancelledPollBodies++;
        },
      });
      return new Response(body, { status: 503 });
    }
    if (pollRedirectsTo) {
      if (init.redirect === "manual") {
        return new Response(null, { status: 302, headers: { location: pollRedirectsTo } });
      }
      // What undici does when following: drop Authorization/Cookie across origins only.
      const { authorization: _a, cookie: _c, ...kept } = headersOf(init);
      return mockFetch(pollRedirectsTo, { ...init, headers: kept });
    }
    if (headersOf(init)["x-gladia-key"] !== KEY) return new Response("no key", { status: 401 });
    return Response.json({
      status: "done",
      result: { transcription: { full_transcript: "hello from gladia" } },
    });
  }
  return new Response(`unexpected ${url.href}`, { status: 500 });
}

describe("Gladia result_url origin", () => {
  before(() => {
    originalFetch = globalThis.fetch;
    originalSetTimeout = globalThis.setTimeout;
    originalLookup = dns.promises.lookup;
    globalThis.fetch = mockFetch as typeof fetch;
    globalThis.setTimeout = ((fn: (...args: unknown[]) => void, ms?: number, ...args: unknown[]) =>
      originalSetTimeout(fn, ms === 2000 ? 0 : ms, ...args)) as typeof setTimeout;
    (dns.promises as { lookup: unknown }).lookup = (async (host: string, opts?: unknown) => {
      if (host === "api.gladia.io") return [{ address: gladiaApiAddress, family: 4 }];
      if (host === COLLECTOR || host.endsWith(".api.gladia.io")) {
        return [{ address: "203.0.113.30", family: 4 }];
      }
      return (originalLookup as (h: string, o?: unknown) => Promise<unknown>)(host, opts);
    }) as typeof dns.promises.lookup;
    setSafeOutboundPinnedFetchTestOverride((address: string, family: number) => {
      pinnedTo.push({ address, family });
      return mockFetch as typeof fetch;
    });
  });

  after(() => {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
    (dns.promises as { lookup: unknown }).lookup = originalLookup;
    setSafeOutboundPinnedFetchTestOverride(undefined);
  });

  beforeEach(() => {
    collectorHits = [];
    pollRedirectsTo = null;
    gladiaPolls = [];
    gladiaApiAddress = "203.0.113.30";
    pinnedTo = [];
    failFirstPoll = false;
    cancelledPollBodies = 0;
  });

  async function transcribe() {
    const formData = new FormData();
    formData.append("model", "gladia/solaria-1");
    formData.append("file", new File(["abc"], "clip.wav", { type: "audio/wav" }));
    return handleAudioTranscription({ formData, credentials: { apiKey: KEY } });
  }

  test("Gladia: a result_url on another origin is not polled with x-gladia-key", async () => {
    resultUrl = `https://${COLLECTOR}/v2/pre-recorded/job-1`;
    const response = await transcribe();
    assert.equal(response.status, 502);
    assert.equal(collectorHits.length, 0, "the foreign origin must not be contacted");
  });

  test("Gladia: a same-origin result_url that redirects off-origin does not carry the key", async () => {
    resultUrl = "https://api.gladia.io/v2/pre-recorded/job-1";
    pollRedirectsTo = `https://${COLLECTOR}/steal`;
    const response = await transcribe();
    assert.equal(response.status, 502);
    assert.equal(collectorHits.length, 0, "the redirect target must not be contacted");
  });

  test("Gladia: a same-origin result_url is polled with x-gladia-key", async () => {
    resultUrl = "https://api.gladia.io/v2/pre-recorded/job-1";
    const response = await transcribe();
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { text: "hello from gladia" });
  });

  for (const [label, url] of [
    ["plain http on the same host", "http://api.gladia.io/v2/pre-recorded/job-1"],
    ["another port on the same host", "https://api.gladia.io:8443/v2/pre-recorded/job-1"],
    ["a subdomain of the API host", "https://x.api.gladia.io/v2/pre-recorded/job-1"],
  ]) {
    test(`Gladia: a result_url on ${label} is refused before any poll`, async () => {
      resultUrl = url;
      const response = await transcribe();
      assert.equal(response.status, 502);
      assert.deepEqual(gladiaPolls, []);
    });
  }

  test("Gladia: the poll is refused when the API host resolves to a private address", async () => {
    resultUrl = resultUrlCanonical;
    gladiaApiAddress = "10.0.0.5";
    const response = await transcribe();
    assert.equal(response.status, 502);
    assert.match((await response.json()).error.message, /blocked address/);
    assert.deepEqual(gladiaPolls, []);
  });

  test("Gladia: the poll connects to the address the guard checked", async () => {
    resultUrl = resultUrlCanonical;
    const response = await transcribe();
    assert.equal(response.status, 200);
    assert.deepEqual(pinnedTo, [{ address: "203.0.113.30", family: 4 }]);
  });

  test("Gladia: the body of a failed poll is cancelled before the next poll", async () => {
    resultUrl = resultUrlCanonical;
    failFirstPoll = true;
    const response = await transcribe();
    assert.equal(response.status, 200);
    assert.equal(gladiaPolls.length, 2);
    assert.equal(cancelledPollBodies, 1);
  });
});
