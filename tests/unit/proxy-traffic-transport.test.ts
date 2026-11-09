import test from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import fs from "node:fs";
import path from "node:path";

// Module imports may resolve data paths; never point them at the operator's installation.
fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixtureDir = fs.mkdtempSync(path.resolve("_artifacts/traffic-transport-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "NODE_TEST_CONTEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixtureDir;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixtureDir, "isolated.sqlite");
}
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(fixtureDir, "plugins");

process.env.OMNIROUTE_RETRY_BACKOFF_MS = "0";
const { dispatchProxyFetch } = await import("../../open-sse/utils/proxyFetchTransport.ts");
const { setTlsClientForTest } = await import("../../open-sse/utils/proxyFetchTransportSupport.ts");
const { tryTlsSend } = await import("../../open-sse/utils/proxyFetchTlsTransport.ts");
const originalFetch = globalThis.fetch;
const { proxyFetch, resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const { SELF_HOP_HEADER, ownListenerSelfHopToken } =
  await import("../../open-sse/utils/selfHop.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  setTlsClientForTest(null);
  globalThis.fetch = originalFetch;
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

test(
  "public proxy fetch keeps upstream environment routing and stamps self hops before sending",
  { timeout: 2000 },
  async () => {
    process.env.PORT = "20128";
    process.env.HTTPS_PROXY = "http://fixture.invalid:8080";
    process.env.NO_PROXY = "*.example.test";
    try {
      assert.deepEqual(resolveProxyForRequest("https://api.example.test/path"), {
        source: "direct",
        proxyUrl: null,
      });
      assert.deepEqual(resolveProxyForRequest("https://upstream.invalid/path"), {
        source: "env",
        proxyUrl: "http://fixture.invalid:8080",
      });
      let sends = 0;
      const records: Array<{ route: unknown; delta: Record<string, number> }> = [];
      const headers = { "x-fixture": "﻿fixture​-value" };
      const response = await proxyFetch(
        "http://127.0.0.1:20128/v1/messages",
        { method: "POST", body: "é", headers },
        {
          nativeFetch: async (_input, options) => {
            sends++;
            assert.equal(new Headers(options?.headers).get("x-fixture"), "fixture-value");
            assert.equal(
              new Headers(options?.headers).get(SELF_HOP_HEADER),
              ownListenerSelfHopToken()
            );
            return new Response("ok");
          },
          recordTraffic: (route, delta) => records.push({ route, delta }),
        }
      );
      assert.equal(await response.text(), "ok");
      assert.equal(headers["x-fixture"], "﻿fixture​-value");
      assert.equal(sends, 1);
      assert.ok(records.every(({ route }) => route === null));
      assert.deepEqual(
        records.map(({ delta }) => delta),
        [
          { attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 },
          { downloadBytes: 2 },
          { completedDownloads: 1 },
        ]
      );
    } finally {
      delete process.env.PORT;
      delete process.env.HTTPS_PROXY;
      delete process.env.NO_PROXY;
    }
  }
);

// Only the raw transport dependency is fake. Real proxy selection/retry/counter logic runs.
test(
  "actual proxy retries count independently, while response cancel counts only consumed prefix",
  { timeout: 2000 },
  async () => {
    const proxy = {
      proxyId: "fixture-proxy",
      type: "http",
      host: "fixture.invalid",
      port: 8080,
      username: "fixture-user",
      password: "fixture-pass",
    };
    const context = new AsyncLocalStorage<unknown>();
    const records: Array<{ proxy: unknown; delta: Record<string, number> }> = [];
    let sends = 0;
    let cancelled = false;
    const native = async () => {
      assert.fail("must not fall back to native");
    };
    const runtime = {
      originalFetch: native as typeof fetch,
      originalFetchWithDispatcher: native,
      proxyContext: context,
      tlsFingerprintContext: new AsyncLocalStorage<{ used: boolean }>(),
      resolveProxyForRequest: () => ({
        source: "context",
        proxyUrl: "http://fixture.invalid:8080",
      }),
    };
    const response = await context.run(proxy, () =>
      dispatchProxyFetch(
        "https://upstream.invalid",
        { method: "POST", body: "é🙂" },
        {
          undiciFetch: async () => {
            sends++;
            if (sends === 1) throw new TypeError("fetch failed");
            return new Response(
              new ReadableStream<Uint8Array>(
                {
                  pull(c) {
                    c.enqueue(new Uint8Array([1, 2, 3]));
                  },
                  cancel() {
                    cancelled = true;
                  },
                },
                { highWaterMark: 0 }
              ),
              { status: 503 }
            );
          },
          recordTraffic: (route, delta) => records.push({ proxy: route, delta }),
        },
        runtime
      )
    );
    assert.equal(sends, 2);
    assert.equal(response.status, 503);
    const reader = response.body!.getReader();
    assert.equal((await reader.read()).value!.byteLength, 3);
    await reader.cancel();
    assert.equal(cancelled, true);
    assert.ok(records.every((record) => record.proxy === proxy));
    assert.deepEqual(
      records.map((record) => record.delta),
      [
        { attempts: 1, uploadBytes: 6, knownUploadAttempts: 1 },
        { failedAttempts: 1 },
        { attempts: 1, uploadBytes: 6, knownUploadAttempts: 1 },
        { downloadBytes: 3 },
        { cancelledDownloads: 1 },
      ]
    );
  }
);

test(
  "resolved direct traffic never inherits a stale proxy context",
  { timeout: 1000 },
  async () => {
    const context = new AsyncLocalStorage<unknown>();
    const records: unknown[] = [];
    const native = async () => new Response("ok");
    const runtime = {
      originalFetch: native as typeof fetch,
      originalFetchWithDispatcher: native,
      proxyContext: context,
      tlsFingerprintContext: new AsyncLocalStorage<{ used: boolean }>(),
      resolveProxyForRequest: () => ({ source: "direct", proxyUrl: null }),
    };
    const response = await context.run({ proxyId: "stale" }, () =>
      dispatchProxyFetch(
        "http://127.0.0.1/fixture",
        {},
        {
          nativeFetch: native,
          recordTraffic: (route) => records.push(route),
        },
        runtime
      )
    );
    assert.equal(await response.text(), "ok");
    assert.ok(records.every((route) => route === null));
  }
);

test(
  "TLS watchdog prefetch is not charged until downstream consumption and retains response identity",
  { timeout: 2000 },
  async () => {
    const deltas: Array<Record<string, number>> = [];
    let prefetched = 0;
    const source = new Response(
      new ReadableStream<Uint8Array>(
        {
          pull(c) {
            prefetched++;
            if (prefetched <= 3) c.enqueue(new Uint8Array([1, 2]));
            else c.close();
          },
        },
        { highWaterMark: 0 }
      )
    );
    Object.defineProperty(source, "url", { value: "https://fixture.invalid/final" });
    Object.defineProperty(source, "redirected", { value: true });
    setTlsClientForTest({
      available: true,
      fetch: async (_url, options) => {
        assert.equal(options?.proxy, null);
        assert.equal(options?.sessionScope, "fixture-session");
        assert.equal(Object.hasOwn(options ?? {}, "browserProfile"), false);
        assert.equal(Object.hasOwn(options ?? {}, "os"), false);
        return source;
      },
    });
    const response = await tryTlsSend(
      "https://fixture.invalid",
      { body: "é" },
      "https://fixture.invalid",
      { used: false, provider: "maxai", sessionScope: "fixture-session" },
      null,
      null,
      { recordTraffic: (_route, delta) => deltas.push(delta) }
    );
    assert.ok(response);
    assert.ok(prefetched >= 1);
    assert.deepEqual(deltas, [{ attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 }]);
    assert.equal(response.url, source.url);
    assert.equal(response.redirected, true);
    const reader = response.body!.getReader();
    assert.equal((await reader.read()).value!.byteLength, 2);
    await reader.cancel();
    assert.deepEqual(deltas, [
      { attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 },
      { downloadBytes: 2 },
      { cancelledDownloads: 1 },
    ]);
    setTlsClientForTest(null);
  }
);

// Exercise the merged upstream replay policy without opening a listener or making network calls.
for (const route of ["direct", "relay", "proxy"] as const) {
  for (const scenario of [
    { name: "strict ambiguous POST", strict: true, code: "UND_ERR_SOCKET", expected: 1 },
    { name: "strict pre-send POST", strict: true, code: "ECONNREFUSED", expected: 2 },
    { name: "legacy ambiguous POST", strict: false, code: "UND_ERR_SOCKET", expected: 2 },
    { name: "strict established timeout", strict: true, code: "ETIMEDOUT", expected: 1 },
  ]) {
    test(`${route} traffic preserves ${scenario.name} resend policy`, async () => {
      const flag = "PROXY_STRICT_POST_REPLAY_ENABLED";
      const originalFlag = process.env[flag];
      process.env[flag] = String(scenario.strict);
      let sends = 0;
      let nativeCalls = 0;
      const deltas: Array<Record<string, number>> = [];
      const context = new AsyncLocalStorage<unknown>();
      const proxy =
        route === "relay"
          ? { type: "vercel", host: "fixture.invalid", relayAuth: "synthetic-test-only" }
          : { type: "http", host: "fixture.invalid", port: 8080 };
      const native = async () => {
        nativeCalls++;
        return new Response("unexpected native fallback");
      };
      const runtime = {
        originalFetch: native as typeof fetch,
        originalFetchWithDispatcher: native,
        proxyContext: context,
        tlsFingerprintContext: new AsyncLocalStorage<{ used: boolean }>(),
        resolveProxyForRequest: () => ({
          source: route === "direct" ? "direct" : "context",
          proxyUrl: route === "direct" ? null : "http://fixture.invalid:8080",
        }),
      };
      try {
        const request = context.run(route === "direct" ? null : proxy, () =>
          dispatchProxyFetch(
            "https://upstream.invalid/fixture",
            { method: "POST", body: "é" },
            {
              undiciFetch: async () => {
                if (++sends === 1)
                  throw Object.assign(new Error("fetch failed"), { code: scenario.code });
                return new Response("ok");
              },
              nativeFetch: native,
              recordTraffic: (_proxy, delta) => deltas.push(delta),
            },
            runtime
          )
        );
        if (scenario.expected === 1) await assert.rejects(request);
        else assert.equal(await (await request).text(), "ok");
        assert.equal(sends, scenario.expected);
        assert.equal(nativeCalls, 0);
        assert.equal(
          deltas.reduce((sum, delta) => sum + (delta.attempts ?? 0), 0),
          sends
        );
        assert.equal(
          deltas.reduce((sum, delta) => sum + (delta.uploadBytes ?? 0), 0),
          sends * 2
        );
        assert.equal(
          deltas.reduce((sum, delta) => sum + (delta.failedAttempts ?? 0), 0),
          1
        );
      } finally {
        if (originalFlag === undefined) delete process.env[flag];
        else process.env[flag] = originalFlag;
      }
    });
  }
}

for (const route of ["direct", "proxy", "relay"] as const) {
  for (const fails of [false, true]) {
    test(`dedicated paid image ${route} ${fails ? "failure" : "success"} is metered once`, async () => {
      const context = new AsyncLocalStorage<unknown>();
      const proxy =
        route === "relay"
          ? { type: "vercel", host: "fixture.invalid", relayAuth: "synthetic-test-only" }
          : { type: "http", host: "fixture.invalid", port: 8080 };
      const records: Array<{ route: unknown; delta: Record<string, number> }> = [];
      let sends = 0;
      const native = async (): Promise<Response> => assert.fail("paid images must not fall back");
      const runtime = {
        originalFetch: native as typeof fetch,
        originalFetchWithDispatcher: native,
        proxyContext: context,
        tlsFingerprintContext: new AsyncLocalStorage<{ used: boolean }>(),
        resolveProxyForRequest: () => ({
          source: route === "direct" ? "direct" : "context",
          proxyUrl: route === "direct" ? null : "http://fixture.invalid:8080",
        }),
      };
      const request = context.run(route === "direct" ? null : proxy, () =>
        dispatchProxyFetch(
          "https://chatgpt.com/backend-api/codex/images/generations",
          { method: "POST", body: "é" },
          {
            undiciFetch: async () => {
              sends++;
              if (fails) throw Object.assign(new TypeError("fetch failed"), { code: "ECONNRESET" });
              return new Response("ok");
            },
            nativeFetch: native,
            recordTraffic: (recordedRoute, delta) => records.push({ route: recordedRoute, delta }),
          },
          runtime
        )
      );
      if (fails) await assert.rejects(request);
      else assert.equal(await (await request).text(), "ok");
      assert.equal(sends, 1);
      assert.ok(records.every((record) => record.route === (route === "direct" ? null : proxy)));
      assert.deepEqual(
        records.map(({ delta }) => delta),
        fails
          ? [{ attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 }, { failedAttempts: 1 }]
          : [
              { attempts: 1, uploadBytes: 2, knownUploadAttempts: 1 },
              { downloadBytes: 2 },
              { completedDownloads: 1 },
            ]
      );
    });
  }
}
