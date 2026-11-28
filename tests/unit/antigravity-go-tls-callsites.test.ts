import { after, test } from "node:test";
import assert from "node:assert/strict";
import { fetchAntigravityWithReadinessTimeout } from "../../open-sse/executors/antigravity/executeAttempt.ts";
import { ensureAntigravityProjectAssigned } from "../../open-sse/services/antigravityProjectBootstrap.ts";
import { refreshGoogleToken } from "../../open-sse/services/tokenRefresh/providers/google.ts";
import { ANTIGRAVITY_GO_TLS_FLAG } from "../../open-sse/utils/antigravityGoFetch.ts";
import {
  setAntigravityGoBridgeForTest,
  type AntigravityGoTargetMeta,
} from "../../open-sse/utils/antigravityGoTlsClient.ts";
import {
  getOAuthTestFetcher,
  OAUTH_TEST_CONFIG,
} from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";
import { safeOutboundFetch } from "../../src/shared/network/safeOutboundFetch.ts";

const FEATURE_FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");

async function withEnabledBridge(
  handler: (meta: AntigravityGoTargetMeta, body: Uint8Array | null) => Promise<Response>,
  fn: (bridgeCalls: AntigravityGoTargetMeta[]) => Promise<void>
): Promise<void> {
  const store = globalThis as Record<symbol, unknown>;
  const prevResolver = store[FEATURE_FLAG_RESOLVER_KEY];
  const bridgeCalls: AntigravityGoTargetMeta[] = [];

  store[FEATURE_FLAG_RESOLVER_KEY] = (key: string) => key === ANTIGRAVITY_GO_TLS_FLAG;
  setAntigravityGoBridgeForTest({
    send(meta, body) {
      bridgeCalls.push(meta);
      return handler(meta, body);
    },
  });

  try {
    await fn(bridgeCalls);
  } finally {
    setAntigravityGoBridgeForTest(null);
    if (prevResolver === undefined) {
      delete store[FEATURE_FLAG_RESOLVER_KEY];
    } else {
      store[FEATURE_FLAG_RESOLVER_KEY] = prevResolver;
    }
  }
}

after(() => {
  setAntigravityGoBridgeForTest(null);
});

