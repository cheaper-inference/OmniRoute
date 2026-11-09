/**
 * /v1/search must not reach a cloud-metadata address through a DNS name.
 *
 * The name check (parseAndValidateNonMetadataUrl) only sees the hostname, so a
 * name such as 169-254-169-254.nip.io passed it on the first hop and on every
 * redirect hop. On a direct connection every redirect hop, and a first hop to
 * an operator or caller base URL, now goes through the connect-time guarded
 * dispatcher, which checks the addresses of the lookup the socket uses.
 *
 * DNS is mocked: *.search-guard.test names resolve to fixed addresses and no
 * real resolver is asked. The metadata name uses port 47, where no metadata
 * service listens.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/search-dns-metadata-guard.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";
import net from "node:net";
import type { AddressInfo } from "node:net";

const MOCK_ADDRESSES: Record<string, string> = {
  "imds.search-guard.test": "169.254.169.254",
  "searx.search-guard.test": "127.0.0.1",
};
const lookups: string[] = [];
const realLookup = dns.lookup;
type LookupCallback = (err: Error | null, address?: unknown, family?: number) => void;
(dns as unknown as { lookup: unknown }).lookup = (
  hostname: string,
  options: dns.LookupOptions | LookupCallback,
  callback?: LookupCallback
) => {
  const cb = (typeof options === "function" ? options : callback) as LookupCallback;
  const opts = typeof options === "function" ? {} : options;
  const address = MOCK_ADDRESSES[hostname];
  if (!address) return (realLookup as (...args: unknown[]) => void)(hostname, options, callback);
  lookups.push(hostname);
  const entry = { address, family: 4 };
  process.nextTick(() => (opts?.all ? cb(null, [entry]) : cb(null, address, 4)));
};

// Production installs the patched global fetch; use the same path here.
await import("../../open-sse/utils/proxyFetch.ts");
const { fetchWithCheckedRedirects } =
  await import("../../open-sse/handlers/search/redirectGuard.ts");
const { fetchWithSearchProxy } = await import("../../open-sse/handlers/search/searchProxy.ts");
const { getGuardedDispatcher } = await import("../../open-sse/utils/connectGuardDispatcher.ts");

const METADATA_BY_NAME = "http://imds.search-guard.test:47/latest/meta-data/";

const server = http.createServer((req, res) => {
  if (req.url === "/to-searx-name") {
    res.writeHead(302, { location: `http://searx.search-guard.test:${port}/search` });
    return res.end();
  }
  if (req.url === "/to-metadata-name") {
    res.writeHead(302, { location: METADATA_BY_NAME });
    return res.end();
  }
  res.writeHead(200, { "content-type": "application/json" });
  res.end('{"results":[]}');
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = (server.address() as AddressInfo).port;

// Minimal CONNECT proxy: every tunnel goes to the local server above, whatever
// host the client asked for.
const proxySeen: string[] = [];
const proxy = http.createServer((_req, res) => {
  res.writeHead(405);
  res.end();
});
proxy.on("connect", (req, socket, head) => {
  proxySeen.push(`CONNECT ${req.url}`);
  const upstream = net.connect(port, "127.0.0.1", () => {
    socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    upstream.write(head);
    upstream.pipe(socket);
    socket.pipe(upstream);
  });
  upstream.on("error", () => socket.destroy());
  socket.on("error", () => upstream.destroy());
});
await new Promise<void>((resolve) => proxy.listen(0, "127.0.0.1", resolve));
const proxyUrl = `http://127.0.0.1:${(proxy.address() as AddressInfo).port}`;

test.beforeEach(() => {
  lookups.length = 0;
  proxySeen.length = 0;
});

test.after(() => {
  server.close();
  server.closeAllConnections();
  proxy.close();
  proxy.closeAllConnections();
  (dns as unknown as { lookup: unknown }).lookup = realLookup;
});

function blockedAtConnect(error: unknown): boolean {
  for (let e = error as { code?: unknown; cause?: unknown } | undefined; e; e = e.cause as never) {
    if (e.code === "ERR_OUTBOUND_HOST_BLOCKED") return true;
  }
  return false;
}

test("first hop: a name that resolves to the metadata address is refused at connect", async () => {
  await assert.rejects(
    fetchWithCheckedRedirects(
      METADATA_BY_NAME,
      { signal: AbortSignal.timeout(3000) },
      "searxng-search"
    ),
    blockedAtConnect
  );
  assert.deepEqual(lookups, ["imds.search-guard.test"]);
});

test("redirect hop: a Location whose name resolves to metadata is refused at connect", async () => {
  await assert.rejects(
    fetchWithCheckedRedirects(
      `http://127.0.0.1:${port}/to-metadata-name`,
      { signal: AbortSignal.timeout(3000) },
      "searxng-search"
    ),
    blockedAtConnect
  );
  assert.deepEqual(lookups, ["imds.search-guard.test"]);
});

test("redirect hop after a registry first hop: a metadata name is refused at connect", async () => {
  // guardFirstHop is false for a provider's registry origin; the redirect hop
  // that follows must still get the connect-time check.
  await assert.rejects(
    fetchWithCheckedRedirects(
      `http://127.0.0.1:${port}/to-metadata-name`,
      { signal: AbortSignal.timeout(3000) },
      "searxng-search",
      false
    ),
    blockedAtConnect
  );
  assert.deepEqual(lookups, ["imds.search-guard.test"]);
});

test("a self-hosted SearXNG reached by a name that resolves to loopback still works", async () => {
  const response = await fetchWithCheckedRedirects(
    `http://searx.search-guard.test:${port}/search`,
    { signal: AbortSignal.timeout(3000) },
    "searxng-search"
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { results: [] });
  assert.deepEqual(lookups, ["searx.search-guard.test"]);
});

test('redirect: "error" still guards the first hop at connect', async () => {
  await assert.rejects(
    fetchWithCheckedRedirects(
      METADATA_BY_NAME,
      { redirect: "error", signal: AbortSignal.timeout(3000) },
      "searxng-search"
    ),
    blockedAtConnect
  );
  assert.deepEqual(lookups, ["imds.search-guard.test"]);
});

test("behind a proxy no dispatcher is attached, so the request still goes through the proxy", async () => {
  const realFetch = globalThis.fetch;
  const dispatchers: unknown[] = [];
  globalThis.fetch = ((input: string | URL | Request, init: RequestInit = {}) => {
    dispatchers.push((init as { dispatcher?: unknown }).dispatcher);
    return realFetch(input, init);
  }) as typeof fetch;
  try {
    const response = await fetchWithSearchProxy(proxyUrl, () =>
      fetchWithCheckedRedirects(
        `http://searx.search-guard.test:${port}/search`,
        { signal: AbortSignal.timeout(3000) },
        "searxng-search"
      )
    );
    assert.equal(response.status, 200);
    await response.text();
  } finally {
    globalThis.fetch = realFetch;
  }

  assert.deepEqual(dispatchers, [undefined]);
  assert.deepEqual(proxySeen, [`CONNECT searx.search-guard.test:${port}`]);
});

// Records the dispatcher of every hop, then sends the request on.
async function dispatchersOf(run: () => Promise<Response>): Promise<unknown[]> {
  const realFetch = globalThis.fetch;
  const dispatchers: unknown[] = [];
  globalThis.fetch = ((input: string | URL | Request, init: RequestInit = {}) => {
    dispatchers.push((init as { dispatcher?: unknown }).dispatcher);
    return realFetch(input, init);
  }) as typeof fetch;
  try {
    const response = await run();
    assert.equal(response.status, 200);
    await response.text();
  } finally {
    globalThis.fetch = realFetch;
  }
  return dispatchers;
}

test('behind a proxy redirect: "error" gets no dispatcher, even for an override first hop', async () => {
  const dispatchers = await dispatchersOf(() =>
    fetchWithSearchProxy(proxyUrl, () =>
      fetchWithCheckedRedirects(
        `http://searx.search-guard.test:${port}/search`,
        { redirect: "error", signal: AbortSignal.timeout(3000) },
        "searxng-search",
        true
      )
    )
  );

  assert.deepEqual(dispatchers, [undefined]);
  assert.deepEqual(lookups, []);
});

test("behind a proxy a redirect hop gets no dispatcher either", async () => {
  const dispatchers = await dispatchersOf(() =>
    fetchWithSearchProxy(proxyUrl, () =>
      fetchWithCheckedRedirects(
        `http://searx.search-guard.test:${port}/to-searx-name`,
        { signal: AbortSignal.timeout(3000) },
        "searxng-search"
      )
    )
  );

  // The proxy resolves the name (and may reuse a tunnel), so no local lookup.
  assert.deepEqual(dispatchers, [undefined, undefined]);
  assert.deepEqual(lookups, []);
});

test("each hop's proxy decision uses that hop's URL", async () => {
  // Loopback always goes out directly; the redirect target goes through the
  // environment proxy, so only the first hop may carry the guarded dispatcher.
  const saved = { HTTP_PROXY: process.env.HTTP_PROXY, NO_PROXY: process.env.NO_PROXY };
  process.env.HTTP_PROXY = proxyUrl;
  delete process.env.NO_PROXY;
  let dispatchers: unknown[];
  try {
    dispatchers = await dispatchersOf(() =>
      fetchWithCheckedRedirects(
        `http://127.0.0.1:${port}/to-searx-name`,
        { signal: AbortSignal.timeout(3000) },
        "searxng-search"
      )
    );
  } finally {
    for (const [name, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }

  assert.deepEqual(dispatchers, [getGuardedDispatcher("block-metadata"), undefined]);
  assert.deepEqual(lookups, []);
});
