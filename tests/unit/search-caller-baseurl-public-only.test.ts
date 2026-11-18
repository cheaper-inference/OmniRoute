/**
 * A caller-supplied `provider_options.baseUrl` (SearXNG) must reach public hosts only.
 *
 * /v1/search can be called without a credential, so a caller base URL that reaches
 * loopback or LAN lets anyone make the server fetch internal services and read the
 * answer back. Loopback and LAN stay available through the operator's stored
 * connection, which is configuration, not request input.
 *
 * DNS is mocked: *.search-public.test names resolve to fixed addresses and no real
 * resolver is asked.
 */

import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";
import type { AddressInfo } from "node:net";

const MOCK_ADDRESSES: Record<string, string> = {
  // A name that looks public but resolves to loopback.
  "rebind.search-public.test": "127.0.0.1",
};
type LookupCallback = (err: Error | null, address?: unknown, family?: number) => void;
const realLookup = dns.lookup;
(dns as unknown as { lookup: unknown }).lookup = (
  hostname: string,
  options: dns.LookupOptions | LookupCallback,
  callback?: LookupCallback
) => {
  const cb = (typeof options === "function" ? options : callback) as LookupCallback;
  const opts = typeof options === "function" ? {} : options;
  const address = MOCK_ADDRESSES[hostname];
  if (!address) return (realLookup as (...args: unknown[]) => void)(hostname, options, callback);
  const entry = { address, family: 4 };
  process.nextTick(() => (opts?.all ? cb(null, [entry]) : cb(null, address, 4)));
};

// Production installs the patched global fetch; use the same path here.
await import("../../open-sse/utils/proxyFetch.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { resolveSearchBaseUrl } = await import("../../open-sse/handlers/search/baseUrl.ts");
const { fetchWithCheckedRedirects } =
  await import("../../open-sse/handlers/search/redirectGuard.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");

const seen: string[] = [];
const server = http.createServer((req, res) => {
  seen.push(req.url || "");
  if (req.url?.startsWith("/to-loopback")) {
    res.writeHead(302, { location: `http://127.0.0.1:${port}/search` });
    return res.end();
  }
  res.writeHead(200, { "content-type": "application/json" });
  res.end('{"results":[{"title":"internal","url":"http://x.invalid/","content":"INTERNAL"}]}');
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = (server.address() as AddressInfo).port;

test.beforeEach(() => {
  seen.length = 0;
});

test.after(() => {
  server.close();
  server.closeAllConnections();
  (dns as unknown as { lookup: unknown }).lookup = realLookup;
});

const searxng = SEARCH_PROVIDERS["searxng-search"];
const noOverride = { providerOptions: {}, providerSpecificData: {} };

function search(extra: Record<string, unknown>) {
  return handleSearch({
    query: "internal probe",
    provider: "searxng-search",
    maxResults: 5,
    searchType: "web",
    timeoutMs: 5000,
    credentials: {},
    ...extra,
  } as never);
}

test("a caller base URL on loopback, LAN or localhost is refused by name", () => {
  for (const baseUrl of [
    "http://127.0.0.1:8888",
    "http://localhost:8888",
    "http://10.0.0.5:8888",
    "http://192.168.1.10",
    "http://[::1]:8888",
  ]) {
    assert.throws(
      () => resolveSearchBaseUrl(searxng, { ...noOverride, providerOptions: { baseUrl } }),
      /Blocked/,
      `${baseUrl} was accepted from the caller`
    );
  }
});

test("a caller base URL on a public host is still accepted", () => {
  assert.equal(
    resolveSearchBaseUrl(searxng, {
      ...noOverride,
      providerOptions: { baseUrl: "https://searx.example.org/" },
    }),
    "https://searx.example.org"
  );
});

test("the operator's stored base URL keeps loopback and LAN", () => {
  assert.equal(
    resolveSearchBaseUrl(searxng, {
      ...noOverride,
      providerSpecificData: { baseUrl: "http://127.0.0.1:8888" },
    }),
    "http://127.0.0.1:8888"
  );
});

test("a caller loopback base URL never reaches the internal server", async () => {
  // The name check throws before any request; the route turns that into an error response.
  await assert.rejects(
    search({ providerOptions: { baseUrl: `http://127.0.0.1:${port}` } }),
    /Blocked private or local provider URL/
  );
  assert.deepEqual(seen, []);
});

test("a caller name that resolves to loopback is refused before any request", async () => {
  const result = await search({
    providerOptions: { baseUrl: `http://rebind.search-public.test:${port}` },
  });
  assert.equal(result.success, false);
  assert.deepEqual(seen, []);
});

test("public-only redirects: a Location on loopback is not followed", async () => {
  await assert.rejects(
    fetchWithCheckedRedirects(`http://127.0.0.1:${port}/to-loopback`, {}, "searxng-search", false, {
      guard: "public-only",
    })
  );
  assert.deepEqual(seen, ["/to-loopback"]);
});

test("the operator's stored loopback base URL still works", async () => {
  const result = await search({
    credentials: { providerSpecificData: { baseUrl: `http://127.0.0.1:${port}` } },
  });
  assert.equal(result.success, true);
  assert.equal(seen.length, 1);
});