test("fetchAntigravityWithReadinessTimeout routes cli profile via Go bridge and ide profile via standard fetch", async () => {
  const originalFetch = globalThis.fetch;
  let globalFetchCalls = 0;
  globalThis.fetch = (async () => {
    globalFetchCalls++;
    return new Response("node-fetch", { status: 200 });
  }) as typeof fetch;

  try {
    await withEnabledBridge(
      async () => new Response("go-bridge", { status: 200 }),
      async (bridgeCalls) => {
        const cliRes = await fetchAntigravityWithReadinessTimeout(
          "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
          { method: "POST", body: "{}" },
          5_000,
          { provider: "antigravity", model: "gemini-2.5-pro", connectionId: "c1" },
          undefined,
          "cli"
        );
        assert.equal(await cliRes.text(), "go-bridge");

        const ideRes = await fetchAntigravityWithReadinessTimeout(
          "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
          { method: "POST", body: "{}" },
          5_000,
          { provider: "antigravity", model: "gemini-2.5-pro", connectionId: "c1" },
          undefined,
          "ide"
        );
        assert.equal(await ideRes.text(), "node-fetch");

        assert.equal(bridgeCalls.length, 1);
        assert.equal(globalFetchCalls, 1);
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("ensureAntigravityProjectAssigned uses Go bridge for cli profile and bypasses for ide", async () => {
  const originalFetch = globalThis.fetch;
  let globalFetchCalls = 0;
  globalThis.fetch = (async () => {
    globalFetchCalls++;
    return new Response(JSON.stringify({ cloudaicompanionProject: "ide-proj-123" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  try {
    await withEnabledBridge(
      async () =>
        new Response(JSON.stringify({ cloudaicompanionProject: "cli-proj-456" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      async (bridgeCalls) => {
        const cliProj = await ensureAntigravityProjectAssigned(
          `tok-cli-${Date.now()}`,
          fetch,
          "cli"
        );
        const ideProj = await ensureAntigravityProjectAssigned(
          `tok-ide-${Date.now()}`,
          fetch,
          "ide"
        );
        assert.equal(cliProj, "cli-proj-456");
        assert.equal(ideProj, "ide-proj-123");
        assert.equal(bridgeCalls.length, 1);
        assert.equal(globalFetchCalls, 1);
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("refreshGoogleToken routes only antigravity/agy cli profile through Go bridge", async () => {
  const originalFetch = globalThis.fetch;
  let globalFetchCalls = 0;
  globalThis.fetch = (async () => {
    globalFetchCalls++;
    return new Response(JSON.stringify({ access_token: "node-tok", expires_in: 3600 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const silentLog = { info() {}, warn() {}, error() {}, debug() {} };

  try {
    await withEnabledBridge(
      async () =>
        new Response(JSON.stringify({ access_token: "go-tok", expires_in: 3600 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      async (bridgeCalls) => {
        const agyCli = await refreshGoogleToken("rt-1", "cid", "csec", silentLog, null, {
          provider: "agy",
          clientProfile: "cli",
        });
        const agyIde = await refreshGoogleToken("rt-2", "cid", "csec", silentLog, null, {
          provider: "antigravity",
          clientProfile: "ide",
        });
        const geminiCli = await refreshGoogleToken("rt-3", "cid", "csec", silentLog, null, {
          provider: "gemini",
          clientProfile: "cli",
        });

        assert.equal(agyCli?.accessToken, "go-tok");
        assert.equal(agyIde?.accessToken, "node-tok");
        assert.equal(geminiCli?.accessToken, "node-tok");
        assert.equal(bridgeCalls.length, 1);
        assert.equal(globalFetchCalls, 2);
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getOAuthTestFetcher and buildAntigravityProbe preserve cli header parity and Go routing", async () => {
  const cliConn = {
    provider: "antigravity",
    providerSpecificData: { clientProfile: "cli", projectId: "proj-cli" },
  };
  const ideConn = {
    provider: "antigravity",
    providerSpecificData: { clientProfile: "ide", projectId: "proj-ide" },
  };

  const cliProbe = await OAUTH_TEST_CONFIG.antigravity.buildProbe!(cliConn, "tok-cli");
  const ideProbe = await OAUTH_TEST_CONFIG.antigravity.buildProbe!(ideConn, "tok-ide");
  assert.equal("Accept" in cliProbe.headers, false, "cli probe must omit Accept header");
  assert.equal(ideProbe.headers.Accept, "text/event-stream");

  await withEnabledBridge(
    async () => new Response("go-probe", { status: 200 }),
    async (bridgeCalls) => {
      const cliFetcher = getOAuthTestFetcher(cliConn);
      const res = await cliFetcher(cliProbe.url, {
        method: cliProbe.method,
        headers: cliProbe.headers,
        body: cliProbe.body,
      });
      assert.equal(await res.text(), "go-probe");
      assert.equal(bridgeCalls.length, 1);
    }
  );
  assert.equal(getOAuthTestFetcher(ideConn), fetch);
  assert.equal(getOAuthTestFetcher({ provider: "gemini" }), fetch);
});

test("safeOutboundFetch supports fetchFn passthrough with connectGuard", async () => {
  let receivedGuard: unknown;
  let receivedUrl = "";
  const customFetch: typeof fetch = (async (input, init) => {
    receivedUrl = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    receivedGuard = (init as { connectGuard?: unknown } | undefined)?.connectGuard;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;

  const res = await safeOutboundFetch("https://93.184.216.34/v1internal:fetchAvailableModels", {
    method: "POST",
    guard: "public-only",
    fetchFn: customFetch,
  });

  assert.equal(res.status, 200);
  assert.equal(receivedUrl, "https://93.184.216.34/v1internal:fetchAvailableModels");
  assert.equal(receivedGuard, "public-only");
});
