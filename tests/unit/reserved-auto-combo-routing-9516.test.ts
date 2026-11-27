import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const originalDataDir = process.env.DATA_DIR;
const originalApiKeySecret = process.env.API_KEY_SECRET;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-reserved-auto-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET ||= "reserved-auto-9516-test-secret";

const { resetDbInstance } = await import("@/lib/db/core");
const { createCombo, getComboByName } = await import("@/lib/db/combos");
const { createApiKey, updateApiKeyPermissions } = await import("@/lib/db/apiKeys");
const { getModelsByProviderId } = await import("@omniroute/open-sse/config/providerModels");
const { NOAUTH_PROVIDERS } = await import("@/shared/constants/providers");
const { updateSettings } = await import("@/lib/db/settings");
const { createProviderConnection } = await import("@/lib/db/providers");
const { POST } = await import("@/app/api/v1/chat/completions/route");

test.before(async () => {
  // Keep the candidate pool confined to one model on the mocked upstream.
  await updateSettings({ blockedProviders: Object.keys(NOAUTH_PROVIDERS) });
  const candidate = "gpt-4o-mini";
  const excludedModels = getModelsByProviderId("openai")
    .map((model) => model.id)
    .filter((id) => id !== candidate);
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Built-in router candidate",
    apiKey: "sk-test-auto",
    isActive: true,
    testStatus: "active",
    defaultModel: candidate,
    providerSpecificData: { excludedModels },
  });
  for (const name of ["auto", "auto/coding"]) {
    await createCombo({
      name,
      strategy: "priority",
      models: ["anthropic/claude-sonnet-4-6"],
      context_length: 1000,
    });
  }
  for (const name of ["auto/legado-x", "auto/best-foo", "auto/best-legado-x"]) {
    await createCombo({
      name,
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      context_length: name === "auto/best-legado-x" ? 1500 : 1000,
    });
  }
});

test.after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = originalApiKeySecret;
});

async function chat(model: string, apiKey?: string) {
  return POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Reply with OK." }],
        max_tokens: 2000,
        stream: false,
      }),
    })
  );
}

for (const [model, storedName] of [
  ["auto", "auto"],
  ["auto/coding", "auto/coding"],
  ["AUTO", "auto"],
  ["Auto/Coding", "auto/coding"],
]) {
  test(`chat dispatches "${model}" through the built-in router despite the legacy combo`, async (t) => {
    assert.equal((await getComboByName(storedName))?.strategy, "priority");
    let sentMaxTokens: number | undefined;
    const upstream = t.mock.method(
      globalThis,
      "fetch",
      async (input: RequestInfo | URL, init?: RequestInit) => {
        assert.equal(new URL(String(input)).hostname, "api.openai.com");
        const payload = JSON.parse(String(init?.body));
        assert.equal(payload.model, "gpt-4o-mini");
        sentMaxTokens = payload.max_tokens;
        return Response.json({
          id: "chatcmpl-reserved-auto",
          choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
        });
      }
    );

    const response = await chat(model);
    const body = await response.text();

    assert.equal(response.status, 200, body);
    assert.match(body, /"content":"OK"/);
    assert.ok(upstream.mock.callCount() > 0);
    assert.equal(sentMaxTokens, 2000, "the saved combo's 1000-token context limit must not apply");
    assert.equal((await getComboByName(storedName))?.strategy, "priority");
  });
}

for (const model of ["auto/legado-x", "Auto/LEGADO-X", "auto/foo"]) {
  test(`chat serves "${model}" through the saved combo and applies its context limit`, async (t) => {
    let sentMaxTokens: number | undefined;
    t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(new URL(String(input)).hostname, "api.openai.com");
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.model, "gpt-4o-mini");
      sentMaxTokens = payload.max_tokens;
      return Response.json({
        id: "chatcmpl-legacy-auto",
        choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
      });
    });

    const response = await chat(model);
    const body = await response.text();
    assert.equal(response.status, 200, body);
    assert.match(body, /"content":"OK"/);
    // The 1000-token window also has to fit the input messages.
    assert.ok(
      typeof sentMaxTokens === "number" && sentMaxTokens > 0 && sentMaxTokens < 1000,
      `the saved combo's 1000-token window must cap output, got ${sentMaxTokens}`
    );
  });
}

test("an unknown auto suffix without a saved combo returns 400", async () => {
  const response = await chat("auto/inexistente");
  assert.equal(response.status, 400);
  assert.match(await response.text(), /Unknown built-in auto combo/);
});

test("an unknown auto suffix reaches the router with a published-model-only API key", async () => {
  const { key, id } = await createApiKey("Published models only", "reserved-auto-9516");
  await updateApiKeyPermissions(id, { disableNonPublicModels: true, allowAutoCombos: false });

  const response = await chat("auto/inexistente", key);
  assert.equal(response.status, 400);
  assert.match(await response.text(), /Unknown built-in auto combo/);
});
