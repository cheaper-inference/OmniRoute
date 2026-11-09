/**
 * usage-connection-proxy.test.ts — usage readers run through the connection proxy.
 *
 * Guard: with a proxy assigned to the connection, the upstream usage request
 * runs inside the connection proxy context instead of a direct fetch;
 * failures surface as the existing message and never retry outside the proxy.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  connectionProxyTestOverride,
  fetchWithConnectionProxy,
} from "../../open-sse/services/connectionProxyFetch.ts";
import { hasAmbientProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";

const ASSIGNED_PROXY = { type: "socks5", host: "127.0.0.1", port: 9 };
const BALANCE_BODY = JSON.stringify({
  dailyCredits: 10,
  subscriptionCredits: 20,
  subscriptionAmount: 100,
  extraCredits: 5,
  total: 35,
});
const originalFetch = globalThis.fetch;

function balanceResponse(): Response {
  return new Response(BALANCE_BODY, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function useAssignedProxy(): void {
  connectionProxyTestOverride.resolveProxyForConnection = async () => ({
    proxy: ASSIGNED_PROXY,
  });
}

function useNoProxy(): void {
  connectionProxyTestOverride.resolveProxyForConnection = async () => ({ proxy: null });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  connectionProxyTestOverride.resolveProxyForConnection = null;
});

test("conol reading with an assigned proxy runs inside the proxy context", async () => {
  useAssignedProxy();
  let observedInContext: boolean | null = null;
  let observedCookie = "";
  const cookie = "session-token=abc123";
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    observedInContext = hasAmbientProxyContext();
    observedCookie = String((init?.headers as Record<string, string> | undefined)?.cookie ?? "");
    return balanceResponse();
  }) as typeof globalThis.fetch;
  const result = (await getUsageForProvider({
    provider: "conol-web",
    apiKey: cookie,
    id: "conn-proxy",
  })) as { plan?: string; quotas?: Record<string, { remaining?: number }> };
  assert.equal(observedInContext, true);
  assert.equal(observedCookie, cookie);
  assert.equal(result.plan, "Subscription");
  assert.equal(result.quotas?.credits.remaining, 35);
});

test("conol reading without a proxy calls the console directly", async () => {
  useNoProxy();
  let observedInContext: boolean | null = null;
  let observedUrl = "";
  const cookie = "session-token=abc123";
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    observedInContext = hasAmbientProxyContext();
    observedUrl = String(url);
    void init;
    return balanceResponse();
  }) as typeof globalThis.fetch;
  const result = (await getUsageForProvider({
    provider: "conol-web",
    apiKey: cookie,
    id: "conn-direct",
  })) as { plan?: string; quotas?: Record<string, { remaining?: number }> };
  assert.equal(observedInContext, false);
  assert.equal(observedUrl, "https://conol.ai/api/billing/balance");
  assert.equal(result.plan, "Subscription");
  assert.equal(result.quotas?.credits.remaining, 35);
});

test("a proxied conol failure surfaces the existing message without a direct retry", async () => {
  useAssignedProxy();
  let calls = 0;
  let observedInContext: boolean | null = null;
  globalThis.fetch = (async () => {
    calls += 1;
    observedInContext = hasAmbientProxyContext();
    throw new Error("proxy blocked the console domain");
  }) as typeof globalThis.fetch;
  const result = (await getUsageForProvider({
    provider: "conol-web",
    apiKey: "session-token=abc123",
    id: "conn-blocked",
  })) as { message?: string };
  assert.equal(observedInContext, true);
  assert.equal(result.message, "Conol balance request failed");
  assert.equal(calls, 1);
});

test("syntx reading with two bearer tokens sends the JWT to both requests", async () => {
  useNoProxy();
  const plain = "plainA";
  const jwt = "eyJhbGciOiJub25lIn0.eyJzdWIiOiIxIn0.x";
  const seen: string[] = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    seen.push(String((init?.headers as Record<string, string> | undefined)?.authorization ?? ""));
    if (String(url).includes("/llm/limits")) {
      return new Response(
        JSON.stringify({
          plan: "pro",
          window_6h: { percent_left: 80 },
          window_7d: { percent_left: 70 },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ tokens: "100", type: "pro" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  const result = (await getUsageForProvider({
    provider: "syntx",
    apiKey: plain,
    accessToken: jwt,
  })) as { plan?: string; message?: string | null };
  assert.equal(seen.length, 2);
  assert.deepEqual(seen, [`Bearer ${jwt}`, `Bearer ${jwt}`]);
  assert.equal(result.message, null);
  assert.equal(result.plan, "SYNTX Pro");
});

test("a reading without a connection identifier makes no fetch", async () => {
  useAssignedProxy();
  const { fetchWithConnectionProxy: proxiedFetch } =
    await import("../../open-sse/services/connectionProxyFetch.ts");
  let calls = 0;
  const fetchFn = (async () => {
    calls += 1;
    return balanceResponse();
  }) as typeof globalThis.fetch;
  const response = await proxiedFetch("", "https://conol.ai/api/billing/balance", undefined, {
    resolveProxyForConnection: async () => ({ proxy: ASSIGNED_PROXY }),
    fetchFn,
  });
  assert.equal(response, null);
  assert.equal(calls, 0);
});

test("usage leaves route every proxied fetch through the connection proxy helper", async () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, "..", "..", "open-sse", "services");
  const leaves = [
    join(root, "conolUsage.ts"),
    join(root, "usage", "github.ts"),
    join(root, "usage", "claude.ts"),
    join(root, "usage", "codex.ts"),
    join(root, "usage", "cursor.ts"),
    join(root, "usage", "syntx.ts"),
    join(root, "usage", "devinCli.ts"),
    join(root, "usage", "chatplayground.ts"),
    join(root, "usage", "command-code.ts"),
  ];
  for (const file of leaves) {
    const source = readFileSync(file, "utf8");
    // Only the module seam initializer (`... => fetch(...)`) and qualified
    // `globalThis.fetch` / `codexUsageFetch(...)` calls may remain.
    const scrubbed = source
      .replace(/=>\s*fetch\([^)]*\)/g, "")
      .replace(/codexUsageFetch\(/g, "")
      .replace(/globalThis\.fetch\(/g, "");
    assert.ok(
      !/(^|[^a-zA-Z_.])fetch\(/.test(scrubbed),
      `${file} must not call bare fetch directly`
    );
    assert.ok(
      source.includes("fetchWithConnectionProxy("),
      `${file} must route through the connection proxy helper`
    );
  }
});

test("the helper reports a missing identifier instead of fetching directly", async () => {
  let calls = 0;
  const fetchFn = (async (): Promise<Response> => {
    calls += 1;
    return balanceResponse();
  }) as typeof globalThis.fetch;
  const response = await fetchWithConnectionProxy(
    "",
    "https://console.example/api/balance",
    undefined,
    {
      resolveProxyForConnection: async () => ({ proxy: ASSIGNED_PROXY }),
      fetchFn,
    }
  );
  assert.equal(response, null);
  assert.equal(calls, 0);
});
