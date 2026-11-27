import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { type TestContext } from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-kea-9622-"));
process.env.DATA_DIR = dataDir;
process.env.HOME = dataDir;

const { resetDbInstance } = await import("@/lib/db/core");
const { createProviderConnection } = await import("@/lib/db/providers");
const { updateSettings } = await import("@/lib/db/settings");
const { flushProxyLogsSync } = await import("@/lib/proxyLogger");
const { closeCallLogSaves } = await import("@/lib/usage/callLogs");
const { NOAUTH_PROVIDERS } = await import("@/shared/constants/providers");
const { getModelsByProviderId } = await import("@omniroute/open-sse/config/providerModels");
const { POST } = await import("@/app/api/v1/chat/completions/route");

const provider = "cheaperinference";
const candidate = "deepseek-v4-flash";

test.before(async () => {
  await updateSettings({ blockedProviders: Object.keys(NOAUTH_PROVIDERS) });
  await createProviderConnection({
    provider,
    authType: "apikey",
    name: "Priced auto candidate",
    apiKey: "test-kea-9622",
    isActive: true,
    testStatus: "active",
    defaultModel: candidate,
    providerSpecificData: {
      excludedModels: getModelsByProviderId(provider)
        .map((model) => model.id)
        .filter((id) => id !== candidate),
    },
  });
});

test.after(async () => {
  await closeCallLogSaves();
  flushProxyLogsSync();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

function chat(headers: Record<string, string> = {}) {
  return POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        model: "auto/cheap",
        messages: [{ role: "user", content: "Please reply with OK." }],
        max_tokens: 64,
        stream: false,
      }),
    })
  );
}

function mockUpstream(t: TestContext) {
  return t.mock.method(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(String(input), "https://api.cheaperinference.com/v1/chat/completions");
      assert.equal(JSON.parse(String(init?.body)).model, candidate);
      return Response.json({
        id: "chatcmpl-kea-9622",
        choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 },
      });
    }
  );
}

test("KEA-9622: auto/cheap dispatches the priced candidate without a budget", async (t) => {
  const upstream = mockUpstream(t);
  const response = await chat();

  assert.equal(response.status, 200, await response.text());
  assert.match(response.headers.get("X-OmniRoute-Decision") ?? "", /strategy=auto/);
  assert.equal(upstream.mock.callCount(), 1);
});

test("KEA-9622: auto/cheap rejects a strict budget below every candidate estimate", async (t) => {
  const upstream = mockUpstream(t);
  const response = await chat({
    "X-OmniRoute-Budget": "0.0000001",
    "X-OmniRoute-Budget-Fallback": "strict",
  });
  const body = await response.text();

  assert.deepEqual(
    { status: response.status, dispatches: upstream.mock.callCount() },
    { status: 402, dispatches: 0 },
    body
  );
  assert.match(body, /No candidate fits within the configured budget cap/);
});

test("KEA-9622: auto/cheap dispatches a candidate within the strict budget", async (t) => {
  const upstream = mockUpstream(t);
  const response = await chat({
    "X-OmniRoute-Budget": "0.01",
    "X-OmniRoute-Budget-Fallback": "strict",
  });

  assert.equal(response.status, 200, await response.text());
  assert.equal(upstream.mock.callCount(), 1);
});
