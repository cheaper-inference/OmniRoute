// Ranking is controlled through synthetic operator pricing and quota inputs, not by
// replacing the native selector. Each runner process gets a fresh DB and no LKGP.
// Forty Devin models precede a costly healthy alternate on the base revision.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { Socket } from "node:net";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "auto-devin-responses-"));
Object.assign(process.env, {
  DATA_DIR: dir,
  CLI_DEVIN_BIN: path.join(dir, "missing-devin"),
  REQUIRE_API_KEY: "false",
  API_KEY_SECRET: "synthetic-preflight-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
});
const originalFetch = globalThis.fetch;
const originalConnect = Socket.prototype.connect;
Socket.prototype.connect = function () {
  throw new Error("synthetic fixture forbids sockets");
};
let upstreamCalls = 0;
globalThis.fetch = async (input, init) => {
  const url = String(input instanceof Request ? input.url : input);
  assert.equal(new URL(url).hostname, "api.openai.com", `unexpected upstream ${url}`);
  upstreamCalls++;
  const body = JSON.parse(String(init?.body));
  const payload = {
    id: "synthetic",
    object: "chat.completion",
    model: body.model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: "synthetic complete" },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
  };
  if (body.stream) {
    const chunk = {
      id: "synthetic",
      object: "chat.completion.chunk",
      model: body.model,
      choices: [
        {
          index: 0,
          delta: { role: "assistant", content: "synthetic complete" },
          finish_reason: null,
        },
      ],
    };
    const end = { ...chunk, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] };
    return new Response(
      `data: ${JSON.stringify(chunk)}\n\ndata: ${JSON.stringify(end)}\n\ndata: [DONE]\n\n`,
      { headers: { "content-type": "text/event-stream" } }
    );
  }
  return Response.json(payload);
};
const core = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const models = await import("../../src/lib/db/models.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const { DevinCliExecutor } = await import("../../open-sse/executors/devin-cli.ts");
const { prepareVirtualAutoComboInputs } =
  await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const { MAX_GLOBAL_ATTEMPTS } = await import("../../open-sse/services/combo/comboPredicates.ts");
const { POST } = await import("../../src/app/api/v1/responses/route.ts");
const originalExecute = DevinCliExecutor.prototype.execute;
let devinAttempts = 0;
DevinCliExecutor.prototype.execute = function (...args) {
  devinAttempts++;
  return originalExecute.apply(this, args);
};

test.after(async () => {
  await closeCallLogSaves(10_000);
  DevinCliExecutor.prototype.execute = originalExecute;
  globalThis.fetch = originalFetch;
  Socket.prototype.connect = originalConnect;
  core.resetDbInstance();
});

test(
  "auto/coding responses excludes missing Devin before dispatch",
  { timeout: 60000 },
  async () => {
    const stream = process.env.TEST_STREAM === "true";
    await settings.updateSettings({
      excludeTosAvoid: false,
      blockedProviders: ["opencode", "duckduckgo-web", "veoaifree-web", "auggie"],
    });
    const account = await providers.createProviderConnection({
      provider: "devin-cli",
      authType: "apikey",
      apiKey: "synthetic",
      isActive: true,
    });
    const secondAccount = await providers.createProviderConnection({
      provider: "devin-cli",
      authType: "apikey",
      apiKey: "synthetic-second",
      isActive: true,
    });
    await providers.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      apiKey: "synthetic",
      isActive: true,
      defaultModel: "gpt-4o-mini",
    });
    for (let i = 0; i < 40; i++) await models.addCustomModel("devin-cli", `gpt-4o-${i}`);
    await models.addCustomModel("openai", "gpt-4o-unaffordable");
    const pricing: Record<string, { input: number; output: number }> = {};
    for (let i = 0; i < 40; i++) pricing[`gpt-4o-${i}`] = { input: 0.000001, output: 0.000001 };
    await settings.updatePricing({
      "devin-cli": pricing,
      openai: { "gpt-4o-unaffordable": { input: 999999, output: 999999 } },
    });
    registerQuotaFetcher("devin-cli", async () => ({ unlimited: true }));
    const before = await providers.getProviderConnectionById(account.id);
    const beforeSecond = await providers.getProviderConnectionById(secondAccount.id);
    const pool = await prepareVirtualAutoComboInputs();
    const response = await POST(
      new Request("http://localhost/v1/responses", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model: "auto/coding", stream, input: "hello" }),
      })
    );
    const text = await response.text();
    console.log(
      `DISPATCH_RECEIPT stream=${stream} devin=${devinAttempts} alternate=${upstreamCalls} status=${response.status} body=${JSON.stringify(text.slice(0, 400))}`
    );
    assert.equal(MAX_GLOBAL_ATTEMPTS, 30);
    assert.equal(devinAttempts, 0, "missing Devin must not be dispatched");
    assert.equal(
      pool.regularCandidates.filter((c) => c.provider === "devin-cli").length,
      0,
      "missing Devin must not enter the real pool"
    );
    assert.equal(response.status, 200, text);
    assert.match(text, /synthetic complete/);
    if (stream) assert.match(text, /response.completed/);
    assert.equal(upstreamCalls, 1);
    const after = await providers.getProviderConnectionById(account.id);
    assert.deepEqual(after, before);
    assert.deepEqual(await providers.getProviderConnectionById(secondAccount.id), beforeSecond);
  }
);
