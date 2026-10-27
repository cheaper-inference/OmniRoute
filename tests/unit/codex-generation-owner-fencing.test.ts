import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("codex-generation-owner-fencing");
const providers = await import("../../src/lib/db/providers.ts");
const originalFetch = globalThis.fetch;
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
const owner = (tag: string) => ({
  accessToken: `synthetic-${tag}`,
  email: `${tag}@example.invalid`,
  providerSpecificData: { workspaceId: `workspace-${tag}`, autoFetchModels: false },
});
async function seed() {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    testStatus: "active",
    isActive: true,
    ...owner("a"),
  });
}
function invoke(id: string, stream = false) {
  return harness.handleChat(
    harness.buildRequest({
      url: "http://localhost/v1/responses",
      headers: { "x-omniroute-connection-id": id },
      body: { model: "codex/gpt-5.6-sol", input: "offline owner race", stream },
    })
  );
}
function success() {
  return Response.json({
    id: "resp_owner",
    object: "response",
    status: "completed",
    model: "gpt-5.6-sol",
    output: [
      {
        id: "msg_owner",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "ok", annotations: [] }],
      },
    ],
    usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
  });
}
async function unchanged(id: string, before: Record<string, unknown>) {
  const after = await providers.getProviderConnectionById(id);
  for (const key of [
    "accessToken",
    "email",
    "providerSpecificData",
    "testStatus",
    "lastError",
    "lastErrorType",
    "rateLimitedUntil",
    "backoffLevel",
  ]) {
    assert.deepEqual(after?.[key], before[key], key);
  }
}
test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    blockedProviders: ["aihorde"],
  });
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await harness.resetStorage();
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});

for (const status of [401, 429]) {
  for (const aba of [false, true]) {
    test(`full chat path: late ${status} cannot disable ${aba ? "A-to-B-to-A" : "A-to-B"} credentials`, async () => {
      const connection = await seed();
      const started = deferred<void>();
      const release = deferred<Response>();
      globalThis.fetch = async (url) => {
        assert.ok(
          String(url).includes("/codex/responses"),
          "only the mocked generation is authorized"
        );
        started.resolve();
        return release.promise;
      };
      const operation = invoke(connection.id);
      await Promise.race([
        started.promise,
        operation.then(() => {
          throw new Error("generation rejected before mocked dispatch");
        }),
      ]);
      await providers.updateProviderConnection(connection.id, owner("b"));
      if (aba) await providers.updateProviderConnection(connection.id, owner("a"));
      const before = await providers.getProviderConnectionById(connection.id);
      release.resolve(
        Response.json(
          {
            error: {
              message: status === 429 ? "The usage limit has been reached" : "unauthorized",
            },
          },
          {
            status,
            headers: {
              "Retry-After": "600",
              "x-codex-5h-usage": "100",
              "x-codex-5h-limit": "100",
              "x-codex-7d-usage": "10",
              "x-codex-7d-limit": "100",
              "x-codex-5h-reset-at": new Date(Date.now() + 600_000).toISOString(),
            },
          }
        )
      );
      const response = await operation;
      await response.text();
      await harness.callLogsDb.waitForCallLogSaves(10_000);
      await unchanged(connection.id, before);
    });
  }
}

test("full chat success cannot clear a newer same-owner terminal failure", async () => {
  const connection = await seed();
  await providers.updateProviderConnection(connection.id, { lastError: "old transient error" });
  const started = deferred<void>();
  const release = deferred<Response>();
  globalThis.fetch = async () => {
    started.resolve();
    return release.promise;
  };
  const operation = invoke(connection.id);
  await Promise.race([
    started.promise,
    operation.then(() => {
      throw new Error("generation rejected before mocked dispatch");
    }),
  ]);
  await providers.updateProviderConnection(connection.id, {
    testStatus: "banned",
    lastError: "new hard stop",
    lastErrorType: "account_banned",
  });
  const before = await providers.getProviderConnectionById(connection.id);
  release.resolve(success());
  const response = await operation;
  await response.text();
  await harness.callLogsDb.waitForCallLogSaves(10_000);
  await unchanged(connection.id, before);
});

test("late streaming failure retains its immutable dispatch owner", async () => {
  const connection = await seed();
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const encoder = new TextEncoder();
  globalThis.fetch = async () =>
    new Response(
      new ReadableStream<Uint8Array>({
        start(value) {
          controller = value;
          controller.enqueue(
            encoder.encode(
              'event: response.created\ndata: {"type":"response.created","response":{"id":"resp_stream","model":"gpt-5.6-sol"}}\n\nevent: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"ok"}\n\n'
            )
          );
        },
      }),
      { headers: { "Content-Type": "text/event-stream" } }
    );
  const response = await invoke(connection.id, true);
  assert.equal(response.status, 200);
  const consumed = response.text().catch(() => "terminated");
  await providers.updateProviderConnection(connection.id, owner("b"));
  const before = await providers.getProviderConnectionById(connection.id);
  controller.error(new TypeError("terminated"));
  await consumed;
  await harness.callLogsDb.waitForCallLogSaves(10_000);
  await unchanged(connection.id, before);
});
