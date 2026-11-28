import { after, test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import {
  ANTIGRAVITY_GO_TLS_FLAG,
  antigravityGoFetch,
  createAntigravityCliFetch,
} from "../../open-sse/utils/antigravityGoFetch.ts";
import {
  AntigravityGoBridgeError,
  setAntigravityGoBinaryPathForTest,
  setAntigravityGoBridgeForTest,
  stopAntigravityGoBridgeForTest,
  type AntigravityGoBridgeLike,
  type AntigravityGoTargetMeta,
} from "../../open-sse/utils/antigravityGoTlsClient.ts";
import {
  runWithAppliedProxyCapture,
  type AppliedProxySink,
} from "../../open-sse/utils/appliedProxyContext.ts";
import { runWithCapture } from "../../open-sse/utils/providerRequestLogging.ts";
import { runWithDirectFetchContext, runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

const FEATURE_FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");

async function withGoTlsFlag(enabled: boolean, fn: () => Promise<void> | void): Promise<void> {
  const store = globalThis as Record<symbol, unknown>;
  const prev = store[FEATURE_FLAG_RESOLVER_KEY];
  store[FEATURE_FLAG_RESOLVER_KEY] = (key: string) =>
    key === ANTIGRAVITY_GO_TLS_FLAG ? enabled : false;
  try {
    await fn();
  } finally {
    if (prev === undefined) {
      delete store[FEATURE_FLAG_RESOLVER_KEY];
    } else {
      store[FEATURE_FLAG_RESOLVER_KEY] = prev;
    }
  }
}

function makeFakeBridge(
  handler: (
    meta: AntigravityGoTargetMeta,
    body: Uint8Array | null,
    signal?: AbortSignal | null
  ) => Promise<Response>
): {
  bridge: AntigravityGoBridgeLike;
  calls: Array<{ meta: AntigravityGoTargetMeta; body: Uint8Array | null }>;
} {
  const calls: Array<{ meta: AntigravityGoTargetMeta; body: Uint8Array | null }> = [];
  return {
    calls,
    bridge: {
      send(meta, body, signal) {
        calls.push({ meta, body });
        return handler(meta, body, signal);
      },
    },
  };
}

after(async () => {
  setAntigravityGoBridgeForTest(null);
  setAntigravityGoBinaryPathForTest(undefined);
  await stopAntigravityGoBridgeForTest();
});

test("ANTIGRAVITY_GO_TLS_TRANSPORT_ENABLED defaults off and falls back to fallbackFetch", async () => {
  const { bridge, calls } = makeFakeBridge(async () => new Response("go", { status: 200 }));
  let fallbackCalls = 0;
  await withGoTlsFlag(false, async () => {
    const res = await antigravityGoFetch(
      "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
      { method: "POST", body: "{}" },
      {
        clientProfile: "cli",
        provider: "antigravity",
        bridgeOverride: bridge,
        fallbackFetch: async () => {
          fallbackCalls++;
          return new Response("node", { status: 200 });
        },
      }
    );
    assert.equal(await res.text(), "node");
  });
  assert.equal(fallbackCalls, 1);
  assert.equal(calls.length, 0);
});

test("non-cli profiles and non-antigravity providers always bypass Go TLS", async () => {
  const { bridge, calls } = makeFakeBridge(async () => new Response("go", { status: 200 }));
  let fallbackCalls = 0;
  const fallbackFetch = async () => {
    fallbackCalls++;
    return new Response("node", { status: 200 });
  };

  await withGoTlsFlag(true, async () => {
    const ideFetch = createAntigravityCliFetch("ide", {
      provider: "antigravity",
      bridgeOverride: bridge,
      fallbackFetch,
    });
    assert.equal(ideFetch, fallbackFetch);
    await ideFetch("https://example.com");

    await antigravityGoFetch(
      "https://example.com",
      { method: "POST", body: "{}" },
      { clientProfile: "cli", provider: "gemini", bridgeOverride: bridge, fallbackFetch }
    );
  });

  assert.equal(fallbackCalls, 2);
  assert.equal(calls.length, 0);
});

test("strips default Accept-Encoding, preserves User-Agent, and omits Accept when not set", async () => {
  const { bridge, calls } = makeFakeBridge(async () => new Response("ok", { status: 200 }));

  await withGoTlsFlag(true, async () => {
    const res = await antigravityGoFetch(
      "https://daily-cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "antigravity/1.5.18 windows/amd64",
          "Accept-Encoding": "gzip, deflate, br",
          "X-Test-Zero": "abc\u200bdef",
        },
        body: JSON.stringify({ hello: "world" }),
      },
      {
        clientProfile: "cli",
        provider: "agy",
        bridgeOverride: bridge,
        fallbackFetch: async () => new Response("fallback"),
      }
    );
    assert.equal(res.status, 200);
  });

  assert.equal(calls.length, 1);
  const headers = calls[0].meta.headers;
  assert.deepEqual(
    headers.find(([k]) => k.toLowerCase() === "user-agent"),
    ["User-Agent", "antigravity/1.5.18 windows/amd64"]
  );
  assert.equal(
    headers.some(([k]) => k.toLowerCase() === "accept-encoding"),
    false,
    "default Node Accept-Encoding is stripped so Go net/http auto-negotiates gzip"
  );
  assert.equal(
    headers.some(([k]) => k.toLowerCase() === "accept"),
    false
  );
  assert.deepEqual(
    headers.find(([k]) => k.toLowerCase() === "x-test-zero"),
    ["X-Test-Zero", "abcdef"]
  );
});

