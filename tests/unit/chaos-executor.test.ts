/**
 * Unit tests for src/lib/chaos/chaosExecutor.ts
 *
 * Regression coverage for #6679: the original PR dispatched to models via a real
 * network fetch() to `${OMNIROUTE_INTERNAL_URL || "http://localhost:30129"}` —
 * 30129 is the author's personal dev port, not the project's default port 20128,
 * so Chaos Mode silently failed on any standard install. This now dispatches
 * in-process via the established synthetic-Request/route-handler pattern (see
 * src/lib/batches/dispatch.ts, src/lib/evals/runtime.ts) — no network hop, no
 * port dependency. `chatDispatch.postChatCompletion` is mocked here (same
 * technique tests/unit/batch-processor.test.ts uses for dispatch.ts) so these
 * tests never hit a real upstream provider.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chaos-executor-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chaosConfig = await import("../../src/lib/chaos/chaosConfig.ts");
const chaosExecutor = await import("../../src/lib/chaos/chaosExecutor.ts");

async function resetStorage() {
  core.resetDbInstance();
  chaosConfig.invalidateChaosConfigCache();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(() => {
  mock.restoreAll();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("executeChaosRun throws when no active provider connections exist", async () => {
  await assert.rejects(
    () => chaosExecutor.executeChaosRun({ task: "hello" }),
    /No active provider connections found/
  );
});

test("executeChaosRun dispatches in-process (no fetch/network call) and returns per-provider results", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Test OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  let capturedRequest: Request | null = null;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedRequest = req;
    return jsonResponse({ choices: [{ message: { content: "hello from openai" } }] });
  });

  const result = await chaosExecutor.executeChaosRun({ task: "Summarize this repo" });

  assert.equal(result.mode, "parallel");
  assert.equal(result.totalProviders, 1);
  assert.equal(result.models.length, 1);
  assert.equal(result.models[0].status, "success");
  assert.equal(result.models[0].content, "hello from openai");

  assert.ok(capturedRequest, "postChatCompletion should have been invoked in-process");
  assert.equal(
    (capturedRequest as unknown as Request).url,
    "http://localhost/api/v1/chat/completions"
  );
});

test("executeChaosRun forwards the caller's apiKey as a Bearer Authorization header", async () => {
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Test Anthropic",
    apiKey: "sk-test-anthropic",
    defaultModel: "claude-3-5-sonnet",
  });

  let capturedAuth: string | null = null;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedAuth = req.headers.get("Authorization");
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task", apiKey: "sk-caller-key" });

  assert.equal(capturedAuth, "Bearer sk-caller-key");
});

test("executeChaosRun authenticates internally when no apiKey is provided (dashboard mode)", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Test OpenAI",
    apiKey: "sk-test-openai-2",
    defaultModel: "gpt-4o-mini",
  });

  let capturedAuth: string | null | undefined;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedAuth = req.headers.get("Authorization");
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task" });

  assert.equal(capturedAuth?.startsWith("Bearer "), true);
});

test("executeChaosRun surfaces upstream errors per-model instead of throwing", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Failing OpenAI",
    apiKey: "sk-test-failing",
    defaultModel: "gpt-4o-mini",
  });

  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async () =>
    jsonResponse({ error: "upstream exploded" }, 502)
  );

  const result = await chaosExecutor.executeChaosRun({ task: "task" });

  assert.equal(result.models[0].status, "error");
  assert.match(result.models[0].error ?? "", /API 502/);
});

test("executeChaosRun collaborative mode chains context between sequential model calls", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Model A",
    apiKey: "sk-test-a",
    defaultModel: "gpt-4o-mini",
  });
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Model B",
    apiKey: "sk-test-b",
    defaultModel: "claude-3-5-sonnet",
  });

  const seenUserMessages: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    const body = (await req.json()) as { messages: { role: string; content: string }[] };
    const userMessage = body.messages.find((m) => m.role === "user");
    seenUserMessages.push(userMessage?.content ?? "");
    return jsonResponse({
      choices: [{ message: { content: `reply-${seenUserMessages.length}` } }],
    });
  });

  const result = await chaosExecutor.executeChaosRun({
    task: "Original task",
    mode: "collaborative",
  });

  assert.equal(result.mode, "collaborative");
  assert.equal(result.models.length, 2);
  assert.equal(seenUserMessages[0], "Original task");
  assert.match(seenUserMessages[1], /Previous model's output:\nreply-1/);
  assert.ok(result.summary && result.summary.includes("reply-2"));
});

test("executeChaosRun respects an explicit providers filter and errors when none match", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Only OpenAI",
    apiKey: "sk-test-only-openai",
    defaultModel: "gpt-4o-mini",
  });

  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async () =>
    jsonResponse({ choices: [{ message: { content: "ok" } }] })
  );

  await assert.rejects(
    () => chaosExecutor.executeChaosRun({ task: "task", providers: ["anthropic"] }),
    /None of the specified providers are active/
  );

  const result = await chaosExecutor.executeChaosRun({ task: "task", providers: ["openai"] });
  assert.equal(result.models.length, 1);
});

test("executeChaosRun applies global config provider overrides for model resolution", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Override target",
    apiKey: "sk-test-override",
    defaultModel: "gpt-4o-mini",
  });

  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [{ providerId: "openai", modelId: "gpt-4-turbo", enabled: true }],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });

  let capturedModel: string | undefined;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    const body = (await req.json()) as { model: string };
    capturedModel = body.model;
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task" });

  assert.equal(capturedModel, "gpt-4-turbo");
});

const NO_MODEL_MESSAGE =
  "No model set for this provider. Set a model for it on the Chaos Mode page or a default model on the connection.";

async function setOverrides(
  providerOverrides: { providerId: string; modelId?: string; enabled: boolean }[]
) {
  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides,
    timeoutMs: 120_000,
    maxTokens: 4096,
  });
}

test("executeChaosRun skips a provider without a model: no upstream request, clear error, others still run", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Has default model",
    apiKey: "sk-test-has-model",
    defaultModel: "gpt-4o-mini",
  });
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "No model",
    apiKey: "sk-test-no-model",
  });

  const dispatchedModels: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    const body = (await req.json()) as { model: string };
    dispatchedModels.push(body.model);
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  const result = await chaosExecutor.executeChaosRun({ task: "task" });

  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
  assert.equal(result.totalProviders, 2);
  assert.equal(result.models.length, 2);

  const ok = result.models.find((m) => m.providerName === "Has default model");
  const skipped = result.models.find((m) => m.providerName === "No model");
  assert.equal(ok?.status, "success");
  assert.equal(skipped?.status, "error");
  assert.equal(skipped?.content, null);
  assert.equal(skipped?.error, NO_MODEL_MESSAGE);
  assert.equal(skipped?.modelId, "");
});

test("executeChaosRun skips a provider without a model in collaborative mode and keeps the chain going", async () => {
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "No model",
    apiKey: "sk-test-collab-no-model",
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "With model",
    apiKey: "sk-test-collab-model",
    defaultModel: "gpt-4o-mini",
  });

  let calls = 0;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async () => {
    calls++;
    return jsonResponse({ choices: [{ message: { content: "chain-reply" } }] });
  });

  const result = await chaosExecutor.executeChaosRun({ task: "task", mode: "collaborative" });

  assert.equal(calls, 1);
  assert.equal(result.models.length, 2);
  const skipped = result.models.find((m) => m.providerName === "No model");
  const ran = result.models.find((m) => m.providerName === "With model");
  assert.equal(skipped?.status, "error");
  assert.equal(skipped?.error, NO_MODEL_MESSAGE);
  assert.equal(ran?.status, "success");
  assert.equal(result.summary, "chain-reply");
});

test("executeChaosRun: an enabled override modelId supplies the model for a connection without a default", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Override only",
    apiKey: "sk-test-override-only",
  });
  await setOverrides([{ providerId: "openai", modelId: "gpt-4-turbo", enabled: true }]);

  const dispatchedModels: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    dispatchedModels.push(((await req.json()) as { model: string }).model);
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  const result = await chaosExecutor.executeChaosRun({ task: "task" });

  assert.deepEqual(dispatchedModels, ["gpt-4-turbo"]);
  assert.equal(result.models[0].status, "success");
});

test("executeChaosRun: a blank override modelId does not count as a model", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Blank override",
    apiKey: "sk-test-blank-override",
  });
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Has default",
    apiKey: "sk-test-blank-override-2",
    defaultModel: "claude-3-5-sonnet",
  });
  await setOverrides([
    { providerId: "openai", modelId: "   ", enabled: true },
    { providerId: "anthropic", enabled: true },
  ]);

  const dispatchedModels: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    dispatchedModels.push(((await req.json()) as { model: string }).model);
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  const result = await chaosExecutor.executeChaosRun({ task: "task" });

  assert.deepEqual(dispatchedModels, ["claude-3-5-sonnet"]);
  const blank = result.models.find((m) => m.providerName === "Blank override");
  assert.equal(blank?.status, "error");
  assert.equal(blank?.error, NO_MODEL_MESSAGE);
});

test("executeChaosRun: a disabled override modelId is ignored in favor of the connection default", async () => {
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Disabled override",
    apiKey: "sk-test-disabled-override",
    defaultModel: "claude-3-5-sonnet",
  });
  await setOverrides([{ providerId: "anthropic", modelId: "ignored-model", enabled: false }]);

  const dispatchedModels: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    dispatchedModels.push(((await req.json()) as { model: string }).model);
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task" });

  assert.deepEqual(dispatchedModels, ["claude-3-5-sonnet"]);
});

test("executeChaosRun: an override modelId wins over the connection default model", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Both",
    apiKey: "sk-test-both",
    defaultModel: "gpt-4o-mini",
  });
  await setOverrides([{ providerId: "openai", modelId: "gpt-4-turbo", enabled: true }]);

  const dispatchedModels: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    dispatchedModels.push(((await req.json()) as { model: string }).model);
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task" });

  assert.deepEqual(dispatchedModels, ["gpt-4-turbo"]);
});

test("executeChaosRun fails fast without any upstream request when no provider has a model", async () => {
  for (const provider of ["openai", "anthropic", "gemini"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `No model ${provider}`,
      apiKey: `sk-test-nomodel-${provider}`,
    });
  }

  let calls = 0;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async () => {
    calls++;
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  for (const mode of ["parallel", "collaborative"] as const) {
    await assert.rejects(
      () => chaosExecutor.executeChaosRun({ task: "task", mode }),
      /No provider has a model set\. Set a model for each provider on the Chaos Mode page or a default model on its connection\./
    );
  }
  assert.equal(calls, 0);
});
