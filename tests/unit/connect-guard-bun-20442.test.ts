// #20442 — under Bun, provider dispatch and /v1/search answered 502 "This runtime does not support
// guarded outbound dispatchers": Bun's built-in `undici` shim has an Agent without `dispatch`, and
// Bun's fetch ignores a `dispatcher` anyway. The fix sends a guarded request through the real
// undici package on Bun. These tests run under Node with the Bun shape simulated: the `bun` version
// is set and the ambient fetch is replaced by one that, like Bun's, drops `dispatcher` and connects
// on its own. A request must still connect, and only through the guarded lookup: a private answer
// under public-only must be refused before the upstream sees a request.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import dns from "node:dns";

import { dispatchGuarded } from "../../open-sse/executors/dispatchPin.ts";
import { fetchWithCheckedRedirects } from "../../open-sse/handlers/search/redirectGuard.ts";
import { getOriginalFetch } from "../../open-sse/utils/proxyFetch.ts";
import {
  CONNECT_GUARD_BLOCKED_CODE,
  getGuardedDispatcher,
} from "../../open-sse/utils/connectGuardDispatcher.ts";
import { SELF_HOP_HEADER, ownListenerSelfHopToken } from "../../open-sse/utils/selfHop.ts";

const ENV_KEYS = [
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
  "PORT",
  "DASHBOARD_PORT",
  "API_PORT",
];
const OPERATOR = { providerSpecificData: { baseUrl: "https://operator-host.invalid/v1" } };

/** Bun shape: `process.versions.bun` set, and an ambient fetch that ignores `dispatcher`. */
async function asBun<T>(
  env: Record<string, string>,
  fn: (ambientCalls: () => number) => Promise<T>
) {
  const savedEnv: Record<string, string | undefined> = {};
  for (const k of ENV_KEYS) savedEnv[k] = process.env[k];
  for (const k of ENV_KEYS) delete process.env[k];
  Object.assign(process.env, env);

  const originalLookup = dns.lookup;
  (dns as { lookup: unknown }).lookup = (
    _hostname: string,
    options: { all?: boolean } | undefined,
    callback: (err: null, address: unknown, family?: number) => void
  ) => {
    if (options?.all) callback(null, [{ address: "127.0.0.1", family: 4 }]);
    else callback(null, "127.0.0.1", 4);
  };

  const realFetch = globalThis.fetch;
  const nativeFetch = getOriginalFetch();
  let ambientCalls = 0;
  globalThis.fetch = (async (url: string, init: RequestInit & { dispatcher?: unknown } = {}) => {
    ambientCalls++;
    const { dispatcher: _ignored, ...rest } = init;
    return nativeFetch(url.replace(/[a-z-]+\.invalid/, "127.0.0.1"), rest);
  }) as typeof fetch;

  Object.defineProperty(process.versions, "bun", { value: "1.4.4", configurable: true });
  try {
    return await fn(() => ambientCalls);
  } finally {
    delete (process.versions as { bun?: string }).bun;
    globalThis.fetch = realFetch;
    (dns as { lookup: unknown }).lookup = originalLookup;
    for (const k of ENV_KEYS) {
      if (savedEnv[k] === undefined) delete process.env[k];
      else process.env[k] = savedEnv[k];
    }
  }
}

async function withServer(fn: (port: number, requests: () => number) => Promise<void>) {
  let requests = 0;
  const server = http.createServer((_req, res) => {
    requests++;
    res.end("upstream-response");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    await fn((server.address() as { port: number }).port, () => requests);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

function assertGuardRefusal(error: unknown) {
  assert.equal((error as { cause?: { code?: string } }).cause?.code, CONNECT_GUARD_BLOCKED_CODE);
  return true;
}

test("Bun: getGuardedDispatcher fails closed, since Bun's fetch would drop the dispatcher", async () => {
  await asBun({}, async () => {
    assert.throws(() => getGuardedDispatcher("block-metadata"), /guarded outbound dispatchers/);
  });
});

test("Bun: an operator base URL connects through the guarded lookup", async () => {
  await withServer(async (port, requests) => {
    await asBun({}, async (ambientCalls) => {
      const res = await dispatchGuarded(
        "openai-compatible-chat-test",
        `http://operator-host.invalid:${port}/v1`,
        { signal: AbortSignal.timeout(2_000) },
        OPERATOR
      );
      assert.equal(res.status, 200);
      assert.equal(await res.text(), "upstream-response");
      assert.equal(ambientCalls(), 0, "the dispatcher-ignoring ambient fetch must not carry it");
    });
    assert.equal(requests(), 1);
  });
});

test("Bun: a private answer under public-only is refused before the upstream sees a request", async () => {
  await withServer(async (port, requests) => {
    await asBun({ OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS: "false" }, async (ambientCalls) => {
      await assert.rejects(
        () =>
          dispatchGuarded(
            "openai-compatible-chat-test",
            `http://operator-host.invalid:${port}/v1`,
            { signal: AbortSignal.timeout(2_000) },
            OPERATOR
          ),
        assertGuardRefusal
      );
      assert.equal(ambientCalls(), 0);
    });
    assert.equal(requests(), 0, "the private upstream was never reached");
  });
});

test("Bun: /v1/search hops use the guarded path, and public-only still refuses a private answer", async () => {
  await withServer(async (port, requests) => {
    await asBun({}, async (ambientCalls) => {
      const url = `http://searx-host.invalid:${port}/search?q=x`;
      const init = { signal: AbortSignal.timeout(2_000) };
      const res = await fetchWithCheckedRedirects(url, init, "searxng-search");
      assert.equal(await res.text(), "upstream-response");
      await assert.rejects(
        () =>
          fetchWithCheckedRedirects(url, init, "searxng-search", true, { guard: "public-only" }),
        assertGuardRefusal
      );
      assert.equal(ambientCalls(), 0);
    });
    assert.equal(requests(), 1, "only the allowed hop reached the upstream");
  });
});

test("Bun: a guarded call to this process's own listener still carries the self-hop stamp", async () => {
  // On Node the ambient (proxy-patched) fetch stamps own-listener requests so a combo calling this
  // instance skips admission; the Bun path bypasses that fetch, so it must stamp them itself.
  const seen: Array<string | undefined> = [];
  const server = http.createServer((req, res) => {
    seen.push(req.headers[SELF_HOP_HEADER] as string | undefined);
    res.end("ok");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  try {
    await asBun({ PORT: String(port) }, async (ambientCalls) => {
      const own = await dispatchGuarded(
        "openai-compatible-chat-test",
        `http://127.0.0.1:${port}/v1`,
        { headers: { authorization: "Bearer k" }, signal: AbortSignal.timeout(2_000) },
        OPERATOR
      );
      assert.equal(await own.text(), "ok");
      const other = await dispatchGuarded(
        "openai-compatible-chat-test",
        `http://operator-host.invalid:${port}/v1`,
        { signal: AbortSignal.timeout(2_000) },
        OPERATOR
      );
      assert.equal(await other.text(), "ok");
      assert.equal(ambientCalls(), 0);
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
  assert.deepEqual(seen, [ownListenerSelfHopToken(), undefined]);
});
