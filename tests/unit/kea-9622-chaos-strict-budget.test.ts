import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { type TestContext } from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-kea-9622-chaos-"));
process.env.DATA_DIR = dataDir;
process.env.HOME = dataDir;

const { resetDbInstance } = await import("@/lib/db/core");
const { createProviderConnection } = await import("@/lib/db/providers");
const { updatePricing, updateSettings } = await import("@/lib/db/settings");
const { flushProxyLogsSync } = await import("@/lib/proxyLogger");
const { closeCallLogSaves } = await import("@/lib/usage/callLogs");
const { NOAUTH_PROVIDERS } = await import("@/shared/constants/providers");
const { getModelsByProviderId } = await import("@omniroute/open-sse/config/providerModels");
const { POST } = await import("@/app/api/v1/chat/completions/route");

const affordable = {
  provider: "cheaperinference",
  model: "deepseek-v4-flash",
  url: "https://api.cheaperinference.com/v1/chat/completions",
};
const expensive = {
  provider: "openai",
  model: "gpt-4o-mini",
  url: "https://api.openai.com/v1/chat/completions",
};
const panel = [affordable, expensive];

test.before(async () => {
  await updateSettings({ blockedProviders: Object.keys(NOAUTH_PROVIDERS) });
  await updatePricing({
    [affordable.provider]: { [affordable.model]: { input: 1, output: 1 } },
    [expensive.provider]: { [expensive.model]: { input: 1000, output: 1000 } },
  });
  for (const { provider, model } of panel) {
    await createProviderConnection({
      provider,
      authType: "apikey",
      name: `KEA-9622 ${provider}`,
      apiKey: "test-kea-9622-chaos",
      isActive: true,
      testStatus: "active",
      defaultModel: model,
      providerSpecificData: {
        excludedModels: getModelsByProviderId(provider)
          .map((entry) => entry.id)
          .filter((id) => id !== model),
      },
    });
  }
});

test.after(async () => {
  await closeCallLogSaves();
  flushProxyLogsSync();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

function chat(headers: Record<string, string> = {}, stream = false) {
  return POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        model: "auto/chaos",
        messages: [{ role: "user", content: "Please reply with OK." }],
        max_tokens: 64,
        stream,
      }),
    })
  );
}

function mockUpstream(t: TestContext) {
  const dispatched: string[] = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    dispatched.push(url);
    const member = panel.find((candidate) => candidate.url === url);
    assert.ok(member, `Unexpected upstream URL ${url}`);
    assert.equal(JSON.parse(String(init?.body)).model, member.model);
    return Response.json({
      id: "chatcmpl-kea-9622-chaos",
      choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 },
    });
  });
  return dispatched;
}

function strictBudget(cap: string) {
  return { "X-OmniRoute-Budget": cap, "X-OmniRoute-Budget-Fallback": "strict" };
}

for (const stream of [true, false]) {
  test(`KEA-9622: auto/chaos rejects a strict budget below the panel estimates (stream=${stream})`, async (t) => {
    const dispatched = mockUpstream(t);
    const response = await chat(strictBudget("0.0000001"), stream);
    const body = await response.text();

    assert.deepEqual(
      { status: response.status, dispatches: dispatched.length },
      { status: 402, dispatches: 0 },
      body
    );
    const { error } = JSON.parse(body);
    assert.equal(error.type, "billing_error");
    assert.equal(error.code, "payment_required");
    assert.match(error.message, /No candidate fits within the configured budget cap/);
  });
}

test("KEA-9622: auto/chaos dispatches only panel members within the strict budget", async (t) => {
  const dispatched = mockUpstream(t);
  const response = await chat(strictBudget("0.001"));

  assert.equal(response.status, 200, await response.text());
  assert.deepEqual(dispatched, [affordable.url]);
});

test("KEA-9622: auto/chaos dispatches the full panel without a budget", async (t) => {
  const dispatched = mockUpstream(t);
  const response = await chat();

  assert.equal(response.status, 200, await response.text());
  assert.equal(response.headers.get("X-OmniRoute-Chaos-Panel"), "2");
  assert.deepEqual(dispatched.sort(), panel.map(({ url }) => url).sort());
});
