/**
 * The Kiro model catalog must leave through the connection's proxy, the same egress as
 * inference (#19607 follow-up).
 *
 * Kiro filters both ListAvailableModels and inference by egress region (live 2026-11-16: 9
 * models and no Claude from an unsupported region, 25 from US egress). The models route
 * resolved only the provider/global proxy, while inference resolves the connection proxy, so a
 * connection with its own US proxy listed the unsupported region's catalog while it could call
 * the US one.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-models-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// The provider URL guard would resolve the Amazon Q host through real DNS; keep the test offline.
const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

// An operator shell proxy must not decide the route under test.
const PROXY_ENV_KEYS = [
  "HTTPS_PROXY",
  "https_proxy",
  "HTTP_PROXY",
  "http_proxy",
  "ALL_PROXY",
  "all_proxy",
  "NO_PROXY",
  "no_proxy",
];
const savedProxyEnv = Object.fromEntries(PROXY_ENV_KEYS.map((key) => [key, process.env[key]]));
for (const key of PROXY_ENV_KEYS) delete process.env[key];

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const { clearKiroModelCache } = await import("../../open-sse/services/kiroModels.ts");

const PROFILE_ARN = "arn:aws:codewhisperer:us-east-1:000000000000:profile/TEST";
const originalFetch = globalThis.fetch;

// A live listener for the proxy address, so the proxy reachability probe passes.
const proxyListener = net.createServer((socket) => socket.destroy());
await new Promise<void>((resolve) => proxyListener.listen(0, "127.0.0.1", () => resolve()));
const proxyPort = (proxyListener.address() as net.AddressInfo).port;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  clearKiroModelCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedKiroConnection() {
  return providersDb.createProviderConnection({
    provider: "kiro",
    authType: "oauth",
    name: `kiro-${Math.random().toString(16).slice(2, 8)}`,
    accessToken: "kiro-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { authMethod: "idc", region: "us-east-1", profileArn: PROFILE_ARN },
  });
}

/** Records how each ListAvailableModels request would be routed, and answers it. */
function captureCatalogRoutes() {
  const routes: Array<{ source: string; proxyUrl: string | null }> = [];
  globalThis.fetch = (async (url: URL | string) => {
    const target = String(url);
    if (target.includes("/ListAvailableModels")) {
      const route = resolveProxyForRequest(target) as { source: string; proxyUrl: string | null };
      routes.push({ source: route.source, proxyUrl: route.proxyUrl });
    }
    return new Response(JSON.stringify({ models: [{ modelId: "deepseek-3.2" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return routes;
}

async function callRoute(connectionId: string) {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await new Promise<void>((resolve) => proxyListener.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalAllowPrivateProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
  }
  for (const [key, value] of Object.entries(savedProxyEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("Kiro model discovery uses the connection's own proxy, like inference", async () => {
  const connection = await seedKiroConnection();
  const proxy = await proxiesDb.createProxy({
    name: "Kiro account proxy",
    type: "http",
    host: "127.0.0.1",
    port: proxyPort,
  });
  await proxiesDb.assignProxyToScope("account", connection.id, proxy!.id);

  const routes = captureCatalogRoutes();
  const response = await callRoute(connection.id);

  assert.equal(response.status, 200);
  assert.ok(routes.length > 0, "the route must call ListAvailableModels");
  for (const route of routes) {
    assert.equal(route.source, "context", `catalog request went ${route.source}`);
    assert.ok(
      route.proxyUrl?.includes(`127.0.0.1:${proxyPort}`),
      `catalog request used ${route.proxyUrl}, not the connection proxy`
    );
  }
});

test("control: without any proxy the Kiro model discovery goes direct", async () => {
  const connection = await seedKiroConnection();

  const routes = captureCatalogRoutes();
  const response = await callRoute(connection.id);

  assert.equal(response.status, 200);
  assert.ok(routes.length > 0, "the route must call ListAvailableModels");
  for (const route of routes) assert.equal(route.source, "direct");
});
