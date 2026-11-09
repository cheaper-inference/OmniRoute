import test from "node:test";
import assert from "node:assert/strict";
import { runProviderExecutionPipeline } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";
import { getNextFamilyFallback } from "../../open-sse/services/modelFamilyFallback.ts";

test("current Anthropic catalog supplies the intended fallback fixture", () => {
  assert.equal(
    getNextFamilyFallback("claude-opus-5-5", new Set(["claude-opus-5-5"]), "anthropic"),
    "claude-opus-5"
  );
});

async function runWireCase(
  initial = "original",
  select: (current: string, attempts: Set<string>) => string | null | Promise<string | null> = (
    _current,
    attempts
  ) => (attempts.has("next") ? null : "next")
) {
  const sent: string[] = [];
  const tried = new Set([initial]);
  const notifications: string[] = [];
  const result = await runProviderExecutionPipeline({
    policy: { allowModelFallback: true, allowAccountRotation: false },
    target: {
      provider: "anthropic",
      requestedModel: initial,
      sourceFormat: "openai",
      targetFormat: "claude",
      stream: false,
    },
    connection: {
      initialConnectionId: "fixture",
      getCurrentConnectionId: () => "fixture",
      getCredentials: () => ({}),
      replaceCredentials() {},
      onCredentialsRefreshed() {},
      assertManagedLeaseFence() {},
    },
    wire: {
      body: { model: initial },
      currentModel: initial,
      triedModels: tried,
      setBodyAndModel(body, model) {
        notifications.push(model);
        tried.add(model);
        assert.equal(body.model, model);
      },
    },
    state: {
      updatePendingStage() {},
      recordRateLimitHeaders() {},
      recordRateLimitBody() {},
      async writeTerminalStatus() {},
      persistConnectionPatch() {},
      setConnectionRateLimitedUntil() {},
      lockModel() {},
      async recordAntigravityQuotaState() {},
      markAccountSemaphoreBlocked() {},
      isolateProbeFailures: () => false,
    },
    getNextFamilyFallback: select,
    sendProviderAttempt: async (model) => {
      sent.push(model);
      return {
        response: Response.json(
          model !== initial ? { content: "ok" } : { error: { message: "model not found" } },
          { status: model !== initial ? 200 : 404 }
        ),
        url: "https://example.test",
        headers: {},
        transformedBody: { model },
      };
    },
  });
  return { sent, notifications, result };
}

test("pipeline advances its own wire state when the handler callback only updates its closure", async () => {
  const { sent, notifications, result } = await runWireCase();
  assert.deepEqual(sent, ["original", "next"]);
  assert.deepEqual(notifications, ["next"]);
  assert.equal(result.kind, "response");
  assert.equal(result.model, "next");
});

test("an ineligible custom candidate cannot fall through to an unapproved raw family sibling", async () => {
  const { setModelIsHidden } = await import("../../src/lib/db/models.ts");
  setModelIsHidden("anthropic", "claude-opus-5", true, "chat");
  const seenExclusions: boolean[] = [];
  try {
    const { sent } = await runWireCase("claude-opus-5-5", async (_current, tried) => {
      seenExclusions.push(tried.has("claude-opus-5"));
      return tried.has("claude-opus-5") ? null : "claude-opus-5";
    });
    assert.deepEqual(sent, ["claude-opus-5-5"]);
    assert.deepEqual(seenExclusions, [false, true]);
  } finally {
    setModelIsHidden("anthropic", "claude-opus-5", false, "chat");
  }
});