test("bypasses Go TLS for dispatcher, bypassProxyPatch, pinDns, direct context, stream body, and relay proxy", async () => {
  const { bridge, calls } = makeFakeBridge(async () => new Response("go", { status: 200 }));
  let fallbackCalls = 0;
  const fallbackFetch = async () => {
    fallbackCalls++;
    return new Response("node", { status: 200 });
  };

  await withGoTlsFlag(true, async () => {
    await antigravityGoFetch(
      "https://example.com",
      { method: "POST", dispatcher: {} } as RequestInit,
      { clientProfile: "cli", provider: "antigravity", bridgeOverride: bridge, fallbackFetch }
    );
    await antigravityGoFetch(
      "https://example.com",
      { method: "GET", bypassProxyPatch: true } as RequestInit,
      { clientProfile: "cli", provider: "antigravity", bridgeOverride: bridge, fallbackFetch }
    );
    await antigravityGoFetch(
      "https://example.com",
      { method: "GET", pinDns: true } as RequestInit,
      { clientProfile: "cli", provider: "antigravity", bridgeOverride: bridge, fallbackFetch }
    );
    await runWithDirectFetchContext(() =>
      antigravityGoFetch(
        "https://example.com",
        { method: "GET" },
        { clientProfile: "cli", provider: "antigravity", bridgeOverride: bridge, fallbackFetch }
      )
    );
    const streamBody = new ReadableStream({
      start(c) {
        c.enqueue(new Uint8Array([1, 2]));
        c.close();
      },
    });
    await antigravityGoFetch(
      "https://example.com",
      { method: "POST", body: streamBody },
      { clientProfile: "cli", provider: "antigravity", bridgeOverride: bridge, fallbackFetch }
    );
    await runWithProxyContext(
      { type: "vercel", host: "relay.vercel.app", port: 443 } as never,
      () =>
        antigravityGoFetch(
          "https://example.com",
          { method: "GET" },
          { clientProfile: "cli", provider: "antigravity", bridgeOverride: bridge, fallbackFetch }
        )
    );
  });

  assert.equal(fallbackCalls, 6);
  assert.equal(calls.length, 0);
});

