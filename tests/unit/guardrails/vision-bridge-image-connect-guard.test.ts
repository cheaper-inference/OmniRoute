/**
 * The vision bridge downloads caller-supplied image URLs and inlines the bytes into the
 * describe self-call or a rerouted body. Production injects undici fetch, so the
 * download never used the pinned connection: the public-only check resolved the name once
 * and the socket resolved it again. A name that is public for the check and private for
 * the connect must be refused at connect time, on the first hop and on every redirect hop.
 *
 * DNS is mocked: the check-time resolver (dns.promises.lookup) answers a public address for
 * every *.vision-guard.test name, and the connect-time resolver (dns.lookup) answers loopback
 * or the cloud-metadata address. The loopback server below stands in for an internal
 * service; the metadata name uses port 47, where no metadata service listens.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/guardrails/vision-bridge-image-connect-guard.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { fetch as undiciFetch } from "undici";

const CHECK_TIME_ADDRESS = "203.0.113.10";
const CONNECT_TIME_ADDRESSES: Record<string, string> = {
  "internal.vision-guard.test": "127.0.0.1",
  "imds.vision-guard.test": "169.254.169.254",
};

const realPromisesLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  hostname: string,
  options?: { all?: boolean }
) => {
  if (!hostname.endsWith(".vision-guard.test")) {
    return (realPromisesLookup as (...args: unknown[]) => unknown)(hostname, options);
  }
  const record = { address: CHECK_TIME_ADDRESS, family: 4 };
  return options?.all ? [record] : record;
}) as typeof dns.promises.lookup;

const connectLookups: string[] = [];
const realLookup = dns.lookup;
type LookupCallback = (err: Error | null, address?: unknown, family?: number) => void;
(dns as unknown as { lookup: unknown }).lookup = (
  hostname: string,
  options: dns.LookupOptions | LookupCallback,
  callback?: LookupCallback
) => {
  const cb = (typeof options === "function" ? options : callback) as LookupCallback;
  const opts = typeof options === "function" ? {} : options;
  const address = CONNECT_TIME_ADDRESSES[hostname];
  if (!address) return (realLookup as (...args: unknown[]) => void)(hostname, options, callback);
  connectLookups.push(hostname);
  const entry = { address, family: 4 };
  process.nextTick(() => (opts?.all ? cb(null, [entry]) : cb(null, address, 4)));
};

const { ensureBase64ImagesForClaudeWire } =
  await import("../../../src/lib/guardrails/visionBridgeHelpers.ts");

const SECRET = Buffer.from("internal-service-secret-bytes");
const internalHits: string[] = [];
const server = http.createServer((req, res) => {
  internalHits.push(req.url ?? "");
  res.writeHead(200, { "content-type": "image/png" });
  res.end(SECRET);
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = (server.address() as AddressInfo).port;

const INTERNAL_URL = `http://internal.vision-guard.test:${port}/secret.png`;
const METADATA_URL = "http://imds.vision-guard.test:47/latest/meta-data/";
const PUBLIC_REDIRECTOR = "https://cdn.vision-guard.test/cat.png";

test.beforeEach(() => {
  connectLookups.length = 0;
  internalHits.length = 0;
});

test.after(() => {
  server.close();
  server.closeAllConnections();
  (dns as unknown as { lookup: unknown }).lookup = realLookup;
  (dns.promises as { lookup: unknown }).lookup = realPromisesLookup;
});

function blockedAtConnect(error: unknown): boolean {
  for (let e = error as { code?: unknown; cause?: unknown } | undefined; e; e = e.cause as never) {
    if (e.code === "ERR_OUTBOUND_HOST_BLOCKED") return true;
  }
  return false;
}

/**
 * The fetch production injects (undici), recording each failure. `redirectTo` answers the
 * first hop with a 302 so the redirect target is the only hop that touches the network.
 */
function productionFetch(failures: unknown[], redirectTo?: string): typeof fetch {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (redirectTo && String(input) === PUBLIC_REDIRECTOR) {
      return new Response(null, { status: 302, headers: { location: redirectTo } });
    }
    try {
      return (await undiciFetch(
        input as string,
        init as Parameters<typeof undiciFetch>[1]
      )) as unknown as Response;
    } catch (error) {
      failures.push(error);
      throw error;
    }
  }) as typeof fetch;
}

function bodyWithImage(url: string) {
  return {
    model: "zai/glm-5",
    messages: [{ role: "user", content: [{ type: "image_url", image_url: { url } }] }],
  };
}

async function inline(url: string, fetchImpl: typeof fetch): Promise<string> {
  const out = await ensureBase64ImagesForClaudeWire(bodyWithImage(url), "zai/glm-5", fetchImpl);
  return out.messages[0].content[0].image_url.url;
}

test("first hop: a name that resolves to loopback at connect time is refused", async () => {
  const failures: unknown[] = [];
  const url = await inline(INTERNAL_URL, productionFetch(failures));

  assert.deepEqual(internalHits, [], "the internal service must never receive the request");
  assert.equal(url, INTERNAL_URL, "the part is left untouched, nothing is inlined");
  assert.ok(failures.some(blockedAtConnect), "the connect-time guard refuses the address");
  assert.deepEqual(connectLookups, ["internal.vision-guard.test"]);
});

test("first hop: a name that resolves to the metadata address at connect time is refused", async () => {
  const failures: unknown[] = [];
  const url = await inline(METADATA_URL, productionFetch(failures));

  assert.equal(url, METADATA_URL);
  assert.ok(failures.some(blockedAtConnect), "the connect-time guard refuses the address");
  assert.deepEqual(connectLookups, ["imds.vision-guard.test"]);
});

test("redirect hop: a Location whose name resolves to loopback at connect time is refused", async () => {
  const failures: unknown[] = [];
  const url = await inline(PUBLIC_REDIRECTOR, productionFetch(failures, INTERNAL_URL));

  assert.deepEqual(internalHits, [], "the internal service must never receive the request");
  assert.equal(url, PUBLIC_REDIRECTOR, "the part is left untouched, nothing is inlined");
  assert.ok(failures.some(blockedAtConnect), "the connect-time guard refuses the redirect hop");
});

test("redirect hop: a Location whose name resolves to the metadata address is refused", async () => {
  const failures: unknown[] = [];
  const url = await inline(PUBLIC_REDIRECTOR, productionFetch(failures, METADATA_URL));

  assert.equal(url, PUBLIC_REDIRECTOR);
  assert.ok(failures.some(blockedAtConnect), "the connect-time guard refuses the redirect hop");
  assert.deepEqual(connectLookups, ["imds.vision-guard.test"]);
});
