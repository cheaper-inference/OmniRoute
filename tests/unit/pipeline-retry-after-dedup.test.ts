import { test } from "node:test";
import assert from "node:assert/strict";
import type {
  ChatCoreExecutorResult,
  PipelineConnectionContext,
  PipelineStateHooks,
  PipelineTargetContext,
  PipelineWireState,
  ProviderExecutionPipelineInput,
  ProviderExecutionPolicy,
} from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

// Fixture helpers copied from provider-execution-pipeline.test.ts (same shapes).
function jsonResponse(body: unknown, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...extraHeaders },
  });
}

function makeAttempt(
  body: unknown,
  status: number,
  extra: Partial<ChatCoreExecutorResult> = {}
): ChatCoreExecutorResult {
  const response = jsonResponse(body, status, extra.headers as Record<string, string> | undefined);
  return {
    response,
    url: extra.url ?? "https://upstream.test/v1/chat/completions",
    headers: extra.headers ?? { "content-type": "application/json" },
    transformedBody: extra.transformedBody ?? { model: "gpt-5" },
    ...extra,
  };
}

function noopState(): PipelineStateHooks {
  return {
    updatePendingStage: () => {},
    recordRateLimitHeaders: () => {},
    recordRateLimitBody: () => {},
    writeTerminalStatus: async () => {},
    persistConnectionPatch: () => {},
    setConnectionRateLimitedUntil: () => {},
    lockModel: () => {},
    recordAntigravityQuotaState: async () => {},
    markAccountSemaphoreBlocked: () => {},
    isolateProbeFailures: () => false,
  };
}

function makeInput(opts: {
  policy: ProviderExecutionPolicy;
  provider: string;
  model?: string;
  stream?: boolean;
  connectionId?: string;
  send: (model: string, allowDedup: boolean) => Promise<ChatCoreExecutorResult>;
  getProviderCredentials?: PipelineConnectionContext["getProviderCredentials"];
  replaceCredentials?: PipelineConnectionContext["replaceCredentials"];
  getCurrentConnectionId?: () => string | undefined;
  refreshCredentials?: PipelineConnectionContext["refreshCredentials"];
  onCredentialsRefreshed?: PipelineConnectionContext["onCredentialsRefreshed"];
  getNextFamilyFallback?: ProviderExecutionPipelineInput["getNextFamilyFallback"];
  state?: Partial<PipelineStateHooks>;
}): ProviderExecutionPipelineInput {
  const model = opts.model ?? "gpt-5";
  const connectionId = opts.connectionId ?? "conn-a";
  let currentId: string | undefined = connectionId;
  let credentials: Record<string, unknown> = { connectionId };
  const target: PipelineTargetContext = {
    provider: opts.provider,
    requestedModel: model,
    sourceFormat: "openai",
    targetFormat: "openai",
    stream: opts.stream ?? false,
  };
  const wire: PipelineWireState = {
    body: { model, messages: [{ role: "user", content: "hi" }] },
    currentModel: model,
    triedModels: new Set([model]),
    setBodyAndModel: (body, nextModel) => {
      wire.body = body;
      wire.currentModel = nextModel;
      wire.triedModels.add(nextModel);
    },
  };
  const connection: PipelineConnectionContext = {
    initialConnectionId: connectionId,
    getCurrentConnectionId: opts.getCurrentConnectionId ?? (() => currentId),
    getCredentials: () => credentials,
    replaceCredentials:
      opts.replaceCredentials ??
      ((next) => {
        credentials = next;
        currentId = typeof next.connectionId === "string" ? next.connectionId : currentId;
      }),
    onCredentialsRefreshed: opts.onCredentialsRefreshed ?? (() => {}),
    assertManagedLeaseFence: () => {},
    refreshCredentials: opts.refreshCredentials,
    getProviderCredentials:
      opts.getProviderCredentials ??
      (async () => {
        throw new Error("getProviderCredentials must not be called in this fixture");
      }),
  };
  return {
    policy: opts.policy,
    target,
    connection,
    wire,
    state: { ...noopState(), ...(opts.state || {}) },
    sendProviderAttempt: opts.send,
    getNextFamilyFallback: opts.getNextFamilyFallback,
  };
}

const OK_BODY = {
  id: "chatcmpl-ok",
  choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
};

async function codexCooldownMs(retryAfter: string): Promise<number> {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const rateLimited: Array<Record<string, unknown>> = [];
  let sendCount = 0;
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "codex",
    connectionId: "conn-a",
    send: async () => {
      sendCount += 1;
      if (sendCount === 1) {
        return {
          response: jsonResponse({ error: { message: "rate limited" } }, 429, {
            "Retry-After": retryAfter,
          }),
          url: "https://upstream.test/v1/chat/completions",
          headers: { "content-type": "application/json" },
          transformedBody: { model: "gpt-5" },
        };
      }
      return makeAttempt(OK_BODY, 200);
    },
    getProviderCredentials: (async () => ({
      connectionId: "conn-b",
      allRateLimited: false,
    })) as PipelineConnectionContext["getProviderCredentials"],
    state: {
      onCodexScopeRateLimited: (params) => {
        rateLimited.push(params as unknown as Record<string, unknown>);
      },
    },
  });
  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "response", "the pipeline must rotate, not throw");
  assert.equal(rateLimited.length, 1);
  return new Date(String(rateLimited[0]?.rateLimitedUntil)).getTime() - Date.now();
}

test("Retry-After as an HTTP date sets the cooldown to the date", async (t) => {
  const now = Math.floor(Date.now() / 1000) * 1000;
  t.mock.method(Date, "now", () => now);
  const delta = await codexCooldownMs(new Date(now + 120_000).toUTCString());
  assert.equal(delta, 120_000);
});

test("a huge Retry-After rotates the account and the cooldown is capped at 24 hours", async () => {
  const delta = await codexCooldownMs("99999999999999");
  assert.ok(delta > 86_000_000 && delta <= 86_400_000, `expected ~24 h, got ${delta} ms`);
});

test("Retry-After 0 gives no wait, not the 60 s default", async () => {
  const delta = await codexCooldownMs("0");
  assert.ok(delta < 5_000, `expected ~0 s, got ${delta} ms`);
});

test("Retry-After in seconds still works", async () => {
  const delta = await codexCooldownMs("5");
  assert.ok(delta > 4_000 && delta < 8_000, `expected ~5 s, got ${delta} ms`);
});

test("only the first wire send may join an in-flight identical request", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const sends: Array<[string, boolean]> = [];
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    model: "gpt-5",
    connectionId: "conn-a",
    send: async (model, allowDedup) => {
      sends.push([model, allowDedup]);
      if (model === "gpt-5") {
        return makeAttempt(
          { error: { message: "model is not available", type: "invalid_request_error" } },
          404
        );
      }
      return makeAttempt(OK_BODY, 200);
    },
    getNextFamilyFallback: (current) => (current === "gpt-5" ? "gpt-5-mini" : null),
  });
  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "response");
  assert.deepEqual(sends, [
    ["gpt-5", true],
    ["gpt-5-mini", false],
  ]);
});

test("the resend after an authentication refresh is not dedup-eligible", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const sends: boolean[] = [];
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    connectionId: "conn-a",
    send: async (_model, allowDedup) => {
      sends.push(allowDedup);
      return sends.length === 1
        ? makeAttempt({ error: { message: "bad token", type: "invalid_request_error" } }, 401)
        : makeAttempt(OK_BODY, 200);
    },
    refreshCredentials: async () => ({ accessToken: "fresh-token-value" }),
  });
  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "response");
  assert.deepEqual(sends, [true, false]);
});
