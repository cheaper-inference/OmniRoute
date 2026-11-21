/**
 * A caller-chosen SearXNG base URL (`provider_options.baseUrl`) is request input, not
 * operator config: it must stay public-only, must never receive the stored connection's
 * token, and its response is read under a byte cap.
 *
 * DNS is mocked: *.search-public.test names resolve to a fixed public address and no real
 * resolver is asked. Upstream HTTP is either a loopback stub server or a stubbed fetch.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/search-caller-baseurl-trust.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";

const MOCK_ADDRESSES: Record<string, string> = {
  "caller.search-public.test": "93.184.216.34",
  "stored.search-public.test": "93.184.216.34",
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-caller-baseurl-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Dynamic imports: DATA_DIR must be set before the DB modules load (repo test pattern).
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

const originalFetch = globalThis.fetch;
const seenOnLoopback: string[] = [];
const server = http.createServer((req, res) => {
  seenOnLoopback.push(req.url || "");
  res.writeHead(200, { "content-type": "application/json" });
  res.end('{"results":[{"title":"t","url":"https://example.com/","content":"c"}]}');
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = (server.address() as AddressInfo).port;

test.beforeEach(() => {
  seenOnLoopback.length = 0;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  (dns as unknown as { lookup: unknown }).lookup = realLookup;
  server.close();
  server.closeAllConnections();
  await closeCallLogSaves(500).catch(() => {});
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedSearxng(apiKey: string | null, providerSpecificData: Record<string, unknown>) {
  await providersDb.createProviderConnection({
    provider: "searxng-search",
    authType: "none",
    name: "searxng-caller-baseurl",
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData,
  });
}

function captureFetch(seen: Array<{ url: string; headers: Headers }>) {
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    seen.push({ url: String(url), headers: new Headers(init?.headers) });
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
}

test("without a stored connection a caller loopback base URL is refused before any request", async () => {
  await assert.rejects(
    executeWebSearch({
      query: "no stored connection",
      provider: "searxng-search",
      provider_options: { baseUrl: `http://127.0.0.1:${port}/x#` },
    })
  );
  assert.deepEqual(seenOnLoopback, []);
});

test("the stored connection's token is not sent to a caller-chosen base URL", async () => {
  await seedSearxng("connection-token", {});
  const seen: Array<{ url: string; headers: Headers }> = [];
  captureFetch(seen);

  await executeWebSearch({
    query: "caller host without token",
    provider: "searxng-search",
    provider_options: { baseUrl: "https://caller.search-public.test" },
  });

  assert.equal(seen.length, 1);
  assert.ok(seen[0].url.startsWith("https://caller.search-public.test/search?"));
  assert.equal(seen[0].headers.has("authorization"), false);
});

test("the stored connection's token still goes to the stored base URL", async () => {
  await seedSearxng("connection-token", { baseUrl: "https://stored.search-public.test" });
  const seen: Array<{ url: string; headers: Headers }> = [];
  captureFetch(seen);

  await executeWebSearch({ query: "stored host with token", provider: "searxng-search" });

  assert.equal(seen.length, 1);
  assert.ok(seen[0].url.startsWith("https://stored.search-public.test/search?"));
  assert.equal(seen[0].headers.get("authorization"), "Bearer connection-token");
});

test("a search response over the byte cap fails with 502 and the body is cancelled", async () => {
  await seedSearxng(null, { baseUrl: "https://stored.search-public.test" });
  const chunk = 1024 * 1024;
  const total = 8;
  let pulled = 0;
  let cancelled = false;
  globalThis.fetch = (async () => {
    const enc = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (pulled === 0) controller.enqueue(enc.encode('{"results":[],"pad":"'));
        if (pulled < total) {
          pulled += 1;
          controller.enqueue(new Uint8Array(chunk).fill(97));
        } else {
          controller.enqueue(enc.encode('"}'));
          controller.close();
        }
      },
      cancel() {
        cancelled = true;
      },
    });
    return new Response(body, { status: 200, headers: { "content-type": "application/json" } });
  }) as typeof fetch;

  await assert.rejects(
    executeWebSearch({ query: "oversized response", provider: "searxng-search" }),
    (err: { statusCode?: number }) => err.statusCode === 502
  );
  assert.equal(cancelled, true);
  assert.ok(pulled < total, `read ${pulled} of ${total} MiB`);
});
