// F-C2-13: the non-stream pipeline recovered from "model unavailable" but never from a context
// overflow 400, because the overflow fallback lived in a leg branch the pipeline path never reaches.
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

const overflow = () =>
  makeAttempt(
    {
      error: {
        message: "This model's maximum context length is 8192 tokens",
        type: "invalid_request_error",
      },
    },
    400
  );
const okBody = {
  id: "chatcmpl-ok",
  choices: [{ message: { role: "assistant", content: "bigger model" }, finish_reason: "stop" }],
};

test("a context-overflow 400 resends once on the larger-context family model", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const sent: string[] = [];
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    send: async (model) => {
      sent.push(model);
      return sent.length === 1 ? overflow() : makeAttempt(okBody, 200);
    },
    getNextFamilyFallback: () => null,
  });
  input.getContextOverflowFallback = async () => "gpt-5-large";
  const outcome = await runProviderExecutionPipeline(input);
  assert.deepEqual(sent, ["gpt-5", "gpt-5-large"]);
  assert.equal(outcome.kind, "response");
  if (outcome.kind === "response") assert.equal(outcome.model, "gpt-5-large");
});

test("a context-overflow 400 with no larger model stays an error", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    send: async () => overflow(),
    getNextFamilyFallback: () => null,
  });
  input.getContextOverflowFallback = async () => null;
  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "error");
});

test("a follow-up phase (model fallback not allowed) does not switch models on overflow", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  let calls = 0;
  const input = makeInput({
    policy: { allowAccountRotation: false, allowModelFallback: false },
    provider: "openai",
    send: async () => {
      calls++;
      return overflow();
    },
  });
  input.getContextOverflowFallback = async () => "gpt-5-large";
  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(calls, 1);
  assert.equal(outcome.kind, "error");
});

test("a plain-text context-overflow 400 also resends on the larger-context model", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const sent: string[] = [];
  const plainOverflow = (): ChatCoreExecutorResult => ({
    response: new Response("This model's maximum context length is 8192 tokens", {
      status: 400,
      headers: { "content-type": "text/plain" },
    }),
    url: "https://upstream.test/v1/chat/completions",
    headers: { "content-type": "text/plain" },
    transformedBody: { model: "gpt-5" },
  });
  const input = makeInput({
    policy: { allowAccountRotation: true, allowModelFallback: true },
    provider: "openai",
    send: async (model) => {
      sent.push(model);
      return sent.length === 1 ? plainOverflow() : makeAttempt(okBody, 200);
    },
    getNextFamilyFallback: () => null,
  });
  input.getContextOverflowFallback = async () => "gpt-5-large";
  const outcome = await runProviderExecutionPipeline(input);
  assert.deepEqual(sent, ["gpt-5", "gpt-5-large"]);
  assert.equal(outcome.kind, "response");
});
