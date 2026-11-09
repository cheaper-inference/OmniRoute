import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #16818: the healthy-path GitHub /user probe replaces the Copilot sub-token refresh,
// so it must keep that call's egress (connection proxy), wire profile (Copilot refresh
// headers, `token <access token>`) and be bounded by a timeout.

process.env.NODE_ENV = "test";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "copilot-github-user-probe-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const { setProxyForLevel } = await import("../../src/lib/db/settings.ts");
const health = await import("../../src/lib/tokenHealthCheck.ts");
const { probeGitHubAccessToken } = await import("../../src/lib/tokenHealthCheckCopilot.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const { proxyConfigToUrl } = await import("../../open-sse/utils/proxyDispatcher.ts");
const { getGitHubCopilotRefreshHeaders } =
  await import("../../open-sse/config/providerHeaderProfiles.ts");
const { __setProxyHealthTcpCheckForTesting } = await import("../../src/lib/proxyHealth.ts");

const originalFetch = globalThis.fetch;
const PROXY = { type: "http" as const, host: "127.0.0.1", port: 18999 };

type SeenCall = {
  url: string;
  headers: Record<string, string>;
  hasSignal: boolean;
  proxySource: string;
  proxyUrl: string | null;
};
let seen: SeenCall[] = [];

function recordingFetch(status = 200) {
  return (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    const resolved = resolveProxyForRequest(url) as { source: string; proxyUrl: string | null };
    seen.push({
      url,
      headers: { ...(init.headers as Record<string, string>) },
      hasSignal: init.signal instanceof AbortSignal,
      proxySource: resolved.source,
      proxyUrl: resolved.proxyUrl,
    });
    return new Response("{}", { status, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
}

test.before(() => {
  __setProxyHealthTcpCheckForTesting(async () => true);
});

test.after(() => {
  globalThis.fetch = originalFetch;
  __setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("probe runs inside the connection proxy context", async () => {
  seen = [];
  globalThis.fetch = recordingFetch();
  const result = await probeGitHubAccessToken({
    accessToken: "gho_probe",
    apiBaseUrl: "https://api.github.com/",
    proxyConfig: PROXY,
  });
  assert.deepEqual(result, { status: 200 });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].url, "https://api.github.com/user");
  assert.equal(seen[0].proxySource, "context", "the /user probe must not egress directly");
  assert.equal(seen[0].proxyUrl, proxyConfigToUrl(PROXY));
});

test("probe sends the Copilot refresh header profile (token scheme), not a generic UA", async () => {
  seen = [];
  globalThis.fetch = recordingFetch();
  await probeGitHubAccessToken({ accessToken: "gho_probe", apiBaseUrl: "https://api.github.com" });
  assert.equal(seen.length, 1);
  assert.deepEqual(seen[0].headers, getGitHubCopilotRefreshHeaders("token gho_probe"));
  assert.equal(seen[0].headers.Authorization, "token gho_probe");
  assert.notEqual(seen[0].headers["User-Agent"], "OmniRoute");
});

test("probe is bounded by a timeout and reports a hung socket as inconclusive (null)", async () => {
  let sawSignal = false;
  globalThis.fetch = ((_input: RequestInfo | URL, init: RequestInit = {}) => {
    sawSignal = init.signal instanceof AbortSignal;
    return new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
    });
  }) as typeof fetch;
  const started = Date.now();
  const result = await probeGitHubAccessToken({
    accessToken: "gho_probe",
    apiBaseUrl: "https://api.github.com",
    timeoutMs: 50,
  });
  assert.equal(sawSignal, true, "fetch must receive an abort signal");
  assert.equal(result, null);
  assert.ok(Date.now() - started < 5_000, "a hung probe must not stall the health sweep");
});

test("a verified 401 is surfaced so the health check can demote the connection", async () => {
  seen = [];
  globalThis.fetch = recordingFetch(401);
  const result = await probeGitHubAccessToken({
    accessToken: "gho_revoked",
    apiBaseUrl: "https://api.github.com",
  });
  assert.deepEqual(result, { status: 401 });
});

test("checkConnection: healthy Copilot sub-token probes /user through the provider proxy", async () => {
  await setProxyForLevel("provider", "github", PROXY);
  try {
    const connection = await db.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "probe proxy wiring",
      accessToken: "gho_healthy",
      refreshToken: null,
      providerSpecificData: {
        copilotToken: "existing-copilot-token",
        copilotTokenExpiresAt: Math.floor(Date.now() / 1000) + 3600,
      },
      testStatus: "active",
      isActive: true,
    });
    seen = [];
    globalThis.fetch = recordingFetch();
    await health.checkConnection(connection);
    const userCalls = seen.filter((c) => /\/user$/.test(c.url));
    assert.equal(userCalls.length, 1, `expected one /user probe, saw ${JSON.stringify(seen)}`);
    assert.equal(
      seen.filter((c) => c.url.includes("copilot_internal")).length,
      0,
      "a healthy sub-token is not rotated"
    );
    assert.equal(userCalls[0].proxySource, "context");
    assert.equal(userCalls[0].proxyUrl, proxyConfigToUrl(PROXY));
    assert.equal(userCalls[0].headers.Authorization, "token gho_healthy");
    assert.equal(userCalls[0].hasSignal, true);
  } finally {
    await setProxyForLevel("provider", "github", null);
  }
});
