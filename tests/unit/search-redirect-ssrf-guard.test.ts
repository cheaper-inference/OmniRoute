/**
 * /v1/search must re-check every redirect hop against the cloud-metadata guard.
 *
 * resolveSearchBaseUrl() validates the base URL, but the upstream call used a
 * plain fetch(), which follows 3xx on its own. A permitted host (for SearXNG,
 * a caller-chosen `provider_options.baseUrl`) could answer 302 and send the
 * request to 169.254.169.254; the caller could learn the status code and up to
 * 10 characters of a non-JSON body through the parse error.
 *
 * DNS names that resolve to a metadata address are covered in
 * search-dns-metadata-guard.test.ts.
 *
 * The redirecting host is a real local HTTP server. The metadata address is
 * never contacted: the fetch wrapper below answers for it, and it follows
 * redirects itself when the caller leaves `redirect` at its default, the same
 * way undici would.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/search-redirect-ssrf-guard.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-redirect-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");
const { fetchWithCheckedRedirects, isRegistryEndpoint } =
  await import("../../open-sse/handlers/search/redirectGuard.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { getGuardedDispatcher } = await import("../../open-sse/utils/connectGuardDispatcher.ts");

// The fake metadata answer is shaped like a SearXNG response on purpose, so a
// followed redirect would show up in the results. Real metadata documents are
// not SearXNG-shaped.
const FAKE_MARKER = "FAKE-METADATA-MARKER";
const metadataHits: string[] = [];
const isMetadataHost = (hostname: string) =>
  hostname === "169.254.169.254" || hostname.includes("a9fe:a9fe");

const realFetch = globalThis.fetch;
async function fetchWithFakeMetadata(
  input: string | URL | Request,
  init: RequestInit = {},
  hops = 0
): Promise<Response> {
  const url = new URL(input instanceof Request ? input.url : String(input));
  if (isMetadataHost(url.hostname)) {
    metadataHits.push(url.href);
    return Response.json({ results: [{ title: FAKE_MARKER, url: "http://x/", content: "x" }] });
  }
  const response = await realFetch(url, { ...init, redirect: "manual" });
  const location = response.headers.get("location");
  if ((init.redirect ?? "follow") === "follow" && location && response.status >= 300) {
    // undici gives up after 20 redirects.
    if (hops >= 20) throw new TypeError("fetch failed: redirect count exceeded");
    return fetchWithFakeMetadata(new URL(location, url), init, hops + 1);
  }
  return response;
}

function searxngResults(title: string) {
  return JSON.stringify({ results: [{ title, url: "https://searx.example/r", content: "ok" }] });
}

const lanHits: string[] = [];
type Seen = { method?: string; url?: string; authorization?: string; body: string };
type SeenHeaders = Record<string, string | undefined>;
const seenHeaders: SeenHeaders[] = [];
const chainHits: string[] = [];
let redirectBodyClosed = 0;
const seen: Seen[] = [];
const echo = http.createServer((req, res) => {
  if (req.url === "/hang") return; // never answers
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    seen.push({ method: req.method, url: req.url, authorization: req.headers.authorization, body });
    seenHeaders.push({
      cookie: req.headers.cookie,
      "proxy-authorization": req.headers["proxy-authorization"],
      "content-type": req.headers["content-type"],
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end("{}");
  });
});
await new Promise<void>((resolve) => echo.listen(0, "127.0.0.1", resolve));
const echoOrigin = `http://127.0.0.1:${(echo.address() as AddressInfo).port}`;

const server = http.createServer((req, res) => {
  const reqUrl = req.url || "/";
  if (reqUrl === "/307-same") {
    res.writeHead(307, { location: "/echo-same" });
    return res.end();
  }
  if (reqUrl === "/302-cross") {
    res.writeHead(302, { location: `${echoOrigin}/echo-cross` });
    return res.end();
  }
  if (reqUrl === "/307-cross" || reqUrl === "/308-cross") {
    res.writeHead(Number(reqUrl.slice(1, 4)), { location: `${echoOrigin}/echo-cross` });
    return res.end();
  }
  if (reqUrl === "/303-cross") {
    res.writeHead(303, { location: `${echoOrigin}/echo-cross` });
    return res.end();
  }
  if (reqUrl === "/303-same" || reqUrl === "/301-same") {
    res.writeHead(Number(reqUrl.slice(1, 4)), { location: "/echo-same" });
    return res.end();
  }
  if (reqUrl === "/echo-same") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      seen.push({
        method: req.method,
        url: req.url,
        authorization: req.headers.authorization,
        body,
      });
      res.writeHead(200, { "content-type": "application/json" });
      res.end("{}");
    });
    return;
  }
  const redirectTo = (location: string, status = 302) => {
    res.writeHead(status, { location });
    res.end();
  };
  const chain = /^\/chain\/(\d+)$/.exec(reqUrl);
  if (chain) {
    chainHits.push(reqUrl);
    const left = Number(chain[1]);
    if (left > 0) return redirectTo(`/chain/${left - 1}`);
    res.writeHead(200, { "content-type": "application/json" });
    return res.end("{}");
  }
  if (reqUrl === "/two-hop-metadata") return redirectTo("/to-metadata/x");
  if (reqUrl === "/rel/a/b") return redirectTo("/rel/x/y/z");
  if (reqUrl === "/rel/x/y/z") return redirectTo("w");
  if (reqUrl === "/status-300") return redirectTo("/lan/x", 300);
  if (reqUrl === "/status-304") return redirectTo("/lan/x", 304);
  if (reqUrl === "/status-305") return redirectTo("/lan/x", 305);
  if (reqUrl === "/status-306") return redirectTo("/lan/x", 306);
  if (reqUrl === "/to-hang") return redirectTo("/hang");
  if (reqUrl === "/to-hang-cross") return redirectTo(`${echoOrigin}/hang`);
  if (reqUrl === "/hang") return; // never answers
  if (reqUrl === "/redirect-endless-body") {
    res.writeHead(302, { location: "/lan/x" });
    const timer = setInterval(() => res.write("x".repeat(1024)), 5);
    res.on("close", () => {
      clearInterval(timer);
      redirectBodyClosed++;
    });
    return;
  }
  if (reqUrl.startsWith("/to-metadata/")) return redirectTo("http://169.254.169.254/latest/");
  if (reqUrl.startsWith("/to-mapped-metadata/")) {
    return redirectTo("http://[::ffff:169.254.169.254]/latest/");
  }
  if (reqUrl.startsWith("/loop/")) return redirectTo("/loop/search");
  if (reqUrl.startsWith("/moved/")) return redirectTo(`/lan${reqUrl.slice("/moved".length)}`);
  if (reqUrl === "/rel/x/y/w") {
    chainHits.push(reqUrl);
    res.writeHead(200, { "content-type": "application/json" });
    return res.end("{}");
  }
  if (reqUrl.startsWith("/lan/")) {
    lanHits.push(reqUrl);
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(searxngResults("LAN SearXNG result"));
  }
  res.writeHead(404);
  res.end();
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

test.beforeEach(() => {
  metadataHits.length = 0;
  lanHits.length = 0;
  seen.length = 0;
  seenHeaders.length = 0;
  chainHits.length = 0;
  redirectBodyClosed = 0;
  globalThis.fetch = fetchWithFakeMetadata as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = realFetch;
});

test.after(() => {
  server.close();
  server.closeAllConnections();
  echo.close();
  echo.closeAllConnections();
  core.resetDbInstance();
});

// Call-log artifacts are written after the response returns, so removing the
// directory in test.after() races them. Remove it once nothing else can run.
process.once("exit", () => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function searchVia(baseUrl: string, query: string) {
  const response = await searchRoute.POST(
    new Request("http://localhost/api/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        provider: "searxng-search",
        provider_options: { baseUrl },
      }),
    })
  );
  return { status: response.status, text: await response.text() };
}

test("a 302 from a permitted SearXNG host to cloud metadata is not followed", async () => {
  const result = await searchVia(`${origin}/to-metadata`, "redirect to metadata");

  assert.deepEqual(metadataHits, []);
  assert.notEqual(result.status, 200);
  assert.ok(!result.text.includes(FAKE_MARKER));
});

test("an IPv4-mapped IPv6 spelling of the metadata address is blocked on redirect too", async () => {
  const result = await searchVia(`${origin}/to-mapped-metadata`, "redirect to mapped metadata");

  assert.deepEqual(metadataHits, []);
  assert.notEqual(result.status, 200);
  assert.ok(!result.text.includes(FAKE_MARKER));
});

test("a redirect between self-hosted loopback paths still works", async () => {
  const result = await searchVia(`${origin}/moved`, "self hosted redirect");

  assert.equal(result.status, 200);
  assert.equal(lanHits.length, 1);
  assert.ok(lanHits[0].startsWith("/lan/search?q=self+hosted+redirect"));
  assert.equal(JSON.parse(result.text).results[0].title, "LAN SearXNG result");
});

test("a redirect loop stops instead of being followed forever", async () => {
  const result = await searchVia(`${origin}/loop`, "redirect loop");

  assert.notEqual(result.status, 200);
  assert.deepEqual(metadataHits, []);
});

test("a same-origin 307 keeps the method, body and Authorization header", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/307-same`, {
    method: "POST",
    headers: { authorization: "Bearer k", "content-type": "application/json" },
    body: '{"q":"x"}',
  });

  assert.equal(response.status, 200);
  assert.deepEqual(seen, [
    { method: "POST", url: "/echo-same", authorization: "Bearer k", body: '{"q":"x"}' },
  ]);
});

test("a cross-origin 302 turns POST into GET and drops Authorization", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/302-cross`, {
    method: "POST",
    headers: { authorization: "Bearer k", "content-type": "application/json" },
    body: '{"q":"x"}',
  });

  assert.equal(response.status, 200);
  assert.deepEqual(seen, [
    { method: "GET", url: "/echo-cross", authorization: undefined, body: "" },
  ]);
});

test("a cross-origin 307 or 308 keeps POST and its body but drops Authorization and Cookie", async () => {
  for (const status of [307, 308]) {
    seen.length = 0;
    seenHeaders.length = 0;
    const response = await fetchWithCheckedRedirects(`${origin}/${status}-cross`, {
      method: "POST",
      headers: {
        authorization: "Bearer k",
        cookie: "session=s",
        "content-type": "application/json",
      },
      body: '{"q":"x"}',
    });

    assert.equal(response.status, 200);
    assert.deepEqual(seen, [
      { method: "POST", url: "/echo-cross", authorization: undefined, body: '{"q":"x"}' },
    ]);
    assert.equal(seenHeaders[0].cookie, undefined, String(status));
    assert.equal(seenHeaders[0]["content-type"], "application/json", String(status));
  }
});

test("credentials dropped on a cross-origin hop stay dropped on a later same-origin hop", async () => {
  const sent: { url: string; headers: Headers }[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    sent.push({ url, headers: new Headers(init.headers) });
    if (url === "http://a.search-redirect.test/s") {
      return new Response(null, {
        status: 302,
        headers: { location: "http://b.search-redirect.test/1" },
      });
    }
    if (url === "http://b.search-redirect.test/1") {
      return new Response(null, { status: 307, headers: { location: "/2" } });
    }
    return Response.json({});
  }) as typeof fetch;

  const response = await fetchWithCheckedRedirects("http://a.search-redirect.test/s", {
    headers: { authorization: "Bearer k", cookie: "session=s" },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(
    sent.map(({ url, headers }) => [url, headers.get("authorization"), headers.get("cookie")]),
    [
      ["http://a.search-redirect.test/s", "Bearer k", "session=s"],
      ["http://b.search-redirect.test/1", null, null],
      ["http://b.search-redirect.test/2", null, null],
    ]
  );
});

test("a cross-origin hop also drops x-api-key and x-subscription-token", async () => {
  // fetch() keeps these custom key headers across origins; search providers use both.
  const sent: Headers[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    sent.push(new Headers(init.headers));
    return String(input) === "http://a.search-redirect.test/s"
      ? new Response(null, {
          status: 302,
          headers: { location: "http://b.search-redirect.test/1" },
        })
      : Response.json({});
  }) as typeof fetch;

  const response = await fetchWithCheckedRedirects("http://a.search-redirect.test/s", {
    headers: {
      authorization: "Bearer k",
      "x-api-key": "provider-key",
      "x-subscription-token": "sub-token",
    },
  });

  assert.equal(response.status, 200);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].get("authorization"), "Bearer k");
  assert.equal(sent[0].get("x-api-key"), "provider-key");
  assert.equal(sent[0].get("x-subscription-token"), "sub-token");
  assert.equal(sent[1].get("authorization"), null);
  assert.equal(sent[1].get("x-api-key"), null);
  assert.equal(sent[1].get("x-subscription-token"), null);
});

test("a redirect chain is checked on every hop, not only the first", async () => {
  await assert.rejects(
    fetchWithCheckedRedirects(`${origin}/two-hop-metadata`, {}),
    /cloud-metadata/i
  );
  assert.deepEqual(metadataHits, []);
});

test("exactly five redirects are followed", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/chain/5`, {});

  assert.equal(response.status, 200);
  await response.text();
  assert.equal(chainHits.length, 6);
});

test("a sixth redirect is refused and no seventh request is sent", async () => {
  await assert.rejects(fetchWithCheckedRedirects(`${origin}/chain/6`, {}), /exceeded 5 redirects/);
  assert.equal(chainHits.length, 6);
});

test("a cross-origin 302 drops Cookie, Proxy-Authorization and the body headers", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/302-cross`, {
    method: "POST",
    headers: {
      cookie: "session=s",
      "proxy-authorization": "Basic cA==",
      "content-type": "application/json",
    },
    body: '{"q":"x"}',
  });

  assert.equal(response.status, 200);
  assert.deepEqual(seenHeaders, [
    { cookie: undefined, "proxy-authorization": undefined, "content-type": undefined },
  ]);
});

test("a relative Location resolves against the hop that sent it, not the first URL", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/rel/a/b`, {});

  assert.equal(response.status, 200);
  await response.text();
  assert.deepEqual(chainHits, ["/rel/x/y/w"]);
});

test("an https to http redirect on the same host and port drops Authorization and Cookie", async () => {
  const sent: Headers[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    sent.push(new Headers(init.headers));
    return String(input) === "https://127.0.0.1:9443/s"
      ? new Response(null, { status: 302, headers: { location: "http://127.0.0.1:9443/s" } })
      : Response.json({});
  }) as typeof fetch;

  const response = await fetchWithCheckedRedirects("https://127.0.0.1:9443/s", {
    headers: { authorization: "Bearer k", cookie: "session=s" },
  });

  assert.equal(response.status, 200);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].get("authorization"), "Bearer k");
  assert.equal(sent[1].get("authorization"), null);
  assert.equal(sent[1].get("cookie"), null);
});

test("the body of the refused sixth redirect is cancelled too", async () => {
  let requests = 0;
  let cancelled = 0;
  globalThis.fetch = (async () => {
    requests++;
    const body = new ReadableStream({
      pull(controller) {
        controller.enqueue(new Uint8Array(1));
      },
      cancel() {
        cancelled++;
      },
    });
    return new Response(body, { status: 302, headers: { location: `/hop/${requests}` } });
  }) as typeof fetch;

  await assert.rejects(
    fetchWithCheckedRedirects("http://127.0.0.1:9/hop/0", {}),
    /exceeded 5 redirects/
  );
  assert.equal(requests, 6);
  assert.equal(cancelled, 6);
});

test("3xx statuses that are not redirects (300, 304, 305, 306) are returned, not followed", async () => {
  for (const status of [300, 304, 305, 306]) {
    const response = await fetchWithCheckedRedirects(`${origin}/status-${status}`, {});
    assert.equal(response.status, status);
    await response.text();
  }
  assert.deepEqual(lanHits, []);
});

for (const [label, hangPath] of [
  ["same-origin", "/to-hang"],
  ["cross-origin", "/to-hang-cross"],
] as const) {
  test(`the caller's abort signal still applies on a later ${label} hop`, async () => {
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), 200);
    let giveUpTimer: NodeJS.Timeout | undefined;
    const giveUp = new Promise<never>((_, reject) => {
      giveUpTimer = setTimeout(() => reject(new Error("second hop was not aborted")), 2000);
    });
    try {
      await assert.rejects(
        Promise.race([
          fetchWithCheckedRedirects(`${origin}${hangPath}`, { signal: controller.signal }),
          giveUp,
        ]),
        (error: Error) => error.name === "AbortError"
      );
    } finally {
      clearTimeout(abortTimer);
      clearTimeout(giveUpTimer);
    }
  });
}

test("the body of a followed redirect is cancelled", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/redirect-endless-body`, {});

  assert.equal(response.status, 200);
  await response.text();
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.equal(redirectBodyClosed, 1);
});

test('a caller that sets redirect: "error" still gets an error instead of a followed redirect', async () => {
  // The fake-metadata wrapper only models "follow"; use the real fetch here.
  globalThis.fetch = realFetch;
  await assert.rejects(
    fetchWithCheckedRedirects(`${origin}/302-cross`, { redirect: "error" }),
    TypeError
  );
  assert.deepEqual(seen, []);
});

test('a caller that sets redirect: "manual" gets the 3xx itself', async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/302-cross`, { redirect: "manual" });
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), `${echoOrigin}/echo-cross`);
  await response.body?.cancel();
  assert.deepEqual(seen, []);
});

test("a 303 turns POST into GET and drops the body", async () => {
  const response = await fetchWithCheckedRedirects(`${origin}/303-cross`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: '{"q":"x"}',
  });

  assert.equal(response.status, 200);
  assert.deepEqual(seen, [
    { method: "GET", url: "/echo-cross", authorization: undefined, body: "" },
  ]);
  assert.equal(seenHeaders[0]["content-type"], undefined);
});

test("a 303 keeps HEAD and turns PUT into GET; a 301 keeps PUT and its body", async () => {
  const head = await fetchWithCheckedRedirects(`${origin}/303-same`, { method: "HEAD" });
  assert.equal(head.status, 200);
  const put303 = await fetchWithCheckedRedirects(`${origin}/303-same`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: '{"q":"x"}',
  });
  assert.equal(put303.status, 200);
  const put = await fetchWithCheckedRedirects(`${origin}/301-same`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: '{"q":"x"}',
  });
  assert.equal(put.status, 200);

  assert.deepEqual(
    seen.map(({ method, body }) => ({ method, body })),
    [
      { method: "HEAD", body: "" },
      { method: "GET", body: "" },
      { method: "PUT", body: '{"q":"x"}' },
    ]
  );
});

// The first hop to a provider's fixed registry host keeps the patched fetch's
// pooled dispatcher (keep-alive, retry). A base URL from the connection or the
// caller gets the connect-time guard. Redirect hops are covered above and in
// search-dns-metadata-guard.test.ts.
type Captured = { url: string; dispatcher: unknown; redirect?: RequestRedirect };
async function firstHopOf(options: Parameters<typeof handleSearch>[0]): Promise<Captured> {
  const calls: Captured[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    calls.push({
      url: String(input),
      dispatcher: (init as { dispatcher?: unknown }).dispatcher,
      redirect: init.redirect,
    });
    return Response.json({ results: [] });
  }) as typeof fetch;
  await handleSearch({ maxResults: 5, searchType: "web", log: null, ...options });
  assert.equal(calls.length, 1, JSON.stringify(calls));
  return calls[0];
}

test("a built-in provider's registry host gets no guarded dispatcher on the first hop", async () => {
  const brave = await firstHopOf({
    query: "registry host",
    provider: "brave-search",
    credentials: { apiKey: "brave-test-key" },
  });
  assert.ok(brave.url.startsWith("https://api.search.brave.com/"), brave.url);
  assert.equal(brave.dispatcher, undefined);

  const parallel = await firstHopOf({
    query: "registry host",
    provider: "parallel-search",
    credentials: { apiKey: "parallel-test-key" },
  });
  assert.equal(parallel.url, "https://api.parallel.ai/v1/search");
  assert.equal(parallel.redirect, "error");
  assert.equal(parallel.dispatcher, undefined);
});

test("an operator or caller base URL gets the guarded dispatcher on the first hop", async () => {
  const guarded = getGuardedDispatcher("block-metadata");
  const operator = await firstHopOf({
    query: "operator base url",
    provider: "linkup-search",
    credentials: {
      apiKey: "linkup-test-key",
      providerSpecificData: { baseUrl: "https://linkup-mirror.example/v1/search" },
    },
  });
  assert.equal(operator.url, "https://linkup-mirror.example/v1/search");
  assert.equal(operator.dispatcher, guarded);

  const caller = await firstHopOf({
    query: "caller base url",
    provider: "searxng-search",
    providerOptions: { baseUrl: `${origin}/lan` },
    credentials: {},
  });
  assert.ok(caller.url.startsWith(`${origin}/lan/search?`), caller.url);
  assert.equal(caller.dispatcher, guarded);
});

test("a redirect from a registry first hop still gets the guarded dispatcher", async () => {
  // localhost:8888 is SearXNG's registry origin, so the first hop keeps the
  // pooled dispatcher. The host it redirects to is not a registry value and
  // must be checked at connect.
  const calls: Captured[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({ url, dispatcher: (init as { dispatcher?: unknown }).dispatcher });
    if (url.startsWith("http://localhost:8888/")) {
      return new Response(null, {
        status: 302,
        headers: { location: "http://searx-mirror.search-redirect.test/search" },
      });
    }
    return Response.json({ results: [] });
  }) as typeof fetch;

  await handleSearch({
    query: "registry redirect",
    provider: "searxng-search",
    providerOptions: { baseUrl: "http://localhost:8888/searxng" },
    credentials: {},
    maxResults: 5,
    searchType: "web",
    log: null,
  });

  assert.equal(calls.length, 2, JSON.stringify(calls));
  assert.ok(calls[0].url.startsWith("http://localhost:8888/searxng/search?"), calls[0].url);
  assert.equal(calls[0].dispatcher, undefined);
  assert.equal(calls[1].url, "http://searx-mirror.search-redirect.test/search");
  assert.equal(calls[1].dispatcher, getGuardedDispatcher("block-metadata"));
});

test("isRegistryEndpoint compares the whole origin", () => {
  const registry = "https://api.search.brave.com/res/v1";
  assert.equal(
    isRegistryEndpoint("https://api.search.brave.com/res/v1/web/search", registry),
    true
  );
  assert.equal(isRegistryEndpoint("https://api.search.brave.com:8443/res/v1", registry), false);
  assert.equal(isRegistryEndpoint("http://api.search.brave.com/res/v1", registry), false);
  assert.equal(isRegistryEndpoint("https://brave.example/res/v1", registry), false);
  // A host that only ends with the registry host is a different origin.
  assert.equal(isRegistryEndpoint("https://evil-api.search.brave.com/res/v1", registry), false);
  assert.equal(
    isRegistryEndpoint("http://evillocalhost:8888/search", "http://localhost:8888/search"),
    false
  );
  assert.equal(isRegistryEndpoint("not a url", registry), false);
});