test("propagates proxyUrl, omits connectGuard when proxied, and captures upstreamStatus", async () => {
  const { bridge, calls } = makeFakeBridge(async () => new Response("proxied", { status: 201 }));
  const sink: AppliedProxySink = { proxy: null };

  await withGoTlsFlag(true, async () => {
    await runWithCapture({} as never, () =>
      runWithAppliedProxyCapture(sink, () =>
        runWithProxyContext(
          { type: "socks5", host: "127.0.0.1", port: 1080 } as never,
          async () => {
            const res = await antigravityGoFetch(
              "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota",
              {
                method: "POST",
                body: "{}",
                connectGuard: "public-only",
              } as RequestInit,
              {
                clientProfile: "cli",
                provider: "antigravity",
                bridgeOverride: bridge,
                fallbackFetch: async () => new Response("fallback"),
              }
            );
            assert.equal(res.status, 201);
          }
        )
      )
    );
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].meta.proxyUrl, "socks5://127.0.0.1:1080");
  assert.equal(calls[0].meta.connectGuard, undefined);
  assert.equal(sink.upstreamStatus, 201);
});

test("preserves connectGuard errors, redirect errors, pre-send fallback, and non-replayable POST protection", async () => {
  await withGoTlsFlag(true, async () => {
    // 1. connectGuard error rethrows with ERR_OUTBOUND_HOST_BLOCKED without fallback
    let fallbackCalled = false;
    await assert.rejects(
      () =>
        antigravityGoFetch(
          "http://169.254.169.254/latest/meta-data",
          { method: "GET", connectGuard: "public-only" } as RequestInit,
          {
            clientProfile: "cli",
            provider: "antigravity",
            bridgeOverride: {
              async send() {
                throw new AntigravityGoBridgeError("blocked private ip", {
                  code: "ERR_OUTBOUND_HOST_BLOCKED",
                  isPreSend: true,
                });
              },
            },
            fallbackFetch: async () => {
              fallbackCalled = true;
              return new Response("fallback");
            },
          }
        ),
      (err: unknown) =>
        err instanceof Error &&
        (err as Error & { code?: string }).code === "ERR_OUTBOUND_HOST_BLOCKED"
    );
    assert.equal(fallbackCalled, false);

    // 2. redirect error throws TypeError("Failed to fetch") without fallback
    await assert.rejects(
      () =>
        antigravityGoFetch(
          "https://example.com/redir",
          { method: "GET", redirect: "error" },
          {
            clientProfile: "cli",
            provider: "antigravity",
            bridgeOverride: {
              async send() {
                throw new AntigravityGoBridgeError("redirect disallowed", {
                  code: "ERR_REDIRECT_DISALLOWED",
                  isPreSend: false,
                });
              },
            },
            fallbackFetch: async () => {
              fallbackCalled = true;
              return new Response("fallback");
            },
          }
        ),
      TypeError
    );
    assert.equal(fallbackCalled, false);

    // 3. Pre-send failure on POST falls back to standard fetch
    const preSendFallbackRes = await antigravityGoFetch(
      "https://example.com/post",
      { method: "POST", body: "{}" },
      {
        clientProfile: "cli",
        provider: "antigravity",
        bridgeOverride: {
          async send() {
            throw new AntigravityGoBridgeError("dial refused", {
              code: "ECONNREFUSED",
              isPreSend: true,
            });
          },
        },
        fallbackFetch: async () => new Response("fallback-ok", { status: 200 }),
      }
    );
    assert.equal(await preSendFallbackRes.text(), "fallback-ok");

    // 4. Ambiguous post-send failure on POST does NOT fall back (never double-POST)
    await assert.rejects(
      () =>
        antigravityGoFetch(
          "https://example.com/post",
          { method: "POST", body: "{}" },
          {
            clientProfile: "cli",
            provider: "antigravity",
            bridgeOverride: {
              async send() {
                throw new AntigravityGoBridgeError("mid-flight reset", {
                  code: "ECONNRESET",
                  isPreSend: false,
                });
              },
            },
            fallbackFetch: async () => {
              fallbackCalled = true;
              return new Response("never");
            },
          }
        ),
      (err: unknown) =>
        err instanceof Error &&
        (err as Error & { code?: string }).code === "ECONNRESET" &&
        /not safe to replay/i.test(err.message)
    );
    assert.equal(fallbackCalled, false);
  });
});

