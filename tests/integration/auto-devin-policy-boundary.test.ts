// Synthetic transport failures through the native auto/coding Responses caller.
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
  PROVIDER_SAFETY_STOPS_TERMINAL: "true",
});
const originalFetch = globalThis.fetch;
const originalConnect = Socket.prototype.connect;
Socket.prototype.connect = function () {
  throw new Error("synthetic fixture forbids sockets");
};
let upstreamCalls = 0;
const dispatchOrder: string[] = [];
let abortRequest: AbortController | undefined;
globalThis.fetch = async (input, init) => {
  const url = String(input instanceof Request ? input.url : input);
  assert.equal(new URL(url).hostname, "api.openai.com", `unexpected upstream ${url}`);
  upstreamCalls++;
  const outbound = JSON.parse(String(init?.body)) as { model?: string };
  dispatchOrder.push(String(outbound.model));
  if (
    process.env.TEST_STREAM === "true" &&
    upstreamCalls === 1 &&
    ["503", "eof", "safety"].includes(process.env.TEST_POLICY ?? "")
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  if (process.env.TEST_POLICY === "abort-during") {
    abortRequest?.abort();
    throw new DOMException("synthetic client abort", "AbortError");
  }
  if (process.env.TEST_POLICY === "429")
    return Response.json(
      { error: { code: "rate_limit_exceeded", message: "synthetic quota" } },
      { status: 429, headers: { "retry-after": "60" } }
    );
  if (process.env.TEST_POLICY === "503")
    return Response.json({ error: { message: "synthetic unavailable" } }, { status: 503 });
  if (process.env.TEST_POLICY === "eof")
    return new Response("data: [DONE]\n\n", { headers: { "content-type": "text/event-stream" } });
  if (process.env.TEST_POLICY === "safety")
    return Response.json(
      {
        error: {
          code: "content_policy_violation",
          type: "invalid_request_error",
          message: "synthetic policy denial",
        },
      },
      { status: 403 }
    );
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
      isActive: process.env.NATIVE_BASE_CONTROL !== "1",
    });
    const secondAccount = await providers.createProviderConnection({
      provider: "devin-cli",
      authType: "apikey",
      apiKey: "synthetic-second",
      isActive: process.env.NATIVE_BASE_CONTROL !== "1",
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
    abortRequest = new AbortController();
    if (process.env.TEST_POLICY === "abort-before") abortRequest.abort();
    if (process.env.TEST_STREAM === "true" && process.env.TEST_POLICY === "safety") {
      const pending = POST(
        new Request("http://localhost/v1/responses", {
          method: "POST",
          signal: abortRequest.signal,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model: "auto/coding", stream, input: "hello" }),
        })
      );
      const response = await pending;
      const text = await response.text();
      const events = text.split("\n\n").flatMap((frame) =>
        frame
          .split("\n")
          .filter((line) => line.startsWith("data: "))
          .map((line) => JSON.parse(line.slice(6)))
      );
      console.log(
        `SAFETY_STREAM_RECEIPT status=${response.status} dispatch=${JSON.stringify(dispatchOrder)} events=${JSON.stringify(events)}`
      );
      assert.deepEqual(dispatchOrder, ["gpt-4o-unaffordable"]);
      assert.equal(upstreamCalls, 1);
      assert.equal(devinAttempts, 0);
      assert.equal(response.status, 200);
      const failure = events.find((event) => event.type === "response.failed");
      assert.equal(failure?.response?.status, "failed");
      assert.equal(failure?.response?.error?.code, "content_policy_violation");
      assert.equal(failure?.response?.error?.status_code, 403);
      assert.ok(events.some((event) => event.type === "response.in_progress"));
      assert.ok(!events.some((event) => event.type === "response.completed"));
      return;
    }
    const response = await POST(
      new Request("http://localhost/v1/responses", {
        method: "POST",
        signal: abortRequest.signal,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model: "auto/coding", stream, input: "hello" }),
      })
    );
    const text = await response.text();
    console.log(
      `DISPATCH_RECEIPT stream=${stream} devin=${devinAttempts} alternate=${upstreamCalls} status=${response.status} body=${JSON.stringify(text.slice(0, 400))}`
    );
    if (process.env.TEST_POLICY === "abort-before" || process.env.TEST_POLICY === "abort-during") {
      assert.equal(response.status, 499, text);
      assert.equal(upstreamCalls, process.env.TEST_POLICY === "abort-before" ? 0 : 1);
      assert.equal(devinAttempts, 0);
      assert.doesNotMatch(text, /synthetic complete/);
      return;
    }
    const events = text.split("\n\n").flatMap((frame) =>
      frame
        .split("\n")
        .filter((line) => line.startsWith("data: "))
        .map((line) => JSON.parse(line.slice(6)))
    );
    console.log(
      `EVENT_RECEIPT dispatch=${JSON.stringify(dispatchOrder)} events=${JSON.stringify(events)}`
    );
    if (stream && (process.env.TEST_POLICY === "503" || process.env.TEST_POLICY === "eof")) {
      assert.equal(response.status, 200, text);
      assert.deepEqual(
        dispatchOrder,
        Array(process.env.TEST_POLICY === "eof" ? 3 : 2).fill("gpt-4o-unaffordable")
      );
      assert.equal(devinAttempts, 0);
      assert.equal(events.filter((event) => event.type === "error").length, 1);
      const failure = events.find((event) => event.type === "error");
      const code = process.env.TEST_POLICY === "eof" ? "STREAM_EARLY_EOF" : "service_unavailable";
      assert.equal(failure.code, code);
      assert.equal(failure.error.code, code);
      assert.equal(failure.status_code, process.env.TEST_POLICY === "eof" ? 502 : 503);
      assert.ok(events.some((event) => event.type === "response.in_progress"));
      assert.ok(!events.some((event) => event.type === "response.completed"));
      assert.doesNotMatch(text, /synthetic complete/);
      return;
    }
    if (
      process.env.TEST_POLICY === "429" ||
      process.env.TEST_POLICY === "503" ||
      process.env.TEST_POLICY === "eof"
    ) {
      const expected =
        process.env.TEST_POLICY === "429" ? 429 : process.env.TEST_POLICY === "503" ? 503 : 502;
      assert.equal(response.status, expected, text);
      assert.equal(upstreamCalls, process.env.TEST_POLICY === "429" ? 1 : 2);
      assert.equal(devinAttempts, 0);
      assert.doesNotMatch(text, /synthetic complete/);
      return;
    }
    if (process.env.TEST_POLICY === "safety") {
      assert.equal(response.status, 403, text);
      assert.equal(upstreamCalls, 1, "safety refusal must not retry or reach another model");
      assert.equal(devinAttempts, 0);
      return;
    }
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
