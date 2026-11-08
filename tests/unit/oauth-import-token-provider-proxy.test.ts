// POST /api/oauth/<provider>/import-token verifies the pasted token upstream before storing
// it (Claude setup-token: one live /v1/messages probe). That verification must leave through
// the proxy assigned to the provider, exactly like the authorization-code exchange does —
// otherwise it reaches the provider directly and exposes the host's own IP.
// Anthropic is stubbed at globalThis.fetch; the stub records whether it ran in a proxy context.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-import-token-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { hasAmbientProxyContext } = await import("../../open-sse/utils/proxyFetch.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");

const SETUP_TOKEN = "sk-ant-oat01-unit-test-proxy-token-bbbbbbbbbbbbbbbbbbbbbbbb";
const originalFetch = globalThis.fetch;

function stubAnthropic(): boolean[] {
  const inProxyContext: boolean[] = [];
  globalThis.fetch = (async () => {
    inProxyContext.push(hasAmbientProxyContext());
    return new Response(
      JSON.stringify({ id: "msg_test", type: "message", role: "assistant", content: [] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
  return inProxyContext;
}

async function importToken() {
  const request = new Request("http://localhost:20128/api/oauth/claude/import-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: SETUP_TOKEN }),
  });
  const response = await route.POST(request, {
    params: Promise.resolve({ provider: "claude", action: "import-token" }),
  });
  return { status: response.status, body: await response.json() };
}

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  for (const row of await providersDb.getProviderConnections({ provider: "claude" })) {
    await providersDb.deleteProviderConnection(row.id);
  }
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("importToken_NoProviderProxy_VerifiesWithoutAProxyContext", async () => {
  const inProxyContext = stubAnthropic();
  const { status } = await importToken();
  assert.equal(status, 200);
  assert.ok(inProxyContext.length > 0, "the token was verified upstream");
  assert.deepEqual(new Set(inProxyContext), new Set([false]));
});

test("importToken_ProviderProxyAssigned_VerifiesThroughTheProxy", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "Claude provider proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9,
  });
  await proxiesDb.assignProxyToScope("provider", "claude", proxy!.id);

  const inProxyContext = stubAnthropic();
  const { status } = await importToken();
  assert.equal(status, 200);
  assert.ok(inProxyContext.length > 0, "the token was verified upstream");
  assert.deepEqual(
    new Set(inProxyContext),
    new Set([true]),
    "every verification request must run inside the provider's proxy context"
  );
});
