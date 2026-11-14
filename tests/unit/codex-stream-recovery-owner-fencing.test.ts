import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-stream-owner-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { executeProviderRequest } =
  await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
type Deps =
  import("../../open-sse/handlers/chatCore/executeProviderRequest.ts").ExecuteProviderRequestDeps;
const encoder = new TextEncoder();

async function seed() {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    accessToken: "synthetic-old",
    email: "a@example.invalid",
    providerSpecificData: { workspaceId: "a", autoFetchModels: false },
  });
}

function dependencies(
  connection: Awaited<ReturnType<typeof seed>>,
  execute: Deps["executor"]["execute"],
  continuation = false
): Deps {
  const controller = new AbortController();
  const credentials = { ...connection, connectionId: connection.id };
  const body = { model: "gpt-5.5", messages: [{ role: "user", content: "offline test" }] };
  const settings = {
    resilienceSettings: {
      streamRecovery: {
        enabled: true,
        continueMidStream: continuation,
      },
    },
  };
  return {
    agentGoalPolicy: {
      detected: false,
      readinessMaxTimeoutMs: 600_000,
      streamRecoveryEnabled: false,
    },
    assertManagedLeaseFence: () => {},
    buildUpstreamHeadersForExecute: () => ({}),
    clientRawRequest: { headers: new Headers(), signal: controller.signal },
    clientResponseFormat: "chat.completions",
    connectionId: connection.id,
    correlationId: null,
    credentials,
    dedupEnabled: false,
    dedupHash: null,
    effectiveModel: body.model,
    executor: { execute },
    extendedContext: false,
    getExecutionCredentials: () => credentials,
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => false,
    isOpencodeClient: false,
    log: null,
    model: body.model,
    onCredentialsRefreshed: async (next) => {
      await providers.updateProviderConnection(connection.id, next);
    },
    pendingScope: { id: null, model: body.model, provider: "codex", connectionId: connection.id },
    provider: "codex",
    providerRequestCapture: { capture: () => {}, body: (fallback: unknown) => fallback },
    rawBody: body,
    recordKeyHealthStatus: () => {},
    requestedModel: body.model,
    resilienceSettings: resolveResilienceSettings(settings),
    settings,
    skipUpstreamRetry: false,
    stream: true,
    streamController: { signal: controller.signal },
    targetFormat: "openai",
    trace: () => {},
    traceId: "codex-stream-owner",
    translatedBody: body,
    trustedEffortContext: {},
    upstreamStream: true,
    userAgent: "offline-owner-fence-test",
  };
}

function completed() {
  return new Response("data: [DONE]\n\n", { headers: { "content-type": "text/event-stream" } });
}

async function replace(id: string) {
  await providers.updateProviderConnection(id, {
    accessToken: "synthetic-new",
    email: "b@example.invalid",
    providerSpecificData: { workspaceId: "b", autoFetchModels: false },
  });
}

test.afterEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

for (const continuation of [false, true]) {
  test(`a replaced owner prevents ${continuation ? "mid-stream continuation" : "early stream recovery"} dispatch`, async () => {
    const connection = await seed();
    let upstream!: ReadableStreamDefaultController<Uint8Array>;
    const original = new ReadableStream<Uint8Array>({
      start(controller) {
        upstream = controller;
      },
    });
    let calls = 0;
    const deps = dependencies(
      connection,
      async () => {
        calls++;
        return calls === 1
          ? new Response(original, { headers: { "content-type": "text/event-stream" } })
          : completed();
      },
      continuation
    );
    const result = await executeProviderRequest(deps, "gpt-5.5");
    const reader = result.response.body!.getReader();
    if (continuation) {
      // Exceed the holdback cap deterministically; no timers or live network.
      const text = "x".repeat(70_000);
      upstream.enqueue(
        encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`)
      );
      assert.equal((await reader.read()).done, false);
    }
    await replace(connection.id);
    upstream.error(new Error("terminated"));
    try {
      while (!(await reader.read()).done) {
        /* drain to exercise recovery */
      }
    } catch {
      /* the original stream failure must remain visible */
    }
    assert.equal(calls, 1, "stale credentials must not be sent on a recovery attempt");
  });
}

test("a delayed recovery refresh cannot overwrite a replacement owner", async () => {
  const connection = await seed();
  let calls = 0;
  const deps = dependencies(connection, async (input) => {
    calls++;
    if (calls === 1) {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.error(new Error("terminated"));
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      );
    }
    await replace(connection.id);
    await input.onCredentialsRefreshed?.({ accessToken: "synthetic-old-rotated" });
    return completed();
  });
  const result = await executeProviderRequest(deps, "gpt-5.5");
  await result.response.text().catch(() => "");
  assert.equal(calls, 2, "a current owner may enter one recovery attempt");
  assert.equal(
    (await providers.getProviderConnectionById(connection.id))?.accessToken,
    "synthetic-new"
  );
});