test("real Go sidecar binary end-to-end: gzip auto-decode, headers, SSE streaming, and AbortSignal", async (t) => {
  const goVersion = spawnSync("go", ["version"], { encoding: "utf8" });
  if (goVersion.status !== 0) {
    t.skip("go toolchain unavailable on this host");
    return;
  }

  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "agy-go-bridge-"));
  const binPath = path.join(
    tmpDir,
    process.platform === "win32" ? "antigravity-go-tls.exe" : "antigravity-go-tls"
  );
  execFileSync("go", ["build", "-o", binPath, "."], {
    cwd: path.join(process.cwd(), "open-sse", "native", "antigravity-go-tls"),
    stdio: "pipe",
  });

  let capturedAccept: string | undefined;
  let capturedAcceptEncoding: string | undefined;
  let capturedUserAgent: string | undefined;

  const server = http.createServer((req, res) => {
    capturedAccept = req.headers.accept;
    capturedAcceptEncoding = req.headers["accept-encoding"];
    capturedUserAgent = req.headers["user-agent"];

    if (req.url === "/gzip-json") {
      const gz = zlib.gzipSync(Buffer.from(JSON.stringify({ ok: true, profile: "cli" })));
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
      });
      res.end(gz);
      return;
    }

    if (req.url === "/sse") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      });
      res.write('data: {"chunk":1}\n\n');
      const timer = setTimeout(() => {
        res.write('data: {"chunk":2}\n\n');
        res.end();
      }, 40);
      req.on("close", () => clearTimeout(timer));
      return;
    }

    res.writeHead(404);
    res.end("not found");
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}`;

  setAntigravityGoBinaryPathForTest(binPath);

  try {
    await withGoTlsFlag(true, async () => {
      const cliFetch = createAntigravityCliFetch("cli", { provider: "antigravity" });

      // 1. Gzipped JSON response + header fidelity
      const jsonRes = await cliFetch(`${baseUrl}/gzip-json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "antigravity/1.5.18 windows/amd64",
          "Accept-Encoding": "gzip, deflate, br",
        },
        body: "{}",
      });
      assert.equal(jsonRes.status, 200);
      assert.deepEqual(await jsonRes.json(), { ok: true, profile: "cli" });
      assert.equal(capturedAccept, undefined, "must not inject default Accept header");
      assert.equal(capturedAcceptEncoding, "gzip");
      assert.equal(capturedUserAgent, "antigravity/1.5.18 windows/amd64");

      // 2. Streaming SSE delivery
      const sseRes = await cliFetch(`${baseUrl}/sse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      assert.equal(sseRes.status, 200);
      const sseText = await sseRes.text();
      assert.match(sseText, /"chunk":1/);
      assert.match(sseText, /"chunk":2/);

      // 3. connectGuard=public-only blocks loopback target inside Go DialContext
      await assert.rejects(
        () =>
          cliFetch(`${baseUrl}/gzip-json`, {
            method: "GET",
            connectGuard: "public-only",
          } as RequestInit),
        (err: unknown) =>
          err instanceof Error &&
          (err as Error & { code?: string }).code === "ERR_OUTBOUND_HOST_BLOCKED"
      );

      // 4. Pre-aborted AbortSignal rejects cleanly
      const controller = new AbortController();
      controller.abort(new Error("cancelled-by-caller"));
      await assert.rejects(
        () => cliFetch(`${baseUrl}/sse`, { method: "GET", signal: controller.signal }),
        /cancelled-by-caller/
      );
    });
  } finally {
    await stopAntigravityGoBridgeForTest();
    setAntigravityGoBinaryPathForTest(undefined);
    await new Promise<void>((resolve) => server.close(() => resolve()));
    rmSync(tmpDir, { recursive: true, force: true });
  }
});
