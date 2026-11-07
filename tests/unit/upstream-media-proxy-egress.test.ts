import { after, before, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";
import type { AddressInfo, Socket } from "node:net";

import { handleAiHordeImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/aihorde.ts";
import { aiHordeImageCatalog } from "../../open-sse/services/aihordeImageCatalog.ts";
import { fetchSyntxMediaBytes } from "../../open-sse/services/syntxMedia.ts";
import { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import {
  downloadUpstreamMedia,
  setPinnedFetchTestOverride,
} from "../../src/shared/network/remoteImageFetch.ts";

// A provider result URL is pinned to the address that passed the public-only check, but a pinned
// connection goes straight to that address. On a proxied connection the download has to leave
// through the proxy instead, like every other request of that connection. Each test here runs
// against a real local proxy, so a connection that skips it shows up as a missing CONNECT.

const PUBLIC_MEDIA = "203.0.113.11";
const PROXY_ENV_KEYS = ["HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy", "ALL_PROXY"];
const LIMITS = { maxBytes: 1024, timeoutMs: 1_000 };

type Lookup = typeof dns.promises.lookup;

let proxyServer: http.Server;
let proxyPort = 0;
let connects: string[] = [];
const sockets = new Set<Socket>();
const originalLookup: Lookup = dns.promises.lookup;
const savedEnv = new Map<string, string | undefined>();

function proxyConfig() {
  return { type: "http", host: "127.0.0.1", port: proxyPort };
}

// The proxied fetch retries a refused tunnel once, so count targets rather than attempts.
function tunnelTargets() {
  return [...new Set(connects)];
}

function fakeDns(answers: Record<string, string | null>) {
  (dns.promises as { lookup: unknown }).lookup = (async (host: string, opts?: unknown) => {
    if (!(host in answers)) {
      return (originalLookup as (h: string, o?: unknown) => Promise<unknown>)(host, opts);
    }
    const address = answers[host];
    if (address === null) throw Object.assign(new Error("no DNS"), { code: "EAI_AGAIN" });
    return [{ address, family: 4 }];
  }) as Lookup;
}

describe("upstream media downloads on a proxied connection", () => {
  before(async () => {
    setPinnedFetchTestOverride(undefined);
    for (const key of [...PROXY_ENV_KEYS, "NO_PROXY", "no_proxy"]) {
      savedEnv.set(key, process.env[key]);
      delete process.env[key];
    }
    proxyServer = http.createServer((_req, res) => res.writeHead(400).end());
    // The test only needs to see the tunnel request, so every tunnel is refused.
    proxyServer.on("connect", (req, socket) => {
      connects.push(String(req.url));
      socket.end("HTTP/1.1 502 Bad Gateway\r\n\r\n");
    });
    proxyServer.on("connection", (socket) => {
      sockets.add(socket);
      socket.on("close", () => sockets.delete(socket));
    });
    await new Promise<void>((resolve) => proxyServer.listen(0, "127.0.0.1", resolve));
    proxyPort = (proxyServer.address() as AddressInfo).port;
  });

  after(async () => {
    (dns.promises as { lookup: unknown }).lookup = originalLookup;
    for (const [key, value] of savedEnv) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    for (const socket of sockets) socket.destroy();
    await new Promise<void>((resolve) => proxyServer.close(() => resolve()));
  });

  beforeEach(() => {
    connects = [];
    (dns.promises as { lookup: unknown }).lookup = originalLookup;
    delete process.env.HTTPS_PROXY;
    delete process.env.NO_PROXY;
  });

  test("a download inside a connection's proxy context goes through that proxy", async () => {
    await assert.rejects(
      runWithProxyContext(proxyConfig(), () =>
        downloadUpstreamMedia(`https://${PUBLIC_MEDIA}/result.png`, LIMITS)
      )
    );
    assert.deepEqual(tunnelTargets(), [`${PUBLIC_MEDIA}:443`]);
  });

  test("a download goes through an environment proxy", async () => {
    process.env.HTTPS_PROXY = `http://127.0.0.1:${proxyPort}`;
    await assert.rejects(downloadUpstreamMedia(`https://${PUBLIC_MEDIA}/result.png`, LIMITS));
    assert.deepEqual(tunnelTargets(), [`${PUBLIC_MEDIA}:443`]);
  });

  test("the SYNTX download goes through the proxy", async () => {
    await assert.rejects(
      runWithProxyContext(proxyConfig(), () =>
        fetchSyntxMediaBytes(`https://${PUBLIC_MEDIA}/result.mp3`)
      )
    );
    assert.deepEqual(tunnelTargets(), [`${PUBLIC_MEDIA}:443`]);
  });

  test("a host the local DNS cannot resolve still reaches the proxy, which resolves it", async () => {
    fakeDns({ "media.proxy-only.test": null });
    await assert.rejects(
      runWithProxyContext(proxyConfig(), () =>
        downloadUpstreamMedia("https://media.proxy-only.test/result.png", LIMITS)
      )
    );
    assert.deepEqual(tunnelTargets(), ["media.proxy-only.test:443"]);
  });

  test("a host that resolves to a private address is still refused before the proxy", async () => {
    fakeDns({ "media.private.test": "10.0.0.5" });
    await assert.rejects(
      runWithProxyContext(proxyConfig(), () =>
        downloadUpstreamMedia("https://media.private.test/result.png", LIMITS)
      ),
      /private address/
    );
    assert.deepEqual(connects, []);
  });

  test("a literal private result URL is still refused before the proxy", async () => {
    await assert.rejects(
      runWithProxyContext(proxyConfig(), () =>
        downloadUpstreamMedia("https://169.254.169.254/latest/meta-data/", LIMITS)
      )
    );
    assert.deepEqual(connects, []);
  });

  test("a redirect to loopback is still refused on the proxied path", async () => {
    const forward = globalThis.fetch;
    const fetched: string[] = [];
    globalThis.fetch = (async (input: string | URL | Request) => {
      fetched.push(String(input));
      return new Response(null, { status: 302, headers: { location: "https://127.0.0.1/secret" } });
    }) as typeof fetch;
    try {
      await assert.rejects(
        runWithProxyContext(proxyConfig(), () =>
          downloadUpstreamMedia(`https://${PUBLIC_MEDIA}/result.png`, LIMITS)
        )
      );
      assert.deepEqual(fetched, [`https://${PUBLIC_MEDIA}/result.png`]);
    } finally {
      globalThis.fetch = forward;
    }
  });

  test("a host on NO_PROXY keeps the pin: it connects directly to the checked address", async () => {
    process.env.NO_PROXY = "media.no-proxy.test";
    fakeDns({ "media.no-proxy.test": "203.0.113.9" });
    const forward = globalThis.fetch;
    let unpinnedFetches = 0;
    globalThis.fetch = (async () => {
      unpinnedFetches++;
      return new Response("unpinned", { status: 200 });
    }) as typeof fetch;
    try {
      // The pinned connection goes to unroutable TEST-NET and fails; an unpinned one would
      // land on the mock above and succeed.
      await assert.rejects(
        runWithProxyContext(proxyConfig(), () =>
          downloadUpstreamMedia("https://media.no-proxy.test/result.png", {
            maxBytes: 1024,
            timeoutMs: 300,
          })
        )
      );
      assert.equal(unpinnedFetches, 0);
      assert.deepEqual(connects, []);
    } finally {
      globalThis.fetch = forward;
    }
  });

  test("a proxy context with no host is a direct route, so it keeps the pin", async () => {
    fakeDns({ "media.empty-context.test": "203.0.113.9" });
    const forward = globalThis.fetch;
    let unpinnedFetches = 0;
    globalThis.fetch = (async () => {
      unpinnedFetches++;
      return new Response("unpinned", { status: 200 });
    }) as typeof fetch;
    try {
      // Same shape as the NO_PROXY case: only the pinned connection fails.
      await assert.rejects(
        runWithProxyContext({}, () =>
          downloadUpstreamMedia("https://media.empty-context.test/result.png", {
            maxBytes: 1024,
            timeoutMs: 300,
          })
        )
      );
      assert.equal(unpinnedFetches, 0);
    } finally {
      globalThis.fetch = forward;
    }
  });

  test("a proxy context with no host refuses a host the local DNS cannot resolve", async () => {
    fakeDns({ "media.empty-context.test": null });
    await assert.rejects(
      runWithProxyContext({}, () =>
        downloadUpstreamMedia("https://media.empty-context.test/result.png", LIMITS)
      ),
      /could not be resolved \(blocked\)/
    );
  });

  test("the AI Horde R2 download leaves through the proxied fetch", async () => {
    aiHordeImageCatalog.replace([
      { name: "FLUX.1-schnell", count: 3, queued: 0, eta: 1, performance: 1, jobs: 0 },
    ]);
    fakeDns({ "r2.proxied.test": "203.0.113.7" });
    const forward = globalThis.fetch;
    let downloads = 0;
    const json = (value: unknown, status = 200) => new Response(JSON.stringify(value), { status });
    // Stands in for the patched global fetch, which is the only path that honours the proxy.
    globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      if (url.hostname === "r2.proxied.test") {
        downloads++;
        return new Response("horde-image-bytes", { status: 200 });
      }
      if (url.pathname.includes("/v2/generate/async")) return json({ id: "job-proxy" }, 202);
      if ((init.method || "GET").toUpperCase() === "DELETE") return json({});
      if (url.pathname.includes("/v2/generate/check/")) {
        return json({ done: true, is_possible: true, faulted: false });
      }
      if (url.pathname.includes("/v2/generate/status/")) {
        return json({ generations: [{ img: "https://r2.proxied.test/img.png" }] });
      }
      return json({});
    }) as typeof fetch;
    try {
      const result = await runWithProxyContext(proxyConfig(), () =>
        handleAiHordeImageGeneration({
          model: "FLUX.1-schnell",
          provider: "aihorde",
          body: { model: "aihorde/FLUX.1-schnell", prompt: "p" },
          credentials: { apiKey: "horde-key" },
          timeoutMs: 2_000,
        })
      );
      assert.equal(downloads, 1);
      assert.equal(result.success, true);
    } finally {
      globalThis.fetch = forward;
    }
  });
});
