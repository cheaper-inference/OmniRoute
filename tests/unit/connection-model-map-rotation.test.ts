// Account rotation inside runProviderExecutionPipeline with the wire object chatCore really passes:
// `setBodyAndModel` only updates the caller's closure, so `wire` itself has to move as well.
import test from "node:test";
import assert from "node:assert/strict";
import {
  runProviderExecutionPipeline,
  type ProviderExecutionPipelineInput,
} from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

type Credentials = Record<string, unknown>;

function attempt(status: number) {
  return {
    response: new Response(
      status === 200 ? "{}" : JSON.stringify({ error: { message: "limit" } }),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    ),
    url: "http://upstream.invalid",
    headers: {},
    transformedBody: {},
  };
}

async function rotate({
  first,
  next,
  source,
  provider = "codex",
  failure = 429,
  wireModel = "served-model",
}: {
  first: Credentials;
  next: Credentials;
  source?: string;
  provider?: string;
  failure?: number;
  wireModel?: string;
}) {
  let credentials: Credentials = { connectionId: "a", ...first };
  const sent: string[] = [];
  const closure = { model: wireModel, body: { model: wireModel } as unknown };
  const setBodyCalls: string[] = [];
  const input = {
    policy: { allowAccountRotation: true, allowModelFallback: false },
    target: {
      provider,
      requestedModel: wireModel,
      connectionModelSource: source,
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: false,
    },
    connection: {
      initialConnectionId: "a",
      getCurrentConnectionId: () => String(credentials.connectionId),
      getCredentials: () => credentials,
      replaceCredentials: (value: Credentials) => {
        credentials = value;
      },
      onCredentialsRefreshed() {},
      assertManagedLeaseFence() {},
      getProviderCredentials: async () => ({ connectionId: "b", ...next }),
    },
    // Same shape as streamingResponse.ts / nonStreamingResponse.ts: no self-update here.
    wire: {
      body: closure.body,
      currentModel: wireModel,
      triedModels: new Set([wireModel]),
      setBodyAndModel(body: unknown, model: string) {
        closure.body = body;
        closure.model = model;
        setBodyCalls.push(model);
      },
    },
    state: {
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
    },
    sendProviderAttempt: async (model: string) => {
      sent.push(model);
      if (sent.length > 1) return attempt(200);
      if (failure === 422) {
        return {
          ...attempt(422),
          response: new Response(JSON.stringify({ error: { message: "gcp_project_required" } }), {
            status: 422,
          }),
        };
      }
      return attempt(failure);
    },
  } as unknown as ProviderExecutionPipelineInput;
  await runProviderExecutionPipeline(input);
  return { sent, closure, setBodyCalls };
}

const MAP = { "client-model": "mapped-model" };

for (const [provider, failure] of [
  ["codex", 429],
  ["antigravity", 422],
] as const) {
  test(`${provider}: rotating off a mapped account restores the client's model`, async () => {
    const { sent, closure } = await rotate({
      provider,
      failure,
      first: { modelMap: MAP },
      next: { modelMap: null },
      source: "client-model",
      wireModel: "mapped-model",
    });
    assert.deepEqual(sent, ["mapped-model", "client-model"]);
    assert.equal(closure.model, "client-model");
    assert.deepEqual(closure.body, { model: "client-model" });
  });

  test(`${provider}: rotating onto a mapped account dispatches its target`, async () => {
    const { sent, closure } = await rotate({
      provider,
      failure,
      first: { modelMap: null },
      next: { modelMap: MAP },
      wireModel: "client-model",
    });
    assert.deepEqual(sent, ["client-model", "mapped-model"]);
    assert.equal(closure.model, "mapped-model");
  });

  test(`${provider}: rotating between two maps resolves from the unmapped model`, async () => {
    const { sent } = await rotate({
      provider,
      failure,
      first: { modelMap: MAP },
      next: { modelMap: { "client-model": "other-target", "mapped-model": "wrong-chain" } },
      source: "client-model",
      wireModel: "mapped-model",
    });
    assert.deepEqual(sent, ["mapped-model", "other-target"]);
  });

  test(`${provider}: without a map on either side the wire is never rewritten`, async () => {
    const { sent, setBodyCalls } = await rotate({
      provider,
      failure,
      first: { modelMap: null },
      next: {},
      wireModel: "client-model",
    });
    assert.deepEqual(sent, ["client-model", "client-model"]);
    assert.deepEqual(setBodyCalls, []);
  });
}
