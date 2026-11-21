/**
 * The `headers` plugin option (#18397): extra request headers for a gateway
 * behind Cloudflare Access or another header-auth proxy. Catalog fetchers are
 * covered in models-fetcher.test.ts; this file covers the option schema and
 * the inference path through the fetch interceptor.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  createOmniRouteAuthHook,
  createOmniRouteFetchInterceptor,
  parseOmniRoutePluginOptions,
  resolveOmniRoutePluginOptions,
} from "../src/index.js";

const BASE = "https://or.example.com/v1";
const KEY = "sk-test-headers";
const CF = { "CF-Access-Client-Id": "id", "CF-Access-Client-Secret": "secret" };

function installFetchRecorder() {
  const calls: Array<{ input: unknown; init?: RequestInit }> = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    calls.push({ input, init });
    return new Response("ok");
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

test("headers option: a string map passes the schema and resolves into the options", () => {
  const parsed = parseOmniRoutePluginOptions({ baseURL: BASE, headers: CF });
  assert.deepEqual(resolveOmniRoutePluginOptions(parsed).headers, CF);
});

test("headers option: non-string values are rejected", () => {
  assert.throws(() => parseOmniRoutePluginOptions({ baseURL: BASE, headers: { "X-Num": 1 } }));
});

test("interceptor: same-origin inference carries the headers and Authorization wins", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({
      apiKey: KEY,
      baseURL: BASE,
      headers: { ...CF, authorization: "Bearer user" },
    });
    await f(`${BASE}/chat/completions`, { method: "POST", body: "{}" });
  } finally {
    restore();
  }
  const sent = new Headers(calls[0]!.init!.headers);
  assert.equal(sent.get("cf-access-client-id"), "id");
  assert.equal(sent.get("cf-access-client-secret"), "secret");
  assert.equal(sent.get("authorization"), `Bearer ${KEY}`);
});

test("interceptor: the headers never leave for another origin", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const f = createOmniRouteFetchInterceptor({ apiKey: KEY, baseURL: BASE, headers: CF });
    await f("https://elsewhere.example.com/v1/chat/completions", { method: "POST", body: "{}" });
  } finally {
    restore();
  }
  const sent = new Headers(calls[0]!.init?.headers);
  assert.equal(sent.get("cf-access-client-id"), null);
});

test("loader: the wired interceptor sends the headers option on inference", async () => {
  const { calls, restore } = installFetchRecorder();
  try {
    const hook = createOmniRouteAuthHook({ baseURL: BASE, headers: CF });
    const result = (await hook.loader!(
      async () => ({ type: "api", key: KEY }) as never,
      {} as never
    )) as { fetch: typeof fetch };
    await result.fetch(`${BASE}/chat/completions`, { method: "POST", body: "{}" });
  } finally {
    restore();
  }
  const sent = new Headers(calls[0]!.init!.headers);
  assert.equal(sent.get("cf-access-client-id"), "id");
  assert.equal(sent.get("authorization"), `Bearer ${KEY}`);
});
